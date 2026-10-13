// Reading walk across every category in a real browser: for a sample of stories per category (the three largest plus
// three chosen by a fixed seed), open the story by URL, follow choices/continuations for up to six steps, go back once,
// and check that every visited document shows a title and text, the flow map has nodes, and the page logs no errors.
// Requires a running preview (scripts/serve.mjs --dist) and STELLARIS_PLAYWRIGHT_PATH. Writes
// verification/reading-walk.json. Functional evidence, not a timing measurement.
import assert from "node:assert/strict";
import { writeFile, mkdir } from "node:fs/promises";
import { pathToFileURL } from "node:url";
const { chromium } = await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const base = process.env.STELLARIS_PREVIEW_URL || "http://127.0.0.1:4173/";
const perCategory = Number(process.env.WALK_SAMPLE || 6);
let seed = 20261013;
const rand = () => ((seed = (seed * 1103515245 + 12345) % 2 ** 31) / 2 ** 31);

const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto(base, { waitUntil: "domcontentloaded" });
await page.evaluate(() => localStorage.clear());
const index = await (await fetch(new URL("stories/index.json", base))).json();
const byCategory = {};
for (const s of index.stories.filter((x) => x.visible)) (byCategory[s.category] ||= []).push(s);

const docId = () => page.locator(".chapter-document").getAttribute("data-doc");
async function checkDocument(where) {
  const title = (await page.locator("#reader-title").innerText()).trim();
  const text = (await page.locator(".chapter-document").innerText()).trim();
  assert.ok(title.length > 0, `${where}: empty title`);
  assert.ok(text.length > title.length + 10, `${where}: no document text`);
}
const results = [];
const failures = [];
for (const [category, stories] of Object.entries(byCategory)) {
  const sorted = [...stories].sort((a, b) => b.chapters - a.chapters);
  const sample = sorted.slice(0, 3);
  while (sample.length < Math.min(perCategory, sorted.length)) {
    const pick = sorted[Math.floor(rand() * sorted.length)];
    if (!sample.includes(pick)) sample.push(pick);
  }
  for (const story of sample) {
    const visited = [];
    await page.goto(`${base}#story=${encodeURIComponent(story.id)}`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".chapter-document[data-doc]", { timeout: 30000 });
    visited.push(await docId());
    await checkDocument(`${story.id} ${visited[0]}`);
    const mapNodes = await page.locator("#flow-surface [data-chapter], #flow-surface .flow-node").count();
    // Pick and click in one page task so a re-render cannot detach the element in between.
    const clickOne = (selector) =>
      page.evaluate(
        ([sel, r]) => {
          const items = [...document.querySelectorAll(sel)].filter((el) => el.offsetParent !== null && !el.disabled);
          if (!items.length) return false;
          items[Math.floor(r * items.length)].click();
          return true;
        },
        [selector, rand()],
      );
    for (let i = 0; i < 6; i++) {
      const before = await docId();
      if (!(await clickOne(".chapter-document [data-chapter]"))) {
        if (!(await clickOne(".chapter-document .choice-button"))) break;
        await page.waitForTimeout(150);
        if (!(await clickOne(".chapter-document [data-chapter]"))) continue;
      }
      await page.waitForFunction((b) => document.querySelector(".chapter-document")?.dataset.doc !== b, before, { timeout: 15000 }).catch(() => {});
      const now = await docId();
      if (now === before) break;
      visited.push(now);
      await checkDocument(`${story.id} ${now}`);
    }
    let reversed = null;
    if (visited.length > 1 && (await page.locator("#reading-back:not([disabled])").count())) {
      await page.locator("#reading-back").click();
      reversed = await page
        .waitForFunction((v) => document.querySelector(".chapter-document")?.dataset.doc === v, visited.at(-2), { timeout: 8000 })
        .then(() => visited.at(-2))
        .catch(async () => {
          failures.push(`${story.id}: back from ${visited.at(-1)} expected ${visited.at(-2)}, got ${await docId()} (${page.url()})`);
          return null;
        });
    }
    results.push({ category, story: story.id, chapters: story.chapters, mapNodes, visited, reversedTo: reversed });
    console.log(`✔ ${category.padEnd(11)} ${story.id} — ${visited.length} docs${reversed ? ", back ok" : ""}, map ${mapNodes}`);
  }
}
await browser.close();
await mkdir("verification", { recursive: true });
await writeFile("verification/reading-walk.json", JSON.stringify({ date: new Date().toISOString(), base, results, failures, errors }, null, 1) + "\n");
assert.deepEqual(failures, [], "reading failures:\n" + failures.join("\n"));
assert.deepEqual(errors, [], "page errors");
const walked = results.reduce((n, r) => n + r.visited.length, 0);
console.log(`walked ${results.length} stories, ${walked} documents, ${results.filter((r) => r.reversedTo).length} reversals, 0 page errors`);
