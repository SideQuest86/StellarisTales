// Round-4 performance bench (measure only). EMULATION: no physical phone; mobile = 390x844 DPR3 + CDP 4x CPU + slow network.
//   STELLARIS_PLAYWRIGHT_PATH=<playwright/index.mjs> STELLARIS_PREVIEW_URL=http://127.0.0.1:4192/ \
//     node scripts/bench/bench.mjs <scenario[,scenario...]>      scenarios: cold, story, search, museum, audio, idle, all
// Env: BROWSER=chrome|msedge (default chrome), HEADED=1 (adds --window-position=-1900,20), REPS (default 3),
//      OUT_DIR (default verification/round4/perf), TAG (suffix for output files), PROFILE=desktop|dpr2|mobile (cold only; default all)
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const { chromium } = await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const base = process.env.STELLARIS_PREVIEW_URL || process.env.PREVIEW || "http://127.0.0.1:4192/";
const channel = process.env.BROWSER || "chrome";
const headed = !!process.env.HEADED;
const reps = Number(process.env.REPS || 3);
const outDir = process.env.OUT_DIR || "verification/round4/perf";
const tag = process.env.TAG ? `-${process.env.TAG}` : "";
await mkdir(outDir, { recursive: true });

const PROFILES = {
  desktop: { viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 },
  dpr2: { viewport: { width: 1600, height: 900 }, deviceScaleFactor: 2 },
  mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, cpu: 4, net: { latency: 150, down: 1.6 * 1024 * 1024 / 8, up: 750 * 1024 / 8 } }, // ~"slow 4G" (1.6 Mbit/s)
};
const args = ["--use-angle=d3d11", "--enable-gpu-rasterization", "--ignore-gpu-blocklist", "--enable-precise-memory-info",
  "--disable-backgrounding-occluded-windows", "--disable-renderer-backgrounding", "--disable-background-timer-throttling"];
if (headed) args.push("--window-position=-1900,20", "--window-size=1700,1000");
const launch = () => chromium.launch({ channel, headless: !headed, args });

const pct = (v, p) => { if (!v.length) return null; const s = [...v].sort((a, b) => a - b); return +s[Math.min(s.length - 1, Math.floor(p / 100 * s.length))].toFixed(1); };
const stats = (v) => ({ n: v.length, p50: pct(v, 50), p95: pct(v, 95), max: v.length ? +Math.max(...v).toFixed(1) : null });

// In-page recorder: rAF timing (only while on), lifetime counters of rAF/timer callbacks, long tasks, LoAF, image-load log.
const recorder = () => {
  const rec = (window.__b = { on: false, t: [], loaf: [], longtasks: [], raf: 0, timers: 0, intervals: 0, rafCb: 0 });
  const raf = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = (cb) => raf((t) => { rec.rafCb++; if (rec.on) rec.t.push(t); return cb(t); });
  const st = window.setTimeout.bind(window);
  window.setTimeout = (f, d, ...a) => st(typeof f === "function" ? (...x) => { rec.timers++; return f(...x); } : f, d, ...a);
  const si = window.setInterval.bind(window);
  window.setInterval = (f, d, ...a) => { rec.intervals++; return si(typeof f === "function" ? (...x) => { rec.timers++; return f(...x); } : f, d, ...a); };
  // frame-time sampler independent of app rAF use
  const loop = (time) => { if (rec.on) rec.s = (rec.s || []).concat(time); raf(loop); };
  raf(loop);
  try { new PerformanceObserver((l) => { for (const e of l.getEntries()) rec.longtasks.push({ at: e.startTime, d: e.duration }); }).observe({ type: "longtask", buffered: true }); } catch {}
  try {
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) rec.loaf.push({ at: e.startTime, d: e.duration, block: e.blockingDuration,
        scripts: e.scripts.map((s) => ({ fn: s.sourceFunctionName || s.invoker, url: (s.sourceURL || "").replace(/^.*\//, ""), ms: +s.duration.toFixed(1), fl: +s.forcedStyleAndLayoutDuration.toFixed(1) })).filter((s) => s.ms >= 5) });
    }).observe({ type: "long-animation-frame", buffered: true });
  } catch { rec.noLoaf = true; }
};

async function open(browser, profile, { network, trace } = {}) {
  const p = PROFILES[profile];
  const context = await browser.newContext({ viewport: p.viewport, deviceScaleFactor: p.deviceScaleFactor, isMobile: p.isMobile, hasTouch: p.hasTouch, serviceWorkers: "block" });
  await context.addInitScript(recorder);
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send("Performance.enable");
  await cdp.send("Network.enable");
  const net = network === "none" ? null : (network === "slow" ? PROFILES.mobile.net : p.net);
  if (net) await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: net.latency, downloadThroughput: net.down, uploadThroughput: net.up });
  if (p.cpu) await cdp.send("Emulation.setCPUThrottlingRate", { rate: p.cpu });
  const reqs = [];
  cdp.on("Network.requestWillBeSent", (e) => reqs.push({ id: e.requestId, url: e.request.url, t: e.timestamp, type: e.type }));
  cdp.on("Network.loadingFinished", (e) => { const r = reqs.find((x) => x.id === e.requestId); if (r) { r.bytes = e.encodedDataLength; r.done = e.timestamp; } });
  cdp.on("Network.dataReceived", (e) => { const r = reqs.find((x) => x.id === e.requestId); if (r) r.rx = (r.rx || 0) + e.encodedDataLength; });
  cdp.on("Network.responseReceived", (e) => { const r = reqs.find((x) => x.id === e.requestId); if (r) { r.status = e.response.status; r.mime = e.response.mimeType; r.cached = e.response.fromDiskCache; } });
  page.on("pageerror", (e) => console.error("pageerror", e.message));
  return { context, page, cdp, reqs, profile };
}
const metrics = async (cdp) => Object.fromEntries((await cdp.send("Performance.getMetrics")).metrics.map((m) => [m.name, m.value]));
const mdelta = (a, b) => ({ taskMs: +((b.TaskDuration - a.TaskDuration) * 1000).toFixed(0), scriptMs: +((b.ScriptDuration - a.ScriptDuration) * 1000).toFixed(0), layoutMs: +((b.LayoutDuration - a.LayoutDuration) * 1000).toFixed(0), styleMs: +((b.RecalcStyleDuration - a.RecalcStyleDuration) * 1000).toFixed(0), heapMB: +(b.JSHeapUsedSize / 1048576).toFixed(1), nodes: b.Nodes, listeners: b.JSEventListeners });
const summarize = (reqs, from = 0) => {
  const r = reqs.filter((x) => x.t >= from);
  const by = {};
  for (const x of r) { const k = (x.url.match(/\.(\w+)(\?|$)/)?.[1] || x.type || "other").toLowerCase(); (by[k] ||= { n: 0, bytes: 0 }); by[k].n++; by[k].bytes += x.bytes || x.rx || 0; }
  return { requests: r.length, bytes: r.reduce((s, x) => s + (x.bytes || x.rx || 0), 0), byExt: by };
};
const frames = async (page) => {
  const raw = await page.evaluate(() => { const b = window.__b; b.on = false; return { s: b.s || [], loaf: b.loaf, longtasks: b.longtasks, noLoaf: b.noLoaf }; });
  const iv = raw.s.slice(1).map((t, i) => t - raw.s[i]);
  return { frames: iv.length, ...stats(iv), over20: iv.filter((x) => x > 20).length, over34: iv.filter((x) => x > 34).length, loafN: raw.loaf.length, loafMax: raw.loaf.length ? +Math.max(...raw.loaf.map((l) => l.d)).toFixed(0) : 0, loafTop: raw.loaf.sort((a, b) => b.d - a.d).slice(0, 3), longtaskN: raw.longtasks.length, longtaskMax: raw.longtasks.length ? +Math.max(...raw.longtasks.map((l) => l.d)).toFixed(0) : 0 };
};
const start = (page) => page.evaluate(() => { Object.assign(window.__b, { on: true, s: [], loaf: [], longtasks: [] }); });
const ready = (page, timeout = 300000) => page.waitForFunction(() => document.querySelector("#open-story") && window.__archiveDiagnostics?.().imageCovers > 30, null, { timeout });

// ---- scenarios -------------------------------------------------------------------------------------------------------
async function cold(browser) {
  const out = {};
  const wanted = process.env.PROFILE ? [process.env.PROFILE] : Object.keys(PROFILES);
  for (const profile of wanted) {
    out[profile] = [];
    for (let i = 0; i < reps; i++) {
      const { context, page, cdp, reqs } = await open(browser, profile);
      await browser.startTracing(page, { categories: ["devtools.timeline", "disabled-by-default-devtools.timeline"] }).catch(() => {});
      const m0 = await metrics(cdp);
      const t0 = Date.now();
      await page.goto(base, { waitUntil: "commit" });
      await start(page);
      let interactive = null, covers = null;
      await page.waitForSelector("#open-story", { timeout: 300000 });
      const tOpenBtn = Date.now() - t0;
      await ready(page);
      covers = Date.now() - t0;
      await page.waitForTimeout(4000);
      const m1 = await metrics(cdp);
      const fr = await frames(page);
      const nav = await page.evaluate(() => { const n = performance.getEntriesByType("navigation")[0]; const fcp = performance.getEntriesByName("first-contentful-paint")[0]; const lcp = []; return { dcl: n.domContentLoadedEventEnd, load: n.loadEventEnd, fcp: fcp?.startTime ?? null }; });
      const diag = await page.evaluate(() => window.__archiveDiagnostics());
      let decode = null;
      try {
        const buf = await browser.stopTracing(); const ev = JSON.parse(buf.toString()).traceEvents || [];
        const sum = (re) => +(ev.filter((e) => e.ph === "X" && re.test(e.name)).reduce((s, e) => s + e.dur, 0) / 1000).toFixed(0);
        decode = { decodeImageMs: sum(/^Decode Image$|^ImageDecodeTask$|^Decode LazyPixelRef$/), resizeMs: sum(/^ImageUploadTask|^Resize Image/), gpuRasterMs: sum(/^RasterTask|^GPURasterTask/), decodeCount: ev.filter((e) => e.name === "Decode Image").length };
      } catch {}
      out[profile].push({ buttonVisibleMs: tOpenBtn, coversReadyMs: covers, ...nav, ...mdelta(m0, m1), ...summarize(reqs), decode, frames: fr, textures: diag.textureCount, geometries: diag.geometries, atlas: diag.atlas, framesDrawn: diag.framesDrawn });
      await context.close();
    }
    console.log("cold", profile, JSON.stringify(out[profile].map((r) => [r.buttonVisibleMs, r.coversReadyMs, r.bytes, r.requests, r.frames.max])));
  }
  return out;
}

async function story(browser, profile = "desktop") {
  const out = {};
  const { context, page, cdp, reqs } = await open(browser, profile, { network: "none" });
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await ready(page); await page.waitForTimeout(3500);
  const step = async (name, action, settle = 1500) => {
    const r0 = reqs.length; const m0 = await metrics(cdp);
    await start(page); await action(); await page.waitForTimeout(settle);
    const m1 = await metrics(cdp);
    (out[name] ||= []).push({ ...(await frames(page)), ...mdelta(m0, m1), ...summarize(reqs.slice(r0)) });
  };
  const openHash = (h) => async () => { await page.evaluate((x) => { location.hash = x; }, h); await page.waitForSelector("#reader:not([hidden]) .chapter-document", { timeout: 30000 }); };
  const close = async () => { await page.keyboard.press("Escape"); await page.waitForTimeout(900); };
  for (let i = 0; i < reps; i++) {
    await step("open story (first this page / later)", openHash("#story=cybrex"), 2500);
    await step("chapter change", async () => { await page.locator(".continuation .next-chapter").first().click(); });
    await step("back", () => page.locator("#reading-back").click());
    await step("map interaction (wheel+drag)", async () => {
      const box = await page.locator("#flow-surface").boundingBox();
      if (!box) return;
      const cx = box.x + box.width / 2, cy = box.y + box.height / 2;
      await page.mouse.move(cx, cy); await page.mouse.down();
      for (let k = 0; k < 40; k++) await page.mouse.move(cx + k * 6, cy + k * 3);
      await page.mouse.up();
      for (let k = 0; k < 6; k++) { await page.mouse.wheel(0, -200); await page.waitForTimeout(40); }
    }, 800);
    await step("close story", close, 300);
    await step("open other story", openHash("#story=curators"), 2500);
    await close();
    await step("long chapter (The Shroud utopia.3200)", openHash("#story=the-shroud&chapter=utopia.3200"), 2500);
    await close();
    await step("archive navigation (next story key)", async () => { for (let k = 0; k < 6; k++) { await page.keyboard.press("ArrowDown"); await page.waitForTimeout(120); } }, 800);
  }
  const heap = await metrics(cdp);
  await context.close();
  return { profile, steps: Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v.length > 1 ? { first: v[0], later: v.slice(1) } : { first: v[0] }])), finalHeapMB: +(heap.JSHeapUsedSize / 1048576).toFixed(1) };
}

async function search(browser, profile = "desktop") {
  const { context, page, cdp, reqs } = await open(browser, profile, { network: "none" });
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await ready(page); await page.waitForTimeout(3500);
  const out = {};
  let r0 = reqs.length; let m0 = await metrics(cdp);
  await start(page);
  await page.click("#search-open"); await page.waitForSelector("#search-dialog[open], #search-dialog:not([hidden])");
  await page.waitForTimeout(2000);
  out.open = { ...(await frames(page)), ...summarize(reqs.slice(r0)), ...mdelta(m0, await metrics(cdp)) };
  r0 = reqs.length; m0 = await metrics(cdp);
  const t0 = Date.now(); await start(page);
  await page.fill("#search-input", "crisis");
  await page.waitForFunction(() => /crisis/i.test(document.querySelector("#search-results")?.innerHTML || ""), null, { timeout: 30000 });
  out.firstQuery = { ms: Date.now() - t0, ...(await frames(page)), ...summarize(reqs.slice(r0)), shardsLoaded: reqs.slice(r0).filter((x) => /\/s\d+\.bin/.test(x.url)).length, ...mdelta(m0, await metrics(cdp)) };
  // typing latency: keystroke -> results updated, measured in page with MutationObserver
  await page.fill("#search-input", "");
  await page.waitForTimeout(500);
  const lat = [];
  for (const word of ["federation", "ancient relics", "psionic"]) {
    await page.fill("#search-input", "");
    await page.waitForTimeout(400);
    r0 = reqs.length; await start(page);
    const keys = await page.evaluate(async (w) => {
      const inp = document.querySelector("#search-input"); const res = document.querySelector("#search-results"); const out = [];
      for (const ch of w) {
        const t = performance.now(); let upd = null;
        const mo = new MutationObserver(() => { upd ??= performance.now() - t; }); mo.observe(res, { childList: true, subtree: true });
        inp.value += ch; inp.dispatchEvent(new InputEvent("input", { bubbles: true, data: ch }));
        const blocked = performance.now() - t; // synchronous handler cost
        await new Promise((r) => requestAnimationFrame(() => setTimeout(r, 0)));
        await new Promise((r) => setTimeout(r, 160));
        mo.disconnect(); out.push({ syncMs: +blocked.toFixed(1), resultUpdateMs: upd == null ? null : +upd.toFixed(1) });
      }
      return out;
    }, word);
    lat.push({ word, keys, ...(await frames(page)), ...summarize(reqs.slice(r0)) });
  }
  out.typing = lat;
  out.typingSummary = { syncMs: stats(lat.flatMap((l) => l.keys.map((k) => k.syncMs))), resultUpdateMs: stats(lat.flatMap((l) => l.keys.map((k) => k.resultUpdateMs)).filter((x) => x != null)) };
  out.totalShardBytes = summarize(reqs.filter((x) => /search\//.test(x.url)).map((x) => ({ ...x, t: 0 }))).bytes;
  await context.close();
  return out;
}

async function museum(browser, profile = "desktop") {
  const { context, page, cdp, reqs } = await open(browser, profile, { network: "none" });
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await ready(page); await page.waitForTimeout(3500);
  const out = {};
  const heapMB = async () => { await cdp.send("HeapProfiler.collectGarbage").catch(() => {}); return +((await metrics(cdp)).JSHeapUsedSize / 1048576).toFixed(1); };
  const base0 = await heapMB();
  let r0 = reqs.length; let m0 = await metrics(cdp);
  await start(page);
  await page.click("#museum-open"); await page.waitForSelector(".museum-exhibit", { timeout: 60000 });
  await page.waitForTimeout(2500);
  out.openList = { ...(await frames(page)), ...summarize(reqs.slice(r0)), ...mdelta(m0, await metrics(cdp)), exhibits: await page.locator(".museum-exhibit").count(), imgs: await page.locator(".museum-exhibit img").count() };
  // scroll the list
  await start(page);
  await page.evaluate(async () => { const el = document.querySelector(".museum-grid")?.closest("[class*=museum]") ; const sc = [...document.querySelectorAll("*")].find((e) => e.scrollHeight > e.clientHeight + 400 && getComputedStyle(e).overflowY !== "visible" && e.closest("#museum, .museum")) || document.scrollingElement; for (let i = 0; i < 30; i++) { sc.scrollTop += 600; await new Promise((r) => setTimeout(r, 50)); } sc.scrollTop = 0; });
  out.scrollList = await frames(page);
  // 3D only filter, then open 10 models in sequence
  // (v4.7.0+: the filter is hidden while every specimen has a model)
  if (await page.locator("[data-toggle3d]").count()) { await page.locator("[data-toggle3d]").click(); await page.waitForTimeout(500); }
  const keys = await page.$$eval(".museum-exhibit", (els) => els.map((e) => e.dataset.key));
  out.visible3d = keys.length;
  const picks = keys.filter((_, i) => i % Math.max(1, Math.floor(keys.length / 10)) === 0).slice(0, 10);
  const seq = [];
  for (const key of picks) {
    r0 = reqs.length; m0 = await metrics(cdp); await start(page);
    const t0 = Date.now();
    await page.locator(`.museum-exhibit[data-key="${key}"]`).click();
    await page.waitForFunction((k) => { const d = window.__museumViewer?.(); return d && d.url && d.pending === 0 && document.querySelector(".museum-viewer canvas"); }, key, { timeout: 60000 }).catch(() => {});
    await page.waitForTimeout(700);
    const d = await page.evaluate(() => window.__museumViewer?.());
    const f = await frames(page); const s = summarize(reqs.slice(r0));
    seq.push({ key, loadMs: Date.now() - t0 - 700, maxFrame: f.max, p95: f.p95, loafMax: f.loafMax, bytes: s.bytes, requests: s.requests, geometries: d?.geometries, textures: d?.textures, cached: d?.cached?.length, heapMB: +(((await metrics(cdp)).JSHeapUsedSize) / 1048576).toFixed(1) });
  }
  out.sequence = seq;
  out.modelsSummary = { loadMs: stats(seq.map((s) => s.loadMs)), maxFrame: stats(seq.map((s) => s.maxFrame)), bytes: stats(seq.map((s) => s.bytes)) };
  // close viewer & museum, check release + idle rAF
  await page.keyboard.press("Escape").catch(() => {}); await page.waitForTimeout(500);
  const detailClose = page.locator("[data-close-detail]"); if (await detailClose.isVisible().catch(() => false)) await detailClose.click();
  await page.locator("[data-close]").first().click().catch(() => {}); await page.waitForTimeout(1200);
  const after = await page.evaluate(() => window.__museumViewer?.());
  const idle = await idleProbe(page, cdp, 5000);
  out.afterClose = { viewer: after && { geometries: after.geometries, textures: after.textures, cached: after.cached?.length, url: after.url }, heapBeforeMB: base0, heapAfterGcMB: await heapMB(), idle5s: idle };
  // second pass: repeat 10 opens to detect growth
  await page.click("#museum-open"); await page.waitForSelector(".museum-exhibit"); await page.locator("[data-toggle3d]").click().catch(() => {}); await page.waitForTimeout(400);
  for (const key of picks) { await page.locator(`.museum-exhibit[data-key="${key}"]`).click(); await page.waitForTimeout(900); }
  const d2 = await page.evaluate(() => window.__museumViewer?.());
  out.secondPass = { geometries: d2?.geometries, textures: d2?.textures, cached: d2?.cached?.length, heapAfterGcMB: await heapMB() };
  await context.close();
  return out;
}

async function idleProbe(page, cdp, ms) {
  const c0 = await page.evaluate(() => ({ raf: window.__b.rafCb, timers: window.__b.timers, hidden: document.hidden }));
  const m0 = await metrics(cdp); const t0 = Date.now();
  await page.waitForTimeout(ms);
  const m1 = await metrics(cdp); const c1 = await page.evaluate(() => ({ raf: window.__b.rafCb, timers: window.__b.timers, hidden: document.hidden, framesDrawn: window.__archiveDiagnostics?.().framesDrawn }));
  const s = (Date.now() - t0) / 1000;
  return { seconds: +s.toFixed(1), rafPerSec: +((c1.raf - c0.raf) / s).toFixed(1), timersPerSec: +((c1.timers - c0.timers) / s).toFixed(2), cpuTaskMsPerSec: +(((m1.TaskDuration - m0.TaskDuration) * 1000) / s).toFixed(1), scriptMsPerSec: +(((m1.ScriptDuration - m0.ScriptDuration) * 1000) / s).toFixed(1), hiddenAtEnd: c1.hidden, archiveFramesDrawn: c1.framesDrawn };
}

async function audio(browser, profile = "desktop") {
  const { context, page, cdp, reqs } = await open(browser, profile, { network: "none" });
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await ready(page); await page.waitForTimeout(4000);
  const music = () => reqs.filter((x) => /music\//.test(x.url)).map((x) => ({ url: x.url.replace(/^.*music\//, ""), bytes: x.bytes || x.rx, status: x.status }));
  const out = { afterLoadNoGesture: { music: music(), audioState: await page.evaluate(() => { const a = document.querySelector("#ost-audio"); return { preload: a.preload, src: a.src.replace(/^.*\//, ""), paused: a.paused, readyState: a.readyState, buffered: a.buffered.length ? a.buffered.end(0) : 0 }; }) } };
  await page.click("#play-pause"); await page.waitForTimeout(4000);
  const st = () => page.evaluate(() => { const a = document.querySelector("#ost-audio"); return { paused: a.paused, t: +a.currentTime.toFixed(1), buffered: a.buffered.length ? +a.buffered.end(a.buffered.length - 1).toFixed(0) : 0, duration: +a.duration.toFixed(0) }; });
  out.afterPlay4s = { state: await st(), music: music() };
  const m0 = await metrics(cdp); await start(page); await page.waitForTimeout(5000);
  out.playingFrames = await frames(page); out.playingCost = mdelta(m0, await metrics(cdp));
  await page.click("#play-pause"); await page.waitForTimeout(800);
  out.afterPause = await st();
  await page.click("#track-next"); await page.waitForTimeout(800); await page.click("#play-pause"); await page.waitForTimeout(3000);
  out.afterNextPlay = { state: await st(), music: music(), totalMusicBytes: music().reduce((s, x) => s + (x.bytes || 0), 0) };
  await context.close();
  return out;
}

async function idle(browser) {
  // Needs HEADED=1 for a real hidden tab (second page brought to front). Headless falls back to a visibility override.
  const out = {};
  for (const profile of ["desktop", "mobile"]) {
    const { context, page, cdp } = await open(browser, profile, { network: "none" });
    await page.goto(base, { waitUntil: "domcontentloaded" });
    await ready(page); await page.waitForTimeout(8000);
    const visible = await idleProbe(page, cdp, 30000);
    let hidden;
    if (headed) {
      const other = await context.newPage(); await other.goto("about:blank"); await other.bringToFront(); await page.waitForTimeout(1500);
      hidden = await idleProbe(page, cdp, 30000); hidden.realHidden = true;
      await page.bringToFront(); await other.close();
    } else {
      await page.evaluate(() => { Object.defineProperty(document, "hidden", { value: true, configurable: true }); Object.defineProperty(document, "visibilityState", { value: "hidden", configurable: true }); document.dispatchEvent(new Event("visibilitychange")); });
      await page.waitForTimeout(1500);
      hidden = await idleProbe(page, cdp, 30000); hidden.realHidden = false; hidden.note = "visibility override only (headless)";
    }
    out[profile] = { visibleArchive30s: visible, hiddenTab30s: hidden, heapMB: +((await metrics(cdp)).JSHeapUsedSize / 1048576).toFixed(1) };
    console.log("idle", profile, JSON.stringify(out[profile]));
    await context.close();
  }
  return out;
}

const table = { cold, story, search, museum, audio, idle };
const names = (process.argv[2] || "all").split(",").flatMap((n) => (n === "all" ? Object.keys(table) : [n]));
const browser = await launch();
const version = browser.version();
for (const n of names) {
  const t0 = Date.now();
  let result;
  // SCENARIO_PROFILE=dpr2|mobile runs story / search / museum / audio under that profile (cold and idle pick their own).
  const scenarioProfile = !["cold", "idle"].includes(n) && process.env.SCENARIO_PROFILE;
  try { result = await (scenarioProfile ? table[n](browser, scenarioProfile) : table[n](browser)); } catch (e) { result = { error: String(e.stack || e) }; console.error(n, "failed", e.message); }
  const file = `${outDir}/${n}-${channel}${tag}.json`;
  await writeFile(file, JSON.stringify({ measuredAt: new Date().toISOString(), emulation: "desktop browser; mobile profile is emulation only (no physical phone)", browser: `${channel} ${version}`, headed, url: base, reps, seconds: Math.round((Date.now() - t0) / 1000), result }, null, 1));
  console.log(n, "->", file);
}
await browser.close();


