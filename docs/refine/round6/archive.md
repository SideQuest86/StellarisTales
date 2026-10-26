# Round 6 - archive landing, Grand Archive museum, search dialog (design pass)

Scope: archive selection panel, category bar and counters, museum header / filters / grid / exhibit, search dialog. Files:
`src/style.css` (archive, masthead, search rules only), `src/museum.css`, `src/museum.js` (markup only). No wording changes, no new
strings, so `i18n.js` / `zh.json` are untouched. Screenshots: `verification/round6/archive/` (`before-*` = live v4.9.0, `after-*`
= this work; `d` 1440x900, `f` 1920x1080, `p` 390x844, `s1/s2/t/l` 1366x768 / 1280x720 / 1024x768 / 844x390; `-zh` / `-en`).

## Critique (before)
- Selection panel: three different widths (excerpt 470, open row 400, continue 400), 14 px excerpt, title/excerpt/open spacing off
  any scale; the saved-reading row (dim, opacity .72, 12 px) was the quietest thing on the page although it is the action many
  readers want; on a phone its "start over" wrapped to a third line. Category arrows floated at 80 % with no relation to the text.
- Category bar: at 1440 px in English the Grand Archive tab was clipped ("Gra"), zh clipped below 1366 px; counts were 10 px mono
  (code type under a serif UI); the museum looked like a sixth category.
- Museum: pill chips and a spaced mono "GRAND ARCHIVE" were the only rounded / techy elements in a book-like site; the filter row
  slid under the open exhibit; exhibit: disclaimer wedged between image and title, labels in mono, effects and acquisition as
  ragged inline text, the head's x showed through the translucent detail panel.
- Search: box recentred (jumped) as results changed; 13 px placeholder vs 16 px input, no focus indicator on the field (outline
  none), bold white native clear x, gold arrow on every row, rows cut hard at the foot, hit-type label 4 px off the title column.

## Changes
- Archive column: one measure (`--sel-measure` 27.5 rem, 31 rem on >= 1680 px) and one left edge (`--sel-left`), shared by eyebrow, title,
  excerpt, specimens, open row, saved-reading row and now the category arrows. Excerpt 15 px / 16 px EN (3 lines on tall screens), title
  `palt`, spacing 14 / 16 / 24 px, eyebrow 500 weight tabular lining figures, read progress in teal, stronger local scrim (and a
  phone scrim; measured contrast of the eyebrow on phone went from p98 2.4 to 5.5).
- Open row: 500 weight, gold rule brightens + wash on hover. Saved-reading row = second line of the same ruled ledger: label 14 px
  `--ink-2`, where-it-is 12.5 px `--dim` (no opacity), "start over" right on the same line also on phones.
- Category bar: fits at 1366 px EN / 1280 px zh (fluid tab padding, gap, size, English tracking), counts 11 px sans tabular, hairline
  between categories and the museum, masthead scrim a little denser.
- Museum header: name on a plaque line (page language large, other language in quiet italic serif / spaced Hanzi), 36 em concept.
  Filters: tabs like the category bar (gold + underline pressed, no pills), rarity key = hollow diamond in the pedestal colour, row
  wraps beside an open exhibit. Names balanced (`text-wrap`), `palt`.
- Exhibit: caption (3D note) tight under the stage, 28 px before the text; eyebrow with rarity in its colour; title `palt`; first
  paragraph a standfirst, the rest set like the reader (justify, kinsoku, EN pretty / hyphens); section labels ruled like the
  reader's; effects as a table (right-aligned tabular figure | name + gold-2 condition); acquisition 2-column; sources ruled.
- Search: top-anchored dialog (no jump), 19-20 px serif input with gold focus rule (the missing focus cue), same-size placeholder,
  thin clear cross, 12.5 px count, rows 16 px serif, muted arrow brightens on hover/focus, list fades at the foot, pager with a rule,
  centred calm empty line, hit-type label on the story rows' column and gap (96 + 16 px; 72 + 12 px phone), uppercase in EN.

## Checks
`node --test tests/*.test.mjs` 108/108; `scripts/smoke.mjs` 15/15; `scripts/verify-a11y.mjs` pass (focus ring, names, forced colors).
Rendered contrast (script on screenshots, text hidden, p85 background): all new text >= 4.5:1 on desktop; `--dim` / `--faint` not
used for the figures that sit on pictures (`#9bb3ae` there).

## Left for others
- `app.js` `categoryName()` returns the data constant "EXPLORATION" in EN, so search rows read "17 chapters - CIVILIZATIONS -"; use the
  title-case `cat.*` i18n label there (the eyebrow already uppercases by CSS).
- GPU hint card (headless GPU-less runs) sits over the archive's top right; not touched.
