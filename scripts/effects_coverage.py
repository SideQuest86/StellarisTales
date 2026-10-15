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
                docs_tbl = (f'\n\nStory documents without an effects entry ({w["distinctDocuments"]} distinct, from `public/effects/coverage.json`):\n\n'
                            f'| Class | Documents |\n| --- | ---: |\n{rows}\n\n(d) individually:\n\n{oth}\n')
        lr = label_language_report()
        lang_line = (f"\n\nLabel language check (`label_language_report`, over `public/effects/*.json`): Chinese labels with Latin words {lr['zhLabelsWithLatin']} "
                     f"({lr['zhLatinWords']} words; placeholders in `[...]` / `$...$` and FTL, AI, DNA, L-Gate, roman numerals excluded); "
                     f"English labels with raw script keys {lr['enLabelsWithRawKeys']} ({lr['enRawKeys']} occurrences).\n\n")
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
