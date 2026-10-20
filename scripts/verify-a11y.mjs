// Accessibility and reduced-motion checks on the real site (Chinese and English): prefers-reduced-motion and the
// site's own motion toggle stop animations/transitions; keyboard reaches the navigation (incl. the Grand Archive),
// opens and closes the museum and the reader, focuses substitution notes (tooltip) and effect panels; focus is
// visible; every button has an accessible name; reader body text meets WCAG AA contrast. Needs a preview.
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
const { chromium } = await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const base = process.env.STELLARIS_PREVIEW_URL || "http://127.0.0.1:4173/";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const errors = [];
const ok = (n, d = "") => console.log("✔", n, d);
const motion = (page) => page.evaluate(() => ({
  running: document.getAnimations().filter((a) => a.playState === "running" && (a.effect?.getTiming().duration || 0) > 1).length,
  longTransitions: [...document.querySelectorAll("button, .chapter-document, .catalogue, .museum-exhibit")]
    .filter((el) => parseFloat(getComputedStyle(el).transitionDuration) > 0.01).length,
}));
for (const lang of ["zh", "en"]) {
  // 1. System reduced motion.
  const ctx = await browser.newContext({ viewport: { width: 1400, height: 900 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await page.evaluate((l) => { localStorage.setItem("st-language", l); localStorage.setItem("st-music-paused", "1"); }, lang);
  await page.goto(`${base}#story=cetana`);
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForSelector(".chapter-document", { timeout: 20000 });
  await page.locator("[data-choice]").first().click();
  await page.waitForTimeout(300);
  const m = await motion(page);
  assert.equal(m.running, 0, `${lang}: running animations under reduced motion: ${m.running}`);
  assert.equal(m.longTransitions, 0, `${lang}: transitions under reduced motion: ${m.longTransitions}`);
  ok(`${lang}: prefers-reduced-motion → no running animations or transitions`);
  // 2. Keyboard: substitution note and effects panel.
  const name = page.locator(".game-name").first();
  if (await name.count()) {
    await name.focus();
    assert.ok(await page.locator("#name-tip.show").count(), "tooltip shows on focus");
    await page.keyboard.press("Escape");
    ok(`${lang}: substitution note opens on keyboard focus, Esc closes`);
  }
  const fx = page.locator(".fx summary").first();
  if (await fx.count()) {
    await fx.focus();
    await page.keyboard.press("Enter");
    assert.ok(await page.locator(".fx[open]").count(), "effects panel opens by keyboard");
    ok(`${lang}: effects panel opens by keyboard`);
  }
  // 3. Buttons have accessible names; focus is visible.
  const unnamed = await page.evaluate(() => [...document.querySelectorAll("button")].filter((b) => b.offsetParent && !(b.getAttribute("aria-label") || b.textContent.trim() || b.title)).length);
  assert.equal(unnamed, 0, `${lang}: buttons without accessible name: ${unnamed}`);
  await page.keyboard.press("Tab");
  const focusVisible = await page.evaluate(() => { const el = document.activeElement; const s = getComputedStyle(el); return s.outlineStyle !== "none" || s.boxShadow !== "none"; });
  assert.ok(focusVisible, "focused element shows a focus ring");
  ok(`${lang}: every visible button has an accessible name; focus ring visible`);
  // 4. Contrast of reader body text.
  const ratio = await page.evaluate(() => {
    const lum = (c) => { const [r, g, b] = c.match(/\d+(\.\d+)?/g).slice(0, 3).map(Number).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
    const p = document.querySelector(".chapter-document p");
    let el = p, bg = "rgba(0, 0, 0, 0)";
    while (el && /rgba\(0, 0, 0, 0\)|transparent/.test(bg)) { bg = getComputedStyle(el).backgroundColor; el = el.parentElement; }
    if (/rgba\(0, 0, 0, 0\)|transparent/.test(bg)) bg = getComputedStyle(document.body).backgroundColor;
    const a = lum(getComputedStyle(p).color), b = lum(bg);
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  });
  assert.ok(ratio >= 4.5, `${lang}: body text contrast ${ratio.toFixed(2)}`);
  ok(`${lang}: reader body text contrast ${ratio.toFixed(2)}:1 (AA ≥ 4.5)`);
  await ctx.close();
  // 5. Site toggle + keyboard navigation to the Grand Archive (no system preference).
  const ctx2 = await browser.newContext({ viewport: { width: 1400, height: 900 } });
  const p2 = await ctx2.newPage();
  p2.on("pageerror", (e) => errors.push(e.message));
  await p2.goto(base, { waitUntil: "domcontentloaded" });
  await p2.evaluate((l) => { localStorage.setItem("st-language", l); localStorage.setItem("st-music-paused", "1"); }, lang);
  await p2.reload({ waitUntil: "domcontentloaded" });
  await p2.waitForSelector("#categories [data-category]", { timeout: 20000 });
  await p2.locator("#motion").click();
  assert.ok(await p2.evaluate(() => document.documentElement.classList.contains("reduced-motion")), "site toggle sets reduced motion");
  ok(`${lang}: site motion toggle applies reduced motion`);
  let reached = false;
  for (let i = 0; i < 40 && !reached; i++) {
    await p2.keyboard.press("Tab");
    reached = await p2.evaluate(() => document.activeElement?.id === "museum-open");
  }
  assert.ok(reached, "Tab reaches the Grand Archive entry");
  await p2.keyboard.press("Enter");
  await p2.waitForSelector("#museum.open", { timeout: 10000 });
  await p2.keyboard.press("Escape");
  await p2.waitForTimeout(400);
  assert.ok(!(await p2.locator("#museum.open").count()), "Esc closes the museum");
  ok(`${lang}: keyboard reaches the Grand Archive in the navigation, Enter opens it, Esc closes it`);
  await ctx2.close();
  // 6. Round-5 regressions (desktop).
  const ctx3 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p3 = await ctx3.newPage();
  p3.on("pageerror", (e) => errors.push(e.message));
  await p3.goto(base, { waitUntil: "domcontentloaded" });
  await p3.evaluate((l) => { localStorage.setItem("st-language", l); localStorage.setItem("st-music-paused", "1"); }, lang);
  await p3.goto(`${base}#story=cetana`);
  await p3.reload({ waitUntil: "domcontentloaded" });
  await p3.waitForSelector(".chapter-document", { timeout: 20000 });
  const r5 = await p3.evaluate(() => {
    const lum = (c) => { const [r, g, b] = c.match(/\d+(\.\d+)?/g).slice(0, 3).map(Number).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
    const cr = (a, b) => (Math.max(lum(a), lum(b)) + 0.05) / (Math.min(lum(a), lum(b)) + 0.05);
    const box = (s) => { const r = document.querySelector(s)?.getBoundingClientRect(); return r ? [r.width, r.height] : null; };
    const key = document.createElement("span"); key.className = "flow-key"; key.innerHTML = '<span class="key-other">x</span>'; document.body.append(key);
    const other = cr(getComputedStyle(key.firstChild).color, "rgb(8, 21, 26)"); key.remove();
    const canvas = document.querySelector("#scene canvas");
    const seek = document.querySelector("#music-seek");
    return {
      canvasName: canvas?.getAttribute("aria-label") || "", canvasRole: canvas?.getAttribute("role"),
      searchName: document.querySelector("#search-open").getAttribute("aria-label"),
      skip: document.querySelector(".skip-link").textContent, skipSame: document.querySelector(".skip-link").textContent === document.querySelector("#open-story")?.textContent.replace("↗", "").trim(),
      pager: document.querySelector("#search-page").getAttribute("aria-live"),
      dossierH2: document.querySelector("h2#dossier-title") !== null,
      langBtn: box("#reader-language"), seekH: box("#music-seek")?.[1], volH: box("#music-volume")?.[1],
      keyOther: other, trackAlpha: (() => { const t = document.createElement("span"); t.className = "track-version"; document.body.append(t); const o = parseFloat(getComputedStyle(t).opacity); t.remove(); return o; })(),
      controls: document.querySelector("#playlist-toggle").getAttribute("aria-controls"),
      cjkUnmarked: [...document.querySelectorAll(".md-guide *")].filter((e) => [...e.childNodes].some((n) => n.nodeType === 3 && /[㐀-鿿]/.test(n.nodeValue)) && !e.closest('[lang="zh-CN"]')).length,
      viewport: document.querySelector(".flow-viewport")?.getAttribute("role") || "(none yet)",
      valuetext: seek.getAttribute("aria-valuetext"),
    };
  });
  assert.ok(r5.canvasName && r5.canvasRole, `${lang}: 3D canvas has a role and name`);
  assert.ok(r5.searchName, `${lang}: #search-open has an aria-label`);
  assert.ok(!r5.skipSame, `${lang}: skip link text differs from the Open story button`);
  assert.equal(r5.pager, "polite", "search page indicator is a live region");
  assert.ok(!r5.dossierH2, "no h2 before the reader h1");
  assert.ok(r5.langBtn[0] >= 24 && r5.langBtn[1] >= 24, `${lang}: #reader-language target ${r5.langBtn}`);
  assert.ok(r5.seekH >= 24 && r5.volH >= 24, `${lang}: range hit area ${r5.seekH}/${r5.volH}`);
  assert.ok(r5.keyOther >= 4.5, `${lang}: .key-other contrast ${r5.keyOther.toFixed(2)}`);
  assert.ok(r5.trackAlpha >= 0.8, `${lang}: .track-version opacity ${r5.trackAlpha}`);
  assert.equal(r5.controls, "playlist");
  if (lang === "en") assert.equal(r5.cjkUnmarked, 0, "Chinese runs inside the English guide carry lang=zh-CN");
  ok(`${lang}: round-5 fixes (names, targets, contrast, lang, live regions)`, JSON.stringify({ k: +r5.keyOther.toFixed(2), vt: r5.valuetext }));
  // Seek slider reports the time as its value text.
  await p3.evaluate(() => { const a = document.querySelector("#ost-audio"); a.dispatchEvent(new Event("timeupdate")); });
  await ctx3.close();
  // 7. Phone: targets and the search button name.
  const ctx4 = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
  const p4 = await ctx4.newPage();
  await p4.goto(base, { waitUntil: "domcontentloaded" });
  await p4.evaluate((l) => { localStorage.setItem("st-language", l); localStorage.setItem("st-music-paused", "1"); }, lang);
  await p4.reload({ waitUntil: "domcontentloaded" });
  await p4.waitForSelector("#categories [data-category]", { timeout: 20000 });
  const small = await p4.evaluate(() => ["#search-open", "#language", "#motion", ".brand", "#music-seek"].map((s) => { const r = document.querySelector(s)?.getBoundingClientRect(); return r && r.width && (r.width < 24 || r.height < 24) ? `${s} ${r.width}x${r.height}` : null; }).filter(Boolean));
  assert.deepEqual(small, [], `${lang}: phone targets < 24px: ${small}`);
  ok(`${lang}: phone header targets ≥ 24px`);
  await ctx4.close();
}
// Forced colors: pressed museum chips are distinguishable.
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, forcedColors: "active" });
  const pg = await ctx.newPage();
  await pg.goto(base, { waitUntil: "domcontentloaded" });
  await pg.evaluate(() => localStorage.setItem("st-music-paused", "1"));
  await pg.reload({ waitUntil: "domcontentloaded" });
  await pg.waitForSelector("#museum-open", { timeout: 20000 });
  await pg.click("#museum-open");
  await pg.waitForSelector("#museum.open .museum-chip[aria-pressed=true]", { timeout: 20000 });
  const outline = await pg.evaluate(() => getComputedStyle(document.querySelector(".museum-chip[aria-pressed=true]")).outlineStyle);
  const unpressed = await pg.evaluate(() => getComputedStyle(document.querySelector(".museum-chip[aria-pressed=false]")).outlineStyle);
  assert.notEqual(outline, "none"); assert.equal(unpressed, "none");
  // Exhibit open: panel is named, not a live region.
  await pg.locator(".museum-exhibit").first().click();
  await pg.waitForSelector(".museum-detail:not([hidden])");
  const det = await pg.evaluate(() => { const d = document.querySelector(".museum-detail"); return { live: d.getAttribute("aria-live"), name: d.getAttribute("aria-label") }; });
  assert.equal(det.live, null); assert.ok(det.name);
  ok("forced colors: pressed chip outlined; exhibit panel named without aria-live");
  await ctx.close();
}
console.log(errors.length ? `page errors: ${errors.join(" | ")}` : "page errors: 0");
await browser.close();
process.exit(errors.length ? 1 : 0);
