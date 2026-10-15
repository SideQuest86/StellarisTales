// Image bytes for opening one story (DPR1 = originals, DPR2 = HD) and one exhibit (HD vs original icon).
import { pathToFileURL } from "node:url";
const { chromium } = await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const base = process.env.STELLARIS_BASE || "http://127.0.0.1:4173/";
const story = process.env.STELLARIS_STORY || "cetana";
const browser = await chromium.launch({ channel: "chrome", headless: true });

async function run(label, dpr, url, wait, rewrite) {
  const ctx = await browser.newContext({ viewport: { width: label.startsWith("story") ? 390 : 1440, height: 900 }, deviceScaleFactor: dpr });
  const page = await ctx.newPage();
  if (rewrite) await page.route("**/museum/img-hd/*", (r) => r.continue({ url: r.request().url().replace("/img-hd/", "/img/") }));
  const rows = [];
  page.on("response", async (res) => {
    const u = res.url();
    if (/\/(art|art-hd|museum\/img|museum\/img-hd)\//.test(u)) rows.push({ u, n: (await res.body().catch(() => Buffer.alloc(0))).length });
  });
  await page.goto(url, { waitUntil: "networkidle" });
  if (wait) await page.waitForSelector(wait, { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(2500);
  const sum = (re) => rows.filter((r) => re.test(r.u)).reduce((a, r) => a + r.n, 0);
  const cnt = (re) => rows.filter((r) => re.test(r.u)).length;
  console.log(label, JSON.stringify({ art: [cnt(/\/art\//), sum(/\/art\//)], artHd: [cnt(/\/art-hd\//), sum(/\/art-hd\//)], icon: [cnt(/museum\/img\//), sum(/museum\/img\//)], iconHd: [cnt(/img-hd\//), sum(/img-hd\//)] }));
  await ctx.close();
}
await run("story DPR1 (originals)", 1, `${base}#story=${story}`);
await run("story DPR2 (HD)", 2, `${base}#story=${story}`);
await run("story DPR3 (HD)", 3, `${base}#story=${story}`);
await run("exhibit original icon", 1, `${base}#museum=acidic_spores`, ".museum-stage-image", true);
await run("exhibit HD icon", 1, `${base}#museum=acidic_spores`, ".museum-stage-image", false);
await browser.close();


