// Frame spikes when a story opens and when the chapter changes: tail frame times plus where the time goes.
//   STELLARIS_PLAYWRIGHT_PATH=<playwright/index.mjs> node scripts/verify-frame-spikes.mjs
// Headed on the real GPU by default (rAF follows the display refresh; HEADLESS=1 overrides, but then intervals are not
// vsync-locked). Each scenario runs REPS times (default 5). Per run: the longest rAF interval, and the Long Animation
// Frame entries (Chrome's LoAF API) split into task/script time, rAF callbacks, and style + layout + paint, with the
// scripts that ran. Scenarios:
//   open cold      new browser context (empty HTTP cache, nothing in memory), story opened from a link ~3.5 s after load
//   open settled   the same, after the idle glyph warm-up has finished (~5 s after load)
//   open reload    page reloaded (HTTP cache warm, app memory empty)
//   open warm      same page, the story closed and opened again (dossier in memory)
//   chapter        a normal chapter change by clicking "the story continues" (Cybrex)
//   long chapter   a 148 KB document in a 111-document story (The Shroud, utopia.3200)
//   back           the Back button after a chapter change
// Output: verification/ui/frame-spikes.json (STELLARIS_SPIKES_OUT to override). This is desktop emulation only; a
// physical phone is not measured.
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { pathToFileURL } from "node:url";

const { chromium } = await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const base = process.env.STELLARIS_PREVIEW_URL || "http://127.0.0.1:4173/";
const headless = !!process.env.HEADLESS;
const reps = Number(process.env.REPS || 5);
const output = process.env.STELLARIS_SPIKES_OUT || "verification/ui/frame-spikes.json";
const args = ["--use-angle=d3d11", "--enable-gpu-rasterization", "--ignore-gpu-blocklist", "--force-high-performance-gpu",
  `--window-size=${process.env.STELLARIS_WINDOW_SIZE || "1700,1120"}`,
  ...(process.env.STELLARIS_WINDOW_POSITION ? [`--window-position=${process.env.STELLARIS_WINDOW_POSITION}`] : []),
  "--disable-backgrounding-occluded-windows", "--disable-renderer-backgrounding", "--disable-background-timer-throttling"];
const browser = await chromium.launch({ channel: "chrome", headless, args });
const contextOptions = headless ? { viewport: { width: 1600, height: 1000 } } : { viewport: null };
const pct = (values, p) => {
  if (!values.length) return null;
  const s = [...values].sort((a, b) => a - b);
  return +s[Math.min(s.length - 1, Math.floor((p / 100) * s.length))].toFixed(1);
};

// rAF + LoAF recorder, installed before any page script runs.
const recorder = () => {
  const rec = (window.__spikes = { on: false, t: [], loaf: [] });
  const loop = (time) => { if (rec.on) rec.t.push(time); requestAnimationFrame(loop); };
  requestAnimationFrame(loop);
  try {
    new PerformanceObserver((list) => {
      if (!rec.on) return;
      for (const e of list.getEntries()) {
        const end = e.startTime + e.duration;
        rec.loaf.push({
          at: e.startTime, duration: e.duration, blocking: e.blockingDuration,
          task: (e.renderStart || end) - e.startTime,
          raf: e.renderStart ? (e.styleAndLayoutStart || end) - e.renderStart : 0,
          layout: e.styleAndLayoutStart ? end - e.styleAndLayoutStart : 0,
          scripts: e.scripts.map((s) => ({
            fn: s.sourceFunctionName || s.invoker, url: (s.sourceURL || "").replace(/^.*\//, ""), ms: +s.duration.toFixed(1),
            forcedLayout: +s.forcedStyleAndLayoutDuration.toFixed(1),
          })).filter((s) => s.ms >= 3),
        });
      }
    }).observe({ type: "long-animation-frame", buffered: false });
  } catch { rec.noLoaf = true; }
};

async function newPage() {
  const context = await browser.newContext(contextOptions);
  await context.addInitScript(recorder);
  const page = await context.newPage();
  // STELLARIS_NETWORK=slow: 120 ms latency, 4 MB/s down (roughly the live site from here), applied before loading.
  if (process.env.STELLARIS_NETWORK === "slow") {
    const cdp = await context.newCDPSession(page);
    await cdp.send("Network.enable");
    await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 120, downloadThroughput: 4 * 1024 * 1024, uploadThroughput: 1024 * 1024 });
  }
  page.on("pageerror", (e) => console.error("pageerror", e.message));
  return { context, page };
}
async function ready(page) {
  await page.waitForFunction(() => document.querySelector("#open-story") && window.__archiveDiagnostics?.().imageCovers > 30, null, { timeout: 60000 });
  await page.waitForTimeout(3500); // glyph warm-up runs at 2.5 s
}
async function measure(page, action, settle = 1500) {
  await page.evaluate(() => { Object.assign(window.__spikes, { on: true, t: [], loaf: [] }); });
  await action();
  await page.waitForTimeout(settle);
  const raw = await page.evaluate(() => { window.__spikes.on = false; return window.__spikes; });
  const intervals = raw.t.slice(1).map((t, i) => t - raw.t[i]);
  const worst = raw.loaf.slice().sort((a, b) => b.duration - a.duration)[0] || null;
  // Phases: the action's own frames (first 500 ms) and what follows (the story map is built ~600 ms after opening).
  const phase = (from, to) => Math.max(0, ...raw.t.slice(1).map((t, i) => [t - raw.t[0], t - raw.t[i]]).filter(([at]) => at > from && at <= to).map(([, d]) => d));
  return { intervals, maxFrame: intervals.length ? Math.max(...intervals) : 0, actionFrame: phase(0, 500), laterFrame: phase(500, 1e9), loaf: raw.loaf, worst };
}
const openLink = (page, hash) => async () => {
  await page.evaluate((h) => { location.hash = h; }, hash);
  await page.waitForSelector("#reader:not([hidden]) .chapter-document", { timeout: 30000 });
};
const closeReader = async (page) => { await page.keyboard.press("Escape"); await page.waitForTimeout(900); };

const runs = {};
const add = (name, r) => (runs[name] ||= []).push(r);
for (let i = 0; i < reps; i++) {
  const { context, page } = await newPage();
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await ready(page);
  add("open cold", await measure(page, openLink(page, "#story=cybrex")));
  add("chapter", await measure(page, async () => {
    await page.locator(".continuation .next-chapter").first().click();
    await page.waitForTimeout(50);
  }));
  add("back", await measure(page, () => page.locator("#reading-back").click()));
  await closeReader(page);
  add("open warm", await measure(page, openLink(page, "#story=cybrex")));
  await closeReader(page);
  // A story not opened before in this page (the reader itself is warm): per-text cost vs first-use cost.
  add("open other", await measure(page, openLink(page, "#story=curators")));
  await closeReader(page);
  add("long chapter", await measure(page, async () => {
    await openLink(page, "#story=the-shroud&chapter=utopia.3200")();
  }, 2000));
  await closeReader(page);
  await page.evaluate(() => localStorage.clear());
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await ready(page);
  add("open reload", await measure(page, openLink(page, "#story=cybrex")));
  await context.close();
  // The same cold open, once the idle glyph warm-up (src/glyph-warmup.js, ~5 s after load) has finished.
  const settled = await newPage();
  await settled.page.goto(base, { waitUntil: "domcontentloaded" });
  await ready(settled.page);
  await settled.page.waitForFunction(() => window.__glyphWarmup?.done, null, { timeout: 60000 });
  await settled.page.waitForTimeout(500);
  add("open settled", await measure(settled.page, openLink(settled.page, "#story=cybrex")));
  await settled.context.close();
  console.log(`run ${i + 1}/${reps}:`, Object.entries(runs).map(([k, v]) => `${k} ${v.at(-1).maxFrame.toFixed(0)}`).join(" | "));
}
await browser.close();

const report = { measuredAt: new Date().toISOString(), headless, reps, url: base, note: "Desktop Chrome (headed, discrete GPU unless HEADLESS). Not a physical phone.", scenarios: {} };
for (const [name, list] of Object.entries(runs)) {
  const pooled = list.flatMap((r) => r.intervals);
  const worst = list.map((r) => r.worst).filter(Boolean).sort((a, b) => b.duration - a.duration)[0] || null;
  const parts = (key) => pct(list.map((r) => r.worst?.[key] || 0), 50);
  report.scenarios[name] = {
    maxFrameMs: { p50: pct(list.map((r) => r.maxFrame), 50), max: +Math.max(...list.map((r) => r.maxFrame)).toFixed(1), runs: list.map((r) => +r.maxFrame.toFixed(1)) },
    actionPhaseMaxMs: { p50: pct(list.map((r) => r.actionFrame), 50), max: +Math.max(...list.map((r) => r.actionFrame)).toFixed(1) },
    laterPhaseMaxMs: { p50: pct(list.map((r) => r.laterFrame), 50), max: +Math.max(...list.map((r) => r.laterFrame)).toFixed(1) },
    pooledFrameMs: { frames: pooled.length, p50: pct(pooled, 50), p95: pct(pooled, 95), p99: pct(pooled, 99) },
    framesOver25ms: pct(list.map((r) => r.intervals.filter((v) => v > 25).length), 50),
    longestLoafMedianSplit: { task: parts("task"), raf: parts("raf"), layout: parts("layout") },
    worstLoaf: worst,
  };
  const s = report.scenarios[name];
  console.log(name.padEnd(13), "max", JSON.stringify(s.maxFrameMs.runs), "| action p50/max", s.actionPhaseMaxMs.p50, s.actionPhaseMaxMs.max, "| later p50/max", s.laterPhaseMaxMs.p50, s.laterPhaseMaxMs.max);
}
await mkdir(dirname(output), { recursive: true });
await writeFile(output, JSON.stringify(report, null, 1));
console.log("written", output);
