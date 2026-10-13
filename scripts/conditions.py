"""Structured, reader-safe conditions (DNF of typed atoms) — docs/STORY-MODEL-V4.md.

Atom types:
  identity  empire traits of the reading empire (ethics, authority, origin, civics) — resolved by the reader profile
  flag      a named flag; story-local flags are resolved from the options chosen on the current path
  other     anything else, labelled from the game's own tooltip / localisation where possible; never auto-resolved
The DNF is bounded; overflow collapses to a single `other` atom so nothing is silently dropped.
"""
from __future__ import annotations
import re
from extract import parse

ALIASES = {'is_materialist': 'ethic_materialist', 'is_spiritualist': 'ethic_spiritualist', 'is_xenophile': 'ethic_xenophile',
           'is_xenophobe': 'ethic_xenophobe', 'is_militarist': 'ethic_militarist', 'is_pacifist': 'ethic_pacifist',
           'is_egalitarian': 'ethic_egalitarian', 'is_authoritarian': 'ethic_authoritarian',
           'is_gestalt': 'ethic_gestalt_consciousness', 'is_hive_empire': 'auth_hive_mind',
           'is_machine_empire': 'auth_machine_intelligence', 'is_megacorp': 'auth_corporate'}
ALIASES.update({'is_fanatic_' + k: 'ethic_fanatic_' + k for k in ('materialist', 'spiritualist', 'xenophile', 'xenophobe',
                                                               'militarist', 'pacifist', 'egalitarian', 'authoritarian')})
IDENTITY_KEYS = {'has_ethic', 'has_civic', 'has_origin', 'has_authority', 'has_valid_civic'}
COUNTRY_SCOPES = {'', 'owner', 'root', 'owner_main_species', 'space_owner', 'controller'}
SCOPE_NEUTRAL = {'and', 'trigger', 'limit', 'hidden_trigger', 'custom_tooltip', 'allow', 'potential', 'exclusive_trigger'}
FLAG = re.compile(r'^has_(country|global|planet|ship|leader|fleet|pop|species|star|system|situation|federation)_flag$')
SPECIAL = {'is_individual_machine': 'is_individual_machine', 'is_lithoid_empire': 'is_lithoid_empire',
           'is_wilderness_empire': 'is_wilderness_empire'}
MAX = 48
# Comparison triggers whose block holds arguments, not nested conditions: one opaque atom each.
OPAQUE_BLOCKS = {'calc_true_if', 'resource_stockpile_compare', 'check_variable', 'check_variable_arithmetic',
                 'has_resource', 'has_monthly_income', 'check_modifier_value', 'check_economic_value',
                 'has_deposit_for', 'has_trait_in_council', 'relative_power', 'opinion', 'has_opinion_modifier',
                 'check_galaxy_setup_value', 'is_scope_type_and_exists', 'compare_value', 'has_resource_in_stockpile'}
OTHER_LABELS = {'is_robot_empire': {'zh': '机器人帝国', 'en': 'Robot empire'},
                'is_wilderness_empire': {'zh': '荒野帝国', 'en': 'Wilderness empire'}}


def _and(a, b):
    out = []
    for x in a:
        for y in b:
            merged = dict(x)
            ok = True
            for k, v in y.items():
                if k in merged and merged[k]['value'] != v['value']:
                    ok = False
                    break
                merged[k] = v
            if ok and merged not in out:
                out.append(merged)
            if len(out) > MAX:
                return None
    return out


def _or(a, b):
    out = list(a)
    for y in b:
        if y not in out:
            out.append(y)
    return out if len(out) <= MAX else None


class Conditions:
    def __init__(self, labels, localized):
        self.labels = labels          # reaction-labels: key -> {zh, en}
        self.localized = localized    # key -> {zh, en} or None (custom tooltips)

    def atom(self, n, scope, negative):
        k, v = n['k'].lower(), n['v']
        truth = (v != 'no') != negative
        if n.get('op') == '!=':
            truth = not truth
        country = scope in COUNTRY_SCOPES

        def identity(key, value):
            atom = {'type': 'identity', 'key': key, 'value': value}
            if key in self.labels:
                atom['label'] = {lang: re.sub(r'§.', '', self.labels[key].get(lang, '')) for lang in ('zh', 'en')}
            return {key: atom}
        if country and k in ALIASES:
            return identity(ALIASES[k], truth)
        if country and k in SPECIAL and isinstance(v, str):
            return identity(k, truth)
        if country and k in IDENTITY_KEYS and isinstance(v, str):
            return identity(v, not negative if n.get('op') != '!=' else negative)
        m = FLAG.match(k)
        if m and isinstance(v, str):
            name = f'{m.group(1)}:{v}'
            return {'flag|' + scope + '|' + name: {'type': 'flag', 'scope': m.group(1), 'name': v, 'path': scope,
                                                   'value': truth}}
        label = OTHER_LABELS.get(k)
        if isinstance(v, str) and v in self.labels:
            label = self.labels[v]
        elif k == 'has_tradition' and isinstance(v, str) and self.localized(v):
            label = self.localized(v)
        key = 'other|' + scope + '|' + k + '=' + (v if isinstance(v, str) else '{…}')
        return {key: {'type': 'other', 'key': k, 'arg': v if isinstance(v, str) else '', 'scope': scope,
                      'value': truth, **({'label': label} if label else {})}}

    def expression(self, nodes, negative=False, mode='and', scope=''):
        if negative:
            mode = 'or' if mode == 'and' else 'and'
        result = [] if mode == 'or' else [{}]
        for n in nodes:
            k, v = n['k'].lower(), n['v']
            if k in ('text', 'fail_text', 'success_text', 'desc', 'title', 'tooltip'):
                continue
            if k == 'custom_tooltip' and isinstance(v, list):
                tooltip = next((x['v'] for x in v if x['k'] in ('text', 'fail_text', 'success_text') and isinstance(x['v'], str)), None)
                inner = self.expression([x for x in v if x['k'] not in ('text', 'fail_text', 'success_text')], negative, 'and', scope)
                if tooltip and inner is not None and self.localized(tooltip):
                    # Keep the game's own wording for the whole condition as a label on its atoms.
                    for branch in inner:
                        for atom in branch.values():
                            if atom['type'] == 'other':
                                atom.setdefault('label', self.localized(tooltip))
                terms = inner
            elif isinstance(v, list):
                if k in ('not', 'nor', 'nand'):
                    terms = self.expression(v, not negative, 'and' if k in ('not', 'nand') else 'or', scope)
                elif k == 'or':
                    terms = self.expression(v, negative, 'or', scope)
                elif k in SCOPE_NEUTRAL:
                    terms = self.expression(v, negative, 'and', scope)
                elif k.startswith(('any_', 'count_', 'every_', 'random_', 'num_')) or k in OPAQUE_BLOCKS:
                    terms = [self.atom({'k': k, 'v': '{…}'}, scope, negative)]
                else:
                    terms = self.expression(v, negative, 'and', (scope + '/' + k).strip('/'))
            elif k == 'always':
                terms = [{}] if (v == 'yes') != negative else []
            else:
                terms = [self.atom(n, scope, negative)]
            if terms is None:
                return None
            result = _or(result, terms) if mode == 'or' else _and(result, terms)
            if result is None:
                return None
        return result

    # ------------------------------------------------------------- descriptions ---
    def _dnf(self, nodes, negative=False):
        dnf = self.expression(nodes, negative)
        return [{'complex': {'type': 'other', 'key': 'complex', 'value': True}}] if dnf is None else dnf

    @staticmethod
    def _final(dnf):
        if dnf is None or dnf == [{}]:
            return None
        return [list(branch.values()) for branch in dnf]

    def passages(self, body, key_index):
        """Event `desc` entries -> [{when, pieces:[{text|break, when}]}], keeping composed text in order.

        Forms: `desc = key`; `desc = { trigger = {…} text = key }` (whole passage conditional); and composed
        `desc = { trigger = { text = a  success_text = { text = b <cond> }  fail_text = {…}  if = {…}  text = c } }`.
        """
        out = []

        def piece(key, dnf):
            if key == 'newline':
                return [{'break': True}]
            if key not in key_index:
                return []
            p = {'text': key_index[key]}
            final = self._final(dnf)
            if final is not None:
                p['when'] = final
            return [p]

        def compose(nodes, dnf):
            pieces, previous = [], []
            for x in nodes:
                k, v = x['k'].lower(), x['v']
                if k == 'text' and isinstance(v, str):
                    pieces += piece(v, dnf)
                elif k in ('success_text', 'fail_text') and isinstance(v, list):
                    cond = [y for y in v if y['k'] != 'text']
                    branch = _and(dnf, self._dnf(cond, negative=(k == 'fail_text'))) if cond else dnf
                    for y in v:
                        if y['k'] == 'text' and isinstance(y['v'], str):
                            pieces += piece(y['v'], branch or [])
                elif k in ('if', 'else_if', 'else') and isinstance(v, list):
                    if k == 'if':
                        previous = []
                    limit = next((y['v'] for y in v if y['k'] == 'limit' and isinstance(y['v'], list)), [])
                    branch = dnf
                    for prior in previous:
                        branch = _and(branch, self._dnf(prior, negative=True)) or []
                    if k != 'else':
                        branch = _and(branch, self._dnf(limit)) or []
                        previous.append(limit)
                    pieces += compose([y for y in v if y['k'] != 'limit'], branch)
            return pieces

        def composed(trigger_nodes):
            return any(y['k'] in ('text', 'success_text', 'fail_text') or
                       (y['k'] in ('if', 'else_if', 'else') and isinstance(y['v'], list) and any(z['k'] == 'text' for z in y['v']))
                       for y in trigger_nodes)

        for n in body:
            if n['k'] != 'desc':
                continue
            v = n['v']
            if isinstance(v, str):
                pieces = piece(v, [{}])
                if pieces:
                    out.append({'pieces': pieces})
                continue
            if not isinstance(v, list):
                continue
            trigger = next((y['v'] for y in v if y['k'] == 'trigger' and isinstance(y['v'], list)), None)
            if trigger is not None and composed(trigger):
                pieces = compose(trigger, [{}])
                if pieces:
                    out.append({'pieces': pieces})
                continue
            text = next((y['v'] for y in v if y['k'] == 'text' and isinstance(y['v'], str)), None)
            pieces = piece(text, [{}]) if text else []
            if not pieces:
                continue
            entry = {'pieces': pieces}
            if trigger:
                final = self._final(self._dnf(trigger))
                if final is not None:
                    entry['when'] = final
            out.append(entry)
        return out

    def compile_blocks(self, nodes, keys):
        """Condition DNF of the direct child blocks named `keys` (e.g. an option's trigger), or None."""
        body = [y for x in nodes if x['k'] in keys and isinstance(x['v'], list) for y in x['v']]
        if not body:
            return None
        return self._final(self._dnf(body))

    def compile(self, script):
        """Raw condition script -> list of branches (each: list of atoms), [] = never, [[]] = always."""
        if not script or not script.strip():
            return None
        try:
            nodes = parse(script)
        except ValueError:
            return [[{'type': 'other', 'key': 'unparsed', 'value': True}]]
        body = []
        for n in nodes:
            if n['k'] in ('trigger', 'allow', 'exclusive_trigger', 'potential', 'limit') and isinstance(n['v'], list):
                body.extend(n['v'])
            else:
                body.append(n)
        dnf = self.expression(body)
        if dnf is None:
            return [[{'type': 'other', 'key': 'complex', 'value': True}]]
        return [list(branch.values()) for branch in dnf]
