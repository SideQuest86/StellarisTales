# 走失的缇扬奇 / Displaced Tiyanki

- 分类 Category：深空异闻 Exploration (C3)
- 来源 Sources：`common/anomalies/102_anomaly_categories_cosmic_storms.txt:312-324` · `events/anomaly_events_cosmic_storms.txt` · `events/cosmic_storms_events_1.txt:336-372`
- 审阅 Review：2026-10-13（c3b-exploration）· 已审阅 Reviewed

## 如何开始 How it starts

- 2级异常，全局一次，权重0（只由隐藏事件cstorms.10添加）。cstorms.10的随机列表中该项权重+1的条件：恒星无异常，且已与提亚南卫队/提亚南国家建立联系；每帝国只触发一次（旗标spawned_STORMS_DISPLACED_TIYANKI）。  
  Level-2 anomaly, once per galaxy, weight 0 (added only by hidden cstorms.10). In its random list this entry gets +1 when a star without an anomaly exists and the owner has contact with the Tiyanki garrison / Tiyanki country; once per empire (flag spawned_STORMS_DISPLACED_TIYANKI).
- 风暴离开星系时（on_storm_left_system，common/on_actions/00_on_actions.txt:5421）随机事件：75%无事、5%隐藏事件cstorms.5、20%隐藏事件cstorms.10。  
  When a storm leaves a system (on_storm_left_system, common/on_actions/00_on_actions.txt:5421) a random event fires: 75% nothing, 5% hidden cstorms.5, 20% hidden cstorms.10.

## 剧情脉络 Story outline

- 单一结局cstorms.5090“流离的提亚南”（研究）：a“放大它们的信号”（非终结者/净化者）生成3只幼崽舰队并启用REUNITE_POD_PROJECT→cstorms.5095“提亚南团聚”；b“自然残酷”（群体吞噬蜂群有专文）；c需要大档案馆DLC与引力井科技，收入3只提亚南幼崽到饲养场。  
  Single outcome cstorms.5090 (research): a "boost their signal" (not purifiers / terminators) spawns a fleet of three calves and enables REUNITE_POD_PROJECT → cstorms.5095 "Tiyanki Reunited"; b "nature is cruel" (devouring swarm has its own text); c (Grand Archive DLC and gravity wells) adds the three calves to the vivarium.

## 分支与结局 Branches and outcomes

- 三个选项互斥；只有a带来项目与5095的多种资源奖励。  
  The three options are exclusive; only a leads to the project and the 5095 resource reward.

## 条件与文明差异 Conditions and variants

- 吞噬蜂群/终结者文明有不同选项文案。  
  Devouring swarm and terminator civilizations get different option wording.

## 审阅记录 Review notes

- 已对照类别脚本、cstorms.5/10随机列表与5090/5095。  
  Compared the category script, the random list of cstorms.5/10 and 5090/5095.
- 覆盖 Coverage：全部4个文档。 / All 4 docs.
