import { nextUnread, storyMap } from "./story-map.js";
import { ArchiveScene } from "./archive-scene.js";
import { SoundtrackPlayer } from "./audio-player.js";
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
try {
  lang = localStorage.getItem("st-language") || "zh";
  reducedPreference = localStorage.getItem("st-motion") === "reduced";
} catch {}
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
// Resolve game-state placeholders to prose without exposing scripting syntax.
function prose(s) {
  return String(s || "")
    .replace(/§./g, "")
    .replace(/£([^£]+)£/g, lang === "zh" ? "资源" : "resources")
    .replace(/\[([^\]]+)\]/g, (_, key) => {
      if (/Species|Pop/.test(key))
        return lang === "zh" ? "这个物种" : "this species";
      if (/Leader|Scientist|Name.*leader/i.test(key))
        return lang === "zh" ? "这位领袖" : "the leader";
      if (/Ship|Fleet/i.test(key))
        return lang === "zh" ? "这支舰队" : "the fleet";
      if (/Planet|From.*Name|Capital/i.test(key))
        return lang === "zh" ? "这颗星球" : "the planet";
      if (/Name/.test(key))
        return lang === "zh" ? "我们的文明" : "our civilization";
      return lang === "zh" ? "此刻" : "at this moment";
    })
    .replace(/\$[^$]+\$/g, lang === "zh" ? "未知" : "unknown")
    .replace(/<[^>]*>/g, "");
}
const paragraph = (s) => esc(prose(s)).replace(/\n/g, "<br>");
function toast(s) {
  $("#toast").textContent = s;
  $("#toast").classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => $("#toast").classList.remove("show"), 3500);
}
async function json(path) {
  const r = await fetch(asset(path));
  if (!r.ok) throw new Error("这份记忆暂时未能抵达，请稍后重试。");
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
  document.documentElement.classList.toggle("reduced-motion", reduced());
  $("#motion").setAttribute("aria-pressed", String(reduced()));
  $("#motion").textContent = reduced() ? "动态已减少" : "减少动态";
  scene?.wake();
}
$("#motion").onclick = () => {
  reducedPreference = !reducedPreference;
  remember("st-motion", reducedPreference ? "reduced" : "full");
  applyMotion();
};
media.addEventListener("change", applyMotion);
applyMotion();
function showSelection(story, column, index) {
  selected = story;
  selectedColumn = column;
  $("#category-label").textContent = CATEGORIES[column][1];
  $("#chapter-count").textContent = `${story.chapters} 篇`;
  $("#selected-title").textContent = prose(local(story.title));
  $("#selected-excerpt").textContent = prose(local(story.excerpt));
  $("#story-number").textContent = String(index + 1).padStart(2, "0");
  $("#story-total").textContent = `/ ${columns[column].stories.length}`;
  for (const b of $("#categories").children) {
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
  document.body.classList.toggle("reader-open", open);
  $("#reader").hidden = !open;
  $("#archive-hud").inert = open;
  $("#archive-hud").classList.toggle("concealed", open);
  $("#categories").inert = open;
  $("#categories").classList.toggle("concealed", open);
  scene?.setDetail(open);
  if (scene) scene.canvas.tabIndex = open ? -1 : 0;
}
async function openStory(id, start) {
  const ticket = ++readerTicket;
  try {
    const data = await loadStory(id);
    if (ticket !== readerTicket) return;
    visitedChapters.clear();
    dossier = data;
    chapter =
      data.chapters.find((c) => c.id === (start || data.story.start)) ||
      data.chapters[0];
    trail = [{ story: id, chapter: chapter.id }];
    scene?.selectStory(id);
    setReader(true);
    renderChapter();
  } catch (e) {
    toast(e.message);
  }
}
function closeReader() {
  readerTicket++;
  setReader(false);
  dossier = null;
  chapter = null;
  trail = [];
  history.replaceState(null, "", "#");
  document.title = "群星 · 银河记忆 | Stellaris Tales";
  $("#open-story").focus();
}
$("#close-reader").onclick = closeReader;
async function goChapter(id, storyId, back = false) {
  const ticket = ++readerTicket;
  try {
    let data = dossier;
    if (!data.chapters.some((c) => c.id === id))
      data = await loadStory(storyId || recordToStory[id]);
    if (ticket !== readerTicket) return;
    const target = data.chapters.find((c) => c.id === id);
    if (!target) return;
    if (!back) trail.push({ story: data.story.id, chapter: id });
    chapter = target;
    // Referenced interludes stay inside the open story, without closing its file.
    if (data !== dossier && !dossier.chapters.some((c) => c.id === id))
      dossier = { ...dossier, chapters: [...dossier.chapters, target] };
    renderChapter();
  } catch (e) {
    toast(e.message);
  }
}
function titleFor(id) {
  const c = dossier?.chapters.find((c) => c.id === id);
  return c ? prose(local(c.title)) || "篇章" : "继续";
}
function visibleEdges(edges) {
  const seen = new Set();
  return edges.filter((e) => {
    if (seen.has(e.target)) return false;
    seen.add(e.target);
    return true;
  });
}
function edgeButtons(edges) {
  return visibleEdges(edges)
    .map(
      (e) =>
        `<button class="next-chapter" data-chapter="${esc(e.target)}" data-story="${esc(e.story || dossier.story.id)}"><span>${esc(titleFor(e.target))}</span><small>${e.conditional ? "另一种可能" : e.delayed ? "时间流逝之后" : "继续阅读"} →</small></button>`,
    )
    .join("");
}
const visitedChapters = new Set();
let readingIndex = 0,
  readingChapterId = null;
function renderChapter(preservePosition = false) {
  visitedChapters.add(chapter.id);
  if (readingChapterId !== chapter.id) {
    readingIndex = 0;
    readingChapterId = chapter.id;
  }
  const selectedReading = chapter.readings?.[readingIndex];
  const r = {
    ...chapter,
    texts: selectedReading
      ? selectedReading.textIndices.map((i) => chapter.texts[i]).filter(Boolean)
      : chapter.texts,
    choices: selectedReading
      ? selectedReading.choiceIndices.map((i) => chapter.choices[i])
      : chapter.choices,
  };
  scene?.setChapterArt(chapter.image, chapter.title);
  const scrollPosition = $(".reader-panel").scrollTop;
  r.choices = r.choices.filter(
    (c, i, a) =>
      a.findIndex(
        (x) =>
          local(x.label) === local(c.label) &&
          JSON.stringify(x.next) === JSON.stringify(c.next),
      ) === i,
  );

  $("#dossier-title").textContent = prose(local(dossier.story.title));
  $("#dossier-size").textContent = `${dossier.story.chapters} 篇`;
  const readable = [
      ...dossier.chapters.filter((c) => !c.hidden),
      ...(dossier.story.related || []).filter(
        (c) => !dossier.chapters.some((x) => x.id === c.id),
      ),
    ],
    number =
      (dossier.story.navigation?.order || readable.map((c) => c.id)).indexOf(
        r.id,
      ) + 1;
  const order = dossier.story.navigation?.order || readable.map((c) => c.id);
  const nextId = nextUnread(order, r.id, visitedChapters);
  const nextTitle = readable.find((c) => c.id === nextId)?.title;
  const nextReading = nextId
    ? `<button class="reading-next" data-chapter="${esc(nextId)}"><small>下一篇</small><span>${esc(prose(local(nextTitle)) || "继续阅读")}</span><b>→</b></button>`
    : '<span class="reading-complete">已读完</span>';
  const texts = [...r.texts, ...r.sections].filter(
    (t, i, a) => local(t) && a.findIndex((v) => local(v) === local(t)) === i,
  );
  $("#reading-content").innerHTML =
    `${r.image ? `<div class="chapter-art"><img src="${asset(r.image)}" alt=""/><span>STELLARIS / ${esc(local(dossier.story.title))}</span></div>` : ""}<article class="chapter-document"><div class="chapter-eyebrow"><span>${number > 0 ? `第 ${String(number).padStart(2, "0")} 篇` : "故事的间奏"}</span><button id="reading-back" ${trail.length < 2 ? "disabled" : ""}>← 回到上一步</button></div><h1 id="reader-title" tabindex="-1">${esc(prose(local(r.title)) || "故事的间奏")}</h1>${chapter.readings?.length > 1 ? (chapter.readings.length <= 5 ? `<div class="reading-tabs" role="group" aria-label="文明视角">${chapter.readings.map((v, i) => `<button data-reading="${i}" aria-pressed="${i === readingIndex}">${esc(prose(local(v.label)))}</button>`).join("")}</div>` : `<label class="reading-picker"><span>视角</span><select id="reading-select" aria-label="文明视角">${chapter.readings.map((v, i) => `<option value="${i}" ${i === readingIndex ? "selected" : ""}>${esc(prose(local(v.label)))}</option>`).join("")}</select></label>`) : ""}<div class="narrative">${texts.map((t, i) => `<section><p>${paragraph(local(t))}</p></section>`).join("") || ""}</div><section class="choices">${r.choices.length ? '<div class="section-heading"><span>你的选择</span><i></i></div>' : ""}${r.choices.map((c, i) => `<div class="choice"><button class="choice-button" data-choice="${i}" aria-expanded="false"><span class="choice-symbol">◇</span><span>${paragraph(local(c.label) || "继续")}</span><b>→</b></button><div class="choice-response" hidden>${c.next.length ? edgeButtons(c.next) : nextReading}</div></div>`).join("")}</section>${r.next.length ? `<section class="continuation"><div class="section-heading"><span>故事继续</span><i></i></div>${edgeButtons(r.next)}</section>` : ""}<div class="chapter-end">${nextReading}<button class="chapter-directory-link">剧情脉络</button></div></article>`;
  $("#chapter-list").innerHTML =
    `<div class="contents-title"><span>剧情脉络</span><button id="contents-close" aria-label="关闭剧情脉络">×</button></div>` +
    storyMap(dossier.story, readable, r.id, visitedChapters, lang, prose);
  $("#chapter-list").hidden = true;
  $("#chapter-toggle").setAttribute("aria-expanded", "false");
  $(".reader-panel").scrollTop = preservePosition ? scrollPosition : 0;
  for (const button of document.querySelectorAll("[data-reading]"))
    button.onclick = () => {
      readingIndex = Number(button.dataset.reading);
      renderChapter(true);
      document
        .querySelector(`[data-reading="${readingIndex}"]`)
        ?.focus({ preventScroll: true });
    };
  if ($("#reading-select"))
    $("#reading-select").onchange = (e) => {
      readingIndex = Number(e.target.value);
      renderChapter(true);
      $("#reading-select")?.focus({ preventScroll: true });
    };
  $("#reader-title").focus({ preventScroll: true });
  history.replaceState(
    null,
    "",
    `#story=${encodeURIComponent(dossier.story.id)}&chapter=${encodeURIComponent(r.id)}`,
  );
  document.title = prose(local(dossier.story.title)) + " · 群星";
  if (!reduced())
    $(".chapter-document").animate(
      [
        { opacity: 0, transform: "translateY(16px)" },
        { opacity: 1, transform: "none" },
      ],
      { duration: 600, easing: "cubic-bezier(.2,.8,.2,1)" },
    );
}
function toggleContents(force) {
  const open = force ?? $("#chapter-list").hidden;
  $("#chapter-list").hidden = !open;
  $("#chapter-toggle").setAttribute("aria-expanded", String(open));
  if (open) $("#chapter-list .active")?.scrollIntoView({ block: "nearest" });
}
$("#chapter-toggle").onclick = () => toggleContents();
function switchLanguage() {
  lang = lang === "zh" ? "en" : "zh";
  remember("st-language", lang);
  if (selected)
    showSelection(
      selected,
      selectedColumn,
      columns[selectedColumn].stories.indexOf(selected),
    );
  if (chapter) renderChapter();
  renderSearch();
}
$("#language").onclick = switchLanguage;
$("#reader-language").onclick = switchLanguage;
function renderSearch() {
  if (!stories.length) return;
  const words = searchText.toLowerCase().trim().split(/\s+/).filter(Boolean),
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
  $("#search-count").textContent = `${filtered.length} 份档案`;
  $("#search-results").innerHTML =
    filtered
      .slice(searchPage * 20, searchPage * 20 + 20)
      .map(
        (s) =>
          `<button class="search-story" data-open="${esc(s.id)}">${s.image ? `<img src="${asset(s.image)}" alt="" loading="lazy"/>` : '<span class="search-no-art">✧</span>'}<span><b>${esc(prose(local(s.title)))}</b><small>${s.chapters} 篇章 · ${CATEGORIES.find((c) => c[0] === s.category)?.[1] || "银河故事"}</small></span><i>↗</i></button>`,
      )
      .join("") || '<p class="empty">没有匹配结果。</p>';
  $("#search-page").textContent = `${searchPage + 1} / ${pages}`;
  $("#search-previous").disabled = searchPage === 0;
  $("#search-next").disabled = searchPage === pages - 1;
}
$("#search-open").onclick = () => {
  renderSearch();
  $("#search-dialog").showModal();
  $("#search-input").focus();
};
$("#search-close").onclick = () => $("#search-dialog").close();
$("#search-input").oninput = (e) => {
  searchText = e.target.value;
  searchPage = 0;
  clearTimeout(renderSearch.timer);
  renderSearch.timer = setTimeout(renderSearch, 100);
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
  const open = e.target.closest("[data-open]");
  if (open) {
    $("#search-dialog").close();
    openStory(open.dataset.open);
    return;
  }
  const next = e.target.closest("[data-chapter]");
  if (next) {
    goChapter(next.dataset.chapter, next.dataset.story);
    return;
  }
  const choice = e.target.closest("[data-choice]");
  if (choice) {
    const panel = choice.nextElementSibling,
      open = panel.hidden;
    panel.hidden = !open;
    choice.setAttribute("aria-expanded", String(open));
    choice.closest(".choice").classList.toggle("chosen", open);
    return;
  }
  if (e.target.closest("#reading-back") && trail.length > 1) {
    trail.pop();
    const step = trail.at(-1);
    goChapter(step.chapter, step.story, true);
  }
  if (e.target.closest(".chapter-directory-link")) toggleContents(true);
  if (e.target.closest("#contents-close")) toggleContents(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (!$("#playlist").hidden) {
      $("#playlist").hidden = true;
      $("#playlist-toggle").setAttribute("aria-expanded", "false");
    } else if (!$("#reader").hidden && !$("#search-dialog").open) closeReader();
  }
  if (
    e.key === "/" &&
    !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
  ) {
    e.preventDefault();
    $("#search-open").click();
  }
});
function parseHash() {
  const q = new URLSearchParams(location.hash.slice(1));
  if (q.has("story")) openStory(q.get("story"), q.get("chapter"));
  else if (location.hash.startsWith("#record=")) {
    const id = decodeURIComponent(location.hash.slice(8));
    if (recordToStory[id]) openStory(recordToStory[id], id);
  } else if (dossier) closeReader();
}
window.addEventListener("hashchange", parseHash);
try {
  const data = await json("stories/index.json");
  stories = data.stories;
  recordToStory = data.recordToStory;
  storyById = new Map(stories.map((s) => [s.id, s]));
  columns = CATEGORIES.map(([id, title, en]) => ({
    id,
    title,
    en,
    stories: stories.filter((s) => s.visible && s.category === id),
  }));
  $("#categories").innerHTML = CATEGORIES.map(
    ([id, title, en], i) =>
      `<button data-category="${i}" aria-pressed="${i === 2}"><small>${String(i + 1).padStart(2, "0")}</small><span>${title}<em>${en}</em></span></button>`,
  ).join("");
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
  } catch (e) {
    $("#scene-fallback").hidden = false;
    console.warn("3D archive unavailable; using accessible navigation.");
  }
  $("#scene").addEventListener("scene-lost", () => {
    $("#scene-fallback").hidden = false;
    toast("画面暂时休息了，仍可通过分类和搜索继续阅读。");
  });
  showSelection(columns[2].stories[0], 2, 0);
  parseHash();
} catch (e) {
  $("#selected-title").textContent = "记忆暂时失联";
  $("#selected-excerpt").textContent = e.message;
  $("#open-story").textContent = "重新连接";
  $("#open-story").onclick = () => location.reload();
}
try {
  new SoundtrackPlayer(await json("music/playlist.json"), asset, toast);
} catch (e) {
  $("#track-title").textContent = "原声音乐暂时未能加载";
  toast(e.message);
}
