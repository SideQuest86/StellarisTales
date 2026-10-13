# 生命迹象 / Life Signs

- 分类 Category：深空异闻 Exploration · 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：common/anomalies/00_anomaly_categories.txt:257; events/anomaly_events_1.txt:3871 (anomaly.300); events/anomaly_events_4.txt:2851 (anomaly.6845); common/special_projects/00_projects_3.txt (GAS_RESTORATION); events/anomaly_events_4.txt:2914 (anomaly.6850)

## 如何开始 How it starts

没有战略资源的气态巨行星可能生成（2级，权重3，全局一次 max_once）。

Can spawn on a gas giant without a strategic resource (level 2, weight 3, once per game via max_once).

## 剧情脉络 Story outline

两个结果各占50%。anomaly.300“大气层生态系统”：d_society_3 矿藏与 atmospheric_ecosystem 修正（并设置标志 atmoseco_divination_flag）。anomaly.6845“连锁灾难”：清除矿藏；不重视他人的帝国可直接获得社会研究加成；除非既不友善又排外，其他帝国可启用项目 GAS_RESTORATION（费用2000，科学船+科学家），完成后 anomaly.6850“反转深度扫描极性”：每月社会研究加成与 d_society_6 矿藏，并把 gas_cascade_sad 改为 gas_cascade_happy（5年）。

Two results, 50% each. anomaly.300 "Atmospheric Ecosystem": d_society_3 deposit plus atmospheric_ecosystem (and flag atmoseco_divination_flag). anomaly.6845 "Cascading Catastrophe": deposits cleared; empires that do not value others may take a research bonus directly; unless both unfriendly and xenophobe, others can enable project GAS_RESTORATION (cost 2000, science ship and scientist), after which anomaly.6850 "Reversing Deep Scan Polarities" gives monthly society research and a d_society_6 deposit and turns gas_cascade_sad into gas_cascade_happy (5 years).

## 分支与结局 Branches and outcomes

两个起始结果互斥；6845 的选项（直接奖励或启用项目）按 values_others 与友善/排外状态决定。

The two starting results are exclusive; 6845's options (direct reward or the project) depend on values_others and the unfriendly/xenophobe status.

## 条件与文明差异 Conditions and variants

anomaly.6845 / 6850 的描述与选项按 values_others 变化。

anomaly.6845 / 6850 descriptions and options vary with values_others.

## 审阅记录 Review notes

已核对异常定义、项目与全部结果事件；编译树正确，无需改动。

Checked the anomaly definition, the project and every outcome event; the compiled tree is correct, no change needed.
