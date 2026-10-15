"""Reproducible read-only Stellaris archive importer. Python 3 + Pillow."""
from __future__ import annotations
import argparse, collections, hashlib, io, json, re, time, zipfile
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
def links(nodes,text):
    out=[]
    def visit(items,conditions):
        for n in items:
            v=n['v']
            scalar_reference={'create_archaeological_site':'archaeological_site_types','begin_event_chain':'event_chains'}.get(n['k'])
            if scalar_reference and isinstance(v,str):
                out.append({'target':scalar_reference+':'+v,'kind':n['k'],'days':'','random':'','condition':'\n'.join(conditions),'script':raw(n,text)})
            if n['k']=='set_next_astral_rift_event' and isinstance(v,str) and re.fullmatch(r'[\w]+\.[\w]+',v):
                out.append({'target':v,'kind':n['k'],'days':'','random':'','condition':'\n'.join(conditions),'script':raw(n,text)})
            if n['k']=='on_roll_failed' and isinstance(v,str) and re.fullmatch(r'[\w]+\.[\w]+',v):
                out.append({'target':v,'kind':'on_roll_failed','days':'','random':'','condition':raw(n,text),'script':raw(n,text)})
            if n['k']=='event' and isinstance(v,str) and re.fullmatch(r'[\w]+\.[\w]+',v):
                out.append({'target':v,'kind':'stage_event','days':'','random':'','condition':'\n'.join(conditions),'script':raw(n,text)})
            # Anomaly categories: `on_success = event`, `N = event` shorthand and `anomaly_event = event`.
            if isinstance(v,str) and re.fullmatch(r'[A-Za-z_]\w*\.\w+',v) and (n['k']=='anomaly_event' or (n['k']=='on_success' and not conditions) or n['k'].replace('.','',1).isdigit()):
                weighted=n['k'].replace('.','',1).isdigit()
                out.append({'target':v,'kind':'weighted_event' if weighted else 'anomaly_outcome','days':'','random':n['k'] if weighted else '','condition':'\n'.join(conditions),'script':raw(n,text)})
            if not isinstance(v,list): continue
            context=conditions
            if n['k'].lower() in ('if','else_if','else','random','random_list','switch','case','on_success','on_fail','on_abort','stage') or n['k'].isdigit():
                context=conditions+[raw(n,text)]
            if (n['k']=='event' or n['k'].endswith('_event')) and isinstance(first(v,'id'),str) and first(v,'id'):
                out.append({'target':first(v,'id'),'kind':n['k'],'days':first(v,'days'),'months':first(v,'months'),'years':first(v,'years'),'random':first(v,'random'),'condition':'\n'.join(context),'script':raw(n,text)})
            reference={'enable_special_project':('special_projects','name'),'create_archaeological_site':('archaeological_site_types','type'),'create_situation':('situations','type'),'start_situation':('situations','type'),'begin_event_chain':('event_chains','event_chain')}.get(n['k'])
            if reference and isinstance(first(v,reference[1]),str) and first(v,reference[1]):
                out.append({'target':reference[0]+':'+first(v,reference[1]),'kind':n['k'],'days':'','random':'','condition':'\n'.join(context),'script':raw(n,text)})
            visit(v,context)
    visit(nodes,[])
    return out

def dump(path,obj):
    path.parent.mkdir(parents=True,exist_ok=True)
    temporary = path.with_suffix(path.suffix+'.tmp')
    payload=json.dumps(obj,ensure_ascii=False,separators=(',',':'))
    for attempt in range(6):
        try:
            temporary.write_text(payload,encoding='utf-8')
            temporary.replace(path)
            break
        except OSError as error:
            if error.errno not in (13,22) or attempt == 5:
                raise
            time.sleep(0.1 * (attempt + 1))

NARRATIVE=('events/','common/anomalies/','common/archaeological_site_types/','common/astral_rifts/','common/situations/','common/special_projects/','common/event_chains/')
def relevant(p):
    # All of common/ is parsed for the whole-game call graph (on_actions, decisions, relics, ...).
    return (p.startswith(('events/','common/')) and p.endswith('.txt')) or (p.startswith('interface/') and p.endswith('.gfx')) or (p.startswith(('localisation/english/','localisation/simp_chinese/','localisation_synced/')) and p.endswith('.yml'))

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
            # Keep the caller's line numbering: the template is flattened (comments removed) onto the call's own
            # line, padded with as many newlines as the original call spanned. Parsing ignores line breaks.
            flat=' '.join(re.sub(r'("(?:\\.|[^"\\])*")|#[^\n]*',lambda m:m.group(1) or '',line) for line in template.splitlines())
            replacements.append((n['s'],n['e'],flat+'\n'*text.count('\n',n['s'],n['e'])))
        for start,end,replacement in reversed(replacements): text=text[:start]+replacement+text[end:]
        return text
    for name,(data,origin) in files.items():
        if name.endswith('.yml'): continue
        text=data.decode('utf-8-sig',errors='replace')
        try:
            if name.startswith(('events/','common/')) and not name.startswith('common/inline_scripts/'): text=expand_inline(text,origin)
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
    origins=[]
    for name,(nodes,text,origin) in parsed.items():
        if not name.startswith('common/governments/civics/'): continue
        for n in nodes:
            if not isinstance(n['v'],list) or first(n['v'],'is_origin')!='yes': continue
            origins.append({'id':n['k'],'title':localized(n['k']),'description':localized(n['k']+'_desc'),'picture':picture(first(n['v'],'picture')),'source':origin,'script':raw(n,text),'introductions':[]})
    for name,(nodes,text,origin) in parsed.items():
        if not name.startswith('common/start_screen_messages/'): continue
        for n in nodes:
            if not isinstance(n['v'],list): continue
            keys={x['v'] for x in walk(n['v']) if x['k']=='has_origin' and isinstance(x['v'],str)}
            if len(keys)!=1: continue
            for o in origins:
                if o['id'] in keys:
                    for t in texts(n['v'],'localization',text):
                        if t['zh'] or t['en']: o['introductions'].append(t)
    dump(ROOT/'public/data/origins.json',origins)
    label_keys=set(k for language in loc.values() for k in language if k.startswith(('origin_','ethic_','civic_','auth_','trait_','policy_','tech_')) and not k.endswith(('_desc','_effects','_tooltip')))
    dump(ROOT/'public/data/reaction-labels.json',{k:{l:localized(k)[l] for l in loc} for k in sorted(label_keys)})
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
                options[-1]['responses']=texts(opt,'response_text',text)
                options[-1]['labelVariants']=opts
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
            if event and isinstance(first(v,'base'),str) and first(v,'base'):
                # Event inheritance (`base = other.event`), resolved after every file is read.
                record['_inherit']={'base':first(v,'base'),'title':bool(vals(v,'title')),'picture':bool(pics),'hide':any(x['k']=='hide_window' for x in v),
                                    'clear':sorted({x['k'][:-6] for x in v if x['k'].endswith('_clear') and x['v']=='yes'})}
            group_records.append(record); records.append(record)
        if group_records:
            dump(ROOT/'public/data/groups'/f'{group}.json',group_records)
            groups.append({'id':group,'source':origin,'count':len(group_records)})
    # Event inheritance: an event with `base = X` starts from X (resolved recursively). Its own title, picture and
    # hide_window replace X's; descriptions, options and triggers are X's followed by its own unless the matching
    # `desc_clear` / `option_clear` / `trigger_clear` drops X's. Without this, title-only variants (pirate.2) had no
    # text and variants that add a description lost X's options.
    by_event={r['eventId']:r for r in records if r['kind'].endswith('event')}
    def inherit(r,seen=()):
        info=r.pop('_inherit',None)
        if not info: return r
        base=by_event.get(info['base'])
        if not base or base['id'] in seen or base is r: return r
        base=inherit(base,seen+(r['id'],))
        clear=info['clear']
        if not info['title']: r['titles']=base['titles']
        if not info['picture']: r['picture'],r['pictureKeys']=base['picture'],base['pictureKeys']
        if not info['hide']: r['hidden']=base['hidden']
        if 'desc' not in clear: r['descriptions']=base['descriptions']+r['descriptions']
        inherited_options=[] if 'option' in clear else base['options']
        r['options']=inherited_options+r['options']
        option_scripts={o['script'] for o in base['options']} if 'option' in clear else set()
        r['links']=[l for l in base['links'] if not any(l['script'] in s for s in option_scripts)]+r['links']
        if 'trigger' not in clear and base['trigger']: r['trigger']=(base['trigger']+'\n'+r['trigger']).strip()
        r['base']=base['eventId']
        return r
    for r in records: inherit(r)
    # Follow literal and parameterized scripted-effect calls into event/project
    # references. Keep the original caller and effect provenance in raw data.
    effects={n['k']:(n['v'],text,origin) for name,(nodes,text,origin) in parsed.items() if name.startswith('common/scripted_effects/') for n in nodes if isinstance(n['v'],list)}
    indirect_cache={};indirect_count=0
    def effect_links(script,stack=()):
        found=[]
        if len(stack)>10:return found
        for call in walk(parse(script)):
            if call['k'] not in effects or call['k'] in stack:continue
            v,source,effect_origin=effects[call['k']]
            body='\n'.join(raw(n,source) for n in v)
            if isinstance(call['v'],list):
                for param in call['v']:
                    if isinstance(param['v'],str):body=body.replace('$'+param['k']+'$',param['v'])
            cachekey=(call['k'],body,stack)
            if cachekey not in indirect_cache:
                try:
                    nested=links(parse(body),body)+effect_links(body,stack+(call['k'],))
                    indirect_cache[cachekey]=[{**edge,'via':effect_origin,'kind':'scripted_effect'} for edge in nested if edge['target'] in ids]
                except ValueError:indirect_cache[cachekey]=[]
            found.extend(indirect_cache[cachekey])
        return found
    for r in records:
        for item in [r]+r['options']:
            existing={e['target'] for e in item['links']}
            for edge in effect_links(item['script']):
                if edge['target'] not in existing:
                    item['links'].append(edge);existing.add(edge['target']);indirect_count+=1
    for g in groups:dump(ROOT/'public/data/groups'/f"{g['id']}.json",[r for r in records if r['group']==g['id']])
    from source_graph import Graph
    effect_nodes={n['k']:(n['v'],text,origin) for name,(nodes,text,origin) in parsed.items() if name.startswith('common/scripted_effects/') for n in nodes if isinstance(n['v'],list)}
    graph=Graph(parsed,effect_nodes).build()
    dump(ROOT/'public/data/source-graph.json',graph)
    # Scripted localisation ([X.GetScientistPlural] etc.): ordered conditional original texts. Language-specific
    # grammar helper files for other languages are skipped.
    defined={}
    for name,(nodes,text,origin) in parsed.items():
        if not name.startswith('common/scripted_loc/') or re.search(r'_fr\.txt$|(fr|de|por|ru)loc\.txt$',name):continue
        for n in nodes:
            if n['k']!='defined_text' or not isinstance(n['v'],list):continue
            key=first(n['v'],'name')
            if not isinstance(key,str) or key in defined:continue
            variants=[]
            for t in vals(n['v'],'text'):
                if not isinstance(t,list):continue
                lk=first(t,'localization_key')
                trig=next((x for x in t if x['k']=='trigger'),None)
                variants.append({'key':lk,'zh':loc['zh'].get(lk,''),'en':loc['en'].get(lk,''),'trigger':raw(trig,text) if trig else ''})
            dk=first(n['v'],'default')
            defined[key]={'random':first(n['v'],'random')=='yes','variants':variants,'default':{'key':dk,'zh':loc['zh'].get(dk,''),'en':loc['en'].get(dk,'')} if isinstance(dk,str) and dk else None,'source':origin}
    dump(ROOT/'public/data/scripted-loc.json',defined)
    # Original wording for condition tooltips / names referenced inside narrative scripts.
    tokens={n['v'] for r in records for n in walk(parse(r['script'])) if isinstance(n['v'],str)}
    # Game-concept links inside texts, e.g. ['concept_auth_democratic'] or [concept_x].
    for r in records:
        for t in r['titles']+r['descriptions']+[o['label'] for o in r['options']]+[x for o in r['options'] for x in o.get('responses',[])]:
            for lang in ('zh','en'):
                tokens.update(m.strip("'") for m in re.findall(r"\[('?concept_[^\]\[|]+'?)\]",t.get(lang,'') or ''))
    # $KEY$ references inside those texts and inside the included strings (the game expands them from its own
    # localisation; the story compiler does the same), followed transitively.
    ref=re.compile(r'\$([A-Za-z_][\w.]*)\$')
    texts=[t.get(lang,'') or '' for r in records for t in r['titles']+r['descriptions']+[o['label'] for o in r['options']]+[x for o in r['options'] for x in o.get('responses',[])+o.get('tooltips',[])] for lang in ('zh','en')]
    texts+=[v.get(lang,'') or '' for d in defined.values() for v in d['variants']+([d['default']] if d.get('default') else []) for lang in ('zh','en')]
    # Typed concept links (['trait:trait_x'], ['building:building_x'], ['tradition_category:tradition_x', Label]) in
    # texts and scripted localisation: keep the linked key and the plain name after the type prefix.
    for s in texts:
        for m in re.findall(r"\['([A-Za-z_]+:[^\]'\[|,]+|concept_[^\]'\[|,]+)'",s):
            tokens.update(k for k in (m,m.split(':',1)[-1]) if k in loc['en'] or k in loc['zh'])
    # Concept names (short game terms) can be linked from any text, including origin descriptions: keep them all.
    tokens|={k for lang in loc for k in loc[lang] if k.startswith('concept_') and not k.endswith(('_desc','_tooltip'))}
    found={m for s in texts for m in ref.findall(s)}
    for _ in range(4):
        new={k for k in found if k not in tokens and (k in loc['en'] or k in loc['zh'])}
        if not new:break
        tokens|=new
        found={m for k in new for lang in loc for m in ref.findall(loc[lang].get(k,'') or '')}
    for _ in range(4):
        new={m for k in tokens for lang in loc for m in ref.findall(loc[lang].get(k,'') or '') if (m in loc['en'] or m in loc['zh']) and m not in tokens}
        if not new:break
        tokens|=new
    dump(ROOT/'public/data/script-loc.json',{k:{lang:re.sub(r'§.','',loc[lang].get(k,'')) for lang in loc} for k in sorted(tokens) if k in loc['en'] or k in loc['zh']})
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
    report['scriptedEffectLinks']=indirect_count
    dump(ROOT/'public/data/index.json',{'version':version,'records':index,'groups':groups,'counts':dict(collections.Counter(i['category'] for i in index))})
    dump(ROOT/'public/data/coverage.json',report); dump(ROOT/'public/data/sources.json',sources); dump(ROOT/'public/data/art-sources.json',images)
    print(json.dumps({k:v for k,v in report.items() if k not in ('archives','overrides','unresolvedLinks','missingLocalization','imageErrors','duplicateIds')},ensure_ascii=False,indent=2))
    print('Duplicate IDs:',len(duplicate_ids))
    print('Missing localization:',{k:len(v) for k,v in missing.items()},'Unresolved links:',len(unresolved),'Image errors:',len(image_errors))

if __name__=='__main__':
    ap=argparse.ArgumentParser(); ap.add_argument('--game',type=Path,required=True); args=ap.parse_args(); import_game(args.game)
