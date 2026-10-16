# Refinement goal (2026-10-14) — weekly allowance ledger

Hard cap: 40 percentage points of the account's total weekly allowance ("Weekly · all models"), counting this session,
every subagent and tool. Source of truth: Claude desktop `get_usage`. Shared-account movement counts against the task.
A weekly reset does not renew the budget (post-reset usage is added to the pre-reset delta). No resets or overages.

| When (UTC) | Weekly all-models | 5-hour | Note |
| --- | ---: | ---: | --- |
| 2026-10-14 23:50 | 20 % (baseline; resets 2026-10-20 08:00) | 2 % | before any refinement work |
| 2026-10-15 ~00:40 | 22 % | 0 % (new window) | 3 Sonnet front-end agents + 12 Haiku placeholder reviewers done; integration, audit, regression suites; before release |
| 2026-10-15 ~00:50 | 22 % | 0 % | released v4.2.0, live checks passed (refine reader/chrome/audio, reader V4). **Task total: 2 points of 40** |

Stop rule: checkpoint at 54 % weekly (34 points), never exceed 60 % (40 points).

## Round 2 (2026-10-15: images, placeholders, effects, polish) — separate 40-point cap

| When (UTC) | Weekly all-models | 5-hour | Note |
| --- | ---: | ---: | --- |
| 2026-10-15 02:40 | 23 % (baseline; resets 2026-10-20 08:00) | 3 % | before round-2 work |

Stop rule: checkpoint at 57 % weekly (34 points), never exceed 63 % (40 points).
| 2026-10-15 ~03:35 | 24 % | 11 % | released v4.3.0 (578af821), live checks passed (effects, refine reader/chrome/audio, reader V4). **Round-2 total: 1 point of 40** |
| 2026-10-15 ~04:00 | 25 % | 24 % | completion pass (rendered review of all sentences, effects gaps closed, layout sweep) before release. **Round-2 total so far: 2 points of 40** |
| 2026-10-15 ~04:20 | 26 % | 25 % | released v4.4.0 + v4.4.1 (a94069b4); live: layout sweep, effects, refine reader/chrome/audio, reader V4 all passed. **Round-2 total: 3 points of 40** |
| 2026-10-15 ~05:20 | 29 % | 54 % | released v4.5.0 (c0aca240) after second + residual review and effects conditions; live: layout sweep, effects, refine reader/chrome/audio, reader V4 all passed. **Round-2 total: 6 points of 40** |
| 2026-10-15 ~06:30 | 31 % | 5 % | released v4.5.1 (6b8ef7e1): verified entity mappings, natural effect labels, full-catalogue sweep (3,292 pages, 0 failures); live checks passed. **Round-2 total: 8 points of 40** |
| 2026-10-15 ~06:55 | 31 % | 7 % | released v4.5.2 (555afe1e); live: images, a11y, layout sweep, effects, refine reader/chrome/audio, reader V4 all passed. **Round-2 total: 8 points of 40** |
| 2026-10-15 ~07:30 | 31 % | — | released v4.5.3 (cb76673c) with rollback/reproducibility evidence; live checks passed. **Round-2 total: 8 points of 40** |
| 2026-10-15 ~08:15 | 31 % | — | released v4.5.4 (e19a281e): full UI-copy pass, final exception pass, source-checked licences; live checks passed. **Round-2 total: 8 points of 40** |

## Round 3 (2026-10-16: museum viewer, progress, search, presentation, frame spikes, release gate) — separate 40-point cap

| When (UTC) | Weekly all-models | 5-hour | Note |
| --- | ---: | ---: | --- |
| 2026-10-16 08:55 | 33 % (baseline; resets 2026-10-20 08:00) | 4 % | before round-3 work |

Stop rule: checkpoint at 67 % weekly (34 points), never exceed 73 % (40 points). A weekly reset does not renew this budget.
| 2026-10-16 ~10:00 | 33 % | 11 % | items 1-3 and 6 done, 4 inspected, 5 measured/diagnosed; CI green incl. smoke gate; before release v4.6.0. **Round-3 total: <1 point of 40** |
| 2026-10-16 ~10:25 | 33 % | 11 % | released v4.6.0 (186a3e58) through the gated workflow; live checks passed (smoke, museum viewer, progress, search, a11y). **Round-3 total: <1 point of 40** (weekly 33 % at start and end) |
| 2026-10-16 ~11:30 | 34 % | 15 % | released v4.6.1 (reader/map warm-up: first opening 50 -> 33 ms) and v4.6.2 (warm-up race fix); live checks passed. **Round-3 total: 1 point of 40** |
