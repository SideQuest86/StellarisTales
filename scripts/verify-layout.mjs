// Layout across viewports and engines (the 2026-10-26 round: docs/refine/round7/AUDIT.md "tablet portrait", "short
// screens", "viewports and engines"). Requires a running preview (default http://127.0.0.1:4173/). Engine:
// STELLARIS_ENGINE=chromium (default, installed Chrome) | webkit (Safari's engine, Playwright build).
//   1. the opened card (#flow-surface) stays on screen and clear of the reading text, portrait tablets to 1920 x 1080;
//   2. on short screens the archive's selection starts below the category rail;
//   3. no page wider than the screen, nothing drawn over the narrative (elementFromPoint), phones to 2560 x 1440;
//   4. no Chinese text in a computed italic (Chinese has no italic; WebKit's fallback would slant it).
// Run it after changing the layout, the camera framing (archive-scene.js frameCamera) or the type styles.
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
const pw = await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH || "C:/Users/wangp/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs").href);
const base = process.env.STELLARIS_PREVIEW_URL || "http://127.0.0.1:4173/";
const engine = process.env.STELLARIS_ENGINE || "chromium";
const browser = await pw[engine].launch(engine === "chromium" ? { channel: "chrome", headless: true } : { headless: true });
const problems = [];
const errors = [];
const CHAPTER = "#story=horizon-signal&chapter=akx.10030"; // choices, an ending, its next story and the foot panels

async function open(w, h, lang, hash = "") {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, hasTouch: w <= 1024, ...(engine === "firefox" ? {} : { isMobile: w < 700 }) });
  await ctx.addInitScript((l) => { try { localStorage.setItem("st-language", l); localStorage.setItem("st-music-paused", "1"); } catch {} }, lang);
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(`${w}x${h} ${lang}: ${e.message}`));
  await page.goto(base + hash, { waitUntil: "domcontentloaded" });
  if (hash) await page.waitForSelector(".chapter-document .narrative p", { timeout: 30000 });
  else await page.waitForFunction(() => document.querySelector("#selected-title")?.textContent.trim(), null, { timeout: 30000 });
  await page.waitForTimeout(1500); // the camera settles on the opened card / the selection
  return { ctx, page };
}

// 1. The opened card beside the text.
for (const [w, h] of [[768, 1024], [820, 1180], [1024, 1366], [1000, 1000], [1180, 820], [1280, 720], [1440, 900], [1920, 1080], [844, 390], [853, 480], [720, 405]]) {
  const { ctx, page } = await open(w, h, "en", CHAPTER);
  const m = await page.evaluate(() => {
    const c = document.querySelector("#flow-surface"), t = document.querySelector(".chapter-document .narrative");
    if (!c || c.hidden || !t) return null;
    const a = c.getBoundingClientRect(), b = t.getBoundingClientRect();
    return { left: Math.round(a.left), right: Math.round(a.right), text: Math.round(b.left) };
  });
  if (m && (m.left < 0 || m.right > m.text)) problems.push(`card ${w}x${h}: ${JSON.stringify(m)}`);
  await ctx.close();
}
console.log("OK card beside the text");

// 2. Short screens: the selection below the category rail.
for (const [w, h] of [[568, 320], [640, 360], [667, 375], [700, 400], [740, 360], [844, 390], [853, 480]])
  for (const lang of ["zh", "en"]) {
    const { ctx, page } = await open(w, h, lang);
    const m = await page.evaluate(() => {
      const r = (s) => { const e = document.querySelector(s); const b = e?.getBoundingClientRect(); return b?.height ? b : null; };
      const rail = r("#categories"), first = r(".selection-eyebrow") || r("#selected-title");
      return rail && first ? { rail: Math.round(rail.bottom), selection: Math.round(first.top) } : null;
    });
    if (m && m.selection < m.rail - 1) problems.push(`selection ${w}x${h} ${lang}: ${JSON.stringify(m)}`);
    await ctx.close();
  }
console.log("OK selection below the rail");

// 3. Page width and the reading text, phones to large monitors.
for (const [w, h] of [[320, 568], [360, 640], [390, 844], [430, 932], [600, 960], [701, 900], [1366, 768], [2560, 1440]])
  for (const lang of ["zh", "en"]) {
    const { ctx, page } = await open(w, h, lang, CHAPTER);
    const m = await page.evaluate(() => {
      const doc = document.querySelector(".chapter-document");
      let covered = 0;
      for (const p of doc.querySelectorAll(".narrative p")) {
        const r = p.getBoundingClientRect();
        for (const fx of [0.02, 0.5, 0.98]) for (const fy of [0.25, 0.75]) {
          const x = r.left + r.width * fx, y = r.top + r.height * fy;
          if (y < 80 || y > innerHeight - 90 || x < 0 || x > innerWidth) continue; // the toolbar and player fades
          const hit = document.elementFromPoint(x, y);
          if (hit && !doc.contains(hit)) covered++;
        }
      }
      return { wide: Math.max(0, document.documentElement.scrollWidth - innerWidth), covered };
    });
    if (m.wide > 1 || m.covered) problems.push(`page ${w}x${h} ${lang}: ${JSON.stringify(m)}`);
    await ctx.close();
  }
console.log("OK page width, nothing over the text");

// 4. Chinese never in italic.
{
  const { ctx, page } = await open(1440, 900, "zh", CHAPTER);
  await page.evaluate(() => { for (const d of document.querySelectorAll("details")) d.open = true; });
  const italic = await page.evaluate(() => [...document.querySelectorAll("body *")].filter((el) => {
    const own = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join("");
    return /[\u3400-\u9fff]/.test(own) && getComputedStyle(el).fontStyle !== "normal";
  }).map((el) => el.className || el.id || el.tagName).slice(0, 5));
  if (italic.length) problems.push(`italic Chinese: ${italic.join(", ")}`);
  await ctx.close();
}
console.log("OK Chinese upright");

await browser.close();
for (const p of problems) console.log("PROBLEM", p);
for (const e of errors) console.log("PAGE ERROR", e);
assert.equal(problems.length + errors.length, 0, `${problems.length} layout problems, ${errors.length} page errors`);
console.log(`verify-layout (${engine}): all checks passed`);
