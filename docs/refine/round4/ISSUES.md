# Round 4 — ranked issue list (2026-10-18)

Built from four audits of v4.6.4 (each with evidence and re-measure commands):
[wording-audit.md](wording-audit.md), [perf-audit.md](perf-audit.md), [interaction-audit.md](interaction-audit.md),
[design-ideas.md](design-ideas.md). Ranked by user impact; correctness and disruptive UX/performance first, polish last.
Owner = the file owner for the fix (lead = central integration).

| # | Issue | Evidence | Kind | Owner |
| --- | --- | --- | --- | --- |
| 1 | Slow connections: covers ready only after ~50 s (emulated phone), cold load 15.7–17 MB / 237 requests — 7.1 MB CJK font slices from the glyph warm-up + 3.6–4.8 MB of audio before any gesture | perf #1, #2 | perf | perf agent (glyph-warmup.js, audio-player.js) |
| 2 | English effect lines lose the resource name (bare "+40", " (scaled by the game)") | wording #1, 4,646 entries | bug | wording agent (effects compiler) |
| 3 | Closing during a slow story download is ignored; the reader opens anyway | interaction D1 | bug | lead (app.js) |
| 4 | Landscape phone (844×390): the "open story" row is covered by the category arrows | interaction D2 | bug | lead (style.css) |
| 5 | Search first query downloads ~34 whole stories (3.5 MB) to build snippets | perf #5 | perf | perf agent (search.js) |
| 6 | Browser/Android Back leaves the site while a story is open | interaction D3 | UX | lead (app.js) |
| 7 | Specimen links close the reader; "given by" reopens the story at its first chapter (place lost) | design #1 | UX | lead (app.js) + museum.js |
| 8 | Effects panels: stock condition phrase ×15,993, "If: if" ×4,069, weights repeated ×6,653, default target "On: the owning empire" ×16,049, note in every panel | wording #2–#4, #12–#14 | wording | wording agent |
| 9 | Museum list opening: 108–117 ms long task (258 tiles + images at once) | perf #4 | perf | perf agent (museum.js) |
| 10 | Audio failure shows no visible error; network failures toast raw "Failed to fetch" | interaction D4, D5 | bug | perf agent (audio) / lead (app.js) |
| 11 | Guide shows editor review notes inline in 1,388 guides | wording #7 | wording | wording agent (markdown.js) |
| 12 | Search rows: "Title" chip on every row, "1 docs", unit drift (docs/documents/pages/chapters), pager on empty results | wording #5, #6, #19 | wording | lead (app.js) + search.js |
| 13 | Reader chrome on every page: "No empire set" bar, disabled Back + "Opening" eyebrow, "Continue reading →" caption | wording #8–#10 | wording | lead (app.js) |
| 14 | First archive frame of a fresh session 265 ms (shader compile) | perf #3 | perf | perf agent (archive-scene.js), if cheap |
| 15 | Museum: "3D" badge + filter on 258/258, 40-word note on every exhibit, script vocabulary in acquisition labels | wording #15–#17 | wording | after perf agent (museum.js) |
| 16 | End of a route is a dead end (526 endings) | design #2 | creative | lead |
| 17 | Keyboard: number keys for choices | design #3 | creative | lead |

Fine as measured (no action): chapter change / back / map drag 6–12 ms; museum viewer memory flat across 20 models;
background tab 0 rAF/s; storage failures, image/GLB/font failures recover; reduced motion; Chrome ≈ Edge.

Not testable here: physical phones (all mobile numbers are emulation), a real low-end GPU, compressed transfer sizes on the
local server (GitHub Pages compresses JS/JSON), a truly minimised window, real touch pinch.

## Follow-up after v4.7.0 (2026-10-18)

Re-test of the released build: [interaction-retest.md](interaction-retest.md) (D1–D4 confirmed fixed; Back/Forward,
museum return, profile changes mid-reading, branching backtrack across a reload all correct). Outcomes:

| Item | Finding | Resolution |
| --- | --- | --- |
| R1 "DOM leak" (+~370 nodes, +1 listener per open/close) | Heap snapshot: the detached `chapter-document` articles are retained only by "(Global handles) / DevTools console" — the ElementHandles that Playwright's `waitForSelector` returns. With `locator().waitFor()` (no handles) 12 open/close cycles leave no detached articles and listeners go 134 → 135. | Probe artefact, not a page leak; no change. Probes should use `locator().waitFor()` for leak counts. |
| R2 museum data failure toasts "Failed to fetch" | `app.js` appended the browser's English message | Localised message only (`app.js` showMuseum) |
| R3 player never recovers after `playlist.json` fails | playlist fetched once at boot | Pressing play retries the playlist (`app.js` startSoundtrack); checked: blocked → retry → plays one stream |
| Opening regression from continue-card pictures | Same-session A/B against v4.6.4 (headed Chrome, 170 Hz, 3 reps × 2): first opening max 100/124 vs 88/82 ms, opening another story 59/59 vs 35/41 ms — full-size event art decoded on the opening frames | Pictures get their source after the text and map settle (idle, 1.1 s after an opening / 0.35 s after a chapter change). Re-run: first opening 82/71 vs 100/77 ms, another story 35/35 vs 47/35, chapter change 18/12 vs 24/18 (`verification/round4/perf/story-chrome-ab-*.json`) |
| Ending dead end (design #2, simplified) | 526 endings stopped the reading | An ending offers the next story of its archive row (with its cover); smoke check added |