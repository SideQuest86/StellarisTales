"""Build complete, script-free story dossiers from the extracted source graph.

Original records remain the lossless research layer. Each record belongs to exactly
one dossier; the published reader consumes only this separate narrative schema.
"""
from __future__ import annotations
import collections, hashlib, json, re
from pathlib import Path
from extract import parse, walk, first
from origin_families import build_origin_families
from reactions import Reactions
from story_navigation import add_navigation

ROOT=Path(__file__).resolve().parents[1]
def read(p):return json.loads(p.read_text(encoding='utf-8'))
def write(p,data):
    p.parent.mkdir(parents=True,exist_ok=True)
    p.write_text(json.dumps(data,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
def clean(s):
    text=re.sub(r'§.', '',s or '').strip()
    # Origin descriptions sometimes prepend empire-creation restrictions.
    # Keep those in the lossless source layer, not in the narrative paragraph.
    text=re.sub(r'^(?:警告[：:]|WARNING:)[^\n]*(?:\n+|$)','',text,flags=re.I)
    return text.strip()
def bilingual(t):return {lang:clean(t.get(lang,'')) for lang in ('zh','en')}
def namespace(r):return r['eventId'].split('.')[0] if '.' in r['eventId'] else r['kind']
SYSTEM={'action','observer','achievement','tutorial','notification','timeline','advisor','on_action','daily','monthly'}

def compile_stories():
    reactions=Reactions(ROOT)
    rawindex=read(ROOT/'public/data/index.json'); metas={m['id']:m for m in rawindex['records']}
    records=[r for g in rawindex['groups'] for r in read(ROOT/'public/data/groups'/f"{g['id']}.json")]
    source_count=len(records)
    origin_config,origin_evidence=build_origin_families(ROOT,records)
    for f in origin_config:
        o=f['origin'];rid='origin-intro:'+o['id'];f['members'].append(rid);f['start']=rid
        records.append({'id':rid,'eventId':o['id'],'kind':'origin_intro','source':o['source'],'group':'origin-introductions','script':'','trigger':'','titles':[o['title']],'descriptions':[o['description']],'sections':o['introductions'],'picture':o['picture'],'hidden':False,'options':[],'links':[]})
        metas[rid]={'hasText':True,'category':'origins'}
    byid={r['id']:r for r in records}; parent={r['id']:r['id'] for r in records}
    def find(k):
        while parent[k]!=k:parent[k]=parent[parent[k]];k=parent[k]
        return k
    component_family={}
    def union(a,b):
        a,b=find(a),find(b)
        if a==b:return
        fa,fb=component_family.get(a),component_family.get(b)
        if fa and fb and fa!=fb:return
        parent[b]=a
        if fa or fb:component_family[a]=fa or fb
    def system(r):return namespace(r) in SYSTEM or any(x in r['source'] for x in ('achievement_events','tutorial_events','timeline_events'))
    incoming=collections.Counter(l['target'] for r in records for l in r['links'])
    relations=[]
    # Well-defined story families with chapters activated by game state rather
    # than direct event calls. Kept in editable, source-grounded configuration.
    config=read(ROOT/'content/story-families.json')+origin_config
    family={}
    for f in config:
        members=[r['id'] for r in records if r['id'] in f.get('members',[]) or any(r['source'].endswith(s) for s in f.get('sources',[])) or any(r['id'].startswith(p) for p in f.get('prefixes',[])) or any(namespace(r)==ran['namespace'] and r['eventId'].split('.')[-1].isdigit() and ran['min']<=int(r['eventId'].split('.')[-1])<=ran['max'] for ran in f.get('ranges',[]))]
        for k in members:family[k]=f['id'];component_family[k]=f['id']
        for k in members[1:]:union(members[0],k)
    # Direct references are strongest. Shared dispatchers and generic observer
    # notifications do not fuse unrelated stories into a single giant archive.
    for r in records:
        if system(r):continue
        for link in r['links']:
            # Shared scripted effects may dispatch many independent encounters.
            # Expose those routes without treating a reusable helper as proof
            # that every possible target belongs to the caller's story family.
            if link['kind']=='scripted_effect':continue
            target=byid.get(link['target'])
            if not target or system(target):continue
            if family.get(r['id']) and family.get(target['id']) and family[r['id']]!=family[target['id']]:continue
            if incoming[target['id']]>12:continue
            is_definition=lambda r:r['kind'] in ('archaeological_site_types','astral_rifts','event_chains','special_projects','situations')
            if namespace(r)!=namespace(target) and not (is_definition(r) or is_definition(target)):continue
            union(r['id'],target['id']);relations.append((r['id'],target['id'],'direct'))
    # Within a namespace, rare persistent story flags reconnect branches fired
    # later by triggers. Never join on generic empire/global state or title text.
    flags=collections.defaultdict(set)
    flagkeys={'set_country_flag','has_country_flag','set_planet_flag','has_planet_flag','set_global_flag','has_global_flag','set_ship_flag','has_ship_flag'}
    for r in records:
        if system(r):continue
        for n in walk(parse(r['script'])):
            if n['k'] in flagkeys and isinstance(n['v'],str):flags[(namespace(r),n['v'])].add(r['id'])
    for (ns,flag),members in flags.items():
        if 2<=len(members)<=35 and len(flag)>7:
            families={family[k] for k in members if k in family}
            if len(families)>1:continue
            ordered=sorted(members)
            for k in ordered[1:]:union(ordered[0],k);relations.append((ordered[0],k,'flag:'+flag))
    components=collections.defaultdict(list)
    for r in records:components[find(r['id'])].append(r)
    # Unconnected background-only records are retained in a quiet appendix per
    # source rather than occupying individual story cards.
    final=collections.defaultdict(list)
    for key,rs in components.items():
        readable=any(metas[r['id']]['hasText'] and not r['hidden'] for r in rs)
        if readable:final[key].extend(rs)
        else:final['appendix:'+rs[0]['group']].extend(rs)
    stories=[]; mapping={}; story_details={}; family_config={f['id']:f for f in config}
    for rs in final.values():
        ids={r['id'] for r in rs}
        roots=[r for r in rs if metas[r['id']]['hasText'] and not r['hidden'] and not any(r['id']==l['target'] for other in rs for l in other['links'])]
        readable=[r for r in rs if metas[r['id']]['hasText'] and not r['hidden']]
        candidates=roots or readable or rs
        candidates=[r for r in candidates if any(t.get('zh') or t.get('en') for t in r['titles'])] or [r for r in readable if any(t.get('zh') or t.get('en') for t in r['titles'])] or candidates
        definition=next((r for r in candidates if r['kind'] in ('archaeological_site_types','astral_rifts','event_chains') and any(t.get('zh') for t in r['titles'])),None)
        leader=definition or next((r for r in candidates if r['picture']),candidates[0])
        fids=collections.Counter(family[r['id']] for r in rs if r['id'] in family)
        f=family_config[fids.most_common(1)[0][0]] if fids else None
        identity=f['id'] if f else 'story-'+hashlib.sha256('|'.join(sorted(ids)).encode()).hexdigest()[:16]
        if identity in story_details:identity+='-'+hashlib.sha256('|'.join(sorted(ids)).encode()).hexdigest()[:8]
        start=f.get('start') if f and f.get('start') in ids else leader['id']
        labels=f['title'] if f else bilingual(leader['titles'][0])
        labels={lang:value or ('未命名故事' if lang=='zh' else 'An untitled story') for lang,value in labels.items()}
        counts=collections.Counter(metas[r['id']]['category'] for r in readable or rs)
        category=f['category'] if f else counts.most_common(1)[0][0]
        if category=='origins' and not (f and 'origin' in f):category='stories'
        cover=byid[start]['picture'] or next((r['picture'] for r in rs if r['picture']),None)
        # Preserve source order as the chapter overview, never claim it is a
        # forced chronology: actual choices follow the graph inside this dossier.
        order=[start]+[r['id'] for r in rs if r['id']!=start and r in readable]+[r['id'] for r in rs if r['id']!=start and r not in readable]
        entry={'id':identity,'title':labels,'category':category,'image':cover['url'] if cover else None,'start':start,'chapters':len(readable),'nodes':len(rs),'visible':bool(readable),'excerpt':bilingual(next((d for d in byid[start]['descriptions'] if d['zh'] or d['en']),{'zh':'','en':''}))}
        entry['excerpt']={k:v[:260] for k,v in entry['excerpt'].items()}
        chapters=[]
        for rid in order:
            r=byid[rid]
            # No raw script, paths, IDs-as-labels, trigger expressions or code in
            # narrative payloads. IDs exist only as invisible navigation keys.
            chapter={'id':rid,'title':bilingual(r['titles'][0]),'texts':[bilingual(d) for d in r['descriptions'] if d['zh'] or d['en']],'variants':len(r['descriptions'])>1,'sections':[bilingual(d) for d in r['sections'] if d['zh'] or d['en']],'image':r['picture']['url'] if r['picture'] else None,'hidden':r['hidden'] or not metas[rid]['hasText'],'choices':[],'next':[]}
            def edge(l):return {'target':l['target'],'conditional':bool(l['condition']),'delayed':bool(l['days']),'kind':'stage' if l['kind']=='stage_event' else 'event'}
            choice_targets=set()
            for o in r['options']:
                links=[edge(l) for l in o['links'] if l['target'] in byid and not system(byid[l['target']])]
                choice_targets.update(l['target'] for l in links)
                chapter['choices'].append({'label':bilingual(o['label']),'conditional':bool(o['conditions']),'next':links})
            chapter['next']=[edge(l) for l in r['links'] if l['target'] in byid and not system(byid[l['target']]) and l['target'] not in choice_targets]
            chapter['readings']=reactions.compile(r)
            chapters.append(chapter);mapping[rid]=identity
        if f and 'origin' in f:
            openings=[r for r in roots if r['id']!=start] or [r for r in readable if r['id']!=start][:1]
            chapters[0]['next']=[{'target':r['id'],'conditional':False,'delayed':False,'kind':'stage'} for r in openings]
        story_details[identity]={'story':entry,'chapters':chapters}
        stories.append(entry)
    # Flatten only silent routing nodes; retain all visible projects/chapters.
    chapter_map={c['id']:c for d in story_details.values() for c in d['chapters']}
    def through(edge,seen=frozenset()):
        target=edge['target']
        if target in seen:return []
        c=chapter_map[target]
        if not c['hidden']:return [edge]
        following=c['next']+[e for choice in c['choices'] for e in choice['next']]
        return [resolved for child in following for resolved in through({**child,'conditional':edge['conditional'] or child['conditional'],'delayed':edge['delayed'] or child['delayed']},seen|{target})]
    def resolved(edges):
        unique={}
        for e in edges:
            for target in through(e):unique.setdefault(target['target'],target)
        return list(unique.values())
    # Resolve against the unchanged graph before replacing lists (order invariant).
    replacements=[]
    for d in story_details.values():
        for c in d['chapters']:
            replacements.append((c,resolved(c['next'])))
            for choice in c['choices']:replacements.append((choice,resolved(choice['next'])))
    for node,edges in replacements:node['next']=edges
    shared_origins=read(ROOT/'content/origin-families.json').get('shared',{})
    for identity,ids in shared_origins.items():
        d=story_details[identity]
        d['story']['related']=[{'id':rid,'title':chapter_map[rid]['title']} for rid in ids if rid in chapter_map and not chapter_map[rid]['hidden'] and mapping[rid]!=identity]
    for dossier in story_details.values():
        for chapter in dossier['chapters']:
            for edges in [chapter['next']]+[c['next'] for c in chapter['choices']]:
                for edge in edges:edge['story']=mapping[edge['target']]
        add_navigation(dossier)
        write(ROOT/'public/stories'/f"{dossier['story']['id']}.json",dossier)
    origin_order={f['id']:i for i,f in enumerate(origin_config)}
    stories.sort(key=lambda s:(not s['visible'],not any(f['id']==s['id'] for f in config),origin_order.get(s['id'],-1),-bool(s['image']),-s['chapters']))
    coverage={'sourceRecords':source_count,'assignedRecords':sum(not k.startswith('origin-intro:') for k in mapping),'originOverviews':len(origin_config),'dossiers':len(stories),'readableDossiers':sum(s['visible'] for s in stories),'chapters':sum(s['chapters'] for s in stories),'largest':sorted([{'id':s['id'],'title':s['title']['zh'],'nodes':s['nodes']} for s in stories],key=lambda s:-s['nodes'])[:20],'crossDossierEdges':sum(e['story']!=d['story']['id'] for d in story_details.values() for c in d['chapters'] for e in c['next']+[e for choice in c['choices'] for e in choice['next']])}
    write(ROOT/'public/data/origin-coverage.json',{'origins':[{'id':f['id'],'title':f['title'],'seedRecords':len(f['members'])-1,'chapters':story_details[f['id']]['story']['chapters'],'nodes':story_details[f['id']]['story']['nodes']} for f in origin_config],'evidence':origin_evidence})
    write(ROOT/'public/stories/index.json',{'version':2,'gameVersion':rawindex['version'],'stories':[{k:v for k,v in s.items() if k!='navigation'} for s in stories],'recordToStory':mapping})
    write(ROOT/'public/data/story-coverage.json',coverage)
    # Delete only stale importer-owned JSON outputs in this exact directory.
    output=(ROOT/'public/stories').resolve()
    keep={s['id']+'.json' for s in stories}|{'index.json'}
    for p in output.glob('*.json'):
        if p.name not in keep and p.resolve().parent==output:p.unlink()
    print(json.dumps(coverage,ensure_ascii=False,indent=2))

if __name__=='__main__':compile_stories()
