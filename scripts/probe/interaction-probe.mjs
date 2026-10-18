// Adversarial interaction probe (round 4). Usage: node scripts/probe/interaction-probe.mjs [scenario...]
// Needs: node scripts/serve.mjs --port 4193. Writes verification/round4/interaction/results.json + screenshots.
import { pathToFileURL } from "node:url";
import { mkdir, writeFile } from "node:fs/promises";
const PW = process.env.STELLARIS_PLAYWRIGHT_PATH || "C:/Users/wangp/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";
const { chromium } = await import(pathToFileURL(PW).href);
const base = process.env.STELLARIS_PREVIEW_URL || "http://127.0.0.1:4193/";
const out = "verification/round4/interaction";
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true, args: ["--enable-unsafe-swiftshader", "--js-flags=--expose-gc"] });
const results = {};
const wait = (p, ms) => p.waitForTimeout(ms);
async function fresh(opts = {}) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
  const page = await context.newPage();
  const log = { errors: [], console: [], failed: [] };
  page.on("pageerror", (e) => log.errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") log.console.push(m.text().slice(0, 160)); });
  page.on("requestfailed", (r) => log.failed.push(r.url().replace(base, "")));
  return { context, page, log };
}
const state = (page) => page.evaluate(() => ({
  hash: location.hash,
  readerHidden: document.querySelector("#reader").hidden,
  bodyOpen: document.body.classList.contains("reader-open"),
  doc: document.querySelector(".chapter-document")?.dataset.doc || null,
  hudInert: document.querySelector("#archive-hud").inert,
  catInert: document.querySelector("#categories").inert,
  readerInert: document.querySelector("#reader").inert,
  prewarm: document.querySelector("#reader").classList.contains("prewarm"),
  museumOpen: !!document.querySelector("#museum.open"),
  active: document.activeElement?.id || document.activeElement?.className || document.activeElement?.tagName,
  nodes: document.getElementsByTagName("*").length,
  readerOpacity: getComputedStyle(document.querySelector("#reader")).opacity,
  readerDisplay: getComputedStyle(document.querySelector("#reader")).display,
}));
async function boot(page, hash = "") {
  await page.goto(base + hash, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#open-story");
  await wait(page, 600);
}
const scenarios = {
  async rapidOpenEscape() {
    const { context, page, log } = await fresh();
    await boot(page);
    const bad = [];
    for (let i = 0; i < 20; i++) {
      await page.click("#open-story");
      await wait(page, 20 + (i % 5) * 40);
      await page.keyboard.press("Escape");
      await wait(page, 30);
    }
    await wait(page, 1500);
    const s = await state(page);
    if (!s.readerHidden || s.bodyOpen || s.hudInert || s.catInert) bad.push(["stuck after Escape-race", s]);
    // reverse: Escape at various delays then check the story is not reopened later (late load)
    await page.screenshot({ path: `${out}/rapid-open-escape.png` });
    await context.close();
    return { bad, log, final: s };
  },
  async openDifferentFast() {
    const { context, page, log } = await fresh();
    await boot(page);
    const bad = [];
    for (let i = 0; i < 6; i++) {
      await page.click("#next-story");
      await page.click("#open-story");
      await wait(page, 30);
    }
    await wait(page, 2500);
    const s = await state(page);
    const title = await page.textContent("#dossier-title");
    const sel = await page.textContent("#selected-title");
    if (s.readerHidden) bad.push(["reader not open", s]);
    await page.screenshot({ path: `${out}/open-different.png` });
    await context.close();
    return { bad, log, s, title, sel };
  },
  async memory() {
    const { context, page, log } = await fresh();
    await boot(page);
    const cdp = await context.newCDPSession(page);
    await cdp.send("HeapProfiler.enable");
    const heap = async () => { await cdp.send("HeapProfiler.collectGarbage"); await cdp.send("HeapProfiler.collectGarbage"); return (await cdp.send("Runtime.getHeapUsage")).usedSize; };
    const sample = [];
    for (let i = 0; i < 31; i++) {
      await page.click("#open-story");
      await page.waitForSelector("#reader:not([hidden]) .chapter-document", { timeout: 15000 });
      await wait(page, 500);
      await page.keyboard.press("Escape");
      await wait(page, 500);
      if (i % 5 === 0) sample.push({ i, heapMB: +((await heap()) / 1048576).toFixed(2), nodes: (await state(page)).nodes, listeners: (await cdp.send("Memory.getDOMCounters")).jsEventListeners });
    }
    await context.close();
    return { sample, log };
  },
  async directLinks() {
    const { context, page, log } = await fresh();
    const rows = [];
    await boot(page, "#story=cetana");
    await page.waitForSelector(".chapter-document", { timeout: 20000 });
    rows.push(["cold story", await state(page)]);
    // hash change while open to other story
    await page.evaluate(() => (location.hash = "story=the-shroud"));
    await wait(page, 1500);
    rows.push(["story->story", await state(page), await page.textContent("#dossier-title")]);
    await page.evaluate(() => (location.hash = "museum"));
    await wait(page, 2500);
    rows.push(["story->museum", await state(page)]);
    await page.evaluate(() => (location.hash = "story=cetana"));
    await wait(page, 2000);
    rows.push(["museum->story", await state(page)]);
    await page.goBack(); await wait(page, 1500);
    rows.push(["back1", await state(page)]);
    await page.goBack(); await wait(page, 1500);
    rows.push(["back2", await state(page)]);
    await page.goForward(); await wait(page, 1500);
    rows.push(["fwd", await state(page)]);
    await page.evaluate(() => (location.hash = "story=does-not-exist"));
    await wait(page, 1500);
    rows.push(["bad story", await state(page), await page.textContent("#toast")]);
    await page.evaluate(() => (location.hash = "museum=nonexistent-key"));
    await wait(page, 2000);
    rows.push(["bad museum key", await state(page), await page.textContent("#toast")]);
    await page.evaluate(() => (location.hash = "story=cetana&chapter=bogus"));
    await wait(page, 2000);
    rows.push(["bad chapter", await state(page), await page.textContent("#toast")]);
    await page.screenshot({ path: `${out}/direct-links.png` });
    await context.close();
    return { rows, log };
  },
  async museumRapid() {
    const { context, page, log } = await fresh();
    await boot(page, "#museum");
    await page.waitForSelector("#museum.open .museum-exhibit", { timeout: 20000 });
    const keys = await page.$$eval(".museum-exhibit", (els) => els.slice(0, 12).map((e) => e.dataset.key));
    for (const k of keys) { await page.locator(`.museum-exhibit[data-key="${k}"]`).click().catch(() => {}); await wait(page, 40); }
    await wait(page, 4000);
    const last = await page.evaluate(() => ({ v: window.__museumViewer?.()?.url, active: document.querySelector(".museum-exhibit.active")?.dataset.key, ready: !!document.querySelector(".museum-viewer.ready") }));
    // close/open cycles with Escape
    const cyc = [];
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press("Escape"); await wait(page, 60 * (i % 3));
      cyc.push(await page.evaluate(() => ({ open: !!document.querySelector("#museum.open"), hash: location.hash })));
      await page.evaluate(() => (location.hash = "museum")); await wait(page, 300);
    }
    await page.screenshot({ path: `${out}/museum-rapid.png` });
    await context.close();
    return { keysLast: keys.at(-1), last, cyc, log };
  },
  async loadFailures() {
    const { context, page, log } = await fresh();
    let blockStory = true, blockExc = true;
    await page.route(/stories\/cetana\.json/, (r) => (blockStory ? r.abort() : r.continue()));
    await page.route(/stories\/names\.json/, (r) => r.continue());
    await boot(page);
    // select cetana: it's columns[2].stories[0]? use hash link
    await page.evaluate(() => (location.hash = "story=cetana"));
    await wait(page, 1500);
    const a = await state(page); const toastA = await page.textContent("#toast");
    blockStory = false;
    await page.evaluate(() => { location.hash = ""; }); await wait(page, 300);
    await page.evaluate(() => (location.hash = "story=cetana"));
    await page.waitForSelector(".chapter-document", { timeout: 15000 }).catch(() => {});
    const b = await state(page);
    await page.screenshot({ path: `${out}/load-failure-recovery.png` });
    // museum GLB abort
    await page.route(/\.glb/, (r) => r.abort());
    await page.evaluate(() => (location.hash = "museum"));
    await page.waitForSelector("#museum.open .museum-exhibit", { timeout: 20000 });
    await page.locator(".museum-exhibit").nth(0).click();
    await wait(page, 3000);
    const viewerMsg = await page.evaluate(() => document.querySelector(".museum-viewer")?.className + " | " + (document.querySelector(".museum-viewer")?.innerText || "").slice(0, 120));
    await page.screenshot({ path: `${out}/glb-abort.png` });
    await page.unroute(/\.glb/);
    await context.close();
    return { afterFail: a, toastA, afterRecovery: b, viewerMsg, log };
  },
  async storageFail() {
    const rows = {};
    for (const mode of ["throw", "corrupt", "full"]) {
      const { context, page, log } = await fresh();
      await context.addInitScript((m) => {
        if (m === "throw") { Storage.prototype.getItem = () => { throw new Error("denied"); }; Storage.prototype.setItem = () => { throw new Error("denied"); }; }
        if (m === "full") Storage.prototype.setItem = () => { throw new DOMException("quota", "QuotaExceededError"); };
        if (m === "corrupt") {
          const orig = Storage.prototype.getItem;
          Storage.prototype.getItem = function (k) { return k.startsWith("st-") || /progress/.test(k) ? "{not json[[" : orig.call(this, k); };
        }
      }, mode);
      await boot(page);
      let ok = true, err = null;
      try {
        await page.click("#open-story");
        await page.waitForSelector("#reader:not([hidden]) .chapter-document", { timeout: 15000 });
        await page.locator(".continuation .next-chapter:visible").first().click().catch(() => {});
        await wait(page, 600);
        await page.click("#reader-language"); await wait(page, 500);
        await page.keyboard.press("Escape"); await wait(page, 800);
        await page.reload({ waitUntil: "domcontentloaded" }); await wait(page, 1500);
      } catch (e) { ok = false; err = e.message.split("\n")[0]; }
      rows[mode] = { ok, err, errors: log.errors, console: log.console, st: await state(page).catch(() => null), title: await page.textContent("#selected-title").catch(() => null) };
      await page.screenshot({ path: `${out}/storage-${mode}.png` });
      await context.close();
    }
    return rows;
  },
  async audioFail() {
    const { context, page, log } = await fresh();
    await page.route(/\/music\/.*\.mp3/, (r) => r.abort());
    await boot(page);
    await page.click("#play-pause"); await wait(page, 2000);
    const a = await page.evaluate(() => ({ label: document.querySelector("#play-pause").getAttribute("aria-label"), text: document.querySelector("#play-pause").textContent, toast: document.querySelector("#toast").textContent, title: document.querySelector("#track-title").textContent }));
    await page.click("#play-pause"); await wait(page, 1000);
    await page.click("#track-next"); await wait(page, 1000);
    const b = await page.evaluate(() => ({ label: document.querySelector("#play-pause").getAttribute("aria-label"), toast: document.querySelector("#toast").textContent }));
    await context.close();
    // autoplay refusal
    const c2 = await fresh();
    await c2.page.addInitScript(() => { HTMLMediaElement.prototype.play = () => Promise.reject(new DOMException("blocked", "NotAllowedError")); });
    await boot(c2.page);
    await c2.page.click("#play-pause"); await wait(c2.page, 1000);
    const c = await c2.page.evaluate(() => ({ label: document.querySelector("#play-pause").getAttribute("aria-label"), toast: document.querySelector("#toast").textContent }));
    await c2.context.close();
    return { blocked: a, afterNext: b, autoplayRefused: c, log, log2: c2.log };
  },
  async resizeDuringOpen() {
    const { context, page, log } = await fresh({ viewport: { width: 390, height: 844 } });
    await boot(page);
    const rows = [];
    for (let i = 0; i < 6; i++) {
      await page.click("#open-story");
      await wait(page, 60);
      await page.setViewportSize(i % 2 ? { width: 390, height: 844 } : { width: 844, height: 390 });
      await wait(page, 700);
      rows.push(await state(page));
      await page.keyboard.press("Escape"); await wait(page, 900);
      if (!(await state(page)).readerHidden) { rows.push("ESCAPE IGNORED"); await page.keyboard.press("Escape"); await wait(page, 900); }
    }
    await page.setViewportSize({ width: 844, height: 390 });
    await page.click("#open-story"); await wait(page, 1500);
    await page.screenshot({ path: `${out}/landscape-reader.png` });
    const overflow = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
    await context.close();
    return { rows, overflow, log };
  },
  async reducedMotion() {
    const { context, page, log } = await fresh({ reducedMotion: "reduce" });
    await boot(page);
    const rows = [];
    for (let i = 0; i < 5; i++) {
      await page.click("#open-story", { timeout: 3000 }).catch(() => rows.push("open click blocked at " + i)); await wait(page, 100 * i);
      await page.keyboard.press("Escape"); await wait(page, 1500);
      if (!(await state(page)).readerHidden) { rows.push("reader open after Escape at delay " + 100 * i); await page.keyboard.press("Escape"); await wait(page, 800); }
    }
    await wait(page, 1000);
    rows.push(await state(page));
    await page.click("#open-story"); await page.waitForSelector(".chapter-document"); await wait(page, 500);
    rows.push(await state(page));
    await context.close();
    return { rows, log };
  },
  async touch() {
    const { context, page, log } = await fresh({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
    await boot(page);
    await page.tap("#open-story");
    await page.waitForSelector(".chapter-document", { timeout: 15000 });
    await wait(page, 800);
    const rows = [];
    rows.push(await state(page));
    // swipe on the reader
    const b = await page.locator(".reader-panel").boundingBox();
    const cdp = await context.newCDPSession(page);
    await cdp.send("Input.synthesizeScrollGesture", { x: b.x + b.width / 2, y: b.y + b.height * 0.7, yDistance: -300, gestureSourceType: "touch" });
    await wait(page, 400);
    const choice = page.locator(".choice-button").first();
    if (await choice.count()) { await choice.tap(); await wait(page, 400); rows.push(await choice.getAttribute("aria-expanded")); }
    await page.tap("#chapter-toggle").catch(() => {});
    await wait(page, 600);
    await page.screenshot({ path: `${out}/touch-map.png` });
    await page.tap("#close-reader").catch((e) => rows.push("close tap failed " + e.message.slice(0, 80)));
    await wait(page, 800);
    rows.push(await state(page));
    await context.close();
    return { rows, log };
  },
  async langProfileMidSearch() {
    const { context, page, log } = await fresh();
    await boot(page);
    const rows = [];
    await page.click("#search-open"); await page.fill("#search-input", "ship"); await wait(page, 1500);
    rows.push(["search count zh", await page.textContent("#search-count")]);
    await page.evaluate(() => document.querySelector("#language").click());
    await wait(page, 1000);
    rows.push(["after lang switch", await page.textContent("#search-count"), await page.evaluate(() => document.querySelector("#search-dialog").open), await page.evaluate(() => document.activeElement.id)]);
    await page.click("#search-results a, #search-results button, #search-results [data-story]", { timeout: 3000 }).catch((e) => rows.push("click result failed"));
    await wait(page, 2000);
    rows.push(["after result click", await state(page), await page.evaluate(() => document.querySelector("#search-dialog").open)]);
    // lang switch mid reading
    const before = await page.textContent(".chapter-document h1").catch(() => null);
    await page.click("#reader-language").catch(() => {}); await wait(page, 800);
    const after = await page.textContent(".chapter-document h1").catch(() => null);
    rows.push(["reader lang", before, after, await state(page)]);
    // rapid toggles
    for (let i = 0; i < 8; i++) { await page.click("#reader-language").catch(() => {}); }
    await wait(page, 800);
    rows.push(["rapid lang", await state(page), await page.evaluate(() => document.documentElement.lang)]);
    await page.screenshot({ path: `${out}/lang-mid.png` });
    await context.close();
    return { rows, log };
  },
  async slowNetworkRace() {
    const { context, page, log } = await fresh();
    await page.route(/stories\/(cetana|the-shroud)\.json/, async (r) => { await new Promise((s) => setTimeout(s, r.request().url().includes("cetana") ? 3000 : 300)); r.continue(); });
    await boot(page);
    await page.evaluate(() => (location.hash = "story=cetana"));
    await wait(page, 200);
    await page.evaluate(() => (location.hash = "story=the-shroud"));
    await wait(page, 5000);
    const s = await state(page); const t = await page.textContent("#dossier-title");
    // open then close before slow load completes
    const p2 = await fresh();
    await p2.page.route(/stories\/cetana\.json/, async (r) => { await new Promise((s) => setTimeout(s, 2500)); r.continue(); });
    await boot(p2.page, "");
    await p2.page.evaluate(() => (location.hash = "story=cetana"));
    await wait(p2.page, 300);
    await p2.page.evaluate(() => (location.hash = ""));
    await wait(p2.page, 4000);
    const s2 = await state(p2.page);
    await context.close(); await p2.context.close();
    return { raceFinal: s, title: t, closedBeforeLoad: s2, log };
  },
  async keyboardNav() {
    const { context, page, log } = await fresh();
    await boot(page);
    const rows = [];
    await page.focus("#open-story");
    await page.keyboard.press("Enter");
    await page.waitForSelector(".chapter-document", { timeout: 15000 });
    await wait(page, 800);
    rows.push(["opened", await state(page)]);
    // tab through reader; check focus never lands on inert/hidden HUD
    const seen = [];
    for (let i = 0; i < 25; i++) { await page.keyboard.press("Tab"); seen.push(await page.evaluate(() => { const a = document.activeElement; return (a.id || a.className || a.tagName).toString().slice(0, 40) + (a.closest("#archive-hud,#categories") ? " <HUD>" : ""); })); }
    rows.push(["tabs", seen]);
    await page.keyboard.press("Escape"); await wait(page, 900);
    rows.push(["after esc", await state(page)]);
    await page.keyboard.press("/"); await wait(page, 400);
    rows.push(["slash search", await page.evaluate(() => document.querySelector("#search-dialog").open)]);
    await page.keyboard.press("Escape"); await wait(page, 400);
    rows.push(["esc search", await state(page), await page.evaluate(() => document.querySelector("#search-dialog").open)]);
    await context.close();
    return { rows, log };
  },
};
scenarios.listenerLeak = async () => {
  const { context, page, log } = await fresh();
  await context.addInitScript(() => {
    const live = new Map(); const id = new WeakMap(); let n = 0;
    const key = (t, type, fn, cap) => { if (!id.has(t)) id.set(t, ++n); if (typeof fn === "function" && !id.has(fn)) id.set(fn, ++n); return `${t.constructor?.name}:${t.id || t.className?.baseVal || t.className || ""}|${type}|${typeof fn === "function" ? id.get(fn) : "obj"}|${!!(cap === true || cap?.capture)}`; };
    const add = EventTarget.prototype.addEventListener, rem = EventTarget.prototype.removeEventListener;
    EventTarget.prototype.addEventListener = function (type, fn, o) { const b = key(this, type, fn, o).replace(/\|\d+\|/, "|*|"); live.set(b, (live.get(b) || 0) + 1); return add.call(this, type, fn, o); };
    EventTarget.prototype.removeEventListener = function (type, fn, o) { const b = key(this, type, fn, o).replace(/\|\d+\|/, "|*|"); live.set(b, (live.get(b) || 0) - 1); return rem.call(this, type, fn, o); };
    window.__live = () => Object.fromEntries([...live].filter(([k]) => k.includes("|*|")));
  });
  await boot(page);
  const snap = () => page.evaluate(() => window.__live());
  await page.click("#open-story"); await page.waitForSelector(".chapter-document"); await wait(page, 600); await page.keyboard.press("Escape"); await wait(page, 600);
  const a = await snap();
  for (let i = 0; i < 6; i++) { await page.click("#open-story"); await page.waitForSelector(".chapter-document"); await wait(page, 600); await page.keyboard.press("Escape"); await wait(page, 600); }
  const b = await snap();
  const grew = {}; for (const k of Object.keys(b)) if ((b[k] || 0) !== (a[k] || 0)) grew[k] = (b[k] || 0) - (a[k] || 0);
  await context.close();
  return { grew, log };
};
scenarios.storageFail2 = async () => { return scenarios.storageFail(); };
scenarios.escapeBeforeLoad = async () => {
  const { context, page, log } = await fresh();
  await page.route(/stories\/[^/]+\.json/, async (r) => { if (!/index|excerpts|names|records/.test(r.request().url())) await new Promise((s) => setTimeout(s, 1500)); r.continue(); });
  await boot(page);
  await page.click("#open-story"); await wait(page, 300);
  const mid = await state(page);
  await page.keyboard.press("Escape"); await wait(page, 3500);
  const after = await state(page);
  await page.screenshot({ path: `${out}/escape-before-load.png` });
  // same via browser Back (hash cleared)
  await page.keyboard.press("Escape"); await wait(page, 900);
  await page.click("#next-story"); await page.click("#open-story"); await wait(page, 200);
  await page.evaluate(() => (location.hash = "")); await wait(page, 3500);
  const afterBack = await state(page);
  await context.close();
  return { mid, after, afterBack, log };
};
scenarios.resizeDuringOpen2 = async () => {
  const { context, page, log } = await fresh({ viewport: { width: 390, height: 844 } });
  await boot(page);
  const rows = [];
  for (let i = 0; i < 6; i++) {
    try {
      await page.click("#open-story", { timeout: 4000 });
      await wait(page, 60);
      await page.setViewportSize(i % 2 ? { width: 390, height: 844 } : { width: 844, height: 390 });
      await wait(page, 900);
      const s = await state(page);
      rows.push({ i, open: !s.readerHidden, op: s.readerOpacity, ov: await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth) });
      await page.keyboard.press("Escape"); await wait(page, 900);
    } catch (e) { rows.push({ i, err: e.message.split("\n")[0], st: await state(page) }); await page.keyboard.press("Escape"); await wait(page, 900); }
  }
  await page.setViewportSize({ width: 844, height: 390 });
  await page.screenshot({ path: `${out}/resize-end.png` });
  await context.close();
  return { rows, log };
};
scenarios.landscapeReach = async () => {
  const { context, page, log } = await fresh({ viewport: { width: 844, height: 390 }, hasTouch: true, isMobile: true });
  await boot(page);
  const info = await page.evaluate(() => { const b = document.querySelector("#open-story"); const r = b.getBoundingClientRect(); const top = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return { rect: [r.x, r.y, r.width, r.height].map(Math.round), vh: innerHeight, topEl: top && (top.id || top.className || top.tagName), pe: getComputedStyle(b).pointerEvents, scrollH: document.documentElement.scrollHeight, bodyOverflow: getComputedStyle(document.body).overflow }; });
  await page.screenshot({ path: `${out}/landscape-archive.png` });
  const tapped = await page.tap("#open-story", { timeout: 4000 }).then(() => "ok").catch((e) => e.message.split("\n").slice(0, 6).join(" | "));
  await context.close();
  return { info, tapped, log };
};
scenarios.museumEscape = async () => {
  const { context, page, log } = await fresh();
  await boot(page, "#museum");
  await page.waitForSelector("#museum.open .museum-exhibit", { timeout: 20000 });
  const rows = [];
  const snap = () => page.evaluate(() => ({ open: !!document.querySelector("#museum.open"), hash: location.hash, active: (document.activeElement?.id || document.activeElement?.className || document.activeElement?.tagName).toString().slice(0, 40), inMuseum: !!document.activeElement?.closest("#museum") }));
  rows.push(["cold #museum", await snap()]);
  await page.keyboard.press("Escape"); await wait(page, 500); rows.push(["Escape on cold open", await snap()]);
  await page.evaluate(() => (location.hash = "museum")); await wait(page, 1500); rows.push(["reopen via hash", await snap()]);
  await page.keyboard.press("Escape"); await wait(page, 500); rows.push(["Escape after reopen", await snap()]);
  // open from archive button, then click exhibit, Escape twice
  await page.evaluate(() => (location.hash = "")); await wait(page, 500);
  await page.click("#museum-open"); await wait(page, 1500); rows.push(["via nav button", await snap()]);
  await page.locator(".museum-exhibit").first().click(); await wait(page, 1500); rows.push(["exhibit open", await snap()]);
  await page.keyboard.press("Escape"); await wait(page, 500); rows.push(["Esc1", await snap()]);
  await page.keyboard.press("Escape"); await wait(page, 500); rows.push(["Esc2", await snap()]);
  await page.keyboard.press("Escape"); await wait(page, 500); rows.push(["Esc3", await snap()]);
  await context.close();
  return { rows, log };
};
scenarios.glbAbortRetry = async () => {
  const { context, page, log } = await fresh();
  let block = true;
  await page.route(/\.glb/, (r) => (block ? r.abort() : r.continue()));
  await boot(page, "#museum");
  await page.waitForSelector("#museum.open .museum-exhibit", { timeout: 20000 });
  const keys = await page.$$eval(".museum-exhibit", (e) => e.slice(0, 3).map((x) => x.dataset.key));
  const info = () => page.evaluate(() => ({ viewer: (document.querySelector(".museum-viewer")?.className || "none"), txt: (document.querySelector(".museum-viewer")?.innerText || "").replace(/\s+/g, " ").slice(0, 140), diag: window.__museumViewer?.()?.url, panel: !!document.querySelector(".museum-detail,[data-detail]") }));
  const rows = [];
  await page.locator(`.museum-exhibit[data-key="${keys[0]}"]`).click(); await wait(page, 2500); rows.push(["blocked", await info()]);
  await page.screenshot({ path: `${out}/glb-abort.png` });
  block = false;
  await page.locator(`.museum-exhibit[data-key="${keys[1]}"]`).click(); await wait(page, 4000); rows.push(["other exhibit after unblock", await info()]);
  await page.locator(`.museum-exhibit[data-key="${keys[0]}"]`).click(); await wait(page, 4000); rows.push(["retry first", await info()]);
  await context.close();
  return { rows, log };
};
scenarios.shardAbort = async () => {
  const { context, page, log } = await fresh();
  let block = true;
  await page.route(/museum\/specimens\.json/, (r) => (block ? r.abort() : r.continue()));
  await boot(page, "#museum"); await wait(page, 2500);
  const a = await page.evaluate(() => ({ open: !!document.querySelector("#museum.open"), txt: (document.querySelector("#museum")?.innerText || "").replace(/\s+/g, " ").slice(0, 200), toast: document.querySelector("#toast").textContent }));
  await page.screenshot({ path: `${out}/museum-data-abort.png` });
  block = false;
  await page.evaluate(() => (location.hash = "")); await wait(page, 500);
  await page.evaluate(() => (location.hash = "museum")); await wait(page, 3500);
  const b = await page.evaluate(() => ({ open: !!document.querySelector("#museum.open"), n: document.querySelectorAll(".museum-exhibit").length }));
  await context.close();
  return { a, b, log };
};
scenarios.imageFontAbort = async () => {
  const { context, page, log } = await fresh();
  await page.route(/\.(webp|png|jpg|woff2?)(\?|$)/, (r) => r.abort());
  await boot(page, "#story=cetana");
  await page.waitForSelector(".chapter-document", { timeout: 20000 });
  await wait(page, 1500);
  const s = await page.evaluate(() => ({ title: document.querySelector("#reader-title")?.textContent, brokenImgs: [...document.images].filter((i) => i.complete && !i.naturalWidth).length, firstBroken: [...document.images].filter((i) => i.complete && !i.naturalWidth).slice(0, 3).map((i) => ({ alt: i.alt, w: i.width, h: i.height, cls: i.className })) }));
  await page.screenshot({ path: `${out}/images-aborted.png` });
  await context.close();
  return { s, log: { errors: log.errors, failedN: log.failed.length } };
};
scenarios.fastChapters = async () => {
  const { context, page, log } = await fresh();
  await boot(page, "#story=cetana");
  await page.waitForSelector(".chapter-document", { timeout: 20000 });
  await wait(page, 800);
  const rows = [];
  const docs = [];
  // rapid next x5 then back x3 with no waits
  for (let i = 0; i < 5; i++) { await page.locator(".continuation .next-chapter:visible").first().click({ timeout: 2000 }).catch(() => {}); }
  await wait(page, 1500); rows.push(["after 5 fast next", await state(page)]);
  for (let i = 0; i < 3; i++) await page.locator("#reading-back").click({ timeout: 2000 }).catch(() => {});
  await wait(page, 1500); rows.push(["after 3 fast back", await state(page), await page.evaluate(() => location.hash)]);
  // backtrack then choose differently
  const choices = await page.locator(".choice-button:not([aria-disabled=true])").count();
  if (choices > 1) { await page.locator(".choice-button").nth(0).click(); await wait(page, 300); const r0 = await page.locator(".choice-response:visible").first().innerText().catch(() => ""); await page.locator(".choice-button").nth(1).click(); await wait(page, 300); const vis = await page.locator(".choice-response:visible").count(); rows.push(["switch choice 0->1 visible responses", vis]); }
  await page.reload({ waitUntil: "domcontentloaded" }); await wait(page, 2500);
  rows.push(["after reload at link", await state(page), await page.locator("#reading-back").isEnabled().catch(() => null)]);
  await page.keyboard.press("Escape"); await wait(page, 800);
  rows.push(["continue shown", await page.evaluate(() => !document.querySelector("#continue-reading").hidden)]);
  // history walk
  await page.goBack(); await wait(page, 800); rows.push(["goBack", await page.evaluate(() => location.href.slice(-60))]);
  await context.close();
  return { rows, log };
};
scenarios.historyBehaviour = async () => {
  const { context, page, log } = await fresh();
  await boot(page);
  const rows = [];
  rows.push(["len start", await page.evaluate(() => history.length)]);
  await page.click("#open-story"); await page.waitForSelector(".chapter-document"); await wait(page, 600);
  rows.push(["len after open via button", await page.evaluate(() => history.length), await page.evaluate(() => location.hash)]);
  await page.locator(".continuation .next-chapter:visible").first().click({ timeout: 3000 }).catch(() => rows.push("no next chapter")); await wait(page, 900);
  rows.push(["len after next chapter", await page.evaluate(() => history.length), await page.evaluate(() => location.hash)]);
  await page.goBack(); await wait(page, 1200);
  rows.push(["browser Back from reader", await page.evaluate(() => location.href.slice(-50)), (await state(page).catch(() => ({ readerHidden: "left site" }))).readerHidden]);
  await context.close();
  // focus timing after museum reopen
  const c2 = await fresh();
  await boot(c2.page, "#museum"); await c2.page.waitForSelector("#museum.open .museum-exhibit");
  await c2.page.evaluate(() => (location.hash = "")); await wait(c2.page, 500);
  await c2.page.evaluate(() => (location.hash = "museum")); await wait(c2.page, 250);
  const f1 = await c2.page.evaluate(() => ({ open: !!document.querySelector("#museum.open"), inM: !!document.activeElement?.closest("#museum"), a: document.activeElement?.id || document.activeElement?.tagName }));
  await c2.page.keyboard.press("Escape"); await wait(c2.page, 500);
  const f2 = await c2.page.evaluate(() => ({ open: !!document.querySelector("#museum.open") }));
  await c2.context.close();
  return { rows, museumReopen250: [f1, f2], log };
};
scenarios.audioToasts = async () => {
  const { context, page, log } = await fresh();
  await page.route(/\/music\/.*\.mp3/, (r) => r.abort());
  await boot(page);
  await page.evaluate(() => { window.__t = []; new MutationObserver(() => window.__t.push(document.querySelector("#toast").textContent)).observe(document.querySelector("#toast"), { childList: true, characterData: true, subtree: true }); });
  await page.click("#play-pause"); await wait(page, 3000);
  const t = await page.evaluate(() => window.__t);
  const st = await page.evaluate(() => ({ err: document.querySelector("#ost-audio").error?.code, paused: document.querySelector("#ost-audio").paused, label: document.querySelector("#play-pause").getAttribute("aria-label") }));
  await context.close();
  return { toasts: t, st, log };
};
const want = process.argv.slice(2);
for (const [name, fn] of Object.entries(scenarios)) {
  if (want.length && !want.includes(name)) continue;
  try { results[name] = await fn(); } catch (e) { results[name] = { crashed: e.message.split("\n")[0] }; }
  console.log("done", name);
}
await writeFile(`${out}/results${want.length ? "-" + want.join("_") : ""}.json`, JSON.stringify(results, null, 1));
await browser.close();








