# C8c review ledger — Galactic miscellany (third list)

Reviewer: c8c-stories (Opus 5.5), working copy `st-agents/c8c-stories`. Assignment: `assignments/c8c-stories.txt` (245 ids).
Game authority: `D:/Living/Steam/steamapps/common/Stellaris` (read-only). Line numbers below are real file lines (ripgrep), not
the compiled `source.line`, which drifts in files that use inline scripts (see Requests).

Legend: **reviewed** = root/trigger, membership, order, exclusivity, variants and guide checked for the whole story;
**merged → X** = the id no longer exists as a story because its docs are now part of family X (reviewed there).

## Results

### the-shroud — reviewed (family override; title fixed to original 虚境 / The Shroud)
- Root: utopia.2655 (tradition tr_psionics_breach_shroud, common/traditions/01_psionics.txt:123-135) → BREACHING_SHROUD_PROJECT
  (00_projects_utopia.txt:67-101) → utopia.2656 Séance → utopia.3000 hub (on_custom_diplomacy 00_on_actions.txt:725-726; 3010 when on cooldown).
- Hub is repeatable: 2160-day cooldown per delve (utopia_shroud_events.txt:183,206,240,273; 2659 2428), active only with
  has_shroud_dlc = no (line 134); Shadows of the Shroud DLC folder is not installed.
- Merged into this family: event-utopia-2655 (2655/project/2656), event-utopia-2670 (2671), event-utopia-2675 (2676),
  event-utopia-2680 (2681→2682, shared with Shadows stories, not made members), event-utopia-2685 (2686).
- Bridges added: covenant side effects by patron (3330 MTTH 15y, lines 6955-7063), covenant ranks 20/50/90/150
  (utopia_on_action_events.txt:5-8, 2665-2686, on_monthly_pulse_country 00_on_actions.txt:352-356), Divine Sovereign from both
  Chosen paths (8620-8759), Reckoning world-devouring 3320→3325 (6736-6952), 3010→3000 return, annotated 3024→3026 (3600 days).
- Groups: vision pool, Avatar outcomes, communion outcomes (exclusive). Node labels for 40+ duplicate titles (boons/curses/covenants).
- Uncertain: shroud.112xx Reckoning aftermath shared with origin_endbringers; Shroud Incursion also from shroud.13000.

### event-utopia-2600 — reviewed (new family on the existing id: 心胜于物 / Mind Over Matter)
- Root utopia.2600 (tr_psionics_adopt on_enabled, 01_psionics.txt:19-23); 2605 hidden MTTH 220 months → 2606/2607/2608 by
  empire type (exclusive group) while Latent Psionic; 2650 via tradition Great Awakening (01_psionics.txt:103-118); cross-story
  bridge 2650 → utopia.2655 (the-shroud).
- Merged into this family: event-utopia-2605, event-utopia-2650.

### event-utopia-2500 — partial (血肉苦弱 / The Flesh is Weak)
- Root container tr_cybernetics_adopt (01_cybernetics.txt:56-140) → exclusive: utopia.2500 project (no Machine Age or Hard Reset)
  | situation_cyberization | situation_cyberization_hive (cyber.1, machine_age_situation_events_1.txt:14-36). Machine Age is installed.
- Re-parented monthly story events to their stages by progress gates (suppress + bridges): 105@100, 205@300, 305 (all pops
  cyborg, @600), 410/420/430 @850 per rival flag; completion cyber.21 / cyber.2004 after stage 4; Future Shock 505-525 by authority.
- Partial because stage_4 on_first_enter calls 405/415/425 (exclusive by rival flag) and the compiler chains them (Request 3);
  random pools cyber.120…360 / 22xx are c7a stories (Request 4). Category kept C8 (ascension path, like the psionic stories);
  coordinator may move the situation to C7.

### event-utopia-2550 — reviewed (合成嬗变 / Synthetic Transformation)
- Root container tr_synthetics_adopt (01_synthetics.txt:34-110) → exclusive: utopia.2550 project (only without Machine Age,
  non-machine) | situation_digitization (synth.1). Stage events and scheduled follow-ups (200→205, 300→305|310, 400→405)
  re-parented; completion synth.4 after stage 4; Digital Refactoring 505-525 by authority (shared with origin_synthetic_fertility).

### event-paragon-40000 → split; event-paragon-41234 → split (16 new families, all reviewed)
- 40000/40001 (hidden decade lottery, paragon_events_4.txt:15-160) only offer leaders matching the empire's ethics
  (ethic_leader_randomizer, 01_script_values_paragon.txt:62); 41234 (decade pulse, 1728-1866) gives each hired renowned leader
  10%/10%/80% of its two fire_only_once episodes. The old stories grouped unrelated characters by mechanism; now one story per
  leader: paragon-renowned-{lysator-syng, nona, vyctor-jariden, gia-zumon, shuladun, aturion, jynn, zosira-ktun, xondar, borin,
  uld-dagr, vas-the-gilded, kai-sha, qla-minder, ulastar, nasuz-demetor}: recruit doc → HIRE bridges → episodes (+projects
  LYSATOR_PIRATE_TREASURE / NONA_LOST_CONVOY / XONDAR_VALUABLE_ALLOYS, 01_projects_paragon.txt:443-516).
- New family site-site-ice-trauma (precursors, partial): the dig site Under the Ice has its own spawn weight
  (00_base_game_arc_sites.txt:368-379) and 41620 requires it unfound, so it is a standalone site story linked from Nasuz Demetor.
  Partial only because stage 4 (hidden arcsite.1015, three exclusive results) is chained by the compiler (Request 3).
  Coordinator: confirm C2 ownership of this new story.

### event-terra-10 — reviewed (retitled 环境改造 / Terraforming, game text concept_terraforming)
- on_terraforming_complete (00_on_actions.txt:2118) → hidden terra.10 (terraforming_events.txt:133-518): once per planet, 22
  exclusive outcomes (weights 0.5–5, 30 = nothing) with class/DLC/empire exclusions; follow-ups ENLIGHTEN_RADIO → terra.85,
  site_tombworld_weapon_cache (weight 0, only from terra.90), strange_worlds.1010 → 1035 after 3600 days. Exclusive group added.
  Sky Burials exclusion quirk noted (lines 503-514).

### event-terra-30 — reviewed (single doc, on_blocker_cleared 00_on_actions.txt:2507; independent of terra.10)

### Megastructure stage notices — reviewed (10 families; merged 48 one-card stories)
Pattern: each megastructure fires one country event per completed build stage (`on_build_complete` in common/megastructures/*.txt, or
on_megastructure_built/_upgraded in 00_on_actions.txt:3658-3716), hidden routers (81, 2001, 4001, 4101) notify other empires, and a map ruin
(on_entering_system_first_time, 00_on_actions.txt:915-929, star flag ruined_*_system) has its own restoration event. Fixed: the one-card stories are now one story
per megastructure with stages in build order, neighbour notices and the ruin/restoration thread.
- event-utopia-2000 Ring World (2000→2003→2004→2005; 2002 from hidden 2001; ruin 2016→2017) · event-utopia-4000 Dyson Sphere (4000→4003→4004→4005; 4002 from hidden 4001; ruin 2010→2011) ·
  event-utopia-4100 Sentry Array (4100→4103→4104→4110; 4102; ruin 2014→2015) · event-utopia-80 Science Nexus (80→83→85→84→86; 82; ruin 2012→2013) ·
  event-feda-1 Mega Shipyard (feda.1→2→3; ruin 5→6) · event-mega-9000 Mega Art Installation (9000→9001→9002; ruin 9120→9121) ·
  event-mega-9003 Strategic Coordination Center (9003→9004→9005; ruin 9110→9111) · event-mega-9006 Interstellar Assembly (9006→9009; ruin 9130→9131) ·
  event-mega-9010 Matter Decompressor (9010→9013; ruin 9100→9101) · event-over-1 Quantum Catapult (over.1→5→10; ruin over.20→25).
- Merged ids (no longer stories): event-utopia-2001/2003/2004/2010-2017/4001/4003/4004/4005/4101/4103/4104/81/83/84/85, event-feda-2/3/5/6, event-mega-9001/9002/9004/9005/9007-9009/9011-9013/9100/9101/9110/9111/9120/9121/9130/9131, event-over-5/10/20/25.
- Uncertain: how ruins are placed (star flags set by system initializers) was not traced; story.5 (generic follow-up of the "fascinating" ruin options) appears as an external link.

### event-utopia-1 / event-utopia-20 / event-utopia-29 / event-utopia-50 / event-over-100 — reviewed
- utopia.1 (ring-world builder request, MTTH 3600d, megastructure_events_1.txt:13-414): tree correct; builder options 2.a/2.c exclusive by requester ethic.
- utopia.20 (ring-world construction incident, hidden, :417-640): random 30/30/30, machines excluded from 27; chain 27→28→23→26|25.
- utopia.29 (Dyson Sphere diplomacy, :645-1352): 35% to fire utopia.30 after 10-17 days; full 30→40 exchange verified.
- utopia.50 (Science Nexus decade pulse, :1356-2384): 51 Fountain of Youth chain with project chain 100-108, 62 Abducted Leader, 64 Neural Bank;
  utopia.62's weight modifier (0 when a scientist councillor exists) contradicts its own trigger (requires one) — practically unreachable (uncertain).
- over.100 (capitals connected via hyper relay, on_capitals_connected 00_on_actions.txt:4913): single notice.

### Arkship (Nomads) — reviewed (26 pool episodes + notices; 4 families)
Pool: hidden arkship.1 director (nomads_arkship_events.txt:7-49) → generate_arkship_event (nomads_effects.txt:96-117) → on_action mobile_arkship_random_events
(00_on_actions.txt:3979-4006). Reviewed single episodes: 5, 60, 65 (can happen twice), 95, 105, 125, 1030, 1070, 1075, 1090, 1100, 1120, 1160, 1165, 1170, 1185, 1205,
1215, 1240, 1385; border/waystation notices 860/870/880/890/900/910.
- event-arkship-700 A Core Conspiracy: situation_core_conspiracy is a bidirectional tug-of-war (start 50; Steris falls, Caeli rises); the compiler chained the
  stages in file order (716→705→710→721); fixed by suppress+bridges (705→716 Steris, 710→721 Caeli), threshold events attached with progress labels, endings exclusive (725/730).
- event-arkship-1300 The Grand Refurbishment: stage chain was right; the 12 monthly pool events were under the situation, now under their stages (one per stage).
- event-arkship-140 The Eternal Chorus (family: 140, chain page, 141, 142, 150; the project/choice event arkship.145 is in c3b's project story — Request).
- event-arkship-155 A Diplomatic Overture (family: 155, 156, 160, 165, 170, 175; weights per arkship.160:2507-2576).
- event-arkship-1020 A Grievous Loss: arkship destroyed/disabled notices 1015/1005 and the wreck project, raid branches only outlined.

### Grand Archive (events/grand_archive_events.txt) — reviewed (35 stories -> 17 stories/families)
- event-grand-archive-10000 → family "Advanced Controlled Mutations" (10005-10010, 10015, 10020, 10025, 10030 + 10055/10060 Elder Tiyanki, 10075/10080 Voidspawn; trigger on_ship_built
  250-ship threshold, 00_on_actions.txt:2559 / on_ship_destroyed_perp). Merged: event-grand-archive-10055, -10075.
- event-grand-archive-4135 Trinkets from our Lessers: homicidal reward events (9 inline_script variants, 3 civics x 3 stages). The compiler wired all nine into a ring
  because every event re-fires hidden 4130; fixed with suppress of all cross pairs + bridges 4135→4140→4145 per civic + exclusive groups.
- event-grand-archive-500 Curators: collection reward loop 4120→4121 intro, 4100/4101 loop → 4105/4106/4107 (stage rewards, relics at stage 3); same ring problem fixed (4121→4105→4106→4107).
- event-grand-archive-4500 Grand Archive Lost (family: 4515, 4510, 4520, 4555, 4560, 4580): merged seven router-only stories (4500, 4501, 4540, 4545, 4550, 4570, 4580);
  causes: starbase destroyed (loot via 4505), system destroyed, arkship module/waystation lost, system given away, subject integrated; rebuilt via 20_grand_archive.txt:195.
- event-grand-archive-6005 Treasure Troves (family 6010/6011/chain/TREASURE_TROVE/6015 + pirates 6025/TREASURE_TROVE_PIRATES/6031/6035). Merged: -6020, -6030.
- event-grand-archive-2005 Voidworms (family 2000→2005→VOIDWORMS_PROJECT→2015); -2000 merged. 2006/2015 are shared with origin_treasure_hunters (C1).
- event-grand-archive-2051 Voidworms Eradicated (family 2054|2053 exclusive); -2050 merged.
- event-grand-archive-2102 Voidworm Eradication resolution (2103, 2105, 2107 parallel notices); -2101, -2106 merged. event-grand-archive-3102 Cutholoid resolution (3103, 3105, 3107); -3101, -3106 merged.
- event-grand-archive-3014 An Unpleasant Surprise (3016): 3014 (cutholoid ambusher destroyed) and 3035 (captured) both end in 3016; -3035 merged. 3016 → 2900 continues in event-grand-archive-3010 (c8b).
- Single: 2190 Galactic Parasites, 2901 Cutholoids first contact + project, 105 Gravity Snares, 7015 Whalesong, 9000 Captured leaders, 9955 Artificial Breeding.
- Compile quirk: finish_first_contact_effect in 2005 fans out to unrelated first-contact events (external links cara.1020 ... marauder.15); harmless but noisy (Request 5).

### Batch 2 (2026-10-13): operations, Fallen Machine Empire, Imperium, marauders, action, nomads, misc — reviewed
- Operations (Nemesis): families event-operation-1000 Acquire Asset, -1020 Steal Technology, -2000 Sabotage Starbase, -3000 Smear Campaign, -4000 Crisis Beacon (stage events chained in order; espionage.* detection docs are shared, not members); single: -7000 Gather Information; 11 mishap stories (5000...5055) documented with the pool matrix (espionage_event_effects.txt:2390-2821; 1/40 per failed roll, 90-day lock). Quirk: low-stakes pool calls 5030 for Mistaken for Food (5020) — probable script slip (uncertain).
- event-fallen-machine-empire-10: 19 stories -> tasks 1-5 and demands 1-2 of the machine Custodian with exclusive outcomes.
- Imperium: event-emperor-499 (rise; real root is the form-empire resolutions, 499/495 are is_test_event), -50 (laws, crusade, defence), -150 (end/civil-war results); event-action-150 (war-result notices). event-marauder-85/505/511/711 (Great Khan crisis pieces; aftermath 620-671 stays in event-marauder-509, c8a).
- Misc: event-action-96/102/105/110/122/601; event-namarian-3 Galactic Nomads (5 stories merged); event-central-2 Crystalline Empire (5 merged); event-uplift-6000 & -7500; event-toxoids-1/-499; event-nomads-4750/4800; event-unique-130/135/140; event-galactic-features-381; event-progress-2/3; event-cstorms-8100; event-necroids-20; four chain overview cards (snake infestation chain marked unreachable: events commented out).
- Observer stories (event-observer-50/77) vanished after the coordinator's compiler update (observer events are not stories).
- Requests: (5) finish_first_contact_effect fans out to dozens of unrelated first_contact.* events (shows as external links/callers for namarian.10, grand_archive.2005); (6) callers.py misses calls made from resolutions via scripted effects (emperor.60) — shown as 'fired by the engine'; (7) project-arkship-eternal-chorus-project (c3b) holds arkship.145 between my event-arkship-140 docs; coordinator may merge.


## Requests

1. `scripts/callers.py` crashes with KeyError 'name' on call paths containing an `effect = {}` hook block (HOOKS entry
   `{'k':'effect'}` has no name); context() should use `p.get('name')`. I used a local copy with the fix.
2. Compiled line numbers drift in files where `extract.py` expands `inline_script` before parsing: e.g. shroud.11235 is reported at
   events/shroud_events.txt:22541 but is at line 18475 in the game file. Evidence in fragments should be re-based on the raw file
   (or the extractor should record pre-expansion offsets).
3. `stage_sequence()` chains every stage target in file order. When one stage's `on_first_enter` fires several events that are
   alternatives (situation_cyberization stage_4 → cyber.405/415/425, each gated by a different rival flag;
   08_machine_age_situations.txt:850-860), they become a false 405→415→425 sequence that `suppress` cannot remove (stage edges
   bypass suppress). Please group targets of the same stage as siblings of the previous stage doc.
4. Situation random-event pools are fired via `fire_on_action` (cyber.5 → on_cyberization_situation_random_events_list,
   cyber.2005 → on_cyberization_hive_situation_random_events_list, synth.5 → on_digitization_situation_random_events_list);
   the graph drops on_action targets, so their events (cyber.120/160/210/220/260/320/360, cyber.22xx, synth.120…360, owned by
   c7a) are separate one-doc roots. They belong inside my situation stories event-utopia-2500 / event-utopia-2550; I did not
   bridge them (a bridge would silently move another reviewer's roots). Coordinator: decide the owner and merge.