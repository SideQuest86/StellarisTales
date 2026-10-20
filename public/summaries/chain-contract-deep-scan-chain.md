# 深度扫描 / Deep Scan

- 分类 Category：C8 银河轶事 / Galactic miscellany
- DLC：Nomads

## 如何开始 How it starts

发布者（非游牧、自有或无主星系）要求对一个星系做深度扫描；发布者需与至少一个具备深扫能力（has_deep_scan_capability）的游牧国家有通讯。承包者需有方舟科技（tech_arkship_tier_2/3、tech_sensors_2 或 tech_arkship_system_scanner 之一）。接受期限1800天，费用 1000。

A non-nomadic issuer asks for a deep scan of a system it owns or that is unowned; it must be in contact with a nomadic empire that has deep-scan capability (has_deep_scan_capability). The operator needs an arkship tech (tech_arkship_tier_2/3, tech_sensors_2 or tech_arkship_system_scanner). Acceptance window 1800 days, cost 1000.

## 剧情脉络 Story outline

接受后为系内每颗符合条件的行星（无异常、不可居住、非人造、非环世界/星痕）创建兴趣点；方舟用深度扫描（arkship_deep_scan_effect）逐个扫描，每扫完一个移除该行星兴趣点，全部扫完后计数器 +1 完成。

On acceptance a point of interest is placed on every qualifying planet (no anomaly, not habitable, not artificial, not ringworld or astral scar); the arkship deep-scans them one by one (arkship_deep_scan_effect), each scan removes that planet's point of interest, and when none remain the counter +1 completes the contract.

## 分支与结局 Branches and outcomes

完成：承包者获得贸易 1750 + 物理研究 350（放大），影响力 50；发布者好感 +50、信任 +5。 契约被取消、超时或中止时（on_cancel / on_stop），发布者对承包者的好感下降（opinion_failed_contract_*），事件链与全部兴趣点标记被清除。

Completion: the operator gains trade 1750 + physics research 350 (scaled), influence 50; the issuer's opinion +50, trust +5. If the contract is cancelled, times out or is aborted (on_cancel / on_stop), the issuer's opinion of the operator drops (opinion_failed_contract_*), and the chain and all points of interest are cleared.

## 条件与文明差异 Conditions and variants

无文明差异。

No empire variants.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：`common/missions/missions/02_contracts.txt:867-1055`; `common/event_chains/00_event_chains_nomads.txt:388`; `common/scripted_effects/nomads_effects.txt:3485-3510,4063-4096,4968`
- 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.
对照契约定义、内联脚本、专项与事件钩子核实了发布/接受条件、完成方式、奖励与失败处理；事件链卡片是模型中唯一的可读文档（任务、专项与钩子事件不是文档），因此本导读承载结构。

The issue/accept conditions, completion mechanism, rewards and failure handling were checked against the mission, inline scripts, special projects and hook events; the chain card is the only readable doc in the model (missions, projects and hook events are not docs), so this guide carries the structure.
