# 矿群 / Mineral Cluster

- 分类 Category：深空异闻 Exploration (C3)

## 如何开始 How it starts

- 小行星带上的3级异常，生成权重3；完成后只触发一个结局（类似随机列表，每个结局对同一帝国默认只出现一次）。  
  Level-3 anomaly on asteroids, spawn weight 3; on completion exactly one outcome fires (like a random list; each outcome defaults to once per empire).

## 剧情脉络 Story outline

- 四个结局：3000“低级错误”（基础权重0，领队没有粗心/严谨特质时+1）、3005“金色牢笼”（基础0，领队没有任何专长特质时+1）、3010“晶体抄本”（权重1，研究型）、3085“君主论”（基础0，已联系且非排外、非群体意识的AI帝国存在时+1）。  
  Four outcomes: 3000 (base 0, +1 if the leader has neither carefree nor meticulous trait), 3005 (base 0, +1 if the leader has no expertise trait), 3010 (weight 1, research outcome) and 3085 (base 0, +1 if a contacted, non-xenophobe, non-gestalt AI empire exists).
- 3010→晶体抄本项目→3012：给社会研究月收益和统御专长。3085→“君主论”项目→3086：选择a获得影响力并持有标本；b（非极端排外/终结者/净化者）归还→3087得能量币与好感；c（排外/终结者/净化者或好感<11）嘲讽→3088→3089得“焚书者”负面好感。  
  3010 leads to the Crystal Codex project and 3012 (society research plus statecraft expertise). 3085 leads to The Prince project and 3086: option a keeps the book for influence; b (not fanatic xenophobe/terminator/purifier) returns it via 3087 for energy and opinion; c (xenophobe/terminator/purifier or opinion below 11) insults the author via 3088 and 3089, giving the book-burner opinion malus.

## 分支与结局 Branches and outcomes

- 结局互斥；3000、3005为一次性小事件（矿物收益加领袖特质/经验）。  
  Outcomes are mutually exclusive; 3000 and 3005 are one-off events (minerals plus a leader trait or experience).

## 条件与文明差异 Conditions and variants

- 3085的作者国家由3086的immediate在已联系AI国中随机选定；选项b/c由伦理与好感门控。  
  The book writer in 3085-3089 is a random contacted AI empire chosen in 3086 immediate; options b/c are gated by ethics and opinion.

## 审阅记录 Review notes

- 审阅 Review：2026-10-13（c3b-exploration）· 已审阅 Reviewed
- 来源 Sources：`common/anomalies/01_anomaly_categories.txt:838-930` · `events/anomaly_events_2.txt` · `common/special_projects/`
- 已对照类别脚本838-930与events/anomaly_events_2.txt中3000/3012/3086-3089的原文。  
  Compared category script 838-930 and the originals of 3000, 3012, 3086-3089.
- story.5为共享联络报告枢纽，不属于本故事。  
  story.5 is a shared contact-report hub, not part of this story.
- 覆盖 Coverage：全部12个文档。 / All 12 docs.
