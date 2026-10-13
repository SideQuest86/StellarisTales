# 神秘迷宫 / The Mysterious Labyrinth

- 分类 Category：文明纪事 Society (C7) · 审阅 Reviewed 2026-10-13（r2-society）
- 来源 Sources：`events/situation_events.txt:8-393`；`common/situations/01_narrative_situations.txt:149-347`；`common/on_actions/00_on_actions.txt`（on_colony_4/5_years_old 随机殖民地事件池）

## 如何开始 How it starts

- 殖民地满 4 年或 5 年时的随机殖民地事件（权重 3/189、3/194）；限非 AI 帝国、非首都、非人造的殖民地；每局一次。
  A random colony event when a colony turns 4 or 5 (weights 3/189, 3/194); non-AI empires, non-capital, non-artificial colonies; once per game.
- 5「神秘迷宫」：殖民者在偏远山区发现一座来历不明的迷宫。立即开启局势；选择“派一支队伍前去调查”（方式“探索其内部”）或“我们没有时间”（方式“从远处监测”）。同时设置 21 个月的计时标记。
  5 "The Mysterious Labyrinth": colonists find an alien labyrinth in a remote mountain range. The situation starts at once; choose "Send a team to investigate" (approach "Explore its Interior") or "We don't have time for this" (approach "Monitor it from Afar"). A 21-month timer flag is also set.

## 剧情脉络 Story outline

这是一个双向局势：进度从 50% 开始，向上或向下移动，方式可随时更改。
A bidirectional situation: progress starts at 50% and moves up or down; the approach can be changed at any time.

- **向上（探索其内部，每月 +2.5）Upward (exploring, +2.5/month)**：60% 时 40「探险队报告」，80% 时 45「持续的困惑」（之后研究需额外凝聚力），100% 时结局。
  At 60% 40 "Expedition Report", at 80% 45 "Continued Perplexity" (studying then costs extra unity), at 100% an ending.
- **向下（监测/隔离 -2.5，摧毁 -5）Downward (monitor/quarantine -2.5, destroy -5)**：40% 时 10「惊奇的活动」——迷宫想吸引注意，“从远处监测”从此不再可选，重新选择隔离、探索或摧毁；20% 时 15「吸引关注」（若方式为摧毁则改为 25），0% 时结局。
  At 40% 10 "Surprising Movements" — the labyrinth seeks attention, "Monitor it from Afar" is no longer offered, choose quarantine, explore or destroy; at 20% 15 "Attention Seeking" (or 25 if destroying), at 0% an ending.
- 每个阶段事件只在首次进入该阶段时出现；来回切换方式时，两侧的事件都可能看到。
  Each stage event appears only the first time its stage is entered; switching back and forth can show events from both sides.

## 分支与结局 Branches and outcomes

五种结局互斥 / Five mutually exclusive endings:

- 100%：发现后 21 个月内达成 → 50% 50「消失」/ 50% 55「轰轰烈烈的退场」；之后达成 → 必为 50。两者都留下时空异常矿藏，55 另添火山、废墟与深坑障碍。
  100%: within 21 months of discovery → 50% "A Departure" / 50% "A Turbulent Departure" (55); later → always 50. Both leave a space-time anomaly deposit; 55 also adds volcano, ruin and sinkhole blockers.
- 0%：摧毁方式 → 25「迷宫被毁」（暗物质与稀有资源）；21 个月内 → 20「禁欲的奖励」（时空异常矿藏）；之后 → 50% 20 / 50% 30「迷宫消失」（凝聚力）。
  0%: destroying → 25 "Labyrinth Destroyed" (dark matter and rare resources); within 21 months → 20 "A Reward for Obstinance" (space-time anomaly deposit); later → 50% 20 / 50% 30 "Labyrinth Disappeared" (unity).
- 若方式为摧毁，在 20% 进入最低阶段时就会触发 25 并结束。
  With the destroy approach, 25 already fires on entering the lowest stage at 20% and ends it.

## 条件与文明差异 Conditions and variants

- 10 有普通与格式塔两种正文；15 有普通、机械、蜂巢与人类（预设人类帝国等）四种；45 有普通、蜂巢、机械三种。
  10 has regular and gestalt texts; 15 has regular, machine, hive and human variants; 45 has regular, hive and machine variants.

## 审阅记录 Review notes

- 已核对：事件 5–55 与局势定义（初始值、双向、阶段定义顺序 stage_3/2/1/2_alt/3_alt、各方式进度、on_fail 与 on_progress_complete 分支、21 个月计时）。
  Checked: events 5–55 and the situation definition (initial value, bidirectional, stage order stage_3/2/1/2_alt/3_alt, progress per approach, on_fail and on_progress_complete branches, the 21-month timer).
- 更正 Corrections：草稿按阶段定义顺序把 25→15→10→40→45 串成一条线，并把五个结局都挂在局势卡下。现以审阅连接表达两个方向（局势→40→45→50/55；局势→10→15→20/30；局势→25）。
  The draft chained 25→15→10→40→45 in definition order and hung all five endings under the situation card. Reviewed links now express both directions (situation→40→45→50/55; situation→10→15→20/30; situation→25).
- **复核 Re-check (2026-10-13)**：已用 `noStageSequence` 关闭按定义顺序的阶段串联；树中不再有 25→15、15→10 的假连接，所有阶段连接均为已审阅的桥接。
  Re-check: stage chaining is switched off with `noStageSequence`; no false 25→15 / 15→10 / 10→40 links remain, every stage link is a reviewed bridge.
