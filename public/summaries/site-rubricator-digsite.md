# 誊录仪 / The Rubricator

- 分类 Category：先驱者与考古 Precursors · 来源 Sources：events/ancient_relics_arcsite_events_1.txt:3851（ancrel.4012）、3915–4047（遗址与4018）、4233–4660（4019–4024、40182）、4334–4490（4120–4123）；common/archaeological_site_types/02_ancient_relics_arc_sites.txt:2136；common/on_actions/00_on_actions.txt:1011、1028 · DLC：《远古遗物》Ancient Relics · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

誊录仪的坐标由前一故事（异常“古董”分类 ANCREL_RUBRICATOR_CAT → ancrel.4010 → 特别项目 RUBRICATOR_SPACECRAFT → ancrel.4011，开始事件链 rubricator_chain）给出，该部分在另一个故事“anomaly-ancrel-rubricator-cat”中。之后任意舰船进入誊录仪星系时，ancrel.4012（on_entering_system_fleet，common/on_actions/00_on_actions.txt:1011）在持有 rubricator_chain 且尚未设置 discovered_rubricator_planet 的帝国触发：发现一颗满是“窃鼠”聚落的可居住星球，设置标志 discovered_rubricator_planet，并把星球设为已勘察。

The Rubricator's coordinates come from the preceding story (anomaly category ANCREL_RUBRICATOR_CAT → ancrel.4010 → special project RUBRICATOR_SPACECRAFT → ancrel.4011, which begins the chain rubricator_chain) — a separate story, "anomaly-ancrel-rubricator-cat". When a ship then enters the Rubricator's system, ancrel.4012 (on_entering_system_fleet, common/on_actions/00_on_actions.txt:1011) fires for an empire that holds rubricator_chain and lacks discovered_rubricator_planet: a habitable world full of a rat-like hoarders' settlement is found, the flag discovered_rubricator_planet is set and the planet is marked surveyed.

## 剧情脉络 Story outline

遗址“窃鼠”（rubricator_digsite，权重0，由星系初始化器 rubricator_system 创建，common/solar_system_initializers/ancient_relics_initializers.txt:982；可见条件为上述标志）共五个阶段，每个阶段都给中型文物，最后一阶段给大型文物：4013 誊录仪（逃难的废墟与外国军徽）→ 4014 数据库（誊录仪的“摆放位置”）→ 4015 臭气熏天（吞食窃鼠的巨兽的粪便）→ 4016 女皇汽车旅馆（最后一战的宫殿）→ 4017 女皇的丁香缎带（誊录仪：一个会不断吐出文物的小立方体，一台复制器）。

4017 完成后1天，ancrel.4018 “虚空之爪”：一头巨龙“夏尔德”（Shard）从虚空中抓走装着誊录仪的考古穿梭机。事件为龙创建一个守护者国家和舰队（被动、仇恨半径350），结束 rubricator_chain，开始 rubricator_chain_2 并标出龙的位置；15天后出现通知 story.8。

两个选项：a “翻译她的兽语” → 1天后 ancrel.4019（夏尔德开口：誊录仪属于她）；b “紧急规避！” → 龙立刻敌对并进入攻击姿态。

4019 的回应：a “别伤害我们”（保存 rubricator_country，设置51天的 shard_grace，50天后隐藏事件 ancrel.4022 把龙设为敌对；若届时我们的舰队仍在龙的星系则 ancrel.4023 “战斗警报”）；b “立刻还回誊录仪”（龙立即敌对）。

宽限期过后，只要再次进入龙的星系，ancrel.4024 同样让龙扑来（shards_angry）。

若龙在遗址所在的殖民星球上被激怒，ancrel.4018 的 after 会设置 720 天计时：隐藏事件 ancrel.40181 → ancrel.40182 “…被毁”，龙摧毁该殖民地。

The "Kleptomaniac Rats" site (rubricator_digsite: weight 0, created by the initializer rubricator_system, common/solar_system_initializers/ancient_relics_initializers.txt:982; visible only with the flag above) has five stages, each with a medium artifact and the last a large one: 4013 The Rubricator (fled ruins, foreign insignia) -> 4014 The Inventory (where the Rubricator "is kept") -> 4015 A Foul Stench (dung of the beast that swallowed the hoarders) -> 4016 The Empress Motel (their last stand) -> 4017 The Empress's Lilac Ribbon (the Rubricator: a tiny cube that endlessly replicates artifacts).

One day after 4017, ancrel.4018 "Talons from the Void": a huge dragon, Shard, snatches the archaeology shuttle carrying the Rubricator. The event creates a guardian-dragon country and fleet (passive, aggro range 350), ends rubricator_chain, begins rubricator_chain_2 with a point of interest, and sends story.8 after 15 days.

Two options: a "Translate her animal noises" -> ancrel.4019 a day later (Shard speaks: the Rubricator is hers); b "Engage evasive maneuvers!" -> the dragon turns hostile and aggressive at once.

Answers at 4019: a "Please don't hurt us!" (saves rubricator_country, sets shard_grace for 51 days; hidden ancrel.4022 after 50 days makes the dragon hostile, and if our fleet is still in her system ancrel.4023 follows); b "Give back the Rubricator this instant!" (hostile at once).

After the grace period, entering the dragon's system again fires ancrel.4024 with the same effect (shards_angry).

If the site planet is a colony, 4018's after block starts a 720-day timer: hidden ancrel.40181 -> ancrel.40182 "... Destroyed", the dragon destroys that colony.

## 分支与结局 Branches and outcomes

- 夏尔德被击杀时（任何国家）：默认国家的击杀者得到 ancrel.4020“裂爪巨龙之殇”：立即获得遗珍 r_rubricator 并设置标志 harvested_dragon_dna；选项依帝国而异——不能采集DNA的帝国只是接收誊录仪；死灵（is_reanimator）帝国可启用“重塑裂爪龙”（ancrel.4026 创建属于我们的龙）；能采集DNA的帝国得到解锁“龙鳞”特质（利维坦转基因）的选项；非默认国家击杀时链所有者得到 4122 → 项目“裂爪龙遗骸”→ ancrel.4123（矿物1000、稀有水晶100、遗珍）。 / When Shard is killed by anyone: a default-type killer gets ancrel.4020, which immediately grants the relic r_rubricator and the flag harvested_dragon_dna; the options differ by empire — one that cannot harvest DNA simply takes the Rubricator, a necromancer (is_reanimator) can start "Restore the Shard" (ancrel.4026 creates a dragon fleet of our own), and one that can harvest DNA gets an option unlocking the Drake-Scaled trait for Leviathan Transgenesis; if a non-default state kills her, chain owners get 4122 -> project "Shard's Remains" -> ancrel.4123 (minerals 1000, rare crystals 100, the relic).
- 其他国家的链持有者在别国击杀龙后收到 ancrel.4121：誊录仪已被别国夺走。 / Other chain owners are told by ancrel.4121 that another empire has taken the Rubricator.
- 龙被击毁时，隐藏事件 4120 还会结束所有国家的 rubricator_chain 与 rubricator_chain_2，并移除标记点。 / When she dies, hidden 4120 also ends rubricator_chain / rubricator_chain_2 for every empire and removes the points of interest.

## 条件与文明差异 Conditions and variants

- 遗址掷骰失败使用通用池，其中“垃圾山大滑坡”（ancrel.4021）在此遗址权重20（见“考古遗址：发掘意外”）。 / Failed rolls use the generic pool where "The Great Junkslide" (ancrel.4021) has weight 20 at this site (see the incidents story).
- 4018.a 与 4019.a 的措辞按是否存在龙的星系和帝国类型略有差别；40182 的提示对机械/机器人殖民地不同（ancrel.4018.after_tooltipB）。 / The 40182 tooltip differs for machine or robot-only colonies (ancrel.4018.after_tooltipB).

## 审阅记录 Review notes

- 已核对：ancrel.4012、4013–4017、4018、4019、4022、4023、4024、40181/40182、4120、4020、4121–4123、4026 的脚本，遗址定义与初始化器，on_entering_system_fleet 与 on_fleet_destroyed_perp 的调用点，两条事件链的文本；中英文正文已读。
- Checked: the scripts of ancrel.4012, 4013-4017, 4018, 4019, 4022, 4023, 4024, 40181/40182, 4120, 4020, 4121-4123 and 4026, the site definition and initializer, the on_entering_system_fleet and on_fleet_destroyed_perp call sites and both chain texts; both languages read.
- 修正：原先把“抵达誊录仪星球”（4012）、“龙扑来”（4024）和“夏尔德之死”（4120/4020/4121/4122）当作三个孤立的小故事，并让龙的后续看似接在遗址之后；现合并为一个故事：4012 → 遗址 → 4018 → 4019/4023/4024，夏尔德之死作为不依赖顺序的结局族。
- Fix: The draft had three unconnected small stories (arrival 4012, the dragon lunging 4024, Shard's death 4120/4020/4121/4122); they are merged into one: 4012 -> site -> 4018 -> 4019/4023/4024, with Shard's death as an order-independent set of endings.
- 不确定：4018.after_tooltip 的两个版本（对只有机械/机器人人口的殖民地不同）具体效果见 destroy_colony，脚本里没有额外限制。
- Uncertain: The two wordings of the colony-destruction tooltip differ for machine-only colonies; the script adds no other restriction.
