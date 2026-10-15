// Rollback check for the super-resolved images (docs/IMAGES.md): run against a build whose public/art-hd and
// public/museum/img-hd folders were removed. The reader close-up, the phone srcset and the museum detail must fall
// back to the originals with no page errors and no broken images. Needs a preview of that build.
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
const { chromium } = await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const base = process.env.STELLARIS_PREVIEW_URL || "http://127.0.0.1:4173/";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const errors = [];
for (const [vw, dpr, path, sel] of [[1600, 1, "#story=cetana", ".chapter-document"], [390, 2, "#story=cetana", ".chapter-document"], [1600, 1, "#museum=acidic_spores", ".museum-stage-image"]]) {
  const ctx = await browser.newContext({ viewport: { width: vw, height: 900 }, deviceScaleFactor: dpr });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(e.message));
  const ok200 = [];
  page.on("response", (r) => { if (/\/(art|museum\/img)\/[^/]+\.webp/.test(r.url()) && r.status() === 200) ok200.push(r.url()); });
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => localStorage.setItem("st-music-paused", "1"));
  await page.goto(base + path);
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForSelector(sel, { timeout: 20000 });
  await page.waitForTimeout(2500);
  assert.ok(ok200.length > 0, `${vw}/${dpr} ${path}: originals delivered`);
  if (path.startsWith("#museum")) {
    const shown = await page.evaluate(() => { const i = document.querySelector(".museum-stage-image"); return i.complete && i.naturalWidth > 0 ? i.currentSrc : null; });
    assert.ok(shown && /museum\/img\//.test(shown), `museum detail falls back to the original icon (${shown})`);
  }
  console.log(`✔ ${vw}px DPR ${dpr} ${path}: falls back to originals (${ok200.length} original images)`);
  await ctx.close();
}
console.log(errors.length ? `page errors: ${errors.join(" | ")}` : "page errors: 0");
await browser.close();
process.exit(errors.length ? 1 : 0);
