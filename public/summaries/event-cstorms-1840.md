# 设施复工 / Repowered Complex

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany · DLC：Cosmic Storms · 来源 Sources：`common/on_actions/00_on_actions.txt:5421-5443`、`events/cosmic_storms_events_1.txt:4655-4704`、`events/cosmic_storms_events_1.txt:4706-4830`、`common/archaeological_site_types/10_cosmic_storms_arc_sites.txt:687-725` · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

电磁风暴离开星系时（on_storm_left_system，common/on_actions/00_on_actions.txt:5440 直接列出 cstorms.1840），隐藏事件 cstorms.1840（cosmic_storms_events_1.txt:4659-4704）要求风暴为 electric_storm，且系统中有一颗没有风暴影响标记、没有遗址、没有异常、非人造的行星；随后50%几率（random_list 1/1）在其中一颗上创建 site_repowered_complex，并设置 afflicted_by_storm_event。

When an electric storm leaves a system (on_storm_left_system lists cstorms.1840 directly, common/on_actions/00_on_actions.txt:5440), hidden cstorms.1840 (cosmic_storms_events_1.txt:4659-4704) requires an electric_storm and a natural planet in the system with no storm-affliction flag, site or anomaly; it then has a 50% chance (random_list 1/1) to create site_repowered_complex on one such planet and sets afflicted_by_storm_event.

## 剧情脉络 Story outline

三个阶段（难度2、3、4，需要科学家领袖，失败时无随机事件 no_events，10_cosmic_storms_arc_sites.txt:687-725）：1845 加固入口（小型神器奖励与团结月度加成）→ 1850 生存庇护所（食物/能量/消费品/矿物月度加成）→ 1855 豪华庇护所套装（风暴监测设备；巨型企业有单独文字）。

Three stages (difficulty 2, 3, 4, scientist leader, no random events on failure, 10_cosmic_storms_arc_sites.txt:687-725): 1845 Fortified Entrance (small artifact reward and a unity bonus) -> 1850 Survival Shelter (monthly food/energy/consumer goods/minerals) -> 1855 The Deluxe Shelter Package (storm monitors; megacorporations get their own text).

## 分支与结局 Branches and outcomes

线性、无分支。

Linear, no branches.

## 条件与文明差异 Conditions and variants

1855 对巨型企业使用不同正文。

1855 uses different body text for megacorporations.

## 审阅记录 Review notes

- 已对照游戏文件核对入口、触发、选项与结果；行号均为游戏文件的真实行号。
  Entry, trigger, options and outcomes were checked against the game files; line numbers are real game-file lines.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
