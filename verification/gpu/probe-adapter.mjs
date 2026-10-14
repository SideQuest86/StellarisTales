// Which adapter does Chrome give a page under different launch flags?
import { pathToFileURL } from "node:url";
const { chromium } = await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const url = process.env.PROBE_URL || "http://127.0.0.1:4190/probe-404";
const sets = JSON.parse(process.env.PROBE_SETS || "null") || [
  { name: "headless, no flags", headless: true, args: [] },
  { name: "headed, no flags", args: [] },
  { name: "headed --force-high-performance-gpu", args: ["--force-high-performance-gpu"] },
  { name: "headed --use-angle=d3d11", args: ["--use-angle=d3d11"] },
  { name: "headed --use-angle=d3d11 --force-high-performance-gpu", args: ["--use-angle=d3d11", "--force-high-performance-gpu"] },
  { name: "headed --use-angle=d3d11on12", args: ["--use-angle=d3d11on12"] },
  { name: "headed --use-angle=gl", args: ["--use-angle=gl"] },
  { name: "headed --use-angle=vulkan", args: ["--use-angle=vulkan"] },
  { name: "headed --use-webgpu-power-preference=force-low-power", args: ["--use-webgpu-power-preference=force-low-power"] },
  { name: "headed --use-angle=swiftshader", args: ["--use-angle=swiftshader"] },
];
const channel = process.env.PROBE_CHANNEL || "chrome";
const out = [];
for (const set of sets) {
  let browser;
  try {
    browser = await chromium.launch({ channel, headless: !!set.headless, args: [...set.args, "--window-size=800,600", ...(process.env.STELLARIS_WINDOW_POSITION ? [`--window-position=${process.env.STELLARIS_WINDOW_POSITION}`] : [])] });
    const page = await browser.newPage();
    await page.goto(url).catch(() => {});
    const r = await page.evaluate(async () => {
      const gl = (pref) => {
        const c = document.createElement("canvas");
        const ctx = c.getContext("webgl2", pref ? { powerPreference: pref } : {});
        if (!ctx) return null;
        const d = ctx.getExtension("WEBGL_debug_renderer_info");
        const s = d ? ctx.getParameter(d.UNMASKED_RENDERER_WEBGL) : ctx.getParameter(ctx.RENDERER);
        ctx.getExtension("WEBGL_lose_context")?.loseContext();
        return s;
      };
      const webgpu = async (pref) => {
        if (!navigator.gpu) return "no navigator.gpu";
        try {
          const a = await navigator.gpu.requestAdapter(pref ? { powerPreference: pref } : {});
          if (!a) return null;
          const i = a.info || (await a.requestAdapterInfo?.()) || {};
          return [i.vendor, i.architecture, i.device, i.description].filter(Boolean).join(" / ") || "(no info)";
        } catch (e) { return "error " + e.message; }
      };
      return {
        webgl: { default: gl(), lowPower: gl("low-power"), highPerformance: gl("high-performance") },
        webgpu: { default: await webgpu(), lowPower: await webgpu("low-power"), highPerformance: await webgpu("high-performance") },
      };
    });
    out.push({ name: set.name, channel, args: set.args, ...r });
    console.log(set.name, JSON.stringify(r));
  } catch (e) {
    out.push({ name: set.name, channel, error: e.message.split("\n")[0] });
    console.log(set.name, "ERROR", e.message.split("\n")[0]);
  } finally {
    await browser?.close();
  }
}
if (process.env.PROBE_OUT) (await import("node:fs/promises")).writeFile(process.env.PROBE_OUT, JSON.stringify(out, null, 2));
