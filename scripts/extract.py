"""Reproducible read-only Stellaris archive importer. Python 3 + Pillow."""
from __future__ import annotations
import argparse, collections, hashlib, io, json, re, zipfile
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
TOKEN = re.compile(r'#[^\n]*|"(?:\\.|[^"\\])*"|[{}]|[<>!=?]+|[^\s{}=<>!?#"]+')
OP = {'=', '>', '<', '>=', '<=', '!=', '?='}

def parse(text):
    tokens = [(m.group(), m.start(), m.end()) for m in TOKEN.finditer(text) if not m.group().startswith('#')]
    pos = 0
    def block(nested=False):
        nonlocal pos
        out=[]
        while pos < len(tokens):
            key,start,end=tokens[pos]; pos+=1
            if key=='}':
                if not nested: raise ValueError(f'unexpected }} at {start}')
                return out
            if key=='{':
                value=block(True); out.append({'k':'','v':value,'s':start,'e':tokens[pos-1][2]}); continue
            if pos<len(tokens) and tokens[pos][0] in OP:
                op=tokens[pos][0]; pos+=1
                if pos>=len(tokens): raise ValueError('missing value')
                val,_,end=tokens[pos]; pos+=1
                if val=='{': val=block(True); end=tokens[pos-1][2]
                else: val=unquote(val)
                out.append({'k':unquote(key),'v':val,'op':op,'s':start,'e':end})
            else: out.append({'k':'','v':unquote(key),'s':start,'e':end})
        if nested: raise ValueError('unclosed block')
        return out
    return block()

def unquote(s):
    return s[1:-1].replace('\\"','"') if s.startswith('"') and s.endswith('"') else s
def vals(nodes,k): return [n['v'] for n in nodes if n['k'].lower()==k.lower()]
def first(nodes,k,default=''): return next((n['v'] for n in nodes if n['k'].lower()==k.lower()),default)
def walk(nodes):
    for n in nodes:
        yield n
        if isinstance(n['v'],list): yield from walk(n['v'])
def raw(node,text): return text[node['s']:node['e']]
def dump(path,obj):
    path.parent.mkdir(parents=True,exist_ok=True)
    path.write_text(json.dumps(obj,ensure_ascii=False,separators=(',',':')),encoding='utf-8')

NARRATIVE=('events/','common/archaeological_site_types/','common/astral_rifts/','common/situations/','common/special_projects/','common/event_chains/')
def relevant(p):
    return (p.startswith(NARRATIVE+('common/inline_scripts/',)) and p.endswith('.txt')) or (p.startswith('interface/') and p.endswith('.gfx')) or (p.startswith(('localisation/english/','localisation/simp_chinese/','localisation_synced/')) and p.endswith('.yml'))

def import_game(game):
    files={}; assets={}; sources=[]; archives=[]; overrides=[]
    def add(name,data,origin):
        name=name.replace('\\','/').lower()
        if relevant(name):
            if name in files: overrides.append({'path':name,'previous':files[name][1],'replacement':origin})
            files[name]=(data,origin)
        if name.startswith('gfx/') and name.endswith(('.dds','.png','.jpg','.tga')): assets[name]=(data,origin)
    # Graphics are indexed lazily on disk, avoiding loading the game's full art library.
    for base in ('events','common','interface','localisation','localisation_synced'):
        for p in sorted((game/base).rglob('*')):
            if p.is_file() and relevant(p.relative_to(game).as_posix()): add(p.relative_to(game).as_posix(),p.read_bytes(),p.relative_to(game).as_posix())
    for p in sorted((game/'gfx').rglob('*')):
        if p.is_file() and p.suffix.lower() in ('.dds','.png','.jpg','.tga'): assets[p.relative_to(game).as_posix().lower()]=(p,p.relative_to(game).as_posix())
    for p in sorted((game/'dlc').rglob('*.zip')):
        with zipfile.ZipFile(p) as z:
            names=z.namelist(); archives.append({'path':p.relative_to(game).as_posix(),'entries':len(names)})
            for name in sorted(names):
                key=name.lower()
                if relevant(key) or (key.startswith('gfx/') and key.endswith(('.dds','.png','.jpg','.tga'))):
                    add(name,z.read(name),p.relative_to(game).as_posix()+'!/'+name)
    loc={'zh':{},'en':{}}; loc_sources={'zh':{},'en':{}}; errors=[]
    for name,(data,origin) in files.items():
        sources.append({'path':name,'source':origin,'sha256':hashlib.sha256(data).hexdigest(),'bytes':len(data)})
        if not name.endswith('.yml'): continue
        text=data.decode('utf-8-sig',errors='replace')
        lang='zh' if 'l_simp_chinese:' in text[:200] else 'en' if 'l_english:' in text[:200] else None
        if not lang: continue
        for line in text.splitlines():
            m=re.match(r'^\s*([^\s:#]+):\d*\s*"(.*)"\s*(?:#.*)?$',line)
            if m:
                key,value=m.groups(); loc[lang][key]=value.replace('\\n','\n').replace('\\"','"'); loc_sources[lang][key]=origin
    def localized(key):
        if not isinstance(key,str): return {'key':'','zh':'','en':''}
        def expand(s,lang,seen):
            def sub(m):
                k=m[1].split('|')[0]
                if k in seen or k not in loc[lang]: return m[0]
                return expand(loc[lang][k],lang,seen|{k})
            return re.sub(r'\$([^$\n]+)\$',sub,s) if len(seen)<16 else s
        return {'key':key,**{lang:expand(loc[lang].get(key,key if ('$' in key or ' ' in key) else ''),lang,{key}) for lang in loc},'sources':{lang:loc_sources[lang].get(key) for lang in loc}}
    parsed={}; sprites={}; inline_errors=[]; inline_uses=collections.defaultdict(set)
    def expand_inline(text,origin,stack=()):
        nodes=parse(text)
        replacements=[]
        for n in walk(nodes):
            if n['k']!='inline_script': continue
            v=n['v']; key=v if isinstance(v,str) else first(v,'script')
            if not isinstance(key,str): continue
            path='common/inline_scripts/'+key.lower()+'.txt'
            if path not in files or path in stack:
                inline_errors.append({'source':origin,'template':path,'reason':'missing' if path not in files else 'cycle'}); continue
            template=files[path][0].decode('utf-8-sig',errors='replace')
            if isinstance(v,list):
                for param in v:
                    if param['k']=='script': continue
                    value=param['v']
                    if isinstance(value,list): value='{ '+' '.join(raw(x,text) for x in value)+' }'
                    template=template.replace('$'+param['k']+'$',value)
            inline_uses[origin].add(files[path][1])
            template=expand_inline(template,origin,stack+(path,))
            replacements.append((n['s'],n['e'],template))
        for start,end,replacement in reversed(replacements): text=text[:start]+replacement+text[end:]
        return text
    for name,(data,origin) in files.items():
        if name.endswith('.yml'): continue
        text=data.decode('utf-8-sig',errors='replace')
        try:
            if name.startswith(NARRATIVE): text=expand_inline(text,origin)
            nodes=parse(text); parsed[name]=(nodes,text,origin)
        except ValueError as e: errors.append({'source':origin,'error':str(e)}); continue
        if name.endswith('.gfx'):
            for n in walk(nodes):
                if n['k'].lower()=='spritetype' and isinstance(n['v'],list):
                    v=n['v']; key=first(v,'name')
                    if key: sprites[key]={'texture':first(v,'texturefile'),'parent':first(v,'parent')}
    images={}; image_errors=[]
    def picture(key):
        if not key or not isinstance(key,str): return None
        if key in images: return images[key]
        cursor=key; seen=set(); path=''
        while cursor in sprites and cursor not in seen:
            seen.add(cursor); sprite=sprites[cursor]; path=sprite['texture']
            if path: break
            cursor=sprite['parent']
        path=path.replace('\\','/').lower()
        if not path and key.lower() in assets: path=key.lower()
        if path not in assets:
            images[key]=None; image_errors.append({'key':key,'path':path,'error':'unresolved sprite'}); return None
        data,origin=assets[path]
        try:
            buf=data.read_bytes() if isinstance(data,Path) else data
            slug=hashlib.sha256(buf).hexdigest()[:20]; dest=ROOT/'public/art'/f'{slug}.webp'; dest.parent.mkdir(parents=True,exist_ok=True)
            if not dest.exists():
                im=Image.open(io.BytesIO(buf)); im.thumbnail((1600,1000)); im.convert('RGB').save(dest,'WEBP',quality=87)
            result={'url':f'art/{slug}.webp','source':origin,'sprite':key,'sha256':hashlib.sha256(buf).hexdigest()}; images[key]=result; return result
        except Exception as e:
            images[key]=None; image_errors.append({'key':key,'path':path,'error':str(e)}); return None
    def texts(nodes,k,text=''):
        result=[]
        for v in vals(nodes,k):
            if isinstance(v,str): result.append({**localized(v),'condition':''})
            else:
                found=[n for n in walk(v) if n['k']=='text' and isinstance(n['v'],str)]
                for n in found: result.append({**localized(n['v']),'condition':'\n'.join(raw(x,text) for x in v if x['k']!='text') if text else ''})
        return result
    def links(nodes,text):
        out=[]
        def visit(items,conditions):
            for n in items:
                v=n['v']
                if n['k']=='event' and isinstance(v,str) and re.fullmatch(r'[\w]+\.[\w]+',v):
                    out.append({'target':v,'kind':'stage_event','days':'','random':'','condition':'\n'.join(conditions),'script':raw(n,text)})
                if not isinstance(v,list): continue
                context=conditions
                if n['k'] in ('if','else_if','else','random','random_list','switch','case','on_success','on_fail','on_abort','stage') or n['k'].isdigit():
                    context=conditions+[raw(n,text)]
                if (n['k']=='event' or n['k'].endswith('_event')) and isinstance(first(v,'id'),str) and first(v,'id'):
                    out.append({'target':first(v,'id'),'kind':n['k'],'days':first(v,'days'),'random':first(v,'random'),'condition':'\n'.join(context),'script':raw(n,text)})
                reference={'enable_special_project':('special_projects','name'),'create_archaeological_site':('archaeological_site_types','type'),'create_situation':('situations','type'),'begin_event_chain':('event_chains','event_chain')}.get(n['k'])
                if reference and isinstance(first(v,reference[1]),str) and first(v,reference[1]):
                    out.append({'target':reference[0]+':'+first(v,reference[1]),'kind':n['k'],'days':'','random':'','condition':'\n'.join(context),'script':raw(n,text)})
                visit(v,context)
        visit(nodes,[])
        return out
    records=[]; groups=[]; duplicate_ids=[]; ids=set()
    for name,(nodes,text,origin) in parsed.items():
        if not name.startswith(NARRATIVE): continue
        group=re.sub(r'[^a-z0-9_-]','-',name.removesuffix('.txt'))
        group_records=[]
        for n in nodes:
            v=n['v']
            if not isinstance(v,list): continue
            event=name.startswith('events/') and (n['k']=='event' or n['k'].endswith('_event'))
            if name.startswith('events/') and not event: continue
            if not event and (n['k'].startswith('@') or not n['k']): continue
            rid=first(v,'id') if event else first(v,'key',n['k'])
            if not isinstance(rid,str) or not rid: continue
            uid=rid if event else name.split('/')[1]+':'+rid
            if uid in ids: duplicate_ids.append({'id':uid,'source':origin}); uid=uid+'@'+group+'-'+str(n['s'])
            ids.add(uid)
            title_key=first(v,'name',rid) if isinstance(first(v,'name',rid),str) else rid
            if name.startswith('common/event_chains/') and rid+'_title' in loc['en']: title_key=rid+'_title'
            titles=texts(v,'title',text) if event else [{**localized(title_key),'condition':''}]
            if not titles: titles=[{**localized(rid+'.name' if rid+'.name' in loc['en'] else ''),'condition':''}]
            descriptions=texts(v,'desc',text)
            if not descriptions and not event:
                desc_key=next((rid+suffix for suffix in ('_desc','_DESC') if rid+suffix in loc['en'] or rid+suffix in loc['zh']),'')
                descriptions=[{**localized(desc_key),'condition':''}] if desc_key else []
            options=[]
            for opt in vals(v,'option'):
                if not isinstance(opt,list): continue
                key=first(opt,'name'); opts=texts(opt,'name',text); options.append({'label':localized(key) if isinstance(key,str) else (opts[0] if opts else localized('')),'conditions':'\n'.join(raw(x,text) for x in opt if x['k'] in ('trigger','allow','exclusive_trigger')),'links':links(opt,text),'script':'\n'.join(raw(x,text) for x in opt),'tooltips':[localized(x['v']) for x in walk(opt) if x['k']=='custom_tooltip' and isinstance(x['v'],str)]})
            # Retain stage/approach text in non-event narrative definitions, alongside exact source.
            sections=[]
            if not event:
                for child in walk(v):
                    if child['k'] in ('title','desc','text','name','tooltip') and isinstance(child['v'],str):
                        localized_child=localized(child['v'])
                        if localized_child['zh'] or localized_child['en']: sections.append(localized_child)
            pics=[]
            for value in vals(v,'picture'):
                if isinstance(value,str): pics.append(value)
                else: pics.extend(x['v'] for x in walk(value) if x['k'] in ('picture','sprite') and isinstance(x['v'],str))
            art=next((p for key in pics if (p:=picture(key))),None)
            record={'id':uid,'eventId':rid,'kind':n['k'] if event else name.split('/')[1],'group':group,'source':origin,'line':text.count('\n',0,n['s'])+1,'lineSpace':'expanded' if inline_uses[origin] else 'original','inlineSources':sorted(inline_uses[origin]),'titles':titles,'descriptions':descriptions,'sections':sections,'options':options,'links':links(v,text),'picture':art,'pictureKeys':pics,'hidden':first(v,'hide_window')=='yes','trigger':'\n'.join(raw(x,text) for x in v if x['k'] in ('trigger','mean_time_to_happen','is_triggered_only','fire_only_once')),'script':raw(n,text)}
            group_records.append(record); records.append(record)
        if group_records:
            dump(ROOT/'public/data/groups'/f'{group}.json',group_records)
            groups.append({'id':group,'source':origin,'count':len(group_records)})
    def category(r):
        s=(r['source']+' '+r['id']).lower()
        for cat,patterns in [('crisis',['crisis','gray_goo','war_in_heaven','storm']),('origins',['origin','gateway']),('precursors',['precursor','ancient_relic','archaeolog']),('rifts',['astral','rifts']),('leviathans',['leviathan','guardian','enclave']),('exploration',['anomaly','distant','horizon','special_project']),('society',['situation','colony','faction','diplom','first_contact'])]:
            if any(p in s for p in patterns): return cat
        return 'stories'
    index=[]
    for r in records:
        title=r['titles'][0] if r['titles'] else localized(r['id'])
        desc=r['descriptions'][0] if r['descriptions'] else localized('')
        index.append({'id':r['id'],'group':r['group'],'category':category(r),'kind':r['kind'],'zh':title['zh'] or title['key'] or r['id'],'en':title['en'] or title['key'] or r['id'],'excerpt':{lang:desc[lang][:220] for lang in loc},'image':r['picture']['url'] if r['picture'] else None,'hidden':r['hidden'],'options':len(r['options']),'links':len(r['links']),'hasText':bool(desc['zh'] or desc['en'] or r['sections'])})
    unresolved=[{'from':r['id'],'target':l['target']} for r in records for l in r['links'] if l['target'] not in ids]
    missing={lang:sorted({t['key'] for r in records for t in r['titles']+r['descriptions']+[o['label'] for o in r['options']] if t['key'] and not t[lang] and not t['sources'][lang]}) for lang in loc}
    version=json.loads((game/'launcher-settings.json').read_text(encoding='utf-8-sig'))['version']
    report={'version':version,'records':len(records),'events':sum(r['kind']=='event' or r['kind'].endswith('_event') for r in records),'readable':sum(i['hasText'] and not i['hidden'] for i in index),'groups':len(groups),'sources':len(sources),'localizationKeys':{k:len(v) for k,v in loc.items()},'archives':archives,'parseErrors':errors,'inlineErrors':inline_errors,'overrides':overrides,'duplicateIds':duplicate_ids,'unresolvedLinks':unresolved,'missingLocalization':missing,'imageCount':sum(v is not None for v in images.values()),'imageErrors':image_errors,'scope':'Installed base game and every local DLC ZIP; Workshop mods and save-state are not included.'}
    dump(ROOT/'public/data/index.json',{'version':version,'records':index,'groups':groups,'counts':dict(collections.Counter(i['category'] for i in index))})
    dump(ROOT/'public/data/coverage.json',report); dump(ROOT/'public/data/sources.json',sources); dump(ROOT/'public/data/art-sources.json',images)
    print(json.dumps({k:v for k,v in report.items() if k not in ('archives','overrides','unresolvedLinks','missingLocalization','imageErrors','duplicateIds')},ensure_ascii=False,indent=2))
    print('Duplicate IDs:',len(duplicate_ids))
    print('Missing localization:',{k:len(v) for k,v in missing.items()},'Unresolved links:',len(unresolved),'Image errors:',len(image_errors))

if __name__=='__main__':
    ap=argparse.ArgumentParser(); ap.add_argument('--game',type=Path,required=True); args=ap.parse_args(); import_game(args.game)
