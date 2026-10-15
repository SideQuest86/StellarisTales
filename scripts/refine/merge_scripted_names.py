"""Validate the scripted-name review (docs/refine/placeholders/out/scripted.json) and write the authoring source
content/chronology/scripted-names.json ({scripted name: {key: {zh, en, note, omit?}}}), read by story_tree.py.
Icon slots (…GetIcon) show only a small picture in the game: they are always omitted, never worded."""
import json, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / 'scripts/refine'))
from merge_placeholders import check

review = json.loads((ROOT / 'docs/refine/placeholders/out/scripted.json').read_text(encoding='utf-8'))
names = json.loads((ROOT / 'public/stories/names.json').read_text(encoding='utf-8'))
out, problems = {}, []
for name, keys in sorted(review.items()):
    known = set((names.get(name) or {}).get('names') or {})
    for key, entry in sorted((keys or {}).items()):
        if key not in known:
            problems.append(f'{name}: key {key} not in its text')
            continue
        if key.split('|')[0].split('.')[-1] == 'GetIcon':
            out.setdefault(name, {})[key] = {'zh': '', 'en': '', 'omit': ['en', 'zh']}
            continue
        e = check(entry, problems, f'{name} {key}')
        if e:
            out.setdefault(name, {})[key] = e
(ROOT / 'content/chronology/scripted-names.json').write_text(json.dumps(out, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
print(f'scripted names: {len(out)}, entries: {sum(len(v) for v in out.values())}, problems: {len(problems)}')
for p in problems:
    print(' -', p)
