# 毒化目标星球 / Toxify the Target Planet- 分类 Category：文明纪事 Society (C7) · 极端边疆情境 extreme-frontiers situation

## 如何开始 How it starts

执行决定“毒化世界”(decision_toxify_world)（`14_extreme_frontiers_decisions.txt:95`）对目标行星开始情境；目标行星不再位于本国空域内时中止。/ Started by the Toxify World decision; aborts if the target leaves the empire’s space.

## 剧情脉络 Story outline

1. **毒化世界**：每月进度 +10，总需 1000；路线：**地磁辐射**（默认，持续消耗 1 暗物质 + 2 稀有水晶）/ **自毁开关**（花费 1000 团结度并终止）。每月隐藏事件 extreme_frontiers.2000。/ Monthly +10 to 1000; approach Georadiation (default; upkeep 1 dark matter + 2 rare crystals) or Killswitch (1000 unity, aborts).
2. **进度满**：首次使用（未设置 georadiation_first_use）→ **extreme_frontiers.2005 有毒资源**；之后再用 → extreme_frontiers.2010。/ On completion: the first use fires 2005 Toxic Resources, later uses 2010.

## 分支与结局 Branches and outcomes

路线互斥；2005/2010 由是否首次使用决定。/ Approaches exclusive; 2005 / 2010 by first use.

## 条件与文明差异 Conditions and variants

只对拥有该极端边疆内容的帝国。/ Only for empires with the extreme-frontiers content.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（c7b-society）
- 来源 Sources：`common/situations/13_extreme_frontiers_situations.txt:1-90` · `common/decisions/14_extreme_frontiers_decisions.txt:95` · `events/extreme_frontiers_events.txt (2000/2005/2010)`
- 已核对 Checked：情境、决定与 2000/2005/2010。/ Situation, decision and events.
- 审阅改动 Changes：结构与草稿一致。/ Matches the draft.
