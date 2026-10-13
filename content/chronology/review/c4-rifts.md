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

## Requests

(see bottom of file; maintained as work proceeds)
