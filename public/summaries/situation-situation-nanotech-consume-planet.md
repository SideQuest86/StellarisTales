# 从[Target.GetName]采收纳米机器人 / Extract Nanites from [Target.GetName]

- 分类 Category：文明纪事 Society (C7) · 审阅 Reviewed 2026-10-13
- 来源 Sources：common/situations/08_machine_age_situations.txt:2001-2077

## 如何开始 How it starts

- 决议“纳米蜂群吞噬世界”（common/decisions/12_machine_age_decisions.txt:218）对目标行星开始该局势。
  The decision "Nanotech Swarm Consume World" (common/decisions/12_machine_age_decisions.txt:218) starts the situation on the target planet.

## 剧情脉络 Story outline

- 局势「提取纳米机器人」：单阶段（0–1000），进度每月由 terravore_progress 价值提供；默认取向“吞噬”，另一取向“克制”（付1000团结并中止局势）。每月隐藏事件 colony.195 添加障碍并给予奖励；完成时 colony.200 结束（行星被吃空）。
  The situation "Extract Nanites": one stage (0-1000), monthly progress from the terravore_progress value; the default approach is Devour, the other is Restraint (pay 1000 unity and abort). The monthly hidden event colony.195 adds blockers and rewards; on completion colony.200 ends it (the planet is consumed).

## 分支与结局 Branches and outcomes

- 完成（colony.200）或克制中止；故事无其他窗口。
  Ends by completion (colony.200) or by restraint; no other windows.

## 条件与文明差异 Conditions and variants

- 除触发条件所列外无额外文明差异。
  No further empire variants beyond the trigger conditions listed.

## 审阅记录 Review notes

- 已核对：触发条件、选项效果；编译树与脚本一致。
  Checked: trigger conditions and option effects; the compiled tree matches the script.
- 不确定：colony.195/200 的内容属于行星吞噬系列（colony_events_3），本审阅只核对局势定义与启动决议。
  Uncertain: colony.195/200 belong to the planet-devouring series (colony_events_3); only the situation definition and the starting decision were checked.
