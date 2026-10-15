import sys,json,glob
sys.path.insert(0,'scripts')
from effects import *
ctx=load_ctx()
want=sys.argv[1:]
def show(es,ind=0,lang='en'):
    for e in es:
        t=e['label'][lang]
        extra=[]
        for k in ('target','duration','hidden','via','source','conditional','chance'):
            if k in e: extra.append(f"{k}={e[k]['en'] if isinstance(e[k],dict) and 'en' in e[k] else e[k]}")
        print('  '*ind+'- ['+e['kind']+'] '+t+('   {'+'; '.join(extra)+'}' if extra else ''))
        if e.get('stats'): print('  '*ind+'    stats:',[s['label']['en']+' '+s['text'] for s in e['stats']][:6])
        show(e.get('effects') or [],ind+1,lang)
for f in sorted(glob.glob('public/data/groups/*.json')):
    for r in json.load(open(f,encoding='utf-8')):
        if r['id'] in want:
            res=describe_record(r,ctx); print('=====',r['id'],r['source'],r['line'])
            if res['doc']:
                for k in ('immediate','after'):
                    if k in res['doc']: print(k.upper()); show(res['doc'][k])
                for s in res['doc'].get('sections',[]): print('SECTION',s['label']['en']); show(s['effects'])
            for i,c in enumerate(res['choices']):
                print('CHOICE',i,r['options'][i]['label'].get('en')); show(c or [])
