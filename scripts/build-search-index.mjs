// Generates the lazily-loaded full-text index public/search/ (see src/search.js for the reader).
//   node scripts/build-search-index.mjs [--public public] [--out public/search]
// Output (deterministic: same input -> byte-identical files):
//   meta.json        { v, shards, stories[], first[] (first doc id per story), ids[] (chapter ids), spStart, spKeys[] }
//   titles-zh.json / titles-en.json   display titles per doc id (chapters, then specimens)
//   s0.bin … s31.bin inverted index shards (term -> delta-varint postings, mask = name|text|choice|effect)
// A document is one (story, chapter) pair, or one museum specimen. Terms: stemmed Latin words and CJK bigrams from
// both languages in one term space, so a query in either language matches either language's text.
import { readFile, writeFile, mkdir, readdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve, join } from "node:path";
import { pathToFileURL } from "node:url";
import { FIELD, FORMAT, SHARDS, clean, terms, hashTerm, writeVarint, effectLabels } from "../src/search.js";

const readJson = async (p) => JSON.parse(await readFile(p, "utf8"));
const both = (v) => (v && typeof v === "object" ? [v.zh, v.en] : [v]).filter((x) => typeof x === "string" && x);

export async function buildSearchIndex({ publicDir }) {
  const index = await readJson(join(publicDir, "stories/index.json"));
  const stories = [], first = [], ids = [], titleZh = [], titleEn = [];
  const docs = []; // Map term -> mask, per doc
  const addDoc = (fields) => {
    const m = new Map();
    for (const [bit, strings] of fields) for (const s of strings) for (const t of terms(clean(s))) m.set(t, (m.get(t) || 0) | bit);
    docs.push(m);
  };
  for (const story of index.stories) {
    const file = join(publicDir, `stories/${story.id}.json`);
    if (!existsSync(file)) continue;
    const data = await readJson(file);
    if (!Array.isArray(data.chapters)) continue;
    const efile = join(publicDir, `effects/${story.id}.json`);
    const effects = existsSync(efile) ? await readJson(efile) : {};
    stories.push(story.id);
    first.push(docs.length);
    data.chapters.forEach((c) => {
      ids.push(c.id);
      titleZh.push(clean(c.title?.zh || c.title?.en || "").trim().replace(/\s+/g, " "));
      titleEn.push(clean(c.title?.en || c.title?.zh || "").trim().replace(/\s+/g, " "));
      const text = [...(c.texts || []), ...(c.sections || [])];
      for (const ch of c.choices || []) for (const r of ch.responses || []) text.push(r);
      if (c.ending) text.push(c.ending.label, c.ending.note);
      const choice = [];
      for (const ch of c.choices || []) { choice.push(ch.label); for (const v of ch.labelVariants || []) choice.push(v.label); }
      let eff = effectLabels(effects.docs?.[c.id]);
      if (c.id === story.start && effects.origin) eff = eff.concat(effectLabels(effects.origin));
      addDoc([
        [FIELD.name, both(c.title)],
        [FIELD.text, text.flatMap(both)],
        [FIELD.choice, choice.flatMap(both)],
        [FIELD.effect, eff.flatMap(both)],
      ]);
    });
  }
  const spStart = docs.length, spKeys = [];
  const spFile = join(publicDir, "museum/specimens.json");
  if (existsSync(spFile)) {
    for (const s of (await readJson(spFile)).specimens || []) {
      spKeys.push(s.key);
      titleZh.push(clean(s.name?.zh || s.name?.en || "").trim());
      titleEn.push(clean(s.name?.en || s.name?.zh || "").trim());
      addDoc([[FIELD.name, both(s.name)], [FIELD.text, [...both(s.short), ...both(s.details)]]]);
    }
  }
  // Invert.
  const inv = new Map();
  docs.forEach((m, doc) => { for (const [t, mask] of m) { let l = inv.get(t); if (!l) inv.set(t, (l = [])); l.push(doc, mask); } });
  const shardTerms = Array.from({ length: SHARDS }, () => []);
  for (const t of [...inv.keys()].sort()) shardTerms[hashTerm(t)].push(t);
  const enc = new TextEncoder();
  const files = new Map();
  shardTerms.forEach((list, k) => {
    const out = [];
    writeVarint(out, list.length);
    for (const t of list) {
      const tb = enc.encode(t);
      writeVarint(out, tb.length);
      for (const b of tb) out.push(b);
      const post = [], l = inv.get(t);
      let prev = 0;
      for (let i = 0; i < l.length; i += 2) { writeVarint(post, (l[i] - prev) * 16 + l[i + 1]); prev = l[i]; }
      writeVarint(out, post.length);
      for (const b of post) out.push(b);
    }
    files.set(`s${k}.bin`, Buffer.from(out));
  });
  const json = (v) => Buffer.from(JSON.stringify(v));
  files.set("meta.json", json({ v: FORMAT, shards: SHARDS, stories, first, ids, spStart, spKeys, docs: docs.length }));
  files.set("titles-zh.json", json(titleZh));
  files.set("titles-en.json", json(titleEn));
  return files;
}

async function main() {
  const arg = (n, d) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : d; };
  const publicDir = resolve(arg("--public", "public"));
  const outDir = resolve(arg("--out", join(publicDir, "search")));
  const files = await buildSearchIndex({ publicDir });
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });
  const { gzipSync } = await import("node:zlib");
  let raw = 0, gz = 0;
  for (const [name, buf] of files) {
    await writeFile(join(outDir, name), buf);
    raw += buf.length;
    gz += gzipSync(buf, { level: 9 }).length;
  }
  console.log(`Search index: ${files.size} files, ${(raw / 1024).toFixed(0)} KB raw, ${(gz / 1024).toFixed(0)} KB gzip -> ${outDir}`);
}
if (import.meta.url === pathToFileURL(process.argv[1] || "").href) await main();
