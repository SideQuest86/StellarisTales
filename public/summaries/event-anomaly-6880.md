# 无法解释的旋转 / Unexplainable Rotations

- 分类 Category：深空异闻 Exploration (C3)

## 如何开始 How it starts

- 沉睡水晶小行星（行星旗标sleeping_crystal，anomaly_events_4.txt:3141）上首次建成采矿站时6880触发（仅一次）。  
  Fires (once) when the first mining station is finished on a sleeping-crystal asteroid (planet flag sleeping_crystal, anomaly_events_4.txt:3141).

## 剧情脉络 Story outline

- 6880：a拿矿（+100矿物，d_rare_crystals_4，拆除采矿站）；b研究→项目STUDY_SLEEPING_CRYSTAL→6890“沉睡水晶巢”（d_society_5、晶体装甲科技进度）。不论选项，事件后旗标由sleeping_crystal变为annoyed_crystal。  
  6880: a takes the ore (+100 minerals, d_rare_crystals_4, station dismantled); b studies it → project STUDY_SLEEPING_CRYSTAL → 6890 (d_society_5, crystal armour progress). Either way the flag changes from sleeping_crystal to annoyed_crystal afterwards.
- 之后若再次在该星体建采矿站，6885触发（仅一次）：生成敌对水晶实体舰队。  
  If a mining station is built there again, 6885 fires (once) and spawns a hostile crystalline entity fleet.

## 分支与结局 Branches and outcomes

- 6880的a/b互斥；6885是两者之后的可能后果。  
  a/b of 6880 are exclusive; 6885 is a possible consequence after either.

## 条件与文明差异 Conditions and variants

- 无特别差异。  
  No notable variants.

## 审阅记录 Review notes

- 审阅 Review：2026-10-13（c3b-exploration）· 已审阅 Reviewed
- 来源 Sources：`events/anomaly_events_4.txt:3130-3300` · `common/on_actions/00_on_actions.txt:1873-1887` · `common/special_projects/00_projects_3.txt:1533`
- 已对照原文。合并：原event-anomaly-6885并入。  
  Compared the originals. Merged: former event-anomaly-6885 is part of this story.
- 覆盖 Coverage：全部4个文档。 / All 4 docs.
