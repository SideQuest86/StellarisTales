# 脱水 / Desiccated

- 分类 Category：先驱者与考古 Precursors · DLC：《远古遗物》Ancient Relics（初始化器要求 has_ancrel）

## 如何开始 How it starts

遗址权重为0，由星系初始化器 fumongus_init_01 在拥有《远古遗物》时创建（common/solar_system_initializers/special_system_initializers.txt:1698）：一颗干涸的、长满蘑菇的星球。

Weight 0: created by the system initializer fumongus_init_01 when Ancient Relics is present (common/solar_system_initializers/special_system_initializers.txt:1698): a parched world covered in mushrooms.

## 剧情脉络 Story outline

水都被一整株巨大的菌丝体“巨蕈”吸走；星球上有另一个航天文明的掩体，里面的“菌丝监听阵列”可以把菌丝网络的信号转成情报。考古队需要拖来冰小行星为蘑菇补水，才能让阵列运转。

1. 囤水者：满是蘑菇的峡谷与一整株相连的菌丝体
2. 被摧垮的地堡：被蘑菇占满的掩体
3. 真菌改造者：掩体里的计算设备直接连着菌丝（物理学研究）
4. 从蘑菇到代码：数据库显示这是一座监听站：外星人能解读菌丝信号
5. 不再干燥：拖来冰小行星浇灌蘑菇，60天后阵列上线（隐藏事件 ancrel.13125 按旗标分派）

All the water is held by one gigantic mycelium, the "Fumongus"; a bunker of another spacefaring species holds a "Mycelium Listening Array" that turns network signals into intel. The team must tow icy asteroids in to water the mushroom before the array works.

1. Water Hoarders: canyons of mushrooms forming one organism
2. Overrun Bunker: a bunker overrun by mushrooms
3. Fungal Tamperers: computing equipment wired directly to the mycelium (physics research)
4. From Shroom to Code: the databanks show a listening post that decodes mycelial signals
5. Dry No More: icy asteroids are brought to water it; 60 days later the array is online (hidden ancrel.13125 dispatches by flag)

## 分支与结局 Branches and outcomes

- 敬畏这个远古蘑菇 / Fear the Old Shroom：“敬畏古蕈”：若国家已有 fumongus_colony_complete（colony.2075 设置，同时给星球加“真菌研究区”资源点）则显示此版本；a 使用它（团结奖励、修正“菌丝网络”、20年“专制”修正、设置 fumongus_* 全局标志）；b 任其生长；演化猎手有专属选项 / shown when the country already has fumongus_colony_complete (set by colony.2075, which also adds the fungal study zone); a use it (unity reward, modifier mycelial_network_modifier, a 20-year authoritarian modifier, fumongus_* global flags); b leave it; Evolutionary Predators have their own option
- 巨大蘑菇又在倾听了 / The Fumongus Listens Again：“巨蕈又在倾听了”：没有该旗标时的版本，选项相同（启动监控/任其生长） / the version without that flag, with the same options (start monitoring / leave it)
- 专属池 site_fumongus_random_events（总权重190）：敌对野生动物8090–8093（5/25/25/25）、真菌僵尸8300–8315（5/25/25/25，其中8315 消耗食物100）、资源贮藏点8040（权重30）。 / Own pool site_fumongus_random_events (total weight 190): hostile wildlife 8090-8093 (5/25/25/25), fungal zombies 8300-8315 (5/25/25/25; 8315 costs 100 food), resource cache 8040 (weight 30).

## 条件与文明差异 Conditions and variants

- 掷骰失败时使用本遗址专属的事件池 site_fumongus_random_events。 / Failed rolls draw from this site's own pool site_fumongus_random_events.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：common/archaeological_site_types/00_base_game_arc_sites.txt:140；events/ancient_relics_arcsite_events_2.txt:9393；common/solar_system_initializers/special_system_initializers.txt:1698
- 已核对：遗址定义（common/archaeological_site_types/00_base_game_arc_sites.txt:140）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/00_base_game_arc_sites.txt:140) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
