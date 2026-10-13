
## r2-society (2026-10-13)

### event-colony-9820 — reviewed (was partial)
- Switched the situation's stage chaining off with `noStageSequence: [situations:situation_negative_mass]` (the old `stageSequence:false` key was not read by the compiler) and suppressed the auto edge situation -> 9880 (9880 is placed under 9875 by the existing bridge). The four false stage refs are gone. Guide and fragment status updated.

### event-situation-5 — reviewed (was partial)
- Added `noStageSequence: [situations:situation_mysterious_labyrinth]`; the false 25->15, 15->10, 10->40 links disappear without further suppress. Guide, scope and note updated.

### event-colony-3005 — reviewed (new own story: The Doorway)
- The portal chain (3005, DPORTAL_* projects, 3006-3012, 3020-3024, 3040/3041, 3050/3055/3060, 9800-9815, negative_mass chain card) is its own C7 colony story, 29 docs. Weights 10/10/10/10/5 verified at `00_projects_3.txt:811-851`; knights route 15/25/20/40 at `colony_events_3.txt:1344-1356`.
- Added external bridges: 3021.b / 3024.a -> colony.3031 (event-colony-3029 trade story), 3050 -> 3051 (on_colony_defenders_lose, `00_on_actions.txt:885`), 9815 -> 9820 (on_fleet_destroyed_perp). Groups for the five dimensions and the knights outcomes. Guide written.
- Open: reward details of 3050/3055/3060 and NULLVOID_PROJECT read for structure only.

### situation-voidworm-country-situation — reviewed
- Voidworms' own behavior situation (monthly 2055 -> 2065 / yearly 2300 crisis check / 2460) and the voidworm plague situation (2310, approaches, stage-2/3 random events from `inline_scripts/grand_archive/voidworm_crisis_random_events.txt`, completion 2500). The 9 stage events were a flat random set; now three exclusive pools by approach (one draw per stage 2 and 3, flag-limited).
- External bridge plague -> grand_archive.2053 (destroying the last nest adds 1000 progress, `grand_archive_events.txt:609-659`; story event-grand-archive-2051). Frenzied voidworms / sabotage situations belong to the origin story.
- Open: numeric crisis start chance (script values) not evaluated.

### event-federations3-2001 — reviewed (Dismembered Cloud joint operation)
- Real entry is hidden ship event 2000 (on_building_research_station 5/105, enclave.4150); documented in a note. Finale 2015/2016/2017 grouped as exclusive with endings (all fixed / none / partial, `federations_events_3.txt:1196-1232`).

### event-first-contact-critters-15 — reviewed (one window)
- Tiyanki first contact stage 2 (tiyanki_stage_2, `01_first_contact_space_fauna_and_NPCs.txt:66-83`). Suppressed 9 external links that come from the generic `finish_first_contact_effect`.

### Requests (r2-society)
1. event-first-contact-critters-10 (c7b-society) should absorb first_contact_critters.15 as a family member with a stage bridge `first_contact_critters.10.A -> 15` (`first_contact_NPC_country_types_events.txt:134`); its note says 15 is in the Primal Calling origin, which is no longer true (hub grand_archive.200 freed it). Then event-first-contact-critters-15 can be dropped.
2. event-enclave-300 (c6): colony.3005 and the portal chain should stay excluded from it now that event-colony-3005 exists; c6 divination reaches 3005 through the hub declaration.
3. event-colony-3029 and event-colony-3051 (c7b) could add reverse cross-story bridges; event-colony-3051 does not mention that 3050 belongs to event-colony-3005.
