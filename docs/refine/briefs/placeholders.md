# Brief: placeholder reviewers (Haiku, parallel; one owner per worksheet group)

Read docs/refine/RULES.md (editorial rules). Project: D:/Saving/Living/CodexProjects/StellarisTales.

Stellaris event text contains placeholders the game fills from the save, e.g. `[Root.GetName]`, `[From.GetName]`,
`[event_target:hostile_empire.GetName]`. The site cannot know these names, so it shows a natural phrase instead
("our empire", "this planet") with a short hover note. Your job: for each story in your worksheets, read the complete
sentences and choose the phrase that reads naturally in those sentences and identifies the right entity.

Input: your worksheet files `docs/refine/placeholders/work/<group>.md` (only read your own). Each story lists every
placeholder key, its current phrase ("now: 中文 / English"; "(generic fallback)" means it is a meaningless default that
must be replaced), and sentences tagged with their document id `[doc]`.

Output: one JSON file per group, `docs/refine/placeholders/out/<group>.json` (create it; you own only your files):

```json
{
  "<storyId>": {
    "placeholders": {
      "<key>": {"zh": "我们的科学船", "en": "our science ship",
                "note": {"zh": "游戏里这里会出现你的科学船的舰名。", "en": "In the game, your science ship's name appears here."}}
    },
    "placeholderDocs": {"<docId>": {"<key>": {"zh": "…", "en": "…", "note": {"zh": "…", "en": "…"}}}},
    "issues": ["short description of anything that still reads badly or looks wrong"]
  }
}
```

- EVERY story of your worksheet must appear in the file (use `{}` when the current phrases are already right) — this is
  the coverage record. Save the file after every 10 stories (rewrite the whole JSON) so nothing is lost.
- Put a key in `placeholders` only when the current phrase should change. Use `placeholderDocs` when the SAME key
  means DIFFERENT entities in different documents (common: in anomaly stories `Root` is the planet in the anomaly
  text but the science ship in the outcome events; `From` may be the ship or the planet).
- Keep one entity = one phrase within a story; never give two different entities the same phrase in one sentence or
  story (e.g. two empires: "the other empire" vs "our empire"; or role words from the text: "the attackers").
- Use plain role phrases taken from the context; NEVER invent proper names, places, species names or lore.
- Notes: one short natural sentence each in zh and en, saying what the game shows there ("In the game, the name of
  the pre-FTL species appears here."). No code, no tokens, no brackets.
- Phrases contain no brackets and are short (≤ 12 CJK characters / ≤ 5 English words). English phrases are lower case
  unless they start with a pronoun "I"; the site capitalises sentence starts and removes doubled articles ("The our
  science ship" → "Our science ship"), so write "our science ship", not "science ship".
- Chinese: choose a phrase that fits before the following characters (e.g. if text is `[Root.GetName]帝国`, use
  `我们的` style phrasing that does not double 帝国 — the site also collapses an exact doubled noun).

Standard terms (use these unless the sentence needs a more specific role):

| Entity | zh | en |
| --- | --- | --- |
| player's empire (Root country) | 我们的帝国 / 我们 | our empire / we |
| player's capital | 我们的首都 | our capital |
| another empire | 那个帝国 (or role: 敌对帝国, 邻国) | the other empire (or role: the hostile empire) |
| player's ship in anomalies / surveys | 我们的科学船 | our science ship |
| a fleet | 这支舰队 | the fleet |
| the planet of an anomaly / event | 这颗星球 | this planet |
| a star / system | 这颗恒星 / 这个星系 | the star / this system |
| a leader | role from text: 这位科学家, 这位将军, 这位总督, 这位领袖 | the scientist, the admiral, the governor, the leader |
| ruler | 我们的统治者 | our ruler |
| species | 这个物种 (plural 他们) | this species (plural they / its people) |
| pre-FTL civilisation | 这个前FTL文明 | the pre-FTL civilisation |
| a person's own name (GetFirstName etc.) | 这位科学家 … (role) | the scientist … (role) |

Final report (short): groups done, stories covered, number of keys changed, notable issues.
