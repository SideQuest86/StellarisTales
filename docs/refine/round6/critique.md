# Round 6 critique — fresh-eyes audit of live v4.10.0 (2026-10-25)

Method: Playwright (chrome, headless, software GL) on the live site at 1440x900, 1920x1080, 1280x720, 390x844, 360x780, 844x390, zh and en. Walked: first visit, four categories, nine stories (origin, anomaly, 120-chapter crisis, no-picture, random outcomes, ending, dialogue-like shroudwalker), choices, guide, effects, card + expanded map, search, Grand Archive (list, exhibit, 3D), player, language switch, reduced motion, throttled load, offline. Shots: `verification/round6/critique/` (file names below). GPU card and map-card timing are indicative only (software GL).

## 1. Verdict
1. The archive wall, the one-column selection panel, the reader's typeset page and the museum are at competition level; the system is coherent (teal/gold, serif display, ruled lists, 0.2 s ease-out motion).
2. What still reads as unfinished sits at the edges: developer text in reader copy, blank/placeholder states, a few overflows, and English that is still raw data (straight quotes, " - " dashes).
3. First five seconds: a beautiful wall and a story, but nothing says what the site is (the one-line description lives only in `<meta>`), and on integrated-GPU laptops a technical notice is the second thing read.
4. Drift is measurable: 8 border radii, three "box" recipes and three disclosure glyphs at the foot of every chapter, `--s-*` tokens used 4 times in style.css vs ~217 literal px spacings, icons drawn from three font families.
5. The list below is ordered by perceived quality; each fix is a few lines of CSS / markup / JS.

## 2. Improvements (ranked)
1. **Phone English museum overflows the viewport.** At 360/390/414 px EN, `#museum`, `.museum-head`, `.museum-grid` are 416 px wide: close x at 356-400 px (off-screen at 360), 3rd column cut ("Body of Captain N"). Shots `ph-360-en-museum-before.jpg`, `ph-390x844-en-museum.jpg`.
   - Where: `src/museum.css:8-9` (grid has rows but no column track, so the chip rail sizes the column).
   - Fix: `#museum{grid-template-columns:minmax(0,1fr)}` (injected live: head 0-360, close 300-344, `ph-360-en-museum-fixed.jpg`).
2. **Reviewer note with engine ids in the first story everyone opens.** "视界信号" shows a teal dashed box ("…akx.8000 … weight 4 of 20…"); shroudwalker shows "(enclave.410.b)" under a doubled "Reviewer note / Review note:". Shots `mo-open-t250.jpg`, `mo-lang-t150.jpg`, `rd-shroudwalker-divination-1440-en-1top.jpg`.
   - Where: `src/app.js:940`, `.review-note` `src/style.css:1533-1551`.
   - Fix: `<details class="review-note">` closed by default (summary = the 11px teal label, drop the in-text "Review note:" prefix), ids in `<code>`; box only when open.
3. **No-picture stories (~58) show a blank slab on the reader card; the archive slate is lettered in Chinese in the English UI.** Shots `noimg-en-reader.jpg`, `noimg-en-archive.jpg`, `rd-event-shroud-3200-1440-zh-1top.jpg`.
   - Where: `src/archive-scene.js:614-617` (else branch is a flat `#13262b` fill; `text`/`kicker` arrive unused, comment :620), `:427` (`title.zh||title.en`).
   - Fix: gradient from `TINTS[lane]` + kicker (11px caps, gold) + title on 2 lines (serif 600, ~0.2 x band height) centred in the band; hide the "Event image" pill when there is no art; slate title `story.title?.[lang]`, `coverKey` `title:${id}:${lang}`.
4. **Nothing tells a newcomer what this is.** `site.description` exists only in `index.html:8-12`. Shot `arch-1440-zh-6s.jpg`.
   - Where: `.selection` / `.selection-eyebrow` `src/style.css:371-395`, `#archive-hud` in `index.html`.
   - Fix: `<p class="lede" data-i18n="site.description">` (13px `--dim`, `max-width:var(--sel-measure)`) above the eyebrow, hidden once `st-seen` has an entry; make the string carry the hook ("1,388 readable, branching stories from Stellaris").
5. **GPU notice competes with the story on first load.** Amber 360 px card, technical text, top right, ~1 s after load for any integrated-GPU / software-GL browser (most laptops). Shots `arch-1440-zh-1s.jpg`, `ph-390x844-zh-archive.jpg`.
   - Where: `src/gpu.js:131-175`, `src/style.css:3497-3534`.
   - Fix: auto-collapse after 6 s to a 28px "i" chip (title = the text) in the player bar, or show only after the first story is closed; keep the dismiss memory.
6. **"-警告：具有挑战性的起源" is fused to the first sentence.** Hard Reset / Shackles excerpts read "-警告：具有挑战性的起源 与同化他们的…", and the reader's first paragraph starts with the same hyphen (20 zh strings start with "-"). Shots `arch-origins-zh.jpg`, `rd-origin_unplugged-1440-zh-1top.jpg`, `r1280-zh-reader.jpg`.
   - Where: `src/app.js:102-108` (`prose`), `:116`, `:202`, `:1564`; data `public/stories/excerpts.json`.
   - Fix: strip `^-\s*` in `prose()`; lift `^-?\s*警告[:：][^\n]*\n+` into a gold 11px tag line ("◇ 具有挑战性的起源") above the text; excerpts omit it.
7. **English is not typeset.** ~10k EN strings (1,121 stories) have straight apostrophes, 1,278 straight quote pairs, 1,675 spaced hyphens as dashes ("here - faint" in the very first excerpt), 1,990 "...". Shots `arch-1440-en-6s.jpg`, `ix-ark65-1440-en-3choice.jpg` ("can't"). zh has up to 22 "!", 38 "?", 16 ":" ASCII after Hanzi.
   - Where: `src/app.js:102-108` `prose()`; track titles `src/audio-player.js:84,225`.
   - Fix (EN, Newsreader has the glyphs): `.replace(/(\w)'(\w)/g,"$1’$2").replace(/(^|[\s(\[“—–])"/g,"$1“").replace(/"/g,"”").replace(/(^|[\s(\[“])'/g,"$1‘").replace(/'/g,"’").replace(/ - /g," – ").replace(/\.\.\./g,"…")`. ZH: `/([一-鿿”）])([!?:])/` to full-width, `...` to `……`. Player: ` - ` to ` – `.
8. **Three box recipes, three disclosure glyphs, eight radii.** `.fx` 6px radius + panel fill + thin ">" chevron (`effects-panel.css:2-9`); `.next-chapter/.ending-next` square, gold 25 % border (`style.css:1078-1089`); `.story-summary` square, `--line` border, native gold ▶/▼ (`style.css:1328-1345`, `app.js:958`); profile "▾" text glyph (`style.css:1447`). Radii: 0, 2, 3, 4, 6, 10, 999, 50 %. Shots `ix-end-1440-en-2end.jpg`, `guide-zh-top.jpg`.
   - Fix: one recipe `border:1px solid var(--line);border-radius:0;background:#0c1f2466;padding:16px 18px` for the three; `.story-summary summary{list-style:none}` + `::before` copied from `.fx-sum::before`; `.fx{border-radius:0}`; keep radii to 0 / 2 / 50 %.
9. **Museum: one-character orphan and misaligned filter rows.** zh 3D note ends on "定。" (shot `museum-1440-zh-3exhibit.jpg` 911,531); in EN row 2 (rarity) restarts at x=51 under the search box while row 1 tabs start at x=383 (`museum-1440-en-1list.jpg`); rows are cut hard under "258 specimens" (`museum-1440-zh-4exhibit-text.jpg`).
   - Where: `src/museum.css:182` `.museum-disclaimer`, `:61` `.museum-tools`, `:79-90` `.museum-grid`.
   - Fix: `.museum-disclaimer{text-wrap:balance}`; wrap both chip groups in one `display:flex;flex-direction:column` div; 14px top/bottom fade mask on `.museum-grid`.
10. **Map card slices nodes and captions mid-word.** "Cradl|e" box cut by the card edge; captions end "(on…", "not an as…". Shots `rd-the-shroud-1440-en-1top.jpg`, `rd-origin_unplugged-1440-en-1top.jpg`, `r1280-zh-reader.jpg`.
    - Where: `src/style.css:1939-1947` `.flow-viewport`; `src/flow-surface.js:98-101` (`fitLines` last-line branch).
    - Fix: `#flow-surface:not(.map-expanded) .flow-viewport{-webkit-mask:linear-gradient(90deg,transparent,#000 20px,#000 calc(100% - 20px),transparent),linear-gradient(transparent,#000 14px,#000 calc(100% - 14px),transparent);-webkit-mask-composite:source-in;mask-composite:intersect}`; in the last line back up to the previous space (Latin), strip `[\s(（\[,，;:—–-]+$` and any unmatched "(" before "…".
11. **Player strip: stray caret, mixed glyph families, clipped title.** `.playing-track button > span:last-child{margin-left:auto}` throws the ⌃ caret 180 px (1440) to 350 px (1920) from the title, so it reads as a stray "^"; ‹ › are Georgia 26px (`:2561`), ▶/II sans (`:2567`), ♫ ↻ ⌕ ◇ ⤢ fallback symbols; phone title "Faster Than Light - Feat. Mi…". Shots `arch-1440-zh-6s.jpg`, `ph-390x844-zh-archive.jpg`, `player-1440-zh-playlist.jpg`.
    - Where: `src/style.css:2544-2547`, `:2558-2570`; museum/search use the same Georgia glyph trick (`museum.css:57,65`, `style.css:2724`).
    - Fix: remove `margin-left:auto` (caret 8px after the text); one inline-SVG sprite (16px, stroke 1.5, `currentColor`) for caret, loop, list, search, expand, close; phone title may take 2 lines.
12. **Loading state: broken image + a live button.** Throttled load shows a broken-image icon with clipped alt text in the player and an active "展开故事" beside "载入中 / 01 / —". Shot `load-zh-t1500.jpg`.
    - Where: `index.html:128` (no `src` until `src/audio-player.js:78`), `style.css:2519-2524`, `.access` `:564`.
    - Fix: `#album-cover:not([src]){visibility:hidden}` on a `#0f2328` slot; `.access[disabled]{opacity:.35;pointer-events:none}` until `index.json` has arrived.
13. **Toolbar right edge sits 9-13 px inside the column rule.** "中文 / EN" is centred in a 44px button while Back is flush left and "Empire profile" flush right. Shot `rd-origin_unplugged-1440-en-1top.jpg` (text ends 1347, rule 1356).
    - Where: `#reader-language` `src/style.css:1336-1339`.
    - Fix: `padding:0;text-align:right` plus a `::before{inset:-10px -12px}` hit area like `.profile-toggle`.
14. **English eyebrow case.** `.chapter-eyebrow` ("Opening", "Trigger: A tradition") is tracked sentence case; every sibling label is uppercase (`.section-heading` `:989`, `.reader-subtitle` `:840`, archive eyebrow `:396`). Chapter title "The enclave" is lower-case in data.
    - Where: `src/style.css:815-820`.
    - Fix: `:root:lang(en) :is(.chapter-eyebrow,.review-note small){text-transform:uppercase}`; title-case the one title.
15. **CJK-Latin spacing exists only in the narrative.** `text-autospace:normal` is set on `.narrative p` only; cards, captions, choices, museum, search show "第360/720天", "1-6天" flush (9 data strings use an ASCII hyphen range) while the body shows "60 万年". Shot `rd-cetana-1440-zh-1top.jpg`.
    - Where: `src/style.css:879-880`.
    - Fix: move `text-autospace:normal;text-spacing-trim:space-first` to `:root` (inherited); in `prose()` zh: `/(\d)-(\d+\s*[天年月日])/g` to `$1–$2`.
16. **Guide reads as a link farm with glue spaces.** Hard Reset's guide has 128 chapter links in 1,623 characters, each gold-underlined; 31 carry an ASCII space beside a Hanzi ("路线以 我们是他们 结束局势"); heading "强制重置 /" keeps its slash; inline `01_start_of_game_effects.txt:4651`. Shots `guide-zh-top.jpg`, `guide-unplugged-1440-zh-open.jpg`.
    - Where: `src/guide-links.js:66-72`, `src/markdown.js:96-98`, `.guide-doc` `src/style.css:503-513`.
    - Fix: trim one space next to CJK / CJK punctuation when appending text pieces; `parts[1].replace(/\s*[\/／|·]+\s*$/,"")`; `.guide-doc{border-bottom-color:#c9b07a33}` (hover/focus stay gold).
17. **Search row: stray leading dot.** Untitled chapters render "· 佣兵城邦". Shot `search-1440-zh-2results.jpg`.
    - Where: `src/search.js:514`. Fix: `${title?esc(title)+" · ":""}<span>…`.
18. **"1 chapters" and a clipped "93 c…".** The map toolbar always pluralises; on landscape phones the counter is cut mid-word. Shots `noimg-en-reader.jpg`, `land-en-reader.jpg`.
    - Where: `src/i18n.js:192` (`archive.chapter1` already exists), `src/flow-surface.js:775`.
    - Fix: singular key for n=1; `@media (max-height:520px){.flow-stats{display:none}}`.
19. **Short laptops cut the excerpt to one line.** "…what appears to…" at 1280x720 with ~28 px spare. Shot `arch-1280-en-6s.jpg`.
    - Where: `src/style.css:3361-3364` (`-webkit-line-clamp:1`). Fix: clamp 2, `min-height:3.2em`.
20. **Phone: lone "Story map" link above the guide.** Right-aligned 13px dim text, no rule, duplicating the toolbar. Shot `ph-390x844-en-origin_unplugged-3end.jpg`.
    - Where: `.chapter-directory-link` `src/style.css:1321-1327`, `src/app.js:945`. Fix: hide it where the toolbar shows "Story map", else a full-width ruled row with an arrow.
21. **Card map type is the smallest on screen.** Node captions ~9-10px at the default 92 % zoom on the largest object of the left half. Shot `rd-origin_unplugged-1440-zh-1top.jpg`.
    - Where: `src/flow-surface.js` default fit. Fix: default zoom 1.0 and caption 11.5px when the card is >= 640 px wide (the expanded dialog already reads well).
22. **Naming drift + share previews.** zh 剧情图 (`i18n.js:134`) vs 剧情脉络 (`:74`) for one map, and the picture toggle 事件图 (`:136`) differs by one character; EN "Story map" x2 vs "Event image"; 文明纪事 = "Civilizations" while 银河轶事 = "Chronicles" (`:26-27`). No `og:title/description/image` in `index.html` (blank link previews).
    - Fix: one word per thing (剧情图; picture pill "插图 / Picture"; EN "Societies" / "Galactic tales"); add og/twitter meta with a cover image.

## 3. Already excellent — do not touch
- Archive scene, gold selected frame and the single-measure selection column (`--sel-measure` / `--sel-left`), open row, 01 / 307 counter, category bar fitting at 1280 EN.
- Reader page: zh justified + kinsoku + `.pb` gaps, EN Newsreader 19/1.66 with oldstyle numerals and `text-wrap:pretty`, hairline rule under the head, phone full-bleed art with the text first.
- Ruled choice list (diamond, filled when chosen, answer indented), random-outcome bracket with gold percentages, number-key hint, centred ending with the next-story card.
- Expanded map dialog (legend, box LOD, footer line, Esc handling) and overview; 0.18-0.26 s ease-out motion tokens; both reduced-motion paths (0 running animations verified).
- Museum plaque header, text tabs with rarity diamonds, exhibit effects table, 3D viewer + image toggle; search dialog (top anchored, 19px serif, gold focus rule, calm empty state).
- Self-hosted Noto subsets (consistent weights), contrast of body / UI text, per-story `document.title`, offline toast.
