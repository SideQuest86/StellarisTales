# Story model V4 — root-anchored story trees

Status: design adopted 2026-10-12 (Opus 5.5 takeover). Supersedes the V3 grouping heuristics (namespace union-find,
hash identities, filename-keyword categories, per-chapter reading profiles). V3 reviewed facts (bridges, dialogue
states, readings, endings, guides) remain valid evidence and are migrated, because they are keyed by stable game IDs.

## Why V3 was wrong

1. `common/anomalies` was never extracted. Anomaly categories are the real roots of exploration stories: the discovery
   card (title, description, picture, level) and a weighted `on_success` list of mutually exclusive outcome events.
   Without them, e.g. *Crashed Ship (asteroid)* became two unrelated one-page cards (`anomaly.35`, `anomaly.65`).
2. Callers outside `events/` were not indexed (on_actions, decisions, technologies, relics, artifact/astral actions,
   buildings, megastructures, system initializers, first contact, observation missions, traditions, policies…). Without
   callers a story's entry point and trigger cannot be known, so roots were guessed.
3. Records were grouped by union-find over same-namespace links and shared flags, with hash IDs; generic helpers such as
   `story.5` leaked into stories as "next" links; categories came from file-name keywords.
4. Text variants were chosen per chapter, so a reader could pick contradictory empire contexts in consecutive chapters.

## Concepts

**Doc** — one readable game window or definition card, shown with its original art, title, body and options:
`event` (visible event window), `anomaly` (anomaly discovery card), `site` (archaeological site), `rift` (astral rift),
`project` (special project), `situation`, `chain` (event chain overview), `origin`. Hidden events are never docs; they are
routing and are folded into edge annotations.

**Story** — a tree of docs rooted at the game's own entry definition:

| Root definition | Default category |
| --- | --- |
| origin (`common/governments/civics`, `is_origin`) | C1 origins |
| precursor event chain / precursor anomaly categories / archaeological site | C2 precursors |
| anomaly category | C3 exploration |
| astral rift | C4 rifts |
| crisis entry (crisis files, crisis_levels, crisis paths) | C5 crisis |
| leviathan / guardian / enclave entry | C6 leviathans |
| situation, pre-FTL/observation, colony, faction, first contact | C7 society |
| any other visible event without an in-story caller (on_action, decision, tech, relic, …) | C8 stories |

Categories are reviewed facts in the story fragment; the table is only the compiler default.

**Tree** — nodes reference docs; each non-root node records *how* it is reached from its parent:

```jsonc
{ "doc": "anomaly.65", "parent": "n0", "via": {
    "kind": "option" | "random" | "condition" | "delay" | "project" | "stage" | "trigger" | "bridge",
    "option": "anomaly.35.a",          // parent option key when a player choice leads here
    "group": "g3",                      // siblings with the same group are mutually exclusive outcomes
    "weight": 1, "chance": 0.5,          // random_list / anomaly on_success weights (base; modifiers listed)
    "delay": {"days": 180, "random": 60},
    "condition": {"zh": "…", "en": "…"},  // readable, reviewed where present
    "label": {"zh": "…", "en": "…"},
    "source": "events/anomaly_events_1.txt:812" } }
```

A doc reached twice inside one story appears once as a full node; later occurrences are `ref` nodes pointing at it
(“turn to page X”), so the reading structure is a strict tree while convergence is preserved. Cycles (repeatable menus,
conversation loops) are `ref` nodes with `via.kind = "return"`.

Structural groups that a plain tree cannot express are explicit nodes:

- `parallel` — children may be read in any order (precursor investigations, four countermeasures); `required` count and
  the gate doc that opens afterwards.
- `exclusive` — the children are alternatives (random outcomes, if/else branches, success/failure).

**Docs and text** — every doc keeps the original bilingual text and its provenance:

```jsonc
{ "id": "anomaly.35", "kind": "event", "title": {...}, "image": "art/….webp",
  "body": [ { "text": {...}, "when": <condition> } ],
  "options": [ { "key": "anomaly.35.a", "label": {...}, "when": <condition>, "tooltips": [{...}], "responses": [{...}] } ],
  "source": { "file": "events/anomaly_events_1.txt", "line": 812, "archive": "dlc/…zip" | null } }
```

`when` is a structured condition (DNF of atoms) produced by the compiler:
`identity` atoms (ethics, authority, origin, civic, gestalt…), `flag` atoms (story-local flags set by options on the path),
and `other` atoms with a readable label. Commentary (guides, reviewed labels) is never mixed into `text`.

## Reading context (fixes cross-chapter contradictions)

- **Empire profile** — chosen once (archive-wide, persisted), not per chapter: ethics, authority/gestalt, origin and the
  few civics/traits the archive uses. Every doc on every path resolves identity atoms against this single profile.
- **Path state** — flags set by options chosen earlier on the current path; variants requiring a story-local flag are
  shown only when the path set it. Backtracking recomputes state from the remaining path.
- **Unknown** — atoms the archive cannot know (save-state values, other empires) remain visible as labelled alternatives,
  never silently resolved. This is not a save-game simulation.

## Reviewed fragments

One file per story: `content/stories/<story-id>.json` (story-id is a readable slug of the root key, never a hash). Fields:
`root`, `category`, `include` (extra roots/records merged into this story), `exclude` (shared helpers that are not part of
it), `edges` (reviewed bridges), `suppress` (false auto-edges), `groups` (parallel/exclusive), `endings`, `labels`
(map titles), `dialogues`, `readings`, `review` (`status`, `scope`, `sources`, `uncertain`, `guide`). The compiler
rejects references that no longer match the game source. Guides live in `public/summaries/<story-id>.md`.

## Acceptance

A category is accepted only when every visible story in it has `review.status = "reviewed"` with a guide, its tree and
variants were checked against the game source, and representative browser paths (including reversals) pass. Remaining
uncertainty is recorded in the fragment and guide, not hidden.
