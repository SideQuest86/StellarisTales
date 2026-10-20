# 远古设施 / Ancient Facility

- 分类 Category：先驱者与考古 Precursors · DLC：脚本文件 12_strange_worlds_arc_sites.txt（遗址与事件脚本里的 has_biogenesis_dlc 条件） strange-worlds script files (events check has_biogenesis_dlc)

## 如何开始 How it starts

随机遗址：基础权重1000，出现在所有非恒星、非小行星、非干旱/草原/沙漠的星球上；全银河最多一处（common/archaeological_site_types/12_strange_worlds_arc_sites.txt:1）。

A random site with base weight 1000 on any body that is not a star, asteroid, arid, savannah or desert world; at most one per galaxy (common/archaeological_site_types/12_strange_worlds_arc_sites.txt:1).

## 剧情脉络 Story outline

实验室17号的研究主管吉列伯为了“万能巨噬细胞”不惜一次次牺牲受试者，终于连自己和整个团队都死于突变。最后报告摆在你面前：销毁、继续、或加以利用。

1. 废弃生物实验室：实验室里的医疗机器、囚室与停尸间，有人被关押过
2. 远古免疫研究：实验室17的进度更新：免疫力提高百万倍，但全员突变死亡
3. 吉列伯的选择：项目终止令下达，他仍要继续

Lab 17's research lead Gelebor sacrificed subject after subject for the "Universal Macrophage" until the mutations killed his whole team. Their last report leaves you to destroy, finish or exploit the research.

1. Abandoned Bio Lab: medical machines, holding cells and a morgue — some were kept against their will
2. Ancient Immunology Research: Lab 17 progress: immunity boosted millionfold, fatal mutations followed
3. Gelebor's Choice: Gelebor's choice: the termination order comes and he continues

## 分支与结局 Branches and outcomes

- 万能巨噬细胞 / The Universal Macrophage：最后的报告。A 销毁一切（有机帝国；得稀有文物或社会学研究）；b 完成吉列伯的工作（有机帝国，非演化猎手：万能巨噬细胞科技进度+20%）；c 利用有缺陷的研究（非有机帝国；同A的奖励）；演化猎手或完成“突变”传统的帝国得到专属的 b.mutation 选项 / the final report. a destroy everything (organic empires; minor artifacts or society research); b finish Gelebor's work (organic empires, not Evolutionary Predators: Universal Macrophage tech progress +20%); c exploit the flawed research (non-organic empires; the same reward as a); Evolutionary Predators and empires that finished the Mutation tradition get a b.mutation option
- 完成吉列伯的工作后若研发出科技 tech_universal_marcophage，几年后 strange_worlds.2020→2025→2030“致命突变”会让一颗非首都有机殖民星球的居民突变并死亡；该后续在另一个故事“event-strange-worlds-2020”中。 / If tech_universal_marcophage is researched after finishing Gelebor's work, strange_worlds.2020 → 2025 → 2030 "Fatal Mutations" later mutates and kills pops on an organic non-capital colony; that follow-up is the separate story "event-strange-worlds-2020".

## 条件与文明差异 Conditions and variants

- 本遗址的 on_roll_failed 把事件池参数设为 no_events（不存在同名事件池），所以掷骰失败不会触发随机意外。 / The site passes RANDOM_EVENTS = no_events to its roll-failure effect (no pool of that name exists), so a failed roll triggers no incident.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：common/archaeological_site_types/12_strange_worlds_arc_sites.txt:1；events/strange_worlds_events.txt:2603
- 已核对：遗址定义（common/archaeological_site_types/12_strange_worlds_arc_sites.txt:1）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/12_strange_worlds_arc_sites.txt:1) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
