# 聚集风暴 / Gather the Storm

- 分类 Category：文明纪事 Society (C7)

## 如何开始 How it starts

- 舰队命令“启动宇宙风暴”（initiate_cosmic_storm_order）在宇宙风暴所在目标上由研究船执行时启动局势；船队失去命令或目标消失则中止。
  The situation starts when a research ship carries out the order initiate_cosmic_storm_order at a cosmic-storm target; it aborts if the fleet loses the order or the target disappears.

## 剧情脉络 Story outline

- 阶段一（0–50）：启动事件 cstorms.2000「风暴筹备」，选项决定路线——增压（supercharge）或过量供给（overfeed，需若干科技）。
  Stage 1 (0-50): the start event cstorms.2000 "Storm Preparation" picks the route, supercharge or overfeed (needing certain technologies).
- 阶段二（50–100）：进入阶段时增压路线触发 cstorms.2010「风暴校准」（再选 辐射 / 切断 / 磁化，各需科技），过量供给路线触发 cstorms.2015（再选 搅动 / 失稳 / 扰乱）。
  Stage 2 (50-100): entering it fires cstorms.2010 "Storm Calibration" on the supercharge route (then irradiate / sever / magnetize, each with tech requirements) or cstorms.2015 on the overfeed route (then agitate / destabilize / scramble).
- 进度满：局势锁定，按所选取向触发六个“释放风暴”之一：2020 辐射、2025 切断、2030 磁化、2035 搅动、2040 失稳、2045 扰乱。
  On completion the situation locks and fires the matching "Unleash the Storm": 2020 irradiate, 2025 sever, 2030 magnetize, 2035 agitate, 2040 destabilize, 2045 scramble.

## 分支与结局 Branches and outcomes

- 六种终结互斥，由前两次选择决定（两条路线各三种）。
  The six finishers are exclusive, decided by the two earlier choices (three per route).

## 条件与文明差异 Conditions and variants

- 增压路线每月消耗200能量；各取向有科技门槛。
  The supercharge route costs 200 energy upkeep; each approach has technology gates.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：`common/situations/07_cosmic_storms_situations.txt:5-400`；`events/cosmic_storms_situation_events.txt:6-443`
- 已核对：取向的潜在条件（potential）与标志、完成时的 if/else 链、中止条件。
  Checked: the approach potentials and flags, the completion if/else chain, the abort condition.
