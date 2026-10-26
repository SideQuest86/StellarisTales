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
