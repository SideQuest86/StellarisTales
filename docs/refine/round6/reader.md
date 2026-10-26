# Round 6 — reader journey (choices, continue cards, ending, head, composition)

Screenshots: `verification/round6/reader/<scene>-before|after.jpg` (1440x900 / 1920x1080 / 390x844, zh + en). Scenes: `ark65-*`
(22 choices, random outcomes), `ark70-en` (version tabs), `unplugged-*` (ending + next story), `cross-*` (crossing stories),
`barr186-zh` (conditions), `treasure8245-*` (pickers), `outpost1030-zh`, `shroud3200-*`, `ast3088-zh`, `reply-*`.

## Critique (what an editor sees on the "before" pages)
1. Boxes in boxes in boxes: bordered choice -> tinted reply panel -> bronze outcome box -> cards with a left rule. On a phone
   the text lived in a 250 px strip; the page read as a form, not a book.
2. Annotation noise: "仅在以下情形出现：其他条件 或 其他条件" under 20 of 22 options (ark65), whole walls of repeated branches with
   engine keys ("is individual machine") on barr186, version tabs all reading "其他条件 / earlier events x4". None of it names anything.
3. Cards: title and caption crowded; a caption-less card showed a lone "→" on its own line; four sibling outcomes each repeated
   "约 0–30 天后"; the chance (which the map shows) was missing because the edge kind is "option".
4. Duplicates: a choice's answer repeated the cards the "故事继续" section already lists; an ending chapter showed the ending block
   (and the next-story card) twice (once in the choice's answer); "选择一个回应" under a heading that already says so.
5. Head: Back / Start over / "← From <story>" shared one flex row with the caption; on a phone it wrapped to 4 ragged lines.
   Toolbar was 90 % opaque: scrolled text ghosted through it.
6. Pickers were bordered form rows with a rule under each; the two stacked. The note under a picker repeated the picker's word.
7. Composition: the column was left-aligned in its half (EN measure 551 px vs choices 680 px: edges disagreed); the story title under
   the left card sat on the archive's shelves.

## Changes
- **Choices**: a ruled list in the text's own column (`--col`, = the measure; centred in the right half when there is room). Diamond,
  option, arrow; hover wash bleeds 10 px past the rules; chosen = filled diamond + gold rule + the arrow turns down; the answer is
  indented to the option's words. Number-key hint now replaces the arrow (was a chip over the border).
- **Answers**: speech keeps its gold rule; game tooltips become quiet asides (no boxes); a branch with nothing to add says nothing
  (was "Choose a response" / a copy of the ending block / the dialogue status).
- **Conditions** (`reading.js describe`): only named conditions are shown; unnamed atoms drop out, an unnamed alternative means "say
  nothing"; repeated / absorbed alternatives collapse; > 3 end with "等 / …"; engine keys never in Chinese. `fallback` keeps the old
  label only for the in-text "若：…" button. Version tabs numbered ("版本 N") unless they have their own name. Unit test added.
- **Cards**: title over caption, optional chance figure ("20%", gold, tabular), picture, arrow (↗ when it leaves for another story).
  Outcomes of one random group = one bronze bracket, a lead line that says the shared delay once, and a ledger. Pictures sit at the right
  so titles share one left edge; bigger in "故事继续". The chance of a random outcome now shows whatever the edge kind.
- **De-duplication** (`app.js renderChapter`): cards the continuation already lists are not repeated under a choice; when every choice
  leads to the identical set (125 chapters, e.g. ast3088), it is listed once in the continuation. ark65's 22 options really differ
  (chance per pilot), so they stay per option, now with their chances.
- **Ending**: centred like a last page (short rule, name, note), then the next story as its own card (kicker, title, cover).
- **Head**: `.reader-trail` (Back, From <story>, Start over) in the band above the eyebrow, no layout shift, one line on phones.
  Toolbar is solid with a fade below its rule.
- **Tabs / pickers / headings**: tabs are words with an underline; pickers inline, underline + caret, side by side; section-heading
  rule fades out. The picker's duplicate note shows only for labels too long for the select.
- **Left card**: dark pool under the story title; card, caption and column kept; the column is centred in the right half (1920: gap 219 px).

## Checks
`node --test tests/*.test.mjs` 109/109; smoke 15/15; verify-round5 and verify-reader-v4 pass; fonts `--check` ok (no new glyphs);
contrast of all reader text >= 5.0:1; focus ring and number keys verified (verification/round6/reader/focus-*, key1-*).

## Not done / notes
- 58 event stories have no picture: the card's art area is a blank panel (WebGL face, `archive-scene.js`, not touched).
- `.story-summary` (guide) and `.fx` panels keep their boxes; each choice still renders its (hidden) answer, 22 x 4 cards on ark65.
