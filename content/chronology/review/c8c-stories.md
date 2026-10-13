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
