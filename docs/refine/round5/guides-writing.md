# Round 5 guides writing

Scope: public/summaries/*.md, from docs/refine/round5/guide-candidates.json. Commentary only; no quoted game text changed.

## 1. missingEn (5 files): English added after each Chinese body paragraph and list item
- behemoth-fury.md: intro, five levels, growth branch, level 5, ending, failure, branch/condition bullets.
- defenders-of-the-galaxy.md: intro, levels, summoned crises, paladins, victory, branch and variant bullets.
- lcluster-gray.md: intro (extended the one-line English), story bullets, branch bullets. Review notes untouched.
- unbidden.md: intro, numbered story steps 1-6, branch and variant bullets.
- war-in-heaven.md: intro, numbered story steps 1-3, branch and variant bullets.
- Review notes sections were left as written (already bilingual).

## 2. tokenHeadings (83 candidates): raw tokens in the H1 title line replaced with the plain name
- Replaced [X.GetName]-style tokens with generic names used in each guide's body (colony, planet, enemy, pre-FTL planet, Trader Enclave, spy network, target planet, etc.).
- Removed § colour codes (event-mega-100, event-mega-200, event-mega-201) from both halves of the title.
- Shroud titles now use the modifier names given in each guide's body (Fertile Lands, A Sense of Optimism).
- Event-id headings were not touched.
- Each of the 83 files had only its first line (H1) changed.

## Not changed (outside the candidate list)
- chain-contract-destroy-station-heirs-chain.md, chain-contract-scientific-observation-engineering-research-internal-chain.md, chain-contract-scientific-observation-physics-research-internal-chain.md, project-whisperers-in-the-void-fc-project.md also have raw tokens in their H1 titles but are not in tokenHeadings. Left as is per instruction; they need a decision.

## Checks
- node --test tests/*.test.mjs: 103 pass, 0 fail.
- node scripts/audit-guides.mjs --strict: exit 0, all categories zero issues.
- Nothing committed.
