# 小行星来袭 / Asteroid Sighted

- 分类 Category：文明纪事 Society (C7)

## 如何开始 How it starts

- 殖民地2岁（6/958）或3岁（6/739）时的随机事件；全局一次（asteroid_sighted_global），每个帝国一次；非AI、非首都，排除栖息地、环世界、方舟；非荒野帝国。
  Random colony event at age 2 (6/958) or 3 (6/739); once per game and per empire; non-AI, non-capital; excludes habitats, rings, arks and wilderness empires.

## 剧情脉络 Story outline

- 180「小行星来袭」：创建一支“小行星”舰队，在殖民地75单位外出现并驶向殖民地；开启事件链（机械帝国有另一版本选项）。
  180 "Asteroid Sighted": spawns an asteroid fleet 75 units away that moves to the colony, and starts the event chain (machine empires have a variant option).
- 玩家若在其到达前击毁舰队 → 182「小行星已被摧毁」（链结束）。
  If the player destroys the fleet before arrival -> 182 "Asteroid Destroyed" (chain ends).
- 舰队到达 → 183「小行星撞击」：形成陨石坑，按人口规模（≤200 / ≤600 / >600）杀死1/2/4个人口群，随后隐藏事件184清理舰队。
  Fleet arrives -> 183 "Asteroid Impacts": a crater is left and 1/2/4 pop groups are killed by population (<=200 / <=600 / >600); hidden event 184 then cleans up.

## 分支与结局 Branches and outcomes

- 182 与 183 互斥。
  182 and 183 are exclusive.

## 条件与文明差异 Conditions and variants

- 机械帝国看到不同措辞。
  Machine empires see different wording.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：`events/colony_events_1.txt:4231-4520`；`common/on_actions/00_on_actions.txt:1619,3759,3811`
- 已核对：触发、舰队创建与到达效果、on_action 对 181 的调用、182/183 的结果。
  Checked: trigger, fleet creation and arrival effect, the on_action call to 181, results of 182/183.
- 更正：181（隐藏）并入，182 作为击毁结局接在180之后。
  Correction: 181 (hidden) merged; 182 now follows 180 as the destroyed ending.
