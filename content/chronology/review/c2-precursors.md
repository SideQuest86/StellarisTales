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

## Session 2 (2026-10-13) — archaeological sites, entry events and artifact events

Result: all 136 assigned ids are covered. 83 have their own fragment (status `reviewed`); the other 53 are no longer standalone stories — 39 incident cards (8000…8110, 8210, 4078, 13030, 4006, 4021) were absorbed in session 1 into `archaeology-incidents`, and the rest are folded into the families below. The precursors category compiles to 84 stories, all `reviewed`.

### New shared findings

- Random sites: `ancrel.9999` (events/ancient_relics_site_spawn_event.txt:10, on_survey_planet at 00_on_actions.txt:1156) creates a random dig site with a 5/405 chance (x0.2 for AI or within 1800 days of a discovered_site flag) and the site type is then drawn by its weight; sites with weight 0 are created only by system initializers or by events (initializer file:line is cited in each guide).
- Failure pools: a roll <= 5 on a stage that already has clues draws one incident with 10/130 (archaeology_event_effects.txt:87-105). Each site names its pool (`site_*_random_events`, shared `space_station_random_events`, generic `all_random_events`) or `no_events` (no such pool exists, so nothing happens). Pool contents are listed in the site guides.
- Hidden last-stage routers (`random_list 33/33/33` etc.) were chained as consecutive stages by the draft; 21 sites are fixed with `hubs` on the router plus bridges from the last visible stage and an exclusive group (previous session 17 sites; now also Tiyanki Grave Mound 5:2, Ruins of Shallash 1:4/else, Frozen Complex 50:50, One Last Hope 50:50, Target from Orbit).
- Engineered species: the ending depends on how many of the three stage choices were "study" (variable studied_engineered_species >= 2: Revelation, else Ignorance; arcsite.2000/2010/2020, 2040).
- Ancient Robot World only spawns at game start with probability 1/4 (ancrel.12050 -> 12055, 2 : 1 : 1 with the Chosen system); its defenders' battle notices 12060/12065 are the opening of that story. Options A/C/D/E of ancrel.12090 each have a 50% chance to fire ancrel.12095 ("pest control", sets endgame_crisis_early_start).
- Broken World "let it out" destroys the star system when it has no black hole and creates the Eldritch Horror guardian country; Zevox's Animator verdict is 67/33 with income modifiers and "wanting" founds a free robot state that the player may take over (unique.95 set_player).

### Per-story results (session 2)

| Story | Status | Notes |
| --- | --- | --- |
| site-site-weathermanipulators-coordinatesa-residential-planet | reviewed | Family "Inetian Traders" (title NAME_inetian): three Coordinates sites A/B/C are parallel (required 3) and each last stage fires hidden cstorms.175, which enables INETIAN_PROJECTS_02 only when pc_arcsite_A/B/C_completed all exist; 176 a/b -> 179 (30 d) -> 180 -> storm_formation -> INETIAN_PROJECTS_03 -> 185 -> 186 -> last_shelter -> 193 relic r_weather_manipulator. Sites spawned by initializer weathermanipulators_home_system (cosmic_storm_initializers.txt:31), not at galaxy generation. |
| site-site-georadiation-terraforming | reviewed | Two Signal Trace projects parallel, the second to finish enables UNDETONATED_GEORADIATION_PROJECT (extreme_frontiers_scripted_effects.txt:29-40); CoburnCorp dialogue 1531; battle route 1532 -> (fleet destroyed) 1533 -> 1534 -> 1535 is outside the story (see Requests). |
| site-zevox-digsite, site-larion-digsite | reviewed | Overlord digsites from unique_system_initializer_03/02; Animator of Clay dialogue only for machine empires without Terminator (unique.65.c), verdict 85/90 exclusive; Larion clone dialogue 15-22. |
| site-site-engineered-species | reviewed | Three study/use pairs exclusive; ending by studied_engineered_species. |
| site-site-fumongus-dig | reviewed | Initializer fumongus_init_01 (needs has_ancrel); 13125 dispatch by fumongus_colony_complete (set in colony.2075); failure pool 190 (wildlife / fungal zombies 5/25/25/25 / cache 30). |
| site-site-the-chosen-backstory | reviewed | Shield project (A, not for homicidal), B unity, C gestalt/non-gestalt modifier; space-station pool (8200-8203/8215 now in archaeology-incidents). |
| event-ancrel-15010 | reviewed | on_colony_2_years_old weight 3/958; 15003 a/b -> 15005 / 15004; jungle failure group 15006-15008. |
| site-rubricator-digsite | reviewed | Family merges event-ancrel-4012, 4024 and 4120: 4012 (flag) -> site -> 4017 -> 4018 (Shard; chains rubricator_chain -> chain_2) -> 4019 (a/b) -> 4023 / 4024 / 40182 (720 d); Shard's death 4120 -> 4020 / 4121 / 4122 exclusive. Upstream anomaly-ancrel-rubricator-cat (c3b) not edited. |
| site-site-chronicles-of-dendrus | reviewed | Machine vs default project exclusive (1415); hyperlane project; New Bratulla 1430 is another story. |
| event-ancrel-6150 | reviewed | Merged 6151 (duplicate, exclusive entry by survey order) and 7007 (relic r_galaxy activation, bridge 6185 -> 7007). Initializer relic_system_1. |
| site-broken-world-digsite, site-endless-expanse-digsite | reviewed | 11020 a/b; 11025 -> 11027/11030 exclusive; 4047 a creates Ix Belen, b/c give influence 500 instead. |
| site-site-debris-belt, site-site-percussive-maintenance, site-site-grand-herald, site-paragon-legendary-leader-homeworld, site-site-deserted-mining-facility, site-site-krazura-dig, site-site-lesser-messenger | reviewed | See guides; grand herald/lesser messenger have router fixes; Krazura 3031 only with a leader flagged skrand; S.I.D.N.I. A/B exclusive plus 1330 after 5 years. |
| event-ancrel-6098 | reviewed | Once per galaxy (zarqlan_spawned; 75/25 player/AI; 5/105 yearly); merged event-ancrel-6131 (relic r_severed_head activation: 6132 if the spiritualist Fallen Empire exists else 6133, exclusive). |
| site-site-ancient-robot-world | reviewed | Family with 12060/12065; spawn ancrel.12050 -> 12055; options 12090 A-E. |
| site-site-tiyanki-graveyard, site-site-ruins-of-shallash, site-site-hidden-lab-a, site-site-polaris-seed-vault | reviewed | Routers fixed with weights/labels; Polaris merged with event-ancrel-13000 (sets polaris_seen, makes the site visible). |
| event-ancrel-4008 | reviewed | Whispers in the Stone: tech_mining_3 trigger, 5/100, 30-120 d. |
| event-ancrel-6049 | reviewed | Fossilized Remains: colony-age random events, once per galaxy. |
| 17 AR random sites (ebb and flow, cut to fit, deja vu, shot into the ground, target from orbit, sky glow hymn, moon bump, trench world, phoenix collective, hive coral, orbital rain, fossilized jellyfish, popular rock, strange flows, warmer climates, grand herald, lesser messenger) | reviewed | Router outcomes made exclusive branches after the last visible stage (data by site_data1); each guide lists spawn weight, stages, outcomes, pool. |
| site-site-command-center, echoes-inside, freighter-crash, star-petal, robot-debris, the-library, city-of-bones, it-was-aliens-site, mutation-vats, the-host, ancient-battle-site, asteroid-vault-1, lost-moments, absolute-zero, ruined-reactors, toxic-matrix, abandoned-bio-lab, anomalous-cube, from-the-ashes, inferno-temple, last-thought, green-skies | reviewed | Linear sites: stage list, rewards, spawn weights and pool recorded; endings with options (bio lab a/b/c, cube a/b, library A/B, toxic pools A/B/C). |
| site-omnirelic-site | reviewed | Merged event-ancrel-6000 (Omnicodex activation, relics.txt:290/374). |
| event-ancrel-10000, 10010, 10020, 10030, 10040, 6499, 2068 | reviewed | Artifact-action results (costs 500/150/150, cooldowns 720/900 d), mega art installation completion, relic seized in war, C.A.R.E ending. |
| archaeology-incidents | reviewed (updated) | Now also holds explosive decompression 8200-8203 (5/25/25/25) and system lockout 8215 (used by the orbital and spaceship pools). |

### Requests added (session 2)

6. COMPILER (affects every archaeological site): `story_tree.py` (changed 2026-10-13 10:41) now groups consecutive `stage` entries by their name when ordering site stages, but archaeological site stages have no name (`{"k":"stage","name":""}` in source-graph.json), so all stages of a site collapse into one "multi-event stage" and render as siblings instead of a chain (`stage_sequence`, scripts/story_tree.py:555-577). Please name unnamed site stages by their definition index (source_graph.py:158-159) or group by line, otherwise the natural order of every site is lost. The fragments do not depend on it.
7. Cross-agent links that belong to my stories but sit in other owners' stories: `event-extreme-frontiers-1533` (extreme_frontiers.1533 -> 1534 -> 1535, CoburnCorp fleet destroyed; c8a) belongs after the georadiation story's 1530/1531 battle route; `event-extreme-frontiers-1430` (New Bratulla surveyed, c8a) follows the Chronicles of Dendrus hyperlane; `event-cstorms-1417` (pirates destroyed, c8b) follows Green Skies; `event-strange-worlds-2020` (Fatal Mutations after tech_universal_marcophage, c8b) follows the Abandoned Bio Lab; `anomaly-ancrel-rubricator-cat` (ancrel.4010/4011, c3b) precedes the Rubricator family at ancrel.4012; `anomaly-ancrel-mechano-cat` (c3b) precedes ancrel.2068; `anomaly-storms-prec-wm-one` and `project-inetian-projects-04` (c3b) surround the Inetian Traders family.
8. A hidden stage router flagged as `hub` plus `bridges` works, but the compiler could offer a fragment key such as `stageAlternatives` (router id, weights) so that this common pattern (21 sites) does not need hubs plus per-outcome bridges.
9. `callers.py`/`print-tree.py` label initializer-created sites as "Galaxy generation" even when the initializer says it is spawned by event (weathermanipulators_home_system) or when a story-specific flag is required (polaris_seen, discovered_rubricator_planet); consider a trigger label for "created by system initializer X".
