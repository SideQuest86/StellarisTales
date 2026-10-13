# 古都遗址 / Ancient Capital Site

- 分类 Category：先驱者与考古 Precursors · 来源 Sources：common/archaeological_site_types/00_base_game_arc_sites.txt:532；events/arcsite_events.txt:1500 · DLC：基础游戏 Base game（遗址定义与事件 arcsite_events） · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

随机遗址：勘察时按权重抽取，权重+15，出现在可居住星球上（common/archaeological_site_types/00_base_game_arc_sites.txt:532）。

A random site: drawn by weight on survey, +15 on habitable planets (common/archaeological_site_types/00_base_game_arc_sites.txt:532).

## 剧情脉络 Story outline

一个有鸟类形态的跨维度难民文明“克拉祖拉”的古都。它们在“大厅”里建成了围绕传送门的空间；第二阶段设置标志 found_skravird。

1. 破碎巢穴：破碎的巢穴：鸟类外形的克拉祖拉人，毁灭于五十多万年前
2. 裂隙残留：围绕传送门建造的巨大“大厅”；设置 found_skravird（星界丝线小奖励）
3. 开了眼了：“开了眼”：克拉祖拉人并非本维度原生，其最高领袖“雅库拉”转世
4. 威胁者：黄金时代之后，一个执着于毁灭他们的敌人出现
5. 最后一次迁徙：传奇海军上将带队冒险穿过未经测试的门户，下落不明

The ancient capital of the Krazura, an avian civilisation of dimensional refugees, built around a portal in a vast Grand Hall. The second stage sets the country flag found_skravird.

1. Broken Nest: broken nest: the avian Krazura, destroyed over half a million years ago
2. Rift Remnants: rift remnants: the Grand Hall built around a portal; sets found_skravird (a small astral-thread reward)
3. Open Eyes: the Krazura were not native; their leader the Yakura reincarnated
4. The Menace: after a golden age, a foe obsessed with their destruction appeared
5. The Last Migration: the legendary Admiral's flagship entered an untested Gateway and was never seen again

## 分支与结局 Branches and outcomes

- 3030 同时把星球改名为斯克兰德星（NAME_Skrand_Planet）并设置 found_skravird；若帝国拥有带 skrand 标志的领袖（克拉祖拉上将斯克兰德），30天（±5）后触发 arcsite.3031“无巢如家”：上将感谢你找到故乡，并获得800经验。 / arcsite.3030 renames the planet (NAME_Skrand_Planet) and sets found_skravird; if the empire owns a leader with the flag skrand (the Krazura admiral Skrand), arcsite.3031 "No Nest Like Home" fires 30 days (+-5) later and gives him 800 experience.
- 专属池 site_krazura_random_events：不祥之鸟3055（权重80）与坏羽病3060（权重20，禽类帝国×50）。 / Own pool site_krazura_random_events: Baleful Bird 3055 (weight 80) and Feather Rot 3060 (weight 20, x50 for avian empires).

## 条件与文明差异 Conditions and variants

- 坏羽病3060对禽类物种的帝国有不同回应。 / Feather Rot 3060 has different answers for avian species.
- 3035 对演化猎手有额外选项。 / 3035 has an extra option for Evolutionary Predators.
- 掷骰失败时使用本遗址专属的事件池 site_krazura_random_events。 / Failed rolls draw from this site's own pool site_krazura_random_events.

## 审阅记录 Review notes

- 已核对：遗址定义（common/archaeological_site_types/00_base_game_arc_sites.txt:532）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/00_base_game_arc_sites.txt:532) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
