"""Draft a reader guide skeleton from a compiled V4 story: `python scripts/guide-skeleton.py <story-id> [--write]`.

The skeleton only restates compiled structure (sources, entry triggers, branch outline, weights, delays). It is NOT a
review: the reviewer must verify every statement against the game files, correct it, add the narrative summary and
record what was checked and what remains uncertain. --write refuses to overwrite an existing guide.
"""
import json, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def via_text(via, lang):
    if not via:
        return ''
    kind = via.get('kind', '')
    zh = {'entry': '入口', 'option': '选择', 'random': '随机结果', 'research': '研究完成', 'condition': '条件分支', 'delay': '延时',
          'project': '项目完成', 'stage': '阶段推进', 'sequence': '随后', 'bridge': '审阅连接', 'failure': '失败时'}
    en = {'entry': 'entry', 'option': 'choice', 'random': 'random outcome', 'research': 'research result', 'condition': 'conditional branch',
          'delay': 'later', 'project': 'project result', 'stage': 'next stage', 'sequence': 'then', 'bridge': 'reviewed link', 'failure': 'on failure'}
    parts = [(zh if lang == 'zh' else en).get(kind, kind)]
    if 'chance' in via:
        parts.append(f"{via['chance'] * 100:.0f}%" + ('*' if via.get('modified') else ''))
    for d in via.get('delay', []):
        parts.append('+' + '/'.join(f'{v}{k[0]}' for k, v in d.items()))
    if via.get('label'):
        parts.append(via['label'][lang])
    if via.get('triggers'):
        parts.append('; '.join(t[lang] for t in via['triggers']))
    return ' · '.join(parts)


def main():
    sid = sys.argv[1]
    data = json.loads((ROOT / 'public/stories' / f'{sid}.json').read_text(encoding='utf-8'))
    story = data['story']
    docs = {c['id']: c for c in data['chapters']}
    nodes = story['tree']['nodes']
    lines = [f"# {story['title']['zh']} / {story['title']['en']}", '',
             '> 草稿骨架（未审阅）：以下结构由编译结果生成，审阅者必须逐条对照游戏源文件核实、改写并补充。',
             '> Draft skeleton (unreviewed): generated from compiled structure; the reviewer must verify against game files.', '',
             f"- 分类 Category: {story['category']}", '- 来源 Sources: ' + ', '.join(sorted({f"{c['source']['file']}:{c['source']['line']}" for c in data['chapters']})), '',
             '## 结构 Structure', '']

    def walk(nid, depth):
        node = nodes[nid]
        doc = docs.get(node.get('doc'))
        if doc:
            mark = '↺ ' if 'ref' in node else ''
            lines.append(f"{'  ' * depth}- {mark}{doc['title']['zh'] or doc['id']} / {doc['title']['en']} — {via_text(node.get('via'), 'zh')} / {via_text(node.get('via'), 'en')}")
        if 'ref' in node:
            return
        for child in node.get('children', []):
            walk(child, depth + (1 if doc else 0))
    walk(story['tree']['root'], 0)
    lines += ['', '## 剧情概要 Summary', '', '（审阅者撰写 / reviewer writes）', '', '## 分支与结局 Branches and outcomes', '',
              '## 条件与文明差异 Conditions and variants', '', '## 审阅记录 Review notes', '',
              '- 已核对 Checked:', '- 不确定 Uncertain:', '- 覆盖范围 Coverage:', '']
    text = '\n'.join(lines)
    if '--write' in sys.argv:
        path = ROOT / 'public/summaries' / f'{sid}.md'
        if path.exists():
            raise SystemExit(f'guide already exists: {path}')
        path.write_text(text, encoding='utf-8')
        print('wrote', path)
    else:
        print(text)


main()
