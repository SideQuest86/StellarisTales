# 最后的希望 / One Last Hope

- 分类 Category：先驱者与考古 Precursors · DLC：《远古遗物》Ancient Relics

## 如何开始 How it starts

遗址权重为0，由星系初始化器 polaris_civilization 创建（common/solar_system_initializers/special_system_initializers.txt:1370），且要求全局标志 polaris_seen 才可见（遗址定义 visible）。该标志由“冷酷的招待会”ancrel.13000 设置：玩家击毁北极星（Polaris）国家的最后一支舰队时触发（common/on_actions/00_on_actions.txt:1667，on_fleet_destroyed_perp）。

Weight 0: created by the system initializer polaris_civilization (common/solar_system_initializers/special_system_initializers.txt:1370) and only visible once the global flag polaris_seen is set (site definition "visible"). The flag is set by "A Cool Reception" ancrel.13000, fired when the player destroys a fleet of the Polaris country (common/on_actions/00_on_actions.txt:1667, on_fleet_destroyed_perp).

## 剧情脉络 Story outline

击败“北极星”守军后发现该星系第二颗行星上异常的重金属，于是发现了漂浮在冰盖中的黑色立方体“保险库”。最后阶段（隐藏事件 ancrel.13006）以50/50抽出种子库里存放的是植物胚胎还是微生物。

1. 冷酷的招待会：击毁北极星守军后，系统最后一次扫描发现异常；设置全局标志 polaris_seen
2. 冰山：漂浮冰山里嵌着由同种合金制成的黑色立方体
3. 霜冻之门：大门上的铭文，需在不损坏内部的前提下开启
4. 盗墓：“保险库”：北极星人为保存财宝而造，内部气体二氧化碳含量低

After the Polaris defenders fall, the second planet reveals odd heavy metals, and a black cuboid "Vault" is found in a floating ice cap. The last stage (hidden ancrel.13006) draws, 50/50, whether it stores plant embryos or microorganisms.

1. A Cool Reception: after the last Polaris aggressor falls, a final scan finds something odd and sets the global flag polaris_seen
2. Iceberg: a black cuboid of the same alloy is built into a floating iceberg
3. Frost Gate: inscriptions on the door; it must be opened without damage
4. Grave Robbing: the "Vault" of the Polarians, a last refuge for their treasures

## 分支与结局 Branches and outcomes

- 藏宝 / Treasure：植物胚胎：北极星人把可能无法适应新大气的植物冻存于此（获得生物修正、中型文物） / plant embryos stored by the Polarians (biology modifier, medium artifact)
- 藏宝 / Treasure：微生物：每一种有益或有害的细菌被分类封存（社会学研究、中型文物） / microorganisms: every bacterium catalogued and frozen (society research, medium artifact)

## 条件与文明差异 Conditions and variants

- 掷骰失败时使用通用事件池 all_random_events（见“考古遗址：发掘意外”）。 / Failed rolls use the generic pool all_random_events (see "Archaeological Sites: excavation incidents").

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：common/archaeological_site_types/02_ancient_relics_arc_sites.txt:2385；events/ancient_relics_arcsite_events_2.txt:9145；common/solar_system_initializers/special_system_initializers.txt:1370；common/on_actions/00_on_actions.txt:1667
- 已核对：遗址定义（common/archaeological_site_types/02_ancient_relics_arc_sites.txt:2385）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/02_ancient_relics_arc_sites.txt:2385) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
- 结构修正：最后一个阶段事件 ancrel.13006 是隐藏的随机分派，草稿把它的几个互斥结局错排成连续阶段；现改为最后可见阶段之后的互斥分支。
- Structural fix: the last stage event ancrel.13006 is a hidden random dispatcher; the draft chained its exclusive endings as consecutive stages. They are now exclusive branches after the last visible stage.
- 原先“冷酷的招待会”ancrel.13000 是一个孤立的单事件故事；它设置遗址可见所需的全局标志，现并入本故事作为开端。
- The one-card story "A Cool Reception" (ancrel.13000) sets the flag that makes the site visible; it is now the opening of this story.
