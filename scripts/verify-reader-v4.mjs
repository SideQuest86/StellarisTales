// Browser check of the V4 reader: tree navigation, exclusive outcomes, consistent reading context, back
// navigation, bilingual chrome and narrow layout. Requires a running preview (scripts/serve.mjs --dist) and
// STELLARIS_PLAYWRIGHT_PATH. Functional check only — headless timing is not a performance measurement.
import assert from "node:assert/strict";
import { writeFile, mkdir } from "node:fs/promises";
import { pathToFileURL } from "node:url";
const { chromium } = await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const base = process.env.STELLARIS_PREVIEW_URL || "http://127.0.0.1:4173/";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const results = [];
const step = (name, detail = "") => { results.push({ name, detail }); console.log("✔", name, detail); };
await mkdir("verification", { recursive: true });
try {
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base, { waitUntil: "networkidle" });
  await page.evaluate(() => { localStorage.clear(); });

  // 0. A document in ANOTHER story with an option only non-gestalt empires get (infernals.1002.a, `when`
  //    is_gestalt = no). With an unknown profile the option is shown (as conditional).
  const other = { id: "anomaly-crystal-lava-lakes-category", doc: "infernals.1002", option: /将此地开发为度假胜地/ };
  await page.goto(`${base}#story=${other.id}&chapter=${other.doc}`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction((d) => document.querySelector(".chapter-document")?.dataset.doc === d, other.doc, { timeout: 20000 });
  assert.equal(await page.locator(".choice-button", { hasText: other.option }).count(), 1);

  // 1. Anomaly root → weighted exclusive outcomes.
  await page.goto(`${base}#story=anomaly-crashed-ship-asteroid-category`, { waitUntil: "networkidle" });
  await page.waitForSelector('.chapter-document[data-doc="anomalies:crashed_ship_asteroid_category"]');
  const box = page.locator(".exclusive-outcomes");
  assert.equal(await box.count(), 1);
  assert.equal(await box.locator("[data-chapter]").count(), 2);
  assert.match(await box.innerText(), /50%/);
  assert.match(await page.locator(".narrative").innerText(), /坠毁在了这颗小行星/);
  step("anomaly card shows its original description and two exclusive 50% outcomes");
  await box.locator('[data-chapter="anomaly.35"]').click();
  await page.waitForURL(/chapter=anomaly.35/);
  const report = page.locator('[data-chapter="story.5"]');
  if (await report.count()) {
    assert.match(await report.first().innerText(), /另一则故事/);
    step("the generic science report is a cross-story link, not a chapter");
  }
  await page.locator("#reading-back").click();
  await page.waitForURL(/crashed_ship_asteroid_category/);
  step("back returns to the anomaly card");

  // 2. Composed text: unknown identity shows both pieces; adopting one resolves it and persists.
  await page.goto(`${base}#story=anomaly-nano-swarm-cat&chapter=anomaly.6710`, { waitUntil: "networkidle" });
  await page.waitForSelector('.chapter-document[data-doc="anomaly.6710"]');
  assert.equal(await page.locator(".variant-condition").count(), 2);
  await page.locator(".variant-condition", { hasText: /^若：格式塔意识$/ }).click();
  await page.waitForFunction(() => document.querySelectorAll(".variant-condition").length === 0);
  assert.match(await page.locator(".reading-context").innerText(), /格式塔意识/);
  assert.doesNotMatch(await page.locator(".narrative").innerText(), /证明了该虫群是一个智慧的存在/);
  const profile = await page.evaluate(() => JSON.parse(localStorage.getItem("st-profile")));
  assert.equal(profile.ethic_gestalt_consciousness, true);
  step("adopting a condition resolves the composed text and persists the empire profile");
  assert.match(await page.locator(".choice-condition").first().innerText(), /自我演化逻辑/);
  step("tech-gated option shows its requirement");
  // Cross-story consistency: the adopted identity resolves the other story's document too — no contradictory
  // non-gestalt alternative is offered there.
  await page.goto(`${base}#story=${other.id}&chapter=${encodeURIComponent(other.doc)}`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction((d) => document.querySelector(".chapter-document")?.dataset.doc === d, other.doc, { timeout: 20000 });
  assert.equal(await page.locator(".choice-button", { hasText: other.option }).count(), 0);
  assert.match(await page.locator(".reading-context").innerText(), /格式塔意识/);
  step("the adopted identity resolves a document in another story consistently (non-gestalt option hidden)", `${other.id} ${other.doc}`);
  await page.goto(`${base}#story=anomaly-nano-swarm-cat&chapter=anomaly.6710`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector('.chapter-document[data-doc="anomaly.6710"]');
  await page.locator("[data-profile-reset]").click();
  await page.waitForFunction(() => document.querySelectorAll(".variant-condition").length === 2);
  step("reset restores both alternatives");
  assert.match(await page.locator(".narrative").innerText(), /我们的一些科学家认为/);
  assert.ok(await page.locator(".narrative .game-name").count() >= 2);
  step("scripted-loc names resolve to the game's own wording and are marked as filled-in names");
  await page.locator("[data-profile-open]").click();
  await page.waitForSelector(".profile-panel [data-profile-gestalt]");
  await page.locator("[data-profile-gestalt]").selectOption("yes");
  await page.waitForFunction(() => document.querySelectorAll(".variant-condition").length === 0);
  assert.match(await page.locator(".narrative").innerText(), /正在发育的蜂群行为/);
  await page.locator("[data-profile-axis='0']").selectOption({ index: 1 });
  assert.match(await page.locator(".reading-context").innerText(), /狂热/);
  step("the empire profile panel declares traits that resolve every document");
  await page.locator("[data-profile-reset]").click();
  await page.waitForFunction(() => document.querySelectorAll(".variant-condition").length === 2);

  // 3. Origin-only option visible-with-note while the origin is unknown.
  await page.goto(`${base}#story=anomaly-origin-asteroid-category&chapter=anomaly.15`, { waitUntil: "networkidle" });
  await page.waitForSelector('.chapter-document[data-doc="anomaly.15"]');
  assert.match(await page.locator(".choices").innerText(), /仅在以下情形出现/);
  step("origin-specific option is marked as conditional while the origin is unknown");

  // 4. English chrome.
  await page.locator("#reader-language").click();
  await page.waitForFunction(() => document.querySelector(".section-heading span")?.textContent === "Your choices");
  assert.equal((await page.locator("#reading-back").innerText()).trim(), "← Back");
  step("English mode shows English reader chrome");
  await page.screenshot({ path: "verification/v4-reader-desktop.png" });
  await page.locator("#reader-language").click();

  // 5. Narrow viewport: no horizontal overflow.
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  mobile.on("pageerror", (e) => errors.push(e.message));
  await mobile.goto(`${base}#story=anomaly-nano-swarm-cat&chapter=anomaly.6710`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await mobile.waitForSelector('.chapter-document[data-doc="anomaly.6710"]', { timeout: 60000 });
  const overflow = await mobile.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  assert.ok(overflow <= 1, `horizontal overflow ${overflow}px`);
  await mobile.screenshot({ path: "verification/v4-reader-mobile.png" });
  step("390px reader has no horizontal overflow");

  assert.deepEqual(errors, []);
  step("no page errors");
  await writeFile("verification/v4-reader.json", JSON.stringify({ when: new Date().toISOString(), base, results }, null, 2));
} finally {
  await browser.close();
}
