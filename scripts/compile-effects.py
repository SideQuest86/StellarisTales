"""Gameplay effects per story, for the reader's optional effects panel (lazy: one file per story).

Input: the compiled stories (public/stories/<id>.json — which documents a story reads), the extracted records
(public/data/groups/*.json), origins (public/data/origins.json) and the build input public/data/effects-data.json
(`python scripts/effects_data.py`, needs the game installation). Output: public/effects/<storyId>.json
{"docs": {docId: {"doc": …, "choices": [… per option index …]}}, "origin": …} and public/effects/coverage.json.
Kept apart from compile-stories.py so that the CI reproducibility check (which has no game installation) is
unaffected; re-run after compile-stories.py or a game update. Extractor model and limits: docs/EFFECTS.md.

Usage: python scripts/compile-effects.py"""
import collections, json, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
from effects import load_ctx, describe_record  # noqa: E402
from origin_effects import describe_origin  # noqa: E402


def main():
    ctx = load_ctx()
    index = json.loads((ROOT / 'public/data/index.json').read_text(encoding='utf-8'))
    records = {r['id']: r for g in index['groups']
               for r in json.loads((ROOT / 'public/data/groups' / f"{g['id']}.json").read_text(encoding='utf-8'))}
    origins = {o['id']: o for o in json.loads((ROOT / 'public/data/origins.json').read_text(encoding='utf-8'))}
    stories = json.loads((ROOT / 'public/stories/index.json').read_text(encoding='utf-8'))['stories']
    out_dir = ROOT / 'public/effects'
    out_dir.mkdir(parents=True, exist_ok=True)
    for old in out_dir.glob('*.json'):
        old.unlink()
    stats = collections.Counter()
    for s in stories:
        d = json.loads((ROOT / 'public/stories' / f"{s['id']}.json").read_text(encoding='utf-8'))
        docs = {}
        for c in d['chapters']:
            r = records.get(c['id'])
            if not r:
                stats['docs without record'] += 1
                continue
            res = describe_record(r, ctx)
            entry = {}
            if res.get('doc'):
                entry['doc'] = res['doc']
            if any(res.get('choices') or []):
                entry['choices'] = res['choices']
            stats['docs'] += 1
            if entry:
                docs[c['id']] = entry
                stats['docs with effects'] += 1
        payload = {'docs': docs} if docs else {}
        if s['kind'] == 'origin' and s['id'] in origins:
            origin = describe_origin(origins[s['id']], ctx)
            if origin:
                payload['origin'] = origin
                stats['origins with benefits'] += 1
        if s['kind'] == 'origin':
            stats['origin stories'] += 1
        if payload:
            (out_dir / f"{s['id']}.json").write_text(json.dumps(payload, ensure_ascii=False, separators=(',', ':')),
                                                    encoding='utf-8')
            stats['story files'] += 1
    stats['bytes'] = sum(f.stat().st_size for f in out_dir.glob('*.json'))
    (out_dir / 'coverage.json').write_text(json.dumps(dict(stats), indent=1), encoding='utf-8')
    print(dict(stats))


if __name__ == '__main__':
    main()
