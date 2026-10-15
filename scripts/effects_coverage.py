"""Effects coverage over every story record: effect keys by frequency with handled / skipped / unhandled status.

  python scripts/effects_coverage.py [--write]     (--write refreshes the generated table in docs/EFFECTS.md)
"""
import glob, json, re, sys, time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from effects import ROOT, load_ctx, describe_record, flat, count_leaves  # noqa: E402

LATIN_ALLOW = {'ftl', 'ai', 'dna', 'l', 'i', 'ii', 'iii', 'iv', 'v', 'x'}  # FTL, AI, DNA, L-Gate, roman numerals in game names
EN_RAW = re.compile(r'\b(?:root|prev|fromfrom|event_target)\b|\w+_\w+|\b(?:check variable|same value|variable set|modulo|arithmetic)\b')


def _strip(t):
    # placeholders, and the game's own proper names inside 「」 (C.A.R.E, AH4B ...) are not translation gaps; nor are all-caps designations
    return re.sub(r'\[[^\]]*\]|\$[^$]*\$|§.|「[^」]*」|(?<![A-Za-z0-9_])[A-Z][A-Z0-9]*(?![a-z0-9_])|(?<=\d)[kK](?![A-Za-z])', '', t)


def label_language_report(directory=None):
    """Latin words left in Chinese labels (placeholders in [..] / $..$ and a short allow-list excluded) and raw script keys left in
    English labels, over every public/effects/<story>.json."""
    zh_labels = zh_words = en_labels = en_raw = 0
    words = {}
    d = Path(directory) if directory else ROOT / 'public/effects'

    def walk(o):
        nonlocal zh_labels, zh_words, en_labels, en_raw
        if isinstance(o, dict):
            for k, v in o.items():
                if k in ('zh', 'en') and isinstance(v, str):
                    if k == 'zh':
                        ws = [w for w in re.findall(r"[A-Za-z][A-Za-z_']*", _strip(v)) if w.lower() not in LATIN_ALLOW]
                        if ws:
                            zh_labels += 1
                            zh_words += len(ws)
                            for w in ws:
                                words[w] = words.get(w, 0) + 1
                    else:
                        raw = EN_RAW.findall(_strip(v))
                        if raw:
                            en_labels += 1
                            en_raw += len(raw)
                else:
                    walk(v)
        elif isinstance(o, list):
            for x in o:
                walk(x)
    for f in sorted(d.glob('*.json')):
        if f.name != 'coverage.json':
            walk(json.loads(f.read_text(encoding='utf-8')))
    return {'zhLabelsWithLatin': zh_labels, 'zhLatinWords': zh_words, 'zhDistinct': len(words), 'top': sorted(words.items(), key=lambda kv: -kv[1])[:15],
            'enLabelsWithRawKeys': en_labels, 'enRawKeys': en_raw}


FILLERS = (('zh', ('某个对象', '相关对象')), ('en', ('a certain one', 'a related object', 'a related target')))


def filler_report(directory=None):
    """Labels that still print a placeholder noun for an unnamed object (the game's own sentences are not touched)."""
    d = Path(directory) if directory else ROOT / 'public/effects'
    out = {'labels': 0, 'examples': []}

    def walk(o):
        if isinstance(o, dict):
            if 'detail' in o or o.get('kind') not in (None, 'tooltip'):
                for lang, words in FILLERS:
                    t = o.get(lang)
                    if isinstance(t, str) and any(w in t for w in words):
                        out['labels'] += 1
                        if len(out['examples']) < 5:
                            out['examples'].append(t)
                        break
            for v in o.values():
                if isinstance(v, (dict, list)):
                    walk(v)
        elif isinstance(o, list):
            for x in o:
                walk(x)
    for f in sorted(d.glob('*.json')):
        if f.name != 'coverage.json':
            walk(json.loads(f.read_text(encoding='utf-8')))
    return out


def generic_condition_report(directory=None):
    """Conditions still rendered as the generic "specific condition" phrase, and internal-story-state ones (allowed), over public/effects."""
    import effects_gloss as G
    d = Path(directory) if directory else ROOT / 'public/effects'
    out = {'specific': 0, 'story': 0, 'progress': 0, 'keys': {}}

    def walk(o):
        if isinstance(o, dict):
            z = o.get('zh')
            if z == G.SPECIFIC[0]:
                out['specific'] += 1
                for x in o.get('detail', [])[:1]:
                    out['keys'][x.split()[0]] = out['keys'].get(x.split()[0], 0) + 1
            elif z == G.STORY[0]:
                out['story'] += 1
            elif z == G.PROGRESS[0]:
                out['progress'] += 1
            for v in o.values():
                if isinstance(v, (dict, list)):
                    walk(v)
        elif isinstance(o, list):
            for x in o:
                walk(x)
    for f in sorted(d.glob('*.json')):
        if f.name != 'coverage.json':
            walk(json.loads(f.read_text(encoding='utf-8')))
    return out


def write_labels_doc(ctx):
    """docs/EFFECTS-LABELS.md: every condition key whose wording used to be built mechanically from the key's words (snapshot in
    scripts/effects_labels_before.json: uses, old zh, old en) next to the reviewed wording now used."""
    import effects_cond as K, effects_labels as LB
    before = json.loads((ROOT / 'scripts/effects_labels_before.json').read_text(encoding='utf-8'))
    rows = []
    for key in sorted(before, key=lambda k: -before[k][0]):
        uses, old_zh, old_en, _ = before[key]
        new = LB.render(key, ctx, ('{o}', '{o}'), ('{n}', '{n}'), ('{op}', '{op}'), False) if key in LB.LABELS else None
        rows.append(f"| `{key}` | {uses} | {old_zh} / {old_en} | {new[0] + ' / ' + new[1] if new else 'game sentence'} |".replace('\n', ' '))
    head = ("# Reviewed wording of mechanically built condition labels\n\nGenerated by `scripts/effects_coverage.py --write`. Each row is a trigger key whose "
            "label used to be assembled from the words of the key (uses = occurrences in the story effects, wording as it was); the last column is the reviewed "
            "wording in `scripts/effects_labels.py` (positive form; `key = no` is derived: 是 -> 不是, has -> does not have ...; `{o}` = the named game objects, "
            "`{n}` the number, `{op}` the comparison word; `{civic_x}` etc. are the game's own names). Keys the game phrases itself use its sentence "
            f"(`effects-data.json` `trig`).\n\n{len(rows)} keys.\n\n| Key | Uses | Before (zh / en) | Now (zh / en) |\n| --- | ---: | --- | --- |\n")
    (ROOT / 'docs/EFFECTS-LABELS.md').write_text(head + '\n'.join(rows) + '\n', encoding='utf-8')


MARK_A, MARK_B = '<!-- coverage:start -->', '<!-- coverage:end -->'


def run():
    ctx = load_ctx()
    t0 = time.time()
    docs = with_effects = leaves = unparsed = 0
    kinds = {}
    for f in sorted(glob.glob(str(ROOT / 'public/data/groups/*.json'))):
        for r in json.loads(Path(f).read_text(encoding='utf-8')):
            docs += 1
            res = describe_record(r, ctx)
            if res.get('error'):
                unparsed += 1
            parts = [res['doc'] and res['doc'].get(k) for k in ('immediate', 'after')] + \
                    [s['effects'] for s in (res['doc'] or {}).get('sections', [])] + list(res['choices'])
            n = sum(count_leaves(p) for p in parts if p)
            if n:
                with_effects += 1
                leaves += n
                kinds[r['kind']] = kinds.get(r['kind'], 0) + 1
    return ctx, {'documents': docs, 'withEffects': with_effects, 'effectEntries': leaves, 'unparsed': unparsed, 'byKind': kinds,
                 'seconds': round(time.time() - t0, 1)}


def table(ctx, top=60):
    st = ctx.stats
    rows = []
    for bucket in ('handled', 'skipped', 'unhandled'):
        for k, c in st[bucket].items():
            rows.append((c, bucket, k))
    rows.sort(reverse=True)
    total = sum(c for c, *_ in rows)
    h = sum(st['handled'].values()) + sum(st['skipped'].values())
    lines = ['| Effect key | Uses | Status |', '| --- | ---: | --- |']
    lines += [f'| `{k}` | {c} | {b} |' for c, b, k in rows if b == 'unhandled'][:top]
    return total, h, sum(st['handled'].values()), sum(st['skipped'].values()), sum(st['unhandled'].values()), '\n'.join(lines), rows


if __name__ == '__main__':
    ctx, summary = run()
    total, ok, handled, skipped, unhandled, md, rows = table(ctx)
    print(json.dumps(summary, ensure_ascii=False))
    print('label language:', label_language_report())
    print(f'effect-key uses: {total}; handled {handled}, skipped (bookkeeping) {skipped}, unhandled {unhandled}')
    print('top unhandled:', [(k, c) for c, b, k in rows if b == 'unhandled'][:70])
    if '--write' in sys.argv:
        path = ROOT / 'docs/EFFECTS.md'
        doc = path.read_text(encoding='utf-8')
        handled_rows = [f'| `{k}` | {c} | {b} |' for c, b, k in rows if b != 'unhandled'][:40]
        import effects as E
        cl = []
        for k, cat in sorted(E.CLASSIFIED.items(), key=lambda kv: (kv[1], kv[0])):
            uses = ctx.stats['skipped'].get(k, 0)
            cl.append(f'| `{k}` | {uses} | {E.CATEGORIES[cat][0]} |')
        cats = '\n'.join(f'| {v[0]} | {v[1]} |' for v in E.CATEGORIES.values())
        tmpl = ', '.join(f'`{k}` ({c})' for k, c in sorted(ctx.stats['template'].items()))
        cov = ROOT / 'public/effects/coverage.json'
        docs_tbl = ''
        if cov.exists():
            w = json.loads(cov.read_text(encoding='utf-8')).get('withoutEffects')
            if w:
                names = {'script-empty': '(a) the script has no effect nodes at all', 'event-chaining': '(a) only event chaining / messages (the story map shows them)',
                         'bookkeeping': '(b) only bookkeeping (flags, variables, UI, AI hints ...)', 'no-record': '(c) no game record (origin-intro pseudo-documents; their content is the story\'s `origin` entry)',
                         'other': '(d) other (listed below)'}
                rows = '\n'.join(f'| {names[k]} | {w["byClass"].get(k, 0)} |' for k in names)
                oth = '\n'.join(f'* `{o["id"]}` ({o["kind"]}): {o["reason"]}' for o in w['other']) or '* none'
                part = sorted(w.get('partial', []), key=lambda x: -x['omitted'])
                ptxt = (f'\n\nPartly described documents: {len(part)} (the itemised list is trimmed at 60 leaves and says how many effects were left out; '
                        f'{sum(x["omitted"] for x in part)} effects in total, almost all archaeology / discovery failure pools of the same shape): '
                        + ', '.join(f'`{x["id"]}` ({x["omitted"]})' for x in part) + '.') if part else ''
                top = json.loads(cov.read_text(encoding='utf-8'))
                docs_tbl = (f'\n\nOrigins: {top.get("origin stories", 0)} origin stories, {top.get("origins with benefits", 0)} with an `origin` entry '
                            f'(`origin_endbringers` and `origin_doomsday` get theirs from the hidden start events); documents classified `other`: {len(w["other"])}.') + ptxt
                docs_tbl += (f'\n\nStory documents without an effects entry ({w["distinctDocuments"]} distinct, from `public/effects/coverage.json`):\n\n'
                            f'| Class | Documents |\n| --- | ---: |\n{rows}\n\n(d) individually:\n\n{oth}\n')
        lr = label_language_report()
        lang_line = (f"\n\nLabel language check (`label_language_report`, over `public/effects/*.json`): Chinese labels with Latin words {lr['zhLabelsWithLatin']} "
                     f"({lr['zhLatinWords']} words; placeholders in `[...]` / `$...$` and FTL, AI, DNA, L-Gate, roman numerals excluded); "
                     f"English labels with raw script keys {lr['enLabelsWithRawKeys']} ({lr['enRawKeys']} occurrences).\n\n")
        import effects_cond as K
        write_labels_doc(ctx)
        gr = generic_condition_report()
        lang_line += (f"Condition wording: generic \"specific condition\" phrase {gr['specific']} (target 0); \"earlier story condition\" (internal variables, flags, saved targets only) "
                      f"{gr['story']}; \"depending on progress\" {gr['progress']}. Reviewed wording used {sum(K.REVIEWED.values())} times for {len(K.REVIEWED)} keys "
                      f"(`docs/EFFECTS-LABELS.md`); labels with a placeholder noun for an unnamed object {filler_report()['labels']} (target 0); raw key-word fallback {sum(K.KEYWORD_FALLBACK.values())} times for {len(K.KEYWORD_FALLBACK)} keys (target 0).\n\n")
        block = (f"{MARK_A}\nGenerated by `scripts/effects_coverage.py` ({summary['documents']} documents, {summary['withEffects']} with effects, "
                 f"{summary['effectEntries']} effect entries; effect-key uses {total}: handled {handled}, skipped bookkeeping {skipped}, "
                 f"unhandled {unhandled} = {round(100 * unhandled / max(total, 1), 1)}%; template placeholders {sum(ctx.stats['template'].values())}).\n\n"
                 f"Unhandled keys: {'none' if not unhandled else ''}\n\n{md if unhandled else ''}\n\n"
                 f"Classified as bookkeeping / technical (not itemised in the panel; `scripts/effects_more.py` `CLASSIFIED`):\n\n| Category | Meaning |\n| --- | --- |\n{cats}\n\n"
                 f"| Effect key | Uses | Category |\n| --- | ---: | --- |\n" + '\n'.join(cl) + f"\n\nTemplate placeholders (inline-script parameters such as `$POP_GROUP$`, not effects): {tmpl or 'none'}.{docs_tbl}{lang_line}"
                 f"Most frequent handled / skipped keys:\n\n| Effect key | Uses | Status |\n| --- | ---: | --- |\n" + '\n'.join(handled_rows) + f"\n{MARK_B}")
        if MARK_A in doc:
            doc = doc[:doc.index(MARK_A)] + block + doc[doc.index(MARK_B) + len(MARK_B):]
        else:
            doc += '\n' + block + '\n'
        path.write_text(doc, encoding='utf-8')
