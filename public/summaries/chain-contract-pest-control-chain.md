# 害虫防治 / Pest Control

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / Galactic miscellany
- 来源 Sources：`common/missions/missions/02_contracts.txt:2331-2589`; `common/event_chains/00_event_chains_nomads.txt:424`; `events/nomads_events_1.txt:12250-12282`
- DLC：Nomads
- 审阅 Reviewed：2026-10-13（已审阅 reviewed）

## 如何开始 How it starts

发布者所在系可进行害虫防治（can_pest_control_system，有太空动物）。费用 1500，接受期限1800天；AI 在目标系敌对舰队强于自身时不接受。发布时系内的太空生物被定住不动。

The system can be pest-controlled (can_pest_control_system: space fauna present). Cost 1500, window 1800 days; the AI will not accept if the hostile fleet power there exceeds its own. On issue the roaming space fauna there are pinned in place.

## 剧情脉络 Story outline

接受后给目标系创建兴趣点，并让当地太空动物国家对承包者敌对；承包者在该系战胜带 pest_contract_target 标记的舰队（on_space_battle_won → nomads.3055）时计数器 +1 完成。

On acceptance a point of interest is created and the local space-fauna countries become hostile to the operator; winning a space battle against a fleet carrying the pest_contract_target flag (on_space_battle_won → nomads.3055) raises the counter +1.

## 分支与结局 Branches and outcomes

完成：贸易 2500 + 社会研究 500（放大）；有 Hired Guns 政体则为 3750 + 750 与永久 hired_guns_modifier；影响力 50，发布者好感 +50、信任 +5。 契约被取消、超时或中止时（on_cancel / on_stop），发布者对承包者的好感下降（opinion_failed_contract_*），事件链与全部兴趣点标记被清除。

Completion: trade 2500 + society research 500 (scaled); Hired Guns civics get 3750 + 750 and a permanent hired_guns_modifier; influence 50; issuer opinion +50, trust +5. If the contract is cancelled, times out or is aborted (on_cancel / on_stop), the issuer's opinion of the operator drops (opinion_failed_contract_*), and the chain and all points of interest are cleared.

## 条件与文明差异 Conditions and variants

Hired Guns 报酬更高。

Higher payout for Hired Guns.

## 审阅记录 Review notes

对照契约定义、内联脚本、专项与事件钩子核实了发布/接受条件、完成方式、奖励与失败处理；事件链卡片是模型中唯一的可读文档（任务、专项与钩子事件不是文档），因此本导读承载结构。

The issue/accept conditions, completion mechanism, rewards and failure handling were checked against the mission, inline scripts, special projects and hook events; the chain card is the only readable doc in the model (missions, projects and hook events are not docs), so this guide carries the structure.
