# Development and handoff runbook

Run commands from the project root. This handoff verified file locations and Node availability; historical passing tests are not fresh execution results.

## Preserve the current work

The GitHub clone lacks the uncommitted V3 work. Transfer the current working directory, including untracked source/configuration/guides. Preserve `RhineLabUI-main/` and desired ignored verification images/traces separately; node_modules and dist can be rebuilt. Original game files stay outside the repo and are read-only. A diff alone omits untracked files. Review generated removals together with compilation outputs; do not run git clean/reset as cleanup. No files were relocated or deleted for this handoff.

Inspect focused Git status for src/scripts/content/tests/docs and summarize generated directories rather than dumping thousands of paths. HEAD during handoff is 3309ebad9452ba88f69038e57c88dc040ea00c42. No commit, push or deployment occurred for this handoff.

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

Only re-extract if raw source/parser changes require it; first compare game version/source manifests because the installation may have changed. Extraction (≈35 s) also writes the whole-game call graph `public/data/source-graph.json` (every event/project/site/situation/chain/on_action invocation with option/if/random/delay context) and `public/data/script-loc.json`:

```powershell
& $storyPython scripts/extract.py --game 'D:/Living/Steam/steamapps/common/Stellaris'
if ($LASTEXITCODE -ne 0) { throw 'Extraction failed' }
& $storyPython scripts/compile-stories.py
```

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
node scripts/verify-flow-interaction.mjs
node scripts/verify-cetana-dialogue.mjs
node scripts/verify-cetana-storm.mjs
```

Choose additional checks matching edits: verify-yuht, verify-vultaum, verify-cybrex-labels, verify-ness-readings, verify-ness-route, verify-exhibition, verify-motion, verify-performance (all scripts/*.mjs). Read their assertions and outputs. Legacy verify-v2/category checks include old assumptions and cannot substitute for V3 review. Some targeted scripts only print success; capture current exit code/output rather than treating an old JSON file as new evidence.

Performance script options: `STELLARIS_MOBILE=1` for narrow desktop viewport, `STELLARIS_TRACE=1` for tracing; clear these after the intended run. `STELLARIS_TEST_URL` can target the deployed website. Run timing-sensitive checks separately. Inspect actual screenshots and interactive behavior, including open/close/reversal, language changes, history reset, keyboard focus, graph overflow and reduced motion. Distinguish desktop emulation from device hardware.

## Release when acceptance is complete

Production: https://sidequest86.github.io/StellarisTales/ ; repository: https://github.com/SideQuest86/StellarisTales . Historical public/Pages settings must be rechecked at release time.

CI on main runs dependency install, Node tests, category audit and build. Pages upload/deploy requires repository variable `ENABLE_GITHUB_PAGES=true`. CI does **not** run all Python/browser/manual-story acceptance. Complete those separately. Preserve current changes, inspect the full proposed commit, then commit/push under the user's authorization. Verify Actions success and the live site at its subpath, including art/audio, bilingual reader, direct story URLs and representative branch paths. Do not report local preview as publication. Update CodexDoc, REVIEW and verification records with actual evidence and remaining limits.
