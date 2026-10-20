# 给和平一个机会 / Give Peace a Chance

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany · DLC: BioGenesis

## 如何开始 How it starts

战争碎片存在、我方近期没有被指派和平或战争任务时，五年随机脉冲可能抽中 bio.3145，立即弹出 bio.3150。触发后设置2560天的蜂巢失落帝国事件冷却（hive_fallen_empire_event_cooldown），期间其他碎片要求不再出现。

With the War fragment present and no recent peace or war task, the five-year pulse can pick bio.3145, which shows bio.3150 at once. Firing sets a 2560-day cooldown (hive_fallen_empire_event_cooldown) shared by the fragment demands.

## 剧情脉络 Story outline

战争碎片要求我方休战十年、反思所得。

The War fragment tells us to keep the peace for a decade and reflect on our gains.

## 分支与结局 Branches and outcomes

回答效果相同。十年内若开战，隐藏事件 bio.3160（on_war_beginning）给出“不满”消息；坚持十年则 bio.3155 给出“满意”消息。之后20年内不再指派此任务。

Replies have the same effect. Starting a war within ten years makes hidden bio.3160 (on_war_beginning) send a "displeased" message; keeping the peace for ten years makes bio.3155 send a "pleased" message. The task is then not repeated for 20 years.

## 条件与文明差异 Conditions and variants

黩武主义或不友善帝国、和平主义帝国各有专属回答。

Militarist or unfriendly empires and pacifist empires get their own replies.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-12
- 来源 Sources：common/on_actions/00_on_actions.txt:595-614 on_five_year_random_pulse_country_fe_list (weight 30 of 980); events/biogenesis_events.txt:7736-7842; common/on_actions/00_on_actions.txt:2619
- 已核对触发、十年计时与两种结果消息。
  Checked trigger, ten-year timer and the two outcome messages.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
