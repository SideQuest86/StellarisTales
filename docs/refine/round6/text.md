# Round 6 text rendering (critique items 2, 6, 7, 10, 16, 17, 18)

Rule kept: the game's text is never reworded and no data file is touched. Everything below is display-time typesetting in
`src/` (before = HEAD scripts over the same dist, after = working tree; shots in `verification/round6/text/*-b.jpg|*-a.jpg`).

## What changed
- `src/typeset.js` (new). `typeset(text)` is called last in `prose()` (src/app.js), so titles, excerpts, chapter text, choices, map
  captions, effects and the document title all share it. `proseWith()` (search snippets) is not typeset, so highlights still match.
  - EN: `'` / `"` to curly (opening only with a closing partner or clear context; `'tis`, `'em`, `'90s`, possessives handled);
    nested quotes; ` - ` used as a dash to thin space + en dash + thin space, with word joiners so the dash never starts a line;
    `...` to one ellipsis. ZH: ASCII `! ? :` after a Hanzi to full-width (not before an ASCII symbol, so glitch text stays),
    `...` next to Hanzi to a double ellipsis. The rule set follows the string itself (Chinese fallback text in the EN UI is Chinese).
  - Never touched: numbers and ranges (`1-6`, `-1 Pop`, `10 - 5`, `5"`, `5'6`), engine ids (`akx.8000`, `enclave.410.b`,
    `is_dialog_only`), `file.txt:4651`, URLs, `[brackets]`, `$vars$`, `{...}`, name-annotation spans, `''`, `word"word`, list bullets.
  - Whole-corpus sweep (118k story strings, 70k effect strings): visible words identical in all; about 8k strings changed.
  - `leadLine(text)`: a short hyphen-led first line followed by text (the six zh "-警告：具有挑战性的起源" origins; list bullets, negative
    numbers and rules are excluded). Reader: `<span class="lead-line">` (hyphen and words kept) above the paragraph; archive: a
    `#selected-lead` line created in JS between title and teaser, outside the line clamp (CSS in `src/reader-extras.css`).
  - `markIds()` / `noteBody()`: reviewer notes (and the unreachable finding) are a closed `<details class="review-note">` in the UI
    language; the in-text "Review note:" / "审阅注：" prefix is dropped (the summary already says it), ids/script lines in `<code>`.
    Styling already existed in style.css (`details.review-note`), so no new rule was needed.
- `src/search.js`: no leading "· " for untitled chapters. `src/i18n.js` + `src/flow-surface.js`: `map.stats1` ("1 chapter").
- `src/flow-surface.js` `ellipsize()`: last map line is cut at a CJK character or a Latin word boundary, never inside a Latin word, and
  loses trailing separators and an unmatched "(" ("(on…" and "not an as…" now end "…you…" / "not an…"). Thin spaces count as spaces in `fitLines`.
- `src/guide-links.js` `trimGlueSpaces()`: one space beside a Hanzi next to a chapter link is dropped (31 of 128 links in Hard Reset, now 0).

## Checks
- `node --test tests/*.test.mjs`: 125 pass (new `tests/typeset.test.mjs`, 16 cases: apostrophes, nested quotes, dashes vs ranges and
  negatives, ellipsis, ids/URLs, zh, words-identical, lead lines, ids in `<code>`, guide spaces).
- `scripts/smoke.mjs` 15/15, `scripts/verify-search.mjs` 24/24 on port 4161. No new Chinese UI characters (build-subsets check not needed);
  the full-width marks used are in the t1 font tier.
- `scripts/verify-refine-reader.mjs`: steps 1-3 pass; step 4 (390 px map) fails because `.chapter-directory-link` is now
  `display:none !important` (style.css ~1356, item 20 by another agent) and the script opens the phone map through it. Not text related.

## Not done (outside file ownership)
- Item 18 landscape counter clip (`@media (max-height:520px){.flow-stats{display:none}}`), item 10 viewport edge mask (style.css).
- Item 7 audio-player track titles (` - ` to ` – `, src/audio-player.js), item 16 heading slash (src/markdown.js), item 15 zh `1-6天` ranges
  (left as shipped on purpose).
