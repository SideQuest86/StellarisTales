# Round 4 performance fixes (src/search.js, glyph-warmup.js, audio-player.js, museum.css)

Conditions: desktop Chrome 155 headless, ~170 Hz display, `scripts/serve.mjs --port 4195`, `node scripts/dev-sync.mjs`,
`REPS=3 TAG=before|after node scripts/bench/bench.mjs <scenario>`. Raw: `verification/round4/perf/*-chrome-{before,after}.json`.
No physical phone, no throttled-network re-run (mobile-emu cold not re-measured: see residual).

## 1. Search snippets (src/search.js, `enrich`)
Only the first 8 non-story rows fetch story/effects JSON at once; remaining rows of the page of 20 are enriched through an
IntersectionObserver (rootMargin 300px) as they approach the viewport (fallback: all at once without IO). Snippets, names
(`env.proseWith`) and navigation are unchanged.
- bench `search` firstQuery (bench query): requests 20 -> 11, bytes 356 KB -> 175 KB, results 158 -> 168 ms (noise).
  The audit's 34 files / 3.5 MB case is a broad query with ~34 distinct stories; it is now capped at ~8 story files up front.
- `verify-search.mjs` all ok; `node --test tests/*.test.mjs` 89/89.
- Trade-off: a bigram false-positive row (removed when its snippet is missing) beyond row 8 disappears only when scrolled to.

## 2. Cold-load contention (glyph-warmup.js, audio-player.js)
- New exports in glyph-warmup.js: `isConstrained()` (saveData, effectiveType != 4g, downlink < 5, or coarse pointer with
  short side <= 820 px) and `networkQuiet(quietMs, maxMs)` (page loaded and no new resource entry for quietMs; polls
  `performance.getEntriesByType('resource')` every 400 ms, no observer).
- `warmGlyphs(load)` API unchanged. Constrained: waits for network quiet (2.5 s, max 30 s), warms one face (400 19px serif) with
  the 600 most frequent glyphs and 2 font stacks instead of 4 faces x 900-3000 glyphs (~7.1 MB -> a few slices).
  Unconstrained desktops: behaviour identical to before (full warm-up, no glyph swaps).
- Audio autoplay: constrained -> not started until the first gesture (existing `armGesture`, play-cue animation);
  otherwise starts after `networkQuiet()` (>= 1.5 s with no new resource, <= 20 s) instead of immediately, so covers go first.
  `preload="none"` kept. On the fast desktop bench the track still buffers ~3.3 MB once the network is quiet (by design).
- Note: Playwright Chrome reports `downlink` 1.4-1.7 on this machine, so the benches run on the constrained path.
- Not re-measured: mobile-emu cold covers-ready time (audit: 50 s). Re-measure with `PROFILE=mobile HEADED=1 bench.mjs cold`.

## 3. Audio failure visible (audio-player.js)
`showFailure(msg)` writes `music.loadFailed` into the player's artist line (`role="alert"`, class `load-failed` on
`#music-player`) plus the toast; cleared on the next track select. `play()` rejection with `audio.error` or
NotSupportedError (blocked/404 mp3) now shows loadFailed instead of the misleading "Press play to start".

## 4. Museum list (museum.css)
Images already had `loading=lazy decoding=async`. Added `content-visibility:auto; contain-intrinsic-size:auto 136px auto 156px`
on `.museum-grid > li` with `padding:5px; margin:-5px` so hover lift and focus ring are not clipped by paint containment.
Markup, grid and arrow-key navigation (uses li widths) unchanged.
- openList long task 134 -> 62-66 ms, layout 119 -> 71-84 ms, max frame 147 -> 82-94 ms (3 runs each side: 134/147 before is the
  single `after`-tag run pre-change; audit 108-117 ms). requests 128 -> 118. List scroll max frame 17.6 -> 23-29 ms (content now laid out on demand).
- `verify-museum-viewer.mjs` 7/7.

## 5. Archive first frame
Skipped: `archive-scene.js:320-329` already calls `renderer.compileAsync` for scene and snapshot pass.

## Verification
`node --test tests/*.test.mjs` 89/89; verify-search ok; verify-museum-viewer 7/7; smoke.mjs 14 passed / 0 failed
(an earlier smoke "hang" was contention from stale concurrent smoke/probe runs on the shared server; re-run clean).

## Residual
Full unconstrained warm-up is still 7.1 MB of Google Fonts (third party); mobile covers-ready time not re-measured;
museum open still ~65 ms long task (innerHTML of 258 nodes); no fixed 120 ms search debounce change (app.js, lead's file).
