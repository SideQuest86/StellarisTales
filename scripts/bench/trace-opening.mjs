// Chrome trace of one story opening (and the map build that follows): self time per trace event on the renderer main
// thread inside the window, split into "opening frame(s)" (0-450 ms) and "map build" (450-1500 ms).
//   STELLARIS_PLAYWRIGHT_PATH=... URL=http://127.0.0.1:4188/ [MODE=hash|button] [STORY=cybrex] [SETTLE=1] node scripts/bench/trace-opening.mjs
// Env: PROFILE=1 adds the V8 CPU profile categories; DUMP=<file> writes the raw trace; TOP=<n> rows per phase.
import { writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const { chromium } = await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const url = process.env.URL || "http://127.0.0.1:4188/";
const mode = process.env.MODE || "hash";
const story = process.env.STORY || "cybrex";
const top = Number(process.env.TOP || 22);
const browser = await chromium.launch({ channel: "chrome", headless: false, args: ["--use-angle=d3d11", "--enable-gpu-rasterization", "--ignore-gpu-blocklist", "--force-high-performance-gpu", "--window-size=1700,1120", "--window-position=-1900,20", "--disable-backgrounding-occluded-windows", "--disable-renderer-backgrounding"] });
const context = await browser.newContext({ viewport: null });
const page = await context.newPage();
await page.goto(url, { waitUntil: "domcontentloaded" });
await page.waitForFunction(() => document.querySelector("#open-story") && window.__archiveDiagnostics?.().imageCovers > 30, null, { timeout: 60000 });
await page.waitForTimeout(3500);
if (process.env.SETTLE) await page.waitForFunction(() => window.__glyphWarmup?.done && window.__readerWarmup?.mapMs !== undefined, null, { timeout: 60000 });
const cats = ["devtools.timeline", "disabled-by-default-devtools.timeline", "blink.user_timing", "v8.execute", "loading", ...(process.env.PROFILE ? ["disabled-by-default-v8.cpu_profiler"] : [])];
await browser.startTracing(page, { categories: cats });
await page.evaluate(() => performance.mark("action-start"));
if (mode === "button") await page.click("#open-story");
else await page.evaluate((s) => { location.hash = "#story=" + s; }, story);
await page.waitForSelector("#reader:not([hidden]) .chapter-document", { timeout: 30000 });
await page.waitForTimeout(1800);
const buf = await browser.stopTracing();
await browser.close();
if (process.env.DUMP) await writeFile(process.env.DUMP, buf);
const events = JSON.parse(buf.toString()).traceEvents;
const mark = events.find((e) => e.name === "action-start");
const mainPid = mark.pid, mainTid = mark.tid;
const t0 = mark.ts;
const thread = events.filter((e) => e.pid === mainPid && e.tid === mainTid && e.ph === "X" && e.dur !== undefined && e.ts >= t0)
  .sort((a, b) => a.ts - b.ts || b.dur - a.dur);
// self time
const stack = [];
const self = new Map();
const rows = [];
for (const e of thread) {
  while (stack.length && stack.at(-1).end <= e.ts) stack.pop();
  const node = { e, end: e.ts + e.dur, child: 0 };
  if (stack.length) stack.at(-1).child += e.dur;
  stack.push(node);
  rows.push(node);
}
const phases = { open: [0, 450e3], map: [450e3, 1500e3] };
for (const [phase, [a, b]] of Object.entries(phases)) {
  const agg = new Map();
  for (const n of rows) {
    const rel = n.e.ts - t0;
    if (rel < a || rel >= b) continue;
    const selfMs = (n.e.dur - n.child) / 1000;
    const key = n.e.name + (n.e.name === "FunctionCall" ? " " + (n.e.args?.data?.functionName || "") + "@" + (n.e.args?.data?.url || "").replace(/^.*\//, "") + ":" + (n.e.args?.data?.lineNumber ?? "") : "");
    const cur = agg.get(key) || { ms: 0, n: 0, total: 0 };
    cur.ms += selfMs; cur.n++; cur.total += n.e.dur / 1000;
    agg.set(key, cur);
  }
  console.log(`\n== ${phase} (${a / 1000}-${b / 1000} ms after the action): self ms / count / total ms`);
  for (const [k, v] of [...agg].sort((x, y) => y[1].ms - x[1].ms).slice(0, top)) console.log(`${v.ms.toFixed(1).padStart(7)} ${String(v.n).padStart(5)} ${v.total.toFixed(1).padStart(8)}  ${k}`);
}
// Timeline of the big top-level main-thread tasks
console.log("\n== main-thread tasks > 8 ms");
for (const n of rows.filter((n) => !n.e.name.startsWith("Run") ? false : n.e.dur > 8000)) console.log(`${((n.e.ts - t0) / 1000).toFixed(0).padStart(6)} ms  ${(n.e.dur / 1000).toFixed(1).padStart(6)}  ${n.e.name}`);
console.log("\n== Layout / UpdateLayoutTree / Paint events > 3 ms");
for (const n of rows.filter((n) => /^(Layout|UpdateLayoutTree|PrePaint|Paint|Layerize|Commit|HitTest|IntersectionObserverController::computeIntersections|ResizeObserver)/.test(n.e.name) && n.e.dur > 3000)) {
  const d = n.e.args?.beginData || n.e.args?.data || {};
  console.log(`${((n.e.ts - t0) / 1000).toFixed(0).padStart(6)} ms ${(n.e.dur / 1000).toFixed(1).padStart(6)}  ${n.e.name} ${d.elementCount ? "elements=" + d.elementCount : ""} ${d.dirtyObjects !== undefined ? "dirty=" + d.dirtyObjects + "/" + d.totalObjects : ""} ${n.e.args?.beginData?.stackTrace ? "" : ""}`);
}
