// Round-5 A/B bench for the first story opening, the first story-map build and the first archive frame of a cold load.
// Variants are served side by side (e.g. unmodified copy on :4189, candidate on :4188) and alternated rep by rep in ONE
// browser session, so drift (thermal, GPU clocks, background load) hits both equally.
//   STELLARIS_PLAYWRIGHT_PATH=<playwright/index.mjs> VARIANTS="base=http://127.0.0.1:4189/,cand=http://127.0.0.1:4188/" \
//     REPS=6 SCENARIO=open node scripts/bench/opening.mjs
// SCENARIO: open    a story opened from a #story= link (default cybrex, STORY=... to change) READY_WAIT ms (default 3500) after the
//                   archive is ready (the start-up warm-ups are still running before ~5 s): what verify-frame-spikes calls "open cold"
//           button  the same, by clicking #open-story (the user's path: opens the story the archive selected at start-up)
//           browse  the selection is moved with the archive buttons (two categories on, one story down), the archive rests ~4 s,
//                   then #open-story is clicked: the story that opens was never the one the start-up warm-up rendered
//           settled the link opening after the glyph warm-up and the reader render-ahead have finished (+1 s)
//           cold    first load: the start-up frames (first 700 ms) and the idle ones, when the scene drew its first frame
// Other env: NETWORK=slow (120 ms latency, 4 MB/s), HEADLESS=1, OUT=<file>, TAG=<suffix of the default file name>.
// Output: OUT (default verification/round5/perf/opening-<scenario>.json) with every run (intervals, LoAF with scripts) and
// a p50 / max summary per variant. Headed by default (window at -1900,20 like the other benches); HEADLESS=1 to override.
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { pathToFileURL } from "node:url";

const { chromium } = await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const variants = (process.env.VARIANTS || "base=http://127.0.0.1:4189/,cand=http://127.0.0.1:4188/").split(",").map((v) => {
  const [name, ...rest] = v.split("=");
  return { name, url: rest.join("=") };
});
const scenario = process.env.SCENARIO || "open";
const reps = Number(process.env.REPS || 6);
const story = process.env.STORY || "cybrex";
const out = process.env.OUT || `verification/round5/perf/opening-${scenario}${process.env.TAG ? "-" + process.env.TAG : ""}.json`;
const headless = !!process.env.HEADLESS;
const args = ["--use-angle=d3d11", "--enable-gpu-rasterization", "--ignore-gpu-blocklist", "--force-high-performance-gpu",
  "--window-size=1700,1120", ...(headless ? [] : ["--window-position=-1900,20"]),
  "--disable-backgrounding-occluded-windows", "--disable-renderer-backgrounding", "--disable-background-timer-throttling"];
const browser = await chromium.launch({ channel: "chrome", headless, args });
const pct = (v, p) => { if (!v.length) return null; const s = [...v].sort((a, b) => a - b); return +s[Math.min(s.length - 1, Math.floor((p / 100) * s.length))].toFixed(1); };

const recorder = () => {
  const rec = (window.__sp = { on: false, t: [], loaf: [], t0: 0 });
  // firstDraw / buttonAt: first rAF at which the archive scene had drawn a frame / #open-story existed (page time, ms).
  const loop = (time) => {
    if (rec.on) rec.t.push(time);
    if (rec.on) {
      if (rec.firstDraw === undefined && window.__archiveDiagnostics?.().framesDrawn > 0) rec.firstDraw = Math.round(time);
      if (rec.buttonAt === undefined && document.querySelector("#open-story")) rec.buttonAt = Math.round(time);
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
  try {
    new PerformanceObserver((list) => {
      if (!rec.on) return;
      for (const e of list.getEntries()) {
        const end = e.startTime + e.duration;
        rec.loaf.push({
          at: +e.startTime.toFixed(1), duration: +e.duration.toFixed(1), blocking: +e.blockingDuration.toFixed(1),
          task: +((e.renderStart || end) - e.startTime).toFixed(1),
          raf: +(e.renderStart ? (e.styleAndLayoutStart || end) - e.renderStart : 0).toFixed(1),
          layout: +(e.styleAndLayoutStart ? end - e.styleAndLayoutStart : 0).toFixed(1),
          scripts: e.scripts.map((s) => ({
            fn: s.sourceFunctionName || s.invoker, url: (s.sourceURL || "").replace(/^.*\//, ""), ms: +s.duration.toFixed(1),
            forced: +s.forcedStyleAndLayoutDuration.toFixed(1),
          })).filter((s) => s.ms >= 3),
        });
      }
    }).observe({ type: "long-animation-frame", buffered: true });
  } catch { rec.noLoaf = true; }
};

async function newPage() {
  const context = await browser.newContext({ viewport: null });
  await context.addInitScript(recorder);
  const page = await context.newPage();
  // NETWORK=slow: 120 ms latency, 4 MB/s (roughly the live site from here), like verify-frame-spikes.mjs.
  if (process.env.NETWORK === "slow") {
    const cdp = await context.newCDPSession(page);
    await cdp.send("Network.enable");
    await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 120, downloadThroughput: 4 * 1024 * 1024, uploadThroughput: 1024 * 1024 });
  }
  page.on("pageerror", (e) => console.error("pageerror", e.message));
  return { context, page };
}
const ready = async (page) => {
  await page.waitForFunction(() => document.querySelector("#open-story") && window.__archiveDiagnostics?.().imageCovers > 30, null, { timeout: 60000 });
  await page.waitForTimeout(Number(process.env.READY_WAIT || 3500)); // after the covers are in; the idle glyph warm-up starts ~1.2 s after load
};
const begin = (page) => page.evaluate(() => { Object.assign(window.__sp, { on: true, t: [], loaf: [] }); });
async function collect(page, settle) {
  await page.waitForTimeout(settle);
  const raw = await page.evaluate(() => { window.__sp.on = false; return { t: window.__sp.t, loaf: window.__sp.loaf, firstDraw: window.__sp.firstDraw, buttonAt: window.__sp.buttonAt }; });
  const iv = raw.t.slice(1).map((t, i) => ({ at: raw.t[i] - raw.t[0], d: t - raw.t[i] }));
  const phase = (from, to) => Math.max(0, ...iv.filter((x) => x.at > from && x.at <= to).map((x) => x.d));
  const intervals = iv.map((x) => +x.d.toFixed(1));
  return {
    maxFrame: +Math.max(0, ...intervals).toFixed(1), actionFrame: +phase(0, 500).toFixed(1), laterFrame: +phase(500, 1e9).toFixed(1),
    over25: intervals.filter((x) => x > 25).length, intervals, firstDraw: raw.firstDraw, buttonAt: raw.buttonAt,
    startup: +Math.max(0, ...raw.t.slice(1).map((t, i) => (t <= 700 ? t - raw.t[i] : 0))).toFixed(1), after700: +Math.max(0, ...raw.t.slice(1).map((t, i) => (t > 700 ? t - raw.t[i] : 0))).toFixed(1), loaf: raw.loaf, worst: raw.loaf.slice().sort((a, b) => b.duration - a.duration)[0] || null,
  };
}

async function runOpen(v, mode) {
  const { context, page } = await newPage();
  await page.goto(v.url, { waitUntil: "domcontentloaded" });
  await ready(page);
  if (mode === "browse") {
    for (const button of ["#next-category", "#next-category", "#next-story"]) { await page.click(button); await page.waitForTimeout(350); }
    await page.waitForTimeout(4000);
  }
  if (mode === "settled") {
    // done: glyph warm-up finished and the reader render-ahead(s): builds that render the first story twice report runs 1, then 2
    await page.waitForFunction(() => window.__glyphWarmup?.done && window.__readerWarmup?.mapMs !== undefined && (window.__readerWarmup.runs === undefined || window.__readerWarmup.runs >= 2), null, { timeout: 90000 });
    await page.waitForTimeout(1000);
  }
  await begin(page);
  await page.evaluate(() => { window.__fontLoads = 0; document.fonts.addEventListener("loadingdone", () => window.__fontLoads++); });
  if (mode === "button" || mode === "browse") {
    await page.click("#open-story"); // opens whatever the archive has selected (the default story, or the one browse moved to)
  } else await page.evaluate((s) => { location.hash = "#story=" + s; }, story);
  await page.waitForSelector("#reader:not([hidden]) .chapter-document", { timeout: 30000 });
  const r = await collect(page, 1800);
  r.warmup = await page.evaluate(() => window.__readerWarmup || null);
  r.fontLoads = await page.evaluate(() => window.__fontLoads);
  await context.close();
  return r;
}
async function runCold(v) {
  const { context, page } = await newPage();
  await page.goto(v.url, { waitUntil: "commit" });
  // The recorder is armed by an init script; arm it as soon as the document exists.
  await page.waitForFunction(() => !!window.__sp, null, { timeout: 30000 }).catch(() => {});
  await page.evaluate(() => { Object.assign(window.__sp, { on: true, t: [], loaf: [] }); });
  await page.waitForSelector("#open-story", { timeout: 60000 });
  const r = await collect(page, 4000);
  // Cold load: page time of every rAF interval end, so the start-up frames (first 700 ms) are separated from the idle warm-ups.
  r.diag = await page.evaluate(() => ({ framesDrawn: window.__archiveDiagnostics?.().framesDrawn, covers: window.__archiveDiagnostics?.().imageCovers }));
  await context.close();
  return r;
}

const results = Object.fromEntries(variants.map((v) => [v.name, []]));
for (let i = 0; i < reps; i++) {
  const order = i % 2 ? [...variants].reverse() : variants;
  for (const v of order) {
    const r = scenario === "cold" ? await runCold(v) : await runOpen(v, scenario);
    results[v.name].push(r);
  }
  console.log(`rep ${i + 1}/${reps}:`, variants.map((v) => `${v.name} action ${results[v.name].at(-1).actionFrame} later ${results[v.name].at(-1).laterFrame} max ${results[v.name].at(-1).maxFrame}`).join(" | "));
}
await browser.close();

const summary = {};
for (const v of variants) {
  const list = results[v.name];
  const col = (k) => list.map((r) => r[k]);
  summary[v.name] = {
    url: v.url,
    maxFrame: { p50: pct(col("maxFrame"), 50), max: Math.max(...col("maxFrame")), runs: col("maxFrame") },
    ...(scenario === "cold" ? {
      startup: { p50: pct(col("startup"), 50), max: Math.max(...col("startup")), runs: col("startup") },
      after700: { p50: pct(col("after700"), 50), max: Math.max(...col("after700")), runs: col("after700") },
      firstDraw: { p50: pct(col("firstDraw"), 50), max: Math.max(...col("firstDraw")), runs: col("firstDraw") },
      buttonAt: { p50: pct(col("buttonAt"), 50), max: Math.max(...col("buttonAt")), runs: col("buttonAt") },
    } : {}),
    actionFrame: { p50: pct(col("actionFrame"), 50), max: Math.max(...col("actionFrame")), runs: col("actionFrame") },
    laterFrame: { p50: pct(col("laterFrame"), 50), max: Math.max(...col("laterFrame")), runs: col("laterFrame") },
    worstLoaf: list.map((r) => r.worst && { duration: r.worst.duration, task: r.worst.task, raf: r.worst.raf, layout: r.worst.layout, scripts: r.worst.scripts }),
  };
  console.log(v.name.padEnd(6), scenario === "cold" ? `startup(<700ms) p50/max ${summary[v.name].startup.p50}/${summary[v.name].startup.max} after ${summary[v.name].after700.p50}/${summary[v.name].after700.max} firstDraw ${summary[v.name].firstDraw.p50}/${summary[v.name].firstDraw.max} button ${summary[v.name].buttonAt.p50}/${summary[v.name].buttonAt.max} |` : "", "max p50/max", summary[v.name].maxFrame.p50, summary[v.name].maxFrame.max, "| action", summary[v.name].actionFrame.p50, summary[v.name].actionFrame.max, "| later", summary[v.name].laterFrame.p50, summary[v.name].laterFrame.max);
}
await mkdir(dirname(out), { recursive: true });
await writeFile(out, JSON.stringify({ measuredAt: new Date().toISOString(), scenario, reps, story, headless, summary, runs: results }, null, 1));
console.log("written", out);
