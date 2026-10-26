# Round 6 — "make it look and read nicer" (goal set 2026-10-25)

User goal: "Optimize for whatever you like to make it better, this is something I want to compete. Use your maximized insight and
design philosophy to make it look and read nicer." Pacing (user): idle when the 5-hour limit is at 95 % until it resets; stop when
the weekly limit reaches 95 %. Lightweight checks (user prefers agile, no heavy test sweeps): unit tests of what changed + a short
smoke run + before/after screenshots.

State at start: live v4.8.0; Archive CI fixed by recompiling public/stories (commit 1b047205; guide cleanup now embedded, deploys
with the next release). Untracked partial work: public/fonts/, scripts/fonts/ (self-hosted CJK subsets, agent stopped midway).

## Design assessment (live screenshots: verification/round6/look/)

Strong already: dark archival palette, gold accents, serif display type, archive scene, museum grid.
Priorities, by impact on reading:
1. Body typography — paragraph breaks were rendered as an empty line (`\n\n` → `<br><br>`), ragged Chinese lines, no
   punctuation compression, heavy 2 px rule above the text. → app.js paragraph() turns blank lines into `.pb` measured gaps;
   zh justified + strict line breaking + text-spacing-trim + hanging punctuation; en oldstyle numerals; hairline rule; palt
   in titles. (in progress)
2. Reader chrome — profile button takes a whole row (phone), spacing scale between eyebrow / title / subtitle / profile / text.
3. Effects panels — bordered chips everywhere; make them read as annotations (quiet labels, strong numbers).
4. Story map — tiny viewport, truncated captions, map vs reader titles, legend (docs/refine/round5/map-audit.md).
5. Fonts — finish self-hosted Noto Serif SC / Sans SC subsets (user-approved download) for consistent Chinese rendering.
6. Phone — museum exhibit background, category rail fade, map controls (docs/refine/round5/phone-audit.md).
7. Guide typography — long mixed blocks; search "Name" chips.

## Log
- 2026-10-25: assessment; typography step 1 started (src/app.js paragraph(), src/style.css .narrative / .pb / #reader-title).
- 2026-10-25: step 1 committed (a0e9b2f0): .pb paragraph gaps, zh justify + text-spacing-trim + hanging punctuation, palt titles, hairline rule, subtitle without placeholder fragments, calm effects chips (gold chance number), search hit-type labels aligned. Not released yet (RELEASE untouched).
- 2026-10-25: agents running: story-map redesign (docs/refine/round6/map.md), phone + reader chrome (phone.md), self-hosted CJK fonts (fonts.md). Next: review their screenshots critically, integrate, light checks, release v4.9.0, verify live; then guide typography, archive panel, museum detail polish.
- 2026-10-25: guide step committed (eab2c017): companion-essay typography, quiet links, link+punctuation glue (kinsoku). Light checks: node tests 103/103, smoke 15/15 (step 1). Waiting for map / phone / fonts agents; then integrate, review screenshots, release v4.9.0 (RELEASE entry), verify live (smoke). Usage at 2026-10-26 02:5x UTC: 5h 4 %, weekly 8 %.
- 2026-10-26: phone + reader chrome agent done (docs/refine/round6/phone.md; screenshots verification/round6/phone/): profile toggle on the subtitle line, museum exhibit history entries (museumLeave), rail fade, landscape reader/museum compaction, >= 12 px phone text; reviewed screenshots: good. Lead: museum other-language name as italic serif (was spaced monospace). Uncommitted (shares files with map/fonts agents) — commit together after they finish.
- 2026-10-26: fonts agent done (docs/refine/round6/fonts.md): 12 self-hosted subset woff2 (Serif 400/600, Sans 400/500 × 3 tiers, 2.54 MiB) in public/fonts, src/fonts.css linked before style.css, Google keeps Newsreader only; desktop requests 245 → 138, transfer 12.3–13.1 → 7.6–9.1 MB, phone-emu covers 15.8 → 10.4 s; real Noto weights now render (before: Google default instances Thin/ExtraLight + YaHei fallbacks). Lead: --mono gets Noto Sans SC. Before release run: venv python scripts/fonts/build-subsets.py --check (rebuild if new characters).
