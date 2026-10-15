"""Gameplay effects per story, for the reader's optional effects panel (lazy: one file per story).

Input: the compiled stories (public/stories/<id>.json — which documents a story reads), the extracted records
(public/data/groups/*.json), origins (public/data/origins.json) and the build input public/data/effects-data.json
(`python scripts/effects_data.py`, needs the game installation). Output: public/effects/<storyId>.json
{"docs": {docId: {"doc": …, "choices": [… per option index …]}}, "origin": …} and public/effects/coverage.json.
Kept apart from compile-stories.py so that the CI reproducibility check (which has no game installation) is
unaffected; re-run after compile-stories.py or a game update. Extractor model and limits: docs/EFFECTS.md.

Usage: python scripts/compile-effects.py"""
import collections, json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
from effects import load_ctx, describe_record, flat  # noqa: E402
from origin_effects import describe_origin  # noqa: E402
from effects_more import SCOPES as SCOPE_KEYS  # noqa: E402


EVENT_CHAIN = re.compile(r'(?:^|_)event$|^event_chain|^(?:begin|end)_event_chain$|^add_event_chain_counter$|^reset_event_chain_counter$|^fire_on_action$|^create_message$|^show_(?:notification|message)$|^save_(?:global_)?event_target_as$|^set_next_astral_rift_event$')


def snapshot(ctx):
    return {b: dict(d) for b, d in ctx.stats.items()}


def classify_empty(record, ctx):
    """Why a document with a record has no effects entry: ('script-empty'|'event-chaining'|'bookkeeping'|'other', detail)."""
    before = snapshot(ctx)
    describe_record(record, ctx)
    after = snapshot(ctx)
    delta = {b: {k: n - before[b].get(k, 0) for k, n in after[b].items() if n - before[b].get(k, 0)} for b in after}
    skipped, handled, template = delta['skipped'], delta['handled'], delta['template']
    for b in before:  # the probe must not change the coverage counters
        ctx.stats[b] = before[b]
    if not skipped and not handled and not template:
        return 'script-empty', None
    wrappers = {k for k in handled if k.startswith('scope:') or k in ('if', 'else', 'else_if', 'hidden_effect', 'random_list', 'random', 'while', 'switch', 'custom_tooltip', 'scripted_effect', 'effect') or k in SCOPE_KEYS}
    if set(handled) - wrappers:
        return 'other', 'handled effect(s) %s produced no entry' % sorted(set(handled) - wrappers)
    if all(EVENT_CHAIN.search(k) for k in skipped):
        return 'event-chaining', None
    if skipped:
        return 'bookkeeping', sorted(skipped)
    return 'other', 'only conditional wrappers around nothing printable: %s' % sorted(handled)


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
    empty = collections.Counter()
    no_record, other, partial = [], [], []
    seen = set()
    for s in stories:
        d = json.loads((ROOT / 'public/stories' / f"{s['id']}.json").read_text(encoding='utf-8'))
        docs = {}
        for c in d['chapters']:
            r = records.get(c['id'])
            if not r:
                stats['docs without record'] += 1
                if c['id'] not in seen:
                    seen.add(c['id'])
                    empty['no-record'] += 1
                    no_record.append(c['id'])
                continue
            res = describe_record(r, ctx)
            entry = {}
            if res.get('doc'):
                entry['doc'] = res['doc']
            if any(res.get('choices') or []):
                entry['choices'] = res['choices']
            stats['docs'] += 1
            if not entry and c['id'] not in seen:
                seen.add(c['id'])
                why, detail = classify_empty(r, ctx)
                empty[why] += 1
                if why == 'other':
                    other.append({'id': c['id'], 'kind': r['kind'], 'reason': detail})
            if entry:
                omitted = sum(e.get('omitted', 0) for p in ([entry.get('doc', {}).get('immediate'), entry.get('doc', {}).get('after')] + [s2['effects'] for s2 in entry.get('doc', {}).get('sections', [])] + list(entry.get('choices') or [])) for e in flat(p) if e.get('kind') == 'more')
                if omitted and c['id'] not in {x['id'] for x in partial}:
                    partial.append({'id': c['id'], 'omitted': omitted})
                docs[c['id']] = entry
                stats['docs with effects'] += 1
        payload = {'docs': docs} if docs else {}
        if s['kind'] == 'origin' and s['id'] in origins:
            origin = describe_origin(origins[s['id']], ctx, records)
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
    out = dict(stats)
    out['withoutEffects'] = {'distinctDocuments': sum(empty.values()), 'byClass': dict(empty), 'noRecord': no_record, 'other': other, 'partial': partial}
    (out_dir / 'coverage.json').write_text(json.dumps(out, indent=1), encoding='utf-8')
    print(out['withoutEffects']['byClass'], 'other:', len(other), 'no-record sample:', no_record[:5])
    print(dict(stats))


if __name__ == '__main__':
    main()
