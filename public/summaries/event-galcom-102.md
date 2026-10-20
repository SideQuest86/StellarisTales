# 缇扬奇进入我方领土 / Tiyanki In Our Territory
- 分类 Category：文明纪事 Society (C7)

## 如何开始 How it starts

- 决议“蒂亚尼基害虫防治”（resolution_tiyanki_pest_control）生效后，社群成员境内出现蒂亚尼基即违规：玩家可经三种途径收到通知——蒂亚尼基舰队进入系统（on_entering_system_fleet → galcom.102 → 106）、决议刚通过时已有（resolution effect → 103 → 104）、每月检查（on_monthly_pulse → galcom.108 → 109）。
  Once the resolution "Tiyanki Pest Control" is active, Tiyanki inside a member's borders is a breach, and the player is told in one of three ways: a Tiyanki fleet enters a system (on_entering_system_fleet -> galcom.102 -> 106), Tiyanki are already inside when the resolution passes (resolution effect -> 103 -> 104), or the monthly check (on_monthly_pulse -> galcom.108 -> 109).

## 剧情脉络 Story outline

- 三个窗口文字相似，选项按伦理分三种（中立 / 亲外 / 排外），都只确认情况。
  The three windows read alike and offer three ethic-based options (neutral / xenophile / xenophobe) that only acknowledge the situation.
- 每月清理事件 galcom.105 在蒂亚尼基离开后清除违规标志。
  The monthly clean-up event galcom.105 clears the breach flag once the Tiyanki leave.
- 另有 galcom.107 / 110（杀死蒂亚尼基违反法案：扣能量1000/5000）属于同一决议的惩罚线，未单列为故事。
  Galcom.107 / 110 (killing Tiyanki in violation: -1000 / -5000 energy) belong to the same resolutions' penalty line and are not separate stories.

## 分支与结局 Branches and outcomes

- 三种触发并行，视情形而定。
  The three triggers are parallel, by circumstance.

## 条件与文明差异 Conditions and variants

- 选项按伦理而异。
  Options vary by ethics.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：`events/galactic_community_events.txt:847-1159`；`common/resolutions/00_resolutions.txt:12809`；`common/on_actions/00_on_actions.txt:115-116,1034`
- 已核对：三条触发路径与清理事件。
  Checked: the three trigger paths and the clean-up event.
- 更正：103 和 108 原为各自孤立的故事，现并入。
  Correction: 103 and 108 were isolated stories; merged.
