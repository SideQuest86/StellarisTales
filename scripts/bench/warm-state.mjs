// Is the idle glyph warm-up still in effect when a story is opened? (round 5)
// Lays out the same 400 glyphs of the 19 px reading face in a fresh element at three moments and reports the cost:
//   1. right after the glyph warm-up finished (a warm face costs ~1 ms, a cold one ~50 ms)
//   2. after the first story's own render-ahead (prewarmReader) finished
//   3. after a web-font slice for a rare character arrived ("fonts changed" resets the warmed state of that face)
//   STELLARIS_PLAYWRIGHT_PATH=... URL=http://127.0.0.1:4173/ node scripts/bench/warm-state.mjs
import { pathToFileURL } from "node:url";

const { chromium } = await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const url = process.env.URL || "http://127.0.0.1:4173/";
const browser = await chromium.launch({ channel: "chrome", headless: false, args: ["--window-position=-1900,20"] });
const page = await (await browser.newContext({ viewport: { width: 1600, height: 900 } })).newPage();
await page.addInitScript(() => {
  window.__probe = async (from, to) => {
    const glyphs = (await (await fetch("./stories/glyphs.json")).json()).zh;
    const host = document.createElement("div");
    host.style.cssText = "position:fixed;left:0;top:0;width:640px;visibility:hidden;contain:layout paint style;z-index:-1;font:400 19px var(--serif-zh)";
    document.body.append(host);
    const t0 = performance.now();
    for (let i = from; i < to; i += 40) { host.textContent = glyphs.slice(i, i + 40); host.getBoundingClientRect(); }
    const ms = performance.now() - t0;
    host.remove();
    return +ms.toFixed(1);
  };
});
await page.goto(url, { waitUntil: "domcontentloaded" });
await page.waitForFunction(() => window.__glyphWarmup?.done, null, { timeout: 120000 });
console.log("1. right after the glyph warm-up:", await page.evaluate(() => window.__probe(0, 400)), "ms for 400 glyphs");
await page.waitForFunction(() => window.__readerWarmup?.mapMs !== undefined, null, { timeout: 120000 });
await page.waitForTimeout(1500);
console.log("2. after the render-ahead of the selected story:", await page.evaluate(() => window.__probe(400, 800)), "ms for 400 other glyphs");
await page.evaluate(async () => {
  const probe = document.createElement("div");
  probe.style.cssText = "position:fixed;left:0;top:0;opacity:.002;font:400 19px var(--serif-zh)";
  probe.textContent = "鬻龘䶮齉爨"; // characters in slices the page has not loaded
  document.body.append(probe);
  probe.getBoundingClientRect();
  await new Promise((resolve) => { document.fonts.addEventListener("loadingdone", resolve, { once: true }); setTimeout(resolve, 4000); });
  await new Promise((resolve) => setTimeout(resolve, 400));
  probe.remove();
});
console.log("3. after a rare-character slice of the same face arrived:", await page.evaluate(() => window.__probe(800, 1200)), "ms for 400 other glyphs");
await browser.close();
