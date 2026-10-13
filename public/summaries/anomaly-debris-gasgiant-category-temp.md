# 维克塔·泽沃尼亚号 / The Vechtar Zavonia

- 分类 Category：深空异闻 Exploration · DLC：《遥远繁星》Distant Stars（has_distar） · 审阅 Reviewed：2026-10-12（已审阅 reviewed）
- 来源 Sources：common/anomalies/95_anomaly_categories_distant_stars.txt:1056-1085; events/distant_stars_events_2.txt:685 (distar.1000); common/special_projects/00_projects_distant_stars.txt:963 (GENERATION_SHIP); events/distant_stars_events_2.txt:734 (distar.1001); common/solar_system_initializers/distant_stars_initializers.txt:73 (vechtar_zavonia_system); common/event_chains/00_event_chains_distant_stars.txt:36-45; common/on_actions/00_on_actions.txt:1007; events/distant_stars_events_2.txt:814 (distar.1002); common/special_projects/00_projects_distant_stars.txt:988 (HIDDEN_PLANET); events/distant_stars_events_2.txt:875 (distar.1003); events/distant_stars_events_2.txt:1024 (distar.1004); events/distant_stars_events_2.txt:1045-1100 (distar.1007, 1010); events/distant_stars_events_2.txt:1105-1369 (distar.1005-1013); common/on_actions/00_on_actions.txt:2199; events/distant_stars_events_2.txt:1575-1661 (distar.1015, 1016); common/on_actions/00_on_actions.txt:1303; events/distant_stars_events_2.txt:1692 (distar.1014)

## 如何开始 How it starts

需要《遥远繁星》。气态巨行星可能生成“远古船壳”（8级，全局一次，权重0.35，null_spawn_chance 0.65）；玩家物种使用 mam5 或 fun4 头像（沃尔人/马达克人外形）、格式塔或游牧帝国不会遇到。

Requires Distant Stars. Gas giants can spawn "Ancient Hulk" (level 8, once per game, weight 0.35, null_spawn_chance 0.65); not for empires whose species uses portrait mam5 or fun4 (the Vol / Mardak look), gestalts or nomads.

## 剧情脉络 Story outline

1. distar.1000“维克塔·泽沃尼亚”：宗教种族马达克·沃尔的亚光速世代舰残骸，他们为躲避“容器”的追杀，寻找只向选民显现的乐园 Paridayda，但仍被追上。可开启 GENERATION_SHIP（60天）→ distar.1001“隐蔽星球”：解密航行目的地，首席研究员变得偏执，公众也开始向往乐园。继续 → 开启“维克塔·泽沃尼亚号”事件链，生成一个新星系（含 utopian_planet）并标出兴趣点；放弃 → 影响力。
2. 舰队进入该星系 → distar.1002“失乐园”：坐标处只有一颗满是弹坑的荒芜星球。坚持 → HIDDEN_PLANET（60天）→ distar.1003“完美世界”：荒芜外表是能量护盾投影，下面是盖亚星球，住着石器时代的马达克·沃尔（哺乳类与真菌的共生体）；星球被命名为 Paridayda。
3. 若星系属于他国，10天后 distar.1004 通知该国；20天后（或之后有人在该星系建前哨时，隐藏 distar.1007）隐藏 distar.1010 让星系主人收到 distar.1005：自称“沃尔”的种族来电——distar.1006 称马达克是寄生真菌。同意“用火净化” → distar.1008 灭绝星上马达克人口（追问环境变化 → distar.1013 断线）；拒绝（或真菌物种保护他们）→ distar.1009 威胁，60–80天后 distar.1011 沃尔舰队前来，以“末日”轰炸直到人口归零 → 隐藏 distar.1015 → distar.1016“失乐园”。
4. 发现者若殖民 Paridayda，distar.1014“身处乐园”给予10年修正。

1. distar.1000 "The Vechtar Zavonia": the wreck of the Mardak Vol's sub-light generation ship; fleeing the "Vessels", they sought the paradise Paridayda that reveals itself only to the chosen, but were caught. GENERATION_SHIP (60 days) → distar.1001 "Hidden Worlds": the destination is decrypted, the lead researcher becomes obsessed and the public dreams of paradise. Continue → the "Vechtar Zavonia" chain starts and a new system with the utopian planet and a point of interest is spawned; abort → influence.
2. A fleet entering that system → distar.1002 "Paradise Lost": only a bomb-scarred barren world. Insist → HIDDEN_PLANET (60 days) → distar.1003 "Postcard Perfection": the barren surface is a projected shield over a Gaia world inhabited by stone-age Mardak Vol (a mammal–fungus symbiosis); the planet becomes Paridayda.
3. If another empire owns the system, it gets distar.1004 after 10 days; after 20 days (or when someone later builds an outpost there, hidden distar.1007) the hidden distar.1010 gives the system owner distar.1005: the "Vol" hail us — distar.1006 calls the Mardak a parasitic fungus. "Purge them with fire" → distar.1008 exterminates the Mardak pops (asking about environmental changes → distar.1013, the line goes dead); refusing (or a fungoid empire protecting them) → distar.1009 threats, then 60–80 days later distar.1011 a Vol fleet arrives and bombards the planet to zero pops → hidden distar.1015 → distar.1016 "Paradise Lost".
4. If the discoverer colonises Paridayda, distar.1014 "In Paradise" grants a 10-year modifier.

## 分支与结局 Branches and outcomes

distar.1001、1002 的继续/放弃互斥；distar.1006 的净化与拒绝通向互斥结局（1008 灭绝 / 1011→1016 星球被焚毁）。1004 仅在星系属于他国时出现。

Continue/abort in distar.1001 and 1002 are exclusive; distar.1006's purge vs refuse lead to exclusive endings (1008 extermination / 1011→1016 the world burned). distar.1004 only appears when another empire owns the system.

## 条件与文明差异 Conditions and variants

distar.1006.c“绝不允许你们伤害他们”仅限真菌物种帝国；distar.1005 有两段正文。

distar.1006.c "You will not harm them!" is for fungoid empires only; distar.1005 has two texts.

## 审阅记录 Review notes

已核对异常、distar.1000–1016、两个项目、事件链及 on_entering_system_fleet / on_building_starbase_outpost / on_colony_zero_pops / on_colonized。修正：草稿把一条故事拆成五个（异常、event-distar-1002、1007、1014、1015）；现合并为以异常为根的故事，并以审阅连接表示进入隐藏星系、沃尔舰队轰炸致人口归零、殖民 Paridayda。

Checked the anomaly, distar.1000–1016, both projects, the event chain and the on_entering_system_fleet / on_building_starbase_outpost / on_colony_zero_pops / on_colonized hooks. Correction: the draft split one story into five (the anomaly, event-distar-1002, 1007, 1014, 1015); merged with reviewed links for entering the hidden system, the Vol bombardment and colonising Paridayda.
