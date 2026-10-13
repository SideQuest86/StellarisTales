# 反常情况 / Abnormal Conditions

- 分类 Category：深空异闻 Exploration (C3)
- 来源 Sources：`events/anomaly_events_4.txt:1087-1250` · `common/on_actions/00_on_actions.txt:1143-1144`
- 审阅 Review：2026-10-13（c3b-exploration）· 已审阅 Reviewed

## 如何开始 How it starts

- 每次调查行星(on_survey_planet)时触发：6660（有机帝国）与6661（机械帝国）是同一事件的两个版本，要求星球至少有一个修正、帝国尚未设discovered_modifier_planet旗标（common/on_actions/00_on_actions.txt:1143-1144）。  
  Fired on every planet survey (on_survey_planet): 6660 (non-machine) and 6661 (machine) are two versions of the same event; the planet needs at least one modifier and the empire must lack the discovered_modifier_planet flag (common/on_actions/00_on_actions.txt:1143-1144).

## 剧情脉络 Story outline

- 单一选项“有意思”，设旗标discovered_modifier_planet（每帝国一次）并给出提示；正文按行星修正（风暴、重力、磁场、野生动物等）切换。  
  A single option; it sets discovered_modifier_planet (once per empire) and the text switches on the planet modifier (storms, gravity, magnetism, wildlife, etc.).

## 分支与结局 Branches and outcomes

- 6660与6661互斥（机械/非机械）。  
  6660 and 6661 are exclusive (non-machine / machine).

## 条件与文明差异 Conditions and variants

- 机械帝国使用6661的专用措辞。  
  Machine empires get the dedicated wording of 6661.

## 审阅记录 Review notes

- 已对照两个事件原文与on_action。合并为一个故事，原event-anomaly-6661不再单独存在。  
  Compared both originals and the on_action. Merged into one story; event-anomaly-6661 no longer exists separately.
- 覆盖 Coverage：全部2个文档。 / All 2 docs.
