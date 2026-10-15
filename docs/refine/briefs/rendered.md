# Brief: rendered-sentence review (final placeholder pass)

Read docs/refine/briefs/placeholders.md (phrase/note/omit rules, standard terms) and docs/refine/RULES.md first.

Your worksheets: docs/refine/placeholders/rendered/<group>.md. They show EVERY sentence that contains a display-time
substitution exactly as the website renders it today, with the substituted phrase marked «…» (both languages,
tagged with the document id). Before each document's sentences, `· keys [doc]:` lists the placeholder keys of that
document and their current phrase (zh / en). `open issue:` lines are notes from the first review of that story;
⚑ marks sentences an automatic check found suspicious (ellipses "……" in game text are usually fine).

For every story, read every sentence and decide:
1. Reads naturally and identifies the right entity → nothing to do.
2. A phrase is unnatural, wrong for the entity, ungrammatical in that sentence, or two different entities share a
   phrase → give new wording for that key in that document (or `omit` for a language when the sentence reads
   naturally without it). The site already handles: doubled articles, capitalisation at sentence start, a title
   before a name ("Science Officer" carries the note), adjacent title+name pairs, "they has", possessive "our's",
   repeated nouns, "+[X]%" (the phrase stands for the whole quantity). Do not fight those rules.
3. The sentence cannot read naturally without changing the game's own text → record an exception (short reason).
   We never rewrite game text.
Also resolve each `open issue:` of the story: either fixed by your wording, already fine as rendered, or an exception.

Output (you own only these files): docs/refine/placeholders/out/rendered-<group>.json, one per worksheet group:
{"<storyId>": {"docs": {"<docId>": {"<key>": {"zh": "...", "en": "...", "omit": ["en"]?, "note": {"zh": "...", "en": "..."}}}},
               "exceptions": ["<docId>: short reason"], "reviewed": true}}
Every story in the worksheet must appear with "reviewed": true (use {"reviewed": true} when all is fine). Use the
exact key spelling from the `· keys` line. Never invent proper names. Save after every 15 stories. No git, no other
files. Short final report: stories reviewed, keys changed, exceptions count, notable patterns.
