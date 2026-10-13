"""Build complete, script-free story dossiers from the extracted source graph.

Original records remain the lossless research layer. Each record belongs to exactly
one dossier; the published reader consumes only this separate narrative schema.
"""
from __future__ import annotations
import collections, hashlib, json, re
from pathlib import Path
from extract import parse, walk, first, dump
from origin_families import build_origin_families
from reactions import Reactions
from story_navigation import add_navigation
from chronology import add_chronology
from situation_routes import apply_situation_routes

ROOT=Path(__file__).resolve().parents[1]
def read(p):return json.loads(p.read_text(encoding='utf-8'))
def write(p,data):
    dump(p,data)
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
    reviewed_openings=read(ROOT/'content/chronology/origin-openings.json')
    reviewed_dialogues=read(ROOT/'content/chronology/dialogues.json')
    reviewed_readings=read(ROOT/'content/chronology/readings.json')
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
        members=[r['id'] for r in records if r['id'] in f.get('members',[]) or any(r['source'].endswith(s) for s in f.get('sources',[])) or any(r['id'].startswith(p) for p in f.get('prefixes',[])) or any(namespace(r)==ran['namespace'] and (not ran.get('source') or r['source'].endswith(ran['source'])) and r['eventId'].split('.')[-1].isdigit() and ran['min']<=int(r['eventId'].split('.')[-1])<=ran['max'] for ran in f.get('ranges',[]))]
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
    flags=collections.defaultdict(lambda: {'set':set(),'has':set()})
    flagkeys={f'{mode}_{scope}_flag' for mode in ('set','has') for scope in ('country','planet','carrier','global','ship')}
    for r in records:
        if system(r) or '.' not in r['eventId']:continue
        for n in walk(parse(r['script'])):
            if n['k'] in flagkeys and isinstance(n['v'],str):
                mode,scope,_=n['k'].split('_')
                flags[(namespace(r),scope,n['v'])][mode].add(r['id'])
    for (ns,scope,flag),uses in flags.items():
        members=uses['set']|uses['has']
        if not uses['set'] or not uses['has']:continue
        if 2<=len(members)<=35 and len(flag)>7:
            families={family[k] for k in members if k in family}
            if len(families)>1:continue
            for writer in sorted(uses['set']):
                for reader in sorted(uses['has']):
                    if writer!=reader:
                        union(writer,reader);relations.append((writer,reader,'flag:'+flag))
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
            def edge(l):return {'target':l['target'],'conditional':bool(l['condition']),'delayed':bool(l['days'] or l.get('months') or l.get('years')),'kind':'stage' if l['kind']=='stage_event' else 'event','sourceKind':l['kind']}
            choice_targets=set()
            for o in r['options']:
                links=[edge(l) for l in o['links'] if l['target'] in byid and not system(byid[l['target']])]
                choice_targets.update(l['target'] for l in links)
                chapter['choices'].append({'key':o['label'].get('key',''),'label':bilingual(o['label']),'conditional':bool(o['conditions']),'next':links,'terminal':bool(re.search(r'(?:finish_astral_rift|destroy_archaeological_site)\s*=\s*yes',o['script']))})
                chapter['choices'][-1]['responses']=[bilingual(t) for t in o.get('responses',[]) if t['zh'] or t['en']]
            chapter['next']=[edge(l) for l in r['links'] if l['target'] in byid and not system(byid[l['target']]) and l['target'] not in choice_targets]
            chapter['readings']=reactions.compile(r)
            if rid in reviewed_readings:
                descriptions=[d for d in r['descriptions'] if d['zh'] or d['en']]
                chapter['readings']=[]
                for profile in reviewed_readings[rid]['profiles']:
                    text_indices=[];choice_indices=[]
                    for key in profile['texts']:
                        matches=[i for i,d in enumerate(descriptions) if d['key']==key]
                        if len(matches)!=1:raise ValueError('Invalid reviewed reading passage '+rid+':'+key)
                        text_indices.append(matches[0])
                    for selector in profile['choices']:
                        key=selector['key'] if isinstance(selector,dict) else selector
                        matches=[i for i,c in enumerate(chapter['choices']) if c['key']==key]
                        if isinstance(selector,dict):
                            if len(matches)!=selector['count'] or not 0<=selector['occurrence']<len(matches):raise ValueError('Invalid reviewed repeated choice '+rid+':'+key)
                            choice_indices.append(matches[selector['occurrence']])
                        else:
                            if len(matches)!=1:raise ValueError('Invalid reviewed reading choice '+rid+':'+key)
                            choice_indices.append(matches[0])
                    chapter['readings'].append({'label':profile['label'],'textIndices':text_indices,'choiceIndices':choice_indices})
                    if 'afterChoice' in profile:chapter['readings'][-1]['afterChoice']=profile['afterChoice']
            if rid in reviewed_dialogues:
                keys=[o['key'] for o in chapter['choices']]
                review=reviewed_dialogues[rid]
                if 'states' in review:
                    if any(key not in keys for options in review['states'].values() for key in options):raise ValueError('Reviewed dialogue state no longer matches source: '+rid)
                    if any(key not in keys for key in review.get('exits',[])):raise ValueError('Missing reviewed dialogue exit: '+rid)
                    if any(state not in review['states'] for state in review['transitions'].values()):raise ValueError('Missing reviewed dialogue state: '+rid)
                    chapter['dialogue']={'states':review['states'],'transitions':review['transitions'],'exits':review.get('exits',[])}
                    for field in ['consumedTopics','edgeRequirements','profileLabel']:
                        if field in review:chapter['dialogue'][field]=review[field]
                    if 'stateOrder' in review:
                        if set(review['stateOrder'])!=set(review['states']) or len(review['stateOrder'])!=len(review['states']):raise ValueError('Invalid reviewed dialogue progression: '+rid)
                        chapter['dialogue']['stateOrder']=review['stateOrder']
                    if 'responseProfiles' in review:
                        chapter['dialogue']['responseProfiles']=[]
                        for profile in review['responseProfiles']:
                            excluded=[]
                            if any(key not in keys for key in profile.get('excludedKeys',[])):raise ValueError('Missing reviewed excluded option: '+rid)
                            excluded.extend(i for i,key in enumerate(keys) if key in profile.get('excludedKeys',[]))
                            for key,occurrence in profile['occurrences'].items():
                                matches=[i for i,k in enumerate(keys) if k==key]
                                if occurrence<0 or occurrence>=len(matches):raise ValueError('Missing reviewed response instance: '+rid)
                                excluded.extend(i for i in matches if i!=matches[occurrence])
                            chapter['dialogue']['responseProfiles'].append({'label':profile['label'],'excluded':excluded})
                else:
                    steps=review['steps']
                    if any(key not in keys for key in steps):raise ValueError('Reviewed dialogue no longer matches source: '+rid)
                    chapter['dialogue']={'steps':[keys.index(key) for key in steps]}
                profiles=reviewed_dialogues[rid].get('labelProfiles',{})
                if 'textProfiles' in review:
                    descriptions=[d for d in r['descriptions'] if d['zh'] or d['en']]
                    chapter['dialogue']['textProfiles']=[]
                    for profile in review['textProfiles']:
                        matches=[i for i,d in enumerate(descriptions) if d['key']==profile['text']]
                        if len(matches)!=1:raise ValueError('Missing reviewed dialogue passage: '+rid)
                        chapter['dialogue']['textProfiles'].append({'label':profile['label'],'textIndex':matches[0],'after':profile['after']})
                for index,option in enumerate(r['options']):
                    variants=option.get('labelVariants',[])
                    if len(variants)>1:
                        if any(v['key'] not in profiles for v in variants):raise ValueError('Unreviewed dialogue label variant: '+rid)
                        chapter['choices'][index]['labelVariants']=[{'label':bilingual(v),'profile':profiles[v['key']]} for v in variants]
                chapter['readings']=[] # These flags describe conversation turns, not civilizations.
            chapters.append(chapter);mapping[rid]=identity
        if f and 'origin' in f:
            openings=[r for r in roots if r['id']!=start] or [r for r in readable if r['id']!=start][:1]
            chapters[0]['next']=[{'target':r['id'],'conditional':False,'delayed':False,'kind':'stage'} for r in openings]
            if identity in reviewed_openings:
                opening=reviewed_openings[identity]
                chapters[0]['next']=[{'target':key,'conditional':True,'delayed':True,'kind':'stage','sourceKind':'reviewed_origin_opening','label':opening.get('labels',{}).get(key,opening['label'])} for key in opening['targets']]
                if any(key not in ids for key in opening['targets']):raise ValueError('Missing origin opening '+identity)
        story_details[identity]={'story':entry,'chapters':chapters}
        stories.append(entry)
    # Flatten only silent routing nodes; retain all visible projects/chapters.
    chapter_map={c['id']:c for d in story_details.values() for c in d['chapters']}
    # `stage` order is an engine sequence, not a menu of simultaneous links.
    for record in records:
        if record['kind']!='archaeological_site_types':continue
        body=parse(record['script'])[0]['v']
        stage_ids=[first(n['v'],'event') for n in body if n['k']=='stage' and isinstance(n['v'],list)]
        stage_ids=[key for key in stage_ids if key in chapter_map]
        if not stage_ids:continue
        definition=chapter_map[record['id']]
        definition['next']=[e for e in definition['next'] if e['target'] not in stage_ids[1:]]
        for previous,following in zip(stage_ids,stage_ids[1:]):
            if not any(e['target']==following for e in chapter_map[previous]['next']):
                chapter_map[previous]['next'].append({'target':following,'conditional':False,'delayed':True,'kind':'stage','sourceKind':'excavation_stage'})
    apply_situation_routes(story_details, byid, chapter_map)
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
    for bridge in read(ROOT/'content/chronology/bridges.json'):
        source=chapter_map[bridge['from']]
        if 'choice' in bridge:
            source=next((c for c in source['choices'] if c.get('key')==bridge['choice']),None)
            if source is None:raise ValueError('Missing reviewed choice '+bridge['choice'])
        if bridge['to'] not in chapter_map:raise ValueError('Missing reviewed bridge target '+bridge['to'])
        if bridge.get('annotate'):
            existing=next((e for e in source['next'] if e['target']==bridge['to']),None)
            if existing is None:raise ValueError('Missing source edge for reviewed annotation '+bridge['to'])
            existing['label']=bridge['label']
            existing['conditional']=bridge.get('conditional',existing.get('conditional',False))
            if 'requiresVisited' in bridge:existing['requiresVisited']=bridge['requiresVisited']
            continue
        if not any(e['target']==bridge['to'] for e in source['next']):
            source['next'].append({'target':bridge['to'],'conditional':bridge.get('conditional',False),'delayed':True,'kind':'event','sourceKind':'reviewed','label':bridge['label'],**({'requiresVisited':bridge['requiresVisited']} if 'requiresVisited' in bridge else {})})
    shared_origins=read(ROOT/'content/origin-families.json').get('shared',{})
    for identity,ids in shared_origins.items():
        d=story_details[identity]
        d['story']['related']=[{'id':rid,'title':chapter_map[rid]['title']} for rid in ids if rid in chapter_map and not chapter_map[rid]['hidden'] and mapping[rid]!=identity]
    for dossier in story_details.values():
        summary_path=ROOT/'public/summaries'/f"{dossier['story']['id']}.md"
        if summary_path.is_file():
            dossier['summary']={'text':summary_path.read_text(encoding='utf-8-sig'),'path':f"summaries/{dossier['story']['id']}.md"}
        for chapter in dossier['chapters']:
            for edges in [chapter['next']]+[c['next'] for c in chapter['choices']]:
                for edge in edges:edge['story']=mapping[edge['target']]
        add_navigation(dossier)
        add_chronology(dossier, byid)
        write(ROOT/'public/stories'/f"{dossier['story']['id']}.json",dossier)
    origin_order={f['id']:i for i,f in enumerate(origin_config)}
    stories.sort(key=lambda s:(not s['visible'],not any(f['id']==s['id'] for f in config),origin_order.get(s['id'],-1),-bool(s['image']),-s['chapters']))
    coverage={'sourceRecords':source_count,'assignedRecords':sum(not k.startswith('origin-intro:') for k in mapping),'originOverviews':len(origin_config),'dossiers':len(stories),'readableDossiers':sum(s['visible'] for s in stories),'chapters':sum(s['chapters'] for s in stories),'largest':sorted([{'id':s['id'],'title':s['title']['zh'],'nodes':s['nodes']} for s in stories],key=lambda s:-s['nodes'])[:20],'crossDossierEdges':sum(e['story']!=d['story']['id'] for d in story_details.values() for c in d['chapters'] for e in c['next']+[e for choice in c['choices'] for e in choice['next']])}
    write(ROOT/'public/data/origin-coverage.json',{'origins':[{'id':f['id'],'title':f['title'],'seedRecords':len(f['members'])-1,'chapters':story_details[f['id']]['story']['chapters'],'nodes':story_details[f['id']]['story']['nodes']} for f in origin_config],'evidence':origin_evidence})
    write(ROOT/'public/stories/index.json',{'version':3,'gameVersion':rawindex['version'],'stories':[{k:v for k,v in s.items() if k not in ('navigation','flow')} for s in stories],'recordToStory':mapping})
    write(ROOT/'public/data/story-coverage.json',coverage)
    # Delete only stale importer-owned JSON outputs in this exact directory.
    output=(ROOT/'public/stories').resolve()
    keep={s['id']+'.json' for s in stories}|{'index.json'}
    for p in output.glob('*.json'):
        if p.name not in keep and p.resolve().parent==output:p.unlink()
    print(json.dumps(coverage,ensure_ascii=False,indent=2))

if __name__=='__main__':compile_stories()
