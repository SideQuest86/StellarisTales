# C4 星界裂隙 Astral rifts — review ledger (c4-rifts)

Reviewer: Opus 5.5 (C4 rifts review), working copy `st-agents/c4-rifts`. Started 2026-10-12.
Authority: `D:/Living/Steam/steamapps/common/Stellaris` (read-only). File:line citations below are **real game-file
line numbers**; the compiled source graph / record `line` fields are computed after inline-script expansion and are
larger (see Requests R2).

## Mechanics verified once (apply to every rift story)

- Rift definitions: `common/astral_rifts/00_astral_rifts.txt` — `event =` is the first chapter; `event_weight` is the
  draw weight from the explorer country's rift pool (`fill_astral_rift_event_pool`, astral_planes.5 at
  `events/astral_planes_events.txt:367`); `randomized = no` rifts (riftworld, crystal) are only created by
  `spawn_astral_rift = { id = … }`. Rifts with `can_reward_relic` are locked galaxy-wide while explored
  (astral_planes.3, :252) and unlocked again if the relic was not won (astral_planes.4, :298).
- Progress: each phase ends with a d10 roll + skill bonus + clues − chapter difficulty; ≥14 = breakthrough (next
  chapter), 1–4 / 5–9 / 10–13 add 0 / 1 / 2 clues (`common/scripted_effects/astral_rift_effects.txt:45-109`,
  `localisation/english/astral_planes_l_english.yml` EXPLORATION_LOG_ROLL_TOOLTIP / astral_rift_roll_header).
  An event's `difficulty` is the difficulty of reaching that chapter (`@astral_rift_*_difficulty` 0–6,
  `common/scripted_variables/06_scripted_variables_astral_planes.txt:10-16`); `add_stage_modifier
  astral_rift_difficulty_increase/decrease_N` changes it.
- `set_next_astral_rift_event = { id = A on_roll_failed = B fail_probability = @default_failure_probability }`:
  A after a breakthrough, or the fallback B if the stage fails; fail chance 0.015 per roll
  (`06_scripted_variables_astral_planes.txt:7`, loc SET_NEXT_ASTRAL_RIFT_EVENT_FAIL "Fallbacks to … if stage fails.
  Probability to fail at each roll"). A and B are mutually exclusive outcomes of one stage.
- `finish_astral_rift = yes` ends the exploration (scientist returns); on_astral_rift_exploration_complete
  (`common/on_actions/00_on_actions.txt:5009-5027`) then runs bookkeeping and a 1/50 random_events roll for
  astral_planes.6095 (Final Escapee).
- `on_astral_rift_pre_event_fire` → astral_planes.6 (`astral_planes_events.txt:388-635`) sets
  `description_*` rift flags from the explorer's ethics/authority and the scientist's species; event text variants use
  `switch = { trigger = has_astral_rift_flag … }` on these flags.

## Per-story results

### rift-siege-on-paradise — reviewed
- Root: rift card `astral_rifts:siege_on_paradise` (`00_astral_rifts.txt:392`, weight 1, ×2 baol_chain running,
  ×4 completed) → first chapter 3000 (`astral_rifts_3_events.txt:11`).
- Structure checked event by event (3000–3099): Baol route 3005/3006 → 3010/3015 → help 3020/3021 (4 plans → 3030
  [+3031 Oakenstalk recruit], 3035, 3040, 3049) or stand aside 3025 → 3045/3046 → +720..1440 d 3047; Grunur route 3050
  → 3055 → 3060 (one tech option → 3070 → 3085; Baol data → 3075 → 3090/3095; refuse → 3095) or 3065 → 3076/3080 →
  3090/3095; 3095 → hidden 3098 (+1800..2520 d) → 3099.
- Compiled draft was correct; no on_roll_failed in this rift. Added: 3 exclusive groups (Baol-chain variants of
  3000.a, 3055, 3025.a; evidence :22-72, :965-1012, :541-565), 8 endings, nodeLabel for 3099, notes on weight and on
  the single visible tech option of 3060 (`3055.a` switch :975-998, `inline_scripts/astral_rift/3060_tech_option.txt`).
- Guide: public/summaries/rift-siege-on-paradise.md.

### rift-riftworld — reviewed (absorbs event-astral-rift-30)
- Root: `astral_rifts:riftworld` (`00_astral_rifts.txt:1`, randomized = no), created only by Riftworld origin
  astral_planes.2100 (`origin_events_astral_planes.txt:28-40`, with research station). Chapters 1→3→5→10/15 (faction
  visits, one switch allowed: 10.c/15.c; abandon 10.d/15.d → 16)→20 World Council→25 or failure 30.
- Correction: on_roll_failed 30 (`astral_rifts_0_events.txt:585-625`, all three options of 20) was missing → 30 had
  become story event-astral-rift-30. Added bridges 20.a/b/c → 30, exclusive group 25/30, endings 16/25/30/57, nodeLabel
  10 (scripted loc GetStarlightVanguardName, `common/scripted_loc/09_scripted_loc_astral_planes.txt:210`), notes
  (origin-only spawn, faction loop, zh/en "fifty years"/"15年" discrepancy in astral_rift.5).
- 16/25/30 schedule astral_rift.50 after 360 d → 55 → 56 → 57 (Formless foreshadowing); 25/30 fire 40 at once.

### rift-corridors — reviewed (absorbs event-astral-rift-120)
- 100 → 105/110 → 115; 115.a → 125 (breakthrough) / 120 (on_roll_failed, `astral_rifts_0_events.txt:1346-1350`);
  115.b → 130. 120 exiles scientist, hidden 135 after 1800 d → 140 return. Bridge 115.a → 120, group 125/120,
  endings 125/130/140, nodeLabel 140.

### rift-ancient-battlegrounds — reviewed
- Weight 1, ×0 nomadic, relic lock (r_daedalus_seal). 200 → 205/210 (210 exclusive_trigger option for Evolutionary
  Predators) → 215 → 220 (relic) / 225. No failure branch. Endings 220/225, notes.

### rift-library — reviewed
- 300 → 305/310 → 315 → 320 → 325 → 330 (9 Fractal Seeds) / 335 (3). Endings only; draft correct.

### rift-subnautical — reviewed
- Relic lock (r_celestial_tear). 500 → 505 → 510 / 515 (non-aquatic) / 516 (aquatic) → 520 → 525 (a/b/c → 535/536/537)
  or 530 → 535. All endings give the relic. Group 515/516, endings, notes.

### rift-tower — reviewed (family; absorbs event-astral-rift-695)
- Fragment now defines family `rift-tower` (start + member `astral_rifts:tower`, member hidden router astral_rift.695)
  so the on_leader_death router no longer opens a duplicate story. V3 bridge 691.b → 696 confirmed
  (`astral_rifts_0_events.txt:2754-2773` sets recruited_tower_rift_leader + leader flag; 695 :2776-2796 needs both and
  non-gestalt; on_action `00_on_actions.txt:2394`); 691.a gets no epilogue. 615.a → hidden 690 (+360 d) → 691.
  Endings 620/625/696, nodeLabels 691/696, notes.

### rift-whiteout — reviewed
- 700 → 705/710 → 715 → 720/725 → 730 (single ending, A Gift 3600 d). Draft correct.

### rift-advisor — reviewed
- 800 → 805/810; 805 → 815/810; 810 → 815/820; 815 exile + hidden 835 (+1800 d) → 840 → 845; 820 → 825/830 → 845.
  845 "VIR" (is_advisor_event, toggles tutorial level) is the shared coda. Ending 845, nodeLabel 840, note 815.

### rift-vortex — reviewed (absorbs event-astral-rift-915)
- Relic lock (r_ever_spinning_top). 900.a → 905; 900.b → 910 / failure 915 (`astral_rifts_0_events.txt:3517-3521`,
  scientist killed). → 920 → 925 → 930/935 → 940 (relic). Bridge 900.b → 915, group 910/915, endings 915/940.

### rift-lonely-planet — reviewed
- 1100 → 1105 → 1110 (bio-ship / evopred variants) → 1125, or 1115 → 1120. Endings 1120/1125. Draft correct.

### rift-microverse — reviewed (family)
- Weight 0.5, ×0 if astral_scar_instability_found; also spawned by astral_planes.6008 `split_astral_scar = { ID =
  microverse }` (`astral_planes_events.txt:4127-4135`). Made a family (member: rift card) so the reviewed cross-link
  from 6008 stays a link (an extra edge into a root otherwise un-roots it and absorbs it). 1200 → 1205 → 1210 → 1215 /
  1220 → 1225 → 1235 / 1230. Endings 1215/1230/1235.

### event-astral-planes-6005 — reviewed
- Astral Scar Instability: on_survey_planet (`00_on_actions.txt:1167`) → hidden 6005 (80/20, conditions
  `astral_planes_events.txt:4005-4052`) → project ASTRAL_SCAR_INSTABILITY (60 d, limit 1080) → 6006 → 6007 / 6008, or
  on_fail 6009. Bridge 6008 → `astral_rifts:microverse` (cross-story link), group 6006/6009, endings 6007/6009, nodeLabel
  6008 (duplicate title "Cosmic Wound").

### rift-fluid — reviewed (absorbs event-astral-rift-1330)
- Relic lock (r_plasmic_core). 1300 → 1305 (rig snag) / 1310; 1305 → 1310 / 1311; → 1315/1316 → 1320 or 1325 / failure
  1330 (`astral_rifts_1_events.txt:1157-1161, 1270-1274`; scientist killed + ship destroyed). Bridges 1315.b/1316.b →
  1330, groups, endings, note on rig flag set in 1300 immediate.

### rift-garden — reviewed (absorbs event-astral-rift-1405, -1415, -1430, -1435)
- Nine on_roll_failed bridges (1400.b→1405, 1405.a→1415, 1410.b→1430, 1425.c/1430.b/1435.b→1445, 1440.b/1455.a/
  1456.a→1435), exclusive groups, endings 1415/1420/1450/1457/1465, nodeLabels for the three "A Creature" docs, zh title
  mistranslation note on 1445 ("行星物质"). 1445 → +1800 d 1465 (plantoid scientist returns).

### rift-desert-ruins — reviewed
- Relic lock (r_time_crystal). Time-loop puzzle with variable time_passed (@timeToSolve = 3, set in 1510, +1 in
  1535/1545/1560): 1500 → 1515 → 1510 → 1520 → 1530/1535→1525→1530 → 1545→1540/1550 → 1560 → 1555 or 1505 (if
  time_passed ≥ 3, `astral_rifts_1_events.txt:3166-3177`) / 1565. No on_roll_failed. Group 1555/1505, endings 1565/1505,
  nodeLabels for the repeated chamber docs.

### rift-station — reviewed
- Weight 1, ×0 if a mirrored empire exists or Riftworld origin. on_astral_rift_exploration_start → hidden 1699 creates
  the mirrored country and writes explorer_is_* flags (text variants); 1600 → 1605/1610 (1611 gestalt) → 1615 (or 1616
  for is_homicidal) → 1620 / 1625; 1620 → hidden astral_planes.1690; cleanup 1698. Group 1615/1616, endings.

### rift-tomb — reviewed (absorbs event-astral-rift-1725)
- 1700 → 1705/1710 → 1715; blasting options 1705.b/1710.b/1715.b → 1720 / failure 1725 (Grave Guardians hostile fleet,
  `astral_rifts_1_events.txt:4051-4148`). Three bridges, group, endings, note on 1715.a early finish.

### rift-rockworms — reviewed (absorbs event-astral-rift-1830)
- 1800 → 1805/1810 → 1815/1816/1820; 1815.a/1816.a → 1835 / failure 1830 (+360 d 1890 toxoid return); .b → 1825; 1820.b
  finishes. Two bridges, groups, endings, zh/en "a year"/"许多年" note on 1890.

### rift-volcano — reviewed (absorbs event-astral-rift-1935)
- 1900 → 1905/1910 → 1915 → 1925; destroy options 1915.b/1925.b → 1930 / failure 1935 (`astral_rifts_1_events.txt:
  5054-5058, 5123-5127`); 1930 → +2160 d 1940 → 1941 (→ yearly hidden 1945); 1935 → +360 d 1950 → +360 d 1955 (curse
  trait → yearly 1960, `common/traits/12_astral_planes_traits.txt:46-72`). Uncertain: 1935 trigger excludes Wilderness
  explorers.

### rift-research-lab — reviewed
- 2000 → 2015/2010; 2015 → 2010 / 2040; 2010 → 2020 / 2025; 2020.a → 2030, 2020.b → 2035 / failure 2030
  (`astral_rifts_2_events.txt:139-143`); 2030 → +30 d 2045 (scientist dies). Bridge 2020.b → 2030, group, endings
  2025/2035/2040/2045, nodeLabels (2040 duplicates 2010's title).

### rift-clock — reviewed (absorbs event-astral-rift-2120)
- Relic lock (r_continuum). 2100 → 2105 → 2110 / 2115 → 2125 (relic) / failure 2120 (`astral_rifts_2_events.txt:447-451`,
  scientist ages +20). Bridge, group, endings.

### rift-dimensional-dump — reviewed (absorbs event-astral-rift-2220)
- 2200 (help / recover gear) → 2205 → 2210 / 2215 → 2225 → +360 d 2230 (junker joins as commander). Only the
  rescue-route instance of the duplicated option key astral_rift.2205.a has on_roll_failed 2220 (`:596-610`); bridge added
  without `choice` (duplicate keys bind to the first instance — Request R6). zh/en mismatch noted on 2205.

### rift-genesis — reviewed
- Weight ×0 while any Genesis is explored (global flag via 2398/2399 on exploration start/complete) or without habitable
  colony. 2300 → 2305/2310/2315(EMP end) → 2320/2325 → 2330 (new species pop on nearest colony). Groups, endings,
  nodeLabels for the two "To the Stars".

### rift-entangled-dark-matter — reviewed (previous session; ledger entry added in session 2)
- Fragment and guide exist from session 1: 2400 → 2405 … 2415.a (first same-named option) on_roll_failed → 2435 bridge,
  groups 2410/2411 and 2430/2435, endings 2425/2426/2427 …; the duplicate option key astral_rift.2415.a binds to the
  first instance (see fragment evidence). Not re-checked in session 2 beyond a compile.

## Session 2 (resumed) — 2026-10-13

Helper note: a rift event's real file lines are used below (not the inflated compiled line numbers).

### rift-cleaning-drones — reviewed
- 2600 → 2605/2610; robot route 2605 → 2615 (Clean Shot, sets clean_shot, difficulty −3) / 2620 → 2635 → 2645 → 2650
  (organic non-Wilderness) / 2655; 2620.b → 2660. Cave route 2610 → 2625 (Avian Autopsy) and 2630 (Drone Repaired) are a
  2-of-2 parallel pair (flags avian_autopsy / drone_reactivated, `astral_rifts_2_events.txt:2673-2783`) → 2640 → 2665/2670/2675.
  Compiled tree already right; added parallel group, exclusive group, six endings, notes. Hidden 2698 (colonization
  blockers from the 2665 modifier, `00_on_actions.txt:1279`) deliberately not merged (side effect).

### rift-windswept-planet — reviewed
- Two lines (wind 2705→2715→2725; cave 2710→2720→2730) converge on 2755 wind / 2760 fungus / 2765 compromise (+2790 leader
  coda, 2 d) / 2770 eradication, chosen in 2745/2750 (25 alloys / 50 minerals gates; homicidal → 2770). Draft correct.

### rift-tiny-planet — reviewed
- 2800 → 2805 → 2810 → 2815/2830 → 2820 → 2835 or 2825 → 2840/2845 (+3600 d 2890). Option gates by is_unfriendly,
  civic_barbaric_despoilers, is_homicidal. Flags tidal_lock_knowledge / can_build_microplanet_memorial feed decisions
  (`09_astral_planes_decisions.txt:124,165`). Draft correct; groups/endings added.

### rift-interdimensional-circus — reviewed
- Straight line 2900–2920, then 2925 picks one of three performers; each has a sample (free) / paid (1000 energy or food)
  ending. Weight ×0 if greatest_show_anomaly_found. Draft correct.

### rift-bleached-planet — reviewed
- 2500 → 2505 → 2510/2515 → … → 2535 (spark of genius II + black light blinded) or 2540 (d_physics_10). Draft correct.

### rift-tropical-habitat — reviewed (absorbs event-astral-rift-3140)
- Missing on_roll_failed bridge 3130.a (non-toxoid, first same-named option) → 3140 (maimed unless robotic) → 3155;
  `astral_rifts_3_events.txt:1893-1902`. Groups, endings; hidden 3190 (post-contact opinion, `00_on_actions.txt:2273`)
  noted, not merged.

### rift-psionic-stranger — reviewed
- 3200 → 3205 → 3210 with option gates by the Zroni storyline flags (update_zrony_storyline_flags sets exactly one of
  completed/started/not_started) → 3215/3220/3225 → 3235 (→ 3280 after 1080+≤720 d) / 3240 (→ 3285, zroni_insight_modifier)
  or 3230 → 3245. Draft correct; the Zroni storyline itself is another category.

### rift-crystal — reviewed (family)
- randomized = no; spawned only by astral_situation.5 (crystal sphere study complete). Made a family (member: the rift
  card) so the cross-link from the sphere story stays a link. 1020.a → hidden 1095 (+2 d: Formless system + natural
  wormhole, rift destroyed) → astral_planes.45 (+1 d); 1020.b needs tech_wormhole_stabilization + 500 threads → 1030.

### astral-rift-in-space — reviewed (new family; absorbs event-astral-planes-7, -118, -119, -5055, -5060, -2005)
- The compiler had one story per hidden trigger (7, 118, 119, 5055, 5060). One narrative: first rift → situation
  situation_a_rift_in_space → hidden 25/30/35 → one of 55/60/65 (50/50/50 + "nothing" weight max(0, 80 − progress)) →
  astral_situation.20 (Rift Sphere +25 %) → 2005 on tech. 119/120 lock the situation when the rift's system is lost.
  Bridges to 2005 and 120. Uncertain: situation_progress unit in rift_in_space_event_probability.

### astral-crystal-sphere — reviewed (new family; absorbs event-astral-planes-10, -25, -35)
- 10 (yearly, chooses recipient) → 15 → study (→ astral_situation.5 → crystal rift) / destroy (→ astral_situation.1);
  20 lost, 25 gained, 30 + 35 delayed until the Rift Sphere is researched. Bridges 30 → 15 and 5 → rift-crystal.

### event-astral-planes-6029 — reviewed (Astralnomical Marvel)
- Hidden 6029 random event at colony age 3/4/5 (weight 20) → 6030 → 6035 → 6040 → 6050 (either vision) / 6045 → 6055.
  6059 hidden follow-up grants unity after each exploration while astral_zeal_modifier. Uncertain: widening_divide_N
  removal.

### event-astral-planes-6095 — reviewed (Final Escapee)
- 1/50 per completed exploration (`00_on_actions.txt:5023-5026`); AI extra 1/21; once per game; 6100 → 6105 hire/dismiss.

### event-astral-planes-110, -210, -1030 — reviewed (one-event stories)
- 110 Astral Actions (tech_astral_harvesting); 210 Scientist Returns (end_of_the_cycle_reckoning); 1030 Dimensional Lock
  expiry (on_dimensional_lock_expired, `00_on_actions.txt:5129-5135`; the compiler showed it as "Triggered by game
  state" — see Requests R2).

### astral-formless — reviewed (new family; absorbs event-astral-planes-3000, -3010, -3050, -3065, -3110, -3120, -3170)
- One narrative: strange wormhole → 3000 → 3005 → (8 scout fleets destroyed, hidden 3010) → 3015 → 3020 → situation_the_seal
  (100 progress; astral_situation.10 waves, hidden 3025/3030) → astral_situation.15 → 3099 → 3100 (submit 75/25 → 3101 /
  3102; demand → 3102; ally → 3110 rewards every 3600 d, 3114-3116, 3121-3123) ; war via hidden 3150/3151 → 3155, 3165;
  3065 anchor destroyed during the Seal → 3070. 7 bridges, 3 exclusive groups, nodeLabels for the many "The Formless"
  titles. rift-crystal now bridges 45 → 3000 (cross-story link).

### Session 2 totals
- All 41 rift-category stories are reviewed. Of the 70 assigned ids: 38 still exist as stories (all reviewed), the other
  32 were absorbed into families (event-astral-rift-* into their rift stories; event-astral-planes-* into
  astral-rift-in-space, astral-crystal-sphere, astral-formless).

## Requests

- R1 (compiler, low): the compiled line numbers of records are post-inline-script and larger than the real file lines
  (e.g. astral_rift.2698 shows `:4022`, real `astral_rifts_2_events.txt:3155`). Ledger/fragments use real lines.
- R2 (compiler, medium): on_action `on_dimensional_lock_expired` → astral_planes.1030 (`00_on_actions.txt:5131`) is not
  recognised as the trigger (tree shows "Triggered by game state"); the same may hold for other less common on_action names.
- R3 (compiler, medium): random_list with a computed `0 = { modifier = { add = value:… } }` entry (astral_situation.35)
  is shown as p=0.33 for the three real branches; the "nothing" weight is invisible in the graph (documented in a group note).
- R4 (compiler, low): duplicated option keys inside one event (astral_rift.2205.a, 2415.a, 3130.a, 2745.d/2750 …) bind
  bridges to the first instance only; works for all current cases (on_roll_failed is always on the first instance except
  2205 where the choice-less bridge was used), but a way to address "second instance" would be cleaner.
- R5 (cross-agent, origins/crises owner): `astral_planes.2104`/`2105` (Riftworld "Formless contact", fired from
  on_astral_rift_exploration_complete, `00_on_actions.txt:5014`) are not part of any story and not in my scope; the Zroni
  storyline flags (zroni_intro / zroni_completed) used by rift-psionic-stranger belong to the zroni story (not mine).
- R6 (cross-agent): `end_of_the_cycle_reckoning` (flag required by astral_planes.210) is set by the End of the Cycle crisis
  events; a bridge from that crisis story to event-astral-planes-210 would be correct but is not mine to add.
- R7 (cross-agent): the astral_situation.5 → crystal rift and rift-crystal → Formless links now exist as cross-story links
  (families astral-crystal-sphere, rift-crystal, astral-formless); the Riftworld origin story could link to rift-riftworld.

