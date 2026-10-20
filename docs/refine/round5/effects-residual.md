# Round 5: residual effects wording

Method: script over all 1,194 public/effects files, 85,418 non-gameText labels; patterns = quoted scope/random tokens, event_target, snake_case, @variables, FROM/ROOT/PREV, scaled hedges, zh/en number mismatch.

| Pattern | Before | After | Example (zh / en) |
|---|---|---|---|
| `Species becomes "last created species"` (scope token quoted as an object) | 66 | 0 | 物种变为刚创建的物种 / Species becomes the species just created |
| `same species as "prevprev"` (condition, 8 + 4 nested) | 12 | 0 | 与上两层对象同一物种 / is the same species as the scope two levels up |
| `Gains the "random common" trait` (zh dropped the name) | 5 | 0 | 获得一项随机特质 / Gains a random trait |
| `Adds the "random" deposit` (zh dropped it) | 3 | 0 | 新增一个随机资源点 / Adds a random deposit |
| `Spawns a new system ("random")` | 2 | 0 | 生成一个新星系 / Spawns a new system |
| `@variable`, FROM/ROOT/PREV words, quoted last_created_* in other places | 0 | 0 | none found |

Left alone, with reasons
- 206 snake_case + 15 `event_target:` hits: all inside shipped special-project names (`[solar_system.GetName]`, `[event_target:pirate_system.GetName]`); this is game text, kept as shipped.
- 2,048 "(depends on the save)" hedges: uniform already (Astral Threads 771, leader experience 470, situation progress 328, plus resource names). The save value is genuinely unknown, so no more specific wording exists.
- 191 digit mismatches: zh uses Chinese numerals for tier ranges (一至三级 vs tier 1-3); same meaning.

Code: scripts/effects.py (`token_phrase`, `zh_token`, `en_token`, used by `h_simple_obj`, `h_trait`, `h_add_deposit`, the `is_same_species` condition).
Checks: compile-effects OK; effects_coverage 0 unhandled / 0 raw key / 0 Latin zh; unittest 45 OK; node --test 103 pass. dist/effects synced.
