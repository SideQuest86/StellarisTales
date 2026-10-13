# 沙漠废墟 / Desert Ruins

- 分类 Category：星界裂隙 Astral rifts (C4) · DLC：星界位面 Astral Planes
- 来源 Sources：`common/astral_rifts/00_astral_rifts.txt:186`；`events/astral_rifts_1_events.txt:2489–3278`（1500–1565）
- 审阅 Reviewed：2026-10-12（全篇 whole story）

## 如何开始 How it starts

裂隙类型从探索帝国的裂隙池中按权重抽取：权重 1。它能产出遗珍“时间水晶”，所以任一帝国正在探索它时，其他帝国抽到它的权重为 0（`00_astral_rifts.txt:186–200`）。每阶段结束掷 1–10 的骰子，加技能与线索、减难度，≥14 进入下一章；第一章 1500 难度为 0。

Drawn by weight from the explorer's rift pool: weight 1. Because it can award the Time Crystal relic, its weight is 0 for others while any empire explores it (`00_astral_rifts.txt:186–200`). Each phase ends with a d10 plus skill and clues minus difficulty; 14+ opens the next chapter. Chapter 1500 has difficulty 0.

## 剧情脉络 Story outline

一个时间循环谜题：科学家按错按钮就会“死去”，然后回到循环开头；裂隙外的帝国只剩 3 小时（脚本变量 `time_passed`，`@timeToSolve = 3`）来救他们。

1. 怪异控制台（1500）→ 失去联络（1515）→ 外围废墟（1510）：沙漠中的穹顶建筑里有一个带蓝绿两个按钮的控制台；科学家莫名其妙地“回来”并重述了一遍刚才的经历。
2. 一个抉择（1520）：按蓝色（→ 第二间密室 1530）或绿色（→ 1535 按错：耗 1 小时，循环后在 1525 只能按蓝色 → 1530）。
3. 第二间密室（1530）：按三角形（→ 1545 毒气陷阱：毒素类科学家安然通过直达 1550；其他人耗 1 小时，在 1540 重来按五边形 → 1550）或五边形（→ 1550）。
4. 第三间密室（1550）：按四点（→ 1560 洪水：水生科学家安然直达 1565；其他人耗 1 小时——若此前已错两次则 1505 困死，否则在 1555 重来按六点 → 1565）或六点（→ 1565）。

A time-loop puzzle: a wrong button “kills” the scientist and the loop restarts; the empire outside has only 3 hours (script variable `time_passed`, `@timeToSolve = 3`) to save them.

1. Strange Console (1500) → Lost Contact (1515) → Outer Ruins (1510): a domed building in the desert holds a console with a blue and a green button; the scientist inexplicably “returns” and recounts what just happened.
2. A Choice (1520): press blue (→ The Second Chamber 1530) or green (→ 1535 wrong: one hour lost; after the loop only blue remains in 1525 → 1530).
3. The Second Chamber (1530): press the triangle (→ 1545 gas trap: a toxoid scientist walks through straight to 1550; others lose an hour and retry with the pentagon in 1540 → 1550) or the pentagon (→ 1550).
4. The Third Chamber (1550): press four dots (→ 1560 flood: an aquatic scientist goes straight to 1565; others lose an hour — after two earlier mistakes this is 1505, trapped in time; otherwise retry with six dots in 1555 → 1565) or six dots (→ 1565).

## 分支与结局 Branches and outcomes

- 1565 时间水晶：遗珍“时间水晶”；剩余 3/2/1 小时分别给予大/中/小量星界丝缕；潜在灵能物种的科学家觉醒为灵能者。
- 1505 被困时光：三次都按错时，科学家困死在时间里，收回空探球；获得大量星界丝缕。
- 两者都结束探索。

- 1565 Time Crystal: the Time Crystal relic; 3/2/1 hours left give a large/medium/small astral thread reward; a scientist of a latent psionic species awakens as psionic.
- 1505 Trapped in Time: after three wrong presses the scientist is lost in time and the empty Sphere is retrieved; a large astral thread reward.
- Both end the exploration.

## 条件与文明差异 Conditions and variants

- 灵能或潜在灵能科学家（以及机械科学家）在 1510、1525、1540、1555、1565 看到不同叙述：他们凭直觉或灵能处理器选对按钮。
- 毒素类科学家免疫毒气陷阱，水生科学家免疫洪水陷阱（`astral_rifts_1_events.txt:2920–2930, 3179–3190`）。
- 1515、1520、1535、1545、1560 有格式塔版本文字；1510 的选项文字按普通/蜂巢/机械帝国变化。

- Psionic or latent-psionic scientists (and robotic ones) get different narration in 1510, 1525, 1540, 1555 and 1565: they pick the right buttons by intuition or psionic processors.
- A toxoid scientist is immune to the gas trap, an aquatic one to the flood (`astral_rifts_1_events.txt:2920–2930, 3179–3190`).
- 1515, 1520, 1535, 1545 and 1560 have gestalt texts; the option of 1510 varies for regular, hive and machine empires.

## 审阅记录 Review notes

- 已核对：裂隙定义与遗珍锁定；1500–1565 全部事件；`time_passed` 的设置（1510）与递增（1535、1545、1560），1560 的 `time_passed < 3` 分支，以及 1565 的奖励分档。没有 `on_roll_failed` 失败分支；编译结构正确（1560 的两个结果已标为条件分支），补充互斥组、结局、节点标签与谜题说明。

- Checked: rift definition and relic lock; every event 1500–1565; how `time_passed` is set (1510) and incremented (1535, 1545, 1560), the `time_passed < 3` branch of 1560 and the reward tiers of 1565. No `on_roll_failed` fallback; the compiled structure was correct (the two outcomes of 1560 already appear as a conditional branch); exclusive group, endings, node labels and a puzzle note added.
