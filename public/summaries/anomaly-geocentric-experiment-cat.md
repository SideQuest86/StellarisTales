# 天体星仪 / Celestial Orrery

- 分类 Category：深空异闻 Exploration (C3)

## 如何开始 How it starts

- 5级异常，只由特殊初始化器 init_sol_geocentric 放置（一个以“地心”排列的星系）。  
  Level-5 anomaly placed only by the special initializer init_sol_geocentric.

## 剧情脉络 Story outline

- 8000“天体星仪”：小行星带中的暗物质发射器由中央行星上的超级计算机控制，是远古文明的引力操控实验场。保留（中央行星获实验资源点，各稳定器小行星+1物理与+1暗物质）；或拆解机器（摧毁星系结构：恒星变为M型、稳定器变为破碎世界，获得500暗物质与大量物理研究）。两者都加入暗物质开采科技选项。  
  8000 "Celestial Orrery": dark-matter emitters run by a supercomputer — an ancient gravity experiment. Keep it (deposits on the central planet and +1 physics/+1 dark matter on each stabiliser asteroid) or tear it apart (the system is wrecked: M-class star, shattered stabilisers; 500 dark matter and a large physics reward). Both add the dark matter mining tech option.

## 分支与结局 Branches and outcomes

- 两选项互斥；拆解标注为“这是个坏主意”。  
  The two options exclude each other; dismantling is tooltipped "This is a bad idea".

## 条件与文明差异 Conditions and variants

- 无特别差异。  
  No notable variants.

## 审阅记录 Review notes

- 审阅 Review：2026-10-12（c3b-exploration）· 已审阅 Reviewed
- 来源 Sources：`common/anomalies/02_anomaly_categories.txt:804-813` · `common/solar_system_initializers/sol_initializers.txt:3659-3695 (init_sol_geocentric)` · `events/anomaly_events_4.txt:4956-5021 (8000)`
- 已核对 Checked：类别、初始化器与8000（含 destroy_star_system 效果）。  
  Category, initializer and 8000, including the destroy_star_system effect.
- 更正 Corrections：移除拆解选项通过通用效果 destroy_star_system 引出的天灾/观察者链接（应急协议机械世界计数等，仅在相关天灾存在时适用），它们不是本异常的后续。  
  Suppressed crisis/observer links reached through the generic destroy_star_system effect (Contingency machine-world counters, only relevant when that crisis exists); they are not continuations of this anomaly.
- 覆盖 Coverage：2 个文档全部核对 / all 2 docs checked.
