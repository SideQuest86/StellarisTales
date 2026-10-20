# 屏障星球 / Shielded Planet

- 分类 Category：先驱者与考古 Precursors · DLC：《远古遗物》Ancient Relics

## 如何开始 How it starts

一个特殊星系（星系初始化器 relic_system_1，common/solar_system_initializers/ancient_relics_initializers.txt:5）里有一颗被无法穿透的能量屏障包住的行星（标志 minigalaxy_planet）和它的卫星（标志 minigalaxy_moon）。勘察这两个天体之一时，on_survey_planet（common/on_actions/00_on_actions.txt:1154–1155）触发 6150（先勘察行星：小型文物，并把卫星标为已勘察）或 6151（先勘察卫星），二者都设置全局标志 minigalaxy_site_spawned 并在卫星上创建遗址 site_minigalaxy_1。

A special system (initializer relic_system_1, common/solar_system_initializers/ancient_relics_initializers.txt:5) holds a planet wrapped in an impenetrable energy barrier (flag minigalaxy_planet) and its moon (flag minigalaxy_moon). Surveying one of them fires, via on_survey_planet (common/on_actions/00_on_actions.txt:1154-1155), 6150 (planet first: a small artifact and the moon is marked surveyed) or 6151 (moon first); both set the global flag minigalaxy_site_spawned and create the site site_minigalaxy_1 on the moon.

## 剧情脉络 Story outline

第一个遗址“卫星基地”（site_minigalaxy_1，三阶段）：6155 停战倡议组织（废弃基地属于一个半永久的军事联盟）→ 6160 交战方丙（被屏障的行星是其中一个交战帝国的首都）→ 6165 护盾生成器（基地维持了数个世纪，之后各方内斗；获得科技“古物过载器”25%、工程学研究，并在行星上创建第二个遗址 site_minigalaxy_2）。

第二个遗址“被遗弃的都市星球”（四阶段）：6170 失踪（被屏障隔绝75000年，居民失踪）→ 6175 撤离日 → 6180 最终计划 → 6185 微缩星河（极北的堡垒里的遗珍：原居民去了哪里；获得遗珍“微缩星河” r_galaxy，大型文物）。

遗珍可以激活：ancrel.7007“微缩星河”（时间在内部流逝得更快，观察居民获得三类研究）。

First site "Moon Base" (site_minigalaxy_1, three stages): 6155 The Armistice Initiative (a semi-permanent military alliance) -> 6160 Belligerent Party C (the shielded planet was a warring empire's capital) -> 6165 The Shield Generator (the base was kept for centuries, then infighting; archaeo-overcharger tech 25%, engineering research, and the second site site_minigalaxy_2 is created on the planet).

Second site "Abandoned Ecumenopolis" (four stages): 6170 Disappearance (isolated for 75,000 years, the population gone) -> 6175 Evacuation Day -> 6180 The Project -> 6185 Miniaturized Galaxy (a relic in a fortified structure at the north pole shows where they went; the relic r_galaxy and a large artifact).

The relic can be activated: ancrel.7007 "Miniature Galaxy" (time runs faster inside; observing its denizens gives all three research types).

## 分支与结局 Branches and outcomes

- 掷骰失败时使用通用事件池 all_random_events（见“考古遗址：发掘意外”）。 / Failed rolls use the generic pool all_random_events (see "Archaeological Sites: excavation incidents").
- 6155–6185 每个阶段的选项都只有一个“好奇”，没有分支。 / The stages 6155-6185 each have a single "Curious" option and no branches.

## 条件与文明差异 Conditions and variants

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/ancient_relics_arcsite_events_2.txt:1171–1500（ancrel.6150–6185）；common/archaeological_site_types/02_ancient_relics_arc_sites.txt:227、270；common/relics/relics.txt:239、309；common/on_actions/00_on_actions.txt:1154–1155；common/solar_system_initializers/ancient_relics_initializers.txt:5
- 已核对：ancrel.6150、6151、6155–6185 的脚本，两个遗址定义，初始化器 relic_system_1 的标志，r_galaxy 遗珍与 ancrel.7007，on_survey_planet 调用点；中英文正文已读。
- Checked: the scripts of ancrel.6150, 6151, 6155-6185, both site definitions, the flags in the initializer relic_system_1, the relic r_galaxy and ancrel.7007, and the on_survey_planet call site; both languages read.
- 修正：原先 event-ancrel-6150 与 event-ancrel-6151 是两个几乎一样的重复故事，event-ancrel-7007 是孤立的一张卡；现合并为一个故事，6150/6151 标为互斥的两个入口，7007 作为遗珍激活并入。
- Fix: event-ancrel-6150 and event-ancrel-6151 were two near-identical duplicate stories and event-ancrel-7007 an orphan card; they are merged into one story with 6150/6151 as exclusive entries and 7007 as the relic activation.
