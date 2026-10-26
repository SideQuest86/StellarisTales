// Display-time typesetting of the game's text (round 6). Glyph-level only: the words are never touched, the data files are
// never rewritten, and anything ambiguous is left exactly as shipped.
//   English: straight quotes / apostrophes become curly, a spaced hyphen used as a dash becomes an en dash with thin
//            spacing, "..." becomes one ellipsis character.
//   Chinese: ASCII ! ? : after a Hanzi become full-width, "..." next to Hanzi becomes a double ellipsis.
// Never touched: numbers and ranges (1-6, 3:1, 5"), engine ids and file names (akx.8000, enclave.410.b, is_dialog_only,
// overlord_events.txt:9615), URLs, [bracketed] placeholders, $variables$ and the name-annotation spans of src/app.js.
// (Escapes are doubled inside the RegExp strings below and the glyphs are built from code points, so that no invisible
// character sits in this source.)

const ch = (...codes) => String.fromCodePoint(...codes);
const LDQ = ch(0x201c), RDQ = ch(0x201d), LSQ = ch(0x2018), RSQ = ch(0x2019), ELLIPSIS = ch(0x2026);
// Thin space, word joiner, en dash, word joiner, thin space: the dash keeps its thin spaces and never starts a line (the word
// joiner forbids a break before the dash and between the dash and its space; a line may end after the closing thin space).
const DASH = ch(0x2009, 0x2060, 0x2013, 0x2060, 0x2009);
const FULL = { "!": ch(0xff01), "?": ch(0xff1f), ":": ch(0xff1a) };
const SLOT = 0xe100, SLOTS = 0x300; // private-use characters that stand in for protected spans while typesetting
const SLOT_CHAR = new RegExp("[\\uE100-\\uE3FF]", "g");
const PROTECT = new RegExp(
  [
    "\\uE000[^\\uE002\\uE001]*\\uE002", // the annotation text of an inserted name (src/name-fill.js markers)
    "(?:https?:\\/\\/|www\\.)[^\\s<>]+", // URLs
    "\\[[^\\]\\n]*\\]", // [placeholders] and ['concept_ids']
    "\\$[^$\\s]+\\$", // $variables$
    "\\{\\.\\.\\.\\}", // check_variable = {...}
    "\\b[\\w-]+\\.(?:txt|json|yml|gui|gfx|dds|png|csv|lua)\\b(?::\\d+(?:-\\d+)?)?", // file.txt:4651
    "\\b[A-Za-z_]{2,}[\\w-]*\\.\\d[\\w.]*", // akx.8000, enclave.410.b
    "\\b[A-Za-z][A-Za-z0-9]*(?:_[A-Za-z0-9]+)+\\b", // snake_case and SNAKE_CASE ids
    "\\b[a-z][a-z_]*:[A-Za-z_][\\w.]*", // scope:name
  ].join("|"),
  "g",
);
const CJK = new RegExp("[\\u3400-\\u9fff\\u3000-\\u303f\\uff00-\\uffef]");
// ! ? : right after a Hanzi (or a full-width closing bracket / a closing quote that follows a Hanzi), unless an ASCII symbol
// follows (corrupted-text effects such as "弱点!+<;" stay as shipped)
const CJK_BEFORE = new RegExp("((?:[\\u3400-\\u9fff\\uff09\\u300d\\u300f\\u300b\\u3011]|(?<=[\\u3400-\\u9fff])[\\u201d\\u2019]))([!?:]+)(?![+<>*;_^&}|#=\\/\\\\@~%$-])", "g");
const WORD = new RegExp("[\\p{L}\\p{N}\\uE100-\\uE3FF\\uE001]", "u"); // letters, digits, protected spans, the end of an inserted name
const DIGIT = /\p{N}/u;
const OPENING = new RegExp("^[\\s([{<\\u2014\\u2013\\u201c\\u2018\\uE000\\uE002]$"); // what may precede an opening quote
const ELISION = /^(?:tis|twas|twere|twill|til|till|cause|course|cos|em|n|round|bout|neath|nother|ere)(?![\p{L}])/iu; // 'tis, 'em, rock 'n' roll
const YEAR = /^\d\ds?(?![\p{L}\p{N}'])/u; // '90s
const SENTENCE_END =/^[.,!?;…]$/;

/** Quotes and apostrophes of one string (protected spans are single private-use characters). */
function curl(s) {
  const a = [...s], out = [...s];
  const opening = (c) => !c || OPENING.test(c);
  const spaced = (c) => !c || /\s/.test(c);
  let open = 0, openSingle = 0; // quotes opened and not yet closed
  for (let i = 0; i < a.length; i++) {
    const c = a[i];
    if (c !== '"' && c !== "'") continue;
    const prev = i ? out[i - 1] : "", next = a[i + 1] || "";
    if (prev === c || next === c) continue; // '' and "" are ambiguous: leave
    if (c === '"') {
      if (opening(prev) && !spaced(next)) { out[i] = LDQ; open++; }
      else if (!opening(prev) && !spaced(prev) && !WORD.test(next) && (!DIGIT.test(prev) || open > 0)) { out[i] = RDQ; if (open) open--; }
      else if (open > 0 && SENTENCE_END.test(prev) && WORD.test(next)) { out[i] = RDQ; open--; } // "Tales."The
      else if (open === 0 && prev === ":" && WORD.test(next)) { out[i] = LDQ; open++; } // says:"Stress
      continue; // anything else (5", word"word, a lone quote) stays as shipped
    }
    if (DIGIT.test(prev) && DIGIT.test(next)) continue; // 5'6
    if (WORD.test(prev) && WORD.test(next)) out[i] = RSQ; // don't, Kael's
    else if (!opening(prev) && !spaced(prev)) { // closing quote, players' (5' stays unless a quote is open)
      if (!DIGIT.test(prev) || WORD.test(next) || openSingle > 0) { out[i] = RSQ; if (openSingle) openSingle--; }
    } else if (opening(prev) && !spaced(next)) {
      const word = a.slice(i + 1, i + 12).join("");
      if (ELISION.test(word) || YEAR.test(word)) out[i] = RSQ; // 'tis, 'em, '90s
      else {
        // an opening single quote needs its closing partner on the same line, else it is ambiguous
        let j = i + 1;
        for (; j < a.length && a[j] !== "\n"; j++) {
          if (a[j] !== "'") continue;
          const p = a[j - 1], n = a[j + 1] || "";
          if (!spaced(p) && !opening(p) && !WORD.test(n) && p !== "'" && n !== "'") break;
        }
        if (j < a.length && a[j] === "'") { out[i] = LSQ; openSingle++; }
      }
    }
  }
  return out.join("");
}

/** English typesetting of a string without protected spans. */
function english(s) {
  if (s.includes("...")) s = s.replace(/(?<!\.)\.\.\.(?!\.)/g, (m, at) => (DIGIT.test(s[at - 1] || "") && DIGIT.test(s[at + 3] || "") ? m : ELLIPSIS));
  if (s.includes(" - ")) s = s.replace(/(?<=[^\s-]) - (?=[^\s-])/g, (m, at) => (DIGIT.test(s[at - 1]) && DIGIT.test(s[at + 3]) ? m : DASH));
  return s.includes('"') || s.includes("'") ? curl(s) : s;
}

/** Chinese typesetting of a string without protected spans. */
function chinese(s) {
  s = s.replace(CJK_BEFORE, (_, h, marks) => h + [...marks].map((m) => FULL[m]).join(""));
  if (s.includes("...")) s = s.replace(/(?<!\.)\.\.\.(?!\.)/g, (m, at) => (CJK.test(s[at - 1] || "") || CJK.test(s[at + 3] || "") ? ELLIPSIS + ELLIPSIS : m));
  return s;
}

/**
 * The typeset display form of game text. The rule set is taken from the text itself (a Chinese string in the English UI, a
 * fallback, gets the Chinese rules). The visible words are identical before and after.
 */
export function typeset(text) {
  const s = String(text ?? "");
  if (!/["'!?:]|\.\.\./.test(s) && !s.includes(" - ")) return s;
  const kept = [];
  const guarded = s.replace(PROTECT, (m) => {
    if (kept.length >= SLOTS) return m;
    kept.push(m);
    return String.fromCharCode(SLOT + kept.length - 1);
  });
  const done = CJK.test(guarded) ? chinese(guarded) : english(guarded);
  return kept.length ? done.replace(SLOT_CHAR, (c) => kept[c.charCodeAt(0) - SLOT] ?? c) : done;
}

/**
 * A short first line that starts with a hyphen and is followed by more text (the Chinese "-警告：具有挑战性的起源" line over
 * an origin's description) is a line of its own, not the start of the sentence below it. Returns { lead, rest } with the
 * hyphen and the words kept, or null. List bullets ("- text"), negative numbers ("-1 Pop") and rules ("----") are not
 * lead lines.
 */
export function leadLine(text) {
  const s = String(text ?? "");
  const m = /^-(?![-\s\d.])([^\n]{1,48})\n+(?=\S)/.exec(s);
  return m ? { lead: "-" + m[1].trimEnd(), rest: s.slice(m[0].length) } : null;
}

const ID = new RegExp(
  [
    "\\b[\\w-]+\\.(?:txt|json|yml|gui|gfx|dds|csv|lua)\\b(?::\\d+(?:-\\d+)?)?", // overlord_events.txt:9615
    "\\b[A-Za-z_]{2,}[\\w-]*\\.\\d+(?:\\.[a-z]\\b)?", // akx.8000, enclave.410.b
    "\\b[A-Za-z][A-Za-z0-9]*(?:_[A-Za-z0-9]+)+\\b", // is_dialog_only, FROZ_ILLUMINATED_CAT
  ].join("|"),
  "g",
);
/** Escaped HTML of a reviewer's note with the engine ids (events, flags, script files) in <code>. */
export function markIds(text, esc) {
  const s = String(text ?? "");
  let html = "", at = 0;
  for (const m of s.matchAll(ID)) {
    html += esc(s.slice(at, m.index)) + "<code>" + esc(m[0]) + "</code>";
    at = m.index + m[0].length;
  }
  return html + esc(s.slice(at));
}

/** A reviewer note without the "Review note:" label that the note's own heading now carries. */
export const noteBody = (text) => String(text ?? "").replace(/^\s*(?:审阅注释|审阅注|Review(?:er)? note)\s*[:：]\s*/i, "");
