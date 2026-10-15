"""What an origin gives the empire at the start of the game (docs/EFFECTS.md).

Sources, all from the read-only game files (common/governments/civics/*origin*.txt):
  * the origin's own effect text (`description = "origin_..._effects"` in the game's localisation, both languages) — shown as
    the game's bullet list, never rewritten;
  * the structured numbers behind it that the origin script declares: `modifier = { ... }` stats, `starting_colony`,
    `habitability_preference`, `added_planet_types` / `removed_planet_types`;
  * `swap_type` variants (the game replaces the description when its trigger holds, e.g. nomadic empires).
Everything here is a STARTING benefit (phase 'start', permanent) — later outcomes of the origin's story events come from
scripts/effects.py (describe_record).  Static reading: nothing is simulated.

    describe_origin(origin, ctx) -> {id, bullets{zh[],en[]}, variants[], effects[], source}
    origin = one record of public/data/origins.json ({id, script, source}); ctx = effects.load_ctx().
"""
from __future__ import annotations
import re, sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from extract import parse, first  # noqa: E402
from effects import L, cond_label, entry, State, fmt, humanize, hz, nm, resolve_links, to_num, ROOT  # noqa: E402

# Origins whose civic script declares no effects of its own: the game fires a hidden start-of-game event for them
# (events/game_start.txt `every_playable_country = { limit = { has_origin = X } country_event = { id = ... } }`).
START_EVENTS = {'origin_doomsday': ('origin.60', 'events/game_start.txt:320'),
                'origin_endbringers': ('shroud.8000', 'events/game_start.txt:447')}

BULLET = re.compile(r'^[\s \-–—·•]+')


def bullets(ctx, key):
    """The game's description key -> {zh: [{text, level}], en: [...]} (one entry per line; level 1 = indented sub-item), or None."""
    name = resolve_links(ctx.name(key), ctx) if key else None
    if not name:
        return None
    out = {}
    for lang in ('zh', 'en'):
        items = []
        for line in name[lang].split('\n'):
            text = BULLET.sub('', line).strip()
            if not text or re.fullmatch(r'[\s\u00a0:：]*', text):
                continue
            items.append({'text': re.sub(r'\s+', ' ', text.replace('\u00a0', ' ')), 'level': 1 if re.match(r'^[ \t]{2,}|^\t', line) else 0})
        out[lang] = items
    return out


def _stat_entries(block, ctx, st, src):
    out = []
    for stat, value in block.items():
        num = to_num(value, ctx)
        if num[0] != 'num':
            continue
        pct = stat.endswith(('_mult', '_percent'))
        lab = ctx.stat(stat) or hz(stat)
        txt = fmt(num[1], pct)
        out.append({'kind': 'modifier', 'label': L(f'{lab["zh"]} {txt}', f'{lab["en"]} {txt}'), 'stat': stat,
                    'value': num[1] * (100 if pct else 1), 'unit': 'percent' if pct else 'flat', 'phase': 'start', 'duration': 'permanent',
                    'source': src})
    return out


def describe_origin(origin, ctx, records=None):
    try:
        top = parse(origin['script'])
    except ValueError:
        return None
    body = top[0]['v'] if top and isinstance(top[0]['v'], list) else []
    file, _, line = (origin.get('source') or '').rpartition(':')
    src = origin.get('source') or origin['id']
    st = State(origin['script'], origin.get('source'), 1, 'country')
    data = ctx.data.get('origins', {}).get(origin['id'], {})
    desc_key = first(body, 'description')
    result = {'id': origin['id'], 'source': src, 'phase': 'start'}
    b = bullets(ctx, desc_key if isinstance(desc_key, str) else data.get('description'))
    if b:
        result['bullets'] = b
        result['bulletsKey'] = desc_key if isinstance(desc_key, str) else data.get('description')
    neg_key = first(body, 'negative_description')
    nb = bullets(ctx, neg_key if isinstance(neg_key, str) else None)
    if nb:
        result['negativeBullets'] = nb
    variants = []
    for x in body:
        if x['k'] == 'swap_type' and isinstance(x['v'], list):
            vb = bullets(ctx, first(x['v'], 'description'))
            trig = next((y['v'] for y in x['v'] if y['k'] == 'trigger' and isinstance(y['v'], list)), None)
            if vb:
                variants.append({'bullets': vb, 'when': cond_label(trig, ctx) if trig else None})
    if variants:
        result['variants'] = variants
    effects = []
    for x in body:
        if x['k'] == 'modifier' and isinstance(x['v'], list):
            effects += _stat_entries({y['k']: y['v'] for y in x['v'] if isinstance(y['v'], str)}, ctx, st, src)
        elif x['k'] == 'starting_colony' and isinstance(x['v'], str):
            n = nm(ctx, x['v'])
            effects.append({'kind': 'planet', 'label': L(f'母星类型：{n["zh"]}', f'Homeworld type: {n["en"]}'), 'planetClass': x['v'], 'phase': 'start', 'source': src})
        elif x['k'] == 'habitability_preference' and isinstance(x['v'], str):
            n = nm(ctx, x['v'])
            effects.append({'kind': 'planet', 'label': L(f'最适宜的星球类型：{n["zh"]}', f'Preferred planet type: {n["en"]}'), 'planetClass': x['v'], 'phase': 'start', 'source': src})
        elif x['k'] in ('added_planet_types', 'removed_planet_types') and isinstance(x['v'], list):
            names = [nm(ctx, y['v'] if y['k'] == '' else y['k']) for y in x['v']]
            names = [n for n in names if n]
            if names:
                add = x['k'].startswith('added')
                effects.append({'kind': 'planet', 'phase': 'start', 'source': src,
                                'label': L(('可选的母星类型增加：' if add else '可选的母星类型移除：') + '、'.join(n['zh'] for n in names),
                                           ('Homeworld types added: ' if add else 'Homeworld types removed: ') + ', '.join(n['en'] for n in names))})
    start = START_EVENTS.get(origin['id'])
    if start and records and start[0] in records:
        from effects import describe_record
        doc = (describe_record(records[start[0]], ctx).get('doc') or {})
        for e in doc.get('immediate', []):
            e.setdefault('phase', 'start')
            e['startEvent'] = start[0]
            effects.append(e)
        result['startEvent'] = {'id': start[0], 'source': start[1]}
    if effects:
        result['effects'] = effects
    if not (b or nb or variants or effects):
        return None
    return result


def describe_all(origins, ctx, records=None):
    return {o['id']: d for o in origins if (d := describe_origin(o, ctx, records))}
