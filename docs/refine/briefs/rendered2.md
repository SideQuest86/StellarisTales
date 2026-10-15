# Brief: independent second review of every rendered sentence (Sonnet)

Read docs/refine/RULES.md, docs/refine/briefs/placeholders.md (phrase/note/omit rules) and
docs/refine/briefs/rendered.md (worksheet format) first.

Worksheets: docs/refine/placeholders/rendered/<group>.md — every sentence of the site that contains a substituted
name, exactly as the site renders it now («…» marks a substitution), the keys per document, and `earlier exception:`
lines from the first review.

Your job is an independent check with a stricter standard:
1. Read EVERY sentence. Any sentence where a «substitution» reads unnaturally, is ungrammatical, identifies the wrong
   entity, or conflates two entities MUST be fixed by per-document wording for that key or `omit` (zh / en). Use the
   game's sentence as given — we never change game text — but you can always choose a phrase or omit the slot. Prefer
   short role phrases; omit when the sentence reads naturally without the name.
2. Re-check every `earlier exception:` against the CURRENT rendering. Many were caused by renderer bugs that are now
   fixed (empty «», "Operation", repeated nouns, a/an, title pairs). For each: if it now reads fine → drop it; if a
   phrase/omit fixes it → fix it; only if the problem lies entirely in the game's own words and would exist with ANY
   name (a typo such as "we have have", wrong verb agreement in the original, a doubled word in the original) → keep
   it as an exception, phrased "game text: <what is wrong>".
3. Final exceptions may therefore only be original-text faults. Anything involving a «substitution» must be fixed.

Output (you own only these files): docs/refine/placeholders/out/rendered2-<group>.json per worksheet group, shape
{"<storyId>": {"docs": {"<docId>": {"<key>": {"zh": "...", "en": "...", "omit": ["en"]?, "note": {...}}}},
               "exceptions": ["<docId>: game text: …"], "reviewed": true}}
Every story of the worksheet must appear with "reviewed": true. Exact key spelling from the `· keys` line. Never invent
proper names or lore. Save after every 15 stories. No git, no other files. Short final report: stories, keys changed,
earlier exceptions dropped / fixed / kept, final exception count.
