# 银河帝国的终结 / End of the Galactic Imperium

- 分类 Category：银河轶事 C8 stories · DLC：Nemesis

## 如何开始 How it starts

银河内战（由“煽动叛乱”行动等引发，见故事 event-operation-6100）按战争目标 wg_galactic_civil_war_loyalists / wg_galactic_civil_war_rebels 的结果触发：保皇胜利 emperor.150（common/war_goals/02_event_war_goals.txt:273）、僵局 emperor.250（:283）、反叛胜利 emperor.200（:338）；wg_restore_the_community 胜利触发 emperor.300（common/war_goals/04_imperium_war_goals.txt:122）；皇帝国家被消灭时 on_country_destroyed（common/on_actions/00_on_actions.txt:3606）触发隐藏 emperor.400，再给所有玩家国 emperor.401。
The result events fire from the civil-war war goals; the Community restoration war goal fires 300; destruction of the emperor's country fires 400/401.

## 剧情脉络 Story outline

- 保皇胜利：emperor.150（皇帝：选 a 宽大 / b 惩罚，帝国权威 +100，叛军获“前叛军”修正 2160 天）→ 151（保皇派）、152（叛军：投降后的两种处境）、153（局外人）。
  Loyalist victory: 150 (leniency or punishment), 151 loyalists, 152 rebels, 153 others.
- 僵局：250（皇帝与保皇派）/ 251（叛军）/ 252（局外人）：叛乱成员获得独立。 Stalemate: 250 / 251 / 252.
- 反叛胜利：200（反叛者）/ 201（保皇派）/ 202（皇帝）/ 203（局外人）：帝国垮台，旧银河共同体恢复。 Rebel victory: 200 / 201 / 202 / 203.
- 恢复共同体（wg_restore_the_community）：300（胜者）/ 301（帝国成员）/ 302（局外人，可选 a 重新加入共同体 / b 拒绝）。 Restore the Community: 300 / 301 / 302.
- 帝国覆灭：401 “银河帝国崩溃”（皇帝国被消灭时）。 Collapse: 401.

## 分支与结局 Branches and outcomes

- 保皇胜利、僵局与反叛胜利三者互斥（同一场战争一种结果）；每种结果内的各方视角事件并行。 Loyalist victory, stalemate and rebel victory are exclusive; the perspective events of one result are parallel.
- 150 的 a、b 选项互斥（宽大 / 惩罚）。 150's options are exclusive.

## 条件与文明差异 Conditions and variants

- 谁收到哪一个事件取决于其国家标记（empire_loyalist / empire_rebel）与是否为共同体成员。 Recipients depend on the empire_loyalist / empire_rebel flags.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/nemesis_emperor_events.txt, common/war_goals/02_event_war_goals.txt, common/on_actions/00_on_actions.txt
- 已核对 Checked：emperor.150-401 与战争目标、on_action 调用点。
- 更正 Corrections：原先按视角拆成 11 个故事（150、200、300、400…），现按结果合并；叛乱起点 emperor.101-108 属于“煽动叛乱”行动故事（另一审阅者）。
  Split perspective stories merged by outcome; emperor.101-108 stay in the operation story (another reviewer).
