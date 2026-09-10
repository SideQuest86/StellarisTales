import { createDeckMotion } from "./motion.js";
const $ = (q, r = document) => r.querySelector(q);
const isDev =
  location.pathname === "/" &&
  !document
    .querySelector("link[rel=icon]")
    .getAttribute("href")
    .startsWith("./mark");
const base = isDev ? "./public/" : "./";
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const clean = (s) =>
  String(s ?? "")
    .replace(/§./g, "")
    .replace(/£([^£]+)£/g, "[$1]")
    .replace(/<[^>]*>/g, "");
const fmt = (s) =>
  esc(clean(s))
    .replace(/\n/g, "<br>")
    .replace(/(\[[^\]\n]+\]|\$[^$\n]+\$)/g, '<span class="variable">$1</span>');
let lang = "zh",
  category = "all",
  page = 0,
  query = "",
  all = [],
  byId = new Map(),
  groups = [],
  featured = [],
  feature = 0,
  current = null,
  trail = [],
  request = 0;
let motionPref = false;
try {
  lang = localStorage.getItem("st-language") || "zh";
  motionPref = localStorage.getItem("st-motion") === "reduced";
} catch {}
const media = matchMedia("(prefers-reduced-motion: reduce)");
const reduced = () => motionPref || media.matches;
const remember = (k, v) => {
  try {
    localStorage.setItem(k, v);
  } catch {}
};
const categories = [
  ["all", "全部档案", "ALL RECORDS"],
  ["origins", "起源故事", "ORIGINS"],
  ["crisis", "银河天灾", "CRISES"],
  ["precursors", "先驱者与考古", "PRECURSORS"],
  ["rifts", "星界裂隙", "ASTRAL RIFTS"],
  ["leviathans", "星神与巨兽", "LEVIATHANS"],
  ["exploration", "深空探索", "EXPLORATION"],
  ["society", "文明与社会", "CIVILIZATIONS"],
  ["stories", "其他事件链", "STORY CHAINS"],
];
const categoryName = (id) => categories.find((c) => c[0] === id)?.[1] || id;
const title = (r) => clean(r?.[lang] || r?.zh || r?.en || r?.id || "");
const local = (t) =>
  t?.sources?.[lang]
    ? t[lang]
    : t?.[lang] || t?.[lang === "zh" ? "en" : "zh"] || t?.key || "";
const cache = new Map();
async function json(url) {
  const r = await fetch(base + url);
  if (!r.ok) throw new Error(`档案读取失败 (${r.status})`);
  return r.json();
}
async function getRecord(id) {
  const meta = byId.get(id);
  if (!meta) return null;
  if (!cache.has(meta.group)) {
    cache.set(
      meta.group,
      json(`data/groups/${meta.group}.json`).catch((e) => {
        cache.delete(meta.group);
        throw e;
      }),
    );
    if (cache.size > 8) cache.delete(cache.keys().next().value);
  }
  return (await cache.get(meta.group)).find((r) => r.id === id);
}
function toast(s) {
  $("#toast").textContent = s;
  $("#toast").classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => $("#toast").classList.remove("show"), 3000);
}
function applyMotion() {
  document.documentElement.classList.toggle("reduced-motion", reduced());
  $("#motion").textContent = reduced() ? "动效：减少" : "动效：开启";
  $("#motion").setAttribute("aria-pressed", String(reduced()));
  deckMotion.refresh();
}
const deckMotion = createDeckMotion($("#deck"), reduced);
$("#motion").onclick = () => {
  motionPref = !motionPref;
  remember("st-motion", motionPref ? "reduced" : "full");
  applyMotion();
};
media.addEventListener("change", applyMotion);
applyMotion();
function renderFeatured() {
  const r = featured[feature];
  if (!r) return;
  $("#featured").innerHTML =
    `<span class="eyebrow">精选档案 / ${esc(categoryName(r.category))}</span><div class="record-code">${esc(r.id)} <span>● 已归档</span></div><h1>${esc(title(r))}</h1><p>${fmt(r.excerpt[lang] || r.excerpt.zh || r.excerpt.en).slice(0, 700)}</p><button class="access" data-open="${esc(r.id)}">调阅档案 <span>ACCESS RECORD ↗</span></button><div class="featured-meta"><span>${String(r.options).padStart(2, "0")} 个原版选项</span><span>中文 / ENGLISH</span><span>原版事件图像</span></div>`;
  if (!reduced())
    $("#featured").animate(
      [
        { opacity: 0.3, transform: "translateY(12px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 380, easing: "cubic-bezier(.2,.8,.2,1)" },
    );
  $("#feature-number").textContent =
    `${String(feature + 1).padStart(2, "0")} / ${String(featured.length).padStart(2, "0")}`;
  deckMotion.select(feature);
}
function renderDeck() {
  $("#deck").innerHTML = featured
    .map(
      (r, i) =>
        `<button class="archive-slab" data-feature="${i}" aria-label="选择 ${esc(title(r))}" aria-pressed="false"><span class="slab-top">ST / ${String(i + 1).padStart(3, "0")} <b>✦</b></span><img src="${base + r.image}" alt=""/><span class="slab-diagram" aria-hidden="true">◎<i></i></span><span class="slab-title">${esc(title(r))}</span><span class="slab-foot">${esc(r.id)} <b>↗</b></span></button>`,
    )
    .join("");
  deckMotion.reset();
  renderFeatured();
}
$("#prev-feature").onclick = () => {
  feature = (feature - 1 + featured.length) % featured.length;
  renderFeatured();
};
$("#next-feature").onclick = () => {
  feature = (feature + 1) % featured.length;
  renderFeatured();
};
function renderCategories() {
  $("#categories").innerHTML = categories
    .map(
      ([id, zh, en], i) =>
        `<button data-category="${id}" class="${category === id ? "active" : ""}" aria-pressed="${category === id}"><span class="category-num">${String(i).padStart(2, "0")}</span><span>${zh}<small>${en}</small></span><span class="category-count">${all.filter((r) => (id === "all" || r.category === id) && r.hasText && !r.hidden).length}</span></button>`,
    )
    .join("");
}
function renderResults() {
  const technical = $("#technical").checked;
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const filtered = all.filter(
    (r) =>
      (technical || (r.hasText && !r.hidden)) &&
      (category === "all" || r.category === category) &&
      words.every((w) =>
        `${r.zh} ${r.en} ${r.id} ${r.excerpt.zh} ${r.excerpt.en}`
          .toLowerCase()
          .includes(w),
      ),
  );
  const pages = Math.max(1, Math.ceil(filtered.length / 24));
  page = Math.min(page, pages - 1);
  $("#result-count").textContent =
    `${filtered.length.toLocaleString()} 份档案${query ? " / 检索结果" : " / " + categoryName(category)}`;
  $("#story-grid").innerHTML =
    filtered
      .slice(page * 24, page * 24 + 24)
      .map(
        (r, i) =>
          `<button class="story-card" data-open="${esc(r.id)}" style="--order:${i % 6}"><div class="card-image">${r.image ? `<img src="${base + r.image}" alt="" loading="lazy" decoding="async"/>` : '<div class="no-art" aria-hidden="true">✧</div>'}<span>${esc(categoryName(r.category))}</span><b>↗</b></div><div class="card-body"><span class="card-code">${esc(r.id)}</span><h3>${esc(title(r))}</h3><p>${esc(clean(r.excerpt[lang] || r.excerpt.zh || r.excerpt.en))}</p><div class="card-meta"><span>${r.options} 个选项</span><span>${r.hidden ? "后台事件" : r.kind.endsWith("_event") ? "事件档案" : "剧情定义"} · ZH / EN</span></div></div></button>`,
      )
      .join("") ||
    '<div class="empty"><span>⌕</span><h3>未找到匹配的档案</h3><p>试试英文关键词、事件 ID，或启用后台事件与定义。</p><button id="clear-search">清除检索</button></div>';
  $("#page-status").textContent = `${page + 1} / ${pages}`;
  $("#prev-page").disabled = page === 0;
  $("#next-page").disabled = page >= pages - 1;
}
$("#search").addEventListener("input", (e) => {
  query = e.target.value;
  page = 0;
  clearTimeout(renderResults.timer);
  renderResults.timer = setTimeout(renderResults, 130);
});
$("#technical").onchange = () => {
  page = 0;
  renderResults();
};
for (const [id, step] of [
  ["prev-page", -1],
  ["next-page", 1],
])
  $("#" + id).onclick = () => {
    page += step;
    renderResults();
    $("#catalogue").scrollIntoView({
      behavior: reduced() ? "instant" : "smooth",
    });
  };
function linkButtons(links) {
  return links
    .map((l) => {
      const m = byId.get(l.target);
      return `<div class="branch-edge">${m ? `<button data-open="${esc(l.target)}"><span>${esc(title(m))}</span><small>${esc(l.target)} ${l.days ? ` / 延迟 ${esc(l.days)} 天` : ""}</small><b>→</b></button>` : `<p class="unresolved">未解析的运行时目标：${esc(l.target)}</p>`}${l.condition ? `<details><summary>条件 / 随机分支</summary><pre>${esc(l.condition)}</pre></details>` : ""}</div>`;
    })
    .join("");
}
function localizedBlock(t, heading) {
  if (!local(t)) return "";
  return `<section class="text-variant">${heading ? `<span class="variant-label">${esc(heading)}</span>` : ""}<p>${fmt(local(t))}</p>${!t.sources?.[lang] && t.key ? '<small class="fallback">此语言无对应条目，显示另一语言或原始键。</small>' : ""}${t.condition ? `<details><summary>此段文本的显示条件</summary><pre>${esc(t.condition)}</pre></details>` : ""}</section>`;
}
function renderReader(r) {
  current = r;
  const m = byId.get(r.id);
  document.title = `${title(m)} · 群星叙事档案馆`;
  const siblings = all.filter((s) => s.group === r.group);
  const name = local(r.titles[0]) || r.id;
  const optionTargets = new Set(
    r.options.flatMap((o) => o.links.map((l) => l.target)),
  );
  const otherLinks = r.links.filter((l) => !optionTargets.has(l.target));
  $("#reader-content").innerHTML =
    `<div class="reader-toolbar"><button id="close-reader">← 返回档案馆</button><span>${esc(r.id)}</span><div><button id="reader-language">${lang === "zh" ? "ENGLISH" : "中文"}</button><button id="reader-back" ${trail.length < 2 ? "disabled" : ""}>上一步</button></div></div><div class="reader-layout"><aside class="reader-art"><div class="reader-art-image">${r.picture ? `<img src="${base + r.picture.url}" alt="${esc(title(m))}的原版事件插图"/>` : '<div class="no-art">✧</div>'}<div class="image-crosshair" aria-hidden="true"></div></div><div class="art-caption"><span>VISUAL RECORD / 原版事件图像</span><small>${esc(r.picture?.source || "此档案没有独立插图")}</small></div><div class="reading-route"><span class="eyebrow">阅读路径 / ${trail.length} 个节点</span><div>${trail.map((id, i) => `<button data-trail="${i}" class="${i === trail.length - 1 ? "active" : ""}"><span>${String(i + 1).padStart(2, "0")}</span>${esc(title(byId.get(id)))}</button>`).join("")}</div></div><details class="related"><summary>同源档案 · ${siblings.length}</summary><div>${siblings.map((s) => `<button data-open="${esc(s.id)}" ${s.id === r.id ? 'aria-current="true"' : ""}>${esc(title(s))}<small>${esc(s.id)}</small></button>`).join("")}</div></details></aside><article class="reader-document"><span class="eyebrow">${esc(categoryName(m.category))} / ${r.hidden ? "后台事件" : "已解密档案"}</span><h1 id="reader-title" tabindex="-1">${esc(clean(name))}</h1><div class="document-meta"><span>${esc(r.id)}</span><span>原版${lang === "zh" ? "中文" : "英文"}文本</span><span>${r.options.length} 个选项</span></div>${r.hidden ? '<p class="notice">这是后台事件；游戏中不会弹出独立窗口。可查看脚本与后续连接。</p>' : ""}<div class="narrative">${r.descriptions.map((t, i) => localizedBlock(t, r.descriptions.length > 1 ? `文本变体 ${i + 1} / ${r.descriptions.length}` : "")).join("") || '<p class="notice">此事件未定义独立正文。请查看关联节点或原始脚本。</p>'}${r.sections.map((t) => localizedBlock(t, t.key)).join("")}</div>${
      r.titles.length > 1
        ? `<details><summary>其他条件标题 (${r.titles.length - 1})</summary>${r.titles
            .slice(1)
            .map((t) => localizedBlock(t))
            .join("")}</details>`
        : ""
    }<section class="choices"><div class="section-label"><span>作出选择</span><small>原版事件选项 / ALL BRANCHES</small></div>${r.options.map((o, i) => `<details class="choice"><summary><span class="choice-index">${String(i + 1).padStart(2, "0")}</span><span>${fmt(local(o.label))}</span><b>＋</b></summary><div class="choice-content">${o.conditions ? `<details><summary>可用条件</summary><pre>${esc(o.conditions)}</pre></details>` : ""}${o.tooltips.map((t) => localizedBlock(t)).join("")}${o.links.length ? linkButtons(o.links) : '<p class="notice">此选项没有直接事件跳转；可能改变状态、结算奖励或结束当前事件。</p>'}<details><summary>查看选项效果脚本</summary><pre>${esc(o.script)}</pre></details></div></details>`).join("") || '<p class="notice">此节点没有玩家选项。</p>'}</section>${otherLinks.length ? `<section class="continuations"><div class="section-label"><span>关联后续</span><small>触发 / 阶段 / 后台连接</small></div>${linkButtons(otherLinks)}</section>` : ""}<details class="source"><summary>来源与原始脚本</summary><p>${esc(r.source)} : ${r.line}${r.lineSpace === "expanded" ? "（内联模板展开后行号）" : ""}</p><p>动态名称以方括号保留。条件与延迟按脚本展示，不推测当前游戏状态。</p>${r.trigger ? `<pre>${esc(r.trigger)}</pre>` : ""}<pre>${esc(r.script)}</pre></details><p class="document-end">END OF RECORD <span>✦</span> 银河仍在继续</p></article></div>`;
  $("#reader").scrollTop = 0;
  if (!reduced())
    $(".reader-document").animate(
      [
        { opacity: 0.2, transform: "translateY(14px)" },
        { opacity: 1, transform: "none" },
      ],
      { duration: 420, easing: "cubic-bezier(.2,.8,.2,1)" },
    );
  $("#reader-title").focus({ preventScroll: true });
}
async function openRecord(id, { push = true } = {}) {
  const ticket = ++request;
  try {
    const r = await getRecord(id);
    if (ticket !== request) return;
    if (!r) {
      toast("索引中没有该事件");
      return;
    }
    if (push && trail.at(-1) !== id) trail.push(id);
    if (!$("#reader").open) $("#reader").showModal();
    renderReader(r);
    history.replaceState(null, "", `#record=${encodeURIComponent(id)}`);
  } catch (e) {
    toast(e.message);
  }
}
function closeReader() {
  request++;
  $("#reader").close();
  trail = [];
  current = null;
  history.replaceState(null, "", "#catalogue");
  document.title = "群星 · 叙事档案馆 | Stellaris Tales";
}
$("#reader").addEventListener("cancel", (e) => {
  e.preventDefault();
  closeReader();
});
function switchLanguage() {
  lang = lang === "zh" ? "en" : "zh";
  remember("st-language", lang);
  renderDeck();
  renderResults();
  if (current) renderReader(current);
}
$("#language").onclick = switchLanguage;
document.addEventListener("click", (e) => {
  const open = e.target.closest("[data-open]");
  if (open) {
    if (!$("#reader").open) trail = [];
    openRecord(open.dataset.open);
    return;
  }
  const cat = e.target.closest("[data-category]");
  if (cat) {
    category = cat.dataset.category;
    page = 0;
    renderCategories();
    renderResults();
    return;
  }
  const feat = e.target.closest("[data-feature]");
  if (feat) {
    const i = Number(feat.dataset.feature);
    if (i === feature) openRecord(featured[i].id);
    else {
      feature = i;
      renderFeatured();
    }
    return;
  }
  const step = e.target.closest("[data-trail]");
  if (step) {
    trail = trail.slice(0, Number(step.dataset.trail) + 1);
    openRecord(trail.at(-1), { push: false });
    return;
  }
  if (e.target.closest("#close-reader")) closeReader();
  if (e.target.closest("#reader-language")) switchLanguage();
  if (e.target.closest("#reader-back") && trail.length > 1) {
    trail.pop();
    openRecord(trail.at(-1), { push: false });
  }
  if (e.target.closest("#clear-search")) {
    query = "";
    $("#search").value = "";
    renderResults();
  }
});
$("#about").onclick = () => $("#info").showModal();
$(".close-info").onclick = () => $("#info").close();
document.addEventListener("keydown", (e) => {
  if (
    e.key === "/" &&
    !$("#reader").open &&
    !$("#info").open &&
    !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
  ) {
    e.preventDefault();
    $("#search").focus();
    $("#catalogue").scrollIntoView();
  }
});
window.addEventListener("hashchange", () => {
  if (location.hash.startsWith("#record="))
    openRecord(decodeURIComponent(location.hash.slice(8)));
  else if ($("#reader").open) closeReader();
});
try {
  const data = await json("data/index.json");
  all = data.records.sort(
    (a, b) =>
      Number(!!b.image && b.kind.endsWith("_event") && !b.hidden) -
      Number(!!a.image && a.kind.endsWith("_event") && !a.hidden),
  );
  groups = data.groups;
  byId = new Map(all.map((r) => [r.id, r]));
  $("#version").textContent = data.version;
  $("#archive-total").textContent =
    `${all.length.toLocaleString()} 份原版记录 / ${groups.length} 组来源`;
  const desired = [
    "akx.9000",
    "horizonsignal.1",
    "horizon_signal.1",
    "crisis.10",
    "crisis.1000",
    "anomaly.6660",
    "anomaly.1",
    "astral_rift.1",
  ];
  featured = desired
    .map((id) => byId.get(id))
    .filter((r) => r?.image && r.hasText);
  const used = new Set(featured.map((r) => r.id));
  for (const cat of [
    "origins",
    "precursors",
    "leviathans",
    "rifts",
    "exploration",
    "crisis",
  ]) {
    const r = all.find(
      (r) =>
        r.category === cat &&
        r.image &&
        r.hasText &&
        !r.hidden &&
        r.options > 1 &&
        !used.has(r.id),
    );
    if (r) {
      featured.push(r);
      used.add(r.id);
    }
  }
  featured = featured.slice(0, 7);
  if (!featured.length)
    featured = all.filter((r) => r.image && r.hasText).slice(0, 7);
  renderCategories();
  renderDeck();
  renderResults();
  $("#coverage-link").href = base + "data/coverage.json";
  json("data/coverage.json")
    .then((r) => {
      $("#coverage-summary").innerHTML =
        `<div class="manifest-grid"><span><b>${r.events.toLocaleString()}</b>事件节点</span><span><b>${r.records.toLocaleString()}</b>全部记录</span><span><b>${r.imageCount.toLocaleString()}</b>图片映射</span></div><p>安装版本：${esc(r.version)}<br>解析失败：${r.parseErrors.length}；未解析跳转：${r.unresolvedLinks.length}。完整缺失本地化与美术条目见覆盖报告。</p>`;
    })
    .catch(() => {});
  if (location.hash.startsWith("#record="))
    await openRecord(decodeURIComponent(location.hash.slice(8)));
} catch (e) {
  $("#featured").innerHTML =
    `<h1>档案连接中断</h1><p>${esc(e.message)}</p><button onclick="location.reload()">重新连接</button>`;
  $("#result-count").textContent = "未能载入索引，请重试。";
}
