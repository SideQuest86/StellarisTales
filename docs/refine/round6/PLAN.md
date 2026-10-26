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
- 2026-10-26: v4.9.0 released (654a79dc) and verified live (smoke 15/15). Next candidates: second design review of live screenshots (archive selection panel, desktop reader card composition, museum list/exhibit typography, search dialog, ending), continue cards repeating identical targets (event-arkship-65), reading.js 'other conditions' placeholder on cards, Newsreader self-hosting (needs user approval for download).
- 2026-10-26: second design pass launched as two agents: archive/museum/search (docs/refine/round6/archive.md, verification/round6/archive/) and reader journey incl. continue-card dedupe + 'other conditions' placeholder + desktop left-card composition (reader.md, verification/round6/reader/). After they finish: review screenshots, font --check, light checks, release v4.10.0, verify live. Usage 2026-10-26 ~04:00 UTC: 5h 22 %, weekly 10 %.
- 2026-10-26: archive/museum/search pass done (archive.md; screenshots verification/round6/archive/after-*.jpg reviewed: selection panel ledger with one measure, museum plaque header + text-tab filters + effects table, top-anchored search with focus cue). Lead: categoryName() uses the i18n cat.* labels (no hard-coded EN capitals). Uncommitted; waiting for the reader-journey agent.
- 2026-10-26: v4.10.0 released (378d14b5) and verified live (smoke 15/15). Lead tweak: centred ending note uses text-wrap: balance.
- 2026-10-26 ~04:40 UTC: usage 5h 32 %, weekly 11 %. Next: fresh-eyes design critique of live v4.10.0 (docs/refine/round6/critique.md, verification/round6/critique/) → implement the top findings in disjoint-file agents → review screenshots → release v4.11.0 → verify live. Ideas not yet done: typographic placeholder art for the 58 stories without pictures (reader card shows a blank WebGL panel), Newsreader self-hosting (needs the user's download approval), opening/chapter transition polish.
- 2026-10-26: critique done (docs/refine/round6/critique.md, 22 ranked fixes). Implementation split: A text rendering/typesetting (app.js prose/typeset for en quotes-dashes-ellipses without changing words, '-' warning lines set as own line, reviewer note collapsed, search '·', map '1 chapters', map caption slicing); B visual consistency (museum phone overflow, orphans, toolbar alignment, disclosure glyphs, player caret, GPU notice chip, newcomer lede, album placeholder, short-laptop excerpt, radii); C archive-scene placeholder art for stories without pictures + page language. Then review screenshots, light checks, release v4.11.0.
- 2026-10-26: visual pass B done (visual.md; reviewed after-archive-1440-zh-t2: lede above eyebrow, caret by title). Note: fonts --check fails on 3 glyphs (À 〈 ヿ) — rebuild subsets (venv python scripts/fonts/build-subsets.py) before release. verify-gpu may meet the GPU chip after 6 s. Waiting for text (A) and placeholder (C) agents.
- 2026-10-26: text pass A done (text.md: src/typeset.js display-time typesetting, words unchanged over 188k strings; review-note details; lead lines; search '·'; map.stats1; caption word boundaries; guide link spaces). Lead: verify-refine-reader uses #chapter-toggle on phones (foot link hidden by design); .flow-stats hidden at max-height 520px. Waiting for placeholder agent (C).
