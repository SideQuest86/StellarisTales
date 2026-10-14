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
| 2026-10-14 ~05:00 | 18 % | 7 % | user asked for higher quality: HQ preset tested, then v3 multi-view pipeline (Zero123++ + Hunyuan3D-2mv); full v3 batch started (~13 h) |
| 2026-10-14 ~09:15 | 19 % | 0 % (new window) | batch paused for the user's GPU use and resumed; reverse story links, data tests, meshopt compression, 44.5 GB of unused weights removed; all 258 view sets done, v3 models in progress (14) |
| 2026-10-14 ~14:40 | 20 % | 3 % | session restart: batch had stopped at 64 v3 models (exit 4, cause not logged); resumed with `--skip-existing` |

Stop rule: checkpoint and stop at 52 % weekly (36 points used), never exceed 56 % (40 points).
