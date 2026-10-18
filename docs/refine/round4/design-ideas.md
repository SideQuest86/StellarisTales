# Round 4 design ideas (explore only, no src/ changes)

Method: read HANDOFF "Current status", `docs/refine/progress-polish.md` (less-is-more: filler removed, transitions <= 0.2 s,
reduced-motion honoured). Walked the built site at 1600x900 and 390x844: archive -> story -> choice -> next chapter ->
specimen -> museum -> back via "Given by", an ending chapter, and the museum grid/detail. Screenshots in
`verification/round4/design/` (`d-*` desktop, `p-*` phone): `*-story1`, `*-vault0..1`, `*-vaultC*`,
`*-specimen-from-reader`, `*-ending`, `*-museum`.

## What the walk showed (facts, measured)
- Specimen award is already shown: `showSpecimenLinks()` (src/app.js ~1212) adds a small flat card above `.chapter-end`
  from `museum/by-doc.json` (244 docs, 163 of 1,388 stories). It is visible even before the choice is made, and is a
  plain 36 px thumbnail link (`.specimen-links`, src/style.css ~1006).
- Clicking it **closes the reader** (`showMuseum` -> `closeReader()`), so the reader is gone. The museum's "Given by"
  link then opens the story at its *first* chapter: `#story=site-asteroid-vault-1` instead of the awarding chapter
  (`ancrel.103`), although `acquisition[].from` holds exactly that doc id (src/museum.js 146-155, 259-260).
  Verified in both viewports.
- Endings: 526 chapters carry `chapter.ending` (label + note), rendered as a flat box (`.reading-ending`, app.js ~792). The
  route then simply stops: no path summary, no next step. Another 353 chapters lead into a different story and
  that jump happens silently (caption says "Leads into another story", then the left card and trail change).
- 7,752 of 8,809 chapters have an event picture (`chapter.image`), but only the *current* chapter shows it; the
  "continue" buttons (`edgeButton`, app.js 568) and map nodes are text-only. 7,220 chapters have choices; keyboard
  support is only `Esc` and `/` (app.js 1194); choices need Tab or a click.
- `st-progress` already stores `trail` (story, chapter, choice) and `visited` (src/progress.js); the museum never
  uses it.

## Ideas, ranked by value / risk (1 best)

### 1. Specimen round trip: stay in the story, deep-link to the exact chapter  [TOP 3, S]
- Experience: tapping the awarded specimen opens the museum; the museum shows a quiet "Back to <chapter>" and "Given by"
  entries open the *awarding chapter* (not the story start). Closing the museum returns to the chapter the reader left,
  at the same scroll and chosen option. Today the reader is lost and the way back is a long detour.
- Why: it makes the story <-> specimen relationship a loop instead of two dead ends; fixes a real navigation wound.
- Data: `public/museum/by-doc.json`, `public/museum/specimens.json` (`acquisition[].from` = doc id, `.story`),
  `st-progress` trail (src/progress.js) for the return.
- Sketch: museum.js `acquisitionHtml` adds `&chapter=${a.from}` to the href and `data-chapter`; the click handler
  (line ~259) sets `#story=..&chapter=..`. In app.js `showMuseum`, when `dossier` exists remember `{story,chapter}` in a
  module var and give `openMuseum({onClose})` a "back to story" action; use the already-persisted progress to reopen
  (`restoreProgress`). ~25 lines app.js, ~12 museum.js, i18n 1 string.
- Risk: low. No new storage; a11y: focus returns to the specimen link; bilingual: one string; reduced motion: none.

### 2. A quiet end-of-route moment with the path taken  [TOP 3, S/M]
- Experience: on a chapter with `ending` (or "This route ends here") the box gains a one-line recap
  ("4 documents - 2 choices - 1 specimen found") and three plain actions: View route on the map, Start over, Next
  story in this category (with its small art). The recap row uses the existing trail; specimens come from `by-doc`.
- Why: gives completion without trophies/lore; removes the dead end after 526 endings; reuses the end box instead of adding UI.
- Data: `chapter.ending`, `trail`, `visitedChapters`, `specimenMap`, story list order (`storyById`, next-story logic
  already behind the archive arrows), `story.image`.
- Sketch: extend the `reading-ending` / `reading-complete` branch (app.js 792-798) with a `routeSummary()` helper
  (~30 lines) and CSS in `reader-extras.css` (~20 lines); buttons reuse `#reading-restart`, `.chapter-directory-link`,
  and the same handler as `#next-story`.
- Risk: low-medium (copy must stay factual: counts only; zh/en both). No animation needed; keep rise-in 0.2 s.

### 3. Number keys for choices and next steps  [TOP 3, S]
- Experience: `1-9` expands the matching choice, `Enter`/`N` follows the single continue button, `B` goes back (the
  button exists). Small `1`/`2` index chips appear only on desktop `(pointer: fine)` and when a choice is focused,
  never on touch.
- Why: reading journeys are many repeated "choose -> continue"; today a keyboard reader must Tab through settings,
  tabs and effects panels. Fits the existing `/` shortcut and gives the site a calmer, book-like rhythm.
- Data: `[data-choice]` buttons, `.next-chapter`, `#reading-back` already in the DOM (app.js 1132-1190).
- Sketch: one keydown branch in app.js 1194 (~25 lines), ignoring inputs/selects and modifier keys, only when reader open
  and `!#search-dialog.open`; `aria-keyshortcuts` on the buttons. No new copy except an optional `title`.
- Risk: low. Must not fire while focus is in a select (reading pickers) and must not conflict with the music player.

### 4. Picture preview on "continue" buttons and map nodes  [S/M, strong candidate]
- Experience: each same-story continue button gets a small 56 px thumbnail of the target chapter's event picture; the map
  shows it as a tooltip on hover/focus. The reader sees where a choice leads before committing.
- Data: `chapter.image` (art/*.webp, 7,752 of 8,809 chapters), `docMap` for already-loaded story chapters; `srcset`
  logic already in app.js 833. Cross-story targets stay text-only (their JSON is not loaded: no extra fetch).
- Sketch: `edgeButton` adds `<img loading="lazy" width=56 height=56>` when `docMap.get(e.target)?.image`; CSS grid for the
  button (~15 lines); flow-surface hover optional (L part, skip first pass).
- Risk: medium-low: layout shift (give fixed size), duplicate images across exclusive outcomes, decoding cost in long groups
  (cap at 6 thumbnails).

### 5. Cross-story jump with a visible "from" breadcrumb  [M]
- Experience: following "Leads into another story" does a 200 ms crossfade of the left picture, and a chip
  "From: <previous story> <-" appears next to Back so the reader knows they changed stories and can return by one tap.
- Data: `trail` already records the story per step; `storyById` titles; `e.story` on next edges (353 chapters).
- Sketch: in `goChapter` (app.js 508) compare `data !== dossier`, set `chapterChanged` hint class; chip rendered in
  `.chapter-eyebrow` (~15 lines). Left-card crossfade reuses `.chapter-art` animation (style.css ~2067).
- Risk: medium: another trail corner (Back across stories already works); reduced-motion: no fade; i18n one string.

### 6. "Met in your reading" pip in the museum  [M]
- Experience: in the Grand Archive grid a tiny dot marks specimens whose awarding documents you have already read
  (never counts, no grey-out of the rest, no achievements); a filter chip "Met in reading" is optional.
- Data: `st-progress.visited` x `museum/by-doc.json` (inverse map built once) -> specimen keys.
- Sketch: museum.js builds a Set from `loadProgress().visited`; tile gets `.met` class (~20 lines + 6 CSS).
- Risk: low-medium: `visited` is capped at 2,000 and storage may fail (already tolerated); "met" is an inference, so
  label as "found in documents you have read".

### 7. Specimen card at the moment of award  [S]
- Experience: the specimen box shows the HD icon at 56 px in its rarity colour (same tokens as `.rarity-*` in
  museum.css) and appears right under the choice response, not under all choices, when the doc awards on that path.
- Data: `public/museum/img-hd/<key>.webp`, rarity in `specimens.json` (needs a lazily loaded small lookup, or add
  rarity to by-doc.json in the build script `scripts/extract-specimens.py`).
- Risk: medium: award is per document, not per choice (script data does not say which option awards it), so keep
  the current placement and only upgrade the card; do not claim the choice awarded it.

### 8. Archive card hover/focus: show the chapter count and a resume cue  [L, not recommended yet]
- Idea: a hovered or focused card shows "Continue - chapter 3 of 4" for stories in progress. Needs scene hit-test work
  (archive-scene.js raycast ~715) and a11y parity; value is lower than 1-4.

## Considered and rejected
- Music that changes by category: no data link between soundtrack tracks and stories; would be invented mood.
- Confetti/badges/"collection %" for specimens: decorative, contradicts the less-is-more principles.
- Full-page story transitions: perf risk at the measured 17-33 ms frames (HANDOFF frame-timing table).

## Recommended top 3 (low risk, to implement)
1. Specimen round trip and exact-chapter deep links (idea 1).
2. End-of-route recap + next actions (idea 2).
3. Number-key choice navigation (idea 3).
Next if time allows: idea 4 (continue-button thumbnails).
