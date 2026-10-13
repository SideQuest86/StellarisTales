# 点星器 / Stellar Ignition

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / Galactic miscellany
- 来源 Sources：`common/missions/missions/02_contracts.txt:3495-3701`; `common/event_chains/00_event_chains_nomads.txt:514`; `events/nomads_events_1.txt:13376-13440`
- DLC：Nomads
- 审阅 Reviewed：2026-10-13（已审阅 reviewed）

## 如何开始 How it starts

发布者自有星系内有未点燃的气态巨行星（contract_gas_giant_can_be_ignited，且不是卫星）；承包者须掌握 tech_arkship_stellar_igniter，并有装备点星器模块（arkship_stellar_igniter）的方舟。费用 1000，接受期限1800天。

The issuer owns a system with an unignited gas giant (contract_gas_giant_can_be_ignited, not a moon); the operator needs tech_arkship_stellar_igniter and an arkship with the arkship_stellar_igniter module. Cost 1000, window 1800 days.

## 剧情脉络 Story outline

发布时标记目标气态巨行星，接受后创建兴趣点；方舟对该行星使用点星动作（on_arkship_stellar_ignition → nomads.4500）后计数器 +1 完成，成功后设 successful_stellar_ignition 标记。

The target gas giant is flagged on issue and a point of interest is created on acceptance; when the arkship ignites it (on_arkship_stellar_ignition → nomads.4500) the counter +1 completes it and the successful_stellar_ignition flag is set.

## 分支与结局 Branches and outcomes

完成：承包者贸易 3250 + 物理研究 650（放大），影响力 100；发布者好感 +100、信任 +10。 契约被取消、超时或中止时（on_cancel / on_stop），发布者对承包者的好感下降（opinion_failed_contract_*），事件链与全部兴趣点标记被清除。

Completion: trade 3250 + physics research 650 (scaled), influence 100; issuer opinion +100, trust +10. If the contract is cancelled, times out or is aborted (on_cancel / on_stop), the issuer's opinion of the operator drops (opinion_failed_contract_*), and the chain and all points of interest are cleared.

## 条件与文明差异 Conditions and variants

无文明差异。

No empire variants.

## 审阅记录 Review notes

对照契约定义、内联脚本、专项与事件钩子核实了发布/接受条件、完成方式、奖励与失败处理；事件链卡片是模型中唯一的可读文档（任务、专项与钩子事件不是文档），因此本导读承载结构。

The issue/accept conditions, completion mechanism, rewards and failure handling were checked against the mission, inline scripts, special projects and hook events; the chain card is the only readable doc in the model (missions, projects and hook events are not docs), so this guide carries the structure.
