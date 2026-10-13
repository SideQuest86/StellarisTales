# 来自[FallenEmpireTaskOrigin.GetName]的通讯 / Communication from [FallenEmpireTaskOrigin.GetName]

- 分类 Category: C8 银河轶事 / C8 Galactic miscellany · 来源 Sources: events/fallen_empire_tasks_events.txt:11-211; common/on_actions/00_on_actions.txt:597 · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

堕落帝国“赠礼”：五年随机脉冲（on_five_year_random_pulse_country_fe_list，common/on_actions/00_on_actions.txt:595-614）把本任务作为候选；各候选权重相对980，抽中后仍须通过其触发条件。（本事件权重30。）条件：默认国家、舰队实力低于10万、不在战争中，且有一个与我方有通讯、对我方“庇护”或“莫测”态度的合格堕落帝国，没有近期已赠礼或被我方拒绝过的记录。

Fallen empire "gift": The five-year random pulse (on_five_year_random_pulse_country_fe_list, common/on_actions/00_on_actions.txt:595-614) lists this task among its candidates; weights are out of 980 and the event's own trigger must still pass. (this event: weight 30.) Conditions: a default country with fleet power under 100000, not at war, with a qualifying fallen empire in contact that is patronizing or enigmatic toward us and has not recently gifted or been spurned.

## 剧情脉络 Story outline

单窗口 fallen_empires_tasks.2：堕落帝国赠送一笔礼物（少量或大量资源、数据库或稀有科技，依 fe_gift_* 旗标；正文随堕落帝国的伦理而变）。选项a接受，选项b拒绝（对方不悦并记 spurned 好感修正）。

A single window fallen_empires_tasks.2: the fallen empire gives a gift (small or large resources, databanks or rare tech per the fe_gift_* flags; text varies with the fallen empire's ethics). Option a accepts, option b spurns it (the giver is displeased and an opinion modifier is recorded).

## 分支与结局 Branches and outcomes

选项a与b互斥。

Options a and b are exclusive.

## 审阅记录 Review notes

- 已核对入口、触发、选项与结果。
  Checked the entry, trigger, options and outcomes.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
