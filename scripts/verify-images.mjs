// Super-resolved image delivery (docs/IMAGES.md): desktop close-up canvas uses public/art-hd; a 390 px phone at
// DPR 2 picks the art-hd file through srcset while DPR 1 keeps the original; the museum detail loads public/museum/img-hd;
// the 3D archive atlas still loads only originals. Needs a preview (or STELLARIS_PREVIEW_URL).
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
const { chromium } = await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const base = process.env.STELLARIS_PREVIEW_URL || "http://127.0.0.1:4173/";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const ok = (n, d = "") => console.log("✔", n, d);
async function run(viewport, deviceScaleFactor, path, wait) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor });
  const page = await ctx.newPage();
  const seen = [];
  page.on("response", (r) => { if (/\/(art|art-hd|museum\/img|museum\/img-hd)\/[^/]+\.webp/.test(r.url())) seen.push([r.url().replace(/^.*?\/((?:museum\/)?(?:art|art-hd|img|img-hd))\//, "$1/"), r.status()]); });
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => localStorage.setItem("st-music-paused", "1"));
  await page.goto(base + path);
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForSelector(wait, { timeout: 20000 });
  await page.waitForTimeout(2500);
  await ctx.close();
  return seen;
}
const desk = await run({ width: 1600, height: 1000 }, 1, "#story=cetana", ".chapter-document");
assert.ok(desk.some(([u, s]) => u.startsWith("art-hd/") && s === 200), "desktop close-up loads art-hd");
ok("desktop close-up loads super-resolved art", `${desk.filter(([u]) => u.startsWith("art-hd/")).length} art-hd`);
const phone2 = await run({ width: 390, height: 844 }, 2, "#story=cetana", ".chapter-document");
assert.ok(phone2.some(([u, s]) => u.startsWith("art-hd/") && s === 200), "DPR 2 phone picks art-hd via srcset");
ok("390 px phone at DPR 2 picks the HD derivative (srcset)");
const phone1 = await run({ width: 390, height: 844 }, 1, "#story=cetana", ".chapter-document");
assert.ok(phone1.some(([u]) => u.startsWith("art/")), "DPR 1 phone keeps the original");
ok("390 px phone at DPR 1 keeps the original (no extra bytes)");
const museum = await run({ width: 1600, height: 1000 }, 1, "#museum=acidic_spores", ".museum-stage-image, .museum-stage canvas");
assert.ok(museum.some(([u, s]) => u.startsWith("museum/img-hd/") && s === 200), "museum detail loads img-hd");
ok("museum detail loads the super-resolved icon");
const archive = await run({ width: 1600, height: 1000 }, 1, "", "#categories [data-category]");
assert.ok(!archive.some(([u]) => u.startsWith("art-hd/")), "3D archive atlas uses only originals");
ok("3D archive atlas loads only originals (bounded GPU memory)", `${archive.filter(([u]) => u.startsWith("art/")).length} originals`);
await browser.close();
