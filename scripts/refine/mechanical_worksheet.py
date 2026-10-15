"""Worksheet of reviewed placeholder wording that is still mechanical or wrong ("未命名/unnamed", "某个/some",
"这一数值/this value", "这个名字/this name" …), with the sentences each key appears in. Output of the follow-up review:
docs/refine/placeholders/out/mechanical.json ({story: {doc: {key: {zh, en, note}}}}), merged as per-document wording
by merge_placeholders.py. Writes docs/refine/placeholders/work/mechanical.md."""
import json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / 'scripts/refine'))
from placeholder_worksheets import sentences

BAD = {'zh': re.compile(r'这个名字|未命名|某个|这一数值|此值|该值'),
       'en': re.compile(r'\b(this name|unnamed|this value|some|such|the amount)\b', re.I)}
lines, n = ['# Mechanical wording worksheet', ''], 0
for f in sorted((ROOT / 'content/stories').glob('*.json')):
    frag = json.loads(f.read_text(encoding='utf-8-sig'))
    sid = frag.get('id', f.stem)
    pairs = [(None, k, v) for k, v in frag.get('placeholders', {}).items()]
    pairs += [(doc, k, v) for doc, m in frag.get('placeholderDocs', {}).items() for k, v in m.items()]
    bad = [(doc, k, v) for doc, k, v in pairs if BAD['zh'].search(v.get('zh', '')) or BAD['en'].search(v.get('en', ''))]
    if not bad:
        continue
    story = json.loads((ROOT / 'public/stories' / f'{sid}.json').read_text(encoding='utf-8'))
    lines.append(f'## {sid}')
    for doc, key, v in bad:
        for c in story['chapters']:
            if doc and c['id'] != doc or key not in (c.get('names') or {}):
                continue
            strings = [c['title'], *c['texts'], *c.get('sections', [])]
            for ch in c.get('choices', []):
                strings += [ch['label'], *ch.get('responses', []), *ch.get('tooltips', [])]
            sents = {lang: [x for s in strings for x in sentences(s.get(lang) or '', key)][:2] for lang in ('zh', 'en')}
            if not (sents['zh'] or sents['en']):
                continue
            n += 1
            lines.append(f"- doc `{c['id']}` key `{key}` (now {v['zh']} / {v['en']})")
            for lang in ('zh', 'en'):
                lines += [f'  - {lang}: {s[:300]}' for s in sents[lang]]
    lines.append('')
(ROOT / 'docs/refine/placeholders/work/mechanical.md').write_text('\n'.join(lines), encoding='utf-8')
print('entries (per doc):', n)
