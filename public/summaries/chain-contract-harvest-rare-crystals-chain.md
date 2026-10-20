# 收集：稀有水晶 / Harvest: Rare Crystals

- 分类 Category：C8 银河轶事 / Galactic miscellany
- DLC：Nomads

## 如何开始 How it starts

发布者为在自己或无主星系内的非游牧帝国：该系需有未采集且有稀有水晶的行星（has_harvestable_resources_trigger），且发布者已调查该系。承包者接受后（费用 cost=1000，接受期限 @contract_time_base=1800 天）开启本事件链，在每颗含该资源的目标行星上创建兴趣点；承包者还需掌握科技 tech_mine_rare_crystals。

Posted by a non-nomadic empire in a system it owns or that is unowned, which must contain unharvested Rare Crystals on a planet (has_harvestable_resources_trigger) and be surveyed by the issuer. After acceptance (cost 1000, acceptance window @contract_time_base = 1800 days) the chain begins and points of interest are created on every target planet carrying the resource; the operator must also know technology tech_mine_rare_crystals.

## 剧情脉络 Story outline

承包者的方舟对每个目标行星执行“收集资源”动作；当某行星的兴趣点被移除、且该系再无本契约兴趣点时，任务计数器 +1（max=1）即完成（nomads_effects.txt:4652-4690）。若他国先采集（出现 harvested_resources_mining 修正）则契约中止。

The operator's arkship runs the "harvest resources" action on each target planet; once a planet's point of interest is removed and no points of interest of this contract remain in the system, the mission counter +1 (max 1) completes it (nomads_effects.txt:4652-4690). If another empire harvests first (harvested_resources_mining modifier appears) the contract aborts.

## 分支与结局 Branches and outcomes

完成：承包者获得贸易 1750 + 稀有水晶 350（随完成次数放大）、影响力 @opinion_contract_small(50)，发布者好感 +50、信任 +5；发布者的“正在进行采集契约”旗标被清除。 契约被取消、超时或中止时（on_cancel / on_stop），发布者对承包者的好感下降（opinion_failed_contract_*），事件链与全部兴趣点标记被清除。

On completion the operator gains trade 1750 + Rare Crystals 350 (scaled by completed contracts), influence @opinion_contract_small (50); the issuer's opinion +50 and trust +5; the issuer's active-harvest flag is cleared. If the contract is cancelled, times out or is aborted (on_cancel / on_stop), the issuer's opinion of the operator drops (opinion_failed_contract_*), and the chain and all points of interest are cleared.

## 条件与文明差异 Conditions and variants

同一份模板（inline_script contracts/HarvestResource）生成九种资源契约，仅资源与科技需求不同。发布者同时只能有一份采集契约（共享旗标 harvest_contract_active）。游牧发布者不可发布（issued_abort_trigger is_nomadic）。

One template (inline_script contracts/HarvestResource) generates the nine resource contracts; only the resource and tech requirement differ. An issuer can have one harvest contract at a time (shared flag harvest_contract_active). Nomadic issuers cannot post it (issued_abort_trigger is_nomadic).

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：`common/missions/missions/02_contracts.txt:156-177`; `common/event_chains/00_event_chains_nomads.txt:148`; `common/inline_scripts/contracts/HarvestResource.txt`; `common/scripted_effects/nomads_effects.txt:4213-4220,4613-4702`
- 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.
对照契约定义、内联脚本、专项与事件钩子核实了发布/接受条件、完成方式、奖励与失败处理；事件链卡片是模型中唯一的可读文档（任务、专项与钩子事件不是文档），因此本导读承载结构。

The issue/accept conditions, completion mechanism, rewards and failure handling were checked against the mission, inline scripts, special projects and hook events; the chain card is the only readable doc in the model (missions, projects and hook events are not docs), so this guide carries the structure.
