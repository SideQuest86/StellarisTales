"""Source-reviewed chronology, separate from the lossless reference graph.

The source review and family-specific facts live in content/chronology/.
Parallel investigations and exclusive outcomes must never become DFS reading edges.
"""
import json
from pathlib import Path
from graph_layout import graph_positions

ROOT = Path(__file__).resolve().parents[1]
NODE_LABELS = json.loads((ROOT/'content/chronology/node-labels.json').read_text(encoding='utf-8-sig'))
PRECURSORS = {p['id']: p for p in json.loads((ROOT/'content/chronology/precursors.json').read_text(encoding='utf-8-sig'))}
SITUATIONS = json.loads((ROOT/'content/chronology/situations.json').read_text(encoding='utf-8-sig'))
ENDINGS = json.loads((ROOT/'content/chronology/endings.json').read_text(encoding='utf-8-sig'))

def label(zh, en): return {'zh': zh, 'en': en}

def precursor_flow(dossier, config):
    base = config['base']
    event = lambda n: f'precursor.{base+n}'
    project = lambda suffix: 'special_projects:'+config['project']+'_'+suffix
    investigations = [[event(i*5), project(f'ARCHEOLOGY_{i}'), event(i*5+1)] for i in range(1, config['investigations']+1)]
    intro = config.get('intro', event(0))
    stages = [
        {'id':'discovery','title':label('最初的痕迹','First traces'),'mode':'sequence','lanes':[[intro]]},
        {'id':'investigation','title':label('追寻遗迹','Following the traces'),'mode':'parallel','required':6,'lanes':investigations,
         'note':config.get('investigationNote',label('调查地点没有固定先后；收集六份线索后，可定位母星。','Investigations may occur in any order. Six clues reveal the home system.'))},
        {'id':'homeworld','title':label('失落的母星','The lost homeworld'),'mode':'sequence','lanes':[[event(100),project('HOMEWORLD_PROJECT')]],**({'note':config['homeworldNote']} if 'homeworldNote' in config else {})},
        {'id':'arrival','title':label('抵达之后','On arrival'),'mode':'alternative','lanes':[[event(101)],[event(102)]],
         'labels':config.get('arrivalLabels',[label('率先发现','First to arrive'),label('他人已经先至','Others arrived first')]),
         'note':config.get('arrivalNote',label('这两种结果互为替代，不会依次发生。','These are alternative outcomes, not consecutive events.'))},
        {'id':'secrets','title':label('往昔的秘密','Secrets of the past'),'mode':'sequence','optional':True,
         'lanes':[['special_projects:'+config['secrets'],config['secretEvent']]],
         'note':config.get('secretNote',label('母星调查完成后，可进一步研究先驱者遗产。','After investigating the homeworld, its legacy can be researched further.'))},
    ]
    if 'secretBranches' in config:
        nodes=[project('SECRETS'),config['secretEvent']]+config['secretBranches']
        stages[-1].update(mode='graph',nodes=nodes,entry=nodes[0],lanes=[[key] for key in nodes],note=config['secretNote'])
    flow=finish_flow(dossier, stages, 'precursor-investigation', 'content/chronology/REVIEW.md')
    if 'investigationLabels' in config:
        if len(config['investigationLabels'])!=len(investigations):raise ValueError('Reviewed investigation labels must cover every report')
        flow['nodeLabels']={lane[-1]:title for lane,title in zip(investigations,config['investigationLabels'])}
    return flow

def finish_flow(dossier, stages, template, review):
    chapters = {c['id']:c for c in dossier['chapters'] if not c['hidden']}
    positions = {}; edges = []; ordered = []
    for si, stage in enumerate(stages):
        for li, lane in enumerate(stage['lanes']):
            for ni, key in enumerate(lane):
                if key not in chapters: raise ValueError(f"Reviewed chronology references absent chapter: {key}")
                positions[key] = {'stage':si,'lane':li,'step':ni}
                ordered.append(key)
                if ni: edges.append({'from':lane[ni-1],'to':key,'kind':'sequence'})
        if stage['mode']=='graph':
            internal=[]
            for key in stage['nodes']:
                chapter=chapters[key]
                for choice in chapter['choices']:
                    for edge in choice['next']:
                        if edge['target'] in stage['nodes']:
                            internal.append({'from':key,'to':edge['target'],'kind':'choice','choice':choice['key'],'label':edge.get('label',choice['label'])})
                for edge in chapter['next']:
                    if edge['target'] in stage['nodes']:
                        internal.append({'from':key,'to':edge['target'],'kind':'sequence','label':edge.get('label')})
            layout=graph_positions(stage['nodes'],internal,stage['entry'])
            positions.update({key:{**value,'stage':si} for key,value in layout.items()})
            edges.extend(internal)
        if si:
            previous = stages[si-1]
            for lane in previous['lanes']:
                for following in ([[stage['entry']]] if stage['mode']=='graph' else stage['lanes']):
                    edge = {'from':lane[-1],'to':following[0],'kind':'alternative' if stage['mode']=='alternative' else 'stage'}
                    if previous['mode']=='parallel': edge['requires']={'stage':si-1,'count':previous['required']}
                    edges.append(edge)
    archive = [key for key in chapters if key not in positions]
    if archive:
        for i,key in enumerate(archive):positions[key]={'stage':len(stages),'lane':i,'step':0}
        stages.append({'id':'reference','title':label('附录','Appendix'),'mode':'reference','lanes':[[key] for key in archive]})
    dossier['story']['flow']={'version':1,'template':template,'review':review,'stages':stages,'positions':positions,'edges':edges,'archive':archive}
    # Compatibility index remains a list of every record, never the forward route.
    dossier['story']['navigation']['order']=ordered+archive
    return dossier['story']['flow']

def graph_flow(dossier, records, template):
    chapters={c['id']:c for c in dossier['chapters'] if not c['hidden'] and records[c['id']]['kind']!='event_chains' and not (dossier['story']['id']=='pre-ftl-plague' and c['id']=='situations:situation_pre_ftl_plague')}
    if not chapters:
        return finish_flow(dossier, [], 'reference-only', None)
    edges=[]
    for key,c in chapters.items():
        for choice in c['choices']:
            for edge in choice['next']:
                if edge['target'] in chapters and edge.get('sourceKind')!='begin_event_chain':
                    edges.append({'from':key,'to':edge['target'],'kind':'choice','label':edge.get('label',choice['label']),'condition':edge.get('sourceKind'),'choice':choice.get('key')})
        for edge in c['next']:
            if edge['target'] in chapters and edge.get('sourceKind')!='begin_event_chain':
                edges.append({'from':key,'to':edge['target'],'kind':'sequence','label':edge.get('label'),'condition':edge.get('sourceKind')})
    for edge in edges:
        chapter=chapters[edge['from']]
        candidates=chapter['next']+[e for choice in chapter['choices'] if choice.get('key')==edge.get('choice') for e in choice['next']]
        source=next((e for e in candidates if e['target']==edge['to'] and 'requiresVisited' in e),None)
        if source:
            if any(key not in chapters for key in source['requiresVisited']):raise ValueError('Missing reviewed reading prerequisite')
            edge['requiresVisited']=source['requiresVisited']
    groups=[c['parallelTasks'] for c in SITUATIONS if c['id']==dossier['story']['id'] and 'parallelTasks' in c]
    for group in groups:
        if any(key not in chapters for key in group['tasks']+[group['outcome']]):raise ValueError('Missing reviewed parallel task')
        for task in group['tasks']:
            edges.append({'from':task,'to':group['outcome'],'kind':'sequence','condition':'all_tasks','label':label('四项措施全部完成且仍拥有母星；月度检查成功','All four countermeasures complete and homeworld retained; monthly success check')})
    # Reviewed convergence edges must participate in layout, not be appended afterward.
    # Levels are graph layout, never a substitute for following an actual edge.
    outgoing={key:[] for key in chapters};incoming={key:0 for key in chapters}
    unique={}
    # Different choices may converge on the same event without being the same route.
    for e in edges:unique.setdefault(json.dumps(e,ensure_ascii=False,sort_keys=True),e)
    edges=list(unique.values())
    for e in edges:outgoing[e['from']].append(e['to']);incoming[e['to']]+=1
    start=dossier['story']['start'];roots=[key for key in chapters if not incoming[key]]
    if start not in chapters:
        start=roots[0] if roots else next(iter(chapters))
        dossier['story']['start']=start
    positions=graph_positions(chapters, edges, start)
    stage={'id':'route','title':label('剧情路线','Story paths'),'mode':'graph','lanes':[[key] for key in chapters],'nodes':list(chapters)}
    archive=[c['id'] for c in dossier['chapters'] if not c['hidden'] and c['id'] not in chapters]
    stages=[stage]
    if archive:
        for i,key in enumerate(archive):positions[key]={'stage':1,'lane':i,'step':0}
        stages.append({'id':'reference','title':label('附录','Appendix'),'mode':'reference','lanes':[[key] for key in archive]})
    dossier['story']['flow']={'version':1,'template':template,'stages':stages,'positions':positions,'edges':edges,'archive':archive}
    node_labels=NODE_LABELS.get(dossier['story']['id'],{})
    if any(key not in positions for key in node_labels):raise ValueError('Reviewed graph label has no node: '+dossier['story']['id'])
    if node_labels:dossier['story']['flow']['nodeLabels']=node_labels
    if groups:dossier['story']['flow']['parallelTasks']=groups
    endings={key:{'label':value['label'],'note':value['note']} for key,value in ENDINGS.items() if key in chapters}
    for key in endings:
        if outgoing[key]:raise ValueError('Reviewed ending has outgoing story links: '+key)
    if endings:dossier['story']['flow']['endings']=endings
    hubs={
        'the-shroud':('utopia.3000',label('冷却结束后再次进入虚境','Return after the Shroud cooldown'),label('每次深入虚境只经历其中一种遭遇；契约、成功与失败属于不同支路。','Each visit reveals one encounter; covenants, success and failure follow different paths.')),
        'curators':('leviathans.500',label('再次联络策展人','Contact the Curators again'),label('这里是可重复联络的服务与对话，不是依次发生的全部剧情。','These are repeatable services and conversations, not consecutive events.')),
    }
    if dossier['story']['id'] in hubs:
        target,title,note=hubs[dossier['story']['id']]
        if target in chapters:
            dossier['story']['flow']['hub']={'target':target,'label':title}
            stage['note']=note
    return dossier['story']['flow']

def add_chronology(dossier, records):
    if not dossier['story']['visible']:return
    config = PRECURSORS.get(dossier['story']['id'])
    if config:
        return precursor_flow(dossier, config)
    if dossier['story']['id']=='pre-ftl-ages':
        return finish_flow(dossier, [
            {'id':'ages','title':label('文明的年代','Ages of Civilization'),'mode':'sequence',
             'lanes':[['situations:pre_ftl_tech_progress_situation']+[f'preftl.{n}' for n in range(200,1001,100)]],
             'note':label('按自然科技进步展示年代顺序；观察可以从任一时代开始，战争或启蒙可能改变进程。','Natural technological progression; observation may begin in any age, and war or enlightenment may alter the course.')},
            {'id':'ftl','title':label('走向星海','Reaching the Stars'),'mode':'alternative',
             'lanes':[['preftl.1100','preftl.180'],['preftl.1105']],
             'labels':[label('自行发展','Independent development'),label('接受科技启蒙','Technological enlightenment')],
             'note':label('自行发展与科技启蒙为不同结果；没有观测站时可能直接进入首次联络。','Independent development and enlightenment are alternatives. Without an observation post, first contact may occur directly.')}
        ], 'civilization-ages', 'content/chronology/REVIEW.md')
    kinds={records[c['id']]['kind'] for c in dossier['chapters']}
    if dossier['story']['category']=='rifts':
        return graph_flow(dossier, records, 'astral-choice-graph')
    if 'archaeological_site_types' in kinds and dossier['story']['category']=='precursors':
        return graph_flow(dossier, records, 'excavation-stage-graph')
    if dossier['story']['id'] in ('infinity-machine','curators','horizon-signal'):
        return graph_flow(dossier, records, 'encounter-choices')
    # A reference tree is never a safe fallback for forward reading. Unreviewed
    # families expose source edges only; state-triggered gaps remain explicit.
    return graph_flow(dossier, records, 'source-event-graph')
