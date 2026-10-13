# 银河市场：站点搬迁 / Galactic Market: station moved

- 分类 Category：银河轶事 C8 stories · 来源 Sources：events/on_action_events_2.txt, common/on_actions/00_on_actions.txt · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

on_system_lost（common/on_actions/00_on_actions.txt:4231）触发隐藏事件 action.102（events/on_action_events_2.txt:447-616）：丢失的系统里有银河市场站。
Hidden action.102 runs when a system containing the Galactic Market station is lost.

## 剧情脉络 Story outline

- 若原主办国仍在、新主人是共同体成员的非灭绝者：市场站迁入新主人的首都星系并给 action.103 “银河市场：站点搬迁”（唯一选项“确定”）；新主人获得“银河市场主办”修正和市场领导权。
- 新主人没有市场权限时，直接授予（不弹窗）；其他情况新主人接手市场主办修正，各自发出“失去市场站”提示消息。
  The station moves to the new owner's capital system (103), or the new owner simply takes over the host status with a message.

## 分支与结局 Branches and outcomes

- 无选择。 No choices.

## 条件与文明差异 Conditions and variants

- 灭绝者或非成员新主人走不同分支，不收到 103。 Homicidal or non-member owners take other branches without 103.

## 审阅记录 Review notes

- 已核对 Checked：action.102 的三个分支与 action.103。
