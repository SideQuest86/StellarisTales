"""Layer a directed narrative graph without forcing cycles into chronology."""
def graph_positions(nodes, edges, start):
    outgoing={key:[] for key in nodes}
    for edge in edges:
        if edge['to'] not in outgoing[edge['from']]:outgoing[edge['from']].append(edge['to'])
    index={};low={};stack=[];active=set();components=[]
    def visit(key):
        index[key]=low[key]=len(index);stack.append(key);active.add(key)
        for target in outgoing[key]:
            if target not in index:
                visit(target);low[key]=min(low[key],low[target])
            elif target in active:low[key]=min(low[key],index[target])
        if low[key]==index[key]:
            component=[]
            while True:
                target=stack.pop();active.remove(target);component.append(target)
                if target==key:break
            components.append(component[::-1])
    for key in nodes:
        if key not in index:visit(key)
    owner={key:i for i,c in enumerate(components) for key in c}
    successors={i:set() for i in range(len(components))};degree={i:0 for i in successors}
    for edge in edges:
        a,b=owner[edge['from']],owner[edge['to']]
        if a!=b and b not in successors[a]:successors[a].add(b);degree[b]+=1
    queue=[i for i in successors if not degree[i]];rank={i:0 for i in queue}
    for i in queue:
        for target in sorted(successors[i]):
            rank[target]=max(rank.get(target,0),rank[i]+1);degree[target]-=1
            if not degree[target]:queue.append(target)
    rows={};positions={}
    for i in sorted(rank,key=lambda i:(rank[i],start not in components[i],i)):
        level=rank[i]
        for key in components[i]:
            row=rows.get(level,0);rows[level]=row+1
            positions[key]={'stage':0,'lane':row,'step':level,'cycle':len(components[i])>1}
    return positions
