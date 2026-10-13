# 宇宙污泥 / Cosmic Sludge

- 分类 Category：深空异闻 Exploration (C3)
- 来源 Sources：`common/anomalies/102_anomaly_categories_cosmic_storms.txt:265-278` · `events/cosmic_storms_events_1.txt:242-267` · `events/anomaly_events_cosmic_storms.txt`
- 审阅 Review：2026-10-13（c3b-exploration）· 已审阅 Reviewed

## 如何开始 How it starts

- 2级异常，每帝国一次，权重0；cstorms.10随机项，旗标spawned_STORMS_COSMIC_SLUDGE。  
  Level-2 anomaly, once per empire, weight 0; entry of cstorms.10, flag spawned_STORMS_COSMIC_SLUDGE.
- 风暴离开星系时（on_storm_left_system，common/on_actions/00_on_actions.txt:5421）随机事件：75%无事、5%隐藏事件cstorms.5、20%隐藏事件cstorms.10。  
  When a storm leaves a system (on_storm_left_system, common/on_actions/00_on_actions.txt:5421) a random event fires: 75% nothing, 5% hidden cstorms.5, 20% hidden cstorms.10.

## 剧情脉络 Story outline

- 单一结局cstorms.5060“宇宙淤泥”（研究）：a研究成分（风暴科技进度0.1，缺失科技时按顺序给风暴相关科技选项，否则月收益）；b分解（多种月资源）。随后清除风暴影响标记并触发cstorms.320。  
  Single outcome cstorms.5060 (research): a studies its composition (0.1 progress in the first storm technology not yet known, otherwise a monthly reward); b breaks it down (several monthly resources). Afterwards the affected-storm flag is cleared and cstorms.320 fires.

## 分支与结局 Branches and outcomes

- 两个选项互斥。  
  The two options are exclusive.

## 条件与文明差异 Conditions and variants

- 无特别差异。  
  No notable variants.

## 审阅记录 Review notes

- 已对照类别脚本、cstorms.10与5060。  
  Compared the category script, cstorms.10 and 5060.
- 覆盖 Coverage：全部2个文档。 / All 2 docs.
