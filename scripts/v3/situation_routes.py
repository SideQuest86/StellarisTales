"""Reviewed situation dispatchers: link chosen state to its next progress gate.

Only situations explicitly reviewed in content/chronology/situations.json apply.
This is not global inference from similarly named flags.
"""
import json
from pathlib import Path
from extract import parse,walk,first
ROOT=Path(__file__).resolve().parents[1]
CONFIG=json.loads((ROOT/'content/chronology/situations.json').read_text(encoding='utf-8-sig'))
def apply_situation_routes(details, records, chapters):
 for config in CONFIG:
  dossier=details[config['id']]
  if 'stageSequence' in config:
   definition=chapters[config['definition']]
   sequence=config['stageSequence']
   targets={step['event'] for step in sequence}
   source_targets={edge['target'] for edge in definition['next']}
   if not targets <= source_targets:
    raise ValueError('Reviewed situation stages no longer match source: '+config['definition'])
   # Keep unrelated hooks; remove only the explicitly reviewed stage shortcuts.
   definition['next']=[edge for edge in definition['next'] if edge['target'] not in targets]
   previous=[definition]
   for step in sequence:
    if step['event'] not in chapters:raise ValueError('Missing reviewed situation stage '+step['event'])
    outcome=step.get('outcome',step['event'])
    if outcome!=step['event'] and outcome not in {e['target'] for e in chapters[step['event']]['next']}:
     raise ValueError('Reviewed dispatcher outcome no longer matches source: '+outcome)
    for source in previous:
     source['next'].append({'target':outcome,'conditional':step.get('conditional',False),'delayed':True,'kind':'stage','sourceKind':'reviewed_situation_stage','label':step['label']})
    # Continue from the displayed event, not its hidden dispatcher. Otherwise
    # flattening would turn a later stage into a sibling of the current one.
    previous=(previous if step.get('optional') else [])+[chapters[outcome]]
   continue
  gates=[]
  for gate in config['gates']:
   branches={}
   for node in walk(parse(records[gate['event']]['script'])):
    if node['k']!='switch' or not isinstance(node['v'],list) or first(node['v'],'trigger')!=gate['trigger']:continue
    for branch in node['v']:
     if not isinstance(branch['v'],list):continue
     targets=[first(n['v'],'id') for n in walk(branch['v']) if n['k'].endswith('_event') and isinstance(n['v'],list) and first(n['v'],'id') in chapters]
     if targets:branches[branch['k']]=targets
   gates.append((gate,branches))
  definition=chapters[config['definition']]
  definition['next']=[] # overview text does not execute every future outcome
  for chapter in dossier['chapters']:
   if chapter['hidden'] or chapter['id']==config['definition']:continue
   record=records[chapter['id']];body=parse(record['script'])[0]['v']
   common=[n for n in body if n['k'] in ('immediate','after')]
   chapter['next']=[e for e in chapter['next'] if e['target']!=config['definition']]
   for index,option in enumerate(record['options']):
    choice=chapter['choices'][index];effects=list(walk(common))+list(walk(parse(option['script'])))
    removed={n['v'] for n in effects if n['k']=='remove_country_flag' and isinstance(n['v'],str)}
    for gate,branches in gates:
     states={n['v'] for n in effects if n['k']==gate['setter'] and isinstance(n['v'],str)}-removed
     for state in sorted(states):
      for target in branches.get(state,[]):
       if target==chapter['id'] or any(e['target']==target for e in choice['next']):continue
       choice['next'].append({'target':target,'conditional':True,'delayed':True,'kind':'stage','sourceKind':'reviewed_situation_stage','label':{'zh':f"局势进展至 {gate['progress']}%",'en':f"At {gate['progress']}% situation progress"}})
