# 小行星电波 / Asteroid Waves

- 分类 Category：深空异闻 Exploration (C3)
- 来源 Sources：`common/anomalies/01_anomaly_categories.txt:1-65` · `events/anomaly_events_1.txt` · `events/anomaly_events_2.txt` · `common/special_projects/`
- 审阅 Review：2026-10-13（c3b-exploration）· 已审阅 Reviewed

## 如何开始 How it starts

- 小行星上的1级异常，生成权重3。若小行星带有战略资源，75和115的权重为0。  
  Level-1 anomaly on asteroids, spawn weight 3. If the asteroid has a strategic resource, outcomes 75 and 115 get factor 0.

## 剧情脉络 Story outline

- 四个结局：75“岩脑”、115“蜂巢格”、130“引力压碎”（权重各1）和3065“非法通讯”（基础0；拥有birth_of_piracy旗标且领队没有统御专长时+1，机械物种则看生物专长）。  
  Four outcomes: 75 Rock Brain, 115 Cell Cells and 130 Gravity Crush (weight 1 each) and 3065 Illicit Communications (base 0; +1 with the birth_of_piracy flag and a leader lacking statecraft expertise, machines checked for biology expertise instead).
- 75选项a（5天后）→80“岩脑偏头痛”；c→76→对话77→78→79（岩脑死亡）→ 可选“复活岩脑”项目→81。b不继续。  
  75 option a (after 5 days) → 80; option c → 76 → dialogue 77 → 78 → 79 (the Rock Brain dies) → optional Reanimate the Rock Brain project → 81. Option b ends.

## 分支与结局 Branches and outcomes

- 四个结局互斥；对话77、78的选项决定能否走到79。  
  The four outcomes are exclusive; the choices in 77 and 78 decide whether 79 is reached.

## 条件与文明差异 Conditions and variants

- 死灵技术分支（79→项目→81）使用与死灵相关的措辞（Owner.GetNecromancersUpper）。  
  The reanimation branch (79 → project → 81) uses necromancer wording (Owner.GetNecromancersUpper).

## 审阅记录 Review notes

- 已对照类别脚本1-65与树；项目REANIMATE_ROCK_BRAIN由galactic_features.385.reanimated引出，树已显示。  
  Compared category script 1-65 and the tree; REANIMATE_ROCK_BRAIN is reached through galactic_features.385.reanimated, shown in the tree.
- 覆盖 Coverage：全部12个文档。 / All 12 docs.
