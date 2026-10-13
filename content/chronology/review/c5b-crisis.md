# C5b crisis review ledger (c5b-crisis, Opus 5.5)

Scope: `content/chronology/review/assignments/c5b-crisis.txt` (27 ids). Game install read-only; every file:line below
is the real line in the installed file (these crisis files use no inline scripts, so compiled lines match).

## Conventions used in my fragments

- **Observer copies** (`events/observer_events.txt`, `observer_event`, same loc keys as the player window, single OK):
  included in the crisis family and attached under their player twin with the bridge label
  "观察者模式：同一通知（文本相同）/ Observer mode: the same notice (identical text)" and nodeLabel "Observer copy".
  Exception: `observer.50` is an auto-hub root of another reviewer's story (event-observer-50) and is not linked.
- **Repeatable diplomacy screens** (on_custom_diplomacy) are linked from the doc at which communications are
  established, labelled "repeatable communication, not a story step"; never threaded into the main line.
- **Custodian/Emperor announcements** (custodian.51/53, emperor.91/93) are shared reaction docs (not owned), bridged
  from the visible doc at the moment the crisis calls custodian.50/emperor.90 (+30 days).
- **Crisis starter routers** crisis.10 / crisis.1000 / crisis.2005 are declared `hubs` (shared by crisis_trigger.1 and
  the Defender of the Galaxy projects 4/5): callers link to the crisis instead of absorbing its docs.

## Per-story results

### prethoryn-scourge — reviewed (2026-10-12)
- Root crisis.11 (crisis_trigger.1 on_five_year_pulse → crisis.10 after 200–800 d; also Defender projects 4/5).
- Main line by flags + MTTH: 11 →(hidden 12, MTTH 600 mo) 13 →(hidden 14, MTTH 120 mo) 15 → 16 →(hidden 17,
  MTTH 30 mo) 18 →(19 after 400–600 d) 20. War developments (parallel, none required): Sentinels 51 (swarm ≥15%/90
  systems), 71/78/81→82, 55 contact; wounded Queen 101 → CAPTURE_QUEEN → 105 | 107 (exclusive; **corrected**: 107 was
  a child of 105, it is sent to the *other* empires — suppressed 105→107, bridged project→107); 105 → 234 (psionic,
  MTTH 100 y); Brood-Queen 252 (5/105 on queen kill by a human) → 250 relic activation. Ending 211 (swarm destroyed);
  aftermath 76 (Sentinels disband 15–25 d), 121 (feral nests from +360 d).
- Docs: 38, no secondary entries remain. Observer copies observer.27–33 included.

### unbidden — reviewed (2026-10-12)
- Root crisis.1007 (high intel) | crisis.1008 → 1009 (+30 d, low intel) — exclusive opening; both converge on 1010.
- From 1010: 1050 contact, 1011 repeatable colony loss, second portal 1110 (hidden 1100, Unbidden ≥15%/90 systems,
  MTTH 12 mo) → 1112 first clash (1111 on fleet destroyed) → 1210 third portal (hidden 1200, MTTH 40 mo).
- Portal destruction branches are exclusive pairs by remaining-portal flags: 1013|1016, 1116|1117, 1216|1217;
  1013 → 1250 Warlock (human destroyer); final → 1271 (last extradimensional country destroyed).
- Observer copies observer.34–40 included. Uncertain: 1250 for portals 2/3 is called in the EXD country scope
  (crisis_events_2.txt:1772-1778, 2320-2326).

### contingency — reviewed (2026-10-12)
- Root crisis.2010. **Timed sequence** from crisis.2005 (L136-219): day 100–300 omens (2011|2012 synth; 2502|2503
  machine), day 400–600 (2015|2016), 700–900 2020, 1000–1200 2021, 1400 2022, 1450–1460 hubs 2030→2031(+50)→
  2032(+100)→2033(+150), 1800–1900 infiltration by empire type (2085/2086/2087/2313).
- 2033 → 2037 (hubs 1–3 destroyed) → 2036 (4th; crisis.2035) → 2039 (+5 d) → 2038 ending; aftermath 2480|2481,
  fallen_machine_empire.4, Cybrex 2474/2407.
- Subplots: synth terror (2090 → yearly 30% one of 2091/2092/2093/2095|2096/2097/2098), machine sabotage
  (2314 → one of 2301–2305/2307 → 2308|2309), Cybrex return 2401 (hidden 2400) with 2403 contact, 2473 gift, 2405.
- V3 bridges kept but relabelled with absolute days; added fallen_machine_empire.2/.4 (Contingency-only callers).

### cosmogenesis — reviewed (2026-10-12)
- Player crisis path (ap_cosmogenesis). Levels 1→5 via 00_crisis_levels.txt:375-531 (tech + Advanced Logic
  4000/10000/22000/60000; L4/L5 need NOT cosmogenesis_aborted; L5 needs 2 applied theses, not subject).
- Infinity Thesis (tech added at L4, 02_machine_age_effects.txt:81) → crisis.7200 random table (11 exclusive
  outcomes) → 7285 ultimatum after 30 d (once): option a = **abort** ending (cosmogenesis_aborted).
- L5 → 7125 (tech V) → 7400 Needle → 7500/7501 embark → 7510 choose black hole (a: via 7514 +7 d; b: project) →
  7515 → 7516 **victory** (win=yes) | 7517 others' view → 7518.
- **Corrected**: suppressed 7516 → crisis.2037/observer.50 (destroy_star_system side effect into Contingency).
  Lathe side events 7530/7535/7540 and Scion 7280 attached under 7100 with conditions.

### galactic-nemesis — reviewed (2026-10-12); absorbs event-crisis-6000/6005/6006/6007/6050/6099/6200/6205
- Fragment now defines `family` (title = ap_become_the_crisis 星海天罚/Galactic Nemesis, sources
  nemesis_crisis_events.txt + nemesis_crisis_endgame.txt, start crisis.4140). **Corrected root**: legacy start was
  crisis.4100 (other players' view of the Declare Crisis resolution).
- Levels 00_crisis_levels.txt:16-223: L1 4140 → project 1 (5 exclusive variants) → 4120 → L2 4145 (+3 d) → … → 4135 →
  L5: declare_crisis_effect (4105|4106 self, 4100/4101 others, repeal 4110-4113) and 6000 (+5 d) → 6001 Star-Eaters.
- Engine stages (12_crisis_sphere.txt): 6005 → 6006 (+6151) → 6007 (+6161, 6171) → 6050 **victory** → 6051 (others).
  Engine destroyed: 6101 builder | 6102 destroyer | 6103 others; captured 6200. Star notices 6180|6181|6182.
- **Corrected**: suppressed 6200.A → 6101 (goes to the builder), suppressed 6050 → crisis.2037/observer.50
  (destroy_star_system side effect). Bridged planet_destruction.610 (Holy World destroyed) under 6001, which pulls in the
  shared FE-awakening docs (fallen_empires_awakening.2/.11, observer.73, bio.3400) as they also appear in war-in-heaven.

### event-crisis-6000, -6005, -6006, -6007, -6050, -6099, -6200, -6205 — merged into galactic-nemesis
- These were fragments of the Aetherophasic Engine endgame (nemesis_crisis_endgame.txt) split off because the legacy
  family only listed nemesis_crisis_events.txt. No separate fragments (they no longer compile as stories).

### behemoth-fury — reviewed (2026-10-12); absorbs chain-behemoth-crisis-chain
- Fragment defines `family` (start biocrisis.50, member event_chains:behemoth_crisis_chain). Levels
  00_crisis_levels.txt:533-705 chained as bridges (egg built / hatched / project 3 / project 4); L5 → situation
  Growing Pains (stages 210–245, Voidspawn 150) → 250 → 190 (yearly) → 191 **victory**; 265 **defeat**.
- Cross-story: L5 declare_crisis_effect → crisis.4105 (galactic-nemesis); 191.c requires learned_about_redacted from
  Prethoryn crisis.30.h/j.

### defenders-of-the-galaxy — reviewed (2026-10-12)
- Levels 00_crisis_levels.txt:225-372 bridged (project 1 / council / Custodian / active crisis). Projects 4/5
  (06_projects_nomads.txt:378-709) summon a not-yet-happened endgame crisis: bridged to crisis.11, crisis.1007,
  crisis.2010, crisis.8035 as cross-story links. **Corrected**: the draft expanded the summoning through hidden routers
  into ~24 observer/Custodian refs; removed via the crisis-starter hubs + suppress of Cetana 8020/8039.
- Paladin Initiative (resolution, L4 perk + Custodian) 200 → 205 → 210 → 216; 225/230/235 resolutions.
- Victory ambition.325 via custodian.10/custodian.14 (+5 d) with 2+ crises defeated.

### war-in-heaven — reviewed (2026-10-12)
- Fragment defines `family` (start war_in_heaven.2, + observer.75/76/79/80). Rival awakens (hidden .1, MTTH 5 y) →
  2 → (hidden .3, after 720 d, MTTH 1 y) 4 | 7 → League 13 → 19/22/15/20/21, 16 → endings 5 | 6 | 11 | 18
  (war goal on_accept / on_status_quo, on_country_destroyed). All were secondary entries before.
- Remaining secondary entry fallen_empires_awakening.11: reachable only via test event war_in_heaven.1000.

### chain-behemoth-crisis-chain — merged into behemoth-fury
- The event-chain overview is begun by crisis_behemoth_level_1 on_unlock (00_crisis_levels.txt:548); now a member of
  behemoth-fury, attached under biocrisis.50.

### event-crisis-trigger-1 — dissolved (not a story)
- Root was the hidden selector crisis_trigger.1 (crisis_trigger_events.txt:9-375; on_five_year_pulse,
  00_on_actions.txt:281); weights Prethoryn 10 / Unbidden 8 / Contingency 10 / Cetana 10 / nothing 120, delay 200–800 d.
  Its "docs" were only observer copies and Custodian/Emperor announcements flattened through the crisis starters.
  After the hubs above and the observer includes it compiles to no doc and disappears. The selector is described in
  each crisis guide's "How it starts".

## Cross-chapter condition dependencies (for the coordinator)

| Earlier state (story) | Later variant affected | Evidence |
| --- | --- | --- |
| Behemoth Fury menace perk `menp_behemoth_mind_meld` (behemoth-fury) | Prethoryn crisis.30 readable dialogue (`can_talk_to_prethoryn`) | 00_scripted_triggers.txt:5564-5570 |
| Psionic / hive-minded species (empire profile) | crisis.16, crisis.30 texts; crisis.234 requires psionic | crisis_events_1.txt:320-337, 3887-3947 |
| Captured Queen (crisis.105.a leader flag captured_queen) | crisis.234 Hole in the Void | crisis_events_1.txt:2415, 3914 |
| Defender of the Galaxy projects 4/5 (defenders-of-the-galaxy) | can start Prethoryn/Unbidden/Contingency/Cetana | 06_projects_nomads.txt:443-528, 607-697 |
| `has_event_chain defender_of_the_galaxy_ending_chain` | crisis victory adds `crisis_defeated` counter | crisis_events_1.txt:3619-3627; crisis_events_2.txt:3384-3393; crisis_events_3.txt:2265-2281 |
| Origin Fear of the Dark (origin_fear_of_the_dark) | origin.6125/6130/6135 at invasion start, origin.6136 at victory | crisis_events_1.txt:761-771, 3607-3612 etc. |
| Synthetic Workers tech + mechanical pops | Contingency 2011/2012/2015/2016 | crisis_events_3.txt:228-233, 294-299 |
| Machine Intelligence | 2502/2503, 2313→2314 sabotage, AI_CRISIS_PROJECT | crisis_events_3.txt:159-168, 213-216, 645-649 |
| AI_CRISIS_PROJECT finished (ghost_signal_blocked) | crisis.2037 machine text variant | crisis_events_3.txt:1674-1681 |
| Synth detection project done (synth_detector) | stops synth terror rolls | crisis_events_3.txt:3318, 3345 |
| Cybrex gift accepted (cybrex_donation) | crisis.2474 recall after victory | crisis_events_3.txt:2295-2298 |
| Grand Archive tech_gravity_wells | grand_archive.7220 in Prethoryn | crisis_events_1.txt:490-496 |

## Requests (compiler / other owners)

1. `scripts/callers.py` crashes on effect path elements without `name` (KeyError at line 25, e.g. crisis.1000);
   needs `p.get('name')`. I used a patched scratch copy.
2. `exclude` only removes family membership; it cannot keep non-member docs (observer copies, shared announcements)
   out of a tree, and `suppress` is not applied to readable outcomes of *hidden pending members* (secondary entries).
   A per-story "not part of this story" list would avoid hub/bridge workarounds.
3. Policy decision wanted on `observer_event` duplicates archive-wide (I attach them under their twin; alternatively
   the compiler could treat observer_events.txt as non-story or as a variant of the twin).
4. event-observer-50 (c8c) is the observer copy of crisis.2037 (Contingency "Machine World Destroyed"); it exists only
   because observer.50 is an auto-hub via destroy_machine_world. Suggest merging it into contingency.
5. Compiled `source.line` is in inline-script-expanded space for some files (e.g. grand_archive_events.txt 7220 vs
   9075, relics.txt) — evidence lines should be read from the real files.

### galactic-hyperthermia — reviewed (2026-10-13); absorbs event-infernals-1000/1005/1010/1015/1025/1030/1051/10530
- New family (start infernals.1000, ap_galactic_hyperthermia on_enabled 00_ascension_perks.txt:587). Level chain bridged by flags set
  by projects/crucible stages (22_galactic_crucible.txt:174/212/247-250/284-288) and crisis_levels.txt:707-835; evil vs peaceful
  projects exclusive (1015); timer 1030 -> stage 2 1035/1040 -> hidden 1041 -> firestorm situation, notices 1042/1043, 1045;
  endings 1055 (perpetrator, win=yes) | 1056; crucible capture 1052 (post-war) | 1053 (in war) via hidden routers 1051/10530.
- Corrected: 8 id-fragments merged; suppressed hyperthermia_galaxy_effect side-effect links 1055 -> crisis.2037/2035/2046, observer.50.
- Uncertain: hidden objective events infernals.2000-2020 not shown.

### gray-tempest — reviewed (2026-10-13); split into three stories
- Draft was the whole L-Cluster ("Secrets of the L-Cluster", 59 docs). Game-start roll distar.8000 (distant_stars_events_3.txt:1110-1135)
  picks exactly one of Tempest / empty / dragons / Dessanu, so these are separate stories.
- gray-tempest: graygoo.1 (hidden) -> 10|11|13 -> 12; 2 colony devoured, 555, factory destroyed (hidden 6) -> 15 | 16 (+observer.64/65).
- New family dessanu-consonance (graygoo.100-184, observer.66/67): hostility paths 126/150/155/156/160-162, endings 181|182.
- New family lcluster-gray (anomaly disco_gray_cat + graygoo.400-406, menus 500-504, 510-512, 550): only in the empty-cluster outcome
  (anomaly spawn_chance factor 0 if any of the three flags, 95_anomaly_categories_distant_stars.txt:1713-1735).
- Left to others: distar.10950-10954, observer.62/63, distar.13010/13011 (L-Gate opening / dragons) now fall outside my families.

### event-infernals-1000/1005/1010/1015/1025/1030/1051/10530 — merged into galactic-hyperthermia

### Requests added 2026-10-13
6. After splitting gray-tempest the L-Gate opening notices (distar.10951-10954, distar.13010/13011 dragons, observer.62/63) compile as an
   unowned story `event-distar-10950` (hidden router distar.10950 declared a hub in gray-tempest.json so the test events
   graygoo.25/30 stop spawning duplicate stories). Suggest the L-Cluster owner (c3a, event-distar-10903) absorb them as the
   "L-Cluster outcome" notices; the four game-start outcomes (distar.8000, distant_stars_events_3.txt:1110-1135) lead to gray-tempest,
   dessanu-consonance, lcluster-gray (empty cluster) and the dragon-season story.
7. graygoo.25/29/30/32 are `is_test_event` events with `always = no`: dev-only, not story content.
