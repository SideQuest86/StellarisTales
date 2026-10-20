// First-use cost of single symbol / punctuation characters in the faces the reader and the story map use (round 5).
// Characters outside the Han ranges come from a system fallback font on most machines; the first layout of each one in each
// face asks the OS for a font (a few ms to ~25 ms), which the story map pays on its first build.
//   STELLARIS_PLAYWRIGHT_PATH=... URL=http://127.0.0.1:4173/ node scripts/bench/symbol-cost.mjs
// Run against a build WITHOUT the symbol warm-up (src/glyph-warmup.js SYMBOLS) to see the cost; with it every row is ~0.1 ms.
import { pathToFileURL } from "node:url";

const { chromium } = await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const url = process.env.URL || "http://127.0.0.1:4173/";
const browser = await chromium.launch({ channel: "chrome", headless: false, args: ["--window-position=-1900,20"] });
const page = await (await browser.newContext({ viewport: { width: 1600, height: 900 } })).newPage();
await page.goto(url, { waitUntil: "domcontentloaded" });
await page.waitForFunction(() => window.__glyphWarmup?.done, null, { timeout: 120000 });
const rows = await page.evaluate(() => {
  const symbols = "·×–—’“”…›←→↗↩↻−∥≈⊡▾◇◈◎⚄✓✧⤢";
  const faces = ["500 13px var(--sans)", "italic 400 11px var(--sans)", "400 11px var(--sans)", "400 19px var(--serif-zh)", "400 17px var(--serif-zh)", "400 14px var(--sans)", "400 12px var(--sans)"];
  const host = document.createElement("div");
  host.style.cssText = "position:fixed;left:0;top:0;width:640px;visibility:hidden;contain:layout paint style;z-index:-1";
  document.body.append(host);
  const out = [];
  for (const face of faces) {
    host.style.font = face;
    for (const ch of symbols) {
      const t0 = performance.now();
      host.textContent = ch;
      host.getBoundingClientRect();
      const ms = performance.now() - t0;
      if (ms > 1.5) out.push(`${face.padEnd(34)} ${ch}  ${ms.toFixed(1)} ms`);
    }
  }
  host.remove();
  return out;
});
console.log(rows.length ? rows.join("\n") : "no symbol took more than 1.5 ms (already warm)");
await browser.close();
