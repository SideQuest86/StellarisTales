// Markdown tables from the files written by scripts/bench/opening.mjs (round 5):
//   node scripts/bench/opening-summary.mjs verification/round5/perf/final
// One row per file: scenario, tag, reps, then p50 / max of the worst frame in the whole window, in the opening frames
// (first 500 ms) and after them (the story map's build), per variant. Frame times are rAF intervals on a ~170 Hz display
// (steps of 5.9 ms).
import { readdirSync, readFileSync } from "node:fs";

const dir = process.argv[2] || "verification/round5/perf/final";
const files = readdirSync(dir).filter((f) => /^opening-.*\.json$/.test(f)).sort();
const rows = [];
for (const f of files) {
  const j = JSON.parse(readFileSync(`${dir}/${f}`, "utf8"));
  const names = Object.keys(j.summary);
  const cell = (k, field) => names.map((n) => `${j.summary[n][k][field]}`);
  const pair = (k) => names.map((n) => `${j.summary[n][k].p50} / ${j.summary[n][k].max}`).join(" → ");
  const tag = f.replace(/^opening-/, "").replace(/\.json$/, "");
  rows.push(`| ${tag} | ${j.reps} | ${pair("maxFrame")} | ${pair("actionFrame")} | ${pair("laterFrame")} |`);
  if (j.scenario === "cold") {
    const extra = (k) => names.map((n) => `${j.summary[n][k].p50} / ${j.summary[n][k].max}`).join(" → ");
    rows.push(`| ${tag}: first 700 ms · first scene frame at · button at | ${j.reps} | ${extra("startup")} · ${extra("firstDraw")} · ${extra("buttonAt")} |  |  |`);
  }
}
console.log(`variants: ${files.length ? Object.keys(JSON.parse(readFileSync(`${dir}/${files[0]}`, "utf8")).summary).join(" → ") : "-"}`);
console.log("| scenario | reps | worst frame p50 / max (ms) | opening frames (≤ 500 ms) | after (map build) |");
console.log("| --- | --- | --- | --- | --- |");
for (const r of rows) console.log(r);
