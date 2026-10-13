// Forward reading follows game stages; archive completeness is not chronology.
// Loaded edge arrays are immutable. Weak keys let evicted dossiers release indexes.
const outgoingIndexes = new WeakMap();
function outgoing(edges, current) {
  let index=outgoingIndexes.get(edges);
  if(!index){
    index=new Map();
    for(const edge of edges){
      if(!index.has(edge.from))index.set(edge.from,[]);
      index.get(edge.from).push(edge);
    }
    outgoingIndexes.set(edges,index);
  }
  return index.get(current)||[];
}
export function flowTargets(flow, current, visited, route = visited) {
  const taskGroup=flow?.parallelTasks?.find(group=>group.tasks.includes(current));
  if(taskGroup){
    const remaining=taskGroup.tasks.filter(id=>id!==current&&!visited.has(id));
    return remaining.length?remaining:[taskGroup.outcome];
  }
  const position = flow?.positions[current];
  if (!position) return [];
  const stage = flow.stages[position.stage];
  if (stage.mode === 'reference') return [];
  if (stage.mode === 'graph') return [...new Set(outgoing(flow.edges,current).filter(edge=>(edge.requiresVisited||[]).every(id=>route.has(id))).map(edge=>edge.to))];
  const lane = stage.lanes[position.lane];
  if (position.step + 1 < lane.length) return [lane[position.step + 1]];
  if (stage.mode === "parallel") {
    const completed = stage.lanes.filter(branch => visited.has(branch.at(-1))).length;
    if (completed < stage.required) {
      return stage.lanes.filter(branch => !visited.has(branch.at(-1))).map(branch => branch.find(id => !visited.has(id)) || branch[0]);
    }
  }
  const following = flow.stages[position.stage + 1];
  if (following?.mode === 'graph') return [following.entry];
  return following?.mode === 'reference' ? [] : following?.lanes.map(branch => branch[0]) || [];
}

export function flowEdges(flow, current, edges, visited, route = visited) {
  if (!flow) return edges;
  const allowed = new Set(flowTargets(flow, current, visited, route));
  // Explicit original links into the appendix remain usable; the appendix is
  // excluded from automatic next-chapter order, not from real event choices.
  return edges.filter(edge => allowed.has(edge.target) || flow.stages[flow.positions[edge.target]?.stage]?.mode==='reference' || (!flow.positions[edge.target] && edge.story));
}

export function flowProgress(flow, visited) {
  return flow.stages.map(stage => ({
    completed: stage.lanes.filter(lane => visited.has(lane.at(-1))).length,
    required: stage.mode === 'parallel' ? stage.required : ['graph','reference'].includes(stage.mode) ? Math.max(1,stage.lanes.length) : 1,
  }));
}
