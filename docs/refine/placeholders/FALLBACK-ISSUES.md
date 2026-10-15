# Fallback pass (137 keys still on the generic phrase) — open issues

Reviewer: Haiku (low), output `out/fallback.json` (53 stories, 137 keys, per-document wording). Merged by
`scripts/refine/merge_placeholders.py`; after it 1 key in the catalogue still uses the generic phrase (AUDIT.md).

- uplift.6010: "on the tropical planet [X]" — handled centrally ("planet" before a name carries the note).
- first-league ARCHEOLOGY_14, vultaum_11, irassian_10, cybrex_6, yuht_9: "Asteroid [X]" — handled centrally.
- operation.5037 (event-operation-5010): operation code name has no clean phrase ("Operation" carries the note).
- bio.85 (event-bio-1): empty zh phrase was rejected by validation; the default wording stays.
- paragon docs: "our world" used for the planet throughout (deliberate, differs from "this planet").
- situation storm_duration: English keeps the game's "month(s)".
- origin_fear_of_the_dark: bare [GetName] assumed to be the planet — unverified.
- event-nomads-4800 toxoids.40: zh uses 星球 without a determiner to avoid doubling with 这样的.
