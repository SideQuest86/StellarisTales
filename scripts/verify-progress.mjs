// Browser check for reading-progress persistence (src/progress.js). Requires a running preview
// (default http://127.0.0.1:4173/). Playwright path: STELLARIS_PLAYWRIGHT_PATH or the bundled runtime.
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
const pw = process.env.STELLARIS_PLAYWRIGHT_PATH || "C:/Users/wangp/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";
const { chromium } = await import(pathToFileURL(pw).href);
const base = process.env.STELLARIS_PREVIEW_URL || "http://127.0.0.1:4173/";
const START = "#story=curators&chapter=leviathans.590"; // 3 choices, edge into another story
const browser = await chromium.launch({ channel: "chrome", headless: true });
const step = (n, d = "") => console.log("OK", n, d);
const KEY = "st-progress";
const stored = (page) => page.evaluate((k) => { try { return JSON.parse(localStorage.getItem(k)); } catch { return "bad"; } }, KEY);
const hash = (page) => page.evaluate(() => location.hash);
const settle = (page) => page.waitForTimeout(700); // debounce (250 ms) + render
async function newPage(opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 900 }, ...opts });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  return { ctx, page, errors };
}
const doc = (page) => page.waitForSelector(".chapter-document", { state: "attached", timeout: 20000 });
const chosenKeys = (page) => page.evaluate(() => [...document.querySelectorAll(".choice.chosen .choice-button")].map((b) => b.dataset.choice));
try {
  const { ctx, page, errors } = await newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.clear());

  // 1. Read: choice, then forward through at least two chapters (cross-story if offered).
  await page.goto(base + START, { waitUntil: "networkidle" });
  await doc(page);
  await settle(page);
  assert.equal(await stored(page), null, "fresh direct link must not write progress");
  step("fresh direct link saves nothing");
  const history = [await hash(page)];
  const cross = page.locator('.next-chapter[data-story="enclave-leader-departure"]:visible').first();
  const buttons = page.locator(".choice-button:not([aria-disabled=true])");
  for (let i = 0, n = await buttons.count(); i < n; i++) {
    await buttons.nth(i).click(); // the last one clicked stays selected; prefer the choice that leads across stories
    if (await cross.count()) break;
  }
  assert.equal((await chosenKeys(page)).length, 1);
  const anyNext = page.locator(".next-chapter:visible").first();
  const pick = (await cross.count()) ? cross : anyNext;
  const crossed = (await cross.count()) > 0;
  await pick.click();
  await page.waitForFunction((h) => location.hash !== h, history[0]);
  history.push(await hash(page));
  await doc(page);
  // a third step if there is one
  const more = page.locator(".next-chapter:visible").first();
  if (!(await more.count())) { const c = page.locator(".choice-button:not([aria-disabled=true])").first(); if (await c.count()) await c.click(); }
  const more2 = page.locator(".next-chapter:visible").first();
  if (await more2.count()) {
    const before = await hash(page);
    await more2.click();
    await page.waitForFunction((h) => location.hash !== h, before);
    history.push(await hash(page));
  }
  await settle(page);
  assert.ok(history.length >= 2, "walked at least two chapters");
  let saved = await stored(page);
  assert.equal(saved.v, 1);
  assert.equal(saved.trail.length, history.length);
  assert.equal(saved.trail[0].choice !== undefined, true, "first step keeps its choice");
  if (crossed) assert.notEqual(saved.trail[0].story, saved.trail[1].story);
  step("progress saved", `${history.length} steps${crossed ? ", cross-story" : ""}`);
  const lastHash = history.at(-1);
  const snapshot = await page.evaluate((k) => localStorage.getItem(k), KEY); // walking Back legitimately shortens the saved trail
  const reseed = async () => { await settle(page); await page.evaluate(([k, v]) => localStorage.setItem(k, v), [KEY, snapshot]); };

  // 2a. Refresh on the direct link of the last chapter restores the full trail; Back walks the real history.
  await page.reload({ waitUntil: "networkidle" });
  await doc(page);
  assert.equal(await hash(page), lastHash);
  for (let i = history.length - 2; i >= 0; i--) {
    await page.click("#reading-back");
    await page.waitForFunction((h) => location.hash === h, history[i]);
    await doc(page);
  }
  assert.equal((await page.locator("#reading-back").count()) === 0, true);
  assert.equal((await chosenKeys(page)).length, 1, "choice still selected on the first step");
  step("refresh on link restores trail; Back walks the history; choice selected");

  // 2b. Relaunch at the archive: Continue entry.
  await reseed();
  await page.goto(base + "#", { waitUntil: "networkidle" });
  await page.reload({ waitUntil: "networkidle" });
  const cont = page.locator("#continue-reading [data-continue]");
  await cont.waitFor({ state: "visible", timeout: 10000 });
  assert.ok((await cont.innerText()).length > 4);
  assert.ok((await page.locator("#continue-reading [data-restart]").isVisible()));
  step("Continue entry", (await cont.innerText()).replace(/\n/g, " | "));
  await cont.click();
  await doc(page);
  assert.equal(await hash(page), lastHash);
  for (let i = history.length - 2; i >= 0; i--) {
    await page.click("#reading-back");
    await page.waitForFunction((h) => location.hash === h, history[i]);
  }
  assert.equal((await chosenKeys(page)).length, 1);
  step("Continue reopens last chapter with full history");

  // 3. Change the choice after restore, it persists.
  await reseed();
  await page.goto(base + "#", { waitUntil: "networkidle" });
  await page.reload({ waitUntil: "networkidle" });
  await page.locator("#continue-reading [data-continue]").click();
  await doc(page);
  while (!((await page.locator("#reading-back").count()) === 0)) { await page.click("#reading-back"); await page.waitForTimeout(250); }
  await doc(page);
  const before = await page.evaluate(() => document.querySelector(".choice.chosen .choice-button").dataset.choiceSource);
  const other = page.locator(`.choice-button:not([aria-disabled=true]):not([data-choice-source="${before}"])`).first();
  const otherSource = await other.getAttribute("data-choice-source");
  await other.click();
  await settle(page);
  saved = await stored(page);
  assert.equal(String(saved.trail[0].choiceIndex), otherSource);
  assert.equal(saved.trail.length, 1, "Back already shortened the saved trail to the first step");
  await page.reload({ waitUntil: "networkidle" });
  await page.goto(base + "#", { waitUntil: "networkidle" });
  await page.reload({ waitUntil: "networkidle" });
  await page.locator("#continue-reading [data-continue]").click();
  await doc(page);
  assert.equal(await page.evaluate(() => document.querySelector(".choice.chosen .choice-button")?.dataset.choiceSource), otherSource);
  step("changed choice persists", `${before} -> ${otherSource}`);

  // 4. Direct link elsewhere does not invent history nor overwrite saved progress.
  const savedBefore = JSON.stringify(await stored(page));
  await page.goto(base + "#story=curators&chapter=leviathans.502", { waitUntil: "networkidle" });
  await doc(page);
  await page.reload({ waitUntil: "networkidle" });
  await doc(page);
  await settle(page);
  assert.equal((await page.locator("#reading-back").count()) === 0, true, "no invented history");
  assert.equal(JSON.stringify(await stored(page)), savedBefore, "saved progress untouched");
  step("foreign direct link opens fresh, progress untouched");
  // ...until the reader navigates further from it.
  const nxt = page.locator(".next-chapter:visible").first();
  if (await nxt.count()) {
    await nxt.click();
    await settle(page);
    const s2 = await stored(page);
    assert.equal(s2.trail.length, 2);
    assert.equal(s2.trail[0].chapter, "leviathans.502");
    step("navigating further replaces saved progress");
  } else step("no edge on leviathans.502 (replacement check skipped)");

  // 5. Restart clears.
  await page.click("#close-reader");
  await page.locator("#continue-reading [data-restart]").waitFor({ state: "visible" });
  await page.click("#continue-reading [data-restart]");
  assert.equal(await stored(page), null);
  assert.equal(await page.locator("#continue-reading").isVisible(), false);
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  assert.equal(await page.locator("#continue-reading").isVisible(), false);
  step("Start over clears progress");
  assert.deepEqual(errors, [], errors.join("\n"));
  await ctx.close();

  // 6. Tampered / old data is ignored; stale chapters truncate.
  {
    const { ctx, page, errors } = await newPage();
    await page.goto(base, { waitUntil: "networkidle" });
    for (const bad of ['{"v":99,"trail":[{"story":"curators","chapter":"leviathans.502"}]}', "not json", '{"v":1,"trail":[{"story":1}]}',
      '{"v":1,"trail":[{"story":"curators","chapter":"gone.1"}],"assumptions":{},"visited":[]}']) {
      await page.evaluate(([k, v]) => localStorage.setItem(k, v), [KEY, bad]);
      await page.reload({ waitUntil: "networkidle" });
      await page.waitForTimeout(700);
      assert.equal(await page.locator("#continue-reading").isVisible(), false, bad);
    }
    assert.equal(await stored(page), null, "fully stale progress is discarded");
    await page.evaluate((k) => localStorage.setItem(k, JSON.stringify({ v: 1, savedAt: 1, trail: [{ story: "curators", chapter: "leviathans.502" }, { story: "curators", chapter: "gone.2" }], assumptions: {}, visited: ["leviathans.502", "gone.2"] })), KEY);
    await page.reload({ waitUntil: "networkidle" });
    await page.locator("#continue-reading [data-continue]").click();
    await doc(page);
    assert.equal(await hash(page), "#story=curators&chapter=leviathans.502");
    assert.equal((await page.locator("#reading-back").count()) === 0, true);
    step("tampered data ignored; stale steps truncated");

    // 8. 390 px layout.
    await page.setViewportSize({ width: 390, height: 844 });
    await page.click("#close-reader");
    await page.locator("#continue-reading [data-continue]").waitFor({ state: "visible" });
    const geo = await page.evaluate(() => {
      const b = document.querySelector("#continue-reading").getBoundingClientRect();
      return { left: b.left, right: b.right, sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth };
    });
    assert.ok(geo.left >= 0 && geo.right <= 390 && geo.sw <= geo.cw, JSON.stringify(geo));
    await page.screenshot({ path: "verification/progress-390.png" }).catch(() => {});
    step("390 px layout", JSON.stringify(geo));
    assert.deepEqual(errors, [], errors.join("\n"));
    await ctx.close();
  }

  // 7. Unavailable / throwing storage still reads.
  {
    const { ctx, page, errors } = await newPage();
    await page.addInitScript(() => {
      Object.defineProperty(window, "localStorage", { get() { throw new DOMException("denied", "SecurityError"); } });
    });
    await page.goto(base + START, { waitUntil: "networkidle" });
    await doc(page);
    await page.locator(".choice-button:not([aria-disabled=true])").first().click();
    const n = page.locator(".next-chapter:visible").first();
    if (await n.count()) { await n.click(); await page.waitForTimeout(500); await page.click("#reading-back"); }
    await page.evaluate(() => dispatchEvent(new Event("pagehide")));
    await page.click("#close-reader");
    await page.waitForTimeout(600);
    assert.equal(await page.locator("#continue-reading").isVisible(), false);
    step("throwing storage degrades to in-memory reading");
    assert.deepEqual(errors, [], errors.join("\n"));
    await ctx.close();
  }
  console.log("verify-progress: all checks passed");
} finally {
  await browser.close();
}



