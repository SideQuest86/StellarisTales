# 指挥官失去特质 / Commander Loses Trait

- 分类 Category：文明纪事 Society (C7)

## 如何开始 How it starts

- 舰队被摧毁时（on_fleet_destroyed_perp，00_on_actions.txt:1701-1707）随机事件池：leader.1、5、6、7、8、9、17 各2/314；需为普通国家，被毁舰队有指挥官。
  The fleet-destroyed random pool (on_fleet_destroyed_perp, 00_on_actions.txt:1701-1707): leader.1, 5, 6, 7, 8, 9, 17 at 2/314 each; a normal country whose destroyed fleet had a commander.

## 剧情脉络 Story outline

- 指挥官失去「迟缓」（leader_trait_lethargic）特质；仅当他有此特质时出现。
  The commander loses the Lethargic trait; appears only when he has it.

## 分支与结局 Branches and outcomes

- 单个窗口，选项只带来效果，无后续事件。
  One window; the options only apply effects, no follow-up events.

## 条件与文明差异 Conditions and variants

- 除触发条件所列外无额外文明差异。
  No further empire variants beyond the trigger conditions listed.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/leader_events_1.txt:418-466
- 已核对：触发条件、选项效果；编译树与脚本一致。
  Checked: trigger conditions and option effects; the compiled tree matches the script.
