# 与心声通灵 / Commune with the Voice

- 分类 Category：深空异闻 Exploration (C3)

## 如何开始 How it starts

- “终焉使者”(origin_endbringers)起源：突破虚境情境完成时，situation_event shroud.2840在after里启用本项目（赞助者end_of_the_cycle，events/shroud_situation_events.txt:4396-4439）。  
  Endbringers origin: when the Breach the Shroud situation completes, situation_event shroud.2840 enables this project in its after block (patron end_of_the_cycle; events/shroud_situation_events.txt:4396-4439).

## 剧情脉络 Story outline

- 项目开始时将endbringers_delve_count_variable置0；项目没有成本与on_success，其进度由事件手动处理（requirements: handled_by_event_tooltip）。每次虚境探索(on_shroud_delve)由shroud.8400增加计数，8410按计数1/2/3分别触发8420“沉默的试炼”/8430/8440；计数达3时项目中止(abort_trigger)。  
  On start the project sets endbringers_delve_count_variable to 0; it has no cost or on_success and is driven by events (requirements: handled_by_event_tooltip). Each Shroud delve (on_shroud_delve) raises the count in shroud.8400, and 8410 fires 8420 "The Trial of Silence" / 8430 / 8440 for counts 1 / 2 / 3; at 3 the project aborts (abort_trigger).

## 分支与结局 Branches and outcomes

- 具体的试炼与结局属于“终焉使者”起源故事（shroud.84xx），不在本项目故事内。  
  The trials and endings themselves belong to the Endbringers origin story (shroud.84xx), not this project story.

## 条件与文明差异 Conditions and variants

- 仅“终焉使者”起源。  
  Endbringers origin only.

## 审阅记录 Review notes

- 审阅 Review：2026-10-13（c3b-exploration）· 已审阅 Reviewed
- 来源 Sources：`common/special_projects/04_projects_shroud.txt` · `common/situations/13_shroud_situations.txt` · `events/shroud_situation_events.txt` · `events/origin_events_shadows_shroud.txt`
- 已对照项目脚本、shroud.2840与shroud.8400/8410。  
  Compared the project script, shroud.2840 and shroud.8400/8410.
- 单文档项目故事：未添加从shroud.2840的连接，否则会把本项目并入另一位审阅者的起源故事。见请求。  
  Single-doc project story: no bridge from shroud.2840 was added because it would absorb this project into another reviewer's origin story. See Requests.
- 覆盖 Coverage：全部1个文档（后续在起源故事中）。 / All 1 doc (continuation lives in the origin story).
