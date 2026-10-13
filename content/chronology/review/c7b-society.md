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
