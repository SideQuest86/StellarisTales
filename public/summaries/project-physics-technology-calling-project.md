# 知识的召唤 / Calling of Knowledge

- 分类 Category：深空异闻 Exploration (C3)

## 如何开始 How it starts

- 赞助者“召唤”之一calling_research_special_project（第3阶，需要对应调谐值）开始时，随机启用三个“知识的召唤”项目之一（物理/社会/工程各33%）(common/patrons/callings/00_callings.txt:518-549)。  
  Started by the patron calling calling_research_special_project (tier 3, needs the attunement level): one of the three Calling of Knowledge projects is enabled at random (physics / society / engineering, 33% each) (common/patrons/callings/00_callings.txt:518-549).

## 剧情脉络 Story outline

- 三个项目内容相同（成本10000，无时限，仅研究部门不同，common/inline_scripts/shroud/patron_calling_special_project.txt）；完成后给召唤计数器po_research_project +1，从而完成该召唤。召唤被撤销时项目被中止(:551-)。  
  The three projects are identical apart from the research department (cost 10000, no time limit; inline script patron_calling_special_project.txt); completion adds 1 to the calling counter po_research_project, completing the calling. Dismissing the calling aborts the project (:551-).
- 另有隐藏事件shroud.10040：完成任意有研究成本的特殊项目也会给同一计数器+1（events/shroud_events.txt:16486-16501）。  
  A separate hidden event shroud.10040 also adds 1 to the same counter when any special project with a research cost is completed (events/shroud_events.txt:16486-16501).

## 分支与结局 Branches and outcomes

- 三个项目互斥（随机三选一）。  
  The three projects are mutually exclusive (random pick).

## 条件与文明差异 Conditions and variants

- 需要暗影虚境DLC的赞助者系统。  
  Requires the Shroud patron system.

## 审阅记录 Review notes

- 审阅 Review：2026-10-13（c3b-exploration）· 已审阅 Reviewed
- 来源 Sources：`common/special_projects/04_projects_shroud.txt` · `common/patrons/callings/00_callings.txt` · `common/inline_scripts/shroud/patron_calling_special_project.txt` · `events/shroud_events.txt`
- 已对照三个项目脚本、inline脚本与召唤定义。三个文档是同一机制的三个变体，不是连续剧情。  
  Compared the three project scripts, the inline script and the calling definition. The three docs are variants of one mechanism, not a sequence.
- 覆盖 Coverage：全部3个文档。 / All 3 docs.
