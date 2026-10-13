# Story review guide (V4)

Applies to every C1–C8 review. Read [STORY-MODEL-V4.md](STORY-MODEL-V4.md) first. The game install
`D:/Living/Steam/steamapps/common/Stellaris` is the authority and is read-only. Compiled output is a draft until a
reviewer has compared it with the game files.

## Tools (run from the project root)

```powershell
$py = 'C:/Users/wangp/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe'
& $py scripts/story_tree.py                      # compile all stories (≈10 s); prints coverage + review counts
& $py scripts/print-tree.py <story-id|record-id> [--en] [--text]   # tree with how each doc is reached
& $py scripts/callers.py <record-id> ...          # who fires it / what it fires, with option/if/random/delay context
& $py scripts/inspect-source.py <record-id> ...   # the record's original script
& $py scripts/guide-skeleton.py <story-id> [--write]   # draft guide from compiled structure (must then be reviewed)
```

Story / doc text is in `public/stories/<id>.json` (both languages). For semantics not visible in a record, read the
original files: `events/`, `common/anomalies`, `common/special_projects`, `common/archaeological_site_types`,
`common/astral_rifts`, `common/situations`, `common/on_actions`, `common/scripted_effects`, `common/scripted_triggers`,
`common/solar_system_initializers`, `common/first_contact`, `common/relics`, `common/artifact_actions`,
`common/static_modifiers`, `common/event_chains` and both localisation folders (`localisation/simp_chinese`,
`localisation/english`).

## What "reviewed" means

For each story in scope:

1. **Root and membership.** Is the root the game's real entry point (anomaly card, site, rift, situation, triggered event,
   origin…)? Are docs that belong to the narrative missing (state-triggered continuations fired by on_actions with flags
   set earlier; events fired by projects/sites/situations in other files)? Are unrelated docs included (shared helpers,
   generic notifications)? Fix with `family` / `include` / `exclude` / `hubs` in the fragment.
2. **Natural order.** Compare the tree with the real gameplay order: options, `immediate`/`after` timing, delays
   (`days`/`months`/`years` + `random`), project completion, site/situation stages, `set_next_astral_rift_event`, on_action
   pulses and flag gates. Never order by ID number or by graph reachability alone.
3. **Exclusivity and parallelism.** Random outcomes (`random_list`, anomaly `on_success` weights, `random_events`) and
   `if/else` chains are mutually exclusive; investigations that can happen in any order are parallel. Check base weights
   and note modifiers (the compiler marks modified weights with `*`). Use `groups` to annotate parallel sets with gates.
4. **Missing / false links.** Add `bridges` for real continuations the call graph cannot see (state-triggered events),
   with conditions as readable labels and concrete `evidence` (file:line, what the script checks). Remove false
   continuations with `suppress` and evidence.
5. **Text and variants.** Every doc keeps original bilingual text. Check that variant passages (`textWhen`) and option
   availability (`when`) are correct; add `readings` / `dialogues` only for reviewed multi-step conversations or reading
   variants that the generic condition model cannot express. Never write replacement text.
6. **Guide.** Write `public/summaries/<story-id>.md` (see below).
7. **Status.** Set `review.status` to `reviewed` only when 1–6 are complete for the whole story; otherwise `partial`
   with an explicit `scope` saying what is missing.

A category is accepted only when every visible story in it is `reviewed` (stories may be very small; a one-doc anomaly
outcome still needs its root, trigger, outcome and guide checked).

## Fragment schema — `content/stories/<story-id>.json`

File name = story id. Only the reviewer owning a story edits its fragment. All fields optional except `id` and `review`.

```jsonc
{
  "id": "anomaly-crashed-ship-asteroid-category",
  "family": {                        // define/curate a multi-root story; its id is this file's id
    "title": {"zh": "…", "en": "…"},  // original game text (e.g. the chain / anomaly / origin name), not invented
    "category": "precursors", "start": "<record id>",
    "members": ["<record id>"], "sources": ["events/x.txt"], "prefixes": ["special_projects:FOO_"],
    "ranges": [{"namespace": "anomaly", "min": 100, "max": 120, "source": "events/anomaly_events_1.txt"}]
  },
  "include": ["<record id>"], "exclude": ["<record id>"],
  "category": "exploration",          // override the compiler default
  "titleFrom": "<record id>",          // use that record's original title as the story title
  "hubs": ["<record id>"], "notHubs": ["<record id>"],
  "bridges": [{ "from": "<doc>", "choice": "<option key>", "to": "<doc>", "conditional": true,
                "label": {"zh": "…", "en": "…"}, "evidence": "events/x.txt:123 …",
                "external": true }],   // optional: link into ANOTHER story without absorbing its root
  "suppress": [{ "from": "<doc>", "to": "<doc>", "option": "<option key>", "evidence": "…" }],
  "groups": [{ "kind": "parallel" | "exclusive", "members": ["<doc>"], "required": 6, "gate": "<doc>",
               "label": {"zh": "…", "en": "…"}, "note": {"zh": "…", "en": "…"} }],
  "endings": { "<doc>": { "label": {...}, "note": {...}, "evidence": "…" } },
  "nodeLabels": { "<doc>": {"zh": "…", "en": "…"} },       // short map labels; originals stay in the reader
  "notes": [{ "doc": "<doc>", "zh": "…", "en": "…", "kind": "review" }],  // commentary, shown apart from original text
  "unreachable": { "<doc>": { "zh": "…", "en": "…", "evidence": "…" } },  // proven not naturally reachable in the shipped script
  "noStageSequence": ["situations:<key>"],   // stages are not sequential (e.g. bidirectional progress); keep stage events as siblings
  "dialogues": { "<doc>": { … see existing cetana / origin_treasure_hunters fragments … } },
  "readings": { "<doc>": { "profiles": [ … ] } },
  "opening": { "targets": ["<doc>"], "label": {...}, "labels": {...}, "evidence": "…" },   // origins only
  "review": { "status": "reviewed" | "partial", "date": "2026-10-12", "reviewer": "…",
              "scope": {"zh": "…", "en": "…"}, "sources": ["events/x.txt"], "uncertain": ["…"],
              "guide": "public/summaries/<story-id>.md" }
}
```

The compiler rejects bridges/choices/groups that no longer match the source. Every label you write is commentary:
keep it short, factual and bilingual. Do not copy Wiki text; do not invent lore. If you cannot verify something, say so
in `uncertain` and in the guide.

## Guide format — `public/summaries/<story-id>.md`

Bilingual, concise, source-grounded. Start from `guide-skeleton.py`, then rewrite:

```markdown
# 中文标题 / English title
- 分类 Category · 来源 Sources (file:line) · DLC if applicable · 审阅 Reviewed <date>
## 如何开始 How it starts          (trigger, conditions, where/when)
## 剧情脉络 Story outline           (natural order; exclusive vs parallel branches; delays; weights)
## 分支与结局 Branches and outcomes
## 条件与文明差异 Conditions and variants
## 审阅记录 Review notes            (what was checked in which files; corrections made; uncertainty; coverage)
```

Spoiler-level summaries are fine; quote original text sparingly (it is already in the reader). Mark commentary as such.

## Ownership while agents work in parallel

Each review agent works in its own copy of the project and owns only the story ids in its assignment list
(`content/chronology/review/assignments/<agent>.txt`) plus any new family ids it creates for stories in that list.
Do not edit shared code (`scripts/*.py`, `src/`), shared configuration, or other agents' fragments/guides. If you need a
compiler feature or find an issue in another agent's stories, write it in your ledger under "Requests" and continue.
Keep a ledger at `content/chronology/review/<agent>.md` with per-story results, evidence and open questions.
