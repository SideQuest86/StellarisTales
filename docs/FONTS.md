# Fonts

The Chinese faces are self-hosted (since round 6, 2026-10-25): 12 subset woff2 files in `public/fonts/` (2.66 MB in all; three disjoint `unicode-range` tiers per face and weight, `font-display: swap`), declared in `src/fonts.css` (linked first in index.html; urls `../fonts/*`), built by `scripts/fonts/build-subsets.py` (`--check` fails when site text has characters the build does not cover; re-run the build after changing story, summary, effect or museum text). Sources, hashes, tier sizes and measurements: docs/refine/round6/fonts.md; licence text: `public/fonts/OFL.txt`. Newsreader (English reading text) still loads from Google Fonts CSS (non-blocking `media=print` swap in index.html).

| Role | Font | Licence | Source | Where used |
|---|---|---|---|---|
| Title + body, English | Newsreader (variable, opsz 6-72, wght 400-600, roman + italic), self-hosted (public/fonts/newsreader-*.woff2, src/newsreader.css; built from github.com/productiontype/Newsreader v1.003 by st-tools/subset-newsreader.py: Latin-1, general punctuation, arrows and math signs; 95 + 105 KB) | SIL OFL 1.1 (public/fonts/OFL-Newsreader.txt) | https://github.com/productiontype/Newsreader | `--font-title`, `--font-body` when `lang=en`: brand, headings, reader text, guides, museum, playlist, search |
| Title + body, Chinese | Noto Serif SC (400/600), self-hosted subset | SIL OFL 1.1 | https://github.com/google/fonts/tree/main/ofl/notoserifsc | `--font-title`, `--font-body` when `lang=zh` |
| UI, both languages | Noto Sans SC (400/500), self-hosted subset | SIL OFL 1.1 | https://github.com/google/fonts/tree/main/ofl/notosanssc | `--font-ui`: nav, buttons, labels, numbers |

Replaced: Source Serif 4 (OFL), dropped in favour of Newsreader (calmer, sharper humanist serif at reading sizes).

Anthropic Serif: a web search found no public licence for third-party web use; it is treated as proprietary and not used.

Fallbacks: `ST Serif Fallback` (Georgia, size-adjust 92%, measured Newsreader/Georgia = 0.917 at 19px) and `ST Sans Fallback` (Segoe UI/Helvetica/Arial, size-adjust 104%, measured Noto Sans SC/Segoe UI = 1.043). Measured layout shift while fonts load: 0.002-0.005 (limit 0.02).

Measure: `--measure` 36em ZH (about 35 CJK characters), 29em EN (about 70 characters), applied to reader paragraphs and dialogue. Line height 1.9 ZH / 1.64 EN.
