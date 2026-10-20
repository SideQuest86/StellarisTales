# 石中低语 / Whispers in the Stone

- 分类 Category：先驱者与考古 Precursors · DLC：《远古遗物》Ancient Relics

## 如何开始 How it starts

隐藏事件 ancrel.4008（on_tech_increased，common/on_actions/00_on_actions.txt:2699）：拥有《远古遗物》的非AI、非荒野帝国研究了“采矿III”（tech_mining_3），且有一颗矿业区多于1、没有遗址的星球，全银河尚未有国家发现过此遗址时，按5/100的机会让一颗这样的星球在30–120天后收到 ancrel.4000，并设置 discovered_lithoids_arc_site。

Hidden ancrel.4008 (on_tech_increased, common/on_actions/00_on_actions.txt:2699): a non-AI, non-wilderness empire with Ancient Relics has just researched Mining III (tech_mining_3), owns a planet with more than one mining district and no site, and no country has found this site yet — then a 5 in 100 chance sends ancrel.4000 to such a planet after 30-120 days and sets discovered_lithoids_arc_site.

## 剧情脉络 Story outline

ancrel.4000“石中低语”：采矿作业在地壳深处发现了一座古代外星文明的痕迹。选项 a “有趣，开始挖掘！”创建遗址 lithoids_digsite（修正“石灵遗址矿物”、资源点 d_ore_rich_caverns）；b “矿产不能停”则放弃。

遗址五个阶段：4001 深入山体（失落的城市）→ 4002 受苦的石像（水晶雕像）→ 4003 卡兰卡（雕像创世神话）→ 4004 火与岩（石像曾是硅基生命）→ 4005 观察者效应（石匠就是卡兰卡，因硅与氧结合成石英而结晶；稀有水晶+500、科技“稀有水晶”、大型文物、标志 lithoid_crystal_plant）。

掷骰失败使用通用池，其中专属事件“甲烷气体爆炸”ancrel.4006 在此遗址权重20（见“考古遗址：发掘意外”）。

ancrel.4000 "Whispers in the Stone": mining has uncovered traces of an ancient alien civilisation deep in the crust. Option a "Intriguing. Start digging!" creates the site lithoids_digsite (modifier lithoids_arc_site_minerals and the deposit d_ore_rich_caverns); b "Our mineral production cannot be halted" declines.

The five stages: 4001 Into the Mountain (a lost city) -> 4002 Tortured Stone (crystal statues) -> 4003 The Kha'lanka (the statues' creation myth) -> 4004 Fire and Stone (they were silicon-based life) -> 4005 The Observer Effect (the stonecutters were the Kha'lanka, crystallised when silicon bonded with oxygen; rare crystals +500, the rare-crystals tech, a large artifact, flag lithoid_crystal_plant).

Failed rolls use the generic pool where the special event "Methane Gas Explosion" ancrel.4006 has weight 20 at this site (see the incidents story).

## 分支与结局 Branches and outcomes

- 4000 的两个选项互斥：开始挖掘，或放弃（不会再有第二次，因为 discovered_lithoids_arc_site 已设置）。 / The two options of 4000 exclude each other: dig, or decline (there is no second chance because discovered_lithoids_arc_site is already set).

## 条件与文明差异 Conditions and variants

- 4005 对演化猎手有额外选项（“别沾上无法呼吸的适应”）。 / 4005 has an extra Evolutionary-Predator answer.
- 掷骰失败时使用通用事件池 all_random_events（见“考古遗址：发掘意外”）。 / Failed rolls use the generic pool all_random_events (see "Archaeological Sites: excavation incidents").

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/ancient_relics_arcsite_events_1.txt:3387–3600（ancrel.4008、4000–4005）；common/archaeological_site_types/02_ancient_relics_arc_sites.txt:2087；common/on_actions/00_on_actions.txt:2699
- 已核对：ancrel.4008、4000–4005 的脚本，遗址定义 lithoids_digsite（权重0、最多一处），on_tech_increased 调用点；中英文正文已读。
- Checked: the scripts of ancrel.4008 and 4000-4005, the site definition lithoids_digsite (weight 0, at most one) and the on_tech_increased call site; both languages read.
