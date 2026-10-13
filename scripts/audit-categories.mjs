// Structural audit of the V4 story trees per category, plus manual-review status counts.
// Structural validity is required (CI fails on errors); review status is reported, never certified here —
// acceptance is recorded in content/chronology/REVIEW.md with evidence.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import assert from "node:assert/strict";
const read = async (path) => JSON.parse(await readFile(path, "utf8"));
const index = await read("public/stories/index.json");
const categories = ["origins", "precursors", "exploration", "rifts", "crisis", "leviathans", "society", "stories"];
const requested = process.argv[2];
if (requested && !categories.includes(requested)) throw Error("Unknown category");
const known = new Set(index.stories.map((s) => s.id));
await mkdir("verification/chronology", { recursive: true });
for (const category of requested ? [requested] : categories) {
  const report = { category, model: 4, scope: "Tree structure and review status only; narrative acceptance is manual (content/chronology/REVIEW.md)", stories: 0, docs: 0, nodes: 0, refs: 0, crossLinks: 0, review: {}, failures: [], items: [] };
  for (const meta of index.stories.filter((s) => s.visible && s.category === category)) {
    const d = await read(`public/stories/${meta.id}.json`);
    try {
      const { root, nodes } = d.story.tree;
      const full = new Set();
      let refs = 0;
      for (const [nid, node] of Object.entries(nodes)) {
        if (nid === root) continue;
        assert.ok(nodes[node.parent], `${meta.id}: ${nid} has no parent`);
        if (node.ref) { refs++; assert.ok(nodes[node.ref], `${meta.id}: dangling ref ${nid}`); }
        else { assert.ok(!full.has(node.doc), `${meta.id}: ${node.doc} placed twice`); full.add(node.doc); }
      }
      assert.equal(full.size, d.chapters.length, `${meta.id}: tree and docs differ`);
      let cross = 0;
      for (const c of d.chapters)
        for (const e of [...c.next, ...c.choices.flatMap((o) => o.next)]) {
          assert.ok(known.has(e.story), `${meta.id}: ${c.id} links to unknown story ${e.story}`);
          if (e.story !== meta.id) cross++;
        }
      const status = meta.review?.status || "unreviewed";
      report.review[status] = (report.review[status] || 0) + 1;
      report.stories++; report.docs += d.chapters.length; report.nodes += Object.keys(nodes).length - 1; report.refs += refs; report.crossLinks += cross;
      report.items.push({ id: meta.id, title: meta.title.zh, kind: meta.kind, docs: d.chapters.length, refs, crossLinks: cross, review: status });
    } catch (e) {
      report.failures.push({ id: meta.id, message: e.message });
    }
  }
  await writeFile(`verification/chronology/${category}.json`, JSON.stringify(report, null, 2));
  console.log(`${category}: ${report.stories} stories, ${report.docs} docs, ${report.refs} convergences, ${report.failures.length} structural failures; review ${JSON.stringify(report.review)}`);
  assert.equal(report.failures.length, 0, category + " structural errors");
}
