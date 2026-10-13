# 吞噬[Target.GetName] / Consume [Target.GetName]
- 分类 Category：文明纪事 Society (C7) · 岩石蜂群情境 lithoid swarm situation
- 来源 Sources：`common/situations/02_strategic_situations.txt:833-900` · `common/decisions/02_special_decisions.txt:1763` · `events/colony_events_3.txt (colony.185 / colony.190)`
- 审阅 Reviewed：2026-10-13（c7b-society）

## 如何开始 How it starts

岩石蜂群（Terravore）帝国执行决定“吞噬世界”(decision_lithoid_swarm_consume_world)（`02_special_decisions.txt:1763`），对本国一颗行星开始情境。目标行星不再属于本国时情境中止。/ A Terravore lithoid empire executes the Consume World decision on one of its planets; the situation aborts if the planet leaves the empire.

## 剧情脉络 Story outline

1. **吞噬世界**：进度每月按 terravore_progress 增长，总需 1000，只有一个阶段；路线：**吞噬**（默认）/ **克制**（花费 1000 团结度并终止）。每月 colony.190 添加地块阻挡物并给予奖励。/ Progress grows to 1000; approach Devour (default) or Restraint (cost 1000 unity, aborts). Monthly colony.190 adds blockers and rewards.
2. **进度满 → colony.185 世界被吞噬**：行星被毁；若行星曾属于或联系着一个堕落帝国，5 天后 **planet_destruction.610**（被激怒的堕落帝国）→ 视条件触发 **fallen_empires_awakening.11 「某堕落帝国的终结」**（被同化）、**fallen_empires_awakening.2 「沉睡者觉醒」**，以及 **bio.3400 「团结」**。/ On completion colony.185 destroys the planet; 5 days later planet_destruction.610 (an outraged Fallen Empire) can lead to fallen_empires_awakening.11, fallen_empires_awakening.2 and bio.3400.

## 分支与结局 Branches and outcomes

吞噬 / 克制 互斥；610 之后的堕落帝国反应按条件分支。/ Devour and Restraint are exclusive; the Fallen Empire reaction depends on conditions.

## 条件与文明差异 Conditions and variants

只对岩石蜂群起源。/ Terravore lithoid empires only.

## 审阅记录 Review notes

- 已核对 Checked：情境定义、决定、colony.185/190、610 及后续事件的触发。/ Situation, decision and the triggers of 185/190/610 and follow-ups.
- 审阅改动 Changes：结构与草稿一致。/ Matches the draft.
- 不确定 Uncertain：610 之后的堕落帝国分支条件只按调用图读取。 / The Fallen Empire branches after 610 were read from the call graph.
