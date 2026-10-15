# Fonts

All fonts load from Google Fonts CSS (unicode-range slices, `display=swap`, non-blocking `media=print` swap in index.html). No font files are stored in the repo.

| Role | Font | Licence | Source | Where used |
|---|---|---|---|---|
| Title + body, English | Newsreader (variable, opsz 6-72, 400/500/600, italic 400) | SIL OFL 1.1 | https://fonts.google.com/specimen/Newsreader | `--font-title`, `--font-body` when `lang=en`: brand, headings, reader text, guides, museum, playlist, search |
| Title + body, Chinese | Noto Serif SC (400/600) | SIL OFL 1.1 | https://fonts.google.com/noto/specimen/Noto+Serif+SC | `--font-title`, `--font-body` when `lang=zh` |
| UI, both languages | Noto Sans SC (400/500) | SIL OFL 1.1 | https://fonts.google.com/noto/specimen/Noto+Sans+SC | `--font-ui`: nav, buttons, labels, numbers |

Replaced: Source Serif 4 (OFL), dropped in favour of Newsreader (calmer, sharper humanist serif at reading sizes).

Anthropic Serif: a web search found no public licence for third-party web use; it is treated as proprietary and not used.

Fallbacks: `ST Serif Fallback` (Georgia, size-adjust 92%, measured Newsreader/Georgia = 0.917 at 19px) and `ST Sans Fallback` (Segoe UI/Helvetica/Arial, size-adjust 104%, measured Noto Sans SC/Segoe UI = 1.043). Measured layout shift while fonts load: 0.002-0.005 (limit 0.02).

Measure: `--measure` 36em ZH (about 35 CJK characters), 29em EN (about 70 characters), applied to reader paragraphs and dialogue. Line height 1.9 ZH / 1.64 EN.
