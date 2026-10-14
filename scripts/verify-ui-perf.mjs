// Frame timing on the real GPU.
//   STELLARIS_PLAYWRIGHT_PATH=<playwright/index.mjs> node scripts/verify-ui-perf.mjs
// Headed by default: rAF then follows the real display refresh (headless Chrome is
// not vsync-locked, so its intervals say nothing about smoothness). HEADLESS=1 to
// override. Each sample records the WebGL adapter string (WEBGL_debug_renderer_info);
// the run fails if it is SwiftShader/software. GPU time per scene frame comes from
// EXT_disjoint_timer_query_webgl2 when Chrome exposes it.
// Output: verification/ui/perf.json (STELLARIS_PERF_OUT to override).
// STELLARIS_GPU=integrated drops --force-high-performance-gpu: on a hybrid Windows laptop Chrome then runs on the
// integrated GPU (the default for a browser without a per-app graphics preference), so both paths can be measured.
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { pathToFileURL } from "node:url";

const runtime = process.env.STELLARIS_PLAYWRIGHT_PATH;
const { chromium } = await import(runtime ? pathToFileURL(runtime).href : "playwright");
const base = process.env.STELLARIS_PREVIEW_URL || "http://127.0.0.1:4173/";
const headless = !!process.env.HEADLESS;
const integrated = process.env.STELLARIS_GPU === "integrated";
const output = process.env.STELLARIS_PERF_OUT || "verification/ui/perf.json";
// Occluded or background windows are throttled by Chrome on Windows; keep the measured window rendering at full rate
// even if other windows overlap it (the run is still disturbed by heavy desktop activity — keep the desktop idle).
// Window placement: STELLARIS_WINDOW_SIZE ("w,h", default 1700,1120) and STELLARIS_WINDOW_POSITION ("x,y", e.g. a
// side monitor so the run does not cover other work).
const windowArgs = [`--window-size=${process.env.STELLARIS_WINDOW_SIZE || "1700,1120"}`,
  ...(process.env.STELLARIS_WINDOW_POSITION ? [`--window-position=${process.env.STELLARIS_WINDOW_POSITION}`] : [])];
const args = ["--use-angle=d3d11", "--enable-gpu-rasterization", "--ignore-gpu-blocklist", "--enable-gpu", ...(integrated ? [] : ["--force-high-performance-gpu"]), ...windowArgs,
  "--disable-backgrounding-occluded-windows", "--disable-renderer-backgrounding", "--disable-background-timer-throttling"];
const browser = await chromium.launch({ channel: "chrome", headless, args });
const context = await browser.newContext(headless ? { viewport: { width: 1600, height: 1000 } } : { viewport: null });
const page = await context.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));

const percentile = (values, p) => {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  return +sorted[Math.min(sorted.length - 1, Math.floor((p / 100) * sorted.length))].toFixed(2);
};
const summary = (intervals) => ({
  frames: intervals.length,
  p50: percentile(intervals, 50),
  p95: percentile(intervals, 95),
  max: intervals.length ? +Math.max(...intervals).toFixed(2) : null,
  // A frame is "over budget" when it took longer than 1.5 refresh periods (a missed vsync).
  over60Hz: intervals.filter((v) => v > (1000 / 60) * 1.5).length,
  over170Hz: intervals.filter((v) => v > (1000 / 170) * 1.5).length,
});

await page.goto(base, { waitUntil: "networkidle" });
await page.waitForFunction(() => window.__archiveDiagnostics?.().imageCovers > 60, null, { timeout: 30000 });
const env = await page.evaluate(() => {
  const scene = document.querySelector("#scene").__scene;
  const gpuTiming = scene.enableGpuTiming();
  const d = window.__archiveDiagnostics();
  return {
    adapter: d.gpu,
    gpuTimerQuery: gpuTiming,
    devicePixelRatio,
    scenePixelRatio: d.pixelRatio,
    antialias: d.antialias,
    viewport: [innerWidth, innerHeight],
    drawingBuffer: [scene.renderer.getContext().drawingBufferWidth, scene.renderer.getContext().drawingBufferHeight],
    userAgent: navigator.userAgent,
  };
});
console.log("adapter:", env.adapter?.renderer, "| timer query:", env.gpuTimerQuery, "| dpr", env.devicePixelRatio);
assert.ok(!/swiftshader|llvmpipe|software/i.test(env.adapter?.renderer || ""), `software adapter: ${env.adapter?.renderer}`);

// rAF recorder: what the display shows (long intervals = visible hitches), plus which
// of those frames the scene actually rendered.
await page.evaluate(() => {
  const rec = (window.__rec = { on: false, t: [], drawn: [] });
  const loop = (time) => {
    if (rec.on) {
      rec.t.push(time);
      rec.drawn.push(window.__archiveDiagnostics().framesDrawn);
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
});
async function measure(name, action, settleMs = 1400) {
  await page.evaluate(() => {
    window.__rec.on = true;
    window.__rec.t = [];
    window.__rec.drawn = [];
    window.__rec.gpuFrom = performance.now();
  });
  await action();
  await page.waitForTimeout(settleMs);
  const raw = await page.evaluate(() => {
    const rec = window.__rec;
    rec.on = false;
    const scene = document.querySelector("#scene").__scene;
    const gpu = (scene.gpuTimer?.samples || []).filter((s) => s.at >= rec.gpuFrom).map((s) => s.ms);
    return { t: rec.t, drawn: rec.drawn, gpu, d: window.__archiveDiagnostics() };
  });
  const intervals = raw.t.slice(1).map((t, i) => t - raw.t[i]);
  const rendered = raw.drawn.at(-1) - raw.drawn[0];
  const result = {
    name,
    adapter: env.adapter?.renderer,
    rafIntervalsMs: summary(intervals),
    sceneFramesRendered: rendered,
    // More than 1 means the scene drew several times per displayed frame (duplicate render loops).
    sceneFramesPerRaf: intervals.length ? +(rendered / intervals.length).toFixed(2) : null,
    gpuMsPerSceneFrame: raw.gpu.length ? { samples: raw.gpu.length, p50: percentile(raw.gpu, 50), p95: percentile(raw.gpu, 95), max: +Math.max(...raw.gpu).toFixed(3) } : null,
    // Scene GPU time summed over the measured span: per-frame ms alone rises when a lightly loaded GPU clocks down.
    sceneGpuMsTotal: +raw.gpu.reduce((a, b) => a + b, 0).toFixed(1),
    spanMs: raw.t.length > 1 ? +(raw.t.at(-1) - raw.t[0]).toFixed(0) : 0,
    pixelRatioAfter: raw.d.pixelRatio,
    visibleInstances: raw.d.visibleInstances,
    drawCalls: raw.d.drawCalls,
  };
  console.log(name.padEnd(22), JSON.stringify(result.rafIntervalsMs), "gpu", JSON.stringify(result.gpuMsPerSceneFrame));
  return result;
}

const results = [];
const canvas = page.locator("#scene canvas");
// Idle reference: the display refresh period with nothing animating.
await page.mouse.move(2, 400);
await page.waitForFunction(() => !window.__archiveDiagnostics().framePending, null, { timeout: 30000 });
results.push(await measure("idle (reference)", async () => {}, 1500));
results.push(
  await measure("hover breathing", async () => {
    // Pointer movement over the archive starts the idle "breathing" motion (fades after ~9 s without input).
    const box = await canvas.boundingBox();
    for (let i = 0; i < 6; i++) await page.mouse.move(box.x + box.width * (0.45 + i * 0.02), box.y + box.height * 0.6, { steps: 2 });
  }, 3000),
);
await page.mouse.move(2, 400);
results.push(
  await measure("archive keyboard scroll", async () => {
    await canvas.focus();
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press(i % 4 === 3 ? "ArrowRight" : "ArrowDown");
      await page.waitForTimeout(110);
    }
  }),
);
results.push(
  await measure("archive drag + momentum", async () => {
    const box = await canvas.boundingBox();
    const y = box.y + box.height * 0.5;
    await page.mouse.move(box.x + box.width * 0.6, y);
    await page.mouse.down();
    for (let i = 1; i <= 24; i++) await page.mouse.move(box.x + box.width * (0.6 - i * 0.012), y + i * 6, { steps: 1 });
    await page.mouse.up();
  }, 2200),
);
results.push(await measure("open story", () => page.locator("#open-story").click(), 1800));
results.push(
  await measure("chapter change", async () => {
    // In-page navigation to another chapter (hashchange, no reload).
    await page.evaluate(() => { location.hash = "#story=cybrex&chapter=precursor.2005"; });
  }, 1600),
);
results.push(await measure("go back", async () => { const b = page.locator("#reading-back"); if (await b.isEnabled()) await b.click(); else await page.goBack(); }, 1600));
results.push(
  await measure("map pan + zoom", async () => {
    const view = await page.locator(".flow-viewport").boundingBox();
    const cx = view.x + view.width / 2, cy = view.y + view.height / 2;
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    for (let i = 1; i <= 20; i++) await page.mouse.move(cx - i * 9, cy - i * 4);
    await page.mouse.up();
    await page.keyboard.down("Control");
    for (let i = 0; i < 6; i++) {
      await page.mouse.wheel(0, i < 3 ? -120 : 120);
      await page.waitForTimeout(60);
    }
    await page.keyboard.up("Control");
  }, 900),
);
results.push(await measure("close story", () => page.keyboard.press("Escape"), 1800));
await browser.close();

const report = {
  measuredAt: new Date().toISOString(),
  headless,
  requestedGpu: integrated ? "integrated (no --force-high-performance-gpu)" : "discrete (--force-high-performance-gpu)",
  url: base,
  env,
  note:
    "rAF intervals are what the page could present; GPU ms are EXT_disjoint_timer_query_webgl2 per scene frame when exposed. Which adapter Chrome uses also depends on the Windows per-app graphics preference (not changed by this script).",
  results,
  errors,
};
await mkdir(dirname(output), { recursive: true });
await writeFile(output, JSON.stringify(report, null, 2));
assert.deepEqual(errors, []);
console.log("written", output);




