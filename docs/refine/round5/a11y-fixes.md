# Round 5 accessibility fixes (companion to a11y-audit.md)

Verified with `scripts/verify-a11y.mjs` (new section 6/7 + forced-colors block, zh and en, 1440 / 390 / forced colors),
smoke 15/15, refine-chrome, refine-audio, museum-viewer, gpu, `node --test tests/*.test.mjs` 103/103.
Screenshots after: `verification/round5/a11y/after-{archive,reader}-{1440,390}.png` (look unchanged).

| # | Finding | Fix | File |
|---|---------|-----|------|
| 1 | `#search-open` unnamed on phones | `data-i18n-aria="header.search"` + aria-label | index.html |
| 2 | Unnamed canvas tab stop | Kept as tab stop (arrows/Enter are handled on the canvas only, not the document); `role=group` + `aria-label` from existing `scene.label` (already mentions arrows/Enter), refreshed on `lang` change | archive-scene.js |
| 3 | CJK in English page lacks `lang` | `markCJK()` wraps Chinese runs in `<span lang="zh-CN">` in guides/review (en only); `applyStaticText` sets `lang=zh-CN` on CJK `data-i18n` text without an aria-label | markdown.js, i18n.js |
| 4 | `.key-other` 3.86:1 | `#7d9a96` (6.1:1 on #08151a) | style.css |
| 5 | `.track-version` 3.91:1 | opacity .62 to .85 | style.css |
| 6 | Targets < 24px | phone `.header-actions button{min-width:44px}`, `.brand{min-height:24px}`, `#reader-language{min-width:44px;padding:0 8px}` | style.css |
| 7 | Range 3px hit area, no value text | `height:24px` (native track unchanged); `aria-valuetext` "1:23 / 6:40" on timeupdate, metadata, input | style.css, audio-player.js |
| 8 | Forced colors | pressed chips/toggles outlined `Highlight` (+ underline on museum chips); exhibit focus/active outline | museum.css, style.css |
| 9 | `.flow-viewport` roledescription without role | `role="group"` | flow-surface.js |
| 10 | Exhibit panel double announcement | removed `aria-live`; panel `aria-label` = specimen name | museum.js |
| 11 | aria-controls | `#playlist-toggle aria-controls=playlist` only | index.html |
| 12 | Heading order | `h2#dossier-title` to `p#dossier-title` (CSS updated); reader now starts with h1 | index.html, style.css |
| 13 | Skip link text | new key `archive.skip` ("跳到故事选择" / "Skip to story selection") | index.html, i18n.js |
| 14 | Pager not announced | `aria-live="polite"` on `#search-page` | index.html |
| 15 | Summary/download link < 24px | `min-height:24px` on `.story-summary summary` and `a` | style.css |

## Deliberately left
- `#reader-language` has no `lang`: its accessible name is the aria-label in the page language ("Switch to Chinese"), so
  marking the element zh-CN would mislabel the name. (Visible "中文" vs name is a pre-existing 2.5.3 nuance.)
- Choice toggles and profile panel `aria-controls`, Esc-closes-panel-first: need ids and keydown logic in app.js (lead's file).
- Guide headings still start at h3 (`markdown.js`): `tests/markdown.test.mjs`, verify-round5 and verify-refine-reader assert h3-h5.
- `.flow-key` legend is `aria-hidden` (decorative key); forced-colors cue for line styles not added.
- `#categories` strip scrolling (finding 16): observation only. Hidden archive `h1` unchanged (inert).
- `dist/` was refreshed via `dev-sync`; nothing committed.
