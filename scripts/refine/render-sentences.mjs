// Renders every sentence that contains a display-time substitution, exactly as the site shows it (src/name-fill.js,
// no reading profile: all variants' fallbacks), with substitutions marked «…» and their placeholder keys listed.
// Output: docs/refine/placeholders/rendered/<group>.md (worksheets for the rendered-sentence review, one group per
// docs/refine/placeholders/groups.json group, plus the open reviewer issues of each story) and a summary of
// automatic flags. Usage: node scripts/refine/render-sentences.mjs
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fillNames, cleanRefs } from "../../src/name-fill.js";
import { evaluate } from "../../src/reading.js";

const names = JSON.parse(await readFile("public/stories/names.json", "utf8"));
const groups = JSON.parse(await readFile("docs/refine/placeholders/groups.json", "utf8")).groups;
const outDir = "docs/refine/placeholders/rendered";
await mkdir(outDir, { recursive: true });
const issuesByStory = {};
for (const g of groups) {
  try {
    const out = JSON.parse(await readFile(`docs/refine/placeholders/out/${g.id}.json`, "utf8"));
    for (const [sid, r] of Object.entries(out)) if (r?.issues?.length) issuesByStory[sid] = r.issues;
  } catch {}
}
// Exceptions recorded by the rendered review (out/rendered-*.json): re-checked in the next review pass.
const exceptionsByStory = {};
for (const f of (await import("node:fs")).readdirSync("docs/refine/placeholders/out").filter((n) => n.startsWith("rendered-") && n !== "rendered-specimens.json")) {
  for (const [sid, r] of Object.entries(JSON.parse(await readFile(`docs/refine/placeholders/out/${f}`, "utf8")))) {
    if (r?.exceptions?.length) exceptionsByStory[sid] = r.exceptions;
  }
}
const mark = (s) => s.replace(/[^]*([^]*)/g, "«$1»");
const FLAGS = {
  en: [/«[^»]*»\s«/, /\b(\w+) \1\b/i, /\bthe (our|this|that|the)\b/i, /\bthis name\b/i, /…/, /\b(they|we) (has|is|was)\b/i, /^[a-z]/, /^«[a-z]/],
  zh: [/这个名字/, /……/, /([一-鿿]{2})\1/, /的的/],
};
const SENT = /[^。！？!?\n]*?(?:[。！？!?]|\.(?=\s|$)|$)/g;
let total = 0, flagged = 0;
for (const g of groups) {
  const lines = [`# Rendered sentences ${g.id}`, ""];
  for (const sid of g.stories) {
    const d = JSON.parse(await readFile(`public/stories/${sid}.json`, "utf8"));
    const block = [];
    for (const c of d.chapters) {
      const strings = [c.title, ...c.texts, ...(c.sections || [])];
      for (const ch of c.choices || []) strings.push(ch.label, ...(ch.responses || []), ...(ch.tooltips || []));
      const seen = new Set();
      const before = block.length;
      for (const lang of ["zh", "en"]) {
        for (const s of strings) {
          const raw = s?.[lang] || "";
          if (!raw.includes("[")) continue;
          const filled = mark(cleanRefs(fillNames(raw, { lang, chapterNames: c.names, names, evaluate, ctx: { profile: {}, assumptions: {} } }), lang));
          for (const sent of filled.match(SENT) || []) {
            const t = sent.trim();
            if (!t.includes("«") || seen.has(t)) continue;
            seen.add(t);
            total++;
            const bad = FLAGS[lang].some((re) => re.test(t));
            if (bad) flagged++;
            block.push(`  - ${lang}${bad ? " ⚑" : ""} [${c.id}]: ${t.slice(0, 320)}`);
          }
        }
      }
      if (block.length > before) {
        const keys = Object.entries(c.names || {}).filter(([k]) => !k.startsWith("'") && !k.startsWith("concept_"))
          .map(([k, v]) => `\`${k}\` = ${v.zh || "∅"} / ${v.en || "∅"}`);
        // Keys the game fills from its own scripted text (overridable per document too).
        const own = new Set(Object.keys(c.names || {}));
        for (const s of strings) for (const lang of ["zh", "en"]) for (const m of (s?.[lang] || "").matchAll(/\[([^\[\]]+)\]/g)) {
          const k = m[1];
          if (!own.has(k) && !k.startsWith("'") && !k.startsWith("concept_")) { own.add(k); keys.push(`\`${k}\` = (game's scripted wording)`); }
        }
        if (keys.length) block.splice(before, 0, `  · keys [${c.id}]: ${keys.join("; ")}`);
      }
    }
    if (!block.length) continue;
    lines.push(`## ${sid}`);
    for (const i of exceptionsByStory[sid] || []) lines.push(`- earlier exception: ${i}`);
    lines.push(...block, "");
  }
  await writeFile(`${outDir}/${g.id}.md`, lines.join("\n"));
}
// Specimens (museum): same rules, wording from content/museum/placeholders.json (via specimens.json).
const specimens = JSON.parse(await readFile("public/museum/specimens.json", "utf8")).specimens;
const spLines = ["# Rendered sentences specimens", ""];
for (const sp of specimens) {
  const block = [];
  for (const field of ["short", "details"]) {
    for (const lang of ["zh", "en"]) {
      const raw = sp[field]?.[lang] || "";
      if (!raw.includes("[")) continue;
      const t = mark(fillNames(raw.replace(/§[A-Za-z!]|£\w+£/g, ""), { lang, chapterNames: sp.placeholders })).replace(/\s+/g, " ").trim();
      total++;
      const bad = FLAGS[lang].some((re) => re.test(t));
      if (bad) flagged++;
      block.push(`  - ${lang}${bad ? " ⚑" : ""} [${field}]: ${t.slice(0, 400)}`);
    }
  }
  if (!block.length) continue;
  const keys = Object.entries(sp.placeholders || {}).map(([k, v]) => `\`${k}\` = ${v.zh || "∅"} / ${v.en || "∅"}`);
  spLines.push(`## ${sp.key}`, `  · keys [${sp.key}]: ${keys.join("; ") || "(none reviewed)"}`, ...block, "");
}
await writeFile(`${outDir}/specimens.md`, spLines.join("\n"));
await writeFile(`${outDir}/SUMMARY.md`, `# Rendered-sentence census\n\nSentences with substitutions: ${total}; automatically flagged (⚑): ${flagged}.\n`);
console.log({ total, flagged });
