# 来自堕落帝国的任务：制止错误行为 / Task: Stop Atrocities

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany

## 如何开始 How it starts

异种友好的堕落帝国要求制止纯化：五年随机脉冲（on_five_year_random_pulse_country_fe_list，common/on_actions/00_on_actions.txt:595-614）把本任务作为候选；各候选权重相对980，抽中后仍须通过其触发条件。（权重40，平等主义/亲外×2，威权/排外×0.5。）条件：非AI默认国家，非机器/蜂巢/终结者/吞噬/净化，禁止奴役与清洗，不在战争中，没有进行中的同类任务；一个狂热亲外、对我方“庇护”或“轻视”的堕落帝国要求我方制止与我方为对手的、允许清洗且被我方视为灭绝性的国家。

A xenophile fallen empire asks us to stop another empire's purges: The five-year random pulse (on_five_year_random_pulse_country_fe_list, common/on_actions/00_on_actions.txt:595-614) lists this task among its candidates; weights are out of 980 and the event's own trigger must still pass. (weight 40; egalitarian/xenophile x2, authoritarian/xenophobe x0.5.) Conditions: a human default country that is not machine, hive, terminator, devouring or purifier, bans slavery and purging, is not at war and has no such task running; a fanatic-xenophile fallen empire patronizing or dismissive toward us names one of our rivals that allows purging and has a genocidal opinion of us.

## 剧情脉络 Story outline

fallen_empires_tasks.8：接受（a）则开始“任务：制止错误行为”事件链，并设定7200天（约20年）计时器；拒绝（b）则对方不悦。之后没有成功窗口——成功事件 fallen_empires_tasks.9 在游戏文件中被注释掉（L1135-1178）。链只有失败的几种终局：计时器到期且不在战争中的 fallen_empires_tasks.10（“失望”）；对象国不再清洗的 .11（“已不再需要”，平均10天）；任务承接国自己合法化清洗的 .13（愤怒）；以及参与国失效时静默终止的隐藏事件 .12。

fallen_empires_tasks.8: accepting (a) starts the "Task: Stop Atrocities" chain with a 7200-day (about 20 years) timer; refusing (b) displeases the empire. There is no success window - the success event fallen_empires_tasks.9 is commented out in the game files (L1135-1178). The chain has only failure endings: fallen_empires_tasks.10 (disappointed) when the timer runs out and we are not at war; .11 (no longer needed, mean 10 days) when the target stops purging; .13 (angry) when the task-taker legalises purging itself; and hidden .12 which silently ends it if a party becomes invalid.

## 分支与结局 Branches and outcomes

10 / 11 / 13 互斥（每个都清理任务旗标）。

10 / 11 / 13 are exclusive (each clears the task flags).

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/fallen_empire_tasks_events.txt:955-1390; common/on_actions/00_on_actions.txt:599
- 已核对入口、触发、选项与结果。
  Checked the entry, trigger, options and outcomes.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
