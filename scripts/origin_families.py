"""Origin identities and exclusive event membership; no invented narrative text."""
import json
from pathlib import Path
from extract import parse,first

def build_origin_families(root,records):
    rules=json.loads((root/'content/origin-families.json').read_text(encoding='utf8'))
    all_origins=json.loads((root/'public/data/origins.json').read_text(encoding='utf8'))
    aliases=rules['aliases']
    origins=[o for o in all_origins if o['source'].endswith('/00_origins.txt') and o['id'] not in aliases]
    valid={o['id'] for o in origins}
    def positive(nodes):
        keys=set()
        for n in nodes:
            if n['k'].lower() in ('not','nor'):continue
            if n['k']=='has_origin' and isinstance(n['v'],str):keys.add(aliases.get(n['v'],n['v']))
            elif isinstance(n['v'],list):keys.update(positive(n['v']))
        return keys&valid
    assigned={};evidence={}
    for r in records:
        choices=[]
        for oid,sources in rules['sources'].items():
            if any(r['source'].endswith(s) for s in sources):choices.append(oid)
        for oid,ns,low,high,source in rules['ranges']:
            eid=r['eventId'].split('.')
            if r['source'].endswith(source) and len(eid)==2 and eid[0]==ns and eid[1].isdigit() and low<=int(eid[1])<=high:choices.append(oid)
        if choices: assigned[r['id']]=choices[0];evidence[r['id']]='source range';continue
        # Only eligibility is an exclusive seed. An origin-specific option in a
        # generic anomaly is not evidence that the whole anomaly belongs to it.
        keys=positive(parse(r['trigger']))
        if len(keys)==1 and not any(x in r['source'] for x in ('game_start','on_action','tutorial','timeline','crisis')):
            assigned[r['id']]=next(iter(keys));evidence[r['id']]='positive origin trigger'
    result=[]
    for o in origins:
        result.append({'id':o['id'],'title':{l:o['title'][l] for l in ('zh','en')},'category':'origins','members':[k for k,v in assigned.items() if v==o['id']],'origin':o})
    return result,evidence
