# 太空碎片 / Space Debris

- 分类 Category：深空异闻 Exploration · DLC：《遥远繁星》Distant Stars（仅 distar.1055 分支 only the distar.1055 branch）

## 如何开始 How it starts

没有战略资源的气态巨行星可能生成（1级，权重3）。

Can spawn on a gas giant without a strategic resource (level 1, weight 3).

## 剧情脉络 Story outline

anomaly.320“残骸场”权重1：d_minerals_3 矿藏与 debris_field 修正。distar.1055“方块”基础权重0，仅当银河中存在人类（太阳系标志 com_sol / nuked_sol 或国家标志 human_1 / humans_early_space_age），且发现者不是人类预设帝国或人类物种时 +1：选项a启用项目 THE_CUBE（科学船+科学家，60天），完成后触发 distar.1056“切割”（科学官获得“狂躁”特质）；选项b放弃。

anomaly.320 "Debris Field" has weight 1: a d_minerals_3 deposit plus the debris_field modifier. distar.1055 "The Cube" has base weight 0 and +1 only if humans exist in the galaxy (system flag com_sol / nuked_sol or country flag human_1 / humans_early_space_age) and the finder is neither a human prescripted empire nor of the human species: option a enables project THE_CUBE (science ship and scientist, 60 days), whose completion fires distar.1056 "Slice and Dice" (the science officer gains the maniacal trait); option b declines.

## 分支与结局 Branches and outcomes

两个起始结果互斥；满足条件时各50%，否则只会得到 anomaly.320。

The two starting results are exclusive; 50% each when the condition holds, otherwise only anomaly.320.

## 条件与文明差异 Conditions and variants

distar.1055 取决于银河中是否存在人类；发现者为人类时不会出现。

distar.1055 depends on humans existing in the galaxy; it cannot appear for human finders.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：common/anomalies/00_anomaly_categories.txt:347; events/distant_stars_events_2.txt:2283 (distar.1055); common/special_projects/00_projects_distant_stars.txt (THE_CUBE); events/distant_stars_events_2.txt:2315 (distar.1056); events/anomaly_events_1.txt:4049 (anomaly.320)
已核对。草稿将 distar.1055 显示为 p=0.00*（基础权重），实际取决于人类是否存在，已用互斥组说明。

Checked. The draft shows distar.1055 as p=0.00* (its base weight); the real weight depends on whether humans exist, documented with an exclusive group.
