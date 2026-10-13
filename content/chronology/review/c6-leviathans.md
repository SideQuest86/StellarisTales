# C6 Leviathans, guardians and enclaves — review ledger

Reviewer: C6 agent (Opus 5.5), started 2026-10-12. Working copy `st-agents/c6-leviathans`. Game install is the authority.
Assignment: `content/chronology/review/assignments/c6-leviathans.txt` (69 story ids).

## Method / conventions

- Enclave contact menus (X00 on_custom_diplomacy router, X04 first-contact router, X05 menu) are modelled as one
  repeatable-service family per enclave: the menu doc is the root, every service window is a child, returns to the
  menu are `↺` ref nodes. Separately triggered one-time events (contract expiry, destruction, Khan deal, foundation,
  tunnel incidents, origin events) stay their own small stories and cross-link to the menu family.
- Shared events that another system triggers primarily (colony age, five-year pulse, research-station, Shroud patron
  first contacts) and that only appeared inside C6 trees are declared `hubs`, so they become their own stories and C6
  trees show cross-links (merge-safe: a family that later claims them still owns them).
- Family titles use original localisation strings (government names `gov_*_enclave`, situation type names, bypass names).

## Story-id mapping (assigned id → reviewed story)

| Assigned id | Now | Reason |
| --- | --- | --- |
| event-enclave-200, event-enclave-204 | `mercenary-enclave` (family) | both were roots of the same menu enclave.205 (on_custom_diplomacy / first contact) |
| event-enclave-300, event-enclave-304 | `salvager-enclave` (family) | same menu enclave.305 |
| event-enclave-400, event-enclave-404 | `shroudwalker-enclave` (family) | same menu enclave.405 |
| event-enclave-7000, event-enclave-7060/7065/7070/7075 | `shroudwalker-enclave` | 7000 = psionic-tradition introduction; 7060–7075 = Shroudwalker Insight situation results (fire_on_action, not visible to the call graph) |
| event-enclave-7005 | `salvager-enclave` | Salvager introduction on tech research |
| (divination part of 300/304/400/404) | `shroudwalker-divination` (new family) | rite of divination (enclave.415 → two signs → prophecy pool) is its own long-running story |
| event-enclave-100, -6000, -6005, -6020, -4250, -4200 | `shroud-tunnels` (family) | first tunnel sighting, on_entering_shroud_tunnel random pool, beacon built/destroyed |
| event-enclave-390, event-enclave-7200, event-leviathans-605 | `enclave-leader-departure` (family) | three duplicate one-doc stories of the same leader event enclave.8000 |

## Per-story results

(see sections below; status mirrors the fragment `review.status`)

### Batch 1 — Overlord enclaves (reviewed 2026-10-12)
| Story | Status | Key evidence / corrections |
| --- | --- | --- |
| mercenary-enclave | reviewed | menu 205 + services 210–2040, patron submenu 280 (235/285/2040), recall → 294–299 (client) / 290 (patron, 90–180+90 d). Was copied into 5 stories. |
| salvager-enclave | reviewed | menu 305 + 310–365; delays 360 (120+40 d), 336 (1441 d), 346 (1801 d), 365 (60+30 d); 341→365 sequential. Veilfarer opens Shroudwalker window 7110 (cross-link). |
| shroudwalker-enclave | reviewed | menu 405 + shroud.5300 submenu (folded), Insight situation → 7060/7065/7070/7075 (40/25/25/10, 00_on_actions.txt:4960) bridged; 5325/5330 false sibling refs suppressed; 12 patron first contacts → hubs. |
| shroudwalker-divination | reviewed | 415 → 4100 (5:5, ×0.2 recent) → two signs; ≤1 prophecy per sign; 416 / 5557 closings. colony.3005, envoy_events.5, federations3.2001 → hubs. Script oddity: 5090.c (xenophobe refusal) → 5100. Psionic-anomaly windows spawn anomaly categories (notes, not bridges). |
| shroud-tunnels | reviewed | 100 first sighting; on_entering_shroud_tunnel 74/10/10/5/1 (00_on_actions.txt:4126); beacon 4200 / 6015. |
| enclave-leader-departure | reviewed | enclave.8000 via 7200/390/605 (+ trader 156/159/162 cross-link). |
| event-enclave-2 | reviewed | foundation → enclave.21 → dividends situation (enclave-owned, pays patron 32/32/32/2/2, restarts) + menu cross-link. |
| event-enclave-2045 | reviewed | Khan deal: bi-yearly; AI patron → direct hire; player → 2050; 2051 after 60/7 d. |
| event-enclave-2059 | reviewed | contract expiry → 2060 / shroud.6878 (Mindwarden). Mindwarden menu edges suppressed (request 3). |
| event-enclave-23, -370, -430 | reviewed | destroyed notices per viewpoint (destroyer / others / observer). |
| event-enclave-27 | reviewed | recall on attack, refund. |

## Requests (for coordinator / other owners)

1. **Compiler: windows that inherit text via `base =`** (e.g. `shroud.5300`, base = enclave.405, option_clear only)
   are treated as unreadable and folded, so the "Shroud mastery" submenu disappears and its options hang under the
   parent option. Please treat events with own options + `base` as docs (inherit title/desc from base).
2. **scripts/callers.py crashes** on a path segment `{'k': 'effect'}` without `name` (`p['name']` KeyError, e.g.
   `callers.py enclave.21`). Use `p.get('name')`.
3. **Mindwarden enclave contact menu** (`shroud.4201` router → `shroud.4205/4300/4320/4340/4350/6851–6853` and
   services) has no owning family and is embedded in three trees (C6 event-enclave-2059, C8a event-shroud-4199,
   C1 origin_mindwardens). Please make it one repeatable-service family (C1 or C8a). C6 currently suppresses the
   edges `shroud.6878 → those variants` in `content/stories/event-enclave-2059.json`; **remove those suppressions
   once the family exists** so the option becomes a cross-link.
4. New stories created by C6 hub declarations (need an owner; currently unassigned):
   `event-colony-3005` (The Doorway, colony-age event reused by divination), `event-envoy-events-5`,
   `event-federations3-2001`, and twelve Shroud-patron first-contact stories `event-shroud-4000 … 4120`
   (patron first_contact_event in common/patrons/patron_types.txt; previously reachable only through the
   Shroudwalker "commune" service).
6. **Compiler: cross-story bridges destroy the target's root.** A fragment bridge to a doc that is the root of an
   automatic story (e.g. an anomaly category) adds an adjacency edge in `find_roots`, so the target loses its root
   status and gets embedded (tested with `anomalies:FROZ_ILLUMINATED_CAT`; reverted). Please let bridges to roots of
   other stories become cross-links without changing root detection (e.g. ignore bridge edges whose target is
   already a root, or add a `crossLink: true` bridge flag).
5. C7 (fircon.1212, first_contact_dlc_events.txt:711) sets `knows_jaunting_traveler_story`, which unlocks the
   "Veilfarer" question at the Salvager/Shroudwalker menus (enclave.7110). A cross-link from fircon.1212 would help.

### Batch 2 — carried over from the first session (reviewed 2026-10-12, recorded here on resume 2026-10-13)
| Story | Status | Notes |
| --- | --- | --- |
| trader-enclaves | reviewed | family: XuraCorp / Riggan / Muutagan menus (105/106/107), deals 130-135/150-152, hidden routers 100/101 folded; 98 greeting hub. Assigned ids 100, 101, 155, 157, 160, 163, 170 map here. |
| artisan-troupe | reviewed | assigned ids 285, 290, 351, 354 map here. |
| curators | reviewed | assigned ids incl. 500-600 range via family. |
| infinity-machine | reviewed | |
| event-leviathans-98 | reviewed | first-contact greeting router hub. |

### Batch 3 — guardians (reviewed 2026-10-13, resume session)
| Story (new family id) | Absorbs assigned ids | Verdict / key evidence / corrections |
| --- | --- | --- |
| enigmatic-fortress | event-leviathans-2099, -2100 | family start 2105 (approach), entries 2101 (on_ship_disabled -> hidden 2100) and 2099 (on_ship_destroyed_perp). Projects 1A/1B and 5A-5D are exclusive via same_option_group_as (00_projects_leviathans.txt:191,243,269,295). Tower puzzle 2131: only option c continues; 2113.a/2114 and 2152 a/c are failures; failures all restart the fortress. Ending 2157 (force) wrecks the system. Gestalt shortcut at 2099.c.gesta. |
| situation-leviathan-celebration-opportunity | (itself) | **Correction:** compiler chained the eleven stage_2 events (1045..1120) as a sequence; they are fired together by on_first_enter but each gates on its celebration_* trophy flag, so they are exclusive alternatives. Fixed with 10 suppress + 10 bridges + exclusive group. 1000/1005 gestalt split; 1085 -> 1090 -> 1095 only for the Horrific Inverse Mass trophies (set_celebration_modifier, 00_scripted_effects.txt:5897+). 16 start_situation callers listed in notes. |
| stellar-devourer | event-leviathans-999, -1001, -1016 | 999 (7 d) -> 1000 spawn; 1001 alt notice; 1016 on kill (bridge); 1016.a project vs .c celebration; 1017.a/b; 1018 70:30. Hidden combat events 1005-1015 not modelled. |
| ether-drake | event-leviathans-610, -648, -650, -670 | 610 encounter; 649/650 retaliation notices (bridges with HP 15-80% condition); 670 kill (3 options by can_harvest_dna / is_reanimator) -> REANIMATE project -> 675. |
| dragons-hoard | event-leviathans-660, -662 | hidden 660 (mining station) / 662 (system gained) schedule 661 bones and 663 egg independently (1 d + 0-18000 d); incubation project 50000, 1800 d; 664/665. |
| spectral-wraith | event-leviathans-2010, -2011, -2014, -2061 | survey 2010 -> mid-game pulse 2011 spawn -> 2012 / 2013 (exclusive via guardians_wraith_encountered) -> 2014. 20101 removes the pulsar flag if not surveyed in time. |
| dimensional-horror | event-leviathans-3000, -3002 | 3000 hidden spawn (disabled 8 d, 3220), 3001 notice, 3002 hidden kill -> 3003 (6 d) -> project -> 3004. |
| automated-dreadnought | event-leviathans-3100, -3101 | 3100 -> hidden 3101 -> 3102 (a project / b salvage / c harvest) -> 3103. |
| hive-asteroids | event-leviathans-3202, -3203, -3210 | 3202 entry; mining -> hidden 3200/3210 (MTTH 100 y, x0.3 per hive asteroid) -> 3201 attack (sets provoked_hivers) -> hidden 3203 -> 3204 -> project -> 3205; Void Hive coexistence: 3202.b EXPLOIT_HIVERS -> 3230. |
| event-leviathans-4 | (itself) | shared "Leviathan Defeated" notices: hidden 4 -> 6 (2 d) -> 5 / observer.1. |
| shroudwalkers-depart | event-enclave-4239, -4244 | gatekeepers 4239 (external crisis) / 4244 (player crisis level 5) -> 4240 / 4245; exclusive via global flag shroudwalkers_departed. Warning enclave.4243 belongs to origin_shroudwalker_apprentice (C1). |

Assignment coverage: all 69 ids are covered (reviewed fragments or merged into reviewed families); no `partial` stories.

### Requests (added on resume)
7. **Compiler: situation stage lists.** `stage_sequence()` (scripts/story_tree.py:555) chains every event fired from a situation's `stages` in definition order. For situations where one stage fires several mutually exclusive events (leviathan_celebration_opportunity stage_2), this is wrong; C6 worked around it with suppress+bridges. A reviewed per-situation switch (e.g. `stageMode: "parallel"`) would be cleaner.
8. **Owner decision:** `enclave.4243` (Teachers' Warning) lives in `origin_shroudwalker_apprentice`; C1 may want a cross-link to the new `shroudwalkers-depart` family.
9. New C6 family ids (potential name clashes with other agents): enigmatic-fortress, stellar-devourer, ether-drake, dragons-hoard, spectral-wraith, dimensional-horror, automated-dreadnought, hive-asteroids, shroudwalkers-depart.
