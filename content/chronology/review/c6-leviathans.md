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
