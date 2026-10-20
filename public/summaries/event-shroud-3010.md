# 献祭之宴 / Sacrificial Feast

- 分类 Category：C8 银河轶事 / Galactic miscellany
- DLC：Shadows of the Shroud

## 如何开始 How it starts

潜入虚境但没有找到其他事件（on_patron_delve_failed）时，从28个权重各为100的遭遇（另有权重1的 utopia.3002 兜底）中随机抽取一个满足条件的；每次潜入失败只出现一个遭遇，不会依次经历全部。本遭遇只给处于世界之喰煞领域、未与其立约、也未背叛它的帝国，每个帝国一次；若该赞助者的协约已全部解锁，抽中权重×0.1。

When a Shroud delve finds nothing else (on_patron_delve_failed), one eligible encounter is drawn at random from 28 candidates of weight 100 each (plus utopia.3002 at weight 1 as fallback); each failed delve shows one encounter, never all of them in sequence. Only for empires in the domain of the Eater of Worlds, without a covenant with it and without having betrayed it; once per empire; weight ×0.1 once all of that patron's accords are unlocked.

## 剧情脉络 Story outline

粗粝的声音要求献上我们的子民。

A coarse voice demands our people as an offering.

## 分支与结局 Branches and outcomes

“吞噬”：献祭1个人口（人口≥2000时献祭2个），→3011（高概率恩赐）：二级泽珞，喰煞契合度+50；“团结”→3012（低概率恩赐）：一级团结，喰煞契合度−100。

"Consume": sacrifices 1 pop (2 if we have ≥ 2,000 pops) → 3011 (high boon chance): tier-2 zro, Eater attunement +50; "Unite" → 3012 (low boon chance): tier-1 unity, Eater attunement −100.

## 条件与文明差异 Conditions and variants

正文按石头/机械与有机帝国不同。

Text differs for lithoid/machine and organic empires.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-12（已审阅 reviewed）
- 来源 Sources：`events/shroud_events.txt:4450-4588`; `common/on_actions/00_on_actions.txt:5819-5854 (on_patron_delve_failed: 28 events × 100, utopia.3002 × 1)`; `common/scripted_variables/09_scripted_variables_shroud.txt:8,109-114 (attunement ±50/100/200; 30-year retrigger 10800 days)`
- 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.
对照原文核实了触发、选项与回复事件；草稿结构正确（选项→各自的回复窗口，互斥）。本遭遇与同池其他遭遇相互独立，不应串成一条故事。

Trigger, options and reply events were checked against the source; the draft structure is right (each option → its own reply window, mutually exclusive). This encounter is independent of the others in the pool and must not be chained with them.
