# Round 5 guide audit (public/summaries, reading guides; audit only)

Scope: 1,389 files in public/summaries/*.md. 1,388 map to index.json ids; 1 orphan (story-f639c6105c7b7386.md, not in index.json).
Categories in index.json: stories 493, exploration 307, society 356, precursors 86, origins 61, rifts 41, leviathans 33, crisis 11.
(The brief's names map as: anomalies = exploration, astral rifts = rifts, crises = crisis, civilizations = society, chronicles = stories.)
Method: node tally over all files (headings, raw tokens, boilerplate, empty sections, long lines, language coverage),
a render pass through src/markdown.js to count mixed blocks the reader cannot split, and reading of ~40 guides in full
(origins, precursors) plus header/first-paragraph reads of ~90 more across categories. Review sections (## 审阅记录) excluded from body counts.
Counts are whole-corpus unless marked "sample". Line numbers are file lines.

## Ranked recurring problems

1. Reviewer meta and disclaimer shown to readers (outside review section)
   - 441 guides: blockquote "本导读是审阅者的说明文字，不是游戏原文" (zh+en), 57 more variants.
   - ~1,388 guides: header line "审阅 Reviewed" in 4+ formats (e.g. "2026-10-13", "2026-10-12（c5a）", "（cNb-society）").
   - Examples: cetana L6-7 (exposes ledger path `content/chronology/review/c5a-cetana.md`);
     origin_broken_shackles L19 (disclaimer); anomaly-storms-prec-one L3 ("审阅改定；编译默认为深空异闻", i.e. "reviewed revision; compiled default").

2. Raw script tokens in body prose
   - 4,779 event-id hits (distar.1030, shroud.8000 style); 10,648 snake_case identifiers; 3,661 file:line refs;
     2,127 "权重/weight" internals (774 guides); 384 "N -> N" id chains in 69 guides.
   - Sources line with paths/lines in 982 guides (1,374 guides carry some path token).
   - Examples: origin_broken_shackles L15 (id chain "5015 -> 5020 -> ..."); event-ancrel-15010 L7 ("random weight 3 of 958");
     anomaly-abandoned-outpost-category L4 (full sources line).

3. Unrendered script tokens in headings and titles
   - ~20 guides: "# [From.GetSpeciesAdj]社会转变", "# [pre_ftl_planet.GetName]...", "# $contract_scientific_observation_internal$".
   - Examples: event-observation-3138 L1 and event-observation-3140 L1 (bracket tokens in the title); 187 bracket tokens in body overall.

4. Bilingual lines the reader cannot split (show in both UI languages, or hide the wrong one)
   - Render pass: 9,403 mixed zh/en blocks; 7,557 split by splitMixed; 816 not split and rendered unlabelled (both languages always visible).
   - Example: anomaly-alpha-centauri-cat list item "6750：其他帝国..." followed by English in the same <li>.
   - Also 1,030 blocks where the dominant-language tag hides a short English fragment (sample: mostly ID tokens misread as English; real count lower).

5. Single-language bodies (sample-verified, ratio test)
   - 38 guides have no Chinese prose paragraph; 7 have no English prose paragraph. Zh readers lose the body of the 38;
     en readers lose the 7. Several flags are false positives (chain-arkship-diplomatic-envoy-chain has Chinese lines dense with paths).
   - Examples: anomaly-ast-mining-cat (English-only body); chain-amoebas-1-chain L19 and L23 (Chinese lines with no English twin).

6. Section template breaks
   - "## 分支与结局" heading absent in 30 guides; "## 条件与文明差异" absent in 30; "## 剧情脉络" absent in 1.
   - Empty sections: site-ancient-battle-site L23 (分支与结局 with no text); site-from-the-ashes-site L27; about 16 site-* guides.
   - Heading variants: "## 剧情脉络 Story outline（菜单与服务 Menu and services）" in 6 guides; cetana uses "###" sub-headings.

7. Filler and template boilerplate
   - "本导读未单列条件差异；条件随各事件在上文说明…" 57 guides (e.g. lcluster-gray).
   - "无特殊的文明差异。 / No empire-specific variants beyond the reward wording." 49 guides.
   - "可选条件见起源卡。 / Requirements are on the origin card." 19 guides; "无。 / None." on many empty branch sections.
   - These say nothing and could be dropped when the section is empty.

8. Stale editor notes in body (not in review section)
   - anomaly-storms-prec-one L3 and anomaly-storms-prec-wm-one L3: "审阅改定；编译默认为深空异闻".
   - anomaly-disco-molluscoid-miners-cat L8: "这看起来与预期相反，记录为原文" ("this looks contrary to expectation; recorded as original").
   - event-ancrel-10000 L23: "第四个没有可读文本" ("the fourth has no readable text").
   - enigmatic-fortress L27: English "Checked: entry on_actions, project option groups..." in body.
   - Orphan story-f639c6105c7b7386 L20: "这里不擅自消除时间表述的差异" and "不应串成彼此前置" (editor voice, Chinese-only, template differs).

9. Overlong lines
   - 441 lines over 450 characters; longest is anomaly-debris-gasgiant-category-temp L4 (1,025 characters, a sources line).
   - Long prose paragraphs over 400 characters are common in origin_mindwardens and origin_primal_calling.

10. Inconsistent header format
   - "分类 Category：" with full-width colon (1,233 guides) vs "Category:" ASCII (155). Review field wording varies (see item 1).
   - Category naming: "分类 Category：深空异闻 Exploration" vs "银河轶事 C8 stories" vs "文明纪事 Society (CN)" vs "先驱者与考古 Precursors".

11. Not verified mechanically
   - Spoiler placement: the warning is UI-only (reader header), so the markdown cannot show a warning-before-spoiler ordering. Sample found no spoiler-before-warning case, but this needs a reader check.
   - zh/en meaning mismatch: no hard mismatch found in the ~40 full reads. The orphan file (L20) states a deliberate zh/en time-phrasing difference and leaves it in the text.
   - Factual claims ("weight 3 of 958", "5/405", "+0-1000") are numbers readers cannot check; they are accurate only as far as the script goes, and line references will drift.

## Good models (clear structure, bilingual pairs, endings stated)
- origin_shoulders_of_giants: chained stages, endings and recurring pulses each in one line pair.
- origin_primal_calling: branch conditions stated by ethic/civic; clean zh/en parallel lines.
- rift-corridors: short mechanics block, zh and en match, no editor voice.
- origin_here_be_dragons: timeline with day counts and conditions kept separate.
- event-ancrel-6150: clear site stages, relic note at the end.

## Proposed fixes
Mechanical, safe across the catalogue (no game text touched):
- M1: remove the disclaimer blockquote and the "审阅 Reviewed" header line from the body; move them into the review section (covers items 1 and 10). Needs one template.
- M2: move the "- 来源 Sources" line into the review section (982 guides).
- M3: delete the filler lines in item 7 when the section is otherwise empty (57 + 49 + 19 guides).
- M4: add "无。 / None." (or a single-language stub) to the 30 guides missing 分支 or 条件 headings, so the template is complete.
- M5: extend splitMixed to split on "/" and "：" boundaries, and tag the 816 unsplit blocks by their dominant language; add a test to i18n_test (renderer change, not guide text).
- M6: normalise the Category/Reviewed header to one full-width form; ASCII colons on 155 guides.
- M7: remove the 38 + 7 single-language gaps only after a per-guide bilingual rewrite (needs a writer, not a script).
- M8: remove stale editor lines in item 8 (6 known lines) and the orphan file after confirming it is unused.

Needs per-guide rewriting:
- R1: event-id chains and weight/weight-sum internals into plain-language steps (about 4,800 event-id hits, 2,100 weight hits, 384 arrow chains).
- R2: headings with unrendered tokens (~20 guides) need a human title.
- R3: unverifiable numeric claims in "条件" sections need either a source note or removal.
- R4: long paragraphs (441) split at sentence boundaries, with zh and en kept paired.

## Next steps
- Apply M1, M2, M3, M5 first: they are regex or renderer changes with the largest reader effect (about 1,400 guides touched by the disclaimer and header alone).
- Ask the user before any R-series rewrite; the guides are project writing, but R1 needs a decision on how much event detail to keep.
