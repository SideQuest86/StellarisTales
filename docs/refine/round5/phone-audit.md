# Round 5 phone-experience audit (AUDIT ONLY, no source edits)

Method: **emulation only** (Playwright, Chrome channel, headless, swiftshader GL; isMobile + hasTouch, DPR 2-3) against the live
site https://sidequest86.github.io/StellarisTales/ on 2026-10-19. Viewports 390x844, 360x740, 844x390 landscape, 768x1024 tablet.
Touch only (tap, CDP `synthesizeScrollGesture`, `synthesizePinchGesture`). Real-device caveats: no true OS keyboard (390x500
viewport stand-in), no iOS Safari (100vh/safe-area/rubber-band untested), headless GPU = the "no acceleration" hint path. Timings
below are wall-clock incl. waits, so only relative. Screenshots: `verification/round5/phone/*.png` (01-37).

Not exercised for lack of data/time: continue cards (never rendered, `.continue-reading` stayed 0x0 after reading a story and
returning in the same context - verify with real progress), Back / Start over (`#reading-back/#reading-restart` exist but are
hidden until a branch is chosen), cross-story links and specimen->museum->back (reading content of the two test stories had no
such links; only the `./summaries/*.md` download link).

## Ranked findings

### P1 - fix first
1. **Museum exhibit detail ghosts the grid behind it (390px).** Detail panel is full-width on phones but keeps the desktop
   left-fade background, so the "258 specimens" label and tile names show through text (shot 24). `src/museum.css:121-130`
   (`linear-gradient(90deg,#08151aee,#08151afa 30%)`); mobile block `museum.css:176-179`. Fix: inside that mobile block add
   `.museum-detail{background:#08151a}`.
2. **Opening an exhibit pushes no history entry** (hash stays `#museum`). Android system Back / swipe-back leaves the whole
   museum instead of closing the detail; the detail only closes through the 40px x. `src/museum.js` (open handler near the
   `.museum-detail` render, ~l.174; hash parse `app.js:1411-1423`). Fix: `history.pushState` on open (`#museum=<key>` is already
   parsed by `showMuseum(q.get("museum"))`) and close on popstate.
3. **Category rail is clipped with no affordance.** 8 tabs = 805px inside a 358px scroller; last visible tab is cut mid-word
   ("深空", "Expl") on 360/390 (shots 22, 33) and nothing hints it scrolls; the tab row also sits under the 72px masthead, so the
   scene loses ~120px of the 844. `src/style.css:179-188` (`.catalogue`, `overflow-x:auto`, `scrollbar-width:none`). Fix: add a
   right-edge mask (`mask-image:linear-gradient(90deg,#000 85%,transparent)`) and `scrollIntoView({inline:"center"})` for the
   active tab on change (verify it already runs; after tapping tab 2 the rail did not visibly recentre).
4. **Landscape (844x390) reader is nearly unusable.** Text pane is 326px tall, of which toolbar 56 + fixed player 64 + masthead
   brand overlay (72) leave ~half the screen for text (shot 30); the side map thumbnail is tiny (controls 158x30). Fix: at
   `(max-height:520px)` hide `.masthead` in `body.reader-open`, collapse `.music-player` to a one-line mini bar (hide `.seek`,
   `.volume`), and make the toolbar non-sticky or 40px. Related rules: `style.css:419`, `2387`.

### P2
5. **Flow-map controls are 30x30** (zoom +/-, show all, locate) and the close 44x40; mis-taps likely with fat thumbs, and the
   bottom fixed player (84px) covers the lowest nodes (shot 08). `src/style.css:1462-1466`. Fix: `min-height/width:44px` under
   `@media (pointer:coarse)`; add `padding-bottom:var(--player-h)` to `#flow-surface` content. Positive: pan and pinch work
   (zoom 92% -> 180% on a synthesized pinch, `flow-surface.js:618-683`), `touch-action:manipulation` on nodes, node tap
   navigates (`#story=...&chapter=country.5`).
6. **Map stays open after tapping a node** (`flow-surface.mobile-open` still true; hash changed). The reader updates underneath
   a full-screen overlay, so nothing visibly happens. `flow-surface.js:170-172`, nav handler in `app.js` near the
   `chapter` hash write. Fix: on node tap in mobile mode `toggleMobile(false)` (or toast the destination).
7. **Archive swipe does not mirror the buttons.** On the scene, vertical *and* horizontal swipes changed the *category*
   (lane), while the on-screen arrows ↑/↓ change the *story* and ←/→ the category. Stories can only be stepped by the 40x44
   arrows; no swipe hint. `archive-scene.js:754-` (pointer handling), nav buttons `index.html` `.row-navigation`. Fix: map
   vertical swipe -> `navigate("row")`, horizontal -> `navigate("lane")` as the wheel does (`archive-scene.js:809-819`), and show
   a one-time "swipe" hint.
8. **Tap targets under 44px in persistent chrome**: playlist close 24px (`style.css:1860`), seek slider is a 3px-high hit box
   at y=829 (`style.css:1795-1811`; thumb is draggable but a tap on the track must be exact), `#playlist-toggle` 24px tall
   title, track prev/next 32x44, `.gpu-hint summary` 28px. Fix: pad range input `padding:20px 0` with `background-clip`, give
   `#playlist-close` 44x44, `#playlist-toggle` `min-height:44px`.
9. **GPU hint covers the top of the scene and the first story on every cold phone load** (68px card at y=120, shot 01/33). It is
   noise for real phones that have GPUs only when detection fails; but on failure it covers the scene art and the dismiss x is
   32px. `style.css:2403-2456`. Fix: auto-collapse to a 1-line pill after 5s, x -> 44px.
10. **Museum filters eat the first screen**: 3 wrapped chip rows (~330px) before the first exhibit (top y=406 of 844); not
    sticky/collapsible. `museum.css:48-52`. Fix: single horizontally-scrolling chip row, or fold rarity into a `<select>`.
11. **Autoplay-on-open**: tapping 展开故事 started music immediately in all journeys (pause glyph, 0:08 at open). Intentional?
    On a phone that is surprise audio + data; the `.autoplay-blocked` pulse exists (`style.css:2545`) but audio still began.
    Suggest honouring a stored "music off" and never auto-starting on the first visit.

### P3
12. **Small type**: language / motion buttons 11px (`style.css:251-266`), `#track-artist` 11px, time labels 10px
    (`style.css:1802-1806`), `.catalogue small/em` 10px, `.museum-name` 13px, `.gpu-hint-adapter` 11px. Raise to >=12px.
13. **EN masthead wraps "Reduce motion" onto two lines** and shows 70px max width (`style.css:2111-2116`, shots 22-24); the
    search label collapses to a 19px icon-only target in zh/en (`#search-open` 19x44). Shorten label ("Motion") or icon-only at
    <=400px with 44px min width.
14. **Sticky toolbar clips text abruptly** (shots 07/11): text scrolls under the 52px toolbar with only a hairline, partially
    cut lines visible. Add a bottom fade/solid background to `.reader-toolbar` (`style.css` sticky rule; reader toolbar+player =
    136px = 16% of a 844 screen, 18% at 740).
15. **Exhibit detail opens at scroll 0 after the model**, 3D stage 300px high is fine, but the explanatory sentence and name
    are below the fold; acceptable. Canvas has `touch-action:none` (drag-rotate won't scroll the page - good); note a synthesized
    one-finger drag changed no page scroll. Pinch zoom of the model is not emulatable here.
16. **Reader language toggle**: label "EN" vs chip "中 / EN" in masthead use different patterns on different screens; fine but
    check both reflow the open chapter without scroll jump (observed: no jump, `scrollTop` stayed 0).

## Measurements (emulated, 390x844, live)
- Cold load to interactive archive: ~5.0-5.4s on `waitUntil:"load"` (4.5-5.4s across sizes; headless, no CDN cache).
- Tap 展开故事 -> reader visible: ~2.1s incl. 1.5s settle wait (feels fine). Search open 0.95s incl. wait; typing "signal"
  -> 161 results, first 4 visible with the 500px "keyboard" viewport; dialog 440px high fits, pager at 528 is below the
  fold (scroll inside the dialog needed). Museum open 2.7s (258 tiles, lazy images); exhibit detail 2.6s (3D engine).
- No horizontal overflow on any screen (`scrollWidth == innerWidth`), no page errors.
- Reader: panel `.reader-panel` is the scroller (`overflow-y:auto`), `#reader` itself is 760 = viewport; hash/scroll
  stays stable across chapter taps (no jumps seen), choice tap targets 54px tall.

## What works well
- Touch pan/pinch on the story map; zoom indicator, fit and locate buttons present.
- Reader typography (serif 18-19px, generous line-height), 54px full-width choice buttons, bilingual toggle without reflow.
- Guide `<details>` and the effects panel (full-width selects 38px+, `fx` panel) are legible and finger-sized.
- Playlist sheet: rows 44-63px, current track highlighted, scrolls inside the sheet.
- Search dialog survives a short viewport; input font 16px (no iOS zoom); clear button; hit rows ~68px tall.
- Museum grid: 3 columns, 110px tiles, 44px chips, 40px close; 3D canvas `touch-action:none`.
- Tablet 768 and 360 portrait: no overflow, layout holds (shots 33-37).
