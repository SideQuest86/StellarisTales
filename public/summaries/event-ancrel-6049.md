# 在殖民地发现化石 / Fossils Discovered on a Colony
- 分类 Category：先驱者与考古 Precursors · DLC：《远古遗物》Ancient Relics

## 如何开始 How it starts

殖民地满2、3、4、5年时的随机事件（on_colony_N_years_old，common/on_actions/00_on_actions.txt:3779/3824/3862/3885，权重各3）；ancrel.6049 要求拥有《远古遗物》，对玩家拥有的、非母星、非首都、有人口且无遗址的沙漠、热带、干旱、大陆、海洋、苔原、极地、高山或草原星球触发，全银河只有一次（全局标志 arc_hunting_grounds）。

A random colony event at 2, 3, 4 or 5 years of age (on_colony_N_years_old, common/on_actions/00_on_actions.txt:3779/3824/3862/3885, weight 3 each). ancrel.6049 needs Ancient Relics and fires for a player-owned, non-capital, populated, site-free desert, tropical, arid, continental, ocean, tundra, arctic, alpine or savannah planet; only once per galaxy (global flag arc_hunting_grounds).

## 剧情脉络 Story outline

选项“好奇”创建遗址 site_hunting_ground（五个阶段，每阶段小型文物，终章大型文物）：6050 更多遗骸（26个非本地的智慧物种化石）→ 6055 小屋（猎具）→ 6060 雷塔拉克斯领域（这里曾是战士阶级的猎场）→ 6065 女猎手（传奇战士）→ 6070 女猎手之刃（她的化石骨架与遗珍“古代之剑” r_ancient_sword，大型文物；演化猎手有额外选项）。

The option "Curious" creates the site site_hunting_ground (five stages, small artifacts each and a large one at the end): 6050 More Remains (fossils of 26 non-native sapient species) -> 6055 The Lodge (hunting gear) -> 6060 The Retarax Domain (a hunting reserve of the warrior class) -> 6065 The Huntress (a legendary warrior) -> 6070 The Blade of the Huntress (her fossilised skeleton and the relic r_ancient_sword, a large artifact; Evolutionary Predators have an extra answer).

## 分支与结局 Branches and outcomes

- 掷骰失败时使用通用事件池 all_random_events（见“考古遗址：发掘意外”）。 / Failed rolls use the generic pool all_random_events (see "Archaeological Sites: excavation incidents").

## 条件与文明差异 Conditions and variants

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/ancient_relics_arcsite_events_2.txt:407–620（ancrel.6049、6050–6070）；common/archaeological_site_types/02_ancient_relics_arc_sites.txt:109；common/on_actions/00_on_actions.txt:3779、3824、3862、3885
- 已核对：ancrel.6049、6050–6070 的脚本与遗址定义（权重0）；on_colony_N_years_old 的权重行；中英文正文已读。
- Checked: the scripts of ancrel.6049 and 6050-6070, the site definition (weight 0) and the weight lines of on_colony_N_years_old; both languages read.
