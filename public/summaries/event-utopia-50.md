# 青春之泉 / 科学枢纽后续事件 / Fountain of Youth (Science Nexus follow-ups)

- 分类 Category：银河轶事 C8 stories

## 如何开始 How it starts

隐藏事件 utopia.50 挂在 on_decade_pulse（00_on_actions.txt:296）：随机挑选一个拥有已完工科学枢纽（think_tank_3 或修复版）、未标记 think_tank_event、非意识集合体、非机械物种的国家（lines 1356-1446）。
Hidden utopia.50 runs each decade pulse: it picks one country with a completed (or restored) Science Nexus, not flagged think_tank_event, not gestalt consciousness, not mechanical species.

## 剧情脉络 Story outline

随机（90 无事 / 30 青春之泉 / 30 被绑架的科学家 / 30 神经库），事件 60–120 天后到达：
Random (90 nothing / 30 / 30 / 30), the event arrives 60-120 days later:
- 青春之泉 utopia.51：选 a（付 1000 能量）→54→（a→58；b 付 500 →55）；55 a→56（奖励）或 b→57（能量修正，邻国收到失踪人口链 utopia.100）；51 的 b/c →59（有科学家，可牺牲科学家把科学枢纽升级为 think_tank_4）或 60（无科学家）。
  Fountain of Youth chain with the energy cost options; 55.b also sends the target empire utopia.100, whose projects lead 101, 102 -> project -> 103 -> project -> 104 -> 105 -> 106/107/108.
- 被绑架的科学家 utopia.62：科学家官员获得经验与特质，360 天后 utopia.63 带着“来自彼方的飞船”回归。 Abducted scientist returns 360 days later in a ship (63).
- 神经库 utopia.64：志愿科学家被牺牲并升级科学枢纽。 Neural Bank: a volunteer scientist is sacrificed for a Nexus upgrade.

## 分支与结局 Branches and outcomes

- 三种后续互斥（同一个 random_list）。 The three follow-ups are exclusive (one random_list).
- 青春之泉的后半（100 起）发生在另一个国家，属于被偷腺体的一方：100 → 项目 → 101；100 的立即效果 200 天后触发 102 → 项目 → 103 → 项目 → 104 → 105 的三个选项。
  The second half (100 onward) happens to the other, victim empire.

## 条件与文明差异 Conditions and variants

- 51 本身另需存在一个有通讯、物种非机械的候选邻国，且全局未发生过（utopia_51 标记，仅 a 选项设置，line 1528）。
  utopia.51 additionally needs a suitable target empire; global flag utopia_51 is set only by option a.
- 62 的权重在存在科学家议员时为0（lines 1414-1425），而 62 自身触发又要求这样的议员——脚本自相矛盾，实际几乎不会发生。
  Weight of 62 is 0 whenever a councilor scientist exists, but 62's own trigger requires one: the script contradicts itself, so it practically never fires (unless the state changes during the 60–120 day delay). Commentary.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/megastructure_events_1.txt, common/on_actions/00_on_actions.txt
- 已核对 Checked：utopia.50-64、100-108 的触发、选项、权重与延迟；on_decade_pulse 调用。编译树正确，其中 59/60 与 62 的权重标注已核对。
  Weights and options verified; the compiled tree is right.
- 不确定 Uncertain：utopia.62 的实际可达性（见上）。 Practical reachability of utopia.62 (see above).
