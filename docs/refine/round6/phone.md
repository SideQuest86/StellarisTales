# Round 6 — phone and reader chrome (2026-10-25)

Scope: reader top, phone audit P1/P2/P3 (docs/refine/round5/phone-audit.md), landscape phone. Music autoplay untouched.
Shots: `verification/round6/phone/<WxH>-<archive|reader-top|reader-body|museum-list|museum-exhibit>-<before|after>.jpg`
(390x844, 360x740, 844x390, 1440x900; extras 667x375, 768x1024, EN, chapter 2, profile open). Re-run: `capture.mjs`, `extra.mjs`.

## Reader top (src/app.js profileSummary, src/style.css)
- The "Empire profile" toggle no longer owns a row: `.reader-meta` puts the other-language subtitle on the left and the
  toggle (quiet gold text + chevron, 44 px hit area via `::before`, `aria-controls` on the panel) on the right.
  Chips ("Reading as … Reset") stay in `.reading-context`, shown only with an active profile. Desktop uses the same markup.
- Phone: spacing tightened (art 12, title 10/4, rule 12/14); the text starts about 45 px higher. Text scrolling under the
  sticky toolbar fades out (14 px gradient below the hairline).

## Audit items
- P1.1 exhibit detail on phones: solid `var(--bg)` (museum.css). P1.2 history: a tap pushes `#museum=<key>`
  (state.museumDetail); Back closes the exhibit, then the museum; Forward reopens. ×, Escape and filters step back over
  the entry (`closeExhibit`), switching exhibits replaces it, closing the museum with an exhibit open steps back first
  (`museumLeave` in app.js, like `steppingBack`). Exhibits arriving by address only rewrite it to `#museum`.
- P1.3 rail: end-fade masks (`.fade-start/.fade-end`, set by `railEdges`) and the active tab scrolls to the middle.
- P2.8 targets: playlist × 44x44; seek hit box 32 px (thumb unchanged), time labels 12 px; title toggle 40 px;
  GPU hint × keeps 32 px with a 44 px hit area, summary 32 px. P3.13: phone "Reduce motion" is "Less motion" / "Motion off"
  on one line (the static i18n text also reset the label after a language switch; `applyMotion` now runs in `renderChrome`).
- P3.12 type: artist, time labels, playlist numbers, museum names (14), GPU adapter/code, profile labels, condition tags ≥ 12 px.
- Museum filters (P2.10): search on its own line, each chip group one sideways row with an edge fade (list starts ~230 px higher);
  3 columns at 360.

## Landscape (max-height 520)
- 844x390: masthead 56, player 48 (one line, artist hidden), reader masthead hidden, toolbar 40, title 24, text 18; reader text
  area 206 -> ~300 px. Museum: head/search/chips become two slim lines, grid shows a full row.
- 667x375 (phone layout in landscape): banner hidden, player 52 px with the slider inline.

## Checks
`node --test tests/*.test.mjs` 108 pass; smoke 15/15; verify-round5, verify-reader-v4 (profile markup), verify-museum,
verify-a11y pass; ad-hoc history check (phone + desktop: Back/Forward/×/Esc/filter/close-museum, no stray entries) passes.

## Not done / notes
- GPU hint still appears on every cold phone load (auto-collapse needs gpu.js); archive swipe mapping, flow-map controls
  (flow rules belong to the map pass).
- Tablet 768x1024 reader: the map card overlaps the text column edge (pre-existing, flow-surface geometry).
