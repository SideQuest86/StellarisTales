// Browser check of the full-text search (src/search.js, public/search/): picks words from the data that occur ONLY in
// one chapter's body text / ONLY in one effects label, in both languages, and checks result type, snippet, exact
// chapter navigation, specimen -> museum, lazy index loading, 390px layout and query latency.
// Requires a preview (node scripts/serve.mjs --dist). STELLARIS_PREVIEW_URL (default http://127.0.0.1:4173/),
// STELLARIS_PLAYWRIGHT_PATH (default: the bundled runtime), HEADED=1 for a visible browser. Writes verification/search/.
import assert from "node:assert/strict";
import { mkdir, readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { parseShard, decodePostings, hashTerm, SHARDS, FIELD } from "../src/search.js";

const PW = process.env.STELLARIS_PLAYWRIGHT_PATH || "C:/Users/wangp/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";
const { chromium } = await import(pathToFileURL(PW).href);
const base = process.env.STELLARIS_PREVIEW_URL || "http://127.0.0.1:4173/";
const out = "verification/search";
await mkdir(out, { recursive: true });
const json = async (p) => JSON.parse(await readFile(`public/${p}`, "utf8"));

// ---- choose probe words from the data ----
const meta = await json("search/meta.json");
const index = await json("stories/index.json");
const excerpts = await json("stories/excerpts.json");
const titleBlob = JSON.stringify(index.stories.map((s) => s.title)).toLowerCase() + JSON.stringify(excerpts).toLowerCase();
const termDocs = new Map(); // term -> {docs, masks}
for (let k = 0; k < SHARDS; k++) {
  const m = parseShard(new Uint8Array(await readFile(`public/search/s${k}.bin`)));
  for (const [t, bytes] of m) termDocs.set(t, decodePostings(bytes));
}
const only = (mask, pred) => [...termDocs].filter(([t, p]) => p.docs.length === 1 && p.masks[0] === mask && p.docs[0] < meta.spStart && pred(t, p));
const storyOfDoc = (d) => meta.stories[meta.first.findLastIndex((f) => f <= d)];
const latinOK = (t) => /^[a-z]{8,12}$/.test(t) && !titleBlob.includes(t);
const pickEn = (mask) => only(mask, latinOK).sort((a, b) => a[0].localeCompare(b[0]))[Math.floor(only(mask, latinOK).length / 3)];
const textEn = pickEn(FIELD.text), effEn = pickEn(FIELD.effect);
// Chinese: a 4-character phrase whose three bigrams are each rare, text-only (or effect-only), and not in titles/excerpts.
async function pickZh(mask, field) {
  const cands = new Map();
  for (const [t, p] of termDocs) if (/^[\u3400-\u9fff]{2}$/.test(t) && p.docs.length === 1 && p.masks[0] === mask && p.docs[0] < meta.spStart && !titleBlob.includes(t)) cands.set(t, p.docs[0]);
  const byStory = new Map();
  for (const [t, d] of [...cands].sort()) { const id = storyOfDoc(d); (byStory.get(id) || byStory.set(id, []).get(id)).push([t, d]); }
  for (const [id, list] of [...byStory].sort((a, b) => a[0].localeCompare(b[0])).filter((_, i) => i % 7 === 3)) {
    const data = await json(`stories/${id}.json`);
    const eff = field === "effect" ? (await json(`effects/${id}.json`)) : null;
    for (const [t, d] of list) {
      const ch = data.chapters.find((c) => c.id === meta.ids[d]);
      const hay = field === "effect" ? JSON.stringify(eff.docs?.[ch.id] ?? "") : JSON.stringify([ch.texts, ch.sections, ch.choices.map((c) => c.responses)]);
      const pos = hay.indexOf(t);
      if (pos < 0) continue;
      // extend to a 3- or 4-character phrase that really occurs and whose other bigrams occur only in this doc
      for (const len of [4, 3]) {
        const phrase = hay.slice(pos, pos + len);
        if (!/^[\u3400-\u9fff]+$/.test(phrase)) continue;
        const bigrams = [...phrase].slice(0, -1).map((_, i) => phrase.slice(i, i + 2));
        if (bigrams.every((b) => termDocs.get(b)?.docs.length <= 3 && termDocs.get(b).docs.includes(d))) return { phrase, doc: d, story: id, chapter: ch.id };
      }
    }
  }
  throw new Error("no zh probe found for " + field);
}
const textZh = await pickZh(FIELD.text, "text"), effZh = await pickZh(FIELD.effect, "effect");
const probe = (r, term) => ({ term, doc: r.docs[0], story: storyOfDoc(r.docs[0]), chapter: meta.ids[r.docs[0]] });
const probes = {
  textEn: probe(textEn[1], textEn[0]), effEn: probe(effEn[1], effEn[0]),
  textZh: { term: textZh.phrase, ...textZh }, effZh: { term: effZh.phrase, ...effZh },
};
console.log("probes", JSON.stringify(probes));
// Round 5 probes: prefix, two-word partial, single CJK character, typo, no result.
const allTerms = [...termDocs.keys()];
const latinWord = (t) => /^[a-z]{5,}$/.test(t);
const prefixQ = textEn[0].slice(0, textEn[0].length - 2);
const sibling = allTerms.find((t) => latinWord(t) && t !== textEn[0] && termDocs.get(t).docs.includes(textEn[1].docs[0]) && termDocs.get(t).masks[termDocs.get(t).docs.indexOf(textEn[1].docs[0])] & FIELD.text);
const typoQ = (() => {
  const w = textEn[0];
  for (let i = 3; i < w.length - 1; i++) {
    const q = w.slice(0, i) + w.slice(i + 1);
    if (!allTerms.some((t) => t.startsWith(q)) && !titleBlob.includes(q)) return q;
  }
  throw new Error("no typo probe");
})();
const rareZh = [...termDocs].filter(([t, p]) => /^[㐀-鿿]$/.test(t) && p.docs.length >= 1 && p.docs.length <= 3 && p.masks.every((m) => m === FIELD.text) && p.docs[0] < meta.spStart && !titleBlob.includes(t)).sort((a, b) => a[0].localeCompare(b[0]))[7];
const titleZh = await json("search/titles-zh.json");
const titleChar = [...new Set(titleZh.slice(0, meta.spStart).join(""))].find((c) => /^[㐀-鿿]$/.test(c) && termDocs.get(c) && termDocs.get(c).docs.length > 8 && termDocs.get(c).docs.length < 150 && termDocs.get(c).masks.some((m) => m & FIELD.name) && termDocs.get(c).masks.some((m) => !(m & FIELD.name)));
console.log("round5 probes", JSON.stringify({ prefixQ, of: textEn[0], sibling, typoQ, rareZh: rareZh?.[0], titleChar }));
const spec = (await json("museum/specimens.json")).specimens.find((s) => /^[A-Za-z ]{8,}$/.test(s.name.en));

// ---- browser ----
const browser = await chromium.launch({ channel: "chrome", headless: !process.env.HEADED });
const results = [];
const step = (name, detail = "") => { results.push(name); console.log("ok -", name, detail); };
const errors = [];
const newPage = async (viewport) => {
  const page = await (await browser.newContext({ viewport })).newPage();
  page.on("pageerror", (e) => errors.push(e.message));
  return page;
};
try {
  const page = await newPage({ width: 1280, height: 900 });
  const requested = [];
  page.on("request", (r) => { if (r.url().includes("/search/")) requested.push(r.url().split("/search/")[1]); });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.clear());
  await page.goto(base, { waitUntil: "networkidle" });
  assert.deepEqual(requested, [], "index must not load before the search dialog opens");
  step("no search index requests before the dialog opens");
  await page.locator("#search-open").click();
  await page.waitForSelector("#search-dialog[open]");
  await page.waitForFunction(() => document.querySelectorAll("#search-results .search-story").length > 0);
  step("empty query still lists stories", await page.locator("#search-count").innerText());
  await page.waitForTimeout(800);
  assert.ok(requested.includes("meta.json"), "meta loads on open");
  assert.ok(!requested.some((f) => f.endsWith(".bin")), "no shards before a query");
  step("dialog open loads only meta/titles", requested.join(","));

  const latencies = [];
  async function search(q) {
    await page.locator("#search-input").fill("");
    await page.waitForFunction(() => document.querySelectorAll("#search-results .search-story").length >= 20);
    const t0 = Date.now();
    await page.locator("#search-input").fill(q);
    await page.waitForFunction((q) => document.querySelector("#search-input").value === q && /(results?|条结果|No matches|没有匹配)/.test(document.querySelector("#search-count").textContent) , q);
    await page.waitForFunction(() => !document.querySelector("#search-results .hit-snip:empty") || !document.querySelector("#search-results .search-hit"), null, { timeout: 8000 }).catch(() => {});
    latencies.push(Date.now() - t0);
    return page.locator("#search-results .search-hit");
  }
  async function expectHit(lang, q, type, p) {
    const hits = await search(q);
    const row = hits.locator(`xpath=self::*[contains(@data-hash, ${JSON.stringify(encodeURIComponent(p.chapter))})]`);
    assert.equal(await row.count(), 1, `${lang} "${q}": expected the chapter ${p.chapter} in results`);
    assert.equal(await row.first().locator(".hit-type").getAttribute("data-type"), type, `${lang} "${q}" type`);
    const snip = await row.first().locator(".hit-snip").innerHTML();
    assert.ok(/<mark>/.test(snip), `snippet highlights "${q}"`);
    assert.ok(!/[\[\]§£]|\$[A-Za-z_]+\$/.test(await row.first().innerText()), "no raw tokens in the row");
    return row.first();
  }
  await expectHit("zh", probes.textZh.term, "text", probes.textZh);
  step("zh body-only phrase -> Text hit", probes.textZh.term);
  await expectHit("zh", probes.effZh.term, "effect", probes.effZh);
  step("zh effect-only phrase -> Effect hit", probes.effZh.term);
  await expectHit("zh", probes.textEn.term, "text", probes.textEn);
  step("zh UI also matches an English query", probes.textEn.term);

  // navigation to the exact chapter
  const row = await expectHit("zh", probes.textZh.term, "text", probes.textZh);
  await row.click();
  await page.waitForFunction((c) => decodeURIComponent(location.hash).includes(c), probes.textZh.chapter);
  await page.waitForSelector(".chapter-document");
  assert.equal(await page.locator(".chapter-document").getAttribute("data-doc"), probes.textZh.chapter);
  step("clicking a Text hit opens that exact chapter", probes.textZh.chapter);
  // same story already open: another hit in that story must still navigate
  await page.keyboard.press("/");
  const row2 = await expectHit("zh", probes.effZh.term, "effect", probes.effZh);
  await row2.click();
  await page.waitForFunction((c) => document.querySelector(".chapter-document")?.dataset.doc === c, probes.effZh.chapter, { timeout: 15000 });
  step("hit inside the open story navigates to its chapter", probes.effZh.chapter);

  await page.goto(base + "#", { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.setItem("st-language", "en"));
  await page.goto(base, { waitUntil: "networkidle" });
  await page.locator("#search-open").click();
  await expectHit("en", probes.textEn.term, "text", probes.textEn);
  step("en body-only word -> Text hit", probes.textEn.term);
  await expectHit("en", probes.effEn.term, "effect", probes.effEn);
  step("en effect-only word -> Effect hit", probes.effEn.term);
  await expectHit("en", probes.textZh.term, "text", probes.textZh);
  step("en UI also matches a Chinese query", probes.textZh.term);

  // specimen
  const hits = await search(spec.name.en);
  const sp = hits.locator('xpath=self::*[contains(@data-hash, "#museum=")]').first();
  assert.ok(await sp.count(), "specimen row present");
  assert.equal(await sp.locator(".hit-type").getAttribute("data-type"), "specimen");
  await page.screenshot({ path: `${out}/desktop-results.png` });
  await hits.locator(`xpath=self::*[@data-hash=${JSON.stringify("#museum=" + spec.key)}]`).click();
  await page.waitForSelector("#museum.open .museum-exhibit");
  assert.ok(decodeURIComponent(page.url()).includes("museum=" + spec.key));
  step("specimen query opens the museum exhibit", spec.key);

  // escaping: a hostile query never becomes markup
  await page.goto(base, { waitUntil: "networkidle" });
  await page.locator("#search-open").click();
  await page.locator("#search-input").fill('<img src=x onerror=alert(1)> &amp; "');
  await page.waitForTimeout(600);
  assert.equal(await page.locator("#search-results img[src=x]").count(), 0);
  step("hostile query is inert");

  // ---- round 5: prefix, partial last word, single CJK character, typo fallback, no result ----
  await page.goto(base, { waitUntil: "networkidle" });
  await page.locator("#search-open").click();
  const markOf = async (row) => (await row.locator(".hit-snip mark").allInnerTexts()).join("|").toLowerCase();
  let row5 = await expectHit("en", prefixQ, "text", probes.textEn);
  assert.ok((await markOf(row5)).includes(prefixQ), "prefix is highlighted");
  step("Latin prefix finds the longer word", `${prefixQ} -> ${textEn[0]}`);
  row5 = await expectHit("en", `${sibling} ${prefixQ}`, "text", probes.textEn);
  step("two words, partial last word", `${sibling} ${prefixQ}`);
  await search(`${prefixQ} ${sibling}`);
  assert.equal(await page.locator(`#search-results .search-hit[data-hash*=${JSON.stringify(encodeURIComponent(probes.textEn.chapter))}]`).count(), 0, "earlier words stay exact");
  step("a partial word that is not last stays exact");
  row5 = await expectHit("en", typoQ, "text", probes.textEn);
  assert.ok((await markOf(row5)).includes(textEn[0]), "approximate match highlights the real word: " + (await markOf(row5)));
  const countLine = await page.locator("#search-count").innerText();
  step("typo fallback finds the word", `${typoQ} -> ${textEn[0]}; count line "${countLine}"${/Close matches|相近结果/.test(countLine) ? "" : " (note needs the app.js countText patch)"}`);
  await search("qzxjvwk");
  assert.equal(await page.locator("#search-results .search-hit").count(), 0);
  assert.ok(await page.locator("#search-results .empty").count(), "empty-state message");
  assert.ok(!/Close matches|相近结果/.test(await page.locator("#search-count").innerText()), "no-result is not 'close matches'");
  step("nonsense query shows the empty state");
  await search("fleet");
  assert.ok((await page.locator("#search-results .search-hit").count()) > 0 && !/Close matches|相近结果/.test(await page.locator("#search-count").innerText()), "exact results are not marked approximate");
  step("exact results are not marked approximate");
  const zhChapter = { chapter: meta.ids[rareZh[1].docs[0]] };
  await page.locator("#search-input").fill(rareZh[0]);
  await page.waitForSelector(`#search-results .search-hit[data-hash*=${JSON.stringify(encodeURIComponent(zhChapter.chapter))}]`, { timeout: 8000 });
  row5 = await expectHit("en", rareZh[0], "text", zhChapter);
  step("single Chinese character reaches body text", rareZh[0]);
  await search(titleChar);
  const first = page.locator("#search-results .search-story").first();
  assert.ok((await first.getAttribute("class")).includes("search-hit") ? (await first.locator(".hit-type").getAttribute("data-type")) === "name" : true, "title matches come first");
  step("single character: titles first", titleChar);

  // latency (index warm): repeat queries and time them in-page
  await page.goto(base, { waitUntil: "networkidle" });
  await page.locator("#search-open").click();
  const timing = await page.evaluate(async (qs) => {
    const input = document.querySelector("#search-input");
    const long = [];
    new PerformanceObserver((l) => l.getEntries().forEach((e) => long.push(Math.round(e.duration)))).observe({ entryTypes: ["longtask"] });
    const res = [];
    for (const q of qs) {
      input.value = "";
      input.dispatchEvent(new Event("input"));
      await new Promise((r) => setTimeout(r, 200));
      const t0 = performance.now();
      input.value = q;
      input.dispatchEvent(new Event("input"));
      await new Promise((r) => setTimeout(r, 120)); // debounce
      const t1 = performance.now();
      while (!/(results?|条结果|No matches|没有匹配)/.test(document.querySelector("#search-count").textContent)) await new Promise((r) => setTimeout(r, 5));
      res.push({ q, ms: Math.round(performance.now() - t1) });
    }
    await new Promise((r) => setTimeout(r, 300));
    return { res, long };
  }, ["fleet", "ancient ruins", "energy credits", "塞塔娜", "能量", "research"]);
  console.log("latency (after debounce, warm index):", JSON.stringify(timing));
  step("query latency measured", `max ${Math.max(...timing.res.map((r) => r.ms))} ms; long tasks ${JSON.stringify(timing.long)}`);

  // mobile 390px
  const m = await newPage({ width: 390, height: 844 });
  await m.goto(base, { waitUntil: "networkidle" });
  await m.locator("#search-open").click();
  await m.locator("#search-input").fill("fleet");
  await m.waitForFunction(() => /(results|条结果)/.test(document.querySelector("#search-count").textContent));
  await m.waitForTimeout(1500);
  await m.screenshot({ path: `${out}/mobile-390.png` });
  const overflow = await m.evaluate(() => {
    const d = document.querySelector("#search-dialog"), r = document.querySelector("#search-results");
    return { page: document.documentElement.scrollWidth - innerWidth, dialog: d.scrollWidth - d.clientWidth, results: r.scrollWidth - r.clientWidth };
  });
  assert.ok(overflow.page <= 0 && overflow.dialog <= 0 && overflow.results <= 0, "no horizontal overflow: " + JSON.stringify(overflow));
  step("390px layout has no horizontal overflow", JSON.stringify(overflow));
  assert.deepEqual(errors, [], "page errors");
  step("no page errors");
} finally {
  await browser.close();
}
console.log(`\n${results.length} checks passed`);
