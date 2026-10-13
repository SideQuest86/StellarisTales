# C3a exploration review ledger (c3a-exploration)

Reviewer: c3a-exploration (Opus 5.5). Working copy: st-agents/c3a-exploration. Date: 2026-10-12.
Scope: assignment list content/chronology/review/assignments/c3a-exploration.txt (208 story ids). Per-story facts are in the
fragments (content/stories/<id>.json) and guides (public/summaries/<id>.md); this ledger records results, evidence and open questions.

## Summary

- Stories in my list: 208. Fragments written: 164 (reviewed 163, partial 1).
- Assigned ids merged into another story (no separate story any more): 44.
- Assigned ids not yet handled: 0.
- Partial: event-distar-13080 (the L-Cluster; the roughly 20 individual clue-giving anomalies are summarised by one bridge, not listed one by one).
- Date of the second pass (resuming reviewer): 2026-10-13. `python scripts/story_tree.py` runs cleanly.

## Merged story ids

- `anomaly-distar-med-cat` → `event-distar-240`: DISTAR_MED_CAT is placed on the Gaia planet of the sealed system (distar_sealed_1_2) whose entry/entity events are distar.240/242/243
- `anomaly-distar-rat-cat` → `event-distar-230`: DISTAR_RAT_CAT is added to the Ketling capital by distar.230 (after block); it is a chapter of the Ketling story
- `event-distar-1002` → `anomaly-debris-gasgiant-category-temp`: Paradise Lost (distar.1002…1016): entering the hidden system spawned by distar.1001 of the Vechtar Zavonia anomaly
- `event-distar-1007` → `anomaly-debris-gasgiant-category-temp`: outpost gatekeeper (hidden distar.1007 → 1010 → 1005) of the same Paridayda chain
- `event-distar-1014` → `anomaly-debris-gasgiant-category-temp`: on_colonized notice for Paridayda (In Paradise)
- `event-distar-1015` → `anomaly-debris-gasgiant-category-temp`: on_colony_zero_pops result of the Vol bombardment (hidden distar.1015 → distar.1016)
- `event-distar-1082` → `anomaly-ast-debris-field-1-cat-2`: monthly follow-ups of the cloned Azizians (hidden distar.1082 → 1083 zoo breakout / 1084 sapience)
- `event-distar-1085` → `anomaly-ast-debris-field-1-cat-2`: stored Azizian DNA (distar.1080.d) revived after researching Cloning (on_tech_increased)
- `event-distar-2036` → `anomaly-time-loop-world`: notice for empires building an outpost at the Time Loop world after its shield was repaired
- `event-distar-235` → `event-distar-230`: on_colony_attackers_win outcome when a pre-space Ketling planet is invaded
- `event-distar-242` → `event-distar-240`: entering the sealed system (psionic entity) after the entry-system signal distar.240
- `event-distar-243` → `event-distar-240`: destroying the sealed system's psionic entity (on_ship_destroyed_perp)
- `event-distar-254` → `anomaly-distar-phase-cat`: system-claim gatekeeper (on_building_starbase_outpost / on_starbase_transfer → hidden distar.254 → distar.255 project) of the Phased Planet
- `event-distar-256` → `anomaly-distar-phase-cat`: distar.258: notification for empires surveying the Phased Planet after its anomaly was already placed (on_survey_planet → hidden distar.256)
- `event-distar-2599` → `anomaly-distar-robo-cat`: colony chain of the Rudimentary Robots planet (on_colonized → hidden distar.2599 → distar.26); same planet and robots as the anomaly
- `event-distar-262` → `anomaly-distar-soy-cat`: on_colonized follow-up of the Overgrown Ruins planet (funlent_planet set by the anomaly's on_spawn distar.260)
- `event-distar-34` → `anomaly-distar-robo-cat`: on_colony_defenders_win aftermath of distar.33 (enraged colonists defeated)
- `event-distar-37` → `anomaly-distar-robo-cat`: on_colony_attackers_win aftermath of distar.33 (planet retaken from the enraged colonists)
- `event-distar-5` → `anomaly-distar-flare-cat`: superflare colony chain (on_colonized → hidden distar.5 → distar.7) in the same superflare_system as the Frozen in Time anomaly
- `event-distar-58` → `anomaly-distar-lost-cat`: death of the adopted Lost Amoeba (on_ship_disabled → hidden distar.58 → distar.340 or distar.57)
- `event-distar-72` → `anomaly-distar-clone-cat`: on_colonized of a repaired ring-world segment while the clones were left in cryostasis (clones_in_cryo set by distar.70 b / no_room)
- `event-distar-81` → `anomaly-distar-dead-god-cat`: invasion of the primitive planet that orbits the Silent Behemoth moon (on_colony_attackers_win → hidden distar.81 → distar.82)
- `event-distar-137` → `event-distar-135`: the destroyed Scavenger Bot (on_ship_destroyed_perp → distar.137) is the second chapter of the Scavenger story
- `event-distar-212` → `event-distar-211`: death of the Tiyanki Matriarch (distar.212 and its 213-218 chain) follows the encounter distar.211
- `event-distar-5001`, `event-distar-5009`, `event-distar-5011`, `event-distar-5014` → `event-distar-5000`: monthly owned-system entry, Voidspawn defeated, Voidspawn encounter and "As Good as New" are stages of the Voidspawn egg story
- `event-distar-10903`, `event-distar-10904`, `event-distar-10955`, `event-distar-9000`, `event-distar-13020`, `event-distar-13030` → `event-distar-13080`: opening, clues, neighbour warning, clue follow-up and the two L-Drake pieces are parts of the L-Cluster story
- `event-distar-5053`, `event-distar-5061`, `event-distar-5077` → `event-distar-5054`: cache destroyed, cache returns and ascension terminated belong to the Enigmatic Cache story
- `event-anomaly-143`, `event-anomaly-144` → `event-anomaly-142`: the other two Old Gods shrines
- `event-anomaly-3097`, `event-anomaly-3101` → `event-anomaly-3095`: the "base destroyed by another / by you" endings of the Ransomeers chain
- `event-anomaly-3114`, `event-anomaly-3120` → `event-anomaly-3115`: the pirate route of the Drifting Battlefield chain
- `event-anomaly-106` → `event-anomaly-96`: twin Terra Firma event of the Solar Coordinates chain

## Per-story results

### Batch b_01_distar_colony

- **anomaly-distar-robo-cat** — reviewed. Family created (root DISTAR_ROBO_CAT, members distar.2599/34/37); merged event-distar-2599, event-distar-34, event-distar-37. Bridges distar.25→26 (on_colonized), distar.33→34/37 (ground combat). Exclusive groups 28/29 and 34/37.
- **anomaly-distar-flare-cat** — reviewed. Family created (root DISTAR_FLARE_CAT, member hidden distar.5); merged event-distar-5. Bridge distar.6→distar.7 (on_colonized of the nuked moon, 360–410 days). Exclusive project results 9/10.
- **anomaly-distar-dead-god-cat** — reviewed. Family created (root DISTAR_DEAD_GOD_CAT, member hidden distar.81); merged event-distar-81. Bridge distar.80→82 (invasion, 2 days).
- **anomaly-distar-clone-cat** — reviewed. Family created (root DISTAR_CLONE_CAT, member distar.72); merged event-distar-72. Choice bridges distar.70.b/no_room → distar.72.

### Batch b_02_distar_simple

- **anomaly-distar-collapse-cat** — reviewed. Single outcome distar.125; spawn only via collapse_system initializer; tree correct.
- **anomaly-distar-diamond-cat** — reviewed. Single outcome distar.140; null_spawn 0.5 noted; tree correct.
- **anomaly-distar-electro-cat** — reviewed. Single outcome distar.85; xenophobe option variant; story.1 hub excluded; tree correct.
- **anomaly-distar-exo-cat** — reviewed. Single outcome distar.105; on_spawn exofungus modifier noted; tree correct.
- **anomaly-distar-flytrap-cat** — reviewed. Single outcome distar.185; machine-empire factor 0 and on_spawn modifier noted; tree correct.
- **anomaly-distar-foes-cat** — reviewed. Single outcome distar.131; spawn mechanism (distar.130 on_survey_planet) documented; tree correct.
- **anomaly-distar-geode-cat** — reviewed. Single outcome distar.75; action.941 generic helper noted; tree correct.
- **anomaly-distar-holo-cat** — reviewed. Single outcome distar.20; communications requirement noted; tree correct.
- **anomaly-distar-ice-cat** — reviewed. Single outcome distar.110; tree correct.
- **anomaly-distar-mercury-cat** — reviewed. Single outcome distar.150; weight 0.1 and should_ai_and_humans_use noted; tree correct.
- **anomaly-distar-metal-cat** — reviewed. Single outcome distar.115; tree correct.
- **anomaly-distar-molten-cat** — reviewed. Single outcome distar.145; null_spawn 0.5; tree correct.
- **anomaly-distar-nano-cat** — reviewed. Single outcome distar.40; L-cluster clue cross-link to event-distar-10904 noted; tree correct.
- **anomaly-distar-nanocity-cat** — reviewed. Single outcome distar.275; comms text variants and xenophobe option; clue noted; tree correct.
- **anomaly-distar-nanosand-cat** — reviewed. Single outcome distar.280; clue noted; tree correct.
- **anomaly-distar-ocean-cat** — reviewed. Single outcome distar.120; tree correct.
- **anomaly-distar-puzzle-cat** — reviewed. Single outcome distar.270; clue noted; tree correct.
- **anomaly-distar-rainbow-cat** — reviewed. Single outcome distar.15; tree correct.
- **anomaly-distar-signal-cat** — reviewed. Single outcome distar.265; lcluster_clue_sonic used by distar.9000 text (EV3:1145); tree correct.
- **anomaly-distar-soothe-cat** — reviewed. Single outcome distar.95; non-gestalt counterpart of DISTAR_SOOTHE_GC_CAT; tree correct.
- **anomaly-distar-soothe-gc-cat** — reviewed. Single outcome distar.100; gestalt-only; tree correct.
- **anomaly-distar-thirsty-cat** — reviewed. Single outcome distar.180; tree correct.
- **anomaly-distar-zone-cat** — reviewed. Single outcome distar.220; machine text variant; pop_lcluster_event noted; tree correct.
- **anomaly-distar-medgas-cat** — reviewed. Single outcome distar.285; spawn weights 5/1/0 tied to l_cluster_chain; clue noted; tree correct.
- **anomaly-distar-soy-cat** — reviewed. Family (root DISTAR_SOY_CAT, member distar.262); merged event-distar-262; bridge distar.261→262 (on_colonized).
- **event-distar-230** — reviewed. Family created (start distar.230, members DISTAR_RAT_CAT, distar.235); merged anomaly-distar-rat-cat and event-distar-235. Bridges distar.230→anomaly (after-block add_anomaly), distar.233→235 (invasion). Exclusive group of KETLING_PROJECT_1-6 (same_option_group_as).
- **event-distar-240** — reviewed. Family created (start distar.240; members distar.242, distar.243, DISTAR_MED_CAT); merged event-distar-242, event-distar-243, anomaly-distar-med-cat. Bridges 240→242→243→anomaly.

### Batch b_03_distar_multi

- **anomaly-distar-phase-cat** — reviewed. Family (start DISTAR_PHASE_CAT; members hidden distar.254/256 and distar.258); merged event-distar-254, event-distar-256. Bridges 251→255 and 258→255; exclusive group 250/302/303.
- **anomaly-distar-warform-cat** — reviewed. Tree correct; added nodeLabels for repeated "Restored Warship" docs, exclusive 156/157, endings 164 (recruit) / 167 (destroyed).
- **anomaly-distar-lost-cat** — reviewed. Family (start DISTAR_LOST_CAT, member hidden distar.58); merged event-distar-58. Bridges 51→340 / 51→57; exclusive groups 53/54 and 340/57.
- **anomaly-distar-living-cat** — reviewed. Tree correct; annotated the option-a→project edge with the system-ownership condition; noted duplicate path event-distar-1999 (c3b) in Requests.
- **anomaly-distar-time-cat** — reviewed. Tree correct (60 →360d→ 61…65 → 66→67 / 68); endings added.
- **anomaly-distar-brainslug-cat** — reviewed. Tree correct; documented hidden 174/175 effects.
- **anomaly-distar-pod-cat** — reviewed. Tree correct; noted recruit path via shared hire effect.
- **anomaly-distar-rum-cat** — reviewed. Corrected reading of the 1/1 weights (factor 0 by machine status) via exclusive groups 90/91 and 92/93.
- **anomaly-distar-wreck-cat** — reviewed. Tree correct; noted the duplicated desc trigger in distar.1.
  - uncertain: distar.1 desc.nocontact has the same trigger as desc.contact (exists = event_target:wreckage_owner); which text the engine shows when both match was not tested.
- **anomaly-distar-flow-cat** — reviewed. Tree correct.

### Batch b_04_distar_1000s

- **anomaly-debris-gasgiant-category-temp** — reviewed. Family (start anomaly; members distar.1002, hidden 1007 and 1015, distar.1014); merged event-distar-1002/1007/1014/1015. Bridges 1001→1002, 1011→1016, 1003→1014.
- **anomaly-star-lifting-category** — reviewed. Tree correct.
- **anomaly-abandoned-outpost-category** — reviewed. Tree correct.
- **anomaly-ast-debris-field-1-cat-2** — reviewed. Family (start anomaly; members distar.1085, hidden 1082); merged event-distar-1085, event-distar-1082. Bridges 1080.d/1080.d.evopred→1085, 1081.a→1084, 1081.b→1083; exclusive group of the three anomaly results with modifiers.
- **anomaly-atomic-clock-cat** — reviewed. Tree correct; exclusive group for the five 42-year outcomes.
- **anomaly-gaia-planet-cat** — reviewed. Single outcome; ethics-based options.
- **anomaly-corrupt-data-cat** — reviewed. Single outcome; planet removed.
- **anomaly-irregular-energy-cat** — reviewed. Tree correct; exclusive group 1072/1073 (50/50, only if the original officer leads).
- **chain-star-crazy-chain** — reviewed. Unused definition (no begin_event_chain anywhere); kept standalone with explanation. See Requests (hide unused definitions?).
  - uncertain: Whether the archive should show unused definitions at all is a product decision for the coordinator.
- **anomaly-peculiar-patterns-cat** — reviewed. Exclusive group with planet-class weights added.
- **anomaly-tomb-world-cat** — reviewed. Exclusive group by planet class added.
- **anomaly-alien-life-cat** — reviewed. Single outcome.
- **anomaly-moon-cat** — reviewed. Single outcome.
- **anomaly-time-loop-world** — reviewed. Family (start anomaly; member distar.2036); merged event-distar-2036; bridge 2031→2036; exclusive 2032/2033.
- **anomaly-stolen-ship-cat** — reviewed. Tree correct.
- **anomaly-transmitter-cat** — reviewed. Tree correct.

### Batch b_05_disco

- **anomaly-disco-trojan-asteroid-cat** — reviewed. Tree correct.
- **anomaly-disco-impossible-organism-cat** — reviewed. Tree correct; endings 3014/3016/3017.
- **anomaly-disco-stranded-scientist-cat** — reviewed. Tree correct.
- **anomaly-disco-molluscoid-miners-cat** — reviewed. Tree correct; spawn-condition quirk (factor 0 on NOR gestalt/fanatic xenophobe/mol6) documented.
  - uncertain: disco_molluscoid_miners_cat spawn modifier `factor = 0` with `from.owner = { NOR = { is_gestalt fanatic_xenophobe mol6 } }` blocks every other empire; whether this is intended cannot be verified from the files.
- **anomaly-disco-alien-machine-cat** — reviewed. Tree correct; exclusive 3041/3042.
- **anomaly-disco-speed-demon-cat** — reviewed. Tree correct.
- **anomaly-disco-breathing-rift-cat** — reviewed. Tree correct; loop documented.

### Batch b_06_basic1

- **anomaly-aerostat-gasgiant-category** — reviewed. Two exclusive outcomes 310/315 (1/1); tree correct.
- **anomaly-asteroid-uninhabitable-category** — reviewed. Exclusive 660/6875; 660 weight 0 with strategic resource; Lithoid option; tree correct.
- **anomaly-collision-asteroid-category** — reviewed. Exclusive 55/6805; max_once; tree correct.
- **anomaly-crashed-ship-asteroid-category** — reviewed. Exclusive 35/65 (65 weight 0 with strategic resource); tree correct.
- **anomaly-debris-asteroid-category** — reviewed. Exclusive 30/6800; tree correct; pop_lcluster_event is a shared effect.
- **anomaly-emissions-asteroid-category** — reviewed. Exclusive 50/60; tree correct.

### Batch b_07_basic2

- **anomaly-hatch-asteroid-category** — reviewed. Exclusive anomaly.5/25 (25 weight 0 with strategic resource); tree correct.
- **anomaly-impact-uninhabitable-category** — reviewed. Exclusive 600/605; tree correct.
- **anomaly-inhabited-toxic-category** — reviewed. Exclusive 670/685; tree correct.
- **anomaly-life-asteroid-category** — reviewed. Exclusive 10/6825; max_once; Lithoid/food option variants; tree correct.
- **anomaly-life-toxic-category** — reviewed. Exclusive 690/6895; option variants; tree correct.
- **anomaly-lost-soul-cat** — reviewed. Single result anomaly.6786; option a -> anomaly.6787 (5 days), b ends; tree correct.

### Batch b_08_basic3

- **anomaly-moon-gasgiant-category** — reviewed. Exclusive 340/6840; draft p=0.00* corrected via group (6840 +10 if no ring); max_once.
- **anomaly-object-gasgiant-category** — reviewed. Exclusive 325/335; tree correct.
- **anomaly-signal-uninhabitable-category** — reviewed. Exclusive 625/630; evopred options; homicidal option text; tree correct.
- **anomaly-beacon-uninhabitable-category** — reviewed. Single result anomaly.705; tree correct.
- **anomaly-life-barren-category** — reviewed. Single result anomaly.695; tree correct.
- **anomaly-living-metal-category** — reviewed. Single result anomaly.2576 (research option tech_mine_living_metal); tree correct.
- **anomaly-sol-wasteland-category** — reviewed. Single result galactic_features.104; spawn only via Sol initializer (Earth); tree correct.
- **anomaly-solar-uninhabitable-category** — reviewed. Single result anomaly.650; tree correct.
- **anomaly-the-lonely-bot-category** — reviewed. Single result anomaly.2580; max_once_global; tree correct.
- **anomaly-writing-uninhabitable-category** — reviewed. Single result anomaly.635; tree correct.

### Batch b_09_projects1

- **anomaly-life-frozen-category** — reviewed. Exclusive 2510/6900; 2510 -> SEA_EXPEDITION_PROJECT (180d, not machine empires) -> exclusive 2512/2513; tree correct.
- **anomaly-battle-uninhabitable-category** — reviewed. Single 2530 -> BATTLE_WRECKAGE_PROJECT (180d) -> exclusive 2531/2532; tree correct.
- **anomaly-debris-gasgiant-category** — reviewed. Exclusive 320/distar.1055 (1055 weight +1 only with humans in the galaxy and a non-human finder; draft p=0.00* explained via group); 1055 -> THE_CUBE (60d) -> distar.1056.
- **anomaly-energy-uninhabitable-category** — reviewed. Exclusive 610/615/655/distar.1040; 610 weight 0 with strategic resource; tree correct.
- **anomaly-life-gasgiant-category** — reviewed. Exclusive 300/6845; 6845 option -> GAS_RESTORATION project -> 6850; max_once; tree correct.
- **anomaly-object-uninhabitable-category** — reviewed. Single 2540 -> TRANSLATE_MURAL_PROJECT (180d) -> exclusive 2541/2542; tree correct.

### Batch b_10_projects2

- **anomaly-ship-gasgiant-category** — reviewed. Single 2560; option a -> GAS_GIANT_SHIP_PROJECT (180d) -> exclusive 2561 (70%) / 2562 (30%), option b = 50 influence; tree correct.
- **anomaly-shipyard-uninhabitable-category** — reviewed. Single 2550 -> AUTOMATED_SHIPYARD_PROJECT (180d, constructor/arkship) -> exclusive 2551/2552; tree correct.
- **anomaly-station-asteroid-category** — reviewed. Exclusive 40/6810; 6810.c -> 6815 -> 6820 (curators); random inside 6810.a noted; max_once; tree correct.
- **anomaly-storms-gasgiant-category** — reviewed. Exclusive 330/6855 (6855 +1 only with >1 science ship; draft p=0.00* explained via group); 6855.a -> RESCUE_STORM -> 6860; 6855.b = sacrifice.
- **anomaly-cargo-gasgiant-category** — reviewed. Exclusive 305/6865; 6865.a -> 6870 after 3600 days; tree correct.
- **anomaly-origin-asteroid-category** — reviewed. Exclusive anomaly.1/15/distar.225 (distar.225 weight +1 with DLC; strategic resource kills 1 and 225); draft p corrected via group.
- **anomaly-terminal-gasgiant-category** — reviewed. Single 2570 -> TERMINAL_ORBIT_PROJECT (180d, limit 1080d) -> 2571; tree correct.

### Batch b_11_extreme_frontiers1

- **anomaly-chthonian-preservation-cat** — reviewed. Single 430 -> CHTHONIAN_PETRIFICATION_PROJECT (360d) -> 435; max_once, tiyanki/catalytic conditions; tree correct.
- **anomaly-diamond-dust-cat** — reviewed. Single 280 -> ATMOSPHERIC_DIAMONDS_PROJECT (180d) -> 285; gestalt variant; max_once; tree correct.
- **anomaly-gaseous-metals-cat** — reviewed. Single 260 -> ATMOSPHERIC_ELECTROPLATING (90d) -> 265; bio-ship factor 0; tree correct.
- **anomaly-geological-tension-cat** — reviewed. Single 290; a -> CONTROLLED_ERUPTION_PROJECT (90d, limit 720d) -> 295; b = energy bonus; tree correct.
- **anomaly-glimpse-core-cat** — reviewed. Single 150; a -> PURIFY_CORE_PROJECT (240d) -> 155 (random desert/savannah/arid); b = deposits; tree correct.
- **anomaly-infernal-tornadoes-cat** — reviewed. Single 360 -> INFERNAL_CATALYSTS_PROJECT (180d) -> 365; max_once; tree correct.
- **anomaly-magma-megafauna-cat** — reviewed. Single 370 -> LAVA_DIVERS_PROJECT (180d) -> 375; needs tech_volatile_motes; max_once; tree correct.
- **anomaly-orbital-resonance-cat** — reviewed. Single 440 -> GRAVITY_ASSIST_PROJECT (180d) -> 445; tree correct.
- **anomaly-planet-thrusters-cat** — reviewed. Single 380; b -> REPURPOSE_THRUSTERS_PROJECT (360d) -> 385; a = direct reward; tree correct.
- **anomaly-poisoned-atmosphere-cat** — reviewed. Single 140; a -> DETOXIFICATION_GLAND_PROJECT (180d) -> 145; b = trade (non-gestalt); tree correct.
- **anomaly-survival-pod-warm-cat** — reviewed. Single 350; a -> 352 (Scru recruit dialog, recruit/dismiss); b/c/d rewards; max_once_global; tree correct.

### Batch b_12_extreme_frontiers2

- **anomaly-backwards-orbit-cat** — reviewed. Single result 390; neighbour-system condition noted; tree correct.
- **anomaly-black-clouds-cat** — reviewed. Single result 180; Devouring Swarm variant option; tree correct.
- **anomaly-carbon-allotropes-cat** — reviewed. Single result 270; on_spawn carbon_world; tree correct.
- **anomaly-crystalline-plains-cat** — reviewed. Single result 320; max_once; tree correct.
- **anomaly-electric-waters-cat** — reviewed. Single result 200; max_once; tree correct.
- **anomaly-exploding-skies-cat** — reviewed. Single result 420 with 15%/15% leader trauma/maimed roll; max_once; tree correct.
- **anomaly-fibrous-atmosphere-cat** — reviewed. Single result 410; max_once; tree correct.
- **anomaly-frozen-inferno-cat** — reviewed. Single result 130; action.941 is a shared helper (day 1); max_once; tree correct.
- **anomaly-great-blue-spots-cat** — reviewed. Single result 120; tree correct.
- **anomaly-invisible-planet-cat** — reviewed. Single result 340 (random invisible barren/molten planet); First Contact variant; tree correct.
- **anomaly-layered-atmosphere-cat** — reviewed. Single result 300; action.941 shared helper; max_once; tree correct.
- **anomaly-life-in-darkness-cat** — reviewed. Single result 240; options by homicidal/Devouring Swarm status; tree correct.

### Batch b_13_extreme_frontiers3

- **anomaly-missing-mass-cat** — reviewed. Single result 230 (options minerals vs society); tree correct.
- **anomaly-molten-metal-ocean-cat** — reviewed. Single result 110; tree correct.
- **anomaly-obsidian-planet-cat** — reviewed. Single result 210; action.941 shared helper; max_once; tree correct.
- **anomaly-optical-phenomena-cat** — reviewed. Single result 160 (machine variant; flag can_exhibit_prismatic_ice; action.941); exhibit consumer not traced; max_once.
- **anomaly-plasma-trails-cat** — reviewed. Single result 310; max_once; tree correct.
- **anomaly-plasma-volcano-cat** — reviewed. Single result 170 with 15%/15% leader trauma/maimed roll; needs tech_lasers_2; max_once.
- **anomaly-pulsating-object-toxic-cat** — reviewed. Single result 100 (planet-class text variants); tree correct.
- **anomaly-rainbow-rivers-cat** — reviewed. Single result 250; max_once; tree correct.
- **anomaly-shearing-force-cat** — reviewed. Single result 220; max_once; tree correct.
- **anomaly-subglacial-vibrations-cat** — reviewed. Single result 190 (options a/b); AI/robotic factor 0; max_once_global; tree correct.
- **anomaly-supermassive-giant-cat** — reviewed. Single result 330 (options a/b); weight x num_moons; on_spawn extensive_moon_system; tree correct.
- **anomaly-vapor-plumes-cat** — reviewed. Single result 400; tree correct.

### Batch b_14_guardians

- **event-distar-135** — reviewed. Family created (start distar.135, member distar.137); bridge 135 -> 137 (on_ship_destroyed_perp); merged event-distar-137.
- **event-distar-137** — merged into event-distar-135. Death of the Scavenger Bot (distar.137, on_ship_destroyed_perp) is the second chapter of the Scavenger story.
- **event-distar-211** — reviewed. Family created (start distar.211, member distar.212 chain incl. galcom.110, REANIMATE_TIYANKI_MATRIARCH); bridge 211 -> 212 (on_ship_destroyed_perp); merged event-distar-212.
- **event-distar-212** — merged into event-distar-211. Death of the Matriarch (distar.212, on_ship_destroyed_perp) and its 213-218 chain are the second chapter of the Matriarch story.

### Batch b_15_voidspawn

- **event-distar-5000** — reviewed. Family created (start distar.5010; members 5003/5013/5005/5007/5011/5009/5015); suppress 5010 -> 5005/5007/5013; bridges 5003->5005 (60%), 5003->5013 (40%), 5005->5007, 5007->5011, 5011->5009, 5013->5015; exclusive 5005/5013. Merged event-distar-5001, 5009, 5011, 5014.
  - uncertain: distar.5001 (monthly) also starts stage 1 for an owned-but-uncolonised egg without going through distar.5010; the compiled tree shows only the colonisation entry.
- **event-distar-5001** — merged into event-distar-5000. Monthly check distar.5001 (owned-system entry to the egg stages) belongs to the Voidspawn story.
- **event-distar-5009** — merged into event-distar-5000. Voidspawn Defeated (+ SHATTERED_EGG / REANIMATE_VOIDSPAWN projects) belongs to the Voidspawn story.
- **event-distar-5011** — merged into event-distar-5000. Voidspawn encounter belongs to the Voidspawn story.
- **event-distar-5014** — merged into event-distar-5000. As Good as New (distar.5014/5015) belongs to the Voidspawn story.

### Batch b_16_lcluster

- **event-distar-13080** — partial. Family created (start distar.13080; chain, clues 9000/10904, 10901/10905 + LCLUSTER_PROJECT, outcomes, dragons 13010/13011/13030/13020, warning 10956). Bridges chain->9000 (clue 30%), chain->10904 (7 clues), 10904->10905 / 10901 (tech), chain->10956, 13010->13030 / 13020. Exclusive outcome group (distar.8000 weights). Partial: clue-source anomalies not listed individually. Merged event-distar-10903, 10904, 10955, 9000, 13020, 13030.
  - uncertain: The roughly 20 events that call generate_lcluster_clue / pop_lcluster_event (anomalies, distar.12000 tech, artifact action, crisis.8060 etc.) are summarised as one bridge from the chain, not listed individually; their gates (e.g. crisis.8060 requires has_event_chain = l_cluster_chain) were not each verified.
  - uncertain: apoc.3 (surveyed L-Gate) starts the same chain in another story (event-apoc-3); the two entries are described together in the guide but only distar.13080 is in this story.
- **event-distar-10903** — merged into event-distar-13080. Opening the L-Cluster (10905/10901 + LCLUSTER_PROJECT + outcomes) is the middle of the L-Cluster story.
- **event-distar-10904** — merged into event-distar-13080. L-Gate Insights Gathered (7 clues complete) belongs to the L-Cluster story.
- **event-distar-10955** — merged into event-distar-13080. The L-Cluster Beckons (neighbour warning, distar.10955/10956) belongs to the L-Cluster story.
- **event-distar-9000** — merged into event-distar-13080. L-Gate Insights (clue follow-up distar.9000) belongs to the L-Cluster story.
- **event-distar-13020** — merged into event-distar-13080. Slayed (killing an L-Drake) belongs to the L-Cluster dragon-season branch.
- **event-distar-13030** — merged into event-distar-13080. L-Drake Observed (+ TAME_LDRAGON_PROJECT, 13035) belongs to the L-Cluster dragon-season branch.

### Batch b_17_gateways

- **event-distar-13060** — reviewed. Single event distar.13060 = apoc.5 duplicate for systems not surveyed by a ship (on_system_survey); kept as its own small story; request to coordinator to consider linking with event-apoc-5.
- **event-distar-13070** — reviewed. Single event distar.13070 = apoc.1 duplicate for systems not surveyed by a ship; kept as its own small story.

### Batch b_18_enigmatic_cache

- **event-distar-5054** — reviewed. Family created (start distar.5057; members project/5058/5059/5062/5064/uplifting/5070/5078). Bridges 5057->5059, 5059->5062, UPLIFTING->5070, UPLIFTING->5078; exclusive result group with real weights (75/25 intact; 37.5/62.5 or 100% 5074 broken); draft p corrected. Merged event-distar-5053, 5061, 5077.
  - uncertain: The exact 5060 selection rule (which player country is chosen, 'not outclassed in technology') was read but its in-game effect on the chosen country was not simulated.
  - uncertain: The text of the four dialogue options in distar.5064/5072 was not read line by line; only the options and the project/abort effects were checked.
- **event-distar-5053** — merged into event-distar-5054. Ascension Terminated (distar.5070, via hidden distar.5053 on_ship_disabled) belongs to the Enigmatic Cache story.
- **event-distar-5061** — merged into event-distar-5054. The Enigmatic Cache Returns (distar.5062 ... uplifting project and results) belongs to the Enigmatic Cache story.
- **event-distar-5077** — merged into event-distar-5054. Enigmatic Ascension Terminated (distar.5078, via hidden distar.5077 on_colony_attackers_win) belongs to the Enigmatic Cache story.

### Batch b_19_old_gods

- **event-anomaly-142** — reviewed. Family created (start event_chains:old_gods_chain; shrines 142/143/144 + projects + 165/166/167 + 168). Bridges chain -> 142/143/144; parallel group required 3 gating 168. Merged event-anomaly-143, event-anomaly-144.
- **event-anomaly-143** — merged into event-anomaly-142. Old Gods: Undaunted shrine is one of the three parallel shrines of the Old Gods story.
- **event-anomaly-144** — merged into event-anomaly-142. Old Gods: Percipient shrine is one of the three parallel shrines of the Old Gods story.

### Batch b_20_anomaly_chains

- **event-anomaly-1193** — reviewed. Tree correct; late entry to the Limbo story (limbo_downloaded + tech_synthetic_workers -> 1194 -> LIMBO_2_PROJECT -> exclusive if/else results 189/1198/1200/1199/1190). Request: link with anomaly-barr-base-cat (c3b).
- **event-anomaly-3095** — reviewed. Family created (start event_chains:ransomeer_chain; 3095, 3098/3099/3100 via hidden 3097, 3101 -> 3102/3103 -> 3104/3105). Bridges chain -> 3095 / 3098 / 3099 / 3100 / 3101; exclusive groups. Merged event-anomaly-3097, event-anomaly-3101.
- **event-anomaly-3097** — merged into event-anomaly-3095. Dust and Echoes / Unexpected Saviors / Assailed (anomaly.3098-3100 via hidden 3097) are the 'another empire destroys the base' endings of the Ransomeers story.
- **event-anomaly-3101** — merged into event-anomaly-3095. Picking Up the Pieces (anomaly.3101-3105) is the 'you destroy the base' ending of the Ransomeers story.
- **event-anomaly-3115** — reviewed. Family created (start event_chains:wrecked_fleet_chain; 3115 -> WRECKED_FLEET_2 -> 3116; 3114 -> 3120). Bridges chain -> 3115 (60%) / 3114 (40%), 3114 -> 3120; exclusive route group. Merged event-anomaly-3114, event-anomaly-3120.
- **event-anomaly-3114** — merged into event-anomaly-3115. Of Pirates Current (anomaly.3114) is the pirate route of the Drifting Battlefield story.
- **event-anomaly-3120** — merged into event-anomaly-3115. Of Pirates Destroyed (anomaly.3120) is the ending of the pirate route of the Drifting Battlefield story.

### Batch b_21_sol

- **event-anomaly-96** — reviewed. Family created (start event_chains:find_sol_chain; anomaly.96 and anomaly.106). Bridges chain -> 96 / 106 (identical triggers; uncertain whether 106 can ever fire). Merged event-anomaly-106.
  - uncertain: anomaly.96 and anomaly.106 have identical triggers and both are listed in on_entering_system_fleet (lines 1020, 1021); 96 clears the flags in its immediate block, so if on_action events are evaluated one after another 106 would never fire. This engine ordering behaviour is not visible in the files and was not verified.
- **event-anomaly-106** — merged into event-anomaly-96. Terra Firma (anomaly.106) is the twin of anomaly.96 with an identical trigger; both belong to the Solar Coordinates story.

### Batch b_22_misc_events

- **event-anomaly-2574** — reviewed. Single event anomaly.2575 via hidden 2574 (first find only); tree correct.
- **event-anomaly-4036** — reviewed. Family created (start event_chains:star_power_chain; 4037 -> ODD_STAR_PROJECT -> 4038; failure 4037). Bridges chain -> 4037 / failure; 40/60 per system, guaranteed after two misses. Merged event-anomaly-4036 itself keeps the id.

### Batch b_23_aianom

- **anomaly-aianom-lump-cat** — reviewed. Five exclusive results 20% each (aianom.1-5), tier roll 9:6:3:1 in hidden effects; AI-oriented (should_ai_use); tree correct.
- **anomaly-aianom-researchdepo-cat** — reviewed. Three exclusive results (aianom.8-10), deposit tier 6:3:1 hidden; AI-oriented; tree correct.
- **anomaly-aianom-miningdepo-cat** — reviewed. Two exclusive results (aianom.6/7), deposit tier 6:3:1 hidden; AI-oriented; tree correct.
- **anomaly-aianom-clue-cat** — reviewed. Single result aianom.11 (generate_lcluster_clue -> L-Cluster clue); tree correct.

### Batch b_24_beholder

- **anomaly-paragon-beholder-category** — reviewed. Tree correct (paragon.3 -> 4 -> friendly/study/suppress routes -> 25/26 -> ENERGY project -> 30 -> 1 Beholder leader); 60/40 vs 80/20 random for spiritualists; hidden 100-102 on planet loss.

### Batch b_25_projects_misc

- **project-contract-espionage-support-project-01** — reviewed. Single project doc CONTRACT_ESPIONAGE_SUPPORT_PROJECT_01; enabled by contract missions / generate_additional_espionage_support_project (1/3 each); part of c7b's contract chain.
- **project-contract-espionage-support-project-02** — reviewed. Single project doc CONTRACT_ESPIONAGE_SUPPORT_PROJECT_02; enabled by contract missions / generate_additional_espionage_support_project (1/3 each); part of c7b's contract chain.
- **project-contract-espionage-support-project-03** — reviewed. Single project doc CONTRACT_ESPIONAGE_SUPPORT_PROJECT_03; enabled by contract missions / generate_additional_espionage_support_project (1/3 each); part of c7b's contract chain.
- **project-inetian-projects-04** — reviewed. Single path INETIAN_PROJECTS_04 -> cstorms.195; entered through artifact_inetian_research; tree correct.
- **project-project-adakkaria-secrets-of** — reviewed. Single path project_adakkaria_secrets_of -> cstorms.2365 (options a/b); entered through artifact_adakkaria_research; tree correct.
- **anomaly-tutorial-cat** — reviewed. Anomaly card only; outcomes tutorial.52/53/54 (1/3 each) are excluded as non-story tutorial plumbing; request to coordinator on whether to show them.

### Batch b_26_sites

- **anomaly-on-crashed-ship-cat** — reviewed. Stages linked in order via bridges (site stage names are empty so the compiler made them siblings); suppress site->14002/14003/14006; hubs ancrel.8200-8203/8215; exclusive 14004/14005; ending 14006.
- **anomaly-on-solar-sails-cat** — reviewed. Stages linked in order via bridges; suppress site->15022..15025; hubs ancrel.8200-8203/8215; ending 15025.

### Batch b_27_big_anomalies

- **anomaly-mountain-uninhabitable-category** — reviewed. Exclusive 2520/6905; 2520 -> GIGANTIC_SKELETON_PROJECT -> 2521/2522 (50/50), reanimator -> RESURRECTION -> 2523; 6905.b -> CRACK_THE_EGG -> 6910 (90%) / 6915 (10%); tree correct.
- **anomaly-fungal-emitters-category** — reviewed. Exclusive 6755/6760/6765 by Fumongus quest state (draft p=0.33* corrected via group); 6755.a -> FOLLOWING_FUNGI_PROJECT -> 6770 (80%, starts fumongus_chain) / 6780; 6760.a -> MUSHROOMING_NETWORK_PROJECT -> 6785.
  - uncertain: Which events set fumongus_active / fumongus_resolved / fumongus_dismantled (ancient_relics_arcsite_events_2.txt:9628-9744) belong to other stories and were not traced here.
- **anomaly-signal-gasgiant-category** — reviewed. Single 5000; a -> GAS_GIANT_SIGNAL -> 5001 -> 5003; 5003.d -> GAS_GIANT_RELOCATION -> 5004 -> 5006; timeouts 5002/5005; tree correct.

## Requests

Compiler / cross-agent notes (I did not edit any code, any other agent's fragment, or any story outside my list):

1. **Unnamed archaeological-site stages.** `stage_sequence` groups stages by name; sites whose `stage = { ... }` blocks have no name (site_rage_sage_dig, site_space_shanty_dig, site_debris_belt, ...) are merged into one "multi-event stage" and every stage event is shown as a sibling under the site. A stage index fallback in `scripts/story_tree.py` would fix all such sites. I fixed my two (anomaly-on-crashed-ship-cat, anomaly-on-solar-sails-cat) with suppress + bridges.
2. **Shared dig-site failure incidents** ancrel.8200-8203 and ancrel.8215 appear as chapters in at least 8 stories (spaceship / station sites). I marked them as hubs in my two site fragments; the coordinator may want to make them hubs globally.
3. **Story pairs across agents (continuations).** Several of my stories continue chains that start in c3b stories; the chain doc is shared and I made it the start of my family: Old Gods (anomaly-ast-shrine-1-cat), The Ransomeers (anomaly-uhb-buoy-cat), Drifting Battlefield (anomaly-gaia-record-cat), Solar Coordinates (anomaly-ast-debris-field-1-cat), Unusual Star Stuff (anomaly-sun-rays-cat), the Fumongus trail (anomaly-alpha-centauri-cat). A "continues in" cross-link between stories would be useful.
4. **Limbo.** event-anomaly-1193 (Limbo: Technological Advances) is a late entry to the Limbo story in c3b's anomaly-barr-base-cat (anomaly.186 option b sets limbo_downloaded; tech_synthetic_workers later fires anomaly.1193 → 1194 → LIMBO_2_PROJECT). A bridge anomaly.186 → anomaly.1194 would belong in that story's fragment.
5. **apoc duplicates.** event-distar-13060 / 13070 / (13080) are the "system not surveyed by a ship" variants of apoc.5 / apoc.1 / apoc.3 (on_system_survey comments). event-apoc-3 and event-distar-13080 both start the L-Cluster chain (the chain doc appears in both stories). Consider merging or cross-linking event-apoc-1/3/5 with the distar variants (owner of the apoc stories).
6. **Nomad contract projects.** project-contract-espionage-support-project-01/02/03 are sub-tasks of chain-contract-espionage-support-chain (c7b); nomads.6000 (fired by project 01) is not a story doc.
7. **Tutorial anomaly.** tutorial.52/53/54 (outcomes of TUTORIAL_CAT) are in `events/tutorial_events.txt`, which `NON_STORY_SOURCES` excludes; the story shows only the anomaly card. Decide whether this is intended.
8. **Shadows of the Shroud content.** Twenty-two anomaly stories (the `103_anomaly_categories_extreme_frontiers.txt` categories and their `extreme_frontiers.*` events) require `has_shroud_dlc` (host_has_dlc "Shadows of the Shroud"); no matching folder exists in the local `dlc` directory. Whether such stories should be visible without that DLC is a product decision.
9. **L-Cluster outcomes.** graygoo.* / observer.* / distar.10951 are shared sinks with the Gray Tempest story; `generate_lcluster_clue` is called from about 20 events in other stories (listed by callers.py for distar.10904); each of those stories could cross-link to the L-Cluster story.
10. **Earlier request kept.** `chain-star-crazy-chain` is an unused definition (no begin_event_chain anywhere); whether the archive should show unused definitions is a product decision.
