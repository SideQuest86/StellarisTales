# 远程物理学研究 / Remote Physics Research

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / Galactic miscellany
- 来源 Sources：`common/missions/missions/02_contracts.txt:2785-2790`; `common/event_chains/00_event_chains_nomads.txt:448`; `common/inline_scripts/contracts/OnboardResearchContract.txt`; `common/inline_scripts/special_projects/onboard_research_contract_project.txt`
- DLC：Nomads
- 审阅 Reviewed：2026-10-13（已审阅 reviewed）

## 如何开始 How it starts

发布者（非游牧，自有星系，无需具体位置）请求方舟替其进行物理学研究。费用 1000，接受期限1800天。

The issuer (non-nomadic, own system, no specific location) asks an arkship to conduct physics research on its behalf. Cost 1000, window 1800 days.

## 剧情脉络 Story outline

接受后在承包者首都启用专项 CONTRACT_ONBOARD_PHYSICS_RESEARCH_PROJECT（研究成本 1000，物理学科技部门）；研究完成使计数器 +1 完成。

On acceptance the special project CONTRACT_ONBOARD_PHYSICS_RESEARCH_PROJECT (research cost 1000, physics department) is enabled at the operator's capital; completing it raises the counter +1.

## 分支与结局 Branches and outcomes

完成：承包者贸易 1750 + 物理学研究 350（放大）、影响力 50，并获得永久的每月物理学研究加成（tier1）；发布者也获得每月物理学研究加成（tier2），好感 +50、信任 +5。 契约被取消、超时或中止时（on_cancel / on_stop），发布者对承包者的好感下降（opinion_failed_contract_*），事件链与全部兴趣点标记被清除。

Completion: the operator gains trade 1750 + physics research 350 (scaled), influence 50 and a permanent monthly physics research bonus (tier 1); the issuer also gets a monthly physics research bonus (tier 2), opinion +50, trust +5. If the contract is cancelled, times out or is aborted (on_cancel / on_stop), the issuer's opinion of the operator drops (opinion_failed_contract_*), and the chain and all points of interest are cleared.

## 条件与文明差异 Conditions and variants

三种研究契约共用同一模板。

The three research contracts share one template.

## 审阅记录 Review notes

对照契约定义、内联脚本、专项与事件钩子核实了发布/接受条件、完成方式、奖励与失败处理；事件链卡片是模型中唯一的可读文档（任务、专项与钩子事件不是文档），因此本导读承载结构。

The issue/accept conditions, completion mechanism, rewards and failure handling were checked against the mission, inline scripts, special projects and hook events; the chain card is the only readable doc in the model (missions, projects and hook events are not docs), so this guide carries the structure.
