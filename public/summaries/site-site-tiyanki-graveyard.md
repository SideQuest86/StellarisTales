# 缇扬奇乱坟岗 / Tiyanki Grave Mound

- 分类 Category：先驱者与考古 Precursors · 来源 Sources：common/archaeological_site_types/00_base_game_arc_sites.txt:304；events/ancient_relics_arcsite_events_2.txt:9924；common/solar_system_initializers/hostile_system_initializers.txt:3381 · DLC：基础游戏遗址定义；事件在 ancrel 文件 Base-game site definition; events in the ancrel files · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

遗址权重为0，由敌对星系初始化器 hostile_init_21 在“缇扬奇坟场星系”生成时创建（common/solar_system_initializers/hostile_system_initializers.txt:3381），全银河最多一处。

Weight 0: created by the hostile system initializer hostile_init_21 together with the Tiyanki graveyard system (common/solar_system_initializers/hostile_system_initializers.txt:3381); at most one per galaxy.

## 剧情脉络 Story outline

一颗完全由缇扬奇尸体堆成的“星球”；考古一路深入肉质迷宫，最后在核心处遇到“主脑”。核心是否保持完好是一次加权随机（5比2，排外、尚武或好战灭绝者的帝国把“被毁”的权重×2）。

1. 肉之球：地层全是生物组织，估计需要两百多万头缇扬奇
2. 死亡三步：尸体靠再生能力仍在蠕动，像由同一意志操纵
3. 尸山血河迷宫：地下是由压缩的缇扬奇组织构成的迷宫
4. 隧道魅影：隧道的结构与缇扬奇血管系统一致，只是放大到行星尺度

A "planet" built entirely of dead Tiyanki; the dig follows a flesh labyrinth to a command creature at the core. Whether the core survives is a weighted random draw (5 vs 2; owners that are militarist, homicidal or xenophobe double the weight of "destroyed").

1. Meatball: strata of tissue — millions of Tiyanki bodies
2. Three Parts Dead: the dead still writhe through regeneration, as if under one will
3. Flesh Labyrinth: a labyrinth of compressed Tiyanki tissue
4. Haunted Tunnels: the tunnels match a Tiyanki vascular system at planetary scale

## 分支与结局 Branches and outcomes

- 主脑 / Mother Brain：主脑完好：可解剖取得5000能量、保持观察、供奉、卖给馆长或研究再生（部分选项取决于帝国） / the core is intact: dissect it (5000 energy), watch it grow, leave it sacred, sell it to the Curators or study its regeneration (options depend on the empire)
- 主脑 / Mother Brain：主脑已被我们的采矿设备摧毁，整个坟场将再死一次（只有研究奖励） / the core was destroyed by our own mining equipment; the mound will die a second time (research reward only)
- 掷骰失败时从专属池抽取：争论的考古学家8055、装备故障8070、无影无踪8075、环境污染14910（各权重10）；14910 让科学家被墙体吞没并获得“偏执”特质，是本遗址的专属失败事件。 / Failed rolls draw from the site pool: bickering archaeologists 8055, equipment malfunction 8070, without a trace 8075, environmental contamination 14910 (weight 10 each); 14910 (the scientist half-fused into a wall, trait Paranoid) is this site's own failure event.

## 条件与文明差异 Conditions and variants

- 14510 的五个选项按文明类型显示；14910 对演化猎手有额外回应。 / 14510 shows its five options by empire type; 14910 has an extra answer for Evolutionary Predators.
- 掷骰失败时使用本遗址专属的事件池 tiyanki_graveyard_random_events。 / Failed rolls draw from this site's own pool tiyanki_graveyard_random_events.

## 审阅记录 Review notes

- 已核对：遗址定义（common/archaeological_site_types/00_base_game_arc_sites.txt:304）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/00_base_game_arc_sites.txt:304) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
- 结构修正：最后一个阶段事件 ancrel.14500 是隐藏的随机分派，草稿把它的几个互斥结局错排成连续阶段；现改为最后可见阶段之后的互斥分支。
- Structural fix: the last stage event ancrel.14500 is a hidden random dispatcher; the draft chained its exclusive endings as consecutive stages. They are now exclusive branches after the last visible stage.
