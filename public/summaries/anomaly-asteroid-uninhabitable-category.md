# 轨道小行星 / Asteroid in Orbit

- 分类 Category：深空异闻 Exploration

## 如何开始 How it starts

不宜居的普通星球（非卫星）可能生成（1级，权重3）。

Can spawn on a regular uninhabitable planet, not a moon (level 1, weight 3).

## 剧情脉络 Story outline

anomaly.660“被牵引的小行星”（工程矿藏 d_engineering_3 + towed_asteroid 修正；若所在星球已有战略资源则权重为0）与 anomaly.6875“便利的采矿”（在系统中生成晶体小行星并设置稀有水晶矿藏 d_rare_crystals_2，首次发现时给出战略资源提示）。

anomaly.660 "Towed Asteroid" (d_engineering_3 deposit plus the towed_asteroid modifier; weight 0 if the planet has a strategic resource) and anomaly.6875 "Convenient Mining" (spawns a crystal asteroid in the system with a d_rare_crystals_2 deposit and a first-find strategic-resource message).

## 分支与结局 Branches and outcomes

两个结果互斥（各50%；有战略资源时只会得到 6875）。

The results are exclusive (50% each; with a strategic resource only 6875).

## 条件与文明差异 Conditions and variants

anomaly.660 的第二个选项仅限岩石类（Lithoid）起源（asteroid_thrusters 修正）。

anomaly.660 has a second option only for the Lithoid origin (asteroid_thrusters modifier).

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：common/anomalies/00_anomaly_categories.txt:461; events/anomaly_events_1.txt:4577 (anomaly.660); events/anomaly_events_4.txt:3124 (anomaly.6875)
已核对异常与两个事件；编译树正确（p=0.50* 即因战略资源条件而被修改的权重）。

Checked the anomaly and both events; the compiled tree is correct (p=0.50* is the weight modified by the strategic-resource condition).
