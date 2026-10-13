# 宇宙创生 / Cosmogenesis

- 分类 Category: 天灾（玩家天灾路线）Crisis (player crisis path) · DLC: 机械纪元 Machine Age · 来源 Sources: `events/machine_age_crisis_events.txt:15-3953`, `common/crisis_levels/00_crisis_levels.txt:375-531`, `common/crisis_paths/00_cosmogenesis_paths.txt`, `common/scripted_effects/02_machine_age_effects.txt:15-90` · 审阅 Reviewed 2026-10-12 (c5b-crisis)

> 审阅者导读（评注），不是游戏原文。 / Reviewer commentary, not game text.

## 如何开始 How it starts

选择“宇宙创生”飞升天赋后进入该天灾路线，第一级解锁时收到“无尽的好奇心”（crisis.7100）。天灾货币为“先进逻辑”，靠路线目标（研究、无限课题、学术附庸、神经芯片、科学枢纽、星海共同体科学决议）累积。
Taking the Cosmogenesis ascension perk starts this player crisis path; level 1 sends *Insatiable Curiosity*.

## 剧情脉络 Story outline

1. **五个等级（严格依次解锁）**：每级要求上一级的专属科技与累积的先进逻辑——二级 4000、三级 10000、四级 22000（且未放弃）、五级 60000（且至少完成两项无限课题、未放弃、非附庸）。每级解锁新科技（含堕落帝国科技）。
2. **警告**：到达第三级7天后，狂热唯物堕落帝国（若存在）发来警告；回答不影响进程。
3. **无限课题**（第四级起可重复研究）：每次随机得到一种现实改写结果——停电、常数取整、超光速、合金延展、营养改变、质量转移、虚境撕裂、稳定的成功、不幸的失败；带全局效果的结果在全银河只出现一次。首次课题30天后，唯物堕落帝国下达最后通牒（仅一次）：放弃（计划中止）、道歉，或拒绝（宣战）。
4. **第五级**：所有堕落帝国对你宣战；研究“宇宙创生·五”得到建造视界刺针的计划（7125）。
5. **出发**：视界刺针建成（7400）后逐一造访殖民地让居民登船（7500，游牧帝国为方舟 7501），最后到达首都，“准备深潜”（7510）：就近黑洞（抵达7天后穿越）或银河中心的超大质量黑洞（先完成“计算跃迁矢量”项目）。若刺针被毁（7525），可另建。
6. **结局**：“前往无限……”（7515）→ 15天后“无穷的彼岸”（7516），帝国获胜并成为堕落帝国；其他帝国1天后读到“穿透奇点”（7517），之后“时间扭曲”（7518）。

## 分支与结局 Branches and outcomes

- 胜利：7516（`win = yes`）。可能的中止：7285 选择第一项（cosmogenesis_aborted，第四、五级不再可用）。
- 互斥：每项课题一种结果；7510 两个黑洞选项最终都到 7515；7516/7517 是同一时刻的两种视角。
- 支线：突触凝练机（第一级科技）低人口时可补充或任其崩溃（7540）；他国轰炸制服凝练机（7535）或迁走最后人口后自毁（7530）；先辈子弟起源的导师祝贺（7280）。

## 条件与文明差异 Conditions and variants

- “无穷的彼岸”正文按穿越的黑洞（伤痕、无限神机、终末出口、深渊恐惧、银河中心）、虚境庇护者、毒素骑士起源、能否创造“回形针宇宙”而变化。
- 生物舰船帝国获得不同舰船科技（02_machine_age_effects.txt）。

## 审阅记录 Review notes

- 已核对 Checked: 7100–7545 全部事件、等级条件与 on_unlock、等级科技、课题随机表权重与修正、视界刺针 on_build_complete（16_cosmogenesis_needle.txt:57-85）、刺针抵达 on_action（02_component_on_actions.txt:32-39）。
- 更正 Corrections: V3 的等级连接保留并补全条件；新增课题组、最后通牒（中止分支）、刺针与结局链、凝练机支线；移除胜利摧毁恒星时误连到肃正协议“机械星球被摧毁”的连接。
- 不确定 Uncertain: 先进逻辑的获取速率未建模；凝练机事件多为他国视角。
- 覆盖范围 Coverage: 41 篇，全部审阅。
