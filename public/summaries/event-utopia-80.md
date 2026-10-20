# 科学枢纽 / Science Nexus

- 分类 Category：银河轶事 C8 stories

## 如何开始 How it starts

在你自己的边境内放置并开工科学枢纽（见 common/megastructures/03_think_tank.txt）。每个建造阶段完工时，巨型结构的 on_build_complete 或 on_megastructure_upgraded 触发对应的国家事件；这些事件只是阶段提示，没有选择分支（每个只有一个“确认”选项）。
You place and start a Science Nexus inside your borders (common/megastructures/03_think_tank.txt). Every completed build stage fires a country event for the builder; these are stage notices with a single confirm option, no branching.

## 剧情脉络 Story outline

1. utopia.80：科学枢纽基址建成（think_tank_0） / Science Nexus site built (think_tank_0)
2. utopia.83：枢纽中心建成（think_tank_1） / Hub built (think_tank_1)
3. utopia.85：研究侧翼第一阶段完成（think_tank_2） / Research wings first stage done (think_tank_2)
4. utopia.84：科学枢纽完工（think_tank_3） / Science Nexus completed (think_tank_3)

按顺序出现，由建造进度决定，不由事件编号决定。 They appear in construction order, driven by build progress rather than by event id.

## 分支与结局 Branches and outcomes

- 其他帝国的通知 Notices to other empires：
- utopia.82：中心建成时：有通讯并有情报的玩家帝国收到通知（隐藏事件81） / When the hub is built: human empires with communications/intel get a notice (hidden 81)
- utopia.86：完工时：同样条件的玩家帝国收到通知 / On completion: the same empires get a notice
- 废墟 The ruin：utopia.2012（星系首次进入时，需该星系的星标记“ruined_nexus_system”）可以选择“与我们的相近”（已拥有同类）或“很迷人”（没有同类时，30天后进入通用跟进事件 story.5）；utopia.2013 在修复完成后出现。
  utopia.2012 fires when a ship first enters the system; the option depends on whether you already own this megastructure ("fascinating" otherwise, which fires the generic follow-up story.5 after 30 days). utopia.2013 fires when the ruin is restored.
- 没有随机或互斥分支，只有“建造阶段”与“废墟/修复”两条独立线索。 No random or exclusive branches: two independent threads (build stages; ruin and restoration).

## 条件与文明差异 Conditions and variants

- 建造阶段事件仅发给建造国；通知事件发给满足通讯与情报条件的其他非AI国家。 Stage events go to the builder only; notices go to other non-AI countries that meet the communication/intel condition.

## 审阅记录 Review notes

- 来源 Sources：events/megastructure_events_1.txt、common/megastructures/03_think_tank.txt、common/on_actions/00_on_actions.txt（on_megastructure_built / on_megastructure_upgraded / on_entering_system_first_time）· DLC：Utopia（按本地化文件名）· 审阅 Reviewed 2026-10-13
- 已核对 Checked：common/megastructures/03_think_tank.txt 各阶段 on_build_complete，common/on_actions/00_on_actions.txt 的 on_megastructure_* 与 on_entering_system_first_time 列表，events/megastructure_events_1.txt 中各事件的 trigger/option。
- 更正 Corrections：原先每个阶段、通知与废墟事件各自成为一个单页故事；现合并为同一巨型结构的故事，阶段按建造顺序连接。 Previously every stage, notice and ruin event was its own one-card story; they are merged and ordered by construction.
- 不确定 Uncertain：废墟如何被放置（星系初始化器/事件的星标记）未逐一追踪。 How ruins are placed on the map (system initializers / star flags) was not traced one by one.
