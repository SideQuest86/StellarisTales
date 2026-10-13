# 恼人的特使 / A Most Irritating Envoy

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany · 来源 Sources：`events/envoy_events.txt:549-740`、`common/on_actions/00_on_actions.txt:500`、`events/overlord_enclaves_events.txt:7690-7720` · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

五年一次的随机脉冲（on_five_year_random_pulse_country，权重25，common/on_actions/00_on_actions.txt:500）会抽到 envoy_events.5；另外 enclave.4151（占卜情境，overlord_enclaves_events.txt:7715）也会直接触发它。条件（events/envoy_events.txt:560-590）：普通国家、非格式塔、非狂热平等主义、近期（5400天）没有触发过本事件；某个对我们“损害关系”的非格式塔国家派出的使节正在执行“破坏关系”任务；且本国有一个与本国伦理相合、但不是进步/繁荣/异类友善的派系。

It is drawn by the five-year random pulse (on_five_year_random_pulse_country, weight 25, common/on_actions/00_on_actions.txt:500) or fired directly by enclave.4151 (a divination situation, overlord_enclaves_events.txt:7715). Conditions (events/envoy_events.txt:560-590): a normal, non-gestalt, non-fanatic-egalitarian empire with no such event in the last 5400 days; a non-gestalt empire is harming relations with us through an envoy on the "harm relations" task; and we have an ethic-aligned pop faction that is not progressive, prosperity or xenoist.

## 剧情脉络 Story outline

窗口里先保存使节所属国（envoy_source）和使节本人（event_envoy），并给本国设置5400天的冷却标记。玩家二选一：A“不屑为之”，损失30影响力，事件结束；B“除掉这个使节”，则5天后对方国家收到 envoy_events.6（使节在首都失踪/遇害）。

The window first saves the sending empire (envoy_source) and the envoy, and sets a 5400-day cooldown flag. The player picks one of two options: A refuses to stoop to it and loses 30 influence, ending the event; B has the envoy killed, and 5 days later the other empire receives envoy_events.6 (the envoy has been murdered in our capital).

## 分支与结局 Branches and outcomes

A 与 B 互斥。B：本国符合条件的派系获得“受保护的利益”修正（3600天）；对方国家得到 envoy_events.6，对我方产生意见惩罚、给我方“杀害使节”修正（3600天），两国同属联邦则联邦凝聚力各-50，使节被杀。

A and B are exclusive. B: a qualifying faction gains the "protected interests" modifier (3600 days); the other empire gets envoy_events.6, which adds an opinion penalty toward us and the "kills envoys" modifier on us (3600 days), subtracts 50 federation cohesion if both are in a federation, and kills the envoy.

## 条件与文明差异 Conditions and variants

AI倾向：B 对威权/排外/军国主义者及对宿敌更常见（权重×2），A 对平等/亲异/和平主义者更常见。

AI leanings: B is likelier for authoritarian, xenophobe or militarist empires and against rivals (x2); A is likelier for egalitarian, xenophile or pacifist empires.

## 审阅记录 Review notes

- 已对照游戏文件核对入口、触发、选项与结果；行号均为游戏文件的真实行号。
  Entry, trigger, options and outcomes were checked against the game files; line numbers are real game-file lines.
- 本故事是“重复发生的小事件”，没有更长的剧情线。
  A repeatable one-off encounter with no longer storyline.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
