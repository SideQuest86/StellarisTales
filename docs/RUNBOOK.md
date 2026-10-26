# Development and handoff runbook

Run commands from the project root. Historical passing tests are not fresh execution results.

## Repository and working tree

Since 2026-10-13 all source, authoring content, generated data, guides and verification summaries are committed and
pushed to https://github.com/SideQuest86/StellarisTales (`main`); a clone plus `pnpm install` is a complete working
copy. `RhineLabUI-main/` (visual reference), node_modules, dist and ignored screenshots/traces are not in Git. Original
game files stay outside the repo and are read-only. Work in small commits on `main`; never `git clean`/`reset` the
working tree as cleanup. The repo-local Git identity is `outsider86 <195519447+outsider86@users.noreply.github.com>`.

## Build and preview

Node 24, Three.js 0.183.0; package scripts use pnpm 11 (CI pins 11.19.0). Existing dependencies are installed. On a clean machine install with `pnpm install --frozen-lockfile`.

```powershell
node scripts/build.mjs
node scripts/serve.mjs --dist
```

Open http://127.0.0.1:4173/ . Check whether a server already owns that port before starting another. Rebuild and refresh after edits. Build deletes/recreates only the repository dist directory and rejects linked/mislocated output; do not run from another directory.

## Content pipeline (V4 story trees, since 2026-10-12)

Python 3.10+ with Pillow and mutagen. Existing interpreter:
`C:/Users/wangp/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe`.
Node and Git are not on PATH on this machine: node is
`C:/Users/wangp/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe`, git is
`C:/Users/wangp/.cache/codex-runtimes/codex-primary-runtime/dependencies/native/git/cmd/git.exe`.

```powershell
$storyPython = 'C:/Users/wangp/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe'
& $storyPython scripts/compile-stories.py      # = scripts/story_tree.py (V4); ≈10 s
if ($LASTEXITCODE -ne 0) { throw 'Story compilation failed' }
node scripts/build.mjs
```

The model is described in [STORY-MODEL-V4.md](STORY-MODEL-V4.md); review process and fragment schema in
[REVIEW-GUIDE.md](REVIEW-GUIDE.md). Reviewed facts live in one fragment per story (`content/stories/<id>.json`); the
V3 monolithic configuration is archived in `content/chronology/v3/` and the V3 compiler in `scripts/v3/` (not used).
Review tools: `scripts/print-tree.py`, `scripts/callers.py`, `scripts/inspect-source.py`, `scripts/guide-skeleton.py`.
Compilation is deterministic (identical output for any `PYTHONHASHSEED`); CI recompiles and fails if `public/stories`,
`public/summaries` or `content` differ from the committed files, so never hand-edit generated JSON. Group ids of
random/if-chain outcomes are renumbered per story so unrelated graph changes do not rewrite every story file.

### Parallel review copies

Reviewers (subagents) work in private copies, never in this checkout and never with Git:

```powershell
& $storyPython scripts/review-copies.py create r4-example     # ../st-agents/r4-example (+ .review-copy marker)
# write content/chronology/review/assignments/r4-example.txt (story ids it owns; each id in exactly one list)
& $storyPython scripts/review-copies.py merge r4-example --dry-run
& $storyPython scripts/review-copies.py merge r4-example
```

Merging takes only files the agent changed after its copy was made, only for stories it owns, and reports files that
are newer in main instead of overwriting them. After merging: compile, tests, audit, commit; then move the finished
copy to `../st-agents/_done/` so it is never merged again. Reviewer briefs, ledgers and assignment lists live in
`content/chronology/review/`.

Only re-extract if raw source/parser changes require it; first compare game version/source manifests because the installation may have changed. Extraction (≈35 s) also writes the whole-game call graph `public/data/source-graph.json` (every event/project/site/situation/chain/on_action invocation with option/if/random/delay context) and `public/data/script-loc.json`:

```powershell
& $storyPython scripts/extract.py --game 'D:/Living/Steam/steamapps/common/Stellaris'
if ($LASTEXITCODE -ne 0) { throw 'Extraction failed' }
& $storyPython scripts/compile-stories.py
```

Gameplay effects (reader panel, docs/EFFECTS.md) are compiled separately, after the stories and whenever the game
changes (needs the installation; CI does not run it):

```powershell
& $storyPython scripts/effects_data.py       # build input public/data/effects-data.json (not committed), ≈25 s
& $storyPython scripts/compile-effects.py    # public/effects/<story>.json (lazy per story) + coverage.json
```

Images: super-resolved derivatives in `public/art-hd/` and `public/museum/img-hd/` (`scripts/images/batch.py`,
docs/IMAGES.md); originals stay in `public/art/` and `public/museum/img/`.

OST import is separate: `scripts/import-ost.py --game <game-path>` with the same interpreter. Inspect one source record with `scripts/inspect-source.py crisis.8045` or another exact record ID. For unresolved semantics consult original surrounding definitions, not just extracted links.

## Verification

```powershell
node --test tests/*.test.mjs
& $storyPython -m unittest discover -s tests -p 'test_*.py'
node scripts/audit-categories.mjs
```

Category audit writes reports and does not certify chronology. Inspect test scope before drawing conclusions. Browser checks require a running preview and Chrome:

```powershell
$env:STELLARIS_PLAYWRIGHT_PATH = 'C:/Users/wangp/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs'
node scripts/verify-reader-v4.mjs     # V4 reader: tree navigation, conditions, profile, reversals, 390 px, English
node scripts/verify-ui-capture.mjs    # catalogue, rows, card extraction, frosted reveals, flow map; screenshots
node scripts/verify-ui-perf.mjs       # headed Chrome on the real GPU (fails on a software adapter); perf.json
node scripts/verify-gpu.mjs           # adapter tiers, graphics notice, idle/hidden/covered rendering; verification/gpu/
node scripts/verify-layout.mjs        # after layout / camera framing / type-style changes: card beside the text (tablets to
                                      # 1920), selection below the rail on short screens, page width, nothing over the
                                      # text, no italic Chinese; STELLARIS_ENGINE=webkit for Safari's engine (~80 s each)
```

GPU selection (src/gpu.js, evidence in `verification/gpu/README.md`): Chrome/Edge on Windows render every page on the
adapter the browser's GPU process chose, regardless of `powerPreference`; without `--force-high-performance-gpu` (or the
`chrome://flags/#force-high-performance-gpu` flag, or a Windows per-app "High performance" preference) that is the
integrated GPU on this laptop. `STELLARIS_GPU=integrated` makes `verify-ui-perf` measure that path; `?gpu=integrated|software`
fakes the classification in any browser. `STELLARIS_WINDOW_POSITION` / `STELLARIS_WINDOW_SIZE` ("x,y" / "w,h") place headed
windows (e.g. on a side monitor). `serve.mjs --port <n>` serves on another port when 4173 is taken.

`verify-ui-perf` records the WebGL adapter (must be the discrete GPU, e.g. ANGLE D3D11 RTX 5070), rAF intervals per
interaction and EXT_disjoint_timer_query GPU ms. Results are written to `verification/ui/` and `verification/`.
Older scripts (verify-yuht, verify-vultaum, verify-flow-interaction, verify-cetana-*, verify-v2/category…) target the
V3 reader and its URLs; they cannot substitute for V4 checks. Capture current exit codes/output rather than treating an
old JSON file as new evidence.

Performance script options: `STELLARIS_MOBILE=1` for narrow desktop viewport, `STELLARIS_TRACE=1` for tracing; clear these after the intended run. `STELLARIS_TEST_URL` can target the deployed website. Run timing-sensitive checks separately. Inspect actual screenshots and interactive behavior, including open/close/reversal, language changes, history reset, keyboard focus, graph overflow and reduced motion. Distinguish desktop emulation from device hardware.

## Release when acceptance is complete

Production: https://sidequest86.github.io/StellarisTales/ ; repository: https://github.com/SideQuest86/StellarisTales . Historical public/Pages settings must be rechecked at release time.

Two workflows:

- `.github/workflows/ci.yml` (**Archive CI**) on every push to `main`, pull request or manual run: Node tests, Python
  tests, reproducible story compilation (fails on hand-edited generated output), category structure audit, a review
  progress table in the run summary (`scripts/review-summary.mjs`), build, and the built site as an artifact. It never
  deploys. It does not run browser, GPU or manual-story acceptance.
- `.github/workflows/pages.yml` (**Publish story archive**) deploys GitHub Pages only for a release — a push to `main`
  that changes the root `RELEASE` file — or a manual run, and only when repository variable `ENABLE_GITHUB_PAGES=true`.
  The `github-pages` environment accepts deployments from `main` only, so a tag push cannot deploy (v4.0.0 was
  rejected that way); tags are records.

Release: complete category, reading, visual and performance acceptance locally; push; confirm Archive CI is green for
that commit; then edit `RELEASE` (new version line + notes), commit, push, and tag the commit
(`git tag -a v4.0.1 -m "…"; git push origin v4.0.1`). Verify the Pages run and the live site at its subpath (art/audio,
bilingual reader, direct `#story=` URLs, representative branch paths). Do not report a local preview as publication.
Update CodexDoc, REVIEW and verification records with actual evidence.
