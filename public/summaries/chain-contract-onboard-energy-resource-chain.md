# 远程能量建模 / Remote Energy Modeling

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / Galactic miscellany
- 来源 Sources：`common/missions/missions/02_contracts.txt:2831-2850`; `common/event_chains/00_event_chains_nomads.txt:472`; `common/inline_scripts/contracts/OnboardResourceContract.txt`; `common/inline_scripts/special_projects/onboard_resource_contract_project.txt`
- DLC：Nomads
- 审阅 Reviewed：2026-10-13（已审阅 reviewed）

## 如何开始 How it starts

发布者自有星系内有可改良的能量矿藏（existing deposit，未曾被本类契约改良过）。费用 1000，接受期限1800天。

The issuer's own system holds an improvable existing energy deposit that has not been improved by this contract before. Cost 1000, window 1800 days.

## 剧情脉络 Story outline

接受后在该星系启用专项 CONTRACT_ONBOARD_ENERGY_RESOURCE_PROJECT（成本 750，物理研究）；研究完成使计数器 +1 完成。

On acceptance the special project CONTRACT_ONBOARD_ENERGY_RESOURCE_PROJECT (cost 750, 物理研究) is enabled; completing it raises the counter +1.

## 分支与结局 Branches and outcomes

完成：承包者贸易 1750 + 能量 350（放大），并获得每月能量加成；发布者的该矿藏被改良——随机加一个更高等级矿藏（25% +1级，60% +3级，15% +5级；食物为 +3/+5/+7 档），好感 +50、信任 +5。 契约被取消、超时或中止时（on_cancel / on_stop），发布者对承包者的好感下降（opinion_failed_contract_*），事件链与全部兴趣点标记被清除。

Completion: the operator gains trade 1750 + energy 350 (scaled) and a monthly energy bonus; the issuer's deposit is improved with a random extra deposit (25% +1 tier, 60% +3, 15% +5; food uses the +3/+5/+7 tiers), opinion +50, trust +5. If the contract is cancelled, times out or is aborted (on_cancel / on_stop), the issuer's opinion of the operator drops (opinion_failed_contract_*), and the chain and all points of interest are cleared.

## 条件与文明差异 Conditions and variants

三种资源契约共用同一模板。

The three resource contracts share one template.

## 审阅记录 Review notes

对照契约定义、内联脚本、专项与事件钩子核实了发布/接受条件、完成方式、奖励与失败处理；事件链卡片是模型中唯一的可读文档（任务、专项与钩子事件不是文档），因此本导读承载结构。

The issue/accept conditions, completion mechanism, rewards and failure handling were checked against the mission, inline scripts, special projects and hook events; the chain card is the only readable doc in the model (missions, projects and hook events are not docs), so this guide carries the structure.
