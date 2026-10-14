// Review-record audit: every visible story must have a reviewed fragment and a source-grounded guide.
//   node scripts/audit-guides.mjs [--strict]   → summary per category + verification/guide-audit.json
// Checks per story: fragment content/stories/<id>.json with review.status "reviewed", a date, a reviewer and
// sources; guide public/summaries/<id>.md that exists, is not a draft skeleton, has the five guide sections
// (REVIEW-GUIDE.md "Guide format", Chinese or English heading) and cites game files (events/… or common/… paths).
// This verifies that each review left evidence; it cannot verify that the evidence is right.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";

const index = JSON.parse(await readFile("public/stories/index.json", "utf8"));
const SECTIONS = [/如何开始|How it starts/i, /剧情脉络|Story outline|Outline/i, /分支|Branches|outcomes/i, /条件|Conditions|variants/i, /审阅|Review notes/i];
const CITES = /\b(events|common)\/[\w/.-]+\.txt|\b[\w-]+\.txt:\d+/;
const kinds = ["noFragment", "notReviewed", "noSources", "noReviewer", "noGuide", "draftGuide", "missingSections", "noCitation"];
const out = {};
for (const s of index.stories.filter((x) => x.visible)) {
  const b = (out[s.category] ||= { stories: 0, ...Object.fromEntries(kinds.map((k) => [k, 0])), guideChars: 0, examples: {} });
  b.stories++;
  const flag = (k) => { b[k]++; (b.examples[k] ||= []).length < 5 && b.examples[k].push(s.id); };
  const fragPath = `content/stories/${s.id}.json`;
  const frag = existsSync(fragPath) ? JSON.parse(await readFile(fragPath, "utf8")) : null;
  if (!frag) flag("noFragment");
  const review = frag?.review || {};
  if (review.status !== "reviewed") flag("notReviewed");
  if (!review.sources?.length) flag("noSources");
  if (!review.reviewer || !review.date) flag("noReviewer");
  const guidePath = `public/summaries/${s.id}.md`;
  if (!existsSync(guidePath)) { flag("noGuide"); continue; }
  const guide = await readFile(guidePath, "utf8");
  b.guideChars += guide.length;
  if (/Draft skeleton|草稿骨架/i.test(guide)) flag("draftGuide");
  if (SECTIONS.some((re) => !re.test(guide))) flag("missingSections");
  if (!CITES.test(guide) && !(review.sources || []).some((x) => CITES.test(x))) flag("noCitation");
}
console.log(["category", "stories", ...kinds, "avgGuideChars"].join("\t"));
for (const [cat, b] of Object.entries(out)) console.log([cat, b.stories, ...kinds.map((k) => b[k]), Math.round(b.guideChars / b.stories)].join("\t"));
await mkdir("verification", { recursive: true });
await writeFile("verification/guide-audit.json", JSON.stringify(out, null, 1) + "\n");
if (process.argv.includes("--strict")) {
  const bad = Object.entries(out).flatMap(([c, b]) => kinds.filter((k) => b[k]).map((k) => `${c}.${k}=${b[k]} e.g. ${b.examples[k].join(", ")}`));
  if (bad.length) { console.error("guide audit failed:\n" + bad.join("\n")); process.exit(1); }
}
