# 最后思绪 / The Last Thought

- 分类 Category：先驱者与考古 Precursors · DLC：《生物起源》Biogenesis（脚本文件 13_biogenesis_arc_sites） Biogenesis

## 如何开始 How it starts

遗址权重为0，由堕落蜂巢初始化器 fallen_hive_last_thought 创建（common/solar_system_initializers/fallen_empire_initializers.txt:3903）；全银河最多一处。

Weight 0: created by the system initializer fallen_hive_last_thought (common/solar_system_initializers/fallen_empire_initializers.txt:3903); at most one per galaxy.

## 剧情脉络 Story outline

一颗让研究者无法靠近的星球，核心里躺着一只死胎生物和它的生物计算机；与突触接口后得知：蜂群在一场必败的战争中把全部心智灌进尚未出生的宿主，最终陷入无尽的循环。

1. 死胎：深入由半化石生物物质构成的地层，核心空洞里的“死胎”；研究者集体崩溃（野性洞察+1000、小型文物）
2. 突触：死胎颅内的突触簇仍在脉动（野性洞察+1000）
3. 豪赌：十万年前蜂群面对无法战胜的敌人，铤而走险（野性洞察+1000、中型文物）
4. 支离破碎：蜂群把全部心智倾入未出生的宿主，突触过载致其死亡并困于回路（野性洞察+3000、大型文物）

A world that repels its researchers; at its hollow core lies a stillborn creature with biocomputers. Interfacing shows the Hive poured its whole psyche into an unborn host in a lost war and was trapped in a loop.

1. The Stillborn: layers of semi-fossilised biomass, the stillborn in the hollow core; researchers collapse (feral insight +1000, small artifact)
2. The Synapses: synaptic clusters in the skull still pulsing (feral insight +1000)
3. The Gambit: a hundred thousand years ago the Hive faced an unbeatable foe and gambled (feral insight +1000, medium artifact)
4. The Shattering: the Hive poured its psyche into the unborn host; the overload killed it and trapped the Hive in a loop (feral insight +3000, large artifact)

## 分支与结局 Branches and outcomes

## 条件与文明差异 Conditions and variants

- 本遗址的 on_roll_failed 把事件池参数设为 no_events（不存在同名事件池），所以掷骰失败不会触发随机意外。 / The site passes RANDOM_EVENTS = no_events to its roll-failure effect (no pool of that name exists), so a failed roll triggers no incident.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：common/archaeological_site_types/13_biogenesis_arc_sites.txt:2；events/biogenesis_events.txt:9681；common/solar_system_initializers/fallen_empire_initializers.txt:3903
- 已核对：遗址定义（common/archaeological_site_types/13_biogenesis_arc_sites.txt:2）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/13_biogenesis_arc_sites.txt:2) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
