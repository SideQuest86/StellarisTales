# 被毁灭的恒星系 / Ruined Star System

- 分类 Category：先驱者与考古 Precursors · 来源 Sources：common/archaeological_site_types/00_base_game_arc_sites.txt:14；events/federations_events_2.txt:173；common/solar_system_initializers/federations_initializers.txt:2346 · DLC：《联邦》Federations（事件 federations2.*；遗址定义在基础游戏文件） Federations events; site definition in the base-game file · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

遗址权重为0，由星系初始化器 planet_with_too_many_moons_system 创建（common/solar_system_initializers/federations_initializers.txt:2346）：一颗拥有六颗等距卫星的行星。

Weight 0: created by the system initializer planet_with_too_many_moons_system (common/solar_system_initializers/federations_initializers.txt:2346), a planet with six equidistant moons.

## 剧情脉络 Story outline

一个能把整个星系雕琢成艺术品的和平文明“和乐族”（Shallarians）的废墟。四个阶段之后，隐藏事件 federations2.5 决定毁灭的真相：若银河中有与玩家建立通信、狂热排外的堕落帝国，则以1比4抽取“自己的舰队与人工智能失控”（2.7）或“被该堕落帝国征服”（2.6）；否则一律是 2.7。

1. [From.Planet.GetName]上的废墟：遗迹所在的行星与六颗卫星曾密集居住，卫星是被人为拖到现在的位置
2. 失落的记录：数据核心记录了千年前的和乐族及其星系雕塑
3. 和乐族的和平：和乐族认为星际战争不可理喻，因而忽视了军备

The ruins of the Shallarians, a peaceful people able to sculpt whole star systems. After four stages hidden federations2.5 decides how they fell: if a fanatic-xenophobe Fallen Empire has contact with the player it draws 1 : 4 between their own runaway fleet and AI (2.7) and conquest by that Fallen Empire (2.6); otherwise it is always 2.7.

1. The Ruins of [From.Planet.GetName]: the planet and its six moons were densely inhabited; the moons were dragged into place
2. Records of the Lost: data cores show the Shallarians at their peak, their system sculpted as art
3. The Shallarian Peace: they thought interstellar war inconceivable and neglected their forces

## 分支与结局 Branches and outcomes

- 和乐族的陨落 / The Fall of the Shallarians：和乐族用高科技舰队与人工智能强制维护和平，最终自毁（影响力+100、团结、大型文物） / the Shallarians built a fleet and AI to enforce peace and destroyed themselves (influence +100, unity, large artifact)
- 和乐族的陨落 / The Fall of the Shallarians：和乐族被狂热排外的堕落帝国在其全盛期攻灭（获得和乐族地形改造知识修正、大型文物） / the Shallarians were conquered by a fanatic-xenophobe Fallen Empire (modifier shallarian_terraforming_knowledge, large artifact)
- 掷骰失败时的专属池 site_ruins_of_shallash_random_events：守卫机器人陷阱、资源贮藏点8040、争论的考古学家8055、装备故障8070、无影无踪8075（权重仅2）、稀有文物8080、不稳定遗迹8100、远古记录8110、federations2.701（仅核毁星球）以及权重40的 federations2.702“隐蔽的前哨船只被激活”（创建敌对派系舰队“废墟守卫”）。 / Failure pool site_ruins_of_shallash_random_events: guardian-droid trap, resource cache 8040, bickering archaeologists 8055, equipment malfunction 8070, without a trace 8075 (weight only 2), minor artifacts 8080, unstable ruins 8100, ancient records 8110, federations2.701 (nuked worlds only) and, at weight 40, federations2.702 "Hidden Sentinel Ship Activated" (creates the hostile faction fleet Warder of the Ruins).

## 条件与文明差异 Conditions and variants

- 2.7 与 2.6 都按帝国类型给出多种回应（谨慎、同情、机械、“浪费了粮食”等）。 / 2.7 and 2.6 offer several empire-specific answers (cautionary, sad, machine, "a waste of food").
- 掷骰失败时使用本遗址专属的事件池 site_ruins_of_shallash_random_events。 / Failed rolls draw from this site's own pool site_ruins_of_shallash_random_events.

## 审阅记录 Review notes

- 已核对：遗址定义（common/archaeological_site_types/00_base_game_arc_sites.txt:14）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/00_base_game_arc_sites.txt:14) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
- 结构修正：最后一个阶段事件 federations2.5 是隐藏的随机分派，草稿把它的几个互斥结局错排成连续阶段；现改为最后可见阶段之后的互斥分支。
- Structural fix: the last stage event federations2.5 is a hidden random dispatcher; the draft chained its exclusive endings as consecutive stages. They are now exclusive branches after the last visible stage.
- 不确定：权重40的 federations2.702 在池中占约三分之一，并非罕见。
- Uncertain: federations2.702 carries weight 40 of about 122 in the pool, so it is far from rare.
