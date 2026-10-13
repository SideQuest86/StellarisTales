# 灵能响应 / Psionic Responses

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / Galactic miscellany
- 来源 Sources：`common/on_actions/00_on_actions.txt:5801-5817 (on_shroud_delve)`; `events/shroud_events.txt:25-81 (shroud.2 song roll)`; `events/shroud_events.txt:191-211 (shroud.20)`; `events/shroud_events.txt:15993-16226 (7099-7121)`
- DLC：Shadows of the Shroud
- 审阅 Reviewed：2026-10-12（已审阅 reviewed）

## 如何开始 How it starts

每次潜入虚境时（on_shroud_delve），隐藏事件 shroud.2 增加潜入计数，并以 shroud_song_roll 的几率设置 shroud_songs_rolled；之后同一 on_action 的随机事件池中以权重1选中 shroud.20（终末者起源或与轮回之终末立约者除外，只发生一次）。

On every Shroud delve (on_shroud_delve) hidden shroud.2 increases the delve count and, with chance shroud_song_roll, sets shroud_songs_rolled; afterwards shroud.20 can be chosen with weight 1 from the same on_action pool (not for the Endbringers origin or an End of the Cycle covenant; once only).

## 剧情脉络 Story outline

7099“灵能响应”：虚境开始向我们发问（需尚无超验/具身政体）。随后三首虚境之歌依次出现（7100 → 7105 → 7110，各在上一窗口关闭后），每首都有两种回答，分别向超验或具身高级政体推进。

7099 "Psionic Responses": the Shroud begins to question us (requires no transcendent/corporeal authority yet). Three Shroud Songs follow in order (7100 → 7105 → 7110, each after the previous window closes); each has two answers pushing towards the transcendent or the corporeal advanced government.

## 分支与结局 Branches and outcomes

第三首歌一天后，按资格得到 7120“灵能飞升”（改为超验政体；格式塔统治者获得灵能特质）或 7121“虚境之歌”（改为具身政体；寡头制的候补领袖获得随机负面特质），两者互斥；每个结果窗口也可拒绝变更。

A day after the third song, eligibility decides between 7120 "Psionic Transcendence" (transcendent authority; a gestalt ruler gains the psionic trait) and 7121 "Songs of the Shroud" (corporeal authority; oligarchic pool leaders get a random negative trait) — exclusive; either result window also allows declining the change.

## 条件与文明差异 Conditions and variants

7120/7121 的拒绝选项对机械帝国文字不同；7120 的接受选项分格式塔/非格式塔。

The decline options of 7120/7121 differ for machine empires; 7120's accept option differs for gestalt empires.

## 审阅记录 Review notes

核对 shroud.2 的掷骰、shroud.20 的触发与 7099–7121 的 after 链；编译结构正确（顺序链+末端互斥）。仅补充互斥组与节点标签。

Checked the shroud.2 roll, the shroud.20 trigger and the after-chain 7099–7121; the compiled structure (sequence plus exclusive end) is correct. Only an exclusive group and node labels were added.

不确定 / Uncertain:

- The per-delve probability value:shroud_song_roll and the eligibility triggers is_eligible_for_advanced_government were not expanded; the extractor shows the songs as [GetRolledShroudSong…] placeholders.
- 2026-10-13 r3-inherit：事件继承修复（base = 其他事件）后复查：对照游戏文件核对了现在可见的继承标题、选项与分支，结构无需改动。
  2026-10-13 r3-inherit: re-checked after the event-inheritance fix (base = other event): the inherited titles, options and branches now visible in the tree were compared with the game files; no structural change needed.
