// Release smoke checks in a real browser — part of the publish gate (.github/workflows/pages.yml): any failure exits
// non-zero and blocks deployment. Covers story opening, choices and Back, saved progress after a reload, full-text
// search, repeated museum opens (3D viewer or its image fallback), images and the phone layout, with no page errors.
//   STELLARIS_PLAYWRIGHT_PATH=<playwright/index.mjs> [STELLARIS_PREVIEW_URL=…] [STELLARIS_BROWSER_CHANNEL=chrome] node scripts/smoke.mjs
// Headless. In CI the bundled Chromium has no GPU: WebGL runs on SwiftShader or the pages fall back to images, and
// both are accepted. Needs a preview of the build (node scripts/serve.mjs --dist).
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";

const { chromium } = await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const base = process.env.STELLARIS_PREVIEW_URL || "http://127.0.0.1:4173/";
const channel = process.env.STELLARIS_BROWSER_CHANNEL || undefined;
const browser = await chromium.launch({ channel, headless: true, args: ["--enable-unsafe-swiftshader"] });
let passed = 0, failed = 0;
async function check(name, fn) {
  try {
    const detail = await fn();
    passed++;
    console.log("✔", name, detail || "");
  } catch (e) {
    failed++;
    const why = e.message.split("\n")[0];
    console.log("✘", name, "—", why);
    // GitHub Actions: an annotation per failed check (readable on the run page without opening the log).
    if (process.env.GITHUB_ACTIONS) console.log(`::error title=Smoke check failed::${name} — ${why.replace(/[\r\n%]/g, " ")}`);
  }
}
async function open(viewport = { width: 1440, height: 900 }, extra = {}) {
  const context = await browser.newContext({ viewport, ...extra });
  const page = await context.newPage();
  const problems = [];
  page.on("pageerror", (e) => problems.push("pageerror: " + e.message));
  page.on("response", (r) => {
    if (r.status() >= 400 && /\.(json|webp|png|jpg|js|css|glb|bin)(\?|$)/.test(r.url())) problems.push(`${r.status()} ${r.url().replace(base, "")}`);
  });
  return { context, page, problems };
}
const docId = (page) => page.locator(".chapter-document").getAttribute("data-doc");
const readerText = (page) => page.locator(".chapter-document").innerText();
const settle = (page, ms = 700) => page.waitForTimeout(ms);

const { context, page, problems } = await open();
try {
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#open-story");
  await page.evaluate(() => localStorage.clear());

  await check("story opens from a link with readable text", async () => {
    await page.goto(base + "#story=cybrex", { waitUntil: "domcontentloaded" });
    await page.waitForSelector("#reader:not([hidden]):not(.prewarm) .chapter-document", { timeout: 30000 });
    const text = await readerText(page);
    assert.ok(text.length > 200, "text too short");
    assert.doesNotMatch(text, /\[[A-Za-z_.]+\]|\$[A-Z_]+\$|§/, "raw game token in the text");
    return `${await docId(page)}, ${text.length} chars`;
  });

  let first, second;
  await check("a choice opens its outcome; the story continues; Back returns", async () => {
    first = await docId(page);
    const choice = page.locator(".choice-button:not([aria-disabled=true])").first();
    if (await choice.count()) {
      await choice.click();
      assert.equal(await choice.getAttribute("aria-expanded"), "true");
    }
    await page.locator(".continuation .next-chapter:visible").first().click();
    await page.waitForFunction((d) => document.querySelector(".chapter-document")?.dataset.doc !== d, first);
    second = await docId(page);
    await page.locator("#reading-back").click();
    await page.waitForFunction((d) => document.querySelector(".chapter-document")?.dataset.doc === d, first);
    await page.locator(".continuation .next-chapter:visible").first().click();
    await page.waitForFunction((d) => document.querySelector(".chapter-document")?.dataset.doc !== d, first);
    return `${first} → ${second} → back → ${await docId(page)}`;
  });

  await check("progress survives a reload: Continue reading restores the document and its history", async () => {
    const at = await docId(page);
    await settle(page);
    await page.goto(base, { waitUntil: "domcontentloaded" }); // only the hash changes: same document
    await page.reload({ waitUntil: "domcontentloaded" }); // a real reload of the archive without a link
    await page.waitForSelector("#continue-reading:not([hidden]) [data-continue]", { timeout: 30000 });
    await page.locator("#continue-reading [data-continue]").click();
    await page.waitForFunction((d) => document.querySelector(".chapter-document")?.dataset.doc === d, at, { timeout: 30000 });
    assert.ok(await page.locator("#reading-back").isEnabled(), "Back is not available after restoring");
    await page.locator("#reading-back").click();
    await page.waitForFunction((d) => document.querySelector(".chapter-document")?.dataset.doc === d, first);
    await page.keyboard.press("Escape");
    await settle(page, 500);
    return `restored ${at}, Back → ${first}`;
  });

  // Opens search on the archive and waits until a result row shows the matched text (the dialog's state is reported
  // with a failure).
  async function searchFor(query, hitSelector, textPattern) {
    await page.goto(base + "#", { waitUntil: "domcontentloaded" });
    await page.waitForSelector("#search-open");
    await page.locator("#search-open").click();
    await page.locator("#search-input").fill(query);
    try {
      // Rows are rendered first and their snippets filled in afterwards: wait for the matched text, not just the row.
      await page.waitForFunction(([sel, src]) => [...document.querySelectorAll(sel)].some((r) => new RegExp(src, "i").test(r.textContent)), [hitSelector, textPattern.source], { timeout: 30000 });
    } catch (e) {
      throw new Error(`${e.message.split("\n")[0]} | ${await page.evaluate(() => `count: ${document.querySelector("#search-count")?.textContent}; results: ${document.querySelector("#search-results")?.innerHTML.replace(/\s+/g, " ").slice(0, 300)}`)}`);
    }
    return page.locator(hitSelector).filter({ hasText: textPattern }).first();
  }

  await check("full-text search finds body text and opens the exact document", async () => {
    const hit = await searchFor("follicle", "#search-results [data-hash]", /follicle/i);
    const target = new URLSearchParams((await hit.getAttribute("data-hash")).slice(1)).get("chapter");
    await hit.click();
    await page.waitForFunction((d) => document.querySelector(".chapter-document")?.dataset.doc === d, target, { timeout: 30000 });
    await page.keyboard.press("Escape");
    await settle(page, 500);
    return target;
  });

  await check("search finds a specimen and opens its exhibit", async () => {
    const hit = await searchFor("Acidic Spores", '#search-results [data-hash="#museum=acidic_spores"]', /\S/);
    await page.waitForTimeout(800); // snippets are filled in after the rows
    const text = await page.locator("#search-results").textContent();
    assert.doesNotMatch(text, /这个名字|this name/i, "a snippet shows the generic placeholder wording");
    await hit.click();
    await page.waitForSelector("#museum.open .museum-detail:not([hidden])", { timeout: 30000 });
  });

  await check("museum: repeated exhibit opens keep the model's size (or fall back to the image)", async () => {
    if (!(await page.locator("#museum.open .museum-exhibit").count())) {
      await page.goto(base + "#museum", { waitUntil: "domcontentloaded" });
      await page.waitForSelector("#museum.open .museum-exhibit", { timeout: 30000 });
    }
    const keys = await page.locator(".museum-exhibit").evaluateAll((els) => { const badged = els.filter((e) => e.querySelector(".museum-3d-badge")); return (badged.length ? badged : els).slice(0, 2).map((e) => e.dataset.key); }); // no badge once every specimen has a model
    const sizes = [];
    for (const key of [keys[0], keys[1], keys[0], keys[1], keys[0]]) {
      await page.locator(`.museum-exhibit[data-key="${key}"]`).click();
      const ok = await page.waitForFunction((k) => {
        const d = window.__museumViewer?.();
        if (d?.url?.endsWith(`/${k}.glb`)) return "3d";
        const img = document.querySelector(".museum-stage-image");
        return !document.querySelector(".museum-viewer") && img?.complete && img.naturalWidth > 0 ? "image" : false;
      }, key, { timeout: 30000 }).then((h) => h.jsonValue());
      sizes.push(ok === "3d" ? +(await page.evaluate(() => window.__museumViewer().diagonal)).toFixed(4) : "image");
    }
    for (const s of sizes) assert.ok(s === "image" || Math.abs(s - 1.6) < 1e-3, `size ${s}`);
    return sizes.join(" ");
  });

  await check("images load: story art and museum icons", async () => {
    const icons = await page.locator(".museum-exhibit img").evaluateAll((imgs) => imgs.slice(0, 12).map((i) => i.complete && i.naturalWidth > 0));
    await page.keyboard.press("Escape"); await page.keyboard.press("Escape");
    await page.goto(base + "#story=cybrex", { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".chapter-art img", { state: "attached", timeout: 30000 });
    await page.evaluate(() => document.querySelector(".chapter-art").scrollIntoView());
    await page.waitForFunction(() => { const i = document.querySelector(".chapter-art img"); return i.complete && i.naturalWidth > 0; }, null, { timeout: 30000 });
    assert.ok(icons.filter(Boolean).length >= 6, `museum icons loaded: ${icons.filter(Boolean).length}/12`);
    return `museum icons ${icons.filter(Boolean).length}/12`;
  });

  await check("no page errors or failed requests (desktop)", async () => { assert.deepEqual(problems, []); });
} finally {
  await context.close();
}

await check("a link opened while the start-up warm-up is due (slow download) still opens the story", async () => {
  const ends = [];
  for (const delay of [900, 2400]) {
    const run = await open();
    try {
      await run.page.route("**/stories/cybrex.json", async (route) => { await new Promise((r) => setTimeout(r, 1800)); await route.continue(); });
      await run.page.goto(base, { waitUntil: "domcontentloaded" });
      await run.page.waitForSelector("#open-story");
      await run.page.waitForTimeout(delay);
      await run.page.goto(base + "#story=cybrex", { waitUntil: "domcontentloaded" });
      await run.page.waitForSelector("#reader:not([hidden]):not(.prewarm) .chapter-document[data-doc='precursor.2000']", { state: "attached", timeout: 30000 });
      ends.push(delay);
    } finally {
      await run.context.close();
    }
  }
  return `opened after ${ends.join(" / ")} ms`;
});

await check("closing while a story is still downloading cancels it; browser Back closes a story opened from the archive", async () => {
  const run = await open();
  try {
    const { page } = run;
    await page.route("**/stories/cybrex.json", async (route) => { await new Promise((r) => setTimeout(r, 2000)); await route.continue(); });
    await page.goto(base, { waitUntil: "domcontentloaded" });
    await page.waitForSelector("#open-story");
    await page.evaluate(() => { location.hash = "story=cybrex"; });
    await page.waitForTimeout(300);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(3000);
    assert.ok(await page.locator("#reader").evaluate((r) => r.hidden || r.classList.contains("prewarm")), "the reader opened after Escape");
    await page.locator("#open-story").click();
    await page.waitForSelector("#reader:not([hidden]):not(.prewarm) .chapter-document", { timeout: 30000 });
    await settle(page);
    await page.goBack();
    await page.waitForFunction(() => document.querySelector("#reader").hidden, null, { timeout: 10000 });
    assert.ok(page.url().startsWith(base), `Back left the site: ${page.url()}`);
    return "cancelled; Back closed the reader";
  } finally {
    await run.context.close();
  }
});

await check("a specimen link from a chapter opens its exhibit; closing the museum returns to that chapter", async () => {
  const run = await open();
  try {
    const { page } = run;
    await page.goto(base + "#story=site-asteroid-vault-1&chapter=ancrel.103", { waitUntil: "domcontentloaded" });
    await page.waitForSelector("#reader:not([hidden]):not(.prewarm) .specimen-links a", { timeout: 30000 });
    await page.locator(".specimen-links a").first().click();
    await page.waitForSelector("#museum.open .museum-detail:not([hidden])", { timeout: 30000 });
    await page.keyboard.press("Escape"); // exhibit
    await page.keyboard.press("Escape"); // museum
    await page.waitForSelector("#reader:not([hidden]):not(.prewarm) .chapter-document[data-doc='ancrel.103']", { timeout: 30000 });
    return "ancrel.103 → exhibit → ancrel.103";
  } finally {
    await run.context.close();
  }
});

await check("an ending leads on to the next story of its row", async () => {
  const run = await open();
  try {
    const { page } = run;
    await page.goto(base + "#story=origin_unplugged&chapter=unplugged.3090", { waitUntil: "domcontentloaded" });
    const next = page.locator("#reader:not([hidden]):not(.prewarm) .chapter-end .ending-next");
    await next.waitFor({ timeout: 30000 });
    const id = await next.getAttribute("data-open");
    await next.click();
    await page.waitForFunction((s) => location.hash.startsWith(`#story=${s}&`), id, { timeout: 30000 });
    return `origin_unplugged → ${id}`;
  } finally {
    await run.context.close();
  }
});

await check("landscape phone (844×390): the open-story control is not covered", async () => {
  const run = await open({ width: 844, height: 390 }, { isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  try {
    await run.page.goto(base, { waitUntil: "domcontentloaded" });
    await run.page.waitForSelector("#open-story");
    await settle(run.page, 1200);
    const hit = await run.page.evaluate(() => {
      const r = document.querySelector("#open-story").getBoundingClientRect();
      return document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)?.closest("#open-story") ? "ok" : document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)?.id || "other";
    });
    assert.equal(hit, "ok", `centre of the control is covered by ${hit}`);
  } finally {
    await run.context.close();
  }
});

const phone = await open({ width: 390, height: 844 }, { isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
try {
  await check("phone layout (390 px): archive, reader and museum without horizontal overflow", async () => {
    const overflow = () => phone.page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    await phone.page.goto(base, { waitUntil: "domcontentloaded" });
    await phone.page.waitForSelector("#open-story");
    await settle(phone.page, 1200);
    const a = await overflow();
    await phone.page.goto(base + "#story=cybrex", { waitUntil: "domcontentloaded" });
    await phone.page.waitForSelector("#reader:not([hidden]):not(.prewarm) .chapter-document", { timeout: 30000 });
    await settle(phone.page);
    const r = await overflow();
    const tap = await phone.page.locator("#close-reader").boundingBox();
    await phone.page.goto(base + "#museum", { waitUntil: "domcontentloaded" });
    await phone.page.waitForSelector("#museum.open .museum-exhibit", { timeout: 30000 });
    await settle(phone.page);
    const m = await overflow();
    assert.ok(a <= 0 && r <= 0 && m <= 0, `overflow archive ${a}, reader ${r}, museum ${m}`);
    assert.ok(tap && tap.height >= 24, "Close control too small to tap");
    return `overflow ${a}/${r}/${m} px`;
  });
  await check("no page errors or failed requests (phone)", async () => { assert.deepEqual(phone.problems, []); });
} finally {
  await phone.context.close();
}
await browser.close();
console.log(`${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
