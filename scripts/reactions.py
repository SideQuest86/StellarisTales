"""Compile source conditions into prose views; never send expressions to readers.

This is symbolic compatibility, not a save-game simulation. Unlabelled state
branches remain numbered readings. Exclusive option branches suppress defaults.
"""
import hashlib,json,re
from extract import parse,first

ALIASES={'is_materialist':'ethic_materialist','is_spiritualist':'ethic_spiritualist','is_xenophile':'ethic_xenophile','is_xenophobe':'ethic_xenophobe','is_militarist':'ethic_militarist','is_pacifist':'ethic_pacifist','is_egalitarian':'ethic_egalitarian','is_authoritarian':'ethic_authoritarian','is_gestalt':'ethic_gestalt_consciousness','is_hive_empire':'auth_hive_mind','is_machine_empire':'auth_machine_intelligence'}
ALIASES.update({'is_fanatic_'+k:'ethic_fanatic_'+k for k in ('materialist','spiritualist','xenophile','xenophobe','militarist','pacifist','egalitarian','authoritarian')})
ALIASES['is_fanatic']='identity_fanatic'
SPECIAL={'is_individual_machine':{'zh':'个体机械','en':'Individual machines'},'ai_outlawed':{'zh':'取缔人工智能','en':'AI outlawed'}}
SCOPES={'trigger','allow','exclusive_trigger','owner','root','from','prev','controller','species','leader','capital_scope','planet','country','hidden_trigger','custom_tooltip','tooltip','and','limit'}

def compatible(a,b):
    if any(k in a and a[k]!=v for k,v in b.items()):return False
    scopes={k.rsplit('|',1)[0] if '|' in k else '' for k in a|b}
    return all(identity_compatible({k.rsplit('|',1)[-1] for k,v in (a|b).items() if v and (k.rsplit('|',1)[0] if '|' in k else '')==scope}) for scope in scopes)

def identity_compatible(positive):
    for prefix in ('origin_','auth_'):
        if sum(k.startswith(prefix) for k in positive)>1:return False
    for x,y in [('materialist','spiritualist'),('xenophile','xenophobe'),('militarist','pacifist'),('egalitarian','authoritarian')]:
        if any('ethic_'+p+x in positive for p in ('','fanatic_')) and any('ethic_'+p+y in positive for p in ('','fanatic_')):return False
    return True

def combine(left,right):
    out=[]
    for a in left:
        for b in right:
            if compatible(a,b):
                c=a|b
                if c not in out:out.append(c)
                if len(out)>=64:return out
    return out

def expression(nodes,negative=False,mode='and',scope=''):
    if negative:mode='or' if mode=='and' else 'and'
    result=[] if mode=='or' else [{}]
    for n in nodes:
        k=n['k'].lower();v=n['v']
        if k in ('text','fail_text','success_text'):continue
        if isinstance(v,list):
            if k in ('not','nor','nand'):terms=expression(v,not negative,'and' if k in ('not','nand') else 'or',scope)
            elif k=='or':terms=expression(v,negative,'or',scope)
            else:terms=expression(v,negative,scope=scope if k in SCOPES else scope+'/'+k)
        else:
            if k=='always':
                terms=[{}] if (v=='yes')!=negative else []
                result=(result+terms)[:64] if mode=='or' else combine(result,terms)
                continue
            if k in ALIASES:atom=ALIASES[k]
            elif k=='is_individual_machine':atom=k
            elif isinstance(v,str) and (v.startswith(('ethic_','origin_','civic_','auth_')) or v in SPECIAL):atom=v
            else:atom=hashlib.sha256((scope+k+str(v if v not in ('yes','no') else '')+n.get('op','=')).encode()).hexdigest()[:16]
            if scope and (k in ALIASES or atom==k or atom==v):atom=scope+'|'+atom
            truth=v!='no'
            if n.get('op')=='!=':truth=not truth
            terms=[{atom:truth!=negative}]
            if truth!=negative and atom.rsplit('|',1)[-1].startswith('ethic_fanatic_'):
                prefix=atom.rsplit('|',1)[0]+'|' if '|' in atom else ''
                terms[0][prefix+'identity_fanatic']=True
                terms[0][atom.replace('ethic_fanatic_','ethic_')]=True
        result=(result+terms)[:64] if mode=='or' else combine(result,terms)
    return result

def passages(r,descriptions):
    """Preserve composed common text + conditional suffix, not just alternatives."""
    lookup={d['key']:i for i,d in enumerate(descriptions)}
    def product(a,b):
        return [(x|y,tx+ty) for x,tx in a for y,ty in b if compatible(x,y)][:96]
    def expand(nodes):
        result=[({},[])];previous=[]
        for n in nodes:
            k=n['k'];v=n['v']
            if k=='text' and isinstance(v,str):
                if v in lookup:result=[(state,indices+[lookup[v]]) for state,indices in result]
            elif k in ('if','else_if','else') and isinstance(v,list):
                own=first(v,'limit',[])
                guard=expression(own) if k!='else' else [{}]
                for prior in previous:
                    guard=combine(guard,expression(prior,True))
                if k=='if':
                    previous=[];guard=expression(own)
                    branches=product([(s,[]) for s in guard],expand([x for x in v if x['k']!='limit']))
                    # Store the chain; append after else/else_if is collected.
                    chain=branches;chain_base=result;previous=[own]
                    result=product(chain_base,chain+[(s,[]) for s in expression(own,True)])
                else:
                    chain+=product([(s,[]) for s in guard],expand([x for x in v if x['k']!='limit']))
                    if k=='else':result=product(chain_base,chain)
                    else:
                        previous.append(own);remaining=[{}]
                        for prior in previous:remaining=combine(remaining,expression(prior,True))
                        result=product(chain_base,chain+[(s,[]) for s in remaining])
            elif k=='trigger' and isinstance(v,list):
                if any(x['k'] in ('text','if','else','else_if') for x in v):result=product(result,expand(v))
                else:result=product(result,[(s,[]) for s in expression(v)])
            elif k=='switch' and isinstance(v,list):
                trigger=first(v,'trigger');branches=[];guards=[]
                for case in v:
                    if not isinstance(case['v'],list):continue
                    if case['k']=='default':
                        guard=[{}]
                        for test in guards:guard=combine(guard,expression(test,True))
                    else:
                        test=[{'k':trigger,'v':case['k']}];guards.append(test);guard=expression(test)
                    branches+=product([(s,[]) for s in guard],expand(case['v']))
                result=product(result,branches)
        return result
    out=[]
    for event in parse(r['script']):
        if not isinstance(event['v'],list):continue
        for n in event['v']:
            if n['k']!='desc':continue
            if isinstance(n['v'],str):
                if n['v'] in lookup:out.append(({},[lookup[n['v']]]))
            else:out.extend(expand(n['v']))
    return [(s,indices) for s,indices in out if indices] or [({},list(range(len(descriptions))))]

class Reactions:
    def __init__(self,root):self.labels=json.loads((root/'public/data/reaction-labels.json').read_text(encoding='utf8'))
    def label(self,state,fallback):
        found=[]
        for k,v in state.items():
            if not v:continue
            k=k.rsplit('|',1)[-1]
            label=SPECIAL.get(k) or self.labels.get(k)
            if label and (k in SPECIAL or k.startswith(('origin_','ethic_','civic_','auth_'))):found.append(label)
        if not found:return fallback
        return {l:' · '.join(re.sub(r'§.','',x.get(l,'') or x.get('en','')) for x in found[:3]) for l in ('zh','en')}
    def compile(self,r):
        descriptions=[d for d in r['descriptions'] if d['zh'] or d['en']];options=r['options']
        if len(descriptions)<2 and not any(o['conditions'] for o in options):return []
        ds=passages(r,descriptions)
        option_nodes=[[n for n in parse(o['conditions']) if n['k']!='allow'] for o in options]
        os=[expression(nodes) if nodes else [{}] for nodes in option_nodes]
        views=[]
        for state,indices_text in ds:
            for state in [state]:
                candidates=[state]
                for j,o in enumerate(options):
                    if option_nodes[j]:
                        for option_state in os[j]:
                            if compatible(state,option_state) and state|option_state not in candidates:candidates.append(state|option_state)
                        if 'exclusive_trigger' in o['conditions']:
                            for opposite in expression(option_nodes[j],True):
                                if compatible(state,opposite) and state|opposite not in candidates:candidates.append(state|opposite)
                for candidate in candidates:
                    indices=[]
                    for j,o in enumerate(options):
                        if not option_nodes[j]:indices.append(j);continue
                        # Require the selected reading to establish every option
                        # atom; unknown eligibility is a separate reading.
                        if any(all(k in candidate and candidate[k]==v for k,v in branch.items()) for branch in os[j]):indices.append(j)
                    exclusive=[j for j in indices if 'exclusive_trigger' in options[j]['conditions']]
                    if exclusive:indices=exclusive
                    fallback={'zh':'其他文明' if any(not v and k.startswith(('origin_','ethic_','civic_','auth_')) for k,v in candidate.items()) else '通常','en':'Other civilizations' if any(not v and k.startswith(('origin_','ethic_','civic_','auth_')) for k,v in candidate.items()) else 'Default'}
                    label=self.label(candidate,fallback)
                    item={'label':label,'textIndices':indices_text,'choiceIndices':indices}
                    if not any(v['textIndices']==item['textIndices'] and v['choiceIndices']==indices and v['label']==label for v in views):views.append(item)
        # Mechanical-only differences with identical prose and destinations
        # share a reading; retain all source option indices for traceability.
        unique={}
        for view in views:
            signatures=sorted(set(json.dumps({'label':options[j]['label']['zh'],'targets':[e['target'] for e in options[j]['links']]},sort_keys=True) for j in view['choiceIndices']))
            key=json.dumps([view['label'],view['textIndices'],signatures],sort_keys=True)
            if key in unique:unique[key]['choiceIndices']=sorted(set(unique[key]['choiceIndices']+view['choiceIndices']))
            else:unique[key]=view
        views=list(unique.values())
        # Distinguish alternative passages that are selected by story state or
        # random dialogue rather than an identifiable civilization trait.
        counts={}
        for view in views:
            key=view['label']['zh'];counts[key]=counts.get(key,0)+1
        numbered={}
        for view in views:
            key=view['label']['zh']
            if counts[key]>1:
                numbered[key]=numbered.get(key,0)+1
                view['label']={l:(('读法' if l=='zh' else 'Reading') if key=='通常' else view['label'][l])+' '+str(numbered[key]) for l in ('zh','en')}
        return views
