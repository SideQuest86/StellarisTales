"""Whole-game call graph: who fires which event/project/site/situation/chain, and how.

Unlike `extract.links`, this indexes *every* definition under `events/` and `common/` (on_actions, anomaly
categories, decisions, technologies, relics, initializers, ...), so story roots and triggers come from the game
itself. Every call site keeps its structural context: the option / immediate / after / stage hook it sits in,
if-limit conditions, random_list / random_events / anomaly outcome weights and delays. Scripted effects are expanded
with their parameters and attributed to the caller (with the effect name kept in the path).

The graph is evidence for review, not a simulation: conditions stay as original script snippets.
"""
from __future__ import annotations
import collections, re
from extract import parse, walk, first, raw

EVENT_KEY = re.compile(r'^(?:[a-z_]+_)?event$')
EVENT_ID = re.compile(r'^[A-Za-z_][\w]*\.[\w]+$')
REFERENCES = {  # effect -> (target namespace, field holding the key when the value is a block)
    'enable_special_project': ('special_projects', 'name'),
    'create_archaeological_site': ('archaeological_site_types', 'type'),
    'start_situation': ('situations', 'type'),
    'create_situation': ('situations', 'type'),
    'begin_event_chain': ('event_chains', 'event_chain'),
    'create_astral_rift': ('astral_rifts', 'type'),
    'fire_on_action': ('on_actions', 'on_action'),
}
HOOKS = {'immediate', 'after', 'on_success', 'on_fail', 'on_start', 'on_abort', 'on_spawn', 'on_first_enter',
         'on_enter', 'on_exit', 'on_progress_complete', 'on_fail_complete', 'on_monthly', 'on_select', 'on_complete',
         'on_built', 'on_build_complete', 'on_build_start', 'on_destroy', 'on_enabled', 'on_researched', 'effect',
         'active_effect', 'on_roll_failed', 'on_activate', 'on_unlock', 'on_queued', 'on_unqueued', 'on_finish',
         'on_success_effect', 'on_create', 'on_expire', 'on_destroyed'}
DELAY = ('days', 'months', 'years', 'random', 'random_days')


def definition_id(name, node, events_file):
    """Stable identity of a top-level definition; None for variables / non-definitions."""
    k, v = node['k'], node['v']
    if not isinstance(v, list) or not k or k.startswith('@'):
        return None, None
    if events_file:
        if not EVENT_KEY.match(k):
            return None, None
        rid = first(v, 'id')
        return (rid, k) if isinstance(rid, str) and rid else (None, None)
    folder = name.split('/', 1)[1].rsplit('/', 1)[0]  # e.g. special_projects, governments/civics
    key = first(v, 'key') if k == 'special_project' else k
    return (f'{folder}:{key}' if isinstance(key, str) and key else None), folder


class Graph:
    def __init__(self, parsed, effects):
        self.parsed = parsed            # name -> (nodes, text, origin)
        self.effects = effects          # scripted effect name -> (nodes, text, origin)
        self.calls = []
        self.definitions = {}
        self._group = 0

    def group(self):
        self._group += 1
        return self._group

    def add(self, origin_def, target, via, ctx, node, text, source, extra=None):
        call = {'from': origin_def, 'to': target, 'via': via, 'path': ctx, 'file': source,
                'line': text.count('\n', 0, node['s']) + 1}
        if extra:
            call.update(extra)
        self.calls.append(call)

    def visit(self, origin_def, nodes, text, source, ctx, stack=()):
        previous_conditions = []  # if / else_if chain negations
        option_index = 0
        chain = None
        for n in nodes:
            k, v = n['k'], n['v']
            lk = k.lower()
            # --- invocations ------------------------------------------------------------
            if EVENT_KEY.match(lk):
                target = first(v, 'id') if isinstance(v, list) else v if isinstance(v, str) else None
                if isinstance(target, str) and EVENT_ID.match(target):
                    delay = {d: first(v, d) for d in DELAY if isinstance(v, list) and first(v, d) not in ('', None)}
                    self.add(origin_def, target, 'stage_event' if lk == 'event' and isinstance(v, str) else lk, ctx, n,
                             text, source, {'delay': delay} if delay else None)
                    continue
            if lk in ('set_next_astral_rift_event', 'on_roll_failed') and isinstance(v, str) and EVENT_ID.match(v):
                self.add(origin_def, v, lk, ctx, n, text, source)
                continue
            if lk in REFERENCES:
                namespace, field = REFERENCES[lk]
                key = v if isinstance(v, str) else first(v, field) if isinstance(v, list) else None
                if isinstance(key, str) and key:
                    self.add(origin_def, f'{namespace}:{key}', lk, ctx, n, text, source)
            if lk in ('events', 'random_events') and isinstance(v, list):
                if lk == 'events':
                    for item in v:
                        if isinstance(item['v'], str) and EVENT_ID.match(item['v']):
                            self.add(origin_def, item['v'], 'on_action_events', ctx, item, text, source)
                else:
                    gid = self.group()
                    weights = [(item['k'], item['v']) for item in v if item['k'].replace('.', '', 1).isdigit()]
                    total = sum(float(w) for w, _ in weights)
                    for item in v:
                        if item['k'].replace('.', '', 1).isdigit() and isinstance(item['v'], str):
                            entry = {'k': 'random_events', 'group': gid, 'weight': float(item['k']), 'total': total,
                                     'nothing': sum(float(w) for w, t in weights if t == '0')}
                            if item['v'] != '0' and EVENT_ID.match(item['v']):
                                self.add(origin_def, item['v'], 'random_events', ctx + [entry], item, text, source)
                continue
            # --- scripted effect expansion -----------------------------------------------
            if k in self.effects and k not in stack and len(stack) < 8:
                body_nodes, body_text, effect_origin = self.effects[k]
                body = '\n'.join(raw(x, body_text) for x in body_nodes)
                if isinstance(v, list):
                    for param in v:
                        if isinstance(param['v'], str):
                            body = body.replace('$' + param['k'] + '$', param['v'])
                try:
                    expanded = parse(body)
                except ValueError:
                    expanded = []
                self.add(origin_def, 'scripted_effects:' + k, 'scripted_effect', ctx, n, text, source)
                before = len(self.calls)
                self.visit(origin_def, expanded, body, effect_origin, ctx + [{'k': 'effect', 'name': k, 'file': source,
                           'line': text.count('\n', 0, n['s']) + 1}], stack + (k,))
                continue
            if not isinstance(v, list):
                continue
            # --- structural context -----------------------------------------------------
            entry = None
            if lk == 'option':
                entry = {'k': 'option', 'key': first(v, 'name') if isinstance(first(v, 'name'), str) else '',
                         'index': option_index}
                option_index += 1
            elif lk in ('if', 'else_if'):
                limit = next((x for x in v if x['k'] == 'limit'), None)
                if lk == 'if':
                    previous_conditions = []
                    chain = self.group()
                entry = {'k': lk, 'chain': chain, 'limit': raw(limit, text) if limit else '',
                         'not': list(previous_conditions)}
                previous_conditions.append(entry['limit'])
            elif lk == 'else':
                entry = {'k': 'else', 'chain': chain, 'not': list(previous_conditions)}
                previous_conditions = []
            elif lk == 'random_list':
                gid = self.group()
                weights = [x for x in v if x['k'].replace('.', '', 1).isdigit()]
                total = sum(float(x['k']) for x in weights)
                for branch in weights:
                    modified = isinstance(branch['v'], list) and any(x['k'] in ('modifier', 'weight') for x in branch['v'])
                    e = {'k': 'random_list', 'group': gid, 'weight': float(branch['k']), 'total': total,
                         'branches': len(weights), **({'modified': True} if modified else {})}
                    if isinstance(branch['v'], list):
                        self.visit(origin_def, branch['v'], text, source, ctx + [e], stack)
                continue
            elif lk == 'random':
                entry = {'k': 'random', 'chance': first(v, 'chance')}
            elif lk in HOOKS:
                entry = {'k': lk}
            elif lk == 'stage' or re.fullmatch(r'stage_\w+', k):
                entry = {'k': 'stage', 'name': k if lk != 'stage' else str(first(v, 'name') or '')}
            elif lk == 'stages':
                entry = {'k': 'stages'}
            elif lk == 'approach':
                entry = {'k': 'approach', 'name': first(v, 'name')}
            elif k.replace('.', '', 1).isdigit() and ctx and ctx[-1]['k'] == 'on_success' and origin_def.startswith('anomalies:'):
                entry = {'k': 'anomaly_outcome', 'weight': float(k)}
            elif lk in ('trigger', 'potential', 'allow', 'limit', 'possible', 'modifier', 'weight', 'spawn_chance',
                        'mean_time_to_happen', 'pre_triggers', 'abort_trigger', 'requirements', 'desc', 'title'):
                continue  # conditions never fire effects
            self.visit(origin_def, v, text, source, ctx + [entry] if entry else ctx, stack)

    def anomaly(self, def_id, v, text, source):
        """Anomaly on_success: weighted, exclusive outcome list (or a single scalar outcome)."""
        success = next((x for x in v if x['k'] == 'on_success'), None)
        if not success:
            return
        if isinstance(success['v'], str):
            if EVENT_ID.match(success['v']):
                self.add(def_id, success['v'], 'anomaly_outcome', [{'k': 'on_success'}], success, text, source)
            return
        gid = self.group()
        weights = [x for x in success['v'] if x['k'].replace('.', '', 1).isdigit()]
        total = sum(float(x['k']) for x in weights)
        for branch in weights:
            entry = {'k': 'anomaly_outcome', 'group': gid, 'weight': float(branch['k']), 'total': total,
                     'branches': len(weights)}
            bv = branch['v']
            if isinstance(bv, str):
                if EVENT_ID.match(bv):
                    self.add(def_id, bv, 'anomaly_outcome', [{'k': 'on_success'}, entry], branch, text, source)
                continue
            modifiers = [raw(x, text) for x in bv if x['k'] == 'modifier']
            once = {x['k']: x['v'] for x in bv if x['k'] in ('max_once', 'max_once_global')}
            entry = {**entry, **({'modifiers': modifiers} if modifiers else {}), **once}
            target = first(bv, 'anomaly_event')
            if isinstance(target, str) and EVENT_ID.match(target):
                self.add(def_id, target, 'anomaly_outcome', [{'k': 'on_success'}, entry], branch, text, source)
            else:
                self.visit(def_id, [x for x in bv if x['k'] not in ('modifier', 'max_once', 'max_once_global')], text,
                           source, [{'k': 'on_success'}, entry])

    def build(self):
        for name, (nodes, text, origin) in self.parsed.items():
            if not name.endswith('.txt') or not name.startswith(('events/', 'common/')):
                continue
            if name.startswith(('common/scripted_effects/', 'common/inline_scripts/', 'common/scripted_triggers/',
                                'common/scripted_variables/', 'common/script_values/', 'common/defines/')):
                continue
            events_file = name.startswith('events/')
            for n in nodes:
                def_id, kind = definition_id(name, n, events_file)
                if not def_id:
                    continue
                v = n['v']
                info = {'kind': kind, 'file': origin, 'line': text.count('\n', 0, n['s']) + 1}
                if events_file:
                    info.update({f: first(v, f) for f in ('hide_window', 'is_triggered_only', 'fire_only_once')
                                 if first(v, f)})
                    if any(x['k'] == 'mean_time_to_happen' for x in v):
                        info['mtth'] = True
                self.definitions.setdefault(def_id, info)
                if def_id.startswith('anomalies:'):
                    self.anomaly(def_id, v, text, origin)
                    rest = [x for x in v if x['k'] != 'on_success']
                    self.visit(def_id, rest, text, origin, [])
                else:
                    self.visit(def_id, v, text, origin, [])
        callers = collections.defaultdict(list)
        for i, c in enumerate(self.calls):
            callers[c['to']].append(i)
        return {'definitions': self.definitions, 'calls': self.calls, 'callers': dict(callers)}
