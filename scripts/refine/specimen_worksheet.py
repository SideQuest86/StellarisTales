"""Worksheet for the specimen placeholder review: every specimen whose name/description contains engine placeholders,
with its full bilingual description, source and acquisition summary. Writes docs/refine/placeholders/work/specimens.md.
Reviewed wording goes to content/museum/placeholders.json (read by scripts/extract-specimens.py)."""
import json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
P = re.compile(r'\[([^\[\]]+)\]')
data = json.loads((ROOT / 'public/museum/specimens.json').read_text(encoding='utf-8'))
lines = ['# Specimen placeholder worksheet', '']
n = 0
for s in data['specimens']:
    texts = {k: v for k, v in (('name', s.get('name')), ('details', s.get('details')), ('short', s.get('short'))) if v}
    keys = sorted({m for t in texts.values() for lang in ('zh', 'en') for m in P.findall(t.get(lang) or '')})
    if not keys:
        continue
    n += 1
    lines.append(f"## {s['key']} — {s['name'].get('zh', '')} / {s['name'].get('en', '')}")
    lines.append('- keys: ' + ', '.join(f'`{k}`' for k in keys))
    acq = s.get('acquisition') or []
    if acq:
        lines.append('- acquired via: ' + '; '.join((a.get('kind','') + ' ' + str(a.get('from',''))) for a in acq[:3]))
    for field, t in texts.items():
        for lang in ('zh', 'en'):
            if t.get(lang):
                lines.append(f'  - {field} {lang}: ' + re.sub(r'\s+', ' ', t[lang])[:700])
    lines.append('')
(ROOT / 'docs/refine/placeholders/work/specimens.md').write_text('\n'.join(lines), encoding='utf-8')
print('specimens with placeholders:', n)

