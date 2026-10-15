"""Grand Archive (博物天枢) specimen inventory from the read-only Stellaris installation.

  python scripts/extract-specimens.py [--game D:/Living/Steam/steamapps/common/Stellaris]

Outputs (data only; the museum UI lives in src/museum*.js, generated 3D models in public/museum/models/):
  public/museum/specimens.json   every specimen: type, rarity, original icon, bilingual name / descriptions, display
                                 effects with their exact conditions, upkeep, acquisition sources and linked stories
  public/museum/img/<key>.webp   original specimen icons (alpha kept)
  verification/museum/inventory.md  human-readable inventory with source references

Semantics kept as in the game files: specimen bonuses are `triggered_country_modifier`s that apply while the specimen
is exhibited in a Grand Archive (concept_specimen_desc), multiplied by value:<type>_specimens_modifiers_mult
(1 + specimen output modifiers); `potential` blocks are conditions and are never dropped.
"""
import argparse, collections, hashlib, io, json, re, sys, zipfile
from pathlib import Path

from PIL import Image

sys.path.insert(0, str(Path(__file__).parent))
from extract import parse, first, vals, walk, raw  # noqa: E402

ROOT = Path(__file__).resolve().parents[1]
ap = argparse.ArgumentParser()
ap.add_argument('--game', default='D:/Living/Steam/steamapps/common/Stellaris')
GAME = Path(ap.parse_args().game)

# ---------------------------------------------------------------- game files (base folders + DLC zips) ---
files = {}


def add(name, data, origin):
    name = name.replace('\\', '/').lower()
    if name.endswith(('.txt', '.yml', '.gfx')) and name.startswith(('events/', 'common/', 'localisation/', 'interface/')):
        files[name] = (data, origin)


for base in ('events', 'common', 'interface', 'localisation'):
    for p in sorted((GAME / base).rglob('*')):
        if p.is_file():
            add(p.relative_to(GAME).as_posix(), p.read_bytes(), p.relative_to(GAME).as_posix())
for z in sorted((GAME / 'dlc').rglob('*.zip')):
    with zipfile.ZipFile(z) as archive:
        for n in archive.namelist():
            if n.lower().endswith(('.txt', '.yml', '.gfx')):
                add(n, archive.read(n), z.relative_to(GAME).as_posix() + '!/' + n)

loc = {'zh': {}, 'en': {}}
loc_src = {'zh': {}, 'en': {}}
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
            loc_src[lang][m[1]] = origin + ':' + str(text[:text.find(line)].count('\n') + 1)


def text(key, lang, seen=()):
    value = loc[lang].get(key, '')

    def sub(m):
        k = m[1].split('|')[0]
        return text(k, lang, seen + (key,)) if k in loc[lang] and k not in seen and len(seen) < 12 else m[0]
    value = re.sub(r'\$([^$\n]+)\$', sub, value)
    # Game concept links: ['concept_key', Shown text] shows its text; ['concept_key'] shows the concept's own name.
    value = re.sub(r"\['([\w:]+)',\s*([^\]]+)\]", lambda m: m[2].strip(), value)
    return re.sub(r"\['([\w:]+)'\]", lambda m: text(m[1], lang, seen + (key,)) if m[1] in loc[lang] and len(seen) < 12 else m[1], value)


def local(key, *fallbacks):
    for k in (key, *fallbacks):
        if k in loc['en'] or k in loc['zh']:
            return {'key': k, 'zh': text(k, 'zh'), 'en': text(k, 'en'), 'source': loc_src['en'].get(k) or loc_src['zh'].get(k)}
    return {'key': key, 'zh': '', 'en': '', 'source': None}


def modifier_label(key):
    return local('mod_' + key, 'MOD_' + key.upper(), key, key.upper())


def strip_markup(s):
    return re.sub(r'§.|£\w+£', '', s or '').strip()


def node_text(name):
    data, origin = files[name]
    return data.decode('utf-8-sig', errors='replace'), origin


# ---------------------------------------------------------------- sprites and original icons ---
sprites = {}
for name in files:
    if name.endswith('.gfx'):
        t, _ = node_text(name)
        for m in re.finditer(r'name\s*=\s*"?(GFX_\w+)"?\s*texturefile\s*=\s*"([^"]+)"', t):
            sprites[m[1]] = m[2]


def find_asset(path):
    p = GAME / path
    if p.exists():
        return p.read_bytes(), path
    for z in sorted((GAME / 'dlc').rglob('*.zip')):
        with zipfile.ZipFile(z) as archive:
            for n in archive.namelist():
                if n.lower() == path.lower():
                    return archive.read(n), z.relative_to(GAME).as_posix() + '!/' + n
    return None, path


img_dir = ROOT / 'public/museum/img'
img_dir.mkdir(parents=True, exist_ok=True)


def icon(sprite, key):
    path = sprites.get(sprite)
    if not path:
        return None
    data, origin = find_asset(path)
    if data is None:
        return {'error': 'missing texture', 'texture': path}
    im = Image.open(io.BytesIO(data))
    im.load()
    dest = img_dir / f'{key}.webp'
    im.convert('RGBA').save(dest, 'WEBP', quality=92, method=6)
    return {'url': f'museum/img/{key}.webp', 'width': im.width, 'height': im.height, 'source': origin, 'sprite': sprite,
            'sha256': hashlib.sha256(data).hexdigest()}


# ---------------------------------------------------------------- conditions → readable labels ---
def trait_label(key):
    return {'zh': text(key, 'zh'), 'en': text(key, 'en')}


CONDITIONS = {
    'is_gestalt': lambda yes: {'zh': ('' if yes else '非') + text('ethic_gestalt_consciousness', 'zh'),
                               'en': ('' if yes else 'Not ') + text('ethic_gestalt_consciousness', 'en')},
    'is_lithoid': lambda yes: {'zh': '主要物种' + ('为' if yes else '不是') + text('lithoid', 'zh'),
                               'en': 'Main species ' + ('is' if yes else 'is not') + ' ' + text('lithoid', 'en')},
    'is_infernal': lambda yes: {'zh': '主要物种' + ('拥有' if yes else '没有') + '「' + text('trait_infernal', 'zh') + '」特质',
                                'en': 'Main species ' + ('has' if yes else 'lacks') + ' the ' + text('trait_infernal', 'en') + ' trait'},
    'country_uses_consumer_goods': lambda yes: {'zh': ('使用' if yes else '不使用') + text('CONSUMER_GOODS', 'zh'),
                                                'en': ('Uses ' if yes else 'Does not use ') + text('CONSUMER_GOODS', 'en')},
}


def conditions(nodes, negative=False):
    """Readable atoms of a `potential` block (all must hold)."""
    out = []
    for n in nodes:
        k, v = n['k'], n['v']
        if k == 'NOT' and isinstance(v, list):
            out += conditions(v, not negative)
        elif k in CONDITIONS and isinstance(v, str):
            out.append({'label': CONDITIONS[k]((v == 'yes') != negative), 'script': f'{"NOT " if negative else ""}{k} = {v}'})
        elif k == 'has_country_flag' and isinstance(v, str):
            out.append({'label': {'zh': ('未' if negative else '已') + '设置国家旗标 ' + v, 'en': ('Lacks' if negative else 'Has') + ' country flag ' + v},
                        'script': f'{"NOT " if negative else ""}has_country_flag = {v}', 'flag': v})
        else:
            out.append({'label': {'zh': '其他条件', 'en': 'Other condition'}, 'script': raw(n, current_text), 'unparsed': True})
    return out


def mod_value(key, value):
    v = float(value)
    percent = key.endswith('_mult')
    return {'value': v, 'percent': percent}


# ---------------------------------------------------------------- specimens ---
spec_name = 'common/specimens/specimens.txt'
current_text, spec_origin = node_text(spec_name)
nodes = parse(current_text)
upkeep = {}
for rarity in ('common', 'rare', 'epic', 'exceptional'):
    p = f'common/inline_scripts/grand_archive/specimen_upkeeps/specimen_upkeep_{rarity}.txt'
    if p in files:
        t, o = node_text(p)
        upkeep[rarity] = {'resources': {n['k']: n['v'] for n in parse(t) if isinstance(n['v'], str)}, 'source': o}

specimens = []
for n in nodes:
    if not isinstance(n['v'], list):
        continue
    v = n['v']
    key = n['k']
    inline = next((x for x in v if x['k'] == 'inline_script'), None)
    rarity = first(inline['v'], 'RARITY') if inline and isinstance(inline['v'], list) else ''
    effects = []
    for m in (x for x in v if x['k'] == 'triggered_country_modifier' and isinstance(x['v'], list)):
        pot = next((x for x in m['v'] if x['k'] == 'potential' and isinstance(x['v'], list)), None)
        cond = conditions(pot['v']) if pot else []
        for x in m['v']:
            if x['k'] in ('mult', 'potential') or not isinstance(x['v'], str):
                continue
            try:
                val = mod_value(x['k'], x['v'])
            except ValueError:
                continue
            effects.append({'kind': 'modifier', 'modifier': x['k'], **val, 'label': modifier_label(x['k']), 'conditions': cond,
                            'mult': first(m['v'], 'mult')})
    extra = [x for x in v if x['k'] == 'resources']
    for block in extra:  # monthly resource output / upkeep declared on the specimen itself
        for part in (y for y in block['v'] if isinstance(y['v'], list) and y['k'] in ('produces', 'upkeep')):
            for r in part['v']:
                if isinstance(r['v'], str):
                    try:
                        amount = float(r['v'])
                    except ValueError:
                        continue
                    effects.append({'kind': 'resource', 'resource': r['k'], 'value': amount if part['k'] == 'produces' else -amount,
                                    'percent': False, 'monthly': True, 'label': local(r['k'], r['k'].upper()), 'conditions': []})
    specimens.append({
        'key': key, 'type': first(v, 'type'), 'rarity': rarity,
        'name': local(key), 'short': local(key + '_desc_short'), 'details': local(key + '_desc_details'),
        'icon': icon(first(v, 'icon'), key),
        'effects': effects,
        'resourcesScript': [raw(x, current_text) for x in extra],
        'tradable': first(v, 'is_tradable') or None, 'sellable': first(v, 'is_sellable') or None,
        'source': f'{spec_origin}:{current_text.count(chr(10), 0, n["s"]) + 1}',
        'acquisition': [],
    })
by_key = {s['key']: s for s in specimens}

# ---------------------------------------------------------------- acquisition ---
# Scripted effects that give specimens (weighted pools) — their callers come from the whole-game call graph.
effect_gives = collections.defaultdict(list)
for name in files:
    if name.startswith('common/scripted_effects/') and name.endswith('.txt'):
        t, o = node_text(name)
        try:
            for d in parse(t):
                if isinstance(d['v'], list):
                    for x in walk(d['v']):
                        if x['k'] == 'give_specimen' and isinstance(x['v'], list) and first(x['v'], 'key') in by_key:
                            effect_gives[d['k']].append((first(x['v'], 'key'), f'{o}:{t.count(chr(10), 0, x["s"]) + 1}'))
        except ValueError:
            pass

records = json.loads((ROOT / 'public/stories/records.json').read_text(encoding='utf-8'))
index = json.loads((ROOT / 'public/stories/index.json').read_text(encoding='utf-8'))
story_title = {s['id']: s['title'] for s in index['stories'] if s.get('visible')}
graph = json.loads((ROOT / 'public/data/source-graph.json').read_text(encoding='utf-8'))


def story_of(def_id):
    sid = records.get(def_id)
    return {'story': sid, 'title': story_title[sid]} if sid in story_title else None


# Hidden events outside every story, named after what triggers them (evidence: their trigger block).
SOURCE_LABELS = {'grand_archive.7100': 'civic_galactic_curators'}  # trigger: is_galactic_curators_empire = yes


def definition_label(def_id):
    """Readable name of a non-event source (artifact action, tradition, project…) from its own localisation."""
    if def_id in SOURCE_LABELS:
        label = local(SOURCE_LABELS[def_id])
        return {'zh': strip_markup(label['zh']), 'en': strip_markup(label['en'])}
    if ':' not in def_id:
        return None
    key = def_id.split(':', 1)[1]
    label = local(key, key + '_name', key.upper(), 'tr_' + key)
    return {'zh': strip_markup(label['zh']), 'en': strip_markup(label['en'])} if label['en'] or label['zh'] else None


def record_acq(spec, kind, def_id, where, via=None):
    entry = {'kind': kind, 'from': def_id, 'source': where}
    label = definition_label(def_id)
    if label:
        entry['label'] = label
    if via:
        entry['via'] = via
    st = story_of(def_id)
    if st:
        entry.update(st)
    if entry not in by_key[spec]['acquisition']:
        by_key[spec]['acquisition'].append(entry)


for name in sorted(files):
    if not name.endswith('.txt') or not name.startswith(('events/', 'common/')) or name.startswith(('common/scripted_effects/', 'common/specimens/', 'common/inline_scripts/')):
        continue
    t, o = node_text(name)
    if 'specimen' not in t:
        continue
    try:
        defs = parse(t)
    except ValueError:
        continue
    for d in defs:
        if not isinstance(d['v'], list):
            continue
        if name.startswith('events/'):
            def_id = first(d['v'], 'id')
        else:
            folder = name.split('/')[1]
            def_id = f'{folder}:{first(d["v"], "key") if d["k"] == "special_project" else d["k"]}'
        if not isinstance(def_id, str) or not def_id:
            continue
        for x in walk(d['v']):
            line = f'{o}:{t.count(chr(10), 0, x["s"]) + 1}'
            if x['k'] == 'specimen' and isinstance(x['v'], str) and x['v'] in by_key:
                record_acq(x['v'], 'event_specimen', def_id, line)
            elif x['k'] == 'give_specimen' and isinstance(x['v'], list) and first(x['v'], 'key') in by_key:
                record_acq(first(x['v'], 'key'), 'give_specimen', def_id, line)

for call in graph['calls']:
    if call.get('via') != 'scripted_effect' or not call['to'].startswith('scripted_effects:'):
        continue
    effect = call['to'].split(':', 1)[1]
    for spec, where in effect_gives.get(effect, []):
        record_acq(spec, 'random_pool', call['from'], f"{call['file']}:{call['line']}", via={'effect': effect, 'source': where})

# ---------------------------------------------------------------- archive-level facts ---
archive = {
    'name': local('grand_archive'), 'concept': local('concept_megastructure_grand_archive_desc'),
    'specimen': local('concept_specimen'), 'specimenConcept': local('concept_specimen_desc'),
    'vivarium': local('concept_vivarium_desc'),
    'types': {'xeno_geology': local('EXHIBITION_XENO_GEOLOGY'), 'aesthetic_wonder': local('EXHIBITION_AESTHETIC_WONDERS'),
              'historical_item': local('EXHIBITION_GALACTIC_HISTORY')},
    'rarities': {r: local('space_critter_rarity_' + r) for r in ('common', 'rare', 'epic', 'exceptional')},
    'multipliers': {t: f'value:{t}_specimens_modifiers_mult = 1 + modifier:{t}_specimens_produces_mult + modifier:specimens_produces_mult'
                    for t in ('xeno_geology', 'aesthetic_wonder', 'historical_item')},
    'multiplierSource': 'common/script_values/05_script_values_grand_archive.txt:341-357',
    'upkeep': upkeep,
}
for r in archive['rarities']:  # short rarity names where the game defines them
    short = local('SPECIMEN_' + r.upper())
    if short['zh'] or short['en']:
        archive['rarities'][r] = short

# Reviewed display wording for engine placeholders (natural phrase + hover note per key; the original text is kept).
reviewed = ROOT / 'content/museum/placeholders.json'
if reviewed.exists():
    wording = json.loads(reviewed.read_text(encoding='utf-8'))
    for s in specimens:
        if wording.get(s['key']):
            s['placeholders'] = wording[s['key']]

out = {'version': 1, 'source': 'common/specimens/specimens.txt', 'archive': archive,
       'counts': {'specimens': len(specimens), 'byType': collections.Counter(s['type'] for s in specimens),
                  'byRarity': collections.Counter(s['rarity'] for s in specimens),
                  'withIcon': sum(1 for s in specimens if s['icon'] and s['icon'].get('url')),
                  'withAcquisition': sum(1 for s in specimens if s['acquisition']),
                  'withStory': sum(1 for s in specimens if any(a.get('story') for a in s['acquisition']))},
       'specimens': specimens}
(ROOT / 'public/museum').mkdir(parents=True, exist_ok=True)
(ROOT / 'public/museum/specimens.json').write_text(json.dumps(out, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
# Reverse links for the reader: document id -> specimens it awards or declares (story documents only), so a chapter
# can point to its exhibit. Small and lazily loaded by the reader.
by_doc = collections.defaultdict(list)
for s in specimens:
    for a in s['acquisition']:
        if a.get('story') and a['kind'] in ('give_specimen', 'event_specimen') and s['key'] not in by_doc[a['from']]:
            by_doc[a['from']].append(s['key'])
(ROOT / 'public/museum/by-doc.json').write_text(json.dumps({k: {'specimens': v, 'names': {x: by_key[x]['name']['zh'] + '|' + by_key[x]['name']['en'] for x in v}} for k, v in sorted(by_doc.items())}, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')

# ---------------------------------------------------------------- readable inventory ---
lines = ['# Grand Archive specimen inventory (generated)', '',
         f"{len(specimens)} specimens from `{spec_origin}`; generated by `scripts/extract-specimens.py`.", '',
         '| Specimen | 中文 | Type | Rarity | Effects (while exhibited) | Acquisition | Stories |', '| --- | --- | --- | --- | --- | --- | --- |']
for s in sorted(specimens, key=lambda s: (s['type'], s['name']['en'])):
    eff = '; '.join(f"{e['label']['en'] or e['modifier']} {e['value']:+g}{'%' if False else ''}" + (f" [if {', '.join(c['label']['en'] for c in e['conditions'])}]" if e['conditions'] else '') for e in s['effects'])
    acq = '; '.join(f"{a['kind']} {a['from']}" for a in s['acquisition'][:4]) + (' …' if len(s['acquisition']) > 4 else '')
    stories = ', '.join(sorted({a['story'] for a in s['acquisition'] if a.get('story')}))
    lines.append(f"| {s['name']['en']} | {s['name']['zh']} | {s['type']} | {s['rarity']} | {eff} | {acq or '—'} | {stories or '—'} |")
(ROOT / 'verification/museum').mkdir(parents=True, exist_ok=True)
(ROOT / 'verification/museum/inventory.md').write_text('\n'.join(lines) + '\n', encoding='utf-8')
print(json.dumps(out['counts'], ensure_ascii=False))
