# Round 4 interaction re-test (v4.7.0, commit 59bada4d) - test only, src/ untouched

Probe: `scripts/probe/interaction-probe.mjs` (now honours `PROBE_OUT`, `STELLARIS_PREVIEW_URL`; new scenarios `rt*`).
Run: `node scripts/serve.mjs --port 4198`, then `PROBE_OUT=verification/round4/interaction2 STELLARIS_PREVIEW_URL=http://127.0.0.1:4198/ node scripts/probe/interaction-probe.mjs <scenario>`.
Evidence: `verification/round4/interaction2/` (results-*.json, screenshots). Chrome headless, 1440x900 unless stated.

## Previous defects
- D1 fixed: Escape during a 1.5 s story load leaves the archive, nothing opens later (escapeBeforeLoad).
  Residual (info): `location.hash=""` right after the button click does nothing (hash not yet set), so the story still
  opens; Back while the story is still downloading leaves the site (no history entry yet, button case) - both consistent
  with "entry is pushed on open". `#story=x` then hash clear at 300 ms cancels correctly (slowNetworkRace).
- D2 fixed: 844x390, centre of #open-story hits itself, tap ok; with a Continue card the arrows sit below it (continue-844x390.png).
- D3 fixed: button open adds an entry; Back closes, Forward reopens (same doc), Escape then closes; no stuck inert/HUD.
- D4 fixed: aborted mp3 -> toast "这一首未能加载..." and player stays on play.
- D5 partly fixed: story failure is localised ("未能载入，请稍后重试。"), recovery works. Museum data failure is not (R2).
- D6 NOT bounded: see R1.

## Defects
### R1 (medium-low) Opening a story with the archive button then Escape leaks DOM nodes and a listener every cycle
Steps: 120x (click #open-story, wait for chapter, Escape) on horizon-signal. CDP `Memory.getDOMCounters` after GC:
listeners 135 -> 255 (+1/cycle, exactly linear), nodes 1,096 -> 45,731 (+~372/cycle, linear); JS heap flat 7.9 -> 9.0 MB.
`document.getElementsByTagName("*")` stays 514, so these are detached nodes retained by a listener/closure.
Split (25 cycles each, rtLeakSplit): button open+Escape 711 -> 10,019 nodes, +22 listeners; hash open/clear 711 -> 1,215,
+0 listeners; search open/close 896, idle 840; museum open/Escape 3,254 (~+100/cycle, smaller, not analysed).
Expected: flat. Actual: grows without bound (~0.4 k nodes per story open). Not user-visible within hundreds of opens.
Suspect: the button/Escape path only: `src/app.js:978` (pushState on fresh open) + `:501` (history.back on Escape/close) and
whatever per-open work differs from the hash path (focus restore to #open-story, `scene.selectStory`, reader prewarm).
Not located; needs a heap snapshot (detached nodes) which I did not take.

### R2 (low) Museum data failure still shows raw "Failed to fetch"
Steps: abort `museum/specimens.json`, open `#museum`. Toast: "博物天枢暂时无法打开。 Failed to fetch" (English in zh UI).
Cause: `src/museum.js:62` uses bare `fetch(...).then(r => r.json())` (no ok check, rejects with browser text);
`src/app.js:1330` appends `e.message`. Fix: wrap like `json()` (app.js:124) or drop `e.message`.

### R3 (low) After `music/playlist.json` fails the player never recovers
Steps: abort playlist.json, load (toast "未能载入，请稍后重试。", fine), restore network, click Play: nothing, no feedback,
label stays "播放音乐"; only a reload helps. Expected: retry on click (as "Reconnect" does for the archive). Suspect:
`src/audio-player.js` construction (playlist fetched once at boot).

### Notes (not defects)
- With a 3D exhibit open (>= 700 px wide) the header x of the museum is covered by the detail panel (elementFromPoint = CANVAS);
  the visible x is the exhibit's, so leaving takes two clicks or Escape twice. By design? Worth a look (x-detail-1440.png).
- Reader `inert` is false while hidden after cancelling a pending open (display:none, harmless).

## Covered and OK
- Back/Forward (rtBackForward): button, Continue reading, search hit, `#story=` link. Back closes, Forward reopens the same
  doc, Escape closes, Back again goes to the previous entry; no errors, focus returns to #open-story. Link opened on a cold
  load: Back leaves the site (it is the first entry, expected).
- Close with button then Back/Forward (rtCloseButtonThenBack): consistent, no stuck overlay.
- Museum from specimen link (ancrel.103, site-asteroid-vault-1): exhibit x + museum x, Escape, Escape x2 and browser Back all
  return to the same chapter (hash `#story=...&chapter=ancrel.103`, Back-in-reader still enabled). "From the story" link
  (`#museum=acidic_spores`) opens `anomaly.4000` (the awarding chapter), not the story start.
- Continuation cards (390/844x390/1440, cybrex): no overflow (scrollWidth = clientWidth), no failed requests, visible 2 px gold
  focus outline; the loaded images are all complete (off-screen lazy ones merely not yet loaded); continue-reading card
  (in the archive) has no picture, nothing broken, no overflow at 390.
- Audio (rtAudioOnce): early click, no click, click + later click: 1 play() call, 1 `playing`, 1 mp3 request, 1 audio element.
- Profile (astral-crystal-sphere): change mid-chapter, after a choice, after Back, then Reset, then reload: doc and trail kept,
  chips and `st-profile` follow, no errors. Reload on the story link restores the same trail.
- Boot failures (rtBootFailures): index.json blocked -> "重新连接" button + title "档案暂时无法连接"; unblocking and clicking
  loads the archive (9 categories). playlist.json blocked -> archive normal, toast shown. Both: no page errors.
- Branching (rtBranch, astral-crystal-sphere): choose A, next, Back, choose B, next -> saved trail is [start(B), destroy];
  reload on the link restores destroy; Escape + reload -> Continue card "继续阅读水晶球体 · 摧毁水晶球体" restores it, Back
  returns to the start chapter. No trace of branch A in the trail.

## Not tested
Real GPU/audio output, Safari/Firefox, real touch/orientation on a device, multi-tab storage, museum-origin leak cause,
Back during a pending *link* open on a throttled network beyond the cases above, 1920x1080 continue cards.
