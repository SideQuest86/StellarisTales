# Round 4 — final benchmark matrix on v4.7.3 (2026-10-18)

Same machine and harness as the audit ([perf-audit.md](perf-audit.md)): `scripts/bench/bench.mjs all` per profile, headed, 2 reps,
local server (no compression, so JS/JSON bytes are raw), display ~170 Hz (frame figures are comparable between runs, not to
60 Hz numbers). Profiles: `desktop` 1600×900 DPR 1, `dpr2` 1600×900 DPR 2, `mobile` = **emulation** 390×844 DPR 3,
4× CPU throttle, ~1.6 Mbit/s for cold entry (no physical phone). `PROFILE` applies to cold entry; `-scn-` files ran
story / search / museum / audio under that profile with `SCENARIO_PROFILE` (new). Engines: Chrome 155 and Edge
(Chromium). Re-create the table: `node scripts/bench/summary.mjs verification/round4/perf final`.

## Against the audit baseline (v4.6.4)

| | audit (v4.6.4) | final (v4.7.3) |
| --- | --- | --- |
| Cold entry, emulated phone: covers ready / transfer / requests | 50.3 s / 11.5 MB / 200 | **27.0 s / 6.3 MB / 139–141** |
| Cold entry, desktop DPR 1 / DPR 2 / Edge: covers ready | 428–699 / 474–662 / 416–805 ms | 521–697 / 478–597 / 445–601 ms (unchanged by design) |
| First archive frame (same-session A/B, cold-chrome-frame-*.json) | 282 ms first load, 76–82 later | **170 ms, 59–65 later** |
| Search first query: time / requests / bytes | 171–221 ms / 20 req 356 KB (broad query 37 req 3.5 MB) | **107–112 ms / 11 req 138 KB** (phone emu 337 ms) |
| Search typing → results p50 | 129 ms | **68–73 ms** (phone emu 87 ms) |
| Museum list open: long task | 108–117 ms | **63–71 ms** |
| Museum list scroll: worst frame | 17.6–23 ms | 12–29 ms (content-visibility trade-off, see perf-fixes.md) |
| Museum 10 models: load p50 / leak | 76–94 ms / none | 98–109 ms / none (3 geometries, 4 textures, 10.5 MB heap after close) |
| Story: chapter change / back / map drag | 6–12 / 6–12 / 6–12 ms | 12–17 / 12–18 / 6 ms (A/B vs v4.6.4 equal or better, ISSUES.md follow-up) |
| Audio: before a gesture | 3.6–4.8 MB fetched during cold load | desktop: after the network goes quiet; phone emu: nothing until the first tap |
| Audio while playing | – | worst frame 6.3–6.6 ms (no cost to rendering) |
| Idle, archive visible (desktop) | 5.1 rAF/s, ~16 ms CPU/s | 5.1–5.2 rAF/s, ~20 ms CPU/s |
| Idle, tab hidden (desktop) | 0 rAF/s, 1.7 ms CPU/s | 0 rAF/s, 2.2 ms CPU/s |

Notes: the phone-emulation search "open" row includes the soundtrack (5 MB mp3) because that tap is the first gesture on
the constrained path, which starts the music by design. Phone-emulation hidden-tab CPU (73–78 ms/s at 4× throttle, i.e.
~19 ms/s unthrottled, 0 rAF/s) is measured right after the visible window, while the constrained glyph warm-up (which
waits for network quiet) is still laying out glyphs; not separately verified. The museum model sequence cannot run at
390 px (the open exhibit's panel covers the list, so the next tile is not clickable) — a harness limit; the phone museum
layout is covered by verify-layout-full (all 258 exhibits at 390 px) and smoke.

## Full table

| measurement | frames max / p95 ms (LT = long tasks) or timing | transfer / notes |
| --- | --- | --- |
| audio-chrome-final-desktop before gesture | src set · paused false | NaN KB |
| audio-chrome-final-desktop while playing | 6.3 / 6 | 144 ms task |
| audio-chrome-final-dpr2 before gesture | src set · paused false | NaN KB |
| audio-chrome-final-dpr2 while playing | 6.5 / 6 | 132 ms task |
| audio-chrome-final-mobile before gesture | src set · paused false | NaN KB |
| audio-chrome-final-mobile while playing | 6.6 / 6 | 144 ms task |
| audio-chrome-final-scn-mobile before gesture | src set · paused true | NaN KB |
| audio-chrome-final-scn-mobile while playing | 6.3 / 6 | 611 ms task |
| audio-msedge-final-desktop before gesture | src set · paused false | NaN KB |
| audio-msedge-final-desktop while playing | 6.5 / 6 | 136 ms task |
| cold-chrome-final-desktop desktop | button 188/187 ms · covers 697/521 ms | 15.4 MB/15.4 MB · 237/237 req · worst  ms |
| cold-chrome-final-dpr2 dpr2 | button 404/233 ms · covers 597/478 ms | 15.6 MB/15.5 MB · 237/237 req · worst  ms |
| cold-chrome-final-mobile mobile | button 2226/2139 ms · covers 26988/27006 ms | 6.3 MB/6.4 MB · 139/141 req · worst  ms |
| cold-msedge-final-desktop desktop | button 420/160 ms · covers 601/445 ms | 15.5 MB/16.1 MB · 237/237 req · worst  ms |
| idle-chrome-final-desktop desktop | visible: 5.1 rAF/s, 20.3 ms CPU/s | hidden: 0 rAF/s, 2.2 ms CPU/s |
| idle-chrome-final-desktop mobile | visible: 2.1 rAF/s, 54.2 ms CPU/s | hidden: 0 rAF/s, 75.9 ms CPU/s |
| idle-chrome-final-dpr2 desktop | visible: 5.1 rAF/s, 20.4 ms CPU/s | hidden: 0 rAF/s, 2.3 ms CPU/s |
| idle-chrome-final-dpr2 mobile | visible: 2.3 rAF/s, 69.6 ms CPU/s | hidden: 0 rAF/s, 73.8 ms CPU/s |
| idle-chrome-final-mobile desktop | visible: 5.2 rAF/s, 21 ms CPU/s | hidden: 0 rAF/s, 2.3 ms CPU/s |
| idle-chrome-final-mobile mobile | visible: 2.2 rAF/s, 65.5 ms CPU/s | hidden: 0 rAF/s, 77.9 ms CPU/s |
| idle-msedge-final-desktop desktop | visible: 5.2 rAF/s, 20.4 ms CPU/s | hidden: 0 rAF/s, 2.2 ms CPU/s |
| idle-msedge-final-desktop mobile | visible: 2.3 rAF/s, 80.8 ms CPU/s | hidden: 0 rAF/s, 72.5 ms CPU/s |
| museum-chrome-final-desktop open list | 94.1 / 6 · LT 1×≤63 | 126 req 1.5 MB |
| museum-chrome-final-desktop scroll list | 29.4 / 6.1 |  |
| museum-chrome-final-desktop 10 models | load p50 107 ms · frame max 111.8 ms | after close: geom 3 tex 4 heap 10.5 MB |
| museum-chrome-final-dpr2 | error | locator.click: Timeout 30000ms exceeded. |
| museum-chrome-final-mobile | error | locator.click: Timeout 30000ms exceeded. |
| museum-chrome-final-scn-dpr2 open list | 100 / 6 · LT 1×≤71 | 126 req 1.5 MB |
| museum-chrome-final-scn-dpr2 scroll list | 11.8 / 6.1 |  |
| museum-chrome-final-scn-dpr2 10 models | load p50 109 ms · frame max 111.7 ms | after close: geom 3 tex 4 heap 10.5 MB |
| museum-chrome-final-scn-mobile | error | locator.click: Timeout 30000ms exceeded. |
| museum-msedge-final-desktop open list | 111.7 / 6 · LT 1×≤70 | 126 req 1.5 MB |
| museum-msedge-final-desktop scroll list | 29.4 / 6.4 |  |
| museum-msedge-final-desktop 10 models | load p50 98 ms · frame max 105.7 ms | after close: geom 3 tex 4 heap 10.5 MB |
| search-chrome-final-desktop open | 29.5 / 6 | 21 req 550 KB |
| search-chrome-final-desktop first query | 112 ms · 23.5 / 23.5 | 11 req 138 KB |
| search-chrome-final-desktop typing → results | p50 68.2 / max 94.9 ms |  |
| search-chrome-final-dpr2 open | 29.3 / 6 | 21 req 550 KB |
| search-chrome-final-dpr2 first query | 109 ms · 29.4 / 29.4 | 11 req 138 KB |
| search-chrome-final-dpr2 typing → results | p50 70.2 / max 86.8 ms |  |
| search-chrome-final-mobile open | 29.4 / 6 | 21 req 550 KB |
| search-chrome-final-mobile first query | 107 ms · 29.4 / 29.4 | 11 req 1.2 MB |
| search-chrome-final-mobile typing → results | p50 68.4 / max 85.4 ms |  |
| search-chrome-final-scn-mobile open | 188.2 / 6.2 · LT 1×≤182 | 27 req 5.6 MB |
| search-chrome-final-scn-mobile first query | 337 ms · 11.7 / 11.7 · LT 2×≤146 | 13 req 170 KB |
| search-chrome-final-scn-mobile typing → results | p50 87.2 / max 150.6 ms |  |
| search-msedge-final-desktop open | 35.2 / 6 | 21 req 550 KB |
| search-msedge-final-desktop first query | 107 ms · 23.4 / 23.4 | 11 req 138 KB |
| search-msedge-final-desktop typing → results | p50 73.4 / max 88.5 ms |  |
| story-chrome-final-desktop open story (first this page / later) | 76.5 / 6 |  |
| story-chrome-final-desktop chapter change | 11.8 / 6 |  |
| story-chrome-final-desktop back | 17.7 / 6 |  |
| story-chrome-final-desktop map interaction (wheel+drag) | 6.2 / 6 |  |
| story-chrome-final-desktop close story | 17.7 / 6.1 |  |
| story-chrome-final-desktop open other story | 35.3 / 6 |  |
| story-chrome-final-desktop long chapter (The Shroud utopia.3200) | 58.9 / 6.1 · LT 1×≤83 |  |
| story-chrome-final-desktop archive navigation (next story key) | 6.3 / 6 |  |
| story-chrome-final-dpr2 open story (first this page / later) | 100.1 / 6.1 |  |
| story-chrome-final-dpr2 chapter change | 17.4 / 6 |  |
| story-chrome-final-dpr2 back | 12.3 / 6 |  |
| story-chrome-final-dpr2 map interaction (wheel+drag) | 6.1 / 6 |  |
| story-chrome-final-dpr2 close story | 17.6 / 6 |  |
| story-chrome-final-dpr2 open other story | 35.2 / 6 |  |
| story-chrome-final-dpr2 long chapter (The Shroud utopia.3200) | 59 / 6 |  |
| story-chrome-final-dpr2 archive navigation (next story key) | 6.3 / 6 |  |
| story-chrome-final-mobile open story (first this page / later) | 105.8 / 6.1 · LT 2×≤67 |  |
| story-chrome-final-mobile chapter change | 11.9 / 6 |  |
| story-chrome-final-mobile back | 17.6 / 6 |  |
| story-chrome-final-mobile map interaction (wheel+drag) | 6.2 / 6 |  |
| story-chrome-final-mobile close story | 11.8 / 6 |  |
| story-chrome-final-mobile open other story | 35.3 / 6 |  |
| story-chrome-final-mobile long chapter (The Shroud utopia.3200) | 82.2 / 6 · LT 1×≤72 |  |
| story-chrome-final-mobile archive navigation (next story key) | 6.9 / 6 |  |
| story-chrome-final-scn-dpr2 open story (first this page / later) | 100 / 6.1 · LT 1×≤68 |  |
| story-chrome-final-scn-dpr2 chapter change | 29.3 / 11.6 |  |
| story-chrome-final-scn-dpr2 back | 11.9 / 11.8 |  |
| story-chrome-final-scn-dpr2 map interaction (wheel+drag) | 11.8 / 6 |  |
| story-chrome-final-scn-dpr2 close story | 35.3 / 11.7 |  |
| story-chrome-final-scn-dpr2 open other story | 41.2 / 6.1 |  |
| story-chrome-final-scn-dpr2 long chapter (The Shroud utopia.3200) | 76.4 / 6.1 · LT 1×≤68 |  |
| story-chrome-final-scn-dpr2 archive navigation (next story key) | 6.2 / 6 |  |
| story-chrome-final-scn-mobile open story (first this page / later) | 258.8 / 11.8 · LT 2×≤212 |  |
| story-chrome-final-scn-mobile chapter change | 70.6 / 6 · LT 1×≤69 |  |
| story-chrome-final-scn-mobile back | 41.2 / 6 |  |
| story-chrome-final-scn-mobile map interaction (wheel+drag) | 6.1 / 6 |  |
| story-chrome-final-scn-mobile close story | 58.8 / 6.1 |  |
| story-chrome-final-scn-mobile open other story | 188.2 / 17.6 · LT 2×≤185 |  |
| story-chrome-final-scn-mobile long chapter (The Shroud utopia.3200) | 329.3 / 11.8 · LT 5×≤292 |  |
| story-chrome-final-scn-mobile archive navigation (next story key) | 7 / 6 |  |
| story-msedge-final-desktop open story (first this page / later) | 88.3 / 6.1 |  |
| story-msedge-final-desktop chapter change | 17.5 / 6 |  |
| story-msedge-final-desktop back | 18 / 11.8 |  |
| story-msedge-final-desktop map interaction (wheel+drag) | 6.1 / 6 |  |
| story-msedge-final-desktop close story | 12.1 / 6 |  |
| story-msedge-final-desktop open other story | 29.5 / 6 |  |
| story-msedge-final-desktop long chapter (The Shroud utopia.3200) | 70.5 / 6 |  |
| story-msedge-final-desktop archive navigation (next story key) | 6.4 / 6 |  |