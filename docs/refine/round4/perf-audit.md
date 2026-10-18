# Round 4 performance audit (measure only, 2026-10-18)

Everything here is **desktop Chrome 155 / Edge, headed on the left monitor**; "mobile" is **emulation only** (390x844, DPR3,
CDP 4x CPU throttle, 150 ms RTT, 1.6 Mbit/s). No physical phone was measured. Server = `scripts/serve.mjs` (no gzip/brotli), so
transfer bytes are **raw**; JS/JSON/font sizes on a compressing host will be 3-4x smaller for JS/JSON (woff2/webp/mp3 do not shrink).
Caveat: the rAF cadence on this machine is **5.9 ms (~170 Hz), not 60 Hz**, so a "17.6 ms" frame is 3 missed refreshes (at 60 Hz it
would be ~1 dropped frame). Frame numbers are comparable between runs, not to the 60 Hz figures in HANDOFF.md. Raw data:
`verification/round4/perf/*.json`. Harness: `scripts/bench/bench.mjs`, `scripts/bench/requests.mjs`.

## Ranked bottlenecks (by user impact)

1. **CJK web fonts dominate first load: 7.1 MB, 111 requests (desktop and mobile).** 85 Noto Serif SC + 26 Noto Sans SC unicode-range
   slices from fonts.googleapis/gstatic, forced by the glyph warm-up (3000+3000+900+900 chars across 4 faces, all requested at once).
   Cold desktop total 15.7-17.4 MB / 237 requests, of which fonts 44%. Emulated mobile: 11.5 MB / 200 req, **button visible 2.1 s,
   but 30 covers ready only after 50 s** (everything queues behind fonts + audio on 1.6 Mbit/s). Third-party dependency, no
   self-hosting. Suspects: `index.html:27` (Google Fonts CSS, 125 KB), `src/glyph-warmup.js:7-12,42-50` (FACES/count, `document.fonts.load`
   for all slices at once), `src/app.js:1344` (`warmGlyphs(json)` starts regardless of connection speed; only skips `saveData`/2g).
   Fix: skip or cap warm-up on cellular/`downlink<5`/DPR>=3 mobile (warm only the first ~600 chars), start it after the first story
   is requested rather than at idle, self-host a single subset of the 3500 most frequent glyphs, lower priority behind covers.
   Re-measure: `node scripts/bench/bench.mjs cold` (env PROFILE=mobile HEADED=1) and `node scripts/bench/requests.mjs 6000 out.json`.
2. **Audio starts loading on entry without a gesture: 3.6-4.8 MB (97 s buffered) of track 2 during the cold load**
   (`audio-player.js:165-170` autoplay -> `:204` `audio.src` -> `play()`; `<audio preload="none">` does not help because play() is
   called). It competes with covers/fonts on slow links (mobile: 193-212 KB of mp3 already in-flight at the 50 s mark). Only one
   track loaded (others are Range requests, `preload=none` honoured; next track +3.1 MB only after pressing next). Full album is
   385 MB, never fetched eagerly. Fix: arm autoplay only after the first gesture or after covers are ready (`coversReady`), and
   `audio.preload="metadata"` after that. Re-measure: `node scripts/bench/bench.mjs audio`.
3. **First-run frame spikes in a fresh session: 65-110 ms typical, one 290-440 ms outlier per session** (cold desktop max
   306/65/94 ms; DPR2 288/82/88; Edge 318/71/65; mobile-emu 441/288 ms with 5-7 long tasks, longest 346 ms). The worst LoAF is
   `FrameRequestCallback` 265 ms right after `Response.json.then app.js` (first scene frame: shader/pipeline compile + atlas upload,
   `archive-scene.js` tick) and a forced layout of 29-31 ms in an `IdleRequestCallback` (`app.js` idle warm path ~`:895`). Cold-load
   main-thread task time is 2.1-2.4 s on desktop, of which **layout 1.14-1.65 s** (the glyph warm-up hidden `host` div,
   `glyph-warmup.js:30-37` + chunk loop; spread over idle slices so frames stay fine, but costs CPU/battery). Mobile-emu: 11-15 s
   task time, layout 2.7-3.1 s. Fix: pre-compile shaders (`renderer.compileAsync`) before the first visible frame; cut warm-up
   volume on slow CPUs (use `navigator.hardwareConcurrency<=4` / measured `sampleMs`).
4. **Museum open and first model.** Opening the list: 258 `.museum-exhibit` buttons with 258 `<img>` created at once = 126 requests,
   1.6 MB, a **108-117 ms long task** (`museum.js` `Response.json.then` -> render(), 98 ms forced layout; `museum.js:40,126`),
   max frame 115-118 ms; later list scroll max 23 ms (fine). First 3D model: 77-88 ms frame + 230 ms to show, 0.93 MB, 10 requests
   (three/viewer module import `museum.js:203`); later models 76-94 ms to show, 0.5-1.1 MB each (p50 0.77 MB, glb raw),
   max frame 11.8-17.7 ms. Fix: render the grid in chunks / `content-visibility:auto` on `.museum-exhibit`, `loading="lazy"` already
   applies to specimen links but not the grid; use `modulepreload`-on-hover for `museum-viewer.js`. Re-measure: `bench.mjs museum`.
5. **Search first query pulls ~3.5 MB / 37 requests for ~20 results** (one 142 KB shard + **34 whole story JSON files**, 3.48 MB,
   fetched only to build snippets: `search.js:425,437,440`; plus `effects/<id>.json`). 171-221 ms to results desktop (headless 221 ms),
   max frame 29 ms. Opening the dialog alone costs 21 requests / 0.55 MB (titles, meta, `app.js:1065` preload) and a 23.5 ms frame.
   Typing: handler 0.1 ms, but **results appear 129 ms p50 / 165 ms max after each keystroke** because of the fixed 120 ms
   debounce at `app.js:1076` (`setTimeout(renderSearch,120)`); no jank. Fix: store 1-2 snippet lines in the shard / titles file
   (or fetch only the top 5 stories lazily), shrink debounce to ~50 ms when shards are cached. Re-measure: `bench.mjs search`.
6. **Story open.** First open of a session: max frame 53/41/24 ms (Chrome, 3 reps; Edge 106/47/18), LoAF 56 ms with
   `Response.json.then app.js` 35 ms (31.8 ms forced layout), 32 requests / 530 KB (28 webp). Opening a second never-seen story:
   74 requests / 1.47 MB, max 29.5 ms (names.json 397 KB + excerpts 753 KB + story + effects JSON; `app.js:93,1305`). Long chapter
   (The Shroud utopia.3200): 59/24/29 ms, 56 ms long task, 1.79 MB first time (217 KB story + 268 KB effects). Chapter change 6-12 ms
   (Edge 17.6 once), back 6-12 ms, map drag+wheel max 6-12 ms (excellent), archive key navigation 6.5 ms, close story 12-35 ms (once
   35 ms). Heap 12.4 MB after the full session. Fix: lazy `names.json`/`excerpts.json` (753 KB and 397 KB raw) behind first need and
   `fetchPriority="low"` after covers; code-split the first-open layout (forced layout in the json `then`).
7. **Initial JS weight**: `vendor/three.core.js` 1.42 MB + `three.module.js` 0.64 MB (2.06 MB raw, 21 scripts 2.33 MB total) are
   modulepreloaded (`index.html:36-39`) for the WebGL scene; on mobile-emu the page needs 2.1 s for the button. Fix: serve compressed
   (gh-pages gzip ~3.5x), tree-shake three (import only used classes via a bundler/importmap with `three/src`), keep modulepreload.

## What is fine (numbers)

- **Idle archive visible, 30 s**: 5.1 rAF/s, 2.6 timers/s, **~16 ms CPU task per second (1.6%)** desktop (Chrome 17, Edge 15.4); mobile-emu
  (4x throttle) 2.1 rAF/s, 68-77 ms/s (7%). The scene breathes at a low idle rate; `archive-scene.js:744-954` (breathing/idle cap) - could
  go to 0 after ~10 s without input to save battery on phones.
- **Tab in background, 30 s**: 0 rAF/s, 0 timers/s, 1.7 ms/s (0.17%) CPU, archive frames drawn unchanged (`archive-scene.js:815` halts on
  `visibilitychange`; Playwright kept `document.hidden=false` but Chrome throttled rAF, so this is the browser's background throttle;
  re-verify with a real minimised window).
- **Museum leak check**: ten models then close: geometries 3 / textures 4 / 3 cached models (the by-design LRU of 3, `museum-viewer.js:15`),
  second pass of ten more: still 3 / 4 / 3, JS heap 10.5 -> 10.6 MB after GC (baseline 7.4 MB). **No growth.** After close the viewer's
  renderer and 3 cached models stay resident (about 3.2 MB heap + their GPU buffers); rAF after close = 0/s, timers 0/s.
  Fix (optional): `disposeViewer()` could release the cache when the museum closes. Re-measure: `bench.mjs museum`.
- **Image decode** during cold desktop: 118-177 ms total for 88 webp (Chrome trace, "Decode Image"); mobile-emu 52-59 ms for 52 images
  because covers had not finished; cover atlas 16 MB texture memory (hi 29 / lo 87 entries, `atlas.bytes` 16777216) - fixed cost.
  Textures 3, geometries 5 in the scene (renderer.info).
- **Chrome vs Edge**: same engine, within noise: cold covers ready Chrome 699/428/494 ms vs Edge 805/422/416; story/museum maxima
  identical (museum open 118 vs 112 ms); Edge has one extra 106 ms first story open and 17.6 ms chapter change (n=3).
  Idle identical (15-17 ms/s). No Edge-specific problem found.
- **Heap**: JS heap 8.5-12.4 MB everywhere (nodes 841 cold, 4047 museum list, 1775 reader). No growth across 3 story cycles.

## Cold-entry summary table (Chrome, headed, n=3 desktop/DPR2, n=2 mobile-emu)

| profile | button visible | 30 covers ready | FCP | transfer | requests | worst frame | layout ms |
|---|---|---|---|---|---|---|---|
| desktop 1600x900 DPR1 | 145-269 ms | 428-699 ms | 108-160 ms | 15.7-17.0 MB | 237 | 65-306 ms | 1.44 s |
| desktop DPR2 | 161-490 ms | 474-662 ms | 128-140 ms | 15.0-16.8 MB | 237 | 82-288 ms | 1.43-1.65 s |
| mobile EMU 390x844 DPR3, 4x CPU, slow net | 2.1 s | **50.3 s** | 2.0 s | 11.5 MB | 200 | 288-441 ms | 2.7-3.1 s |

## Re-measure commands (from project root; serve `node scripts/serve.mjs --port 4192` first)

```
set STELLARIS_PLAYWRIGHT_PATH=C:/Users/wangp/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs
set STELLARIS_PREVIEW_URL=http://127.0.0.1:4192/   & set HEADED=1   & set REPS=3     (BROWSER=msedge, PROFILE=desktop|dpr2|mobile, TAG=x optional)
node scripts/bench/bench.mjs cold | story | search | museum | audio | idle      (or "all")
node scripts/bench/requests.mjs 6000 verification/round4/perf/cold-requests.json   (per-request list, largest first)
```
Existing: `scripts/verify-frame-spikes.mjs` (LoAF cold/warm), `scripts/verify-gpu.mjs`. Not measured: real touch phone, real low-end GPU,
GPU process memory (only `renderer.info`), compressed-transfer sizes (local server sends raw), the real minimised-window hidden state.
