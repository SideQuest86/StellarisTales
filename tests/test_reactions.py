import sys,unittest
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'scripts'))
from extract import parse
from reactions import expression,compatible

class ReactionTests(unittest.TestCase):
    def test_negation_of_or(self):
        states=expression(parse('NOR={is_materialist=yes is_spiritualist=yes}'))
        self.assertEqual(states,[{'ethic_materialist':False,'ethic_spiritualist':False}])
    def test_fanatic_implies_base_ethic(self):
        state=expression(parse('is_fanatic_materialist=yes'))[0]
        self.assertTrue(state['ethic_materialist'])
        self.assertFalse(compatible(state,{'ethic_spiritualist':True}))
    def test_distinct_population_scope(self):
        states=expression(parse('owner={is_xenophobe=yes any_owned_pop_group={is_xenophobe=no}}'))
        self.assertEqual(len(states),1)
    def test_explicitly_disabled_option(self):
        self.assertEqual(expression(parse('trigger={always=no}')),[])
