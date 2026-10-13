import sys,unittest
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'scripts'))
from graph_layout import graph_positions
class GraphLayoutTests(unittest.TestCase):
 def test_merge_is_after_both_predecessors(self):
  edges=[{'from':a,'to':b} for a,b in [('a','b'),('a','c'),('c','d'),('b','e'),('d','e')]]
  p=graph_positions(['a','b','c','d','e'],edges,'a')
  self.assertGreater(p['e']['step'],p['d']['step'])
  self.assertGreater(p['e']['step'],p['b']['step'])
 def test_repeatable_dialogue_cycle_is_not_a_false_sequence(self):
  edges=[{'from':a,'to':b} for a,b in [('a','b'),('b','c'),('c','b'),('c','d')]]
  p=graph_positions(['a','b','c','d'],edges,'a')
  self.assertEqual(p['b']['step'],p['c']['step'])
  self.assertNotEqual(p['b']['lane'],p['c']['lane'])
  self.assertGreater(p['d']['step'],p['c']['step'])
if __name__=='__main__':unittest.main()
