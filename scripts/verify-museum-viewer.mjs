// Exhibit viewer regression check (src/museum-viewer.js): every model is normalised once, so reopening a cached model
// keeps its size, centre and opening view (A-B-A), the turntable does not leak into the next opening, rapid switching
// and slow downloads always end on the last exhibit asked for, the cache stays bounded (GPU memory does not grow over
// repeated opens), and the reset control returns to the opening view. ALL=1 also opens every model and records its
// opening view (verification/museum/opening-views.json) with screenshots of the flat ones.
// Requires a preview (scripts/serve.mjs --dist; STELLARIS_PREVIEW_URL) and STELLARIS_PLAYWRIGHT_PATH.
import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
const { chromium } = await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const base = process.env.STELLARIS_PREVIEW_URL || "http://127.0.0.1:4173/";
const out = "verification/museum";
await mkdir(`${out}/opening`, { recursive: true });
const manifest = JSON.parse(await readFile("public/museum/models/manifest.json", "utf8"));
const keys = manifest.models.map((m) => m.key);
const place = [`--window-size=${process.env.STELLARIS_WINDOW_SIZE || "1600,1000"}`, ...(process.env.STELLARIS_WINDOW_POSITION ? [`--window-position=${process.env.STELLARIS_WINDOW_POSITION}`] : [])];
const gpuArgs = process.env.STELLARIS_NO_RTX ? [] : ["--use-angle=d3d11", "--force-high-performance-gpu", "--ignore-gpu-blocklist"];
const headless = process.env.HEADLESS !== "0";
const browser = await chromium.launch({ channel: "chrome", headless, args: [...gpuArgs, ...place] });
const close = (a, b, eps = 1e-3) => a.every((v, i) => Math.abs(v - b[i]) < eps);
let passed = 0;
const step = (name, detail = "") => { passed++; console.log("✔", name, detail); };
const errors = [];
try {
  const page = await (await browser.newContext({ viewport: { width: 1600, height: 1000 } })).newPage();
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base + "#museum", { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#museum.open .museum-exhibit");
  await page.waitForTimeout(800);
  const diag = () => page.evaluate(() => window.__museumViewer?.());
  const open = async (key, wait = true) => {
    await page.locator(`.museum-exhibit[data-key="${key}"]`).click();
    if (wait) await page.waitForFunction((k) => window.__museumViewer?.()?.url?.endsWith(`/${k}.glb`) && document.querySelector(".museum-viewer.ready"), key, { timeout: 30000 });
  };
  const [A, B, C, D, E] = keys;

  // A-B-A: same size, centre and opening camera every time.
  await open(A); const a1 = await diag();
  await open(B); const b1 = await diag();
  await open(A); const a2 = await diag();
  await open(B); const b2 = await diag();
  for (const d of [a1, b1, a2, b2]) {
    assert.ok(Math.abs(d.diagonal - 1.6) < 1e-3, `diagonal ${d.diagonal}`);
    assert.ok(close(d.centre, [0, 0, 0]), `centre ${d.centre}`);
    assert.ok(close(d.target, [0, 0, 0]));
  }
  assert.ok(close(a1.camera, a2.camera, 0.02) && close(b1.camera, b2.camera, 0.02), "camera differs on reopening");
  assert.ok(a2.cached.length === 2);
  step("A-B-A-B reopening keeps size 1.6, centre and opening camera", `A ${a1.diagonal.toFixed(4)} → ${a2.diagonal.toFixed(4)}, B ${b1.diagonal.toFixed(4)} → ${b2.diagonal.toFixed(4)}`);

  // Rotation: the turntable and a drag turn the model / camera; reopening starts from the opening view again.
  await page.waitForTimeout(1500);
  const box = await page.locator(".museum-viewer canvas").boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 + 160, box.y + box.height / 2 + 40, { steps: 8 });
  await page.mouse.up();
  await page.waitForTimeout(300);
  const turned = await diag();
  assert.ok(!close(turned.camera, b2.camera, 0.05), "drag did not move the camera");
  await open(A); await open(B); const b3 = await diag();
  assert.ok(Math.abs(b3.diagonal - 1.6) < 1e-3 && close(b3.camera, b1.camera, 0.02), `after rotation ${b3.camera}`);
  step("after turntable + drag, reopening returns to the opening view", `camera ${b3.camera.map((v) => v.toFixed(2))}`);

  // Reset control and the 0 key.
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + 40, box.y + 60, { steps: 6 });
  await page.mouse.up();
  await page.waitForTimeout(200);
  await page.locator("[data-reset-view]").click();
  await page.waitForTimeout(100);
  const reset = await diag();
  assert.ok(close(reset.camera, b1.camera, 0.02), `reset ${reset.camera}`);
  await page.locator(".museum-viewer").focus();
  await page.keyboard.press("ArrowLeft"); await page.keyboard.press("-");
  await page.keyboard.press("0");
  assert.ok(close((await diag()).camera, b1.camera, 0.02));
  step("reset button and the 0 key restore the opening view");

  // Rapid switching: four exhibits clicked without waiting — the last one wins.
  for (const k of [C, D, E, A]) await open(k, false);
  await page.waitForFunction((k) => window.__museumViewer?.()?.url?.endsWith(`/${k}.glb`), A, { timeout: 30000 });
  await page.waitForTimeout(2500); // let any stragglers finish downloading
  const rapid = await diag();
  assert.ok(rapid.url.endsWith(`/${A}.glb`) && Math.abs(rapid.diagonal - 1.6) < 1e-3 && rapid.pending === 0, JSON.stringify(rapid));
  assert.ok(rapid.cached.length <= 3);
  step("rapid switching ends on the last exhibit", `cache ${rapid.cached.length}, pending ${rapid.pending}`);

  // Slow download: A' is still loading when B' is opened; when A' arrives it must not replace B'.
  const [S1, S2] = keys.slice(10, 12);
  await page.route(`**/${S1}.glb`, async (route) => { await new Promise((r) => setTimeout(r, 2000)); await route.continue(); });
  await open(S1, false);
  await page.waitForTimeout(200);
  await open(S2);
  await page.waitForTimeout(3000);
  const slow = await diag();
  assert.ok(slow.url.endsWith(`/${S2}.glb`), `slow load replaced the exhibit: ${slow.url}`);
  await open(S1); // now from the cache or the finished download
  assert.ok(Math.abs((await diag()).diagonal - 1.6) < 1e-3);
  step("a slow download never replaces the exhibit opened after it");

  // Bounded memory: 12 rounds over 5 models keep the cache at 3 and GPU geometries/textures flat.
  const loop = keys.slice(20, 25);
  let first = null, last = null;
  for (let round = 0; round < 3; round++) for (const k of loop) { await open(k); last = await diag(); if (!first && round === 1) first = last; }
  assert.ok(last.cached.length === 3 && last.geometries <= first.geometries + 2 && last.textures <= first.textures + 2, JSON.stringify({ first, last }));
  step("cache bounded at 3; GPU geometries/textures do not grow", `geometries ${first.geometries} → ${last.geometries}, textures ${first.textures} → ${last.textures}`);

  // Every model (ALL=1): opening view and extents; screenshots of flat ones.
  if (process.env.ALL) {
    const views = {};
    for (const k of keys) {
      await open(k);
      const d = await diag();
      views[k] = { extents: d.extents.map((v) => +v.toFixed(3)), view: d.view };
      const [x, y, z] = d.extents;
      if (Math.min(x, y, z) / Math.max(x, y, z) < 0.3) {
        await page.waitForTimeout(250);
        await page.locator(".museum-stage").screenshot({ path: `${out}/opening/${k}.png` });
      }
    }
    await writeFile(`${out}/opening-views.json`, JSON.stringify(views, null, 1));
    step("opening view recorded for every model", `${Object.keys(views).length}`);
  }
  assert.deepEqual(errors, []);
  step("no page errors");
  console.log(`${passed} checks passed`);
} finally {
  await browser.close();
}
