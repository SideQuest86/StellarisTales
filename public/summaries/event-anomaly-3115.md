# 漂流的战场 / Drifting Battlefield

- 分类 Category：探索 Exploration · 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：events/anomaly_events_2.txt:3016-3085 (anomaly.3113, chain start; story anomaly-gaia-record-cat); events/anomaly_events_2.txt:3086 (anomaly.3114); events/anomaly_events_2.txt:3255 (anomaly.3115); common/special_projects/00_projects_2.txt:709 (WRECKED_FLEET_2); events/anomaly_events_2.txt:3306 (anomaly.3116); events/anomaly_events_2.txt:3388 (anomaly.3120); events/anomaly_events_2.txt:3470 (anomaly.3121); common/on_actions/00_on_actions.txt:991-992 (on_entering_system_fleet); common/on_actions/00_on_actions.txt:1631 (on_fleet_destroyed_perp)

## 如何开始 How it starts

事件链“漂流的战场”由异常 GAIA_RECORD_CAT（“破釜沉舟”，另一故事 anomaly-gaia-record-cat）经项目 WRECKED_FLEET_1 后的 anomaly.3113 选项b开启：它掷骰（60%/40%）决定走“废弃舰队”还是“海盗”路线，在远处（至少20跳、无主、情报等级为零、有小行星）的系统设置 wrecked_fleet_system 并创建兴趣点。

The event chain "Drifting Battlefield" is started by option b of anomaly.3113, after project WRECKED_FLEET_1, from the anomaly GAIA_RECORD_CAT ("Rubiconian Shores", another story, anomaly-gaia-record-cat): it rolls 60%/40% between a "wrecked fleet" and a "pirates" route, and marks a far-away system (at least 20 jumps, unowned, no intel, with an asteroid) as wrecked_fleet_system with a point of interest.

## 剧情脉络 Story outline

舰队进入该系统，走哪条取决于开链时的掷骰：
- 60%：anomaly.3115“漂流的舰队”：创建古战场环境物体，选项启用项目 WRECKED_FLEET_2“古老联盟舰队” → anomaly.3116“征用舰队”（事件链计数 +1，获得“主力舰队”）。
- 40%：anomaly.3114“海盗暗涌”：在小行星上创建“拾荒者”海盗国家、基地与舰队；击毁基地 → anomaly.3120“剿灭海盗”（奖励；隐藏的 anomaly.3121 做清理）。

The fleet enters the system and the route depends on the roll made when the chain started:
- 60%: anomaly.3115 "Of Fleets Drifting": creates an ancient battlefield ambient object and the option enables project WRECKED_FLEET_2 "Ancient Alliance Armada" → anomaly.3116 "Of Fleets Commandeered" (chain counter +1, gives the 'Main Forces' fleet).
- 40%: anomaly.3114 "Of Pirates Current": creates the Wreckers pirate country, base and fleets on the asteroid; destroying the base → anomaly.3120 "Of Pirates Destroyed" (reward; the hidden anomaly.3121 cleans up).

## 分支与结局 Branches and outcomes

两条路线互斥（开链时已决定，60/40）；海盗路线可以不击毁基地。

The two routes are exclusive (decided at the chain start, 60/40); on the pirate route destroying the base is optional.

## 条件与文明差异 Conditions and variants

anomaly.3120 的奖励按是否已有 tech_cruisers 变化。

anomaly.3120's reward depends on whether tech_cruisers is already known.

## 审阅记录 Review notes

已核对 anomaly.3113–3121、WRECKED_FLEET_2 与 on_action 钩子（991、992、1631）。修正：草稿把“海盗暗涌”“剿灭海盗”“漂流的舰队”作为三个互不相连的故事；现合为一个以事件链“漂流的战场”为起点的故事，用审阅连接还原两条路线与击毁海盗基地。前半段（信号、项目、链开启）属于 c3b 的 anomaly-gaia-record-cat。

Checked anomaly.3113-3121, WRECKED_FLEET_2 and the on_action hooks (991, 992, 1631). Correction: the draft treated 'Of Pirates Current', 'Of Pirates Destroyed' and 'Of Fleets Drifting' as three unconnected stories; they are now one story starting from the chain "Drifting Battlefield" with reviewed links restoring the two routes and the base destruction. The first half (signal, project, chain start) belongs to c3b's anomaly-gaia-record-cat.
