# 大气风暴 / Atmospheric Storms

- 分类 Category：深空异闻 Exploration

## 如何开始 How it starts

气态巨行星可能生成（1级，权重3）。

Can spawn on a gas giant (level 1, weight 3).

## 剧情脉络 Story outline

anomaly.330“究极风暴”权重1：d_physics_3 矿藏与 extreme_storms 修正。anomaly.6855“肉眼捕捉”基础权重0，仅当帝国拥有多于1艘科学船时 +1：发现船被困并停用、其领袖被放逐；选项a启用项目 RESCUE_STORM“解救”（需要2艘科学船和科学家，180天），完成后 anomaly.6860“涨落的护盾频率”（领袖复归并获得“场操纵”专精、d_energy_6 矿藏、每月物理研究加成）；选项b摧毁该舰队，获得 d_physics_7 矿藏。

anomaly.330 "Extreme Storms" has weight 1: d_physics_3 deposit plus the extreme_storms modifier. anomaly.6855 "Caught in the Eye" has base weight 0 and +1 only if the empire owns more than one science ship: the finding ship is trapped and disabled and its leader exiled; option a enables project RESCUE_STORM (two science ships and a scientist, 180 days), after which anomaly.6860 "Fluctuating Shield Frequencies" returns the leader with a field-manipulation expertise, a d_energy_6 deposit and monthly physics research; option b destroys the fleet and gives a d_physics_7 deposit.

## 分支与结局 Branches and outcomes

两个起始结果互斥；科学船不足2艘时只会得到 330，否则各50%。选项a/b是营救或牺牲的二选一。

The two starting results are exclusive; with fewer than two science ships only 330, otherwise 50% each. Options a/b are rescue or sacrifice.

## 条件与文明差异 Conditions and variants

anomaly.6855 的描述按集体意识/常规帝国与生物舰船变化；6860 对集体意识帝国改为授予认知议员。

anomaly.6855's description varies by gestalt status and bio ships; 6860 gives gestalt empires the expertise through a cognitive councilor.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：common/anomalies/00_anomaly_categories.txt:279; events/anomaly_events_1.txt:4114 (anomaly.330); events/anomaly_events_4.txt:2972 (anomaly.6855); common/special_projects/00_projects_3.txt (RESCUE_STORM); events/anomaly_events_4.txt:3022 (anomaly.6860)
已核对。草稿将 anomaly.6855 显示为 p=0.00*（基础权重），实为取决于科学船数量的条件权重，已用互斥组说明。

Checked. The draft shows anomaly.6855 as p=0.00* (its base weight); the real weight depends on the science-ship count, documented with an exclusive group.
