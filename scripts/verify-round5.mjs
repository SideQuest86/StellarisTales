// Round-5 features in a real browser: reading marks on the archive (st-seen), specimens met while reading in the Grand
// Archive, number keys for choices / continue cards, guide event ids as chapter links, empty guide sections hidden.
//   STELLARIS_PLAYWRIGHT_PATH=<playwright/index.mjs> STELLARIS_PREVIEW_URL=… [STELLARIS_BROWSER_CHANNEL=chrome] node scripts/verify-round5.mjs
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
const { chromium } = await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const base = process.env.STELLARIS_PREVIEW_URL || "http://127.0.0.1:4173/";
const browser = await chromium.launch({ channel: process.env.STELLARIS_BROWSER_CHANNEL || undefined, headless: true });
let failed = 0;
const check = async (name, fn) => {
  try { console.log("✔", name, (await fn()) || ""); } catch (e) { failed++; console.log("✘", name, "—", e.message.split("\n")[0]); }
};
const reader = "#reader:not([hidden]):not(.prewarm) .chapter-document";
async function fresh(viewport = { width: 1440, height: 900 }, seed) {
  const context = await browser.newContext({ viewport });
  if (seed) await context.addInitScript((s) => { if (!sessionStorage.getItem("seeded")) { sessionStorage.setItem("seeded", "1"); localStorage.setItem("st-seen", s); } }, seed);
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  return { context, page, errors };
}

await check("reading marks: chapters read show on the archive panel; nothing without reading", async () => {
  const { context, page, errors } = await fresh();
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.querySelector("#selected-title")?.textContent.trim());
  assert.equal(await page.locator("#read-count").isHidden(), true, "mark shown before any reading");
  await page.locator("#open-story").click();
  await page.locator(reader).waitFor();
  await page.waitForTimeout(800);
  await page.keyboard.press("Escape");
  await page.waitForFunction(() => !document.querySelector("#read-count").hidden, null, { timeout: 5000 });
  const text = await page.locator("#read-count").textContent();
  assert.match(text, /已读 1\/\d+|1 of \d+ read|已读完|All read/);
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => !document.querySelector("#read-count").hidden, null, { timeout: 10000 });
  assert.deepEqual(errors, []);
  await context.close();
  return text;
});

await check("Grand Archive: specimens met while reading are marked and can be filtered; none without reading", async () => {
  let { context, page } = await fresh();
  await page.goto(base + "#museum", { waitUntil: "domcontentloaded" });
  await page.locator("#museum.open .museum-exhibit").first().waitFor({ timeout: 30000 });
  assert.equal(await page.locator(".museum-exhibit.met, [data-togglemet]").count(), 0, "marks without reading");
  await context.close();
  ({ context, page } = await fresh(undefined, JSON.stringify({ v: 1, s: { "site-asteroid-vault-1": ["ancrel.103"] } })));
  await page.goto(base + "#museum", { waitUntil: "domcontentloaded" });
  await page.locator("#museum.open .museum-exhibit").first().waitFor({ timeout: 30000 });
  assert.equal(await page.locator('.museum-exhibit.met[data-key="alien_dining_set"]').count(), 1, "alien_dining_set not marked");
  assert.match(await page.locator('.museum-exhibit[data-key="alien_dining_set"]').getAttribute("aria-label"), /阅读中遇到|met while reading/);
  await page.locator("[data-togglemet]").click();
  const shown = await page.locator(".museum-exhibit").count();
  assert.equal(shown, await page.locator(".museum-exhibit.met").count(), "filter shows only met specimens");
  await context.close();
  return `filter → ${shown}`;
});

await check("number keys pick the n-th choice / continue card; ignored in the search field", async () => {
  const { context, page } = await fresh();
  await page.goto(base + "#story=cetana", { waitUntil: "domcontentloaded" });
  await page.locator(reader).waitFor();
  await page.waitForTimeout(600);
  const first = page.locator(".chapter-document .choice-button").first();
  await page.keyboard.press("1");
  assert.equal(await first.getAttribute("aria-expanded"), "true", "key 1 did not open the first choice");
  const before = await page.locator(".chapter-document").getAttribute("data-doc");
  const n = await page.evaluate(() => [...document.querySelectorAll(".chapter-document :is(.choice-button:not([aria-disabled=true]), .next-chapter, .reading-next)")].filter((b) => b.offsetParent && !b.closest(".story-summary")).findIndex((b) => b.classList.contains("next-chapter")) + 1);
  assert.ok(n >= 1 && n <= 9, `no continue card within keys 1–9 (${n})`);
  await page.keyboard.press(String(n));
  await page.waitForFunction((d) => document.querySelector(".chapter-document")?.dataset.doc !== d, before, { timeout: 10000 });
  await page.keyboard.press("/");
  await page.locator("#search-input").fill("");
  await page.keyboard.press("2");
  assert.equal(await page.locator("#search-input").inputValue(), "2", "digit not typed into the search field");
  await context.close();
  return `1 → choice, ${n} → next chapter`;
});

await check("guide: event ids read as chapter titles and open their chapter; empty sections hidden", async () => {
  const { context, page, errors } = await fresh();
  await page.goto(base + "#story=origin_shoulders_of_giants", { waitUntil: "domcontentloaded" });
  await page.locator(reader).waitFor();
  await page.locator(".story-summary > summary").click();
  await page.waitForFunction(() => document.querySelectorAll(".md-guide .guide-doc").length > 10, null, { timeout: 10000 });
  const info = await page.evaluate(() => ({
    links: document.querySelectorAll(".md-guide .guide-doc").length,
    // ids left as text must not be chapters of this story (hidden events etc. stay, dimmed)
    rawIds: [...document.querySelectorAll(".md-guide .guide-id")].map((s) => s.textContent).filter((id) => window.__chapterIds?.has(id)).length,
    plain: (() => { const w = document.createTreeWalker(document.querySelector(".md-guide"), NodeFilter.SHOW_TEXT); let n, c = 0; while ((n = w.nextNode())) if (!n.parentElement.closest(".md-review, .guide-id, code") && /\b[a-z_]+\.\d{3,}\b/.test(n.nodeValue)) c++; return c; })(),
    emptyHeads: [...document.querySelectorAll(".md-guide > :is(h3,h4,h5)")].filter((h) => !h.nextElementSibling || /^H[3-5]$/.test(h.nextElementSibling.tagName) && h.nextElementSibling.tagName <= h.tagName).length,
  }));
  assert.equal(info.plain, 0, "full ids left as plain text in the guide body");
  assert.equal(info.emptyHeads, 0, "empty section headings shown");
  const link = page.locator(".md-guide .guide-doc:visible").nth(3); // the other language's half of a line is hidden
  const target = await link.getAttribute("data-chapter");
  await link.click();
  await page.waitForFunction((d) => document.querySelector(".chapter-document")?.dataset.doc === d, target, { timeout: 10000 });
  assert.deepEqual(errors, []);
  await context.close();
  return `${info.links} links, opened ${target}`;
});

await check("archive panel: a story's specimens show as icons and open their exhibit", async () => {
  const { context, page, errors } = await fresh();
  await page.goto(base + "#story=site-asteroid-vault-1", { waitUntil: "domcontentloaded" });
  await page.locator(reader).waitFor();
  await page.waitForTimeout(600);
  await page.keyboard.press("Escape");
  await page.locator("#story-specimens:not([hidden]) .story-specimen").first().waitFor({ timeout: 10000 });
  const n = await page.locator(".story-specimen").count();
  await page.locator(".story-specimen").first().click();
  await page.locator("#museum.open .museum-detail:not([hidden])").waitFor({ timeout: 30000 });
  assert.deepEqual(errors, []);
  await context.close();
  return `${n} icon(s) → exhibit`;
});

await check("crossing into another story shows “From …”, which steps back to the previous story", async () => {
  const { context, page, errors } = await fresh();
  await page.goto(base + "#story=origin_riftworld", { waitUntil: "domcontentloaded" });
  await page.locator(reader).waitFor();
  const start = await page.locator(".chapter-document").getAttribute("data-doc");
  assert.equal(await page.locator("#from-story").count(), 0, "chip on a story's own first chapter");
  await page.locator('.chapter-document .next-chapter[data-story="astral-rift-in-space"]').first().click();
  await page.locator("#from-story").waitFor({ timeout: 15000 });
  await page.locator("#from-story").click();
  await page.waitForFunction((d) => document.querySelector(".chapter-document")?.dataset.doc === d, start, { timeout: 15000 });
  assert.deepEqual(errors, []);
  await context.close();
  return `${start} → astral-rift-in-space → back`;
});

await browser.close();
console.log(failed ? `${failed} failed` : "verify-round5: all checks passed");
process.exit(failed ? 1 : 0);
