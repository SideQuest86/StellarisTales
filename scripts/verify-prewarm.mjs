// Reader warm-up (prewarmReader in src/app.js) vs real openings: a story opened by link at 12 moments around the
// idle warm-up, with a slow story download, on phone and desktop, must end open on that story with its controls.
// Requires a preview (STELLARIS_PREVIEW_URL) and STELLARIS_PLAYWRIGHT_PATH. Exits non-zero on any failure.
import { pathToFileURL } from "node:url";
const { chromium } = await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const base = process.env.STELLARIS_PREVIEW_URL;
const browser = await chromium.launch({ channel: "chrome", headless: true });
const bad = [];
for (const delay of [800, 1200, 1600, 2000, 2400, 2700, 3000, 3300, 3600, 4000, 4500, 5000]) {
  for (const vp of [{ width: 390, height: 844, isMobile: true, hasTouch: true }, { width: 1440, height: 900 }]) {
    const { isMobile, hasTouch, ...viewport } = vp;
    const ctx = await browser.newContext({ viewport, isMobile, hasTouch });
    const page = await ctx.newPage();
    // Slow network for the story opened by link (CI-like): the opening is in flight while the warm-up becomes due.
    await page.route("**/stories/cybrex.json", async (route) => { await new Promise((r) => setTimeout(r, 1800)); await route.continue(); });
    await page.goto(base, { waitUntil: "domcontentloaded" });
    await page.waitForSelector("#open-story");
    await page.waitForTimeout(delay);
    await page.goto(base + "#story=cybrex", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(3500);
    const s = await page.evaluate(() => ({ doc: document.querySelector(".chapter-document")?.dataset.doc, back: !!document.querySelector("#reading-back"), hidden: document.querySelector("#reader").hidden, cls: document.querySelector("#reader").className, inert: document.querySelector("#reader").inert, op: getComputedStyle(document.querySelector("#reader")).opacity, warm: window.__readerWarmup || null, hash: location.hash }));
    const ok = s.doc === "precursor.2000" && s.back && !s.hidden && !s.cls.includes("prewarm") && !s.inert;
    if (!ok) bad.push({ delay, w: viewport.width, ...s });
    await ctx.close();
  }
}
console.log(bad.length ? JSON.stringify(bad, null, 1) : "all 24 openings ended correctly");
process.exitCode = bad.length ? 1 : 0;
await browser.close();
