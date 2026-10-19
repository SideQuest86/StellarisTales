// Summarise bench.mjs outputs into one table (Markdown): node scripts/bench/summary.mjs [dir] [tagRegex]
// Prints worst/p95 frames, long tasks, transfer and key timings per scenario file whose name matches tagRegex.
import { readdirSync, readFileSync } from "node:fs";
const dir = process.argv[2] || "verification/round4/perf";
const match = new RegExp(process.argv[3] || ".");
const fmt = (f) => (f == null ? "–" : `${f.max ?? "–"} / ${f.p95 ?? "–"}${f.longtaskN ? ` · LT ${f.longtaskN}×≤${f.longtaskMax}` : ""}`);
const kb = (b) => (b == null ? "–" : b > 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.round(b / 1024)} KB`);
const rows = [];
for (const file of readdirSync(dir).filter((f) => f.endsWith(".json") && match.test(f)).sort()) {
  let d;
  try { d = JSON.parse(readFileSync(`${dir}/${file}`, "utf8")); } catch { continue; }
  const r = d.result, name = file.replace(/\.json$/, "");
  if (!r) continue;
  if (r.error) { rows.push([name, "error", String(r.error).split("\n")[0].slice(0, 80)]); continue; }
  if (file.startsWith("cold-")) {
    for (const [profile, v] of Object.entries(r)) {
      const runs = Array.isArray(v) ? v : v.runs || [];
      const pick = (k) => runs.map((x) => x[k]).filter((x) => x != null).join("/");
      rows.push([`${name} ${profile}`, `button ${pick("buttonVisibleMs")} ms · covers ${pick("coversReadyMs")} ms`, `${runs.map((x) => kb(x.bytes)).join("/")} · ${pick("requests")} req · worst ${pick("maxFrame")} ms`]);
    }
  } else if (file.startsWith("story-")) {
    for (const [k, v] of Object.entries(r.steps || {})) rows.push([`${name} ${k}`, fmt(v.max != null ? v : Object.values(v)[0]), ""]);
  } else if (file.startsWith("search-")) {
    rows.push([`${name} open`, fmt(r.open), `${r.open?.requests} req ${kb(r.open?.bytes)}`]);
    rows.push([`${name} first query`, `${r.firstQuery?.ms} ms · ${fmt(r.firstQuery)}`, `${r.firstQuery?.requests} req ${kb(r.firstQuery?.bytes)}`]);
    rows.push([`${name} typing → results`, `p50 ${r.typingSummary?.resultUpdateMs?.p50} / max ${r.typingSummary?.resultUpdateMs?.max} ms`, ""]);
  } else if (file.startsWith("museum-")) {
    rows.push([`${name} open list`, fmt(r.openList), `${r.openList?.requests} req ${kb(r.openList?.bytes)}`]);
    rows.push([`${name} scroll list`, fmt(r.scrollList), ""]);
    const m = r.modelsSummary;
    rows.push([`${name} 10 models`, m ? `load p50 ${m.loadMs?.p50} ms · frame max ${m.maxFrame?.max} ms` : "–", r.afterClose ? `after close: geom ${r.afterClose.viewer?.geometries} tex ${r.afterClose.viewer?.textures} heap ${r.afterClose.heapAfterGcMB} MB` : ""]);
  } else if (file.startsWith("audio-")) {
    rows.push([`${name} before gesture`, `src ${r.afterLoadNoGesture?.audioState?.src ? "set" : "none"} · paused ${r.afterLoadNoGesture?.audioState?.paused}`, kb(r.afterLoadNoGesture?.music?.bytes ?? r.afterLoadNoGesture?.music)]);
    rows.push([`${name} while playing`, fmt(r.playingFrames), `${r.playingCost?.taskMs} ms task`]);
  } else if (file.startsWith("idle-")) {
    for (const [profile, v] of Object.entries(r)) rows.push([`${name} ${profile}`, `visible: ${v.visibleArchive30s?.rafPerSec} rAF/s, ${v.visibleArchive30s?.cpuTaskMsPerSec} ms CPU/s`, `hidden: ${v.hiddenTab30s?.rafPerSec} rAF/s, ${v.hiddenTab30s?.cpuTaskMsPerSec} ms CPU/s`]);
  }
}
console.log("| measurement | frames max / p95 ms (LT = long tasks) or timing | transfer / notes |\n| --- | --- | --- |");
for (const r of rows) console.log(`| ${r.join(" | ")} |`);
