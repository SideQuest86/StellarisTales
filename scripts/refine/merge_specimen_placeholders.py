"""Validate the specimen placeholder review (docs/refine/placeholders/out/specimens.json) and write the authoring
source content/museum/placeholders.json ({specimen: {placeholder key: {zh, en, note}}}), read by
scripts/extract-specimens.py. Prints rejected entries."""
import json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / 'scripts/refine'))
from merge_placeholders import check  # same validation as the story review

review = json.loads((ROOT / 'docs/refine/placeholders/out/specimens.json').read_text(encoding='utf-8'))
specimens = {s['key']: s for s in json.loads((ROOT / 'public/museum/specimens.json').read_text(encoding='utf-8'))['specimens']}
P = re.compile(r'\[([^\[\]]+)\]')
out, problems, issues = {}, [], []
for key, entry in sorted(review.items()):
    s = specimens.get(key)
    if not s:
        problems.append(f'unknown specimen {key}')
        continue
    used = {m for f in ('name', 'short', 'details') for lang in ('zh', 'en') for m in P.findall((s.get(f) or {}).get(lang) or '')}
    for pk, wording in (entry.get('placeholders') or {}).items():
        if pk not in used:
            problems.append(f'{key}: key {pk} not in its text')
            continue
        e = check(wording, problems, f'{key} {pk}')
        if e:
            out.setdefault(key, {})[pk] = e
    issues += [f'{key}: {i}' for i in entry.get('issues') or []]
(ROOT / 'content/museum').mkdir(parents=True, exist_ok=True)
(ROOT / 'content/museum/placeholders.json').write_text(json.dumps(out, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
print(f'specimens with wording: {len(out)}; problems: {len(problems)}; issues: {len(issues)}')
for p in problems:
    print(' -', p)
