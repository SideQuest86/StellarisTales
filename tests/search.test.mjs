import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  clean, stem, terms, parseQuery, hashTerm, SHARDS, FIELD, parseShard, decodePostings, intersect, groupByStory,
  highlight, makeSnippet, bestSnippet, effectLabels, SearchIndex, shardOf, withinOne, needlesOf,
} from "../src/search.js";
import { buildSearchIndex } from "../scripts/build-search-index.mjs";

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

test("clean strips placeholders, colour codes, icons and references", () => {
  assert.equal(clean("The [Root.GetName] §Ygold§! £energy£ of $REF$ <b>x</b>").replace(/\s+/g, " ").trim(), "The gold of x");
  assert.ok(!/[\[\]§£$]/.test(clean("[a.b|c [nested]] §R1§! $tech_x$ £minerals£")));
});

test("tokenizer: english stems and drops stop words; chinese gives bigrams", () => {
  assert.deepEqual(terms("The Libraries and the Boxes of Ships"), ["library", "box", "ship"]);
  assert.equal(stem("glass"), "glass");
  assert.deepEqual(terms("虚境之门"), ["虚境", "境之", "之门"]);
  assert.deepEqual(terms("单"), []);
  const mixed = terms("Zeta风暴");
  assert.ok(mixed.includes("zeta") && mixed.includes("风暴"));
});

test("parseQuery: groups, stop words, cjk runs", () => {
  const g = parseQuery("The Tempests 神秘风暴");
  assert.deepEqual(g.map((x) => [x.kind, x.literal]), [["latin", "tempests"], ["cjk", "神秘风暴"]]);
  assert.deepEqual(g[1].terms, ["神秘", "秘风", "风暴"]);
  assert.deepEqual(parseQuery("a"), []);
  assert.deepEqual(parseQuery("风")[0].terms, ["风"], "a lone character is a unigram term");
});

test("parseQuery partial: only the last Latin word of 3+ letters becomes a prefix group", () => {
  const g = parseQuery("crisis bea", { partial: true });
  assert.deepEqual(g.map((x) => !!x.prefix), [false, true]);
  assert.deepEqual(parseQuery("crisis bea").map((x) => !!x.prefix), [false, false], "not partial by default");
  assert.ok(!parseQuery("crisis be", { partial: true }).some((x) => x.prefix), "two letters / stop words stay exact");
  assert.ok(!parseQuery("crisis 风", { partial: true }).some((x) => x.prefix));
});

test("withinOne: one substitution, insertion, deletion or transposition", () => {
  assert.ok(withinOne("beacon", "beacon") && withinOne("beacon", "beacn") && withinOne("beacon", "beaccon") && withinOne("beacon", "beacin") && withinOne("beacon", "baecon"));
  assert.ok(!withinOne("beacon", "bacon1x") && !withinOne("beacon", "bcaeon") && !withinOne("beacon", "beac"));
});

test("shardOf keeps every term with the same first two letters in one shard", () => {
  assert.equal(shardOf("leviathan"), shardOf("levant"));
  assert.ok(shardOf("虫") < SHARDS && shardOf("风暴") < SHARDS);
  assert.equal(shardOf("2200"), hashTerm("22"));
});

test("highlight escapes everything and marks matches only", () => {
  const html = highlight('A <script>alert(1)</script> & Tempest "x"', ["tempest", "script"], esc);
  assert.ok(!html.includes("<script>"));
  assert.match(html, /&lt;<mark>script<\/mark>&gt;/);
  assert.match(html, /&amp; <mark>Tempest<\/mark> &quot;x&quot;/);
  assert.equal(highlight("<b>", [], esc), "&lt;b&gt;");
  const snip = makeSnippet("x".repeat(200) + " needle &<> " + "y".repeat(200), ["needle"]);
  assert.ok(snip.text.startsWith("…") && snip.text.includes("needle"));
  assert.ok(!highlight(snip.text, ["needle"], esc).includes("<>"));
});

function lists(map) {
  return new Map(Object.entries(map).map(([t, arr]) => [t, { docs: arr.map((a) => a[0]), masks: arr.map((a) => a[1]) }]));
}

test("ranking: name > choice/text > effect, together-in-field and more terms rank higher; AND semantics", () => {
  const groups = parseQuery("ancient ruins");
  const hits = intersect(groups, lists({
    ancient: [[1, FIELD.effect], [2, FIELD.text], [3, FIELD.name], [4, FIELD.text], [6, FIELD.text]],
    ruin: [[1, FIELD.effect], [2, FIELD.text], [3, FIELD.name], [4, FIELD.choice], [5, FIELD.text]],
  }));
  const by = Object.fromEntries(hits.map((h) => [h.doc, h]));
  assert.deepEqual(Object.keys(by).sort(), ["1", "2", "3", "4"], "docs lacking one word are excluded (AND)");
  assert.ok(by[3].score > by[2].score && by[2].score > by[1].score);
  assert.ok(by[2].score > by[4].score, "both words in the same field beat words split across fields");
  assert.equal(by[3].type, "name");
  assert.equal(by[1].type, "effect");
  const single = intersect(parseQuery("ruins"), lists({ ruin: [[1, FIELD.effect], [2, FIELD.text], [3, FIELD.name]] }));
  assert.deepEqual(single.sort((a, b) => b.score - a.score).map((h) => h.type), ["name", "text", "effect"]);
  assert.deepEqual(intersect(groups, lists({ ancient: [[1, 2]] })), []);
});

test("chinese substring: all bigrams required", () => {
  const g = parseQuery("风暴来临");
  const hits = intersect(g, lists({ 风暴: [[1, 2], [2, 2]], 暴来: [[1, 2]], 来临: [[1, 2], [2, 2]] }));
  assert.deepEqual(hits.map((h) => h.doc), [1]);
});

test("groupByStory keeps one best chapter per story and counts the rest", () => {
  const rows = groupByStory([{ doc: 1, score: 3 }, { doc: 2, score: 9 }, { doc: 12, score: 4 }], (d) => (d < 10 ? 0 : 1));
  assert.equal(rows.length, 2);
  assert.equal(rows[0].best.doc, 2);
  assert.equal(rows[0].count, 2);
});

test("bestSnippet verifies the literal chinese phrase and shows no raw tokens", () => {
  const fields = [{ type: "text", lang: "zh", text: "他们发现了神秘的风暴" }];
  assert.equal(bestSnippet(fields, parseQuery("神秘风暴"), "zh"), null, "bigram false positive dropped");
  const ok = bestSnippet(fields, parseQuery("神秘的风"), "zh");
  assert.equal(ok.type, "text");
  assert.ok(ok.snippet.text.includes("神秘的风"));
});

test("effectLabels reads panel labels, stats and bullets only", () => {
  const out = effectLabels({ choices: [[{ kind: "resource", label: { zh: "能量", en: "Energy" }, stats: [{ label: { zh: "x", en: "Output" }, text: "+1" }], source: "a.txt:1", effects: [{ kind: "more", label: { en: "skip" } }] }]], doc: { bullets: { zh: [{ text: "甲" }], en: [{ text: "A" }] } } });
  assert.deepEqual(out.map((l) => l.en), ["Energy", "Output", "A"]);
});

async function fixture() {
  const dir = await mkdtemp(join(tmpdir(), "search-fx-"));
  await mkdir(join(dir, "stories"), { recursive: true });
  await mkdir(join(dir, "effects"), { recursive: true });
  await mkdir(join(dir, "museum"), { recursive: true });
  await writeFile(join(dir, "stories/index.json"), JSON.stringify({ stories: [{ id: "alpha", title: { zh: "甲", en: "Alpha" } }, { id: "beta", title: { zh: "乙", en: "Beta" } }] }));
  const ch = (id, title, text, choice, resp) => ({ id, title, texts: [text], sections: [], choices: [{ label: choice, responses: resp ? [resp] : [] }] });
  await writeFile(join(dir, "stories/alpha.json"), JSON.stringify({ chapters: [
    ch("a.1", { zh: "古老遗迹", en: "Ancient Ruins" }, { zh: "[Root.GetName]发现了§Y神秘§!风暴", en: "[Root.GetName] found a <script>&</script> tempest" }, { zh: "调查", en: "Investigate" }),
    ch("a.2", { zh: "第二章", en: "Chapter Two" }, { zh: "无虫", en: "Nothing" }, { zh: "离开", en: "Leave" }, { zh: "舰队出发", en: "The fleet departs; a leviathan beacon crisis" }),
  ] }));
  await writeFile(join(dir, "stories/beta.json"), JSON.stringify({ chapters: [ch("b.1", { zh: "乙一", en: "Beta One" }, { zh: "空", en: "Empty" }, { zh: "好", en: "Fine" })] }));
  await writeFile(join(dir, "effects/alpha.json"), JSON.stringify({ docs: { "a.2": { choices: [[{ kind: "resource", label: { zh: "获得能量", en: "Gain energy credits" } }]] } } }));
  await writeFile(join(dir, "museum/specimens.json"), JSON.stringify({ specimens: [{ key: "sp1", name: { zh: "酸性孢子", en: "Acidic Spores" }, short: { zh: "短", en: "short" }, details: { zh: "腐蚀", en: "corrosive gas" } }] }));
  return dir;
}

test("generator is deterministic and the index answers queries through SearchIndex", async () => {
  const dir = await fixture();
  try {
    const a = await buildSearchIndex({ publicDir: dir }), b = await buildSearchIndex({ publicDir: dir });
    assert.deepEqual([...a.keys()], [...b.keys()]);
    for (const [k, v] of a) assert.ok(Buffer.compare(v, b.get(k)) === 0, k + " is byte-identical");
    assert.equal(a.size, SHARDS + 3);
    const meta = JSON.parse(a.get("meta.json"));
    assert.deepEqual(meta.ids, ["a.1", "a.2", "b.1"]);
    assert.deepEqual(meta.first, [0, 2]);
    assert.equal(meta.spStart, 3);
    // raw tokens never indexed
    const all = [...a].filter(([k]) => k.endsWith(".bin")).flatMap(([, v]) => [...parseShard(v).keys()]);
    assert.ok(all.every((t) => !/[\[\]§£$<>&.]/.test(t)), "no token fragments: " + all.filter((t) => /[\[\]§£$<>&.]/.test(t)));
    assert.ok(!all.includes("root") && !all.includes("getname"));
    const si = new SearchIndex({
      base: "", fetchJson: async (p) => JSON.parse(a.get(p.replace("search/", ""))),
      fetchBytes: async (p) => new Uint8Array(a.get(p.replace("search/", ""))),
    });
    await si.load("en");
    const run = async (q) => (await si.lookup(parseQuery(q))).map((h) => [h.doc, h.type]).sort((x, y) => x[0] - y[0]);
    assert.deepEqual(await run("tempest"), [[0, "text"]]);
    assert.deepEqual(await run("energy credits"), [[1, "effect"]]);
    assert.deepEqual(await run("ancient ruins"), [[0, "name"]]);
    assert.deepEqual(await run("fleet departs"), [[1, "text"]]);
    assert.deepEqual(await run("神秘风暴"), [[0, "text"]]);
    assert.deepEqual(await run("tempest nothing"), [], "AND across words and chapters");
    assert.deepEqual(await run("corrosive"), [[3, "text"]]);
    assert.deepEqual(await run("investigate"), [[0, "choice"]]);
    assert.equal(si.storyIndex(2), 1);
    assert.ok(decodePostings(parseShard(a.get(`s${shardOf("tempest")}.bin`)).get("tempest")).docs[0] === 0);
    // prefix: the last word may be partial; earlier words stay exact
    const runP = async (q) => (await si.lookup(parseQuery(q, { partial: true }))).map((h) => h.doc).sort();
    assert.deepEqual(await runP("leviath"), [1]);
    assert.deepEqual(await runP("leviathans"), [1], "inflected full word still matches via its stem");
    assert.deepEqual(await runP("crisis bea"), [1]);
    assert.deepEqual(await runP("beac crisis"), [], "only the last word is a prefix");
    assert.deepEqual(await runP("zzz"), []);
    // single CJK character reaches body text (and titles); common-character fallback is the reader's job
    const uni = async (q) => (await si.lookup(parseQuery(q))).map((h) => [h.doc, h.type]).sort((x, y) => x[0] - y[0]);
    assert.deepEqual(await uni("虫"), [[1, "text"]]);
    assert.deepEqual(await uni("遗"), [[0, "name"]]);
    // typo: one edit, length >= 5, only with approx
    assert.deepEqual(await run("leviathn"), [], "no typo tolerance by default");
    const near = await si.lookup(parseQuery("leviathn"), { approx: true });
    assert.deepEqual(near.map((h) => h.doc), [1]);
    assert.equal(near.approx, true);
    assert.deepEqual(needlesOf(near.groups), ["leviathan"], "highlights the matched word, not the typo");
    assert.equal((await si.lookup(parseQuery("beacn"), { approx: true })).approx, true);
    assert.equal((await si.lookup(parseQuery("beac"), { approx: true })).length, 0, "words under 5 letters are never corrected");
    assert.equal((await si.lookup(parseQuery("leviathan"), { approx: true })).approx, false, "exact hits are not marked approximate");
    assert.equal((await si.lookup(parseQuery("xylophone"), { approx: true })).length, 0);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
