# 遗弃星门 / Abandoned Gateway

- 分类 Category：C8 银河轶事 / Galactic miscellany
- DLC：Apocalypse

## 如何开始 How it starts

飞船首次进入带有 abandoned_gateway 标记、含已废弃星门（gateway_ruined）的星系，且本国尚未遇到过任何星门（flag encountered_first_gateway）时，触发 apoc.1（on_entering_system_first_time）。

A ship first entering a system flagged abandoned_gateway that holds a ruined gateway (gateway_ruined), when the empire has not met a gateway before (flag encountered_first_gateway), triggers apoc.1 (on_entering_system_first_time).

## 剧情脉络 Story outline

apoc.1 发现废弃星门（唯一选项“有意思”，正文因是否已遇到L星门而异）。研究“星门激活”科技后可把星门升级为修复状态，耗时720天、花费6000能量和2500合金；完成时通知玩家：首座被激活的星门显示 apoc.10，之后的显示 apoc.12。apoc.10 的选项依是否放弃修复（did_not_repair_gateway）和是否有科技而异。

apoc.1 reports the derelict gateway (single option; the text differs if an L-gate was met). With the Gateway Activation technology the gateway can be upgraded to restored (720 days, 6000 energy + 2500 alloys); on completion the player gets apoc.10 for the first gateway activated and apoc.12 for later ones. The options of apoc.10 depend on did_not_repair_gateway and the technology.

## 分支与结局 Branches and outcomes

apoc.10 与 apoc.12 互斥；没有其他分支。

apoc.10 and apoc.12 are exclusive; there are no other branches.

## 条件与文明差异 Conditions and variants

apoc.10 的正文有四种（激活星门数量、是否未亲自修复/是否有激活科技）；未亲自修复且没有激活科技时，选项 apoc.10.a 会添加研究选项“星门激活”。

apoc.10 has four text variants (number of active gateways; did not repair / has the activation technology); when the gateway was not repaired by the empire and it lacks the activation technology, option apoc.10.a adds the research option Gateway Activation.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：`events/apocalypse_events.txt:6-51`; `events/apocalypse_events.txt:145-230,264-296`; `common/megastructures/05_gateways.txt:321-480`
- 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.
核对 events/apocalypse_events.txt 与 common/megastructures/05_gateways.txt 的触发和升级链；原先的 event-apoc-10 并入本条；paragon.3000 属斯克兰德的故事。

Triggers and upgrade chain in events/apocalypse_events.txt and common/megastructures/05_gateways.txt were checked; the former event-apoc-10 is merged here; paragon.3000 belongs to the Skrand story.
