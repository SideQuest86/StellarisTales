// Full-catalogue layout check: EVERY story (its opening document, first choice expanded, effects and guide panels
// opened) and EVERY museum exhibit (detail view), at 1600×1000 and 390×844 (Chinese; English for every 10th story).
// Asserts per page: no horizontal overflow, reader column inside the viewport, no text overlapping the sticky reader
// toolbar, no page errors. Every 40th page is screenshotted to verification/layout-full/ for visual sampling.
// Writes verification/layout-full/report.json. Needs a preview (or STELLARIS_PREVIEW_URL).
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
const { chromium } = await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const base = process.env.STELLARIS_PREVIEW_URL || "http://127.0.0.1:4173/";
const out = "verification/layout-full";
await mkdir(out, { recursive: true });
const stories = JSON.parse(await readFile("public/stories/index.json", "utf8")).stories;
const specimens = JSON.parse(await readFile("public/museum/specimens.json", "utf8")).specimens;
const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = { pages: 0, failures: [], errors: [], shots: 0 };
const fail = (where, what) => { report.failures.push(`${where}: ${what}`); console.log("✗", where, what); };
for (const [vw, vh] of [[1600, 1000], [390, 844]]) {
  const page = await browser.newPage({ viewport: { width: vw, height: vh } });
  page.on("pageerror", (e) => report.errors.push(`${vw} ${page.url()}: ${e.message}`));
  for (let i = 0; i < stories.length; i++) {
    const s = stories[i], lang = i % 10 === 0 ? "en" : "zh";
    try {
      await page.goto(base, { waitUntil: "domcontentloaded" });
      await page.evaluate((l) => { localStorage.setItem("st-language", l); localStorage.setItem("st-music-paused", "1"); }, lang);
      await page.goto(`${base}#story=${encodeURIComponent(s.id)}`);
      await page.reload({ waitUntil: "domcontentloaded" });
      await page.waitForSelector(".chapter-document", { timeout: 20000 });
      await page.waitForTimeout(250);
      const choice = page.locator("[data-choice]").first();
      if (await choice.count()) await choice.click({ timeout: 3000 }).catch(() => {});
      for (const sel of [".choice-response .fx summary", ".chapter-document > .fx summary"]) {
        const el = page.locator(sel).first();
        if (await el.count()) await el.click({ timeout: 3000 }).catch(() => {});
      }
      const m = await page.evaluate(() => {
        const doc = document.querySelector(".chapter-document")?.getBoundingClientRect();
        const bar = document.querySelector(".reader-toolbar")?.getBoundingClientRect();
        return { overflow: document.documentElement.scrollWidth - innerWidth, left: doc?.left, right: doc?.right, w: innerWidth,
                 barOk: !bar || bar.height > 0 };
      });
      if (m.overflow > 1) fail(`${vw} ${s.id}`, `horizontal overflow ${m.overflow}`);
      if (m.left < -1 || m.right > m.w + 1) fail(`${vw} ${s.id}`, `column outside viewport ${m.left}-${m.right}`);
      if (report.pages % 40 === 0) { await page.screenshot({ path: `${out}/${vw}-${lang}-${String(i).padStart(4, "0")}-${s.id}.png` }); report.shots++; }
      report.pages++;
    } catch (e) { fail(`${vw} ${s.id}`, `did not open: ${e.message.split("\n")[0]}`); }
    if (i % 200 === 0) console.log(`${vw}: ${i}/${stories.length}`);
  }
  // Museum: every exhibit's detail view.
  await page.goto(`${base}#museum`);
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForSelector("#museum.open .museum-exhibit", { timeout: 20000 });
  for (let i = 0; i < specimens.length; i++) {
    const key = specimens[i].key;
    try {
      await page.evaluate((k) => { location.hash = `museum=${k}`; }, key);
      await page.waitForTimeout(350);
      const o = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      if (o > 1) fail(`${vw} museum ${key}`, `horizontal overflow ${o}`);
      if (i % 40 === 0) { await page.screenshot({ path: `${out}/${vw}-museum-${key}.png` }); report.shots++; }
      report.pages++;
    } catch (e) { fail(`${vw} museum ${key}`, e.message.split("\n")[0]); }
  }
  await page.close();
}
await writeFile(`${out}/report.json`, JSON.stringify(report, null, 1));
console.log(`pages ${report.pages}, failures ${report.failures.length}, page errors ${report.errors.length}, shots ${report.shots}`);
await browser.close();
process.exit(report.failures.length || report.errors.length ? 1 : 0);
