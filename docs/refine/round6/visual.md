# Round 6 - visual / CSS pass (B), 2026-10-25

Scope: critique items 1, 4, 5, 8, 9, 11-15, 18-20, 22 (CSS / markup parts). Files: `src/style.css`, `src/museum.css`,
`src/effects-panel.css`, `src/reader-extras.css`, `src/gpu.js`, `index.html`. Shots: `verification/round6/visual/{before,after}-*.jpg`.

## Done
- **1 Museum overflow**: `#museum{grid-template-columns:minmax(0,1fr)}`. Measured 360/390/414 px, zh + en: head / grid = viewport width,
  close x at 300-344 / 330-374 / 354-398, 3 columns, no horizontal scroll (also smoke "phone 390 overflow 0/0/0").
- **9 Museum**: 3D note `text-wrap:balance` (no "定。" orphan); the two filter rows share one left edge via a grid beside the search
  field (>= 1000 px, >= 1400 px with an exhibit open; narrower rooms keep the old wrap); 14 px fade mask on the grid.
- **4 Lede**: `<p class="lede" data-i18n="site.description">` above the eyebrow (existing key, no new wording; 13 px `--dim`). Hidden for
  returning readers (inline script in index.html sets `html.st-returning` from `st-seen`), its line reserved until the first story is
  shown (no shift). While loading: the open row is dimmed (`:has(#chapter-count:empty)`), no dangling "." after the category.
- **5 GPU notice**: after 6 s (longer while hovered / focused / open) it fades to a 28 px "i" chip (title = the notice title); click
  reopens it and keeps it open; x / Escape still dismiss for good; first collapse stores `st-gpu-hint=chip` so later visits start as the chip.
- **8 Foot panels**: `.fx`, `.story-summary` and `details.review-note` share one box (1 px `--line`, square, wash, 48 px summary, 18 px inset)
  and one drawn chevron (also `.gpu-hint`, `.museum-sources`, `.md-review`; the profile toggle's chevron points down). Review notes keep a
  teal edge + teal label. Radii are now 0 / 2 px / 50 % (was 0, 2, 3, 4, 6, 10, 999, 50 %); only the map-key swatch `.sw.ref` keeps 6 px
  (mirrors a drawn node).
- **11 Player**: caret drawn in CSS (`.caret` in index.html), 7 px after the title at 1440 / 1920 / 390 px; flips when the list is open.
- **12 Loading**: cover slot is `#0f2328` with no broken-image icon / alt text (`img:not([src])` content swap); open row dimmed.
- **13 Toolbar**: 中文 / EN right-aligned, text ends exactly on the column rule (1356 = 1356); hit area via `::before`, own box >= 24 px.
- **14/15/19/20/22**: EN eyebrow upper case (`.chapter-eyebrow`, review label); `text-autospace` + `text-spacing-trim` on `:root`; short-laptop
  excerpt clamp 2 (min-height 3.7em / 3.2em en); lone "Story map" link hidden (toolbar has it); og:/twitter meta (title, existing description, soundtrack cover).
- **10/18 CSS parts**: card map edges fade (mask; off while the viewport has focus-visible); `.flow-stats` hidden at height <= 520;
  guide link underline `#c9b07a33`.

## Checks (light)
`node --test tests/*.test.mjs` 125/125; `scripts/smoke.mjs` 15/15; `scripts/verify-a11y.mjs` all pass (first run caught `#reader-language`
< 24 px wide: fixed with `min-width:24px`); DOM probes for museum widths, GPU chip cycle, lede, caret, toolbar; no page errors.
`build-subsets.py --check` reports 3 glyphs missing from the subsets (`À 〈 ヿ`): not from this pass (no new Chinese here), rebuild before release.

## Not done (other owners / larger)
- JS text parts: 2 (reviewer-note markup, now done by A), 6, 7, 16 glue spaces, 17 search dot, 18 "1 chapters", 21 map caption size, 22 naming drift.
- 11 icon sprite for the player / museum / search glyphs (needs audio-player.js, app.js); phone title on two lines (strip is 84 px).
- Reviewer-note CSS expects `details.review-note > summary + p` (also styles `aside.review-note > small + p`).
