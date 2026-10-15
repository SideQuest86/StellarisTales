# Brief: verify entity mappings against the game scripts + fix substitution exceptions

Read docs/refine/briefs/rendered3.md (incl. its addendum on context variants) and placeholders.md first. Game files
(read-only): D:/Living/Steam/steamapps/common/Stellaris (events/*.txt, common/**). Project:
D:/Saving/Living/CodexProjects/StellarisTales. Rendered sentences: docs/refine/placeholders/rendered/<group>.md
(regenerated, current). Exceptions: docs/refine/placeholders/LEDGER.md section "Exceptions".

Part A — verify guessed entity mappings. For each case below, open the event in the game files (search
`id = <event id>`), follow how the scope/event target is set (Root/From/FromFrom chains, `save_event_target_as`,
`event_target:` names, the `scopes = {}` of the calling event) and decide which entity each placeholder really is.
If the current phrase (see the rendered worksheet) names the wrong entity, fix it. Record the evidence (file:line).
Cases: anomaly.9002, enclave.5522, enclave.5550, anomaly.3099, special_projects ESTABLISH_COMMUNICATIONS, ancrel.11020,
precursor.311, precursor.314, GEORADIATION_SIGNAL project, ancrel.106, colony.3051, ancrel.6000, crisis.2037,
fallen_machine_empire.4, toxoids.7050, toxoids.7300 (two knights), marauder.5, operation.3001, preftl_espionage.1010,
action.1, action.37, action.38, anomaly.7115, distar.255, distar.258 (a reviewer used "Veil"/面纱 — keep only if the
game's own text calls the planet that), precursor.1521 (zh "上将整颗行星"), and the toxoids/origin_toxic_knights
documents the earlier reviewer did not touch (re-read all of them).

Part B — every LEDGER exception whose sentence contains a «substitution» (i.e. our phrase is involved): fix it with a
phrase, omit or a context variant. Keep only faults that are entirely in the game's words with the substitution reading
fine. For "needs a proper name" frames ("by the name of [X]", "the orb you call [X]"), choose the most natural option:
omit the frame's slot if the sentence still reads, or a phrase like "a name of their own" only if natural; otherwise
keep as exception "needs a proper name".

Output (only these): docs/refine/placeholders/out/rendered4-verify.json, shape like rendered3
({"<storyId>": {"docs": {...}, "exceptions": [...final for that story...], "reviewed": true}}) — include every story
you touch, with its complete final exception list; and docs/refine/placeholders/VERIFY.md with one line per Part A case:
event id → entity per placeholder → evidence file:line → changed or confirmed. No git, no other files. Short report.
