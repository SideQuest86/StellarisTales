// Round 6 phone / reader-chrome screenshots (before/after). Usage:
//   node verification/round6/phone/capture.mjs <before|after> [viewport-names…]
// Needs a preview of dist/ (node scripts/serve.mjs --port 4167) and Playwright with the Chrome channel.
import { pathToFileURL } from "node:url";
const PW = "C:/Users/wangp/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";
const { chromium } = await import(pathToFileURL(PW).href);
const base = process.env.STELLARIS_PREVIEW_URL || "http://127.0.0.1:4167/";
const tag = process.argv[2] || "after";
const SIZES = {
  "390x844": { width: 390, height: 844, mobile: true, dpr: 2 },
  "360x740": { width: 360, height: 740, mobile: true, dpr: 2 },
  "844x390": { width: 844, height: 390, mobile: true, dpr: 2 },
  "667x375": { width: 667, height: 375, mobile: true, dpr: 2 }, // small landscape phone: keeps the phone layout
  "1440x900": { width: 1440, height: 900, mobile: false, dpr: 1 },
};
const want = process.argv.slice(3);
if (!want.length) want.push("390x844", "360x740", "844x390", "1440x900"); // 667x375 only on request
const story = process.env.STORY || "cetana";
const lang = process.env.LANG_ || "zh";
const out = "verification/round6/phone";
const browser = await chromium.launch({ channel: "chrome", headless: true, args: ["--enable-unsafe-swiftshader"] });
for (const name of want) {
  const [w, h] = name.split("x").map(Number);
  const s = SIZES[name] || { width: w, height: h, mobile: w < 1000, dpr: w < 1000 ? 2 : 1 }; // any WxH on request
  const context = await browser.newContext({
    viewport: { width: s.width, height: s.height }, deviceScaleFactor: s.dpr, isMobile: s.mobile, hasTouch: s.mobile,
  });
  await context.addInitScript((l) => { try { localStorage.setItem("st-language", l); } catch {} }, lang);
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const shot = (n) => page.screenshot({ path: `${out}/${name}-${n}-${tag}.png` });
  const parts = (process.env.PARTS || "archive,reader,museum").split(",");
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.querySelector("#selected-title")?.textContent.trim() && !/载入|Loading/.test(document.querySelector("#selected-title").textContent), null, { timeout: 30000 });
  await page.waitForTimeout(1800);
  if (parts.includes("archive")) await shot("archive");
  // reader
  if (parts.includes("reader")) {
    await page.goto(base + `#story=${story}`, { waitUntil: "domcontentloaded" });
    await page.locator("#reader:not([hidden]):not(.prewarm) .chapter-document").waitFor({ timeout: 30000 });
    await page.waitForTimeout(1600);
    await shot("reader-top");
    await page.evaluate(() => { const p = document.querySelector(".reader-panel"); p.scrollTop = Math.round(p.clientHeight * 0.55); });
    await page.waitForTimeout(500);
    await shot("reader-body");
  }
  // museum list + exhibit
  if (parts.includes("museum")) {
    await page.goto(base + "#museum", { waitUntil: "domcontentloaded" });
    await page.locator("#museum.open .museum-exhibit").first().waitFor({ timeout: 30000 });
    await page.waitForTimeout(1200);
    await shot("museum-list");
    await page.locator(".museum-exhibit").first().click();
    await page.locator("#museum .museum-detail:not([hidden])").waitFor({ timeout: 20000 });
    await page.waitForTimeout(2800);
    await shot("museum-exhibit");
  }
  console.log(name, "shots done", errors.length ? "ERRORS " + errors.join(" | ") : "");
  await context.close();
}
await browser.close();
