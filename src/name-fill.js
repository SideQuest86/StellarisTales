// Display-time wording for the names the game fills in from a save ([Root.GetName] …). Pure (no DOM): the reader
// (src/app.js) and the review tools (scripts/refine/render-sentences.mjs) use the same rules, so what reviewers read
// is what the site shows. Original text is never changed; substitutions are wrapped in private-use markers
// OPEN note SEP text CLOSE so the reader can annotate them (hover/focus/tap note) — see src/name-tooltip.js.
import { GENERIC_NOTE, SCRIPTED_NOTE } from "./name-tooltip.js";

export const OPEN = "", SEP = "", CLOSE = "", OMIT = "";

const TITLE_WORDS = [
  "Science Officer", "Officer", "Admiral", "General", "Captain", "Commander", "Governor", "Doctor", "Dr\\.", "Professor",
  "Envoy", "Ambassador", "Lieutenant", "Director", "Chancellor", "Knight", "Sir", "Dame", "Spymaster",
  "Operation", "Arkship", "Asteroid", "planet", "Emissary", "Councilor", "science ship", "Survey Unit", "Scientist",
  "Head Researcher", "Lead Scientist", "科学家", "科学官",
  "行动", "方舟", "议员", "使节",
  "科学专员", "专员", "博士", "将军", "舰长", "总督", "元帅", "教授", "特使", "大使", "指挥官", "主任",
].join("|");
const TITLE_RE = new RegExp(`(${TITLE_WORDS})\\s?\\uE000([^\\uE002]*)\\uE002[^\\uE001]*\\uE001`, "gi");
const SPAN = "\\uE000[^\\uE002]*\\uE002[^\\uE001]*\\uE001";

/**
 * Fill placeholders in one string.
 * opts: { lang: "zh"|"en", chapterNames, names (public/stories/names.json), evaluate(when, ctx), ctx, nested, depth }
 */
export function fillNames(s, opts) {
  const { lang, chapterNames, names = {}, evaluate, ctx, nested = null, depth = 0 } = opts;
  const local = (v) => v?.[lang] || v?.zh || v?.en || "";
  const T = (zh, en) => (lang === "en" ? en : zh);
  const note = (own, scripted) => String(local(own?.note || (scripted ? SCRIPTED_NOTE : GENERIC_NOTE))).replace(/[-]/g, "");
  const scripted = (def) => {
    let pick = null, fallback = null;
    for (const v of def.variants) {
      if (!local(v.text)) continue; // a variant without text (e.g. a computed value) is never a fallback
      const status = evaluate ? evaluate(v.when, ctx) : null;
      if (status === true) { pick = v.text; break; }
      if (status === null) fallback = v.text;
    }
    const text = pick || fallback || def.default || def.variants.findLast((v) => local(v.text))?.text;
    return fillNames(local(text), { ...opts, nested: def.names, depth: depth + 1 });
  };
  const wrap = (text, n) => OPEN + n + SEP + text + CLOSE;
  // Colour codes and inline icons are display markup, not prose: drop them first so sentence starts are seen.
  return String(s || "").replace(/§./g, "").replace(/£[^£\s]+£\s?/g, "").replace(/(\b(?:the|a|an)\s+)?\[([^\[\]]+)\]([㐀-鿿]{1,6})?/gi, (match, art, key, after, offset, whole) => {
    if (depth > 3) return "";
    let text, n;
    // Inside scripted text the scripted name's own wording applies first (names.json `names`).
    let own = nested?.[key] || chapterNames?.[key];
    // One key in several grammatical positions of one document: a reviewed variant is chosen by the exact text right
    // before ("before": the preceding text ends with it) or after ("after": the following text starts with it).
    if (own?.variants) {
      const prev = whole.slice(0, offset) + (art || ""), next = (after || "") + whole.slice(offset + match.length);
      const v = own.variants.find((x) => x.lang === lang && (!x.before || prev.endsWith(x.before)) && (!x.after || next.startsWith(x.after)));
      if (v) own = { ...own, [lang]: v.text, omit: v.text === "" ? [lang] : own.omit };
    }
    const tail = key.split("|")[0].split(".").at(-1);
    // Reviewed as "omit" for this language: the sentence reads naturally without the name.
    if (own && own[lang] === "" && own.omit?.includes(lang)) return (art || "") + OMIT + (after || "");
    if (own) { text = local(own); n = note(own, false); }
    // A scripted value with no wording at all (a number the game computes, e.g. a growth factor) is left out.
    else if (names[tail] && !names[tail].default && !names[tail].variants.some((v) => local(v.text))) return (art || "") + OMIT + (after || "");
    else if (names[tail]) { text = scripted(names[tail]).replace(/[^]*/g, "").replace(/[]/g, ""); n = note(null, true); }
    else {
      text = /Plural/.test(tail) ? T("他们", "they") : /Name/.test(tail) ? T("这个名字", "this name") : T("……", "…");
      n = note(null, false);
    }
    let lead = art || "", trail = after || "";
    if (lang === "en") {
      if (lead && /^(the|our|this|that|your|their|these|those)\b/i.test(text)) lead = "";
      // "a [X]" with X = "other empire" → "an other empire" → keep the article agreeing with the phrase.
      else if (/^an?\s+$/i.test(lead)) lead = lead.replace(/^(a)n?/i, (a) => (/^[aeiou]/i.test(text) ? a[0] + "n" : a[0]));
      const before = whole.slice(0, offset);
      const start = !before.trim() || /[.!?…]["”’']?\s*$/.test(before) || /\n\s*["“]?$/.test(before);
      if (!lead && /^[a-z]/.test(text) && start) text = text[0].toUpperCase() + text.slice(1);
      else if (lead && start && /^[a-z]/.test(lead)) lead = lead[0].toUpperCase() + lead.slice(1);
    } else if (trail) {
      // 我们的帝国[帝国] -> drop the repeated noun
      for (let k = Math.min(trail.length, 6); k >= 2; k--) {
        if (text.endsWith(trail.slice(0, k))) { trail = trail.slice(k); break; }
      }
    }
    return lead + wrap(text, n) + trail;
  })
    // The game picks he/she with a singular verb; the neutral "they" needs the plural form.
    .replace(/([Tt]hey) (has|is|was|does)\b/g, (_, pronoun, verb) => `${pronoun} ${{ has: "have", is: "are", was: "were", does: "do" }[verb]}`)
    // A title before a name placeholder ("Science Officer [Root.GetLeaderName]"): the title carries the note.
    // A phrase that already ends in the same noun ("planet [X]" with X = "this planet") replaces the pair.
    .replace(TITLE_RE, (m, title, n) => {
      if (/^operation$/i.test(title)) return "the operation" + OMIT;
      const phrase = m.slice(m.indexOf(SEP) + 1, -1);
      if (phrase.toLowerCase().endsWith(title.toLowerCase()) && phrase.length > title.length) return OPEN + n + SEP + phrase + CLOSE;
      return OPEN + n + SEP + title + CLOSE;
    })
    // "the [X] species" with X = "this species": drop the repeated noun; "[X]s" after a phrase ending in s.
    .replace(/([\s])(\w+) \2\b/g, "$1$2")
    .replace(/ss\b/g, "s")
    // "[X]'s bodyguard" with X = "our": a possessive determiner takes no 's; zh "我们的[的]".
    .replace(/(\b(?:our|their|your|its))['’]s\b/gi, "$1")
    .replace(/的的/g, "的")
    // "the tropical [X]" with X = "this planet": the sentence already has a determiner, so the phrase drops its own.
    .replace(/\b(the|their|our|its|his|her|your|a|an)\s+([a-z][\w-]*)\s+([^]*)(?:this|that|our|the)\s+/gi, (_, det, adj, n) => `${det} ${adj} ${OPEN}${n}${SEP}`)
    // A computed amount ("+[X]% research"): the phrase stands for the whole quantity, sign and % included.
    .replace(new RegExp(`[+\\-]?(${SPAN})\\s?%`, "g"), "$1")
    // Two substitutions side by side ("[Root.GetRulerTitle] [Root.GetRulerName]") name one person: a second phrase
    // with its own determiner stands alone, otherwise they join ("our" + "ruler").
    .replace(/([^]*)([^]*)(\s?)([^]*)([^]*)/g, (_, n1, t1, gap, n2, t2) =>
      OPEN + n2 + SEP + (/^(?:(?:the|our|this|that|a|an|your|their)\b|这|那|我们)/i.test(t2) || t2.endsWith(t1) || t1.endsWith(t2) || t2.startsWith(t1) ? t2 : t1 + gap + t2) + CLOSE)
    // Sentence starts (also after a merge or a dropped article): capitalise the phrase.
    .replace(/(^|[.!?]["”’']?\s+)([^]*)([a-z])/g, (_, lead, n, c) => lead + OPEN + n + SEP + c.toUpperCase())
    // An omitted code name after "Operation" ("assigned to Operation [X].") reads as "the operation".
    .replace(/\b(the )?Operation\s?/g, "the operation")
    .replace(/\b[Tt]he the operation/g, (m) => m[0] + "he operation")
    .replace(/(^|[.!?]["”’']?\s+)the operation/g, "$1The operation")
    .replace(/ (?= )/g, "")
    .replace(//g, "");
}

/**
 * $KEY$ references left after compilation (scripts/story_tree.py expands every one the game localises): special-project
 * progress counters the engine fills in ($COUNT$/$REQUIRED$) read as a natural phrase; references the game itself never
 * defines (missing from its localisation; listed in docs/refine/AUDIT.md) are left out instead of showing a token.
 */
export function cleanRefs(s, lang) {
  return String(s || "")
    .replace(/\$COUNT\$\s*\/\s*\$REQUIRED\$\s?/g, lang === "en" ? "the required number of " : "所需数量的")
    // Script values ($@name$) are numbers the game computes: a neutral quantity, never a raw token.
    .replace(/\$@[^$\s]+\$/g, lang === "en" ? "a number of" : "若干")
    .replace(/\$[A-Za-z_@][\w.@|]*\$/g, "")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/ +([.,;:!?])/g, "$1");
}

/** Plain text of a filled string (markers removed). */
export const plainNames = (s) => String(s).replace(/[^]*/g, "").replace(/[]/g, "");
