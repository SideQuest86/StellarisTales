// Extra states for the round-6 phone pass: EN archive rail + masthead, a later chapter (Back / Start over row) and the
// empire-profile panel with an active profile. node verification/round6/phone/extra.mjs [tag]
import { pathToFileURL } from "node:url";
const PW = "C:/Users/wangp/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";
const { chromium } = await import(pathToFileURL(PW).href);
const base = process.env.STELLARIS_PREVIEW_URL || "http://127.0.0.1:4167/";
const tag = process.argv[2] || "after";
const out = "verification/round6/phone";
const browser = await chromium.launch({ channel: "chrome", headless: true, args: ["--enable-unsafe-swiftshader"] });
async function ctx(w, h, lang, mobile = true) {
  const context = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, isMobile: mobile, hasTouch: mobile });
  await context.addInitScript((l) => { try { localStorage.setItem("st-language", l); } catch {} }, lang);
  const page = await context.newPage();
  page.on("pageerror", (e) => console.log("pageerror", e.message));
  return { context, page };
}
const ready = async (page) => {
  await page.waitForFunction(() => document.querySelector("#selected-title")?.textContent.trim() && !/载入|Loading/.test(document.querySelector("#selected-title").textContent), null, { timeout: 30000 });
  await page.waitForTimeout(1600);
};
// EN archive 360
{
  const { context, page } = await ctx(360, 740, "en");
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await ready(page);
  await page.screenshot({ path: `${out}/360x740-archive-en-${tag}.png` });
  await page.locator('#categories [data-category="5"]').click();
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${out}/360x740-archive-en-rail-scrolled-${tag}.png`, clip: { x: 0, y: 0, width: 360, height: 120 } });
  await context.close();
}
// later chapter, EN, 360 + zh 390
for (const [w, h, lang] of [[360, 740, "en"], [390, 844, "zh"]]) {
  const { context, page } = await ctx(w, h, lang);
  await page.goto(base + "#story=cetana", { waitUntil: "domcontentloaded" });
  await page.locator("#reader:not([hidden]):not(.prewarm) .chapter-document").waitFor({ timeout: 30000 });
  await page.waitForTimeout(1200);
  await page.locator(".choice-button").first().click();
  await page.waitForTimeout(300);
  await page.locator(".choice-response:not([hidden]) .next-chapter, .continuation .next-chapter, .choice-response:not([hidden]) [data-chapter]").first().click();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${out}/${w}x${h}-reader-chapter2-${lang}-${tag}.png` });
  if (w === 390) {
    await page.locator("[data-profile-open]").click();
    await page.waitForSelector(".profile-panel [data-profile-gestalt]", { timeout: 8000 });
    await page.locator("[data-profile-gestalt]").selectOption("yes");
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${out}/${w}x${h}-reader-profile-open-${lang}-${tag}.png` });
  }
  await context.close();
}
await browser.close();
