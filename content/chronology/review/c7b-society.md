# C7b society review ledger (c7b-society)

Reviewer: c7b-society (Opus 5.5), working copy `st-agents/c7b-society`, started 2026-10-12.
Scope: `content/chronology/review/assignments/c7b-society.txt` (240 story ids). Game source is authoritative
(`D:/Living/Steam/steamapps/common/Stellaris`, read-only). Each entry: story id — status — what was checked — changes —
open questions. File:line references are to the game install unless prefixed with `content/` or `public/`.

## Conventions used in this ledger

- "pool" = an on_action `random_events` block (weights include a "0 = no event" entry). Interludes from pools are
  repeatable/unordered unless a flag makes them once-only.
- Delays are written as the script's `days`/`random` pair converted to a range (days=15 random=10 → 15–25 days).
- Every reviewed story has a fragment `content/stories/<id>.json` and a guide `public/summaries/<id>.md`.

## Per-story results

### event-colony-10000 — reviewed
- Root colony.10000 from `on_colony_2_years_old` random_events weight 15 (00_on_actions.txt:3772); once per galaxy
  (global flag court_of_blossoms, colony_events_3.txt:10625-10635).
- Checked every option/delay/random_list in colony_events_3.txt:10587-11675 and both CRYPTIC_ESSENCE projects
  (00_projects_3.txt:2037-2080). Compiled draft matched the source; no bridges/suppressions needed.
- Fragment: titleFrom colony.10015 ("A Court of Blossoms", the chain name in developer comments), free-question
  dialogues for 10015 and 10026, six endings (10081/10082/10086/10087/10090/10095), node labels.
- Uncertain: engine pool-selection semantics (trigger checked before/after weighted pick) not visible in script.

### event-colony-9200 — reviewed
- Root colony.9200 from `on_colony_4_years_old` weight 2 (00_on_actions.txt:3856); once per empire (country flag
  ancient_manufactorium). Long strictly sequential chain 9200→9290 with ethic/civic-gated option variants; exits at
  9201.b (9202 crater) and 9250.f (scrapyard). Project ANCIENT_MANUFACTORIUM_PROJECT (00_projects_3.txt:1753).
- Draft matched source. Fragment: endings 9202/9290, notes (9250 dismantle exit; repeated pre_triggers), node labels.

### event-colony-mod-161 — reviewed (split into 6 stories)
- The draft merged six unrelated planet-modifier colony events behind the hidden dispatcher colony_mod.161
  (`on_colony_1_year_old`, 00_on_actions.txt:3721). The dispatcher's `if … break = yes` blocks
  (colony_events_3.txt:941-1033) fire at most one event per colony, chosen by planet modifier priority.
- Split with families (each `start` = the hidden dispatcher, so the entry keeps its condition/delay):
  event-colony-mod-161 (strong magnetic field: 16/17 50/50, project at the 3rd occurrence, 18),
  NEW event-colony-mod-1 (irradiated: 1 → 6/7/8/9 at 20/20/20/40), NEW event-colony-mod-2 (titanic life: 2 → three
  study projects → 101/102), NEW event-colony-mod-3 (unstable tectonics: 3 → 21/22/23), NEW event-colony-mod-4
  (asteroid belt comet), NEW event-colony-mod-5 (hallucinogen: 5 → removal project → 10/11 at 75/25).
  Primal Calling's titanic-life variant grand_archive.1010 stays in origin_primal_calling.
- Uncertain: check_variable value = 3 read as "equals 3".

### event-colony-9000 — reviewed
- Root colony.9000 (`on_colony_2_years_old` weight 8); once per galaxy (turtle_world_spawned); starts event chain
  nemma_world_chain. Title from the chain name "Nemma World". Four ethic-gated proposals (breed/enslave/mine/slaughter);
  breeding loop (turtle_amount counter, random 2 : 1×count, retry 3 : 1×count) up to six Nemmas.
- Fragment: endings 9040/9045, notes on 9005.b exit, breeding loop, 9035 protest gating. Self-loops are not drawn by
  the compiler (noted).

### event-colony-9820 — partial (merged event-colony-9885 and event-colony-9889 into it)
- Second half of the "Negative Mass" chain (developer header colony_events_3.txt:7579-7584). Root colony.9820 via
  `on_fleet_destroyed_perp` (fleet with B_world_relation). The first half (colony.3005 The Doorway → DPORTAL_PROJECT
  weight 5 → 9800 → 9805 → 9810 → 9815) is inside event-enclave-300 (c6) — see Requests.
- situation_negative_mass (01_narrative_situations.txt:1661-1817) starts at 75 (stage 3). Rescue approach goes DOWN
  (stage 2 → 9855/9875 by gestalt, stage 1 → 9860/9880, 0 → 9850); observe/plunder goes UP (stage 4 → 9870, 100 → 9851).
  The compiler's stage chain (definition order 9860→9880→9855→9875→9870) is wrong; fixed primary placement with 12
  bridges + 1 suppress, 3 suppresses for start-of-game scripted-effect side calls from 9850, exclusive groups,
  9821 free-question dialogue with regular/hive/machine response profiles, 9840 option label variants.
- 9885 (on_colony_defenders_win) and hidden 9889 → 9890 (on_colony_attackers_win) are the two results of 9880's
  ground battle (on_actions comments name "Negative Mass"); converted the story into a family and bridged both from
  9880, so the ids event-colony-9885 and event-colony-9889 no longer exist as separate stories.
- Partial only because 4 spurious stage refs remain until the compiler honours `stageSequence` (Request 1).

### event-colony-7229 — reviewed
- Hidden root colony.7229 (`on_colony_2_years_old` weight 8, "flag only") fires colony.7230 exactly 3600 days later
  (colony_events_3.txt:9821-9858); once per empire (melting_planet), cold worlds, not Mastery of Nature.
- MELTING_RESEARCH_PROJECT (720-day limit; on_fail → 7245) and PLANET_MELTDOWN_PROJECT (Environmentalist only)
  checked (00_projects_3.txt:1886-1935). Draft matched. Endings 7260/7265/7250/7255; notes on the ten-year delay and
  the 7247.b exit.

### event-colony-8001 — reviewed
- Root colony.8001 (`on_colony_3_years_old` weight 10), once per empire, non-gestalt. Title from event chain
  "Feral Overload". 8001→8002→8003 (40–60 days each), investigate project → 8004 → utilize (8005) / exterminate
  (8006) projects (00_projects_federations.txt:8-59). Draft matched; endings 8005/8006.

### event-colony-9350 — reviewed
- Root colony.9350 (`on_colony_3_years_old` weight 10), robotic empires only (is_robot_empire,
  00_scripted_triggers.txt:1366), once per galaxy. Five counter-measures at 9360 (harvest = catalytic, nuke =
  Terminator → 9370), 9365 text/delay by choice, 9375 lure (exit) or study project → 9380. Draft matched;
  endings 9370/9380, notes.

### event-colony-fed-100 — reviewed
- Root colony_fed.100 (`on_colony_2_years_old` weight 3, `on_colony_3_years_old` weight 4), once per empire, needs
  miner jobs. Gestalt/non-gestalt option sets at 105; BLUELOTUS_SCALE_PROJECT (3500, 1080-day limit, on_fail → 111);
  115 → 50% chance of 120 after 1800–2160 days. Title from colony_fed.105 "Project Blue Lotus". Endings
  106/107/111/120, note on 115.

### event-colony-5000 — reviewed
- Root colony.5000 in `on_colony_2_years_old` fixed `events` list (00_on_actions.txt:3745), gated by the
  d_hab_lonely_bot_deposit placed by anomaly.2580 (anomaly_events_2.txt:1045, story anomaly-the-lonely-bot-category).
  Projects LONELY_BOT_PROJECT (1800-day limit; on_fail → 5006) and LONELY_BOT_MISSING_PROJECT. Draft matched;
  endings 5006/5020. Request 3: cross-story link anomaly.2580 → colony.5000.

### event-colony-9050 — reviewed (merged event-colony-9080 into it)
- Root colony.9050 (pools: 2y weight 8, 3y weight 3), once per galaxy. Escalating energy-paid probes; subterranean /
  Cosmic Dawn split at 9055.b (two same-key options). Crystal Kraken army from 9075 or 9090; its ground defeat
  (on_army_killed_in_combat → hidden 9080 → 9081) was a separate 1-doc story event-colony-9080 — merged via family
  + bridges 9075→9081, 9090→9081. Hidden 9082 (destroyed otherwise) and 9095 (kraken occupies planet) noted.

### event-colony-9295 / 9310 / 9900 / 9950 — reviewed (batch, colony_events_3.txt)
- 9295 Metallic Puddles: 2y pool weight 8, non-machine, once per galaxy; two routes converge at 9300 → project
  FASCINATING_METEOROLOGY_PROJECT (00_projects_1.txt:3578) → 9301. Ending 9301.
- 9310 Junkyard Orbit: 5y pool weight 3, once per empire; 9315 requires the landfill blocker; clean (720-day limit,
  on_fail → 9325) / ignore (60/40 9325/9330) / trait-civic-gated intense clean → 9335. Four endings.
- 9900 Missed The Morning Check-in (Stasis Prison): 5y pool weight 3, once per galaxy; STASIS_PRISON_PROJECT;
  9915 four choices, release → 25/50/25 (±15 by xenophile/xenophobe). Endings 9920/9925/9930.
- 9950 Stratospheric Vents: 2y pool weight 8, needs Tiyanki contact, non-gestalt; tourism vs refining; blasting
  50/50 (Mining Guilds 75/25). Endings 9960/9970/9975.
- All drafts matched the source; fragments add endings/notes only.

### event-colony-3001 / mod-30 / 3029 / 7165 / 3051 — reviewed (batch)
- 3001 Rogue Moon: 2y/3y pools weight 10; ROGUEMOON_PROJECT → 3002 (90) / 3003 (10). Developer comment ties
  DPORTAL to "the Rogue Moon chain", but no script call connects them (noted in guide).
- mod-30 Eruption: hidden colony_mod.30 in `on_colony_1_year_old` events (Obsidian Lakes) → 31 within 0–31 days →
  32/33/34 at 33 each. Independent of the colony_mod.161 dispatcher.
- 3029 Inter-Dimensional Trade: on_five_year_pulse → hidden 3029/3030 → 3031 up / 3032 down by trade level
  (normal 60/10/10, low 20/20/10, high 30/10/20); crisis counter ≥5 → 3033 after 1825–3650 days (finale, registered
  as free-call dialogue). Prologue (The Doorway mirror outcome) is in event-enclave-300 (Request 2).
- 7165 Troublesome Critters: 10y pool weight 10, needs desertling_fauna (set by anomaly.7140) or unintelligent
  pre-sapients; hunt → 50/50 7170/7175; reserve (1000 energy). 7166 twin stays in anomaly-rapid-desertification-cat.
- 3051 Daemonic Incursion: on_colony_defenders_lose after 3050's demon armies (Toxic Knights hell-portal branch,
  3006 random 15/25/20/40 after 3600–4500 days). 3 false start-of-game effect links suppressed. Option b set_player.

## Colony batch status
All colony stories in the assignment are done: 10000, 9200, mod-161 (+5 new split families), 9000, 9820 (partial),
7229, 8001, 9350, fed-100, 5000, 9050, 9295, 9310, 9900, 9950, 3001, mod-30, 3029, 7165, 3051;
9080 merged into 9050; 9885 and 9889 merged into 9820.

## Requests
1. (compiler) `stage_sequence()` chains all stage-hook targets of a situation in definition order. Wrong when a stage
   fires alternative events (gestalt vs non-gestalt) or the situation starts mid-way / moves in both directions
   (situation_negative_mass: initial_progress 75, rescue goes down, others go up). Please honour a fragment field
   `"stageSequence": {"<situation record id>": false}` (skip the heuristic for that situation; reviewed bridges and
   suppress then define order). Used by event-colony-9820 (currently 4 spurious stage refs → status partial).
2. (ownership) The Dimensional Portal chain — colony.3005 "The Doorway" (on_colony_2/3_years_old pool), DPORTAL_*
   projects, 3006–3012, 3020–3024, 3040/3041, 3050, 3055, 3060, 9800–9815 and event_chains:negative_mass — is
   currently swept into c6's event-enclave-300. It is a C7 colony chain. Its continuations are my stories
   event-colony-9820 (Negative Mass part two, via on_fleet_destroyed_perp), event-colony-3029 (mirror trade) and
   event-colony-3051 (daemonic incursion). Suggest: give the portal chain its own C7 story and add cross-story bridges
   9815→9820, 3009(mirror trade options)→3031/3032, 3050→3051.
3. (cross-link) anomaly.2580 (anomaly-the-lonely-bot-category) places d_hab_lonely_bot_deposit; event-colony-5000
   is its colony sequel. Suggest a cross-story bridge anomaly.2580 → colony.5000 (owner of the anomaly story).
