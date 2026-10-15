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
