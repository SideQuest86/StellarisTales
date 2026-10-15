"""Residual worksheet after the second review: every story that still has exceptions (out/rendered2-*.json), with
its exceptions and its current rendered sentences and keys (copied from docs/refine/placeholders/rendered/*.md, which
must be regenerated first with scripts/refine/render-sentences.mjs). Writes docs/refine/placeholders/work/residual.md."""
import json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'docs/refine/placeholders'
exceptions = {}
for f in sorted((OUT / 'out').glob('rendered2-*.json')):
    for sid, r in json.loads(f.read_text(encoding='utf-8')).items():
        if (r or {}).get('exceptions'):
            exceptions[sid] = r['exceptions']
blocks = {}
for f in sorted((OUT / 'rendered').glob('*.md')):
    text = f.read_text(encoding='utf-8')
    for part in re.split(r'\n(?=## )', text):
        m = re.match(r'## (\S+)\n', part)
        if m:
            blocks[m.group(1)] = part
lines = ['# Residual worksheet: stories that still have exceptions', '']
for sid, exc in sorted(exceptions.items()):
    lines.append(f'## {sid}')
    lines += [f'- exception: {e}' for e in exc]
    body = blocks.get(sid, '')
    lines += [l for l in body.splitlines()[1:] if l.strip() and not l.startswith('- earlier exception')]
    lines.append('')
(OUT / 'work' / 'residual.md').write_text('\n'.join(lines), encoding='utf-8')
print('stories with exceptions:', len(exceptions), 'exceptions:', sum(len(v) for v in exceptions.values()))
