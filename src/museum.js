// 博物天枢 · Grand Archive specimen museum. Loaded on demand (import() from app.js) so the archive's first paint
// never pays for it. Data: museum/specimens.json (game files, scripts/extract-specimens.py) and
// museum/models/manifest.json (generated, unofficial 3D interpretations). The 3D viewer (museum-viewer.js) is
// imported only when an exhibit with a model is opened.
import { fillNames, cleanRefs } from "./name-fill.js";
const $ = (s, r = document) => r.querySelector(s);
const lang = () => (document.documentElement.lang === "en" ? "en" : "zh");
const T = (zh, en) => (lang() === "en" ? en : zh);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const reduced = () => document.documentElement.classList.contains("reduced-motion") || matchMedia("(prefers-reduced-motion: reduce)").matches;

// Original game text: colour codes and inline icons removed. Save-dependent placeholders become the reviewed natural
// phrase for this specimen (content/museum/placeholders.json), annotated like the reader's substitutions: the shared
// tooltip (src/name-tooltip.js, installed by app.js) explains them on hover, focus and tap.
// The wording rules are the reader's (src/name-fill.js), so specimens and stories read alike.
function gameText(s, spec) {
  const filled = cleanRefs(fillNames((s || "").replace(/§[A-Za-z!]|£\w+£/g, "").trim(), { lang: lang(), chapterNames: spec?.placeholders }), lang());
  return esc(filled)
    .replace(/([^]*)/g, (_, note) => `<span class="game-name" tabindex="0" role="note" data-note="${note}">`)
    .replace(//g, "</span>")
    .replace(/\n+/g, "</p><p>");
}
const raw = (x) => x?.[lang()] || x?.en || x?.zh || "";
// Titles: a save-dependent name inside a specimen name (e.g. "[planet] Hyper Mulch") is left out.
const label = (x) => (x?.[lang()] || x?.en || x?.zh || "").replace(/§[A-Za-z!]|£\w+£/g, "").replace(/\s*\[[^\]]+\]\s*/g, " ").replace(/\s+/g, " ").trim();

let data = null, models = {}, root = null, state = { type: "all", rarity: "all", query: "", only3d: false, onlyMet: false, open: null };
// Specimens the reader has met: awarded by a chapter they have opened (app.js passes them in; empty without reading).
let met = new Set();
let viewer = null, opener = null, onClose = null, building = null, hiding = 0;
const RARITY_ORDER = ["common", "rare", "epic", "exceptional"];

export async function openMuseum({ asset, closeTo, focusKey, metKeys } = {}) {
  onClose = closeTo;
  met = metKeys || new Set();
  if (!met.size) state.onlyMet = false;
  opener = document.activeElement;
  // One build even when two opens overlap (e.g. a hash change while the data is still downloading).
  await (building ||= build(asset).catch((e) => { building = null; throw e; }));
  clearTimeout(hiding); // a close still fading out (closeMuseum) must not hide the museum opened now
  root.hidden = false;
  document.body.classList.add("museum-open");
  requestAnimationFrame(() => root.classList.add("open"));
  render();
  if (focusKey) showExhibit(focusKey);
  else $(".museum-search", root).focus({ preventScroll: true });
}

export const isOpen = () => !!root && !root.hidden && document.body.classList.contains("museum-open");

// The address names the open exhibit (#museum=<key>) and app.js calls this when it changes without a click here
// (browser / Android Back or Forward, a search result, a link): the exhibit follows the address, no history is touched.
export function syncExhibit(key) {
  if (!isOpen()) return;
  if (key) {
    if (state.open === key) return;
    showExhibit(key);
    root.querySelector(`.museum-exhibit[data-key="${key}"]`)?.scrollIntoView({ block: "nearest" });
  } else if (state.open) {
    const open = state.open;
    hideExhibit();
    root.querySelector(`.museum-exhibit[data-key="${open}"]`)?.focus({ preventScroll: true });
  }
}

export function closeMuseum() {
  if (!root || root.hidden) return;
  hideExhibit();
  root.classList.remove("open");
  document.body.classList.remove("museum-open");
  const done = () => { root.hidden = true; };
  reduced() ? done() : (hiding = setTimeout(done, 260));
  opener?.focus?.({ preventScroll: true });
  onClose?.();
}

async function build(asset) {
  if (!document.querySelector('link[data-museum-css]')) {
    const link = Object.assign(document.createElement("link"), { rel: "stylesheet", href: new URL("./museum.css", import.meta.url).href });
    link.dataset.museumCss = "";
    document.head.append(link);
  }
  const [specimens, manifest] = await Promise.all([
    fetch(asset("museum/specimens.json")).then((r) => r.json()),
    fetch(asset("museum/models/manifest.json")).then((r) => (r.ok ? r.json() : { models: [] })).catch(() => ({ models: [] })),
  ]);
  data = specimens;
  data.asset = asset;
  models = Object.fromEntries((manifest.models || []).map((m) => [m.key, m]));
  root = document.createElement("section");
  root.id = "museum";
  root.hidden = true;
  root.setAttribute("role", "dialog");
  root.setAttribute("aria-modal", "true");
  // Absolute URLs: a url() inside a custom property resolves against the stylesheet that uses it (src/museum.css).
  const abs = (p) => new URL(asset(p), location.href).href;
  root.style.setProperty("--museum-floor", `url("${abs("museum/ui/grand_archive_collection_active_bg.webp")}")`);
  root.style.setProperty("--museum-pedestal", `url("${abs("museum/ui/exhibit_pedestals.webp")}")`);
  document.body.append(root);
  root.addEventListener("click", onClick);
  root.addEventListener("input", onInput);
  root.addEventListener("keydown", onKey);
  document.addEventListener("st-language", () => { if (!root.hidden) { render(); if (state.open) showExhibit(state.open, true); } });
}

function filtered() {
  const q = state.query.trim().toLowerCase();
  return data.specimens.filter((s) =>
    (state.type === "all" || s.type === state.type) &&
    (state.rarity === "all" || s.rarity === state.rarity) &&
    (!state.only3d || models[s.key]) &&
    (!state.onlyMet || met.has(s.key)) &&
    (!q || [s.name.zh, s.name.en, s.short.zh, s.short.en, s.key].some((t) => (t || "").toLowerCase().includes(q))),
  ).sort((a, b) => RARITY_ORDER.indexOf(b.rarity) - RARITY_ORDER.indexOf(a.rarity) || label(a.name).localeCompare(label(b.name), lang()));
}

function render() {
  const a = data.archive;
  const list = filtered();
  // `key`: a rarity chip carries a small frame in the rarity's colour, the same one that frames its pedestals below.
  const chip = (group, value, text, count, key = "") =>
    `<button class="museum-chip" data-filter="${group}" data-value="${value}" aria-pressed="${state[group] === value}">${key ? `<i class="museum-key rarity-${key}" aria-hidden="true"></i>` : ""}${esc(text)}${count != null ? ` <small>${count}</small>` : ""}</button>`;
  const typeCount = (t) => data.specimens.filter((s) => s.type === t).length;
  const rarCount = (r) => data.specimens.filter((s) => s.rarity === r).length;
  const nModels = Object.keys(models).length;
  root.setAttribute("aria-label", label(a.name));
  root.innerHTML = `
    <div class="museum-floor" aria-hidden="true"></div>
    <header class="museum-head">
      <div>
        <h1>${esc(label(a.name))} <span lang="${lang() === "zh" ? "en" : "zh-CN"}">${esc(lang() === "zh" ? a.name.en : a.name.zh)}</span></h1>
        <div class="museum-concept"><p>${gameText(raw(a.specimenConcept))}</p></div>
      </div>
      <button class="museum-close" data-close aria-label="${esc(T("离开博物天枢", "Leave the Grand Archive"))}">×</button>
    </header>
    <div class="museum-tools">
      <label class="museum-search-wrap"><span aria-hidden="true">⌕</span><input class="museum-search" type="search" value="${esc(state.query)}" placeholder="${esc(T("搜索标本名称或描述", "Search names and descriptions"))}" aria-label="${esc(T("搜索标本", "Search specimens"))}"></label>
      <div class="museum-chips" role="group" aria-label="${esc(T("展区", "Collection"))}">
        ${chip("type", "all", T("全部展区", "All collections"), data.specimens.length)}
        ${Object.entries(a.types).map(([k, v]) => chip("type", k, label(v), typeCount(k))).join("")}
      </div>
      <div class="museum-chips" role="group" aria-label="${esc(T("稀有度", "Rarity"))}">
        ${chip("rarity", "all", T("全部稀有度", "All rarities"))}
        ${RARITY_ORDER.map((r) => chip("rarity", r, label(a.rarities[r]), rarCount(r), r)).join("")}
      </div>
      ${nModels < data.specimens.length ? `<button class="museum-chip" data-toggle3d aria-pressed="${state.only3d}">${esc(T("仅看有三维模型", "With 3D model only"))} <small>${nModels}</small></button>` : ""}
      ${met.size ? `<button class="museum-chip museum-chip-met" data-togglemet aria-pressed="${state.onlyMet}"><i aria-hidden="true"></i>${esc(T("阅读中遇到", "Met while reading"))} <small>${met.size}</small></button>` : ""}
    </div>
    <p class="museum-count" aria-live="polite">${esc(T(`${list.length} 件标本`, `${list.length} ${list.length === 1 ? "specimen" : "specimens"}`))}</p>
    <ul class="museum-grid" role="list">
      ${list.map((s) => `<li><button class="museum-exhibit rarity-${s.rarity}${met.has(s.key) ? " met" : ""}" data-key="${s.key}" aria-label="${esc(label(s.name))} · ${esc(label(a.rarities[s.rarity]))}${met.has(s.key) ? esc(T(" · 阅读中遇到", " · met while reading")) : ""}">
        <span class="museum-pedestal" aria-hidden="true"><img src="${esc(data.asset(s.icon.url))}" alt="" loading="lazy" decoding="async" width="100" height="100"></span>
        <span class="museum-name">${esc(label(s.name))}</span>${models[s.key] && nModels < data.specimens.length ? `<span class="museum-3d-badge">3D</span>` : ""}
      </button></li>`).join("")}
    </ul>
    <aside class="museum-detail" hidden></aside>`;
}

function formatEffect(e) {
  const v = e.percent ? `${e.value > 0 ? "+" : ""}${+(e.value * 100).toFixed(2)}%` : `${e.value > 0 ? "+" : ""}${+e.value.toFixed(3)}`;
  const name = label(e.label) || `${(e.modifier || e.resource).replace(/_/g, " ")} ${T("（游戏未提供名称）", "(no game label)")}`;
  const when = e.conditions?.length ? `<span class="museum-cond">${esc(T("条件：", "If: "))}${e.conditions.map((c) => esc(label(c.label))).join(T("，且", ", and "))}</span>` : "";
  return `<li><b>${esc(v)}</b><span class="museum-eff">${esc(name)}${e.monthly ? esc(T(" / 月", " / month")) : ""}${when}</span></li>`;
}

function acquisitionHtml(s) {
  if (!s.acquisition.length) return `<p class="museum-note">${esc(T("原版脚本中没有任何事件、效果或奖励池给予此标本。", "No event, effect or reward pool in the shipped scripts awards this specimen."))}</p>`;
  const kind = { give_specimen: T("来自故事", "From the story"), event_specimen: T("来自事件", "From an event"), random_pool: T("随机奖励", "Random reward") };
  const seen = new Set();
  return `<ul class="museum-acq">${s.acquisition.filter((a) => {
    const k = (a.story || a.from) + a.kind;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  }).slice(0, 12).map((a) => {
    const where = a.story
      ? `<a href="#story=${encodeURIComponent(a.story)}${a.from ? `&chapter=${encodeURIComponent(a.from)}` : ""}" data-story="${esc(a.story)}">${esc(label(a.title))}</a>`
      : `<span>${esc(label(a.label) || T("游戏机制", "Game mechanic"))}</span>`;
    return `<li><small>${esc(kind[a.kind] || a.kind)}</small> ${where}</li>`;
  }).join("")}</ul>`;
}

function showExhibit(key, keepFocus = false) {
  const s = data.specimens.find((x) => x.key === key);
  if (!s) return;
  state.open = key;
  const a = data.archive;
  const panel = $(".museum-detail", root);
  const model = models[key];
  panel.hidden = false;
  panel.setAttribute("aria-label", label(s.name)); // focus moves to Close: the name gives context, no live region
  panel.innerHTML = `
    <button class="museum-close museum-detail-close" data-close-detail aria-label="${esc(T("关闭标本", "Close specimen"))}">×</button>
    <div class="museum-stage rarity-${s.rarity}">
      <img class="museum-stage-image" src="${esc(data.asset(s.icon.url.replace(/^museum\/img\//, "museum/img-hd/")))}" data-original="${esc(data.asset(s.icon.url))}" onerror="if(this.dataset.original&&this.src!==this.dataset.original){this.src=this.dataset.original}" alt="${esc(label(s.name))}" width="100" height="100" decoding="async">
      ${model ? `<div class="museum-viewer" tabindex="0" role="img" aria-label="${esc(T("可旋转、缩放的三维模型：拖动旋转，滚轮或 +/- 缩放，方向键旋转，0 复位", "Rotatable 3D model: drag to rotate, wheel or +/- to zoom, arrow keys to rotate, 0 to reset"))}"></div>
        <div class="museum-view-toggle" role="group"><button data-view="3d" aria-pressed="true">${esc(T("三维模型", "3D model"))}</button><button data-view="image" aria-pressed="false">${esc(T("原版图像", "Original image"))}</button><button data-reset-view title="${esc(T("回到初始视角（0）", "Back to the opening view (0)"))}">${esc(T("复位", "Reset"))}</button></div>` : ""}
    </div>
    <p class="museum-disclaimer">${esc(model
      ? T("非官方三维诠释：由游戏中 100×100 像素的标本图标自动生成，看不到的面不是官方设定。", "Unofficial 3D interpretation generated from the game's 100×100 px specimen icon; unseen surfaces are not canonical.")
      : T("尚无三维模型，显示原版图像。", "No 3D model yet — showing the original image."))}</p>
    <div class="museum-text rarity-${s.rarity}">
      <p class="museum-eyebrow">${esc(label(a.types[s.type]))} · <span class="museum-rarity">${esc(label(a.rarities[s.rarity]))}</span></p>
      <h2>${esc(label(s.name))}</h2>
      <p class="museum-other-lang" lang="${lang() === "zh" ? "en" : "zh-CN"}">${esc(lang() === "zh" ? s.name.en : s.name.zh)}</p>
      <div class="museum-desc"><p>${gameText(raw(s.short), s)}</p><p>${gameText(raw(s.details), s)}</p></div>
      <h3>${esc(T("展览效果", "While exhibited"))}</h3>
      <p class="museum-note">${esc(T("展出时生效；基础值，随展区加成变化。", "Active while exhibited; base values, scaled by the collection bonus."))}</p>
      <ul class="museum-effects">${s.effects.map(formatEffect).join("")}</ul>
      <h3>${esc(T("获得方式", "How it is acquired"))}</h3>
      ${acquisitionHtml(s)}
      <details class="museum-sources"><summary>${esc(T("来源与模型信息", "Sources and model information"))}</summary>
        <p>${esc(s.source)} · ${esc(s.icon.source)}</p>
        ${model ? `<p>${esc(T("模型：", "Model: "))}${esc(model.file)} · ${esc(model.generator)} · ${esc(model.triangles)} ${esc(T("个三角面", "triangles"))} · ${esc(Math.round(model.bytes / 1024))} KB · <a href="${esc(data.asset(model.file))}" download>${esc(T("下载 GLB", "Download GLB"))}</a></p>` : ""}
      </details>
    </div>`;
  root.classList.add("detail-open");
  for (const b of root.querySelectorAll(".museum-exhibit")) b.classList.toggle("active", b.dataset.key === key);
  if (!keepFocus) $(".museum-detail-close", panel).focus({ preventScroll: true });
  if (model) mountViewer(panel, model, s);
  else disposeViewer();
}

async function mountViewer(panel, model, s) {
  const el = $(".museum-viewer", panel);
  const img = $(".museum-stage-image", panel);
  img.classList.add("behind");
  try {
    const { ExhibitViewer } = await import("./museum-viewer.js");
    if (state.open !== s.key) return;
    viewer ||= new ExhibitViewer({ reduced });
    window.__museumViewer = () => viewer.diagnostics();
    await viewer.show(el, data.asset(model.file), model);
    el.classList.add("ready");
  } catch (e) {
    // Loading failure: fall back to the original image and say so.
    el.remove();
    img.classList.remove("behind");
    panel.querySelector(".museum-view-toggle")?.remove();
    const note = $(".museum-disclaimer", panel);
    if (note) note.textContent = T("三维模型未能载入，显示原版图像。", "The 3D model could not be loaded — showing the original image.");
    console.warn("museum model failed", model.file, e);
  }
}

function disposeViewer() {
  viewer?.detach();
}

function hideExhibit() {
  state.open = null;
  disposeViewer();
  const panel = root && $(".museum-detail", root);
  if (panel) { panel.hidden = true; panel.innerHTML = ""; }
  root?.classList.remove("detail-open");
}

// History, mirroring the reader (app.js closeReader): an exhibit opened by a tap pushes its own entry (#museum=<key>,
// state.museumDetail) so Back closes the exhibit first and the museum second. Closing by × / Escape / a filter steps
// back over that entry rather than leaving a duplicate; an exhibit that arrived with the address (link, search result,
// reload) has no entry of its own and only rewrites the address.
function openExhibit(key) {
  const entering = !state.open;
  showExhibit(key);
  if (state.open !== key) return;
  const address = `#museum=${encodeURIComponent(key)}`;
  if (entering && !history.state?.museumDetail) history.pushState({ museumDetail: 1 }, "", address);
  else history.replaceState(history.state, "", address);
}
function closeExhibit() {
  if (!state.open) return;
  hideExhibit();
  if (history.state?.museumDetail) history.back(); // app.js: the address change finds the exhibit already closed
  else if (location.hash.startsWith("#museum=")) history.replaceState(history.state, "", "#museum");
}

function onClick(e) {
  const t = e.target;
  if (t.closest("[data-close]")) return closeMuseum();
  if (t.closest("[data-close-detail]")) {
    const key = state.open;
    closeExhibit();
    root.querySelector(`.museum-exhibit[data-key="${key}"]`)?.focus({ preventScroll: true });
    return;
  }
  const f = t.closest("[data-filter]");
  if (f) { state[f.dataset.filter] = f.dataset.value; closeExhibit(); render(); root.querySelector(`[data-filter="${f.dataset.filter}"][data-value="${f.dataset.value}"]`)?.focus(); return; }
  if (t.closest("[data-togglemet]")) { state.onlyMet = !state.onlyMet; closeExhibit(); render(); root.querySelector("[data-togglemet]")?.focus(); return; }
  if (t.closest("[data-toggle3d]")) { state.only3d = !state.only3d; closeExhibit(); render(); root.querySelector("[data-toggle3d]")?.focus(); return; }
  const ex = t.closest(".museum-exhibit");
  if (ex) return openExhibit(ex.dataset.key);
  if (t.closest("[data-reset-view]")) {
    root.querySelector('[data-view="3d"]')?.click();
    viewer?.resetView();
    return;
  }
  const v = t.closest("[data-view]");
  if (v) {
    const three = v.dataset.view === "3d";
    for (const b of root.querySelectorAll("[data-view]")) b.setAttribute("aria-pressed", String(b === v));
    $(".museum-viewer", root)?.classList.toggle("hidden-view", !three);
    $(".museum-stage-image", root)?.classList.toggle("behind", three);
    return;
  }
  const story = t.closest("[data-story]");
  // The link's own #story=…&chapter=… address opens the awarding document; app.js closes the museum on that hash
  // change (closing it first would count as leaving the museum and return to the story it was opened from).
  if (story) return;
}

function onInput(e) {
  if (!e.target.classList.contains("museum-search")) return;
  state.query = e.target.value;
  const pos = e.target.selectionStart;
  closeExhibit();
  render();
  const input = $(".museum-search", root);
  input.focus();
  input.setSelectionRange(pos, pos);
}

function onKey(e) {
  if (e.key === "Escape") {
    e.stopPropagation();
    if (state.open) { const key = state.open; closeExhibit(); root.querySelector(`.museum-exhibit[data-key="${key}"]`)?.focus(); }
    else closeMuseum();
    return;
  }
  const ex = e.target.closest?.(".museum-exhibit");
  if (ex && ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].includes(e.key)) {
    const all = [...root.querySelectorAll(".museum-exhibit")];
    const i = all.indexOf(ex);
    const cols = Math.max(1, Math.round(root.querySelector(".museum-grid").clientWidth / ex.parentElement.clientWidth));
    const step = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: cols, ArrowUp: -cols }[e.key];
    all[Math.min(all.length - 1, Math.max(0, i + step))]?.focus();
    e.preventDefault();
  }
  if (e.target.closest?.(".museum-viewer") && viewer) viewer.key(e);
}
