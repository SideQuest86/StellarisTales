// Adapter tiers, the graphics notice and idle/hidden/covered rendering, in headed Chrome on the real GPUs.
//   STELLARIS_PLAYWRIGHT_PATH=<playwright/index.mjs> STELLARIS_PREVIEW_URL=http://127.0.0.1:4190/ node scripts/verify-gpu.mjs
// Runs (each a fresh browser): "discrete" = --force-high-performance-gpu, "integrated" = no flag (on a hybrid Windows
// laptop Chrome then uses the integrated GPU), plus ?gpu=integrated / ?gpu=software on the discrete GPU (faked
// classification). Writes verification/gpu/verify-gpu.json and screenshots of the notice.
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const runtime = process.env.STELLARIS_PLAYWRIGHT_PATH;
const { chromium } = await import(runtime ? pathToFileURL(runtime).href : "playwright");
const base = (process.env.STELLARIS_PREVIEW_URL || "http://127.0.0.1:4173/").replace(/\/?$/, "/");
const out = "verification/gpu";
await mkdir(out, { recursive: true });
const BASE_ARGS = ["--use-angle=d3d11", "--enable-gpu-rasterization", "--ignore-gpu-blocklist", "--enable-gpu",
  // Window placement as in verify-ui-perf: STELLARIS_WINDOW_SIZE "w,h", STELLARIS_WINDOW_POSITION "x,y".
  `--window-size=${process.env.STELLARIS_WINDOW_SIZE || "1500,960"}`,
  ...(process.env.STELLARIS_WINDOW_POSITION ? [`--window-position=${process.env.STELLARIS_WINDOW_POSITION}`] : [])];
const report = { base, startedAt: new Date().toISOString(), runs: [], checks: [], errors: [] };
const check = (run, name, ok, detail) => {
  report.checks.push({ run, name, ok: !!ok, detail });
  console.log(ok ? "ok  " : "FAIL", run.padEnd(22), name, detail === undefined ? "" : JSON.stringify(detail));
};
const diag = (page) => page.evaluate(() => window.__archiveDiagnostics());
const drawnOver = async (page, ms) => {
  const a = (await diag(page)).framesDrawn;
  await page.waitForTimeout(ms);
  return (await diag(page)).framesDrawn - a;
};
// Pointer over the music player, off the archive canvas.
const park = async (page) => page.mouse.move(300, (await page.evaluate(() => innerHeight)) - 30);
const idle = (page, timeout = 30000) => page.waitForFunction(() => !window.__archiveDiagnostics().framePending, null, { timeout, polling: 100 });

let current = null;
async function run(name, { force, query = "", expect }) {
  const browser = (current = await chromium.launch({ channel: "chrome", headless: false, args: [...BASE_ARGS, ...(force ? ["--force-high-performance-gpu"] : [])] }));
  const context = await browser.newContext({ viewport: null });
  const page = await context.newPage();
  page.on("pageerror", (e) => report.errors.push(`${name}: ${e.message}`));
  page.on("console", (m) => m.type() === "error" && report.errors.push(`${name} console: ${m.text()} ${m.location()?.url || ""}`.trim()));
  await page.goto(base + query, { waitUntil: "networkidle" });
  await page.waitForFunction(() => window.__archiveDiagnostics?.().imageCovers > 20, null, { timeout: 30000 });
  const d = await diag(page);
  const result = { name, query, adapter: d.gpu?.renderer, kind: d.gpu?.kind, tier: d.tier, forced: d.gpu?.forced, probeMs: d.gpu?.probeMs,
    pixelRatio: d.pixelRatio, maxPixelRatio: d.maxPixelRatio, antialias: d.antialias };
  report.runs.push(result);
  check(name, "tier", d.tier === expect.tier && d.gpu.kind === expect.kind, { kind: d.gpu.kind, tier: d.tier, adapter: d.gpu.renderer });

  // Idle: nothing renders once the archive has settled.
  await park(page);
  await idle(page);
  result.idleFramesIn2s = await drawnOver(page, 2000);
  check(name, "idle archive draws nothing", result.idleFramesIn2s === 0, result.idleFramesIn2s);

  // Hover starts the idle breathing; its frame rate is capped on lower tiers.
  const point = await page.evaluate(() => {
    const c = document.querySelector("#scene canvas").getBoundingClientRect();
    for (let y = 0.35; y < 0.8; y += 0.05)
      for (let x = 0.4; x < 0.9; x += 0.05) {
        const px = c.left + c.width * x, py = c.top + c.height * y;
        if (document.elementFromPoint(px, py)?.tagName === "CANVAS") return { x: px, y: py };
      }
    return null;
  });
  await page.mouse.move(point.x, point.y);
  await page.mouse.move(point.x + 30, point.y + 10, { steps: 3 });
  await page.waitForTimeout(1500); // envelope rising
  result.breathingFps = (await drawnOver(page, 3000)) / 3;
  const fpsLimit = { high: 1000, low: 36, minimal: 1 }[expect.tier];
  check(name, `breathing frame rate (cap ${expect.tier})`, expect.tier === "minimal" ? result.breathingFps < 1 : result.breathingFps > 5 && result.breathingFps <= fpsLimit, +result.breathingFps.toFixed(1));
  await park(page);
  const t0 = Date.now();
  await idle(page);
  result.breathingStopsAfterS = +((Date.now() - t0) / 1000).toFixed(1);
  check(name, "breathing fades and the loop stops", result.breathingStopsAfterS < 12, result.breathingStopsAfterS);

  // Motion frame rate (keyboard scroll) under the tier's cap.
  await page.locator("#scene canvas").focus();
  const before = (await diag(page)).framesDrawn;
  const start = Date.now();
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(120);
  }
  result.motionFps = +(((await diag(page)).framesDrawn - before) / ((Date.now() - start) / 1000)).toFixed(1);
  check(name, "motion frame rate", result.motionFps > 15 && result.motionFps <= ({ high: 1000, low: 66, minimal: 36 })[expect.tier], result.motionFps);

  // Hidden page: no frames (and no pending cap timer) once hidden, even right after input started motion. Chrome
  // launched by Playwright keeps minimised/background windows "visible", so the hidden state is emulated in the page
  // (document.hidden + visibilitychange); the browser itself never runs rAF callbacks for a really hidden page.
  await page.keyboard.press("ArrowRight");
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", { configurable: true, get: () => true });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  result.hiddenFramesIn1500ms = await drawnOver(page, 1500);
  const hiddenPending = (await diag(page)).framePending;
  check(name, "hidden page draws nothing", result.hiddenFramesIn1500ms === 0 && !hiddenPending, { frames: result.hiddenFramesIn1500ms, pending: hiddenPending });
  const hiddenFrames = (await diag(page)).framesDrawn;
  await page.evaluate(() => {
    delete document.hidden;
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await page.waitForTimeout(300);
  check(name, "visible again: the archive resumes", (await diag(page)).framesDrawn > hiddenFrames, null);
  await idle(page);

  // Museum over the archive: the scene stops while covered and resumes after.
  await page.evaluate(() => { location.hash = "museum"; });
  await page.waitForFunction(() => document.body.classList.contains("museum-open"), null, { timeout: 15000 });
  await page.waitForTimeout(600);
  result.museumFramesIn1500ms = await drawnOver(page, 1500);
  check(name, "covered by museum draws nothing", result.museumFramesIn1500ms === 0, result.museumFramesIn1500ms);
  const coveredFrames = (await diag(page)).framesDrawn;
  await page.evaluate(() => { location.hash = ""; });
  await page.waitForFunction(() => !document.body.classList.contains("museum-open"), null, { timeout: 5000 });
  await page.waitForTimeout(300);
  check(name, "archive redraws after the museum closes", (await diag(page)).framesDrawn > coveredFrames, null);

  // Graphics notice: shown only for integrated / software adapters, bilingual, dismissible, remembered.
  const hint = page.locator("#gpu-hint");
  // The notice starts as its "i" chip (src/gpu.js): open it from the chip first.
  const openHint = async () => {
    if (await hint.evaluate((h) => h.classList.contains("is-chip"))) {
      await hint.locator(".gpu-hint-chip").click();
      await page.waitForFunction(() => document.querySelector("#gpu-hint.show:not(.is-chip)"), null, { timeout: 3000 });
    }
    await hint.locator("summary").click();
  };
  const shown = await hint.isVisible().catch(() => false);
  check(name, "notice shown only where it helps", shown === expect.hint, shown);
  if (shown) {
    result.hintCollapsedBox = await hint.boundingBox();
    const selection = await page.locator(".selection").boundingBox();
    check(name, "collapsed notice clears the selected story", result.hintCollapsedBox.y + result.hintCollapsedBox.height < selection.y, { hint: result.hintCollapsedBox, selectionTop: selection.y });
    await page.screenshot({ path: `${out}/hint-${name}-collapsed.png` });
    await openHint();
    result.hintZh = (await hint.innerText()).trim();
    await page.screenshot({ path: `${out}/hint-${name}-zh.png` });
    await page.locator("#language").click();
    await page.waitForTimeout(300);
    result.hintEn = (await hint.innerText()).trim();
    result.hintLabelEn = await hint.getAttribute("aria-label");
    await page.screenshot({ path: `${out}/hint-${name}-en.png` });
    check(name, "notice follows the language", /[一-鿿]/.test(result.hintZh) && !/[一-鿿]/.test(result.hintEn.replace(/[“”]/g, "")) && result.hintLabelEn === "Graphics notice", null);
    // Hidden while reading.
    await page.locator("#open-story").click();
    await page.waitForTimeout(800);
    check(name, "notice hidden in the reader", !(await hint.isVisible()), null);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(800);
    // Keyboard: focus the close button, Escape dismisses.
    await page.locator(".gpu-hint-close").focus();
    await page.keyboard.press("Escape");
    check(name, "Escape dismisses the notice", (await hint.count()) === 0, null);
    const stored = await page.evaluate(() => localStorage.getItem("st-gpu-hint"));
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(2000);
    check(name, "dismissal is remembered", stored === "dismissed" && (await page.locator("#gpu-hint").count()) === 0, stored);
    await page.evaluate(() => localStorage.removeItem("st-gpu-hint"));
    // Narrow window: the notice fits without covering the archive navigation.
    await page.setViewportSize({ width: 390, height: 800 });
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForSelector("#gpu-hint.show", { timeout: 5000 });
    await page.waitForTimeout(400);
    const box = await page.locator("#gpu-hint").boundingBox();
    result.hintMobileBox = box;
    const catalogue = await page.locator("#categories").boundingBox();
    check(name, "notice fits a 390 px window below the categories", box && box.x >= 0 && box.x + box.width <= 390 && box.y >= catalogue.y + catalogue.height, { box, categoriesBottom: catalogue.y + catalogue.height });
    await page.screenshot({ path: `${out}/hint-${name}-390.png` });
    await openHint();
    await page.screenshot({ path: `${out}/hint-${name}-390-open.png` });
    await page.locator(".gpu-hint-close").click();
  }
  // Reduced motion: hovering never starts the breathing loop.
  await page.setViewportSize({ width: 1480, height: 900 }).catch(() => {});
  await page.evaluate(() => localStorage.setItem("st-motion", "reduced"));
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForFunction(() => window.__archiveDiagnostics?.().imageCovers > 20, null, { timeout: 30000 });
  await park(page);
  await idle(page);
  const p2 = await page.evaluate(() => {
    const c = document.querySelector("#scene canvas").getBoundingClientRect();
    return { x: c.left + c.width * 0.6, y: c.top + c.height * 0.45 };
  });
  await page.mouse.move(p2.x, p2.y, { steps: 3 });
  await page.waitForTimeout(500);
  result.reducedHoverFrames = await drawnOver(page, 1500);
  check(name, "reduced motion: no breathing", result.reducedHoverFrames === 0, result.reducedHoverFrames);
  await page.evaluate(() => localStorage.removeItem("st-motion"));
  await browser.close();
}

const RUNS = {
  discrete: { force: true, expect: { kind: "discrete", tier: "high", hint: false } },
  integrated: { force: false, expect: { kind: "integrated", tier: "low", hint: true } },
  "fake-integrated": { force: true, query: "?gpu=integrated", expect: { kind: "integrated", tier: "low", hint: true } },
  "fake-software": { force: true, query: "?gpu=software", expect: { kind: "software", tier: "minimal", hint: true } },
};
// STELLARIS_GPU_RUNS=discrete,integrated to run a subset.
for (const name of (process.env.STELLARIS_GPU_RUNS || Object.keys(RUNS).join(",")).split(",")) {
  try {
    await run(name, RUNS[name]);
  } catch (e) {
    check(name, "run completed", false, e.message.split("\n")[0]);
    await current?.close().catch(() => {});
  }
}

report.finishedAt = new Date().toISOString();
// Known, not from this change: museum.css resolves the floor image relative to src/ (reported to the museum work).
const known = (e) => /404.*\/src\/museum\/ui\//.test(e);
report.knownErrors = report.errors.filter(known);
report.errors = report.errors.filter((e) => !known(e));
await writeFile(`${out}/verify-gpu.json`, JSON.stringify(report, null, 2));
console.log("written", `${out}/verify-gpu.json`, "| errors:", report.errors, "| known:", report.knownErrors.length);
assert.deepEqual(report.errors, []);
assert.ok(report.checks.every((c) => c.ok), "some checks failed");
