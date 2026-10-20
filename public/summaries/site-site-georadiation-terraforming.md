# 地下网络 / Subterranean Network

- 分类 Category：先驱者与考古 Precursors · DLC：脚本条件 has_shroud_dlc（Shroud 相关内容） script condition has_shroud_dlc

## 如何开始 How it starts

随机遗址：权重+50，出现在有毒星球（pc_toxic，非地形改造候选）上，要求 has_shroud_dlc（common/archaeological_site_types/12_extreme_frontiers_arc_sites.txt:302）。

A random site: +50 on toxic planets (pc_toxic, not a terraforming candidate), needing has_shroud_dlc (common/archaeological_site_types/12_extreme_frontiers_arc_sites.txt:302).

## 剧情脉络 Story outline

撞击坑下埋着一台破坏性的“地质辐射”环境改造装置，还在向银河发信号。最后阶段开启事件链并给出两处同类装置的位置（两个并行的“信号追踪”项目）；两项都完成后第四台未爆装置出现，可销毁或分析。分析会招来科伯恩公司（CoburnCorp）无人机的“版权”追讨。

1. 辐照化残骸：与信号（小型文物与研究）
2. 腐蚀设备：腐蚀的装置：深入地壳的受损构造，设置星球/恒星标志
3. 破坏性环境改造：开始事件链并启用两个信号追踪项目（地形雕塑科技进度25%）

Under the crater lies a destructive "georadiation" terraforming device still signalling across the galaxy. The last stage starts an event chain and two parallel "Signal Trace" projects point to similar devices; once both are done a fourth, undetonated device appears and can be scrapped or analysed — analysis draws a "licence" enforcement drone from CoburnCorp.

1. Irradiated Debris: irradiated debris and a signal (artifact and research)
2. Corroded Device: a corroded device deep in the crust; sets planet and star flags
3. Deconstructive Terraforming: starts the chain and enables both Signal Trace projects (terrestrial sculpting tech progress 25%)

（并入自 event-extreme-frontiers-1533，评注）拒绝订阅（1530.b、1531.g）或选择战斗（1531.i）会让隐藏事件 1532 创建一支 GeoCorp 舰队；舰队被击毁时（on_fleet_destroyed_perp）隐藏事件 1533 在击杀者国家触发，1天后发出 1534“科伯恩公司无人机”（告别）→ 1535“条款变更”（与付款结局 1531.h 到达同一个 1535）→ 后续分析项目 → 1540。该分支依赖玩家真的击毁舰队。

(Merged from event-extreme-frontiers-1533; commentary.) Declining the subscription (1530.b, 1531.g) or choosing battle (1531.i) makes hidden extreme_frontiers.1532 create a GeoCorp fleet; when it is destroyed (on_fleet_destroyed_perp) hidden 1533 fires on the killer and sends 1534 "Drone of CoburnCorp" after 1 day -> 1535 "Terms Modified" (the same 1535 reached by the paid ending 1531.h) -> follow-up analysis project -> 1540. This branch needs the player to actually destroy the fleet.

## 分支与结局 Branches and outcomes

- 信号踪迹：[planet.GetName] / Signal Trace: [planet.GetName]：信号追踪一 → extreme_frontiers.1515“重力燃料”：找到暗物质驱动的装置（暗物质资源点），设置 georadiation_signal_1_project_done / Signal Trace 1 → 1515 Gravitational Fuel: a dark-matter-driven device (dark matter deposit), sets georadiation_signal_1_project_done
- 信号踪迹：[planet.GetName] / Signal Trace: [planet.GetName]：信号追踪二 → extreme_frontiers.1520“模拟辐照”：被水晶包裹的装置（稀有水晶资源点），设置 georadiation_signal_2_project_done / Signal Trace 2 → 1520 Stimulated Radiation: a crystal-encased device (rare crystals deposit), sets georadiation_signal_2_project_done
- 未爆装置 / Undetonated Device：两个信号都完成后，由后完成的那一个启用“未爆装置”项目 → extreme_frontiers.1525 / enabled by whichever Signal Trace finishes second, once both flags exist → extreme_frontiers.1525
- 未爆装置 / Undetonated Device：第四台完整装置。a 开始研究 → 项目“装置分析”；b 销毁（30天后 extreme_frontiers.1545，获得材料与研究，这项技术从此失传） / the intact fourth device. a study it → project Device Analysis; b destroy it (extreme_frontiers.1545 after 30 days: salvage and research, the technology is lost)
- 违反条款 / Breach of Terms：分析触发警报，科伯恩公司无人机来访。a 开启通讯 → 1531 的对话；b 拒绝 → 1532（隐藏）直接生成舰队 / analysis trips an alarm and a CoburnCorp drone arrives. a open communications → the 1531 dialogue; b refuse → hidden 1532 spawns its fleet
- 科伯恩公司无人机 / Drone of CoburnCorp：科伯恩无人机的客服式对话：问话 a/b/c 可按任意顺序，随后可“续订订阅”→ 付费（能量-3000）→ h“好走不送”→ extreme_frontiers.1535；或拒绝/偷窃 → 战斗（1532 生成舰队） / the help-desk dialogue: questions a/b/c in any order, then "renew the subscription" → pay (energy -3000) → h "Good riddance" → extreme_frontiers.1535; or refuse/theft → battle (1532 spawns the fleet)
- 未爆装置 / Undetonated Device：分析完成：获得科技“地质辐射环境改造”（工程学与社会学研究） / analysis complete: the tech georadiation terraforming is granted (engineering and society research)
- 战斗路线：击毁科伯恩舰队会经 on_fleet_destroyed_perp（common/on_actions/00_on_actions.txt:1692）触发隐藏事件 extreme_frontiers.1533，1天后 1534（与无人机残存意识的对话）再触发 1535。这两个事件目前属于另一个故事“event-extreme-frontiers-1533”，不在本故事内（见审阅请求）。 / Battle route: destroying the CoburnCorp fleet fires hidden extreme_frontiers.1533 through on_fleet_destroyed_perp (common/on_actions/00_on_actions.txt:1692); a day later 1534 (a conversation with the drone) fires 1535. These two events currently sit in the separate story "event-extreme-frontiers-1533", outside this one (see requests).

## 条件与文明差异 Conditions and variants

- 本遗址的 on_roll_failed 把事件池参数设为 no_events（不存在同名事件池），所以掷骰失败不会触发随机意外。 / The site passes RANDOM_EVENTS = no_events to its roll-failure effect (no pool of that name exists), so a failed roll triggers no incident.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：common/archaeological_site_types/12_extreme_frontiers_arc_sites.txt:302；events/extreme_frontiers_events.txt:4549
- 已核对：遗址定义（common/archaeological_site_types/12_extreme_frontiers_arc_sites.txt:302）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/12_extreme_frontiers_arc_sites.txt:302) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
- r3-integrate（2026-10-13）：合并了 event-extreme-frontiers-1533（1532/1533 为隐藏路由，见 events/extreme_frontiers_events.txt:5297-5346）；增加三条条件桥接到 1534。
  r3-integrate (2026-10-13): Merged event-extreme-frontiers-1533 (1532/1533 are hidden routers, events/extreme_frontiers_events.txt:5297-5346); added three conditional bridges to 1534.
