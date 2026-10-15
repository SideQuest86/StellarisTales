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


def check(entry, problems, where):
    ok = isinstance(entry, dict) and valid_text(entry.get('zh'), 'zh') and valid_text(entry.get('en'), 'en')
    note = entry.get('note') if isinstance(entry, dict) else None
    if ok and note is not None:
        ok = isinstance(note, dict) and all(isinstance(note.get(k), str) and note[k].strip()
                                            and not any(c in note[k] for c in '[]<>$') for k in ('zh', 'en'))
    if ok and CJK.search(entry['en']):
        ok = False
    if not ok:
        problems.append(f'{where}: invalid entry {json.dumps(entry, ensure_ascii=False)[:160]}')
        return None
    out = {'zh': entry['zh'].strip(), 'en': entry['en'].strip()}
    if note:
        out['note'] = {'zh': note['zh'].strip(), 'en': note['en'].strip()}
    caps = [w for w in re.findall(r"[A-Za-z][\w'-]*", out['en'])[1:] if w[0].isupper() and w not in ('I', 'FTL', 'L-Gate')]
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
            used = {d['id']: set((d.get('names') or {}).keys()) for d in story['chapters']}
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
    lines += ['', '## Reviewer issues (open)', ''] + [f'- {i}' for i in issues]
    if not args.dry_run:
        (BASE / 'LEDGER.md').write_text('\n'.join(lines) + '\n', encoding='utf-8')
    print(f'covered {covered}/{total}, merged entries {changed_keys}, problems {len(problems)}, issues {len(issues)}, '
          f'missing groups {len(missing_groups)}')


if __name__ == '__main__':
    main()
