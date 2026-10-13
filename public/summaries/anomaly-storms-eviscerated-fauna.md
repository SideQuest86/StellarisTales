# 异物 / Foreign Object

- 分类 Category：深空异闻 Exploration (C3)
- 来源 Sources：`common/anomalies/102_anomaly_categories_cosmic_storms.txt:297-309` · `events/anomaly_events_cosmic_storms.txt` · `events/cosmic_storms_events_1.txt:300-335`
- 审阅 Review：2026-10-13（c3b-exploration）· 已审阅 Reviewed

## 如何开始 How it starts

- 2级异常，全局一次，权重0；由隐藏事件cstorms.10的随机项添加（同时在恒星处创建死亡提亚南环境物体，旗标spawned_STORMS_EVISCERATED_FAUNA），ST5。  
  Level-2 anomaly, once per galaxy, weight 0; added by an entry of hidden cstorms.10 (which also creates a dead-Tiyanki ambient object at the star; flag spawned_STORMS_EVISCERATED_FAUNA).
- 风暴离开星系时（on_storm_left_system，common/on_actions/00_on_actions.txt:5421）随机事件：75%无事、5%隐藏事件cstorms.5、20%隐藏事件cstorms.10。  
  When a storm leaves a system (on_storm_left_system, common/on_actions/00_on_actions.txt:5421) a random event fires: 75% nothing, 5% hidden cstorms.5, 20% hidden cstorms.10.

## 剧情脉络 Story outline

- 单一结局cstorms.5080“有机残骸”（研究）：a（仅吞噬蜂群）获得食物；b（其他）启用FORENSIC_DISSECTION_PROJECT→cstorms.5085（风暴科技进度/社会研究）；c（其他）直接获得社会研究并销毁残骸。  
  Single outcome cstorms.5080 (research): a (devouring swarm only) food; b (others) enables FORENSIC_DISSECTION_PROJECT → cstorms.5085 (storm-tech progress / society research); c (others) society research and the remains are destroyed.

## 分支与结局 Branches and outcomes

- 三个选项互斥。  
  The three options are exclusive.

## 条件与文明差异 Conditions and variants

- 蜂群有专门文案；进化捕食者起源在5085有evopred选项。  
  Swarm has its own text; Evolutionary Predators has an evopred option in 5085.

## 审阅记录 Review notes

- 已对照类别脚本、cstorms.10条目与5080/5085。  
  Compared the category script, the cstorms.10 entry and 5080/5085.
- 覆盖 Coverage：全部4个文档。 / All 4 docs.
