// Does enabling chrome://flags/#force-high-performance-gpu (set through the flags page, then relaunch) switch the adapter?
import { pathToFileURL } from "node:url";
import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
const { chromium } = await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const out = [];
const renderer = async (page) => {
  await page.goto("http://127.0.0.1:4190/probe-404").catch(() => {});
  return page.evaluate(() => {
    const gl = document.createElement("canvas").getContext("webgl2", { powerPreference: "high-performance" });
    const d = gl.getExtension("WEBGL_debug_renderer_info");
    return gl.getParameter(d.UNMASKED_RENDERER_WEBGL);
  });
};
for (const channel of ["chrome", "msedge"]) {
  const scheme = channel === "msedge" ? "edge" : "chrome";
  const dir = await mkdtemp(join(process.env.PROBE_TMP || tmpdir(), "flag-"));
  let ctx = await chromium.launchPersistentContext(dir, { channel, headless: false, args: ["--window-size=800,600", ...(process.env.STELLARIS_WINDOW_POSITION ? [`--window-position=${process.env.STELLARIS_WINDOW_POSITION}`] : [])] });
  let page = ctx.pages()[0] || (await ctx.newPage());
  const before = await renderer(page);
  await page.goto(`${scheme}://flags/#force-high-performance-gpu`);
  await page.waitForTimeout(1200);
  const set = await page.evaluate(() => {
    const root = document.querySelector("flags-app")?.shadowRoot || document;
    const el = root.querySelector("#force-high-performance-gpu");
    const s = el?.shadowRoot || el;
    const select = s?.querySelector("select");
    if (!select) return "flag not listed";
    select.value = [...select.options].find((o) => /enabled|已启用|启用/i.test(o.value + o.textContent) && !/disabled|停用/i.test(o.value))?.value ?? select.options[1].value;
    select.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    return `${s.querySelector(".experiment-name")?.textContent?.trim()} -> ${select.value}`;
  });
  await page.waitForTimeout(800);
  await ctx.close();
  ctx = await chromium.launchPersistentContext(dir, { channel, headless: false, args: ["--window-size=800,600", ...(process.env.STELLARIS_WINDOW_POSITION ? [`--window-position=${process.env.STELLARIS_WINDOW_POSITION}`] : [])] });
  page = ctx.pages()[0] || (await ctx.newPage());
  const after = await renderer(page);
  out.push({ channel, flagsPage: set, before, afterRelaunch: after });
  console.log(channel, "|", set, "|", before, "=>", after);
  await ctx.close();
}
if (process.env.PROBE_OUT) await writeFile(process.env.PROBE_OUT, JSON.stringify(out, null, 2));
