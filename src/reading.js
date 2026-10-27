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
    const all = doc.texts || [];
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
  return (doc.choices || []).map((choice, index) => {
    const visible = evaluate(choice.when, ctx);
    const allowed = evaluate(choice.allow, ctx);
    const label = choice.labels?.find((l) => evaluate(l.when, ctx) === true)?.label || choice.label;
    return { ...choice, index, label, visible, allowed };
  }).filter((c) => c.visible !== false);
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

/** Readable label of a condition (for tabs / notes), using the game's own names where available.
 *  Only conditions that have a name are described: an atom without one is left out of its branch, and when any alternative
 *  has no named atom at all the condition cannot be stated truthfully, so the result is "" (callers show nothing, or the
 *  `fallback` text where a control needs a label). Repeated alternatives collapse; more than `max` end with "…". */
export function describe(dnf, lang, names = {}, { fallback = "", max = 3 } = {}) {
  if (!dnf) return "";
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
    const text = name || word("此前经历", "earlier events");
    // A label that is a whole sentence is the game's own tooltip, which already says what is needed ("We can only run one such
    // secret enterprise at a time."): "not" in front of it read as nonsense.
    // Only a sentence that states a constraint drops the "not"; a statement keeps it, reading as one clause in English ("not we
    // have already recruited a leader …"; dropping it there would invert the meaning).
    const sentence = name && /[.。!！?？]$/.test(String(name).trim()) && String(name).trim().split(/\s+/).length > 3;
    const constraint = sentence && /\b(can only|only if|only one|must|cannot|can't|may only)\b|只能|必须|不能|仅限|才能/i.test(name);
    if (!a.value && !constraint && lang === "en" && (sentence ? /^[A-Z][a-z]/ : /^(We|Our|They|Their|It|Its|You|Your)\b/).test(text)) return word("非", "not ") + text[0].toLowerCase() + text.slice(1);
    return (a.value || constraint || (!name && unnamedFlags.size > 1) ? "" : word("非", "not ")) + text;
  };
  const parts = [];
  for (const branch of dnf) {
    const atoms = branch.map(atomText).filter((v, i, all) => v && all.indexOf(v) === i);
    if (!atoms.length) return fallback;
    parts.push(atoms);
  }
  // "A · B or A" is just "A": an alternative that contains another one adds nothing; equal ones collapse.
  const kept = parts.filter((p, i) => !parts.some((q, j) => j !== i && q.every((v) => p.includes(v)) && (q.length < p.length || j < i)));
  const branches = kept.map((p) => p.join(" · "));
  return branches.slice(0, max).join(word(" 或 ", " or ")) + (branches.length > max ? word(" 等", " …") : "") || fallback;
}
