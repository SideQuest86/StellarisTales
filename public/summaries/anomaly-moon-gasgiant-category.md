# 潜力巨大的卫星 / Promising Moon

- 分类 Category：深空异闻 Exploration

## 如何开始 How it starts

没有战略资源的气态巨行星可能生成（1级，权重3，全局一次 max_once）。

Can spawn on a gas giant without a strategic resource (level 1, weight 3, once per game via max_once).

## 剧情脉络 Story outline

anomaly.340“珍宝卫星”（能量矿藏 d_energy_3 + precious_moon 修正）权重1；anomaly.6840“羊羊太少”基础权重0，仅当气态巨行星没有光环时 +10：选项a获得1200矿物并给行星添加光环；选项b改为 d_minerals_5 矿藏。

anomaly.340 "Precious Moon" (d_energy_3 deposit plus precious_moon modifier) has weight 1; anomaly.6840 "Too Few Sheep" has base weight 0 and +10 only if the gas giant has no ring: option a gives 1200 minerals and adds a ring; option b gives a d_minerals_5 deposit instead.

## 分支与结局 Branches and outcomes

两个结果互斥：有光环的巨行星只会得到 340；无光环时约 10/11 概率得到 6840、1/11 得到 340。

The results are exclusive: a ringed giant always gets 340; without a ring 6840 is about 10/11 and 340 about 1/11.

## 条件与文明差异 Conditions and variants

anomaly.340 的图片随生物舰船帝国变化。

anomaly.340's picture changes for bio-ship empires.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：common/anomalies/00_anomaly_categories.txt:229; events/anomaly_events_1.txt:4181 (anomaly.340); events/anomaly_events_4.txt:2814 (anomaly.6840)
已核对。草稿把 anomaly.6840 显示为 p=0.00*（基础权重），实际是按有无光环 +10 的权重，已用互斥组说明。

Checked. The draft shows anomaly.6840 as p=0.00* (its base weight); the real weight is +10 depending on the ring, documented with an exclusive group.
