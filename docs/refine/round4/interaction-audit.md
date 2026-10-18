# Round 4 interaction audit (test only, src/ untouched)

Probe: `node scripts/probe/interaction-probe.mjs [scenario...]` (serve dist on :4193 first). Scenarios: rapidOpenEscape,
openDifferentFast, memory, listenerLeak, directLinks, museumRapid, museumEscape, loadFailures, glbAbortRetry, shardAbort,
imageFontAbort, storageFail, audioFail, audioToasts, resizeDuringOpen2, landscapeReach, reducedMotion, touch,
langProfileMidSearch, slowNetworkRace, escapeBeforeLoad, keyboardNav, fastChapters, historyBehaviour.
Output JSON + screenshots: `verification/round4/interaction/` (results*.json; some earlier scenarios there were rewritten
after test-side mistakes, only the final versions are quoted below). Chrome headless, 1440x900 unless stated.

## Defects (ranked)

### D1 (medium) Closing during a slow story load is ignored: the reader opens anyway
Steps: throttle `stories/<id>.json` (route delay 1.5 s) -> click "展开故事" -> within the delay press Escape (or navigate
the hash to `#`, or browser Back/clear hash after `#story=...`).
Expected: the pending opening is cancelled / the archive stays. Actual: Escape does nothing (reader still hidden), then the
load completes and the reader opens, hash `#story=...` restored, HUD inert, user must Escape again. Hash-clear variant:
`#story=cetana` (2.5 s delay) then `location.hash=""` at 300 ms -> after load reader open on cetana (slowNetworkRace
`closedBeforeLoad`). Story A then B (slow A) is handled correctly by `readerTicket`.
Also made my own click-loops time out (openDifferentFast, reducedMotion at delay 0): an Escape pressed within ~one load of
Open (uncached story, no throttle) is swallowed the same way. Evidence: `escape-before-load.jpg`, `results-escapeBeforeLoad*.json`.
Cause: `src/app.js:1199` Escape only acts when `#reader` is visible; `src/app.js:1296` `else if (dossier) closeReader()` ignores
a pending opening (`pendingOpenings > 0`, `readerTicket` not bumped). Fix idea: when pendingOpenings>0, bump readerTicket
on Escape/hash-clear.

### D2 (medium) Short landscape phone (844x390): the open-story button is overlapped by the category arrows
Steps: viewport 844x390 (hasTouch/isMobile), archive. `#open-story` rect = 439,253 376x59 but the point at its centre
resolves to `#next-category`; Playwright tap times out ("not stable"); tapping the middle of "展开故事" changes category
instead of opening. Only the left text edge opens it. Rotating 390x844 -> 844x390 and back (resizeDuringOpen2) leaves later
`click("#open-story")` calls timing out the same way. Evidence: `landscape-archive.jpg`, `results-landscapeReach*.json`.
Suspected: `src/style.css` HUD layout for `@media (max-height:760px) and (min-width:701px)` (line ~2228) and the `.access`
rule (line ~385); the arrow cluster is positioned over the button row.

### D3 (low-medium) Browser Back / Android hardware Back leaves the site while a story is open
Opening via the button and chapter navigation use `history.replaceState` (history.length stays 2). `goBack()` from the
open reader navigates away from the site (about:blank), instead of closing the reader. Inconsistent with `#story=` links and
`#museum`, which push entries and do support Back/Forward correctly (directLinks: story->story->museum->story and Back x2 /
Forward all landed on the right view, no stuck overlay). Evidence: `results-historyBehaviour.json`.
Files: `src/app.js:491` (replaceState on close), reader open/chapter navigation in `goChapter` (~508).

### D4 (low) Audio load failure gives no visible feedback on a user click
All `/music/*.mp3` aborted: audio.error.code=4, play button stays "▶", the only toast in 3 s is the stale
"点击播放开始。" (autoplay hint); neither `music.loadFailed` (audio-player.js:138) nor `music.playFailed` (:233) appeared after
clicking Play (MutationObserver on `#toast`, `results-audioToasts.json`). Moderate confidence: toast text may have been
overwritten before the observer attached for the load-time error, but the click produced nothing. Next track after failure also
silent. Autoplay refusal (play() rejected with NotAllowedError) correctly shows "click to start" and recovers.

### D5 (low) Raw browser error text in the failure toast
Story JSON request failure shows "Failed to fetch" (English, untranslated, in a zh UI) because `json()` (`src/app.js:124`)
only wraps non-OK statuses, not network rejections; `openStory` (:262) and museum (:1281) toast `e.message` directly.
Same for museum data failure ("博物天枢暂时无法打开。 Failed to fetch"). Recovery works: retrying after unblock opens fine
(story and museum), no stuck state. A 404 (bad `#story=` id) shows the localised generic message; the stale toast also remains
on `#museum=nonexistent-key` (museum opens normally, toast text came from the previous action).

### D6 (info) Unattributed listener growth: +1 JS event listener per open/close cycle
CDP `Memory.getDOMCounters.jsEventListeners`: 135 -> 165 over 31 cycles (+1/cycle). Heap flat (7.9 -> 8.7 MB after GC; most
of it the first cycles), DOM nodes constant at 400. A patched add/removeEventListener census (listenerLeak) shows no net
growth through addEventListener, so it is likely `on*` handlers / animation or ResizeObserver objects: not a practical leak
at 30 cycles; worth a longer soak only if desired.

## Tested and working (coverage)
- 20x open + Escape at 20-180 ms (cached story): ends closed, no inert/HUD leftovers, focus returns to `#open-story`, 0 page errors.
- Memory over 31 open/close cycles: heap stable, DOM nodes constant (see D6).
- Direct links on cold load (`#story=`, with chapter, bad chapter falls back to start, bad story toasts), story->story,
  story->museum (reader closes, hash kept), museum->story, Back/Forward through those: consistent state.
- Slow-network race A (3 s) then B (0.3 s): B wins. Failed story fetch then retry: recovers.
- Museum: 12 exhibits clicked at 40 ms gaps ends on the last one, viewer ready; GLB abort shows the image fallback with
  "三维模型未加载，显示原版图像。" and later exhibits/retry load; specimens.json abort shows toast and later reopen works.
  Escape closes the detail first, then the museum (by design); focus inside museum after cold and hash reopen.
- Image/webp/font aborts on a story: no page errors, layout intact (only the album cover reported broken).
- localStorage throwing, quota-full and corrupt values (`st-*`): app boots, opens a story, switches language, reloads, no errors.
- Language switch in reader (title switches, lang attr), 8 rapid toggles; switching language with search open keeps the dialog
  and recounts results; result click closes search and opens the story.
- Keyboard: Enter on Open, Tab cycle (reader content -> player -> header -> map -> close), Escape closes reader, "/" opens
  search, Escape closes search without closing anything else. Note: close button is ~20 tab stops into the reader (minor a11y).
- Touch (390x844, hasTouch): tap Open, scroll gesture, choice tap expands, map toggle opens full-screen map with working x.
- prefers-reduced-motion: open/close loops end consistent (apart from D1 at 0 ms).
- Fast chapter switching (5 next, 3 back, no waits): final doc and hash agree; reload on the link restores via Continue logic.

## Not tested / limits
- Real GPU/WebGL (headless SwiftShader only); frame timing; actual audio output.
- Profile (empire) changes mid-reading and mid-search were not driven beyond the language switch; map drag vs text selection
  relies on the existing `verify-refine-reader.mjs`; no real touch pinch/swipe on the map, no orientation change with the
  reader fully open on a real device.
- Archive boot failure (`stories/index.json` abort -> "Reconnect") and `music/playlist.json` failure not exercised.
- Backtracking-then-different-choice was only partly covered (choice expand/switch); a full trail with divergent branches
  was not compared against saved progress after reload.
- Multi-tab localStorage interleaving; Safari/Firefox.
