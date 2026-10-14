# 博物天枢 / Grand Archive — verified facts for the museum

All facts below were read from the installed game (Stellaris Cygnus v4.5.2) on 2026-10-14. Paths are relative to
`D:/Living/Steam/steamapps/common/Stellaris`. Where the files do not say something, this document says so.

## Name

- Official names: `grand_archive: "博物天枢"` (`localisation/simp_chinese/grand_archive_l_simp_chinese.yml:7`) and
  `grand_archive: "Grand Archive"` (`localisation/english/grand_archive_l_english.yml`). The user's recollection
  "博物天枢" is the exact official Chinese name.
- It is a megastructure. Concept text (`concept_megastructure_grand_archive_desc`): it "allows the display of acquired
  Specimens", adds Vivarium capacity (`@grand_archive_vivarium_capacity = 250`), and "preserves and exhibits the most
  valuable artifacts we have collected throughout the galaxy".

## What a specimen is (and is not)

- **Specimen 标本** (`concept_specimen_desc`): "artifacts found while exploring the galaxy. They can be exhibited in a
  Grand Archive to provide empire-wide bonuses." Defined in `common/specimens/specimens.txt` (258 entries).
- **Not relics** (`common/relics/`): relics are a separate, unique-item system with triumph/passive effects.
- **Not minor artifacts**: minor artifacts are a *resource* (`minor_artifacts`). They meet specimens in one place:
  the artifact action `artifact_analysis` (`common/artifact_actions/`) can award a random specimen from the pools in
  `common/scripted_effects/grand_archive_effects.txt`.
- **Not vivarium fauna**: live space fauna go into the Vivarium (`concept_vivarium_desc`), a separate container.

## How specimens work

- **Type (collection)**: `xeno_geology` 异星奇景 Xeno Geology (82), `aesthetic_wonder` 美学大观 Aesthetic Wonders
  (91), `historical_item` (85; labelled through `EXHIBITION_GALACTIC_HISTORY`).
- **Rarity**: set by `common/inline_scripts/grand_archive/set_specimen_rarity.txt` — common 77, rare 80, epic 70,
  exceptional 31. Rarity selects the upkeep inline script `specimen_upkeeps/specimen_upkeep_<rarity>.txt`, multiplied by
  `value:grand_archive_size_effect`.
- **Display effects**: each `triggered_country_modifier` applies while the specimen is exhibited, multiplied by
  `value:<type>_specimens_modifiers_mult = 1 + modifier:<type>_specimens_produces_mult + modifier:specimens_produces_mult`
  (`common/script_values/05_script_values_grand_archive.txt:341-357`). Values in the museum are therefore **base
  values**. A `potential` block is a condition (gestalt / non-gestalt, lithoid main species, `trait_infernal`, consumer
  goods use, one country flag); conditional bonuses are shown with their condition, never as unconditional.
  64 specimens instead declare monthly resource output in a `resources` block.
- **Capacity**: `@collection_max_exhibit_count = 9` per collection; `@archive_max_exhibit_count = 31`
  (comment: collection max × collections + storage slots) — `common/scripted_variables/07_scripted_variables_grand_archive.txt`.
- **Exhibition Focus policy** (`common/policies/02_policies_grand_archive.txt:74`): the focused collection gets
  +50 % specimen output, the other two −25 %.
- **Curator rewards** thresholds per collection: 3, 5 and 9 exhibits (`@curator_reward_*_threshold`,
  `value:available_rewards_per_category`).

## How specimens are acquired (traced per specimen in `public/museum/specimens.json`)

- `give_specimen = { key = … }` in events and other definitions (161 links).
- Event-level `specimen = <key>` declared on an event (111 links). The shipped files contain no documentation of this
  field; the museum calls it "declared by this event" and does not claim when exactly it is awarded.
- Weighted random pools in scripted effects (46 links through their callers: artifact analysis, the archivism
  tradition "Frontier Archaeology", the Galactic Curators civic start event `grand_archive.7100`, …).
- 242 specimens link to at least one story dossier of this archive. `planet_vaccine` is defined but never awarded by
  any shipped script (no `give_specimen`, `specimen =` or pool entry) — shown as such.

## Ambiguities kept visible

- Engine timing of event-level `specimen =` (undocumented).
- Two modifiers have no game label (`terraform_speed_mult`, `species_leader_exp_gain`); the museum shows the
  modifier key in readable form and marks it as unlabelled.
- Placeholder names in descriptions (e.g. `[EVENT_TARGET_0.GetName]`) depend on the save; shown as the game's own
  placeholder wording, not invented names.
