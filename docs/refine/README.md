# Refinement 2026-10 — what changed, where, evidence, limits

Goal (user, 2026-10-14): refine the site without losing its strengths — Markdown guides, map dragging, natural
placeholder wording for every story and specimen, typography, navigation, "less is more", full-catalogue audit, and a
soundtrack default. Budget ledger: [BUDGET.md](BUDGET.md). Shared agent rules: [RULES.md](RULES.md); agent briefs in
[briefs/](briefs/).

## Work split (subagents, separate file ownership, integrated by the coordinator)

| Area | Agent | Files |
| --- | --- | --- |
| Markdown guides, map drag, substitution tooltips | Sonnet (low) | `src/markdown.js`, `src/name-tooltip.js`, `src/reader-extras.css`, `src/flow-surface.js`, parts of `src/app.js` |
| Typography, brand, navigation, less-is-more | Sonnet (low) | `index.html`, `src/style.css`, `src/museum.css`, `src/i18n.js`, `docs/FONTS.md` |
| Soundtrack default / autoplay | Sonnet (low) | `src/audio-player.js` |
| Placeholder review, 26 story groups + specimens + fallback pass | 12 × Haiku (low) | `docs/refine/placeholders/out/*.json` only |
| Compiler, merge, museum wiring, central clean-up rules, audit | coordinator | `scripts/story_tree.py`, `scripts/extract*.py`, `scripts/refine/*`, `src/app.js` (fill), `src/museum.js` |

## Placeholders (items 3 and 7)

- Original text is untouched: tokens such as `[Root.GetName]` stay in the data; wording is applied at display time.
- Compiler (`scripts/story_tree.py`): every engine-filled key gets a neutral, scope-aware default phrase and a natural
  hover note (`name_note`); reviewed wording from the story fragment (`placeholders`, per-document
  `placeholderDocs`, case-insensitive like the game's scopes) overrides it.
- Review: worksheets (`scripts/refine/placeholder_worksheets.py`) list every key with its complete sentences, tagged
  by document; 1,159 of 1,159 stories with placeholders and 121 of 121 specimens with placeholders were reviewed;
  merged by `scripts/refine/merge_placeholders.py` (validation: no brackets/markup, length, no CJK in English,
  capitalised words flagged as possible invented names) — ledger [placeholders/LEDGER.md](placeholders/LEDGER.md).
- Central rules in the reader (`fill()` in `src/app.js`): doubled articles, sentence-initial capitals, a title
  before a name ("Science Officer [name]") carries the note itself, adjacent title+name pairs merge, repeated nouns
  (`帝国帝国`, "species species"), possessives ("our's"), "they has" → "they have".
- `$KEY$` references are expanded from the game's own localisation (`scripts/extract.py` now keeps the referenced
  keys); remaining ones are runtime values (`$COUNT$`, `$REQUIRED$`) or keys without localisation.
- Tooltip: one shared, accessible element (hover, keyboard focus, tap; Esc closes) for the reader and the museum.
- Audit: [AUDIT.md](AUDIT.md) (`scripts/refine/audit.py`) — per category coverage, reviewed entries, open issues,
  remaining generic fallbacks, unresolved references, guide checks.

## Evidence

Unit tests (`node --test tests/*.test.mjs`, Python unittest), browser checks `scripts/verify-refine-reader.mjs`
(real mouse/touch drags, node click, text selection, guide rendering, tooltip), `scripts/verify-refine-chrome.mjs`
(title/brand, nav entry, fonts, CLS < 0.02, 1600×1000 and 390×844 in both languages; screenshots in
`verification/refine/`, kept local), `scripts/verify-refine-audio.mjs` (autoplay allowed / blocked / saved pause /
saved track), `scripts/refine/sample-render.mjs` (rendered sentences with substitutions), and the existing suites
(`verify-reader-v4`, `verify-ui-capture`, `verify-museum`, `verify-gpu`).

## Known limits

- Reviewer issues stay open where a sentence cannot read perfectly without rewriting game text (e.g. operation code
  names, kill counts, "[X] system" frames); listed per story in the ledger. Reviews were done by Haiku and checked by
  validation, rendered samples and spot checks — not every sentence was re-read by the coordinator.
- Anthropic Serif: no public licence for third-party web use found; Newsreader (OFL) is used instead (docs/FONTS.md).
- Relic descriptions are not shown on the site; relic text that appears inside stories is covered by the story review.
