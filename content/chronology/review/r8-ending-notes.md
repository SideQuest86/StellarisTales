# r8: ending notes in readable words (2026-10-26)

Scope: the `endings.<doc>.note` (and, where needed, `label`) of 139 endings in 96 fragments whose English note held script
shorthand: ids (`leader_trait_*`, `d_physics_10`, modifier keys), event numbers, flags, "fires" / "immediate" / option
letters, or a fragment that meant nothing on its own ("Same reward.", "Bystander notice."). Selected by pattern over all 526
endings. Notes are commentary shown under an ending's name in the reader; the evidence lines are unchanged.

Method: six Haiku rewriters (disjoint batches by story, read only, structured output) following a brief (keep every
player-visible fact, add none; game names from `localisation/english` and `simp_chinese`; days as approximate years;
English <= 30 words, Chinese <= 60 characters), then one Sonnet verifier per batch against the evidence and the
localisation (18 corrections: an event number read as a year, invented or mistranslated names, lengths). Coordinator: every
name that replaced an id checked against the localisation (35 keys, all match, e.g. middle_path = Middle Path / 中途);
the Sacred Path endings checked in events/nomads_origin_events.txt (modifier, timeline.135, chain deliberately left open);
one wording for the eleven patron first-contact projects; leftover plumbing removed (shroud.4971, ancrel.19,
astral_planes.1030, distar.5068). Applied as in-place string replacements, so each fragment keeps its layout.

Not changed: 387 endings whose notes were already readable; notes that are short but true ("No effect." under "Report: no
damage"). The reader no longer shows a note that repeats the ending's name (six endings).

Labels (v4.17.7): of 522 ending labels, 17 named mechanics; two carried bookkeeping that their notes already state and were
trimmed (grand_archive.2455 "+100 situation progress", leviathans.1018 "(success 70% / failure 30%)"); the rest name story
things (a research vessel, a deposit) or tell two random outcomes apart by their odds.
