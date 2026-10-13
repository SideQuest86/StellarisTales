import sys, unittest
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'scripts'))
from extract import parse, first, vals, raw, links

class ParserTests(unittest.TestCase):
    def test_repeated_options_and_comments(self):
        text='country_event={id=a.1 desc="brace } # text" # comment\n option={name=x} option={name=y}}'
        nodes=parse(text); v=nodes[0]['v']
        self.assertEqual(first(v,'id'),'a.1')
        self.assertEqual(first(v,'desc'),'brace } # text')
        self.assertEqual(len(vals(v,'option')),2)
        self.assertEqual(raw(nodes[0],text),text)
    def test_comparisons_and_case(self):
        nodes=parse('KEY = project trigger={count>=2 exists ?= yes}')
        self.assertEqual(first(nodes,'key'),'project')
        self.assertEqual(first(nodes,'trigger')[0]['op'],'>=')
    def test_reject_truncated_block(self):
        with self.assertRaises(ValueError):parse('event={id=a.1')
    def test_uppercase_condition_keeps_project_gated(self):
        for spelling in ('if', 'IF', 'If'):
            text=f'{spelling}={{limit={{has_country_flag=ready}} enable_special_project={{name=PROJECT}}}} country_event={{id=direct.1}}'
            edges=links(parse(text),text)
            self.assertEqual(edges[0]['target'],'special_projects:PROJECT')
            self.assertIn('has_country_flag=ready',edges[0]['condition'])
            self.assertEqual(edges[1]['condition'],'')

if __name__=='__main__':unittest.main()
