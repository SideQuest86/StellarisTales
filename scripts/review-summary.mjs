// Markdown summary of story structure and manual review progress (for CI job summaries and status updates).
// Reads public/data/story-coverage.json and verification/chronology/<category>.json (written by audit-categories.mjs).
// Review counts are progress, not acceptance: a category is accepted only in content/chronology/REVIEW.md.
import { readFile } from "node:fs/promises";
const read = async (p) => JSON.parse(await readFile(p, "utf8"));
const coverage = await read("public/data/story-coverage.json");
const names = { origins: "C1 Origins 起源", precursors: "C2 Precursors 先驱者", exploration: "C3 Exploration 深空异闻", rifts: "C4 Astral rifts 星界裂隙",
  crisis: "C5 Crises 天灾", leviathans: "C6 Leviathans 巨兽与城邦", society: "C7 Civilizations 文明纪事", stories: "C8 Chronicles 银河轶事" };
const lines = ["## Story archive status", "", `Model V${coverage.model} · ${coverage.stories} stories · ${coverage.readableDocs} readable documents (${coverage.assignedDocs} assigned) · ${coverage.hubs} shared hubs`, "",
  "| Category | Stories | Docs | Reviewed | Partial | Unreviewed | Structural failures |", "| --- | ---: | ---: | ---: | ---: | ---: | ---: |"];
let total = { stories: 0, reviewed: 0, partial: 0, unreviewed: 0 };
for (const [key, label] of Object.entries(names)) {
  let r;
  try { r = await read(`verification/chronology/${key}.json`); } catch { continue; }
  const rv = r.review || {};
  lines.push(`| ${label} | ${r.stories} | ${r.docs} | ${rv.reviewed || 0} | ${rv.partial || 0} | ${rv.unreviewed || 0} | ${r.failures.length} |`);
  total.stories += r.stories; total.reviewed += rv.reviewed || 0; total.partial += rv.partial || 0; total.unreviewed += rv.unreviewed || 0;
}
lines.push(`| **Total** | ${total.stories} | | ${total.reviewed} | ${total.partial} | ${total.unreviewed} | |`, "");
const pct = total.stories ? ((100 * total.reviewed) / total.stories).toFixed(1) : "0";
lines.push(`Manual review progress: **${pct}%** of stories reviewed. Review status is evidence of progress, not acceptance (see content/chronology/REVIEW.md).`, "");
if (coverage.warnings?.length) lines.push(`<details><summary>${coverage.warnings.length} compiler warnings (cross-review follow-ups)</summary>`, "", ...coverage.warnings.map((w) => `- ${w}`), "", "</details>", "");
if (coverage.orphanFragments?.length) lines.push(`<details><summary>${coverage.orphanFragments.length} orphan fragments (story id no longer produced)</summary>`, "", ...coverage.orphanFragments.map((w) => `- ${w}`), "", "</details>", "");
console.log(lines.join("\n"));
