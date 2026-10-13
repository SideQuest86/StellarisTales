// Reading-content audit over every compiled story (public/stories/<id>.json).
//   node scripts/audit-content.mjs            → summary per category + verification/content-audit.json
// Checks, per document: a title and body text in both languages, labelled choices, no raw localisation keys or
// unprocessed markup in visible text, and that every continuation points at a document that exists (in the story or,
// for cross-story links, in the record map). Original text that is genuinely empty in the game files is reported, not
// "fixed": the archive never writes replacement text.
import { readFile, readdir, writeFile, mkdir } from "node:fs/promises";

const dir = "public/stories";
const records = JSON.parse(await readFile(`${dir}/records.json`, "utf8"));
const index = JSON.parse(await readFile(`${dir}/index.json`, "utf8"));
const category = new Map(index.stories.map((s) => [s.id, s.category]));
const skip = new Set(["index.json", "excerpts.json", "records.json", "names.json", "profile.json", "glyphs.json"]);
const RAW_KEY = /(?<![\w$])[a-z][a-z0-9_]*\.\d+\.[a-z][a-z0-9_.]*[a-z0-9_](?![\w$])/; // e.g. leviathans.600.desc
// § colour codes and literal "\n" must not survive extraction. £icon£ tokens are kept in the data and removed by the
// reader (the resource name follows the icon in the game's own text), so they are not reported.
const MARKUP = /§[A-Za-z!]|\\n/;
const has = (t) => !!(t && String(t).trim());
const texts = (c) => {
  const out = [];
  const walk = (n) => {
    if (!n || typeof n !== "object") return;
    if (Array.isArray(n)) return n.forEach(walk);
    if (typeof n.zh === "string" || typeof n.en === "string") out.push(n);
    else for (const v of Object.values(n)) walk(v);
  };
  walk(c.texts);
  walk(c.body);
  walk(c.sections);
  return out;
};
const empty = () => ({ stories: 0, docs: 0, noTitleZh: 0, noTitleEn: 0, noTextZh: 0, noTextEn: 0, unlabeledChoices: 0, rawKeys: 0, markup: 0, brokenLinks: 0, examples: {} });
const byCategory = {};
const note = (bucket, kind, example) => {
  bucket[kind]++;
  (bucket.examples[kind] ||= []).length < 6 && bucket.examples[kind].push(example);
};
for (const file of (await readdir(dir)).filter((f) => f.endsWith(".json") && !skip.has(f))) {
  const story = JSON.parse(await readFile(`${dir}/${file}`, "utf8"));
  const sid = file.slice(0, -5);
  const bucket = (byCategory[category.get(sid) || "unlisted"] ||= empty());
  bucket.stories++;
  const docs = new Set(story.chapters.map((c) => c.id));
  for (const c of story.chapters) {
    bucket.docs++;
    const where = `${sid} ${c.id}`;
    if (!has(c.title?.zh)) note(bucket, "noTitleZh", where);
    if (!has(c.title?.en)) note(bucket, "noTitleEn", where);
    const body = texts(c);
    if (!body.some((t) => has(t.zh))) note(bucket, "noTextZh", where);
    if (!body.some((t) => has(t.en))) note(bucket, "noTextEn", where);
    const visible = [c.title, ...body, ...(c.choices || []).map((x) => x.label)].filter(Boolean);
    for (const t of visible)
      for (const lang of ["zh", "en"]) {
        const s = t[lang] || "";
        if (RAW_KEY.test(s)) note(bucket, "rawKeys", `${where} [${lang}] ${s.match(RAW_KEY)[0]}`);
        if (MARKUP.test(s)) note(bucket, "markup", `${where} [${lang}] ${s.match(MARKUP)[0]}`);
      }
    for (const choice of c.choices || []) if (!has(choice.label?.zh) || !has(choice.label?.en)) note(bucket, "unlabeledChoices", `${where} ${choice.key}`);
    const edges = [...(c.next || []), ...(c.choices || []).flatMap((x) => x.next || [])];
    for (const e of edges) {
      const target = e.target || e.to || e.id;
      if (target && !docs.has(target) && !records[target]) note(bucket, "brokenLinks", `${where} → ${target}`);
    }
  }
}
const kinds = ["noTitleZh", "noTitleEn", "noTextZh", "noTextEn", "unlabeledChoices", "rawKeys", "markup", "brokenLinks"];
console.log(["category", "stories", "docs", ...kinds].join("\t"));
for (const [cat, b] of Object.entries(byCategory)) console.log([cat, b.stories, b.docs, ...kinds.map((k) => b[k])].join("\t"));
await mkdir("verification", { recursive: true });
await writeFile("verification/content-audit.json", JSON.stringify(byCategory, null, 1) + "\n");
// --strict (CI): fail on problems the pipeline can cause. Missing titles are only reported: some windows have
// BLANK_STRING or an undefined localisation key in the game itself.
if (process.argv.includes("--strict")) {
  const fatal = ["noTextZh", "noTextEn", "unlabeledChoices", "rawKeys", "markup", "brokenLinks"];
  const bad = Object.entries(byCategory).flatMap(([cat, b]) => fatal.filter((k) => b[k]).map((k) => `${cat}.${k}=${b[k]} e.g. ${b.examples[k][0]}`));
  if (bad.length) {
    console.error("content audit failed:\n" + bad.join("\n"));
    process.exit(1);
  }
}
