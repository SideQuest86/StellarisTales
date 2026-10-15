# Gameplay effects (what choices and stages DO)

Optional, collapsed-by-default panel under a document or a choice that lists the gameplay consequences read from the
game's own scripts, in both languages. Nothing is simulated and nothing is invented.

## Pipeline

```
python scripts/effects_data.py      # game install -> public/data/effects-data.json (build input, ~9 MB, not loaded by the site)
python scripts/effects_coverage.py --write   # all records -> coverage numbers refreshed below
python -m unittest tests/test_effects.py     # real snippets + real records
node --test tests/effects-panel.test.mjs     # renderer (fixture: tests/fixtures/effects-samples.json)
```

`effects-data.json` holds only what the extractor needs: original localisation (zh/en) of every key the narrative
scripts, reachable scripted effects and modifiers mention (`mod_<stat>` variants included), scripted variables
(`@x`), script values referenced as `value:x`, the scripted effects reachable from the narrative scripts, static
modifier definitions (`common/static_modifiers`), opinion modifiers and origin definitions. Story texts are excluded.

## Model (`scripts/effects.py`)

`describe_effects(nodes, text, ctx, scope)` returns a list of entries; `describe_record(record, ctx)` applies it to a
record of `public/data/groups/*.json`:

| Part | Result |
| --- | --- |
| event | `doc.immediate`, `doc.after`, one list per option in `choices[i]` (same index as `record.options`) |
| anomaly / site / rift / project / situation | `doc.sections[]` = `{id, label{zh,en}, effects}` for `on_spawn`, `on_success`, `on_fail`, `on_start`, `on_cancel`, `on_abort`, `on_progress_*`, `on_monthly`, `on_roll_failed`, `on_visible`, `on_create`, situation approaches (`approach:<key>`, incl. `on_select`, resource output and modifier stats while active) and stage effects |
| origin (`scripts/origin_effects.py`) | `{id, bullets{zh,en:[{text,level}]}, variants[], effects[], phase:'start'}` |

Entry fields: `kind`, `label{zh,en}`, `value`/`unit` (`flat`, `percent`, `monthly-income-multiple`) or `range` or `scaled`
(depends on the save: shown as "scaled by the game"), `target{zh,en}` (not "our empire"), `duration`
(`'permanent'` or `{days|months|years}`), `when` + `conditional` (if/else/random), `chance` (`percent`, `weight`,
`of`, `adjusted`), `hidden` (inside `hidden_effect`), `via` (scripted effect it came from), `source` (`file:line`),
`effects` (children), `stats` (a modifier's own stats from `common/static_modifiers`), `note` (the modifier's game
tooltip), `unhandled` (no handler; counted, not shown).

Decisions that matter:

* `add_monthly_resource_mult = { resource value min max }` is a **one-off gain of `value` x the monthly income**,
  clamped to min..max (the game's tooltip is "<Resource> Gained: N"), not a timed income modifier.
* `random_list` weights are shown as "about N% (base weight w of total)"; options carrying a `modifier` block are
  flagged `adjusted` (the real chance depends on conditions). Lists whose options only chain events or set flags are
  dropped.
* `if/else_if/else` keep their condition label (`when`); `hidden_effect` content is kept and marked `hidden`.
* Scope changes (`owner`, `from`, `every_owned_planet` ...) become a `target` label. `limit` in an iterator becomes a
  filter group.
* Scripted effects (`common/scripted_effects`) are expanded with their `$PARAM$` arguments to depth 4; the wrapper is
  shown only when the game has a name for it, otherwise its children appear with `via`.
  `add_tech_option_exclusive_effect` chains become one `tech_choice` ("the first of these you do not know yet").
* Skipped as bookkeeping (counted as `skipped`): flags, `save_event_target_as`, event chaining, variables, UI/AI/
  sound/fleet-order plumbing, `custom_tooltip_with_params` templates, `inline_script` references.
* `custom_tooltip` / `tooltip` text is the game's own sentence for the effect and is shown as `tooltip`
  (original wording; engine placeholders such as `[Owner.GetName]` stay in the data for the app's display-time
  substitution).
* Each list is trimmed to 60 itemised leaves with an explicit `more` entry saying how many were left out
  (archaeology failure pools are the only place this matters).
* Modifier stats: a stat ending in `_mult` / `_percent` is shown as a percentage; the game decides this per stat in
  engine code we cannot read, so other stats are shown as plain numbers.

## Unresolved / limits

* Static reading: no empire, species, difficulty or save is known. Values behind `value:` script values with
  formulas (not a plain number) and `@[..]` expressions that use non-static terms are marked `scaled`.
* `inline_script` templates (game-start initialisers) are not expanded; origins show the game's own effect text plus the
  numbers the origin script declares. `origin_endbringers` and `origin_doomsday` have no description key and no effect block in
  their civic script: the game applies them from a hidden start-of-game event (`events/game_start.txt:320` -> `origin.60`,
  `events/game_start.txt:447` -> `shroud.8000`), whose `immediate` effects `scripts/origin_effects.py` `START_EVENTS` shows as the
  origin's starting effects, together with the game's `negative_description` bullets (`negativeBullets`, shown as "Drawbacks").
  All 58 origin stories have an `origin` entry in `public/effects/<id>.json`; their `origin-intro:*` pseudo-documents have no
  game record (class (c) below).
* Event inheritance (`base =`): inherited options have no per-line source and the base event's `immediate` is not merged.
* Every effect key in the catalogue is now either handled, skipped as bookkeeping or classified (table below); an unknown key in a
  future game version still appears as `unhandled` and is counted (`test_no_unhandled_keys_over_every_record` fails first).
* Second-pass handlers live in `scripts/effects_more.py` (`MORE`: label templates with `{o}` object / `{n}` number, optional `[...]`
  segments; `BOOL`; `SCOPES` for scope keys such as `galactic_emperor = { ... }`, `capital_star`, `prevprev`). Labels for keys whose
  parameters are objects/ids the game does not name (war, fleet, target) are deliberately generic ("Joins a war"): the panel never
  guesses who or what.
* Condition labels use the game's names where the key has localisation; otherwise the humanised key (`can research
  technology = tech eco simulation`), never a made-up sentence.

## Label language (zh must be Chinese, en natural)

* Conditions on internal state (script variables, flags, saved event targets, first-contact / situation internals, arithmetic, counters)
  are not shown as keys: `satisfies an earlier story condition` (zh 满足此前剧情设定的条件时 / en "if an earlier story condition
  holds"); stage scores read "depending on progress" (按调查进度); any other unexplained condition reads "if a specific condition
  holds" (满足特定条件时). The exact condition is kept in the label's `detail` list (internal, never rendered).
* Meaningful conditions and scopes without game localisation come from `scripts/effects_gloss.py` (`BOOL_COND`, `NOUNS`, `WORDS`,
  `TIME_COND`); the game's localisation is always tried first. A key nobody translated degrades to a generic noun, and an object the
  game gives no name is left out of its sentence (`scrub`), never printed as an English id in Chinese.
* Engine links inside the game's own sentences (`building:building_x`, `trait:...`) are replaced by the object's name in the same
  language (`resolve_links`, like the `[Root.GetName]` placeholders); `scripts/effects_data.py` keeps the names those links point to.
* Check: `label_language_report()` in `scripts/effects_coverage.py` counts Latin words in Chinese labels (excluded: `[...]` and `$...$`
  placeholders, the game's own proper names inside 「」, all-caps designations, `2k`-style counts, FTL / AI / DNA / L-Gate / roman
  numerals) and raw script keys in English labels; `test_chinese_labels_have_no_latin_words_and_english_no_raw_keys` asserts 0.
  Before this pass: 146,811 zh labels with 85,038 Latin-word occurrences; after: 0 / 0.

## Spot checks of second-pass handlers (output vs game source)

| Handler | Game source | Output (en / zh) |
| --- | --- | --- |
| `start_terraform_process` | `events/biogenesis_origin_events.txt:1690` `capital_scope = { start_terraform_process = pc_hive }` | Starts terraforming to "Hive World" / 开始改造星球：「蜂巢星球」 (target: the capital planet) |
| `add_tradition` | `events/biogenesis_events.txt:480` `add_tradition = tr_purity_adopt` | Gains a tradition "Purity Traditions" / 获得传统「纯净传统」 |
| `multiply_crisis_strength` | `common/scripted_effects/00_scripted_effects.txt:1501` `= 2` | Crisis strength is multiplied by 2 / 天灾强度乘以 2 |
| `add_intel_report` | `events/machine_age_situation_events_1.txt:4970` `{ category = military level = 2 days = 720 who = root }` | Gains an intel report (level 2) / 获得一份情报报告（等级 2） |
| `add_starbase_component` | `STARBASE_AURA_ZRONI_STORM` | The starbase gains a component "Zroni Storm Caster: Polarization Module" / 星港获得组件「泽珞风暴投射器：极化模块」 |

## Coverage (generated)

<!-- coverage:start -->
Generated by `scripts/effects_coverage.py` (11703 documents, 7252 with effects, 54799 effect entries; effect-key uses 133901: handled 93467, skipped bookkeeping 40434, unhandled 0 = 0.0%; template placeholders 11).

Unhandled keys: none



Classified as bookkeeping / technical (not itemised in the panel; `scripts/effects_more.py` `CLASSIFIED`):

| Category | Meaning |
| --- | --- |
| AI hint | AI preference or evaluation hint; it steers computer-controlled empires, nothing the player reads as an outcome |
| UI / refresh | interface refresh, validation or recalculation pass; it re-derives state that is already shown |
| cosmetic | portrait, flag, title, animation or visual state; no gameplay effect |
| tutorial / debug | tutorial, telemetry or debug plumbing |
| script variable | arithmetic on script variables or reading a setting into one; no player-visible outcome by itself |
| state plumbing | internal timers, locks, cooldowns or bookkeeping that supports other effects |
| parameter / template | a parameter or template placeholder inside another effect, not an effect of its own |

| Effect key | Uses | Category |
| --- | ---: | --- |
| `clear_ai_armor_ratio` | 1 | AI hint |
| `clear_ai_platform_armor_ratio` | 1 | AI hint |
| `clear_ai_platform_shields_ratio` | 1 | AI hint |
| `clear_ai_platform_weapon_preference` | 1 | AI hint |
| `clear_ai_shields_ratio` | 1 | AI hint |
| `clear_ai_starbase_armor_ratio` | 1 | AI hint |
| `clear_ai_starbase_shields_ratio` | 1 | AI hint |
| `clear_ai_starbase_weapon_preference` | 2 | AI hint |
| `clear_ai_weapon_preference` | 1 | AI hint |
| `clear_orders` | 11 | AI hint |
| `roll_ai_preferred_patron` | 1 | AI hint |
| `run_ai_strategic_war_data` | 1 | AI hint |
| `run_in_ai_mode` | 9 | AI hint |
| `set_ai_armor_ratio` | 3 | AI hint |
| `set_ai_platform_armor_ratio` | 3 | AI hint |
| `set_ai_platform_shields_ratio` | 3 | AI hint |
| `set_ai_platform_weapon_preference` | 4 | AI hint |
| `set_ai_preferred_patron` | 1 | AI hint |
| `set_ai_shields_ratio` | 3 | AI hint |
| `set_ai_starbase_armor_ratio` | 6 | AI hint |
| `set_ai_starbase_shields_ratio` | 6 | AI hint |
| `set_ai_starbase_weapon_preference` | 5 | AI hint |
| `set_ai_weapon_preference` | 4 | AI hint |
| `date_distortion` | 2 | cosmetic |
| `lock_animation_state` | 2 | cosmetic |
| `randomize_flag_symbol` | 11 | cosmetic |
| `set_advisor_active` | 6 | cosmetic |
| `set_animation_state` | 1 | cosmetic |
| `set_confused` | 1 | cosmetic |
| `set_female_ruler_title` | 1 | cosmetic |
| `set_gender` | 1 | cosmetic |
| `set_male_ruler_title` | 1 | cosmetic |
| `set_ring` | 2 | cosmetic |
| `set_ruler_title_female` | 4 | cosmetic |
| `set_ruler_title_male` | 4 | cosmetic |
| `set_ship_design` | 2 | cosmetic |
| `create_smaller_size_creature_in_fleet` | 1 | parameter / template |
| `effect_on_blob` | 5 | parameter / template |
| `inverse` | 9 | parameter / template |
| `change_colony_foundation_date` | 4 | state plumbing |
| `fill_astral_rift_event_pool` | 1 | state plumbing |
| `freeze_leader_age` | 3 | state plumbing |
| `link_to` | 1 | state plumbing |
| `renew_bypass_lock` | 1 | state plumbing |
| `reset_policy_cooldowns` | 1 | state plumbing |
| `reset_years_of_peace` | 1 | state plumbing |
| `set_auto_upgrade_components` | 1 | state plumbing |
| `set_built_species` | 2 | state plumbing |
| `set_cooldown` | 5 | state plumbing |
| `set_custom_capital_location` | 5 | state plumbing |
| `set_government_cooldown` | 9 | state plumbing |
| `set_mia_return_delay` | 7 | state plumbing |
| `set_player` | 4 | state plumbing |
| `set_system_locked` | 3 | state plumbing |
| `set_years_served` | 1 | state plumbing |
| `start_astral_action_cooldown` | 1 | state plumbing |
| `endgame_telemetry` | 4 | tutorial / debug |
| `set_tutorial_level` | 6 | tutorial / debug |
| `win` | 7 | tutorial / debug |
| `check_planet_employment` | 9 | UI / refresh |
| `force_faction_evaluation` | 5 | UI / refresh |
| `force_show_diplomacy` | 1 | UI / refresh |
| `hide_option_if_not_allowed` | 4 | UI / refresh |
| `owned_planet_list_tooltip` | 6 | UI / refresh |
| `refresh_accords` | 2 | UI / refresh |
| `refresh_leader_pool` | 6 | UI / refresh |
| `refresh_portraits` | 10 | UI / refresh |
| `refresh_psionic_aura_type` | 10 | UI / refresh |
| `refresh_species_rights` | 2 | UI / refresh |
| `remove_auto_move_target` | 7 | UI / refresh |
| `restore_country_backup_data` | 2 | UI / refresh |
| `room_name_override` | 4 | UI / refresh |
| `set_country_code_flags` | 3 | UI / refresh |
| `set_fleet_formation` | 2 | UI / refresh |
| `set_fleet_settings` | 5 | UI / refresh |
| `set_halted` | 9 | UI / refresh |
| `store_country_backup_data` | 4 | UI / refresh |
| `validate_and_repair_planet_buildings_and_districts` | 2 | UI / refresh |
| `validate_planet_buildings_and_districts` | 8 | UI / refresh |
| `add_variable` | 2 | script variable |
| `ceiling_variable` | 6 | script variable |
| `export_resource_maximum_to_variable` | 1 | script variable |
| `get_galaxy_setup_value` | 4 | script variable |
| `round_variable_to_closest` | 6 | script variable |

Template placeholders (inline-script parameters such as `$POP_GROUP$`, not effects): `$pop_group$` (11).

Story documents without an effects entry (2704 distinct, from `public/effects/coverage.json`):

| Class | Documents |
| --- | ---: |
| (a) the script has no effect nodes at all | 939 |
| (a) only event chaining / messages (the story map shows them) | 1029 |
| (b) only bookkeeping (flags, variables, UI, AI hints ...) | 678 |
| (c) no game record (origin-intro pseudo-documents; their content is the story's `origin` entry) | 58 |
| (d) other (listed below) | 0 |

(d) individually:

* none


Label language check (`label_language_report`, over `public/effects/*.json`): Chinese labels with Latin words 0 (0 words; placeholders in `[...]` / `$...$` and FTL, AI, DNA, L-Gate, roman numerals excluded); English labels with raw script keys 0 (0 occurrences).

Most frequent handled / skipped keys:

| Effect key | Uses | Status |
| --- | ---: | --- |
| `if` | 8965 | handled |
| `scripted_effect` | 8203 | handled |
| `hidden_effect` | 6707 | handled |
| `country_event` | 6070 | skipped |
| `scope:owner` | 5895 | handled |
| `set_country_flag` | 5428 | skipped |
| `custom_tooltip` | 4532 | handled |
| `save_event_target_as` | 3967 | skipped |
| `scope:random_*` | 3909 | handled |
| `scope:event_target` | 3745 | handled |
| `add_modifier` | 3009 | handled |
| `scope:from` | 2668 | handled |
| `scope:every_*` | 2586 | handled |
| `add_monthly_resource_mult` | 2565 | handled |
| `remove_country_flag` | 2396 | skipped |
| `else` | 2358 | handled |
| `else_if` | 2104 | handled |
| `add_resource` | 2083 | handled |
| `add_deposit` | 1867 | handled |
| `random_list` | 1540 | handled |
| `while` | 1513 | handled |
| `set_site_progress_locked` | 1336 | skipped |
| `remove_modifier` | 1256 | handled |
| `create_ship` | 1241 | handled |
| `add_building` | 1188 | handled |
| `carrier_event` | 921 | skipped |
| `scope:capital_scope` | 905 | handled |
| `change_variable` | 900 | skipped |
| `set_owner` | 896 | handled |
| `scope:solar_system` | 849 | handled |
| `set_timed_country_flag` | 796 | skipped |
| `set_variable` | 777 | skipped |
| `add_trait` | 768 | handled |
| `enable_special_project` | 706 | handled |
| `scope:fromfrom` | 705 | handled |
| `scope:root` | 687 | handled |
| `set_situation_flag` | 634 | skipped |
| `set_location` | 624 | skipped |
| `ship_event` | 597 | skipped |
| `create_fleet` | 587 | handled |
<!-- coverage:end -->
