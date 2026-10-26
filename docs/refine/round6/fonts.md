# Round 6 — self-hosted Chinese web fonts (2026-10-25)

Noto Serif SC and Noto Sans SC are now served by the site itself: 12 subset woff2 files in `public/fonts/` (2.54 MiB in all, SIL OFL)
declared in the new `src/fonts.css`. The Google request for the CJK faces is gone from `index.html`; Newsreader (English reading text)
still comes from Google Fonts. Nothing was committed. Supersedes the unapplied round-5 attempt (`docs/refine/round5/fonts.patch`).

## Result

| | before (Google Fonts, unmodified copy) | after (self-hosted) |
| --- | --- | --- |
| Chinese font files on a cold desktop load | 116 woff2 slices, 7.18 MB, + 125 KB Google CSS | 8 woff2, 2.44 MB (+ `fonts.css` 11.6 KB gzipped) |
| all font bytes of a cold desktop load (with Newsreader 132 KB) | 7.43 MB in 118 requests | 2.59 MB in 11 requests (−65 %) |
| whole cold desktop page | 245 requests, 12.3–13.1 MB | 138 requests, 7.6–9.1 MB |
| cold desktop main thread, 4 s after the covers: task / layout | 2.15 s / 1.52 s | 1.29 s / 0.86 s |
| cold desktop worst frame (2 reps) | 47 / 64.7 ms | 35.2 / 41.3 ms |
| cold desktop first contentful paint | 104–128 ms | 92–120 ms |
| phone emulation (390×844, DPR 3, CPU ×4, 1.6 Mbit/s, 150 ms): covers ready | 15.8 s | **10.4 s** |
| phone: DOMContentLoaded / transfer / requests | 7.9 s / 4.05 MB / 148 | 6.35 s / 2.45 MB / 109 |
| phone: main-thread task, worst frame | 5.4–5.5 s, 276–306 ms | 3.7–4.0 s, 206–224 ms |
| phone: first contentful paint | 0.98–1.00 s | 1.06–1.08 s (+80 ms: `fonts.css` is render-blocking) |
| story opening (desktop, warm page), worst frame, first / later | open 94 / 35 ms, other story 29 / 41, long chapter 77 / 24, map drag 82 | open 65 / 12 ms, other story 12 / 12, long chapter 35 / 18, map drag 6 |

`node scripts/bench/bench.mjs cold` (PROFILE desktop and mobile, REPS 2, headed Chrome 155, same machine, both builds served by the same
static server with gzip for text; the other agents were working on the machine, so single numbers wobble by ±10 ms / ±0.5 MB):
`verification/round6/fonts/cold-chrome-{before,after}-{desktop,mobile}.json`, story opening in `story-chrome-*.json`. "Before" is an
unmodified copy of `index.html` + `src/` taken at the start of the session (the live site, v4.8.0, predates the round-6 typography
commit, so it was not used). The fewer late font swaps (a Google slice arriving after layout re-lays out the page, round 5 finding 3)
are what lowers layout time and the worst frames; the phone gains most from less font traffic competing with the covers on a slow link.

## What was found / reused

An earlier agent stopped midway. Reused: `scripts/fonts/build-subsets.py`, the 12 woff2 files and the downloads in
`D:/Saving/Living/CodexProjects/st-tools/fonts-src/`. Re-verified: both TTFs are byte-identical to `google/fonts` main (same size and git
blob id as GitHub lists, below), the licences are SIL OFL 1.1 (METADATA `license: "OFL"`, OFL.txt text), `pip` has fonttools 4.67.0 +
brotli 1.2.0 in `st-tools/venv`. Changed: the stylesheet moved from `public/fonts/fonts.css` to `src/fonts.css` (urls `../fonts/*`),
names of the instances fixed (below), provenance recorded, `--check`, rule order. The round-5 patch also touched `docs/FONTS.md`,
done here too.

## Sources and licences (downloaded 2026-10-25, user-approved; nothing else was downloaded)

| File | URL | bytes | sha256 | git blob |
| --- | --- | --- | --- | --- |
| NotoSerifSC[wght].ttf | https://raw.githubusercontent.com/google/fonts/main/ofl/notoserifsc/NotoSerifSC%5Bwght%5D.ttf | 25,125,512 | `050080D9255A86808F2945BFFAC582B31EF32BC36411CE29563B4961670C66F9` | `eab063faf229160a52d3760f5555150e4eb9e5bf` |
| NotoSansSC[wght].ttf | https://raw.githubusercontent.com/google/fonts/main/ofl/notosanssc/NotoSansSC%5Bwght%5D.ttf | 17,772,300 | `A3041811A78C361B1DE50F953C805E0244951C21C5BD412F7232EF0D899AF0DA` | `fb0637bafbcd804fe32152370a1225990745b4bc` |
| OFL.txt (Serif) | https://raw.githubusercontent.com/google/fonts/main/ofl/notoserifsc/OFL.txt | 4,350 | `5E0DA210FB04058A8C0087985D2D456B931C2579811A49655721D3CF0C36B6D6` | `94d1bf7b52481343e2983fb7751e8b7abe1ea07b` |
| OFL.txt (Sans) | https://raw.githubusercontent.com/google/fonts/main/ofl/notosanssc/OFL.txt | 4,388 | `1C05C68C34F9708415AADA51F17E1B0092D2CEA709BF4A94CD38114F9E73D7D9` | `1c9f43281b8f216c5461fe9ac729afbade7724e4` |

Upstream (METADATA.pb): Serif `notofonts/noto-cjk` @ `985fa52c81c1d6692ccdd82bc3656e8fb932fd89`, Sans `notofonts/noto-cjk` @
`523d033d6cb47f4a80c58a35753646f5c3608a78`. Last commits of the two google/fonts directories at the time: `8b0a1d0f…` (2026-03-12,
Serif), `a85815a4…` (2026-03-25, Sans). The git blob ids are the ones GitHub's contents API lists for those paths; the local files hash
to the same ids. `scripts/fonts/build-subsets.py` refuses to run if a sha256 differs.

Licence: SIL OFL 1.1 allows subsetting, conversion and redistribution if the notices and the licence text travel with the fonts:
`public/fonts/OFL.txt` (source URLs, hashes, the font's own copyright notice, the published OFL text; it is copied to the built site as
`fonts/OFL.txt`), `public/THIRD_PARTY_NOTICES.txt` (one paragraph), `docs/IMAGES.md` (licence table), `docs/FONTS.md`. Copyright:
Serif © 2012 Google Inc. (OFL.txt) / © 2017–2024 Adobe (the font); Sans © 2014–2021 Adobe "with Reserved Font Name 'Source'". The
Reserved Font Name is only in the copyright line: the instances keep the family names "Noto Sans SC Medium", "Noto Serif SC SemiBold"
(name table checked, no "Source" anywhere else), `fsType` 0. The glyph shapes are those the variable fonts draw at the named weight.

## Build

`D:/Saving/Living/CodexProjects/st-tools/venv/Scripts/python.exe scripts/fonts/build-subsets.py` (about 70 s; `--stats` prints the plan,
`--check` fails if some character of the site text is not served from a file that has the glyph). Per face and weight (Serif 400/600,
Sans 400/500, the weights style.css and glyph-warmup.js use): `fontTools.varLib.instancer` at `wght` (names updated), then
`fontTools.subset` to woff2 (brotli), hinting off, name IDs 0–6, 13, 14 kept, default layout features kept (they include `kern`,
`palt`, `halt`, `chws`, `ccmp`, `locl`, `liga`, which the round-6 typography uses: `font-feature-settings: "palt"`,
`text-spacing-trim`). Dropping the vertical tables and features would save only 1 KB per file, so they stay.

Characters come from `public/{stories,summaries,effects,museum,data,search}`, `src/*.js|css` (this includes `src/i18n.js` and every
`T("…")` string) and `index.html`. On the site now: 3,766 distinct Han characters (+ 93 non-ASCII symbols, ASCII). Every Han character in
any text file under `public/`, `src/` and `index.html` is covered; 11 symbols (↩ ↺ ↻ ⊡ ⌃ ⌕ ▾ ◈ ⚄ ✧ ⤢) are not in the Noto fonts and come from
the system as before (the glyph-warmup symbol pass exists for them).

| tier | characters | what | Serif 400 / 600 | Sans 400 / 500 |
| --- | --- | --- | --- | --- |
| t1 | 1,245 (1,057 Han) | ASCII, all symbols, the interface's own characters, the first 1,000 of `stories/glyphs.json` (93.7 % of story text) | 200,300 / 203,348 | 156,536 / 158,700 |
| t2 | 2,443 Han | the rest of the 3,500 most frequent characters (glyphs.json to its end, then by frequency) | 482,596 / 490,348 | 372,948 / 379,484 |
| t3 | 266 Han | everything else the data can show (rare names, labels, search index) | 62,260 / 63,276 | 47,544 / 48,076 |

Total 2,665,416 bytes in 12 files (+ OFL.txt 10 KB). `src/fonts.css`: 115 KB, 11.6 KB gzipped (12 `@font-face`, `font-display: swap`,
disjoint `unicode-range` taken from each file's cmap; the tiers are written tier by tier so the two weights' equal lists sit side by
side). The tiers must stay **disjoint**: `document.fonts.load()` downloads every face whose range overlaps the text, so an overlapping
layout (a broad t2 declared first, t1 and t3 on top — it would shrink the css to 4.7 KB) fetched t2 for plain t1 text when tried. The
build resolves every site character the way a browser does and fails unless the file it lands in has the glyph.

## How the page uses them

* `index.html`: the Google request keeps only Newsreader; `src/fonts.css` is a normal (render-blocking, local, 11.6 KB gzipped)
  stylesheet before `style.css`; `noto-sans-sc-400-t1` and `noto-serif-sc-400-t1` are preloaded (`as=font`, `crossorigin`; no
  "preloaded but not used" warning in zh or en, 12 s after load). If a font file fails, the stacks in style.css fall back to PingFang SC /
  Microsoft YaHei / Source Han / Songti / SimSun as before. `style.css` is untouched.
* Paths: `src/fonts.css` uses `../fonts/…`, the layout of the built site (`scripts/build.mjs` copies `src/` to `dist/src/` and `public/`
  to `dist/`; `dev-sync.mjs` copies `public/fonts` to `dist/fonts`). The repository tree itself is not a servable layout (neither is it
  for `stories/…` etc.).
* `src/glyph-warmup.js` keeps its behaviour (faces, counts, order, `before` hook, `loadFontsWithin` waits of 150 / 600 ms,
  constrained path). Changed: comments (files/tiers instead of Google slices) and `fontsDeclared()` waits at most 4 s (was 10 s):
  the rules are declared by the blocking stylesheet before the module runs, so it returns at once; it stays as a guard (a failed
  `fonts.css` must not stall the warm-up). The counts map onto the tiers by design: 600–1,000 glyphs → tier 1 only (3 faces),
  3,000 glyphs → tier 1 + 2 (serif 400, the reading face). Tier 2 of the other faces and tier 3 are fetched when a story needs them,
  through the existing `docFontParts` / `mapFontParts` requests (same story/open numbers as before or better, see table).
* English: Han characters in the subtitle use the same faces; Newsreader is the only Google request left (about 130 KB). Not
  self-hosted: the user approved only the two Noto families; it needs its own download (variable roman + italic).

## Visual check (`verification/round6/fonts/`)

`before-*.png` / `after-*.png` at 1440×900 and 390×844 (DPR 2): reader (zh), archive, museum exhibit (`#museum=acidic_spores`), search
("古老"), plus `after-1440-reader-en.png`; `diff-*.png` marks pixels that differ by more than 40 in a channel (red). The same `src/`
snapshot served by `ab-serve` (scratch) for both; fonts report in `fonts-report.json` (Chrome DevTools `CSS.getPlatformFontsForNode`
over every element, plus the font requests of each scene).

* Text is pixel-identical: reader 1440 differs in 102 px (the play button), search in 0, museum in 143 (the 3D model), reader 390 in 182,
  search 390 in 0; the archive differs where the WebGL scene moves, not in the text.
* The Han text is drawn by the web faces: `Noto Serif SC` / `Noto Serif SC SemiBold` / `Noto Sans SC` / `Noto Sans SC Medium` (post-script
  names NotoSerifSC-Regular, …) with `isCustomFont` true, 4,084 glyphs on the 1440 reader page; in the unmodified copy the same
  glyphs are drawn by "Noto Sans SC Thin" / "Noto Serif SC ExtraLight" (Google's default-instance names) and 2 glyphs of the page by
  Microsoft YaHei (a slice that had not arrived). No tofu in any screenshot.
* After the change, local fonts still draw: Cascadia Mono / NSimSun (see risks), Cambria Math / Georgia / Segoe UI Symbol (the 11 symbols
  above and Latin of the fallback stack): identical in the unmodified copy.
* No `fonts.googleapis.com` / `fonts.gstatic.com` request for a Noto family remains: the only Google requests are the Newsreader CSS (1 KB)
  and its woff2 (132 KB). Console: no warning, error or failed request in zh or en (also on `dist/` after `dev-sync`).
* Checks: `node --test tests/*.test.mjs` 103/103, `node scripts/smoke.mjs` against `dist/` (dev-synced, port 4166) 15/15.

## Risks and follow-ups

1. **Text drift.** The ranges are a snapshot of the text. A character added later that is not in the fonts renders in the system CJK font
   (graceful, never tofu with the stack above) until `build-subsets.py` is re-run. Other agents are editing `src/` and the stories:
   the build run in this session already moved from 471 to 477 interface characters. Run `build-subsets.py --check` (a few seconds) before a
   release and re-run the build if it fails; the re-run rewrites 12 binary files (about 2.6 MB in git each time), so do it at release time, not per edit.
2. **Han text in the `--mono` stack falls back to the OS.** About 20 elements set Chinese in `var(--mono)` (`ui-monospace, "Cascadia Mono",
   Consolas, "SFMono-Regular", monospace`): the counters "307 份" / "74 篇 · 已读 1" and the museum eyebrow, count, `h3`, `small`, `summary`
   (NSimSun here; PingFang / Noto CJK elsewhere). To get the same Noto glyphs everywhere, add `"Noto Sans SC"` before `monospace` in the
   `--mono` line of `style.css` (not touched: another agent edits it). Latin stays in the mono font.
3. **Light pages pay for whole tiers.** A page showing one character from tier 2 downloads that face's whole tier-2 file (0.37–0.49 MB);
   Google's ~100 small slices were finer. Phone, no throttling, font transfer of archive / reader / museum: 1,540 / 2,390 / 2,019 KB (before:
   2,197 / 2,059 / 3,225 KB; the reader is the one scene that got larger). Throttled cold phone run: only the 4 tier-1 files (0.72 MB)
   arrive before `covers ready`. Possible savings, not done: one variable
   file per tier covering both weights (`wght` 400–600 / 400–500; est. −25 %, untested), or a smaller tier 1 on phones.
4. **`fonts.css` is render-blocking** (+80 ms first paint on the slow-4G emulation, none on desktop); making it non-blocking would bring
   back the round-5 race and a visible swap, so it was kept. Preloading `serif-400-t1` costs English readers 200 KB they only need later
   (the warm-up fetches it for them anyway).
5. Not measured: physical phones, other browsers (woff2 + `unicode-range` + `font-display: swap` are universal), GitHub Pages
   (it caches 10 minutes: after a release the new font files and css arrive together because `fonts.css` and the files share the release).
