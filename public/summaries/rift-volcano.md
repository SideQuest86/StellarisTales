# 火山位面 / Volcanic Plane

- 分类 Category：星界裂隙 Astral rifts (C4) · DLC：星界位面 Astral Planes
- 来源 Sources：`common/astral_rifts/00_astral_rifts.txt:244`；`events/astral_rifts_1_events.txt:4888–5527`（1900–1960）；`common/traits/12_astral_planes_traits.txt:46–72`
- 审阅 Reviewed：2026-10-12（全篇 whole story；原独立的失败事件 1935 已并入 / former standalone failure event 1935 merged in）

## 如何开始 How it starts

裂隙类型从探索帝国的裂隙池中按权重抽取，权重 1，无额外条件（`00_astral_rifts.txt:244–253`）。每阶段结束掷 1–10 的骰子，加技能与线索、减难度，≥14 进入下一章；第一章 1900 难度为 0。

Drawn by weight from the explorer's rift pool, weight 1, no extra conditions (`00_astral_rifts.txt:244–253`). Each phase ends with a d10 plus skill and clues minus difficulty; 14+ opens the next chapter. Chapter 1900 has difficulty 0.

## 剧情脉络 Story outline

1. 炽热地景（1900）：灼热的熔岩世界，远处耸立着一座黑色方尖碑，人工河道向它汇聚，发光的球状生物在空中漂浮。探索周围（→ 1905）或直接飞向方尖碑（→ 1910）。
2. 追猎（1905）：墙上的牢笼里关满了各种生物，漂浮生物用电击制服囚犯，其中一只追上了探球。拉锚撤离（→ 1920）或躲进岩浆（→ 1915）。
3. 被捕（1910）：探球被卷须拖向一间牢笼。花 100 星界丝缕爆发挣脱（→ 1915）或拉锚撤离（→ 1920）。
4. 黑色方尖碑（1915）：碑面流动着熔融的符文，漂浮生物似乎与它相连。解读符文（→ 1925 名单）或花 100 奇异气体摧毁它（→ 1930 / 失败 1935）。
5. 名单（1925）：碑上是数以兆计、不断变化的名字，触碰一个名字就会让对应牢笼里的囚徒受折磨。拉锚撤离（→ 1920）或摧毁它（→ 1930 / 失败 1935）。

1. Fiery Landscape (1900): a scorching lava world; a black obelisk stands where artificial channels converge, and glowing orb-like creatures float overhead. Explore the surroundings (→ 1905) or fly to the obelisk (→ 1910).
2. Pursued (1905): cages in the walls hold all kinds of creatures, shocked into submission by the floaters; one of them gives chase. Pull anchor (→ 1920) or hide in the lava (→ 1915).
3. Captured (1910): tendrils drag the Sphere toward a cage. Burn 100 astral threads to break free (→ 1915) or pull anchor (→ 1920).
4. The Black Obelisk (1915): molten runes swirl on its surface; the floaters seem bound to it. Decipher the runes (→ 1925 Names) or spend 100 exotic gases to destroy it (→ 1930 / failure 1935).
5. Names (1925): trillions of shifting names; touching one makes its cage's prisoner suffer. Pull anchor (→ 1920) or destroy the device (→ 1930 / failure 1935).

## 分支与结局 Branches and outcomes

- 1920 取回：中量星界丝缕，探索结束。
- 1930 破碎的方尖碑：碑断成两截，漂浮生物坠落，牢门全开、囚徒逃散；获得矿物、合金、凝聚力与大量星界丝缕，探索结束。2160 天（6 年）后 1940“不祥访客”→ 1941：方尖碑的熔岩主人要求补偿——同意“恢复平衡”则 6 年内每年失去一个人口；拒绝则首都受 6 年“尖塔的诅咒”。
- 1935 失败（失败分支，基础 1.5%/次掷骰）：探球满是烟灰，科学家殒命，获得大量星界丝缕，探索结束。360 天后 1950：科学家以 600 多岁、不死之身归来（获得偏执或精神创伤特质）；再 360 天后 1955“牺牲”：发现其秘密把人口送回裂隙以“恢复平衡”——处决，或放任（非唯心帝国；获得“尖塔的诅咒”特质，任议员时每年失去一个人口）。

- 1920 Retrieval: a medium astral thread reward; the exploration ends.
- 1930 Shattered Obelisk: the obelisk splits, the floaters fall, the cages open and the prisoners flee; minerals, alloys, unity and a large astral thread reward; the exploration ends. 2160 days (six years) later, 1940 “Ominous Visitor” → 1941: the obelisk's molten owner demands amends — “Restore the Balance” costs one pop a year for six years; refusing curses the capital with Obelisk's Curse for six years.
- 1935 Failure (failure branch, base 1.5% per roll): the Sphere returns full of ash and the scientist is lost; a large astral thread reward; the exploration ends. 360 days later 1950: the scientist returns over 600 years old and immortal (Paranoid or Traumatized); 360 days after that 1955 “Sacrifice”: they are secretly sending people back through the rift to “restore the balance” — dispose of them, or (non-spiritualist empires) let them continue, gaining the Obelisk's Curse trait that kills one pop a year while they are a councillor.

## 条件与文明差异 Conditions and variants

- 1915 的正文按此前是躲进岩浆、挣脱逃出还是直接接近而不同（裂隙标记 submerge_hide / submerge_escape）。
- 失败事件 1935 自身要求探索帝国不是“荒野”帝国（脚本注释：无法牺牲人口）。

- 1915's text depends on whether the Sphere hid in the lava, escaped the tendrils, or approached directly (rift flags submerge_hide / submerge_escape).
- Failure event 1935 itself requires a non-Wilderness explorer (script comment: it cannot sacrifice pops).

## 审阅记录 Review notes

- 已核对：裂隙定义；1900–1960 全部事件；1915.b/1925.b 的 `on_roll_failed = astral_rift.1935`（`astral_rifts_1_events.txt:5054–5058, 5123–5127`）；1930 → 1940（2160 天）→ 1941 → 1945（每年）；1935 → 1950（360 天）→ 1955（360 天）→ 特质触发的 1960（每年）。
- 修正：编译图漏掉失败分支，1935/1950/1955 曾是独立故事；已用两条桥接并入，标注互斥。
- 不确定：荒野帝国探索时若失败后备 1935 无法触发，引擎如何处理未核实。

- Checked: rift definition; every event 1900–1960; `on_roll_failed = astral_rift.1935` of 1915.b/1925.b (`astral_rifts_1_events.txt:5054–5058, 5123–5127`); 1930 → 1940 (2160 days) → 1941 → 1945 (yearly); 1935 → 1950 (360 days) → 1955 (360 days) → trait-driven 1960 (yearly).
- Correction: the compiled graph missed the failure branch and 1935/1950/1955 had been a separate story; merged with two bridges and marked exclusive.
- Uncertain: what the engine does when fallback 1935 cannot fire for a Wilderness explorer was not verified.
