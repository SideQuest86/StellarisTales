import { installNameTooltips } from "./name-tooltip.js";
import { fillNames, cleanRefs } from "./name-fill.js";
import { guideElement } from "./markdown.js";
import { renderEffects, bindEffects } from "./effects-panel.js";
import { createSearch } from "./search.js";
import { storyMap } from "./story-map.js";
import { FlowSurface } from "./flow-surface.js";
import { ArchiveScene } from "./archive-scene.js";
import { showAdapterHint } from "./gpu.js";
import { SoundtrackPlayer } from "./audio-player.js";
// [UI] chrome dictionary + reader enter/exit (src/i18n.js, src/reader-motion.js)
import { t, setLanguage, applyStaticText } from "./i18n.js";
import { revealReader } from "./reader-motion.js";
import { warmGlyphs } from "./glyph-warmup.js";
import * as progress from "./progress.js";
import {
  evaluate, resolveBody, resolveChoices, resolveEdges, pathFlags, storyFlags,
  impliedFacts, applyFacts, describe,
} from "./reading.js";
const $ = (q) => document.querySelector(q),
  esc = (s) =>
    String(s ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
const base = $("link[rel=icon]").getAttribute("href").includes("/public/")
  ? "./public/"
  : "./";
const asset = (p) => base + p;
const CATEGORIES = [
  ["origins", "起源故事", "ORIGINS"],
  ["precursors", "先驱者与遗迹", "PRECURSORS"],
  ["exploration", "深空异闻", "EXPLORATION"],
  ["rifts", "星界裂隙", "ASTRAL RIFTS"],
  ["crisis", "银河天灾", "CRISES"],
  ["leviathans", "星神与巨兽", "LEVIATHANS"],
  ["society", "文明纪事", "CIVILIZATIONS"],
  ["stories", "银河轶事", "CHRONICLES"],
];
let lang = "zh",
  reducedPreference = false,
  scene,
  stories = [],
  columns = [],
  selected,
  selectedColumn = 2,
  dossier = null,
  chapter = null,
  trail = [],
  readerTicket = 0,
  searchPage = 0,
  searchText = "",
  storyById = new Map(),
  recordToStory = {};
// Reading context (src/reading.js): one empire profile for the whole archive, assumptions for unknowable
// conditions per reading session, flags derived from the path. Docs on a path therefore never contradict.
let profile = {},
  profileNames = {},
  assumptions = {},
  storyFlagSet = new Set(),
  docMap = new Map();
try {
  lang = localStorage.getItem("st-language") || "zh";
  reducedPreference = localStorage.getItem("st-motion") === "reduced";
  profile = JSON.parse(localStorage.getItem("st-profile") || "{}");
  profileNames = JSON.parse(localStorage.getItem("st-profile-names") || "{}");
} catch {}
installNameTooltips();
const T = (zh, en) => (lang === "en" ? en : zh);
const media = matchMedia("(prefers-reduced-motion: reduce)"),
  reduced = () => reducedPreference || media.matches;
function remember(k, v) {
  try {
    localStorage.setItem(k, v);
  } catch {}
}
function local(value) {
  return value?.[lang] || value?.zh || value?.en || "";
}
// Placeholders: [..] names the game fills in from a save. Scripted localisation (names.json) resolves to the
// game's own wording for the reading profile; engine names use the doc's neutral, scope-aware wording. Inserted
// names are wrapped in private-use markers so the reader can show them as annotations, not as original prose.
let names = {}, namesLoading = null;
const OPEN = "\uE000", CLOSE = "\uE001";
function loadNames() {
  namesLoading ||= json("stories/names.json").then((n) => (names = n)).catch(() => { namesLoading = null; });
  return namesLoading;
}
let nameContext = null; // the reading context of the doc being rendered (computed once per render)
// Substitution rules live in src/name-fill.js (shared with the review tools in scripts/refine/).
const fill = (s, depth = 0, nested = null) =>
  fillNames(s, { lang, chapterNames: chapter?.names, names, evaluate, ctx: nameContext || { profile, assumptions }, nested, depth });
function prose(s, keepMarks = false) {
  const text = cleanRefs(fill(String(s || "")), lang)
    .replace(/§./g, "")
    .replace(/£([^£]+)£/g, "")
    .replace(/<[^>]*>/g, "");
  return keepMarks ? text : text.replace(/\uE000[^\uE002]*\uE002/g, "").replace(/\uE001/g, "");
}
// Plain text of another document's (or a specimen's) game text, worded with that document's own reviewed names
// (search snippets): prose() uses the open chapter's names.
function proseWith(s, chapterNames) {
  const text = cleanRefs(fillNames(String(s || ""), { lang, chapterNames, names, evaluate, ctx: { profile, assumptions } }), lang)
    .replace(/§./g, "").replace(/£([^£]+)£/g, "").replace(/<[^>]*>/g, "");
  return text.replace(/[^]*/g, "").replace(//g, "").replace(//g, "");
}
const paragraph = (s) => esc(prose(s, true))
  .replace(/\uE000([^\uE002\uE001]*)\uE002/g, (_, note) => `<span class="game-name" tabindex="0" role="note" data-note="${note}">`)
  .replace(/\uE001/g, "</span>")
  .replace(/\n/g, "<br>");
function toast(s) {
  $("#toast").textContent = s;
  $("#toast").classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => $("#toast").classList.remove("show"), 3500);
}
async function json(path) {
  const r = await fetch(asset(path));
  if (!r.ok) throw new Error(T("未能载入，请稍后重试。", "Could not load. Please try again."));
  return r.json();
}
const cache = new Map();
async function loadStory(id) {
  if (!cache.has(id)) {
    cache.set(
      id,
      json(`stories/${id}.json`).catch((e) => {
        cache.delete(id);
        throw e;
      }),
    );
    if (cache.size > 8) cache.delete(cache.keys().next().value);
  }
  return cache.get(id);
}
function applyMotion() {
  if(reduced())for(const selector of ['#selected-title','.chapter-document'])$(selector)?.getAnimations().forEach(animation=>animation.cancel());
  document.documentElement.classList.toggle("reduced-motion", reduced());
  $("#motion").setAttribute("aria-pressed", String(reduced()));
  $("#motion").textContent = reduced() ? T("动态已减少", "Motion reduced") : T("减少动态", "Reduce motion");
  scene?.wake();
}
$("#motion").onclick = () => {
  reducedPreference = !reducedPreference;
  remember("st-motion", reducedPreference ? "reduced" : "full");
  applyMotion();
};
media.addEventListener("change", applyMotion);
// Reconcile preferences when returning from a throttled background tab.
window.addEventListener('focus', applyMotion);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)applyMotion();});
applyMotion();
function categoryName(column) {
  return lang === "en" ? CATEGORIES[column][2] : CATEGORIES[column][1];
}
function showSelection(story, column, index) {
  selected = story;
  selectedColumn = column;
  $("#category-label").textContent = categoryName(column);
  $("#chapter-count").textContent = T(`${story.chapters} 篇`, `${story.chapters} ${story.chapters === 1 ? "document" : "documents"}`);
  $("#selected-title").textContent = prose(local(story.title));
  $("#selected-excerpt").textContent = prose(local(story.excerpt));
  $("#story-number").textContent = String(index + 1).padStart(2, "0");
  $("#story-total").textContent = `/ ${columns[column].stories.length}`;
  for (const b of $("#categories").querySelectorAll("[data-category]")) {
    b.classList.toggle("active", Number(b.dataset.category) === column);
    b.setAttribute(
      "aria-pressed",
      String(Number(b.dataset.category) === column),
    );
  }
  if (!reduced()) {
    $("#selected-title")
      .getAnimations()
      .forEach((a) => a.cancel());
    $("#selected-title").animate(
      [
        { opacity: 0.25, transform: "translateY(12px)" },
        { opacity: 1, transform: "none" },
      ],
      { duration: 320, easing: "cubic-bezier(.2,.8,.2,1)" },
    );
  }
}
function navigate(axis, direction) {
  if (scene) scene.navigate(axis, direction);
  else {
    if (axis === "lane")
      selectedColumn =
        (selectedColumn + direction + columns.length) % columns.length;
    const col = columns[selectedColumn],
      i = Math.max(0, col.stories.indexOf(selected));
    showSelection(
      col.stories[
        (i + (axis === "row" ? direction : 0) + col.stories.length) %
          col.stories.length
      ],
      selectedColumn,
      (i + (axis === "row" ? direction : 0) + col.stories.length) %
        col.stories.length,
    );
  }
}
$("#previous-story").onclick = () => navigate("row", -1);
$("#next-story").onclick = () => navigate("row", 1);
$("#previous-category").onclick = () => navigate("lane", -1);
$("#next-category").onclick = () => navigate("lane", 1);
$("#open-story").onclick = () => openStory(selected.id);
function setReader(open) {
  $("#reader").classList.remove("prewarm"); // a real opening or closing ends any idle warm-up render
  document.body.classList.toggle("reader-open", open);
  // [UI] animated enter/exit; the map fades out with the card instead of vanishing.
  revealReader($("#reader"), open, reduced());
  if (!open) {
    $("#flow-surface").classList.remove('mobile-open');
    panelScroll = -1;
  }
  $("#archive-hud").inert = open;
  $("#archive-hud").classList.toggle("concealed", open);
  $("#categories").inert = open;
  $("#categories").classList.toggle("concealed", open);
  scene?.setDetail(open);
  if (scene) scene.canvas.tabIndex = open ? -1 : 0;
}
function useDossier(data) {
  dossier = data;
  docMap = new Map(data.chapters.map((c) => [c.id, c]));
  storyFlagSet = storyFlags(data);
}
// Openings in flight (prewarmReader never starts while one is pending and yields to any that begins).
let openings = 0, pendingOpenings = 0;
function beginOpening() {
  openings++;
  pendingOpenings++;
  let ended = false;
  return () => { if (!ended) { ended = true; pendingOpenings--; } };
}
async function openStory(id, start) {
  const ticket = ++readerTicket;
  const end = beginOpening();
  try {
    const [data] = await Promise.all([loadStory(id), loadNames()]);
    if (ticket !== readerTicket) return;
    visitedChapters.clear();
    assumptions = {};
    useDossier(data);
    chapter = docMap.get(start || data.story.start) || data.chapters[0];
    trail = [{ story: id, chapter: chapter.id }];
    saveSuspended = true; // a fresh opening leaves the saved progress alone until the reader navigates further
    scene?.selectStory(id);
    openingReader = $("#reader").hidden;
    setReader(true);
    renderChapter();
  } catch (e) {
    toast(e.message);
  } finally {
    end();
  }
}
// Reading progress (src/progress.js): saved after navigation / choices / assumptions, restored via "Continue reading".
let saveSuspended = false, saveTimer = 0, pendingProgress = null;
function persist() {
  if (saveSuspended || !dossier || !trail.length) return;
  clearTimeout(saveTimer);
  saveTimer = setTimeout(flushProgress, 250);
}
function flushProgress() {
  if (!saveTimer) return;
  clearTimeout(saveTimer);
  saveTimer = 0;
  if (saveSuspended || !dossier || !trail.length) return;
  progress.save({ trail, assumptions, visited: [...visitedChapters] });
}
addEventListener("pagehide", flushProgress);
document.addEventListener("visibilitychange", () => { if (document.hidden) flushProgress(); });
// Loads the stories a saved trail touches and reconciles it with them; null when nothing valid remains.
async function restoreProgress(saved) {
  if (!saved) return null;
  const ids = [...new Set(saved.trail.map((s) => s.story))];
  const map = new Map();
  try {
    await Promise.all(ids.map(async (id) => map.set(id, await loadStory(id))));
  } catch { return undefined; } // offline / transient: keep the saved data, show nothing
  const state = progress.reconcile(saved, map);
  return state && { state, stories: map };
}
async function refreshContinue() {
  const saved = progress.load();
  const restored = await restoreProgress(saved);
  if (restored === null && saved) progress.clear(); // every step is gone: discard silently
  pendingProgress = restored || null;
  renderContinue();
  return pendingProgress;
}
function renderContinue() {
  const box = $("#continue-reading");
  if (!box) return;
  box.hidden = !pendingProgress;
  if (!pendingProgress) return;
  const last = pendingProgress.state.trail.at(-1);
  const story = pendingProgress.stories.get(last.story);
  const doc = story.chapters.find((c) => c.id === last.chapter);
  const storyTitle = prose(local(story.story.title)), docTitle = prose(local(doc.title)) || T("插曲", "Interlude");
  const label = docTitle === storyTitle ? storyTitle : `${storyTitle} · ${docTitle}`;
  box.querySelector("[data-continue]").innerHTML = `<span>${esc(T("继续阅读", "Continue reading"))}</span><small>${esc(label)}</small>`;
  box.querySelector("[data-restart]").textContent = T("重新开始", "Start over");
}
function resumeProgress(restored) {
  const { state, stories } = restored;
  const last = state.trail.at(-1);
  const ticket = ++readerTicket;
  const end = beginOpening();
  return loadNames().then(() => {
    if (ticket !== readerTicket) return;
    visitedChapters.clear();
    for (const id of state.visited) visitedChapters.add(id);
    assumptions = { ...state.assumptions };
    trail = state.trail.map((s) => ({ ...s }));
    useDossier(stories.get(last.story));
    chapter = docMap.get(last.chapter);
    readingChapterId = null; // force the choice / reading position of the last step to be re-read from the trail
    saveSuspended = false;
    scene?.selectStory(last.story);
    openingReader = $("#reader").hidden;
    setReader(true);
    renderChapter();
  }).catch((e) => toast(e.message)).finally(end);
}
function restartProgress() {
  progress.clear();
  clearTimeout(saveTimer);
  saveTimer = 0;
  pendingProgress = null;
  renderContinue();
}
(function buildContinue() {
  const box = document.createElement("div");
  box.id = "continue-reading";
  box.className = "continue-reading";
  box.hidden = true;
  box.innerHTML = `<button type="button" class="continue-link" data-continue></button><button type="button" class="continue-restart" data-restart></button>`;
  $("#open-story").after(box);
  box.querySelector("[data-continue]").onclick = () => pendingProgress && resumeProgress(pendingProgress);
  box.querySelector("[data-restart]").onclick = () => { restartProgress(); $("#open-story").focus(); };
})();
// A direct link to exactly the document the saved trail ends on is the reader's own refresh: restore the trail.
async function openFromLink(storyId, chapterId) {
  const end = beginOpening();
  try {
    return await linkOpening(storyId, chapterId);
  } finally {
    end();
  }
}
async function linkOpening(storyId, chapterId) {
  const saved = progress.load();
  if (saved && saved.trail.at(-1).story === storyId) {
    const restored = await restoreProgress(saved);
    if (restored) {
      const last = restored.state.trail.at(-1);
      const want = chapterId || restored.stories.get(storyId).story.start;
      if (last.chapter === want) return resumeProgress(restored);
    }
  }
  return openStory(storyId, chapterId);
}
// The first story opened in a page used to cost one ~50 ms frame (60 Hz desktop: 50–83 ms) while later openings,
// even of other stories, take a single frame: the reader's first layout (styles, fonts and text runs used nowhere
// else) is a once-per-page cost. Pay it in idle time instead: once the archive has settled, the opening document of
// the selected story is rendered into the reader while it is inert and fully transparent (.prewarm), laid out and
// painted for one frame, then hidden and emptied — no navigation, history, title, scene or saved-progress side
// effects. The story map follows in the next idle period the same way. Skipped if a story is opened meanwhile (a real
// opening takes the reader over: setReader drops .prewarm). It never touches readerTicket, so it cannot cancel an
// opening that is still waiting for its story to download.
let prewarming = false, prewarmed = false;
const idleOnce = () => new Promise((resolve) => (window.requestIdleCallback ? requestIdleCallback(() => resolve(), { timeout: 3000 }) : setTimeout(resolve, 200)));
const painted = () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
// Each warm-up slice waits for a quiet moment: idle time and no input for 1.5 s (so it never lands in the middle of
// browsing the archive, whose motion continues briefly after each input).
let lastInput = 0;
for (const type of ["pointerdown", "pointermove", "keydown", "wheel", "touchstart"]) addEventListener(type, () => { lastInput = performance.now(); }, { passive: true, capture: true });
async function quietMoment() {
  for (;;) {
    const wait = 1500 - (performance.now() - lastInput);
    if (wait <= 0) { await idleOnce(); if (performance.now() - lastInput >= 1500) return; }
    else await new Promise((resolve) => setTimeout(resolve, wait));
  }
}
async function prewarmReader() {
  if (prewarmed || dossier || !$("#reader").hidden || !selected) return;
  let data;
  try {
    [data] = await Promise.all([loadStory(selected.id), loadNames()]);
  } catch { return; }
  await quietMoment();
  if (prewarmed || dossier || pendingOpenings || !$("#reader").hidden) return;
  const reader = $("#reader");
  prewarming = prewarmed = true;
  const mark = openings;
  const own = () => mark === openings && !pendingOpenings;
  const doc = data.chapters.find((c) => c.id === data.story.start) || data.chapters[0];
  const show = () => { reader.classList.add("prewarm"); reader.inert = true; reader.hidden = false; };
  const hide = () => { reader.hidden = true; reader.classList.remove("prewarm"); };
  const timing = { story: data.story.id };
  // Slice 1: the document. Rendering is synchronous and the reading state is restored right after it, so only the
  // markup stays (transparent and inert) until it has been painted once.
  let t0 = performance.now();
  try {
    show();
    useDossier(data);
    chapter = docMap.get(doc.id);
    trail = [{ story: data.story.id, chapter: chapter.id }];
    saveSuspended = true;
    renderChapter();
    reader.querySelector(".chapter-document")?.getBoundingClientRect();
  } catch (e) {
    console.warn("reader warm-up skipped", e);
  } finally {
    prewarming = false;
    dossier = null; chapter = null; trail = [];
    visitedChapters.clear();
    readingChapterId = null;
    docMap = new Map();
  }
  timing.documentMs = Math.round(performance.now() - t0);
  await painted();
  if (own()) { hide(); $("#reading-content").innerHTML = ""; }
  // Slice 2 (next quiet moment): the story map, also a first-use cost.
  await quietMoment();
  if (own() && data.story.tree) {
    t0 = performance.now();
    try {
      show();
      flowSurface.update(data.story, data.chapters, doc.id, new Set([doc.id]), lang, prose, [{ story: data.story.id, chapter: doc.id }]);
      $("#flow-surface").getBoundingClientRect();
    } catch (e) {
      console.warn("map warm-up skipped", e);
    }
    timing.mapMs = Math.round(performance.now() - t0);
    await painted();
    if (own()) {
      hide();
      $("#flow-surface").hidden = true; // the next opening shows its own map once it is built
    }
  }
  window.__readerWarmup = timing;
}
function closeReader() {
  flushProgress();
  readerTicket++;
  setReader(false);
  dossier = null;
  chapter = null;
  trail = [];
  history.replaceState(null, "", "#");
  document.title = t("site.title"); // [UI]
  refreshContinue();
  $("#open-story").focus();
}
$("#close-reader").onclick = closeReader;
// Last known scroll offset of the reader text; -1 when unknown (after the reader was hidden).
let panelScroll = -1;
// True for the render that opens a hidden reader (the map is built after the card settles).
let openingReader = false;
$(".reader-panel").addEventListener("scroll", (e) => (panelScroll = e.currentTarget.scrollTop), { passive: true });
let recordsLoading = null;
function loadRecords() {
  // The record → story map is only needed for #record= links and edges without a story id.
  recordsLoading ||= json("stories/records.json").then((map) => (recordToStory = map)).catch((e) => { recordsLoading = null; throw e; });
  return recordsLoading;
}
async function goChapter(id, storyId, back = false, sets = null) {
  const ticket = ++readerTicket;
  try {
    let data = dossier;
    if (!docMap.has(id)) {
      if (!storyId) await loadRecords();
      data = await loadStory(storyId || recordToStory[id]);
    }
    if (ticket !== readerTicket) return;
    const target = data.chapters.find((c) => c.id === id);
    if (!target) return;
    if (!back) { trail.push({ story: data.story.id, chapter: id, ...(sets?.length ? { sets } : {}) }); saveSuspended = false; }
    // Cross-dossier references keep their own route rules and return history.
    if (data !== dossier) useDossier(data);
    chapter = target;
    renderChapter();
  } catch (e) {
    toast(e.message);
  }
}
function titleFor(id, storyId) {
  const c = docMap.get(id);
  if (c) return prose(local(c.title)) || T("篇章", "Document");
  const other = storyById.get(storyId || recordToStory[id]);
  return other ? prose(local(other.title)) : T("继续", "Continue");
}
function delayText(delays) {
  if (!delays?.length) return "";
  let low = 0, high = 0;
  for (const d of delays) {
    const value = (k) => Number.parseFloat(d[k]) || 0;
    const fixed = value("days") + value("months") * 30 + value("years") * 360;
    low += fixed;
    high += fixed + value("random") + value("random_days");
  }
  if (!low && !high) return "";
  const range = high > low ? `${Math.round(low)}–${Math.round(high)}` : `${Math.round(low)}`;
  return T(`约${range}天后`, `about ${range} days later`);
}
function edgeCaption(e) {
  const parts = [];
  if (e.label) parts.push(prose(local(e.label)));
  else if (e.kind === "random" && e.chance != null)
    parts.push(T(`随机结果 · 基础约${Math.round(e.chance * 100)}%`, `Random outcome · base ~${Math.round(e.chance * 100)}%`) + (e.modified ? T("（受条件修正）", " (modified)") : ""));
  else if (e.kind === "research") parts.push(T("研究完成后", "When the research completes"));
  else if (e.kind === "project") parts.push(T("项目结束后", "When the project ends"));
  else if (e.kind === "failure") parts.push(T("失败时", "On failure"));
  else if (e.kind === "stage") parts.push(T("下一阶段", "Next stage"));
  else if (e.kind === "entry") parts.push(T("开端", "Opening"));
  if (!e.label && e.when) {
    const condition = e.when.map((w) => describe(w, lang, profileNames)).filter(Boolean).join(T("；", "; "));
    if (condition) parts.push(T("条件：", "If: ") + condition);
  }
  if (!e.label) {
    const delay = delayText(e.delay);
    if (delay) parts.push(delay);
  }
  if (e.story && e.story !== dossier.story.id) parts.push(T("进入另一则故事", "Leads into another story"));
  return parts.join(" · ") || T("继续阅读", "Continue reading");
}
function edgeButton(e) {
  return `<button class="next-chapter" data-chapter="${esc(e.target)}" data-story="${esc(e.story || dossier.story.id)}"${e.sets ? ` data-sets="${esc(e.sets.join(" "))}"` : ""}><span>${esc(titleFor(e.target, e.story))}</span><small>${esc(edgeCaption(e))} →</small></button>`;
}
function edgeButtons(edges) {
  const seen = new Set();
  const unique = resolveEdges(edges, readingContext()).filter((e) => {
    if (seen.has(e.target)) return false;
    seen.add(e.target);
    return true;
  });
  const groups = new Map();
  for (const e of unique) {
    const key = e.group || `single:${e.target}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(e);
  }
  return [...groups.values()].map((list) => list.length > 1
    ? `<div class="exclusive-outcomes"><small>${esc(T("以下结果互斥，只会发生其一", "Only one of these outcomes happens"))}</small>${list.map(edgeButton).join("")}</div>`
    : edgeButton(list[0])).join("");
}
const visitedChapters = new Set();
const flowSurface = new FlowSurface($("#flow-surface"));
let readingIndex = 0,
  readingChapterId = null,
  passageIndex = 0;
let dialogueStep = 0;
let dialogueState='start', dialogueHistory=[], dialogueProfile=0, dialogueTextProfile=0;
const entryCache = new WeakMap();
/** Documents a reader can start a story from: its start and the tree root's entries. */
function storyEntries(story) {
  if (!entryCache.has(story)) {
    const nodes = story.tree?.nodes || {};
    const entries = new Set([story.start, ...(nodes.n0?.children || []).map((id) => nodes[id]?.doc).filter(Boolean)]);
    entryCache.set(story, entries);
  }
  return entryCache.get(story);
}
function readingContext() {
  // Flags set by docs and options chosen earlier on the path (only steps inside the current story are known).
  const earlier = trail.slice(0, -1).filter((step) => step.story === dossier.story.id);
  const { flags, cleared } = pathFlags(earlier, (step) => docMap.get(step.chapter));
  for (const f of [...(trail.at(-1)?.sets || []), ...(chapter?.sets || [])]) { flags.add(f); cleared.delete(f); }
  // Story-local flags can only be known absent if this reading started at one of the story's entries and stayed in it.
  const inStory = trail.filter((step) => step.story === dossier.story.id);
  const pathFromEntry = inStory.length === trail.length && storyEntries(dossier.story).has(trail[0]?.chapter);
  return { profile, assumptions, flags, cleared, storyFlags: storyFlagSet, pathFromEntry };
}
function adopt(dnf) {
  // Choosing a reading implies facts; identity facts are kept archive-wide, the rest for this reading.
  if (!dnf || dnf.length !== 1) return;
  for (const atom of dnf[0]) if (atom.label) profileNames[atom.key] = atom.label;
  applyFacts(impliedFacts(dnf), profile, assumptions);
  remember("st-profile", JSON.stringify(profile));
  remember("st-profile-names", JSON.stringify(profileNames));
}
function treeNodeFor(id) {
  const nodes = dossier.story.tree?.nodes || {};
  for (const node of Object.values(nodes)) if (node.doc === id && !node.ref) return node;
  return null;
}
let profileOptions = null, profileOpen = false;
function loadProfileOptions() {
  return json("stories/profile.json").then((p) => (profileOptions = p)).catch(() => null);
}
function profileSummary() {
  const facts = Object.entries(profile)
    .filter(([key, value]) => (value || !key.startsWith("ethic_fanatic_")) && !(key.startsWith("ethic_") && profile[key.replace("ethic_", "ethic_fanatic_")]))
    .map(([key, value]) => {
      const name = local(profileNames[key]) || key.replace(/^(ethic|auth|origin|civic)_/, "").replace(/_/g, " ");
      const fanatic = key.startsWith("ethic_fanatic_") && !/狂热|Fanatic/.test(name) ? T("狂热", "Fanatic ") : "";
      return (value ? "" : T("非", "not ")) + fanatic + name;
    });
  const assumed = Object.keys(assumptions).length;
  const chips = facts.map((f) => `<b>${esc(f)}</b>`).join("") + (assumed ? `<b>${esc(T(`${assumed} 项情境假设`, `${assumed} assumed condition${assumed > 1 ? "s" : ""}`))}</b>` : "");
  return `<div class="reading-context"><span>${esc(T("阅读设定", "Reading as"))}</span>${chips || `<i>${esc(T("未指定文明", "No empire set"))}</i>`}<button data-profile-open aria-expanded="${profileOpen}">${esc(T("文明设定", "Empire profile"))}</button>${facts.length || assumed ? `<button data-profile-reset>${esc(T("重置", "Reset"))}</button>` : ""}</div>${profileOpen ? profilePanel() : ""}`;
}
function profilePanel() {
  if (!profileOptions) return `<div class="profile-panel"><p>${esc(T("正在载入……", "Loading…"))}</p></div>`;
  const option = (value, label, selected) => `<option value="${esc(value)}"${selected ? " selected" : ""}>${esc(label)}</option>`;
  const axes = [];
  for (let i = 0; i < profileOptions.ethics.length; i += 2) {
    const [a, b] = [profileOptions.ethics[i], profileOptions.ethics[i + 1]];
    const current = profile[a.fanatic] ? a.fanatic : profile[a.key] ? a.key : profile[b.fanatic] ? b.fanatic : profile[b.key] ? b.key : "";
    axes.push(`<label><span>${esc(local(a.label))} / ${esc(local(b.label))}</span><select data-profile-axis="${i}">${option("", T("未指定", "Unspecified"), !current)}${option(a.fanatic, T("狂热", "Fanatic ") + local(a.label), current === a.fanatic)}${option(a.key, local(a.label), current === a.key)}${option(b.key, local(b.label), current === b.key)}${option(b.fanatic, T("狂热", "Fanatic ") + local(b.label), current === b.fanatic)}</select></label>`);
  }
  const g = profileOptions.gestalt, gv = profile[g.key];
  axes.push(`<label><span>${esc(local(g.label))}</span><select data-profile-gestalt>${option("", T("未指定", "Unspecified"), gv === undefined)}${option("yes", T("是", "Yes"), gv === true)}${option("no", T("否", "No"), gv === false)}</select></label>`);
  const auth = profileOptions.authorities.find((a) => profile[a.key])?.key || "";
  axes.push(`<label><span>${esc(T("政体", "Authority"))}</span><select data-profile-set="authorities">${option("", T("未指定", "Unspecified"), !auth)}${profileOptions.authorities.map((a) => option(a.key, local(a.label), a.key === auth)).join("")}</select></label>`);
  const origin = profileOptions.origins.find((o) => profile[o.key])?.key || "";
  axes.push(`<label><span>${esc(T("起源", "Origin"))}</span><select data-profile-set="origins">${option("", T("未指定", "Unspecified"), !origin)}${profileOptions.origins.map((o) => option(o.key, local(o.label), o.key === origin)).join("")}</select></label>`);
  return `<div class="profile-panel"><p>${esc(T("设定后，所有文档按此一致显示文明相关文本与选项；未指定项显示全部可能。非存档模拟。", "Once set, all documents show empire-dependent text and options consistently; unspecified traits show every possibility. Not a save simulation."))}</p>${axes.join("")}</div>`;
}
function setProfileGroup(list, key) {
  for (const item of list) delete profile[item.key];
  if (key) {
    profile[key] = true;
    const item = list.find((i) => i.key === key);
    if (item) profileNames[key] = item.label;
  }
}
function onProfileChange(target) {
  if (target.dataset.profileAxis !== undefined) {
    const i = Number(target.dataset.profileAxis);
    const pair = profileOptions.ethics.slice(i, i + 2);
    for (const e of pair) { delete profile[e.key]; delete profile[e.fanatic]; profileNames[e.key] = e.label; profileNames[e.fanatic] = e.label; }
    const e = pair.find((x) => x.key === target.value || x.fanatic === target.value);
    if (e) { profile[e.key] = true; if (target.value === e.fanatic) profile[e.fanatic] = true; }
  } else if (target.dataset.profileGestalt !== undefined) {
    if (target.value === "") delete profile[profileOptions.gestalt.key];
    else profile[profileOptions.gestalt.key] = target.value === "yes";
    profileNames[profileOptions.gestalt.key] = profileOptions.gestalt.label;
  } else if (target.dataset.profileSet) setProfileGroup(profileOptions[target.dataset.profileSet], target.value);
  remember("st-profile", JSON.stringify(profile));
  remember("st-profile-names", JSON.stringify(profileNames));
  renderChapter(true);
  document.querySelector(`[data-profile-axis="${target.dataset.profileAxis}"], [data-profile-set="${target.dataset.profileSet}"], [data-profile-gestalt]`)?.focus({ preventScroll: true });
}
document.addEventListener("change", (e) => {
  if (e.target.closest(".profile-panel select")) onProfileChange(e.target);
});
function renderBody(r, ctx) {
  // Reviewed V3 readings / dialogue text profiles keep their explicit passage selection.
  if (chapter.readings?.length || chapter.dialogue) return { html: r.texts.map((t) => `<section><p>${paragraph(local(t))}</p></section>`).join(""), tabs: "" };
  const passages = resolveBody(chapter, ctx);
  if (passageIndex >= passages.length) passageIndex = 0;
  const passage = passages[passageIndex];
  let tabs = "";
  if (passages.length > 1) {
    tabs = `<div class="reading-tabs" role="group" aria-label="${esc(T("文本版本", "Text version"))}">${passages.map((p, i) => {
      const label = describe(p.when, lang, profileNames) || T(`版本 ${i + 1}`, `Version ${i + 1}`);
      return `<button data-passage="${i}" aria-pressed="${i === passageIndex}">${esc(label)}</button>`;
    }).join("")}</div>`;
  }
  const html = (passage?.paragraphs || []).map((para) => `<section><p>${para.parts.map((part) => {
    const text = paragraph(local(part.text));
    if (part.status !== null || !part.when) return text;
    const label = describe(part.when, lang, profileNames);
    return `<span class="variant-piece"><button class="variant-condition" data-adopt='${esc(JSON.stringify(part.when))}' title="${esc(T("按此情形阅读", "Read with this condition"))}">${esc(T("若", "If"))}：${esc(label)}</button>${text}</span>`;
  }).join("")}</p></section>`).join("");
  return { html, tabs, passage };
}
function renderChapter(preservePosition = false) {
  const chapterChanged = readingChapterId !== chapter.id;
  visitedChapters.add(chapter.id);
  persist();
  if (readingChapterId !== chapter.id) {
    readingIndex = trail.at(-1)?.chapter===chapter.id ? (trail.at(-1).reading ?? 0) : 0;
    for(const step of [...trail].reverse()){
      const inherited=chapter.readings?.findIndex(view=>view.afterChoice?.chapter===step.chapter && view.afterChoice.key===step.choice && view.afterChoice.readings.includes(step.reading));
      if(inherited>=0){readingIndex=inherited;break;}
    }
    dialogueStep = 0;
    dialogueState='start'; dialogueHistory=[];
    dialogueProfile=0;
    dialogueTextProfile=0;
    passageIndex = 0;
    if(chapter.dialogue?.textProfiles){
      for(const step of [...trail].reverse()){
        const index=chapter.dialogue.textProfiles.findIndex(profile=>profile.after.includes(step.chapter));
        if(index>=0){dialogueTextProfile=index;break;}
      }
    }
    readingChapterId = chapter.id;
  }
  const ctx = readingContext();
  nameContext = ctx;
  const selectedReading = chapter.readings?.[readingIndex];
  const r = {
    ...chapter,
    texts: selectedReading
      ? selectedReading.textIndices.map((i) => chapter.texts[i]).filter(Boolean)
      : chapter.texts,
    choices: selectedReading
      ? selectedReading.choiceIndices.map((i) => ({ ...chapter.choices[i], index: i }))
      : chapter.dialogue ? chapter.choices.map((c, i) => ({ ...c, index: i })) : resolveChoices(chapter, ctx),
  };
  if (chapter.dialogue?.states) {
    if(chapter.dialogue.textProfiles)r.texts=[chapter.texts[chapter.dialogue.textProfiles[dialogueTextProfile].textIndex]];
    const excluded=chapter.dialogue.responseProfiles?.[dialogueProfile]?.excluded || [];
    const historyKeys=new Set(dialogueHistory.map(index=>chapter.choices[index].key));
    r.choices=chapter.choices.map((choice,index)=>({...choice,index})).filter((choice)=>chapter.dialogue.states[dialogueState].includes(choice.key)&&!excluded.includes(choice.index)&&!(chapter.dialogue.consumedTopics?.[choice.key]||[]).some(key=>historyKeys.has(key)));
    r.choices=r.choices.map(choice=>{
      const next=choice.next.filter(edge=>(chapter.dialogue.edgeRequirements?.[edge.target]||[]).every(key=>historyKeys.has(key)));
      return next.length===choice.next.length?choice:{...choice,next};
    });
    r.texts=[...r.texts,...dialogueHistory.flatMap(index=>{
      const choice=chapter.choices[index];
      return [choice.label,...(choice.responses||[])];
    })];
    if(dialogueState!=='end')r.next=[];
  } else if (chapter.dialogue) {
    const steps=chapter.dialogue.steps;
    r.choices=[{...chapter.choices[steps[dialogueStep]], index: steps[dialogueStep]}];
    r.texts=[...r.texts,...steps.slice(0,dialogueStep).flatMap(index=>{
      const choice=chapter.choices[index];
      return [choice.label,...(choice.responses || [])];
    })];
    if (dialogueStep<steps.length-1) r.next=[];
  }
  if (!prewarming) scene?.setChapterArt(chapter.image, chapter.title);
  // Scroll offsets come from the passive scroll listener: reading or writing scrollTop here would force a
  // synchronous layout of the half-built reader (a second full layout in the opening frame).
  const scrollPosition = panelScroll;
  r.choices = r.choices.filter(
    (c, i, a) =>
      a.findIndex(
        (x) =>
            local(x.label) === local(c.label) &&
            JSON.stringify(x.responses) === JSON.stringify(c.responses) &&
          JSON.stringify(x.next) === JSON.stringify(c.next),
      ) === i,
  );
  const story = dossier.story;
  $("#dossier-title").textContent = prose(local(story.title));
  $("#dossier-size").textContent = T(`${story.chapters} 篇`, `${story.chapters} ${story.chapters === 1 ? "document" : "documents"}`);
  const readable = dossier.chapters;
  const node = treeNodeFor(r.id);
  const via = node?.via;
  const entryCaption = via?.kind === "entry" && via.triggers?.length ? T("触发：", "Trigger: ") + via.triggers.map(local).join(T("；", "; ")) : "";
  const caption = entryCaption || (node?.parent === "n0" ? T("故事开端", "Opening") : T("当前篇章", "Current document"));
  // How the story continues from here.
  const nextEdges = resolveEdges(r.next, ctx);
  let nextReading;
  if (chapter.ending && !nextEdges.length) {
    nextReading = `<div class="reading-ending"><strong>${esc(local(chapter.ending.label))}</strong><p>${esc(local(chapter.ending.note))}</p></div>`;
  } else if (r.choices.length) {
    nextReading = `<span class="reading-complete">${esc(T("选择一个回应", "Choose a response"))}</span>`;
  } else if (!nextEdges.length) {
    nextReading = `<span class="reading-complete">${esc(T("这条路线到此结束", "This route ends here"))}</span>`;
  } else nextReading = "";
  // Parallel groups (e.g. investigations in any order, N required before the gate).
  const group = story.groups?.find((g) => g.kind === "parallel" && (g.members.includes(r.id) || g.gate === r.id));
  let groupPanel = "";
  if (group) {
    const done = group.members.filter((m) => visitedChapters.has(m)).length;
    groupPanel = `<div class="flow-investigations"><small>${esc(local(group.label))} · ${esc(T(`已读 ${done} / ${group.members.length}`, `${done} of ${group.members.length} read`))}${group.required ? esc(T(`，需要 ${group.required} 项`, ` · ${group.required} required`)) : ""}</small><p>${esc(local(group.note))}</p>${group.members.filter((m) => m !== r.id).map((m) => `<button class="reading-next${visitedChapters.has(m) ? " visited" : ""}" data-chapter="${esc(m)}"><span>${esc(titleFor(m))}</span><b>→</b></button>`).join("")}</div>`;
  }
  if ((chapter.dialogue?.states && dialogueState!=='end') || (chapter.dialogue?.steps && dialogueStep<chapter.dialogue.steps.length-1)) {
    const ended=chapter.dialogue?.exits?.includes(trail.at(-1)?.choice);
    nextReading=`<span class="reading-complete" data-dialogue-status>${ended?T('对话已结束','Conversation complete'):T('继续对话','Continue the conversation')}</span>`;
  }
  const responseFor = (c) => {
    const dialogue = (c.responses || []).map(text => `<p class="dialogue-reply">${paragraph(local(text))}</p>`).join('');
    const tooltips = (c.tooltips || []).map(text => `<p class="choice-tooltip">${paragraph(local(text))}</p>`).join('');
    const outgoing = c.next.length ? c.next : r.next.filter(e => !c.terminal || e.sourceKind !== 'stage');
    if (outgoing.length) return dialogue + tooltips + edgeButtons(outgoing);
    if (dialogue || tooltips) return dialogue + tooltips;
    return c.terminal ? `<span class="reading-complete">${esc(T("这条分支到此结束", "This branch ends here"))}</span>` : nextReading || `<span class="reading-complete">${esc(T("这条分支到此结束", "This branch ends here"))}</span>`;
  };
  const choiceNote = (c) => {
    const notes = [];
    if (c.visible === null && c.when) notes.push(T("仅在以下情形出现：", "Only when: ") + describe(c.when, lang, profileNames));
    if (c.allowed === false) notes.push(T("不可选：", "Unavailable: ") + describe(c.allow, lang, profileNames));
    else if (c.allowed === null && c.allow) notes.push(T("需要：", "Requires: ") + describe(c.allow, lang, profileNames));
    return notes.length ? `<small class="choice-condition">${esc(notes.join(" · "))}</small>` : "";
  };
  const body = renderBody(r, ctx);
  const sections = r.sections.filter((t, i, a) => local(t) && !r.texts.some((x) => local(x) === local(t)) && a.findIndex((v) => local(v) === local(t)) === i);
  const unreachable = chapter.unreachable ? `<aside class="review-note unreachable-note"><small>${esc(T("审阅结论 · 原版脚本中无法自然触发", "Review finding · not reachable in the shipped script"))}</small><p>${esc(local(chapter.unreachable))}</p></aside>` : "";
  const notes = unreachable + (chapter.notes || []).map((n) => `<aside class="review-note"><small>${esc(T("审阅注释 · 非游戏原文", "Reviewer note · not game text"))}</small><p>${esc(local(n))}</p></aside>`).join("");
  const alsoIn = (chapter.alsoIn || []).filter((id) => storyById.has(id));
  const alsoInHtml = alsoIn.length ? `<div class="also-in"><small>${esc(T("此文档也出现在：", "This document also appears in:"))}</small>${alsoIn.map((id) => `<button data-open="${esc(id)}">${esc(prose(local(storyById.get(id).title)))}</button>`).join("")}</div>` : "";
  const readingTabs = chapter.readings?.length > 1 ? (chapter.readings.length <= 5 ? `<div class="reading-tabs" role="group" aria-label="${esc(T("文明视角", "Perspective"))}">${chapter.readings.map((v, i) => `<button data-reading="${i}" aria-pressed="${i === readingIndex}">${esc(prose(local(v.label)))}</button>`).join("")}</div>` : `<label class="reading-picker"><span>${esc(T("视角", "Perspective"))}</span><select id="reading-select" aria-label="${esc(T("文明视角", "Perspective"))}">${chapter.readings.map((v, i) => `<option value="${i}" ${i === readingIndex ? "selected" : ""}>${esc(prose(local(v.label)))}</option>`).join("")}</select></label>`) : "";
  $("#reading-content").innerHTML =
    `${r.image ? `<div class="chapter-art${chapterChanged ? "" : " same-chapter"}"><img src="${asset(r.image)}"${/^art\//.test(r.image) ? ` srcset="${asset(r.image)} 1x, ${asset(r.image.replace(/^art\//, "art-hd/"))} 2x"` : ""} alt="" loading="lazy" decoding="async"/></div>` : ""}<article class="chapter-document" data-doc="${esc(r.id)}"><div class="chapter-eyebrow"><span>${esc(caption)}</span><button id="reading-back" ${trail.length < 2 ? "disabled" : ""}>${esc(T("← 上一步", "← Back"))}</button>${trail.length > 1 ? `<button id="reading-restart" class="reading-restart">${esc(T("重新开始", "Start over"))}</button>` : ""}</div><h1 id="reader-title" tabindex="-1">${esc(prose(local(r.title)) || T("插曲", "Interlude"))}</h1>${/* [UI] other-language title as a quiet subtitle */ r.title?.[lang === "zh" ? "en" : "zh"] && r.title[lang === "zh" ? "en" : "zh"] !== r.title[lang] ? `<p class="reader-subtitle" lang="${lang === "zh" ? "en" : "zh-CN"}">${esc(r.title[lang === "zh" ? "en" : "zh"].replace(/\[[^\]]*\]|§.|\$[^$]*\$/g, ""))}</p>` : ""}${profileSummary()}${readingTabs}${body.tabs}<div class="narrative">${body.html}${sections.map((t) => `<section><p>${paragraph(local(t))}</p></section>`).join("")}</div>${notes}<section class="choices">${r.choices.length ? `<div class="section-heading"><span>${esc(T("你的选择", "Your choices"))}</span><i></i></div>` : ""}${r.choices.map((c, i) => `<div class="choice${c.allowed === false ? " unavailable" : ""}"><button class="choice-button" data-choice="${i}" data-choice-source="${c.index}" aria-expanded="false"${c.allowed === false ? ' aria-disabled="true"' : ""}><span class="choice-symbol">◇</span><span>${paragraph(local(c.label) || T("继续", "Continue"))}</span><b>→</b></button>${choiceNote(c)}<div class="choice-response" hidden>${responseFor(c)}</div></div>`).join("")}</section>${nextEdges.length ? `<section class="continuation"><div class="section-heading"><span>${esc(T("故事继续", "The story continues"))}</span><i></i></div>${edgeButtons(nextEdges)}</section>` : ""}${groupPanel}${alsoInHtml}<div class="chapter-end">${nextReading}<button class="chapter-directory-link">${esc(T("剧情脉络", "Story map"))}</button></div></article>`;
  showSpecimenLinks(r.id);
  showEffects(story, r.id, r.choices);
  const remembered=trail.at(-1);
  if(remembered?.chapter===chapter.id && remembered.reading===readingIndex && remembered.choice!==undefined){
    const index=r.choices.findIndex(option=>option.key===remembered.choice);
    const button=document.querySelector(`[data-choice="${index}"]`);
    if(button){button.setAttribute('aria-expanded','true');button.parentElement.querySelector('.choice-response').hidden=false;button.closest('.choice').classList.add('chosen');}
  }
  if(dossier.summary){
    const notesBox=document.createElement('details');
    notesBox.className='story-summary';
    const heading=document.createElement('summary');
    heading.textContent=T('故事导读 · 含剧透','Story reading notes · Spoilers');
    const download=document.createElement('a');
    download.href=asset(dossier.summary.path); download.download='';
    download.textContent=T('下载 Markdown','Download Markdown');
    const text=guideElement(dossier.summary.text,lang,{show:T('显示英文','Show Chinese'),hide:T('仅显示中文','English only')});
    notesBox.append(heading,download,text);
    $('.chapter-document').append(notesBox);
  }
  $("#chapter-list").innerHTML = story.tree ? '' :
    `<div class="contents-title"><span>${esc(T("剧情脉络", "Story map"))}</span><button id="contents-close" aria-label="${esc(T("关闭剧情脉络", "Close story map"))}">×</button></div>` +
    storyMap(story, readable, r.id, visitedChapters, lang, prose, trail);
  $("#chapter-list").hidden = true;
  for (const [index,choice] of r.choices.entries()) {
    if (!choice.labelVariants?.length) continue;
    const button=document.querySelector(`[data-choice="${index}"]`);
    const label=document.createElement('label');
    label.className='reading-picker';
    label.innerHTML=`<span>${esc(T('回应视角','Response perspective'))}</span><select aria-label="${esc(T('回应视角','Response perspective'))}">${choice.labelVariants.map((variant,i)=>`<option value="${i}">${esc(local(variant.profile))}</option>`).join('')}</select>`;
    button.before(label);
    label.querySelector('select').onchange=e=>{
      button.children[1].innerHTML=paragraph(local(choice.labelVariants[Number(e.target.value)].label));
    };
  }
  if(chapter.dialogue?.responseProfiles){
    const picker=document.createElement('label');picker.className='reading-picker';
    const profileLabel=local(chapter.dialogue.profileLabel)||T('对话物种','Speaker');
    picker.innerHTML=`<span>${esc(profileLabel)}</span><select aria-label="${esc(profileLabel)}">${chapter.dialogue.responseProfiles.map((profile,i)=>`<option value="${i}" ${i===dialogueProfile?'selected':''}>${esc(local(profile.label))}</option>`).join('')}</select>`;
    document.querySelector('.narrative').before(picker);
    if(chapter.dialogue.profileLabel){
      const contextNote=document.createElement('p');contextNote.className='dialogue-context-note';
      contextNote.textContent=local(chapter.dialogue.responseProfiles[dialogueProfile].label);
      picker.after(contextNote);
    }
    picker.querySelector('select').onchange=event=>{
      dialogueProfile=Number(event.target.value);dialogueState='start';dialogueHistory=[];
      if(trail.at(-1)?.chapter===chapter.id){delete trail.at(-1).choice;delete trail.at(-1).reading;}
      renderChapter(true);document.querySelector('.reading-picker select')?.focus({preventScroll:true});
    };
  }
  // When the reader opens, the map stays hidden until the extracted card settles (90 ms delay + 460 ms motion);
  // building it once the card rests keeps both the click frame and the extraction animation free of map work.
  // Chapter changes update it in the next idle period, so the new text and the map's relayout do not share a frame.
  const updateFlow = () => flowSurface.update(story, readable, r.id, visitedChapters, lang, prose, trail);
  const ticket = readerTicket;
  const later = (f) => () => { if (ticket === readerTicket) f(); };
  if (prewarming) {} // the invisible warm-up render (prewarmReader) leaves the map alone
  else if (reduced() || !story.tree) updateFlow();
  else if (openingReader) {
    // The tree is computed in an idle moment of the opening animation, so the map's own frame only lays it out.
    (window.requestIdleCallback || ((f) => setTimeout(f, 200)))(later(() => flowSurface.prepare(story, readable)), { timeout: 450 });
    setTimeout(later(updateFlow), 600);
  }
  else (window.requestIdleCallback || ((f) => setTimeout(f, 50)))(later(updateFlow), { timeout: 250 });
  openingReader = false;
  if(chapter.dialogue?.textProfiles){
    const picker=document.createElement('label');picker.className='reading-picker';
    picker.innerHTML=`<span>${esc(T('此前的经历','Earlier events'))}</span><select aria-label="${esc(T('此前的经历','Earlier events'))}">${chapter.dialogue.textProfiles.map((profile,i)=>`<option value="${i}" ${i===dialogueTextProfile?'selected':''}>${esc(local(profile.label))}</option>`).join('')}</select>`;
    document.querySelector('.narrative').before(picker);
    picker.querySelector('select').onchange=event=>{dialogueTextProfile=Number(event.target.value);renderChapter(true);};
  }
  $("#chapter-toggle").setAttribute("aria-expanded", String(Boolean(story.tree && $("#flow-surface").classList.contains('mobile-open'))));
  const targetScroll = preservePosition ? Math.max(0, scrollPosition) : 0;
  if (targetScroll !== panelScroll || preservePosition)
    requestAnimationFrame(() => {
      $(".reader-panel").scrollTop = targetScroll;
    });
  for (const button of document.querySelectorAll("[data-reading]"))
    button.onclick = () => {
      readingIndex = Number(button.dataset.reading);
      if(trail.at(-1)?.chapter===chapter.id){delete trail.at(-1).choice;delete trail.at(-1).reading;}
      renderChapter(true);
      document
        .querySelector(`[data-reading="${readingIndex}"]`)
        ?.focus({ preventScroll: true });
    };
  for (const button of document.querySelectorAll("[data-passage]"))
    button.onclick = () => {
      const passage = resolveBody(chapter, readingContext())[Number(button.dataset.passage)];
      passageIndex = Number(button.dataset.passage);
      if (passage?.when) { adopt(passage.when); passageIndex = 0; }
      renderChapter(true);
      document.querySelector("[data-passage]")?.focus({ preventScroll: true });
    };
  if ($("#reading-select"))
    $("#reading-select").onchange = (e) => {
      readingIndex = Number(e.target.value);
      if(trail.at(-1)?.chapter===chapter.id){delete trail.at(-1).choice;delete trail.at(-1).reading;}
      renderChapter(true);
      $("#reading-select")?.focus({ preventScroll: true });
    };
  if (prewarming) return;
  if (chapterChanged) $("#reader-title").focus({ preventScroll: true });
  history.replaceState(
    null,
    "",
    `#story=${encodeURIComponent(story.id)}&chapter=${encodeURIComponent(r.id)}`,
  );
  document.title = prose(local(story.title)) + " · Stellaris Tales";
  if (!reduced() && chapterChanged)
    $(".chapter-document").animate(
      [
        { opacity: 0, transform: "translateY(4px)" },
        { opacity: 1, transform: "none" },
      ],
      { duration: 220, easing: "cubic-bezier(.2,.8,.2,1)" },
    );
}
function toggleContents(force) {
  if (dossier?.story.tree) { flowSurface.show(force); return; }
  const open = force ?? $("#chapter-list").hidden;
  $("#chapter-list").hidden = !open;
  $("#chapter-toggle").setAttribute("aria-expanded", String(open));
  if (open) $("#chapter-list .active")?.scrollIntoView({ block: "nearest" });
}
$("#chapter-toggle").onclick = () => toggleContents();
function switchLanguage() {
  lang = lang === "zh" ? "en" : "zh";
  remember("st-language", lang);
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  applyMotion();
  renderChrome();
  if (selected)
    showSelection(
      selected,
      selectedColumn,
      columns[selectedColumn].stories.indexOf(selected),
    );
  if (chapter) renderChapter(true);
  renderContinue();
  renderSearch();
  document.dispatchEvent(new CustomEvent("st-language", { detail: lang }));
}
$("#language").onclick = switchLanguage;
$("#reader-language").onclick = switchLanguage;
function renderChrome() {
  // [UI] Static chrome comes from src/i18n.js (data-i18n attributes in index.html).
  setLanguage(lang);
  applyStaticText();
  if (!columns.length) return;
  // Catalogue bar: index, localized category name and its story count.
  $("#categories").innerHTML = CATEGORIES.map(
    (_, i) =>
      `<button type="button" data-category="${i}" class="${i === selectedColumn ? "active" : ""}" aria-pressed="${i === selectedColumn}"><span>${esc(t(`cat.${CATEGORIES[i][0]}`))}<em>${esc(t("catalogue.count", { n: columns[i].stories.length }))}</em></span></button>`,
  ).join("") +
    `<button type="button" id="museum-open" class="catalogue-museum" aria-label="${esc(t("header.museumLabel"))}"><span aria-hidden="true">◇</span><span>${esc(t("header.museum"))}</span></button>`;
}
// Full-text search (src/search.js): story bodies, choices, names, effects and specimens. The index loads on the first
// open of the dialog; if it cannot load, the dialog falls back to the title/excerpt filter below.
function storyRowHtml(s, chip = "", extra = "") {
  const column = CATEGORIES.findIndex((c) => c[0] === s.category);
  return `<button class="search-story" data-open="${esc(s.id)}">${s.image ? `<img src="${asset(s.image)}" alt="" loading="lazy"/>` : '<span class="search-no-art">✧</span>'}<span><b>${esc(prose(local(s.title)))}</b><small>${chip}${esc(T(`${s.chapters} 篇`, `${s.chapters} docs`))} · ${esc(column >= 0 ? categoryName(column) : T("银河故事", "Galactic story"))}${extra}</small></span><i>↗</i></button>`;
}
const fullSearch = createSearch({
  base: "", getLang: () => lang, T, esc, prose, proseWith, fetchJson: json,
  fetchBytes: async (p) => {
    const r = await fetch(asset(p));
    if (!r.ok) throw new Error("search shard");
    return new Uint8Array(await r.arrayBuffer());
  },
  getStories: () => stories, storyTitle: (s) => local(s.title), storyRow: storyRowHtml,
});
let searchSeq = 0, searchFallback = false;
async function renderFullSearch() {
  const seq = ++searchSeq;
  $("#search-count").textContent = T("搜索中…", "Searching…");
  let r;
  try {
    r = await fullSearch.search(searchText, searchPage);
  } catch {
    if (seq !== searchSeq) return;
    searchFallback = true;
    return renderSearch();
  }
  if (seq !== searchSeq) return;
  searchPage = r.page;
  $("#search-count").textContent = T(`${r.total} 条结果`, `${r.total} results`);
  $("#search-results").innerHTML = r.html || `<p class="empty">${esc(T("没有匹配结果。", "No matches."))}</p>`;
  $("#search-page").textContent = `${r.page + 1} / ${r.pages}`;
  $("#search-previous").disabled = r.page === 0;
  $("#search-next").disabled = r.page === r.pages - 1;
  const shown = $("#search-results").children.length;
  await r.enrich($("#search-results"));
  if (seq !== searchSeq) return;
  const dropped = shown - $("#search-results").children.length;
  if (dropped > 0) $("#search-count").textContent = T(`${r.total - dropped} 条结果`, `${r.total - dropped} results`);
  if (!$("#search-results").children.length) $("#search-results").innerHTML = `<p class="empty">${esc(T("没有匹配结果。", "No matches."))}</p>`;
}
function renderSearch() {
  if (!stories.length) return;
  if (searchText.trim() && !searchFallback) return renderFullSearch();
  searchSeq++;
  const words =searchText.toLowerCase().trim().split(/\s+/).filter(Boolean),
    filtered = stories.filter(
      (s) =>
        s.visible &&
        words.every((w) =>
          `${s.title.zh} ${s.title.en} ${s.excerpt.zh} ${s.excerpt.en}`
            .toLowerCase()
            .includes(w),
        ),
    );
  const pages = Math.max(1, Math.ceil(filtered.length / 20));
  searchPage = Math.min(searchPage, pages - 1);
  $("#search-count").textContent = T(`${filtered.length} 份档案`, `${filtered.length} dossiers`);
  $("#search-results").innerHTML =
    filtered
      .slice(searchPage * 20, searchPage * 20 + 20)
      .map(
        (s) => {
          const column = CATEGORIES.findIndex((c) => c[0] === s.category);
          return `<button class="search-story" data-open="${esc(s.id)}">${s.image ? `<img src="${asset(s.image)}" alt="" loading="lazy"/>` : '<span class="search-no-art">✧</span>'}<span><b>${esc(prose(local(s.title)))}</b><small>${esc(T(`${s.chapters} 篇`, `${s.chapters} docs`))} · ${esc(column >= 0 ? categoryName(column) : T("银河故事", "Galactic story"))}</small></span><i>↗</i></button>`;
        },
      )
      .join("") || `<p class="empty">${esc(T("没有匹配结果。", "No matches."))}</p>`;
  $("#search-page").textContent = `${searchPage + 1} / ${pages}`;
  $("#search-previous").disabled = searchPage === 0;
  $("#search-next").disabled = searchPage === pages - 1;
}
$("#search-open").onclick = () => {
  fullSearch.preload();
  loadNames(); // snippets word save-dependent names like the reader
  renderSearch();
  $("#search-dialog").showModal();
  $("#search-input").focus();
};
$("#search-close").onclick = () => $("#search-dialog").close();
$("#search-input").oninput = (e) => {
  searchText = e.target.value;
  searchPage = 0;
  clearTimeout(renderSearch.timer);
  renderSearch.timer = setTimeout(renderSearch, 120);
};
$("#search-previous").onclick = () => {
  searchPage--;
  renderSearch();
};
$("#search-next").onclick = () => {
  searchPage++;
  renderSearch();
};
document.addEventListener("click", (e) => {
  const category = e.target.closest("[data-category]");
  if (category) {
    const n = Number(category.dataset.category);
    if (scene) scene.selectCategory(n);
    else showSelection(columns[n].stories[0], n, 0);
    return;
  }
  const hit = e.target.closest("[data-hash]");
  if (hit) {
    // Full-text search result: an exact chapter (#story=…&chapter=…) or a museum exhibit (#museum=…).
    $("#search-dialog").close();
    if (location.hash === hit.dataset.hash) parseHash();
    else location.hash = hit.dataset.hash;
    return;
  }
  const open = e.target.closest("[data-open]");
  if (open) {
    $("#search-dialog").close();
    openStory(open.dataset.open);
    return;
  }
  if (e.target.closest("[data-profile-open]")) {
    profileOpen = !profileOpen;
    if (profileOpen && !profileOptions) loadProfileOptions().then(() => renderChapter(true));
    renderChapter(true);
    document.querySelector("[data-profile-open]")?.focus({ preventScroll: true });
    return;
  }
  if (e.target.closest("[data-profile-reset]")) {
    profile = {}; assumptions = {};
    remember("st-profile", "{}");
    renderChapter(true);
    return;
  }
  const adoptButton = e.target.closest("[data-adopt]");
  if (adoptButton) {
    adopt(JSON.parse(adoptButton.dataset.adopt));
    renderChapter(true);
    return;
  }
  const next = e.target.closest("[data-chapter]");
  if (next) {
    goChapter(next.dataset.chapter, next.dataset.story, false, next.dataset.sets?.split(" "));
    return;
  }
  const choice = e.target.closest("[data-choice]");
  if (choice) {
    if (choice.getAttribute("aria-disabled") === "true") return;
    if(chapter.dialogue?.states && dialogueState!=='end'){
      const index=Number(choice.dataset.choiceSource);
      const key=chapter.choices[index].key;
      if(!chapter.dialogue.exits?.includes(key)){
      if(!dialogueHistory.includes(index))dialogueHistory.push(index);
      const targetState=chapter.dialogue.transitions[key]||dialogueState;
      const stateOrder=chapter.dialogue.stateOrder;
      if(!stateOrder || stateOrder.indexOf(targetState)>stateOrder.indexOf(dialogueState))dialogueState=targetState;
      renderChapter(true);
      document.querySelector('.choice-button')?.focus({preventScroll:true});
      return;
      }
    }
    if (chapter.dialogue?.steps && dialogueStep<chapter.dialogue.steps.length-1) {
      dialogueStep++;
      renderChapter(true);
      document.querySelector('.choice-button')?.focus({preventScroll:true});
      return;
    }
    const panel = choice.parentElement.querySelector(".choice-response"),
      open = panel.hidden;
    const step=trail.at(-1);
    const source=chapter.choices[Number(choice.dataset.choiceSource)];
    if(step?.chapter===chapter.id){
      if(open){step.choice=source.key;step.choiceIndex=Number(choice.dataset.choiceSource);step.reading=readingIndex;}
      else if(step.choice===source.key){delete step.choice;delete step.choiceIndex;delete step.reading;}
      persist();
    }
    if(open)for(const other of document.querySelectorAll('.choice-button')){
      if(other===choice)continue;
      other.setAttribute('aria-expanded','false');
      other.parentElement.querySelector('.choice-response').hidden=true;
      other.closest('.choice').classList.remove('chosen');
    }
    panel.hidden = !open;
    choice.setAttribute("aria-expanded", String(open));
    choice.closest(".choice").classList.toggle("chosen", open);
    const dialogueStatus=document.querySelector('[data-dialogue-status]');
    if(dialogueStatus){
      const ended=open && chapter.dialogue?.exits?.includes(source.key);
      dialogueStatus.textContent=ended?T('对话已结束','Conversation complete'):T('继续对话','Continue the conversation');
    }
    flowSurface.update(dossier.story, dossier.chapters, chapter.id, visitedChapters, lang, prose, trail);
    return;
  }
  if (e.target.closest("#reading-back") && trail.length > 1) {
    trail.pop();
    const step = trail.at(-1);
    goChapter(step.chapter, step.story, true);
  }
  if (e.target.closest("#reading-restart") && trail.length > 1) {
    const first = trail[0];
    restartProgress();
    openStory(first.story, first.chapter);
    return;
  }
  if (e.target.closest(".chapter-directory-link")) toggleContents(true);
  if (e.target.closest("#contents-close")) toggleContents(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (!$("#playlist").hidden) {
      $("#playlist").hidden = true;
      $("#playlist-toggle").setAttribute("aria-expanded", "false");
    } else if (!$("#reader").hidden && !$("#reader").classList.contains("prewarm") && !$("#search-dialog").open) closeReader();
  }
  if (
    e.key === "/" &&
    !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
  ) {
    e.preventDefault();
    $("#search-open").click();
  }
});
// Documents that award a Grand Archive specimen link to its exhibit (museum/by-doc.json, written by
// scripts/extract-specimens.py; loaded once, on the first chapter that is rendered).
let specimenMap = null;
function showSpecimenLinks(docId) {
  const add = () => {
    const entry = specimenMap?.[docId];
    const article = document.querySelector(`.chapter-document[data-doc="${CSS.escape(docId)}"]`);
    if (!entry || !article || article.querySelector(".specimen-links")) return;
    const box = document.createElement("aside");
    box.className = "specimen-links";
    box.innerHTML = `<small>${esc(T("博物天枢 · 此文档给予的标本", "Grand Archive · specimens from this document"))}</small>` +
      entry.specimens.map((key) => {
        const [zh, en] = (entry.names[key] || "|").split("|");
        return `<a href="#museum=${encodeURIComponent(key)}"><img src="${asset(`museum/img/${key}.webp`)}" alt="" width="36" height="36" loading="lazy">${esc(lang === "en" ? en || zh : zh || en)}</a>`;
      }).join("");
    const end = article.querySelector(".chapter-end");
    end ? end.before(box) : article.append(box);
  };
  if (specimenMap) return add();
  json("museum/by-doc.json").then((m) => { specimenMap = m; add(); }).catch(() => { specimenMap = {}; });
}
// Gameplay effects (public/effects/<story>.json, scripts/compile-effects.py, docs/EFFECTS.md): loaded per story and
// shown in collapsed panels — under each choice's outcome, at the end of the document, and the origin's starting
// effects on an origin's first document. Labels pass through prose() so save-dependent names read naturally.
const effectsCache = new Map();
function storyEffects(id) {
  if (!effectsCache.has(id)) {
    effectsCache.set(id, json(`effects/${id}.json`).catch(() => ({})));
    if (effectsCache.size > 6) effectsCache.delete(effectsCache.keys().next().value);
  }
  return effectsCache.get(id);
}
async function showEffects(story, docId, choices) {
  const data = await storyEffects(story.id);
  const article = document.querySelector(".chapter-document");
  if (!article || article.dataset.doc !== docId || article.querySelector(".fx")) return;
  const opts = { lang, T, esc: (s) => esc(prose(String(s ?? ""))) };
  const entry = data.docs?.[docId] || {};
  for (const button of article.querySelectorAll("[data-choice]")) {
    const effects = entry.choices?.[choices[Number(button.dataset.choice)]?.index];
    const html = effects?.length ? renderEffects(effects, opts) : "";
    const target = button.parentElement.querySelector(".choice-response");
    if (html && target) target.insertAdjacentHTML("beforeend", html);
  }
  let block = "";
  if (data.origin && docId === story.start) block += renderEffects(data.origin, { ...opts, title: T("起源 · 开局效果", "Origin · starting effects") });
  if (entry.doc) block += renderEffects(entry.doc, opts);
  if (!block) return;
  const end = article.querySelector(".specimen-links, .chapter-end");
  end ? end.insertAdjacentHTML("beforebegin", block) : article.insertAdjacentHTML("beforeend", block);
  bindEffects(article);
}
// 博物天枢 · Grand Archive specimen museum: loaded on first use (#museum or #museum=<specimen key>).
let museum = null;
async function showMuseum(focusKey) {
  try {
    museum ||= await import("./museum.js");
    if (dossier) {
      // closeReader() resets the hash; keep the museum address (#museum=<key>) for sharing and back navigation.
      const hash = location.hash;
      closeReader();
      history.replaceState(null, "", hash);
    }
    await museum.openMuseum({
      asset,
      focusKey,
      closeTo: () => {
        if (location.hash.startsWith("#museum")) history.replaceState(null, "", "#");
        scene?.wake(); // the archive stops drawing while the museum covers it
      },
    });
  } catch (e) {
    toast(T("博物天枢暂时无法打开。", "The Grand Archive could not be opened.") + " " + e.message);
  }
}
// The entry lives in the re-rendered catalogue nav, so the click is delegated on the nav itself.
$("#categories").addEventListener("click", (e) => {
  if (e.target.closest("#museum-open")) location.hash = "museum";
});
function parseHash() {
  const q = new URLSearchParams(location.hash.slice(1));
  if (location.hash.startsWith("#museum")) return showMuseum(q.get("museum") || undefined);
  museum?.closeMuseum();
  if (q.has("story")) openFromLink(q.get("story"), q.get("chapter"));
  else if (location.hash.startsWith("#record=")) {
    const id = decodeURIComponent(location.hash.slice(8));
    loadRecords().then(() => { if (recordToStory[id]) return openFromLink(recordToStory[id], id); }).catch((e) => toast(e.message));
  } else if (dossier) closeReader();
}
window.addEventListener("hashchange", parseHash);
try {
  const data = await json("stories/index.json");
  stories = data.stories;
  for (const s of stories) s.excerpt ||= { zh: "", en: "" };
  storyById = new Map(stories.map((s) => [s.id, s]));
  // Excerpts are not needed to draw the archive; fetch them right after the first paint.
  json("stories/excerpts.json").then((excerpts) => {
    for (const s of stories) s.excerpt = excerpts[s.id] || s.excerpt;
    if (selected) $("#selected-excerpt").textContent = prose(local(selected.excerpt));
    if ($("#search-dialog").open) renderSearch();
  }).catch(() => {});
  columns = CATEGORIES.map(([id, title, en]) => ({
    id,
    title,
    en,
    stories: stories.filter((s) => s.visible && s.category === id),
  }));
  renderChrome(); // [UI] also builds the catalogue bar
  $("#archive-count").textContent = "";
  try {
    scene = new ArchiveScene($("#scene"), {
      columns,
      onSelect: showSelection,
      onOpen: (s) => openStory(s.id),
      reduced,
      asset,
    });
    window.__archiveDiagnostics = () => scene.diagnostics();
    // Integrated or software adapter: dismissible notice on how to move the browser to the discrete GPU.
    showAdapterHint(scene.gpu, { t });
  } catch (e) {
    $("#scene-fallback").hidden = false;
    console.warn("3D archive unavailable; using accessible navigation.");
  }
  $("#scene").addEventListener("scene-lost", () => {
    $("#scene-fallback").hidden = false;
    toast(T("三维画面已暂停，分类和搜索仍可使用。", "The 3D view paused. Categories and search still work."));
  });
  showSelection(columns[2].stories[0], 2, 0);
  parseHash();
  if (!location.hash.startsWith("#story=") && !location.hash.startsWith("#record=")) refreshContinue();
  // After the archive has settled, prepare Chinese glyphs so the first story opens without a long layout frame.
  setTimeout(() => idleOnce().then(prewarmReader).then(() => warmGlyphs(json)), 1200);
} catch (e) {
  $("#selected-title").textContent = T("档案暂时无法连接", "Archive unavailable");
  $("#selected-excerpt").textContent = e.message;
  $("#open-story").textContent = T("重新连接", "Reconnect");
  $("#open-story").onclick = () => location.reload();
}
try {
  new SoundtrackPlayer(await json("music/playlist.json"), asset, toast);
} catch (e) {
  $("#track-title").textContent = T("原声音乐暂时未能加载", "The soundtrack could not be loaded");
  toast(e.message);
}
