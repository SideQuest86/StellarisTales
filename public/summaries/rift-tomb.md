# 孤独物体 / Lone Object

- 分类 Category：星界裂隙 Astral rifts (C4) · DLC：星界位面 Astral Planes
- 来源 Sources：`common/astral_rifts/00_astral_rifts.txt:222`；`events/astral_rifts_1_events.txt:3991–4313`（1700–1725）
- 审阅 Reviewed：2026-10-12（全篇 whole story；原独立的失败事件 1725 已并入 / former standalone failure event 1725 merged in）

## 如何开始 How it starts

裂隙类型从探索帝国的裂隙池中按权重抽取，权重 1，无额外条件（`00_astral_rifts.txt:222–231`）。每阶段结束掷 1–10 的骰子，加技能与线索、减难度，≥14 进入下一章；第一章 1700 难度为 0。

Drawn by weight from the explorer's rift pool, weight 1, no extra conditions (`00_astral_rifts.txt:222–231`). Each phase ends with a d10 plus skill and clues minus difficulty; 14+ opens the next chapter. Chapter 1700 has difficulty 0.

## 剧情脉络 Story outline

1. 漂浮奥秘（1700）：没有恒星的口袋维度里漂着一个刻满符号的巨大矩形物体。翻译文字（→ 1705）或扫描外部（→ 1710）。
2. 千言万语（1705）：这是一座墓室，葬着一位曾统治星系、与共生种族结成灵能纽带的强大生物；另有符号像是“诅咒”。扫描外部（→ 1710）或炸开（→ 1720 / 失败 1725）。
3. 远古封印（1710）：两半焊合的外壳被内部腐蚀出裂缝。派无人机进入（→ 1715）或炸开（→ 1720 / 失败 1725）。
4. 云雾缭绕的通道（1715）：内部满是混有星界纤维的碳尘。取样后返回（结束探索）或破坏性破拆（→ 1720 / 失败 1725）。

1. Floating Mystery (1700): in a starless pocket dimension floats a huge rectangular object covered in glyphs. Translate them (→ 1705) or scan its perimeter (→ 1710).
2. Millions of Glyphs (1705): it is a tomb of a mighty being that once ruled the galaxy, psionically bonded with a symbiotic species; some glyphs read like a “curse”. Scan the perimeter (→ 1710) or blast it open (→ 1720 / failure 1725).
3. An Ancient Seal (1710): the welded shell is corroded from within, with cracks. Send a drone (→ 1715) or blast it open (→ 1720 / failure 1725).
4. Clouded Passageways (1715): carbon dust laced with astral fibre fills the interior. Take samples and return (the exploration ends) or break in destructively (→ 1720 / failure 1725).

## 分支与结局 Branches and outcomes

- 1715.a：取样返回，中量星界丝缕，探索结束。
- 1720 盗墓：水晶巨骨与贡品——矿物、合金、500 稀有晶体、稀有文物、凝聚力；灵能科学家另得一项灵能研究选项。
- 1725 墓地守卫（失败分支，基础 1.5%/次掷骰）：隐藏墓室里的守卫随探球冲出裂隙，在裂隙处生成一支敌对的“墓地守卫”舰队（10–30 艘）。

- 1715.a: take samples and leave; a medium astral thread reward; the exploration ends.
- 1720 Tomb Raiding: a crystalline giant's skeleton and offerings — minerals, alloys, 500 rare crystals, minor artefacts and unity; a psionic scientist also yields a psionics research option.
- 1725 Grave Guardians (failure branch, base 1.5% per roll): guardians from a hidden chamber follow the Sphere out; a hostile Grave Guardians fleet (10–30 ships) appears at the rift.

## 条件与文明差异 Conditions and variants

- 1720 的正文按是否派过无人机、是否读过文字、科学家是否灵能者组合成六个版本（裂隙标记 drone_sent / has_seen_glyphs / description_psionic）。

- 1720 has six texts combining whether a drone was sent, whether the glyphs were read, and whether the scientist is psionic (rift flags drone_sent / has_seen_glyphs / description_psionic).

## 审阅记录 Review notes

- 已核对：裂隙定义；1700–1725 全部事件；三处 `on_roll_failed = astral_rift.1725`（`astral_rifts_1_events.txt:4051–4055, 4095–4099, 4144–4148`）；1725 生成敌对国家与舰队的效果。
- 修正：编译图漏掉失败分支，1725 曾是独立故事；已用三条桥接并入并标注 1720/1725 互斥。

- Checked: rift definition; every event 1700–1725; the three `on_roll_failed = astral_rift.1725` (`astral_rifts_1_events.txt:4051–4055, 4095–4099, 4144–4148`); the hostile country and fleet created in 1725.
- Correction: the compiled graph missed the failure branch and 1725 had been a separate story; merged with three bridges and 1720/1725 marked exclusive.
