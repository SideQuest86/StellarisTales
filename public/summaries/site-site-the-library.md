# 图书馆 / The Library

- 分类 Category：先驱者与考古 Precursors · DLC：《远古遗物》Ancient Relics；有《利维坦》时权重×2 (x2 with Leviathans)

## 如何开始 How it starts

勘察天体时，隐藏事件 ancrel.9999（on_survey_planet）以 5/405 的机会生成一个随机考古遗址（AI帝国或5年内刚发现过遗址者机会×0.2），再按各遗址的权重抽取；本遗址要求拥有《远古遗物》，权重20，出现在贫瘠或寒冷贫瘠星球（没有“地形改造候选”修正）上。拥有《利维坦》时权重×2。遗址创建时清除星球资源点并加上“远古玻璃化星球”修正。

When a body is surveyed, hidden ancrel.9999 (on_survey_planet) has a 5/405 chance to create a random dig site (×0.2 for AI empires or if a site was found in the last 5 years), then picks a site type by weight; this site needs Ancient Relics and has weight 20 on barren or cold barren planets without the terraforming_candidate modifier. With Leviathans the weight is doubled. On creation the planet's deposits are cleared and the modifier ancient_glassed_planet is added.

## 剧情脉络 Story outline

玻璃化的荒星地下藏着一个高科技的地下社会遗迹：伊拉尼基金会为追求永生而制造出吞噬一切有机物的微生物灾难。

1. 被遗忘已久的废墟：星球曾人口稠密，但有用的遗迹极少
2. 图书馆：洞穴里保存完好的地下社会和加密数据水晶“图书馆”
3. 暗影中潜伏：一名团队成员失踪，遗骸腐烂得异常之快
4. 乐园的烦恼：伊拉尼基金会因囤积知识而人口骤降，试图用技术追求永生
5. 文明的终结：永生实验造出吞噬有机物的微生物群，幸存者分裂为两支（三种处置：当作武器、演化猎手专属回应、隔离研究）

Beneath a glassed barren world lie the ruins of the Ilanii Foundation, whose attempt at immortality produced a microorganism swarm that devours organic matter.

1. Ruins Long Forgotten: densely populated once, almost nothing useful left
2. The Library: a preserved underground society and a "library" of encrypted data crystals
3. Lurking in the Shadows: a team member vanishes; the remains decayed unnaturally fast
4. Troubles in Paradise: the Ilanii hoarded knowledge, their numbers fell, and they sought a technological immortality
5. Civilization's End: the immortality attempt made an all-devouring swarm; the survivors split in two (three answers: weaponise it, an Evolutionary Predator answer, or quarantine it)

## 分支与结局 Branches and outcomes

- 终章 12040 的选项：A 当作武器（获得“杀手图书管理员生物”修正；和平主义者不可选）、c.evopred（演化猎手，同样的修正并推进捕食者线）、B 隔离研究（社会学研究，并给星球加三个高级资源点）；三者都有大型文物。 / Options of the finale 12040: A weaponise it (modifier killer_librarian_organism; pacifists cannot), c.evopred (Evolutionary Predators: same modifier and predator progress), B quarantine (society research and three top-tier deposits on the planet); all give a large artifact.
- 若拥有《利维坦》、策展人飞地存在且尚未与其通讯，终章之后会开启事件链“遗族的遗族”（find_the_curators）并标出策展人所在星系；该事件链的后续不在本故事内。 / With Leviathans, an existing Curator enclave and no contact yet, the finale starts the event chain "Remnant of a Remnant" (find_the_curators) and marks the Curator system; that chain's follow-up is outside this story.

## 条件与文明差异 Conditions and variants

- 掷骰失败时使用通用事件池 all_random_events（见“考古遗址：发掘意外”）。 / Failed rolls use the generic pool all_random_events (see "Archaeological Sites: excavation incidents").

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：common/archaeological_site_types/02_ancient_relics_arc_sites.txt:2266；events/ancient_relics_arcsite_events_2.txt:8260
- 已核对：遗址定义（common/archaeological_site_types/02_ancient_relics_arc_sites.txt:2266）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/02_ancient_relics_arc_sites.txt:2266) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
