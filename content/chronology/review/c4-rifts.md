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

## Requests

(see bottom of file; maintained as work proceeds)
