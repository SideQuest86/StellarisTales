"""Effects extractor tests on real game snippets and records (docs/EFFECTS.md).

Needs public/data/effects-data.json (python scripts/effects_data.py) and public/data/groups/*.json (scripts/extract.py).
"""
import json, sys, unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
from extract import parse  # noqa: E402
import effects as E  # noqa: E402
import origin_effects as O  # noqa: E402

DATA = ROOT / 'public/data/effects-data.json'
CTX = E.load_ctx() if DATA.exists() else None
_records = {}


def record(rid):
    if not _records:
        for f in sorted((ROOT / 'public/data/groups').glob('*.json')):
            for r in json.loads(f.read_text(encoding='utf-8')):
                _records[r['id']] = r
    return _records[rid]


def describe(script, scope='country'):
    nodes = parse(script)
    return E.describe_effects(nodes, script, CTX, scope)


@unittest.skipIf(CTX is None, 'run scripts/effects_data.py first')
class EffectTests(unittest.TestCase):
    # events/anomaly_events_1.txt:268 (anomaly.35): the reward is a multiple of the monthly income, not a timed modifier.
    def test_monthly_resource_mult_is_a_one_off_gain_scaled_by_income(self):
        out = describe('owner = { add_monthly_resource_mult = { resource = engineering_research value = @tier1researchreward min = @tier1researchmin max = @tier1researchmax } }')
        self.assertEqual(len(out), 1)
        e = out[0]
        self.assertEqual((e['kind'], e['resource'], e['monthlyMultiple'], e['min']), ('resource', 'engineering_research', 12.0, 250.0))
        self.assertIn('12x', e['label']['en'])
        self.assertIn('12', e['label']['zh'])
        self.assertNotIn('duration', e)

    # events/ambition_events.txt:1147 (ambition.245): timed modifier with the game's own stats.
    def test_timed_modifier_carries_duration_and_stats(self):
        out = describe('add_modifier = { modifier = paladin_super_shield days = 90 }')
        self.assertEqual(out[0]['kind'], 'modifier')
        self.assertEqual(out[0]['duration'], {'days': 90})
        stats = {s['stat']: s for s in out[0]['stats']}
        self.assertEqual(stats['ship_shield_mult']['unit'], 'percent')
        self.assertEqual(stats['ship_shield_mult']['value'], 1000.0)
        self.assertEqual(stats['ship_shield_regen_add_perc']['unit'], 'flat')
        self.assertTrue(out[0]['label']['zh'] and out[0]['label']['en'])

    def test_permanent_when_no_duration(self):
        out = describe('add_modifier = { modifier = paladin_super_shield }')
        self.assertEqual(out[0]['duration'], 'permanent')

    def test_random_list_shows_chance_from_base_weights(self):
        out = describe('random_list = { 33 = { owner = { add_resource = { minor_artifacts = 50 } } } 33 = { owner = { add_resource = { minor_artifacts = 150 } } } 33 = { owner = { add_resource = { minor_artifacts = 250 } } } }')
        self.assertEqual(out[0]['kind'], 'random_list')
        opts = out[0]['effects']
        self.assertEqual(len(opts), 3)
        self.assertAlmostEqual(opts[0]['chance']['percent'], 33.3, places=1)
        self.assertEqual(opts[1]['effects'][0]['value'], 150.0)
        self.assertEqual(opts[1]['effects'][0]['resource'], 'minor_artifacts')

    def test_modifier_in_weight_marks_adjusted(self):
        out = describe('random_list = { 10 = { modifier = { factor = 0 has_country_flag = x } add_resource = { energy = 5 } } 10 = { add_resource = { energy = 9 } } }')
        self.assertTrue(out[0]['effects'][0]['chance']['adjusted'])
        self.assertFalse(out[0]['effects'][1]['chance']['adjusted'])

    def test_if_else_keep_condition_labels(self):
        out = describe('if = { limit = { has_trait = trait_psionic } add_resource = { energy = 100 } } else = { add_resource = { energy = -100 } }')
        self.assertEqual([e['kind'] for e in out], ['if', 'else'])
        self.assertIn('Psionic', out[0]['when']['en'])
        self.assertTrue(out[0]['conditional'])
        self.assertEqual(out[1]['effects'][0]['value'], -100.0)

    def test_hidden_effect_is_kept_and_marked(self):
        out = describe('hidden_effect = { add_resource = { energy = 10 } }')
        self.assertTrue(out[0]['hidden'])

    def test_bookkeeping_is_skipped_and_counted(self):
        before = CTX.stats['skipped'].get('set_country_flag', 0)
        out = describe('set_country_flag = x save_event_target_as = y country_event = { id = a.1 days = 3 }')
        self.assertEqual(out, [])
        self.assertGreater(CTX.stats['skipped'].get('set_country_flag', 0), before)

    def test_unknown_key_falls_back_flagged_and_counted(self):
        out = describe('some_future_effect = { a = b }')
        self.assertTrue(out[0]['unhandled'])
        self.assertEqual(out[0]['kind'], 'unhandled')
        self.assertIn('some_future_effect', CTX.stats['unhandled'])

    def test_scope_target_is_recorded(self):
        out = describe('every_owned_planet = { limit = { is_capital = no } add_deposit = d_minerals_3 }', 'country')
        self.assertEqual(out[0]['kind'], 'if')
        self.assertIn('every', out[0]['effects'][0]['target']['en'])

    def test_scripted_effect_is_expanded_with_via(self):
        out = describe('add_tech_option_exclusive_effect = { TECH = tech_hydroponics }')
        flat_kinds = [e['kind'] for e in E.flat(out)]
        self.assertIn('tech_choice', flat_kinds)

    def test_event_record_choice_and_immediate(self):
        res = E.describe_record(record('anomaly.35'), CTX)
        self.assertIsNone(res['doc'])  # the only immediate is event chaining
        self.assertEqual(res['choices'][0][0]['monthlyMultiple'], 12.0)
        self.assertTrue(res['choices'][0][0]['source'].endswith('anomaly_events_1.txt:273'))

    def test_astral_event_after_block_if_else(self):
        res = E.describe_record(record('astral_rift.2970'), CTX)
        after = res['doc']['after']
        self.assertEqual([after[0]['kind'], after[1]['kind']], ['if', 'else'])
        self.assertEqual(after[0]['effects'][0]['kind'], 'modifier')
        self.assertTrue(after[0]['effects'][0]['stats'])

    def test_situation_sections_approaches_and_abort(self):
        res = E.describe_record(record('situations:situation_tainted_voidspawn'), CTX)
        ids = [s['id'] for s in res['doc']['sections']]
        self.assertIn('approach:approach_study_the_contaminant', ids)
        self.assertIn('on_abort', ids)
        study = next(s for s in res['doc']['sections'] if s['id'] == 'approach:approach_study_the_contaminant')
        res_entry = next(e for e in study['effects'] if e['kind'] == 'resource')
        self.assertEqual((res_entry['resource'], res_entry['value']), ('society_research', 15.0))

    def test_project_sections(self):
        res = E.describe_record(record('special_projects:INVESTIGATE_THE_DEAD_STATION_PROJECT'), CTX)
        self.assertIsNone(res['doc'])  # on_success only chains an event

    def test_site_created_modifier(self):
        res = E.describe_record(record('archaeological_site_types:site_the_library'), CTX)
        created = next(s for s in res['doc']['sections'] if s['id'] == 'on_create')
        self.assertIn('modifier', [e['kind'] for e in created['effects']])

    def test_budget_trim_says_what_was_left_out(self):
        many = [{'kind': 'resource', 'label': E.L('a', 'a')} for _ in range(70)]
        out = E.trim(many)
        self.assertEqual(len(out), 61)
        self.assertEqual(out[-1]['kind'], 'more')
        self.assertEqual(out[-1]['omitted'], 10)

    def test_origin_numbers_and_game_text(self):
        origins = json.loads((ROOT / 'public/data/origins.json').read_text(encoding='utf-8'))
        res = O.describe_origin(next(o for o in origins if o['id'] == 'origin_void_dwellers'), CTX)
        stats = {e['stat']: e for e in res['effects'] if e['kind'] == 'modifier'}
        self.assertEqual(stats['habitat_max_districts_add']['value'], 2.0)
        self.assertEqual(stats['megastructures_habitat_cost_mult']['value'], -25.0)
        self.assertTrue(res['bullets']['en'] and res['bullets']['zh'])
        self.assertEqual(res['phase'], 'start')

    def test_coverage_floor_over_every_record(self):
        total = unhandled = docs = 0
        ctx = E.load_ctx()
        for f in sorted((ROOT / 'public/data/groups').glob('*.json')):
            for r in json.loads(f.read_text(encoding='utf-8')):
                E.describe_record(r, ctx)
                docs += 1
        total = sum(sum(v.values()) for v in ctx.stats.values())
        unhandled = sum(ctx.stats['unhandled'].values())
        self.assertGreater(docs, 11000)
        self.assertLess(unhandled / total, 0.03)


if __name__ == '__main__':
    unittest.main()
