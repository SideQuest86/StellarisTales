# 窃取科技 / Steal Technology

- 分类 Category：银河轶事 C8 stories · 来源 Sources：events/nemesis_operations_events_1.txt, common/espionage_operation_types/operations.txt · DLC：Nemesis · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

玩家发起间谍行动“窃取科技”（common/espionage_operation_types/operations.txt:514-580）：3个阶段，目标不得因“谜之工程”而不可窃取、短期内不可重复。
The operation Steal Technology has three stages.

## 剧情脉络 Story outline

1. operation.1020 “搜集领袖/线索”：潜入科学会议。 Infiltrating a scientific conference.
2. operation.1021 “寻找线索”：锁定一个有研究权限的目标。 A target is chosen.
3. operation.1022 “获取条目”：选项“开始行动！”→ 隐藏事件 1025 → operation.1026 “研究已获取”：a 干净利落撤出 / 撤出尽可能多的特工（messy）/ b 破坏对方残余研究（目标国收到 operation.1030 “研究遭破坏”，研究减速一年）/ c 获得其未来研究的后门 / d 抓住机会多拿一项科技。
   Launch -> 1026 with five finale options; the sabotage option makes the target see 1030.
- operation.1027 “谜一样的科技”：对方科技已超越我们的理解（谜之工程），行动作废。 1027: the target's technology is beyond us (Enigmatic Engineering).

## 分支与结局 Branches and outcomes

- 1026 的选项互斥（messy 与 smooth 的两种版本按检定结果出现）。 1026 options are exclusive; smooth/messy variants depend on the outcome.

## 条件与文明差异 Conditions and variants

- 目标国拥有“谜之工程”时失败并设 cannot_steal_enigmatic_tech 标记。 Enigmatic Engineering blocks the operation.

## 审阅记录 Review notes

- 已核对 Checked：操作类型、operation.1020-1030。
