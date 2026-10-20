# 地球大陆 / Terra Firma

- 分类 Category：探索 Exploration

## 如何开始 How it starts

事件链“太阳坐标”由异常 AST_DEBRIS_FIELD_1_CAT（“残骸场”，另一故事 anomaly-ast-debris-field-1-cat）的 anomaly.95“对别人很重要”选项b或 anomaly.105“老式曲调”选项b开启：在“联邦人类”NPC 系统（com_sol）、核毁灭的太阳系（nuked_sol）或早期太空时代人类所在的太阳系中随机选一个为 sol_target，并设置国家标志 sol_search、创建兴趣点。

The event chain "Solar Coordinates" is started by option b of anomaly.95 "Important to Someone Else" or of anomaly.105 "Old-Timey Tunes" from the anomaly AST_DEBRIS_FIELD_1_CAT ("Debris Field", another story, anomaly-ast-debris-field-1-cat): it picks as sol_target the Commonwealth-of-Man NPC system (com_sol), the nuked Sol (nuked_sol) or the Sol of early-space-age humans, and sets country flag sol_search plus a point of interest.

## 剧情脉络 Story outline

舰队进入 sol_target 系统（on_entering_system_fleet）→ anomaly.96“地球大陆”（或几乎相同的 anomaly.106）：清除 sol_target/sol_search，事件链计数 found +1；选项按伦理（中立、排外、亲外星）三选一，都给予影响力加成并结束事件链。

A fleet entering the sol_target system (on_entering_system_fleet) → anomaly.96 "Terra Firma" (or the almost identical anomaly.106): clears sol_target / sol_search and adds 1 to the chain counter found; the options (neutral, xenophobe, xenophile) are chosen by ethics, all give an influence bonus and end the chain.

## 分支与结局 Branches and outcomes

单一路径；三个选项由伦理决定，互斥。anomaly.96 与 106 的触发条件相同，实际上只会触发其中先被检查的那个。

Single path; the three options are decided by ethics and are mutually exclusive. anomaly.96 and 106 have identical triggers, so in practice only the one checked first fires.

## 条件与文明差异 Conditions and variants

排外者在 anomaly.96 的选项中丢弃标本“铝制纪念牌”；图片随生物舰船帝国变化。

Xenophobes discard the specimen aluminium_plaque in anomaly.96's option; the picture changes for bio-ship empires.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：events/anomaly_events_1.txt:1010-1075 (anomaly.95 option b, chain start; story anomaly-ast-debris-field-1-cat); events/anomaly_events_1.txt:1083 (anomaly.96); events/anomaly_events_1.txt:1301-1340 (anomaly.105 option b); events/anomaly_events_1.txt:1357 (anomaly.106); common/on_actions/00_on_actions.txt:1020-1021 (on_entering_system_fleet); common/event_chains/00_event_chains_2.txt:56 (find_sol_chain)
已核对 anomaly.95/96/105/106、事件链与两个 on_action 钩子（1020、1021）。草稿把两个版本拆成两个只含一个文档的故事；现合为一个以事件链“太阳坐标”为起点的故事，两个文档均由进入系统触发。

Checked anomaly.95/96/105/106, the chain and the two on_action hooks (1020, 1021). The draft made two one-doc stories of the two versions; they are now one story starting from the chain "Solar Coordinates", both docs triggered by entering the system.
