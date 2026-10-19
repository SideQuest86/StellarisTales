// Before/after captures of every major surface on two previews (e.g. a copy of the previous release and the current build):
//   STELLARIS_PLAYWRIGHT_PATH=… BEFORE=http://127.0.0.1:4199/ AFTER=http://127.0.0.1:4195/ node scripts/probe/before-after.mjs [out]
// Writes <out>/<surface>-before.png and -after.png (same viewport, same steps, music paused, motion settled).
import { pathToFileURL } from "node:url";
import { mkdir, readFile } from "node:fs/promises";
const records = JSON.parse(await readFile("public/stories/records.json", "utf8"));
const choicePanel = async (p, b) => {
  // anomaly.150: a choice whose outcome is a weighted random list (chances, conditions, resources).
  await p.goto(`${b}#story=${encodeURIComponent(records["anomaly.150"])}&chapter=anomaly.150`); await p.locator(reader).waitFor(); await settle(p, 800);
  await p.locator("[data-choice]").first().click(); await p.locator(".choice-response .fx").first().waitFor({ timeout: 10000 });
  await p.locator(".choice-response .fx summary").first().click(); await settle(p, 500);
  await p.evaluate(() => document.querySelector(".choice-response .fx")?.scrollIntoView({ block: "start" }));
};
const originPanel = async (p, b) => {
  await p.goto(`${b}#story=origin_void_dwellers`); await p.locator(reader).waitFor(); await settle(p, 800);
  const s = p.locator(".chapter-document > .fx summary").first(); await s.waitFor({ timeout: 10000 }); await s.click(); await settle(p, 500);
  await p.evaluate(() => document.querySelector(".chapter-document > .fx")?.scrollIntoView({ block: "start" }));
};
const { chromium } = await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const out = process.argv[2] || "verification/round4/before-after";
await mkdir(out, { recursive: true });
const sides = { before: process.env.BEFORE, after: process.env.AFTER };
const desk = { width: 1440, height: 900 }, phone = { width: 390, height: 844 }, land = { width: 844, height: 390 };
const reader = "#reader:not([hidden]):not(.prewarm) .chapter-document";
const click = async (page, sel) => { const l = page.locator(sel).first(); if (await l.count()) await l.click({ timeout: 4000 }).catch(() => {}); };
const settle = (page, ms = 1400) => page.waitForTimeout(ms);
const only = process.env.ONLY ? new RegExp(process.env.ONLY) : null;
const surfaces = [
  ["archive", desk, "zh", async (p, b) => { await p.goto(b); await p.locator("#open-story").waitFor(); }],
  ["archive-landscape", land, "zh", async (p, b) => { await p.goto(b); await p.locator("#open-story").waitFor(); }],
  ["reader-opening", desk, "zh", async (p, b) => { await p.goto(b + "#story=cetana"); await p.locator(reader).waitFor(); }],
  ["reader-continue-cards", desk, "zh", async (p, b) => {
    await p.goto(b + "#story=cetana"); await p.locator(reader).waitFor(); await settle(p);
    await p.evaluate(() => document.querySelector(".continuation")?.scrollIntoView({ block: "center" }));
  }],
  ["effects-choice-en", desk, "en", choicePanel],
  ["effects-choice-zh", desk, "zh", choicePanel],
  ["effects-origin-en", desk, "en", originPanel],
  ["guide-end", desk, "zh", async (p, b) => {
    await p.goto(b + "#story=cetana"); await p.locator(reader).waitFor(); await settle(p, 800);
    await click(p, ".story-summary > summary"); await settle(p, 600);
    await p.evaluate(() => { const g = document.querySelector(".md-guide"); g?.lastElementChild?.scrollIntoView({ block: "end" }); });
  }],
  ["ending", desk, "zh", async (p, b) => {
    await p.goto(b + "#story=origin_unplugged&chapter=unplugged.3090"); await p.locator(reader).waitFor(); await settle(p);
    await p.evaluate(() => document.querySelector(".chapter-end .reading-ending, .reading-ending")?.scrollIntoView({ block: "center" }));
  }],
  ["search-en", desk, "en", async (p, b) => {
    await p.goto(b); await p.locator("#open-story").waitFor(); await settle(p, 800);
    await p.click("#search-open"); await p.fill("#search-input", "crisis"); await settle(p, 2500);
  }],
  ["museum-list", desk, "zh", async (p, b) => { await p.goto(b + "#museum"); await p.locator("#museum.open .museum-exhibit").first().waitFor(); }],
  ["museum-exhibit", desk, "zh", async (p, b) => {
    await p.goto(b + "#museum=acidic_spores"); await p.locator("#museum.open .museum-detail:not([hidden])").waitFor(); await settle(p, 1500);
    await p.evaluate(() => document.querySelector(".museum-detail h3")?.scrollIntoView({ block: "start" }));
  }],
  ["phone-reader", phone, "zh", async (p, b) => { await p.goto(b + "#story=cetana"); await p.locator(reader).waitFor(); }],
];
const browser = await chromium.launch({ channel: "chrome", headless: true });
for (const [name, viewport, lang, steps] of surfaces.filter(([n]) => !only || only.test(n))) {
  for (const [side, base] of Object.entries(sides)) {
    const context = await browser.newContext({ viewport, deviceScaleFactor: viewport.width < 900 ? 2 : 1, isMobile: viewport.width < 900, hasTouch: viewport.width < 900, reducedMotion: "reduce" });
    await context.addInitScript((l) => { try { localStorage.setItem("st-language", l); localStorage.setItem("st-music-paused", "1"); localStorage.setItem("st-gpu-hint", "dismissed"); } catch {} }, lang);
    const page = await context.newPage();
    try {
      await steps(page, base);
      await settle(page);
      await page.screenshot({ path: `${out}/${name}-${side}.png` });
    } catch (e) { console.log("✗", name, side, e.message.split("\n")[0]); }
    await context.close();
  }
  console.log("✓", name);
}
await browser.close();
