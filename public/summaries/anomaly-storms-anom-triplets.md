# 小行星三姊妹 / Asteroid Triplets

- 分类 Category：深空异闻 Exploration (C3)
- 来源 Sources：`common/anomalies/102_anomaly_categories_cosmic_storms.txt:233-246` · `events/cosmic_storms_events_1.txt:177-213` · `events/anomaly_events_cosmic_storms.txt`
- 审阅 Review：2026-10-13（c3b-exploration）· 已审阅 Reviewed

## 如何开始 How it starts

- 2级异常，每帝国一次，权重1的cstorms.10随机项：旗标spawned_STORMS_ANOM_TRIPLETS，在系统里生成2颗冰小行星和1颗水晶小行星（旗标asteroid_triplet），并给其中一个添加异常。  
  Level-2 anomaly, once per empire, weight-1 entry of cstorms.10: flag spawned_STORMS_ANOM_TRIPLETS; spawns 2 ice asteroids and 1 crystal asteroid (flag asteroid_triplet) and adds the anomaly to one of them.
- 风暴离开星系时（on_storm_left_system，common/on_actions/00_on_actions.txt:5421）随机事件：75%无事、5%隐藏事件cstorms.5、20%隐藏事件cstorms.10。  
  When a storm leaves a system (on_storm_left_system, common/on_actions/00_on_actions.txt:5421) a random event fires: 75% nothing, 5% hidden cstorms.5, 20% hidden cstorms.10.

## 剧情脉络 Story outline

- 单一结局cstorms.5040“小行星三胞胎”（研究）：若星系有轨道电弧炉巨构，则给三颗小行星相应修正；选项给冰小行星d_energy_2、水晶小行星d_rare_crystals_1。  
  Single outcome cstorms.5040 (research): if the system has an orbital arc furnace the three asteroids get its modifier; the option places d_energy_2 on ice and d_rare_crystals_1 on crystal asteroids.

## 分支与结局 Branches and outcomes

- 线性。  
  Linear.

## 条件与文明差异 Conditions and variants

- 与电弧炉巨构（Arc Furnace）联动。  
  Interacts with the orbital arc furnace megastructure.

## 审阅记录 Review notes

- 已对照类别脚本、cstorms.10与5040。  
  Compared the category script, cstorms.10 and 5040.
- 覆盖 Coverage：全部2个文档。 / All 2 docs.
