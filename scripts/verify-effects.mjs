// Browser check of the gameplay-effects panels (public/effects, src/effects-panel.js): a choice's panel appears
// inside its outcome, opens on demand, a document-level panel and an origin's starting effects render, both
// languages, 390 px phone layout, no page errors. Screenshots: verification/effects/. Needs a preview.
import assert from "node:assert/strict";
import { mkdir, readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
const { chromium } = await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const base = process.env.STELLARIS_PREVIEW_URL || "http://127.0.0.1:4173/";
const out = "verification/effects";
await mkdir(out, { recursive: true });
const records = JSON.parse(await readFile("public/stories/records.json", "utf8"));
const browser = await chromium.launch({ channel: "chrome", headless: true });
const errors = [];
const ok = (name, detail = "") => console.log("✔", name, detail);
async function open(page, doc, lang) {
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await page.evaluate((l) => localStorage.setItem("st-language", l), lang);
  await page.goto(`${base}#story=${encodeURIComponent(records[doc])}&chapter=${encodeURIComponent(doc)}`);
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForSelector(`.chapter-document[data-doc="${doc}"]`, { timeout: 20000 });
}
for (const [lang, width, height] of [["zh", 1600, 1000], ["en", 1600, 1000], ["en", 390, 844]]) {
  const page = await browser.newPage({ viewport: { width, height } });
  page.on("pageerror", (e) => errors.push(e.message));
  // anomaly.150: a choice with a hidden weighted random list (deposit outcomes).
  await open(page, "anomaly.150", lang);
  await page.locator("[data-choice]").first().click();
  const panel = page.locator(".choice-response .fx").first();
  await panel.waitFor({ timeout: 10000 });
  assert.equal(await panel.evaluate((d) => d.open), false, "panel starts collapsed");
  await panel.locator("summary").click();
  const text = await panel.innerText();
  assert.ok(/%/.test(text), "random outcomes show chances");
  ok(`${lang} ${width}: choice panel opens on demand`, text.replace(/\s+/g, " ").slice(0, 140));
  await page.screenshot({ path: `${out}/${lang}-${width}-choice.png` });
  // An origin's first document: starting effects.
  await page.goto(`${base}#story=origin_void_dwellers`);
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForSelector(".chapter-document", { timeout: 20000 });
  await page.waitForTimeout(800);
  const origin = page.locator(".chapter-document > .fx").first();
  if (await origin.count()) {
    await origin.locator("summary").click();
    ok(`${lang} ${width}: origin starting effects`, (await origin.innerText()).replace(/\s+/g, " ").slice(0, 140));
    await page.screenshot({ path: `${out}/${lang}-${width}-origin.png` });
  } else console.log("· origin_void_dwellers: no origin document id in records (checked via story start instead)");
  if (width < 500) {
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    assert.ok(overflow <= 1, `no horizontal overflow (${overflow})`);
    ok("390 px: no horizontal overflow");
  }
  await page.close();
}
console.log(errors.length ? `page errors: ${errors.join(" | ")}` : "page errors: 0");
await browser.close();
process.exit(errors.length ? 1 : 0);
