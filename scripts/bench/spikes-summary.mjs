// Pool several scripts/verify-frame-spikes.mjs result files per variant (file names contain the variant, e.g.
// frame-spikes-base-r1.json, frame-spikes-cand-r1.json) into one table: p50 / max of the per-run worst frame, per scenario.
//   node scripts/bench/spikes-summary.mjs verification/round5/perf/final
import { readdirSync, readFileSync } from "node:fs";

const STALL = Number(process.env.STALL || 900);
const dir = process.argv[2] || "verification/round5/perf/final";
const groups = {};
for (const f of readdirSync(dir).filter((name) => /^frame-spikes-(\w+)-r\d+\.json$/.test(name))) {
  const variant = f.match(/^frame-spikes-(\w+)-r\d+\.json$/)[1];
  const j = JSON.parse(readFileSync(`${dir}/${f}`, "utf8"));
  for (const [scenario, s] of Object.entries(j.scenarios)) {
    const g = ((groups[variant] ||= {})[scenario] ||= { max: [], action: [], later: [] });
    // A frame over STALL ms is a system stall (machine / browser hang, seen as the same ~1005 ms value in unrelated scenarios), not a page cost: counted separately.
    g.max.push(...s.maxFrameMs.runs.filter((v) => v <= STALL));
    g.stalls = (g.stalls || 0) + s.maxFrameMs.runs.filter((v) => v > STALL).length;
    // per-run phase maxima are not stored per run: keep the file medians (5 runs each)
    g.action.push(s.actionPhaseMaxMs.p50);
    g.later.push(s.laterPhaseMaxMs.p50);
  }
}
const pct = (a, p) => { const s = [...a].sort((x, y) => x - y); return +s[Math.min(s.length - 1, Math.floor((p / 100) * s.length))].toFixed(1); };
const variants = Object.keys(groups);
console.log(`| scenario (verify-frame-spikes, ${variants.join(" → ")}) | n | worst frame p50 / max (ms) | opening frames, median of file medians | after, median of file medians |`);
console.log("| --- | --- | --- | --- | --- |");
for (const scenario of Object.keys(groups[variants[0]])) {
  const cells = variants.map((v) => groups[v][scenario]);
  console.log(`| ${scenario} | ${cells[0].max.length} | ${cells.map((c) => `${pct(c.max, 50)} / ${Math.max(...c.max)}${c.stalls ? ` (+${c.stalls} stalled)` : ""}`).join(" → ")} | ${cells.map((c) => pct(c.action, 50)).join(" → ")} | ${cells.map((c) => pct(c.later, 50)).join(" → ")} |`);
}
