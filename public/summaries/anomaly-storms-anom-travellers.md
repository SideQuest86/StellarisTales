# 余波求助信号 / Aftermath Distress Signal

- 分类 Category：深空异闻 Exploration (C3)

## 如何开始 How it starts

- 2级异常，每帝国一次，权重0；cstorms.10随机项（基础0，有无异常恒星+1，旗标spawned_STORMS_ANOM_TRAVELLERS）。  
  Level-2 anomaly, once per empire, weight 0; entry of cstorms.10 (base 0, +1 with an anomaly-free star, flag spawned_STORMS_ANOM_TRAVELLERS).
- 风暴离开星系时（on_storm_left_system，common/on_actions/00_on_actions.txt:5421）随机事件：75%无事、5%隐藏事件cstorms.5、20%隐藏事件cstorms.10。  
  When a storm leaves a system (on_storm_left_system, common/on_actions/00_on_actions.txt:5421) a random event fires: 75% nothing, 5% hidden cstorms.5, 20% hidden cstorms.10.

## 剧情脉络 Story outline

- 单一结局cstorms.5050“流离的旅人”（研究）：a帮助（需合金≥100，非杀人狂；消耗100合金，换取每月资源，进化捕食者另得DNA）；b祝好运（非杀人狂）；c.genocide夺取性命与货物（非亲外且非吞噬蜂群）；d.devouring_swarm吞食（吞噬蜂群）。  
  Single outcome cstorms.5050 (research): a helps (alloys >= 100, not homicidal; costs 100 alloys for monthly resources, plus DNA for Evolutionary Predators); b wishes them luck (not homicidal); c.genocide takes lives and cargo (not xenophile, not devouring swarm); d.devouring_swarm devours them.

## 分支与结局 Branches and outcomes

- 选项由伦理、民间和起源门控，互斥。  
  Options are gated by ethics, civics and origin and are exclusive.

## 条件与文明差异 Conditions and variants

- 吞噬蜂群/杀人狂有专属选项。  
  Devouring swarm and homicidal empires have dedicated options.

## 审阅记录 Review notes

- 审阅 Review：2026-10-13（c3b-exploration）· 已审阅 Reviewed
- 来源 Sources：`common/anomalies/102_anomaly_categories_cosmic_storms.txt:249-262` · `events/cosmic_storms_events_1.txt:216-241` · `events/anomaly_events_cosmic_storms.txt`
- 已对照类别脚本、cstorms.10与5050。  
  Compared the category script, cstorms.10 and 5050.
- 覆盖 Coverage：全部2个文档。 / All 2 docs.
