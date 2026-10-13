// UI capture + behaviour checks on the real GPU (not SwiftShader).
//   STELLARIS_PLAYWRIGHT_PATH=<playwright/index.mjs> node scripts/verify-ui-capture.mjs
// Env: STELLARIS_PREVIEW_URL (default http://127.0.0.1:4173/), HEADED=1 for a visible window.
// Writes PNGs and verification/ui/capture.json. Transition frames are taken in slow
// motion (scene timeScale + CDP animation playback rate), so they show real
// intermediate states, not wall-clock timing.
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const runtime = process.env.STELLARIS_PLAYWRIGHT_PATH;
const { chromium } = await import(runtime ? pathToFileURL(runtime).href : "playwright");
const base = process.env.STELLARIS_PREVIEW_URL || "http://127.0.0.1:4173/";
const out = "verification/ui";
await mkdir(out, { recursive: true });
export const GPU_ARGS = ["--use-angle=d3d11", "--enable-gpu-rasterization", "--ignore-gpu-blocklist", "--enable-gpu", "--force-high-performance-gpu"];
const browser = await chromium.launch({ channel: "chrome", headless: !process.env.HEADED, args: GPU_ARGS });
const report = { base, startedAt: new Date().toISOString(), adapter: null, shots: [], checks: [], errors: [] };
const check = (name, ok, detail) => {
  report.checks.push({ name, ok: !!ok, detail });
  if (!ok) console.error("FAIL", name, detail ?? "");
};

async function open(viewport, hash = "", options = {}) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: options.reducedMotion || "no-preference" });
  const page = await context.newPage();
  page.on("pageerror", (e) => report.errors.push(`${viewport.width}: ${e.message}`));
  page.on("console", (m) => m.type() === "error" && report.errors.push(`${viewport.width} console: ${m.text()}`));
  await page.goto(base + hash, { waitUntil: "networkidle" });
  await page.waitForFunction(() => window.__archiveDiagnostics?.());
  return { context, page };
}
const shot = async (page, name) => {
  const path = `${out}/${name}.png`;
  await page.screenshot({ path });
  report.shots.push(path);
};
const settle = (page, ms = 400) =>
  page.waitForFunction(() => {
    const d = window.__archiveDiagnostics();
    return !d.framePending || d.breathing;
  }, null, { timeout: 15000 }).then(() => page.waitForTimeout(ms));
const coversLoaded = (page) => page.waitForFunction(() => window.__archiveDiagnostics().imageCovers > 60, null, { timeout: 20000 });
async function slowMotion(page, factor) {
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Animation.enable");
  await cdp.send("Animation.setPlaybackRate", { playbackRate: factor });
  await page.evaluate((f) => (document.querySelector("#scene").__scene.timeScale = f), factor);
  return cdp;
}
// Frames are taken at state thresholds (screenshots stall rAF, so wall-clock
// timestamps would not map to animation progress).
async function frames(page, prefix, metric, targets) {
  for (const [i, target] of targets.entries()) {
    await page.waitForFunction(
      ([m, v]) => {
        const d = window.__archiveDiagnostics();
        const value = m === "detail" ? d.detail : d.coverReveal;
        return m === "detail" ? value >= v : value >= v && d.artTransition < 1 || (v >= 1 && d.artTransition >= 1);
      },
      [metric, target],
      { timeout: 20000, polling: 16 },
    );
    const state = await page.evaluate(() => {
      const d = window.__archiveDiagnostics();
      return { detail: +d.detail.toFixed(3), reveal: +d.coverReveal.toFixed(3) };
    });
    await shot(page, `${prefix}-${String(i).padStart(2, "0")}`);
    report.checks.push({ name: `${prefix} frame ${i}`, ok: true, detail: state });
  }
}
try {
  // ---------------------------------------------------------------- desktop 1600×1000
  {
    const { context, page } = await open({ width: 1600, height: 1000 });
    report.adapter = await page.evaluate(() => window.__archiveDiagnostics().gpu);
    check("real GPU adapter (not SwiftShader)", !/swiftshader|llvmpipe|software/i.test(report.adapter?.renderer || ""), report.adapter);
    await coversLoaded(page);
    await settle(page);
    await shot(page, "1600-archive");
    const diag = await page.evaluate(() => window.__archiveDiagnostics());
    check("closed cards show original art (atlas tiles loaded)", diag.imageCovers > 60, diag.imageCovers);
    check("instances culled to the view", diag.visibleInstances < diag.instances, `${diag.visibleInstances}/${diag.instances}`);
    // Rows leave both edges: the canvas spans the viewport and edge columns are covered by cards.
    const edgeFill = await page.evaluate(() => {
      const canvas = document.querySelector("#scene canvas");
      return canvas.getBoundingClientRect().width >= innerWidth - 1;
    });
    check("archive canvas spans the full width", edgeFill);
    // Navigation keeps moving continuously.
    await page.locator("#scene canvas").focus();
    for (let i = 0; i < 3; i++) await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowRight");
    await settle(page);
    await shot(page, "1600-archive-navigated");
    // Rendering stops when unattended (no rAF work when idle).
    await page.mouse.move(5, 5);
    await page.waitForFunction(() => !window.__archiveDiagnostics().framePending, null, { timeout: 20000 });
    const drawn = await page.evaluate(() => window.__archiveDiagnostics().framesDrawn);
    await page.waitForTimeout(1200);
    const drawnLater = await page.evaluate(() => window.__archiveDiagnostics().framesDrawn);
    check("render loop idles when nothing moves", drawn === drawnLater, { drawn, drawnLater });

    // Opening transition, slow motion ×0.2 (each frame is a real intermediate state).
    await slowMotion(page, 0.3);
    await page.locator("#open-story").click();
    await frames(page, "1600-open", "detail", [0.02, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 0.99]);
    await slowMotion(page, 1);
    await page.waitForFunction(() => window.__archiveDiagnostics().detail > 0.995);
    await page.waitForFunction(() => document.querySelector("#flow-surface")?.classList.contains("card-ready"));
    await page.waitForTimeout(600);
    await shot(page, "1600-reader");
    const overlay = await page.evaluate(() => {
      const map = document.querySelector("#flow-surface").getBoundingClientRect();
      const panel = document.querySelector(".reader-panel #reading-content").getBoundingClientRect();
      return { mapRight: map.right, textLeft: panel.left, width: innerWidth };
    });
    check("card close-up on the left, text column on the right", overlay.mapRight < overlay.textLeft && overlay.mapRight < overlay.width * 0.55, overlay);
    const fonts = await page.evaluate(() => [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family));
    report.fontsLoaded = [...new Set(fonts)];
    await context.close();
  }

  // ---------------------------------------------------------------- dense maps
  const index = await (await fetch(base + "stories/index.json")).json();
  const largest = [...index.stories].sort((a, b) => b.chapters - a.chapters)[0].id;
  report.largestStory = largest;
  for (const [story, chapter] of [
    ["cetana", "crisis.8040"],
    ["origin_treasure_hunters", ""],
    ["horizon-signal", ""],
    ["cybrex", "precursor.2005"],
    ["the-shroud", ""],
    [largest, ""],
  ]) {
    const { context, page } = await open({ width: 1600, height: 1000 }, `#story=${story}${chapter ? `&chapter=${chapter}` : ""}`);
    await page.waitForFunction(() => document.querySelector("#flow-surface")?.classList.contains("card-ready"), null, { timeout: 20000 });
    await page.waitForTimeout(700);
    await shot(page, `1600-map-${story}`);
    const map = await page.evaluate(() => ({
      nodes: document.querySelectorAll("#flow-surface .flow-node").length,
      current: document.querySelectorAll("#flow-surface .flow-node.current").length,
      overlaps: (() => {
        const boxes = [...document.querySelectorAll("#flow-surface .flow-node > .flow-box")].map((r) => r.getBoundingClientRect());
        let n = 0;
        for (let i = 0; i < boxes.length; i++)
          for (let j = i + 1; j < boxes.length; j++) {
            const a = boxes[i], b = boxes[j];
            if (a.left < b.right - 1 && b.left < a.right - 1 && a.top < b.bottom - 1 && b.top < a.bottom - 1) n++;
          }
        return n;
      })(),
    }));
    check(`${story}: map renders with the current node and no overlapping cards`, map.nodes > 0 && map.current === 1 && map.overlaps === 0, map);
    if (story === "cetana" || story === "the-shroud") {
      await page.locator("[data-flow-expand]").click();
      await page.locator("[data-flow-fit]").click();
      await page.waitForTimeout(700);
      await shot(page, `1600-map-${story}-expanded-fit`);
    }
    await context.close();
  }

  // ---------------------------------------------------------------- chapter change, reversal, language
  {
    const { context, page } = await open({ width: 1600, height: 1000 }, "#story=cybrex&chapter=precursor.2005");
    await page.waitForFunction(() => document.querySelector("#flow-surface")?.classList.contains("card-ready"), null, { timeout: 20000 });
    await page.waitForTimeout(500);
    const first = await page.evaluate(() => location.hash);
    await page.locator(".choice-button").first().click();
    await shot(page, "1600-choice-expanded");
    await slowMotion(page, 0.3);
    const target = page.locator(".choice-response:not([hidden]) [data-chapter], .continuation [data-chapter]").first();
    await target.click();
    await frames(page, "1600-chapter", "reveal", [0.08, 0.3, 0.5, 0.7, 0.92]);
    await slowMotion(page, 1);
    await page.waitForFunction(() => window.__archiveDiagnostics().artTransition >= 1);
    await page.waitForTimeout(400);
    await shot(page, "1600-chapter-after");
    const second = await page.evaluate(() => location.hash);
    check("chapter changed", first !== second, { first, second });
    const traversed = await page.locator("#flow-surface .flow-edge.traversed").count();
    check("map highlights the route just taken", traversed >= 1, traversed);
    // Reversal: back to the previous doc, reveal runs in the opposite direction.
    await slowMotion(page, 0.3);
    await page.locator("#reading-back").click();
    await frames(page, "1600-back", "reveal", [0.15, 0.45, 0.75]);
    await slowMotion(page, 1);
    await page.waitForFunction(() => window.__archiveDiagnostics().artTransition >= 1);
    await page.waitForTimeout(300);
    check("reversal returns to the first doc", (await page.evaluate(() => location.hash)) === first);
    // Language switch: chrome follows the language.
    await page.locator("#reader-language").click();
    await page.waitForTimeout(500);
    await shot(page, "1600-reader-en");
    const chrome = await page.evaluate(() => ({
      lang: document.documentElement.lang,
      close: document.querySelector("#close-reader").textContent.trim(),
      map: document.querySelector(".flow-title")?.textContent,
      heading: document.querySelector(".section-heading span")?.textContent,
      cjkInChrome: [...document.querySelectorAll("#close-reader, .flow-title, .flow-controls [aria-label], .section-heading span, .chapter-eyebrow button, .flow-key span")]
        .map((n) => n.textContent + (n.getAttribute("aria-label") || ""))
        .filter((s) => /[一-鿿]/.test(s)),
    }));
    check("English chrome in English mode", chrome.lang === "en" && chrome.cjkInChrome.length === 0, chrome);
    await page.locator("#reader-language").click();
    // Keyboard on the map: focus, move down, Enter reads.
    await page.locator(".flow-viewport").focus();
    await page.keyboard.press("Home");
    const focusedNode = await page.evaluate(() => document.activeElement?.classList.contains("flow-node"));
    check("map keyboard: Home focuses the current node", focusedNode);
    await page.keyboard.press("ArrowDown");
    const moved = await page.evaluate(() => document.activeElement?.dataset?.node);
    check("map keyboard: arrows move focus between nodes", !!moved, moved);
    await page.keyboard.press("Escape");
    await page.waitForFunction(() => window.__archiveDiagnostics().detail < 0.02, null, { timeout: 10000 });
    await page.waitForTimeout(400);
    check("Escape closes the reader and returns focus", (await page.evaluate(() => document.activeElement?.id)) === "open-story");
    await shot(page, "1600-closed");
    await context.close();
  }

  // ---------------------------------------------------------------- 1280×720
  {
    const { context, page } = await open({ width: 1280, height: 720 });
    await coversLoaded(page);
    await settle(page);
    await shot(page, "1280-archive");
    await page.locator("#open-story").click();
    await page.waitForFunction(() => document.querySelector("#flow-surface")?.classList.contains("card-ready"), null, { timeout: 20000 });
    await page.waitForTimeout(600);
    await shot(page, "1280-reader");
    const bounds = await page.evaluate(() => {
      const card = document.querySelector("#flow-surface").getBoundingClientRect();
      const caption = document.querySelector(".reader-left").getBoundingClientRect();
      const player = document.querySelector("#music-player").getBoundingClientRect();
      return { cardBottom: card.bottom, captionTop: caption.top, captionBottom: caption.bottom, playerTop: player.top };
    });
    check("1280: caption sits below the card, above the player", bounds.captionTop >= bounds.cardBottom && bounds.captionBottom <= bounds.playerTop + 2, bounds);
    await context.close();
  }

  // ---------------------------------------------------------------- reduced motion
  {
    const { context, page } = await open({ width: 1600, height: 1000 }, "", { reducedMotion: "reduce" });
    await coversLoaded(page);
    await page.waitForTimeout(500);
    const reduced = await page.evaluate(() => ({
      cls: document.documentElement.classList.contains("reduced-motion"),
      breathing: window.__archiveDiagnostics().breathing,
    }));
    check("prefers-reduced-motion: reduced class, no breathing", reduced.cls && !reduced.breathing, reduced);
    await page.locator("#open-story").click();
    await page.waitForTimeout(150);
    const snapped = await page.evaluate(() => window.__archiveDiagnostics().detail);
    check("reduced motion: card extraction snaps", snapped > 0.99, snapped);
    await page.waitForTimeout(400);
    const animations = await page.evaluate(() => document.getAnimations().filter((a) => a.playState === "running").length);
    check("reduced motion: no running CSS/WAAPI animations", animations === 0, animations);
    await shot(page, "1600-reduced-reader");
    await context.close();
    // In-app toggle (no OS preference).
    const second = await open({ width: 1600, height: 1000 });
    await second.page.locator("#motion").click();
    const toggled = await second.page.evaluate(() => ({
      cls: document.documentElement.classList.contains("reduced-motion"),
      pressed: document.querySelector("#motion").getAttribute("aria-pressed"),
    }));
    check("in-app reduced-motion toggle", toggled.cls && toggled.pressed === "true", toggled);
    await second.page.locator("#motion").click();
    await second.context.close();
  }

  // ---------------------------------------------------------------- phones
  for (const viewport of [{ width: 390, height: 844 }, { width: 360, height: 740 }]) {
    const { context, page } = await open(viewport);
    await coversLoaded(page);
    await settle(page);
    await shot(page, `${viewport.width}-archive`);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    check(`${viewport.width}: no horizontal overflow`, overflow <= 0, overflow);
    await page.locator("#open-story").click();
    await page.waitForTimeout(1200);
    await shot(page, `${viewport.width}-reader`);
    const offscreen = await page.evaluate(() =>
      [...document.querySelectorAll("#reader button, #reader h1, .narrative p")]
        .filter((n) => n.offsetParent)
        .map((n) => n.getBoundingClientRect())
        .filter((r) => r.right > innerWidth + 1 || r.left < -1).length,
    );
    check(`${viewport.width}: reader content fits the width`, offscreen === 0, offscreen);
    await page.locator("#chapter-toggle").click();
    await page.waitForTimeout(500);
    await shot(page, `${viewport.width}-map`);
    check(`${viewport.width}: map sheet opens`, await page.locator("#flow-surface").isVisible());
    await page.locator("[data-flow-close]").click();
    check(`${viewport.width}: map sheet closes`, !(await page.locator("#flow-surface").isVisible()));
    const idle = await page.evaluate(() => new Promise((r) => setTimeout(() => r(window.__archiveDiagnostics().framePending), 1500)));
    check(`${viewport.width}: scene stops rendering under the full-screen reader`, idle === false, idle);
    await context.close();
  }
} catch (error) {
  report.errors.push(String(error?.stack || error));
} finally {
  await browser.close();
  report.finishedAt = new Date().toISOString();
  report.passed = report.errors.length === 0 && report.checks.every((c) => c.ok);
  await writeFile(`${out}/capture.json`, JSON.stringify(report, null, 2));
  console.log(`checks ${report.checks.filter((c) => c.ok).length}/${report.checks.length}, errors ${report.errors.length}, adapter: ${report.adapter?.renderer}`);
  for (const e of report.errors) console.log("ERROR", e.slice(0, 400));
  assert.ok(report.passed, "UI capture checks failed (see verification/ui/capture.json)");
}
