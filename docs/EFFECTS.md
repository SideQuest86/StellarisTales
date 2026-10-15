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
  numbers the origin script declares. `origin_endbringers` and `origin_doomsday` have no description key.
* Event inheritance (`base =`): inherited options have no per-line source and the base event's `immediate` is not merged.
* Unlisted effect keys (see table) appear as `unhandled`; the panel mentions how many were not itemised.
* Condition labels use the game's names where the key has localisation; otherwise the humanised key (`can research
  technology = tech eco simulation`), never a made-up sentence.

## Coverage (generated)

<!-- coverage:start -->
Generated by `scripts/effects_coverage.py` (11703 documents, 7297 with effects, 55104 effect entries; effect-key uses 133647: handled 92439, skipped bookkeeping 40046, unhandled 1162 = 0.9%).

Top unhandled keys:

| Effect key | Uses | Status |
| --- | ---: | --- |
| `add_intel_report` | 23 | unhandled |
| `add_favors` | 23 | unhandled |
| `add_static_war_exhaustion` | 14 | unhandled |
| `return_leader_from_exile` | 11 | unhandled |
| `randomize_flag_symbol` | 11 | unhandled |
| `multiply_crisis_strength` | 11 | unhandled |
| `leave_alliance` | 11 | unhandled |
| `clear_orders` | 11 | unhandled |
| `add_starbase_component` | 11 | unhandled |
| `$pop_group$` | 11 | unhandled |
| `spawn_astral_rift` | 10 | unhandled |
| `set_truce` | 10 | unhandled |
| `set_federation_leader` | 10 | unhandled |
| `repair_percentage` | 10 | unhandled |
| `refresh_psionic_aura_type` | 10 | unhandled |
| `refresh_portraits` | 10 | unhandled |
| `no_scope` | 10 | unhandled |
| `modify_army` | 10 | unhandled |
| `link_wormholes` | 10 | unhandled |
| `join_war` | 10 | unhandled |
| `end_fleet_contract` | 10 | unhandled |
| `create_fleet_from_naval_cap` | 10 | unhandled |
| `add_tradition` | 10 | unhandled |
| `unlock_council_slots` | 9 | unhandled |
| `set_starbase_building` | 9 | unhandled |
| `set_halted` | 9 | unhandled |
| `set_government_cooldown` | 9 | unhandled |
| `set_faction_properties` | 9 | unhandled |
| `set_cloaking_active` | 9 | unhandled |
| `run_in_ai_mode` | 9 | unhandled |
| `remove_war_participant` | 9 | unhandled |
| `remove_from_galactic_community` | 9 | unhandled |
| `remove_all_armies` | 9 | unhandled |
| `inverse` | 9 | unhandled |
| `give_fleet` | 9 | unhandled |
| `create_random_fleet` | 9 | unhandled |
| `create_colony` | 9 | unhandled |
| `complete_special_project` | 9 | unhandled |
| `check_planet_employment` | 9 | unhandled |
| `add_to_galactic_community` | 9 | unhandled |
| `validate_planet_buildings_and_districts` | 8 | unhandled |
| `transfer_pop_amount` | 8 | unhandled |
| `revert_accords` | 8 | unhandled |
| `reroll_planet_modifiers` | 8 | unhandled |
| `repair_amount` | 8 | unhandled |
| `remove_district` | 8 | unhandled |
| `remove_all_districts` | 8 | unhandled |
| `pass_resolution_no_cooldown` | 8 | unhandled |
| `create_cosmic_storm` | 8 | unhandled |
| `clear_relations` | 8 | unhandled |
| `add_skill` | 8 | unhandled |
| `add_imperial_authority` | 8 | unhandled |
| `win` | 7 | unhandled |
| `spawn_psionic_aura` | 7 | unhandled |
| `set_mia_return_delay` | 7 | unhandled |
| `set_council_agenda` | 7 | unhandled |
| `set_closed_borders` | 7 | unhandled |
| `remove_auto_move_target` | 7 | unhandled |
| `remove_all_negative_traits` | 7 | unhandled |
| `enable_galactic_market` | 7 | unhandled |

Most frequent handled / skipped keys:

| Effect key | Uses | Status |
| --- | ---: | --- |
| `if` | 8958 | handled |
| `scripted_effect` | 8201 | handled |
| `hidden_effect` | 6707 | handled |
| `country_event` | 6067 | skipped |
| `scope:owner` | 5894 | handled |
| `set_country_flag` | 5421 | skipped |
| `custom_tooltip` | 4532 | handled |
| `save_event_target_as` | 3949 | skipped |
| `scope:random_*` | 3903 | handled |
| `scope:event_target` | 3737 | handled |
| `add_modifier` | 3003 | handled |
| `scope:from` | 2668 | handled |
| `scope:every_*` | 2584 | handled |
| `add_monthly_resource_mult` | 2565 | handled |
| `remove_country_flag` | 2396 | skipped |
| `else` | 2357 | handled |
| `else_if` | 2102 | handled |
| `add_resource` | 2083 | handled |
| `add_deposit` | 1865 | handled |
| `random_list` | 1540 | handled |
| `while` | 1507 | handled |
| `set_site_progress_locked` | 1336 | skipped |
| `remove_modifier` | 1255 | handled |
| `create_ship` | 1237 | handled |
| `add_building` | 1188 | handled |
| `carrier_event` | 921 | skipped |
| `scope:capital_scope` | 905 | handled |
| `change_variable` | 900 | skipped |
| `set_owner` | 892 | handled |
| `scope:solar_system` | 847 | handled |
| `set_timed_country_flag` | 795 | skipped |
| `add_trait` | 768 | handled |
| `set_variable` | 767 | skipped |
| `scope:fromfrom` | 705 | handled |
| `enable_special_project` | 705 | handled |
| `scope:root` | 686 | handled |
| `set_situation_flag` | 634 | skipped |
| `set_location` | 621 | skipped |
| `ship_event` | 597 | skipped |
| `create_fleet` | 584 | handled |
<!-- coverage:end -->
