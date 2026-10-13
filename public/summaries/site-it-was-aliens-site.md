# 废墟 / Ruins

- 分类 Category：先驱者与考古 Precursors · 来源 Sources：common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1619；events/ancient_relics_arcsite_events_1.txt:796 · DLC：《远古遗物》Ancient Relics · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

勘察天体时，隐藏事件 ancrel.9999（on_survey_planet）以 5/405 的机会生成一个随机考古遗址（AI帝国或5年内刚发现过遗址者机会×0.2），再按各遗址的权重抽取；本遗址要求拥有《远古遗物》，权重60，出现在可居住星球上。全银河最多一处。

When a body is surveyed, hidden ancrel.9999 (on_survey_planet) has a 5/405 chance to create a random dig site (×0.2 for AI empires or if a site was found in the last 5 years), then picks a site type by weight; this site needs Ancient Relics and has weight 60 on habitable planets. At most one per galaxy.

## 剧情脉络 Story outline

一颗被地下核爆毁灭的星球：其居民痴迷于外星人监视，把越来越多资源投入防御，最终启动“终极护盾”——对自己的星球进行核毁灭，免得被外星人夺取。

1. 穿墟而行：对不明飞行物的狂热和庞大的反外星防御
2. 发现记录：经济崩溃，提到“终极护盾”
3. 揭示命运：被保存的军事数据库揭示：护盾就是对本星球的彻底核打击（反点防科技选项25%、社会学研究、中型文物）

A world destroyed by underground nuclear blasts: its people were obsessed with alien observers, poured resources into defences, and finally triggered an "ultimate shield" — nuking themselves so no invader could take the planet.

1. Sifting Through the Wreckage: frenzy over UFO reports and vast anti-alien defences
2. Records Discovered: economic collapse and talk of an "ultimate shield"
3. Fate Uncovered: a bunker databank: the shield was total nuclear annihilation of their own world (point-defence tech option 25%, society research, medium artifact)

## 分支与结局 Branches and outcomes


## 条件与文明差异 Conditions and variants

- 无特殊的文明差异。 / No empire-specific variants beyond the reward wording.
- 掷骰失败时使用通用事件池 all_random_events（见“考古遗址：发掘意外”）。 / Failed rolls use the generic pool all_random_events (see "Archaeological Sites: excavation incidents").

## 审阅记录 Review notes

- 已核对：遗址定义（common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1619）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1619) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
