# 魂灵之月窠 / Cradle of Souls

- 分类 Category：深空异闻 Exploration (C3)
- 来源 Sources：`common/special_projects/04_projects_shroud.txt` · `events/shroud_events.txt` · `common/inline_scripts/shroud/major_patron_first_contact_end_event.txt` · `common/patrons/patron_types.txt`
- 审阅 Review：2026-10-13（c3b-exploration）· 已审阅 Reviewed

## 如何开始 How it starts

- 主要赞助者“魂灵之月窠”的首次接触事件（shroud.4010），在虚境中自然发现（挖掘/调谐）时由代码触发（common/patrons/patron_types.txt:316）。  
  First-contact event (shroud.4010) of the major patron "Cradle of Souls", launched by the game when it is discovered naturally in the Shroud (delving / attunement) (common/patrons/patron_types.txt:316).
- 也可来自“虚境触及者”接触选项：shroud_touched_patron_first_contact 在12位赞助者中等概率抽一位（已接触者权重为0，次要赞助者须先接触全部主要赞助者）(common/scripted_effects/shroud_shadows_scripted_effects.txt:4299)。  
  It can also come from the Shroud-touched contact option: shroud_touched_patron_first_contact picks one of 12 patrons with equal weight (weight 0 if already contacted; minor patrons need all major patrons contacted first) (common/scripted_effects/shroud_shadows_scripted_effects.txt:4299).

## 剧情脉络 Story outline

- shroud.4010“虚境住民”：单一选项“尝试沟通”启用接触项目；按帝国类型启用机械版/蜂巢版/基础版（events/shroud_events.txt:8356）。该事件还会累计旗标shroud_first_major_contact_1..4，影响正文。  
  shroud.4010 "A Presence in the Shroud": the single option starts the contact project; the robot / hive / base version is enabled by empire type (events/shroud_events.txt:8356). The event also counts shroud_first_major_contact_1..4, which changes its text.
- 项目成本5000（社会科技），无时限，完成后触发shroud.4015。  
  The project costs 5000 (society technology), has no time limit and fires shroud.4015 on completion.

## 分支与结局 Branches and outcomes

- shroud.4015有三个选项：接纳赞助者（获得最小量调谐值；对杀人狂帝国可能被封锁）、保持中立、拒绝（调谐值上限降至“第一盟约反向”门槛）。  
  shroud.4015 offers three options: embrace the patron (smallest attunement gain; blocked for homicidal empires where the block flag is set), stay neutral, or reject (attunement capped at the first-accord-anti level).
- 三个项目版本互斥，仅由帝国类型决定。  
  The three project versions are mutually exclusive and depend only on empire type.

## 条件与文明差异 Conditions and variants

- 正文随帝国类型（机械集群/个体机械/蜂巢/其他）变化。  
  End-event text varies with empire type (gestalt machine / individual machine / hive / default).

## 审阅记录 Review notes

- 已对照common/special_projects/04_projects_shroud.txt、events/shroud_events.txt、patron_types.txt和inline脚本major_patron_first_contact_start/end_event。  
  Compared common/special_projects/04_projects_shroud.txt, events/shroud_events.txt, patron_types.txt and the major_patron_first_contact_start/end_event inline scripts.
- 合并：原有的_HIVE与_ROBOT故事是同一接触项目的帝国类型版本，现并入本故事（不再是三个重复故事）。  
  Merged: the former _HIVE and _ROBOT stories are the empire-type versions of the same contact project and are now part of this one story.
- 以起始事件为根，添加了“尝试沟通→项目”的审阅连接（inline脚本中的enable_patron_first_contact_project调用调用图看不到）。  
  The start event is now the root, with reviewed bridges from the "commune" option to the projects (enable_patron_first_contact_project inside an inline script is invisible to the call graph).
- 覆盖 Coverage：全部5个文档（含机械/蜂巢版项目）。 / All 5 docs (including robot/hive project versions).
