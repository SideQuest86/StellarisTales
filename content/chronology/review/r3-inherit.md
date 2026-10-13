# r3-inherit ledger (2026-10-13)

Scope: 29 stories re-checked after the event-inheritance fix (`base = other.event`). Method: printed each new tree, compared it with the
guide and fragment, looked up `base =` in the game files (children inherit title/picture/desc/options unless `desc_clear` / `option_clear`).
`scripts/story_tree.py` runs cleanly (exit 0) after all edits. Verdict codes: ok = unchanged-ok (re-checked, guide line added), fixed = fragment/guide changed.

## Per story

| Story | Verdict | What changed / what was checked | Evidence |
| --- | --- | --- | --- |
| artisan-troupe | ok | 304/313/332 inherit menu 300 (`desc_clear` only) and show it as returns; 305/310/321-324/330/340/345 have `option_clear`. The two "commission art" options in 300 are the affordable/unaffordable variants, not a duplicate. | leviathans_events_1.txt:3153-3330, 3447-3470 |
| curators | ok | 504/591 inherit menu 500 -> returns; services (507-600, 4000, 4100) option_clear; 502 really has one option. | leviathans_events_1.txt:4814-4864, 4882 |
| event-first-contact-480 | ok | only first_contact.462 inherits (desc); 472 has an empty title because its title key is missing in localisation (not inheritance). | first_contact_events.txt:6964-6978, 8018 |
| event-nomads-150 | ok | 110/115/120 inherit hub 100 (descoption) and return as refs; 160/105/405/410 independent. | nomads_events_1.txt:2383-2520 |
| event-nomads-4800 | ok | toxoids.40 (base planet_destruction.610, option_clear) now has title/picture. | toxoids_events.txt:347 |
| event-pirate-4 | fixed | pirate.2/8/9/12/16 (title-only `base` variants for Treasure Hunters who met Captain Hoo) are now compiled docs; added an exclusive group, rewrote the pirate.1 note, cleared the open item, guide updated. | pirate_events.txt:317-319, 702-704, 709-711, 949-951, 1038-1040 |
| event-planet-destruction-600 | ok | 615 inherits 610 (option_clear), title now present. | planet_destruction (base lines) |
| event-preftl-operation-1015 | ok | 1019/1020/1021 inherit 1016/1017/1018 (desc), tree consistent with guide. | preftl_operation events |
| event-preftl-operation-1025 | ok | 1027/1028 inherit 1026 (1028 option_clear). | idem |
| event-preftl-operation-3060 | ok | 3062/3064 inherit 3061/3063 (desc). | idem |
| event-shroud-20 | ok | 7105/7110 inherit 7100 (descoption); sequence loop 7105<->7110 shown as return, unchanged. | shroud_events.txt (7100-7121) |
| event-shroud-4199 | fixed | 4230-4350 and 6851-6881 inherit menu 4205/6855; all now show the menu loop as returns. Removed the hand-made bridge 6851 -> 6855 (now automatic via inherited option 4205.i); rewrote the 6851-6853 notes; guide corrected ("compiler does not read base" was stale). Back-option suppress entries (4230/4240 -> greetings) still hold. | shroud_events.txt:14948-14968, 9568-9584 |
| event-shroud-5375 | ok | base enclave.405 with desc_clear + option_clear: inherited title is the enclave name, one option; guide note added. | shroud_events.txt:14855-14860 |
| mercenary-enclave | ok | 210-280 and service answers 211/225/245-266/235 inherit hub 205 (service windows `option_clear`, thank-you windows keep the full menu); menu loop is returns, no new chapters. "245 -> 245" refs are the alternate (afford/cannot-afford) variants of option 240.a, not self loops. | overlord_enclaves_events.txt:1629-1635, 1896-1941 |
| origin_mindwardens | ok | 6515-6535 inherit 6510 (option_clear); 6723/6730/6740/6745/6760/6765 inherit the 6720 menu (desc_clear only) -> returns; 6725/6735/6750/6755/6763/6780-6795 option_clear. No bridge/suppress had to change. Titles "???" of 6720-6765 are the real titles. | origin_events_shadows_shroud.txt:1655-1789, 2635-2898 |
| origin_payback | ok | 4016-4019 inherit 4015 and 4031/4032/4036/4037 inherit 4030, all `option_clear`; tree loops (4016/4017/4018/4030/4031) match the scripted options. | origin_events_4.txt:516-700, 1045-1420 |
| origin_scion | fixed | origin.24 (base origin.21) now has title and text; added it to `opening.targets` with a label, cleared the open item, guide updated. | origin_events_1.txt (24 base 21) |
| origin_shroud_forged | ok | 15/20/25/70/250-313 inherit .10 and 415-475 inherit .400, all with `desc/option/trigger_clear`; options of 400 -> answers and delayed random results match the script. Still open (pre-existing): stage events chained, random-event exclusion script not read. | shroud_forged_events.txt:1778-2640 |
| origin_toxic_knights | ok | 7013-7017 (base 7012), 7155-7164 (base 7150), 7265 (7260), 7275-7290 (base 7270) all consistent; 7275/7280/7285 keep the inherited menu (returns), 7290 option_clear. Pre-existing uncertainty remains: middle tales 7055-7165 taken from the tree. | toxoids_events.txt:807-892, 1757-2060, 2457-2561 |
| origin_treasure_hunters | ok | only 8527/8528/8532/8533 inherit (title/picture); 8531 title key genuinely missing. | origin_events_grand_archive.txt:6066-6276 |
| origin_unplugged | ok | 2037 (base 2036), 2446 (base 2445, option_clear), 3206 (base 3205) consistent with guide. | unplugged_events.txt:788, 2430, 3363 |
| salvager-enclave | ok | 310-350 and answer windows inherit hub 305; menu loop shown as returns. | overlord_enclaves_events.txt:4552-6293 |
| shroudwalker-divination | ok | 5521/5522/5526/5531/5541/5551 are `option_clear` children of the 5520-5550 chain; 5535/5536 chain matches. | overlord_enclaves_events.txt:11175-11720 |
| shroudwalker-enclave | fixed | shroud.5300 submenu is now a real page (not folded); its six options loop back to it and 5325/5330 re-open it via 5326. Removed all 10 `suppress` entries (no false edges reappear), moved the review note from shroud.5305 to shroud.5300, dropped the stale uncertain item, guide lines updated. | shroud_events.txt:17388, 18129-18146, 18249, 18264 |
| site-larion-digsite | ok (guide fixed) | unique.16/17/18/20 inherit unique.15 (the clone menu): 16-18 return to the menu, d -> 20 -> 22. Guide had blank titles ("-  / ："); filled. | unique_system_events.txt:13+ |
| site-zevox-digsite | ok (guide fixed) | unique.72-100 inherit unique.70 (Animator of Clay title); branches match. Guide had blank titles; filled. | unique_system_events.txt:435+ |
| situation-situation-nanotech-consume-planet | ok | toxoids.40 inheritance only (title/picture). | toxoids_events.txt:347 |
| trader-enclaves | ok | 123-135, 150-152, 156-163 inherit the XuraCorp/Riggan/Muutagan menus (105/106/107); returns fine. | leviathans_events_1.txt:1133-2856 |
| war-in-heaven | ok | no inheriting docs in the tree. | - |

All 29 stories keep `review.status = reviewed`, date 2026-10-13, reviewer `...; r3-inherit`; each guide has a "2026-10-13 r3-inherit" review-notes line.

## Open questions

- origin_toxic_knights / origin_shroud_forged: the pre-existing note that the compiler chains situation stage events (tales 7006-7225; stages 280-250-260) still applies; option-level details of middle tales were not re-read line by line in this pass.
- event-pirate-4: the compiler already puts the title-only variants in the same entry group (c1-c3) as their bases; my extra exclusive group is therefore partly redundant but harmless.

## Requests (stories I do not own)

- None blocking. Possible compiler improvement: an enclave service "thank you" window that only inherits a hub menu (`desc_clear` without `option_clear`, e.g. leviathans.304, enclave.211/225) currently appears as a full node plus ~7 return lines; collapsing these as a single "returns to the menu" marker would shorten the maps.
- first_contact.472 shows an empty title because its localisation key is missing (original-game gap); other stories may show the same for missing keys.
