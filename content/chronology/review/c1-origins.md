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

