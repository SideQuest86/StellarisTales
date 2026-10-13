# C8c review ledger — Galactic miscellany (third list)

Reviewer: c8c-stories (Opus 5.5), working copy `st-agents/c8c-stories`. Assignment: `assignments/c8c-stories.txt` (245 ids).
Game authority: `D:/Living/Steam/steamapps/common/Stellaris` (read-only). Line numbers below are real file lines (ripgrep), not
the compiled `source.line`, which drifts in files that use inline scripts (see Requests).

Legend: **reviewed** = root/trigger, membership, order, exclusivity, variants and guide checked for the whole story;
**merged → X** = the id no longer exists as a story because its docs are now part of family X (reviewed there).

## Results

### the-shroud — reviewed (family override; title fixed to original 虚境 / The Shroud)
- Root: utopia.2655 (tradition tr_psionics_breach_shroud, common/traditions/01_psionics.txt:123-135) → BREACHING_SHROUD_PROJECT
  (00_projects_utopia.txt:67-101) → utopia.2656 Séance → utopia.3000 hub (on_custom_diplomacy 00_on_actions.txt:725-726; 3010 when on cooldown).
- Hub is repeatable: 2160-day cooldown per delve (utopia_shroud_events.txt:183,206,240,273; 2659 2428), active only with
  has_shroud_dlc = no (line 134); Shadows of the Shroud DLC folder is not installed.
- Merged into this family: event-utopia-2655 (2655/project/2656), event-utopia-2670 (2671), event-utopia-2675 (2676),
  event-utopia-2680 (2681→2682, shared with Shadows stories, not made members), event-utopia-2685 (2686).
- Bridges added: covenant side effects by patron (3330 MTTH 15y, lines 6955-7063), covenant ranks 20/50/90/150
  (utopia_on_action_events.txt:5-8, 2665-2686, on_monthly_pulse_country 00_on_actions.txt:352-356), Divine Sovereign from both
  Chosen paths (8620-8759), Reckoning world-devouring 3320→3325 (6736-6952), 3010→3000 return, annotated 3024→3026 (3600 days).
- Groups: vision pool, Avatar outcomes, communion outcomes (exclusive). Node labels for 40+ duplicate titles (boons/curses/covenants).
- Uncertain: shroud.112xx Reckoning aftermath shared with origin_endbringers; Shroud Incursion also from shroud.13000.

### event-utopia-2600 — reviewed (new family on the existing id: 心胜于物 / Mind Over Matter)
- Root utopia.2600 (tr_psionics_adopt on_enabled, 01_psionics.txt:19-23); 2605 hidden MTTH 220 months → 2606/2607/2608 by
  empire type (exclusive group) while Latent Psionic; 2650 via tradition Great Awakening (01_psionics.txt:103-118); cross-story
  bridge 2650 → utopia.2655 (the-shroud).
- Merged into this family: event-utopia-2605, event-utopia-2650.

## Requests

1. `scripts/callers.py` crashes with KeyError 'name' on call paths containing an `effect = {}` hook block (HOOKS entry
   `{'k':'effect'}` has no name); context() should use `p.get('name')`. I used a local copy with the fix.
2. Compiled line numbers drift in files where `extract.py` expands `inline_script` before parsing: e.g. shroud.11235 is reported at
   events/shroud_events.txt:22541 but is at line 18475 in the game file. Evidence in fragments should be re-based on the raw file
   (or the extractor should record pre-expansion offsets).
