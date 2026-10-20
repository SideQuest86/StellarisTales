# 蹀血星球 / The World is Bleeding

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany · DLC: BioGenesis

## 如何开始 How it starts

殖民地满3年时（on_colony_3_years_old，common/on_actions/00_on_actions.txt:3838）随机事件池以20/739抽中隐藏门卫 strange_worlds.1。触发前提：BioGenesis DLC，人类玩家的非首都、非母星、仍由原建立者持有的人造以外殖民星球，没有地面战斗，也未被占领；并且该殖民地尚未触发过其他“奇异世界”事件（colony_event 旗标），每个国家每条故事只触发一次。

A colony turning 3 years old (on_colony_3_years_old, common/on_actions/00_on_actions.txt:3838) can draw the gatekeeper strange_worlds.1 from the random pool (20/739). Preconditions: BioGenesis DLC, a human player's non-capital, non-homeworld, original-owner, non-artificial colony without ground combat or occupation, which has not yet had another Strange Worlds event (colony_event flag); once per country per chain.

## 剧情脉络 Story outline

strange_worlds.1“世界在流血”给工程研究，180天后 strange_worlds.5“大出血”：a“治疗并研究患者”——90天后 strange_worlds.20“寄生虫”，再90天后 strange_worlds.25“互利关系”（星球转为 pm_parasitic_production，工程研究；演化捕食者另得DNA进度）；b“继续建造”——每360天由隐藏事件 strange_worlds.10 检查区划与建筑是否增加，增加后 strange_worlds.15“血山”（pm_hemosymbiosis，凝固地貌障碍）。

strange_worlds.1 "The World is Bleeding" gives engineering research; 180 days later strange_worlds.5 "Major Hemorrhaging": a "Treat and study the afflicted" - 90 days later strange_worlds.20 "Parasite", 90 days after that strange_worlds.25 "Productive Relationship" (pm_parasitic_production, engineering research; Evolutionary Predators also DNA progress); b "Keep building" - hidden strange_worlds.10 re-checks every 360 days whether districts and buildings increased, then strange_worlds.15 "Mountain of Blood" (pm_hemosymbiosis, coagulated-landscape blocker).

## 分支与结局 Branches and outcomes

a 与 b 互斥：a 线是治疗与研究（20→25），b 线是继续建造（10→15）。

a and b are exclusive: a is the treatment and research line (20 -> 25), b the keep-building line (10 -> 15).

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/strange_worlds_events.txt:7-250; common/on_actions/00_on_actions.txt:3838 on_colony_3_years_old (random 20/739)
- 已核对入口、触发、选项与结果。
  Checked the entry, trigger, options and outcomes.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
