# 垂涎之饥 / Salivating Hunger

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / Galactic miscellany
- 来源 Sources：`events/shroud_events.txt:4284-4446`; `common/on_actions/00_on_actions.txt:5819-5854 (on_patron_delve_failed: 28 events × 100, utopia.3002 × 1)`; `common/scripted_variables/09_scripted_variables_shroud.txt:8,109-114 (attunement ±50/100/200; 30-year retrigger 10800 days)`
- DLC：Shadows of the Shroud
- 审阅 Reviewed：2026-10-12（已审阅 reviewed）

## 如何开始 How it starts

潜入虚境但没有找到其他事件（on_patron_delve_failed）时，从28个权重各为100的遭遇（另有权重1的 utopia.3002 兜底）中随机抽取一个满足条件的；每次潜入失败只出现一个遭遇，不会依次经历全部。本遭遇只给处于世界之喰煞领域、未与其立约、也未背叛它的帝国，每个帝国一次；若该赞助者的协约已全部解锁，抽中权重×0.1。另需我们对某个舰队实力弱于我们的帝国拥有宣称。

When a Shroud delve finds nothing else (on_patron_delve_failed), one eligible encounter is drawn at random from 28 candidates of weight 100 each (plus utopia.3002 at weight 1 as fallback); each failed delve shows one encounter, never all of them in sequence. Only for empires in the domain of the Eater of Worlds, without a covenant with it and without having betrayed it; once per empire; weight ×0.1 once all of that patron's accords are unlocked. Also requires a claim on territory of an empire whose fleet power is below ours.

## 剧情脉络 Story outline

饥饿的幻象吞噬心智，声音催促我们撕碎猎物。

Visions of ravenous hunger overwhelm us; a voice urges us to rend the prey.

## 分支与结局 Branches and outcomes

“斩断锁链”→3006：对一个有宣称且较弱的帝国发动征服战争，喰煞契合度+100，并随机获得一项持续1800天的军事加成（护盾/武器/射速/闪避/修复/士气）；“抵抗饥饿”→3007：一级泽珞，喰煞契合度−200。

"Break the chains" → 3006: declares a conquest war on a weaker empire we have claims on, Eater attunement +100 and one random 1,800-day military boon (shields/weapons/fire rate/evasion/repair/morale); "resist" → 3007: tier-1 zro, Eater attunement −200.

## 条件与文明差异 Conditions and variants

无。

None.

## 审阅记录 Review notes

对照原文核实了触发、选项与回复事件；草稿结构正确（选项→各自的回复窗口，互斥）。本遭遇与同池其他遭遇相互独立，不应串成一条故事。

Trigger, options and reply events were checked against the source; the draft structure is right (each option → its own reply window, mutually exclusive). This encounter is independent of the others in the pool and must not be chained with them.
