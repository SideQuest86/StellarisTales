// Story tree model + tidy layout for the reader's flow map.
//
// Renderer contract (mirrors docs/STORY-MODEL-V4.md):
//   node = { id, type: 'doc'|'ref'|'refset'|'parallel'|'exclusive'|'fork'|'appendix'|'shared'|'forest',
//            doc?, ref?, parent, children:[], via:{kind, option, optionIndex, label, group,
//            chance, modified, delay, when, triggers, secondary, required}, gate?, gateRef? }
// `toTree(dossier)` is the single adapter: V4 `story.tree` is normalised directly
// (exclusive sibling groups and story.groups become explicit group nodes); the V3
// derivation below remains only as a fallback for dossiers without a tree.

const ROOT = "@root";

/** Readable title source for docs, independent of data version. */
export function docIndex(dossier) {
  const docs = new Map();
  for (const chapter of dossier.chapters || []) docs.set(chapter.id, chapter);
  for (const doc of dossier.docs || []) docs.set(doc.id, doc);
  for (const related of dossier.story?.related || []) if (!docs.has(related.id)) docs.set(related.id, related);
  return docs;
}

export function toTree(dossier) {
  const tree = dossier?.story?.tree || dossier?.tree;
  if (tree?.nodes) return normaliseV4(dossier, tree);
  return deriveTreeFromV3(dossier);
}

// ---------------------------------------------------------------------------
// V4 story.tree = { root, nodes: { id: {doc|null, parent, via, children} | {ref, doc, parent, via} } }
function normaliseV4(dossier, source) {
  const story = dossier.story || {};
  const list = Array.isArray(source.nodes)
    ? source.nodes
    : Object.entries(source.nodes || {}).map(([id, node]) => ({ id, ...node }));
  const tree = emptyTree(dossier);
  const rootId = source.root || list.find((node) => !node.parent)?.id;
  const ids = new Map(); // V4 id → renderer id (the V4 root becomes the forest root)
  for (const raw of list) ids.set(raw.id, raw.id === rootId || (raw.doc == null && !raw.ref) ? ROOT : raw.id);
  for (const raw of list) {
    const id = ids.get(raw.id);
    if (id === ROOT) continue;
    const node = {
      id,
      type: raw.ref ? "ref" : "doc",
      doc: raw.doc,
      ref: raw.ref ? ids.get(raw.ref) : undefined,
      parent: ids.get(raw.parent) || ROOT,
      via: { ...(raw.via || {}) },
      children: [],
    };
    tree.nodes.set(id, node);
  }
  // Children keep the compiler's order.
  for (const raw of list) {
    const id = ids.get(raw.id);
    const node = tree.nodes.get(id);
    for (const child of raw.children || []) {
      const childId = ids.get(child);
      if (childId && tree.nodes.has(childId) && !node.children.includes(childId)) node.children.push(childId);
    }
  }
  for (const node of tree.nodes.values()) {
    if (node.id === ROOT) continue;
    const parent = tree.nodes.get(node.parent);
    if (parent && !parent.children.includes(node.id)) parent.children.push(node.id);
    if (node.type === "doc" && !tree.primary.has(node.doc)) tree.primary.set(node.doc, node.id);
  }
  for (const node of tree.nodes.values()) if (node.type === "ref" && !tree.nodes.has(node.ref)) node.ref = tree.primary.get(node.doc);

  let counter = 0;
  const groups = story.groups || [];
  // Exclusive outcomes: siblings sharing via.group (V4), labelled from story.groups.
  for (const node of [...tree.nodes.values()]) {
    const byGroup = new Map();
    for (const childId of node.children) {
      const group = tree.nodes.get(childId).via?.group;
      if (group) byGroup.set(group, [...(byGroup.get(group) || []), childId]);
    }
    for (const [group, members] of byGroup) {
      if (members.length < 2) continue;
      const id = `x${counter++}`;
      const memberNodes = members.map((m) => tree.nodes.get(m));
      const random = memberNodes.some((m) => m.via?.kind === "random" || m.via?.chance !== undefined);
      const declared = groups.find((g) => g.kind === "exclusive" && memberNodes.every((m) => g.members?.includes(m.doc)));
      memberNodes.forEach((m) => {
        const index = declared?.members.indexOf(m.doc);
        if (!m.via.label && declared?.labels?.[index]) m.via.label = declared.labels[index];
      });
      const at = node.children.indexOf(members[0]);
      node.children = node.children.filter((c) => !members.includes(c));
      node.children.splice(at, 0, id);
      tree.nodes.set(id, { id, type: "exclusive", parent: node.id, children: members, via: { kind: "exclusive", group, random, label: declared?.label, note: declared?.note } });
      for (const m of memberNodes) m.parent = id;
    }
  }
  // Parallel investigations: members under one parent become an "any order" group;
  // the gate they unlock is shown below the group, joined from every lane.
  for (const group of groups) {
    if (group.kind !== "parallel" || !group.members?.length) continue;
    const docs = group.members.map((doc) => tree.primary.get(doc)).filter(Boolean);
    if (docs.length < 2) continue;
    // Members may hang under their own discovery (e.g. one anomaly each): wrap the
    // branches just below the members' lowest common ancestor, one per member.
    const chains = docs.map((m) => {
      const chain = [];
      for (let n = m; n; n = tree.nodes.get(n)?.parent) chain.unshift(n);
      return chain;
    });
    let depth = 0;
    while (chains.every((c) => c[depth] !== undefined && c[depth] === chains[0][depth])) depth++;
    const parentId = chains[0][depth - 1];
    const members = [...new Set(chains.map((c) => c[depth]))];
    if (!parentId || members.length !== docs.length || members.some((m) => !m)) continue;
    const parent = tree.nodes.get(parentId);
    const id = `p${counter++}`;
    const at = parent.children.indexOf(members[0]);
    parent.children = parent.children.filter((c) => !members.includes(c));
    parent.children.splice(at, 0, id);
    tree.nodes.set(id, { id, type: "parallel", parent: parentId, children: [...members], via: { kind: "parallel", required: group.required, label: group.label, note: group.note } });
    for (const m of members) tree.nodes.get(m).parent = id;
    const gateId = group.gate && tree.primary.get(group.gate);
    if (gateId && !members.includes(gateId) && !isAncestor(tree, gateId, id)) {
      const gate = tree.nodes.get(gateId);
      const oldParent = tree.nodes.get(gate.parent);
      // Its old slot keeps a link back, so the route through that lane stays readable.
      const linkId = `l${counter++}`;
      tree.nodes.set(linkId, { id: linkId, type: "ref", doc: gate.doc, ref: gateId, parent: oldParent.id, via: { ...gate.via }, children: [], gateRef: true });
      oldParent.children[oldParent.children.indexOf(gateId)] = linkId;
      gate.parent = id;
      gate.gate = true;
      gate.via = { ...gate.via, kind: "stage", label: gate.via.label };
      tree.nodes.get(id).children.push(gateId);
      for (const node of tree.nodes.values()) if (node.type === "ref" && node.ref === gateId && isAncestor(tree, id, node.id)) node.gateRef = true;
      tree.joins.push({ group: id, gate: gateId });
    }
  }
  for (const chapter of dossier.chapters || []) if (chapter.ending) tree.endings[chapter.id] = chapter.ending;
  tree.labels = story.nodeLabels || {};
  tree.root = ROOT;
  return finish(tree);
}
// ---------------------------------------------------------------------------
// V3 derivation. Kept self-contained so the coordinator can replace it.
export function deriveTreeFromV3(dossier) {
  const tree = emptyTree(dossier);
  const story = dossier.story || {};
  const flow = story.flow || {};
  const chapters = new Map((dossier.chapters || []).map((c) => [c.id, c]));
  const readable = new Set([
    ...(dossier.chapters || []).filter((c) => !c.hidden).map((c) => c.id),
    ...(story.related || []).map((c) => c.id),
    ...Object.keys(flow.positions || {}),
  ]);
  const stageOf = (id) => flow.stages?.[flow.positions?.[id]?.stage];
  const appendix = new Set(
    (flow.stages || []).filter((s) => s.mode === "reference").flatMap((s) => s.lanes.flat()),
  );

  // Outgoing edges: the flow is authoritative; chapter links fill gaps for
  // dossiers whose flow has no edge list (staged-only flows).
  const outgoing = new Map();
  const seen = new Set();
  const push = (edge) => {
    if (!edge.from || !edge.to || edge.from === edge.to) return;
    const key = `${edge.from}>${edge.to}>${edge.choice || ""}`;
    if (seen.has(key)) return;
    seen.add(key);
    if (!outgoing.has(edge.from)) outgoing.set(edge.from, []);
    outgoing.get(edge.from).push(edge);
  };
  for (const edge of flow.edges || []) push(edge);
  if (!flow.edges?.length) {
    for (const stage of flow.stages || [])
      for (const lane of stage.lanes || [])
        lane.forEach((id, i) => i && push({ from: lane[i - 1], to: id, kind: "sequence" }));
    for (const chapter of dossier.chapters || []) {
      for (const choice of chapter.choices || [])
        for (const next of choice.next || [])
          push({ from: chapter.id, to: next.target, kind: "choice", choice: choice.key, label: choice.label });
      for (const next of chapter.next || []) push({ from: chapter.id, to: next.target, kind: "sequence", label: next.label });
    }
  }
  // Order children by the parent's option order, then by edge order.
  for (const [from, edges] of outgoing) {
    const keys = (chapters.get(from)?.choices || []).map((c) => c.key);
    const rank = (edge) => (edge.choice && keys.includes(edge.choice) ? keys.indexOf(edge.choice) : keys.length + 1);
    edges.forEach((edge, i) => (edge._order = i));
    edges.sort((a, b) => rank(a) - rank(b) || a._order - b._order);
  }

  // Parallel structures: precursor-style parallel stages and task groups.
  const parallelGroups = [];
  for (const stage of flow.stages || []) {
    if (stage.mode !== "parallel") continue;
    const heads = stage.lanes.map((lane) => lane[0]);
    const tails = stage.lanes.map((lane) => lane.at(-1));
    const gateCounts = new Map();
    for (const tail of tails)
      for (const edge of outgoing.get(tail) || []) gateCounts.set(edge.to, (gateCounts.get(edge.to) || 0) + 1);
    const gate = [...gateCounts].sort((a, b) => b[1] - a[1])[0]?.[0];
    parallelGroups.push({ heads, tails, gate, required: stage.required, label: stage.title });
  }
  for (const group of flow.parallelTasks || [])
    parallelGroups.push({ heads: group.tasks, tails: group.tasks, gate: group.outcome, required: group.tasks.length, tasks: true });
  const groupByHeads = (from, targets) =>
    parallelGroups.find((g) => g.heads.length > 1 && g.heads.every((id) => targets.includes(id)));

  const alternativeLabel = (to) => {
    const stage = stageOf(to);
    if (stage?.mode !== "alternative") return null;
    const lane = flow.positions[to]?.lane;
    return stage.labels?.[lane] || null;
  };
  const chapterChoice = (from, key) => chapters.get(from)?.choices?.find((c) => c.key === key);

  let counter = 0;
  const newId = (prefix) => `${prefix}${counter++}`;
  const queue = [];
  const place = (parent, doc, via) => {
    if (tree.primary.has(doc)) {
      const target = tree.primary.get(doc);
      const ancestor = isAncestor(tree, target, parent);
      add(tree, { id: newId("r"), type: "ref", doc, ref: target, parent, via: { ...via, kind: ancestor ? "return" : via.kind } });
      return null;
    }
    const id = newId("n");
    add(tree, { id, type: "doc", doc, parent, via });
    tree.primary.set(doc, id);
    queue.push(id);
    return id;
  };
  const tailToGate = new Map();
  const expand = (nodeId) => {
    const node = tree.nodes.get(nodeId);
    let edges = (outgoing.get(node.doc) || []).filter((e) => readable.has(e.to) && !appendix.has(e.to));
    // Lane tails of a parallel group join at the gate, drawn as join lines.
    const gateOf = tailToGate.get(node.doc);
    if (gateOf) edges = edges.filter((e) => e.to !== gateOf);
    const targets = edges.map((e) => e.to);
    const group = groupByHeads(node.doc, targets);
    if (group) {
      const groupId = newId("g");
      add(tree, {
        id: groupId,
        type: "parallel",
        parent: nodeId,
        via: { kind: "parallel", required: group.required, label: group.label },
      });
      for (const head of group.heads) {
        const edge = edges.find((e) => e.to === head);
        place(groupId, head, viaFor(edge, node.doc));
      }
      for (const tail of group.tails) if (group.gate) tailToGate.set(tail, group.gate);
      if (group.gate && readable.has(group.gate)) {
        const gateId = place(groupId, group.gate, { kind: "stage" });
        if (gateId) {
          tree.nodes.get(gateId).gate = true;
          tree.joins.push({ group: groupId, gate: gateId, tails: group.tails });
        }
      }
      edges = edges.filter((e) => !group.heads.includes(e.to));
    }
    // Alternative stage outcomes form an exclusive group.
    const alternatives = edges.filter((e) => e.kind === "alternative");
    if (alternatives.length > 1) {
      const groupId = newId("g");
      add(tree, { id: groupId, type: "exclusive", parent: nodeId, via: { kind: "exclusive" } });
      for (const edge of alternatives)
        place(groupId, edge.to, { ...viaFor(edge, node.doc), label: alternativeLabel(edge.to) || edge.label });
      edges = edges.filter((e) => !alternatives.includes(e));
    }
    // One option with several destinations: V3 cannot tell random outcomes from
    // simultaneous effects, so the fork is shown neutrally under the option label.
    const byChoice = new Map();
    for (const edge of edges) if (edge.choice) byChoice.set(edge.choice, [...(byChoice.get(edge.choice) || []), edge]);
    const handled = new Set();
    for (const edge of edges) {
      if (handled.has(edge)) continue;
      const siblings = edge.choice ? byChoice.get(edge.choice) : [edge];
      if (siblings.length > 1) {
        const groupId = newId("g");
        const choice = chapterChoice(node.doc, edge.choice);
        add(tree, {
          id: groupId,
          type: "fork",
          parent: nodeId,
          via: { kind: "option", option: edge.choice, label: choice?.label || edge.label },
        });
        for (const sibling of siblings) {
          handled.add(sibling);
          place(groupId, sibling.to, { kind: sibling.kind === "choice" ? "outcome" : sibling.kind, condition: conditionLabel(sibling) });
        }
      } else {
        handled.add(edge);
        place(nodeId, edge.to, viaFor(edge, node.doc));
      }
    }
  };
  const viaFor = (edge, from) => {
    if (!edge) return { kind: "sequence" };
    if (edge.choice || edge.kind === "choice") {
      const choice = chapterChoice(from, edge.choice);
      return { kind: "option", option: edge.choice, label: choice?.label || edge.label };
    }
    return { kind: edge.kind || "sequence", label: edge.label || null, condition: conditionLabel(edge) };
  };

  const rootDoc = [story.start, ...Object.keys(flow.positions || {})].find((id) => id && readable.has(id) && !appendix.has(id));
  const order = story.navigation?.order || [...readable];
  const entries = [rootDoc, ...order.filter((id) => id !== rootDoc)];
  for (const entry of entries) {
    if (!entry || tree.primary.has(entry) || appendix.has(entry) || !readable.has(entry)) continue;
    // Later entries are parallel starting points that nothing in the story calls.
    place(ROOT, entry, { kind: entry === rootDoc ? "root" : "entry" });
    while (queue.length) expand(queue.shift());
  }
  // Repeatable menus: leaves return to the hub. A marker on the leaf keeps the
  // convergence visible without one extra node per leaf.
  if (flow.hub?.target && tree.primary.has(flow.hub.target)) {
    for (const node of tree.nodes.values())
      if (node.type === "doc" && !node.children.length && node.doc !== flow.hub.target)
        node.returns = { doc: flow.hub.target, label: flow.hub.label };
  }
  if (appendix.size) {
    const groupId = newId("a");
    add(tree, { id: groupId, type: "appendix", parent: ROOT, via: { kind: "appendix" } });
    for (const id of appendix) if (!tree.primary.has(id)) place(groupId, id, { kind: "appendix" });
    queue.length = 0;
  }
  tree.root = ROOT;
  tree.endings = flow.endings || {};
  tree.tasks = flow.parallelTasks || [];
  tree.labels = flow.nodeLabels || {};
  return finish(tree);
}

function conditionLabel(edge) {
  if (!edge) return null;
  if (edge.label && edge.kind !== "choice") return edge.label;
  return null;
}

function emptyTree(dossier) {
  const nodes = new Map([[ROOT, { id: ROOT, type: "forest", parent: null, children: [], via: {} }]]);
  return { root: ROOT, nodes, primary: new Map(), joins: [], docs: docIndex(dossier), endings: {}, tasks: [], labels: {} };
}
function add(tree, node) {
  node.children = [];
  tree.nodes.set(node.id, node);
  const parent = tree.nodes.get(node.parent);
  if (parent && !parent.children.includes(node.id)) parent.children.push(node.id);
  return node;
}
function isAncestor(tree, candidate, nodeId) {
  for (let id = nodeId; id; id = tree.nodes.get(id)?.parent) if (id === candidate) return true;
  return false;
}
/** Option label for a node reached by a player choice (V4 keeps only the key/index). */
export function optionLabel(tree, node) {
  const via = node.via || {};
  if (via.kind !== "option" && !via.option) return null;
  let parent = tree.nodes.get(node.parent);
  while (parent && !parent.doc) parent = tree.nodes.get(parent.parent);
  const choices = parent ? tree.docs.get(parent.doc)?.choices || [] : [];
  const choice = choices.find((c) => c.key === via.option) || (Number.isInteger(via.optionIndex) ? choices[via.optionIndex] : null);
  return choice?.label || via.label || null;
}

function finish(tree) {
  // Gate children are laid out after their siblings.
  for (const node of tree.nodes.values())
    node.children.sort((a, b) => Number(!!tree.nodes.get(a).gate) - Number(!!tree.nodes.get(b).gate));
  tree.docCount = [...tree.nodes.values()].filter((n) => n.type === "doc").length;
  return tree;
}

// ---------------------------------------------------------------------------
// Compaction for dense trees. Generic, so it applies to V4 trees as well:
// two or more sibling refs merge into one `refset` (every target is still listed
// and clickable); a fork that only leads back to existing pages becomes that
// refset, captioned with the option.
export function compactTree(tree) {
  if (tree.compacted) return tree;
  let counter = 0;
  for (const node of [...tree.nodes.values()]) {
    // Exclusive outcomes keep one chip per outcome so each chance stays visible.
    if (!tree.nodes.has(node.id) || node.type === "exclusive") continue;
    const refs = node.children.map((id) => tree.nodes.get(id)).filter((c) => c.type === "ref" && !c.children.length && !c.gateRef);
    if (refs.length < 2) continue;
    const id = `s${counter++}`;
    const before = node.children.indexOf(refs[0].id);
    const refIds = new Set(refs.map((r) => r.id));
    const at = node.children.slice(0, before).filter((c) => !refIds.has(c)).length;
    node.children = node.children.filter((c) => !refIds.has(c));
    node.children.splice(at, 0, id);
    for (const r of refs) tree.nodes.delete(r.id);
    tree.nodes.set(id, {
      id,
      type: "refset",
      parent: node.id,
      children: [],
      via: refs.every((r) => r.via?.kind === refs[0].via?.kind) ? { kind: refs[0].via?.kind } : { kind: "ref" },
      items: refs.map((r) => ({ doc: r.doc, ref: r.ref, via: r.via })),
    });
  }
  // Exclusive outcomes that all lead back to existing pages: one link set that
  // still lists every outcome with its chance.
  for (const node of [...tree.nodes.values()]) {
    if (node.type !== "exclusive" || node.children.length < 2) continue;
    const members = node.children.map((id) => tree.nodes.get(id));
    if (!members.every((m) => m.type === "ref" && !m.gateRef)) continue;
    for (const m of members) tree.nodes.delete(m.id);
    Object.assign(node, {
      type: "refset",
      exclusive: true,
      children: [],
      items: members.map((r) => ({ doc: r.doc, ref: r.ref, via: r.via })),
      via: { ...node.via, kind: node.via.random ? "random" : "exclusive" },
    });
  }
  for (const node of [...tree.nodes.values()]) {
    if (node.type !== "fork" || node.children.length !== 1) continue;
    const only = tree.nodes.get(node.children[0]);
    if (only.type !== "refset" && only.type !== "ref") continue;
    const parent = tree.nodes.get(node.parent);
    parent.children[parent.children.indexOf(node.id)] = only.id;
    only.parent = parent.id;
    only.via = { ...only.via, ...node.via, kind: "option" };
    tree.nodes.delete(node.id);
  }
  mergeLinkSets(tree);
  groupSharedCaptions(tree, counter);
  tree.compacted = true;
  return tree;
}

/**
 * One row per target page in a link set; the chances of a page that is listed more than once become a range
 * ({chance: [low, high]}), and `count` says how many entries the row stands for.
 */
export function dedupeItems(items) {
  const rows = new Map();
  for (const item of items) {
    const chance = item.via?.chance ?? (Array.isArray(item.chance) ? item.chance[0] : item.chance);
    const high = Array.isArray(item.chance) ? item.chance[1] : chance;
    const row = rows.get(item.doc);
    if (!row) {
      rows.set(item.doc, { doc: item.doc, ref: item.ref, via: item.via, count: item.count || 1, chance: chance == null ? null : [chance, high], modified: !!(item.modified || item.via?.modified) });
      continue;
    }
    row.count += item.count || 1;
    row.modified ||= !!(item.modified || item.via?.modified);
    if (chance != null) row.chance = row.chance ? [Math.min(row.chance[0], chance), Math.max(row.chance[1], high)] : [chance, high];
  }
  return [...rows.values()];
}

/** Link sets: dedupe the rows of each, then merge sibling sets that list the same pages into one set with a case count. */
function mergeLinkSets(tree) {
  for (const node of tree.nodes.values()) if (node.type === "refset") node.items = dedupeItems(node.items);
  // A plain set that is left with one target is just a link back.
  for (const node of tree.nodes.values()) {
    if (node.type !== "refset" || node.exclusive || node.items.length !== 1) continue;
    const [item] = node.items;
    const via = { ...item.via, ...node.via };
    if (!node.via?.kind || node.via.kind === "ref") via.kind = item.via?.kind ?? via.kind;
    Object.assign(node, { type: "ref", doc: item.doc, ref: item.ref, via, count: item.count });
    delete node.items;
  }
  for (const parent of [...tree.nodes.values()]) {
    const sets = parent.children.map((id) => tree.nodes.get(id)).filter((child) => child?.type === "refset");
    if (sets.length < 2) continue;
    const groups = new Map();
    for (const set of sets) {
      const key = [set.exclusive ? "x" : "s", set.via?.label ? JSON.stringify(set.via.label) : "", set.via?.option ?? "", set.items.map((item) => item.doc).join("|")].join("#");
      groups.set(key, [...(groups.get(key) || []), set]);
    }
    for (const list of groups.values()) {
      if (list.length < 2) continue;
      const [head, ...rest] = list;
      head.cases = list.reduce((n, set) => n + (set.cases || 1), 0);
      head.items = dedupeItems(list.flatMap((set) => set.items)).map((row) => ({ ...row, count: 1 }));
      const gone = new Set(rest.map((set) => set.id));
      parent.children = parent.children.filter((id) => !gone.has(id));
      for (const id of gone) tree.nodes.delete(id);
    }
  }
}

/**
 * Three or more sibling chapters that share the same "how you get here" text (an authored label, "another way in", the
 * same trigger or a plain random outcome) hang under one caption node ("text ×N") instead of repeating it on every box.
 */
function groupSharedCaptions(tree, counter) {
  const keyOf = (node) => {
    const via = node.via || {};
    if (node.type !== "doc" || node.gate || via.kind === "option" || via.kind === "return") return null;
    if (via.label) return `L${JSON.stringify(via.label)}`;
    if (via.secondary) return "S";
    if (via.triggers?.length) return `T${JSON.stringify(via.triggers[0])}`;
    if (via.kind === "random") return "R";
    return null;
  };
  for (const parent of [...tree.nodes.values()]) {
    if (parent.type !== "doc" || parent.children.length < 3) continue;
    const byKey = new Map();
    for (const id of parent.children) {
      const key = keyOf(tree.nodes.get(id));
      if (key) byKey.set(key, [...(byKey.get(key) || []), id]);
    }
    for (const members of byKey.values()) {
      if (members.length < 3) continue;
      const first = tree.nodes.get(members[0]);
      const id = `h${counter++}`;
      const at = parent.children.indexOf(members[0]);
      const set = new Set(members);
      parent.children = parent.children.filter((child) => !set.has(child));
      parent.children.splice(at, 0, id);
      const via = first.via || {};
      tree.nodes.set(id, {
        id,
        type: "shared",
        parent: parent.id,
        children: members,
        via: { kind: "shared", label: via.label, secondary: via.secondary, triggers: via.triggers, random: via.kind === "random" && !via.label, count: members.length },
      });
      for (const member of members) tree.nodes.get(member).parent = id;
    }
  }
}

// ---------------------------------------------------------------------------
// Path: map the reader's trail onto tree nodes and edges.
export function treePath(tree, trail, current) {
  const nodes = new Set();
  const edges = new Set(); // "parent>child" node ids, including group hops
  const items = new Set(); // "refsetId|doc" entries followed inside ref sets
  const jumps = [];
  let cursor = null;
  const steps = trail?.length ? trail : current ? [{ chapter: current }] : [];
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    const prev = steps[i - 1];
    const found = cursor ? findChild(tree, cursor, step.chapter, prev?.choice) : null;
    if (found) {
      for (const hop of found.hops) {
        nodes.add(hop.to);
        edges.add(`${hop.from}>${hop.to}`);
      }
      const target = tree.nodes.get(found.node);
      if (target.type === "refset") {
        items.add(`${found.node}|${step.chapter}`);
        cursor = tree.primary.get(step.chapter) || null;
      } else if (target.type === "ref") cursor = target.ref || tree.primary.get(step.chapter) || null;
      else cursor = found.node;
    } else {
      const next = tree.primary.get(step.chapter) || null;
      if (cursor && next && cursor !== next) jumps.push([cursor, next]);
      cursor = next;
    }
    if (cursor) nodes.add(cursor);
  }
  return { nodes, edges, items, jumps, current: cursor };
}
function findChild(tree, from, doc, choice) {
  // Breadth-first through structural groups (they never carry docs themselves).
  const frontier = [{ id: from, hops: [] }];
  let fallback = null;
  while (frontier.length) {
    const { id, hops } = frontier.shift();
    const parent = tree.nodes.get(id);
    if (!parent) continue;
    for (const childId of parent.children) {
      const child = tree.nodes.get(childId);
      const path = [...hops, { from: id, to: childId }];
      const holds =
        ((child.type === "doc" || child.type === "ref") && child.doc === doc) ||
        (child.type === "refset" && child.items.some((item) => item.doc === doc));
      if (holds) {
        const optionMatch = !choice || child.via?.option === choice || parent.via?.option === choice;
        if (optionMatch) return { node: childId, hops: path };
        fallback ??= { node: childId, hops: path };
      } else if (["parallel", "exclusive", "fork", "shared"].includes(child.type)) frontier.push({ id: childId, hops: path });
    }
  }
  return fallback;
}

// ---------------------------------------------------------------------------
// Tidy layout: Reingold–Tilford contours, top-down, variable node widths.
// Leaf-only families of six or more become compact railed lists; independent
// entry trees are packed into wrapped rows instead of one endless line.
export const NODE = {
  doc: { w: 208, h: 48 },
  ref: { w: 184, h: 34 },
  refset: { w: 208, head: 30 },
  refsetRow: 19,
  refsetMax: 4,
  group: { h: 24, maxW: 300 },
};
const SIBLING_GAP = 16;
const SUBTREE_GAP = 28;
const LEVEL_GAP = 38;
const BUNDLE_MIN = 6;
const BUNDLE_GAP = { x: 22, y: 10, rail: 16 };
const FOREST_GAP = { x: 72, y: 84 };

/** Default box of a node. The renderer passes `options.size` to layoutTree to size nodes by their wrapped text. */
export function nodeSize(node, measure) {
  switch (node.type) {
    case "doc":
      return { ...NODE.doc };
    case "ref":
      return { ...NODE.ref };
    case "refset": {
      const rows = Math.min(node.items.length, NODE.refsetMax) + (node.items.length > NODE.refsetMax ? 1 : 0);
      return { w: NODE.refset.w, h: NODE.refset.head + rows * NODE.refsetRow + 4 };
    }
    case "forest":
      return { w: 0, h: 0 };
    default:
      return { w: Math.max(34, Math.min(NODE.group.maxW, measure(node.caption || "") + 30)), h: NODE.group.h };
  }
}

/**
 * Choose which subtrees start folded. Path ancestors always stay open; small
 * trees open completely; elsewhere heavy subtrees away from the reader fold
 * behind a "+N" badge so dense stories stay legible.
 */
export function defaultCollapsed(tree, path, current, budget = 90) {
  const size = new Map();
  const count = (id) => {
    let n = 1;
    for (const child of tree.nodes.get(id).children) n += count(child);
    size.set(id, n);
    return n;
  };
  const total = count(tree.root);
  const collapsed = new Set();
  if (total <= budget) return collapsed;
  const keep = new Set();
  const focus = [...(path?.nodes || [])];
  if (current) focus.push(current);
  for (const id of focus) for (let n = id; n; n = tree.nodes.get(n)?.parent) keep.add(n);
  // Look ahead a few levels below the reader's position.
  const ahead = (id, depth) => {
    keep.add(id);
    if (depth <= 0) return;
    for (const child of tree.nodes.get(id)?.children || []) ahead(child, depth - (tree.nodes.get(child).type === "doc" ? 1 : 0));
  };
  if (current && tree.nodes.has(current)) ahead(current, 2);
  else for (const child of tree.nodes.get(tree.root).children) ahead(child, 2);
  for (const node of tree.nodes.values()) {
    if (node.id === tree.root || !node.children.length || keep.has(node.id)) continue;
    const parent = tree.nodes.get(node.parent);
    // Children of an open node on the path stay visible as headings only.
    if (size.get(node.id) > 6 || (parent && !keep.has(parent.id) && size.get(node.id) > 3)) collapsed.add(node.id);
  }
  // Fold only the outermost: a node inside a folded subtree needs no flag.
  for (const id of [...collapsed]) for (let n = tree.nodes.get(id).parent; n; n = tree.nodes.get(n)?.parent) if (collapsed.has(n)) { collapsed.delete(id); break; }
  return collapsed;
}

/** Number of nodes hidden under a folded node. */
export function hiddenCount(tree, id) {
  let n = 0;
  const visit = (x) => {
    for (const child of tree.nodes.get(x).children) {
      if (tree.nodes.get(child).type !== "forest") n += 1;
      visit(child);
    }
  };
  visit(id);
  return n;
}

/**
 * @param options.measure (text) => px width of a group caption
 * @param options.size (node) => {w, h} box of a node (text-aware), or nothing for the default box
 * @param options.maxRowWidth wrap width for independent entry trees
 * @param options.collapsed Set of folded node ids (their descendants are omitted)
 * @returns {nodes: Map(id → {x (centre), y (top), w, h, row?, col?}), bundled: Set, bounds}
 */
export function layoutTree(tree, options = {}) {
  const measure = options.measure || ((text) => text.length * 7);
  const collapsed = options.collapsed || new Set();
  const kids = (id) => (collapsed.has(id) ? [] : tree.nodes.get(id).children);
  const box = new Map();
  const bundles = new Map();
  const visit = (id) => {
    const node = tree.nodes.get(id);
    box.set(id, options.size?.(node) || nodeSize(node, measure));
    const children = kids(id).map((c) => tree.nodes.get(c));
    if (node.type !== "forest" && children.length >= BUNDLE_MIN && children.every((k) => !kids(k.id).length && !k.gate)) {
      const cols = Math.max(1, Math.min(6, Math.ceil(Math.sqrt(children.length / 1.6))));
      bundles.set(id, { cols, perCol: Math.ceil(children.length / cols) });
    }
    for (const child of children) visit(child.id);
  };
  visit(tree.root);
  const forest = tree.nodes.get(tree.root).type === "forest";
  const subtreeRoots = forest ? kids(tree.root) : [tree.root];
  const subtrees = subtreeRoots.map((id) => layoutSubtree(tree, id, box, kids, bundles));

  // Pack subtrees into rows; the main tree leads, related records close.
  const rowLimit = Math.max(options.maxRowWidth || 1500, subtrees[0]?.width || 0);
  let rowX = 0, rowY = 0, rowHeight = 0;
  subtrees.forEach((sub, i) => {
    const appendix = tree.nodes.get(subtreeRoots[i]).type === "appendix";
    if (i && (rowX + sub.width > rowLimit || appendix)) {
      rowY += rowHeight + FOREST_GAP.y;
      rowX = 0;
      rowHeight = 0;
    }
    sub.place(rowX - sub.minX, rowY);
    rowX += sub.width + FOREST_GAP.x;
    rowHeight = Math.max(rowHeight, sub.height);
  });
  if (forest) Object.assign(box.get(tree.root), { x: 0, y: -40, w: 0, h: 0 });

  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const b of box.values()) {
    if (!b.w || b.x === undefined) continue;
    minX = Math.min(minX, b.x - b.w / 2);
    maxX = Math.max(maxX, b.x + b.w / 2);
    minY = Math.min(minY, b.y);
    maxY = Math.max(maxY, b.y + b.h);
  }
  if (!Number.isFinite(minX)) (minX = 0), (maxX = 0), (minY = 0), (maxY = 0);
  return { nodes: box, bundled: new Set(bundles.keys()), bounds: { x: minX, y: minY, width: maxX - minX, height: maxY - minY } };
}

function layoutSubtree(tree, rootId, box, kids, bundles) {
  const level = new Map();
  const offset = new Map(); // child → {dx, dy}
  const blockHeight = new Map(); // level → tallest railed list
  const isGate = (id) => !!tree.nodes.get(id).gate;
  const assign = (id, depth) => {
    level.set(id, depth);
    let deepest = depth;
    for (const child of kids(id)) if (!isGate(child)) deepest = Math.max(deepest, assign(child, depth + 1));
    for (const child of kids(id)) if (isGate(child)) deepest = Math.max(deepest, assign(child, deepest + 1));
    return deepest;
  };
  assign(rootId, 0);
  const extend = (map, lvl, min, max) => {
    const existing = map.get(lvl);
    map.set(lvl, existing ? [Math.min(existing[0], min), Math.max(existing[1], max)] : [min, max]);
  };
  const contourOf = (id) => {
    const size = box.get(id);
    const lvl = level.get(id);
    const result = new Map();
    const children = kids(id);
    if (!children.length) {
      if (size.w) result.set(lvl, [-size.w / 2, size.w / 2]);
      return result;
    }
    const bundle = bundles.get(id);
    if (bundle) {
      // Column-major railed list centred under the parent.
      const colW = Math.max(...children.map((k) => box.get(k).w)) + BUNDLE_GAP.rail;
      const total = bundle.cols * colW + (bundle.cols - 1) * BUNDLE_GAP.x;
      let height = 0;
      children.forEach((child, i) => {
        const col = Math.floor(i / bundle.perCol);
        const row = i % bundle.perCol;
        const b = box.get(child);
        level.set(child, lvl + 1);
        let above = 0;
        for (let j = col * bundle.perCol; j < i; j++) above += box.get(children[j]).h + BUNDLE_GAP.y;
        offset.set(child, { dx: -total / 2 + col * (colW + BUNDLE_GAP.x) + BUNDLE_GAP.rail + b.w / 2, dy: above, row, col });
        height = Math.max(height, above + b.h);
      });
      blockHeight.set(lvl + 1, Math.max(blockHeight.get(lvl + 1) || 0, height));
      result.set(lvl + 1, [-total / 2, total / 2]);
      if (size.w) extend(result, lvl, -size.w / 2, size.w / 2);
      return result;
    }
    const normal = children.filter((c) => !isGate(c));
    const gates = children.filter(isGate);
    const merged = new Map();
    const positions = [];
    for (const child of normal) {
      const contour = contourOf(child);
      let x = -Infinity;
      for (const [l, [min]] of contour) {
        const right = merged.get(l);
        if (right) x = Math.max(x, right[1] - min + gapBetween(kids, child, normal));
      }
      if (x === -Infinity) x = positions.length ? positions.at(-1) + SIBLING_GAP : 0;
      positions.push(x);
      for (const [l, [min, max]] of contour) extend(merged, l, min + x, max + x);
    }
    const mid = positions.length ? (positions[0] + positions.at(-1)) / 2 : 0;
    normal.forEach((child, i) => offset.set(child, { dx: positions[i] - mid, dy: 0 }));
    for (const [l, [min, max]] of merged) extend(result, l, min - mid, max - mid);
    for (const gate of gates) {
      offset.set(gate, { dx: 0, dy: 0 });
      for (const [l, [min, max]] of contourOf(gate)) extend(result, l, min, max);
    }
    if (size.w) extend(result, lvl, -size.w / 2, size.w / 2);
    return result;
  };
  const contour = contourOf(rootId);
  let minX = Infinity, maxX = -Infinity;
  for (const [min, max] of contour.values()) (minX = Math.min(minX, min)), (maxX = Math.max(maxX, max));
  if (!Number.isFinite(minX)) (minX = 0), (maxX = 0);

  // Nodes are top-aligned within their level.
  const heights = new Map();
  for (const [id, lvl] of level) heights.set(lvl, Math.max(heights.get(lvl) || 0, box.get(id).h));
  for (const [lvl, h] of blockHeight) heights.set(lvl, Math.max(heights.get(lvl) || 0, h));
  const tops = new Map();
  let y = 0;
  for (const lvl of [...heights.keys()].sort((a, b) => a - b)) {
    tops.set(lvl, y);
    y += heights.get(lvl) + LEVEL_GAP;
  }
  const height = Math.max(0, y - LEVEL_GAP);
  const place = (originX, originY) => {
    const visit = (id, x) => {
      const b = box.get(id);
      const o = offset.get(id);
      b.x = x;
      b.y = originY + tops.get(level.get(id)) + (o?.dy || 0);
      if (o?.row !== undefined) (b.row = o.row), (b.col = o.col);
      for (const child of kids(id)) visit(child, x + offset.get(child).dx);
    };
    visit(rootId, originX);
  };
  return { width: maxX - minX, minX, height, place };
}
function gapBetween(kids, child, siblings) {
  return kids(child).length || siblings.length > 4 ? SUBTREE_GAP : SIBLING_GAP;
}
/** Elbow connector with rounded corners from parent bottom to child top. */
export function connector(a, b, radius = 7) {
  const x1 = a.x, y1 = a.y + a.h, x2 = b.x, y2 = b.y;
  if (Math.abs(x2 - x1) < 0.5) return `M${x1} ${y1}V${y2}`;
  const mid = y2 - Math.min(16, (y2 - y1) / 2);
  const r = Math.max(0, Math.min(radius, Math.abs(x2 - x1) / 2, (mid - y1) / 1.5, y2 - mid));
  const dir = Math.sign(x2 - x1);
  return `M${x1} ${y1}V${mid - r}Q${x1} ${mid} ${x1 + dir * r} ${mid}H${x2 - dir * r}Q${x2} ${mid} ${x2} ${mid + r}V${y2}`;
}
/** Rail connector for railed lists: bus, column rail, then a tick into the child's left edge. */
export function railConnector(a, b, radius = 6) {
  const x1 = a.x, y1 = a.y + a.h;
  const railX = b.x - b.w / 2 - BUNDLE_GAP.rail / 2 - 2;
  const bus = y1 + 14;
  const yMid = b.y + Math.min(b.h / 2, 17);
  const dir = Math.sign(railX - x1) || 1;
  const r = Math.max(0, Math.min(radius, Math.abs(railX - x1) / 2));
  const head = Math.abs(railX - x1) < 0.5
    ? `M${x1} ${y1}V${bus}`
    : `M${x1} ${y1}V${bus - r}Q${x1} ${bus} ${x1 + dir * r} ${bus}H${railX - dir * r}Q${railX} ${bus} ${railX} ${bus + r}`;
  return `${head}V${yMid - 5}Q${railX} ${yMid} ${railX + 5} ${yMid}H${b.x - b.w / 2}`;
}
/** Soft join from a lane tail down to a parallel gate. */
export function joinCurve(a, b) {
  const x1 = a.x, y1 = a.y + a.h, x2 = b.x, y2 = b.y;
  const bend = Math.max(24, (y2 - y1) * 0.55);
  return `M${x1} ${y1}C${x1} ${y1 + bend},${x2} ${y2 - bend},${x2} ${y2}`;
}

export const TREE_ROOT = ROOT;