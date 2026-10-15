# Brief: residual pass (final)

Read docs/refine/briefs/placeholders.md and docs/refine/briefs/rendered2.md first (same output format, same rules).

Worksheet: docs/refine/placeholders/work/residual-<n>.md — only stories that still list exceptions, with each
`exception:` and the story's CURRENT rendered sentences («…» = substitution) and `· keys` lines. The keys lines now
also list keys the game fills from its own scripted text, marked "(game's scripted wording)"; you may override those
per document too (same entry format), e.g. a verb helper («are», «s») or a long scripted description.

For each exception:
- If the sentence now reads fine → drop it.
- If any phrase or `omit` (zh/en) for any listed key makes it read naturally → fix it (per document).
- Keep it ONLY if the fault is entirely in the game's own words and would remain with the real in-game name (typo,
  doubled word, wrong agreement in the original, a token the original itself breaks). Write it as
  "<docId>: game text: <what is wrong, quoting the original words>". Nothing that a phrase or omit can fix may remain.
Also re-read all other sentences of these stories and fix anything still unnatural.

Output (only this file): docs/refine/placeholders/out/rendered3-part<n>.json, shape as rendered2:
{"<storyId>": {"docs": {...}, "exceptions": [...], "reviewed": true}} — every story of your worksheet, "reviewed": true.
Write entries with both "zh" and "en" (use "" + "omit" for a language left out). No invented names. Save after every
15 stories. No git, no other files. Report: exceptions dropped / fixed / kept, keys changed.

## Addendum: context variants (for one key in several positions of one document)

When the SAME key in the SAME document needs different wording in different sentences (e.g. "the wind of [X]" vs
"the [X] crew"), add `"variants"` to the entry: a list of {"lang": "en"|"zh", "before": "<exact text right before the
slot>" and/or "after": "<exact text right after the slot>", "text": "<phrase or empty string to omit>"}. The first
matching variant wins; otherwise the entry's zh/en apply. Copy before/after exactly from the rendered sentence
(game text only, without the «» phrase), keep them short (a few words). With this, "one phrase cannot fit every use
of a shared key" is no longer an acceptable exception.
