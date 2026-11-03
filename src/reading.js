// Reading context for V4 story trees (docs/STORY-MODEL-V4.md).
//
// One context resolves every doc on the current path, so consecutive docs can never contradict each other:
//  - profile:     identity facts about the reading empire (ethics, authority, origin…), shared archive-wide;
//  - flags:       flags set / cleared by the options chosen earlier on this path (story-local knowledge);
//  - assumptions: values the reader picked for conditions the archive cannot know (save-state), remembered for the
//                 whole path so the same condition resolves the same way everywhere.
// This is not a save-game simulation: unknown conditions stay visible as labelled alternatives.

const OPPOSED = [["materialist", "spiritualist"], ["xenophile", "xenophobe"], ["militarist", "pacifist"], ["egalitarian", "authoritarian"]];

export function atomKey(atom) {
  if (atom.type === "identity") return "id:" + atom.key;
  if (atom.type === "flag") return "flag:" + atom.name;
  return "other:" + (atom.scope || "") + "|" + atom.key + "=" + (atom.arg || "");
}

/** Does the profile allow this identity fact? true / false / null (unknown). */
function identityValue(atom, profile) {
  const key = atom.key;
  if (key in profile) return profile[key] === atom.value;
  if (atom.value) {
    // A positive fact contradicts an incompatible fact already in the profile.
    for (const [a, b] of OPPOSED) {
      for (const [mine, other] of [[a, b], [b, a]]) {
        if (key.endsWith("_" + mine) && (profile["ethic_" + other] || profile["ethic_fanatic_" + other])) return false;
      }
    }
    for (const prefix of ["origin_", "auth_"]) {
      if (key.startsWith(prefix) && Object.entries(profile).some(([k, v]) => v && k.startsWith(prefix) && k !== key)) return false;
    }
    if (key.startsWith("ethic_fanatic_") && profile[key.replace("ethic_fanatic_", "ethic_")] === false) return false;
  } else if (key.startsWith("ethic_") && !key.startsWith("ethic_fanatic_") && profile[key.replace("ethic_", "ethic_fanatic_")]) {
    return false; // "not X" contradicts "fanatic X"
  }
  return null;
}

export function atomValue(atom, ctx) {
  const assumed = ctx.assumptions?.[atomKey(atom)];
  if (assumed !== undefined) return assumed === atom.value;
  if (atom.type === "identity") return identityValue(atom, ctx.profile || {});
  if (atom.type === "flag") {
    if (ctx.flags?.has(atom.name)) return atom.value === true;
    if (ctx.cleared?.has(atom.name)) return atom.value === false;
    // A flag only this story sets, never set on the path so far, is known to be absent — but only when the reader
    // followed the story from one of its entries (a document opened directly has no known path), and only for a
    // flag checked on the reader's own country: one checked on another scope (e.g. `from`, the emperor in a civil
    // war) may have been set by a document of that other party that this reader never sees.
    const ownScope = !atom.path || atom.path === "root" || atom.path === "this";
    if (ctx.storyFlags?.has(atom.name) && ctx.pathFromEntry && ownScope) return atom.value === false;
    return null;
  }
  return null;
}

/** Evaluate a DNF (array of branches, each an array of atoms). null DNF = always. Returns true / false / null. */
export function evaluate(dnf, ctx) {
  if (!dnf) return true;
  let unknown = false;
  for (const branch of dnf) {
    let result = true;
    for (const atom of branch) {
      const v = atomValue(atom, ctx);
      if (v === false) { result = false; break; }
      if (v === null) result = null;
    }
    if (result === true) return true;
    if (result === null) unknown = true;
  }
  return unknown ? null : false;
}

/** Flags known after walking the path: [{chapter, choice?}] steps resolved against their docs. */
export function pathFlags(steps, docOf) {
  const flags = new Set(), cleared = new Set();
  for (const step of steps) {
    for (const f of step.sets || []) { flags.add(f); cleared.delete(f); } // set on the way (routers, project hooks)
    const doc = docOf(step);
    if (!doc) continue;
    for (const f of doc.sets || []) { flags.add(f); cleared.delete(f); }
    const choice = step.choice !== undefined ? doc.choices?.find((c, i) => (step.choiceIndex ?? -1) === i || c.key === step.choice) : null;
    for (const f of choice?.sets || []) { flags.add(f); cleared.delete(f); }
    for (const f of choice?.clears || []) { cleared.add(f); flags.delete(f); }
  }
  return { flags, cleared };
}

/** Every flag that some doc or option of the story can set: absence of those is meaningful on a path. */
export function storyFlags(dossier) {
  const out = new Set();
  for (const doc of dossier.chapters) {
    for (const f of doc.sets || []) out.add(f);
    for (const c of doc.choices || []) for (const f of c.sets || []) out.add(f);
  }
  return out;
}

/** Resolve a doc's body: passages that may apply, each with its pieces resolved. */
export function resolveBody(doc, ctx) {
  if (!doc.body) {
    // Several texts without a body are the game's alternatives (it shows one: a storm type, a faction, a hive's view): one
    // passage each, read one at a time instead of run together; identical ones are one. A blank text or list lines mark a
    // composed description instead (an intro, a separator, its items: shroud.3011, the Unplugged identity): its parts are
    // read in order, without the blanks.
    const blank = (t) => !(String(t?.zh || "").trim() || String(t?.en || "").trim());
    const listed = (t) => /^\s*[-•*·]\s/.test(t?.en || t?.zh || "");
    // (a text that only repeats the title, a situation's name as its description, is not said twice)
    const all = (doc.texts || []).filter((t) => !(doc.title && t?.zh === doc.title.zh && t?.en === doc.title.en));
    const paragraph = (t) => ({ parts: [{ text: t, status: true, when: null }] });
    if (all.length > 1 && !all.some(blank) && !all.some(listed)) {
      const seen = new Set();
      const texts = all.filter((t) => !seen.has(JSON.stringify(t)) && seen.add(JSON.stringify(t)));
      if (texts.length > 1) return texts.map((t) => ({ status: null, when: null, paragraphs: [paragraph(t)] }));
    }
    return [{ status: true, when: null, paragraphs: all.filter((t) => !blank(t)).map(paragraph) }];
  }
  const passages = [];
  for (const passage of doc.body) {
    const status = evaluate(passage.when, ctx);
    if (status === false) continue;
    const pieces = [];
    let paragraph = [];
    const flush = () => { if (paragraph.length) pieces.push({ parts: paragraph }); paragraph = []; };
    for (const piece of passage.pieces) {
      if (piece.break) { flush(); continue; }
      const s = evaluate(piece.when, ctx);
      if (s === false) continue;
      paragraph.push({ text: doc.texts[piece.text], status: s, when: piece.when || null });
    }
    flush();
    passages.push({ status, when: passage.when || null, paragraphs: pieces });
  }
  // A passage that certainly applies hides the ones that only might (the game shows one description).
  const certain = passages.filter((p) => p.status === true);
  return certain.length ? certain : passages;
}

/** Options as the game would show them: hidden if their trigger fails, disabled if `allow` fails. */
export function resolveChoices(doc, ctx) {
  const shown = (doc.choices || []).map((choice, index) => {
    const visible = evaluate(choice.when, ctx);
    const allowed = evaluate(choice.allow, ctx);
    const label = choice.labels?.find((l) => evaluate(l.when, ctx) === true)?.label || choice.label;
    return { ...choice, index, label, visible, allowed };
  }).filter((c) => c.visible !== false);
  // The game's variants of one option (the same key and words, each under its own trigger) are one button: the reader would see
  // the same words twice. It shows when either shows and is open when either is.
  const out = [];
  for (const c of shown) {
    const twin = out.find((o) => o.key && o.key === c.key && JSON.stringify(o.label) === JSON.stringify(c.label));
    if (!twin) { out.push(c); continue; }
    const either = (a, b) => (a === true || b === true ? true : a === false && b === false ? false : null);
    twin.visible = either(twin.visible, c.visible);
    twin.allowed = either(twin.allowed, c.allowed);
    twin.when = twin.when && c.when ? [...twin.when, ...c.when] : null;
  }
  return out;
}

/** Outgoing edges that remain possible in this context. */
export function resolveEdges(edges, ctx) {
  return (edges || []).filter((e) => e.when ? e.when.every((dnf) => evaluate(dnf, ctx) !== false) : true);
}

/** Identity / assumption facts that choosing this alternative implies (to keep later docs consistent). */
export function impliedFacts(dnf) {
  if (!dnf || dnf.length !== 1) return {}; // only an unambiguous single branch implies facts
  const out = {};
  for (const atom of dnf[0]) out[atomKey(atom)] = atom.value;
  return out;
}

/** Apply facts: identity facts go to the archive-wide profile, everything else to path assumptions. */
export function applyFacts(facts, profile, assumptions) {
  for (const [key, value] of Object.entries(facts)) {
    if (key.startsWith("id:")) profile[key.slice(3)] = value;
    else if (!key.startsWith("flag:")) assumptions[key] = value;
  }
}

/** A condition without the flags that have no name: "earlier events" tells a reader nothing about which text is which. */
export function namedOnly(dnf, lang, names = {}) {
  return dnf && dnf.map((branch) => branch.filter((a) => a.type !== "flag" || a.label?.[lang] || names[a.key]?.[lang]));
}

/** Words for the row above alternative texts. names: each text's readable condition ("" when it has none). A name shared by
 *  several tells nothing, so it counts as none. Every text with a name keeps it, a single nameless one among them is `other`;
 *  any more and the row has no words to offer (null: the caller numbers them). */
export function passageTabs(names, other) {
  const own = names.map((n) => (n && names.indexOf(n) === names.lastIndexOf(n) ? n : ""));
  const nameless = own.filter((n) => !n).length;
  if (nameless > 1 || nameless === own.length) return null;
  return own.map((n) => n || other);
}

/** Words that tell texts apart: each one's opening, or, where it opens like another, the sentence where the two part ("…战斗一开始，…"),
 *  at most `room` characters of the text's own words. Texts that are the same throughout keep their opening. */
export function partingWords(texts, room) {
  const shared = (a, b) => { let k = 0; while (k < a.length && a[k] === b[k]) k++; return k; };
  // (an English cut ends at a word's end: "…the graveyard on the…", not "…on the su…")
  const cut = (s, start) => {
    let end = Math.min(s.length, start + room);
    if (end < s.length && /\w/.test(s[end - 1]) && /\w/.test(s[end])) { const space = s.lastIndexOf(" ", end); if (space > start + room / 2) end = space; }
    // (a text that already ends in its own ellipsis keeps one: "The voice returns……")
    const words = s.slice(start, end).trim(), own = /(?:…|\.\.\.)$/.test(words);
    if (!words.replace(/[…\s.]/g, "")) return ""; // (nothing of its own left: no lone "…")
    return `${start ? "…" : ""}${own ? words.replace(/(?:…+|\.\.\.)$/, "") : words}${end < s.length || own ? "…" : ""}`;
  };
  return texts.map((s, i) => {
    const from = Math.max(0, ...texts.map((o, j) => (j === i || o === s ? 0 : shared(s, o))));
    if (from < room * 0.75) return cut(s, 0);
    // From the sentence the parting falls in; when that sentence runs long, from just before the parting, at a word's start.
    let start = 0;
    for (const m of s.slice(0, from).matchAll(/[。！？.!?：:；;]\s*/g)) start = m.index + m[0].length;
    if (from - start > room * 0.6) {
      start = from - Math.floor(room / 4);
      while (start < from && /\w/.test(s[start - 1] || "") && /\w/.test(s[start])) start++;
    }
    return cut(s, start);
  });
}

/** Readable label of a condition (for tabs / notes), using the game's own names where available.
 *  Only conditions that have a name are described: an atom without one is left out of its branch, and when any alternative
 *  has no named atom at all the condition cannot be stated truthfully, so the result is "" (callers show nothing, or the
 *  `fallback` text where a control needs a label). Repeated alternatives collapse; more than `max` end with "…". */
export function describe(dnf, lang, names = {}, { fallback = "", max = 3, always } = {}) {
  if (!dnf) return "";
  // "X, or not X and Y" is "X or Y" ("非宇宙天气模型 或 宇宙天气模型 · 非概率流" -> "非宇宙天气模型 或 非概率流"); "X or not X" holds
  // always and says nothing.
  const single = dnf.filter((b) => b.length === 1).map((b) => b[0]);
  // (a scope is written "owner.species" in one place and "owner/species" in its negation)
  const key = (a) => (a.type === "identity" || a.type === "flag" ? atomKey(a) : `other:${String(a.scope || "").replace(/\//g, ".")}|${a.key}=${a.arg || ""}`);
  // (or one check named alike, stored two ways: "能力增强 或（择优血脉 · 非能力增强）")
  const opposite = (a, b) => (key(a) === key(b) || (!!a.label?.en && a.label.en === b.label?.en && a.label?.zh === b.label?.zh)) && a.value !== b.value;
  if (single.some((a) => single.some((b) => opposite(a, b)))) return always ?? fallback;
  if (single.length) dnf = dnf.map((b) => (b.length === 1 ? b : b.filter((a) => !single.some((s) => opposite(s, a)))));
  // What every alternative shares is said once, then what tells them apart: "(not Storm Chasers · not Treasure Hunters) or
  // (not Storm Chasers · not Letters of Marque)" reads "not Storm Chasers · (not Treasure Hunters or not Letters of Marque)";
  // when the rest always holds ("A or B or neither"), only the shared part is said.
  if (dnf.length > 1) {
    const sig = (a) => `${key(a)}=${a.value}`;
    const common = dnf[0].filter((a) => dnf.every((b) => b.some((x) => sig(x) === sig(a))));
    if (common.length) {
      let rest = dnf.map((b) => b.filter((a) => !common.some((c) => sig(c) === sig(a))));
      // (only when both parts have words: a rest of unnamed checks is read as before, its alternatives left out)
      const head = describe([common], lang, names, { max });
      const ones = rest.filter((b) => b.length === 1).map((b) => b[0]);
      if (head && (rest.some((b) => !b.length) || ones.some((a) => ones.some((b) => opposite(a, b))))) return head;
      rest = rest.map((b) => (b.length === 1 ? b : b.filter((a) => !ones.some((s) => opposite(s, a)))));
      if (head && rest.some((b) => !b.length)) return head;
      const tail = head && describe(rest, lang, names, { max, always: "\u0002" });
      if (tail === "\u0002") return head;
      if (tail) return `${head} · ${rest.length > 1 ? (lang === "zh" ? `（${tail}）` : `(${tail})`) : tail}`;
    }
  }
  const word = (zh, en) => (lang === "zh" ? zh : en);
  const isName = (a) => a.label?.[lang] || names[a.key]?.[lang];
  // Unnamed flags all read "earlier events". One such flag keeps its "not" (a version when it happened, one when it did not);
  // several different ones would read as nonsense ("not earlier events or earlier events"), so then they all collapse.
  const unnamedFlags = new Set(dnf.flat().filter((a) => a.type === "flag" && !isName(a)).map((a) => `${a.scope}:${a.name ?? a.key}`));
  const atomText = (a) => {
    const name = a.label?.[lang] || names[a.key]?.[lang]
      // An engine key is only readable English: never shown in Chinese, never for anything but an identity fact.
      || (lang === "en" && a.type === "identity" && /^(ethic|auth|origin|civic)_/.test(a.key) ? a.key.replace(/^(ethic|auth|origin|civic)_/, "").replace(/_/g, " ") : null);
    if (!name && a.type !== "flag") return null;
    // Inline icons are display markup (the game's £trigger_no£ cross); the words are what is read.
    const bare = String(name || "").replace(/£[^£\s]+£\s*/g, "").trim();
    // (the profile control says 狂热 for a fanatic ethic; a condition says it the same way, not 极端)
    const text = (lang === "zh" ? bare.replace(/^极端(军国|和平|排外|亲外|唯心|唯物|威权|平等)主义/, "狂热$1主义") : bare) || word("此前经历", "earlier events");
    // A label that is a whole sentence is the game's own tooltip, which already says what is needed ("We can only run one such
    // secret enterprise at a time."): "not" in front of it read as nonsense.
    // Only a sentence that states a constraint drops the "not"; a statement keeps it, reading as one clause in English ("not we
    // have already recruited a leader …"; dropping it there would invert the meaning). A label the game marks as a failed
    // requirement (£trigger_no£) or that opens with a negation ("Cannot be the Galactic Emperor", "没有…") is already worded
    // as the requirement: a second "not" would invert it.
    // (a Chinese sentence has no spaces to count: six characters before its stop)
    const sentence = bare && /[.。!！?？]$/.test(bare) && (bare.split(/\s+/).length > 3 || /[㐀-鿿]{6}/.test(bare));
    const constraint = (sentence && /\b(can only|only if|only one|must|cannot|can't|may only)\b|只能|必须|不能|仅限|才能/i.test(bare))
      || /^\s*£trigger_(?:no|yes)£/.test(String(name || "")) || /^(?:(?:cannot|can't|can not|no|not|never|must not|is not|does not|do not|has not|have not|are not)\b|不能|不可|不是|不得|没有|无法|无可|尚未|未(?!来|知|央))/i.test(bare);
    // A statement ("We already have the Salvager Insight modifier.") is not a name: "not we already have …" / "非我们已经拥有…"
    // read as broken grammar. English says "unless we already have …", Chinese quotes the game's sentence after 并非 (除非 would
    // read "only if"). A title keeps its capitals ("not Your Ladder To The Sky").
    // (also with a name after the article, "The Curators are already improving our research capabilities.")
    if (!a.value && !constraint && lang === "en" && (/^(?:We|Our|They|Their|It|Its|You|Your|The|This|That|These|There|A|An)\s+[a-z]/.test(text) || (sentence && /^(?:The|This|That|These|Our|Their|Your)\s+[A-Z]/.test(text)))) return "unless " + text[0].toLowerCase() + text.slice(1).replace(/[.。]$/, "");
    if (!a.value && !constraint && lang === "zh" && name && (/[。！？]$/.test(text) || /^(?:我们|我方|他们|它们|你们)/.test(text))) return `并非「${text.replace(/[。]$/, "")}」`;
    return (a.value || constraint || (!name && unnamedFlags.size > 1) ? "" : word("非", "not ")) + text;
  };
  const parts = [];
  for (const branch of dnf) {
    const atoms = branch.map(atomText).filter((v, i, all) => v && all.indexOf(v) === i);
    // (what holds first, what does not after: "线圈炮 · 非轨道炮", not "非轨道炮 · 线圈炮")
    atoms.sort((x, y) => Number(/^(?:非|并非|not |unless )/.test(x)) - Number(/^(?:非|并非|not |unless )/.test(y)));
    if (!atoms.length) return fallback;
    parts.push(atoms);
  }
  // The same absorption on the words: two checks that read alike (the uprising's empire and ours, "铁心灭绝者") are one.
  const flip = (s) => (s.startsWith("非") ? s.slice(1) : s.startsWith("not ") ? s.slice(4) : (lang === "zh" ? "非" : "not ") + s);
  const alone = parts.filter((p) => p.length === 1).map((p) => p[0]);
  if (alone.some((s) => alone.includes(flip(s)))) return always ?? fallback;
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].length < 2) continue;
    parts[i] = parts[i].filter((s) => !alone.includes(flip(s)));
    if (!parts[i].length) return always ?? fallback;
  }
  // "A · B or A" is just "A": an alternative that contains another one adds nothing; equal ones collapse.
  const kept = parts.filter((p, i) => !parts.some((q, j) => j !== i && q.every((v) => p.includes(v)) && (q.length < p.length || j < i)));
  // "not A or not B" is "not both A and B" (it read as contradicting the options beside it: "Only when: not Gene Tailoring or not
  // Basic Cloaking Fields").
  const neg = (s) => /^(?:非(?!常)|not )/.test(s) && !/^not (?:both|all) /.test(s);
  if (kept.length > 1 && kept.every((p) => p.length === 1 && neg(p[0]))) {
    const ns = kept.map((p) => p[0].replace(/^(?:非|not )/, ""));
    // (a long list is cut after five, with no "and" before the cut)
    const list = ns.slice(0, ns.length > 6 ? 5 : 6), more = ns.length > list.length;
    const and = (sep, last) => (more ? list.join(sep) + word("等", " …") : list.slice(0, -1).join(sep) + last + list[list.length - 1]);
    return lang === "zh" ? `并非同时具备${and("、", "和")}` : list.length === 2 ? `not both ${list[0]} and ${list[1]}` : `not all of ${and(", ", " and ")}`;
  }
  // (what holds comes first among the alternatives too: "not Gestalt Consciousness or Hive Mind" read as "not either"; "Hive
  // Mind or not Gestalt Consciousness" does not)
  const ordered = kept.map((p, i) => [p, i]).sort((a, b) => Number(a[0].length === 1 && neg(a[0][0])) - Number(b[0].length === 1 && neg(b[0][0])) || a[1] - b[1]).map(([p]) => p);
  // (in English three or more "not"s in a row are one "none of": "none of Militarist, Fanatic Purifiers or Machine Intelligence")
  // (a check that is a whole sentence ends with its own stop: the next follows it as a sentence, not after "。 ·")
  const joined = (p) => p.reduce((s, x, i) => (!i ? x : /[。！？]$/.test(s) ? s + x : /[.!?]$/.test(s) ? `${s} ${x[0].toUpperCase()}${x.slice(1)}` : `${s} · ${x}`), "");
  // (three or more "not"s, after what holds: English "none of A, B or C", Chinese "非A、非B、非C" — not a run of " · " that read as one
  // list with what holds, "线圈炮 · 非自由商人 · 非契约资产 · …")
  const all = (p) => {
    const negs = p.filter(neg), pos = p.filter((s) => !neg(s));
    if (negs.length < 3 || pos.some((s) => /[。.!?！？]$/.test(s))) return joined(p);
    const none = lang === "en" ? `none of ${negs.slice(0, -1).map((s) => s.slice(4)).join(", ")} or ${negs.at(-1).slice(4)}` : negs.join("、");
    return pos.length ? `${joined(pos)} · ${none}` : none;
  };
  // (alternatives of several parts are bracketed, so "or" reads at the right level: "极端和平主义 或（非极端军国主义 · 非极端排外主义）")
  const branches = ordered.map((p) => (ordered.length > 1 && p.length > 1 ? word(`（${all(p)}）`, `(${all(p)})`) : all(p)));
  // (alternatives that are single names may run to five before the list is cut: "Genetic or Cloning or Mutation Traditions …")
  const cap = max === 3 && ordered.every((p) => p.length === 1) ? 5 : max;
  return branches.slice(0, cap).join(word(" 或 ", " or ")).replace(/ 或 （/g, " 或（").replace(/） 或/g, "）或") + (branches.length > cap ? word(" 等", " …") : "") || fallback;
}
