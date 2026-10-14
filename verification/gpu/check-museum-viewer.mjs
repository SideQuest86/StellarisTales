// The museum exhibit viewer builds its renderer through src/gpu.js: it opens, draws a model and reports the tier.
//   STELLARIS_PLAYWRIGHT_PATH=… STELLARIS_PREVIEW_URL=http://127.0.0.1:4190/ node verification/gpu/check-museum-viewer.mjs
import { pathToFileURL } from "node:url";
import { writeFile } from "node:fs/promises";
const { chromium } = await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const base = (process.env.STELLARIS_PREVIEW_URL || "http://127.0.0.1:4190/").replace(/\/?$/, "/");
const out = [];
for (const [name, force, query] of [["discrete", true, ""], ["integrated", false, ""], ["fake-integrated", true, "?gpu=integrated"]]) {
  const browser = await chromium.launch({ channel: "chrome", headless: false, args: ["--window-size=1500,950",
    ...(process.env.STELLARIS_WINDOW_POSITION ? [`--window-position=${process.env.STELLARIS_WINDOW_POSITION}`] : []), ...(force ? ["--force-high-performance-gpu"] : [])] });
  const page = await (await browser.newContext({ viewport: null })).newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(`${base}${query}#museum=advisor_core`, { waitUntil: "networkidle" });
  await page.waitForSelector(".museum-viewer canvas", { timeout: 30000 });
  await page.waitForTimeout(2500);
  const r = await page.evaluate(() => {
    const canvas = document.querySelector(".museum-viewer canvas");
    const gl = canvas.getContext("webgl2");
    const d = gl.getExtension("WEBGL_debug_renderer_info");
    return { renderer: gl.getParameter(d.UNMASKED_RENDERER_WEBGL), antialias: gl.getContextAttributes().antialias, buffer: [gl.drawingBufferWidth, gl.drawingBufferHeight], css: [canvas.clientWidth, canvas.clientHeight] };
  });
  await page.screenshot({ path: `verification/gpu/museum-${name}.png` });
  out.push({ name, ...r, errors });
  console.log(name, JSON.stringify(r), errors);
  await browser.close();
}
await writeFile("verification/gpu/museum-viewer.json", JSON.stringify(out, null, 2));
