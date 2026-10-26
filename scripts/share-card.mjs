// Usage: STELLARIS_PLAYWRIGHT_PATH=... STELLARIS_PREVIEW_URL=http://127.0.0.1:4173/ node scripts/share-card.mjs public/share-card.jpg
// The link-preview card (1200x630): the archive's 3D wall, rendered by the site itself, with the wordmark large on a soft
// scrim; no interface text, so it reads in any language.
import { pathToFileURL } from "node:url";
const { chromium } = await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const base = process.env.STELLARIS_PREVIEW_URL;
const out = process.argv[2];
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await ctx.addInitScript(() => { try { localStorage.setItem("st-language", "en"); localStorage.setItem("st-gpu-hint", "dismissed"); } catch {} });
  const page = await ctx.newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForFunction(() => window.__archiveDiagnostics?.().imageCovers > 30, null, { timeout: 30000 });
  await page.waitForTimeout(3000);
  await page.mouse.move(5, 5);
  await page.evaluate(() => {
    const style = document.createElement("style");
    style.textContent = `
      .masthead, .archive-hud, .music-player, #gpu-hint, .skip-link, .archive-count { visibility: hidden !important; }
      .share-scrim { position: fixed; inset: 0; z-index: 50; pointer-events: none;
        background: radial-gradient(ellipse 62% 70% at 74% 52%, #061217f2 0%, #061217c8 46%, #06121700 78%); }
      .share-mark { position: fixed; z-index: 51; right: 92px; top: 50%; transform: translateY(-50%); display: grid; justify-items: center; gap: 18px; }
      .share-mark img { width: 64px; height: 64px; opacity: .9; }
      .share-mark b { font: 500 84px/1 "Newsreader", Georgia, serif; letter-spacing: -0.005em; color: #e6ede8; text-shadow: 0 2px 24px #031014; white-space: nowrap; }
      .share-mark i { width: 56px; height: 1px; background: #c9ad74; }`;
    document.head.append(style);
    const scrim = Object.assign(document.createElement("div"), { className: "share-scrim" });
    const mark = Object.assign(document.createElement("div"), { className: "share-mark" });
    mark.innerHTML = `<img src="./mark.svg" alt=""><b>Stellaris Tales</b><i></i>`;
    document.body.append(scrim, mark);
  });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(800);
  await page.screenshot({ path: out, type: "jpeg", quality: 86 });
} finally {
  await browser.close();
}
console.log("card written");
