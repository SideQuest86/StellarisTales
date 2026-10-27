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
