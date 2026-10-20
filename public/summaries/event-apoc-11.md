# 星门建设完成 / Gateway Constructed

- 分类 Category：C8 银河轶事 / Galactic miscellany
- DLC：Apocalypse

## 如何开始 How it starts

玩家用“星门建造”科技在自己的边境内造出星门基址（gateway_0，75影响力+2500合金，1080天）完成时发 apoc.14；再把基址升级为星门（gateway_final，需“星门激活”科技才显示、“星门建造”科技才可建，6000能量+2500合金，1800天）完成时发 apoc.11（本国第一座星门）或 apoc.13（之后的星门）。

When a player completes a gateway construction site inside its borders with Gateway Construction (gateway_0, 75 influence + 2500 alloys, 1080 days) apoc.14 fires; upgrading it to a gateway (gateway_final: shown with Gateway Activation, buildable with Gateway Construction; 6000 energy + 2500 alloys, 1800 days) fires apoc.11 (the empire's first gateway) or apoc.13 (later ones).

## 剧情脉络 Story outline

三个单窗口通知，按先后：基址就绪（apoc.14）→ 星门建成（apoc.11 或 apoc.13）。若星门网络只有一座活跃星门，同一时刻还会把一座废弃星门（gateway_ruined）自动修复（05_gateways.txt:301-311）。

Three one-window notices in order: site ready (apoc.14) → gateway built (apoc.11 or apoc.13). If only one gateway is active, a ruined gateway is also auto-restored at the same moment (05_gateways.txt:301-311).

## 分支与结局 Branches and outcomes

apoc.11 与 apoc.13 互斥；无其他分支。

apoc.11 and apoc.13 are exclusive; no other branches.

## 条件与文明差异 Conditions and variants

无文明差异；银河门前起源（doorstep_gateway）使用另一套通知。

No empire variants; the Galactic Doorstep origin (doorstep_gateway) uses a different notice.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：`events/apocalypse_events.txt:232-262,298-345`; `common/megastructures/05_gateways.txt:3-318`
- 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.
对照 05_gateways.txt 的三个 on_build_complete 与 apoc.11/13/14 的触发；原先的 event-apoc-14 并入本条。

The three on_build_complete hooks in 05_gateways.txt and the triggers of apoc.11/13/14 were checked; the former event-apoc-14 is merged here.
