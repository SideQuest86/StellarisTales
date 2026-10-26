# Round 6 — story map (剧情图 / Story map)

Brief: docs/refine/round6/PLAN.md item 4, evidence docs/refine/round5/map-audit.md. Shots: `verification/round6/map/{before,after}/`
(1440x900, zh and en, six maps: event-colony-9200, event-federations3-2200, event-arkship-65, cetana, the-shroud, archaeology-incidents),
frame times `perf-before.json` / `perf-after.json`. Files: `src/flow-surface.js`, `src/flow-tree.js`, map block of `src/style.css`,
`map.*` keys in `src/i18n.js`, `tests/flow-tree.test.mjs`. `src/app.js` is untouched (no hook needed).

## 1. Expanded view (done)
- "⤢ Expand" (now with a word) opens the map as a dialog over the reader: `role="dialog" aria-modal`, backdrop + panel, viewport
  666x198 (card) / 666x424 (old expand) -> **1352x668** at 1440x900, nearly the whole window above the player bar. `body.map-overlay`
  lifts `#reader` over the masthead while open.
- Escape closes only the map (capture handler; a second Escape closes the reader), x button, click on the dimmed margin; focus goes to
  the viewport and back to Expand; Tab / Shift+Tab cycle inside; closes by itself when the reader closes; picking a chapter closes it and
  opens the chapter. Fade/rise animation is off under `prefers-reduced-motion` and the in-app "reduce motion" switch.
- ZOOM_MIN 0.3 -> 0.18 on the card, **0.03 in the dialog**; below 0.36 the map is drawn as boxes (no text, stroke widths stepped by `--u`,
  gold dashed ring on the current page, state colours) and the footer line names the hovered node. The-shroud unfolded (28,214 px wide, 312
  nodes) fits at 5%. Fit/overview button and key `0` toggle overview <-> current page; on the card, an overview that cannot fit opens the dialog.
- In the dialog a mouse-wheel notch zooms (trackpad two-axis scroll still pans, Ctrl/pinch zooms); hint line in the footer.

## 2. Readable nodes (done)
- Doc box 208 px, height from the text: caption up to **2 lines** (chance moved to a mono badge at the right), title up to 2, optional
  subtitle. Latin breaks at spaces (no mid-word), CJK line-break rules (no closing punctuation at line start). Delay text is dropped
  from the caption only when it would be cut ("aft..."); it stays in the accessible name and the footer line.
- **Title = curated label, subtitle (italic) = the reader's heading** when they differ, are not contained in each other, and the
  heading is not shared by 3+ chapters. Evidence (1020 labelled chapters, 161 stories): 62% share their heading with another chapter of
  the same story, 2.7% share their label ("被赐予恩赐" x8, "触发激光网" x4 in the-shroud / archaeology-incidents), so headings alone cannot tell
  boxes apart; the subtitle gives the match to the reader's H1 and the "continue" cards. Current page also in the footer line.
- Repeats: sibling link sets with the same pages merge into one with a case count and chance ranges (event-arkship-65: 27 -> 7 nodes,
  "x21", 10-100%); rows repeated inside a set become one (x3); a one-row set becomes a plain link; 3+ siblings sharing the same
  "how you get here" text hang under one caption pill "text xN" (44 in the corpus); the same line on top-level / group children is dropped.
  Link-set rows lose a prefix common to all rows ("Ecumenical Council: "). Corpus check, 1388 stories: no chapter and no link lost,
  nodes 12,208 -> 12,117, merged sets 60 (5 stories). Ref pills wrap the title to 2 lines.

## 3. States and legend (done)
- No more transparency for "unread": dashed outline, hollow-ish bar and lighter title weight. Contrast on the box: title 9.4:1,
  caption 6.7:1, subtitle 6.4:1 (was ~3:1); read 12.4 / 7.2; current 11.8; outline 3.2 (non-text).
- Legend: states (current, route, read, **not read yet**, link) always; symbols ◇ ⚄ ◈ ∥ ↻ ◆ +N ≈% in the dialog footer and in a "?" panel on
  the card and on phones (key `?`), 2 columns.

## 4. Overflow and placeholders (done)
- `+N more` row is fitted into the box (4 overflowing instances in federations3-2200 en -> 0). Unfolded maps of 14 stories x zh/en:
  0 overlapping boxes, 0 text outside its box.
- "满足条件时 / if conditions are met" and "随后 / Later" removed. A condition shows only real names from `via.when` ("若极端平等主义"); nothing
  when no atom has a name. ("其他条件" on the reader cards lives in reading.js, not touched.)

## Performance (headless, no GPU, 1440x900, 3 maps unfolded in the dialog: the-shroud 312/422 nodes, cetana 151, origin_unplugged 112)
rAF p50 5.9 ms in idle, drag, Ctrl+wheel, wheel pan and button zoom, 0 frames over 33 ms, before and after. Opening a story: one long task of
~52 ms before, 51-63 ms after (origin_broken_shackles, 89 nodes visible: text is fitted at layout now, +12 ms); progressive fill kept.

## Open / not done
- Legacy `story-map.js` list is unused (all stories have a tree); left as is. The reader's continue cards still repeat identical targets
  (event-arkship-65): they are built in app.js. Fold toggle still re-renders the whole map. No real-phone measurement.
- i18n: new keys `map.expandShort, keyChoice, keyReturn, keyEnding, keyFold, keyChance, help, hint, reading, overview, cases, ifCond,
  notCond, and, or`; changed `map.fit, viewport, keyOther, keyRef`; removed `map.condition, map.later`.
