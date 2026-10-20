# 扫描残骸 / Scan Debris

- 分类 Category：C8 银河轶事 / Galactic miscellany
- DLC：Nomads

## 如何开始 How it starts

发布者所在系有可扫描的战斗残骸（any_available_debris）。费用 1000，接受期限360天。接受时残骸所有权暂时移交给承包者。

Posted when there is scannable battle debris (any_available_debris) in the issuer's system. Cost 1000, acceptance window 360 days. On acceptance the debris ownership is passed to the operator.

## 剧情脉络 Story outline

承包者扫描残骸后触发 nomads.3035，计数器 +1 完成；若残骸寿命先耗尽则契约取消。结束时残骸所有权交回原主。

When the operator scans the debris, nomads.3035 raises the counter +1; if the debris lifetime runs out first the contract is cancelled. At the end the debris ownership is returned.

## 分支与结局 Branches and outcomes

完成：贸易 1750 + 工程研究 350（放大），影响力 50；发布者额外获得 1000 工程研究；发布者好感 +50、信任 +5。 契约被取消、超时或中止时（on_cancel / on_stop），发布者对承包者的好感下降（opinion_failed_contract_*），事件链与全部兴趣点标记被清除。

Completion: trade 1750 + engineering research 350 (scaled), influence 50; the issuer also receives 1000 engineering research; issuer opinion +50, trust +5. If the contract is cancelled, times out or is aborted (on_cancel / on_stop), the issuer's opinion of the operator drops (opinion_failed_contract_*), and the chain and all points of interest are cleared.

## 条件与文明差异 Conditions and variants

无文明差异。

No empire variants.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：`common/missions/missions/02_contracts.txt:1760-1944`; `common/event_chains/00_event_chains_nomads.txt:406`; `events/nomads_events_1.txt:11530-11556`
- 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.
对照契约定义、内联脚本、专项与事件钩子核实了发布/接受条件、完成方式、奖励与失败处理；事件链卡片是模型中唯一的可读文档（任务、专项与钩子事件不是文档），因此本导读承载结构。

The issue/accept conditions, completion mechanism, rewards and failure handling were checked against the mission, inline scripts, special projects and hook events; the chain card is the only readable doc in the model (missions, projects and hook events are not docs), so this guide carries the structure.
