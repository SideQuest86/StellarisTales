# 劫掠者雇佣舰队 / Marauder mercenaries

- 分类 Category：银河轶事 C8 stories · 来源 Sources：events/marauder_events.txt, common/on_actions/00_on_actions.txt, common/scripted_triggers/02_scripted_triggers_marauders.txt · DLC：Marauders · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

隐藏事件 marauder.85（on_yearly_pulse，common/on_actions/00_on_actions.txt:240；events/marauder_events.txt:4067-4195）：中期开始后，每年检查——存在休眠的劫掠者国家（标记 marauder_1/2/3），尚未宣布过雇佣（mercenaries_available_N）且拥有虚空栖居者（marauder_void_dwelling）飞船。
Hidden marauder.85 runs each year after mid game while some dormant clan still has no mercenary offer and owns a void-dwelling ship.

## 剧情脉络 Story outline

随机（30 / 30 / 30 / 80 无事）选一个部落：设标记 mercenaries_available_N，并向与该部落有联系的玩家国发出通知——marauder.86（部落一）、87（部落二）、88（部落三）。各通知只有一个选项“知道了”。每个部落只会宣布一次。
One clan is drawn (30/30/30, 80 nothing); every human empire in contact gets its notice 86 / 87 / 88; each clan announces only once.

## 分支与结局 Branches and outcomes

- 三条通知对应三个不同部落，彼此并行（每年至多一个）。 Three parallel notices, at most one per year.
- 实际雇佣通过劫掠者外交菜单（marauder.20/21/34/37），不在此故事中。 Hiring itself uses the diplomacy menu (not in this story).

## 条件与文明差异 Conditions and variants

- 部落一的通知不发给“可汗后裔”起源。 Clan one's notice skips the Heirs of the Khan origin.

## 审阅记录 Review notes

- 已核对 Checked：marauder.85-88 与 has_marauder_event 触发器中的菜单列表。
