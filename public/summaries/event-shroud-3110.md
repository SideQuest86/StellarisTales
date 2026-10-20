# 精神光矛 / Psychic Lance

- 分类 Category：C8 银河轶事 / Galactic miscellany
- DLC：Shadows of the Shroud

## 如何开始 How it starts

潜入虚境但没有找到其他事件（on_patron_delve_failed）时，从28个权重各为100的遭遇（另有权重1的 utopia.3002 兜底）中随机抽取一个满足条件的；每次潜入失败只出现一个遭遇，不会依次经历全部。要求尚未拥有或可研究“灵能干扰器”，且处于某位尚未立约的主要赞助者领域；此前非组件类潜入越多、或最近一次组件潜入失败，抽中权重越高。

When a Shroud delve finds nothing else (on_patron_delve_failed), one eligible encounter is drawn at random from 28 candidates of weight 100 each (plus utopia.3002 at weight 1 as fallback); each failed delve shows one encounter, never all of them in sequence. Requires not having (or having as an option) the Psionic Disruptor, and being in the domain of a major patron without a covenant; its weight grows with previous non-component delves and after a recent failed component delve.

## 剧情脉络 Story outline

一道异常稳定的灵能光束延伸入虚空。

A uniquely stable beam of psionic energy stretches into the void.

## 分支与结局 Branches and outcomes

“逗留片刻”：60→3111 成功，获得灵能干扰器研究选项；40→3112 失败：灵能者恢复期修正（机械/蜂巢/其他三版）1800天，30年内不再出现。“离开虚境”：冷却减半。

"Stay a while": 60 → 3111 success, Psionic Disruptor becomes a research option; 40 → 3112 failure: a recovering-telepaths modifier (machine/hive/other) for 1,800 days, no recurrence for 30 years. "Exit": cooldown halved.

## 条件与文明差异 Conditions and variants

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-12（已审阅 reviewed）
- 来源 Sources：`events/shroud_events.txt:7557-7714`; `common/on_actions/00_on_actions.txt:5819-5854 (on_patron_delve_failed: 28 events × 100, utopia.3002 × 1)`; `common/scripted_variables/09_scripted_variables_shroud.txt:8,109-114 (attunement ±50/100/200; 30-year retrigger 10800 days)`
- 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.
对照原文核实了触发、选项与回复事件；草稿结构正确（选项→各自的回复窗口，互斥）。本遭遇与同池其他遭遇相互独立，不应串成一条故事。

Trigger, options and reply events were checked against the source; the draft structure is right (each option → its own reply window, mutually exclusive). This encounter is independent of the others in the pool and must not be chained with them.
