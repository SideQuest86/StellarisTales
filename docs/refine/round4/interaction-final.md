# Round 4 — interaction sweep on the released v4.7.3 (2026-10-18)

All 44 scenarios of `scripts/probe/interaction-probe.mjs` (the first audit's 26 + the re-test's 18 `rt*`) run against the
live site (https://sidequest86.github.io/StellarisTales/, Chrome headless): `STELLARIS_PREVIEW_URL=<live> PROBE_OUT=verification/round4/interaction3 node scripts/probe/interaction-probe.mjs`.
Raw results: `verification/round4/interaction3/results.json`. 0 page errors in every scenario.

| Area | Scenarios | Result |
| --- | --- | --- |
| Rapid reversals | rapidOpenEscape (20× open/Escape at 20–180 ms), openDifferentFast, fastChapters, museumRapid | Correct end states. rapidOpenEscape flagged "stuck" once: the snapshot, taken exactly 1.5 s after the last key, caught the idle warm-up's transparent inert render; polling for 8 s after the same 20 cycles (3 runs) shows the reader hidden throughout and a normal open/close afterwards — probe check corrected (`.prewarm` is not stuck). |
| Async races | slowNetworkRace, escapeBeforeLoad, rtPendingBack | Last request wins; Escape before load cancels; Back during a pending button opening leaves the site (no entry was pushed yet — by design) |
| Backtracking / saved progress | rtBranch, storageFail, storageFail2 | Choose A → Back → B → reload → Continue restores B only; throwing / full / corrupt storage tolerated |
| Direct links / browser navigation | directLinks, historyBehaviour, rtBackForward, rtCloseButtonThenBack | Cold links open; Back closes a reader opened from the archive / Continue / search; Forward reopens |
| Museum round trip | rtMuseumReturn, rtMuseumFromStory, museumEscape, rtXHit | ×, Escape and Back return to the chapter; "From the story" opens the awarding chapter |
| Language / profile | langProfileMidSearch, rtProfile | Results relabel on language switch; profile changes keep document and trail |
| Keyboard / touch / resize | keyboardNav, touch, resizeDuringOpen, resizeDuringOpen2, landscapeReach | Keyboard reaches and opens; touch taps open; resize/orientation during the opening ends open at full opacity with no overflow; landscape tap opens |
| Reduced motion | reducedMotion | Opens/closes without animation |
| Load failures | loadFailures, shardAbort, glbAbortRetry, imageFontAbort, rtBootFailures, rtMuseumFail | Localised toasts; retry recovers stories, museum and GLBs; with every image blocked the card pictures show as empty boxes (expected) |
| Audio fallback | audioFail, audioToasts, rtAudioOnce, rtPlaylistThenPlay | Failure shown in the player; exactly one stream with early / late / no click; playlist failure recovered on play |
| Memory | memory, listenerLeak, rtListenerSoak, rtLeakSplit | Heap flat (7.9 → 8.9 MB over 100 cycles). The growth in nodes/listeners on the reader path is the probe's retained `waitForSelector` element handles (heap snapshot: retained only by DevTools global handles; ISSUES.md "Follow-up" R1), not the page |

Not covered: real touch hardware and OS-level orientation, Safari itself (WebKit smoke 15/15), Firefox (Playwright's build
cannot start here: Windows SideBySide error "Dependent Assembly mozglue … could not be found", also after a forced
reinstall), physical phones, low-end GPUs.