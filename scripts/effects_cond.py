"""Readable labels for trigger (condition) keys that have no hand-written wording (docs/EFFECTS.md "Label language").

Order of sources for one condition `key op value` / `key = { args }`:
  1. the game's own trigger sentence (`ctx.data['trig']`: localisation HAS_OWNER, IS_OWNED_BY_TOOLTIP ... with `$PLACEHOLDER$`s filled
     from the arguments: object names from the game's localisation, numbers, comparison words);
  2. a sentence built from the key's words (`has_X` -> has X, `is_X_empire` -> is an X empire, `X > 5` -> X above 5) using the glossary
     `effects_gloss.WORDS` for Chinese; the arguments are appended as names;
  3. only purely internal story state (variables, flags, saved targets) uses the generic "earlier story condition" phrase
     (effects_gloss.STORY) -- that decision is made by the caller before this module is reached.
`UNKNOWN_WORDS` collects glossary gaps so the build can report them (the test fails when a word is missing).
"""
from __future__ import annotations
import re
import effects_gloss as G
import effects_labels as LB

UNKNOWN_WORDS = set()
KEYWORD_FALLBACK = {}  # trigger key -> uses of the raw key-word phrasing (must stay empty: every key has reviewed wording)
REVIEWED = {}  # trigger key -> uses of the reviewed wording (effects_labels.py)
OPW = {'>': ('超过', 'more than'), '>=': ('至少', 'at least'), '<': ('少于', 'fewer than'), '<=': ('至多', 'at most'), '=': ('为', 'exactly'), '!=': ('不是', 'not')}
NUM_TEMPLATES = {  # key -> (zh, en) with {op} and {n}
    'num_owned_planets': ('拥有{op}{n}颗星球', 'owns {op} {n} planets'), 'years_passed': ('游戏已进行{op}{n}年', 'the game has run {op} {n} years'),
    'mid_game_years_passed': ('游戏已进行{op}{n}年（中期）', 'mid-game years passed: {op} {n}'), 'end_game_years_passed': ('游戏已进行{op}{n}年（后期）', 'late-game years passed: {op} {n}'),
    'pop_amount': ('人口数量{op}{n}', 'pop count {op} {n}'), 'num_buildings': ('建筑数量{op}{n}', 'building count {op} {n}'),
    'empire_size': ('帝国规模{op}{n}', 'empire size {op} {n}'), 'num_districts': ('区划数量{op}{n}', 'district count {op} {n}'),
}


def numeric_label(low, op, val, ctx):
    """`key > 5` with a numeric value and a hand-written template -> label dict, else None."""
    t = NUM_TEMPLATES.get(low)
    vt = value_text(ctx, val) if val not in ('yes', 'no') else None
    if not t or not vt or vt[2] != 'num':
        return None
    ow = OPW.get(op or '=', OPW['='])
    return {'zh': t[0].format(op=ow[0], n=vt[0]), 'en': t[1].format(op=ow[1], n=vt[1]), 'detail': [f'{low} {op or "="} {val}']}
SPECIAL_ARGS = ('limit', 'trigger', 'potential')
PH = re.compile(r'\$([A-Za-z_]+)(?:\|[^$]*)?\$')
NUMLIKE = re.compile(r'^-?\d+(?:\.\d+)?$')
REFS = re.compile(r'^(root|this|prev|from|fromfrom|owner|controller|no|yes|none|random|all)$|^(root|prev|from|this|owner|event_target|global_event_target|scope)[.:]|^(prevprev|fromfrom)', re.I)
OBJ_ARGS = ('type', 'class', 'design', 'component', 'building', 'resource', 'policy', 'option', 'ethic', 'trait', 'modifier', 'tech', 'category',
            'species', 'poi', 'id', 'holding', 'zone', 'patron', 'term', 'area', 'side', 'position', 'task', 'contact', 'setting', 'flag', 'job', 'status')


def _strip(t):
    return re.sub(r'\s+', ' ', re.sub(r'§.|£\w+£', '', t)).strip().rstrip('。.')


def value_text(ctx, v, op='='):
    """-> (zh, en, kind) for a trigger argument: number, expression, named game object, reference or boolean."""
    from effects import nm, scope_label, to_num, NUM
    if isinstance(v, list):
        return None
    s = str(v)
    if s in ('yes', 'no'):
        return None
    if NUMLIKE.match(s) or s.startswith('@') or s.startswith('value:'):
        num = to_num(s, ctx)
        if num[0] == 'num':
            x = num[1]
            t = f'{x:g}'
            return t, t, 'num'
        return '某一水平', 'a given level', 'expr'
    if REFS.match(s) or s.lower() in ('root', 'this'):
        lab = scope_label(s.split('.')[0], ctx, 'country') if not s.startswith(('event_target', 'global_event_target')) else None
        if lab:
            return lab['zh'], lab['en'], 'ref'
        return '另一方', 'another party', 'ref'
    n = nm(ctx, s)
    return f'「{n["zh"]}」', f'"{n["en"]}"', 'name'


def _words(key):
    return [w for w in re.split(r'_+', key.lower()) if w]


def zh_core(words):
    out = []
    for w in words:
        if w.isdigit():
            out.append(w)
        elif w in G.WORDS:
            out.append(G.WORDS[w])
        else:
            UNKNOWN_WORDS.add(w)
            return None
    return ''.join(out)


def key_phrase(key):
    """(zh, en, lead) for a trigger key built from its words; lead in has / is / can / '' decides how it is conjugated."""
    w = _words(key)
    lead = ''
    if w and w[0] in ('has', 'is', 'can', 'num'):
        lead, w = w[0], w[1:]
    uses = False
    if len(w) >= 2 and w[0] in ('country', 'planet', 'founder') and w[1] in ('uses', 'has') and not lead:
        uses = w[1] == 'uses'
    suffix = None
    if w[-2:] == ['country', 'type']:
        suffix, w = 'country', w[:-2]
    elif w and len(w) > 1 and w[-1] in ('empire', 'authority', 'species', 'trait', 'perk', 'ascension', 'tradition', 'modifier', 'building', 'megastructure'):
        if len(w) > 1:
            suffix, w = w[-1], w[:-1]
    zh = zh_core(w)
    en = ' '.join(EN_WORDS.get(x, x) for x in w)
    if zh is None:
        return None
    if suffix:
        sz = zh_core([suffix])
        zh = zh + (sz or '')
        en = (en + ' ' + suffix).strip()
    return zh, en, lead


EN_WORDS = {'tier1or2or3': 'tier 1-3', 'tier1or2': 'tier 1-2', 'lvl': 'level', 'galcom': 'Galactic Community', 'fe': 'fallen empire', 'preftl': 'pre-FTL',
            'sb': 'starbase', 'diplo': 'diplomatic', 'perc': 'percentage', 'hp': 'HP', 'ftl': 'FTL', 'ai': 'AI', 'dna': 'DNA', 'poi': 'point of interest',
            'fleet1': 'fleet 1', 'fleet2': 'fleet 2', 'fleet3': 'fleet 3', 'lgate': 'L-Gate', 'coop': 'co-op'}


def _lead_phrases(zh, en, lead):
    if lead == 'num':
        return zh + '数量', 'number of ' + en
    if lead == 'has':
        return '拥有' + zh, 'has ' + en
    if lead == 'is':
        return '是' + zh, ('is an ' if en[:1] in 'aeiou' else 'is a ') + en if not en.endswith(('ed', 'ing')) else 'is ' + en
    if lead == 'can':
        return '能够' + zh, 'can ' + en
    return zh, en


def negate_phrase(zh, en):
    if zh.startswith('拥有'):
        nz = '没有' + zh[2:]
    elif zh.startswith('能够'):
        nz = '无法' + zh[2:]
    elif zh.startswith(('是', '使用', '具有', '处于', '由')):
        nz = '不' + zh
    else:
        nz = '不满足：' + zh
    for a, b in (('is an ', 'is not an '), ('is a ', 'is not a '), ('is ', 'is not '), ('has ', 'does not have '), ('can ', 'cannot '), ('uses ', 'does not use ')):
        if en.startswith(a):
            return nz, b + en[len(a):]
    return nz, 'not: ' + en


def fill_template(tpl, args, primary, op, ctx):
    """Fill a game sentence's $PLACEHOLDER$s. args: {lower-name: value}; primary: the scalar value of `key = value`. -> text or None."""
    ok = [True]
    primary_used = [False]

    def sub(m):
        name = m[1].lower()
        if name in ('compare', 'operation', 'comparator', 'op'):
            return OPW.get(op, OPW['='])[tpl['_i']]
        v = args.get(name)
        if v is None and name in ('value', 'num', 'amount', 'val', 'count', 'level', 'number'):
            v = next((args[k] for k in ('value', 'amount', 'count', 'level', 'num') if k in args), None)
        if v is None and primary is not None and primary not in ('yes', 'no') and not primary_used[0]:
            v, primary_used[0] = primary, True
        if v is None:
            if primary in ('yes', 'no') or primary is None:
                return tpl['_it']
            ok[0] = False
            return ''
        t = value_text(ctx, v)
        if t is None:
            ok[0] = False
            return ''
        return t[tpl['_i']]
    out = PH.sub(sub, tpl['_s'])
    return _strip(out) if ok[0] and '$' not in out else None


def trigger_label(k, v, op, ctx):
    """Label (dict with zh / en / detail) for trigger `k op v`; v is a string or a list of argument nodes."""
    low = k.lower()
    args, primary = {}, None
    if isinstance(v, list):
        for x in v:
            if isinstance(x['v'], str):
                args.setdefault(x['k'].lower(), x['v'])
                if x.get('op') and x['k'].lower() in ('value', 'amount', 'count', 'level', 'num') and op in (None, '='):
                    op = x['op']
    else:
        primary = str(v)
    neg = primary == 'no' or args.get('status') == 'no' and low.startswith('is_')
    detail = [f'{k} {op or "="} {primary if primary is not None else "{...}"}']
    out = _from_game(low, args, primary, op or '=', ctx)
    if out is None:
        out = _from_labels(low, args, primary, op or '=', ctx, v, neg)
        if out is not None:
            REVIEWED[low] = REVIEWED.get(low, 0) + 1
            neg = False
    if out is None:
        out = _from_words(low, k, args, primary, op or '=', ctx, v)
        if out is not None:
            KEYWORD_FALLBACK[low] = KEYWORD_FALLBACK.get(low, 0) + 1
    if out is None:
        return None
    zh, en = out
    if neg:
        zh, en = negate_phrase(zh, en)
    return {'zh': zh, 'en': en, 'detail': detail}


def _from_labels(low, args, primary, op, ctx, v, neg):
    if low not in LB.LABELS:
        return None
    names, num = [], None
    for a, val in args.items():
        if a in SPECIAL_ARGS:
            continue
        if a in ('value', 'amount', 'count', 'level', 'num', 'percentage', 'lvl', 'tier'):
            num = num or value_text(ctx, val)
            continue
        t = value_text(ctx, val)
        if t and t[2] in ('name', 'num', 'ref') and t[0] != f'「{G.OBJECT[0]}」':
            names.append(t)
    if any(t[2] != 'ref' for t in names):
        names = [t for t in names if t[2] != 'ref']
    if primary not in (None, 'yes', 'no'):
        t = value_text(ctx, primary)
        if t and t[2] == 'num':
            num = t
        elif t and t[0] != f'「{G.OBJECT[0]}」':
            names.append(t)
    nm_ = ('、'.join(t[0] for t in names), ', '.join(t[1] for t in names)) if names else None
    nu = (num[0], num[1]) if num else None
    ow = OPW.get(op or '=', OPW['='])
    return LB.render(low, ctx, nm_, nu, ow, neg)


def _from_game(low, args, primary, op, ctx):
    t = ctx.data.get('trig', {}).get(low)
    if not t or re.search(r'[A-Za-z]{3,}', re.sub(r'\$[^$]*\$', '', t['zh'])) or not re.sub(r'\$[^$]*\$', '', t['zh']).strip():
        return None
    res = []
    for i, lang in ((0, 'zh'), (1, 'en')):
        spec = {'_s': t[lang], '_i': i, '_it': ('该对象', 'it')[i]}
        text = fill_template(spec, args, primary, op, ctx)
        if text is None:
            return None
        res.append(text)
    # "Is Owned by X" with value `no`: the caller negates
    return res[0], res[1]


def _from_words(low, k, args, primary, op, ctx, v):
    kp = key_phrase(low)
    if kp is None:
        return None
    zh, en, lead = kp
    numeric = primary is not None and primary not in ('yes', 'no') and (NUMLIKE.match(primary) or primary.startswith(('@', 'value:')) or op not in ('=',))
    if isinstance(v, list):
        num = next((args[a] for a in ('value', 'amount', 'count', 'level', 'num', 'percentage') if a in args), None)
        names = []
        for a, val in args.items():
            if a in SPECIAL_ARGS or a in ('value', 'amount', 'count', 'level', 'num', 'percentage'):
                continue
            t = value_text(ctx, val)
            if t and t[2] in ('name', 'num'):
                names.append(t)
        pz, pe = _lead_phrases(zh, en, lead)
        if num is not None:
            vt = value_text(ctx, num)
            if vt:
                pz, pe = pz + f'{OPW.get(op, OPW["="])[0]}{vt[0]}', pe + f' {OPW.get(op, OPW["="])[1]} {vt[1]}'
        if names:
            pz += '：' + '、'.join(t[0] for t in names)
            pe += ': ' + ', '.join(t[1] for t in names)
        return pz, pe
    if numeric:
        vt = value_text(ctx, primary)
        ow = OPW.get(op, OPW['='])
        if vt is None:
            return None
        if vt[2] == 'name':
            return f'{zh}{ow[0]}{vt[0]}', f'{en} {ow[1]} {vt[1]}'
        return f'{zh}{ow[0]}{vt[0]}', f'{en} {ow[1]} {vt[1]}'
    if primary in ('yes', 'no') or primary is None:
        return _lead_phrases(zh, en, lead)
    vt = value_text(ctx, primary)
    if vt is None:
        return None
    pz, pe = _lead_phrases(zh, en, lead)
    if vt[2] == 'ref':
        return f'{pz}（{vt[0]}）', f'{pe} ({vt[1]})'
    return f'{pz}：{vt[0]}', f'{pe}: {vt[1]}'


def galaxy_setup_label(v, ctx):
    """check_galaxy_setup_value = { setting = num_advanced_empires value > 0 } -> "number of advanced empires more than 0"."""
    args = {x['k'].lower(): x for x in v}
    setting = args.get('setting', {}).get('v')
    val = args.get('value')
    kp = key_phrase(setting) if isinstance(setting, str) else None
    if not kp or not val or not isinstance(val['v'], str):
        return None
    zh, en = _lead_phrases(*kp)
    vt = value_text(ctx, val['v'])
    if vt is None:
        return None
    ow = OPW.get(val.get('op') or '=', OPW['='])
    return {'zh': f'银河设置中，{zh}{ow[0]}{vt[0]}', 'en': f'galaxy setup: {en} {ow[1]} {vt[1]}', 'detail': [f'check_galaxy_setup_value {setting} {val.get("op") or "="} {val["v"]}']}
