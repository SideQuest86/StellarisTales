# Brief: chrome agent (typography, brand, navigation, less-is-more)

Read docs/refine/RULES.md first. Project: D:/Saving/Living/CodexProjects/StellarisTales.

Ownership: `index.html`, `src/style.css`, `src/museum.css`, `src/i18n.js` (except a block marked `// reader-refine` or
`// audio-refine` other agents may append), in `src/app.js` ONLY the catalogue-bar statement in `renderChrome()`
(`$("#categories").innerHTML = …`, ~line 754) and the `$("#museum-open")` handler (~line 960); in `src/museum.js` ONLY
user-visible chrome strings (e.g. the eyebrow "银河叙事档案 · 标本陈列"); new `public/fonts/` (if self-hosting),
new `docs/FONTS.md`, new browser check `scripts/verify-refine-chrome.mjs`. Other agents edit other parts of app.js at
the same time: use small targeted Edits and re-read on conflict.

## 4. Typography and layout
Aesthetic reference: Anthropic Serif. First verify its licensing (search the web: is it publicly licensed for third
party web use? It is believed to be Anthropic's proprietary brand face — confirm and cite). If not usable, pick a
legally usable alternative with a similar calm, humanist, slightly sharp serif character (candidates to evaluate:
Source Serif 4 (already used), Newsreader, Literata, Fraunces (opsz), Spectral, EB Garamond — OFL). Chinese: a free font
with restrained futuristic character and excellent readability (evaluate e.g. Noto Sans/Serif SC, LXGW WenKai Screen,
Smiley Sans 得意黑 for display only, HarmonyOS Sans SC / MiSans / Alibaba PuHuiTi — check their licences carefully,
prefer SIL OFL; Google Fonts slices CJK by unicode-range which keeps loading small). Define roles as CSS custom
properties (`--font-title`, `--font-body`, `--font-ui`, sizes, line-heights, measure) and apply site-wide (archive HUD,
reader, guides, museum, playlist, search). Reading measure ≈ 60–75 ch EN, 32–40 CJK chars; responsive scale at 390 /
768 / 1280 / 1920 px. Loading: non-blocking stylesheet as today, `font-display: swap`, metric-matched local fallbacks
(`size-adjust`/`ascent-override` @font-face fallbacks) so swapping causes no visible layout shift; preconnect only to
hosts used. Document every font: source URL, licence, version, where used, in `docs/FONTS.md`.

## 5. Grand Archive entry in the top navigation
Move the museum entry (`#museum-open`, currently in `.header-actions`) into the same top navigation as the category
menus (`nav#categories`), styled as a peer item, including the mobile layout; keep routing (`location.hash =
"museum"`), keyboard focus order, aria labels, the `concealed`/`inert` behaviour of the nav while the reader is open,
and avoid a duplicate entry anywhere. The catalogue innerHTML is re-rendered on language switch — make sure the entry
survives and its handler still works (delegate the click on the nav).

## 6. Less is more
Site name exactly "Stellaris Tales": `<title>` (both languages via `site.title`), brand in the upper left (remove the
`STELLARIS`/`银河叙事档案`/`TALES` three-part lock-up; brand reads "Stellaris Tales"), aria labels ("Stellaris Tales
home"). Remove decorative subtitles (`brand.subtitle`, "群星 · 银河记忆", "Galactic Memory Archive", museum eyebrow
"银河叙事档案"); trim grandiose copy in i18n.js (e.g. site.description, loading titles like "群星之间", music
"STELLARIS ORIGINAL SOUNDTRACK" overline if redundant) to plain useful wording; remove purely decorative visual noise
you find (keep the archive scene, art and useful counts). List every removed/changed string in your report.

Check (`scripts/verify-refine-chrome.mjs`, Playwright headed on the left monitor or headless): desktop 1600×1000 and
phone 390×844 screenshots (archive, reader with a long chapter, guide box, museum, playlist) in both languages into
`verification/refine/`; assert title === "Stellaris Tales", brand text, museum entry present once and inside the nav,
opens the museum by click and keyboard; measure CLS during font loading (PerformanceObserver layout-shift < 0.02);
fonts actually used (`document.fonts.check`). Report: files changed, font choices with licences, checks + results.
