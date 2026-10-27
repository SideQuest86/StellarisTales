// Gameplay-effects panel: renders the structured effects produced by scripts/effects.py / origin_effects.py
// (docs/EFFECTS.md) as a compact, collapsed-by-default <details>. Pure string rendering: the caller owns placement and
// passes { lang, T, esc }. Nothing here invents values — every label arrives bilingual from the data.
//
//   renderEffects(effects, { lang, T, esc, title? }) -> html ("" when there is nothing to show)
//     effects: [entry...]                               one choice / one block
//              { immediate?, after?, sections? }        a document (event, project, site, situation …)
//              { bullets?, variants?, effects? }        an origin (starting benefits)
//   bindEffects(root) -> unbind                          delegated: "show all" on long lists; no other JS is needed
//   countEffects(effects) -> number                      itemised entries (what the summary counts)

const DEFAULT_ESC = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const KIND = {
  resource: ["资源", "Resource"], resource_mult: ["资源", "Resource"], modifier: ["修正", "Modifier"], modifier_remove: ["移除修正", "Modifier removed"],
  trait: ["特质", "Trait"], trait_remove: ["失去特质", "Trait lost"], technology: ["科技", "Technology"], tech_choice: ["科技", "Technology"],
  research: ["研究", "Research"], ship: ["舰船", "Ship"], fleet: ["舰队", "Fleet"], army: ["陆军", "Army"], leader: ["领袖", "Leader"],
  pop: ["人口", "Pop"], planet: ["星球", "Planet"], deposit: ["资源点", "Deposit"], building: ["建筑", "Building"],
  opinion: ["态度", "Opinion"], project: ["特殊项目", "Special project"], relic: ["遗珍", "Relic"], specimen: ["标本", "Specimen"],
  policy: ["政策", "Policy"], ethic: ["信仰", "Ethic"], tooltip: ["游戏说明", "Game text"], generic: ["其他", "Other"],
};
const GROUPS = new Set(["if", "else", "random", "random_list", "random_option", "repeat", "scripted"]);

const pick = (label, lang) => (label && (label[lang] || label.en || label.zh)) || "";
const isList = (v) => Array.isArray(v) && v.length > 0;

// Adjacent repeats read as a stutter: a game tooltip followed by the scripted effect it describes (the same words), two "if"
// blocks on the same condition, the same effect twice. The tooltip's echo goes, same-condition blocks become one, a repeated
// effect reads "×2". (Random options are separate rolls and stay apart; nothing that differs is ever merged away.)
const words = (l) => (l ? `${l.zh ?? ""}\u0001${l.en ?? ""}` : "");
function tidy(list) {
  const out = [];
  for (let e of list || []) {
    // An "if" directly inside an "if" on the same condition adds nothing but a second identical line.
    while (e && e.kind === "if" && isList(e.effects) && e.effects.some((c) => c && c.kind === "if" && words(c.label) === words(e.label)))
      e = { ...e, effects: e.effects.flatMap((c) => (c && c.kind === "if" && words(c.label) === words(e.label) ? c.effects || [] : [c])) };
    const prev = out[out.length - 1];
    // The same effect twice in a row is two (two districts, two ships, a scripted effect's two buildings): one line marked
    // "×2". (Not for random options or condition blocks, where a repeat means something else.)
    const bare = (x) => JSON.stringify(x, (k, v) => (k === "source" || k === "times" ? undefined : v));
    if (prev && e && !GROUPS.has(e.kind) && !isList(e.effects) && bare(prev) === bare(e)) { out[out.length - 1] = { ...prev, times: (prev.times || 1) + 1 }; continue; }
    if (prev && e && !prev.unhandled && !e.unhandled && words(prev.label) && words(prev.label) === words(e.label)) {
      const plain = (x) => !isList(x.effects) && !isList(x.stats) && !x.note && !x.duration && !x.chance;
      // A plain line repeating a neighbour of another kind (a game tooltip and the effect it describes) goes; two effects of
      // one kind with the same words are two effects ("+3" minerals and "+3" energy deposits). A line without a target does
      // not differ from its neighbour by target.
      const echo = (x, y) => plain(x) && x.kind !== y.kind && (!x.target || words(x.target) === words(y.target));
      if (echo(e, prev)) continue;
      // (the game's own tooltip keeps its "Game text" mark over the details of the effect it describes)
      if (echo(prev, e)) { out[out.length - 1] = prev.kind === "tooltip" ? { ...e, kind: "tooltip" } : e; continue; }
      if (prev.kind === "if" && e.kind === "if") { out[out.length - 1] = { ...prev, effects: [...(prev.effects || []), ...(e.effects || [])] }; continue; }
    }
    out.push(e);
  }
  return out;
}

export { tidy as tidyEffects }; // (tests)

function leaves(list) {
  let n = 0;
  for (const e of tidy(list)) {
    if (e.kind === "more" || e.unhandled) continue;
    if (e.effects && e.effects.length) n += leaves(e.effects);
    else if (!GROUPS.has(e.kind)) n += 1;
  }
  return n;
}
function unhandled(list) {
  let n = 0;
  for (const e of list || []) n += (e.unhandled ? 1 : 0) + unhandled(e.effects);
  return n;
}

export function countEffects(effects) {
  if (!effects) return 0;
  if (Array.isArray(effects)) return leaves(effects);
  let n = 0;
  for (const k of ["immediate", "after", "effects"]) n += leaves(effects[k]);
  for (const s of effects.sections || []) n += leaves(s.effects);
  if (effects.bullets) n += (effects.bullets.en || effects.bullets.zh || []).length;
  if (effects.negativeBullets) n += (effects.negativeBullets.en || effects.negativeBullets.zh || []).length;
  return n;
}

function duration(d, T) {
  if (!d) return "";
  if (d === "permanent") return T("永久", "Permanent");
  if (d.scaled) return T("时长由游戏计算", "Duration set by the game");
  for (const [k, zh, en] of [["days", "天", "day"], ["months", "个月", "month"], ["years", "年", "year"]]) {
    if (d[k] != null) return T(`${d[k]} ${zh}`, `${d[k]} ${en}${d[k] === 1 ? "" : "s"}`);
  }
  return "";
}

const VAGUE_TARGET = /事件来源|来源的来源|上一层对象|此前保存的对象|目标对象|事件来源链/;
// The default target is never shown; the capital planet / explorer are the default only when every line of the panel shares it.
const OWNER_TARGET = "所属帝国";
const COMMON_TARGET = new Set(["首都星球", "探索者"]);

function leafEntries(list, out) {
  for (const e of tidy(list)) {
    if (!e || e.kind === "more" || e.unhandled) continue;
    if (e.effects && e.effects.length) leafEntries(e.effects, out);
    else if (!GROUPS.has(e.kind)) out.push(e);
  }
  return out;
}
function allEntries(effects) {
  const lists = Array.isArray(effects) ? [effects] : [effects.effects, effects.immediate, effects.after, ...(effects.sections || []).map((s) => s.effects)];
  return lists.reduce((acc, l) => leafEntries(l, acc), []);
}
function sharedTarget(effects) {
  const leaves = allEntries(effects);
  if (!leaves.length) return "";
  const first = leaves[0].target ? pick(leaves[0].target, "zh") : "";
  return COMMON_TARGET.has(first) && leaves.every((e) => e.target && pick(e.target, "zh") === first) ? first : "";
}
function hasChance(list) {
  for (const e of list || []) {
    if (!e) continue;
    if (e.chance || e.kind === "random" || e.kind === "random_list" || e.kind === "random_option") return true;
    if (hasChance(e.effects)) return true;
  }
  return false;
}
function anyChance(effects) {
  if (Array.isArray(effects)) return hasChance(effects);
  return [effects.effects, effects.immediate, effects.after, ...(effects.sections || []).map((s) => s.effects)].some(hasChance);
}

function entryHtml(e, ctx, depth) {
  const { lang, T, esc } = ctx;
  if (e.kind === "more") return `<li class="fx-item fx-more">${esc(pick(e.label, lang))}</li>`;
  if (e.unhandled) return "";
  const kind = KIND[e.kind];
  const chips = [];
  if (kind && e.kind !== "if" && e.kind !== "generic" && !GROUPS.has(e.kind)) chips.push(`<span class="fx-chip fx-kind-${esc(e.kind)}">${esc(T(kind[0], kind[1]))}</span>`);
  if (e.duration) chips.push(`<span class="fx-chip fx-time${e.duration === "permanent" ? " is-perm" : ""}">${esc(duration(e.duration, T))}</span>`);
  // "Hidden" once per group (its children are hidden too), not on every line.
  if (e.hidden && !ctx.inHidden) chips.push(`<span class="fx-chip fx-hidden" title="${esc(T("游戏界面不会显示这条效果", "The game does not show this effect"))}">${esc(T("隐藏", "Hidden"))}</span>`);
  const chanceChip = e.chance && e.chance.percent != null && e.kind === "random_option";
  if (chanceChip) chips.push(`<span class="fx-chip fx-chance">${esc(e.chance.percent + "%")}</span>`);
  // Script-internal scopes ("the event source", "a target saved earlier") tell a reader nothing: only named targets
  // (capital, ruler, a ship just created …) are shown.
  const targetText = e.target ? pick(e.target, "zh") : "";
  const target = e.target && !VAGUE_TARGET.test(targetText) && targetText !== OWNER_TARGET && targetText !== ctx.hideTarget ?`<span class="fx-target">${esc(T("对象：", "On: "))}${esc(pick(e.target, lang))}</span>` : "";
  const stats = isList(e.stats)
    ? `<ul class="fx-stats">${e.stats.map((s) => `<li>${esc(pick(s.label, lang))} <b>${esc(s.text)}</b></li>`).join("")}</ul>`
    : "";
  // With the percent chip, "About 30% (adjusted by conditions)" keeps only what the chip does not say.
  const label = esc(chanceChip
    ? pick(e.label, lang).replace(/^(约\s*[\d.]+%|About [\d.]+%)\s*/, "").replace(/^（(.*)）$|^\((.*)\)$/, (_, a, b) => a || b)
    : pick(e.label, lang));
  const note = e.note ? `<span class="fx-notetext">${esc(pick(e.note, lang))}</span>` : "";
  const cls = ["fx-item", `fx-${e.kind}`, e.kind === "tooltip" ? "is-game-text" : "", e.conditional || GROUPS.has(e.kind) ? "is-cond" : ""].filter(Boolean).join(" ");
  let kids = "";
  if (isList(e.effects)) {
    const inner = tidy(e.effects).map((c) => entryHtml(c, e.hidden ? { ...ctx, inHidden: true } : ctx, depth + 1)).join("");
    kids = inner ? `<ul class="fx-list fx-sub">${inner}</ul>` : "";
    if (!inner && e.kind !== "scripted") return "";
  }
  const times = e.times > 1 ? `<span class="fx-times">×${e.times}</span>` : "";
  return `<li class="${cls}"><span class="fx-line">${chips.join("")}<span class="fx-text">${label}</span>${times}${target}</span>${note}${stats}${kids}</li>`;
}

function listHtml(list, ctx) {
  const inner = tidy(list).map((e) => entryHtml(e, ctx, 0)).join("");
  return inner ? `<ul class="fx-list">${inner}</ul>` : "";
}

function section(title, list, ctx) {
  const html = listHtml(list, ctx);
  return html ? `<section class="fx-sec"><h4 class="fx-h">${ctx.esc(title)}</h4>${html}</section>` : "";
}

function bulletsHtml(b, ctx) {
  const items = (b && (b[ctx.lang] || b.en || b.zh)) || [];
  if (!items.length) return "";
  return `<ul class="fx-list fx-bullets">${items.map((x) => `<li class="fx-item fx-level-${x.level || 0}"><span class="fx-text">${ctx.esc(x.text)}</span></li>`).join("")}</ul>`;
}

export function renderEffects(effects, opts = {}) {
  const lang = opts.lang === "en" ? "en" : "zh";
  const T = opts.T || ((zh, en) => (lang === "en" ? en : zh));
  const esc = opts.esc || DEFAULT_ESC;
  if (!effects || (Array.isArray(effects) && !effects.length)) return "";
  const ctx = { lang, T, esc, hideTarget: sharedTarget(effects) };
  let body = "";
  let skipped = 0;
  if (Array.isArray(effects)) {
    body = listHtml(effects, ctx);
    skipped = unhandled(effects);
  } else {
    if (effects.bullets) {
      body += `<section class="fx-sec"><h4 class="fx-h">${esc(T("开局效果（游戏原文）", "Starting benefits (game text)"))}</h4>${bulletsHtml(effects.bullets, ctx)}</section>`;
    }
    if (effects.negativeBullets) {
      body += `<section class="fx-sec"><h4 class="fx-h">${esc(T("代价（游戏原文）", "Drawbacks (game text)"))}</h4>${bulletsHtml(effects.negativeBullets, ctx)}</section>`;
    }
    for (const v of effects.variants || []) {
      const when = v.when ? pick(v.when, lang) : "";
      body += `<section class="fx-sec"><h4 class="fx-h">${esc(when ? T("在以下情况：", "When: ") + when : T("另一种开局", "Alternative start"))}</h4>${bulletsHtml(v.bullets, ctx)}</section>`;
    }
    if (effects.effects) body += section((effects.bullets || effects.negativeBullets) ? T("具体数值", "Numbers behind it") : T("效果", "Effects"), effects.effects, ctx);
    body += section(T("立即发生", "Immediately"), effects.immediate, ctx);
    body += section(T("事件结束后", "After the event"), effects.after, ctx);
    for (const s of effects.sections || []) body += section(pick(s.label, lang), s.effects, ctx);
    skipped = unhandled(effects.immediate) + unhandled(effects.after) + (effects.sections || []).reduce((n, s) => n + unhandled(s.effects), 0) + unhandled(effects.effects);
  }
  if (!body) return "";
  const n = countEffects(effects);
  const title = opts.title || T("游戏内效果", "Gameplay effects");
  const tail = skipped ? `<p class="fx-note fx-skipped">${esc(T(`另有 ${skipped} 项效果未逐条整理，请见游戏脚本。`, `${skipped} more ${skipped === 1 ? "effect is" : "effects are"} not itemized; see the game script.`))}</p>` : "";
  return `<details class="fx"><summary class="fx-sum"><span class="fx-sum-t">${esc(title)}</span>${n ? `<span class="fx-count">${n}</span>` : ""}</summary>`
    + `<div class="fx-body">${anyChance(effects) ? `<p class="fx-note">${esc(T("概率为基础值。", "Chances are base values."))}</p>` : ""}${body}${tail}</div></details>`;
}

// Delegated, idempotent: none of the markup needs JS to open (native <details> is keyboard-accessible).
// Long lists (> 12 items) start clipped; the "show all" button un-clips them.
export function bindEffects(root) {
  if (!root || root.__fxBound) return () => {};
  root.__fxBound = true;
  const onToggle = (ev) => {
    const d = ev.target;
    if (!d || !d.classList || !d.classList.contains("fx") || !d.open) return;
    d.querySelectorAll(".fx-list").forEach((ul) => {
      if (ul.dataset.fxClip || ul.children.length <= 12) return;
      ul.dataset.fxClip = "1";
      ul.classList.add("is-clipped");
      const b = document.createElement("button");
      b.type = "button";
      b.className = "fx-showall";
      b.textContent = (document.documentElement.lang || "").startsWith("en") ? `Show all ${ul.children.length}` : `显示全部 ${ul.children.length} 项`;
      b.addEventListener("click", () => { ul.classList.remove("is-clipped"); b.remove(); });
      ul.after(b);
    });
  };
  root.addEventListener("toggle", onToggle, true);
  return () => { root.removeEventListener("toggle", onToggle, true); root.__fxBound = false; };
}
