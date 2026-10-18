// Quick visual captures for review: STELLARIS_PLAYWRIGHT_PATH=… STELLARIS_PREVIEW_URL=… node scripts/probe/shots.mjs <out-dir> [name=hash@WxH ...]
import { pathToFileURL } from "node:url";
import { mkdirSync } from "node:fs";
const { chromium } = await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const base = process.env.STELLARIS_PREVIEW_URL || "http://127.0.0.1:4173/";
const [out = "verification/round4/shots", ...specs] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: process.env.STELLARIS_BROWSER_CHANNEL || undefined, headless: true });
for (const spec of specs.length ? specs : ["reader-zh=story=cybrex@1440x900", "landscape=@844x390"]) {
  const [name, rest] = spec.split("=", 2).length === 2 ? [spec.slice(0, spec.indexOf("=")), spec.slice(spec.indexOf("=") + 1)] : [spec, ""];
  const [hash, size = "1440x900"] = rest.split("@");
  const [width, height] = size.split("x").map(Number);
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: width < 900 ? 2 : 1, isMobile: width < 900, hasTouch: width < 900 });
  const page = await context.newPage();
  page.on("pageerror", (e) => console.log("pageerror", name, e.message));
  // HEAD_FILES=a.js,b.js serves the committed version of those src files (isolates another change in progress).
  for (const f of (process.env.HEAD_FILES || "").split(",").filter(Boolean)) {
    const { execFileSync } = await import("node:child_process");
    const body = execFileSync(process.env.GIT || "git", ["show", `HEAD:src/${f}`]);
    await page.route(`**/src/${f}*`, (r) => r.fulfill({ body, contentType: "text/javascript" }));
  }
  page.on("console", (m) => m.type() === "error" && console.log("console", name, m.text()));
  await page.goto(base + (hash ? "#" + hash : ""), { waitUntil: "domcontentloaded" });
  await page.waitForSelector(hash.startsWith("story") ? "#reader:not([hidden]):not(.prewarm) .chapter-document" : "#open-story", { timeout: 30000 });
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `${out}/${name}.png` });
  await context.close();
}
await browser.close();
