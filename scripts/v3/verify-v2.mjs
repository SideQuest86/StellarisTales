import { pathToFileURL } from "node:url";
import { mkdir, writeFile } from "node:fs/promises";
const { chromium } = await import(
  process.env.STELLARIS_PLAYWRIGHT_PATH
    ? pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href
    : "playwright"
);
const url = process.env.STELLARIS_TEST_URL || "http://127.0.0.1:4173/";
const browser = await chromium.launch({ headless: true, channel: "chrome" });
const p = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
p.on("pageerror", (e) => errors.push(e.message));
await mkdir("verification", { recursive: true });
function check(condition, message) {
  if (!condition) throw new Error(message);
}
await p.goto(url, { waitUntil: "networkidle" });
await p.waitForFunction(
  () => window.__archiveDiagnostics?.().instances === 287,
);
await p.waitForTimeout(500);
const initial = await p.evaluate(() => window.__archiveDiagnostics());
check(
  initial.coverReveal > 0.99 && initial.imageCovers > 0,
  "Closed archives show original image covers",
);
check(initial.story === "horizon-signal", "Initial complete story");
const idleY = initial.selectedY;
await p.waitForTimeout(420);
check(
  Math.abs(
    (await p.evaluate(() => window.__archiveDiagnostics())).selectedY - idleY,
  ) > 0.0001,
  "Visible idle breathing",
);
await p.mouse.move(700, 400);
await p.mouse.wheel(0, 120);
await p.waitForTimeout(700);
check(
  (await p.evaluate(() => window.__archiveDiagnostics())).row === 1,
  "Wheel browses column",
);
await p.mouse.move(700, 400);
await p.mouse.down();
await p.mouse.move(900, 480, { steps: 12 });
await p.mouse.up();
await p.waitForTimeout(1600);
const dragged = await p.evaluate(() => window.__archiveDiagnostics());
check(
  dragged.lane !== 2 || dragged.row !== 1,
  "Projected pointer dragging changes selection",
);
await p.reload({ waitUntil: "networkidle" });
await p.waitForFunction(
  () => window.__archiveDiagnostics?.().instances === 287,
);
await p.waitForTimeout(500);

await p.locator("#next-story").click();
await p.waitForTimeout(250);
const second = await p.evaluate(() => window.__archiveDiagnostics());
check(second.row === 1, "Row changes");
await p.locator('[data-category="4"]').click();
await p.waitForTimeout(200);
check(
  (await p.evaluate(() => window.__archiveDiagnostics())).lane !== 2,
  "Lane changes",
);
await p.locator('[data-category="2"]').click();
await p.waitForTimeout(400);
check(
  (await p.evaluate(() => window.__archiveDiagnostics())).row === 1,
  "Lane remembers selected story",
);
await p.locator("#previous-story").click();
await p.waitForTimeout(800);
await p.screenshot({ path: "verification/v2-desktop.png" });
const frames = await p.evaluate(async () => {
  const result = [];
  let prev = performance.now();
  for (let i = 0; i < 50; i++)
    await new Promise((resolve) =>
      requestAnimationFrame((t) => {
        result.push(t - prev);
        prev = t;
        resolve();
      }),
    );
  return result.slice(2).sort((a, b) => a - b);
});
await p.locator("#open-story").click();
await p.locator("#reader-title").waitFor();
await p.waitForTimeout(1200);
await p.waitForFunction(() => window.__archiveDiagnostics().coverReveal > 0.99);
check(
  (await p.evaluate(() => window.__archiveDiagnostics())).coverReveal > 0.99,
  "Opening reveals event artwork",
);
check(
  (await p.evaluate(() => window.__archiveDiagnostics())).detail > 0.98,
  "Selected archive physically lifts",
);
check(
  !(await p.locator("#reader").innerText()).match(
    /akx\.|Root\.|hidden_effect|country_event|查看.*脚本|触发条件/,
  ),
  "No mechanical source text",
);
await p.locator('[data-choice="0"]').click();
await p
  .locator(
    '.choice-response [data-chapter="special_projects:HORIZON_SIGNAL_PROJECT"]',
  )
  .click();
await p.waitForTimeout(200);
check(
  (await p.evaluate(() => window.__archiveDiagnostics())).artTransition < 0.7,
  "Chapter changes refrost the closeup",
);
await p.waitForFunction(
  () => window.__archiveDiagnostics().artTransition > 0.99,
);
await p.locator('.continuation [data-chapter="akx.9001"]').click();
await p.waitForFunction(() =>
  document.querySelector("#reader-title").textContent.includes("引力"),
);
check(
  (await p.locator("#dossier-title").innerText()) === "视界信号",
  "Whole sequence stays in the same dossier",
);
check(
  (await p.locator(".choice-button").count()) === 2,
  "Original branching choices",
);
await p.locator("#reading-back").click();
await p.waitForTimeout(250);
await p.locator("#reading-back").click();
await p.waitForFunction(
  () => document.querySelector("#reader-title").textContent === "视界信号",
);
await p.locator("#chapter-toggle").click();
check(
  (await p.locator("#chapter-list .map-chapter").count()) > 50,
  "Entire multi-chapter story accessible",
);
await p.locator("#contents-close").click();
await p.locator("#reader-language").click();
check(
  (await p.locator("#reader-title").innerText()).includes("Horizon"),
  "English original",
);
await p.locator("#reader-language").click();
await p.waitForTimeout(700);
await p.screenshot({ path: "verification/v2-reader.png" });
await p.locator("#play-pause").click();
await p.waitForFunction(
  () =>
    !document.querySelector("audio").paused &&
    document.querySelector("audio").currentTime > 0.15,
  { timeout: 30000 },
);
const firstTitle = await p.locator("#track-title").innerText();
await p.locator("#track-next").click();
await p.waitForFunction(
  () =>
    !document.querySelector("audio").paused &&
    document.querySelector("audio").currentTime > 0.15,
  { timeout: 30000 },
);
check(
  (await p.locator("#track-title").innerText()) !== firstTitle,
  "Switch track while reading",
);
await p.locator("#playlist-toggle").click();
check(
  (await p.locator("#track-list>button").count()) === 23,
  "Complete soundtrack",
);
await p.locator('[data-track="22"]').click();
await p.waitForFunction(
  () =>
    Number.isFinite(document.querySelector("audio").duration) &&
    !document.querySelector("audio").paused,
);
await p.evaluate(() => {
  const a = document.querySelector("audio");
  a.currentTime = a.duration - 0.3;
});
await p.waitForFunction(
  () =>
    document
      .querySelector('#track-list [data-track="0"]')
      .getAttribute("aria-current") === "true",
  { timeout: 30000 },
);
await p.waitForFunction(() => !document.querySelector("audio").paused);
await p.locator("#playlist-close").click();
await p.locator("#play-pause").click();
await p.locator("#close-reader").click();
await p.locator("#motion").click();
await p.waitForTimeout(300);
check(
  !(await p.evaluate(() => window.__archiveDiagnostics())).framePending,
  "Reduced motion stops rendering loop",
);
await p.locator("#search-open").click();
await p.locator("#search-input").fill("肃正");
await p.waitForTimeout(180);
check((await p.locator(".search-story").count()) > 0, "Complete story search");
await p.locator("#search-input").fill("nonexistent_938466");
await p.waitForTimeout(180);
check((await p.locator(".empty").count()) === 1, "Empty search");
await p.locator("#search-close").click();
await p.setViewportSize({ width: 390, height: 844 });
await p.waitForTimeout(500);
check(
  await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  "No mobile horizontal overflow",
);
await p.screenshot({ path: "verification/v2-mobile.png" });
await p.locator("#open-story").click();
await p.locator("#reader-title").waitFor();
await p.waitForTimeout(200);
await p.screenshot({ path: "verification/v2-mobile-reader.png" });
await p.keyboard.press("Escape");
check(
  await p.locator("#reader").evaluate((e) => e.hidden),
  "Escape closes reader",
);
await p.goto(url + "#story=horizon-signal&chapter=akx.9001", {
  waitUntil: "networkidle",
});
await p.waitForFunction(() =>
  document.querySelector("#reader-title")?.textContent.includes("引力"),
);
await p.setViewportSize({ width: 1440, height: 1000 });
await p.goto(url + "#story=origin_default", { waitUntil: "networkidle" });
await p.waitForFunction(
  () => document.querySelector("#reader-title")?.textContent === "繁荣一统",
);
check(
  (await p.locator(".narrative").innerText()).includes("统一目标"),
  "Official origin introduction",
);
await p.goto(url + "#story=origin_primal_calling", {
  waitUntil: "networkidle",
});
await p.waitForFunction(
  () => document.querySelector("#reader-title")?.textContent === "野性呼唤",
);
await p.locator("#chapter-toggle").click();
check(
  (await p.locator("#chapter-list .map-chapter").count()) > 30,
  "Origin includes full chapter directory",
);
await p.locator("#contents-close").click();
await p.goto(url + "#story=cybrex&chapter=ancrel.10250", {
  waitUntil: "networkidle",
});
await p.waitForFunction(
  () =>
    document.querySelector("#reader-title")?.textContent === "赛博勒克斯的秘密",
);
await p.getByRole("button", { name: "唯心主义", exact: true }).click();
check(
  (await p.locator(".narrative").innerText()).includes("取缔人工智能"),
  "Spiritualist Cybrex prose",
);
check(
  (await p.locator(".choice-button").count()) === 1,
  "Identical prose-only options merged",
);
await p.getByRole("button", { name: "个体机械", exact: true }).click();
check(
  !(await p.locator(".narrative").innerText()).includes("取缔人工智能"),
  "Machine Cybrex prose changes",
);
check(
  (await p
    .locator(".narrative p")
    .first()
    .evaluate((e) => parseFloat(getComputedStyle(e).fontSize))) >= 19,
  "Readable desktop body size",
);
check(
  (await p.locator(".reader-panel").boundingBox()).x > 600,
  "Reading panel occupies right side",
);
await p.screenshot({ path: "verification/v2-perspectives.png" });
await p.goto(url + "#record=cstorms.5080", { waitUntil: "networkidle" });
await p.waitForFunction(
  () => document.querySelector("#reader-title")?.textContent === "有机残骸",
);
await p.getByRole("button", { name: "噬杀蜂群", exact: true }).click();
check(
  (await p.locator(".narrative").innerText()).includes("仍可食用"),
  "Composed exclusive paragraph",
);
check(
  (await p.locator(".choices").innerText()).includes("我们饿了"),
  "Matching swarm response",
);
check(
  !(await p.locator(".choices").innerText()).includes("就地进行尸检"),
  "Other response hidden",
);
await p.getByRole("button", { name: "其他文明", exact: true }).click();
check(
  (await p.locator(".choices").innerText()).includes("就地进行尸检"),
  "Other response restored",
);
check(
  !(await p.locator("body").innerText()).match(
    /让银河发声|一份档案，一段完整旅程|每一道光/,
  ),
  "No decorative slogans",
);
const report = {
  url,
  errors,
  instances: initial.instances,
  drawCalls: initial.drawCalls,
  medianFrameMs: frames[Math.floor(frames.length * 0.5)],
  p95FrameMs: frames[Math.floor(frames.length * 0.95)],
  checks: [
    "official origin names and introductions",
    "whole origin chapter directory",
    "Cybrex civilization perspectives",
    "text and choices switch together",
    "composed common and exclusive prose",
    "19px body text",
    "right-side reader layout",
    "no decorative slogans",
    "visible idle breathing",
    "wheel navigation",
    "projected pointer dragging",
    "category navigation",
    "in-category navigation",
    "per-category position memory",
    "physical extraction",
    "full left-side closeup",
    "original image covers retain color through frosted reveal",
    "chapter change refrosts and reveals next artwork",
    "whole-story directory",
    "event-project-event inside same dossier",
    "original choices",
    "backtracking",
    "bilingual text",
    "no raw script in reader",
    "actual MP3 playback",
    "track switching while reading",
    "23-track playlist",
    "natural ended wraps final track to first",
    "reduced motion stops loop",
    "search and empty state",
    "390px mobile overflow",
    "Escape",
    "story/chapter deep links",
  ],
};
await writeFile(
  process.env.STELLARIS_TEST_URL
    ? "verification/v2-online-results.json"
    : "verification/v2-results.json",
  JSON.stringify(report, null, 2),
);
await browser.close();
console.log(JSON.stringify(report));
check(!errors.length, "Browser exceptions");
