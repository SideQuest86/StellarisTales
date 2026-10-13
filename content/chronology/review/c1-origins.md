# C1 Origins — V4 review ledger (agent c1-origins)

Scope: the 58 stories in `assignments/c1-origins.txt` (every origin in `common/governments/civics/00_origins.txt`).
Authority: read-only game install `D:/Living/Steam/steamapps/common/Stellaris` (hashes of all 2,830 extracted source files
re-checked against the install on 2026-10-12: identical). Line numbers below are **actual game-file lines** found with
ripgrep; they are cited as `file:line`.

Conventions used in fragments:
- `opening` lists every top-level branch the origin itself starts (game start dispatch, yearly/mid-game pulses gated by the
  origin), each with its own label; continuations reachable from earlier docs are tree edges or reviewed `bridges`.
- Generic/shared content that an origin merely touches (shared anomalies, generic situations, crisis content) is cut from
  the origin tree with `suppress`/`exclude` and documented here as an association (cross-story link), not merged.
- Origins with no story windows get a reviewed card-only fragment and a short guide with the mechanical start conditions.

## Per-story results

### origin_treasure_hunters — reviewed (98 docs)

- Root/opening: card → 8000 (on_game_start_country `00_on_actions.txt:64` → hidden 7999 → 8000 day 1, `origin_events_grand_archive.txt:2005-2048`); starting relic via 2220 (`00_on_actions.txt:61`).
- Main line verified stage by stage against `origin_events_grand_archive.txt:2023-7308`, projects `04_projects_grand_archive.txt:236-719`, situation `11_grand_archive_situations.txt:315-503`, site `11_grand_archive_arc_sites.txt:2-43`, gateways `05_gateways.txt:526-623`, on_action hooks (`00_on_actions.txt` 61/64/480/941-943/1067/1170-1172/1682-1684/2050-2051/2734-2735/4257-4259). All 47 migrated V3 bridges still match; their evidence now cites real file:line.
- Corrections: (1) `hubs: situations:voidworm_country_situation` — generic Grand Archive "Voidworms Behavior" situation (started by `create_voidworms_country`, galaxy-generation voidworm initializers, 8310 and Primal Calling's 1005) with the whole voidworm plague (2310/2400-2500/eradicate chain) had been pulled into this origin; now its own story `situation-voidworm-country-situation`, linked from 8310. (2) the impossible links 2006 → Primal Calling 1002/1060/1069/1070/1080 are gone because the shared counter `grand_archive.200` is now a hub (declared in origin_primal_calling; `grand_archive_events.txt:200-209` routes on only for Primal Calling). (3) suppress 8005/8060/8135/8285 → event-chain card (failsafe `begin_event_chain` in `grand_archive_effects.txt:1967-1974/2228-2235/2266-2273/2492-2499`). (4) New bridges: 8080 → BUILD_GRAND_ARCHIVE (8085, on_tech_increased `00_on_actions.txt:2734`) → 8090 (`20_grand_archive.txt:156-159`, arkship module `00_arkship_utility_modules.txt:399-405`); KILL_PROJECT → GATEWAY_VOIDWORMS_DEBRIS_PROJECT (8305 `:4887-4899`); 8280 → 5015 (r_celestial_chart_4 active effect, `grand_archive_relics.txt:989-1023`); 8280 → 6010/6011 (five-year pulse 6000, `00_on_actions.txt:480`, `grand_archive_events.txt:6385-6405`). No secondary root entries remain.
- Groups: hack outcome 8115/8120; fleet presence 8236/8241; post-voidworm 8315/8325/8400; offer 8500/8505; sabotage endings 8550/8545/8555. Endings: 8500 deal, 8600 main, 8595 judgment epilogue.
- Shared-content associations (linked, not merged): pirate.1/pirate.2 TH text variants (`pirate_events.txt:82-89,306-312`); trove windows 6010/6011/6015 are shared with non-TH empires via 6005 (story `event-grand-archive-6005`, C8c); 8090 also fires for Beastmasters/Curators.
- V3 `readings` for 8580 removed (coordinator note 2026-10-12): its passages are selected by `treasure_hunters_8580_choice_1/2/3`, set in the 8575 option scripts (`origin_events_grand_archive.txt:6871-6873, 6940, 6981`), plus identity atoms (is_gestalt, Letters of Marque / Barbaric Despoilers) — all expressible by doc.body path state + empire profile. Dialogue state machines (8025/8205/8245/8410/8570, incl. 8245 textProfiles whose flags are set in 8125/8130 `immediate`, not by options) are kept.
- Uncertain: semantics of `same_option_group_as` (start vs completion); 8531 title key `grand_archive.8530.name` missing in both localisations.

### origin_primal_calling — reviewed (24 docs)

- Opening (9 labelled branches): 7010 (game start → hidden 1000 `00_on_actions.txt:59`, `origin_events_grand_archive.txt:8-110`, +30 days); fauna milestones through shared counter `grand_archive.200` (`grand_archive_events.txt:173-211`) → hidden 1001 (`origin_events_grand_archive.txt:114-213`): 1002 (1st species, +30 d), 1060 (3rd, +1 d), 1069/1070/1080 (all species, +180 d; weights zeroed by is_homicidal / hunted_space_fauna <2 or >2); 9970 (on_ship_built `00_on_actions.txt:2560`); 1010 (on_colony_1_year_old `:3721` → colony_mod.161 `colony_events_3.txt:989`, Titanic Life from 1015 on_survey_planet `:1168`); 1100 (on_yearly_pulse_country `:419`, mid-game + every fauna met).
- Frenzied voidworms: 1100 → 1105 (+180 d) → `situation_frenzied_voidworms` (`11_grand_archive_situations.txt:505-690`, 0→300, base +1, approach +3). Bridges from hidden 1160 (on_ship_destroyed_victim `:1436`, `origin_events_grand_archive.txt:1543-1610`): situation → 1165 / 1185 / 1180; 1200 → 1205 (on_planet_bombarded `:2178`) → 1210; 1200 → 1170. Exclusive groups: paragon 1069/1070/1080; situation end 1200/1220/1165/1185. Endings: 1220, 1165, 1170, 1210, 1185.
- Corrections: generic Tiyanki first contact `first_contact_critters.15` had been absorbed into this origin (find_roots absorption through hidden 200 → 1001); declaring `hubs: grand_archive.200` (7 generic fauna first-contact callers, `first_contact_NPC_country_types_events.txt:190/416/641`, `grand_archive_events.txt:383/444/2775/2882`) stops the absorption — it is again its own story `event-first-contact-critters-15`. Voidworm Behavior/plague removed (hub declared in origin_treasure_hunters).
- Associations: 7010 is a shared window (Domestication tradition for other empires); 1010 replaces generic colony_mod.2; hidden 1005 (five-year pulse `:478`) spawns uncontacted fauna and may start the generic voidworm situation.

﻿### origin_mindwardens — reviewed (73 docs)

- Opening (5): 6050 (game_start.1 `game_start.txt:440-443` → hidden 6000 `origin_events_shadows_shroud.txt:8-240`, +3 months), 6200 / 6225 (exiled_aura on_progress_complete `00_auras.txt:2101/2109`), 6125 (+12 years or 30 d after 6120), 6231 (on_colony_defenders_lose `00_on_actions.txt:888` → hidden 6230).
- 23 bridges for state continuations: border fleet entry (6100, `:1076`) → 6101 → first-contact stages 6110 → 6115 → 6120 (`02_first_contact_unique_stories.txt:239-267`); diplomacy 6010 → 6020/6030; 6200 → 6220; reclaim 6240 → 6241; Grand Ward (`23_shroud_buildings.txt:1900`) → 6215; 6300 (on_tech_increased `:2747`); seal built 6305 → 6500 (`:3671`); reconstruction 6585 → 6575; war-chain POIs → 6580 / 6600 / 6601 (6540/6544/6545); 6600/6601 → 6700 / 6705; 6770.b relic → 6780 (`relics.txt:2922`); FIRST_ENCLAVE marker → 6825 (on_establish_mercenary_enclave `:4807`) → 6852 / 6830.
- Corrections: `hubs: shroud.4201` — the Mindwarden enclave service menu (`shroud_events.txt:9255-9380`, ~38 windows, used by every empire contacting the enclave via on_custom_diplomacy `:744`) was merged into the origin; now its own story `event-shroud-4201`. Suppressed 6110 → leviathans.98 and → cara.1020/2020/3020 (generic first-contact helper branches). V3 kept 6125 out of the opening; it is a game-start timer (`:16`), so it is an opening branch with its own label.
- Groups: ultimatum 6530/6535; first world 6600/6601; second world 6700/6705. Ending: 6830.

﻿### origin_unplugged — reviewed (93 docs; no fragment existed)

- Opening (6): 100 (game start `00_on_actions.txt:66` → hidden 199 `unplugged_events.txt:25-103` spawns the hostile fleet; on_fleet_destroyed_perp `:1688` → 100), 3205 / 3250 / 3255 (on_post_communications_established `:2275-2276`), 4005 (yearly 4000 `:423`, 3/5 chance), 2495 (on_entering_system_fleet `:1072`).
- Machine Legacy chain: 100 → 2000 (+100/20 d) → bridges through hidden 198 (on_survey_planet `:1174`, `unplugged_events.txt:106-217`), 2035 (`:1598`), 2204 (`:946`, +360 d → 2205), 2300 (`:1071`), 2390/2400 (`:1689-1690`), UNPLUGGED_MACHINE_ARCHIVE on_progress (`04_projects_unplugged.txt:63-99`). Other empires' anomaly variants (MACHINE_LEGACY_MAKERS/TAKEN/CREATORS_CAT, 2403/2411) attached next to the origin's own versions.
- Identity situation (`12_unplugged_situations.txt`, `unplugged_effects.txt:603-609`, 3901 `unplugged_events.txt:3729-3854`): drawn as three linear tracks (3105-3107, 3115-3117, 3110-3112) with 64 suppressions of the cross-track re-selection mesh (documented as a reading simplification in evidence, note and guide); 12 false links cyberization → 5001-5004 suppressed (`unplugged_effects.txt:637-790`).
- Groups: stage-3 alternatives 2021/2022, 2121/2125, 2321/2325; Makers fleet 2036/2037/2038; finale 2450/2455. Endings 2450, 2455, 3090.
- Uncertain: compiler stage chaining of dig gatekeeper outcomes (R5).

﻿### origin_legendary_leader — reviewed (87 docs)

- Opening (11): 5004 (game_start.1 `game_start.txt:522-526` → hidden 5000 `origin_events_paragon.txt:15-63`, +180-540 d), 5005 (on_colonization_started `00_on_actions.txt:1271`), seven diplomatic milestones 5023/5025/5027/5029/5033/5039/5038 (fedev.499; hidden routers 5024/5026/5028/5032/5034/5037 on on_becoming_subject `:4507-4508`, on_war_won `:3137`, on_war_lost `:3165`, monthly `:350-351`), 5201 (yearly 5955/5960 `:415-416` and luminary_speech_effect `paragon_effects.txt:14`), 5900 (on_leader_death `:2390`).
- Bridges (19): 5005 → 5010 (on_colonized `:1313`); promise situation → 5014 and insights 5305/5310/5315/5320/5340/5345/5370 (`00_council_agendas_ethics.txt`), → 5325/5330/5335/5360 (origin agenda `00_council_agendas.txt:167-212`, random 1:1:1:1); reformists situation → 5095 (`:143-164`); 5211 → 5213 (on_war_ended/won, 5950); 6015 → 6030 (monthly `:360`).
- Groups: 5008/5009; crossroads 5220/5221/5222/5211; immortality 6005-6025; origin-agenda insight 4-way; milestones (parallel). Endings: 6035, 5900, 5213, 5223, 5220.
- Correction: V3 opening label used 启明者; the game's term is 光耀者 (leader_trait_legendary_leader).

## Requests
﻿- R1 (new unowned stories created by C1 corrections; please assign): `situation-voidworm-country-situation` (generic Voidworms Behavior situation + voidworm plague, hub declared in origin_treasure_hunters), `event-first-contact-critters-15` (generic Tiyanki first contact, freed by hub grand_archive.200 in origin_primal_calling), `event-shroud-4201` (Mindwarden enclave service menu, hub declared in origin_mindwardens; suggested C6 enclaves). Title of event-shroud-4201 is empty (all entries inherit titles via `base =`).
- R2 (compiler/extractor): record and call-graph line numbers are wrong for files that use `inline_script` (e.g. events/grand_archive_events.txt is ~1600 lines too high, first_contact_NPC_country_types_events.txt and shroud_events.txt too); ledger/fragment evidence in C1 cites real file lines. scripts/callers.py crashes on path entries of kind `effect` without `name` (KeyError) — a tolerant copy was used.
- R3 (compiler): events defined with `base = <event>` (e.g. shroud.6515-6535, 6723-6795, grand_archive.8527/8528/8532/8533) lose the inherited title/options in extraction, so they show empty titles and no options; C1 used nodeLabels as a stopgap.
- R4 (compiler): bridges cannot carry an ordering hint, so a later main-line child with a delay sorts after optional bridged branches (e.g. TH 8280 children).
﻿- R5 (compiler): `stage_sequence` chains every readable outcome reached through an archaeology site's stages in definition order, so if/else outcomes of a hidden stage gatekeeper become consecutive "next stage" edges (unplugged 2015→2021→2022→2030, 2121/2125, 2321/2325; likely also in C2 precursor sites). Stage edges are also not suppressible from fragments. Suggest: treat outcomes of one stage event as one stage slot (exclusive by its if/else/random), and honour `suppress` on stage edges.
