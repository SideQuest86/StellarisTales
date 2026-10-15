# Refinement 2026-10 — shared rules for every agent

Coordinator: the main session (Opus). Agents edit only the files their brief assigns; the coordinator integrates,
builds, commits and releases. Agents never run Git, never run `scripts/build.mjs` (it deletes dist/ under other
agents' feet) and never touch files outside their ownership. To test front-end changes against the running preview
(http://127.0.0.1:4173/, already serving dist/), run `node scripts/dev-sync.mjs` (copies src/, index.html, fonts,
summaries, playlist into dist/ without deleting anything). If a file you own was changed by someone else since you read
it, re-read and merge — never overwrite.

Tools (not on PATH): node `C:/Users/wangp/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe`,
python `C:/Users/wangp/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe`. Playwright:
`$env:STELLARIS_PLAYWRIGHT_PATH='C:/Users/wangp/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs'`.
Headed browser windows must open on the user's left monitor: `--window-position=-1900,20` (env
`STELLARIS_WINDOW_POSITION=-1900,20` for existing verify scripts), or run headless.

## Product (keep its strengths)

Bilingual (中文/English) archive of every Stellaris story from the local game files: original game text, art and OST;
reviewer commentary always marked and separate; no invented lore, names or effects; real gameplay chronology. Visual
identity: dark teal Stellaris archive, continuous card rows, frosted reveals, flow map. Keyboard access, responsive
layout (390 px phone up to wide desktop), reduced motion (`html.reduced-motion` or `prefers-reduced-motion`), smooth
on the GPU. Every page-text change ships in both languages (src/i18n.js keys have `zh` and `en`).

## Editorial rules

- "Less is more": the site name is exactly **Stellaris Tales** (page title, upper-left brand). No decorative
  subtitles (银河叙事档案, 群星银河记忆, Galactic Memory Archive …), no grandiose filler. Keep useful information.
- Game text is never rewritten. Placeholders (`[Root.GetName]` …) are substituted only at display time; the original
  token stays in the data. Substitutions are plain, natural phrases ("our empire", "the other empire", "this planet",
  "the scientist"), never invented proper names. Each one carries a short, naturally worded explanation shown on
  hover, keyboard focus and tap — e.g. zh "游戏里这里会出现你的帝国名称。" / en "In the game, your empire's name
  appears here."
- Conditional effects stay conditional; choices, conditions and chronology are never altered.

## Design rules

- Typography roles: title (display serif), body (reading serif for EN, readable CJK for ZH), UI (sans for controls,
  labels, numbers). Reading measure 60–75 characters EN / 32–40 CJK characters; body line-height 1.7–1.9 (ZH) /
  1.55–1.7 (EN). Fonts must be legally usable (documented licence), non-blocking, with metric-matched fallbacks (no
  layout shift).
- Calm, restrained motion; no new decorative noise. Touch targets ≥ 40 px on phones.
