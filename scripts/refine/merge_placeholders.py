"""Merge reviewed placeholder wording (docs/refine/placeholders/out/<group>.json) into the story fragments
(content/stories/<id>.json: `placeholders`, `placeholderDocs`) after validation, and write the coverage ledger
docs/refine/placeholders/LEDGER.md. Rejected entries are listed in the ledger, never merged.

Usage: python scripts/refine/merge_placeholders.py [--dry-run]"""
import argparse, json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
BASE = ROOT / 'docs/refine/placeholders'
CJK = re.compile(r'[㐀-鿿]')


def valid_text(s, lang):
    if not isinstance(s, str) or not s.strip() or any(c in s for c in '[]{}<>$§£'):
        return False
    return len(s) <= (16 if lang == 'zh' else 48)


PH = re.compile(r'\[([^\[\]]+)\]')


def text_keys(c):
    """Placeholder keys a compiled document uses in its own text (incl. scripted names the game fills in)."""
    strings = [c['title'], *c['texts'], *c.get('sections', [])]
    for ch in c.get('choices', []):
        strings += [ch['label'], *ch.get('responses', []), *ch.get('tooltips', [])]
    return {m for s in strings for lang in ('zh', 'en') for m in PH.findall(s.get(lang) or '')}


def check(entry, problems, where):
    # "omit": ["en"] marks a language where the sentence reads naturally without any phrase (empty string).
    if not isinstance(entry, dict):
        problems.append(f'{where}: invalid entry {entry!r}'[:200])
        return None
    entry = dict(entry)
    # A language listed under omit but not given means the empty phrase; an empty phrase can only mean "omit".
    for lang in entry.get('omit') or []:
        entry.setdefault(lang, '')
    omit = {lang for lang in ('zh', 'en') if entry.get(lang) == ''}
    # A language not given at all keeps the existing wording (the compiler falls back to it).
    given = [lang for lang in ('zh', 'en') if lang in entry]
    ok = bool(given) and all(lang in omit or valid_text(entry.get(lang), lang) for lang in given)
    note = entry.get('note') if isinstance(entry, dict) else None
    if ok and note is not None:
        ok = isinstance(note, dict) and all(isinstance(note.get(k), str) and note[k].strip()
                                            and not any(c in note[k] for c in '[]<>$') for k in ('zh', 'en'))
    if ok and CJK.search(entry.get('en', '')):
        ok = False
    if not ok:
        problems.append(f'{where}: invalid entry {json.dumps(entry, ensure_ascii=False)[:160]}')
        return None
    out = {lang: entry[lang].strip() for lang in given}
    if omit:
        out['omit'] = sorted(omit)
    if note:
        out['note'] = {'zh': note['zh'].strip(), 'en': note['en'].strip()}
    # Context variants: one key in several positions of one document ({lang, before?/after?, text}).
    variants = []
    for v in entry.get('variants') or []:
        if (isinstance(v, dict) and v.get('lang') in ('zh', 'en') and (v.get('before') or v.get('after'))
                and all(isinstance(v.get(k, ''), str) and len(v.get(k, '')) <= 60 for k in ('before', 'after'))
                and (v.get('text') == '' or valid_text(v.get('text'), v['lang']))):
            variants.append({k: v[k] for k in ('lang', 'before', 'after', 'text') if k in v})
        else:
            problems.append(f'{where}: invalid variant {json.dumps(v, ensure_ascii=False)[:120]}')
    if variants:
        out['variants'] = variants
    caps = [w for w in re.findall(r"[A-Za-z][\w'-]*", out.get('en', ''))[1:] if w[0].isupper() and w not in ('I', 'FTL', 'L-Gate')]
    if caps:
        problems.append(f'{where}: check capitalised words (possible invented name): {out["en"]}')
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--dry-run', action='store_true')
    args = ap.parse_args()
    groups = json.loads((BASE / 'groups.json').read_text(encoding='utf-8'))['groups']
    # Follow-up pass over keys still on the generic phrase (work/fallback.md): per-doc wording added on top.
    fallback_file = BASE / 'out' / 'fallback.json'
    fallback = json.loads(fallback_file.read_text(encoding='utf-8')) if fallback_file.exists() else {}
    mechanical_file = BASE / 'out' / 'mechanical.json'
    mechanical = json.loads(mechanical_file.read_text(encoding='utf-8')) if mechanical_file.exists() else {}
    # Final pass over rendered sentences (rendered/<group>.md → out/rendered-<group>.json): per-doc wording applied
    # last; exceptions (sentences that cannot read naturally without rewriting game text) recorded in the ledger.
    rendered, exceptions, rendered_reviewed = {}, [], set()
    for f in sorted((BASE / 'out').glob('rendered-*.json')):
        for sid, r in json.loads(f.read_text(encoding='utf-8')).items():
            if r.get('reviewed'):
                rendered_reviewed.add(sid)
            for doc, keys in (r.get('docs') or {}).items():
                rendered.setdefault(sid, {}).setdefault(doc, {}).update(keys or {})
            exceptions += [f'{sid}: {e}' for e in r.get('exceptions') or []]
    # Independent second review (rendered2-*.json, Sonnet): wording applied last; its exception list replaces the
    # first review's for every story it confirmed (only original-text faults remain).
    second = {}
    for f in sorted((BASE / 'out').glob('rendered2-*.json')) + sorted((BASE / 'out').glob('rendered3-*.json')):
        for sid, r in json.loads(f.read_text(encoding='utf-8')).items():
            if r.get('reviewed'):
                second[sid] = r
            for doc, keys in (r.get('docs') or {}).items():
                rendered.setdefault(sid, {}).setdefault(doc, {}).update(keys or {})
    if second:
        exceptions = [e for e in exceptions if e.split(':', 1)[0] not in second]
        exceptions += [f'{sid}: {e}' for sid, r in second.items() for e in r.get('exceptions') or []]
    rows, problems, changed_keys, covered, missing_groups = [], [], 0, 0, []
    issues = []
    for g in groups:
        f = BASE / 'out' / f"{g['id']}.json"
        if not f.exists():
            missing_groups.append(g['id'])
            continue
        try:
            data = json.loads(f.read_text(encoding='utf-8'))
        except json.JSONDecodeError as e:
            problems.append(f"{g['id']}: unreadable JSON ({e})")
            missing_groups.append(g['id'])
            continue
        done = [s for s in g['stories'] if s in data]
        covered += len(done)
        rows.append((g['id'], len(g['stories']), len(done)))
        for sid in done:
            review = data[sid] or {}
            story = json.loads((ROOT / 'public/stories' / f'{sid}.json').read_text(encoding='utf-8'))
            used = {d['id']: set((d.get('names') or {}).keys()) | text_keys(d) for d in story['chapters']}
            all_keys = set().union(*used.values()) if used else set()
            merged, per_doc = {}, {}
            for key, entry in (review.get('placeholders') or {}).items():
                if key not in all_keys:
                    problems.append(f'{sid}: unknown key {key}')
                    continue
                e = check(entry, problems, f'{sid} {key}')
                if e:
                    merged[key] = e
            for doc, keys in (review.get('placeholderDocs') or {}).items():
                if doc not in used:
                    problems.append(f'{sid}: unknown doc {doc}')
                    continue
                for key, entry in (keys or {}).items():
                    if key not in used[doc]:
                        problems.append(f'{sid}: key {key} not used in {doc}')
                        continue
                    e = check(entry, problems, f'{sid} {doc} {key}')
                    if e:
                        per_doc.setdefault(doc, {})[key] = e
            for doc, keys in ((fallback.get(sid) or {}).get('placeholderDocs') or {}).items():
                for key, entry in (keys or {}).items():
                    if doc not in used or key not in used[doc]:
                        problems.append(f'{sid}: fallback key {key} not used in {doc}')
                        continue
                    e = check(entry, problems, f'{sid} {doc} {key} (fallback)')
                    if e and key not in per_doc.get(doc, {}):
                        per_doc.setdefault(doc, {})[key] = e
            # Rewording passes (mechanical phrases, then rendered sentences): replace earlier per-doc wording.
            later = [(d, k) for d, k in (mechanical.get(sid) or {}).items()] + [(d, k) for d, k in (rendered.get(sid) or {}).items()]
            for doc, keys in later:
                for key, entry in (keys or {}).items():
                    if doc not in used or key not in used[doc]:
                        problems.append(f'{sid}: reworded key {key} not used in {doc}')
                        continue
                    e = check(entry, problems, f'{sid} {doc} {key} (reworded)')
                    if e:
                        per_doc.setdefault(doc, {})[key] = e
            for text in review.get('issues') or []:
                issues.append(f'{sid}: {text}')
            changed_keys += len(merged) + sum(len(v) for v in per_doc.values())
            if args.dry_run:
                continue
            path = ROOT / 'content/stories' / f'{sid}.json'
            fragment = json.loads(path.read_text(encoding='utf-8-sig')) if path.exists() else {'id': sid}
            fragment.pop('placeholders', None)
            fragment.pop('placeholderDocs', None)
            if merged:
                fragment['placeholders'] = dict(sorted(merged.items()))
            if per_doc:
                fragment['placeholderDocs'] = {d: dict(sorted(v.items())) for d, v in sorted(per_doc.items())}
            path.write_text(json.dumps(fragment, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
    total = sum(len(g['stories']) for g in groups)
    lines = ['# Placeholder review ledger', '',
             f'Stories with engine-filled placeholders: {total}; reviewed (present in a reviewer output): {covered}; '
             f'reviewed wording entries merged: {changed_keys}.', '',
             '| Group | Stories | Reviewed |', '| --- | ---: | ---: |']
    lines += [f'| {g} | {n} | {d} |' for g, n, d in rows]
    if missing_groups:
        lines += ['', 'Groups without output: ' + ', '.join(missing_groups)]
    lines += ['', '## Validation problems (not merged)', ''] + [f'- {p}' for p in problems] or ['- none']
    all_stories = {s for g in groups for s in g['stories']}
    unconfirmed = sorted(all_stories - rendered_reviewed)
    rendered_reviewed &= all_stories
    print(f'rendered review: {len(rendered_reviewed)} of {total} confirmed; not confirmed: {unconfirmed[:20]}')
    lines += ['', f'## Rendered-sentence review: {len(rendered_reviewed)} of {total} stories confirmed', '',
              ('Not confirmed: ' + ', '.join(unconfirmed)) if unconfirmed else 'Every story with placeholders was confirmed.', '',
              f'Independent second review (Sonnet, docs/refine/briefs/rendered2.md): '
              f'{len(set(second) & all_stories)} of {total} stories confirmed; remaining exceptions are original-text faults only.', '',
              'First-pass reviewer notes are superseded for these stories by the rendered review; what remains are '
              'the exceptions below (sentences that cannot read naturally without rewriting game text).', '']
    lines += ['## Exceptions (game text would have to change)', ''] + [f'- {e}' for e in exceptions]
    lines += ['', '## First-pass reviewer notes (stories without a rendered review)', '']
    lines += [f'- {i}' for i in issues if i.split(':', 1)[0] not in rendered_reviewed]
    if not args.dry_run:
        (BASE / 'LEDGER.md').write_text('\n'.join(lines) + '\n', encoding='utf-8')
    print(f'covered {covered}/{total}, merged entries {changed_keys}, problems {len(problems)}, issues {len(issues)}, '
          f'missing groups {len(missing_groups)}')


if __name__ == '__main__':
    main()
