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
  "间谍首脑", "科学专员", "专员", "博士", "将军", "舰长", "总督", "元帅", "教授", "特使", "大使", "指挥官", "主任",
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
      // English wording of a name the archive cannot know, by what the getter names and where it stands:
      //  - a plain name names its scope when the scope's last word is a plain noun ("[pre_ftl_planet.GetName]" -> "the
      //    planet", "[mercenary_enclave_country.GetName]" -> "that empire"); a ruler's name or title names the ruler, a star's
      //    name the star, a species' name the species; anything else reads "this name";
      //  - right after a noun that already says it ("the star [rock_sun.GetName]"), or right before one as its attribute
      //    ("the neighboring [X.GetName] system", "carrying [Root.GetSpeciesName] refugees"), the name is left out; so is an
      //    adjective form before its noun ("the [Root.GetAdj] economy") and a name only called out to ("We are delighted to
      //    meet you, [X.GetSpeciesNamePlural].", "[Root.GetSpeciesName], we have decided …");
      //  - a plural reads "they" as a subject, "them" after a preposition, "people" after a determiner or quantifier.
      const NOUNS = { planet: "the planet", system: "the system", leader: "the leader", ruler: "the ruler", species: "the species", country: "that empire", empire: "that empire", star: "the star", fleet: "the fleet", ship: "the ship", scientist: "the scientist", alliance: "the alliance", government: "the government" };
      const scope = (key.split("|")[0].split(".").at(-2) || "").split("_").at(-1).toLowerCase();
      const plain = /^Get(?:Full|Real)?Name$/i.test(tail);
      const noun = plain ? scope : /^GetRuler(?:Name|Title)$|^GetRegnalName$/i.test(tail) ? "ruler" : /^GetLeaderName$/i.test(tail) ? "leader"
        : /^GetStarName$/i.test(tail) ? "star" : /^GetSpeciesName$/i.test(tail) ? "species" : /^GetAllianceName$/i.test(tail) ? "alliance"
        : /^GetGovernmentName$/i.test(tail) ? "government" : "";
      const before = whole.slice(0, offset), prev = before + (art || ""), rest = (after || "") + whole.slice(offset + match.length);
      // (after a possessive or determiner, the bare noun: "Our [contact_empire.GetName] friends" -> "Our empire friends")
      const det = /\b(our|their|your|its|his|her|my|this|that|these|those|another|every|each|any|no)\s+$/i.test(before);
      const PREP = "of|to|for|with|from|by|about|among|against|on|in|at|into|onto|upon|between|towards?|like|than|over|under|near|beyond";
      const detAdj = new RegExp(`(?:\\b(?:the|our|their|your|its|his|her|my|this|that|these|those)|['’]s)\\s+(?:(?!(?:${PREP})\\b)[a-z][\\w-]*\\s+){1,2}$`, "i").test(before);
      // The word after a name that reads as an attribute ("[X] refugees"), unless it is a verb or a function word.
      const STOP = /^\s+(?:is|are|was|were|has|have|had|will|would|can|could|may|might|must|shall|should|do|does|did|and|or|of|to|in|on|at|for|with|from|by|as|that|which|who|whom|whose|than|but|so|seem|seems|appear|appears|remain|remains|themselves|itself)\b/i;
      if (lang === "en") {
        const agree = (a) => a.replace(/^(a)n?(?=\s)/i, (x) => (/^\s*[aeiou]/i.test(rest) ? x[0] + "n" : x[0]));
        const drop = (lead = art || "") => agree(lead) + OMIT + (after || "");
        const start = !before.trim() || /[.!?…]["”’']?\s*$/.test(before);
        if (/Name|Adj/.test(tail) && !art && ((/,\s*$/.test(before) && /^\s*[.!?]/.test(rest)) || (start && /^(?:!\s|,\s+(?:we|you|I|let|know|hear|listen|behold)\b)/.test(rest)))) return drop();
        // (also a title's capitalised noun: "[Root.GetSpeciesName] Refugees Arrive" -> "Refugees Arrive")
        if ((/Adj/.test(tail) || noun === "species") && /^\s+(?!I\b)[A-Za-z]/.test(rest) && !STOP.test(rest)) return drop();
        if (/Name$/.test(tail)) {
          if ((NOUNS[noun] && new RegExp(`\\b${noun}\\s+$`, "i").test(prev)) || (plain && /\b(?:star|world|moon|asteroid|station|colony|system|planet)\s+$/i.test(prev))) return drop();
          if ((plain || noun === "star") && /^\s+(?:system|planet|star|fleet|ship|world|colony|station|ring world|black hole|nebula|asteroid (?:field|belt))\b/i.test(rest)) {
            return art || det || detAdj ? drop() : (start ? "The " : "the ") + OMIT;
          }
        }
      }
      const phrase = NOUNS[noun] ? (det ? NOUNS[noun].replace(/^(the|that)\s+/, "") : NOUNS[noun]) : "this name";
      const plural = art?.trim() || det || detAdj || /\b(?:many|few|several|all|most|both|other|some)\s+$/i.test(before) ? "people"
        : new RegExp(`\\b(?:${PREP})\\s+$`, "i").test(before) ? "them" : "they";
      text = /Plural/.test(tail) ? T("他们", plural) : NOUNS[noun] && lang === "en" ? phrase : /Name/.test(tail) ? T("这个名字", "this name") : T("……", "…");
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
      const p = phrase.toLowerCase(), t = title.toLowerCase();
      if ((p.endsWith(t) || p.endsWith(t + "s")) && phrase.length > title.length) return OPEN + n + SEP + phrase + CLOSE;
      return OPEN + n + SEP + title + CLOSE;
    })
    // "the [X] species" with X = "this species": drop the repeated noun; "[X]s" after a phrase ending in s.
    .replace(/([\s])(\w+) \2\b/g, "$1$2")
    .replace(/ss\b/g, "s")
    // "[X]'s bodyguard" with X = "our": a possessive determiner takes no 's; zh "我们的[的]".
    .replace(/(\b(?:our|their|your|its))['’]s\b/gi, "$1")
    .replace(/的的/g, "的")
    // "其" is already possessive: "[X.GetHerHis]的任务" -> "其任务", not "其的任务".
    .replace(/([^]*[^]*其)的/g, "$1")
    // "the tropical [X]" with X = "this planet": the sentence already has a determiner, so the phrase drops its own.
    .replace(/\b(the|their|our|its|his|her|your|a|an)\s+([a-z][\w-]*)\s+([^]*)(?:this|that|our|the)\s+/gi, (_, det, adj, n) => `${det} ${adj} ${OPEN}${n}${SEP}`)
    // A frame that only introduces a proper name ("a scientist by the name of [X]", "名叫[X]的间谍首脑"): we never
    // invent the name, so the frame and its slot are left out together ("a scientist", "间谍首脑"). Display only —
    // the original text is kept in the data.
    .replace(new RegExp(`,?\\s+(?:by the name of|named)\\s+${SPAN}(,(?=\\s))?`, "g"), "")
    .replace(new RegExp(`(?:名叫|名为|名字叫)${SPAN}的?`, "g"), "")
    // A computed amount ("+[X]% research"): the phrase stands for the whole quantity, sign and % included.
    .replace(new RegExp(`[+\\-]?(${SPAN})\\s?%`, "g"), "$1")
    // Two substitutions side by side ("[Root.GetRulerTitle] [Root.GetRulerName]") name one person: a second phrase
    // with its own determiner stands alone, otherwise they join ("our" + "ruler").
    .replace(/([^]*)([^]*)(\s?)([^]*)([^]*)/g, (_, n1, t1, gap, n2, t2) =>
      OPEN + n2 + SEP + (/^(?:(?:the|our|this|that|a|an|your|their)\b|这|那|我们)/i.test(t2) || t2.endsWith(t1) || t1.endsWith(t2) || t2.startsWith(t1) ? t2 : t1 + gap + t2) + CLOSE)
    // A possessive before a phrase that brings its own determiner ("our" + "the leader", after a merge): one determiner.
    .replace(/\b(the|our|their|your|its|his|her|my)(\s+)([^]*)(?:the|that)\s+/gi, "$1$2$3")
    // A name only called out to and left out takes its comma or exclamation mark with it ("…meet you, [X]." -> "…meet you.",
    // "[X], we have decided" -> "We have decided"); a sentence that now starts after a left-out name starts with a capital.
    .replace(/,\s*(?=\s*[.!?])/g, "")
    .replace(/\s+(?=[.,;:!?])/g, "")
    // (not inside a scripted name: that is a fragment of the sentence around it, "per 100 [telepaths]")
    .replace(/(^|[.!?]["”’']?\s+)[!,]?\s*([a-z]?)/g, (m, lead, c) => (depth ? m : lead + c.toUpperCase()))
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
    // A short label whose whole content was such a reference ("Reward:\n$mandate_influence_reward_t3$", the mandates) goes
    // with it, instead of ending the text on an empty "Reward:".
    .replace(/\n[^\n]{1,12}[：:][ \t]*\n[ \t]*\$[A-Za-z_][\w.|]*\$[ \t]*(?=\n|$)/g, "")
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
