# 过于平静 / Too Quiet

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany · DLC: BioGenesis

## 如何开始 How it starts

战争碎片存在、我方和平且有可选的邻国（无防御条约、联邦、互不侵犯条约、附庸或分公司关系）时，五年随机脉冲可能抽中 bio.3125，立即弹出 bio.3130。触发后设置2560天的蜂巢失落帝国事件冷却（hive_fallen_empire_event_cooldown），期间其他碎片要求不再出现。

With the War fragment present, our empire at peace and an eligible neighbour (no defensive pact, federation, non-aggression pact, subject or branch-office ties), the five-year pulse can pick bio.3125, which shows bio.3130 at once. Firing sets a 2560-day cooldown (hive_fallen_empire_event_cooldown) shared by the fragment demands.

## 剧情脉络 Story outline

战争碎片指定一个邻国作为我方的对手，要求十年内击败它；若与对方有停战协议，该协议立即作废。

The War fragment picks a neighbour as our opponent and demands we defeat it within a decade; any truce with it is ended at once.

## 分支与结局 Branches and outcomes

三个回答效果相同。之后没有新窗口：十年内赢得对该国的战争时，隐藏事件 bio.3140（on_war_won）给出“满意”消息；3600天后若未击败且不在交战中，bio.3135 给出“不满”消息，若仍在交战则每年复查（L7682-7730）。

All replies have the same effect. No further window follows: winning a war against that country triggers hidden bio.3140 (on_war_won) with a "pleased" message; after 3600 days, if not beaten and not at war, bio.3135 sends a "displeased" message, re-checking yearly while the war continues (L7682-7730).

## 条件与文明差异 Conditions and variants

和平主义与黩武主义（或杀戮型）帝国各有专属回答；正文按是否有停战协议分两版。

Pacifist and militarist (or homicidal) empires get their own replies; the text has truce and no-truce versions.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-12
- 来源 Sources：common/on_actions/00_on_actions.txt:595-614 on_five_year_random_pulse_country_fe_list (weight 30 of 980); events/biogenesis_events.txt:7534-7734; common/on_actions/00_on_actions.txt:3144
- 已核对触发条件、对手选择、计时与结果消息；结果只以消息呈现，不是事件窗口。
  Checked trigger, opponent selection, timer and outcome messages; outcomes are messages, not event windows.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
