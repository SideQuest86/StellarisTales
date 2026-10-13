# r2-stories review ledger — last unreviewed C8 stories

Reviewer: r2-stories (Sonnet). Working copy: `st-agents/r2-stories`. Game: Stellaris (read-only install). Assignment:
`content/chronology/review/assignments/r2-stories.txt` (40 story ids).
Real game-file line numbers are cited (the compiled graph's line numbers drift after inline scripts).

Status summary: 30 own fragments + guides (all `reviewed`); 8 ids merged into a sibling family; 2 duplicate entries hidden
(fragments kept, no story generated); 0 partial; 0 untouched. `scripts/story_tree.py` runs without errors.

Shared sources: `OA` = common/on_actions/00_on_actions.txt, `PE` = events/pirate_events.txt.

## Merged families (one fragment, others absorbed)

- **`event-custodian-499`** — Galactic Custodian Appointed (family start custodian.2). Merged ids: `event-custodian-14`, `-16`, `-100`, `-30`, `-40`.
  Real entry is the council resolution `resolution_galacticreforms_nominate_custodian` (common/resolutions/01_resolutions_nemesis.txt:683-722) -> hidden custodian.1 -> custodian.2.
  custodian.499 is a test event that never fires (events/nemesis_custodian_events.txt:12-48, `is_test_event`, `trigger = { always = no }`).
  Four exclusive endings via bridges: term expiry (OA:4727 on_custodian_term_ends -> custodian.10 -> 11), end resolution (resolutions:2149 -> custodian.14 -> 15), unseat resolution (resolutions:866 -> custodian.16 -> 17), custodian destroyed (OA:3603 on_country_destroyed -> custodian.100 -> 101).
  GDF side: custodian.30 (resolution_custodian_gdf, resolutions:2200-2248), custodian.40 (disband, 2570-2612), custodian.35 (reports to new custodian, 10 days after nomination if gdf_active), custodian.32 (independent GDF created by hidden custodian.31 whenever a custodianship ends while gdf_active). The compiler had 11/32/35 as one root, 15/17/101/30/40 as separate stories.
- **`event-cyber-7000`** — Genesis Project Complete (Genesis Guides / Architects civic). Merged ids: `event-cyber-7001`, `-7020`.
  cyber.7000 vs 7001 are exclusive on colonisation (OA:1321-1322; events/machine_age_events.txt:15-95, flags create_presapients_no_colonize vs pre_sapient_planet); cyber.7020 follows on_uplift_completion (OA:2079). Bridges 7000/7001 -> 7020.
- **`event-refugees-3`** — Refugees Arrive. Merged id: `event-refugees-5`. Both compiled stories had the same root window refugees.1: pop displaced (OA:3326 on_pop_displaced -> refugees.3 -> 4) and crisis bombardment (OA:2176 on_planet_bombarded -> refugees.5 -> 45-90 days -> refugees.6). refugee_pop_effect (common/scripted_effects/refugee_effects.txt) chooses the destination; refugees.2 (hidden) is used when the species/origin pairing was already seen. The compiler's p=0.65 is only the "go home" branch.

## Hidden duplicates

- **`event-origin-112`, `event-origin-113`** — compiler artefacts: hidden game-start routers origin.112 (spawn a Broken Shackles NPC for a Payback player, events/origin_events_1.txt:3319-3360) and origin.113 (spawn a Payback NPC for a Broken Shackles player, 3369-3390), called from events/game_start.txt:495-515. The sites they create (broken_shackles_digsite "Crashed Slaver Ship", payback_digsite "The Aftermath of Battle") are already complete in `origin_broken_shackles` / `origin_payback` (c1-origins, reviewed). Fragments exclude both site docs, so no story is generated (shows up as 2 orphan fragments in the compiler report; intended). Request R1.

## Per-story results

- **`event-envoy-events-5`** — A Most Irritating Envoy — reviewed. Pulse (OA:500, weight 25) or enclave.4151 (overlord_enclaves_events.txt:7715) -> envoy_events.5 (events/envoy_events.txt:551-705); option B -> envoy_events.6 after 5 days for the envoy's empire (707+). Added node label/note that 6 is seen by the other empire.
- **`event-nomads-50`** — Arkship Readiness checklist — reviewed. game_start.1 -> nomad_country_initial_setup_effect (01_start_of_game_effects.txt:188) -> nomads.50 (nomads_events_1.txt:1708-1812): harvest item + 2 random of 5 items, chain counter max 3; items completed by hidden nomads.51-54 (OA:1497/1177/1259/779). No readable follow-up docs.
- **`event-shroud-5100`** — The Chosen (civic opening) — reviewed. shroud.5100 (hidden, game_start.txt:646-651) -> 5105 patron choice (exclusive 4 options) -> 30 days -> 5110. Correction: the c8a ledger said these belong to event-game-start-1 (C8b); that story is the Sublight Probes and does not contain them. Related: event-shroud-5115 (first delve, c8a).
- **`chain-fruitful-partnership-chain`** — Seed Dispersal chain card — reviewed. Chain only carries picture/name (00_event_chains_3.txt:125-129); begun by fruitful_start_effect (01_start_of_game_effects.txt:4192), carried by OPEN_SEED_PODS_PROJECT (00_projects_plantoids.txt:3). Content lives in origin_fruitful. Request R2.
- **`chain-cs-crimson-crawlers-chain`** — Crimson Crawlers chain card — reviewed. Carried by project_cosmic_storms_crimson_crawlers (03_projects_cosmic_storms.txt:437); content in anomaly-crimson-crawlers-category (c3b). Request R3.
- **`event-cstorms-5`** — Hold the Line (arc site) — reviewed. on_storm_left_system (OA:5421-5427, 5/105) -> cstorms.5 (cosmic_storms_events_1.txt:28-140) -> cstorms.1270 (1410-1455, fire_only_once, player-owned system) -> site_hold_the_line (10_cosmic_storms_arc_sites.txt:626-681, 6 stages). Entry weight 0 +1 for a non-gestalt owner explains the compiler's `p=0.00*`. Choice at 1290 (swear/silence/button-mash) changes 1295 only.
- **`event-cstorms-1840`** — Repowered Complex — reviewed. cstorms.1840 (events:4659-4704) listed directly in on_storm_left_system (OA:5440), electric storm only, 50% to create site_repowered_complex (10_cosmic_storms_arc_sites.txt:687-725, 3 stages).
- **`event-cstorms-tutorial-1`** — Tutorial: Storm Manipulation — reviewed. on_tech_increased (OA:2731); tutorial level 2, non-AI, tech_storm_manipulation, once.
- **`event-game-start-10`** — Fallen Empire Behavior — reviewed. Correction: compiler showed fallen_empires.4-8 as five parallel 30% random entries. Real structure: situation rolls hidden .1/.3/.10/.11 (50/50/15/50, 03_AI_empire_situations.txt:632-638); .3 chooses ONE of 4-8 by ordered if/else_if (fallen_empire_events.txt:127-185). Suppressed the five false edges, added five conditional bridges + exclusive group.
- **`event-pirate-4`** — Birth of Space Piracy — reviewed. OA:111 pirate.4 (monthly) -> pirate.5 -> variants by empire type (PE:459-552); exclusive group added. Open: Treasure Hunters base-variant events pirate.2/8/9/12/16 (PE:316,701,708,948,1037) are not compiled as docs (Request R4).
- **`event-pirate-48`** — Pirates Sighted! — reviewed. OA:110 pirate.48 -> pirate.49 (random 200:10) -> 50 / 52 -> 53,54 / 55 -> 56,57 (PE:1748-1990); pirate.50 also fired by subject.5 (overlord_subject_events.txt:269). p=0.05/0.02 verified (10/210 x 50/100).
- **`event-pirate-10`** — The Pirate Haven — reviewed. on_entering_system_fleet (OA:997); haven initializer hostile_system_initializers.txt:2834; once per empire (privateers_found).
- **`event-pirate-13`** — Pirate Haven Destroyed — reviewed. OA:1648 pirate.13 -> 15 (PE:1108-1171); global privateers_destroyed once; L-Cluster clue via generate_lcluster_clue (external distar.10904 -> event-distar-13080).
- **`event-pirate-24`** — Pirate Station Raided — reviewed. OA:1649 pirate.24 -> 25 (85%) / 26 (15%, only with l_cluster_chain) (PE:1243-1560); loot tiers 5/15/35/50.
- **`event-pirate-100`** — Brigands' Blockade — reviewed. OA:304 on_decade_pulse -> pirate.100 (1/7) -> pirate.150 after 550 days -> pirate.155 (also on_first_contact OA:763) (PE:2196-2425).
- **`event-extreme-frontiers-1533`** — Drone of CoburnCorp — reviewed. Battle ending of the CoburnCorp dialogue 1531 (events/extreme_frontiers_events.txt:5111-5446); the 1531 dialogue and the paid ending are in site-site-georadiation-terraforming (c2). Request R5.
- **`event-extreme-frontiers-1430`** — New Bratulla — reviewed. Follows Chronicles of Dendrus (site-site-chronicles-of-dendrus, c2): spawn_new_bratulla_system (extreme_frontiers_scripted_effects.txt:237), survey -> 1430 (events:4262-4380) -> a: 1435 revive Dendritians / b: keep the world. Request R5.
- **`event-grand-archive-2040`** — Voidworm Troika Remains — reviewed. OA:1674 -> grand_archive.2040 (grand_archive_events.txt:509-545) during VOIDWORM_GLANDS_PROJECT -> VOIDWORM_TITAN_DEBRIS_PROJECT -> 2455 (+100 progress to situation_voidworm_plague). Context in situation-voidworm-country-situation (another reviewer). Request R6.
- **`event-grand-archive-3025`** — Cutholoid Remains — reviewed. OA:1432 -> grand_archive.3025 (events:3573-3625) -> CUTHOLOID_DEBRIS_PROJECT -> hidden 3026 (1000 minerals or 200 rare crystals). Cutholoid story owned by event-grand-archive-3010. Request R6.
- **`event-aquatics-1`** — Advanced Aquatics — reviewed. ap_hydrocentric on_enabled (00_ascension_perks.txt:928).
- **`event-aquatics-4`** — Frozen Terraforming Candidate — reviewed. Planet modifier at galaxy creation (game_start.txt:845-870, ~1/101, Aquatics pack); survey (OA:1135) -> aquatics.4 -> first discovery only -> aquatics.5.
- **`event-necroids-200` / `-201` / `-202`** — Sacrifice results — reviewed (three separate stories, siblings). Edict effects (common/edicts/03_sacrifices.txt:108/220/334/448) -> necroids.200/201/202 (events/necroids_events_2.txt:14-215); death_cult_sacrifice_effect (00_scripted_effects.txt:5239).
- **`event-necroids-255`** — Diligent Decaying Drones — reviewed. OA:39 -> hidden 255 -> 260 after 36000+0-7200 days (necroids_events_2.txt:251-308).
- **`event-necroids-310`** — Anti-Virus — reviewed. OA:1467 on_ship_destroyed_perp; Cordyceptic Drones civic, swarm-type opponent, fire_only_once (necroids_events_2.txt:536-557).
- **`event-nomads-4720`** — Nomadic Wanderlust (exploration rewards) — reviewed. Hidden nomads.4720 (events/nomads_events_1.txt:14256+, OA:967 on_entering_system) tracks 8 system categories; chain card also reached from nomads.4715 (event-nomads-4715, c8b). Request R7.

## Requests

- **R1 (coordinator/compiler):** event-origin-112/113 compile as stories from hidden routers; both are hidden by exclude. If a cleaner mechanism exists (a suppress/hide list) please use it; the 2 orphan fragments are intentional.
- **R2 (c1-origins):** `chain-fruitful-partnership-chain` should be part of `origin_fruitful` (chain carried by OPEN_SEED_PODS_PROJECT and started by fruitful_start_effect) or hidden.
- **R3 (c3b-exploration):** `chain-cs-crimson-crawlers-chain` should be part of `anomaly-crimson-crawlers-category` (project carries event_chain) or hidden.
- **R4 (compiler):** `base =` variant events (pirate.2/8/9/12/16, Treasure Hunters title variants of pirate.1/6/7/11/14) are not compiled as docs ("not found").
- **R5 (c2-precursors):** `site-site-georadiation-terraforming` should bridge 1531.e/.g/.i -> extreme_frontiers.1532 -> 1533 -> 1534 -> 1535 (the destroyed-fleet ending now lives in event-extreme-frontiers-1533); `site-site-chronicles-of-dendrus` should bridge extreme_frontiers.1425 -> New Bratulla survey (event-extreme-frontiers-1430). Consider merging the two small stories into the site stories.
- **R6 (voidworm / cutholoid reviewers):** event-grand-archive-2040 continues VOIDWORM_GLANDS_PROJECT (situation-voidworm-country-situation); event-grand-archive-3025 belongs with the Cutholoid story (event-grand-archive-3010).
- **R7 (c8b):** event-nomads-4720 and event-nomads-4715 describe two entries into the same chain nomad_exploration_chain; consider cross-linking or merging.
- **R8 (c8b / coordinator):** the c8a ledger claims shroud.5100/5105/5110 belong to event-game-start-1; they are in `event-shroud-5100` (this ledger).

## Open questions

- DLC owner of the Bemat Thalassocracy (pirate.150/155) was not traced.
- For the nomads checklist, the exact trigger of nomads.52 (OA:1177 "counter increment") and nomads.53 was taken from on_action comments and not read in full.
