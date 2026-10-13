# UI work progress (ui agent)

Updated after each milestone so an interruption loses nothing.

## Done
- `src/i18n.js` dictionary (zh/en) + `data-i18n*` attributes in `index.html`; `applyStaticText()`.
- `src/flow-tree.js`: `toTree(dossier)` (V4 `story.tree` normaliser: via.group → exclusive nodes, story.groups parallel → group + gate with joins; V3 derivation fallback), `compactTree` (ref sets), `treePath`, `defaultCollapsed` (folding budget), tidy Reingold–Tilford layout with railed lists for big leaf fans and wrapped forest rows. 0 overlaps over all 2,067 V4 stories (`verification/ui/tree-check.mjs`).
- `src/flow-surface.js`: SVG map renderer on the card (CSS-transform pan/zoom on the compositor, wheel/pinch/drag, keyboard roving focus, fold badges, link-back previews on hover/focus, route highlighting from trail).
- `src/cover-atlas.js`: single 2048² sRGB render-target atlas (36 hi 448×150 + 256 lo 128×43 tiles), createImageBitmap decode, budgeted blits, LRU, context-restore reset.
- `src/archive-scene.js`: rewrite — no shadow pass, per-instance frustum culling, shared instance matrix, face shader with art band + focus dimming, frosted geometric reveal shader with snapshot ping-pong for interruptions, on-demand rAF with idle breathing envelope, adaptive pixel ratio (FrameGovernor), context lost/restored, optional GPU timer queries, `container.__scene` test hook (`timeScale`).
- `src/reader-motion.js` reader enter/exit; `src/style.css` full rewrite; styles for coordinator's new reader markup.
- `src/app.js`: hooks re-applied with `verification/ui/patch-app.mjs` (run after every re-copy of main's app.js).

## Next
- style `span.game-name`; build; screenshots 1600×1000 / 1280×720 / 390×844 into verification/ui/.
- scripts/verify-ui-capture.mjs (screens + slow-motion transition frames), scripts/verify-ui-perf.mjs (real GPU, rAF + GPU timer), update verify-motion / verify-flow-interaction.
- node --test tests/*.test.mjs; final report.

## Workflow
`node scripts/build.mjs`; serve `node scripts/serve.mjs --dist --port 4180`; fast resync of src: `node verification/ui/sync.mjs`.

## 20:55 status
- verify-ui-capture.mjs passes 50/50 on RTX 5070 (D3D11). Fixed: negative rAF dt (springs could diverge), bitmap close race, caption timing, expanded-map actions.
- Next: perf script (headed, rAF + GPU timer), tests, update legacy verify scripts, report.

## 2026-10-13 resume
- Re-copied main app.js/reading.js/tests/public (stories+data); re-ran patch-app.mjs (6 hooks); removed obsolete tests (chronology, flow-progress, navigation; main deleted them). Next: rebuild, serve 4180, capture + perf.
- 2026-10-13: capture 50/50 on RTX 5070 D3D11; perf run complete (perf.json); node --test 26/26. DONE; final report.
