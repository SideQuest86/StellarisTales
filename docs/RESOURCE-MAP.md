# Resource map

Paths below are relative to `D:/Saving/Living/CodexProjects/StellarisTales` unless absolute. Keep existing layout: moving source/assets would break imports and generated references.

## Inputs and provenance

| Location | Role |
| --- | --- |
| `D:/Living/Steam/steamapps/common/Stellaris` | Read-only authoritative local game installation. Historical extraction version Pegasus 4.4.6; recheck before importing a newer install. |
| Game `events/`, `common/`, `localisation/`, `localisation_synced/`, `gfx/`, `interface/`, `dlc/` | Event/effect definitions, bilingual localization, original art and DLC archives; extractor source manifest is the precise inventory. |
| `public/data/sources.json` | Extracted source paths/hashes; compare before assuming game files match generated data. |
| `public/data/art-sources.json`, `public/art/` | Original-art mapping/provenance and converted WebP assets. |
| `public/data/index.json`, `public/data/groups/` | Generated raw record index and source shards, including developer-only source script fields. |
| `public/data/coverage.json`, `story-coverage.json`, `origin-coverage.json` | Generated extraction/assignment reports. Do not hand-edit or equate coverage with chronology. |
| `public/music/playlist.json`, MP3s, `cover.webp` | Imported original OST, ordering and metadata; import via scripts/import-ost.py. |
| `public/THIRD_PARTY_NOTICES.txt` | Attribution and rights notes. Game assets are not covered by code licensing. |
| https://qunxing.huijiwiki.com/wiki/首页 | Optional supplementary commentary; previously inaccessible (403), no verified Wiki commentary imported. |

## Visual reference (local, ignored by Git)

`RhineLabUI-main/` is the user-supplied reference, not this app's implementation. Preserve it separately when moving machines; read its AGENTS.md if working inside it. Useful entry points:

- `src/scene.ts`, `archive-loop.ts`, `archive-drag.ts`, `motion.ts`, `viewer-camera.ts`: continuous rows, motion and close-up placement.
- `src/glass-reveal.ts`, `decryption.ts`, `document-decryption.ts`, `ui-transitions.ts`: frosted reveal and document transitions.
- `src/typing-rhythm.ts`, `render-quality.ts`, `quality-renderer.ts`, `viewport-layout.ts`: typography timing and rendering quality.
- `docs/media/`: browse/detail/decryption screenshots and GIFs.
- `reference/detail-transition.html`, `viewer-motion-check.html`, `loop-review.html`, `decryption-review.html`: targeted reference studies.

The original user screenshot was supplied from a temporary clipboard path and may not survive migration. Reference screenshots/GIFs remain here. Product intent is recorded in HANDOFF.md; do not copy Rhine Lab branding or unrelated game art.

## Authoring versus generated output

V4 (2026-10-12): see [STORY-MODEL-V4.md](STORY-MODEL-V4.md) and [REVIEW-GUIDE.md](REVIEW-GUIDE.md).

| Edit here | Purpose |
| --- | --- |
| `content/stories/<story-id>.json` | One reviewed fragment per story: family/membership, bridges, suppressions, hubs, groups, endings, dialogues, readings, map labels, commentary notes, origin opening, review status |
| `content/story-families.json`, `origin-families.json` | Legacy curated families (a fragment `family` replaces one of the same id); origin membership rules |
| `content/chronology/hubs.json` | Reviewed shared helper events (generic reports etc.) that are never chapters of their callers |
| `content/chronology/REVIEW.md`, `review/` | Acceptance ledger, per-agent review ledgers and assignments |
| `content/chronology/v3/`, `cetana-communications-review.json` | Archived V3 configuration (migrated into fragments; not read by V4) and Cetana V3 review notes |
| `public/summaries/*.md` | Handwritten reader guides; these are authoring inputs despite living under public |

`scripts/extract.py` generates raw data/art and the whole-game call graph (`source_graph.py` → `public/data/source-graph.json`); `compile-stories.py` → `story_tree.py` (with `conditions.py`, `origin_families.py`) builds `public/stories/` trees, coverage and review counts. `public/data/origins.json`, `reaction-labels.json` and `script-loc.json` are generated supporting data. `scripts/build.mjs` copies/bundles into disposable `dist/`. Never fix generated JSON alone; update its source and regenerate. Reader logic: `src/reading.js` (profile / path flags / variant resolution) and `src/app.js`. The retired V3 compiler is in `scripts/v3/`.

## Frontend and verification

| Location | Responsibility |
| --- | --- |
| `src/app.js` | Routing, catalogue, reader, choices, dialogue state/history, language and guides |
| `src/archive-scene.js`, `archive-motion.js`, `cover-atlas.js` | Three.js card scene, motion and artwork textures |
| `src/flow-tree.js`, `flow-surface.js`, `story-map.js` | V4 tree layout (exclusive/parallel groups, refs), Detroit-style flow map on the left card, fallback map |
| `src/reading.js` | Empire profile, path flags, condition evaluation and variant/option resolution |
| `src/reader-motion.js`, `i18n.js`, `glyph-warmup.js` | Reader enter/exit motion, bilingual chrome, idle CJK glyph warm-up (uses `stories/glyphs.json`) |
| `src/style.css`, `index.html` | Layout, typography, CSS transitions and app shell |
| `src/audio-player.js` | OST player |
| `tests/*.test.mjs`, `tests/test_*.py` | Node/Python regression suites (V3 suites archived in `tests/v3/`) |
| `scripts/verify-reader-v4.mjs`, `verify-ui-capture.mjs`, `verify-ui-perf.mjs` | Current browser checks: reader behaviour, UI screenshots, real-GPU frame timing |
| `scripts/audit-categories.mjs`, `review-summary.mjs` | Structural audit per category; markdown review-progress table (CI summary) |
| `scripts/review-copies.py` | Create/merge private review copies for parallel reviewers |
| `verification/chronology/`, `verification/ui/`, `verification/v4-reader.json` | Generated audits and current browser results; not manual acceptance |
| `verification/v3-*` | Historical V3 scenario outputs, screenshots and performance traces |
| `.github/workflows/ci.yml`, `pages.yml` | Archive CI on every push (tests, reproducible compile, audit, build); Pages deploy on `v*` tags / manual |

`node_modules/`, `dist/`, `.tools/`, Python caches and verification PNGs are ignored/local. `.openai/hosting.json` is a historical unused Sites registration, not the requested production host. Do not expose credentials or copy machine secrets into handoff bundles.
