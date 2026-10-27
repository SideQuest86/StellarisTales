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
