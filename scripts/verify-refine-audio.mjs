// Browser check of playlist default and autoplay: (a) autoplay allowed -> Faster Than Light (vocal) plays on load;
// (b) default policy -> silent until the first click, then exactly one stream; (c) saved pause stays paused;
// (d) saved other track wins. Headless unless HEADED=1 (then on the left monitor). Needs a preview and
// STELLARIS_PLAYWRIGHT_PATH.
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
const { chromium } = await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const base = process.env.STELLARIS_PREVIEW_URL || "http://127.0.0.1:4173/";
const headed = !!process.env.HEADED;
const place = headed ? ["--window-position=" + (process.env.STELLARIS_WINDOW_POSITION || "-1900,20")] : [];
const FTL = "Faster Than Light - Feat. Mia Stegmar";
const state = (page) => page.evaluate(() => ({
  title: document.getElementById("track-title").textContent,
  playing: [...document.querySelectorAll("audio")].filter((a) => !a.paused).length,
  audios: document.querySelectorAll("audio").length,
  src: document.getElementById("ost-audio").src,
  label: document.getElementById("play-pause").getAttribute("aria-label"),
}));
const open = async (browser, prefs, label) => {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.addInitScript((p) => { if (!sessionStorage.getItem("seeded")) { sessionStorage.setItem("seeded", "1"); for (const [k, v] of Object.entries(p)) localStorage.setItem(k, v); } }, prefs);
  await page.goto(base, { waitUntil: "load" });
  await page.waitForSelector("#track-list button", { state: "attached" });
  await page.waitForTimeout(1500);
  return { ctx, page, errors, label };
};
const step = (name, detail = "") => console.log("OK", name, detail);
const run = async (args, fn) => {
  const browser = await chromium.launch({ channel: "chrome", headless: !headed, args: [...place, ...args] });
  try { await fn(browser); } finally { await browser.close(); }
};

await run(["--autoplay-policy=no-user-gesture-required"], async (browser) => {
  const a = await open(browser, {}, "a");
  const s = await state(a.page);
  assert.equal(s.title, FTL); assert.equal(s.playing, 1); assert.equal(s.audios, 1);
  assert.ok(s.src.includes("02_fasterthanlight_bonus"));
  const tags = await a.page.$$eval(".track-version", (n) => n.map((x) => x.textContent));
  assert.ok(tags.includes("人声") && tags.includes("纯音乐"), tags.join());
  step("a: autoplay allowed -> vocal FTL plays", `${s.title}, tags ${tags.length}`);
  assert.deepEqual(a.errors, []);
  await a.page.click("#play-pause"); await a.page.waitForTimeout(300);
  assert.equal((await state(a.page)).playing, 0);
  assert.equal(await a.page.evaluate(() => localStorage.getItem("st-music-paused")), "1");
  await a.page.reload({ waitUntil: "load" }); await a.page.waitForTimeout(1500);
  assert.equal((await state(a.page)).playing, 0);
  step("explicit pause is remembered across a reload");
  await a.ctx.close();
  const c = await open(browser, { "st-music-paused": "1" }, "c");
  assert.equal((await state(c.page)).playing, 0);
  step("c: saved paused preference stays paused");
  await c.ctx.close();
  const m = await open(browser, { "st-volume": "0" }, "m");
  assert.equal((await state(m.page)).playing, 0);
  step("saved mute (volume 0) stays silent");
  await m.ctx.close();
  const d = await open(browser, { "st-track-id": "08_alphacentauri" }, "d");
  const ds = await state(d.page);
  assert.equal(ds.title, "Alpha Centauri"); assert.equal(ds.playing, 1);
  step("d: saved other track wins", ds.title);
  await d.ctx.close();
});

await run([], async (browser) => {
  const b = await open(browser, {}, "b");
  let s = await state(b.page);
  assert.equal(s.title, FTL);
  if (s.playing === 0) {
    assert.equal(s.label, "播放音乐");
    await b.page.mouse.click(640, 400);
    await b.page.waitForTimeout(1200);
    s = await state(b.page);
  } else step("b: note - this Chrome allowed autoplay by itself", "");
  assert.equal(s.playing, 1); assert.equal(s.audios, 1);
  await b.page.mouse.click(660, 420); await b.page.waitForTimeout(500);
  assert.equal((await state(b.page)).playing, 1);
  step("b: default policy -> silent until first gesture, then exactly one stream", s.title);
  assert.deepEqual(b.errors, []);
  await b.ctx.close();
  // A click on the play button itself must play, not play-then-pause.
  const p = await open(browser, {}, "p");
  if ((await state(p.page)).playing === 0) {
    await p.page.click("#play-pause"); await p.page.waitForTimeout(1200);
    assert.equal((await state(p.page)).playing, 1);
    step("clicking the play button as the first gesture plays");
  }
  await p.ctx.close();
});
console.log("audio refine checks passed");
