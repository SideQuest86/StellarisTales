// Renders chosen story chapters in both languages and prints every paragraph that contains a display-time
// substitution (.game-name), with the substituted phrases marked «…». Evidence for the placeholder review: complete
// sentences as a reader sees them. Usage: node scripts/refine/sample-render.mjs story:chapter [...] (needs a preview).
import { pathToFileURL } from "node:url";
const { chromium } = await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const base = process.env.STELLARIS_PREVIEW_URL || "http://127.0.0.1:4173/";
const targets = process.argv.slice(2);
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
for (const lang of ["zh", "en"]) {
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await page.evaluate((l) => localStorage.setItem("st-language", l), lang);
  for (const t of targets) {
    const [story, chapter] = t.split(":");
    await page.goto(`${base}#story=${encodeURIComponent(story)}${chapter ? `&chapter=${encodeURIComponent(chapter)}` : ""}`);
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForSelector(".chapter-document", { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(600);
    const lines = await page.evaluate(() => [...document.querySelectorAll(".chapter-document p, .chapter-document .choice, .chapter-document h3")]
      .filter((p) => p.querySelector(".game-name"))
      .map((p) => { const c = p.cloneNode(true); c.querySelectorAll(".game-name").forEach((s) => s.replaceWith(`«${s.textContent}»`)); return c.textContent.replace(/\s+/g, " ").trim(); }));
    console.log(`\n[${lang}] ${t}`);
    for (const l of lines.slice(0, 8)) console.log("  " + l.slice(0, 260));
  }
}
console.log(errors.length ? `page errors: ${errors.join(" | ")}` : "page errors: 0");
await browser.close();
