"""Worksheets for the placeholder review (refinement 2026-10): for every story, each engine-filled placeholder key with
its current display wording and the complete sentences (zh + en) it appears in. Scripted-localisation keys (resolved
from the game's own text in the reader) are not listed. Writes docs/refine/placeholders/work/<group>.md and
groups.json (non-overlapping story ownership by category, split into chunks of at most CHUNK stories).

Usage: python scripts/refine/placeholder_worksheets.py [--chunk 60]"""
import argparse, collections, json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
P = re.compile(r'\[([^\[\]]+)\]')
OUT = ROOT / 'docs/refine/placeholders'


def sentences(text, key):
    """Complete sentences of `text` that contain [key] (split on CJK/Latin sentence ends and newlines)."""
    parts = re.split(r'(?<=[。！？!?])|(?<=\.)\s+|\n+', text)
    token = f'[{key}]'
    return [p.strip() for p in parts if token in p]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--chunk', type=int, default=60)
    ap.add_argument('--fallback-only', action='store_true',
                    help='only keys still on the generic fallback; writes work/fallback.md (no groups.json)')
    args = ap.parse_args()
    if args.fallback_only:
        return fallback_sheet()
    index = json.loads((ROOT / 'public/stories/index.json').read_text(encoding='utf-8'))['stories']
    scripted = set(json.loads((ROOT / 'public/stories/names.json').read_text(encoding='utf-8')))
    by_cat = collections.defaultdict(list)
    for s in index:
        by_cat[s['category']].append(s['id'])
    (OUT / 'work').mkdir(parents=True, exist_ok=True)
    groups, stats = [], collections.Counter()
    for cat in sorted(by_cat):
        items = []
        for sid in sorted(by_cat[cat]):
            d = json.loads((ROOT / 'public/stories' / f'{sid}.json').read_text(encoding='utf-8'))
            keys = collections.OrderedDict()
            for c in d['chapters']:
                for key, wording in (c.get('names') or {}).items():
                    tail = key.split('|')[0].split('.')[-1]
                    if tail in scripted or key.startswith("'") or key.startswith('concept_'):
                        continue
                    k = keys.setdefault(key, {'wording': wording, 'docs': [], 'zh': [], 'en': []})
                    k['docs'].append(c['id'])
                    strings = [c['title'], *c['texts'], *c.get('sections', [])]
                    for ch in c.get('choices', []):
                        strings += [ch['label'], *ch.get('responses', []), *ch.get('tooltips', [])]
                    per_doc = {'zh': 0, 'en': 0}
                    for s in strings:
                        for lang in ('zh', 'en'):
                            for sent in sentences(s.get(lang) or '', key):
                                seen = [x for _, x in k[lang]]
                                if sent[:300] not in seen and per_doc[lang] < 2 and len(k[lang]) < 6:
                                    k[lang].append((c['id'], sent[:300]))
                                    per_doc[lang] += 1
            stats['stories'] += 1
            if keys:
                stats['with_keys'] += 1
                stats['keys'] += len(keys)
                items.append((sid, d['story']['title'], keys))
            else:
                stats['no_keys'] += 1
        for n in range(0, max(len(items), 1), args.chunk):
            chunk = items[n:n + args.chunk]
            if not chunk:
                continue
            gid = f"{cat}-{n // args.chunk + 1}"
            lines = [f'# Placeholder worksheet {gid} ({len(chunk)} stories)', '']
            for sid, title, keys in chunk:
                lines.append(f"## {sid} — {title.get('zh', '')} / {title.get('en', '')}")
                for key, k in keys.items():
                    w = k['wording']
                    flag = ' (generic fallback)' if w.get('default') else ''
                    lines.append(f"- `{key}` → now: {w['zh']} / {w['en']}{flag} · docs: {', '.join(k['docs'][:6])}{' …' if len(k['docs']) > 6 else ''}")
                    for lang in ('zh', 'en'):
                        for doc, sent in k[lang]:
                            lines.append(f'  - {lang} [{doc}]: {sent}')
                lines.append('')
            (OUT / 'work' / f'{gid}.md').write_text('\n'.join(lines), encoding='utf-8')
            groups.append({'id': gid, 'category': cat, 'stories': [sid for sid, _, _ in chunk],
                           'keys': sum(len(k) for _, _, k in chunk)})
    (OUT / 'groups.json').write_text(json.dumps({'groups': groups, 'stats': stats}, ensure_ascii=False, indent=1),
                                     encoding='utf-8')
    print(dict(stats), 'groups:', len(groups))


def fallback_sheet():
    index = json.loads((ROOT / 'public/stories/index.json').read_text(encoding='utf-8'))['stories']
    scripted = set(json.loads((ROOT / 'public/stories/names.json').read_text(encoding='utf-8')))
    lines, n = ['# Fallback worksheet: placeholders still on the generic phrase ("this name")', ''], 0
    for s in index:
        d = json.loads((ROOT / 'public/stories' / f"{s['id']}.json").read_text(encoding='utf-8'))
        block = []
        for c in d['chapters']:
            strings = [c['title'], *c['texts'], *c.get('sections', [])]
            for ch in c.get('choices', []):
                strings += [ch['label'], *ch.get('responses', []), *ch.get('tooltips', [])]
            for key, w in (c.get('names') or {}).items():
                if not w.get('default') or key.split('|')[0].split('.')[-1] in scripted:
                    continue
                n += 1
                block.append(f"- doc `{c['id']}` key `{key}`")
                for lang in ('zh', 'en'):
                    for sent in [x for st in strings for x in sentences(st.get(lang) or '', key)][:2]:
                        block.append(f'  - {lang}: {sent[:300]}')
        if block:
            lines += [f"## {s['id']} — {d['story']['title'].get('en', '')}"] + block + ['']
    (OUT / 'work' / 'fallback.md').write_text('\n'.join(lines), encoding='utf-8')
    print('fallback keys:', n)


if __name__ == '__main__':
    main()
