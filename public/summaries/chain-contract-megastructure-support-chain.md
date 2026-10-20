# 巨型结构支援 / Megastructure Support

- 分类 Category：C8 银河轶事 / Galactic miscellany
- DLC：Nomads

## 如何开始 How it starts

发布者须自己的星系里有正在建造/升级的巨型结构（建造舰队下达 build_megastructure_fleet_order 或结构 is_upgrading）并能建造巨型结构；游牧发布者不可发布。费用 1000，接受期限仅360天。AI 在首次建造巨型结构时会自动发布（nomads.3025，5年冷却）。

The issuer needs a megastructure being built or upgraded in its own system (a fleet with build_megastructure_fleet_order, or is_upgrading) and the ability to build megastructures; nomadic issuers cannot post it. Cost 1000, acceptance window only 360 days. AI empires auto-issue it when they first build a megastructure (nomads.3025, 5-year cooldown).

## 剧情脉络 Story outline

接受后启用专项 CONTRACT_MEGASTRUCTURE_SUPPORT_PROJECT（30天，需方舟 carries_colony=1，开始时给系统所有者1年的 nomad_construction_assistance 修正）；项目成功使计数器 +1（max=1）完成。建造被中止则契约中止。

On acceptance the special project CONTRACT_MEGASTRUCTURE_SUPPORT_PROJECT is enabled (30 days, needs an arkship with carries_colony = 1, giving the system owner a 1-year nomad_construction_assistance modifier); project success raises the counter +1 (max 1). If the construction stops the contract aborts.

## 分支与结局 Branches and outcomes

完成：贸易 4250 + 工程研究 850（放大），影响力 50，发布者好感 +50、信任 +5。 契约被取消、超时或中止时（on_cancel / on_stop），发布者对承包者的好感下降（opinion_failed_contract_*），事件链与全部兴趣点标记被清除。

Completion: trade 4250 + engineering research 850 (scaled), influence 50; issuer opinion +50, trust +5. If the contract is cancelled, times out or is aborted (on_cancel / on_stop), the issuer's opinion of the operator drops (opinion_failed_contract_*), and the chain and all points of interest are cleared.

## 条件与文明差异 Conditions and variants

无文明差异。

No empire variants.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：`common/missions/missions/02_contracts.txt:1304-1477`; `common/event_chains/00_event_chains_nomads.txt:400`; `common/special_projects/06_projects_nomads.txt:1227-1276`; `events/nomads_events_1.txt:11495-11528`
- 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.
对照契约定义、内联脚本、专项与事件钩子核实了发布/接受条件、完成方式、奖励与失败处理；事件链卡片是模型中唯一的可读文档（任务、专项与钩子事件不是文档），因此本导读承载结构。

The issue/accept conditions, completion mechanism, rewards and failure handling were checked against the mission, inline scripts, special projects and hook events; the chain card is the only readable doc in the model (missions, projects and hook events are not docs), so this guide carries the structure.
