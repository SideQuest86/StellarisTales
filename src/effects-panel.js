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

// (a name the label left out leaves its spaces: "Trade from  Jobs", "岗位产出的 贸易 +10%")
const pick = (label, lang) => ((label && (label[lang] || label.en || label.zh)) || "").replace(/([㐀-鿿])[ \t ]+(?=[㐀-鿿])/g, "$1").replace(/[ \t ]{2,}/g, " ")
  // (an engine ceiling of 100000 bounds nothing a reader meets: "+18 months of income (350 to 100000)" -> "(at least 350)")
  .replace(/^(?:…|\.\.\.)+\s*/, "")
  .replace(/\((\d[\d,]*) to 100000\)/g, "(at least $1)").replace(/（(\d[\d,]*)\s*至\s*100000）/g, "（至少 $1）");
const isList = (v) => Array.isArray(v) && v.length > 0;

// Adjacent repeats read as a stutter: a game tooltip followed by the scripted effect it describes (the same words), two "if"
// blocks on the same condition, the same effect twice. The tooltip's echo goes, same-condition blocks become one, a repeated
// effect reads "×2". (Random options are separate rolls and stay apart; nothing that differs is ever merged away.)
const words = (l) => (l ? `${l.zh ?? ""}\u0001${l.en ?? ""}` : "");
// Conditions that differ only in one quoted name ("the storm type is “Gravity Storm”" … eight times) as one, naming them all:
// the common words around a quoted name, the names listed. null when they differ in anything else.
function namedTogether(labels) {
  const out = {};
  for (const lang of ["zh", "en"]) {
    const all = labels.map((l) => String(l?.[lang] ?? ""));
    let pre = all[0].length, suf = all[0].length;
    for (const s of all) {
      let i = 0; while (i < pre && s[i] === all[0][i]) i++; pre = i;
      let j = 0; while (j < suf && s[s.length - 1 - j] === all[0][all[0].length - 1 - j]) j++; suf = j;
    }
    // (back to the quote marks around the names; the names themselves are what differ)
    const open = Math.max(...["\"", "“", "「"].map((q) => all[0].lastIndexOf(q, pre - 1)));
    if (open < 0) return null;
    const ends = all.map((s) => s.slice(open));
    const close = ends.map((s) => s.search(/["”」](?=[^"”」]*$)/));
    if (close.some((c) => c < 1) || ends.some((s, k) => s.length - close[k] - 1 > suf)) return null;
    const names = ends.map((s, k) => s.slice(0, close[k] + 1)), tail = ends[0].slice(close[0] + 1);
    if (ends.some((s, k) => s.slice(close[k] + 1) !== tail) || new Set(names).size < names.length) return null;
    const list = lang === "zh" ? names.slice(0, -1).join("、") + "或" + names.at(-1) : names.slice(0, -1).join(", ") + " or " + names.at(-1);
    out[lang] = all[0].slice(0, open) + list + tail;
  }
  return out;
}
function tidy(list) {
  const out = [];
  const src = list || [];
  for (let n = 0; n < src.length; n++) {
    let e = src[n];
    // "If: there is a matching leader you employ: is the head of research" over "On those matching: is the head of research" (the
    // game's any/every idiom, one check said twice) is one line: "On each matching leader you employ: is the head of research".
    if (e?.kind === "if" && e.effects?.length === 1 && e.effects[0]?.label) {
      const c = e.effects[0];
      const pe = /^If: there is a matching ([^:]+): (.*)$/.exec(e.label?.en || ""), ce = /^On those matching: (.*)$/.exec(c.label.en || "");
      const pz = /^如果：存在满足条件的([^：]+)：(.*)$/.exec(e.label?.zh || ""), cz = /^在满足条件的对象上：(.*)$/.exec(c.label.zh || "");
      if (pe && ce && pe[2] === ce[1] && pz && cz && pz[2] === cz[1])
        e = { ...c, label: { en: `On each matching ${pe[1]}: ${pe[2]}`, zh: `在每个满足条件的${pz[1]}上：${pz[2]}` } };
    }
    // A roll's options that do the same thing are one option, their chances added ("About 10% · An espionage asset is lost" ten
    // times); a roll whose every option does the same thing is not a roll: its effect simply happens.
    if (e && e.kind === "random_list" && isList(e.effects)) {
      const same = (x) => JSON.stringify(x.effects, (k, v) => (k === "source" ? undefined : v));
      const merged = [];
      for (const o of e.effects) {
        const prev = merged[merged.length - 1];
        if (prev && o?.kind === "random_option" && prev.kind === "random_option" && prev.chance?.percent != null && o.chance?.percent != null && same(prev) === same(o))
          merged[merged.length - 1] = { ...prev, chance: { ...prev.chance, percent: +(prev.chance.percent + o.chance.percent).toFixed(1) } };
        else merged.push(o);
      }
      if (merged.length === 1 && merged[0]?.kind === "random_option" && isList(merged[0].effects) && e.effects.length > 1) {
        out.push(...tidy(merged[0].effects));
        continue;
      }
      if (merged.length < e.effects.length) e = { ...e, effects: merged };
    }
    // An "if" directly inside an "if" on the same condition adds nothing but a second identical line.
    while (e && e.kind === "if" && isList(e.effects) && e.effects.some((c) => c && c.kind === "if" && words(c.label) === words(e.label)))
      e = { ...e, effects: e.effects.flatMap((c) => (c && c.kind === "if" && words(c.label) === words(e.label) ? c.effects || [] : [c])) };
    const prev = out[out.length - 1];
    // A condition whose both branches do the same thing is no condition: "If: … Expertise: Propulsion / Otherwise: Expertise:
    // Propulsion" is the effect.
    // (compared as read: the machine empires' "Frying Fauna" is another modifier with the same name)
    const body = (x) => JSON.stringify(x.effects, (k, v) => (k === "source" || k === "modifier" || k === "via" || k === "definition" ? undefined : v));
    if (prev && e && prev.kind === "if" && e.kind === "else" && isList(prev.effects) && isList(e.effects) && body(prev) === body(e)) {
      out.splice(out.length - 1, 1, ...tidy(prev.effects));
      continue;
    }
    // The same effect twice in a row is two (two districts, two ships, a scripted effect's two buildings): one line marked
    // "×2". (Not for random options or condition blocks, where a repeat means something else.)
    // (as read: one special project per planet, "Study the Ketlings on [ratling_planet_2.GetName]" … five times, is one line ×5)
    const bare = (x) => JSON.stringify(x, (k, v) => (k === "source" || k === "times" || k === "project" || k === "modifier" ? undefined : typeof v === "string" ? v.replace(/\[[^\]]+\]/g, "[]") : v));
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
    // One effect under conditions that differ in a name only (one special project for each storm type) is said once, under
    // one condition naming them all. (Not before an "Otherwise", which belongs to the last condition alone.)
    const seen = (x) => JSON.stringify(x, (k, v) => (k === "source" || k === "project" || k === "times" ? undefined : v));
    if (prev && e && prev.kind === "if" && e.kind === "if" && src[n + 1]?.kind !== "else" && prev.effects?.length === 1 && e.effects?.length === 1 && seen(prev.effects[0]) === seen(e.effects[0])) {
      const alts = [...(prev.alts || [prev.label]), e.label], label = namedTogether(alts);
      if (label) { out[out.length - 1] = { ...prev, label, alts }; continue; }
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
    const g = gist(e);
    if (g) n += g.length;
    // (an effect with effects of its own is a line too: "A new country appears" over its fleet and planet)
    else if (e.effects && e.effects.length) n += leaves(e.effects) + (GROUPS.has(e.kind) ? 0 : 1);
    else if (!GROUPS.has(e.kind)) n += 1;
  }
  return n;
}

// A condition block whose branches, however deep, end in the same few effects (a scripted search for a planet: "If not
// nomadic … On those matching … Otherwise … On those matching …", one special project at the end of fifteen paths) reads
// as its outcome: the effects once each, then every branch in full behind "All branches". Random rolls never fold (each
// chance is the point). Returns the distinct effects, or null when the block is worth reading as it is.
const FOLDS = new Set(["if", "else", "scripted"]);
function gist(e) {
  if (!e || !FOLDS.has(e.kind) || !isList(e.effects)) return null;
  let deepest = 0;
  const found = [];
  const walk = (list, depth) => {
    for (const c of tidy(list)) {
      if (!c || c.kind === "more" || c.unhandled) continue;
      if (c.kind === "random" || c.kind === "random_list" || c.kind === "random_option") return false;
      if (isList(c.effects)) { deepest = Math.max(deepest, depth + 1); if (walk(c.effects, depth + 1) === false) return false; }
      else if (!GROUPS.has(c.kind)) found.push(c);
    }
  };
  if (walk(e.effects, 0) === false || deepest < 2 || found.length < 4) return null;
  const byKey = new Map();
  for (const c of found) {
    const key = JSON.stringify([c.kind, c.label, c.stats, c.duration]);
    const seen = byKey.get(key);
    // (one effect on different targets along different paths: the target depends on the path, so it is not named)
    if (!seen) byKey.set(key, c);
    else if (seen.target && words(seen.target) !== words(c.target)) byKey.set(key, { ...seen, target: undefined });
  }
  return byKey.size * 3 <= found.length ? [...byKey.values()] : null;
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
  for (const e of tidy(list)) {
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

// A deposit the game names only by its yield (its icon dropped: "+3") is named by its resource too: "+3 Minerals".
const RESOURCES = {
  minerals: ["矿物", "Minerals"], energy: ["能量币", "Energy"], food: ["食物", "Food"], alloys: ["合金", "Alloys"],
  physics: ["物理学", "Physics"], society: ["社会学", "Society"], engineering: ["工程学", "Engineering"], unity: ["凝聚力", "Unity"],
  rare_crystals: ["稀有晶体", "Rare Crystals"], exotic_gases: ["奇异气体", "Exotic Gases"], volatile_motes: ["易爆微粒", "Volatile Motes"],
  trade_value: ["贸易值", "Trade Value"],
};
export function depositName(e, label, lang) {
  const m = e?.kind === "deposit" && /^d_([a-z_]+?)_(\d+)$/.exec(e.deposit || "");
  const r = m && RESOURCES[m[1]];
  if (!r) return label;
  return label.replace(/([「"])([+-]?\d+)([」"])/, (_, a, n, b) => `${a}${n} ${r[lang === "en" ? 1 : 0]}${b}`);
}

function entryHtml(e, ctx, depth) {
  const { lang, T, esc } = ctx;
  if (e.kind === "more") return `<li class="fx-item fx-more">${esc(pick(e.label, lang))}</li>`;
  if (e.unhandled) return "";
  // The game's own sentence once per panel: a situation's approaches reuse it under "On failure" / "When progress completes".
  // (every branch in full shows as it is)
  if (e.kind === "tooltip" && ctx.said && !ctx.whole) {
    const words = pick(e.label, lang);
    if (ctx.said.has(words)) return "";
    ctx.said.add(words);
  }
  const kind = KIND[e.kind];
  const chips = [];
  // (no kind label when the line already opens with it: "Leader · Leader experience +200" said it twice)
  const kindWord = kind ? T(kind[0], kind[1]) : "";
  const opens = kindWord && pick(e.label, lang).toLowerCase().startsWith(kindWord.toLowerCase());
  if (kind && !opens && e.kind !== "if" && e.kind !== "generic" && !GROUPS.has(e.kind)) chips.push(`<span class="fx-chip fx-kind-${esc(e.kind)}">${esc(kindWord)}</span>`);
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
  // With the percent chip, "About 30% (adjusted by conditions)" keeps only what the chip does not say. When every option of the
  // roll is adjusted, the roll says it once ("One of these happens at random (chances adjusted by conditions):") and the options
  // do not repeat it.
  const allAdjusted = e.kind === "random_list" && isList(e.effects) && e.effects.length > 1 && e.effects.every((o) => o?.chance?.adjusted);
  const unadjusted = (s) => (ctx.adjustedSaid ? s.replace(/\s*(?:（受条件调整）|\(adjusted by conditions\))$/, "") : s);
  const label = esc(chanceChip
    ? unadjusted(pick(e.label, lang).replace(/^(约\s*[\d.]+%|About [\d.]+%)\s*/, "")).replace(/^（(.*)）$|^\((.*)\)$/, (_, a, b) => a || b)
    : allAdjusted ? pick(e.label, lang).replace(/\s*[:：]$/, (c) => T("（概率受条件调整）", " (chances adjusted by conditions)") + c.trim())
    : unadjusted(depositName(e, pick(e.label, lang), lang)));
  // (an outcome of a roll with nothing to show says so: a bare "50%" above the other 50%'s effect read as a missing line)
  const nothing = chanceChip && !label && !isList(e.effects) ? esc(T("无其他效果", "No other effect")) : "";
  const note = e.note ? `<span class="fx-notetext">${esc(pick(e.note, lang))}</span>` : "";
  const cls = ["fx-item", `fx-${e.kind}`, e.kind === "tooltip" ? "is-game-text" : "", e.conditional || GROUPS.has(e.kind) ? "is-cond" : ""].filter(Boolean).join(" ");
  let kids = "";
  if (isList(e.effects)) {
    const sub = { ...ctx, ...(e.hidden ? { inHidden: true } : {}), adjustedSaid: allAdjusted || (ctx.adjustedSaid && e.kind !== "random_list") };
    const g = !ctx.whole && gist(e);
    // (inside "All branches" every branch shows as it is: nothing folds again)
    const inner = tidy(e.effects).map((c) => entryHtml(c, g ? { ...sub, whole: true } : sub, depth + 1)).join("");
    kids = !inner ? "" : g
      // (several outcomes may not all happen: the line says they are what the branches lead to, not that each one does)
      ? `<ul class="fx-list fx-sub">${g.length > 1 ? `<li class="fx-item fx-more">${esc(T("依分支不同，有以下一项或几项：", "One or more of these, depending on the branch:"))}</li>` : ""}${g.map((c) => entryHtml(c, sub, depth + 1)).join("")}</ul><details class="fx-paths"><summary>${esc(T("逐条分支", "Each branch in full"))}</summary><ul class="fx-list fx-sub fx-whole">${inner}</ul></details>`
      : `<ul class="fx-list fx-sub">${inner}</ul>`;
    if (!inner && e.kind !== "scripted") return "";
  }
  const times = e.times > 1 ? `<span class="fx-times">×${e.times}</span>` : "";
  return `<li class="${cls}"><span class="fx-line">${chips.join("")}<span class="fx-text">${label || nothing}</span>${times}${target}</span>${note}${stats}${kids}</li>`;
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

/** An effects list without the game tooltips the reader has just read (`said`: the same words, in either language's text). */
export function withoutSaid(list, said) {
  if (!Array.isArray(list) || !said?.length) return list;
  const words = (s) => String(s ?? "").replace(/£[^£]+£|§./g, "").replace(/\s+/g, " ").trim();
  const seen = new Set(said.map(words).filter(Boolean));
  // (also inside a condition: "If an earlier condition holds / Gain insight in a random Physics technology." under a reply that
  // said it; a block left empty goes)
  const strip = (l) => l.flatMap((e) => {
    if (e?.kind === "tooltip" && [e.label?.zh, e.label?.en].some((t) => seen.has(words(t)))) return [];
    if (e && GROUPS.has(e.kind) && isList(e.effects)) { const kids = strip(e.effects); return kids.length ? [{ ...e, effects: kids }] : []; }
    return [e];
  });
  return strip(list);
}

export function renderEffects(effects, opts = {}) {
  const lang = opts.lang === "en" ? "en" : "zh";
  const T = opts.T || ((zh, en) => (lang === "en" ? en : zh));
  const esc = opts.esc || DEFAULT_ESC;
  if (!effects || (Array.isArray(effects) && !effects.length)) return "";
  const ctx = { lang, T, esc, hideTarget: sharedTarget(effects), said: new Set() };
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
