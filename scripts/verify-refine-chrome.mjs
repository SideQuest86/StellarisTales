// Browser check of the 2026-10 chrome refinement: site name, brand, museum entry inside the top navigation,
// fonts in use, layout shift during font loading, and screenshots (archive, reader, guide box, museum, playlist)
// at 1600x1000 and 390x844 in both languages. Requires a preview (scripts/serve.mjs --dist) and
// STELLARIS_PLAYWRIGHT_PATH. Headless by default; HEADED=1 opens windows (use STELLARIS_WINDOW_POSITION=-1900,20).
// Writes verification/refine/chrome-*.png.
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { pathToFileURL } from "node:url";
const { chromium } = await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const base = process.env.STELLARIS_PREVIEW_URL || "http://127.0.0.1:4173/";
const out = "verification/refine";
await mkdir(out, { recursive: true });
const headed = !!process.env.HEADED;
const args = headed && process.env.STELLARIS_WINDOW_POSITION ? [`--window-position=${process.env.STELLARIS_WINDOW_POSITION}`] : [];
const browser = await chromium.launch({ channel: "chrome", headless: !headed, args });
const step = (name, detail = "") => console.log("OK", name, detail);
const errors = [];
const viewports = { desktop: { width: 1600, height: 1000 }, phone: { width: 390, height: 844 } };
try {
  for (const [vname, viewport] of Object.entries(viewports)) {
    for (const lang of ["zh", "en"]) {
      const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1, hasTouch: vname === "phone" });
      const page = await ctx.newPage();
      page.on("pageerror", (e) => errors.push(`${vname}/${lang}: ${e.message}`));
      await page.addInitScript((l) => {
        try { localStorage.setItem("st-language", l); } catch {}
        window.__cls = 0;
        new PerformanceObserver((list) => { for (const e of list.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: "layout-shift", buffered: true });
      }, lang);
      const tag = `${vname}-${lang}`;
      await page.goto(base, { waitUntil: "load" });
      await page.waitForSelector("#categories #museum-open", { timeout: 30000 });
      await page.waitForTimeout(2500);
      // site name + brand
      assert.equal(await page.title(), "Stellaris Tales");
      assert.equal((await page.locator(".brand").innerText()).trim(), "Stellaris Tales");
      assert.equal(await page.locator(".brand").getAttribute("aria-label"), lang === "zh" ? "Stellaris Tales 首页" : "Stellaris Tales home");
      // museum entry: exactly one, inside the nav
      assert.equal(await page.locator("#museum-open").count(), 1);
      assert.equal(await page.locator("nav#categories #museum-open").count(), 1);
      assert.equal(await page.locator(".header-actions #museum-open").count(), 0);
      step(`${tag}: title, brand, one museum entry in the nav`);
      // fonts actually used
      await page.evaluate(() => document.fonts.ready);
      const fonts = await page.evaluate(() => ({
        newsreader: document.fonts.check('400 19px "Newsreader"', "Stellaris"),
        notoSerif: document.fonts.check('400 19px "Noto Serif SC"', "故事"),
        notoSans: document.fonts.check('400 13px "Noto Sans SC"', "搜索"),
        loaded: [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family.replace(/"/g, "")).filter((v, i, a) => a.indexOf(v) === i),
        titleFont: getComputedStyle(document.querySelector("#selected-title")).fontFamily.split(",")[0],
        uiFont: getComputedStyle(document.querySelector(".header-actions button")).fontFamily.split(",")[0],
      }));
      console.log("  fonts", JSON.stringify(fonts));
      if (lang === "en") assert.ok(fonts.loaded.includes("Newsreader"), "Newsreader loaded in English");
      else assert.ok(fonts.loaded.includes("Noto Serif SC"), "Noto Serif SC loaded in Chinese");
      // layout shift while fonts load
      const cls = await page.evaluate(() => window.__cls);
      assert.ok(cls < 0.02, `CLS ${cls} < 0.02`);
      step(`${tag}: layout shift`, cls.toFixed(4));
      await page.screenshot({ path: `${out}/chrome-${tag}-archive.png` });
      // museum opens by click and keyboard
      await page.locator("#museum-open").click();
      await page.waitForFunction(() => document.body.classList.contains("museum-open"), null, { timeout: 15000 });
      await page.waitForTimeout(1200);
      await page.screenshot({ path: `${out}/chrome-${tag}-museum.png` });
      assert.equal(await page.locator(".museum-eyebrow").count(), 0, "no decorative museum eyebrow");
      await page.locator(".museum-exhibit").first().click();
      await page.waitForTimeout(900);
      await page.screenshot({ path: `${out}/chrome-${tag}-museum-detail.png` });
      // polish checks on the archive chrome: removed filler stays removed, transitions stay short
      assert.equal(await page.locator(".archive-hint, .lane-navigation span").count(), 0, "no archive hint / category label");
      const slow = await page.evaluate(() => {
        const bad = [];
        for (const el of document.querySelectorAll("body *")) {
          const cs = getComputedStyle(el);
          cs.transitionDuration.split(",").forEach((d) => { if (parseFloat(d) > 0.2001 && !el.closest("canvas")) bad.push(`${el.tagName}.${el.className}:${d}`); });
        }
        return bad.slice(0, 5);
      });
      assert.deepEqual(slow, [], "transitions <= 200 ms");
      await page.evaluate(() => (location.hash = ""));
      await page.waitForFunction(() => !document.body.classList.contains("museum-open"), null, { timeout: 8000 });
      await page.locator("#museum-open").focus();
      await page.keyboard.press("Enter");
      await page.waitForFunction(() => document.body.classList.contains("museum-open"), null, { timeout: 15000 });
      step(`${tag}: museum opens by click and by keyboard`);
      await page.evaluate(() => (location.hash = ""));
      await page.waitForFunction(() => !document.body.classList.contains("museum-open"), null, { timeout: 8000 });
      // language switch keeps the entry and its handler
      await page.locator("#language").click();
      await page.waitForTimeout(500);
      assert.equal(await page.locator("nav#categories #museum-open").count(), 1);
      await page.locator("#museum-open").click();
      await page.waitForFunction(() => document.body.classList.contains("museum-open"), null, { timeout: 15000 });
      step(`${tag}: entry survives a language switch`);
      await page.evaluate(() => (location.hash = ""));
      await page.waitForFunction(() => !document.body.classList.contains("museum-open"), null, { timeout: 8000 });
      await page.locator("#language").click();
      await page.waitForTimeout(400);
      // reader, long chapter
      await page.evaluate(() => (location.hash = "story=anomaly-nano-swarm-cat&chapter=anomaly.6710"));
      await page.waitForSelector('.chapter-document[data-doc="anomaly.6710"]', { timeout: 20000 });
      await page.waitForTimeout(1500);
      await page.screenshot({ path: `${out}/chrome-${tag}-reader.png` });
      const measure = await page.evaluate(() => {
        const p = document.querySelector(".narrative p");
        if (!p) return null;
        const w = p.getBoundingClientRect().width, fs = parseFloat(getComputedStyle(p).fontSize);
        return { width: Math.round(w), fontSize: fs, em: +(w / fs).toFixed(1) };
      });
      console.log("  measure", JSON.stringify(measure));
      // guide box
      await page.evaluate(() => (location.hash = "story=anomaly-crashed-ship-asteroid-category"));
      await page.waitForSelector(".exclusive-outcomes", { timeout: 20000 });
      await page.waitForTimeout(800);
      await page.screenshot({ path: `${out}/chrome-${tag}-guide.png` });
      await page.evaluate(() => (location.hash = ""));
      await page.waitForFunction(() => !document.body.classList.contains("reader-open"), null, { timeout: 8000 });
      // playlist
      await page.locator("#playlist-toggle").click();
      await page.waitForTimeout(900);
      await page.screenshot({ path: `${out}/chrome-${tag}-playlist.png` });
      step(`${tag}: screenshots written`);
      await ctx.close();
    }
  }
  assert.deepEqual(errors, [], errors.join("\n"));
  console.log("PASS verify-refine-chrome");
} finally {
  await browser.close();
}
