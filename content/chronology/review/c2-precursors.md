# C2 precursors & archaeology — review ledger

Reviewer: C2 precursor review (Claude Opus 5.5) · started 2026-10-12 · assignment: content/chronology/review/assignments/c2-precursors.txt (136 stories).
Line references are to the ORIGINAL game files (the compiled `source` lines are shifted where a file uses `inline_script`, e.g. precursor.2000 compiles as :4587 but is at events/precursor_events.txt:4483).

## Shared findings

- Classic precursor openings are `on_survey_planet` random events (00_on_actions.txt:1180–1192: weight 6 each, Zroni 35, Baol 15, Inetian/adAkkaria 25, vs 100 "nothing"); the site anomalies (96_anomaly_categories_precursors.txt) only spawn after the opening sets `<x>_intro` + the event chain → reviewed bridges opening → each anomaly.
- Clue counter max 6 (00_event_chains.txt); every report fires a hidden router; completion → system spawn (retry 30 d) → "Home System Located" after 2 d.
- Secrets research = artifact action (750 minor artifacts) gated by `<x>_world_found`, set in BOTH homeworld outcomes → bridge from both outcomes; also fires shared ancrel.10040.
- VULTAUMAR / YUHTAAN / FEN_HABBANIS / IRASSIA anomaly categories have spawn weight 0 and are never placed → kept as labelled "unused definition" secondary entries (excluding them is undone by the compiler's absorb rule).
- Observer events observer.56–60 are observer-only notices → labelled, not removed.
- V3 `readings` for ancrel.10100 and ancrel.10050 removed (coordinator note): doc.body passages + option `when` express all variants.

## Per-story results

| Story | Status | Notes |
| --- | --- | --- |
| cybrex | reviewed | family made explicit; 11 intro→anomaly bridges; 11 annotate bridges report→2100; 2101/2102→CYBREX_SECRETS bridges; tooltip-only intro→chain edge suppressed; homeworld project checks only the global flag (colony check commented out, 00_projects_1.txt:2497). Guide rewritten. |
| vultaum | reviewed | as cybrex + 101→precursor.105 relic-activation bridge (relics.txt:1206–1242); 10111–10113 exclusive group; V3 suppress/publish annotations kept. Guide rewritten. |
| yuht | reviewed | as cybrex; Jabbardeeni cache (over.50→YUHT_JABBARDEENI_CACHE→over.60) confirmed under 601 (after block, has_overlord_dlc, 720+1080 d). Old guide story-f639c6105c7b7386.md merged into yuht.md and deleted. |
| first-league | reviewed | as cybrex; 14 sites; source quirk: 1098 sets `first_league_discovered`, 1097 checks `first_league_system_discovered` (never set) → 1099 unreachable. LEAGUE_SECRETS also unlocked by owning Fen Habbanis III (modifier first_league_homeworld). New guide. |
| irassian | reviewed | as cybrex; same quirk: 1598 sets `irassia_discovered`, 1597 checks `irassian_system_discovered`. New guide. |
| precursor-assistance | reviewed | explicit family 301–320 + 5 ARTIFACT_FOUND projects; title now original (precursor.301 "Precursor Discovery"); parallel group of 5 sources, exclusive groups (5 projects by active chain; 312/313). New guide. |
| archaeology-incidents (NEW family) | reviewed | Replaces 41 one-card stories: event-ancrel-8000…8003, 8010…8013, 8020…8023, 8030…8033, 8040, 8045, 8050, 8055, 8060, 8065, 8070, 8075, 8080, 8090…8093, 8100…8103, 8110, 8210, 4078, 13030, 4006, 4021. Pool = all_random_events (archaeology_event_effects.txt:332–439), drawn with 10/130 on a failed roll scoring ≤5 when the stage has clues (87–105). Six exclusive 5/25/25/25 trap groups. Title reuses UI string ARCHAEOLOGICAL_SITE_PLURAL. |
| zroni | reviewed | explicit family incl. hidden ancrel.14; bridges from ancrel.13.a to zroni_digsite_6 (initializer Zrocursor_system, ancient_relics_initializers.txt:179/416) and to ZRONI_SECRETS (last_zroni_system set in ancrel.14); NEW bridge ancrel.19→ancrel.7006 relic activation (absorbs story event-ancrel-7006). |
| baol | reviewed | explicit family; secrets bridge kept with evidence (2014 sets last_baol_system); 2022/2023 → decision notifications 2025/2026/2027 (decisions 05_ancient_relics_decisions.txt:72–275 after relic r_the_last_baol activation; absorbs event-ancrel-2025/2026/2027); exclusive groups. |
| the-oracle | reviewed | entry trigger documented (on_blocker_cleared → hidden ancrel.4030, 5/5/95; Oracle once per galaxy); dialogue/ending notes. |
| the-sentinels | reviewed | V3 combat bridges kept; added missing 4058.b → 4057/4063 bridges; exclusive groups (4055/4058, 4057/4063, 4056/4076, 4067/4068). |

## Requests (coordinator / other owners)

1. scripts/callers.py crashes on path items `{'k':'effect'}` without `name` (KeyError) — e.g. `callers.py special_projects:CYBREX_SECRETS`.
2. Compiled `source` line numbers come from inline-script-expanded text and do not match the game files; consider recording original lines.
3. `is_regular_empire` compiles as an `other` atom; it could be an identity atom (not gestalt) so the empire profile resolves it (ancrel.10100).
4. Cosmic-storm precursors (Inetian = cstorms.100…, adAkkaria = cstorms.200…) are C2 by the coordinator's scope but their stories `anomaly-storms-prec-wm-one`, `anomaly-storms-prec-one`, `project-inetian-projects-04`, `project-project-adakkaria-secrets-of` are in c3b's list; only the later Inetian sites (story `site-site-weathermanipulators-coordinatesa-residential-planet`) are mine. See entry for that story.
5. verification/chronology/stories.json and verification/categories/stories.json still reference the deleted guide id story-f639c6105c7b7386 (historical V3 files; not edited).
