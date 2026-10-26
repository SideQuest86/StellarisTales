import test from "node:test";
import assert from "node:assert/strict";
import { toTree, compactTree, dedupeItems, treePath, layoutTree, NODE } from "../src/flow-tree.js";

const label = (text) => ({ zh: text, en: text });
const dossier = (nodes, chapters) => ({
  story: { id: "t", title: label("T"), tree: { root: "n0", nodes } },
  chapters: chapters.map((id) => ({ id, title: label(id.toUpperCase()), choices: [] })),
});

test("dedupeItems: one row per page, chances of repeated pages become a range", () => {
  const rows = dedupeItems([
    { doc: "a", via: { chance: 0.2 } },
    { doc: "b", via: {} },
    { doc: "a", via: { chance: 0.9, modified: true } },
    { doc: "a", via: { chance: 0.5 } },
  ]);
  assert.deepEqual(rows.map((r) => r.doc), ["a", "b"]);
  assert.deepEqual(rows[0].chance, [0.2, 0.9]);
  assert.equal(rows[0].count, 3);
  assert.equal(rows[0].modified, true);
  assert.equal(rows[1].chance, null);
});

test("compactTree: sibling random link sets that list the same pages become one set with a case count", () => {
  const nodes = { n0: { doc: null, children: ["n1"] }, n1: { doc: "start", parent: "n0", via: {}, children: [] } };
  const docs = ["start", "win", "lose"];
  // Three random lists under n1, each a different group with different chances, all leading back to win / lose.
  for (let g = 0; g < 3; g++)
    for (const [i, doc] of ["win", "lose"].entries()) {
      const id = `r${g}${i}`;
      nodes[id] = { ref: "w", doc, parent: "n1", via: { kind: "random", group: `g${g}`, chance: i ? 1 - 0.3 * (g + 1) : 0.3 * (g + 1), label: label("pick") }, children: [] };
      nodes.n1.children.push(id);
    }
  nodes.w = { doc: "win", parent: "n1", via: {}, children: [] };
  nodes.l = { doc: "lose", parent: "n1", via: {}, children: [] };
  nodes.n1.children.push("w", "l");
  const tree = compactTree(toTree(dossier(nodes, docs)));
  const sets = [...tree.nodes.values()].filter((n) => n.type === "refset");
  assert.equal(sets.length, 1, "three identical sets merge into one");
  assert.equal(sets[0].cases, 3);
  assert.deepEqual(sets[0].items.map((i) => i.doc).sort(), ["lose", "win"]);
  const win = sets[0].items.find((i) => i.doc === "win");
  assert.ok(win.chance[0] < win.chance[1], "chance varies between the cases: a range");
});

test("compactTree: a link set left with one page is a plain link back", () => {
  const nodes = {
    n0: { doc: null, children: ["n1"] },
    n1: { doc: "a", parent: "n0", via: {}, children: ["n2", "n3", "n4"] },
    n2: { doc: "b", parent: "n1", via: {}, children: [] },
    n3: { ref: "n2", doc: "b", parent: "n1", via: { kind: "option", option: "x" }, children: [] },
    n4: { ref: "n2", doc: "b", parent: "n1", via: { kind: "option", option: "x" }, children: [] },
  };
  const tree = compactTree(toTree(dossier(nodes, ["a", "b"])));
  assert.equal([...tree.nodes.values()].filter((n) => n.type === "refset").length, 0);
  const refs = [...tree.nodes.values()].filter((n) => n.type === "ref");
  assert.equal(refs.length, 1);
  assert.equal(refs[0].doc, "b");
  assert.equal(refs[0].count, 2);
  assert.equal(treePath(tree, [{ chapter: "a" }, { chapter: "b" }], "b").nodes.size, 2);
});

test("compactTree: three or more siblings that share a caption hang under one caption node", () => {
  const nodes = { n0: { doc: null, children: ["n1"] }, n1: { doc: "a", parent: "n0", via: {}, children: [] } };
  const ids = [];
  for (const doc of ["b", "c", "d", "e"]) {
    nodes[`k${doc}`] = { doc, parent: "n1", via: { kind: "bridge", label: label("Appears later") }, children: [] };
    ids.push(`k${doc}`);
  }
  nodes.n1.children.push(...ids);
  nodes.z = { doc: "z", parent: "n1", via: { kind: "bridge", label: label("Something else") }, children: [] };
  nodes.n1.children.push("z");
  const tree = compactTree(toTree(dossier(nodes, ["a", "b", "c", "d", "e", "z"])));
  const groups = [...tree.nodes.values()].filter((n) => n.type === "shared");
  assert.equal(groups.length, 1);
  assert.equal(groups[0].children.length, 4);
  assert.equal(groups[0].via.count, 4);
  assert.equal(tree.nodes.get(tree.primary.get("z")).parent, "n1", "a lone caption stays on its chapter");
  // The route still resolves through the caption node.
  const path = treePath(tree, [{ chapter: "a" }, { chapter: "c" }], "c");
  assert.ok(path.nodes.has(groups[0].id) && path.nodes.has(tree.primary.get("c")));
});

test("layoutTree: a size callback sets the box of each node", () => {
  const nodes = { n0: { doc: null, children: ["n1"] }, n1: { doc: "a", parent: "n0", via: {}, children: ["n2"] }, n2: { doc: "b", parent: "n1", via: {}, children: [] } };
  const tree = compactTree(toTree(dossier(nodes, ["a", "b"])));
  const layout = layoutTree(tree, { measure: () => 50, size: (node) => (node.doc === "a" ? { w: 300, h: 90 } : null) });
  assert.equal(layout.nodes.get(tree.primary.get("a")).h, 90);
  assert.equal(layout.nodes.get(tree.primary.get("b")).w, NODE.doc.w);
  assert.ok(layout.nodes.get(tree.primary.get("b")).y >= 90, "the next level starts below the taller box");
});
