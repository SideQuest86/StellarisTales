# c5a-cetana — review ledger (story `cetana`)

Reviewer: c5a (Opus 5.5), 2026-10-12. Scope: Cetana, the Synthetic Queen (Machine Age crisis). Authority: the read-only
game install `D:/Living/Steam/steamapps/common/Stellaris`. Line numbers are those of the Read tool (1-based) in:

- **E** = `events/machine_age_crisis_events.txt` · **FX** = `common/scripted_effects/02_machine_age_effects.txt`
- **SIT** = `common/situations/08_machine_age_situations.txt` · **SP** = `common/special_projects/04_projects_machine_age.txt`
- **OA** = `common/on_actions/00_on_actions.txt` · **TR** = `common/scripted_triggers/02_scripted_triggers_machine_age.txt`
- **EC** = `common/event_chains/00_event_chains_machine_age.txt` · **ARC** = `common/archaeological_site_types/10_machine_age_arc_sites.txt`

Status: **reviewed** (whole chain checked; uncertainties listed at the end and in the fragment). Fragment
`content/stories/cetana.json` regenerated (106 bridges, 22 suppressions, 12 groups, 4 endings, 25 dialogues, notes,
node labels); guide `public/summaries/cetana.md` rewritten for the whole crisis. `scripts/story_tree.py` exits 0;
the report shows no `annotation_without_edge`, `suppress_without_edge` or `bridge_missing_record`. Tree: 120 docs
(observer.100 removed).

## Open question 1 — crisis.8295 and `event_target:gifted_system`

Facts:

1. 8295's `trigger` requires `exists = event_target:gifted_system` (E:10457-10464). Its `immediate` block is the only
   place that saves that target (`save_event_target_as = gifted_system`, E:10475-10486; `gifted_system_2` E:10487-10501).
2. Whole-install search (all `.txt/.yml/.gui/.gfx/.asset/.lua/.csv/.json/.settings/.cfg` under the install, incl.
   `common/`, `events/`, `localisation/`): `gifted_system` occurs only in 8295 itself (E:10463, 10485, 10497, 10500,
   10513, 10514, 10535, 10539, 10559, 10571) and in localisation strings that print it. There is no
   `save_global_event_target_as = gifted_system`, no scripted effect/trigger, on_action, situation hook or other event
   that sets it. No parametrised/dynamic target name (`gifted_$X$`, `@`) exists either (search for `gifted` in
   `common/` and `events/`).
3. DLC archives (`dlc/*/*.zip`) contain only music/sound assets (`.wav/.ogg/.asset` + music `.txt` playlists); no
   script members — so the loose files are the complete script source for every installed DLC.
4. The natural call chain is: situation `situation_synth_queen_player_facing` `on_monthly` → `random_events
   { 10 = crisis.8270 90 = 0 }` (SIT:789-792) → 8270 schedules 8255 after 180 + random 60 days (E:9774-9776) → 8255
   `fire_on_action = on_synth_queen_random_demand_list` (E:9792-9796) → `random_events { 5 = 8285 5 = 8290 5 = 8295
   5 = 8280 5 = 8300 }` (OA:5277-5285). None of 8270/8255/the on_action saves `gifted_system`, and the on_action is
   fired without scopes.
5. Compare the sibling demand 8300 (E:10704-10724): its trigger checks the *map condition* (`any_system_within_border
   = {…}`) instead of a pre-existing target — 8295 looks like an authoring slip, but that is commentary.

Answer: **unreachable by any script path in the installed files.** Under the standard order (an event's `trigger` is
evaluated before its `immediate`), the trigger can never pass, so 8295 never shows in normal play, and therefore its
follow-ups **crisis.8320** (only scheduled by 8295.1.a, E:10647-10659) and the communication topic **crisis.8060.g**
(requires `synth_queen_question_random_demand_system`, set only by 8320, E:11184-11187; read only at E:6276-6289)
are unreachable too. What the files cannot prove: engine internals (event-target lifetime across `fire_on_action`,
console/debug firing that ignores triggers). Whether a failed pick wastes the demand roll is also engine behaviour:
8255's `after` still sets the 220-day cooldown (E:9798-9803), but whether `random_events` re-rolls when the picked
event's trigger fails is not stated in the files.

## Open question 2 — databank project duration (1800 research days vs 900/540 time limits)

Facts:

- THE_SYNTH_QUEENS_DATABANK: `cost = 0`, `days_to_research = 1800`, `timelimit = 900`, requirements science ship +
  scientist, `on_success` → 8085, `on_fail` → 8130 + flags `rebellious_child`, `synth_queen_did_not_get_the_box_in_time`
  (SP:129-165). THE_SYNTH_QUEENS_DATABANK_COUNTDOWN: same with `timelimit = 540`, success → 8110, fail → 8125 (SP:167-201).
- `common/special_projects/documentation.txt` ("the one source of truth for Special Project Documentation", L1):
  `cost = 0 # research cost; must be '0' if using days_to_research` (L7), `days_to_research = 180 # days to research if
  cost is 0` (L22), `tech_department … only relevant if cost is not 0` (L23), `timelimit = 180 # optional; time before it
  expires and fires on_fail` (L25). So these are day-based projects (no research points), and expiry fires `on_fail`.
- `common/defines/00_defines.txt:932`: `SPECIAL_PROJECT_BASE_PROGRESS = 1 # i in the equation for special project time:
  x = (k * i) / (i + (y1 - z1) + (y2 - z2)... + (yn - zn))`. The files do not define k, y or z.
- Across all 59 projects that set both fields, only three have `days_to_research` > `timelimit`: the two databank
  projects and `military_joint_project` (3600 vs 2160, requirement `shipclass_military = 15`,
  `00_projects_federations.txt:867-880`).

What is provable: an unreduced 1800-day duration would always expire first; if k is the 1800 base days, the divisor
`(i + Σ(yn − zn))` must exceed 2 for the normal project (900 days) and 3.33 for the countdown (540 days). What is not
provable: what the y/z terms are (presumably surplus over requirements such as scientist level or ship count), and
which modifiers apply. The files therefore neither prove the projects impossible nor give their real duration; the
archive must not claim either.

## Structure (natural order) and corrections

Root 8035 (first visible doc for human players; true entry: `crisis_trigger.1` on `on_five_year_pulse` OA:279-281,
Synth Queen branch `events/crisis_trigger_events.txt:277-357` → hidden 8005 E:3963-3982; also the Defender projects
`06_projects_nomads.txt:501-534`).

| Change | Evidence |
| --- | --- |
| Suppressed 8035 → observer.100 | E:4297 `observer_event` (spectator mode only) |
| Suppressed 8039.a → STORM / 8046 / 8045 (folded through hidden AI event 8041) | E:4326-4338, 4540-4622 |
| Suppressed 8045 → 8020; 8020 now under 8035 | FX:1180-1196 (owner without speech_1) vs 8045 trigger E:4970 |
| 8025 (Wrecked Fleet) under 8035 (may precede the first address; its storm-study subtree therefore sits there and 8040's STORM edge is a ref) | OA:1056, E:4052-4205 |
| 8040.4.a → 8045 timing corrected: FE/AFE present → yearly 8043 after the last falls; none → next yearly check or 360 days, whichever first (V3 said "360 days") | FX:4048-4079, E:4724-4830, OA:262 |
| 8045 → 8060 / 8047 / 20000 bridges (previously secondary entries) | E:5725-5796; E:5635-5691 (OA:123) |
| Doomclock stages ordered 8525 (50%) / 8515 (80%) / 8505 (100%); removed V3 8525→8515 and 8515→8505 bridges; 8515 has no trigger and reaches empires already at war | SIT:607-709, E:11426-11468, 11865-11880 |
| War: V3 9010 → 23015 replaced by 9010 → 8060 (war option) and 8158 → 23015 / 8505 / 8061 / 10010; 8061 → 8062 | E:5828-5925, 5779-5794, 14873-14887, 12387-12448 |
| Investigation situation: progress line 9000 → 9010 first (suppressed situation → 9010); retaliation ladder 10100→10110→10120→10130/10140 and gift ladder 11010→11020→11030 replace nine parallel edges; 8250 with its relic condition | SIT:711-802, E:12631-13588 |
| 11010/11020/11030 explicitly included (outside the legacy 8000–10999 range but Cetana content) | E:13379-13582 |
| Raids: 8047 → CONVOY_AMBUSH; both ambush projects → random finds 8180/8187/8185/8190 and admonitions 8195/8194 (previously orphan secondary entries) | FX:1772-1781, E:8270-8380, 8922-9090 |
| Beacons: INVESTIGATION → 21000 gate (suppressed the five per-beacon edges); suppressed the unused INVESTIGATION → 20600 fallback | TR:238-243, SP:222-258, FX:1613-1641 |
| Redemption: 8060.8.b and 21110 → 24100 / shroud.10 with the four real Shroud entry points; 23020 → 23030 relabelled (other empires only — V3 read it as the player's continuation) | shroud_events.txt:129-189; utopia_shroud_events.txt:243-275; shroud_forged_events.txt:2117-2150, 4171-4222; E:15624-15632 |
| 23015 → 10020 / 10025 (relic Cetana's Heart) | relics.txt:961-1009, E:12450-12629 |
| 8295 / 8320 / 8060.g labelled unreachable (Q1) | — |
| V3 `readings` (9100, 9105, 9110, 8085, 8090) removed: compiled doc.body / option `when` express them (speech_1 is a doc-level set of 8040; materialist is an identity atom; tr_nanotech_adopt is an option condition). `legacy.situationConfig` dropped (unused by V4). | compiled `public/stories/cetana.json` |
| New dialogues: 8061, 23020 (steps); 8515 (13 states); 10105, 10110, 10120; 21125, 21140 (repeatable questions); 8194/8195 (duplicate "a" split by `occurrences`). V3 dialogues 8040, 8045, 8060, 8080, 8095, 8100, 8120, 8130, 8250, 8280–8300, 9115 re-checked against the source and kept (8295 profile labels marked hypothetical). | line ranges in fragment evidence |

Other verified facts: the 8270 comment "Fired by on_five_year_pulse_country" (E:9756) is stale; the real caller is
SIT:789-792. 8115 (decrypt after the race) gives no investigation progress, unlike 8090. The retaliation/gift
gatekeepers fire every rung with `days = 0`, but the rung triggers form a ladder (at most one passes for a given flag
state). `the_synth_queen_war_chain` is never begun (only ended, FX:3557), so its counters in 10000/10005/10010 are
inert. `rebellious_child` / `mother_knows_best_small_favor` are read only by an achievement (achievements.txt:2272-2275).
The history and raid chains abort on war or an awakened queen (EC:29-64). War starts only via 8060.war.1.a
(E:5914) or 8515.13.a (E:11790). Investigation progress sources: first storm study +1 (8999 or 9100), 9105, 9110, 8090,
four reachable reports, 20100/20200/20300/20400/20500, three raid secrets — more than the 10 needed.

## Cross-chapter dependency list

`kind` "in-tree" = flag set inside the Cetana tree (doc-level or option sets; should resolve from path state).
**external** / **game-state** / **identity** items need reviewer labels or the empire profile because the path cannot
see them.

```json
[
 {"target": "crisis.8025 body", "requires": "flag speech_1 (owner)", "set_by": "crisis.8040 immediate (doc-level)", "kind": "in-tree", "evidence": "E:4145-4157, 4386"},
 {"target": "crisis.9100 body", "requires": "flag speech_1", "set_by": "crisis.8040 immediate", "kind": "in-tree", "evidence": "E:12017-12028"},
 {"target": "crisis.8035 body (desc.b)", "requires": "flag attempted_entry_in_queen_storm", "set_by": "hidden crisis.8024 / crisis.8025 immediate (a fleet entered the storm before day 180)", "kind": "in-tree but usually after 8035 in tree order; needs a label", "evidence": "E:4096, 4177-4179, 4275-4286"},
 {"target": "crisis.8020 (whole event)", "requires": "NOT speech_1", "set_by": "crisis.8040", "kind": "in-tree (negative)", "evidence": "E:4038-4045, FX:1180-1196"},
 {"target": "crisis.8040.4.a -> STORM", "requires": "NOT synth_queen_started_storm_project", "set_by": "crisis.8025.CURSES / crisis.8040.4.a", "kind": "in-tree", "evidence": "E:4185-4196, 4519-4528"},
 {"target": "crisis.8046", "requires": "origin_scion + overlord with scion_master", "set_by": "origin", "kind": "identity + game-state", "evidence": "FX:4081-4104"},
 {"target": "crisis.8045 timing", "requires": "no fallen/awakened empire alive", "set_by": "FE wars", "kind": "game-state", "evidence": "FX:4048-4079, E:4730-4747"},
 {"target": "crisis.8045.8.a/8.b vs 8.c/8.d", "requires": "flag synth_queen_has_a_system", "set_by": "crisis.8045 immediate from territory", "kind": "game-state (doc-level flag computed from the map)", "evidence": "E:5026-5042"},
 {"target": "crisis.8045 exits -> STORM vs STORM_2", "requires": "synth_queen_started_storm_project / synth_queen_researched_first_storm_project", "set_by": "8025/8040.4.a ; crisis.9100 immediate", "kind": "in-tree", "evidence": "FX:4011-4033"},
 {"target": "crisis.9100.a -> STORM_2 (+1)", "requires": "player has situation_synth_queen_player_facing", "set_by": "crisis.8999.a", "kind": "in-tree", "evidence": "E:12043-12055"},
 {"target": "crisis.8999 +1", "requires": "synth_queen_researched_first_storm_project", "set_by": "crisis.9100 immediate", "kind": "in-tree", "evidence": "E:11946-11951"},
 {"target": "STORM_2 cost; crisis.9105 a/b; crisis.9110 a/b; crisis.9115 b vs b.nanotech", "requires": "has_tradition tr_nanotech_adopt", "set_by": "player tradition (time-dependent)", "kind": "game-state (profile-like choice)", "evidence": "SP:103-110, E:12084-12100, 12127-12151, 12219-12267"},
 {"target": "crisis.8060.l", "requires": "flag synth_queen_question_nanite_apprentice AND queen trust > 49", "set_by": "crisis.9115.b.nanotech ; trust = game-state", "kind": "in-tree + game-state", "evidence": "E:6587-6610, 12238-12266"},
 {"target": "crisis.8060.d", "requires": "flag synth_queen_question_blew_up_a_planet", "set_by": "crisis.8115.a or crisis.8125.a", "kind": "in-tree", "evidence": "E:6093-6149, 7776, 7873"},
 {"target": "crisis.8060.e", "requires": "flag synth_queen_question_opened_the_databank", "set_by": "crisis.8090 after or crisis.8115.a", "kind": "in-tree", "evidence": "E:6151-6208, 7376, 7777"},
 {"target": "crisis.8060.f", "requires": "flag synth_queen_question_random_demand_pops", "set_by": "crisis.8305 (after 8280.1 covert + 8280.1.a)", "kind": "in-tree", "evidence": "E:6210-6272, 11103-11113"},
 {"target": "crisis.8060.g", "requires": "flag synth_queen_question_random_demand_system", "set_by": "crisis.8320 only (<- 8295.1.a) - UNREACHABLE", "kind": "in-tree, unreachable", "evidence": "E:6274-6305, 11184-11187"},
 {"target": "crisis.8060.h", "requires": "flag synth_queen_question_zarqlan_knowledge", "set_by": "crisis.20100 immediate", "kind": "in-tree", "evidence": "E:6307-6322, 13640-13645"},
 {"target": "crisis.8060.i", "requires": "flag synth_queen_question_gave_zarqlans_head", "set_by": "crisis.8250.3.a", "kind": "in-tree", "evidence": "E:6425-6440, 11076-11087"},
 {"target": "crisis.8060.j", "requires": "flag synth_queen_question_found_cryo_pods", "set_by": "crisis.20200 option", "kind": "in-tree", "evidence": "E:6474-6489, 13685-13691"},
 {"target": "crisis.8060.k", "requires": "flag synth_queen_question_found_the_frozen_dreamer", "set_by": "crisis.21220.c", "kind": "in-tree", "evidence": "E:6538-6553, 14604-14612"},
 {"target": "crisis.8060.8.b, crisis.8060.8.1.c", "requires": "flag breached_shroud", "set_by": "Shroud content in other stories (shroud_shadows_scripted_effects.txt:4)", "kind": "external", "evidence": "E:6340-6358, 6407-6423"},
 {"target": "crisis.8060.war", "requires": "synth_queen_cannot_yeet_the_fleets + protected_from_queen_storm + synth_queen_researched_first_storm_project", "set_by": "crisis.9010 after or 8516 ; crisis.9110 after or 8516 ; crisis.9100", "kind": "in-tree", "evidence": "E:5835-5846"},
 {"target": "crisis.8060.z -> shroud_forged.700", "requires": "origin_shroud_forged + breached_shroud + synth_queen_can_contact_the_animator_of_clay + no End-of-Cycle covenant + not traitor + not contacted", "set_by": "origin; breached_shroud external; contact flag from crisis.8060.8.b or crisis.21110 after", "kind": "identity + external + in-tree (V3 edgeRequirements only knows 8.b)", "evidence": "E:6699-6721"},
 {"target": "crisis.8085.c; crisis.8090.a/b -> 8095 vs 8100", "requires": "ethic materialist", "set_by": "empire", "kind": "identity", "evidence": "E:7318-7372"},
 {"target": "crisis.8130 a/b vs c/1.d", "requires": "flag synth_queen_did_not_get_the_box_in_time", "set_by": "DATABANK on_fail", "kind": "in-tree (project outcome)", "evidence": "SP:158-164, E:7909-7984"},
 {"target": "crisis.8525 (whole event)", "requires": "NOT synth_queen_player_can_see_doomclock", "set_by": "doomclock_reveal in crisis.8090 after, crisis.8115.a, crisis.8525.a, crisis.10120.4.a", "kind": "in-tree (negative)", "evidence": "E:11865-11880, FX:3989-3996"},
 {"target": "crisis.8516 (whole event)", "requires": "player still has situation_synth_queen_player_facing", "set_by": "destroyed by crisis.8060.war.1.a", "kind": "in-tree (negative)", "evidence": "E:11815-11819, 5919-5924"},
 {"target": "crisis.8195 (whole event)", "requires": "NOT synth_queen_comm_scrambler", "set_by": "crisis.9000 immediate", "kind": "in-tree (negative)", "evidence": "E:8311-8316, 11974-11978"},
 {"target": "crisis.8194/8195 'a' variant", "requires": "flag already_apologized", "set_by": "an earlier 8194/8195 first apology", "kind": "in-tree (repeat event)", "evidence": "E:9645-9683"},
 {"target": "crisis.8195.c", "requires": "civic_barbaric_despoilers + NOT successful_raid_barbaric", "set_by": "identity; earlier 8195.c", "kind": "identity + in-tree", "evidence": "E:9707-9726"},
 {"target": "crisis.8187 / 8185 / 8190", "requires": "NOT raid_insight_1 / 2 / 3", "set_by": "each event's own immediate", "kind": "in-tree (repeat event)", "evidence": "E:9067-9087"},
 {"target": "crisis.8180 weight x0.2 and doomclock -20", "requires": "flag defeated_outpost", "set_by": "hidden 8170 (outpost fight won)", "kind": "in-tree (which ambush project)", "evidence": "E:8951, 9061-9064, 9313-9327"},
 {"target": "crisis.8070 body", "requires": "flag attempted_to_attack_the_queen_once", "set_by": "crisis.8075 after", "kind": "in-tree (repeat event)", "evidence": "E:6893-6904, 6962-6966"},
 {"target": "crisis.8061 vs 8062", "requires": "flag synth_queen_first_war_time_chat_done", "set_by": "crisis.8061.2.a", "kind": "in-tree", "evidence": "E:5779-5794, 6784-6793"},
 {"target": "crisis.10110 / 10120 / 10130 / 10140", "requires": "retaliation ladder flags + trust < 25", "set_by": "10100 after; 10110.a or 10110.3.a; 10120.b or 10120.4.a; trust = game-state", "kind": "in-tree + game-state", "evidence": "E:12631-13376"},
 {"target": "crisis.10130 vs 10140", "requires": "is_gestalt", "set_by": "empire", "kind": "identity", "evidence": "E:13269-13275, 13333-13339"},
 {"target": "crisis.11020 / 11030", "requires": "gift ladder flags + trust > 75", "set_by": "11010 / 11020 after; trust = game-state", "kind": "in-tree + game-state", "evidence": "E:13379-13582"},
 {"target": "crisis.8250", "requires": "has_relic r_severed_head", "set_by": "Ancient Relics Zarqlan dig (ancient_relics_arcsite_events_2.txt:912-926)", "kind": "external", "evidence": "E:10985-10995"},
 {"target": "crisis.20100 body", "requires": "flag zarqlan_language_translated", "set_by": "Ancient Relics Zarqlan dig (ancient_relics_arcsite_events_2.txt:799)", "kind": "external", "evidence": "E:13622-13633"},
 {"target": "crisis.21000", "requires": "crisis_20100/20200/20300/20500_happened", "set_by": "the four beacon events' immediate", "kind": "in-tree (parallel gate)", "evidence": "TR:238-243"},
 {"target": "crisis.8270 -> demands", "requires": "synth_queen_finished_first_demand_chain", "set_by": "after of 8095 / 8100 / 8120 / 8130", "kind": "in-tree", "evidence": "E:9763-9770, 7488-7491, 7687-7690, 7840-7843, 8061-8064"},
 {"target": "crisis.8300", "requires": "investigation progress >= 8 + eligible habitable system", "set_by": "sum of in-tree +1 events; map = game-state", "kind": "in-tree counter + game-state", "evidence": "E:10704-10724"},
 {"target": "crisis.24100 entry points", "requires": "synth_queen_can_contact_the_animator_of_clay; NOT synth_queen_contacted_the_animator_already; 2000 energy + 500 Zro; shroud.10 also NOT Shroud-Forged and NOT synth_queen_refused_the_animator_contact", "set_by": "crisis.21110 after or crisis.8060.8.b; 24100 immediate; shroud.10.b", "kind": "in-tree + external (Shroud access)", "evidence": "shroud_events.txt:156-188; utopia_shroud_events.txt:243-275; shroud_forged_events.txt:2117-2150, 4171-4222"},
 {"target": "crisis.24200 -> RITUAL", "requires": "flag synth_queen_took_the_animators_deal", "set_by": "crisis.24115.a", "kind": "in-tree", "evidence": "E:15346-15371"},
 {"target": "crisis.24110 a / b / c", "requires": "ruler exists / non-capital upgraded colony exists / Zro > 27182", "set_by": "game state", "kind": "game-state", "evidence": "E:15174-15237"},
 {"target": "crisis.24100 / 24115 / 24120 body; 24110.a label", "requires": "is_robot_empire", "set_by": "empire", "kind": "identity (compiled as 'other' - see Requests)", "evidence": "E:15038-15049, 15254-15265, 15302-15314"},
 {"target": "crisis.23030", "requires": "NOT the ritual empire", "set_by": "crisis.24250.a saves psi_defeated_synth_queen", "kind": "in-tree (audience)", "evidence": "E:15624-15632"},
 {"target": "crisis.10020 vs 10025", "requires": "is_hive_empire", "set_by": "empire", "kind": "identity", "evidence": "E:12463-12572"}
]
```

## Requests (coordinator / compiler)

1. `scripts/callers.py` crashes with `KeyError: 'name'` on `effect` path elements without a name (e.g.
   `callers.py crisis.8270`); use `p.get('name')`.
2. Source-graph line numbers for `events/shroud_forged_events.txt` are off by about 140 lines (graph: shroud_forged.700
   at 4311; file: 4171-4172) — probably line-ending counting in the extractor.
3. Conditions: `is_robot_empire` and `has_tradition` compile as `other`; `resource_stockpile_compare` compiles into two
   bogus atoms (`resource=unity`, `value=2500`); `from = { is_country_type = default }` (8194/8195.c) loses its `from`
   scope; `has_synth_queen_dialogue_flag = no` stays opaque. Doc-level set tracking should also cover flags set by hidden
   routers before a doc (8024 → attempted_entry_in_queen_storm) and by project `on_fail` (did_not_get_the_box_in_time).
4. Reader: an explicit "unreachable in the shipped script" marker for docs/options (8295, 8320, 8060.g, 8060.5.b)
   would be cleaner than labels alone.
5. Stage-sequence auto edges are added after `suppress` and cannot be suppressed (harmless here: 8525 → 8515 ref).

## Uncertainties (also in the fragment)

- 8295 unreachable assumes trigger-before-immediate; no runtime verification.
- Databank day semantics (formula variables undefined in the files).
- Whether `random_events` re-rolls when the picked demand's trigger fails (8255 sets the cooldown either way).
- Engine ordering of same-day ladder events (10095/11000 fire all rungs at `days = 0`).
- FROM scope of 8194/8195 option c.
- Whether a locked (completed) investigation situation keeps running its `on_monthly` checks.
