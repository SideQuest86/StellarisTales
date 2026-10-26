// Usage: STELLARIS_PLAYWRIGHT_PATH=... node scripts/touch-icon.mjs public/mark.svg public/apple-touch-icon.png
// The home-screen icon (180x180 PNG): the site's mark (public/mark.svg, inlined) on its own dark ground.
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
const { chromium } = await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const [svgPath, out] = process.argv.slice(2);
const svg = readFileSync(svgPath, "utf8").replace(/<svg\b/, '<svg width="180" height="180" preserveAspectRatio="none"');
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 180, height: 180 }, deviceScaleFactor: 1 });
  await page.setContent(`<html><body style="margin:0;width:180px;height:180px;display:grid;place-items:center;background:#0b1519">${svg}</body></html>`);
  await page.waitForTimeout(200);
  await page.screenshot({ path: out, type: "png" });
} finally {
  await browser.close();
}
console.log("icon written");
