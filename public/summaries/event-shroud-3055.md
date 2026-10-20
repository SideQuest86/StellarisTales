# 预知幻景 / Prophetic Visions

- 分类 Category：C8 银河轶事 / Galactic miscellany
- DLC：Shadows of the Shroud

## 如何开始 How it starts

潜入虚境但没有找到其他事件（on_patron_delve_failed）时，从28个权重各为100的遭遇（另有权重1的 utopia.3002 兜底）中随机抽取一个满足条件的；每次潜入失败只出现一个遭遇，不会依次经历全部。本遭遇随当前所在的主要赞助者领域（喰煞/织缕/月窠/器具）改变文本；不能与该赞助者已立约；对每位赞助者各可发生一次，且触发后30年内不会再次出现。

When a Shroud delve finds nothing else (on_patron_delve_failed), one eligible encounter is drawn at random from 28 candidates of weight 100 each (plus utopia.3002 at weight 1 as fallback); each failed delve shows one encounter, never all of them in sequence. The text follows the current major-patron domain (Eater/Composer/Cradle/Instrument); not with a covenant with that patron; it can occur once per patron and not again within 30 years.

## 剧情脉络 Story outline

阴郁中浮现带着我们旗帜的预言景象。

In the gloom a prophetic vista bearing our flag appears.

## 分支与结局 Branches and outcomes

“稳住幻景”→3056（中概率恩赐）：领域赞助者契合度+100；拒绝（机械/有机文字不同）→3057：一级泽珞，下次潜入冷却减半。

"Hold the vision" → 3056 (medium boon chance): +100 attunement to the domain patron; reject (machine/organic wording) → 3057: tier-1 zro, next delve cooldown halved.

## 条件与文明差异 Conditions and variants

器具领域对“无情实业家”帝国另有文本。

The Instrument domain has a separate text for relentless industrialist empires.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-12（已审阅 reviewed）
- 来源 Sources：`events/shroud_events.txt:5860-6060`; `common/on_actions/00_on_actions.txt:5819-5854 (on_patron_delve_failed: 28 events × 100, utopia.3002 × 1)`; `common/scripted_variables/09_scripted_variables_shroud.txt:8,109-114 (attunement ±50/100/200; 30-year retrigger 10800 days)`
- 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.
对照原文核实了触发、选项与回复事件；草稿结构正确（选项→各自的回复窗口，互斥）。本遭遇与同池其他遭遇相互独立，不应串成一条故事。

Trigger, options and reply events were checked against the source; the draft structure is right (each option → its own reply window, mutually exclusive). This encounter is independent of the others in the pool and must not be chained with them.
