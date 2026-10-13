import test from "node:test";
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import { resolveBody, resolveChoices } from "../src/reading.js";
const read = async (p) => JSON.parse(await readFile(p, "utf8"));
const index = await read("public/stories/index.json");
const records = await read("public/stories/records.json");
const excerpts = await read("public/stories/excerpts.json");
const coverage = await read("public/data/story-coverage.json");
const stories = await Promise.all(index.stories.map((s) => read(`public/stories/${s.id}.json`)));
const byId = new Map(stories.map((d) => [d.story.id, d]));
const docIn = (sid, id) => byId.get(sid)?.chapters.find((c) => c.id === id);
const owner = (id) => records[id];
const nodesOf = (d) => Object.entries(d.story.tree.nodes);

test("V4: every readable document belongs to at least one story tree", () => {
  assert.equal(index.version, 4);
  assert.equal(coverage.model, 4);
  assert.equal(coverage.assignedDocs, coverage.readableDocs);
  assert.deepEqual(coverage.unassignedDocs, []);
  for (const d of stories) for (const c of d.chapters) assert.ok(owner(c.id), c.id);
  for (const s of index.stories) {
    assert.ok(!("excerpt" in s), "excerpts load separately from the first-paint index");
    assert.ok(excerpts[s.id], s.id);
  }
});

test("V4: each story is a strict tree — every doc once as a full node, refs point at full nodes", () => {
  for (const d of stories) {
    const { root, nodes } = d.story.tree;
    assert.ok(nodes[root], d.story.id);
    const full = new Map();
    for (const [nid, node] of nodesOf(d)) {
      if (nid === root) continue;
      assert.ok(nodes[node.parent], `${d.story.id}:${nid} parent`);
      assert.ok(nodes[node.parent].children.includes(nid), `${d.story.id}:${nid} listed by parent`);
      assert.ok(node.via?.kind, `${d.story.id}:${nid} via`);
      if (node.ref) {
        assert.ok(nodes[node.ref] && !nodes[node.ref].ref, `${d.story.id}:${nid} ref target`);
        assert.equal(nodes[node.ref].doc, node.doc);
      } else {
        assert.ok(!full.has(node.doc), `${d.story.id}: ${node.doc} placed twice`);
        full.set(node.doc, nid);
      }
    }
    assert.deepEqual(new Set(full.keys()), new Set(d.chapters.map((c) => c.id)), d.story.id);
  }
});

test("V4: edges resolve to readable docs in an existing story; payloads carry no raw script", () => {
  const banned = ["script", "trigger", "conditions", "pictureKeys", "inlineSources"];
  const inspect = (x) => {
    if (!x || typeof x !== "object") return;
    for (const [k, v] of Object.entries(x)) {
      assert.ok(!banned.includes(k), k);
      inspect(v);
    }
  };
  for (const d of stories) {
    inspect(d.chapters);
    for (const c of d.chapters)
      for (const edge of [...c.next, ...c.choices.flatMap((o) => o.next)]) {
        assert.ok(byId.has(edge.story), `${c.id} -> ${edge.target}: story ${edge.story}`);
        assert.ok(docIn(edge.story, edge.target), `${c.id} -> ${edge.target} in ${edge.story}`);
      }
  }
});

test("anomaly categories are story roots with weighted, mutually exclusive outcomes", () => {
  const d = byId.get(owner("anomalies:crashed_ship_asteroid_category"));
  assert.equal(d.story.kind, "anomaly");
  assert.equal(d.story.category, "exploration");
  assert.equal(owner("anomaly.35"), d.story.id);
  assert.equal(owner("anomaly.65"), d.story.id);
  const card = d.chapters.find((c) => c.id === "anomalies:crashed_ship_asteroid_category");
  const outcomes = card.next.filter((e) => ["anomaly.35", "anomaly.65"].includes(e.target));
  assert.equal(outcomes.length, 2);
  assert.ok(outcomes.every((e) => e.kind === "random" && e.chance === 0.5 && e.group === outcomes[0].group));
  assert.ok(outcomes.find((e) => e.target === "anomaly.65").modified, "strategic-resource modifier noted");
});

test("shared helpers stay their own stories instead of becoming chapters of callers", () => {
  for (const hub of ["story.5", "story.1"]) {
    const sid = owner(hub);
    assert.ok(sid);
    assert.ok(!docIn(owner("anomaly.35"), hub), `${hub} not absorbed into the anomaly`);
  }
  const crashed = byId.get(owner("anomaly.35"));
  const edge = crashed.chapters.find((c) => c.id === "anomaly.35").next.find((e) => e.target === "story.5");
  assert.ok(edge && edge.story !== crashed.story.id, "the 30-day science report is a cross-story link");
});

test("known multi-stage stories keep their projects; crises remain distinct", () => {
  for (const id of ["akx.9000", "akx.9001", "akx.9005", "akx.9020", "special_projects:HORIZON_SIGNAL_PROJECT"])
    assert.equal(owner(id), "horizon-signal", id);
  assert.equal(owner("precursor.2000"), "cybrex");
  assert.equal(owner("crisis.11"), "prethoryn-scourge");
  assert.equal(owner("crisis.1007"), "unbidden");
  assert.equal(owner("crisis.2010"), "contingency");
  assert.equal(owner("crisis.8040"), "cetana");
  assert.notEqual(owner("crisis.7100"), "cetana", "Cosmogenesis shares the file but is a different crisis");
});

test("composed descriptions keep common text and switch only the conditional piece", () => {
  const doc = docIn(owner("anomaly.6710"), "anomaly.6710");
  assert.equal(doc.body.length, 1);
  const unknown = resolveBody(doc, { profile: {} });
  const all = unknown[0].paragraphs.flatMap((p) => p.parts);
  assert.ok(all.some((p) => p.status === null), "both gestalt alternatives visible while unknown");
  const gestalt = resolveBody(doc, { profile: { ethic_gestalt_consciousness: true } })[0].paragraphs.flatMap((p) => p.parts);
  const individual = resolveBody(doc, { profile: { ethic_gestalt_consciousness: false } })[0].paragraphs.flatMap((p) => p.parts);
  assert.equal(gestalt.length, individual.length);
  assert.notDeepEqual(gestalt.at(-1).text, individual.at(-1).text);
});

test("origin-specific options appear only for that origin", () => {
  const doc = docIn(owner("anomaly.15"), "anomaly.15");
  const keys = (profile) => resolveChoices(doc, { profile }).map((c) => c.key);
  assert.ok(keys({ origin_evolutionary_predators: true }).includes("anomaly.15.b.evopred"));
  assert.ok(!keys({ origin_shattered_ring: true }).includes("anomaly.15.b.evopred"));
});

test("Cybrex opens with discovery cards; the homeworld's arrivals are exclusive alternatives", () => {
  const d = byId.get("cybrex");
  const nodes = d.story.tree.nodes;
  const entries = nodes.n0.children.map((n) => nodes[n].doc);
  assert.equal(entries[0], "precursor.2000");
  // Reviewed: the discovery cards follow the introduction (any order), never precede it.
  const discoveries = Object.values(nodes).filter((n) => !n.ref && n.doc?.startsWith("anomalies:cybrex_"));
  assert.ok(discoveries.length >= 6);
  assert.ok(discoveries.every((n) => nodes[n.parent].doc === "precursor.2000"));
  const secrets = Object.values(nodes).find((n) => !n.ref && n.doc === "special_projects:CYBREX_SECRETS");
  assert.ok(["precursor.2101", "precursor.2102"].includes(nodes[secrets.parent].doc), "secrets follow the homeworld");
  const project = d.chapters.find((c) => c.id === "special_projects:CYBREX_HOMEWORLD_PROJECT");
  const arrivals = project.next.filter((e) => ["precursor.2101", "precursor.2102"].includes(e.target));
  assert.equal(arrivals.length, 2);
  assert.equal(arrivals[0].group, arrivals[1].group);
});

test("the complete original soundtrack is available as byte-for-byte MP3s", async () => {
  const p = await read("public/music/playlist.json");
  assert.equal(p.tracks.length, 23);
  assert.equal(p.loop, "playlist");
  assert.ok(p.tracks.reduce((n, t) => n + t.duration, 0) > 9600);
  for (const t of p.tracks) {
    assert.ok(t.title);
    assert.ok(t.artist);
    assert.equal((await stat("public/" + t.url)).size, t.bytes);
    assert.equal(createHash("sha256").update(await readFile("public/" + t.url)).digest("hex"), t.sha256);
  }
});

test("origin cards use the official identity and open the origin story", async () => {
  const origins = await read("public/data/origins.json");
  const cards = index.stories.filter((s) => s.kind === "origin");
  assert.equal(cards.length, 58);
  for (const s of cards) {
    const o = origins.find((o) => o.id === s.id);
    assert.ok(o, s.id);
    assert.equal(s.title.zh, o.title.zh.replace(/§./g, ""));
    assert.equal(s.start, "origin-intro:" + s.id);
    assert.ok(s.image);
  }
});
