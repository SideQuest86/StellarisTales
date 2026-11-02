# Round 7 design audit (2026-10-26)

Six-lens audit of the current build (English reading, Chinese typography, immersion / system text, desktop and laptop
layout, phones, secondary surfaces) by Sonnet agents over 38 screenshots and the source, then three skeptical verifiers
(default: refuted) over every finding. 36 findings, 16 confirmed; the coordinator kept 12 and released them as v4.13.0.

## Applied (v4.13.0)

- English continuation conditions ("If the storm engulfs …") in italic serif under the card titles.
- Chinese voice lines in Kai (楷体) where English uses italics (section headings, scene line, route notes, panel titles,
  "Next story", map name, search notes, museum section line and view words, empire-profile toggle); Song where no Kai
  face is installed. CJK has no italic and `font-synthesis` is off, so these had become plain body text.
- Expanded story map: "Story map" in italics, the counter in sans (no spaced capitals, no code type); larger hint/key.
- 720 px laptops: the caption under the map card clears the player.
- Ending title: weight 500 / 24 px without tracking in English; Newsreader for its Latin letters in Chinese.
- English choice rows: 11 px padding, 1.55 line height (eight options no longer push the foot a screen down).
- Chinese counts join their measure word ("74篇"; the browser's CJK autospace adds the hairline); "故事导读（含剧透）",
  "审阅注释（非游戏原文）" instead of a spaced Latin middle dot.
- Search: no "1 chapter matches" when it repeats the story's length.
- One rule between a ruled list and the panel below it when nothing else ends the chapter.
- Guide: engine ids in code type without a chip; sub-heads 14 px with 0.04em tracking.
- Museum: "258 specimens" as an italic line.

## Not applied, and why

- Tighter English leading / bigger paragraph gaps: tuned in an earlier round; the claimed problem is not clear on screen.
- Smaller phone banner and toolbar: the picture is part of the immersion.
- Removing the museum's chip counts and spaced eyebrow: a catalogue's figures are useful; the eyebrow matches the
  archive's.
- Landscape-phone card rework (camera framing in archive-scene.js): risky for a rarely used layout.
- "Reduce motion" in gold: a hover artefact of the capture (computed colour at rest equals Search and EN / 中).

## Design panel (v4.13.1)

Four proposals (book typography, page-turn motion, reading focus, first impression), three judges. Built: the teaser's fade
(from first impression) and the pause with a gold tick under the title block (from typography). Not built: the small-caps
incipit (the Google-served Newsreader has no smcp: small-caps width equals normal; synthesis is off), the enlarged lead
paragraph (a chapter's text is usually one <p> with .pb gaps, so it would enlarge the whole chapter), the invitation line
(new interface text), the dimmed map card (presses on a deliberate decision), the page-turn JS (low fit).

## Round 2 (v4.14.0)

Same six lenses over the v4.13.3 build: 21 confirmed (3 duplicate pairs); 14 applied. The reader's toolbar on the masthead's
line (the masthead's wash keeps to the left half while reading); the expanded map's symbol key behind "?" at every size and
its status line gone; English paragraph breaks 0.8em; opening quotation marks hung in the margin (q-open); one closing rule
after an ending's next-story card; Chinese continuation conditions in Song; guide h4/h5 hierarchy; Chinese eyebrow and tab
tracking; a larger Chinese parallel title; the card caption without the chapter count; closer foot panels on phones; the
exhibit stage clear of its close button; the active exhibit as a glowing pedestal; '258 specimens' unseen (still spoken)
when nothing is filtered. Not applied: hiding the archive's lane arrows (they show the wall's spatial model), the caption
on the logo's edge (it belongs to the card), larger map node captions (needs the JS text fitting changed in step), search's
'Name' tag moved into the meta line, the dialogue-foot spacing rework.

## Round 3 and a review of round 2 (v4.14.1)

Review of b5051492..HEAD (four reviewers, three verifiers): 3 low findings fixed: the shown exhibit is announced
(aria-current) and underlined, not marked by colour alone; the teaser fades only when the clamp cut it (.is-clipped, set from
scrollHeight); the large-monitor --rz steps only under @supports (zoom). Audit round 3: 19 of 54 confirmed, one of impact 4;
nine applied: the reading column fades at the player as at the toolbar; the wordmark in Newsreader on the Chinese page; the
card caption as a quiet italic name; a larger English ending note; Kai lines at 0.02em and Chinese panel titles 16 px; lighter
guide sub-heads; the Chinese archive teaser at 16.5 px; the guide's language switch as an underlined line; legible exhibit
view words. Round 3's yield (one finding above impact 3) marks the polish as converged; further rounds were not run.

## First load (live, 2026-10-26)

Cold cache, 390x844. Fast 4G (9 Mbps, 60 ms, CPU x2): first story title at 1.6 s (zh) / 1.7 s (en), LCP 0.6 s. Slow mobile
(1.6 Mbps, 150 ms, CPU x4): title at 7.8 s / 8.4 s. The index is preloaded and arrives at 3.4 s; the title waits for
three.js (408 KB), because app.js imports archive-scene.js statically, while four CJK font files (700 KB) share the line.
Done in v4.15.0: archive-scene.js is imported dynamically (still modulepreloaded), so the selection text shows when the index
arrives and the wall joins after, catching up with the selection and an open story. Local, uncompressed: first title 20.1 s
-> 14.1 s (slow), 3.8 s -> 2.8 s (fast 4G). With three.js delayed 5 s the title shows at 0.2 s and a story link reads at once.

Live after v4.15.0 (same profiles): first title 4.1 s (zh) / 4.1 s (en) on slow mobile (was 7.8 / 8.4), 0.86 s / 0.87 s on fast
4G (was 1.6 / 1.7). Review of 80c5d15b..HEAD: one low finding, kept as a known limit: in Chrome below 128 (legacy zoom) a name
tooltip on a >= 1760 px monitor can sit off its word; WebKit and current Chrome / Firefox place it correctly (checked at 2560).

## Open states (v4.15.2)

Three lenses over states the audits never saw (opened profile, effects, playlist, GPU card, Chinese guide; phone museum,
search, expanded map), two verifiers: 6 confirmed, 4 applied (profile panel, playlist figures, Chinese guide headings, phone
disclaimer wrap) plus a heading-split fix found in the screenshots. Not applied: the opened GPU card's typography (an on-demand
technical notice that folds back), the Chinese search note 'slant' (it is the Kai face; font synthesis is off).

## First-visit journey (v4.15.3-v4.15.4)

Share card (public/share-card.jpg, 1200x630, scripts/share-card.mjs) and apple-touch-icon replace the soundtrack cover as
the link preview. A first visit was captured step by step (desktop en, phone zh; scratchpad journey.mjs) and walked by three
persona judges (competition judge, Chinese phone reader, English laptop reader) with two verifiers: 4 of 17 confirmed and
applied (Previous chapter label, map card bottom fade, map hint wording, search count nowrap); the rest were taste or ran
into deliberate decisions (counter, arrows, autoplay, rail centring, protected game text).

## Journey re-run on live v4.16.0 (v4.16.1)

Same three personas and two verifiers over a fresh live capture: 1 of 18 confirmed (the focus ring drawn around "Open story" after a
tap or click returns from the reader; now only after keyboard input, app.js returnFocus / .quiet-focus). Everything else was taste,
a repeat of earlier rejections or against deliberate decisions: the first-visit journey has converged.

## Sustained reading (v4.16.2)

One session captured on live v4.16.1 (scratchpad sustained.mjs: The Horizon Signal, four chapters page by page, a choice, Previous
chapter, close and resume, an ending and its next story; desktop en, phone zh) and walked by three personas (Chinese phone
commuter, English evening reader, book typographer) with two verifiers: 2 of 15 confirmed and applied (an ending's effects
below its next-story card; Previous chapter under a route's dead end), plus the coordinator's own: Continue reading without the
story's name twice. Not applied: hiding the arrow of a choice that unfolds nothing (once the ending follows the choices, the
turned arrow points at it), promoting Continue reading over Open story, the ending note's tone (project wording across every
ending; a content task), auto-scrolling an opened choice, guarding Start over.

## Ending notes (v4.17.0)

The sustained-reading judges called the ending note a ledger; 141 of 526 notes held script shorthand (ids, event numbers,
flags) in the closing position. Rewritten in the game's own names by six Haiku agents, verified by six Sonnet agents against the
evidence and the localisation, names checked by the coordinator: content/chronology/review/r8-ending-notes.md. The note's
typography was left as it is (commentary already set smaller and quieter than the text; restyling was judged taste).

## Continue-card captions (v4.17.1)

The same shorthand one level up: 179 captions under continue cards, investigation notes and origin openings; 149 rewritten with
the r8 method (content/chronology/review/r9-caption-shorthand.md).

## Chapter feet (v4.17.3)

A second sustained read (Cetana, scratchpad sustained2.mjs) showed the effects panel between a conversation's replies and its
"Continue the conversation" line. The effects and specimen panels now always follow .chapter-end (v4.16.2 did it for endings
only), which is also the order style.css's single-rule spacing expects: under continue cards the panel had drawn its own rule
17 px below the last card's (live vs local, horizon-signal akx.9315).

## Sustained reading, second story (v4.17.4)

The same three personas and two verifiers over a Cetana session (dialogues, optional encounters, a conversational ending; local
build of v4.17.3): 2 of 15 confirmed, each reported by all three personas: the investigations panel read as a quest tracker
(now the italic section voice, Kai in Chinese, note as an italic aside) and the centred "Continue the conversation" read as a
button (now on the replies' edge). Not applied: the effects count, the trail's Start over, restoring the scroll position on resume,
reveal motion after a choice.

## Journey on live v4.17.8; tablet portrait (v4.17.9)

The first-visit journey re-run on live v4.17.8 (three personas, two verifiers): 0 of 18 confirmed. A lens no round had used, tablet
portrait (768 x 1024, 820 x 1180, 1024 x 1366), found the opened card overlapping the reading column: frameCamera capped the
detail span at 11, so on aspects below about 1.1 the card took about 60 % of the width while the column starts at 46 % (overlap
63 / 91 / 94 px, 5 px on a square 1000 x 1000 window; the card clipped at the left). The cap is gone; portrait aspects (blended
from 0.9 to 1.3) draw the card a little smaller and higher. Measured (scratchpad card-fit.mjs, #flow-surface right edge against
the narrative's left): 38-41 px clear on the portrait sizes, 36 px on the square, every landscape size identical to before.

## Viewports and engines (v4.17.10)

A viewport sweep (scratchpad viewport-sweep.mjs: 14 sizes from 320 x 568 to 2560 x 1440, both languages; a page wider than the
screen, the selection off-screen, anything over the reading text by elementFromPoint) found nothing in Chrome or WebKit (Firefox
did not start on this machine). WebKit screenshots showed Chinese voice lines slanted: 17 kinds of element carry Chinese text in a
computed italic (zh-italic-probe.mjs); Chrome keeps them upright by font-synthesis: none, WebKit's fallback slanted them where no
Kai face exists. A rule now sets Chinese upright (:root:lang(zh) :not(:lang(en)):not(:has(> :lang(en)))), the soundtrack names
are marked lang="en" like the parallel title; probe: 0 italic Chinese elements, English italics unchanged in both engines.

Forced colors (v4.17.11, scratchpad forced-colors.mjs): text keeps its backplates and focus rings show (Highlight), but the
reading column lay over the visible wall once the darkening gradients were dropped; .reader-panel now takes Canvas there.

Short screens (v4.17.12, scratchpad archive-collide.mjs over 10 sizes from 568 x 320 to 932 x 430, both languages): the phone
layout's selection stack reached into the category rail at every height up to 400 px (the desktop short layout already dropped the
teaser; the phone one now does too, with a 24 px title, and below 340 px the eyebrow that repeats the rail's active tab), and the
short desktop layout's fixed card span let the card run 10-12 px off the left at aspects below 2 (now max(7.6, 15.5 / aspect),
unchanged from aspect 2.04 up). After: 0 of 20 problems; the card-fit sizes identical.

First paint (v4.17.13): the journey judges' 'blank slabs, then it pops in' was rejected for the wall's deliberate late load, but the
selected card's own cover did switch from its plain face to the art in one frame. refreshActiveCover now starts the frosted reveal
from a snapshot of the plain face when that tile first becomes ready (tier 0 -> 1) and no reveal is running; checked with the
cover delayed 2.5 s (scratchpad develop-probe.mjs): reveal 0 -> 1 over 1.1 s; none with reduced motion.

Wall covers (v4.17.14): the atlas records when a card's art first appears (cover-atlas.js shownAt; the hi tile replacing a lo one
keeps that time) and the wall passes the fade fraction where the shader took the tier (0 no art, 0..1 fading, the extracted
card 1/2 = full); frames keep coming until the last fade ends (fadingUntil). Measured on a first load (diagnostics fadingCovers,
sampled every 50 ms): cards mid-fade from 271 ms, up to 109 at once, none at the end; none with reduced motion. verify-gpu: all
tiers pass (idle draws nothing, the loop stops, breathing 171 / motion 169 fps discrete).

## Design panel 2 (v4.17.15)

Five angles (book designer, motion designer, competition judge, Chinese typographer, phone reading) proposed 10 enhancements, three
judges scored impact / fit / safety. Applied: choice hover only under (hover: hover) with an :active wash (sticky hover on touch);
Chinese card captions text-wrap: balance (pretty does not act on Chinese in Chrome 155: a 29 px last line became 169 px of 326);
text-spacing-trim: trim-start on Chinese paragraphs that open with a quote (the stroke on the column's edge); text-wrap: pretty
on Chinese paragraphs and replies (for engines that apply it to CJK). Not applied: a closing diamond under the text (the choice
rows below already open with one), the phone toolbar hiding on scroll (risk), the title and choice animations (fit).

Keyboard-only sustained read (live v4.17.15, both languages, scratchpad keyboard-read.mjs): opening a story, the next chapter and
Previous chapter each put focus on the chapter title (#reader-title), the new chapter starts at the top, the first choice is 3 Tabs
from the title, its number key opens it, the continue card is the next Tab, Escape returns focus to Open story with a visible ring;
the skip link reaches the selection from the masthead. No focus lost to <body>, no page errors. Nothing to change.

## Reading guides (v4.17.16)

The opt-in guides (1,389, "Reading guide · Spoilers") showed both languages on either page wherever a line's English half began with
an event number after " / " (splitMixed only accepted a letter there) and bold bilingual item titles stayed whole. Now a digit may
open the English half after the slash or after a Chinese full stop and space (the English-tail checks unchanged), and a bold lead is
split like a heading. Two-language blocks still shown whole: 361 -> 115 of 2,872 (scratchpad guide-split-stats.mjs; the rest have
English names inside the Chinese sentence). Noto Sans SC's ’ is a 0.42 em CJK form: English pages now take U+2018-201D from a
local() Latin face first ("ST Latin Quotes"): 7.5 -> 3.6 px in the guide link "I’m Through" (map labels share the face).

Guides, second pass (v4.17.17): detectLang now leaves script identifiers out (SCRIPT_ID: joined by _ or /, or a dot inside), so
273 Chinese lines dense with them were labelled English (hidden on the Chinese page, shown on the English one) and are now Chinese;
splitMixed no longer splits where the English half would be glued to a Chinese character, run into Chinese within 16 characters
(identifiers aside), or start with an identifier that ends the Chinese half before a slash. Against v4.17.16 over every guide line:
9,730 splits unchanged, 214 new, 154 moved to the real boundary, 68 wrong ones dropped (their 'English' was a fragment such as
"ASTRAL_SCAR_PROJECT→6001。"); two-language blocks shown whole: 79 of 2,878. Five guides ended with a stray </content> (an agent's
write artefact) visible in the downloaded Markdown: removed.

Reviewer notes (v4.17.18): rendered after .chapter-end with the other foot panels (style.css already treats details.review-note as
one of that family and spaces it under an empty chapter end), so the narrative is followed directly by the choices; order now
chapter-end > fx > specimens > review notes > guide. verify-reader-v4, verify-refine-reader, verify-round5 and smoke pass.

Review of 89126859..bce8486f (four focused reviewers, two verifiers): 2 confirmed, both in markdown.js and fixed in v4.17.19 (a bold
lead over a one-language body left the body unlabelled, so it showed on both pages; a quoted Chinese term early in an English half
blocked the split). A broader version of the second fix (quoted terms ignored in the tail's Chinese ratio) produced 481 wrong splits
and was reverted; final: 344 new or moved splits, none with Chinese in the English half; 78 of 2,878 two-language blocks whole.

## Phone toolbar margins (v4.17.20)

Fresh-eyes screenshots of the live site (scratchpad fresh-eyes.mjs: home, a short and a long chapter, 1440 / 390 / 820 px): on
phones the sticky .reader-toolbar's ground (and its ::before / ::after) covered only the column, while .chapter-art bleeds into
the 16 px gutters, so once scrolled the picture showed beside the bar. The bar now casts its --bg sideways (two offset box-shadows,
so the rule stays column-wide) and the masks run margin to margin. Brightest gutter pixel beside the bar at 390 x 844 (bar-gutter.mjs,
scrolled 40 and 110 px): 165 live -> 55 (the ground). Desktop and tablet are untouched (the rule sits in the max-width: 700px block).
Noted, not changed: on touch tablets the card's "Event image" / "Expand" buttons stay over the picture (deliberate: no hover there).

## Search excerpts (v4.17.21)

Fresh-eyes pass over the secondary screens (fresh-other.mjs: search, Grand Archive, a specimen, the expanded map; 1440 en and
390 zh). In search, a chapter row matched by its name showed the name as its excerpt right under the same title. Over 12 queries
(6 per language, top 8 rows each; scratchpad search-repeat.mjs), chapter rows whose excerpt only repeated their title: 21 of 39 en
and 30 of 36 zh live -> 0 and 0. contextSnippet (search.js) keeps the Name chip and shows the text's match, or the chapter's
opening when the words are only in the name; a name in the other language (it says why the row matched) is kept. The 2-line clamp
on .hit-snip never applied (.search-story small set display: block with higher specificity), so excerpts ran 3-5 lines: fixed.
makeSnippet starts at a sentence start inside its lead-in window (no ellipsis), else a word start, never on punctuation.
Museum, specimen and expanded-map screens: nothing to change.

## Guide name echoes (v4.17.22)

Fresh-eyes pass over the chapter's fold-out panels (fresh-panels.mjs: empire profile, gameplay effects, reading guide, an ending;
1440 en, 390 zh). The guides write a document as id + quoted title (`akx.9000 "The Horizon Signal"`, `distar.1031“灰蛊风暴”`) and
linkGuide turns the id into a link labelled with that title, so the reader showed the name twice. Source estimate (scratchpad
guide-dup.py, outside the review sections): 1,977 id + quote pairs whose quote is contained in the chapter's title, 448 other
quotes after an id (choices, dialogue: kept). dropEcho (guide-links.js, unit-tested) removes a quote that the link's label already
contains, before the closing-punctuation glue. Rendered check over six guides (guide-echo.mjs): echoes 6 of 52 en and 14 of 96 zh
links live -> 0 and 0. The reader toolbar's ground and masks now reach 4 px past the column on desktop (a rotated disclosure
chevron pokes 1.5 px out and left a speck beside the bar: brightest pixel there 517 -> 56); phones keep their 16 px version.

Guide echoes, mirror case (v4.17.23): an id right after the name the guide wrote for it. Source estimate (guide-dup2.py,
guide-dup3.py): of 1,383 ids alone in brackets, 680 follow their own title (499 plain, 114 quoted, 67 bold); 136 more open a
bracket with other notes ("“交织的喜悦”（336，组织者想留下）") and 57 follow a quoted name directly ("“超能限制”bio.66"). foldEchoes
(guide-links.js, unit-tested) makes the written name the link (the guide's own words), drops the id with its brackets when it stood
alone in them, else drops "id，" and keeps the note; a plain-text bold/italic name before the text node becomes the link in place
(a bilingual lead with language spans is left alone). Names match whole words in Latin and 2+ characters in Chinese (dropEcho now
uses the same rule: "Other" no longer matches inside "Reaching Into the Rift"). Rendered over eight guides (guide-echo2.mjs):
links 250 en / 277 zh before and after; links repeating the name written before them 11 / 30 -> 0 / 0.

Review of c8dca09b..1f7850a4 (v4.17.20-23; three focused Sonnet reviewers, one verifier; workflow stellaris-review-guides-search):
search and toolbar CSS clean; one confirmed in foldEchoes: when a bracket kept a note after the id, the bracket was rebuilt with
trimStart, so English lost the space before it ("“Reprise”(x)"). Fixed (trimEnd: the space before stays, a space after the bracket
goes) with two tests. Tablet card counter: .flow-stats was cut with an ellipsis where the card's map bar is narrow (stats-cut.mjs,
nine viewports x two languages: cut at 768x1024 and 820x1180, bar 323 / 345 px). .flow-surface-toolbar is now an inline-size
container and the card hides the counter under a 400 px content box (the English counter needs 394): cut 4 -> 0; still shown at
1024x1366 (431 px bar) and every wider size; the expanded map is unaffected. Touch seek knob: (hover: none) showed the #music-seek
thumb always, so at 0 it was a lone gold dot on the left edge above the player; paintSeek now marks the slider .started when its
value is above 0 and touch screens show the knob while .playing or .started (seek-dot.mjs at 390 x 844, brightest pixel at the
0 position: 535 -> 130, the hairline; at 30 % progress 535 both).
Archive CI had failed since v4.17.17 (bb7a65d2; the release checks watched only the publish workflow): its compile step found five
story files still embedding the stray </content> that v4.17.17 removed from their guides. The recompiled files are committed
(exactly those five change); RUNBOOK says story files embed their guides; the release check now reports the CI badge.

## Shared choice conditions (v4.17.25)

Fresh look at structurally unusual chapters (most choices: the Shroud utopia.3200, 49; most dialogue replies: Cetana
crisis.8060; most sections: the Shroud-Forged situation). describe() names every unnamed flag "earlier events", so 48 of the
Shroud's 49 boons each carried "Only when: earlier events", and conditions mixing several unnamed flags read as nonsense
("not earlier events or earlier events", "earlier events · not earlier events"). Two changes:
- renderChapter finds the most common named condition; when it covers every option (3+), or every option but at most one in
  four in a list of 6+, it is said once under the heading (.choices-when: "All of these appear only when: …" / "Unless marked,
  these appear only when: …") and the exceptions are marked ("Always shown", or their own condition).
- describe() keeps "not" for a single unnamed flag (variant tabs "earlier events" / "not earlier events" stay distinct) but drops
  it when a condition mixes several different unnamed flags (keyed by scope and name; flag atoms carry no key), so the
  alternatives collapse to "earlier events". Unit-tested.
Over the 540 chapters whose options are nearly all conditional or required (scan-cond.mjs / scan-cond2.mjs, in-page navigation):
per-option "Only when" lines 1,689 live -> 1,365 (zh 1,364), shared notes 24, exceptions marked 13, most repeats of one line in
a chapter 48 -> 9; notes naming "earlier events" twice 80 -> 24 (what remains pairs a condition with a separate requirement:
"Only when: earlier events · Requires: not earlier events"); no page errors.

Shared requirements and placeholders (v4.17.26): the v4.17.25 sharing now covers the "Requires: …" part too (shareOf, same
thresholds; a second .choices-when line "All of these require: …" / "Unless marked, these require: …"; exceptions without a
requirement say "Always available"). An option whose condition exists but has no readable name (describe() returns "") is an
exception that says nothing; v4.17.25 had marked such options "Always shown", which was untrue (13 -> 11 "Always shown" marks over
the 540 chapters). Grand Archive 4107: 15 repeated "Requires: not earlier events" -> one line; most repeats of a "Requires" line
in a chapter 15 -> 5. Rendered text pieces that are only "ERROR" (the game's scripted-text default for an unreachable case; 10
strings in five chapters: colony.2010/2011, grand_archive.4105-4107, e.g. "If: other conditions ERROR") are skipped with any
paragraph they leave empty (err-check.mjs: shown in 2 of 5 en / 5 of 5 zh chapters live -> 0 / 0; no empty paragraphs).

## Random-story inspection (v4.17.27)

Four Sonnet inspectors (workflow stellaris-inspect-random, brief scratchpad/audit/INSPECT.md) read 24 random stories, 58 chapters,
desktop/phone x English/Chinese, and reported 10 items; each was checked here before acting.
- Alternatives run together (storm situation; also seen in the Rift's astral_rift.5, 12 texts): 177 docs have several texts and
  no body; every sample checked is a set of alternatives (storm types, factions, hive/machine views, repeat visits). resolveBody
  now returns one passage per distinct text, so the reader shows one at a time with the existing version tabs; more than four
  unnamed versions read "Version 1 2 3 …" (.reading-tabs.compact; each button keeps "Version n" as its name). Test updated.
- One-language guide items on both pages (event-toxoids-499 "无后续。" on the English page): renderMarkdown gave every list item
  data-mixed and labelled only split ones, so 2,732 items carried no language. One-language items now carry their label; a guide
  with no body text in the page's language (the metadata list under the title aside) shows whole; a heading whose section has
  text only in the other language steps aside (data-empty-zh/en). guide-lang.mjs over two samples of 40 guides: visible items in
  the other language 50 en / 24 zh live -> 0 / 0; headings over nothing 0.
- "has_shroud_dlc）。" as a guide line's English (anomaly-electric-waters-cat): a half that opens with a script identifier no longer
  counts the identifier's letters as English (138 such fragments stay in their Chinese sentence). Found on the way: splitMixed took
  the first passing boundary, "…；d（灵性）→2064。  2062: a agrees …" split at "；"; a later boundary after a full stop now wins when it
  leaves less Chinese in the English half (37 lines; Chinese characters left in their English halves 120 -> 0; a citation line
  "来源 Sources：…（300 菜单 menu）…" keeps its split at the label). Over all 13,167 split lines (split-compare.mjs) nothing else moves.
- Look-alike guide links: about 670 guide lines per language link different chapters sharing one title ("The C.A.R.E
  Interactive Interface → The C.A.R.E Interactive Interface → …"); within a paragraph such links now keep the guide's own
  numbers (title in the tooltip). Eight guides (guide-alike.mjs): paragraphs with look-alike links 18 en / 20 zh -> 0.
- Effects panel repeats (arkship.1075 game text twice; precursor.1 "如果：已安装「远古遗物」资料片" twice): tidy() in effects-panel.js
  drops a plain line that only echoes a neighbour of another kind (a tooltip and the effect it describes; the tooltip keeps its
  "Game text" mark) or of the same script line, flattens an "if" inside an "if" on the same condition, merges adjacent same-
  condition "if" blocks, and shows the same effect from two script lines once with "×2" (two districts are two; random options
  and condition blocks are never merged). Over all 8,733 rendered panels: a full line repeated right after 293 -> 71 (the rest:
  random options with equal outcomes), 110 lines marked ×N.
- Not changed: one blank map card seen once (not reproduced); a 404 for a story without an effects file (console only, handled);
  game wording ("Cost a number of Alloys Monthly", three similar "Commune with the Insurmountable One" cards); a "DLC：" colon in
  a guide's English metadata.

Review of c8dca09b..ee43ec5c (v4.17.20-27; three Sonnet reviewers, verifiers; workflow stellaris-review-v4-17-27): markdown and
guide-links clean; four confirmed in reading/effects/app, all fixed in v4.17.28 (one more claim, same-label "if" blocks merged
across different stage conditions, was rejected: the panel never shows those conditions, so nothing differs on the page).
- resolveBody split composed descriptions: 10 of the 177 body-less multi-text docs carry a blank text or list lines (an intro, a
  separator, its items: shroud.3011/3012/3051/3056, situation.210/213, the Unplugged identity, action.41, pirate.2,
  grand_archive.6015). Those read in order again, blanks dropped; the other 167 stay one version at a time. Tests for both.
- tidy() dropped exact duplicates of any kind, so identical random options collapsed (three 33.3% options to one), and its echo
  rule treated two effects of one kind with one wording as a repeat when neither had a source line (d_minerals_3 and d_energy_3,
  'Adds the "+3" deposit'). Now: random options and condition blocks are never merged; identical single effects read "×N"
  (all 452 identical adjacent pairs carry no source line and come through scripted effects, e.g. two Primitive Dwellings); an
  echo is only a plain line of another kind (a game tooltip and its effect). Property check over all 10,367 effect lists: effects
  per kind (counting ×N) identical before and after tidy, random options 6,203 = 6,203; panels with a line repeated right after
  293 -> 84 (the rest are different effects or separate rolls with one wording); 353 lines marked ×N. Unit test added.
- "Always shown" / "Always available" could mark an option whose condition the empire profile had settled (visible true). Such
  a condition, like one without a readable name, now makes the shared line "Most of these appear only when: …" with no markers;
  "Unless marked, …" and the markers remain where every exception is an option without a condition or with its own named one.
  Over the 540 conditional chapters: per-option "Only when" lines 1,365, shared lines 27, "Always shown" marks 10, most repeats
  of one line 9; no page errors.

## Random-story inspection, round 2 (v4.17.29)

Same workflow, 24 new random stories (seed 99173), 64 chapters; 8 reports, each verified here.
- Look-alike continuation cards (site-asteroid-vault-1: 41 cards, 40 "Archaeological Sites · On failure · Leads into another
  story · 0%"): a random group's edges into another story are titled by that story (its chapters are not loaded) and 0.02%
  rounded to 0. collapseCross (app.js) turns 3+ edges of one group into the same other story into one card ("one of N
  chapters", combined chance); edgeFacts shows chances under 0.5% as "<1%". Corpus: 101 such groups, 1,977 cards fewer; 1,728
  edges showed "0%". Vault: 41 -> 4 cards.
- Rift name as text (rift-garden): an astral rift with no description had one section equal to its title; sections equal to
  the chapter title are skipped (40 chapters).
- Guide metadata line ("分类 Category：先驱者与考古 Precursors · DLC：《远古遗物》Ancient Relics", the first line of 1,353 guides) was
  labelled by letter count and showed both languages on one page. metaLine (markdown.js, unit-tested) splits it per segment:
  label and value word by word (identifiers, numbers, acronyms follow their neighbours; brackets recursively; "中文 / English"
  values at their slash; a value with no Chinese goes to both pages); a split that does not come out clean keeps the line whole
  (8 of 1,353).
- Phone guide overflow (site-omnirelic-site: "common/solar_system_initializers/ancient_relics_initializers.txt:642" ran off the
  screen): .md-guide wraps anywhere.
- splitMixed: an English half may open with a single quote (event-enclave-2 "'Deal' or 'No deal'."); an identifier followed by
  the Chinese stop before " / " stays in the Chinese half (site_fossilized_jellyfish_random_events。 / Failed rolls …). Against
  v4.17.28 over all guide lines: 46 moved, 3 new, no Chinese in any changed English half.
- Effects kind label repeating the line's first word ("领袖 领袖经验 +200"): omitted when the label opens with it.
- 40-guide sample (seed 23): other-language items 4 en (all in one Chinese-only guide shown whole) / 1 zh (an English-only
  category value), headings over nothing 0.
- Not changed: an empty reply after a choice that only leads on (marauder.506; the continuation follows the choices); a
  Chinese-only guide's text on the English page (shown whole on purpose).

Review of 0d63c3fc..b74b2ad0 (v4.17.29; workflow stellaris-review-v4-17-29): 7 confirmed, 0 rejected, all fixed in v4.17.30.
- collapseCross merged conditional edges with different conditions, flags and delays into one card built from the first edge
  (event-action-96 c1: "if no galaxy planet" shown for all three, galactic_market_founded never set). Now only edges with a
  chance and the same kind, condition, flags and delay merge.
- metaLine's word-by-word split failed on free-form lines in six ways (a stranded 」, "或 Biogenesis" lost, DLC names dropped
  from the Chinese side, ids moved to one side, repeated names, empty values). Replaced by a strict grammar: per segment
  "中文 English", "中文 / English", a Latin name (both pages) or Chinese alone (Chinese page), each optionally followed by a script
  id in brackets (kept on both); labels "分类 Category", "DLC" or Chinese alone; the review date dropped; anything else keeps the
  whole line. Over 1,353 lines: 1,235 split, 118 whole; an audit of every split finds no Chinese on the English side and no
  English word on the Chinese side that the English side lacks.
Inspection round 3 (24 random stories, seed 20261027, 83 chapters; desk-en found nothing):
- Bold "id name" in guides ("**2006 宗教狂热**", "**2007 军阀崛起**" with the title "军阀的崛起"; 170 in 40 guides) read
  "宗教狂热宗教狂热": foldNamed (guide-links.js) makes the guide's written name the link inside a bold element made of id-name pairs.
  Unbolded "id + Chinese" is not folded: of 1,700 such places most continue the sentence ("1050 有专属选项"). dropEcho also drops
  a bracketed name equal to the link ("12155（奥伏戎的愤怒）").
- Story-map labels filled with the open chapter's names ("这个名字" for other chapters' placeholders): flow-surface fills each
  label with the reviewed names of its own chapter (titles) or the chapter it comes from (options, links); app passes mapProse.
  Six stories' expanded maps (map-names.mjs): generic fillers 32 -> 0 in both languages.
- Version tabs mixing names and numbers (marauder.20: fifteen tabs) or more than nine: one "Version" picker (#passage-select,
  the reading-picker style; choosing a conditioned version adopts its condition as the tabs do).
- Not changed: the map card's top node partly under the card's fading edge (the card is a window onto a larger map); a 404 for
  the 195 stories without an effects file (console only; avoiding it would cost every session an index request).

Review of b74b2ad0..62159c1d (v4.17.30): 1 confirmed, 1 rejected. foldNamed folded the last id of a bold range
("**2030–2037 伦理变化**" tied the name to 2037 alone): a link that closes a range is left as it was (test added). Rejected: an
English page hiding a Chinese-only category value (the documented rule: nothing English to show).
Inspection round 4 (24 random stories, seed 4242027, 54 chapters; phone-zh found nothing): one actionable report. Eight mandate
chapters per language ended on "奖励：" / "Reward:" because the reward line is a $mandate_..._reward$ reference the game fills and
the archive leaves out; cleanRefs now drops a short label line (12 characters or fewer, ending in a colon) together with a
reference that was its whole content: exactly those 16 texts change (diff of cleanRefs over every text and section). Not
changed: the metadata line kept whole where it does not split cleanly; a title whose Chinese has a game-filled name shows no
subtitle (by design); the inline "If: …" badges of text variants when the empire profile is unset; the map card's clipped edge.
Rounds so far: 10, 8, 7 and 5 reports; confirmed defects falling (round 4: one).

Inspection round 5 (24 random stories, seed 55512027, 60 chapters; phone-zh found nothing): four reports.
- Map card top node cut (also reported in round 3): centerOn places the current chapter at 56% height, so the chapter above often
  sat under the card's 20 px top fade with its first line cut. On the card (not expanded) the view now moves down just enough to
  show that chapter whole when the current one still clears the bottom by 12 px (card-top.mjs, six cards at 1280 x 800: a node
  cut at the top 6 -> 2; in the other two the chapter above does not fit).
- Guide splits: "线性。 Linear." stayed whole (an English half needs 12 letters) and showed on the English page; a short English
  sentence after a Chinese full stop now splits too. "…luxury_limbs。 \"Multi-Limb Coordination\" …" put the script name in the
  English half: an identifier followed by a Chinese stop and a space (not only " / ") stays with the Chinese. Against v4.17.31
  over all guide lines: 95 new splits (Linear., See above., A single task.), 43 moved, no Chinese in any changed English half.
- Not changed: the 404 for stories without an effects file (console only).
Rounds so far: 10, 8, 7, 5 and 4 reports; confirmed defects 7, 6, 4, 1 and 3 (small).

Inspection round 6 (24 random stories, seed 66012027, 51 chapters):
- shroud.3070 showed four "若：其他条件" chips inline and a line justified across the column before each: renderBody numbers
  variants whose condition describe() cannot name ("情形一" … / "Case 1" …; named ones keep "If: …") and puts a variant longer
  than 40 characters on its own line (.variant-block): chips 情形一–四, four blocks, no stretched line.
- Guide fragment "has_distar）/ no DLC check …" as an English first bullet (anomaly-disco-* guides): idSlash accepts a closing
  bracket after the identifier before the slash (13 lines move, no Chinese in any English half); metaPair's slash form ignores
  script ids on the Chinese side, so the metadata line itself now splits ("DLC: no DLC check (…)").
- A Chinese-only guide shown whole on the English page (event-galactic-features-381) now carries one note, "This guide is
  written in Chinese only." (.md-lang-note; "这份导读只有英文。" the other way round); no toggle is offered there.
- Continuation cards sharing a title take the story's curated nodeLabels where present (on copies of the edges). The storm
  situation has none: its six "风暴袭来" cards are the game's titles, told apart by their captions.
- Not changed: an astral rift that opens with no text (data); one blank map card seen once; the 404 for stories without
  effects; a story change keeping the previous story's caption (not reproduced).
Rounds: reports 10, 8, 7, 5, 4, 8; confirmed and fixed 7, 6, 4, 1, 3, 4 (all small since round 4).

Review of 62159c1d..12f25286 (v4.17.31-33): both reviewers returned no findings. Inspection round 7 (24 random stories,
seed 77712027, 61 chapters): three actionable.
- Condition text was rendered raw (trader-enclaves leviathans.105: "Requires: Requires this Trader Enclave to have: £opinion£
  Opinion +50 · not … from the [enclave_country.GetName]."): every describe() output in the reader now goes through prose()
  (said(): icons dropped, names filled), and a requirement whose game label already starts with "Requires"/"需要" gets no second
  prefix. name-fill's English fallback for an unreviewed GetName names a descriptive scope ("the enclave country"; generic scopes
  root/from/this/prev/owner/target keep "this name"); texts still falling back to "this name": 1.
- A guide paragraph made of a Chinese line, its English line and more Chinese without blank lines (event-operation-5015) could
  not be split and showed the English sentence on the Chinese page: lines of different languages are grouped into their own
  paragraphs, each labelled.
- An English-only metadata line ("DLC：Shadows of the Shroud") takes English punctuation (no ideographs: "：" -> ": ").
- Not changed: a blank map card seen once (third such report, never reproduced); an empty reply after a choice that only leads
  on; the 404 for stories without an effects file.
Rounds: reports 10, 8, 7, 5, 4, 8, 7; confirmed and fixed 7, 6, 4, 1, 3, 4, 3.

Review of 12f25286..b6680826 (v4.17.34): 2 confirmed, 1 rejected. The English GetName fallback turned script scopes into prose
("the pre ftl planet", "the capital scope", "the fotd seperatist planet") and doubled a noun ("the planet [phaseshift_planet.GetName]"
-> "the planet the phaseshift planet"). Now only a scope whose last word is a plain noun (planet, system, leader, ruler, species,
country/empire -> "that empire", star, fleet, ship, scientist) gives a phrase, the bare noun after a possessive or determiner
("Our empire friends"); right after its own noun the name is left out; every other scope keeps "this name".

Inspection round 8 (24 random stories, seed 88812027, 64 chapters; phone-zh and desk-zh found nothing): one actionable.
describe() put "not" before negated tooltip sentences (operation.5040: "Requires: not We can only run one such secret enterprise
at a time."; 56 negated sentence labels in choice conditions). A sentence phrased as a constraint (can only, only if, must, cannot,
只能, 必须 …) now has no "not"; another negated sentence or a pronoun-led label keeps "not" with a lowered first letter (dropping it
would invert the meaning). Tests added. Not changed: map cards as windows (clipped edges, sparse cards), chapter-level continuation
cards, tech-name conditions, a title with a game-filled name and no subtitle. Rounds: confirmed 7, 6, 4, 1, 3, 4, 3, 1.

Review of v4.17.35-36 (two lenses, each finding verified): 6 confirmed. The English name fallback took its noun from the scope
whatever the getter (a star's or ruler's name read "the planet", "that empire"); an unknown scope after a noun read "the star
name"; £trigger_no£ labels ("Cannot be the Galactic Emperor") got a second "not"; title-case labels lost a capital ("not your
Ladder To The Sky"). Rendering all 957 affected strings then showed the larger defect: showExcerpt() filled the archive teaser
with the open chapter's names (usually none), so "this name", "the they" and "our the leader" appeared in teasers although 1,144 of
their 1,199 placeholders had reviewed wording in the story. The compiler now writes the teaser's names into excerpts.json (the
story files are unchanged); fallback hits in teasers 858 -> 0. The fallback now goes by getter and position (see RELEASE).
Regressions caught by the old/new render diff before release: "for you, the.", "Our name cloning", "the have become", "per 100
Telepaths" (a scripted fragment capitalised), "the productivity of people". A full old/new diff over 45,964 strings changed 84,
40 of them with reviewed wording (doubled spaces, "our the envoy", "not for sale,."; all improvements).
Inspection round 9 (24 random stories, seed 99912027): one actionable so far, the guide's unquoted "2735 真菌通讯" after its link read
"真菌通讯真菌通讯"; dropEcho now drops the label written out as a whole word or phrase. In the real page, 991 distinct teasers walked:
0 with a placeholder left (11 en / 4 zh ended on a name the 260-character cut went through; now trimmed). Not changed: the transient
blank map card, the 404 for stories without effects files. Rounds: confirmed 7, 6, 4, 1, 3, 4, 3, 1, 1.

Inspection round 9, last lens (phone-en): operation.1021's tabs read "not Gestalt Consciousness / Version 2 / Version 3". A census
of the 1,214 chapters with alternative texts showed mixed rows in 144 and "Version N" throughout; flags with no name ("earlier
events") also made tab labels. Tabs now come from reading.js passageTabs()/namedOnly(): own short names, one nameless as "Other",
otherwise numerals under "One of N tellings" (bare numbers read as pages); the name, when there is one, moves to the tooltip.
Clicking through the row found a worse defect: the handler forced index 0 after adopt(), so a text whose condition implies no fact
(several branches, an unnamed flag) could never be opened (estimated by script: 820 texts in 361 of the 1,190 chapters that have
tabs; operation.1021 tab 2 did nothing). pickPassage() now finds the picked text again after adopt(). Checked in the real page on
desk and phone, en and zh: 8 chapters, every tab tried opens its own text and shows pressed. The picker overflowed the phone column
(select 393-408 px in 358; the reader panel scrolled sideways and the gutter went): flex at a higher specificity, 358 px now.
Not changed: picking a named tab still sets the empire profile archive-wide, by design. Round 9 confirmed 2 in all.
Rounds: confirmed 7, 6, 4, 1, 3, 4, 3, 1, 2.

Review of v4.17.37-38 (three lenses, each finding verified): 4 confirmed, 2 rejected. "The the ruler" (an adjective's "…" and a title
merged after the article; 14 passages in envoy.220); GetRealName lost its scope noun; picker options identical where two texts share
their first words (unrest.4200, fallen_empires_tasks.2): options now start where the text parts from its neighbours; 7 negated labels
open with a negation (census of the 201 negated labels), and "Is NOT cloaked" / "Does not have …" / "未隐形" were missed: is_cloaked=no
with value false is the tooltip of that very condition, so no "not". Left: a body-part getter with no reviewed wording reads "this
name" (none reaches a chapter: all carry reviewed wording).
Inspection round 10 (24 random stories, seed 10112027, 107 chapters; phone-zh and desk-zh found nothing). Triage: the blank map card
reproduces at about 1.2 s and fills by about 3 s: the card's flight, the map fades in once it rests (#flow-surface.card-ready), by
design, not a defect. Reported h1 mismatch after a cross-story link: not reproduced (the hidden archive title was read). 404 for
stories without effects, chapter dead ends that are story ends, a title with a filled name and no subtitle: known. The English page's
"This guide is written in Chinese only" is real: the site's own test over all 1,389 guides finds 12 Chinese-only, 78 with a section
without English, 38 with a section without Chinese; next release. Rounds: confirmed 7, 6, 4, 1, 3, 4, 3, 1, 2, 1.

Guide languages. Census by the site's own test (guideElement over all 1,389 guides): 12 Chinese-only, 78 with a section without English,
38 with a section without Chinese. Six Haiku agents translated in private folders (st-agents/guides-1..6; not review-copies.py, which
would delete the fragments a guide-only copy lacks, and copies the art and audio). They reported that many assigned sections were
already bilingual inline: the census was showing a renderer defect, not missing text. detectLang read a Chinese sentence with long
English names as English ("Hired Guns 报酬更高。", "Cosmic Storms DLC；每国一次。"); splitMixed missed "见上。See above.", one line holding two
pairs ("中文。 / English. 中文。/ English."), a three-word English name in the Chinese half, a slash after a closing quote, and a list item's
line break. Fixed, and the agents' duplicates of those sections refused: after the fix 77 guides had real gaps. Merged by guide-merge.py,
section by section, only where the test still found a gap, every original line kept, the addition in the missing language only: 149
sections in 76 guides. Name check: 95 quoted names against the game's strings, 3 corrected by hand ("Study Dimensional Rifts",
"Intriguing", "Gray Tempest"); the other 14 reported differences were my sample's cut. Eight preftl guides had Chinese inside their English
half (pool names): now English. Result: 0 Chinese-only, 0 sections missing either language. Wrong-language blocks by an old/new render
of every guide: 129 -> 67, 3 newly (labels inside a Chinese half), the rest mostly metadata lines. A test caught a regression before
release: loosening the English-name guard split a two-pair line at its last pair only; pairs are now tried first.
Tables: renderMarkdown had none, so 4 guides (26 rows) showed "| --- | --- |". Now tables, each cell split by language (short halves:
"停止实验 / halted", "轰炸 Bombardment (6)"); event-colony-fed-100's five ending names gained the game's English titles. Checked in the real
page, desk and phone, en and zh: no raw pipes, no blank cell, no sideways scroll. A hidden half's margin indented the first line of
every bilingual line on the other page: removed. Rounds: confirmed 7, 6, 4, 1, 3, 4, 3, 1, 2, 1.

Review of v4.17.40 (renderer, and at least 40 of the new translated lines against their source; each finding verified): 6 confirmed. One
regression of mine: splitting a line pair by pair cut Chinese words out of an English sentence (situation-voidworm-country-situation:
"不确定冻结虫 (…) and 破坏"): every Chinese half must now end as a sentence. English-first lines ("… windows. / 宝藏猎人…。") now split. "需要 Cosmic
Storms DLC。" no longer splits at the name. The first form of that guard (any half ending in 。) swallowed 15 first-contact lines whose
English ended "weight 2。": narrowed to five words with no slash, and the typo fixed in 14 guides (wrong-language blocks 67 -> 64). Names: a
sweep of every id-named chapter in the 86 changed guides gave 78 reports, nearly all on English that predates the translation; by hand, 7
names changed in 5 guides.
Inspection round 11 (24 random stories, seed 11112027, 61 chapters), all four lenses reported. Confirmed 4: situations showed their
`sections` (stage and approach names, difficulty levels) as bare paragraphs: seen independently on desk-en and phone-zh; 94 situations, 858
sections. They move to a foot panel; anomaly, site and project sections are prose and stay. "其的" from [X.GetHerHis]的 (147 texts with that
pattern). Map label "特种行动成败" beside "特别行动" titles. "Reviewer note · not game text" read as a system message on 599 chapters: "Editor's
note". Also the recurring report of a missing subtitle: titles with a filled name (759 chapters) now get one, in the reviewed wording,
unless it would be "this name" or a fragment; 27 sampled in both languages read well. The 503 on music/cover.webp in the v4.17.40 live
smoke was transient (200 three times after). Rounds: confirmed 7, 6, 4, 1, 3, 4, 3, 1, 2, 1, 4.

Inspection round 12 (24 random stories, seed 12112027, 67 chapters; phone-en found nothing). Confirmed 5. A reply repeating its line in the
effects panel (fedel.2: a choice's game tooltip is also its effect, kind "tooltip"; withoutSaid() drops it from that list). The picker
labels of v4.17.39 started inside the shared phrase ("…心思。"): reading.js partingWords() starts at the sentence where the texts part.
Same-title cards: bio.3305 "信号传输接入" twice, leading to different chapters; the archive has 606 such groups and 169 are covered by the
map's labels, so the rest now get a quiet line of the chapter's words from the same helper (cards only; the map keeps its labels). The
guide's metadata line stayed whole in both languages for 111 guides: metaPair now takes an initialism in a Chinese name, a Chinese name
with brackets then its English, two names joined by " / ", and a Chinese note after a name; 1,242 -> 1,325 of 1,353 split, none of the
1,242 changed, 0 suspicious by a language check of the new 83; the remaining 28 mix both languages in one note and stay whole. Two guides
quoted the option 该死！ where the game has 可恶！. A test caught an unbalanced bracket in the new rule ("备注（仅此分支 only this branch）").
Not defects: a hover tooltip open in a screenshot over a choice's sub-lines (it follows the pointer); map cards cut at the card's edge (a
window). The v4.17.41 live smoke passed 15/15, so the earlier 503 was transient. Rounds: confirmed 7, 6, 4, 1, 3, 4, 3, 1, 2, 1, 4, 5.

Inspection round 13 (24 random stories, seed 13112027, 57 chapters): no new reader-facing defect (the 404 for the 195 stories without an
effects file, the card's flight, a curated map label, a card mid-flight). The 404 was reported in every round, so the build now writes an
empty effects file for those stories: 13 stories opened, no failed request, no console error.
Inspection round 14 (seed 14112027, 58 chapters; desk-zh and phone-en found nothing). Confirmed 4: "after about 1 days"; two pieces of one
paragraph joined without a space ("abandoned.Come now", shroud.12060); a caption ending in its card's title ("阶段检定失败时随机：食物中毒"
under 食物中毒; case-insensitive for English); "条件：此前经历" on fedev.605's cards: said() now leaves out flags with no name (namedOnly), so
a condition made only of them goes unsaid, as describe() already did for any unnamed alternative (8 stories, both languages: 0 left).
Review of v4.17.41-42 (two lenses, each verified): 4 confirmed, 2 rejected. partingWords cut English mid-word ("…on the su…"); situation
labels kept "()" where prose() removed an icon and a count (prose() now drops empty brackets); metaPair's note rule kept a quoted English
name on the Chinese side and dropped it from the English (5 colony chains: now "(Feral Behavior)" on the English page); the English-first
split left "已解决" in the English half. Wrong-language blocks in guides 64 -> 36. Rounds: confirmed 7, 6, 4, 1, 3, 4, 3, 1, 2, 1, 4, 5, 0, 4.

Inspection round 15 (24 random stories, seed 15112027, 78 chapters; phone-zh and phone-en found nothing). Confirmed 3. artisan-troupe opened
on leviathans.301, a reply whose one choice ends the branch, while its first contact (leviathans.295, 68 chapters below it) was reachable
only through the map: the configured start (leviathans.290) is not a chapter, so the first tree entry was used. A census found 16 stories
opening on a leaf while a root entry leads on; story_tree.py now opens on the first entry that leads on unless a family configures its
start, and takes the teaser from it: 11 stories changed (5 keep a configured start). leviathans.300/304 showed "我们想委托创作一件艺术品。"
twice: the game has two variants of option a (same key and words, different triggers); resolveChoices() now joins them (either trigger;
the first's index for effects). The map node read "after 1 days" (flow-surface delayCaption; v4.17.43 fixed only the cards) and wrapped
between the number and the unit: singular forms and a no-break space. Not defects: the map card of event-enclave-27 (one node, shown once the
card rests), the map's faint bottom row and the card edge, a 12 px scrollWidth excess in the reading column with no visible clipping.
Rounds: confirmed 7, 6, 4, 1, 3, 4, 3, 1, 2, 1, 4, 5, 0, 4, 3.

Inspection round 16 (24 random stories, seed 16112027, 56 chapters; desk-en, desk-zh and phone-zh found nothing). Confirmed 2, both on
phone-en. The group panel of a parallel investigation (cybrex "Following the traces") listed ten cards titled "Signs of Precursor
Activity": it used the bare title where the continue cards use the map's curated labels; it now takes the label for members that share a
title and, for those without one, the parting words (sameTitleHints, shared with nothing else). Seven of the ten have the same game text,
so the words alone could not tell them apart: the labels do (10 distinct, desk and phone, both languages). zh "间谍首脑这位领袖": 间谍首脑
joins the titles that carry a filled-in name. Rounds: confirmed 7, 6, 4, 1, 3, 4, 3, 1, 2, 1, 4, 5, 0, 4, 3, 2.

Inspection round 17 (24 random stories, seed 17112027, 64 chapters; desk-en and phone-zh found nothing). Confirmed 1, in the opt-in guide:
"6170 *The Final Gift*" read "The Final Gift The Final Gift" (origin_fear_of_the_dark): the id became a link titled with its chapter and
the italic name after it was another element, which dropEcho (text only) never saw. linkGuide now folds an emphasized name that repeats
its link into the link. 29 guides write an id then an emphasized name: 954 links, 0 echoes left in either language. Not defects: a map node
at the card's edge (a window); the "Case 1" / "If: not Robot empire" badges before a variant line (the archive's way of showing the game's
alternatives; they open the reading for that case); the guide's "aid request" before a linked title and a bracket that closes on the
next line. Rounds: confirmed 7, 6, 4, 1, 3, 4, 3, 1, 2, 1, 4, 5, 0, 4, 3, 2, 1.
