"""Build-time game data for the effects extractor (scripts/effects.py), from the read-only game install.

  python scripts/effects_data.py [--game D:/Living/Steam/steamapps/common/Stellaris]

Output: public/data/effects-data.json (build input only, not loaded by the site)
  loc         original wording (zh / en) of every key the narrative scripts, scripted effects and modifiers mention,
              plus the `mod_<stat>` / `MOD_<STAT>` variants the game uses for modifier names
  vars        scripted variables (@name -> value)
  values      script values (name -> raw text) that scripted effects or narrative scripts refer to as value:name
  effects     scripted effects (name -> raw block text) reachable from the narrative scripts, with their sources
  modifiers   static / event modifiers (name -> {stat: value}); opinion modifiers (name -> {opinion, decay, ...})
  origins     origin civic definitions: game description keys, swap variants, modifier stats, source
Deterministic; sources are `file:line` inside the install or its DLC archives.
"""
import argparse, glob, json, re, sys, zipfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from extract import parse, walk, first, raw  # noqa: E402

ROOT = Path(__file__).resolve().parents[1]
FOLDERS = ('common', 'localisation', 'localisation_synced', 'events')


def load_files(game):
    files = {}
    for base in FOLDERS:
        for p in sorted((game / base).rglob('*')):
            if p.is_file() and p.suffix in ('.txt', '.yml'):
                files[p.relative_to(game).as_posix().lower()] = (p.read_bytes(), p.relative_to(game).as_posix())
    for z in sorted((game / 'dlc').rglob('*.zip')):
        with zipfile.ZipFile(z) as archive:
            for n in sorted(archive.namelist()):
                key = n.replace('\\', '/').lower()
                if key.startswith(FOLDERS) and key.endswith(('.txt', '.yml')):
                    files[key] = (archive.read(n), z.relative_to(game).as_posix() + '!/' + n)
    return files


def strip(s):
    return re.sub(r'§.|£\w+£', '', s or '')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--game', default='D:/Living/Steam/steamapps/common/Stellaris')
    game = Path(ap.parse_args().game)
    files = load_files(game)

    loc = {'zh': {}, 'en': {}}
    for name, (data, origin) in files.items():
        if not name.endswith('.yml'):
            continue
        text = data.decode('utf-8-sig', errors='replace')
        lang = 'zh' if 'l_simp_chinese:' in text[:200] else 'en' if 'l_english:' in text[:200] else None
        if not lang:
            continue
        for line in text.splitlines():
            m = re.match(r'^\s*([^\s:#]+):\d*\s*"(.*)"\s*(?:#.*)?$', line)
            if m:
                loc[lang][m[1]] = m[2].replace('\\n', '\n').replace('\\"', '"')

    def expand_raw(key, lang, seen=()):
        value = loc[lang].get(key, '')

        def sub(m):
            k = m[1].split('|')[0]
            return expand_raw(k, lang, seen + (key,)) if k in loc[lang] and k not in seen and len(seen) < 8 else m[0]
        value = re.sub(r'\$([^$\n]+)\$', sub, value)
        value = re.sub(r"\['([\w:]+)',\s*([^\]]+)\]", lambda m: m[2].strip(), value)
        value = re.sub(r"\['([\w:]+)'\]", lambda m: expand_raw(m[1], lang, seen + (key,)) if m[1] in loc[lang] and len(seen) < 8 else m[1], value)
        return value

    def expand(key, lang):
        return strip(expand_raw(key, lang)).strip()

    def parsed(name):
        data, origin = files[name]
        text = data.decode('utf-8-sig', errors='replace')
        try:
            return parse(text), text, origin
        except ValueError:
            return [], text, origin

    def line_of(text, node):
        return text.count('\n', 0, node['s']) + 1

    # ---- scripted variables
    variables = {}
    for name in sorted(files):
        if name.startswith('common/scripted_variables/') and name.endswith('.txt'):
            data, _ = files[name]
            for m in re.finditer(r'^\s*(@[\w.]+)\s*=\s*(-?[\d.]+)', data.decode('utf-8-sig', errors='replace'), re.M):
                variables[m[1]] = m[2]

    # ---- scripted effects (raw block text + source), script values
    scripted, values = {}, {}
    for name in sorted(files):
        if name.endswith('.txt') and name.startswith('common/scripted_effects/'):
            nodes, text, origin = parsed(name)
            for n in nodes:
                if isinstance(n['v'], list) and n['k'] and not n['k'].startswith('@'):
                    scripted[n['k']] = {'text': raw(n, text), 'source': f'{origin}:{line_of(text, n)}'}
        elif name.endswith('.txt') and name.startswith('common/script_values/'):
            nodes, text, origin = parsed(name)
            for n in nodes:
                if n['k'] and not n['k'].startswith('@'):
                    values[n['k']] = {'text': raw(n, text), 'source': f'{origin}:{line_of(text, n)}'}

    # ---- modifiers
    modifiers = {}
    for name in sorted(files):
        if name.endswith('.txt') and name.startswith('common/static_modifiers/'):
            nodes, text, origin = parsed(name)
            for n in nodes:
                if isinstance(n['v'], list):
                    stats = {x['k']: x['v'] for x in n['v'] if isinstance(x['v'], str) and x['k'] not in ('icon', 'icon_frame', 'display', 'remove_trigger', 'description')}
                    modifiers[n['k']] = {'stats': stats, 'source': f'{origin}:{line_of(text, n)}'}
    opinion = {}
    for name in sorted(files):
        if name.endswith('.txt') and name.startswith('common/opinion_modifiers/'):
            nodes, text, origin = parsed(name)
            for n in nodes:
                if isinstance(n['v'], list):
                    opinion[n['k']] = {'opinion': first(n['v'], 'opinion') or None, 'decay': first(n['v'], 'decay') or None,
                                       'min': first(n['v'], 'min') or None, 'accumulative': first(n['v'], 'accumulative') or None,
                                       'source': f'{origin}:{line_of(text, n)}'}

    # ---- origins
    origins = {}
    for name in sorted(files):
        if name.endswith('.txt') and name.startswith('common/governments/civics/'):
            nodes, text, origin = parsed(name)
            for n in nodes:
                if not isinstance(n['v'], list) or first(n['v'], 'is_origin') != 'yes':
                    continue
                v = n['v']
                swaps = [{'description': first(s['v'], 'description'), 'name': first(s['v'], 'name')}
                         for s in v if s['k'] == 'swap_type' and isinstance(s['v'], list)]
                mods = [{x['k']: x['v'] for x in b['v'] if isinstance(x['v'], str)} for b in v if b['k'] == 'modifier' and isinstance(b['v'], list)]
                origins[n['k']] = {'description': first(v, 'description') if isinstance(first(v, 'description'), str) else '',
                                   'swaps': swaps, 'modifier': mods[0] if mods else {},
                                   'source': f'{origin}:{line_of(text, n)}'}

    # ---- reachable scripted effects & the key set the localisation must cover
    records = []
    for f in sorted(glob.glob(str(ROOT / 'public/data/groups/*.json'))):
        records += json.loads(Path(f).read_text(encoding='utf-8'))
    token = re.compile(r'[A-Za-z_][\w.:]*')
    used = set()
    pending = [r['script'] for r in records]
    seen_eff = set()
    while pending:
        text = pending.pop()
        for t in token.findall(text):
            used.add(t)
            if t in scripted and t not in seen_eff:
                seen_eff.add(t)
                pending.append(scripted[t]['text'])
            if t.startswith('value:') or True:
                pass
    value_names = {t.split(':', 1)[1] for t in used if t.startswith('value:')}
    for body in [scripted[e]['text'] for e in seen_eff]:
        value_names |= {t.split(':', 1)[1] for t in token.findall(body) if t.startswith('value:')}
    for m in modifiers.values():
        used.update(m['stats'])
    used.update(modifiers)
    used.update(opinion)
    for o in origins.values():
        used.update(filter(None, [o['description']] + [s['description'] for s in o['swaps']] + list(o['modifier'])))
    used.update(origins)
    import effects_labels
    used.update(effects_labels.LOC_KEYS)  # names the reviewed condition wording quotes
    out_loc = {}
    keys = set(loc['en']) | set(loc['zh'])
    for t in sorted(used):
        for k in (t, t.upper(), 'mod_' + t, 'MOD_' + t.upper()):
            if k in keys and k not in out_loc and not k.endswith(('.desc', '.name', '.title')):  # story texts live in the story data
                out_loc[k] = {'zh': expand(k, 'zh'), 'en': expand(k, 'en')}
    for k in sorted(keys):  # tooltips of custom_tooltip / game effect text are referenced with their own keys
        if k.startswith('origin_') and k not in out_loc and ('effects' in k or 'tooltip' in k):
            out_loc[k] = {'zh': expand(k, 'zh'), 'en': expand(k, 'en')}
    # engine links inside the kept sentences (`building:building_x`, `trait:...`): keep the linked object's name too
    link = re.compile(r'(?<![A-Za-z0-9_])(?:building|trait|technology|tradition_category|tradition|edict|scripted_action|tech|civic|ethic|ascension_perk|deposit|planet_class|policy|district|species_trait|megastructure|relic|resolution):([A-Za-z0-9_]+)')
    for _ in range(2):
        for text in [v for e in list(out_loc.values()) for v in e.values()]:
            for ref in link.findall(text):
                for k in (ref, ref.upper()):
                    if k in keys and k not in out_loc:
                        out_loc[k] = {'zh': expand(k, 'zh'), 'en': expand(k, 'en')}
    # raw trigger wording ("Is Owned by $EMPIRE$"): the game's own condition sentence for a trigger key, placeholders kept
    trig = {}
    def rawloc(k, lang):
        return re.sub(r'§.|£\w+£', '', loc[lang].get(k, '')).replace('\\n', '\n')
    for t in sorted(used):
        if t in out_loc or not re.fullmatch(r'[a-z][a-z0-9_]*', t):
            continue  # objects with their own name are not triggers
        for k in (t.upper(), t.upper() + '_TOOLTIP', t + '_tooltip', t):
            zh, en = rawloc(k, 'zh'), rawloc(k, 'en')
            if zh and en and '\n' not in zh.strip() and len(zh) < 160 and ('_' in t or '$' in zh):
                trig[t] = {'zh': zh.strip(), 'en': en.strip(), 'key': k}
                break
    out = {
        'game': (game / 'launcher-settings.json').exists() and json.loads((game / 'launcher-settings.json').read_text(encoding='utf-8-sig')).get('version'),
        'loc': out_loc, 'trig': trig, 'vars': variables,
        'values': {k: values[k] for k in sorted(value_names) if k in values},
        'effects': {k: scripted[k] for k in sorted(seen_eff)},
        'modifiers': {k: modifiers[k] for k in sorted(modifiers)}, 'opinion': {k: opinion[k] for k in sorted(opinion)},
        'origins': origins,
    }
    (ROOT / 'public/data/effects-data.json').write_text(json.dumps(out, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    print(json.dumps({k: len(v) for k, v in out.items() if isinstance(v, dict)}))


if __name__ == '__main__':
    main()
