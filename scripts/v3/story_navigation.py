"""A spanning reading tree plus original cross-links for each complete dossier.

Unconnected chapters get editorial reading edges, never invented event choices.
"""
def add_navigation(dossier):
    chapters={c['id']:c for c in dossier['chapters'] if not c['hidden']}
    for c in dossier['story'].get('related',[]):chapters.setdefault(c['id'],c)
    tree=[];seen=set();actual=[]
    for c in chapters.values():
        for choice in c.get('choices',[]):
            for edge in choice['next']:
                if edge['target'] in chapters:actual.append({'from':c['id'],'to':edge['target'],'kind':'choice','label':choice['label']})
        for edge in c.get('next',[]):
            if edge['target'] in chapters:actual.append({'from':c['id'],'to':edge['target'],'kind':'event','label':{'zh':'','en':''}})
    adjacency={k:[] for k in chapters}
    for edge in actual:adjacency[edge['from']].append(edge)
    def visit(key,parent=None,depth=0,edge=None):
        if key in seen:return
        seen.add(key);tree.append({'id':key,'parent':parent,'depth':depth,'kind':edge['kind'] if edge else 'reading','label':edge['label'] if edge else {'zh':'','en':''}})
        for following in adjacency[key]:visit(following['to'],key,depth+1,following)
    if dossier['story']['start'] in chapters:visit(dossier['story']['start'])
    for key in chapters:
        if key not in seen:visit(key,tree[-1]['id'] if tree else None,0)
    dossier['story']['navigation']={'order':[n['id'] for n in tree],'tree':tree,'links':actual}
