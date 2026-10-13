# 强者生存 / Survival of the Strongest

- 分类 Category: C8 银河轶事 / C8 Galactic miscellany · 来源 Sources: common/on_actions/00_on_actions.txt:595-614 on_five_year_random_pulse_country_fe_list (weight 30 of 980); events/biogenesis_events.txt:7232-7532; common/on_actions/00_on_actions.txt:1597 · DLC: BioGenesis · 审阅 Reviewed 2026-10-12

## 如何开始 How it starts

蜂巢失落帝国的“战争”碎片（舰队实力>60000、未交战、与我方有通讯）存在且我方不在战争中时，五年随机脉冲可能抽中隐藏事件 bio.3100，立即弹出 bio.3105。触发后设置2560天的蜂巢失落帝国事件冷却（hive_fallen_empire_event_cooldown），期间其他碎片要求不再出现。

With the hive Fallen Empire's War fragment present (fleet power > 60000, at peace, in contact) and our empire at peace, the five-year random pulse can pick hidden bio.3100, which shows bio.3105 at once. Firing sets a 2560-day cooldown (hive_fallen_empire_event_cooldown) shared by the fragment demands.

## 剧情脉络 Story outline

战争碎片宣布要用一种新培育的生物舰检验我方，并把它投放到我方最强舰队所在的星系（或最近的我方星系）。无论选择哪个回答，都会生成敌对的“新品种”势力及其实验舰；再次触发时若曾击败过，会换成更强的舰种。

The War fragment announces a newly bred bioship to test us and drops it where our strongest fleet is (or the nearest system we own). Whatever we answer, a hostile "New Breed" faction with the experimental ship is created; if we beat one before, a stronger design is used.

## 分支与结局 Branches and outcomes

若在期限内击毁实验舰，得到“汲取教训”bio.3120（战争碎片好感与影响力提升）；若360–720天后实验舰仍在，得到“令人失望”bio.3110（失败，实验舰被收回）。两者互斥。

Destroying the ship in time gives Lesson Learned bio.3120 (the War fragment's opinion and influence rise); if it survives 360-720 days, Disappointing bio.3110 fires (failure; the ship is removed). The two are exclusive.

## 条件与文明差异 Conditions and variants

黩武主义帝国多一个回答选项“值得一战！”，三个回答效果相同。

Militarist empires get an extra reply, "A worthy challenge!"; all replies have the same effect.

## 审阅记录 Review notes

- 修正：草稿把成功结局 bio.3120 作为独立故事 event-bio-3115；它由舰队被毁的 on_action 触发，属于同一挑战，现以条件连接并入。
  Correction: the draft made the success outcome bio.3120 a separate story (event-bio-3115); it is fired by the fleet-destroyed on_action for this same challenge and is now a conditional branch here.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
