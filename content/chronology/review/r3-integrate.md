# r3-integrate ledger (2026-10-13)

Result: story_tree.py runs cleanly; compiler warnings: none; orphan fragments: only event-origin-112, event-origin-113, event-refugees-5 (intentional).

## 1. Duplicated chain stories
- chain-fruitful-partnership-chain -> origin_fruitful: chain card has no readable window (common/event_chains/00_event_chains_3.txt:125-129; begun by fruitful_start_effect, common/scripted_effects/01_start_of_game_effects.txt:4192). Added as an `opening` target of origin_fruitful (non-family stories cannot use `include`; that raises KeyError in compile()). merged recorded. Deleted: fragment + guide.
- chain-cs-crimson-crawlers-chain -> anomaly-crimson-crawlers-category: chain carried by project_cosmic_storms_crimson_crawlers (common/special_projects/03_projects_cosmic_storms.txt:437). Added a bridge project -> chain. merged recorded. Deleted: fragment + guide.

## 2. Extreme Frontiers (merged into the site stories)
- georadiation: 1530.b / 1531.g / 1531.i -> hidden 1532 creates the GeoCorp fleet (events/extreme_frontiers_events.txt:5101, 5244, 5275, 5297-5312); on_fleet_destroyed_perp (common/on_actions/00_on_actions.txt:1692) -> hidden 1533 (:5319-5346) -> 1534 after 1 day -> 1535 (1535 also reached by 1531.h, :5260). Three conditional bridges to 1534, plus three duplicate bridges to the hidden router 1533 (needed so the compiler no longer treats the hidden router as a story root; the renderer drops edges to hidden docs). Deleted event-extreme-frontiers-1533 fragment + guide; outline folded into the site guide.
- dendrus: 1426 (hidden) spawns New Bratulla and fires 1425 (:4226-4239); 1430 fired by on_survey_planet (on_actions:1175; :4267). Bridge 1425 -> 1430. Deleted event-extreme-frontiers-1430 fragment + guide; folded into the site guide.

## 3. Other cross-story items
- event-grand-archive-2040 -> situation-voidworm-country-situation: hidden 2040 (events/grand_archive_events.txt:509-560, 540 enables VOIDWORM_TITAN_DEBRIS_PROJECT) needs the killer on VOIDWORM_GLANDS_PROJECT (started by 2450.b, :2589). Bridge GLANDS_PROJECT -> TITAN_DEBRIS (+ the hidden-router bridge), ending 2455 (+100 progress). Deleted fragment + guide.
- event-grand-archive-3025 -> family event-grand-archive-3010: CUTHOLOID_DEBRIS_PROJECT added as member (secondary entry; hidden 3025 on_ship_destroyed_victim, on_actions:1432; project 04_projects_grand_archive.txt:153-185). Deleted fragment + guide.
- event-nomads-4720 + event-nomads-4715: one family (title from the chain, start nomads.4715, members 4715 / 4720 / nomad_exploration_chain). Entries: ap_wanderlust on_enabled (common/ascension_perks/00_ascension_perks.txt:671 -> events/nomads_events_1.txt:14850) and arkship on_entering_system (on_actions:967 -> :14305). Fragment id kept: event-nomads-4715; 4720 fragment + guide deleted.
- event-apoc-3 + event-distar-13080: apoc.3 already shows as a secondary entry of the L-Cluster story; guide facts folded in (see item 5).
- Inetian weather manipulators: one family. cstorms.135 -> sites A/B/C (spawned by the initializer, common/special_projects/03_projects_cosmic_storms.txt:25-37; common/solar_system_initializers/cosmic_storm_initializers.txt:3-60); cstorms.193.a sets completed_inetian_traders_precursor (events/precursor_events_cosmic_storms.txt:1700) which common/artifact_actions/artifact_actions.txt:618-648 (artifact_inetian_research) requires before enabling INETIAN_PROJECTS_04. Family id kept: anomaly-storms-prec-wm-one (start = the anomaly); bridges 135 -> Coordinates A and 193 -> INETIAN_PROJECTS_04; guide rewritten (opening + continuation + secrets). Deleted site-site-weathermanipulators-coordinatesa-residential-planet and project-inetian-projects-04 (fragment + guide).

## 4. Compiler warnings
- origin_riftworld: removed the Unstable Spacetime group (docs live in astral-rift-in-space, which annotates them) and the duplicate astral_situation.20 ending.
- event-awareness-125: progress.4/5/6 removed from family members and group (they belong to event-action-1).
- event-infernals-10 and event-infernals-2500: both were duplicates of the origin stories origin_red_giant / origin_cosmic_dawn (same docs). Family fragments deleted; notes and main-line outline folded into the origin stories (origin_red_giant now holds situation, projects, nova/restored, Lusus station; origin_cosmic_dawn already had groups). Fragments + guides deleted.
- anomaly-sun-rays-cat: internal bridges / group for 4037, anomaly_failure.4037 replaced by one external bridge 4035.a -> chain star_power_chain (story event-anomaly-4036, not in my list).
- event-espionage-2: espionage.1040 removed from group (lives in event-operation-2000/5000/5015). event-action-61: syndaw.1030 removed (lives in event-syndaw-400).

## 5. Orphan fragments (docs now live in ...; facts folded; fragment + guide deleted)
- anomaly-cosmic-dawn-sleepers / sleepers2 / sleepers3 -> origin_cosmic_dawn
- event-action-110 -> event-galcom-1 (galcom.16 invitation; edited a story outside my list: guide note + review.merged only)
- event-apoc-3 -> event-distar-13080
- event-first-contact-1050 -> event-action-1 (edited outside my list: guide note + merged)
- event-grand-archive-2901, event-grand-archive-3014 -> event-grand-archive-3010
- event-marauder-711 -> event-marauder-511 (edited outside my list: guide note + merged)

## Requests
- event-anomaly-4036 (c3a) is only the continuation of anomaly-sun-rays-cat (4035 begins star_power_chain); consider merging it into the sun-rays story (needs the c3a owner). Currently linked with an external bridge.
- Compiler: `include` fails (KeyError in compile) for fragments that are not families; hidden-router roots cannot be absorbed by a bridge to a visible doc alone (needs an extra bridge to the hidden router, which the renderer drops).
