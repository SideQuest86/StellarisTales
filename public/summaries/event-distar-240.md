# 未知信号 / Unknown Signal

- 分类 Category：深空异闻 Exploration · DLC：《遥远繁星》Distant Stars（has_distar） · 审阅 Reviewed：2026-10-12（已审阅 reviewed）
- 来源 Sources：events/distant_stars_events_2.txt:15-135 (distar.290 game start); common/solar_system_initializers/distant_stars_initializers.txt:3659-3800 (distar_sealed_1_1/1_2); common/on_actions/00_on_actions.txt:1009-1010; events/distant_stars_events_1.txt:8773 (distar.240); events/distant_stars_events_1.txt:8811 (distar.242); events/distant_stars_events_1.txt:8895 (distar.243); common/on_actions/00_on_actions.txt:1462; common/anomalies/95_anomaly_categories_distant_stars.txt:767-782; events/distant_stars_events_1.txt:8924 (distar.244)

## 如何开始 How it starts

拥有《遥远繁星》时，开局隐藏事件 distar.290 生成一个“入口星系”和一个与超空间航道隔绝的“封闭星系”（三合星），两者以天然虫洞相连；封闭星系中有一个灵能实体（首领舰队）和一颗带“神秘箱体”异常的盖亚星球。舰队首次进入入口星系时触发 distar.240。

With Distant Stars, the hidden game-start event distar.290 creates an entry system and a sealed trinary system cut off from the hyperlanes, linked by natural wormholes; the sealed system holds a Psionic Entity (boss fleet) and a Gaia planet with the "Mysterious Tanker" anomaly. A fleet first entering the entry system triggers distar.240.

## 剧情脉络 Story outline

1. distar.240“未知信号”：入口星系边缘一个失稳的亚空间裂隙中传出微弱而持续的信号；帝国得以看见虫洞。
2. 舰队进入封闭星系 → distar.242“灵能实体”：一个纯能量的巨大存在盘踞于此，星系与超空间航道完全隔绝，信号来自 [tanker_planet]。
3. 击毁灵能实体 → distar.243“实体沉默”：科研船可以安全探索这一星系；记录标本 psionic_entity_residue。
4. 调查盖亚星球的“神秘箱体”异常（5级）→ distar.244“药之奇迹”：箱体是与虫洞干扰器同一外星人建造的医学研究船，船上有神经再生剂的分子结构（神经再生科技30%进度/选项）。

1. distar.240 "Unknown Signal": a weak, insistent signal comes from a destabilised subspace rift at the edge of the entry system; the empire can now see the wormhole.
2. Entering the sealed system → distar.242 "Psionic Entity": a huge being of pure energy dwells in a system cut off from the hyperlane network; the signal comes from [tanker_planet].
3. Destroying the entity → distar.243 "Entity Silenced": science ships can explore safely; specimen psionic_entity_residue.
4. Investigating the Gaia planet's "Mysterious Tanker" anomaly (level 5) → distar.244 "Marvels of Medicine": the derelict is a medical research ship built by the same aliens as the wormhole destabiliser, holding a neuroregenerative agent (Neuroregeneration tech option / 30% progress).

## 分支与结局 Branches and outcomes

主线是线性的探索顺序；异常只需勘察那颗星球，但灵能实体的攻击性（首领舰队、侵略姿态）实际上要求先处理它。distar.244 机械智能可另选“令人好奇”换取社会学研究。

The chain is a linear exploration order; the anomaly only needs a survey of the planet, but the aggressive boss entity in practice has to be dealt with first. Machine intelligences may instead take "Curious" for society research in distar.244.

## 条件与文明差异 Conditions and variants

distar.242 有四段正文：先收到过信号（普通/灵能物种/格式塔或机器人灵能），或未经过入口星系直接进入（例如跃迁）。distar.244 机械智能正文不同。

distar.242 has four texts: signal already received (normal / psionic species / gestalt-or-robot psionic) or entered without passing the entry system (e.g. by jump). distar.244 has a machine-intelligence text.

## 审阅记录 Review notes

已核对 distar.290、两个星系初始化、两个 on_entering_system_fleet 触发、on_ship_destroyed_perp、异常定义与 distar.240–244。修正：草稿把入口信号、灵能实体、实体被毁和异常分成四个独立故事；现合为一个以 distar.240 为起点的故事，用三条审阅连接表示进入、击毁和勘察。

Checked distar.290, both system initializers, the on_entering_system_fleet triggers, on_ship_destroyed_perp, the anomaly and distar.240–244. Correction: the draft split the entry signal, the entity, its death and the anomaly into four stories; they are now one story starting at distar.240 with three reviewed links (enter, destroy, survey).
