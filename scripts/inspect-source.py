import argparse,json
from pathlib import Path
p=argparse.ArgumentParser();p.add_argument('ids',nargs='+');a=p.parse_args()
r=Path(__file__).resolve().parents[1];ix=json.loads((r/'public/data/index.json').read_text(encoding='utf8'));meta={x['id']:x for x in ix['records']};cache={}
for key in a.ids:
 m=meta[key];g=m['group']
 if g not in cache:cache[g]={x['id']:x for x in json.loads((r/'public/data/groups'/f'{g}.json').read_text(encoding='utf8'))}
 rec=cache[g][key];print('\n###',key,rec['source']);print(rec['script'])
