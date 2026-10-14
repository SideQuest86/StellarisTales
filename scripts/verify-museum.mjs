// Browser check of the 博物天枢 · Grand Archive museum: menu, grid, filters, search, keyboard, exhibit details,
// 3D viewer (screenshots from several angles per generated model), loading-failure fallback, story links, mobile
// layout and both languages. Headed Chrome on the real GPU by default (HEADLESS=1 to override).
// Requires a preview (scripts/serve.mjs --dist) and STELLARIS_PLAYWRIGHT_PATH. Writes verification/museum/.
import assert from "node:assert/strict";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
const { chromium } = await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const base = process.env.STELLARIS_PREVIEW_URL || "http://127.0.0.1:4173/";
const out = "verification/museum";
await mkdir(`${out}/shots`, { recursive: true });
const headless = !!process.env.HEADLESS;
// STELLARIS_WINDOW_POSITION / STELLARIS_WINDOW_SIZE place the headed window (e.g. on a side monitor: "-1900,20").
const place = [`--window-size=${process.env.STELLARIS_WINDOW_SIZE || "1600,1000"}`, ...(process.env.STELLARIS_WINDOW_POSITION ? [`--window-position=${process.env.STELLARIS_WINDOW_POSITION}`] : [])];
const browser = await chromium.launch({ channel: "chrome", headless, args: ["--use-angle=d3d11", "--force-high-performance-gpu", "--ignore-gpu-blocklist", ...place] });
const results = [];
const step = (name, detail = "") => { results.push({ name, detail }); console.log("✔", name, detail); };
const manifest = JSON.parse(await readFile("public/museum/models/manifest.json", "utf8"));
const errors = [];
try {
  const page = await (await browser.newContext(headless ? { viewport: { width: 1600, height: 1000 } } : { viewport: null })).newPage();
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => localStorage.clear());
  await page.locator("#museum-open").click();
  await page.waitForSelector("#museum.open .museum-exhibit");
  const total = await page.locator(".museum-exhibit").count();
  assert.equal(total, 258);
  step("menu opens the museum with every specimen", `${total} exhibits`);
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${out}/shots/1600-grid.png` });

  await page.locator('[data-filter="type"][data-value="xeno_geology"]').click();
  assert.equal(await page.locator(".museum-exhibit").count(), 82);
  await page.locator('[data-filter="rarity"][data-value="exceptional"]').click();
  const both = await page.locator(".museum-exhibit").count();
  assert.ok(both > 0 && both < 82);
  step("collection and rarity filters combine", `xeno geology ∩ exceptional = ${both}`);
  await page.locator('[data-filter="type"][data-value="all"]').click();
  await page.locator('[data-filter="rarity"][data-value="all"]').click();
  await page.locator(".museum-search").fill("星");
  const searched = await page.locator(".museum-exhibit").count();
  assert.ok(searched > 0 && searched < 258);
  await page.locator(".museum-search").fill("");
  step("search narrows by bilingual name/description", `"星" → ${searched}`);

  await page.locator("[data-toggle3d]").click();
  assert.equal(await page.locator(".museum-exhibit").count(), manifest.models.length);
  step("3D-only filter lists exactly the generated models", `${manifest.models.length}`);

  // Keyboard: arrow navigation and Enter to open.
  await page.locator(".museum-exhibit").first().focus();
  await page.keyboard.press("ArrowRight");
  const focusedKey = await page.evaluate(() => document.activeElement.dataset.key);
  await page.keyboard.press("Enter");
  await page.waitForSelector(".museum-detail:not([hidden]) h2");
  step("arrow keys move between exhibits; Enter opens one", focusedKey);
  await page.keyboard.press("Escape");
  await page.waitForFunction(() => document.querySelector(".museum-detail").hidden);

  for (const m of manifest.models) {
    await page.locator(`.museum-exhibit[data-key="${m.key}"]`).click();
    await page.waitForSelector(".museum-viewer.ready", { timeout: 30000 });
    const info = await page.evaluate(() => ({
      effects: document.querySelectorAll(".museum-effects li").length,
      disclaimer: document.querySelector(".museum-disclaimer")?.textContent || "",
      acq: document.querySelectorAll(".museum-acq li").length,
    }));
    assert.ok(info.effects > 0, "effects listed");
    assert.match(info.disclaimer, /非官方/);
    await page.locator(".museum-viewer").focus();
    for (const [i, keys] of [[], ["ArrowLeft", "ArrowLeft", "ArrowLeft", "ArrowLeft", "ArrowLeft"], ["ArrowLeft", "ArrowLeft", "ArrowLeft", "ArrowLeft", "ArrowLeft", "ArrowLeft", "ArrowLeft", "ArrowLeft", "ArrowLeft"], ["ArrowUp", "ArrowUp", "ArrowUp", "+", "+"]].entries()) {
      for (const k of keys) await page.keyboard.press(k);
      await page.waitForTimeout(250);
      await page.locator(".museum-stage").screenshot({ path: `${out}/shots/model-${m.key}-${i}.png` });
    }
    step("model renders and rotates/zooms by keyboard", `${m.key}: ${info.effects} effects, ${info.acq} sources, 4 angles`);
  }
  await page.screenshot({ path: `${out}/shots/1600-detail.png` });

  // Loading failure: the GLB request fails → original image with an explanation.
  await page.route("**/museum/models/*.glb", (r) => r.abort());
  await page.evaluate(() => { location.hash = "#"; });
  await page.goto(`${base}#museum=${manifest.models[0].key}`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => /未能加载|could not be loaded/.test(document.querySelector(".museum-disclaimer")?.textContent || ""), null, { timeout: 30000 });
  assert.ok(await page.locator(".museum-stage-image:not(.behind)").isVisible());
  step("a failed model load falls back to the original image with a note");
  await page.unroute("**/museum/models/*.glb");

  // English.
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await page.locator("#language").click();
  await page.locator("#museum-open").click();
  await page.waitForSelector("#museum.open .museum-exhibit");
  assert.match(await page.locator(".museum-head h1").innerText(), /Grand Archive/);
  await page.locator(`.museum-exhibit[data-key="${manifest.models[0].key}"]`).click();
  await page.waitForSelector(".museum-detail:not([hidden]) h2");
  assert.match(await page.locator(".museum-text").innerText(), /while exhibited/i);
  step("English chrome, names and effect labels");
  await page.screenshot({ path: `${out}/shots/1600-detail-en.png` });

  // Story link from an exhibit opens the dossier.
  const link = page.locator(".museum-acq a[data-story]").first();
  if (await link.count()) {
    const sid = await link.getAttribute("data-story");
    await link.click();
    await page.waitForFunction((id) => location.hash.includes(`story=${encodeURIComponent(id)}`) && document.querySelector(".chapter-document"), sid, { timeout: 20000 });
    step("acquisition link opens the related story dossier", sid);
  }

  // Mobile layout.
  const mobile = await (await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })).newPage();
  mobile.on("pageerror", (e) => errors.push(e.message));
  await mobile.goto(`${base}#museum=${manifest.models[0].key}`, { waitUntil: "domcontentloaded" });
  await mobile.waitForSelector(".museum-detail:not([hidden]) h2", { timeout: 30000 });
  const overflow = await mobile.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
  assert.equal(overflow, false);
  await mobile.waitForTimeout(1500);
  await mobile.screenshot({ path: `${out}/shots/390-detail.png` });
  step("390px: exhibit detail fits without horizontal overflow");
} finally {
  await browser.close();
}
assert.deepEqual(errors, [], "page errors: " + errors.join("; "));
await writeFile(`${out}/museum-check.json`, JSON.stringify({ date: new Date().toISOString(), base, results, errors }, null, 1) + "\n");
console.log(`checks ${results.length}, page errors ${errors.length}`);
