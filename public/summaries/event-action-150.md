# 银河帝国的战争结果 / Galactic Imperium war results

- 分类 Category：银河轶事 C8 stories · DLC：Nemesis

## 如何开始 How it starts

on_war_won（common/on_actions/00_on_actions.txt:3122-3131）与 on_war_lost（:3158-3160）列表里的事件：玩家国家（非AI）是战争领袖，且战争使用对应战争目标时触发。
Events in on_war_won / on_war_lost: they fire for a human war leader when the war used the matching war goal.

## 剧情脉络 Story outline

- 帝国远征 wg_imperial_crusade：胜者 action.150（“战胜……”，败方臣服于帝国）/ 败者 action.151（“被……击败”）。
- 银河内战（保皇方 wg_galactic_civil_war_loyalists）：保皇派胜 action.152 / 叛军败 action.153。
- 银河内战（叛军方 wg_galactic_civil_war_rebels）：叛军胜 action.154；皇帝败（叛军 / 恢复共同体）action.155。
- 恢复共同体 wg_restore_the_community：胜者（解散者）action.158。
  Imperial Crusade 150/151; civil war 152/153 (loyalist win), 154/155 (rebel win); Restore the Community 155/158.

## 分支与结局 Branches and outcomes

- 每场战争只触发其中对应的一对/一份；正文按是否集体意识两种。 Only the matching ones fire.

## 条件与文明差异 Conditions and variants

- 仅玩家（非AI）收到。 Human players only.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/on_action_events_2.txt, common/on_actions/00_on_actions.txt, common/war_goals/02_event_war_goals.txt
- 已核对 Checked：action.150-158 的触发（157、156 为注释掉的夺取王座战争）。
- 更正 Corrections：七个单页故事并为一个；帝国内战本身的后续通知见“银河帝国的终结”。
  Seven one-card stories merged; the civil war aftermath is in 'End of the Galactic Imperium'.
