# 戴森球 / Dyson Sphere

- 分类 Category：银河轶事 C8 stories · 来源 Sources：events/megastructure_events_1.txt、common/megastructures/01_dyson_sphere.txt、common/on_actions/00_on_actions.txt（on_megastructure_built / on_megastructure_upgraded / on_entering_system_first_time）· DLC：Utopia（按本地化文件名）· 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

在你自己的边境内放置并开工戴森球（见 common/megastructures/01_dyson_sphere.txt）。每个建造阶段完工时，巨型结构的 on_build_complete 或 on_megastructure_upgraded 触发对应的国家事件；这些事件只是阶段提示，没有选择分支（每个只有一个“确认”选项）。
You place and start a Dyson Sphere inside your borders (common/megastructures/01_dyson_sphere.txt). Every completed build stage fires a country event for the builder; these are stage notices with a single confirm option, no branching.

## 剧情脉络 Story outline

1. utopia.4000：戴森球基址建成（dyson_sphere_0） / Dyson Sphere site built (dyson_sphere_0)
2. utopia.4003：框架建成（dyson_sphere_1） / Frame built (dyson_sphere_1)
3. utopia.4004：部分建成：已装嵌板（dyson_sphere_2） / Panels installed (dyson_sphere_2)
4. utopia.4005：戴森球完工（dyson_sphere_5） / Dyson Sphere completed (dyson_sphere_5)

按顺序出现，由建造进度决定，不由事件编号决定。 They appear in construction order, driven by build progress rather than by event id.

## 分支与结局 Branches and outcomes

- 其他帝国的通知 Notices to other empires：
- utopia.4002：框架完成时：有通讯并有经济/科技情报的玩家帝国收到通知（隐藏事件4001） / When the frame stage is built: human empires with communications/intel get a notice (hidden 4001)
- 废墟 The ruin：utopia.2010（星系首次进入时，需该星系的星标记“ruined_dyson_system”）可以选择“与我们的相近”（已拥有同类）或“很迷人”（没有同类时，30天后进入通用跟进事件 story.5）；utopia.2011 在修复完成后出现。
  utopia.2010 fires when a ship first enters the system; the option depends on whether you already own this megastructure ("fascinating" otherwise, which fires the generic follow-up story.5 after 30 days). utopia.2011 fires when the ruin is restored.
- 没有随机或互斥分支，只有“建造阶段”与“废墟/修复”两条独立线索。 No random or exclusive branches: two independent threads (build stages; ruin and restoration).

## 条件与文明差异 Conditions and variants

- 建造阶段事件仅发给建造国；通知事件发给满足通讯与情报条件的其他非AI国家。 Stage events go to the builder only; notices go to other non-AI countries that meet the communication/intel condition.
- dyson_sphere_3、_4 阶段只发出隐藏的提示消息 utopia.4006，没有可读事件。 Stages dyson_sphere_3 and _4 only fire the hidden alert message utopia.4006; there is no readable event for them.

## 审阅记录 Review notes

- 已核对 Checked：common/megastructures/01_dyson_sphere.txt 各阶段 on_build_complete，common/on_actions/00_on_actions.txt 的 on_megastructure_* 与 on_entering_system_first_time 列表，events/megastructure_events_1.txt 中各事件的 trigger/option。
- 更正 Corrections：原先每个阶段、通知与废墟事件各自成为一个单页故事；现合并为同一巨型结构的故事，阶段按建造顺序连接。 Previously every stage, notice and ruin event was its own one-card story; they are merged and ordered by construction.
- 不确定 Uncertain：废墟如何被放置（星系初始化器/事件的星标记）未逐一追踪。 How ruins are placed on the map (system initializers / star flags) was not traced one by one.
