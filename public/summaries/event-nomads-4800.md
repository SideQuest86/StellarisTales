# 纳米方舟吞噬行星 / Arkship nanotech world-subsuming

- 分类 Category：银河轶事 Galactic miscellany

## 如何开始 How it starts

方舟舰队对无主行星执行“吞噬”动作时，on_action 触发隐藏 nomads.4800（events/nomads_events_1.txt）：首次抵达则标记行星并开始情境 situation_arkship_nanotech_consume_planet；若取消后返回则清除宽限标记。

When an arkship fleet performs the "Devour" action on an unowned planet, an on_action triggers the hidden nomads.4800 (events/nomads_events_1.txt): on first arrival it marks the planet and starts the situation situation_arkship_nanotech_consume_planet; if the fleet cancels and then returns, the grace flag is cleared.

## 剧情脉络 Story outline

情境单阶段（进度0→1000，唯一态度“吞噬”），每月隐藏事件发放资源；方舟离开超过6个月则中止并清除标记；进度满 → 隐藏 nomads.4810 摧毁行星（可能触发被毁神圣世界的反应，见 planet_destruction.610）。

Single-stage situation (progress 0→1000, sole attitude "Devour"); a monthly hidden event grants resources; if the arkship has been away for more than 6 months, the situation is aborted and the flag cleared; when progress is full → hidden nomads.4810 destroys the planet (which may trigger the reaction of a destroyed holy world, see planet_destruction.610).

## 分支与结局 Branches and outcomes

- 完成 / 中止互斥。  
  Completing and aborting are mutually exclusive.

## 条件与文明差异 Conditions and variants

- 仅游牧帝国，目标为无主行星。  
  Nomad empires only; the target is an unowned planet.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/nomads_events_1.txt, common/situations/14_nomads_situations.txt, common/on_actions/02_component_on_actions.txt
- 已核对 Checked：触发事件与情境定义（14_nomads_situations.txt）；行星被毁后的堕落帝国反应属其他故事。
- 2026-10-13 r3-inherit：事件继承修复（base = 其他事件）后复查：对照游戏文件核对了现在可见的继承标题、选项与分支，结构无需改动。
  2026-10-13 r3-inherit: re-checked after the event-inheritance fix (base = other event): the inherited titles, options and branches now visible in the tree were compared with the game files; no structural change needed.
