// List every request of a cold load (url, bytes, type, ms offset) sorted by size. Measure only.
//   STELLARIS_PLAYWRIGHT_PATH=... STELLARIS_PREVIEW_URL=http://127.0.0.1:4192/ node scripts/bench/requests.mjs [extraWaitMs] [out.json]
import { writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
const { chromium } = await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const base = process.env.STELLARIS_PREVIEW_URL || "http://127.0.0.1:4192/";
const browser = await chromium.launch({ channel: process.env.BROWSER || "chrome", headless: true });
const context = await browser.newContext({ viewport: { width: 1600, height: 900 } });
const page = await context.newPage();
const cdp = await context.newCDPSession(page);
await cdp.send("Network.enable");
const reqs = new Map();
cdp.on("Network.requestWillBeSent", (e) => reqs.set(e.requestId, { url: e.request.url.replace(base, "/"), t: e.timestamp, type: e.type, initiator: e.initiator.type + (e.initiator.url ? ":" + e.initiator.url.replace(base, "/").slice(0, 60) + ":" + (e.initiator.lineNumber ?? "") : "") }));
cdp.on("Network.dataReceived", (e) => { const r = reqs.get(e.requestId); if (r) r.rx = (r.rx || 0) + e.encodedDataLength; });
cdp.on("Network.loadingFinished", (e) => { const r = reqs.get(e.requestId); if (r) r.bytes = e.encodedDataLength; });
await page.goto(base, { waitUntil: "domcontentloaded" });
await page.waitForFunction(() => window.__archiveDiagnostics?.().imageCovers > 30, null, { timeout: 120000 });
await page.waitForTimeout(Number(process.argv[2] || 6000));
const t0 = Math.min(...[...reqs.values()].map((r) => r.t));
const list = [...reqs.values()].map((r) => ({ ...r, bytes: r.bytes || r.rx || 0, at: Math.round((r.t - t0) * 1000) })).sort((a, b) => b.bytes - a.bytes);
if (process.argv[3]) await writeFile(process.argv[3], JSON.stringify(list, null, 1));
const groups = {};
for (const r of list) { const k = r.url.replace(/[0-9a-f]{6,}|\d+/g, "#").replace(/[^/]*$/, (m) => m.replace(/.*\./, ".")); (groups[k] ||= { n: 0, bytes: 0 }); groups[k].n++; groups[k].bytes += r.bytes; }
console.log(list.slice(0, 15).map((r) => `${r.bytes}\t${r.at}ms\t${r.type}\t${r.url}\t<- ${r.initiator}`).join("\n"));
console.log(JSON.stringify(Object.entries(groups).sort((a, b) => b[1].bytes - a[1].bytes).slice(0, 12)));
await browser.close();
