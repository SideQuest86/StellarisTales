"""Who fires a record and what it fires, with structural context: `python scripts/callers.py <record-id> [...]`.

Reads public/data/source-graph.json (whole-game call graph). Context shows option / immediate / after / stage hooks,
if-limits, random weights and delays. Callers that are not narrative records (on_actions, decisions, technologies,
relics, initializers…) are the record's triggers. Developer review tool.
"""
import json, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
graph = json.loads((ROOT / 'public/data/source-graph.json').read_text(encoding='utf-8'))


def context(path):
    out = []
    for p in path:
        k = p['k']
        if k == 'option':
            out.append(f"option[{p.get('index')}]={p.get('key')}")
        elif k in ('random_list', 'random_events', 'anomaly_outcome') and 'weight' in p:
            out.append(f"{k} {p['weight']:g}/{p.get('total', 0):g}" + (' (modified)' if p.get('modified') or p.get('modifiers') else ''))
        elif k in ('if', 'else_if'):
            out.append(f"{k}({' '.join(p.get('limit', '').split())[:140]})")
        elif k == 'effect' and p.get('name'):
            out.append(f"via effect {p['name']}")
        elif k == 'stage':
            out.append(f"stage {p.get('name', '')}")
        else:
            out.append(k)
    return ' > '.join(out)


for rid in sys.argv[1:]:
    d = graph['definitions'].get(rid, {})
    print(f"=== {rid}  {d.get('file', '?')}:{d.get('line', '?')}  " + ' '.join(f'{k}={v}' for k, v in d.items() if k not in ('file', 'line')))
    print('  called by:')
    for i in graph['callers'].get(rid, []):
        c = graph['calls'][i]
        delay = ' delay=' + json.dumps(c['delay']) if c.get('delay') else ''
        print(f"    {c['from']}  [{c['via']}] {context(c['path'])}{delay}   @{c['file']}:{c['line']}")
    print('  calls:')
    for c in graph['calls']:
        if c['from'] == rid and c['via'] != 'scripted_effect':
            delay = ' delay=' + json.dumps(c['delay']) if c.get('delay') else ''
            print(f"    -> {c['to']}  [{c['via']}] {context(c['path'])}{delay}   @{c['file']}:{c['line']}")
