"""Print a compiled V4 story tree for review: `python scripts/print-tree.py <story-id | record-id> [--en] [--text]`.

Shows each node's doc, how it is reached (option / random chance / condition / delay / stage / bridge), exclusive
groups and ref (convergence) nodes. Developer tool; reads public/stories only.
"""
import json, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
args = [a for a in sys.argv[1:] if not a.startswith('--')]
lang = 'en' if '--en' in sys.argv else 'zh'
show_text = '--text' in sys.argv
index = json.loads((ROOT / 'public/stories/index.json').read_text(encoding='utf-8'))
records_path = ROOT / 'public/stories/records.json'
records = json.loads(records_path.read_text(encoding='utf-8')) if records_path.is_file() else index.get('recordToStory', {})
for key in args:
    sid = key if (ROOT / 'public/stories' / f'{key}.json').is_file() else records.get(key)
    if not sid:
        print('not found:', key)
        continue
    data = json.loads((ROOT / 'public/stories' / f'{sid}.json').read_text(encoding='utf-8'))
    story = data['story']
    docs = {c['id']: c for c in data['chapters']}
    print(f"=== {sid} [{story['category']}/{story['kind']}] {story['title'][lang]} — {story['chapters']} docs")
    nodes = story['tree']['nodes']

    def describe(via):
        if not via:
            return ''
        parts = [via.get('kind', '')]
        if 'option' in via:
            parts.append(f"opt[{via.get('optionIndex')}]={via['option']}")
        if 'chance' in via:
            parts.append(f"p={via['chance']:.2f}" + ('*' if via.get('modified') else ''))
        if 'group' in via:
            parts.append('grp=' + via['group'])
        if via.get('delay'):
            parts.append('delay=' + ','.join('/'.join(f'{k}{v}' for k, v in d.items()) for d in via['delay']))
        if via.get('when'):
            parts.append('when')
        if via.get('hooks'):
            parts.append('hooks=' + ','.join(via['hooks']))
        if via.get('triggers'):
            parts.append('trig=' + ';'.join(t[lang] for t in via['triggers']))
        if via.get('label'):
            parts.append('«' + via['label'][lang] + '»')
        if via.get('secondary'):
            parts.append('SECONDARY-ENTRY')
        return ' '.join(parts)

    def walk(nid, depth):
        node = nodes[nid]
        doc = docs.get(node.get('doc'))
        title = doc['title'][lang] if doc else '(story root)'
        prefix = '  ' * depth
        if 'ref' in node:
            print(f"{prefix}↺ {node['doc']} {title}  <{describe(node.get('via'))}>")
            return
        kind = doc['kind'] if doc else ''
        print(f"{prefix}• {node.get('doc') or ''} [{kind}] {title}  <{describe(node.get('via'))}>")
        if show_text and doc:
            for t in doc['texts'][:1]:
                print(prefix + '    ' + t[lang][:160].replace('\n', ' '))
            for c in doc['choices']:
                print(prefix + '    ◇ ' + c['label'][lang][:80].replace('\n', ' '))
        for child in node.get('children', []):
            walk(child, depth + 1)
    walk(story['tree']['root'], 0)
    external = sorted({(e['target'], e.get('story')) for c in data['chapters'] for e in c['next'] + [x for ch in c['choices'] for x in ch['next']] if e.get('story') != sid})
    if external:
        print('  external links:', ', '.join(f'{t}→{s}' for t, s in external[:30]))
