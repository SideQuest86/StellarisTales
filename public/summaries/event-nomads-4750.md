# 岩居方舟吞噬行星 / Arkship lithoid world-devouring

- 分类 Category：银河轶事 C8 stories · 来源 Sources：events/nomads_events_1.txt, common/situations/14_nomads_situations.txt, common/on_actions/02_component_on_actions.txt · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

方舟舰队对无主行星执行“吞噬”动作时，on_action 触发隐藏 nomads.4750（events/nomads_events_1.txt）：首次抵达则标记行星并开始情境 situation_arkship_lithoid_consume_planet；若取消后返回则清除宽限标记。

## 剧情脉络 Story outline

情境单阶段（进度0→1000，唯一态度“吞噬”），每月隐藏事件发放资源；方舟离开超过6个月则中止并清除标记；进度满 → 隐藏 nomads.4760 摧毁行星（可能触发被毁神圣世界的反应，见 planet_destruction.610）。

## 分支与结局 Branches and outcomes

- 完成 / 中止互斥。

## 条件与文明差异 Conditions and variants

- 仅游牧帝国，目标为无主行星。

## 审阅记录 Review notes

- 已核对 Checked：触发事件与情境定义（14_nomads_situations.txt）；行星被毁后的堕落帝国反应属其他故事。
