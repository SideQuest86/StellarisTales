"""What the choices, stages and outcomes of a story document DO in the game (docs/EFFECTS.md).

Pure functions over parsed Stellaris script (scripts/extract.parse nodes). Nothing is simulated and nothing is invented:
every number comes from the script, from a scripted variable / static script value, or from a game modifier definition;
anything that depends on the save (scaled values, targets saved earlier) says so.

    ctx = load_ctx()                                    # public/data/effects-data.json (scripts/effects_data.py)
    describe_effects(nodes, script_text, ctx, scope='country') -> [effect, ...]
    describe_record(record, ctx) -> {'doc': {...}|None, 'choices': [[effect...]|None, ...]}

Effect entry (all keys optional except kind / label):
    kind        resource | resource_mult | modifier | modifier_remove | trait | trait_remove | technology | research |
                ship | fleet | leader | pop | planet | deposit | opinion | project | relic | specimen | tooltip |
                scripted | if | else | random_list | random | repeat | generic | unhandled
    label       {zh, en}  readable sentence in the game's own words where it has them
    value/unit  number and 'flat' | 'percent'; `range` [lo, hi]; `scaled` true = depends on the save ("scaled by the game")
    target      {zh, en}  who/what it applies to when not "our empire" ; `hidden` true = inside hidden_effect
    duration    {days: n} | {months: n} | {years: n} | 'permanent'
    when        {zh, en}  condition label (if / else groups);  chance {percent|weight, of, adjusted}
    effects     children of if/else/random/random_list/scripted/repeat groups
    source      file:line of the script this came from;  unhandled true = no handler, kept as a generic entry
"""
from __future__ import annotations
import json, re, sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from extract import parse, walk  # noqa: E402

ROOT = Path(__file__).resolve().parents[1]
MAX_DEPTH = 4


def L(zh, en):
    return {'zh': zh, 'en': en}


# ---------------------------------------------------------------------------------------------------- context ---
class Ctx:
    def __init__(self, data):
        self.data = data
        self.loc = data.get('loc', {})
        self.vars = data.get('vars', {})
        self.values = data.get('values', {})
        self.effects = data.get('effects', {})
        self.modifiers = data.get('modifiers', {})
        self.opinion = data.get('opinion', {})
        self.stats = {'handled': {}, 'skipped': {}, 'unhandled': {}}
        self.expanded = {}

    def count(self, bucket, key):
        d = self.stats[bucket]
        d[key] = d.get(key, 0) + 1

    def name(self, *keys):
        """Original localisation of the first key that has one -> {zh, en} or None."""
        for k in keys:
            e = self.loc.get(k)
            if e and (e.get('zh') or e.get('en')):
                return {'zh': e.get('zh') or e.get('en'), 'en': e.get('en') or e.get('zh')}
        return None

    def stat(self, key):
        return self.name('mod_' + key, 'MOD_' + key.upper(), key, key.upper())


def load_ctx(path=None):
    p = Path(path) if path else ROOT / 'public/data/effects-data.json'
    return Ctx(json.loads(p.read_text(encoding='utf-8')))


def humanize(key):
    return re.sub(r'\s+', ' ', re.sub(r'^(?:event_target:|mod_|is_|has_)', '', str(key)).replace('_', ' ').replace(':', ' ')).strip()


def nm(ctx, key):
    """Readable name of a game object key: its localisation, else the humanised key (marked as an id)."""
    n = ctx.name(key, 'mod_' + key)
    return n if n else L(humanize(key), humanize(key))


# ------------------------------------------------------------------------------------------------- numbers ---
NUM = re.compile(r'^-?\d+(?:\.\d+)?$')


def to_num(v, ctx, depth=0):
    """Script value -> ('num', x) | ('range', lo, hi) | ('scaled', text)."""
    if isinstance(v, list):
        lo = next((x['v'] for x in v if x['k'] == 'min'), None)
        hi = next((x['v'] for x in v if x['k'] == 'max'), None)
        if lo is not None and hi is not None:
            a, b = to_num(lo, ctx, depth + 1), to_num(hi, ctx, depth + 1)
            if a[0] == 'num' and b[0] == 'num':
                return ('range', a[1], b[1])
        base = next((x['v'] for x in v if x['k'] == 'base'), None)
        return ('scaled', 'base ' + (base if isinstance(base, str) else '?') if base is not None else '{...}')
    v = str(v)
    if NUM.match(v):
        return ('num', float(v))
    if v.startswith('@') and v in ctx.vars:
        return ('num', float(ctx.vars[v]))
    m = re.match(r'^@\[(.+)\]$', v)
    if m:  # inline math with static variables: @[a * 2]
        expr = re.sub(r'@?[A-Za-z_]\w*', lambda t: ctx.vars.get('@' + t[0].lstrip('@'), t[0]), m[1])
        if re.fullmatch(r'[\d.\s+\-*/()]+', expr):
            try:
                return ('num', float(eval(expr, {'__builtins__': {}}, {})))  # noqa: S307 (digits and operators only)
            except Exception:
                pass
    if v.startswith('value:') and depth < 4:
        entry = ctx.values.get(v[6:])
        if entry:
            try:
                body = parse(entry['text'])[0]['v']
            except (ValueError, IndexError):
                body = None
            if isinstance(body, str):
                return to_num(body, ctx, depth + 1)
    return ('scaled', v)


def fmt(x, percent=False, signed=True):
    if percent:
        x = round(x * 100, 4)
    s = f'{x:+g}' if signed else f'{x:g}'
    return s + ('%' if percent else '')


def amount(num, percent=False, signed=True):
    """('num'|'range'|'scaled') -> (text, extra-dict)."""
    if num[0] == 'num':
        return fmt(num[1], percent, signed), {'value': num[1] * (100 if percent else 1), 'unit': 'percent' if percent else 'flat'}
    if num[0] == 'range':
        a, b = fmt(num[1], percent, signed), fmt(num[2], percent, False)
        return f'{a} ~ {b}', {'range': [num[1], num[2]], 'unit': 'percent' if percent else 'flat'}
    return None, {'scaled': True, 'unit': 'percent' if percent else 'flat', 'expression': num[1]}


SCALED = L('（数值由游戏按存档情况计算）', ' (scaled by the game)')
DUR_UNITS = (('days', 'day', '天'), ('months', 'month', '个月'), ('years', 'year', '年'))


def duration(params, ctx, default_permanent=True):
    for key, en, zh in DUR_UNITS:
        v = params.get(key)
        if v is not None:
            num = to_num(v, ctx)
            if num[0] == 'num':
                if num[1] < 0:
                    return 'permanent', L('永久', 'permanent')
                n = int(num[1]) if num[1] == int(num[1]) else num[1]
                return {key: n}, L(f'持续 {n} {zh}', f'for {n} {en}{"s" if n != 1 else ""}')
            return {'scaled': True}, L('持续时间由游戏计算', 'for a game-computed duration')
    return ('permanent', L('永久', 'permanent')) if default_permanent else (None, None)


def params_of(node):
    return {x['k']: x['v'] for x in node['v']} if isinstance(node['v'], list) else {}


# ------------------------------------------------------------------------------------------------ scopes ---
ROOT_SCOPE = {'country': L('我们的帝国', 'our empire'), 'ship': L('这艘舰船', 'this ship'), 'fleet': L('这支舰队', 'this fleet'),
              'planet': L('这颗星球', 'this planet'), 'leader': L('这位领袖', 'this leader'), 'system': L('这个星系', 'this system'),
              'pop': L('这些人口', 'this pop group')}
SCOPE_NAMES = {
    'owner': L('所属帝国', 'the owning empire'), 'controller': L('控制者', 'the controller'), 'space_owner': L('星系所属帝国', "the system's owner"),
    'from': L('事件来源方', 'the event source'), 'fromfrom': L('来源的来源方', 'the source of the source'),
    'prev': L('上一层对象', 'the previous scope'), 'capital_scope': L('首都星球', 'the capital planet'),
    'solar_system': L('所在星系', 'the solar system'), 'planet': L('所在星球', 'the planet'), 'leader': L('领袖', 'the leader'),
    'ruler': L('统治者', 'the ruler'), 'heir': L('继承人', 'the heir'), 'species': L('物种', 'the species'),
    'owner_species': L('所有者的物种', "the owner's species"), 'owner_main_species': L('主要物种', 'the main species'),
    'fleet': L('舰队', 'the fleet'), 'ship': L('舰船', 'the ship'), 'star': L('恒星', 'the star'), 'orbit': L('轨道天体', 'the orbited body'),
    'system': L('星系', 'the system'), 'capital': L('首都星球', 'the capital planet'), 'home_planet': L('母星', 'the home planet'),
    'federation': L('联邦', 'the federation'), 'overlord': L('宗主', 'the overlord'), 'patron': L('赞助者', 'the patron'),
    'last_created_ship': L('刚创建的舰船', 'the ship just created'), 'last_created_leader': L('刚创建的领袖', 'the leader just created'),
    'last_created_country': L('刚创建的帝国', 'the empire just created'), 'last_created_fleet': L('刚创建的舰队', 'the fleet just created'),
    'last_created_species': L('刚创建的物种', 'the species just created'), 'last_created_pop_group': L('刚创建的人口', 'the pop just created'),
    'original_owner': L('原所有者', 'the original owner'), 'target': L('目标对象', 'the target'),
    'explorer': L('探索者', 'the explorer'), 'closest_system': L('最近的星系', 'the closest system'),
    'starbase': L('星港', 'the starbase'), 'spynetwork': L('间谍网络', 'the spy network'),
    'observation_outpost_owner': L('观测前哨的所有者', 'the observation outpost owner'), 'contact_country': L('接触到的国家', 'the contacted country'),
    'colony': L('该殖民地', 'the colony'), 'observation_outpost': L('观测前哨', 'the observation outpost'),
    'exiled_leader': L('被放逐的领袖', 'the exiled leader'), 'dominant_species': L('主导物种', 'the dominant species'),
}
ITER = re.compile(r'^(every|random|ordered|weighted_random)_(.+)$')
FROMS = re.compile(r'^(from)+$')
TRIGGER_ONLY = re.compile(r'^(any|count)_')


def scope_label(key, ctx, root_scope):
    k = key.lower()
    if k in ('root', 'this'):
        return ROOT_SCOPE.get(root_scope, ROOT_SCOPE['country']) if k == 'root' else None
    if k in SCOPE_NAMES:
        return SCOPE_NAMES[k]
    if FROMS.match(k):
        return L('事件来源链上的对象', 'an object up the event-source chain')
    if k.startswith('event_target:'):
        return L('此前保存的对象', 'a target saved earlier')
    if k.startswith('global_event_target:'):
        return L('此前保存的对象', 'a target saved earlier')
    m = ITER.match(k)
    if m:
        noun = humanize(m[2])
        word = {'every': ('每一个', 'every '), 'random': ('随机一个', 'a random '), 'ordered': ('按顺序选取的', 'an ordered pick of '),
                'weighted_random': ('按权重随机一个', 'a weighted random ')}[m[1]]
        return L(f'{word[0]}{noun}', f'{word[1]}{noun}')
    parts = re.split(r'[.]', k)
    if len(parts) > 1:
        labels = [scope_label(p, ctx, root_scope) for p in parts]
        labels = [l for l in labels if l]
        if labels:
            return L(' 的 '.join(l['zh'] for l in reversed(labels)), ' of '.join(l['en'] for l in reversed(labels)))
    return None


# --------------------------------------------------------------------------------------------- conditions ---
FLAG_KEY = re.compile(r'^(has|is)_(\w+?)_flag$')


def atom_label(n, ctx):
    k, v = n['k'], n['v']
    low = k.lower()
    if isinstance(v, list):
        inner = cond_label(v, ctx)
        if low in ('and',):
            return inner
        scope = scope_label(k, ctx, 'country')
        if scope:
            return L(f"{scope['zh']}：{inner['zh']}", f"{scope['en']}: {inner['en']}")
        return L(f'{humanize(k)}：{inner["zh"]}', f'{humanize(k)}: {inner["en"]}')
    val = str(v)
    yes = val != 'no'
    obj = nm(ctx, val)
    if FLAG_KEY.match(low):
        return L(f'此前已设置标记「{val}」' if yes else f'未设置标记「{val}」', f'flag "{val}" is set' if yes else f'flag "{val}" is not set')
    table = {
        'has_trait': ('拥有特质「{o}」', 'has the "{o}" trait'), 'has_technology': ('已研究「{o}」', 'has researched "{o}"'),
        'has_ethic': ('信奉「{o}」', 'has the "{o}" ethic'), 'has_civic': ('拥有国民理念「{o}」', 'has the "{o}" civic'),
        'has_valid_civic': ('拥有国民理念「{o}」', 'has the "{o}" civic'), 'has_origin': ('起源为「{o}」', 'origin is "{o}"'),
        'has_authority': ('政体为「{o}」', 'authority is "{o}"'), 'has_government': ('政府为「{o}」', 'government is "{o}"'),
        'has_ascension_perk': ('拥有飞升天赋「{o}」', 'has the "{o}" ascension perk'),
        'has_tradition': ('拥有传统「{o}」', 'has the "{o}" tradition'), 'has_modifier': ('带有修正「{o}」', 'has the "{o}" modifier'),
        'has_deposit': ('带有资源点「{o}」', 'has the "{o}" deposit'), 'has_policy': ('已启用政策「{o}」', 'has the "{o}" policy'),
        'is_planet_class': ('星球类型为「{o}」', 'planet class is "{o}"'), 'is_species_class': ('物种类别为「{o}」', 'species class is "{o}"'),
        'has_special_project': ('进行着专项「{o}」', 'has the "{o}" special project'),
        'has_event_chain': ('正在进行事件链「{o}」', 'event chain "{o}" is active'),
        'is_star_class': ('恒星类型为「{o}」', 'star class is "{o}"'), 'has_resource': ('持有「{o}」', 'holds "{o}"'),
    }
    if low in table and not isinstance(v, list):
        a, b = table[low]
        t = (a.format(o=obj['zh']), b.format(o=obj['en']))
        return L(t[0] if yes else '不满足：' + t[0], t[1] if yes else 'not: ' + t[1])
    if low == 'always':
        return L('总是', 'always')
    if low.endswith('_dlc') or low in ('host_has_dlc', 'has_dlc'):
        dlc = humanize(re.sub(r'_dlc$', '', low)) if low.endswith('_dlc') else val.strip('"')
        return L(f'已安装「{dlc}」资料片' if yes else f'未安装「{dlc}」资料片', f'the {dlc} DLC is installed' if yes else f'the {dlc} DLC is not installed')
    if low == 'is_ai':
        return L('由电脑控制' if yes else '由玩家控制', 'controlled by the AI' if yes else 'controlled by a player')
    if low.startswith('is_') and val in ('yes', 'no'):
        return L(f'{humanize(k)}' if yes else f'不是 {humanize(k)}', f'{humanize(k)}' if yes else f'not {humanize(k)}')
    if low == 'exists':
        return L(f'存在目标 {val}' if yes else '目标不存在', f'{val} exists' if yes else f'{val} does not exist')
    op = n.get('op', '=')
    return L(f'{humanize(k)} {op} {humanize(val) if not NUM.match(val) else val}', f'{humanize(k)} {op} {humanize(val) if not NUM.match(val) else val}')


def cond_label(nodes, ctx, mode='and'):
    parts = []
    for n in nodes:
        k = n['k'].lower()
        if k in ('text', 'fail_text', 'success_text', 'desc', 'title', 'tooltip', 'custom_tooltip') and not isinstance(n['v'], list):
            continue
        if k == 'custom_tooltip' and isinstance(n['v'], list):
            t = next((x['v'] for x in n['v'] if x['k'] == 'text' and isinstance(x['v'], str)), None)
            if t and ctx.name(t):
                parts.append(ctx.name(t))
                continue
            parts.append(cond_label([x for x in n['v'] if x['k'] != 'text'], ctx))
            continue
        if k in ('not', 'nor') and isinstance(n['v'], list):
            inner = cond_label(n['v'], ctx, 'or' if k == 'nor' else 'and')
            parts.append(L('不满足（' + inner['zh'] + '）', 'not (' + inner['en'] + ')'))
        elif k == 'or' and isinstance(n['v'], list):
            inner = cond_label(n['v'], ctx, 'or')
            parts.append(L('（' + inner['zh'] + '）', '(' + inner['en'] + ')'))
        elif k in ('hidden_trigger', 'trigger', 'limit') and isinstance(n['v'], list):
            parts.append(cond_label(n['v'], ctx))
        elif isinstance(n['v'], list) and (k.startswith(('any_', 'count_')) or k in ('num_owned_planets',)):
            inner = cond_label([x for x in n['v'] if x['k'] not in ('count',)], ctx)
            parts.append(L(f'存在满足条件的 {humanize(k)}：{inner["zh"]}', f'there is a matching {humanize(k)}: {inner["en"]}'))
        else:
            parts.append(atom_label(n, ctx))
    parts = [p for p in parts if p and (p['zh'] or p['en'])]
    if not parts:
        return L('（条件见游戏脚本）', '(condition in the game script)')
    zh, en = (' 或 ', ' or ') if mode == 'or' else ('，且 ', ', and ')
    return L(zh.join(p['zh'] for p in parts), en.join(p['en'] for p in parts))


# ------------------------------------------------------------------------------------------------ walker ---
SKIP_EXACT = {  # bookkeeping: the story map already shows flags and event chaining
    'save_event_target_as', 'save_global_event_target_as', 'clear_global_event_target', 'clear_event_target',
    'country_event', 'ship_event', 'fleet_event', 'planet_event', 'system_event', 'pop_event', 'pop_group_event',
    'leader_event', 'situation_event', 'astral_rift_event', 'first_contact_event', 'espionage_operation_event',
    'starbase_event', 'carrier_event', 'observer_event', 'colony_event', 'agreement_event', 'bypass_event', 'pop_faction_event',
    'event', 'set_next_astral_rift_event', 'begin_event_chain', 'end_event_chain', 'add_event_chain_counter',
    'set_location', 'set_site_progress_locked', 'set_espionage_operation_progress_locked', 'create_message', 'show_notification',
    'show_message', 'add_timeline_event', 'set_name', 'set_graphical_culture', 'create_point_of_interest',
    'remove_point_of_interest', 'create_ambient_object', 'destroy_ambient_object', 'set_fleet_stance', 'set_hostile',
    'set_faction_hostility', 'break', 'set_variable', 'change_variable', 'set_variable_to', 'clear_variable', 'subtract_variable',
    'multiply_variable', 'divide_variable', 'round_variable', 'export_modifier_to_variable', 'set_timed_event_target',
    'set_first_contact_stage', 'set_situation_approach', 'destroy_archaeological_site', 'finish_astral_rift',
    'create_archaeological_site', 'set_event_locked', 'set_leader_designation', 'play_sound', 'enable_special_project_ui',
    'set_picture', 'change_dominant_species_portrait', 'announce_first_contact', 'establish_communications_no_message',
    'set_origin', 'set_last_created', 'tooltip_icon', 'set_ship_designs', 'sound',
    # UI / AI / scheduling plumbing and templates that are not outcomes the player reads
    'inline_script', 'fire_on_action', 'queue_actions', 'create_ship_design', 'set_aggro_range', 'set_aggro_range_measure_from',
    'assign_leader', 'auto_move_to_planet', 'set_saved_date', 'log', 'add_mission_counter', 'add_patron_objective_counter',
    'set_situation_locked', 'change_country_flag', 'last_created_ambient_object', 'add_global_ship_design', 'anomaly_event',
    'export_trigger_value_to_variable', 'export_resource_stockpile_to_variable', 'set_ruler', 'remove_all_leader_traits_flag',
    'set_starbase_size', 'set_starbase_module', 'remove_starbase_component', 'lock_storm_in_place', 'set_saved_target',
}
SKIP_RE = re.compile(r'^(?:set|remove|clear|toggle)_(?:timed_)?\w*?_?flag$|^set_\w+_flag$|^remove_\w+_flag$|^has_\w+_flag$')
PARAM_ONLY = {'weights', 'order_by', 'position', 'tag', 'use_bypasses', 'min_steps', 'max_steps', 'name', 'id', 'days', 'months', 'years', 'random', 'weight', 'chance', 'trigger', 'limit', 'ai_chance', 'icon',
              'picture', 'show_sound', 'allow', 'exclusive_trigger', 'response_text', 'custom_gui', 'is_dialog_only',
              'fail_text', 'success_text', 'desc', 'title', 'option_clear', 'hide_window', 'default_hide_option', 'sound',
              'factor', 'mult', 'min', 'max', 'tooltip', 'text'}
GROUP_KEYS = {'if', 'else_if', 'else', 'hidden_effect', 'random_list', 'random', 'while', 'switch', 'custom_tooltip', 'effect'}


class State:
    def __init__(self, text, file, base_line, scope, depth=0, hidden=False, target=None, via=None):
        self.text, self.file, self.base, self.scope, self.depth = text, file, base_line, scope, depth
        self.hidden, self.target, self.via = hidden, target, via

    def child(self, **kw):
        s = State(self.text, self.file, self.base, self.scope, self.depth, self.hidden, self.target, self.via)
        for k, v in kw.items():
            setattr(s, k, v)
        return s

    def source(self, node):
        if self.text is None or not self.file or 's' not in node:
            return self.file
        return f'{self.file}:{self.base + self.text.count(chr(10), 0, node["s"])}'


def entry(kind, label, node=None, st=None, **kw):
    e = {'kind': kind, 'label': label, **{k: v for k, v in kw.items() if v is not None}}
    if st:
        if st.target:
            e['target'] = st.target
        if st.hidden:
            e['hidden'] = True
        if st.via:
            e['via'] = st.via
        if node is not None and not st.via:
            e['source'] = st.source(node)
    return e


def describe_effects(nodes, text, ctx, scope='country', file=None, base_line=1, via=None, depth=0):
    """Effect entries of a block of effect nodes (option / immediate / on_success ...). See module docstring."""
    st = State(text, file, base_line, scope, depth, via=via)
    return _walk(nodes, ctx, st)


def _walk(nodes, ctx, st):
    out = []
    prev_if = None
    for n in nodes:
        k = n['k']
        low = k.lower()
        if not k or k in PARAM_ONLY and low not in ('random',):
            continue
        res = _node(n, ctx, st, prev_if)
        if low in ('if', 'else_if'):
            prev_if = res[0] if res else None
        elif low != 'else':
            prev_if = None
        out += res
    return merge_tech_chains(out)


def merge_tech_chains(entries):
    """add_tech_option_exclusive_effect called repeatedly = "the first of these technologies not yet known is given"."""
    out = []
    for e in entries:
        part = _exclusive_tech(e)
        if part and out and out[-1].get('kind') == 'tech_choice' and out[-1].get('target') == e.get('target') and out[-1].get('hidden') == e.get('hidden'):
            out[-1]['techs'] += part[0]
            out[-1]['names'] += part[1]
        elif part:
            out.append({'kind': 'tech_choice', 'techs': part[0], 'names': part[1], 'target': e.get('target'), 'hidden': e.get('hidden'),
                        'via': 'add_tech_option_exclusive_effect'})
        else:
            out.append(e)
    for e in out:
        if e.get('kind') == 'tech_choice':
            names = e['names']
            e['label'] = L('从下列科技中获得第一个尚未掌握的：' + '、'.join(n['zh'] for n in names[:8]) + ('…' if len(names) > 8 else ''),
                           'Gains the first of these technologies you do not know yet: ' + ', '.join(n['en'] for n in names[:8]) + ('…' if len(names) > 8 else ''))
            e['options'] = len(names)
            for k in [k for k, v in e.items() if v is None]:
                del e[k]
    return out


def _exclusive_tech(e):
    """-> ([tech keys], [name dicts]) for one add_tech_option_exclusive_effect entry (raw `if` or already merged)."""
    if e.get('kind') == 'tech_choice':
        return list(e['techs']), list(e['names'])
    if e.get('kind') == 'if' and e.get('via') == 'add_tech_option_exclusive_effect' and len(e.get('effects') or []) == 1:
        inner = e['effects'][0]
        if inner.get('kind') == 'technology' and inner.get('tech'):
            return [inner['tech']], [nm_cache(inner)]
    return None


def nm_cache(inner):
    m = re.search(r'"(.+)"', inner['label']['en'])
    z = re.search(r'「(.+)」', inner['label']['zh'])
    return L(z[1] if z else inner['tech'], m[1] if m else inner['tech'])


def _children(v, ctx, st):
    return _walk(v, ctx, st) if isinstance(v, list) else []


def _node(n, ctx, st, prev_if):
    k, v = n['k'], n['v']
    low = k.lower()
    handler = HANDLERS.get(low)
    if handler:
        res = handler(n, ctx, st)
        if res is not None:
            ctx.count('handled', low)
            return res
    if low in SKIP_EXACT or SKIP_RE.match(low) or NUM.match(low):
        ctx.count('skipped', 'weighted_event' if NUM.match(low) else low)
        return []
    if low == '?' and isinstance(v, list):
        ctx.count('handled', 'scope:?')
        return _walk(v, ctx, st)
    if low in GROUP_KEYS:
        return GROUP[low](n, ctx, st)
    if k in ctx.effects:  # scripted effect
        return scripted(n, ctx, st)
    if isinstance(v, list):
        # scope change: owner = { ... }, every_owned_planet = { limit ... }, event_target:x = { ... }
        sl = scope_label(k, ctx, st.scope)
        if sl is not None or low in ('this',):
            ctx.count('handled', 'scope:' + (ITER.sub(lambda m: m[1] + '_*', low) if ITER.match(low) else low.split(':')[0]))
            tgt = sl if sl and not (low == 'root' and st.scope == 'country') else st.target
            limit = next((x['v'] for x in v if x['k'] == 'limit' and isinstance(x['v'], list)), None)
            child = _walk([x for x in v if x['k'] != 'limit'], ctx, st.child(target=tgt))
            if limit is not None and child:
                return [entry('if', L('在满足条件的对象上：' + cond_label(limit, ctx)['zh'], 'On those matching: ' + cond_label(limit, ctx)['en']),
                              n, st, effects=child, when=cond_label(limit, ctx), scopeFilter=True)]
            return child
        if TRIGGER_ONLY.match(low) or low in ('trigger', 'potential'):
            return []
    if low in ('trigger', 'limit', 'potential', 'modifier', 'weight', 'ai_chance', 'allow'):
        return []
    # generic fallback: unknown effect key — kept, flagged, counted
    ctx.count('unhandled', low)
    return [entry('unhandled', L(f'（未整理的效果：{humanize(k)}）', f'(unprocessed effect: {humanize(k)})'), n, st, unhandled=True, key=k)]


# --------------------------------------------------------------------------------------------- group nodes ---
def g_if(n, ctx, st):
    v = n['v']
    if not isinstance(v, list):
        return []
    ctx.count('handled', n['k'].lower())
    limit = next((x['v'] for x in v if x['k'] == 'limit' and isinstance(x['v'], list)), [])
    kids = _walk([x for x in v if x['k'] != 'limit'], ctx, st)
    if n['k'].lower() == 'else':
        if not kids:
            return []
        return [entry('else', L('否则', 'Otherwise'), n, st, effects=kids, otherwise=True)]
    when = cond_label(limit, ctx)
    if not kids:
        return []
    return [entry('if', L('如果：' + when['zh'], 'If: ' + when['en']), n, st, effects=kids, when=when, conditional=True)]


def g_hidden(n, ctx, st):
    ctx.count('handled', 'hidden_effect')
    return _children(n['v'], ctx, st.child(hidden=True))


def g_random(n, ctx, st):
    v = n['v']
    if not isinstance(v, list):
        return []
    ctx.count('handled', 'random')
    chance = next((x['v'] for x in v if x['k'] == 'chance'), None)
    kids = _walk([x for x in v if x['k'] not in ('chance', 'modifier')], ctx, st)
    if not kids:
        return []
    num = to_num(chance, ctx) if chance is not None else None
    if num and num[0] == 'num':
        return [entry('random', L(f'有 {num[1]:g}% 的概率：', f'{num[1]:g}% chance:'), n, st, chance={'percent': num[1]}, effects=kids, conditional=True)]
    return [entry('random', L('有一定概率（概率由游戏计算）：', 'With a chance (computed by the game):'), n, st, chance={'scaled': True}, effects=kids, conditional=True)]


def g_random_list(n, ctx, st):
    v = n['v']
    if not isinstance(v, list):
        return []
    ctx.count('handled', 'random_list')
    options = []
    for x in v:
        if not isinstance(x['v'], list) or x['k'] in ('modifier',):
            continue
        w = to_num(x['k'], ctx)
        mods = any(y['k'] == 'modifier' for y in x['v'])
        kids = _walk([y for y in x['v'] if y['k'] != 'modifier'], ctx, st)
        options.append({'weight': w[1] if w[0] == 'num' else None, 'adjusted': mods, 'effects': kids, 'node': x})
    if not options or not any(o['effects'] for o in options):  # only event chaining / bookkeeping inside: nothing to show
        return []
    total = sum(o['weight'] for o in options if o['weight'] is not None)
    all_numeric = all(o['weight'] is not None for o in options)
    out = []
    for o in options:
        pct = round(o['weight'] / total * 100, 1) if all_numeric and total else None
        c = {'weight': o['weight'], 'of': total if all_numeric else None, 'percent': pct, 'adjusted': o['adjusted']}
        suffix_zh = f'（基础权重 {o["weight"]:g}/{total:g}' + ('，概率会被条件调整）' if o['adjusted'] else '）') if pct is not None else '（权重由游戏计算）'
        suffix_en = f' (base weight {o["weight"]:g} of {total:g}' + ('; chances adjusted by conditions)' if o['adjusted'] else ')') if pct is not None else ' (weight computed by the game)'
        out.append(entry('random_option', L(f'约 {pct:g}% 的概率' + suffix_zh if pct is not None else '一种可能' + suffix_zh,
                                             (f'About {pct:g}% chance' if pct is not None else 'One possible outcome') + suffix_en),
                         o['node'], st, chance={k: v2 for k, v2 in c.items() if v2 is not None}, effects=o['effects'], conditional=True))
    return [entry('random_list', L('以下结果之一随机发生：', 'One of these happens at random:'), n, st, effects=out, conditional=True)]


def g_while(n, ctx, st):
    v = n['v']
    if not isinstance(v, list):
        return []
    ctx.count('handled', 'while')
    count = next((x['v'] for x in v if x['k'] == 'count'), None)
    kids = _walk([x for x in v if x['k'] not in ('count', 'limit')], ctx, st)
    if not kids:
        return []
    num = to_num(count, ctx) if count is not None else None
    times = f'{num[1]:g} 次' if num and num[0] == 'num' else '若干次'
    timesen = f'{num[1]:g} times' if num and num[0] == 'num' else 'several times'
    return [entry('repeat', L(f'重复 {times}：', f'Repeated {timesen}:'), n, st, effects=kids, conditional=bool(not num or num[0] != 'num'))]


def g_switch(n, ctx, st):
    v = n['v']
    if not isinstance(v, list):
        return []
    ctx.count('handled', 'switch')
    var = next((x['v'] for x in v if x['k'] == 'trigger' and isinstance(x['v'], str)), '?')
    out = []
    for x in v:
        if x['k'] in ('trigger', 'fallback') or not isinstance(x['v'], list):
            continue
        kids = _walk(x['v'], ctx, st)
        if kids:
            label = L(f'如果 {humanize(var)} 为 {humanize(x["k"])}：', f'If {humanize(var)} is {humanize(x["k"])}:')
            out.append(entry('if', label, x, st, effects=kids, when=L(f'{humanize(var)} = {humanize(x["k"])}', f'{humanize(var)} = {humanize(x["k"])}'), conditional=True))
    return out


def g_tooltip(n, ctx, st):
    """custom_tooltip / tooltip: the game's own sentence for what happens."""
    v = n['v']
    key = v if isinstance(v, str) else next((x['v'] for x in v if x['k'] == 'text' and isinstance(x['v'], str)), None)
    kids = _walk([x for x in v if x['k'] != 'text'], ctx, st) if isinstance(v, list) else []
    name = ctx.name(key) if key else None
    if name and re.search(r'\$[^$]*\$', name['en'] + name['zh']):  # template with parameters filled in by the UI
        name = None
    ctx.count('handled', n['k'].lower())
    out = []
    if name:
        out.append(entry('tooltip', name, n, st, key=key, gameText=True))
    return out + kids if name else kids


def g_effect(n, ctx, st):  # `effect = { ... }` parameter blocks of create_fleet and similar
    return _children(n['v'], ctx, st) if isinstance(n['v'], list) else []


GROUP = {'if': g_if, 'else_if': g_if, 'else': g_if, 'hidden_effect': g_hidden, 'random': g_random, 'random_list': g_random_list,
         'while': g_while, 'switch': g_switch, 'custom_tooltip': g_tooltip, 'effect': g_effect}


# ------------------------------------------------------------------------------------------- scripted fx ---
def scripted(n, ctx, st):
    name = n['k']
    entry_def = ctx.effects[name]
    label = ctx.name(name) or L(humanize(name), humanize(name))
    ctx.count('handled', 'scripted_effect')
    if st.depth >= MAX_DEPTH:
        return [entry('scripted', label, n, st, name=name, truncated=True, unhandled=True)]
    body = entry_def['text']
    params = {x['k']: x['v'] for x in n['v']} if isinstance(n['v'], list) else {}
    cache_key = (name, tuple(sorted((k, v if isinstance(v, str) else '{}') for k, v in params.items())), st.scope)
    if cache_key in ctx.expanded and not any(isinstance(v, list) for v in params.values()):
        kids = json.loads(ctx.expanded[cache_key])
    else:
        text = body
        for key, val in params.items():
            if isinstance(val, str):
                text = text.replace(f'${key}$', val)
        text = re.sub(r'\$(\w+)\|([^$]*)\$', lambda m: params.get(m[1], m[2]) if isinstance(params.get(m[1], m[2]), str) else m[2], text)
        try:
            top = parse(text)
            block = top[0]['v'] if top and isinstance(top[0]['v'], list) else []
        except ValueError:
            block = []
        file, _, line = entry_def['source'].rpartition(':')
        kids = _walk(block, ctx, State(text, file, int(line), st.scope, st.depth + 1, st.hidden, st.target, name))
        if not any(isinstance(v, list) for v in params.values()):
            ctx.expanded[cache_key] = json.dumps(kids, ensure_ascii=False)
    # `via` marks the scripted effect an inner entry came from; inner entries keep their own hidden/target flags.
    if not kids:
        return []
    if not ctx.name(name):  # no game wording for the effect itself: show what it does, not its internal name
        for k in kids:
            k.setdefault('via', name)
        return kids
    return [entry('scripted', label, n, st, name=name, effects=kids, via=None)]


# ------------------------------------------------------------------------------------------ leaf handlers ---
def res_name(ctx, r):
    return ctx.name(r, r.upper()) or L(humanize(r), humanize(r))


def h_add_resource(n, ctx, st):
    if not isinstance(n['v'], list):
        return None
    out = []
    for x in n['v']:
        if x['k'] in ('mult', 'desc', 'show_message'):
            continue
        num = to_num(x['v'], ctx)
        txt, extra = amount(num)
        rn = res_name(ctx, x['k'])
        if txt is None:
            out.append(entry('resource', L(f'{rn["zh"]}{SCALED["zh"]}', f'{rn["en"]}{SCALED["en"]}'), n, st, resource=x['k'], **extra))
        else:
            out.append(entry('resource', L(f'{rn["zh"]} {txt}', f'{rn["en"]} {txt}'), n, st, resource=x['k'], **extra))
    return out


def h_monthly_mult(n, ctx, st):
    """add_monthly_resource_mult: a one-off gain of `value` x the empire's monthly income of the resource, clamped to
    min..max (the game's tooltip is "<Resource> Gained: N")."""
    p = params_of(n)
    if 'resource' not in p or 'value' not in p:
        return None
    rn = res_name(ctx, p['resource'])
    num = to_num(p['value'], ctx)
    lo = to_num(p['min'], ctx) if 'min' in p else None
    hi = to_num(p['max'], ctx) if 'max' in p else None
    bounds_zh = bounds_en = ''
    if lo and lo[0] == 'num':
        bounds_zh += f'，至少 {lo[1]:g}'
        bounds_en += f', at least {lo[1]:g}'
    if hi and hi[0] == 'num' and hi[1] < 1e6:
        bounds_zh += f'，至多 {hi[1]:g}'
        bounds_en += f', at most {hi[1]:g}'
    if num[0] == 'num':
        zh = f'获得{rn["zh"]}：相当于每月产出的 {num[1]:g} 倍{bounds_zh}'
        en = f'Gains {rn["en"]}: {num[1]:g}x your monthly income{bounds_en}'
        extra = {'monthlyMultiple': num[1]}
    else:
        zh = f'获得{rn["zh"]}{SCALED["zh"]}{bounds_zh}'
        en = f'Gains {rn["en"]}{SCALED["en"]}{bounds_en}'
        extra = {'scaled': True}
    return [entry('resource', L(zh, en), n, st, resource=p['resource'], unit='monthly-income-multiple', min=lo[1] if lo and lo[0] == 'num' else None,
                  max=hi[1] if hi and hi[0] == 'num' else None, **extra)]


def modifier_stats(ctx, name, mult=None):
    m = ctx.modifiers.get(name)
    if not m:
        return None
    stats = []
    for key, value in m['stats'].items():
        num = to_num(value, ctx)
        if num[0] != 'num':
            continue
        pct = key.endswith('_mult') or key.endswith('_percent')
        v = num[1] * (mult if mult is not None else 1)
        lab = ctx.stat(key) or L(humanize(key), humanize(key))
        stats.append({'stat': key, 'label': lab, 'value': v * (100 if pct else 1), 'unit': 'percent' if pct else 'flat',
                      'text': fmt(v, pct)})
    return stats


def h_add_modifier(n, ctx, st):
    p = params_of(n) if isinstance(n['v'], list) else {'modifier': n['v']}
    key = p.get('modifier')
    if not isinstance(key, str):
        return None
    d, dl = duration(p, ctx)
    mult = to_num(p['multiplier'], ctx) if 'multiplier' in p else None
    name = nm(ctx, key)
    stats = modifier_stats(ctx, key, mult[1] if mult and mult[0] == 'num' else None)
    label = L(f'获得修正「{name["zh"]}」，{dl["zh"]}', f'Gains the "{name["en"]}" modifier, {dl["en"]}')
    tip = ctx.modifiers.get(key, {}).get('stats', {}).get('custom_tooltip')
    note = ctx.name(tip) if isinstance(tip, str) else None
    return [entry('modifier', label, n, st, modifier=key, duration=d, stats=stats or None, name=name, note=note,
                  definition=ctx.modifiers.get(key, {}).get('source'))]


def h_remove_modifier(n, ctx, st):
    key = n['v'] if isinstance(n['v'], str) else params_of(n).get('modifier')
    if not isinstance(key, str):
        return None
    name = nm(ctx, key)
    return [entry('modifier_remove', L(f'移除修正「{name["zh"]}」', f'Removes the "{name["en"]}" modifier'), n, st, modifier=key)]


def h_trait(add, ruler=False):
    def f(n, ctx, st):
        key = n['v'] if isinstance(n['v'], str) else params_of(n).get('trait')
        if not isinstance(key, str):
            return None
        name = nm(ctx, key)
        zh = ('获得' if add else '失去') + f'特质「{name['zh']}」'
        en = ('Gains' if add else 'Loses') + f' the "{name["en"]}" trait'
        return [entry('trait' if add else 'trait_remove', L(zh, en), n, st, trait=key)]
    return f


def h_give_technology(n, ctx, st):
    p = params_of(n)
    key = p.get('tech')
    if not isinstance(key, str):
        return None
    name = nm(ctx, key)
    return [entry('technology', L(f'直接获得科技「{name["zh"]}」', f'Immediately learns the "{name["en"]}" technology'), n, st, tech=key)]


def h_tech_progress(n, ctx, st):
    p = params_of(n)
    key = p.get('tech')
    prog = to_num(p.get('progress', '0'), ctx)
    if not isinstance(key, str):
        return None
    name = nm(ctx, key)
    if prog[0] == 'num':
        pctxt = f'{prog[1] * 100:g}%'
        return [entry('technology', L(f'「{name["zh"]}」研究进度 +{pctxt}', f'"{name["en"]}" research progress +{pctxt}'), n, st, tech=key, value=prog[1] * 100, unit='percent')]
    return [entry('technology', L(f'「{name["zh"]}」研究进度提升{SCALED["zh"]}', f'"{name["en"]}" research progress increases{SCALED["en"]}'), n, st, tech=key, scaled=True)]


def h_research_option(n, ctx, st):
    key = n['v'] if isinstance(n['v'], str) else params_of(n).get('tech')
    if not isinstance(key, str):
        return None
    name = nm(ctx, key)
    return [entry('research', L(f'解锁研究选项「{name["zh"]}」', f'Adds "{name["en"]}" as a research option'), n, st, tech=key)]


def h_opinion(n, ctx, st):
    p = params_of(n)
    key = p.get('modifier')
    if not isinstance(key, str):
        return None
    op = ctx.opinion.get(key) or {}
    name = nm(ctx, key)
    num = to_num(op['opinion'], ctx) if op.get('opinion') else None
    amt = f' {fmt(num[1])}' if num and num[0] == 'num' else ''
    return [entry('opinion', L(f'对方对我方的态度修正「{name["zh"]}」{amt}', f'Opinion modifier "{name["en"]}"{amt}'), n, st, modifier=key,
                  value=num[1] if num and num[0] == 'num' else None, source_def=ctx.opinion.get(key, {}).get('source'))]


def h_create_ship(n, ctx, st):
    p = params_of(n)
    design = p.get('design')
    name = nm(ctx, design) if isinstance(design, str) else None
    which = f'「{name["zh"]}」' if name else ''
    whichen = f' "{name["en"]}"' if name else ''
    return [entry('ship', L(f'出现一艘新舰船{which}', f'A new ship appears{whichen}'), n, st, design=design if isinstance(design, str) else None)]


def h_create_fleet(n, ctx, st):
    if not isinstance(n['v'], list):
        return None
    kids = []
    for x in n['v']:
        if x['k'] == 'effect' and isinstance(x['v'], list):
            kids = _walk(x['v'], ctx, st)
    ships = [x for x in kids]
    return [entry('fleet', L('创建一支舰队', 'A new fleet is created'), n, st, effects=ships)] if ships else [entry('fleet', L('创建一支舰队', 'A new fleet is created'), n, st)]


def h_create_leader(n, ctx, st):
    p = params_of(n)
    cls = p.get('class')
    nme = ctx.name('job_' + cls, cls) if isinstance(cls, str) else None
    cl = nme or L(humanize(cls) if isinstance(cls, str) else '领袖', humanize(cls) if isinstance(cls, str) else 'a leader')
    return [entry('leader', L(f'出现一位新的领袖：{cl["zh"]}', f'A new leader appears: {cl["en"]}'), n, st, leaderClass=cls)]


def h_kill_leader(n, ctx, st):
    return [entry('leader', L('该领袖死亡', 'The leader dies'), n, st, removed=True)]


def h_kill_pop(n, ctx, st):
    return [entry('pop', L('一些人口被消灭', 'Population is killed'), n, st, removed=True)]


def h_create_pop(n, ctx, st):
    p = params_of(n) if isinstance(n['v'], list) else {}
    amt = to_num(p['size'], ctx) if 'size' in p else None
    txt = f' ×{amt[1]:g}' if amt and amt[0] == 'num' else ''
    return [entry('pop', L(f'新增人口{txt}', f'New pops appear{txt}'), n, st, added=True)]


def h_add_deposit(n, ctx, st):
    key = n['v'] if isinstance(n['v'], str) else params_of(n).get('deposit_type') or params_of(n).get('type')
    if not isinstance(key, str):
        return None
    name = nm(ctx, key)
    return [entry('deposit', L(f'新增资源点「{name['zh']}」', f'Adds the "{name["en"]}" deposit'), n, st, deposit=key)]


def h_clear_deposits(n, ctx, st):
    return [entry('deposit', L('清除该处的全部资源点', 'Clears all deposits here'), n, st, removed=True)]


def h_enable_project(n, ctx, st):
    p = params_of(n)
    key = p.get('name')
    if not isinstance(key, str):
        return None
    name = nm(ctx, key)
    return [entry('project', L(f'开启专项「{name["zh"]}」', f'Starts the "{name["en"]}" special project'), n, st, project=key)]


def h_specimen(n, ctx, st):
    key = params_of(n).get('key') if isinstance(n['v'], list) else n['v']
    if not isinstance(key, str):
        return None
    name = nm(ctx, key)
    return [entry('specimen', L(f'获得标本「{name["zh"]}」', f'Gains the "{name["en"]}" specimen'), n, st, specimen=key)]


def h_change_pc(n, ctx, st):
    key = n['v'] if isinstance(n['v'], str) else None
    if not key:
        return None
    name = nm(ctx, key)
    return [entry('planet', L(f'星球类型变为「{name["zh"]}」', f'Planet class becomes "{name["en"]}"'), n, st, planetClass=key)]


def h_devastation(n, ctx, st):
    num = to_num(n['v'], ctx)
    txt, extra = amount(num)
    if txt is None:
        return [entry('planet', L(f'星球遭受破坏{SCALED["zh"]}', f'Planet devastation{SCALED["en"]}'), n, st, **extra)]
    return [entry('planet', L(f'星球破坏程度 {txt}', f'Planet devastation {txt}'), n, st, **extra)]


def h_add_trust(n, ctx, st):
    p = params_of(n)
    num = to_num(p.get('amount', '0'), ctx)
    txt, extra = amount(num)
    return [entry('opinion', L(f'信任度 {txt}' if txt else f'信任度变化{SCALED["zh"]}', f'Trust {txt}' if txt else f'Trust changes{SCALED["en"]}'), n, st, **extra)]


def h_set_owner(n, ctx, st):
    return [entry('planet', L('所有权发生转移', 'Ownership changes'), n, st)]


def h_tech_option(n, ctx, st):
    return [entry('research', L('获得一个新的研究选项（由游戏按条件选择）', 'Adds a new research option (picked by the game from its conditions)'), n, st)]


def h_destroy(n, ctx, st):
    return [entry('generic', L('该对象被摧毁', 'The target is destroyed'), n, st, removed=True)]


def h_add_x(kind, zh, en):
    def f(n, ctx, st):
        num = to_num(n['v'], ctx)
        txt, extra = amount(num)
        if txt is None:
            return [entry(kind, L(f'{zh}变化{SCALED["zh"]}', f'{en} changes{SCALED["en"]}'), n, st, **extra)]
        return [entry(kind, L(f'{zh} {txt}', f'{en} {txt}'), n, st, **extra)]
    return f


def first_obj(n, keys=('type', 'building', 'deposit', 'key', 'name', 'policy', 'tech', 'ethic', 'contract', 'initializer', 'civic', 'species', 'district', 'district_type')):
    if isinstance(n['v'], str):
        return n['v']
    if isinstance(n['v'], list):
        p = params_of(n)
        return next((p[k] for k in keys if isinstance(p.get(k), str)), None)
    return None


SIMPLE_OBJ = {  # key: (kind, zh with {o}, en with {o}, zh/en without an object)
    'add_building': ('building', '建造「{o}」', 'Builds "{o}"'), 'remove_building': ('building', '拆除「{o}」', 'Removes the "{o}" building'),
    'add_district': ('planet', '新增区划「{o}」', 'Adds the "{o}" district'), 'add_relic': ('relic', '获得遗珍「{o}」', 'Gains the "{o}" relic'),
    'shift_ethic': ('ethic', '信仰向「{o}」偏移', 'Ethics shift toward "{o}"'),
    'complete_crisis_objective': ('project', '完成天灾目标「{o}」', 'Completes the crisis objective "{o}"'),
    'remove_deposit': ('deposit', '移除资源点「{o}」', 'Removes the "{o}" deposit'), 'set_deposit': ('deposit', '资源点变为「{o}」', 'Deposit becomes "{o}"'),
    'add_blocker': ('deposit', '新增阻挡物「{o}」', 'Adds the "{o}" blocker'),
    'start_situation': ('project', '开启情势「{o}」', 'Starts the "{o}" situation'),
    'issue_contract': ('project', '发出契约「{o}」', 'Issues the "{o}" contract'),
    'spawn_system': ('planet', '生成一个新星系「{o}」', 'Spawns a new system ("{o}")'),
    'create_army': ('army', '出现一支陆军「{o}」', 'An army appears ("{o}")'),
    'change_species': ('pop', '物种变为「{o}」', 'Species becomes "{o}"'),
    'spawn_megastructure': ('planet', '生成巨型建筑「{o}」', 'Spawns the "{o}" megastructure'),
    'set_policy': ('policy', '政策「{o}」被改变', 'Policy "{o}" is changed'),
}
SIMPLE_PLAIN = {  # no object name in the sentence
    'exile_leader_as': ('leader', '该领袖被放逐', 'The leader is exiled'), 'destroy_situation': ('project', '该情势被终止', 'The situation is ended'),
    'create_species': ('pop', '出现一个新物种', 'A new species appears'), 'create_country': ('generic', '出现一个新的国家', 'A new country appears'),
    'create_starbase': ('planet', '建成一座星港', 'A starbase is built'), 'clone_leader': ('leader', '该领袖被复制', 'The leader is cloned'),
    'delete_fleet': ('fleet', '该舰队被移除', 'The fleet is removed'), 'abort_special_project': ('project', '专项被中止', 'The special project is aborted'),
    'remove_pop_amount': ('pop', '人口减少', 'Population decreases'), 'change_government': ('generic', '政府形态发生变化', "The government's authority or civics change"),
    'destroy_espionage_operation': ('generic', '间谍行动被终止', 'The espionage operation ends'),
}
SIMPLE_PLAIN.update({
    'destroy_espionage_asset': ('generic', '一名间谍资产被消灭', 'An espionage asset is lost'),
    'create_espionage_asset': ('generic', '获得一名间谍资产', 'An espionage asset is gained'),
    'spawn_planet': ('planet', '出现一颗新的天体', 'A new celestial body appears'),
    'add_spy_network_level': ('generic', '间谍网络等级提升', 'The spy network level increases'),
    'add_hyperlane': ('planet', '新增一条超空间航道', 'A hyperlane is added'),
    'set_subject_of': ('generic', '成为另一方的附庸', 'Becomes a subject of another empire'),
    'remove_starbase_building': ('building', '拆除星港建筑', 'A starbase building is removed'),
    'remove_starbase_module': ('building', '拆除星港模块', 'A starbase module is removed'),
    'remove_megastructure': ('planet', '拆除巨型建筑', 'The megastructure is removed'),
    'remove_all_buildings': ('building', '拆除全部建筑', 'All buildings are removed'),
    'change_species_characteristics': ('trait', '物种特征被改变', "The species' characteristics change"),
    'remove_planet': ('planet', '该天体被移除', 'The body is removed'),
    'reduce_hp_percent': ('ship', '舰船受损', 'The ship takes damage'),
    'clear_blockers': ('deposit', '清除阻挡物', 'Blockers are cleared'),
    'remove_opinion_modifier': ('opinion', '移除一项态度修正', 'An opinion modifier is removed'),
    'prevent_anomaly': ('generic', '该处不会再出现异常现象', 'Anomalies no longer appear here'),
    'add_anomaly': ('generic', '出现一处异常现象', 'An anomaly appears'),
    'enable_patron_first_contact_project': ('project', '开启一个首次接触专项', 'Starts a first-contact project'),
    'change_planet_size': ('planet', '星球尺寸改变', 'The planet size changes'),
    'change_dominant_species': ('pop', '主导物种改变', 'The dominant species changes'),
    'kill_pop_group': ('pop', '一部分人口被消灭', 'Part of the population is killed'),
    'set_leader': ('leader', '指派新的统治者', 'A new ruler is set'),
    'force_add_civic': ('generic', '获得一项国民理念', 'Gains a civic'),
    'force_remove_civic': ('generic', '失去一项国民理念', 'Loses a civic'),
    'country_add_ethic': ('ethic', '获得一项信仰', 'Gains an ethic'),
    'set_country_type': ('generic', '国家类型改变', 'The country type changes'),
    'declare_war': ('generic', '宣战', 'A war is declared'),
    'establish_contact': ('generic', '建立联系', 'Contact is established'),
    'spawn_natural_wormhole': ('planet', '出现一个天然虫洞', 'A natural wormhole appears'),
    'spawn_random_storm': ('planet', '出现一场风暴', 'A storm appears'),
    'set_council_position': ('leader', '指派议会职位', 'A council position is assigned'),
    'create_mining_station': ('building', '建成一座采矿站', 'A mining station is built'),
    'set_controller': ('planet', '控制权转移', 'Control changes hands'),
    'add_random_research_option': ('research', '获得一个随机研究选项', 'Adds a random research option'),
    'add_stage_modifier': ('modifier', '为勘探阶段添加修正', 'Adds a stage modifier'),
    'unassign_leader': ('leader', '该领袖被解除职务', 'The leader is unassigned'),
})
SKIP_EXACT.update({
    'set_surveyed', 'set_visited', 'set_disabled', 'set_age', 'clear_fleet_actions', 'set_formation_scale', 'set_fleet_bombardment_stance',
    'set_policy_cooldown', 'set_planet_entity', 'set_mia', 'change_leader_portrait', 'advanced_authority_refresh', 'reset_event_chain_counter',
    'ignore_country_gfx', 'gfx', 'effect_name', 'script', 'events', 'ai_trade_facility', 'set_update_modifiers_batch',
    'complete_tutorial_step', 'expire_site_event', 'enable_mission', 'add_skill_without_trait_selection', 'inverted_switch',
    'set_citizenship_type', 'change_background_job', 'add_zone',
})
SIMPLE_NUM = {  # key: (kind, zh, en)
    'add_experience': ('leader', '领袖经验', 'Leader experience'), 'add_stage_clues': ('project', '勘探线索', 'Excavation clues'),
    'add_awareness': ('generic', '觉察度', 'Awareness'), 'add_situation_progress': ('project', '情势进度', 'Situation progress'),
    'add_intel': ('generic', '情报', 'Intel'), 'add_cohesion': ('generic', '联邦凝聚力', 'Federation cohesion'),
}


def h_simple_obj(key):
    kind, zh, en = SIMPLE_OBJ[key]

    def f(n, ctx, st):
        o = first_obj(n)
        if not o:
            return None
        name = nm(ctx, o)
        return [entry(kind, L(zh.format(o=name['zh']), en.format(o=name['en'])), n, st, object=o)]
    return f


def h_simple_plain(key):
    kind, zh, en = SIMPLE_PLAIN[key]
    return lambda n, ctx, st: [entry(kind, L(zh, en), n, st)]


def h_simple_num(key):
    kind, zh, en = SIMPLE_NUM[key]

    def f(n, ctx, st):
        v = n['v'] if not isinstance(n['v'], list) else params_of(n).get('amount')
        if v is None:
            return None
        txt, extra = amount(to_num(v, ctx))
        return [entry(kind, L(f'{zh} {txt}', f'{en} {txt}') if txt else L(f'{zh}变化{SCALED["zh"]}', f'{en} changes{SCALED["en"]}'), n, st, **extra)]
    return f


def h_modify_species(n, ctx, st):
    p = n['v'] if isinstance(n['v'], list) else []
    out = []
    for x in p:
        if x['k'] in ('add_trait', 'remove_trait') and isinstance(x['v'], str):
            name = nm(ctx, x['v'])
            add = x['k'] == 'add_trait'
            out.append(entry('trait' if add else 'trait_remove', L(('该物种获得' if add else '该物种失去') + f'特质「{name["zh"]}」',
                                                                  ('The species gains' if add else 'The species loses') + f' the "{name["en"]}" trait'), x, st, trait=x['v']))
    return out or [entry('pop', L('该物种的特质被改变', 'The species is modified'), n, st)]


def h_attunement(n, ctx, st):
    out = []
    for x in n['v'] if isinstance(n['v'], list) else []:
        name = nm(ctx, x['k'])
        out.append(entry('generic', L(f'与「{name["zh"]}」的共鸣度增加', f'Attunement with "{name["en"]}" increases'), x, st, attunement=x['k']))
    return out or None


def h_pop_ethic(n, ctx, st):
    p = params_of(n)
    if not isinstance(p.get('ethic'), str):
        return None
    name = nm(ctx, p['ethic'])
    amt = to_num(p['amount'], ctx) if 'amount' in p else (to_num(p['percentage'], ctx) if 'percentage' in p else None)
    tail = f' {amt[1]:g}' if amt and amt[0] == 'num' else ''
    return [entry('pop', L(f'人口转向信仰「{name["zh"]}」{tail}', f'Pops shift to the "{name["en"]}" ethic{tail}'), n, st, ethic=p['ethic'])]


def h_set_policy(n, ctx, st):
    p = params_of(n) if isinstance(n['v'], list) else {}
    pol, opt = p.get('policy'), p.get('option')
    if not isinstance(pol, str):
        return None
    pn = nm(ctx, pol)
    on = nm(ctx, opt) if isinstance(opt, str) else None
    return [entry('policy', L(f'政策「{pn["zh"]}」设为' + (f'「{on["zh"]}」' if on else '新选项'), f'Policy "{pn["en"]}" is set to ' + (f'"{on["en"]}"' if on else 'a new option')), n, st, policy=pol)]


def h_tooltip_params(n, ctx, st):
    # UI scaffolding: tooltip templates whose numbers the interface fills in (archaeology roll tables etc.)
    ctx.count('skipped', 'custom_tooltip_with_params')
    return []


def h_locked_random(n, ctx, st):
    return g_random_list(n, ctx, st)


def h_create_leader_flat(n, ctx, st):
    return h_create_leader(n, ctx, st)


HANDLERS = {
    'add_resource': h_add_resource, 'add_monthly_resource_mult': h_monthly_mult, 'add_modifier': h_add_modifier,
    'remove_modifier': h_remove_modifier, 'add_trait': h_trait(True), 'add_trait_ruler': h_trait(True),
    'remove_trait': h_trait(False), 'remove_trait_ruler': h_trait(False), 'give_technology': h_give_technology,
    'add_tech_progress': h_tech_progress, 'add_research_option': h_research_option, 'add_opinion_modifier': h_opinion,
    'create_ship': h_create_ship, 'create_fleet': h_create_fleet, 'create_leader': h_create_leader, 'kill_leader': h_kill_leader,
    'kill_single_pop': h_kill_pop, 'kill_pop': h_kill_pop, 'create_pop_group': h_create_pop, 'add_deposit': h_add_deposit,
    'clear_deposits': h_clear_deposits, 'enable_special_project': h_enable_project, 'give_specimen': h_specimen,
    'change_pc': h_change_pc, 'add_planet_devastation': h_devastation, 'add_trust': h_add_trust, 'set_owner': h_set_owner,
    'add_tech_option_or_research_effect': h_tech_option, 'destroy_country': h_destroy, 'destroy_fleet': h_destroy,
    'destroy_colony': h_destroy, 'destroy_planet': h_destroy, 'destroy_ship': h_destroy, 'destroy_pop': h_kill_pop,
    'modify_species': h_modify_species, 'add_attunement': h_attunement, 'pop_force_add_ethic': h_pop_ethic, 'set_policy': h_set_policy,
    'custom_tooltip_with_params': h_tooltip_params, 'locked_random_list': h_locked_random,
}
SIMPLE_PLAIN.update({
    'country_remove_ethic': ('ethic', '失去一项信仰', 'Loses an ethic'), 'remove_relic': ('relic', '失去一件遗珍', 'Loses a relic'),
    'copy_random_tech_from': ('technology', '随机习得对方已有的一项科技', 'Learns a random technology from the other party'),
    'copy_techs_from': ('technology', '习得对方已有的科技', 'Learns technologies from the other party'),
    'delete_ship': ('ship', '该舰船被移除', 'The ship is removed'), 'damage_ship': ('ship', '舰船受损', 'The ship takes damage'),
    'ruin_building': ('building', '建筑沦为废墟', 'The building is ruined'), 'set_capital': ('planet', '该星球成为首都', 'The planet becomes the capital'),
    'clear_planet_modifiers': ('modifier', '清除星球上的修正', 'Planet modifiers are cleared'),
    'abort_situation': ('project', '该情势被中止', 'The situation is aborted'), 'join_alliance': ('generic', '加入一个联盟', 'Joins an alliance'),
    'remove_patron': ('generic', '解除赞助关系', 'The patron relationship ends'), 'add_claims': ('planet', '获得领土宣称', 'Gains territorial claims'),
    'create_army_transport': ('army', '出现一艘陆军运输舰', 'An army transport appears'), 'remove_army': ('army', '陆军被移除', 'An army is removed'),
    'clear_blocker': ('deposit', '清除阻挡物', 'A blocker is cleared'), 'dismantle': ('generic', '设施被拆除', 'The installation is dismantled'),
    'refuse_covenant': ('generic', '拒绝契约', 'Refuses the covenant'), 'accept_covenant': ('generic', '接受契约', 'Accepts the covenant'),
    'establish_communications': ('generic', '建立通讯', 'Communications are established'),
    'create_research_station': ('building', '建成一座研究站', 'A research station is built'),
    'create_balanced_fleet': ('fleet', '创建一支舰队', 'A new fleet is created'), 'cancel_contract': ('project', '取消契约', 'A contract is cancelled'),
    'set_planet_size': ('planet', '星球尺寸改变', 'The planet size changes'), 'set_star_class': ('planet', '恒星类型改变', 'The star class changes'),
    'change_background_ethic': ('ethic', '人口的信仰倾向改变', "The pops' ethic leanings change"),
    'kill_assigned_pop_amount': ('pop', '一些在岗人口被消灭', 'Some assigned pops are killed'),
})
SIMPLE_NUM.update({
    'add_favors': ('opinion', '恩惠', 'Favors'), 'add_threat': ('generic', '威胁值', 'Threat'), 'add_loyalty': ('generic', '忠诚度', 'Loyalty'),
    'add_federation_experience': ('generic', '联邦经验', 'Federation experience'), 'add_static_war_exhaustion': ('generic', '战争疲劳', 'War exhaustion'),
    'set_awareness': ('generic', '觉察度设为', 'Awareness set to'), 'add_intel_report': ('generic', '情报报告', 'Intel reports'),
})
SKIP_EXACT.update({
    'set_crisis_sound', 'stop_crisis_sound', 'refresh_auto_generated_ship_designs', 'set_agreement_terms', 'set_agreement_preset',
    'reroll_random', 'set_variable_to_random_value', 'floor_variable', 'log_error', 'set_spawn_system_batch', 'enable_on_market',
    'set_resource_converter', 'add_seen_bypass_type', 'auto_follow_fleet', 'set_disable_at_health', 'add_ship_design',
    'export_resource_income_to_variable', 'set_patron_first_contact_state', 'set_pre_ftl_age', 'set_immortal', 'reroll_deposits',
    'set_planet_purge_type', 'clear_planet_purge_type', 'set_living_standard', 'set_council_position_to_council',
    'remove_notification_modifier', 'add_notification_modifier', 'complex_trigger_modifier', 'set_federation_type',
    'set_federation_law', 'last_created_system', 'orbital_station', 'mining_station', 'set_attunement', 'prevprev', 'country_list_tooltip'})
for _k in SIMPLE_OBJ:
    if _k != 'set_policy':
        HANDLERS[_k] = h_simple_obj(_k)
for _k in SIMPLE_PLAIN:
    HANDLERS[_k] = h_simple_plain(_k)
for _k in SIMPLE_NUM:
    HANDLERS[_k] = h_simple_num(_k)


# -------------------------------------------------------------------------------------------- records ---
SECTION_LABELS = {
    'immediate': L('立即发生', 'Immediately'), 'after': L('事件结束后', 'After the event'),
    'on_success': L('成功时', 'On success'), 'on_fail': L('失败时', 'On failure'), 'on_start': L('开始时', 'When it starts'),
    'on_spawn': L('生成时', 'When it appears'), 'on_roll_failed': L('检定失败时', 'When the roll fails'),
    'on_cancel': L('取消时', 'When cancelled'), 'on_abort': L('中止时', 'When aborted'),
    'on_progress_complete': L('进度完成时', 'When progress completes'), 'on_monthly': L('每月', 'Every month'),
    'on_visible': L('显现时', 'When it becomes visible'), 'on_create': L('创建时', 'When created'),
    'on_select': L('选定时', 'When chosen'), 'on_progress_25': L('进度 25% 时', 'At 25% progress'),
    'on_progress_50': L('进度 50% 时', 'At 50% progress'), 'on_progress_75': L('进度 75% 时', 'At 75% progress'),
}
EVENT_SCOPE = {'country_event': 'country', 'observer_event': 'country', 'event': 'country', 'ship_event': 'ship', 'fleet_event': 'fleet',
               'planet_event': 'planet', 'colony_event': 'planet', 'pop_event': 'pop', 'pop_group_event': 'pop', 'leader_event': 'leader',
               'system_event': 'system', 'starbase_event': 'planet', 'situation_event': 'country', 'first_contact_event': 'country'}
MODIFIER_BLOCKS = ('modifier', 'triggered_target_modifier', 'triggered_modifier', 'target_modifier')


def _static_effects(nodes, ctx, st, n):
    """Situation approach / stage modifier stats: planet or country modifiers the game applies while it is active."""
    out = []
    for x in nodes:
        if x['k'] in MODIFIER_BLOCKS and isinstance(x['v'], list):
            pot = next((y['v'] for y in x['v'] if y['k'] == 'potential' and isinstance(y['v'], list)), None)
            for y in x['v']:
                if y['k'] in ('potential', 'mult', 'desc', 'key') or not isinstance(y['v'], str):
                    continue
                num = to_num(y['v'], ctx)
                if num[0] != 'num':
                    continue
                pct = y['k'].endswith(('_mult', '_percent'))
                lab = ctx.stat(y['k']) or L(humanize(y['k']), humanize(y['k']))
                e = entry('modifier', L(f'{lab["zh"]} {fmt(num[1], pct)}', f'{lab["en"]} {fmt(num[1], pct)}'), y, st, stat=y['k'],
                          value=num[1] * (100 if pct else 1), unit='percent' if pct else 'flat', duration=None, whileActive=True)
                if pot:
                    w = cond_label(pot, ctx)
                    e['when'] = w
                    e['conditional'] = True
                out.append(e)
        elif x['k'] == 'resources' and isinstance(x['v'], list):
            for part in (y for y in x['v'] if isinstance(y['v'], list) and y['k'] in ('produces', 'upkeep')):
                for r in part['v']:
                    if isinstance(r['v'], str):
                        num = to_num(r['v'], ctx)
                        if num[0] == 'num':
                            amt = num[1] if part['k'] == 'produces' else -num[1]
                            rn = res_name(ctx, r['k'])
                            out.append(entry('resource', L(f'每月{rn["zh"]} {fmt(amt)}', f'Monthly {rn["en"]} {fmt(amt)}'), r, st, resource=r['k'],
                                             value=amt, unit='flat', monthly=True, whileActive=True))
    return out


def describe_record(record, ctx):
    """{'doc': {'immediate': [...], 'after': [...], 'sections': [{id,label,effects}]} | None, 'choices': [[...]|None, ...]}"""
    text, file = record['script'], record['source']
    base_line = record.get('line', 1)
    kind = record['kind']
    scope = EVENT_SCOPE.get(kind, 'country')
    try:
        top = parse(text)
    except ValueError:
        return {'doc': None, 'choices': [None] * len(record['options']), 'error': 'unparsed'}
    body = top[0]['v'] if top and isinstance(top[0]['v'], list) else []
    st = State(text, file, base_line, scope)

    def run(nodes, scope_override=None):
        return trim(_walk(nodes, ctx, st.child(scope=scope_override or scope)))
    doc = {}
    sections = []
    if kind.endswith('event') or kind == 'event':
        for key in ('immediate', 'after'):
            blocks = [x['v'] for x in body if x['k'] == key and isinstance(x['v'], list)]
            effects = [e for b in blocks for e in run(b)]
            if effects:
                doc[key] = effects
        option_nodes = [x['v'] for x in body if x['k'] == 'option' and isinstance(x['v'], list)]
        choices = []
        for i, o in enumerate(record['options']):
            if len(option_nodes) == len(record['options']):
                eff = run(option_nodes[i])
            else:  # inherited options (base event): script only, no line numbers
                try:
                    eff = trim(describe_effects(parse(o['script']), None, ctx, scope, file=record['source']))
                except ValueError:
                    eff = []
            choices.append(eff or None)
        return {'doc': doc or None, 'choices': choices}
    # non-event definitions: sections per kind
    names = ('on_spawn', 'on_success', 'on_fail', 'on_start', 'on_cancel', 'on_abort', 'on_progress_complete', 'on_monthly',
             'on_roll_failed', 'on_visible', 'on_create', 'on_progress_25', 'on_progress_50', 'on_progress_75')
    sscope = {'special_projects': EVENT_SCOPE.get(next((x['v'] for x in body if x['k'] == 'event_scope'), ''), 'country')}.get(kind, 'country')
    for x in body:
        if x['k'] in names and isinstance(x['v'], list):
            eff = run(x['v'], sscope)
            if eff:
                sections.append({'id': x['k'], 'label': SECTION_LABELS[x['k']], 'effects': eff})
        elif x['k'] in ('approach',) and isinstance(x['v'], list):
            key = next((y['v'] for y in x['v'] if y['k'] == 'name' and isinstance(y['v'], str)), '')
            nme = nm(ctx, key)
            eff = []
            for y in x['v']:
                if y['k'] == 'on_select' and isinstance(y['v'], list):
                    eff += run(y['v'], sscope)
            eff += _static_effects(x['v'], ctx, st, x)
            if eff:
                sections.append({'id': 'approach:' + key, 'label': L(f'方针「{nme["zh"]}」', f'Approach "{nme["en"]}"'), 'effects': eff, 'approach': key})
        elif x['k'] in ('stage', 'stages') and isinstance(x['v'], list):
            blocks = [x] if x['k'] == 'stage' else [y for y in x['v'] if isinstance(y['v'], list)]
            for b in blocks:
                eff = []
                for y in b['v']:
                    if y['k'] in names and isinstance(y['v'], list):
                        eff += run(y['v'], sscope)
                eff += _static_effects(b['v'], ctx, st, b)
                if eff:
                    sections.append({'id': 'stage:' + b['k'], 'label': L('阶段效果', 'Stage effects'), 'effects': eff})
    stat = _static_effects(body, ctx, st, None) if kind == 'situations' else []
    if stat:
        sections.append({'id': 'while_active', 'label': L('情势持续期间', 'While the situation lasts'), 'effects': stat})
    return {'doc': {'sections': sections} if sections else None, 'choices': []}


BUDGET = 60


def trim(effects, budget=BUDGET):
    """Keep the first `budget` leaf entries (document order); say how many were left out."""
    left = [budget]
    omitted = [0]

    def go(items):
        out = []
        for e in items:
            if e.get('effects'):
                kids = go(e['effects'])
                if kids:
                    out.append({**e, 'effects': kids})
            elif left[0] > 0:
                left[0] -= 1
                out.append(e)
            else:
                omitted[0] += 1
        return out
    res = go(effects or [])
    if omitted[0]:
        res.append({'kind': 'more', 'omitted': omitted[0],
                    'label': L(f'……另有 {omitted[0]} 项效果未列出（见游戏脚本）', f'... and {omitted[0]} more effects not listed (see the game script)')})
    return res


def count_leaves(effects):
    n = 0
    for e in effects or []:
        n += 1 if not e.get('effects') else count_leaves(e['effects'])
    return n


def flat(effects):
    for e in effects or []:
        yield e
        yield from flat(e.get('effects'))
