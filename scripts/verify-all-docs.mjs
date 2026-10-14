// Opens EVERY document of EVERY story in the real reader (hash navigation, one page) and checks what a reader sees:
// a title, body text, labelled options/continuations, and no page errors. Continuations are checked against the
// story's own documents or the record map. Requires a preview (scripts/serve.mjs --dist) or STELLARIS_PREVIEW_URL and
// STELLARIS_PLAYWRIGHT_PATH. Optional: ONLY=<story id> to check one story. Writes verification/all-docs.json.
import { writeFile, mkdir } from "node:fs/promises";
import { pathToFileURL } from "node:url";
const { chromium } = await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const base = process.env.STELLARIS_PREVIEW_URL || "http://127.0.0.1:4173/";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto(base, { waitUntil: "domcontentloaded" });
await page.evaluate(() => localStorage.clear());
const get = async (path) => (await page.request.get(new URL(path, base).href)).json();
const index = await get("stories/index.json");
const records = await get("stories/records.json");
const only = process.env.ONLY ? new Set(process.env.ONLY.split(",")) : null;
const stories = index.stories.filter((s) => s.visible && (!only || only.has(s.id)));
const failures = [];
let docs = 0;
const t0 = Date.now();
for (const [n, s] of stories.entries()) {
  const story = await get(`stories/${s.id}.json`);
  const ids = new Set(story.chapters.map((c) => c.id));
  for (const c of story.chapters) {
    const where = `${s.id} ${c.id}`;
    const open = async (timeout) => {
      await page.evaluate(([sid, cid]) => (location.hash = `story=${encodeURIComponent(sid)}&chapter=${encodeURIComponent(cid)}`), [s.id, c.id]);
      return page.waitForFunction((cid) => document.querySelector(".chapter-document")?.dataset.doc === cid, c.id, { timeout }).then(() => true, () => false);
    };
    // A long single-page run occasionally misses one hashchange; retry once (via a neutral hash) before failing.
    let ok = await open(15000);
    if (!ok) {
      await page.evaluate(() => (location.hash = "#"));
      await page.waitForTimeout(500);
      ok = await open(30000);
    }
    if (!ok) { failures.push(`${where}: did not render`); continue; }
    docs++;
    const seen = await page.evaluate(() => {
      const doc = document.querySelector(".chapter-document");
      const text = (sel) => [...doc.querySelectorAll(sel)].map((e) => e.innerText.trim());
      return {
        title: document.querySelector("#reader-title")?.innerText.trim() || "",
        body: doc.querySelector(".narrative")?.innerText.trim() || "",
        choices: text(".choice-button"),
        links: [...doc.querySelectorAll("[data-chapter]")].map((e) => ({ id: e.dataset.chapter, story: e.dataset.story, label: e.innerText.trim() })),
      };
    });
    if (!seen.title) failures.push(`${where}: empty title`);
    if (!seen.body && !seen.choices.length) failures.push(`${where}: no text and no options`);
    if (seen.choices.some((x) => !x)) failures.push(`${where}: unlabeled option`);
    for (const l of seen.links) {
      if (!l.label) failures.push(`${where}: unlabeled continuation to ${l.id}`);
      if (!ids.has(l.id) && !records[l.id]) failures.push(`${where}: continuation to unknown document ${l.id}`);
    }
  }
  if (n % 100 === 0) console.log(`${n}/${stories.length} stories, ${docs} documents, ${failures.length} failures, ${Math.round((Date.now() - t0) / 1000)} s`);
}
await browser.close();
const result = { date: new Date().toISOString(), base, stories: stories.length, documents: docs, failures, errors };
await mkdir("verification", { recursive: true });
await writeFile(`verification/all-docs${only ? "-subset" : ""}.json`, JSON.stringify(result, null, 1) + "\n");
console.log(`checked ${stories.length} stories, ${docs} documents in the reader: ${failures.length} failures, ${errors.length} page errors`);
for (const f of failures.slice(0, 30)) console.log("  ✖", f);
for (const e of errors.slice(0, 10)) console.log("  page error:", e);
process.exit(failures.length || errors.length ? 1 : 0);
