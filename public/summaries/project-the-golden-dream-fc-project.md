# 黄金之幻梦 / Golden Dream

- 分类 Category：深空异闻 Exploration (C3)
- 来源 Sources：`common/special_projects/04_projects_shroud.txt` · `events/shroud_events.txt` · `common/inline_scripts/shroud/minor_patron_first_contact_end_event.txt` · `common/patrons/patron_types.txt`
- 审阅 Review：2026-10-13（c3b-exploration）· 已审阅 Reviewed

## 如何开始 How it starts

- 次要赞助者“黄金之幻梦”的首次接触事件“虚境中的低语”（shroud.4090），由代码在虚境中自然发现时触发（common/patrons/patron_types.txt:1479），或经“虚境触及者”选项触发（须已接触全部主要赞助者）。  
  First-contact event "Whispers in the Shroud" (shroud.4090) of the minor patron "Golden Dream", launched by the game on natural discovery in the Shroud (common/patrons/patron_types.txt:1479) or by the Shroud-touched option (all major patrons must be contacted first).

## 剧情脉络 Story outline

- shroud.4090：单一选项“尝试沟通”按帝国类型启用机械版/蜂巢版/基础版接触项目（events/shroud_events.txt:8800，inline脚本minor_patron_first_contact_start_event）。  
  shroud.4090: the single option enables the robot / hive / base contact project by empire type (events/shroud_events.txt:8800, inline script minor_patron_first_contact_start_event).
- 项目成本5000（社会科技），无时限，完成后触发shroud.4095。  
  The project costs 5000 (society technology), has no time limit and fires shroud.4095 on completion.

## 分支与结局 Branches and outcomes

- shroud.4095仅一个选项，把接触状态记为completed。  
  shroud.4095 has a single option that sets the first-contact state to completed.
- 三个项目版本互斥，仅由帝国类型决定。  
  The three project versions are mutually exclusive and depend only on empire type.

## 条件与文明差异 Conditions and variants

- 无其他差异。  
  No other variants.

## 审阅记录 Review notes

- 已对照common/special_projects/04_projects_shroud.txt、events/shroud_events.txt与inline脚本minor_patron_first_contact_start/end_event。  
  Compared %s, %s and the minor_patron_first_contact_start/end_event inline scripts.
- 合并：原有的_HIVE与_ROBOT故事是同一接触项目的帝国类型版本，现并入本故事。  
  Merged: the former _HIVE and _ROBOT stories are the empire-type versions of the same contact project and are now part of this one story.
- 以起始事件为根并添加审阅连接。 项目标题使用游戏内的“未接触前代号”（如“Fathomless Being”），本故事标题使用赞助者名称。  
  The start event is the root, with reviewed bridges. Project titles use the in-game pre-contact code names (e.g. Fathomless Being); the story title uses the patron name.
- 覆盖 Coverage：全部5个文档（含机械/蜂巢版项目）。 / All 5 docs (including robot/hive project versions).
