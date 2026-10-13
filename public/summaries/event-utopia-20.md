# 环形世界施工意外 / Ring World construction incidents

- 分类 Category：银河轶事 C8 stories · 来源 Sources：events/megastructure_events_1.txt · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

隐藏事件 utopia.20（MTTH 3600 天，megastructure_events_1.txt:417-460）：本国有一个正在升级的环形世界（ring_world_2，剩余升级天数 > 200），且未发生过（event_utopia_20 标记）。
Hidden utopia.20 (MTTH 3600 days, lines 417-460): you own a Ring World at stage 2 that is still upgrading with more than 200 days left; once per country.

## 剧情脉络 Story outline

随机三选一（权重 30/30/30，机械帝国或机械物种使第三项为0）：
One of three at random (30/30/30; zero for the third if machine empire or mechanical species):
- utopia.21 加快施工：环形世界获得建造速度修正。 Build-speed boost.
- utopia.22 矿藏：选a停工20天并获得 500 矿物，或选b不理会。 Halt 20 days for 500 minerals (a), or ignore (b).
- utopia.27 失踪的工人：施工放慢30天；30天后 utopia.28；20天后 utopia.23 环形世界宠物；a 停工30天，30天后 utopia.26；b 30天后 utopia.25 并停工20天。
  Missing workers: slower build 30 days; 28 after 30 days; 23 after 20 more; (a) halts 30 days then 26; (b) 25 after 30 days with a 20-day halt.

## 分支与结局 Branches and outcomes

- 三个入口互斥（random_list）。 The three entries are exclusive.
- 27 之后的链条无随机，只有 23 的选项分叉 26 / 25。 After 27 there is no more randomness; only 23's options fork 26 / 25.

## 条件与文明差异 Conditions and variants

- 机械帝国/机械物种不会遇到 27。 Machine empires / mechanical species never get 27.

## 审阅记录 Review notes

- 已核对 Checked：utopia.20-28 的触发、random_list 权重及延迟（lines 417-640）。编译树正确。
  Compiled tree and weights verified.
- 本故事发生在“环形世界”（见该故事）建造期间，但由独立的隐藏事件触发，不是建造阶段事件的后续。
  It happens during Ring World construction (see 'Ring World') but is triggered by its own hidden event, not by a stage event.
