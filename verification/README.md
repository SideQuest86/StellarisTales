# Draft verification

- `browser-results.json`: headless installed Chrome, desktop 1440×1000 and mobile-sized viewport 390×844. Covers bilingual reading, original options, event → project → event navigation, path backtracking, search and empty state, category filtering, pagination, reduced motion, deep links and Escape.
- `online-results.json`: successful GitHub Pages HTTP 200, subpath asset loading, and the Horizon Signal event → project → follow-up journey on the actual deployed URL; no browser exceptions.
- Screenshots inspected locally: `desktop.png`, `reader.png`, `mobile.png`, `mobile-reader.png`. PNG files are excluded from Git to avoid confusing QA captures with game art.
- `performance.json`: actual requestAnimationFrame measurements during 20 rapid selections, plus idle DOM mutation check. Desktop headless local-server measurements do not certify performance on physical iPhone/Android hardware.
- `npm test`: data integrity, zero duplicate IDs, zero parser/inline errors, static branch target resolution, representative bilingual originals/conditional text, image existence and provenance hashes.
- `python -m unittest discover -s tests -p "test_*.py"`: script parser comments/quoted delimiters, repeated keys, case-insensitive keywords, comparison operators and truncated-file rejection.

Run browser checks with Playwright available via `npm install --no-save playwright`, or set `STELLARIS_PLAYWRIGHT_PATH` to an existing Playwright `index.mjs`. Uses installed Chrome (`channel: chrome`). The local server must already run on port 4173.

## Known limits

- This is an interactive source archive, not a reimplementation of Stellaris. Runtime empire state, scripted effects, on-actions, random outcomes and dynamic names are not simulated. Direct event references and project/stage references are navigable; exact expanded source remains available for indirect effects.
- The base installation and every installed DLC ZIP are scanned; Workshop mods outside the supplied directory and saved-game state are not included.
- No unverified Wiki commentary is imported. The Wiki returned HTTP 403 during this task.
- Original missing localization keys are listed in `public/data/coverage.json`; intentionally empty localized strings stay empty.
- Images retain the game's original aspect/available resolution. Format conversion does not invent additional detail.
