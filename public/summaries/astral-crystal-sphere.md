# 水晶球体 / The Crystal Sphere

- 分类 Category：星界裂隙 Astral rifts (C4) · DLC：星界位面 Astral Planes
- 来源 Sources：`events/astral_planes_events.txt:744–1065`；`events/astral_planes_situation_events.txt:1–76`；`common/situations/06_astral_planes_situations.txt:150–355`
- 审阅 Reviewed：2026-10-13（全篇 whole story；原先的触发器故事 10、25、35 已并入 / the former trigger stories merged in）

## 如何开始 How it starts

每年脉冲检查 `astral_planes.10`（`on_yearly_pulse`，`00_on_actions.txt:257`）：游戏进入中期一年以上，且至少一个国家完成了 5 次裂隙探索时，从已有“裂隙探球”并完成 ≥3 次探索的国家里挑选完成探索最多者（每国有随机骰：裂隙世界起源减半，AI 加倍），把一个水晶球体送到它最靠近首都、没有天然虫洞的星系（游牧帝国：己方航站所在星系）。全局标记 `crystal_sphere_sent` 保证只送一次。10 天 + 最多 350 天后触发 `astral_planes.15`。

Yearly check `astral_planes.10`: over a year into mid-game and at least one country has completed 5 rift explorations; among countries with the Rift Sphere technology and ≥3 completed explorations the one with the most is chosen (a per-country random roll, halved for Riftworld and doubled for AI), and a Crystal Sphere is placed in its system closest to the capital that has no natural wormhole (nomads: the system of an owned waystation). Global flag `crystal_sphere_sent` makes it happen only once. `astral_planes.15` fires 10 days plus up to 350 days later.

## 剧情脉络 Story outline

1. 水晶球体（15）：球体出现在轨道上，可能危险也可能蕴含维度旅行的线索。选择研究（→ 情境“研究水晶球体”）或摧毁（→ 情境“摧毁水晶球体”）。
2. 两个情境各有 100 进度的一个阶段，需要科技“裂隙探球”才有进度（否则乘数为 0）；方法可选（观察 / 常规研究 / 星界丝缕法；机械搅动 / 星界法）。
3. 研究完成 → `astral_situation.5` “研究结束”：球体消失，原地生成晶体裂隙（见《晶体裂隙》）。摧毁完成 → `astral_situation.1`：球体被打碎。
4. 若水晶球所在星系易手：旧主人得 `20`（标记 `has_lost_crystal_sphere`，情境中止），新主人得 `25`：有裂隙探球则直接 15，否则 `30` “奇怪的球体”，之后研究出探球时 `35` 再触发 15。

1. The Crystal Sphere (15): a sphere arrives in orbit, possibly dangerous, possibly a key to dimensional travel. Choose to study it (→ situation “Study the Crystal Sphere”) or destroy it (→ situation “Destroy the Crystal Sphere”).
2. Each situation has one 100-progress stage and makes no progress without the Rift Sphere technology; the method is selectable (observe / mundane / astral-thread method; mechanical agitation / astral method).
3. Study complete → `astral_situation.5` “The Study Is Over”: the sphere vanishes and the Crystal Rift appears (see “The Crystal Rift”). Destroy complete → `astral_situation.1`: the sphere is shattered.
4. If the sphere's system changes hands, the old owner gets `20` (flag `has_lost_crystal_sphere`, the situation aborts) and the new owner `25`: with the Rift Sphere technology 15 at once, else `30` “A Strange Sphere”, and `35` fires 15 once the technology is researched.

## 分支与结局 Branches and outcomes

- 研究：生成晶体裂隙，可继续探索（能打开通往“形态之物”的虫洞，或封印它）。
- 摧毁：100 星界丝缕、500 稀有水晶、500 奇异气体、修正 `destroy_sphere_modifier`（3600 天）、标本“水晶球体碎片”；排外或狂暴灭绝者另得凝聚力。

- Study: the Crystal Rift appears and can be explored (it can open a wormhole to the Formless, or seal it).
- Destroy: 100 astral threads, 500 rare crystals, 500 exotic gases, modifier `destroy_sphere_modifier` (3600 days), the specimen “crystal sphere fragments”; xenophobes and homicidal empires also get unity.

## 条件与文明差异 Conditions and variants

- 15 的正文有三种：初始、通过 25 取得、延迟取得；AI 偏好：唯灵者与裂隙世界起源倾向研究，排外 / 狂暴灭绝者倾向摧毁。
- 裂隙世界起源与 AI 的随机骰有修正，影响谁得到球体。

- Three texts for 15: initial, acquired via 25, acquired late; AI preference: spiritualists and Riftworld lean to study, xenophobes and homicidal empires lean to destroy.
- Riftworld and AI modify the random roll deciding who receives the sphere.

## 审阅记录 Review notes

- 已核对：10/15/20/25/30/35，两个情境，`astral_situation.1/5`，相关 `on_actions`。更正：三个触发器被当作独立故事（10、25、35）；已合并，并补桥接 30 → 15 与 5 → 晶体裂隙。
- 不确定：随机骰的比较式按字面转述（`astral_planes.10:792–802`）。

- Checked: 10/15/20/25/30/35, both situations, `astral_situation.1/5` and the related `on_actions`. Correction: three trigger events (10, 25, 35) were separate stories; merged, with bridges 30 → 15 and 5 → the Crystal Rift.
- Uncertain: the roll comparison is paraphrased literally (`astral_planes.10:792–802`).
