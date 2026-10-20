# 转瞬幻视 / Transient Visions

- 分类 Category：C8 银河轶事 / Galactic miscellany
- DLC：Shadows of the Shroud

## 如何开始 How it starts

潜入虚境但没有找到其他事件（on_patron_delve_failed）时，从28个权重各为100的遭遇（另有权重1的 utopia.3002 兜底）中随机抽取一个满足条件的；每次潜入失败只出现一个遭遇，不会依次经历全部。本遭遇只给处于生命之织缕领域、未与其立约、也未背叛它的帝国，每个帝国一次；若该赞助者的协约已全部解锁，抽中权重×0.1。

When a Shroud delve finds nothing else (on_patron_delve_failed), one eligible encounter is drawn at random from 28 candidates of weight 100 each (plus utopia.3002 at weight 1 as fallback); each failed delve shows one encounter, never all of them in sequence. Only for empires in the domain of the Composer of Strands, without a covenant with it and without having betrayed it; once per empire; weight ×0.1 once all of that patron's accords are unlocked.

## 剧情脉络 Story outline

一个奇怪的存在问我们所见何物。

A strange presence asks what we saw.

## 分支与结局 Branches and outcomes

“生机勃勃的森林”→3016：织缕契合度+100；“废土”→3017：织缕契合度−200；“不确定”→3018：下次潜入冷却减半。均有一级泽珞。

"A forest" → 3016: Composer attunement +100; "a wasteland" → 3017: Composer attunement −200; "unsure" → 3018: next delve cooldown halved. All give tier-1 zro.

## 条件与文明差异 Conditions and variants

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-12（已审阅 reviewed）
- 来源 Sources：`events/shroud_events.txt:4592-4721`; `common/on_actions/00_on_actions.txt:5819-5854 (on_patron_delve_failed: 28 events × 100, utopia.3002 × 1)`; `common/scripted_variables/09_scripted_variables_shroud.txt:8,109-114 (attunement ±50/100/200; 30-year retrigger 10800 days)`
- 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.
对照原文核实了触发、选项与回复事件；草稿结构正确（选项→各自的回复窗口，互斥）。本遭遇与同池其他遭遇相互独立，不应串成一条故事。

Trigger, options and reply events were checked against the source; the draft structure is right (each option → its own reply window, mutually exclusive). This encounter is independent of the others in the pool and must not be chained with them.
