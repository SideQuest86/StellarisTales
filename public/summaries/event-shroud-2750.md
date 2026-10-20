# 心灵升华 / Psionic Ascension（突破荫蔽 Breach the Shroud）
- 分类 Category：文明纪事 Society (C7) · 心灵传统情境 psionic tradition situation（入口 shroud.2750）

## 如何开始 How it starts

采用传统“进入荫蔽”（tr_psionics_shroud_adopt）时触发 shroud.2750（深渊吞噬者起源改发 shroud.8310）；仅对具有心灵潜质的帝国生效，立即启动情境 situation_breach_shroud（乌托邦的 utopia.2602 同时展示心灵潜力）。/ Adopting the Shroud tradition fires shroud.2750 (the Endbringers origin gets shroud.8310 instead) and starts the situation.

## 剧情脉络 Story outline

1. **心灵升华（2750）**：说明心灵觉醒的代价；机械、蜂巢、普通帝国有不同正文。→ 情境“心灵升华”（初始进度0，阶段一至 500、阶段二至 750、阶段三至 1000）。可选路线（approach）：无 / 冥想（统一 −25%，有益池 ×5）/ 公社资源（佐罗）/ 分发佐罗（混乱池 ×5，需科技）。/ The situation has three stages with approaches (none, meditate, commune resources, distribute zro).
2. **每月检查 shroud.2200**：阶段一进度 ≥150 时抽一次**社会事件**（11 选 1：2600–2640）；之后在进度到达阶段一 325、阶段二 625、阶段三 875 时，各抽一次**三类池之一**（有益 2300–2325、平衡 2400–2425、混乱 2500–2520，1:1:1，路线可 ×5），池内等概率。/ Monthly shroud.2200: one social event in stage 1, then one pool event at 325 / 625 / 875.
3. **阶段二开始 → 2760 建立心灵军团**；**阶段三开始 → 2780 大觉醒**（若已采用“大觉醒”传统，主种族变为心灵种族，乌托邦的 utopia.2652 展示觉醒）。/ Stage 2 → 2760 (Psi Corps); stage 3 → 2780 (Great Awakening).
4. **进度满 → 2800 突破荫蔽**：情境结束，解锁心灵传统；“荫蔽锻造”起源改接触黏土动画师并触发 **2810**。/ Completion → 2800, with 2810 for Shroud-Forged empires.

## 分支与结局 Branches and outcomes

- 社会池 11 选 1（权重各 1）；三类池 1:1:1 抽一类再等概率抽一个。/ Exclusive pools as annotated.
- 社会池（早期）：2600 优越感 / 2605 反心灵反弹 / 2610 欺诈行为 / 2615 鲁莽实验 / 2620 心灵分离（格式塔）/ 2621 心灵排斥（非格式塔）/ 2625 心灵疾病（有机）/ 2626 心灵故障（机械）/ 2630 失败的实验 / 2635 共情的出现 / 2640 异常心灵。/ Social pool.
- 有益池：2300 思想传输 / 2305 幻影存在 / 2310 心灵寄生虫 / 2315 物质显现 / 2320 心灵分身 / 2325 心灵观察。 平衡池：2400 物质流变 / 2405 死脑 / 2410 心灵变异 / 2415 念动力 / 2420 成长的痛 / 2425 心灵地下组织。 混乱池：2502 荫蔽降临 / 2505 失控 / 2510 神经过载 / 2515 噩梦 / 2520 怪物袭击。/ Beneficial, balanced and chaotic pools.

## 条件与文明差异 Conditions and variants

机械、蜂巢、普通帝国以及“荫蔽锻造”“荫蔽行者学徒”等起源都有不同文本或选项；多数池事件选项依赖伦理与能量储备。/ Machine, hive and regular empires, and several origins, have their own text and options.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（c7b-society）
- 来源 Sources：`events/shroud_situation_events.txt:758–829, 3808–4255` · `common/situations/13_shroud_situations.txt:1–400` · `common/traditions/01_psionics_shroud.txt` · `common/on_actions/00_on_actions.txt:5289–5340`
- 已核对 Checked：2750–2810、shroud.2200 与四个池（`on_actions`）、情境定义、传统启用、28 个池事件的正文与选项。
- 审阅改动 Changes：原来 28 个池事件各自成篇（event-shroud-2300…2640），而它们都只是同一情境的随机事件池；现并入本篇，用情境到各事件的桥标出阈值、池权重与路线加成，并按池分为互斥组。/ The 28 pool events used to be separate one-event stories; they are chapters of this situation and are now grouped by pool with thresholds and approach multipliers.
- 不确定 Uncertain：2760/2780 的效果与 utopia.2602/2652 未逐项展开。
