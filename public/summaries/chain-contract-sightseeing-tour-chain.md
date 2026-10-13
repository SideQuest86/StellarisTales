# 观光旅行 / Sightseeing Tour

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / Galactic miscellany
- 来源 Sources：`common/missions/missions/02_contracts.txt:2874-3099`; `common/event_chains/00_event_chains_nomads.txt:484`; `events/nomads_events_1.txt:12285-12492`
- DLC：Nomads
- 审阅 Reviewed：2026-10-13（已审阅 reviewed）

## 如何开始 How it starts

发布者自有星系内有一颗尚未享受过观光（nomad_contract_sightseeing）的殖民地，且发布者没有正在进行的同类契约。费用 1000，接受期限1800天。

The issuer owns a colony in the system that has not yet enjoyed a sightseeing tour (nomad_contract_sightseeing) and has no such contract running. Cost 1000, window 1800 days.

## 剧情脉络 Story outline

接受后以人口最多的殖民地为起点创建兴趣点。方舟进入起点系 → nomads.3060“游客登船”，随机选出一个非黑洞/中子星/脉冲星、非敌对非守卫的目的地系；抵达目的地 → nomads.3065“游客观光”，指定返回起点系；回到终点系 → nomads.3070 计数器 +1 完成。

After acceptance the most populous colony becomes the start. When the arkship enters the start system, nomads.3060 "Tourists Boarding" fires and picks a random destination (no black hole, neutron star or pulsar; not hostile or guardian); arriving there nomads.3065 "Tourists Sightseeing" sends it back to the start; reaching the end system, nomads.3070 raises the counter +1.

## 分支与结局 Branches and outcomes

完成：承包者贸易 1750 + 凝聚力 350（放大），影响力 @opinion_contract_regular(100)；发布者的该殖民地获得720天的 nomad_contract_sightseeing 修正，好感 +100、信任 +10。 契约被取消、超时或中止时（on_cancel / on_stop），发布者对承包者的好感下降（opinion_failed_contract_*），事件链与全部兴趣点标记被清除。

Completion: the operator gains trade 1750 + unity 350 (scaled) and influence @opinion_contract_regular (100); the colony gets nomad_contract_sightseeing for 720 days; opinion +100, trust +10. If the contract is cancelled, times out or is aborted (on_cancel / on_stop), the issuer's opinion of the operator drops (opinion_failed_contract_*), and the chain and all points of interest are cleared.

## 条件与文明差异 Conditions and variants

永恒巡航（origin_forever_cruise）起源下改为提升乘客满意度。

With the Forever Cruise origin the reward raises passenger satisfaction instead.

## 审阅记录 Review notes

对照契约定义、内联脚本、专项与事件钩子核实了发布/接受条件、完成方式、奖励与失败处理；事件链卡片是模型中唯一的可读文档（任务、专项与钩子事件不是文档），因此本导读承载结构。

The issue/accept conditions, completion mechanism, rewards and failure handling were checked against the mission, inline scripts, special projects and hook events; the chain card is the only readable doc in the model (missions, projects and hook events are not docs), so this guide carries the structure.
