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
