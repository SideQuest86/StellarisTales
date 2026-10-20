# Round 5 guide cleanup (M1, M2, M3, M6, M8)

Script: `scripts/guides/cleanup.py` (idempotent; `--dry-run` prints counts, default applies). Second run reports 0 files.
Applied to `public/summaries/*.md`: 1,388 of the 1,389 files changed (the one unchanged file has nothing to move). Not committed.

## What moved or was removed (counts are line/segment events)
- M1 disclaimer blockquote lines moved to the review section: 302 (as "- ..." bullets; text kept verbatim).
- M1 "审阅 Reviewed ..." moved: 581 own-line items + 787 segments cut from the "分类 Category" line (" · 审阅 Reviewed ...").
- M2 "来源 Sources" moved: 982 own-line items + 406 segments cut from the Category line.
- M3 filler lines deleted (only under 分支/条件 sections): 434 (the 本导读未单列..., 无特殊的文明差异, 可选条件见起源卡,
  No empire-specific ..., bare 无。/None. variants). Section headings are kept (audit-guides.mjs needs them), so a section
  that held only filler is now an empty heading; filling those is audit item M4, not done here.
- M6 "Category:" / "Category： " normalised to "Category：" (no trailing space): 155.
- M8 stale editor voice: "（审阅改定；编译默认为深空异闻）" (2 guides: anomaly-storms-prec-one, -wm-one) cut from the
  Category line; sentence "这看起来与预期相反，记录为原文现状。" cut from anomaly-disco-molluscoid-miners-cat; clause
  "第四个没有可读文本 / the fourth has no readable text" cut from event-ancrel-10000. Each is kept in the review section as
  "- 编辑备注 Editor note：...". enigmatic-fortress "Checked:" is already inside its review section (left alone).
- Moved items are inserted at the top of the existing `## 审阅记录 Review notes` section in this order: Reviewed, Sources,
  disclaimer, editor notes. All 1,388 guides already had that heading, so none was created. Quoted game text untouched.

## Files touched
`public/summaries/*.md` (1,388), `scripts/guides/cleanup.py` (new), this file. Not touched: `src/`, tests, checkers.
`scripts/audit-guides.mjs --strict` rewrote its own `verification/guide-audit.json` on running (unchanged results: all 0).

## Producers / consumers checked
- `scripts/guide-skeleton.py` writes new skeleton guides only (the header line "- 分类 Category: ..." with ASCII colon and a
  Sources line); it refuses/does not overwrite reviewed guides, so it does not undo this. A future skeleton would need
  cleanup.py re-run (idempotent). `scripts/review-copies.py` only copies guides between agent dirs.
- `scripts/audit-guides.mjs` (CI --strict) checks existence, no "Draft skeleton", five section regexes (the last is
  /审阅|Review notes/, still satisfied) and that a game-file citation appears in the guide or the fragment sources. Sources
  now live in the review section of the same file, so citations still count. No checker was changed.
- Tests do not assert header lines such as "审阅 Reviewed" or "来源 Sources".
- Orphan `story-f639c6105c7b7386.md`: not in index.json; its id is referenced by `public/stories/yuht.json`,
  `public/summaries/yuht.md`, `content/chronology/review/c2-precursors.md` and `verification/categories/stories.json`, so
  it may be a live id of the yuht story; left as is, flagged for the owner (its editor-voice line 20 is not moved).

## Render check (renderMarkdown, zh, before vs after)
cetana, origin_broken_shackles, anomaly-storms-prec-one, event-ancrel-10000, lcluster-gray,
anomaly-disco-molluscoid-miners-cat: before, the body began with the Reviewed/Sources/disclaimer lines; after, the body is
title, "分类 Category" line (plus DLC where present), then "如何开始 How it starts" content, and the collapsed review
section grew by the moved lines (e.g. cetana 1,887 to 3,064 chars; lcluster-gray 163 to 658).

## Checks run
- `node --test tests/*.test.mjs`: 99 pass, 0 fail.
- `python -m unittest discover -s tests`: 45 tests OK.
- `node scripts/audit-guides.mjs --strict`: all categories 0 failures.
