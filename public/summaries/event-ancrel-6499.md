# 在星球上缴获遗珍 / Relic Seized on a Planet
- 分类 Category：先驱者与考古 Precursors · DLC：《远古遗物》Ancient Relics

## 如何开始 How it starts

隐藏事件 ancrel.6499（on_colony_attackers_win，common/on_actions/00_on_actions.txt:818）：在一场战争中攻方夺下了守方的首都，守方是默认类型国家且拥有遗珍，且战争目的不是夺取银河系遗珍（wg_take_galatron）。

Hidden ancrel.6499 (on_colony_attackers_win, common/on_actions/00_on_actions.txt:818): in a war the attacker takes the defender's capital; the defender is a default-type country that owns relics and the war goal is not wg_take_galatron.

## 剧情脉络 Story outline

按10/110的权重（掠夺战争目的×6.67，“野蛮掠夺者”公约×15）触发 ancrel.6500“缴获遗珍”：攻方随机夺走守方一件遗珍（steal_relic），确认后对守方发 ancrel.6505“于……失去遗珍！”。

With weight 10 of 110 (x6.67 for a plunder war goal, x15 for the Barbaric Despoilers civic) ancrel.6500 "Relic Seized" fires: the attacker takes a random relic from the defender (steal_relic) and, on confirmation, the defender gets ancrel.6505 "Relic Lost".

## 分支与结局 Branches and outcomes

- 6500 与 6505 分别发给攻方与守方，不是同一国家依次看到。 / 6500 goes to the attacker and 6505 to the defender; they are not seen in sequence by one empire.

## 条件与文明差异 Conditions and variants

- 若夺得的遗珍是“战争熔炉”，会初始化 cybrex_count 变量。 / If the stolen relic is the War Forge, the variable cybrex_count is initialised.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/ancient_relics_arcsite_events_2.txt:1912–2040（ancrel.6499、6500、6505）；common/on_actions/00_on_actions.txt:818
- 已核对：ancrel.6499、6500、6505 的脚本与 on_colony_attackers_win 调用点；中英文正文已读。
- Checked: the scripts of ancrel.6499, 6500 and 6505 and the on_colony_attackers_win call site; both languages read.
