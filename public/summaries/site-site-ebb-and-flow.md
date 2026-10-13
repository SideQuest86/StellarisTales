# 岩石之外 / Any Other Rock

- 分类 Category：先驱者与考古 Precursors · 来源 Sources：common/archaeological_site_types/02_ancient_relics_arc_sites.txt:852；events/ancient_relics_arcsite_events_2.txt:3554 · DLC：《远古遗物》Ancient Relics · 审阅 Reviewed 2026-10-12

## 如何开始 How it starts

勘察天体时，隐藏事件 ancrel.9999（on_survey_planet）以 5/405 的机会生成一个随机考古遗址（AI帝国或5年内刚发现过遗址者机会×0.2），再按各遗址的权重抽取；本遗址要求拥有《远古遗物》，权重100，只出现在熔岩星球上。

When a body is surveyed, hidden ancrel.9999 (on_survey_planet) has a 5/405 chance to create a random dig site (×0.2 for AI empires or if a site was found in the last 5 years), then picks a site type by weight; this site needs Ancient Relics and has weight 100 on molten worlds.

## 剧情脉络 Story outline

一颗死寂的熔岩星球上曾有接近太空时代的文明；城市下方的熔岩迷宫通往一座内殿，结局随机揭示内殿的用途。

1. 已逝之人：工业时代文明的废墟，文明在灾变中消亡
2. 死亡迷宫：最大城市下方的巨型人工地下迷宫
3. 熔岩地板：考察队进入随熔岩涨落的火山隧道

A lifeless molten world once held a civilisation on the edge of spaceflight; a lava labyrinth beneath its largest city leads to an inner sanctum whose purpose is revealed by a random ending.

1. Certainly Gone Now: ruins of an industrial civilisation struck down by a catastrophe
2. Labyrinth of Death: a vast artificial labyrinth under the largest city
3. The Floor is Lava: an expedition enters the volcanic tunnels as the lava ebbs and flows

## 分支与结局 Branches and outcomes

- 宗教文本 / Sacred Texts：内殿保存成千上万卷宗教经卷（按帝国类型获得不同的永久修正） / the sanctum holds thousands of scriptures (a permanent modifier depending on empire type)
- 珍宝藏库 / Treasure Trove：真正的宝库：稀有水晶、异域气体、不稳定微粒各200 / a real treasure vault: 200 each of rare crystals, exotic gases and volatile motes
- 囹圄之静 / Serenity in Isolation：迷宫是磨炼心志的试炼场 / the labyrinth was a proving ground for the mind

## 条件与文明差异 Conditions and variants

- 无特殊的文明差异。 / No empire-specific variants beyond the reward wording.
- 掷骰失败时使用本遗址专属的事件池 site_ebb_and_flow_random_events。 / Failed rolls draw from this site's own pool site_ebb_and_flow_random_events.

## 审阅记录 Review notes

- 已核对：遗址定义（common/archaeological_site_types/02_ancient_relics_arc_sites.txt:852）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/02_ancient_relics_arc_sites.txt:852) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
- 结构修正：最后一个阶段事件 ancrel.9176 是隐藏的随机分派，草稿把它的几个互斥结局错排成连续阶段；现改为最后可见阶段之后的互斥分支。
- Structural fix: the last stage event ancrel.9176 is a hidden random dispatcher; the draft chained its exclusive endings as consecutive stages. They are now exclusive branches after the last visible stage.
