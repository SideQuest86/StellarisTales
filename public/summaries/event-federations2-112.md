# 已成功消灭目标 / Target Successfully Eliminated
- 分类 Category：文明纪事 Society (C7) · 联邦（军事型）事件 federation (military) event
- 来源 Sources：`events/federations_events_2.txt:3258-3296` · `common/on_actions/00_on_actions.txt:1666`
- 审阅 Reviewed：2026-10-13（c7b-society）

## 如何开始 How it starts

军事联邦联合演习期间，一支舰队击毁了带有 militarist_federation_training_target 标志的训练目标时，on_fleet_destroyed_perp（`00_on_actions.txt:1666`）触发 federations2.112；前提是本国尚未被标记为演习失败（militarist_joint_operation_fail）。/ During the military exercises, destroying a training target fires federations2.112 via on_fleet_destroyed_perp, unless the country is already marked as failed.

## 剧情脉络 Story outline

**目标成功消灭（112）**：给本方打上 360 天的 militarist_joint_operation_succeed 标志，并让联邦的成功计数 +1（决定 115 的结论）。/ Marks our country as succeeded for 360 days and adds 1 to the federation’s success count (which selects the 115 outcome).

## 分支与结局 Branches and outcomes

单事件。/ A single event.

## 条件与文明差异 Conditions and variants

无。/ None.

## 审阅记录 Review notes

- 已核对 Checked：112 的触发条件与效果。/ Trigger and effect.
- 审阅改动 Changes：无结构改动；说明它是 federations2.100 篇的一部分。/ No structural change; it belongs to the federations2.100 exercise.
