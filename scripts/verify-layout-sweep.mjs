// Layout sweep across the whole site: for every category, the first and the longest story (opening document, a
// choice expanded, guide and effects panels opened), the museum (grid, filters, detail), the playlist and search —
// at 1600×1000 and 390×844, Chinese and English. Asserts: no horizontal overflow, reader text column within the
// viewport, no page errors; on desktop the close-up loads the super-resolved art (public/art-hd). Screenshots in
// verification/layout/ (kept local) for visual review. Needs a preview (or STELLARIS_PREVIEW_URL).
import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
const { chromium } = await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const base = process.env.STELLARIS_PREVIEW_URL || "http://127.0.0.1:4173/";
const out = "verification/layout";
await mkdir(out, { recursive: true });
const index = JSON.parse(await readFile("public/stories/index.json", "utf8")).stories;
const byCat = {};
for (const s of index) (byCat[s.category] ||= []).push(s);
const picks = Object.entries(byCat).flatMap(([cat, list]) => {
  const longest = [...list].sort((a, b) => b.chapters - a.chapters)[0];
  return [...new Set([list[0], longest])].map((s) => ({ cat, id: s.id }));
});
const browser = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=d3d11", "--ignore-gpu-blocklist"] });
const errors = [], results = [];
const ok = (name, detail = "") => { results.push({ name, detail }); console.log("✔", name, detail); };
async function setLang(page, lang) {
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await page.evaluate((l) => { localStorage.setItem("st-language", l); localStorage.setItem("st-music-paused", "1"); }, lang);
}
const overflow = (page) => page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
for (const [vw, vh] of [[1600, 1000], [390, 844]]) {
  for (const lang of ["zh", "en"]) {
    const page = await browser.newPage({ viewport: { width: vw, height: vh } });
    page.on("pageerror", (e) => errors.push(`${vw} ${lang}: ${e.message}`));
    const hd = [];
    page.on("response", (r) => { if (r.url().includes("/art-hd/")) hd.push(r.status()); });
    await setLang(page, lang);
    for (const p of picks) {
      await page.goto(`${base}#story=${encodeURIComponent(p.id)}`);
      await page.reload({ waitUntil: "domcontentloaded" });
      await page.waitForSelector(".chapter-document", { timeout: 20000 });
      await page.waitForTimeout(900);
      const choice = page.locator("[data-choice]").first();
      if (await choice.count()) await choice.click().catch(() => {});
      for (const sel of [".choice-response .fx summary", ".chapter-document > .fx summary", ".story-summary summary"]) {
        const el = page.locator(sel).first();
        if (await el.count()) await el.click().catch(() => {});
      }
      await page.waitForTimeout(300);
      const o = await overflow(page);
      assert.ok(o <= 1, `${p.id} ${vw} ${lang}: horizontal overflow ${o}`);
      const col = await page.evaluate(() => { const r = document.querySelector(".chapter-document")?.getBoundingClientRect(); return r ? [Math.round(r.left), Math.round(r.right), innerWidth] : null; });
      assert.ok(col && col[0] >= -1 && col[1] <= col[2] + 1, `${p.id}: text column inside the viewport ${col}`);
      await page.screenshot({ path: `${out}/${vw}-${lang}-${p.cat}-${p.id}.png` });
    }
    ok(`${vw} ${lang}: ${picks.length} stories (all ${Object.keys(byCat).length} categories)`, "no overflow, column in view");
    if (vw > 1000) {
      assert.ok(hd.length && hd.every((s) => s === 200), `close-up uses art-hd (${hd.join(",")})`);
      ok(`${vw} ${lang}: close-up loaded super-resolved art`, `${hd.length} art-hd responses`);
    }
    await page.goto(`${base}#museum`);
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForSelector("#museum.open .museum-exhibit", { timeout: 20000 });
    await page.waitForTimeout(600);
    assert.ok((await overflow(page)) <= 1, "museum grid overflow");
    await page.screenshot({ path: `${out}/${vw}-${lang}-museum-grid.png` });
    await page.locator(".museum-exhibit").nth(3).click();
    await page.waitForTimeout(1500);
    assert.ok((await overflow(page)) <= 1, "museum detail overflow");
    await page.screenshot({ path: `${out}/${vw}-${lang}-museum-detail.png` });
    ok(`${vw} ${lang}: museum grid and detail`);
    await page.goto(base);
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForTimeout(800);
    await page.locator("#playlist-toggle").click();
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${out}/${vw}-${lang}-playlist.png` });
    await page.keyboard.press("Escape");
    await page.locator("#search-open").click();
    await page.locator("#search-input").fill(lang === "zh" ? "星" : "star");
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${out}/${vw}-${lang}-search.png` });
    ok(`${vw} ${lang}: playlist and search`);
    await page.close();
  }
}
await writeFile(`${out}/sweep.json`, JSON.stringify({ results, errors }, null, 1));
console.log(errors.length ? `page errors: ${errors.join(" | ")}` : "page errors: 0");
await browser.close();
process.exit(errors.length ? 1 : 0);
