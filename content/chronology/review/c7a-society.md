# C7a society review ledger (Opus 5.5, 2026-10-12)

Scope: `content/chronology/review/assignments/c7a-society.txt` (243 story ids). Working copy only; game install read-only.
Each entry: story id → status, structure decided, fragment changes, evidence (file:line), open questions.
Merged ids (absorbed into a family fragment) are listed under the family that now owns their records.

## Requests (compiler features / other owners)

1. **Stage-order override for situations (compiler).** `story_tree.py stage_sequence()` chains every stage `on_first_enter`
   doc in *definition* order and adds these as reviewed edges that `suppress` cannot remove. This is false for
   bidirectional situations whose stages are listed left-to-right on the bar while progress starts in the middle, e.g.
   `situation_mysterious_labyrinth` (`common/situations/01_narrative_situations.txt:149-347`: stages stage_3/stage_2/
   stage_1/stage_2_alt/stage_3_alt, `initial_progress = 50`, `progress_direction = bidirectional`). The compiled chain
   situation.25 → 15 → 10 → 40 is wrong (10/15 occur when progress falls, 40/45 when it rises). Please add a fragment
   field such as `"stageOrder": {"<situation record>": [["situation.10","situation.15"],["situation.40","situation.45"]]}`
   or `"noStageSequence": ["<situation record>"]` so reviewed bridges can express the two directions.

## Stories

### event-situation-2000 — The Kaleidoscope / 万华镜 (family) — reviewed
- Merged: `event-situation-2060` (host-destroyed callback), `event-situation-2020` (espionage operation 2020/2021),
  `event-situation-2049` (Disco Sphere ending). All are the same narrative (`events/situation_events.txt:2828-4178`).
- Entry: hidden 2000 via `on_five_year_pulse` random_events 50/200 (`00_on_actions.txt:286-289`), game-start gate 1999 30%
  (`situation_events.txt:2832-2849`, `00_on_actions.txt:22`). 2002 splits first host → 2003 / returning host → 2010.
- Bridges: situation → 2020 (operation_kaleidoscope potential, `operations.txt:1225-1276`); 2020 → 2021 (stage order);
  2021.LAUNCH_OPERATION → 2025 (deficit on_start, `02_deficit_situations.txt:37-42`; 30-year flag `operations.txt:29,1280-1289`);
  2048.a → 2049 (`01_dyson_sphere.txt:1044-1133`). 2025 stays in c7b's energy-deficit story too (shared doc).
- Groups: burst outcomes 2041/2043 exclusive (10/90 modified); host endings exclusive; monthly random pool parallel.
- Uncertain: script values for mood/event weights not traced.

### event-situation-150 — Unusual Snow / 白雪异变 (family) — reviewed
- Merged: `event-situation-190` (Colony Lost! / Unending Ice) — war aftermath of the snow (`situation_events.txt:722-799`).
- Fixes: 180/185 moved from the situation card to after 165 (165 `after` sets path_locked; on_progress_complete branches
  on the locked approach, `01_narrative_situations.txt:6-16, 51-58, 90-97`); bridges 180.A/185.B → 190 via
  `on_colony_defenders_lose` (`00_on_actions.txt:877-884`, trigger `situation_events.txt:737-739`); 190 → 195 labelled
  (1800+360 days, controller check `situation_events.txt:741-768`). Stage chain 155 → 165 is correct (definition = progress order).
- Groups: 180/185 exclusive; 160/170/175 monthly pool (160 & 170 share a flag; 175 once).

### event-situation-200 — Solar Flare / 恒星耀斑 — reviewed
- Fixes: 292/293/294 re-anchored from 202 to the situation (hidden 289 at 1785 days or on_abort, switch by stage,
  `situation_events.txt:1825-1830, 2558-2582`); 299 edges labelled with the care-home condition (`2779-2781`, deposit only
  from 203.a); 202 → 203 labelled (bio-trophies, 65+35 days).
- Groups: endings 290/292/293/294 exclusive; monthly pool 210/213/215/216/250 (214 router: 215 w5, 216 w0+15 with machine_nurse jobs).

### event-situation-500 — Free Fall / 自由落体 — reviewed
- Entry: hidden 500 via `on_five_year_random_pulse_country` 25/2335 (`00_on_actions.txt:504`).
- Fixes: 590 moved under 580 (100% only via no-return stage 80-100, `01_narrative_situations.txt:639-645, 705-711`);
  mutiny → 513 labelled (20+25 days). Groups: fall vs escape (590 / 596 / 597), gestalt witness 591/592 (5:5 civic
  modifiers), monthly pool. Script comments swap 596/597 rewards; effects followed.

### event-situation-1125 — Consume Star / 吞噬恒星 — reviewed
- Title set from the operation name (`operation_consume_star`). Bridges 1125 → 1130 → 1135 (operation stages,
  `operations.txt:1196-1210`); the draft had three parallel entries. Perspective switches operator (1125-1140) → target
  (1145-1170). Cure ending is silent (hidden 1165/1175) → recorded as an ending on the project. Prerequisite trophy from
  the leviathan celebration (`00_scripted_effects.txt:5994-5996`). Commentary: allow checks flag `infested_star` while 1135
  sets `has_infested_star`.

### event-situation-5 — The Mysterious Labyrinth / 神秘迷宫 — partial
- Structure reviewed: bidirectional (start 50); up: 40 (60%) → 45 (80%) → 50/55 at 100 (50/50 within the 21-month
  `labyrinth_timer`, else 50); down: 10 (40%) → 15 (20%) or 25 (destroying) → at 0: 25 (destroying) / 20 (within 21 months)
  / 50:50 20 or 30. Bridges + suppress implement this.
- Remaining: three false compiler stage refs (25→15, 15→10, 10→40) — see Request 1.
### Pre-FTL observation interludes (`events/first_contact_dlc_events.txt:1109-6489`) — reviewed
Common entry verified: `pre_ftl_tech_progress_situation` on_monthly random_events 5/100 → preftl.50 (1800-day cooldown,
`first_contact_dlc_situation_events.txt:316-376`) → `on_monthly_pulse_pre_ftl_observation` pool (`00_on_actions.txt:140-201`;
broken-shackles pool 205-224). Each dispatcher checks age + observation mission + once-flag (triggers read per event).
These are unordered random interludes → each stays its own story; compiled trees were already correct except as noted.
- event-fircon-1255, -1260, -1270 (Stone Age), -1280, -1295, -1305 (Bronze/Iron), -1325, -1335, -1355 (Medieval/Renaissance),
  -1375, -1405, -1440 (Steam/Industrial/Machine), -1465 (Atomic/Early Space), -2000, -2010 (any age, specimen collection),
  -2500, -2510, -2520, -2530, -2540, -2550 (observed hive civilizations): reviewed; option ethic/civic conditions,
  random weights and delays documented in guides.
- event-fircon-1495 (weight 25): reviewed; suppressed false links from 1520 (achieve_ftl_effect origin start-up branches →
  clones.10, machine_age.2150, cybernetic_creed_chain); kept links to preftl.1111 / tech-progress situation (c7b).
- event-fircon-2600 (family): reviewed; merged `event-fircon-2610` (Touchdown via on_fleet_enter_orbit → 2610 → 2615) with
  bridges 2635 → 2615 and 2620.d → 2615 (`first_contact_dlc_events.txt:6118-6143, 6281-6311, 6452-6474`). Uncertain:
  whether the ship can reach orbit before 2620 fires at day 60.
### Colony events (colony_events_1) — reviewed (Fable 5.5, 2026-10-13)
- **event-colony-1** Migrating Forests (family, merged colony.5): 3/958+2/739 colony-age random, global once (`colony_events_1.txt:12-98`);
  bridge 4 -> 5 via on_colony_defenders_win (`00_on_actions.txt:862`, flags 206-267); 12 self-repeats until a project is done (525-556).
- **event-colony-50** Subterranean Civilization (family; merged 56,57,60-75): war flag set only in 56 (`:925-931`) -> pool 60-63; destroyed flag set in 52
  (`:705-707`) -> pool 64-68; friendly flag set in 51 (`:681`) -> pool 69-74; 75 (angry_subterraneans > 2, `:2107-2117`) -> 76 -> 54.
  54 -> 56/57 via on_colony_defenders_win/lose (`00_on_actions.txt:863,879`). Uncertain: friendly flag stays after war chosen at 53.
- **event-colony-100** Abandoned Terraforming (family; merged 102,103,108,113,114): 104-107 25% each; 105 mutants -> 108/113 (on_actions 864/880),
  113 -> 114 (attackers_win 832); 108/114 -> 109 stalker (flag terraforming_mutants_defeated, MTTH 240 months); 101 -> 102/103 (did_not_terraform).
- **event-colony-150** Underground Vault (family; merged 154,158): 151/152/153 one third each; 153 -> 154 -> 158; no "repelled" event exists.
- **event-colony-155** Nuclear Bomb, **-170** Orbital Debris (171/172 race the project), **-160..164** nuked-wasteland colony random events (one window each).
- **event-colony-180** Asteroid Sighted (family; merged 181 hidden dispatcher -> 182 destroyed); 183 impact when the fleet arrives (`:4313-4322`).
### Colony events (colony_events_2) — reviewed (Fable 5.5, 2026-10-13)
- **event-colony-1500** Ancient Drones (A Prelude): 8 chained delays, 1502 only with a blocker, 1510 a/b/c -> 1514 / 1511->1512 / 1513 pirate fleets.
- **event-colony-1520** Pollen aphrodisiac: 1521.b stops the chain (400 energy); 1525.a hands-off -> worship -> disaster project 1531/1532/1533; 1525.b -> 1526-1528.
- **event-colony-2001, -2005, -2010, -2025, -2050**: single or project-result stories, triggers verified.
- **event-colony-2015** An Odd Factor (family; merged 2016,2017,2019): 30:35 random_list (`colony_events_2.txt:2402-2405`), kidnap needs 100+ factory workers.
- **event-colony-2060** Mushroom Picking: depends on fumongus_* flags set by the Fumongus archaeological site (`ancient_relics_arcsite_events_2.txt:9628-9745`, other owner).
- Note: `callers.py` line numbers for these events are offset from the real file lines; guides cite real lines.
### First Contact DLC, awareness, espionage, Machine Age, situations — reviewed (Fable 5.5, 2026-10-13)
- **event-fircon-1210** The Many-Tentacled One / Jaunting Traveler (family; merged 1211, 1212, 1220, 1221): entry fircon.1200 hidden in five-year pulse (weight 5, `00_on_actions.txt:505`);
  stages 1210 -> 1211 -> 1212 via set_first_contact_stage (`first_contact_dlc_events.txt:575-601`, `02_first_contact_unique_stories.txt:177-232`); failure pool 1220/1221
  (`first_contact_effects.txt:1818-1836`); THE_JAUNT_PROJECT 10% -> 1243 / 90% -> 1242 (script comments label them the other way round).
- **event-fircon-3505** The Chosen (merged 3515): fircon.3500 spawned by ancrel.12050 (other owner); 3505 wormhole (hidden) -> 3510, first contact -> 3515, both end in a cleansing war.
- **event-fircon-5000** Habinte Unified Worlds / Solarpunk (family; merged 5005, 5015, 5020, 5034, 5040, 5050): 5000 adds the SOLARPUNK_CAT anomaly (anomaly-solarpunk-cat, C3 owner);
  observation 5025 -> 5026 (moved from the fircon-30 story); invasion 5034/5035 -> 5036 -> 5040; peaceful 5050 -> 5051.
- **event-awareness-125** First Contact (pre-FTL) (family; merged 900, fircon-30): entries awareness.125 (hidden), 910, 920 all converge on action.2 -> progress.4/5/6.
- **event-first-contact-1050** (action.13), **event-fircon-10** (Observation Insights situation, fircon.10/11).
- **event-espionage-1 / -20 / -2** and **event-preftl-espionage-2**: dispatchers and random pools verified; 1070-1073 (operations) are not mine.
- **event-cyber-*** (36) and **event-synth-*** (13): Machine Age Cyberization/Digitization stage pools (`00_on_actions.txt:5176-5290`), Future Shock / Synth Shock chain pools;
  cyber.1505-1525 and synth.1505-1525 declared as hubs (shared endings).
- **situation-situation-paperclips**, **-nanotech-consume-planet**, **-initiate-storm** (two routes, six finishers), **event-machine-age-4000** Transformation, **event-shroud-1000** Experimental Testing,
  **event-first-contact-critters-1000** (dispatcher to marauder.501/526).
- **event-strange-worlds-3000 / -3035 (merged 3055) / -3065**: Strange Worlds observation interludes; the canceled-service flag is set by 3045.b, not by 3050.
### Overlord subject events — reviewed (Fable 5.5, 2026-10-13)
- Pool `on_five_year_random_pulse_overlord` (`00_on_actions.txt:521-535`, nothing 200 / 11 chains x 10). One story per chain: **event-subject-1** (veterans), **-50** (starbase request), **-100** (broken bulwark),
  **-1001** (war fever), **-1050** (war exhaustion), **-2001** (technological advancement), **-2050** (destructive research, escalating 90/70/50%), **-2100** (experimental research), **-3001**, **-3050**.
- **event-subject-1100** The Bickering Commanders (family; merged 1120-1140): 1115 -> hidden 1117 draws 3 of 5 pool events (`overlord_subject_events.txt:1741-1780`, `overlord_effects.txt:1-20`) -> 1142 -> 1145 -> 1147.

### Federations / Galactic Community / leaders — reviewed (Fable 5.5, 2026-10-13)
- **event-federations-10400** A Strongly Worded Letter (family; merged 10100,10110,10200,10220,10230,10300,10310,10320,10330,10340): resolution-breach windows (fired by `resolutions:*` effects) converge on 10401 via the decade pulse 10400 (`00_on_actions.txt:620`).
  **-10000** Project Cornucopia, **-10010** Greater Than Ourselves (10010 + 10210 windows). `event-federations-type` is a debug test event (`always = no`, `federations_events_1.txt:101-110`): no compiled story, nothing to review.
- **event-fedev-499** (new federation), **-9500** (juggernaut notice), **-600** (trade-federation logistics trial, decade pulse `00_on_actions.txt:305`).
- **event-federations3-2100** (Leylines, research federation), **-1000** (Relic Rails dig site), **-2200** (Ecumenical Council, spiritualist federation), **-120** (Keep Off the Grass).
- **event-galcom-1** Galactic Community (family; merged 14, 50): galcom.1 yearly -> 2 (aye/nay) -> 3 tally after 360 days -> 5/6/16 or 10 + retry in 50 years via galcom.20 (`galactic_community_events.txt:14-190,458-520`); council 50 -> 51.
  **-60**, **-62** Galactic Market HQ (family; merged 64), **-102** Tiyanki notices (family; merged 103, 108).
- **event-leader-*** (15): fleet-destroyed pool (`00_on_actions.txt:1701-1707`), emergency-FTL pool (2901-2905), first-time-system pool (950), repair MTTH (leader.15) and policy trigger (leader.30). One window each.

### Open
- **event-situation-5** stays partial (compiler cannot express bidirectional stage order, see Request 1).

### Requests (added 2026-10-13)
2. **Unowned hub stories.** `event-cyber-1505/1510/1515/1520/1525` and `event-synth-1505/1510/1515/1520/1525` (final outcomes of the Future Shock / Synth Shock chains) exist as compiled stories but appear in no assignment list.
   My stories declare them as hubs. Suggest assigning them (or marking them as hub docs of a single Future Shock story).
3. **Future Shock chain placement (c8c `event-utopia-2500`).** The chain starts at cyber.505-525 (shown inside the c8c story tree) and continues with my pool events (610-855, 1005-1255) and the final outcomes. A single "Future Shock" family spanning
   cyber.505-525 -> pools -> 1505-1525 would be the natural tree; I kept my events as separate pool stories to avoid claiming docs of another owner.
4. **action.2 / progress.4-6** (generic First Contact windows) are used by c7b first contact (first_contact.6000) as well; my family `event-awareness-125` contains them as the convergence point for pre-FTL contact.
5. **Solarpunk (Habinte) chain** crosses ownership: `anomaly-solarpunk-cat` + fircon.5010 (C3) is the middle of `event-fircon-5000` (mine).
6. **callers.py line numbers** for several events in `colony_events_2.txt` are offset from the real file lines by up to ~30; guides cite real lines.
<!-- ledger-end -->
