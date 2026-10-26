# Round 6 - typographic placeholder for stories without an event picture (critique #3)

Files: `src/cover-atlas.js` (slate module + atlas hooks), `src/archive-scene.js` (cover cache, reader face, language). Not committed.

**Design.** 59 of 1,388 stories have no picture. They now show a typographic slate on the archive's own panel: dark ground washed with the
lane tint, faint ledger rules, a gold hairline frame with corner brackets, the category as a small gold tracked kicker (Noto Sans SC 500),
a gold rule with a diamond, and the title in serif 600 (Newsreader in EN, Noto Serif SC in ZH, 30 px down to 17 px, balanced over 2-3 lines,
" / " titles on two lines, game placeholders `[X.GetName]` elided to "…"). No imagery. One drawing routine (`drawSlate`, 448x150 design grid)
serves the 448x150 and 128x43 atlas tiles and the 987x329 band of the reader's card; hairlines stay 1 target px, rules/corners drop out of
the small tile. Reader: the live `#reader-title` text is used (names filled, same words as the H1), the data title is the fallback.

**Language.** Slate key is `title:<id>:<lang>`; a `lang` MutationObserver wakes the scene, so closed cards and the selected card re-ask the atlas
(new tiles in ~1 frame, measured 150 ms after the click). The reader face redraws in place (existing same-doc path, now waiting for fonts).
**Fonts.** Canvas text waits for `document.fonts.load` of exactly the faces and glyph tiers it needs (2.5 s cap); EN uses Newsreader once
loaded, else the self-hosted Noto Serif SC, and a `loadingdone` listener re-sets already drawn EN slates when Newsreader arrives late
(tested with Google Fonts delayed 3-6 s: 16/16 slates re-set; blocked: Noto stand-in stays). No Georgia/system fallback is ever drawn.

**Cost.** Draw 0.15-0.3 ms per slate (contact sheet of all 59: 88 ms including font waits). Slates are not cached (redrawn per tier, freed after the
blit), so the bitmap cache holds only pictures; atlas stays 16 MiB, no new GPU resources; `cover()` is a WeakMap lookup per card per frame
(no allocation). bench.mjs cold (desktop, 2 reps) before -> after: covers ready 451/369 -> 477/323 ms, max frame 53/53 -> 29/53 ms, LoAF max
82/81 -> 87/76 ms, woff2 files 9 / 2.58 MB unchanged (no extra font download on the zh opening); bench story steps same or lower (noise).
Tests: `node --test tests/*.test.mjs` 125/125, smoke 15/15, verify-gpu: all render/idle/hidden checks ok, 3 "run completed" fail on
`locator.click` of the GPU notice (another agent's new collapsed chip; unrelated). Shots and sheets: `verification/round6/placeholder/`
(`before-*`, `after-*` archive + reader zh/en, `crop-after-*-dpr2`, `sheet-en/zh`, `late-2-newsreader`, `bench/`).

**Not in my files (for the other owners).** The scene toggles `.no-art` on `#flow-surface` while a slate is shown: hide the "Event image" pill
(`[data-flow-image]`, `flow-surface.js setImage`) with `#flow-surface.no-art [data-flow-image]{display:none}`. The archive card/panel slate uses
the data title ("Victory against the …") while the H1 says "Victory against the other empire" (8 stories): app.js could pass its `prose()` title
to the scene. Face canvas stays 1024x752: at DPR 2 it is magnified 1.3x like every picture (text still reads crisp, see DPR2 crops).
