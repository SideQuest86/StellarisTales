# Brief: rewording pass for mechanical placeholder phrases

Read docs/refine/briefs/placeholders.md (phrase and note rules) first. Worksheet:
docs/refine/placeholders/work/mechanical.md — 81 per-document entries whose current phrase is mechanical or wrong:
"未命名 / unnamed" (wrong: the thing has a name in the game, we just cannot know it), "某个 / some", "这一数值 /
this value", "the amount", "such", "this name". Read both sentences and choose wording that reads naturally:

- Prefer a role phrase from the sentence ("the stranded scientist's people", "their home system", "the target
  empire", "this operation").
- If the sentence reads naturally with the slot simply left out, omit it: set that language to "" and add
  `"omit": ["en"]` (or ["zh"], or both). Example: "the hitherto-unknown [X] species" → en "" + omit en →
  "the hitherto-unknown species". Only omit when the remaining sentence is grammatical and keeps its meaning.
- Numbers the game computes (percentages, counts, costs): use a natural quantity phrase ("a certain share", "a
  number of", "the agreed price") or omit when the sentence allows; never invent a value.
- Note: one short natural sentence per language; required unless both languages are omitted.

Output (you own only this file): docs/refine/placeholders/out/mechanical.json, shape
{"<storyId>": {"<docId>": {"<key>": {"zh": "...", "en": "...", "omit": [...optional], "note": {"zh": "...", "en": "..."}}}}}
covering every entry of the worksheet. Save after every 20 entries. No other files, no git. Short final report.
