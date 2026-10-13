# C3b exploration review ledger (c3b-exploration)

Reviewer: c3b-exploration (Opus 5.5), started 2026-10-12. Scope: the story ids in
`content/chronology/review/assignments/c3b-exploration.txt` (188 ids: anomaly categories from
`common/anomalies/01_*`, `02_*`, `92_*` federations, `93_*` ancient relics, `101_*` astral planes, `102_*` cosmic storms,
`103_*_infernals`; Shroud first-contact covenant projects; Horizon Signal; misc. anomaly follow-up events and projects).

Method per story: `print-tree.py` + full original blocks with original line numbers (scratch tool reading the game
install directly, because extracted `line` values of files with inline scripts are in expanded line space), callers of
the root, both localisations; fragment + guide; `scripts/story_tree.py` must compile cleanly. Line numbers below are
original game-file lines.

General anomaly mechanics used in every anomaly review (`common/anomalies/99_README_ANOMALIES.txt`): a category spawns
from `spawn_chance` (planet scope, relative to other valid categories, optional `null_spawn_chance`, `max_once`); on
completion `on_success` picks ONE outcome like a random_list; each outcome defaults to `max_once = yes` per empire, so an
outcome already seen by that empire is not picked again; modifiers are evaluated in ship scope (from = planet).

## Per-story results

### horizon-signal — reviewed
- Root: akx.9000 (on_entering_system_fleet `00_on_actions.txt:1040`) after hidden akx.8000 picks a black hole at game
  start with weight 4/20 (`00_on_actions.txt:25-28`). Whole `events/horizonsignal_events.txt` (1–3896) read.
- Kept the 18 V3 bridges 9101.{a.notspiritual,a.spiritual,b} → 9200/9300/9400/9500/9600/10000 (all three options set
  `worm_events_available`, 9101.c ends WORM_CHAIN_1) and relabelled them with their real triggers.
- Added bridges: 9315 → 9320 / 9321 / 9319 (hidden 9318 on_fleet_destroyed_perp `00_on_actions.txt:1650`,
  `horizonsignal_events.txt:1916-1975`); 9320/9321 → 9330 (foredoomed trait + on_leader_death `:2384`);
  9600/9601/9602 option e → 9610 (`retainer_first_convo_concluded`, `:3382-3406`). These were secondary entries before.
- Suppressed observer-mode notifications observer.70/71/72 (`events/observer_events.txt:1199-1241`) from 9000, 10010.b,
  10020: they are spectator notifications, not player windows (they are now unassigned in coverage, see Requests).
- Groups: parallel episodes (9200/9300/9400/9500/9600; finale does not depend on them); exclusive 9410/9420 (75/25),
  9460/9465 (75/25), 9530/9540 (25/75), 9320/9321/9319 (if/else). Dialogue config for 9310 (a/b/c is_dialog_only).
  Endings 9006, 9013, 9023, 9620, 10020, 10030.
- Open: akx.8888 debug event (`is_test_event = yes`, trigger `always = no`) still a secondary entry (note added).

### anomaly-storms-prec-one (adAkkaria) — reviewed, category → precursors
- Trigger: hidden cstorms.200 (`precursor_events_cosmic_storms.txt:1800-1851`) from `on_survey_planet` random_events
  weight 25 (`00_on_actions.txt:1180-1192`) adds STORMS_PREC_ONE (spawn_chance base 0, `102_*.txt:30-49`); precursor
  needs Cosmic Storms (`01_precursor_civilizations_cosmic_storms.txt:10-17`). add_anomaly is not in the call graph.
- Order verified: Propaganda Station 5 stages → 235 after +120–150 d hidden 240 (storm) → +70–90 d 245 → Windswept
  Fates 6 stages → +15 d 2140 → Fleets 5 stages → 2179 (spawn system) → 2180 → 180-day project → 2185 → Institute 6
  stages → +15 d hidden 2230 → 2245 (psionic scientist) | 2240 → 180-day project → 2250 → Storm dialogue 2260/2265/2270
  → Celebration 6 stages → +15 d 2320/2325/2330/2335 → 2340→2350 | 2345→2355.
- Hubs added: ancrel.8200/8201/8202/8203/8215 = `space_station_random_events` / `site_explosive_decompression` dig
  incidents (`common/scripted_effects/archaeology_event_effects.txt:87-105, 520-560`), shared by 9 sites in 8 stories
  (same kind as hubs 8040/8045/8055/8070/8210). Side effect: they are now hub stories event-ancrel-8200… (see Requests).
- Dialogue configs for 2260/2265/2270/2320/2325 (is_dialog_only questions); exclusive groups 2245|2240, 2340|2345;
  endings 2350, 2355. Secrets epilogue (`artifact_actions.txt:650-680`, needs adakkaria_world_found from 2350) is the
  separate root story project-project-adakkaria-secrets-of (c3a); linked by note.

### anomaly-storms-prec-wm-one (Inetian opening) — partial, category → precursors
- Trigger: hidden cstorms.100 (`precursor_events_cosmic_storms.txt:18-78`, barren/cold barren planet, flagged system)
  from `on_survey_planet` weight 25; anomaly `102_*.txt:10-27`. Site 5 stages (110–130) → INETIAN_PROJECTS_01
  (`03_projects_cosmic_storms.txt:10-44`) → 135.
- Partial because the narrative continues outside the story: INETIAN_PROJECTS_01 spawns initializer
  `weathermanipulators_home_system` (`cosmic_storm_initializers.txt:3-60`) whose sites A/B/C form C2's story
  site-site-weathermanipulators-coordinatesa-residential-planet; secrets INETIAN_PROJECTS_04 is c3a's story. A bridge
  from 135 would make those sites non-roots and silently absorb C2's story, so I did not add one (note on 135 instead).

### Batch 02a — `common/anomalies/02_anomaly_categories.txt` (part 1) — all reviewed
- anomaly-con-biology-cat (02:353-389): 4 outcomes w1 (4095/4100 ×0 machine; 4150 ×0 if diplomacy writing found);
  PSIONIC_HORSES 4101|4102 and domestication 4103|4104 split by xenophobe/militarist/fanatic egalitarian; monster
  rescue 70/30 + on_fail; Master's Writings 70/30. Uncertain: PSIONIC_HORSES on_success tests FROM (planet) owner.
- anomaly-nuke-planet-cat (02:456-479): single outcome 4155; vault project 70/30; container 40/30/30; Majula dialogue
  4157→4158|4159 (dialogue configs), "join" resolves to 4160|4161|4162 by ethics + suspected_* flags, f→4163.
- anomaly-rapid-desertification-cat (02:766-790, max_once_global, null_spawn 0.7): 7135 → project (on_fail 7146) or
  7145 after 480–510 d; 7140 four options; adoption 60/40 (colony.7160|7166) after 3620 d; livestock 30% 7166;
  7166 hunt 50/50 (7170|7175). Related C7 story event-colony-7165 (on_colony_10_years_old) shares 7170/7175 — noted,
  not bridged (would absorb that root).
- anomaly-cold-research-cat (02:222-277): 4 outcomes w1 with gestalt/strategic-resource/interference modifiers.
- anomaly-des-buried-cat (02:129-166, max_once): 4030 (×0 if ai_admiral_found) | 4135 (×0 gestalt/found).
- anomaly-gen-old-war-cat (02:76-108): 4020 | 4165. **L-Gate decision:** 4020 calls `pop_lcluster_event`
  (`00_scripted_effects.txt:3291-3312`: Distant Stars, after first L-Gate, 3/10 → distar.9000 in 10 days).
  distar.9000 is called by 15 different outcome events via this shared effect, so it is a shared notification (hub),
  not a chapter of any one anomaly; my anomalies only link to it (owner c3a).
- Master's Writings (4135/4140/4150/4165 → edicts in `common/edicts/01_campaigns.txt:1307-1418`) are four independent
  anomalies with a shared failure event; not merged (no order, no shared gate), cross-referenced in each guide.

### Batch 02b — `02_anomaly_categories.txt` (part 2) — all reviewed
- anomaly-nano-swarm-cat (initializer parvus_system): **correction** 6705 `after` schedules 6710 for every choice but
  6710's trigger needs `studied_nanite_swarm`, set only by 6705.b → suppressed the generic edge, bridged from 6705.b.
  6705 options call `generate_lcluster_clue` (distar.10904 hub link).
- anomaly-wat-planet-cat, anomaly-gen-derelict-ship-cat (20/50/30 with the 20 gated on an uncontacted empire),
  anomaly-arid-sensor-cat (80/20), anomaly-ast-gear-cat, anomaly-data-diamond-cat (gestalt-only: ×0 for non-gestalt,
  max_once_global), anomaly-icy-flowers-cat (50/50), anomaly-intemporal-orb-cat (7120 after 36000 d),
  anomaly-mysterious-rock-cat (60/40), anomaly-sun-teapot-cat (60/40 vs spiritualist 20/80; enclave.5160 related),
  anomaly-gen-mystical-cat, anomaly-the-judge-cat (1:3; 9001 dialogue config).
- anomaly-gen-lost-cargo-cat: **added bridges** 4015.{b,phile,b.evopred} → 4017 (hidden 4018 sets DefiledCorpseTrue on
  an uncontacted empire 1–8 jumps away; 4016 on_post_communications_established fires 4017). 4017 is not a root
  (called by 4016), so the bridge does not absorb another story; it also stays in event-action-1.
- anomaly-ubume-baby-cat: **merged** my own former story event-anomaly-6793 via bridge 6792.a → 6793 (yearly check;
  needs met_ubume + later is_psionic). event-anomaly-6793 no longer exists as a separate story (intended).
- anomaly-sun-rays-cat: **added bridges** 4035.a → 4037 / anomaly_failure.4037 (hidden 4036 on_entering_system_fleet,
  40/60 with visit counter). These docs remain also in c3a's event-anomaly-4036 (root = hidden 4036); see Requests.
- Rule learned: a bridge to a doc that is the root of another story makes it non-root and absorbs that story; a bridge
  to a doc reached through a hidden router is safe (the doc then appears in both stories).

### Batch 02c — remaining `02_anomaly_categories.txt` stories — reviewed (solarpunk partial)
- Initializer-only categories verified at their `add_anomaly` sites: ALPHA_CENTAURI (5 Sol-neighbour initializers in
  `sol_initializers.txt`), UBUME_BABY (ghost_ship_system_initializer_01), UNIQUE_SYSTEM_BATTLE (unique 04/05/06),
  NANO_SWARM (parvus_system), BREACHSEALER (breachsealer_system), GEOCENTRIC (init_sol_geocentric), TIYANKI_ASTEROID
  (hostile_init_21); SOLARPUNK via `fircon.5000` option (`first_contact_dlc_events.txt:6661-6699`).
- anomaly-geocentric-experiment-cat: **suppressed** 8000.b → crisis.2037 / observer.50 (generic destroy_star_system
  machine-world bookkeeping for the Contingency, not a continuation).
- anomaly-solarpunk-cat: **partial** — middle chapter of C7's Habinte chain (event-fircon-5000 adds the anomaly;
  fircon.5020 etc. continue). See Requests.
- One-outcome stories reviewed with trigger, spawn modifiers and effects: des-planet, radioactive-planet (sets
  nuked_planet_anomalies_disabled), singing-planet, star-resonance (colorscience flag → enclave.5180 related),
  temporal-prism, tiyanki-asteroid, tox-planet, trop-biology, trop-conditions, unique-system-battle, arid-planet,
  ast-mining, breachsealer, frozen-springs, vending-machine (10/60/30 contents), alpha-centauri (Earth vs other).

## Requests

1. **Observer events (compiler).** `observer_event`s in `events/observer_events.txt` are spectator-mode notifications.
   Proposal: add `events/observer_events.txt` to `NON_STORY_SOURCES` in `scripts/story_tree.py` so they are neither
   docs nor unassigned. Until then observer.70/71/72 show as unassigned because horizon-signal suppresses them.
2. **Test events (compiler).** Events with `is_test_event = yes` (e.g. akx.8888) should not become docs/entries.
   Excluding them in a fragment turns them into separate root stories, so this needs compiler support.
3. **callers.py crash (tool).** `scripts/callers.py` raises `KeyError: 'name'` on scripted-effect path entries without a
   name (e.g. `callers.py distar.9000`); use `p.get('name')`.
4. **Hub mapping.** Generic contact reports story.3 / story.5 (hubs) currently resolve to story id
   `origin_fear_of_the_dark` in `recordToStory`, so anomaly outcomes show them as external links into that origin.
5. **Inetian precursor merge (coordinator, C2, C3a).** One narrative is split across anomaly-storms-prec-wm-one (c3b,
   opening), site-site-weathermanipulators-coordinatesa-residential-planet (c2, sites A/B/C → storm formation → last
   shelter) and project-inetian-projects-04 (c3a, secrets). Proposal: one curated family (category precursors, start
   anomalies:STORMS_PREC_WM_ONE) owned by c2; my reviewed facts for the opening can move into it.
6. **New hub stories need an owner (C2).** My hubs ancrel.8200/8201/8202/8203/8215 now compile as stories
   event-ancrel-8200 … event-ancrel-8215, siblings of c2's event-ancrel-8040 … 8210.
7. **Cross-story link without absorption (compiler).** A bridge to another story's root makes that root non-root and
   absorbs it. Needed: a bridge flag (e.g. `"external": true`) that adds the reader link but is ignored by
   `find_roots`, for optional epilogues such as the adAkkaria secrets (artifact action) and the Inetian continuation.
8. **Star-power chain duplicate (C3a).** anomaly-sun-rays-cat now contains the full chain (4035 → hidden 4036 → 4037 /
   anomaly_failure.4037 → ODD_STAR_PROJECT → 4038) via reviewed bridges. c3a's event-anomaly-4036 (root = hidden 4036)
   is the same tail; consider treating it as covered by anomaly-sun-rays-cat.
9. **Habinte / Solarpunk merge (C7a).** anomaly-solarpunk-cat (c3b) is spawned by fircon.5000 (event-fircon-5000, c7a)
   and continues in fircon.5020+ (c7a). `add_anomaly` is not in the call graph, so the anomaly is a separate root.
   Proposal: one Habinte family owned by c7a including SOLARPUNK_CAT and fircon.5010.
10. **add_anomaly calls missing from the call graph (extractor).** cstorms.100/200 → STORMS_PREC_*, fircon.5000 →
    SOLARPUNK_CAT and the system initializers' `add_anomaly` are not edges, so the real spawners never appear as
    triggers of the anomaly roots. An `add_anomaly` edge kind (trigger only, not a tree edge) would let the compiler
    show "spawned by X".
