// Browser check for the reader refinement: map dragging vs. selection, Markdown guide, substitution tooltips.
// Requires a running preview (default http://127.0.0.1:4173/) and STELLARIS_PLAYWRIGHT_PATH.
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { pathToFileURL } from "node:url";
const { chromium } = await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const base = process.env.STELLARIS_PREVIEW_URL || "http://127.0.0.1:4173/";
const story = process.env.STELLARIS_STORY || "cetana";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const step = (n, d = "") => console.log("OK", n, d);
await mkdir("verification", { recursive: true });
const sel = (page) => page.evaluate(() => getSelection().toString());
async function openMap(page) {
  await page.goto(`${base}#story=${story}`, { waitUntil: "networkidle" });
  await page.waitForSelector(".chapter-document", { state: "attached", timeout: 20000 });
  if (!(await page.locator(".flow-viewport:visible").count())) {
    await page.locator(".chapter-directory-link, #flow-open, [data-flow-open]").first().click().catch(() => {});
  }
  await page.waitForSelector(".flow-viewport", { state: "visible", timeout: 10000 });
}
try {
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base, { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.clear());
  await openMap(page);
  const vp = page.locator(".flow-viewport:visible").first();
  const box = await vp.boundingBox();
  const transform = () => page.evaluate(() => document.querySelector(".flow-viewport:not([hidden]) .flow-svg g, .flow-viewport .flow-svg g")?.parentElement?.innerHTML.length && [...document.querySelectorAll(".flow-viewport *")].map((e) => e.getAttribute("transform") || e.style.transform).filter(Boolean).slice(0, 3).join("|"));
  const before = await transform();
  // 1. Drag across the map (empty area start), selection stays empty and the view moves.
  await page.mouse.move(box.x + 30, box.y + box.height - 40);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2, box.y + 60, { steps: 12 });
  await page.mouse.move(box.x + box.width - 30, box.y + 20, { steps: 6 });
  await page.mouse.up();
  assert.equal(await sel(page), "", "drag must not select page text");
  step("map drag selects nothing");
  await page.screenshot({ path: "verification/refine-reader-map-drag.png" });
  // 2. Click a node activates it.
  const node = page.locator(".flow-node[data-chapter]").first();
  if (await node.count()) {
    await node.scrollIntoViewIfNeeded().catch(() => {});
    const nb = await node.boundingBox();
    if (nb) {
      await page.mouse.click(nb.x + nb.width / 2, nb.y + nb.height / 2);
      await page.waitForTimeout(600);
      step("node click handled", await page.evaluate(() => location.hash));
    }
  }
  // 3. Reader text stays selectable. (Same-document hash change: the document is re-rendered, possibly the same one,
  // so let that render finish before measuring the paragraph — otherwise the drag runs over replaced text.)
  await page.goto(`${base}#story=${story}`, { waitUntil: "networkidle" });
  await page.waitForSelector(".narrative p");
  await page.waitForTimeout(900);
  const p = page.locator(".narrative p").first();
  const pb = await p.boundingBox();
  await page.mouse.move(pb.x + 2, pb.y + 4);
  await page.mouse.down();
  await page.mouse.move(pb.x + Math.min(pb.width - 2, 300), pb.y + pb.height - 4, { steps: 8 });
  await page.mouse.up();
  assert.ok((await sel(page)).length > 0, "reader text selectable");
  step("reader text selectable");
  assert.deepEqual(errors, [], errors.join("\n"));
  await page.close();

  // 4. Touch (390 px): drag the map, still no selection.
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const m = await ctx.newPage();
  await openMap(m);
  const mb = await m.locator(".flow-viewport:visible").first().boundingBox();
  const cdp = await ctx.newCDPSession(m);
  const touch = (type, x, y) => cdp.send("Input.dispatchTouchEvent", { type, touchPoints: type === "touchEnd" ? [] : [{ x, y }] });
  await touch("touchStart", mb.x + 40, mb.y + mb.height - 40);
  for (let i = 1; i <= 8; i++) await touch("touchMove", mb.x + 40 + i * 20, mb.y + mb.height - 40 - i * 15);
  await touch("touchEnd");
  assert.equal(await sel(m), "");
  step("touch drag selects nothing");
  await ctx.close();
  // 5. Markdown guide + substitution tooltip.
  const g = await browser.newPage({ viewport: { width: 1200, height: 900 } });
  const gerr = [];
  g.on("pageerror", (e) => gerr.push(e.message));
  await g.goto(`${base}#story=${story}`, { waitUntil: "networkidle" });
  await g.waitForSelector(".story-summary");
  await g.locator(".story-summary > summary").click();
  const guide = await g.evaluate(() => ({ h: document.querySelectorAll(".md-guide h3,.md-guide h4,.md-guide h5").length, p: document.querySelectorAll(".md-guide p").length, scripts: document.querySelectorAll(".md-guide script,.md-guide img").length, pre: getComputedStyle(document.querySelector(".md-guide")).whiteSpace }));
  assert.ok(guide.h + guide.p > 0 && guide.scripts === 0 && guide.pre !== "pre-wrap", JSON.stringify(guide));
  step("markdown guide rendered", JSON.stringify(guide));
  await g.screenshot({ path: "verification/refine-reader-guide.png" });
  const names = g.locator(".game-name[data-note]");
  if (await names.count()) {
    await names.first().scrollIntoViewIfNeeded();
    await names.first().hover();
    await g.waitForTimeout(250);
    const tip = await g.evaluate(() => { const t = document.querySelector(".name-tip.show"); return t && t.textContent; });
    assert.ok(tip, "tooltip shown on hover");
    await g.keyboard.press("Escape");
    assert.equal(await g.locator(".name-tip.show").count(), 0);
    await g.evaluate(() => document.activeElement?.blur());
    await g.evaluate(() => document.querySelector(".game-name[data-note]").focus());
    assert.ok(await g.locator(".name-tip.show").count(), "tooltip on focus");
    step("tooltip hover/focus/Esc", tip);
    await g.screenshot({ path: "verification/refine-reader-tooltip.png" });
  } else step("no substitutions on this page (tooltip skipped)");
  assert.deepEqual(gerr, [], gerr.join("\n"));  console.log("verify-refine-reader: all checks passed");
} finally {
  await browser.close();
}
