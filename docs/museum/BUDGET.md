# Museum task — weekly allowance ledger

Hard cap: 40 percentage points of the account's total weekly allowance ("Weekly · all models"), counted across
planning, tools and delegated work. A weekly reset does not renew this budget: usage after a reset is added to the
pre-reset delta. Source of truth: Claude desktop `get_usage` (plan limits card). Shared account usage is counted
conservatively (all movement of the weekly counter counts against this task).

| When (UTC) | Weekly all-models | 5-hour | Note |
| --- | ---: | ---: | --- |
| 2026-10-14 02:19 | 16 % (baseline; resets 2026-10-20 08:00) | 23 % | before any museum work |
| 2026-10-14 ~02:35 | 16 % | 25 % | specimen inventory extracted (258), Grand Archive facts documented |
| 2026-10-14 ~02:55 | 17 % | 29 % | museum UI + viewer, TripoSR installed, 6 v1 models; Opus 5.5 high GPU-render subagent launched (user request) |
| 2026-10-14 ~03:00 | 17 % | 32 % | v2 pipeline (Real-ESRGAN + Hunyuan3D-2mini) approved by user; first run downloading weights |
| 2026-10-14 ~04:00 | 18 % | 3 % (new 5-h window) | GPU subagent merged; 6 v2 models inspected; full v2 batch started (local GPU, ~9–10 h, no token cost while running) |

Stop rule: checkpoint and stop at 52 % weekly (36 points used), never exceed 56 % (40 points).
