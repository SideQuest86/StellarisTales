# 巨像计划 / Colossus Project

- 分类 Category：C8 银河轶事 / Galactic miscellany
- DLC：Apocalypse

## 如何开始 How it starts

选择飞升天赋“巨像计划”（ap_colossus，需 Apocalypse DLC、科技 tech_titans 且已有至少3个飞升天赋；on_enabled 触发 apoc.100）。

Taking the ascension perk Colossus Project (ap_colossus; needs the Apocalypse DLC, tech_titans and at least 3 perks; on_enabled fires apoc.100).

## 剧情脉络 Story outline

apoc.100（正文按净化者/终结者/和平/军国/排外等分六种）→ 在首都启用专项 COLOSSUS_PROJECT（成本 50000 工程研究）→ 进度到50%时 apoc.110：选择行星毁灭者武器 → 完成时 apoc.120：获得巨像项目与所选武器科技，并通知通讯中、军事情报≥2的其他帝国（apoc.130，观察者模式为 observer.69）。

apoc.100 (six text variants: purifier / terminator / pacifist / militarist / xenophobe / default) → special project COLOSSUS_PROJECT at the capital (cost 50000 engineering research) → at 50% progress apoc.110: choose the planet-killer weapon → on completion apoc.120 grants the Colossus and the chosen weapon technology and notifies empires in contact with military intel level 2+ (apoc.130; observers get observer.69).

## 分支与结局 Branches and outcomes

apoc.110 七选一（互斥）：行星粉碎者（非和平主义者）、护盾摧毁者（和平主义者）、中子炸弹（非和平主义者；已飞升灵能的灵性者另有神光）、天神裁决（灵性者+灵能飞升）、纳米灾疫（集群且机械同化者）、降智光束（需考古科技）、行星熔炉（can_get_planet_smelter）。apoc.120 按旗标赠送对应科技，无旗标则按能研究的科技兜底；apoc.130 的选项按双方实力与和平主义而异。

apoc.110 is a choice among seven (exclusive): Cracker (non-pacifists), Shielder (pacifists), Neutron (non-pacifists; psionic-ascended spiritualists get God Ray instead), God Ray (spiritualist + psionic ascension), Nanobots (gestalt Machine Assimilator), Devolution (needs the archaeotech), Smelter (can_get_planet_smelter). apoc.120 grants the flagged technology, or a fallback by what can be researched; the options of apoc.130 depend on relative power and pacifism.

## 条件与文明差异 Conditions and variants

apoc.110 的正文分普通/机械/蜂巢；各武器选项的可见条件见上。

The text of apoc.110 differs for ordinary / machine / hive empires; weapon option conditions are above.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：`events/apocalypse_events.txt:372-760`; `common/special_projects/00_projects_apocalypse.txt:1-40`; `common/ascension_perks/00_ascension_perks.txt:1068-1090`
- 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.
核对天赋、专项和三个事件；apoc.130 / observer.69 仅是对他国的通知。

Perk, project and the three events were checked; apoc.130 / observer.69 are only notices for other empires.
