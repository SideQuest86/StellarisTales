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
<!-- ledger-end -->
