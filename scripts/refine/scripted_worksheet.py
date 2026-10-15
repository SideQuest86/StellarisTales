"""Worksheet for placeholders nested inside the game's scripted localisation (public/stories/names.json `names`):
every scripted name whose texts contain engine placeholders, with all its variant texts. Reviewed wording goes to
content/chronology/scripted-names.json ({scripted name: {key: {zh, en, note}}}), read by scripts/story_tree.py.
Writes docs/refine/placeholders/work/scripted.md."""
import json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
P = re.compile(r'\[([^\[\]]+)\]')
names = json.loads((ROOT / 'public/stories/names.json').read_text(encoding='utf-8'))
lines, n = ['# Scripted-name worksheet: placeholders inside the game\'s scripted text', ''], 0
for name, d in sorted(names.items()):
    nested = {k: v for k, v in (d.get('names') or {}).items() if not k.startswith("'") and not k.startswith('concept_')}
    if not nested:
        continue
    n += 1
    lines.append(f'## {name}')
    lines.append('- keys: ' + '; '.join(f"`{k}` (now {v['zh']} / {v['en']}{', generic' if v.get('default') else ''})" for k, v in nested.items()))
    texts = [v['text'] for v in d['variants']] + ([d['default']] if d.get('default') else [])
    for t in texts[:8]:
        for lang in ('zh', 'en'):
            s = re.sub(r'\s+', ' ', t.get(lang) or '')
            if P.search(s):
                lines.append(f'  - {lang}: {s[:400]}')
    lines.append('')
(ROOT / 'docs/refine/placeholders/work/scripted.md').write_text('\n'.join(lines), encoding='utf-8')
print('scripted names with nested placeholders:', n)
