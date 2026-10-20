# 清理障碍 / Clear Blockers

- 分类 Category：C8 银河轶事 / Galactic miscellany
- DLC：Nomads

## 如何开始 How it starts

发布者自己的星系中有带自然障碍的殖民地（owner 非原始文明）；承包者须掌握 tech_planetary_engineering。费用 1000，接受期限1800天。

The issuer owns a colony with natural blockers in the system (owner not primitive); the operator must know tech_planetary_engineering. Cost 1000, acceptance window 1800 days.

## 剧情脉络 Story outline

接受后选出障碍最多的殖民地，启用专项 CONTRACT_CLEAR_BLOCKERS_PROJECT（30天）；项目成功使计数器 +1，契约成功时才执行 clear_natural_blockers_effect 清除障碍（脚本注释强调不能在项目里清除，否则中止判定会先触发）。

On acceptance the colony with the most uncleared blockers is picked and CONTRACT_CLEAR_BLOCKERS_PROJECT (30 days) is enabled; project success raises the counter +1 and only then does the contract's on_success run clear_natural_blockers_effect (the script warns that clearing inside the project would let the abort check fire first).

## 分支与结局 Branches and outcomes

完成：贸易 1750 + 矿物 350（放大），影响力 50；该殖民地的自然障碍被清除；发布者好感 +50、信任 +5。 契约被取消、超时或中止时（on_cancel / on_stop），发布者对承包者的好感下降（opinion_failed_contract_*），事件链与全部兴趣点标记被清除。

Completion: trade 1750 + minerals 350 (scaled), influence 50; the colony's natural blockers are removed; issuer opinion +50, trust +5. If the contract is cancelled, times out or is aborted (on_cancel / on_stop), the issuer's opinion of the operator drops (opinion_failed_contract_*), and the chain and all points of interest are cleared.

## 条件与文明差异 Conditions and variants

无文明差异。

No empire variants.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：`common/missions/missions/02_contracts.txt:1946-2139`; `common/event_chains/00_event_chains_nomads.txt:412`; `common/special_projects/06_projects_nomads.txt:1278-1323`
- 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.
对照契约定义、内联脚本、专项与事件钩子核实了发布/接受条件、完成方式、奖励与失败处理；事件链卡片是模型中唯一的可读文档（任务、专项与钩子事件不是文档），因此本导读承载结构。

The issue/accept conditions, completion mechanism, rewards and failure handling were checked against the mission, inline scripts, special projects and hook events; the chain card is the only readable doc in the model (missions, projects and hook events are not docs), so this guide carries the structure.
