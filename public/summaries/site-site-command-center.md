# 小行星防爆门 / Asteroid Blast Door

- 分类 Category：先驱者与考古 Precursors · 来源 Sources：common/archaeological_site_types/02_ancient_relics_arc_sites.txt:53；events/ancient_relics_arcsite_events_2.txt:279 · DLC：《远古遗物》Ancient Relics · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

勘察天体时，隐藏事件 ancrel.9999（on_survey_planet）以 5/405 的机会生成一个随机考古遗址（AI帝国或5年内刚发现过遗址者机会×0.2），再按各遗址的权重抽取；本遗址要求拥有《远古遗物》，权重100，出现在小行星（pc_asteroid）上。需要科学家领袖。

When a body is surveyed, hidden ancrel.9999 (on_survey_planet) has a 5/405 chance to create a random dig site (×0.2 for AI empires or if a site was found in the last 5 years), then picks a site type by weight; this site needs Ancient Relics and has weight 100 on asteroids (pc_asteroid). It needs a scientist leader.

## 剧情脉络 Story outline

一次小天体撞击露出了小行星表面的防爆门，考察队从另一侧挖入，发现这里曾是一个星际帝国的隐秘首都。

1. 钻出一个洞：从小行星另一侧钻孔，绕开打不开的防爆门
2. 入口：钻透外墙后进入遍布死者遗骸的指挥掩体
3. 指挥中心：这里曾是一个统治该星区的帝国的秘密首都，只靠加密跨空间通讯与一艘补给货船联系外界
4. 最后时日：补给船因推进器故障撞上小行星，毁掉发射机，居民困死；帝国随首都失联而崩溃（探测干扰科技选项25%、工程学研究、巨型文物）

A small impact exposes a blast door on an asteroid; the team digs in from the far side and finds the hidden capital of an interstellar empire.

1. Drilling a Hole: drilling in from the other side because the blast door cannot be opened
2. Entrance: a hole through the walls reveals a bunker full of the dead
3. Command Center: the hidden capital of a harsh empire, linked to the world only by encrypted subspace links and one resupply freighter
4. The Final Days: the freighter crashed and the transmitter died; the inhabitants starved or took their lives and the empire fell (detection-scrambler tech option 25%, engineering research, great artifact)

## 分支与结局 Branches and outcomes


## 条件与文明差异 Conditions and variants

- 无特殊的文明差异。 / No empire-specific variants beyond the reward wording.
- 掷骰失败时使用通用事件池 all_random_events（见“考古遗址：发掘意外”）。 / Failed rolls use the generic pool all_random_events (see "Archaeological Sites: excavation incidents").

## 审阅记录 Review notes

- 已核对：遗址定义（common/archaeological_site_types/02_ancient_relics_arc_sites.txt:53）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/02_ancient_relics_arc_sites.txt:53) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
