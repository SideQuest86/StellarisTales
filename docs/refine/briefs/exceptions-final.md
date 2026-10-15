# Brief: final exception pass

Read docs/refine/briefs/rendered3.md (incl. context variants) and placeholders.md. Exceptions: docs/refine/placeholders/
LEDGER.md section "Exceptions"; current rendered sentences: docs/refine/placeholders/rendered/*.md (search the doc id).

For EACH exception decide by the rendered sentence:
- If a «substitution» is part of the fault — e.g. a verb that disagrees with our phrase ("«The rival empire» have",
  "Their people has"), an article or possessive around our phrase, a doubled noun next to our phrase — change OUR
  phrase for that document (plural phrase for a plural verb: "the rivals", "its people"; or omit; or a context variant)
  so the sentence is grammatical. This is our wording, so it must be fixed.
- Keep only faults with NO substitution involved (a typo or doubled word elsewhere in the game's words, a truncated
  original line). Quote the original words.
Output (only this file): docs/refine/placeholders/out/rendered4-final.json, shape as rendered3 (every story you touch,
with its complete final exception list, "reviewed": true). No git, no other files. Report: fixed / kept counts and
list every kept one with the quoted original fault.
