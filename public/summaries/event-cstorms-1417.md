# 错不二犯 / Won't Get Fooled Again

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany · DLC: Cosmic Storms

## 如何开始 How it starts

这是“绿色天空”挖掘点（cstorms.1400–1425）的收尾：玩家在 cstorms.1415 选b被海盗劫走领袖并选择反击（cstorms.1416，创建带 green_skies_pirate_fleet 标记的海盗舰队）。该舰队被击毁时，on_fleet_destroyed_victim（00_on_actions.txt:1594）触发隐藏事件 cstorms.1417。

This is the tail of the Green Skies dig site (cstorms.1400-1425): in cstorms.1415 option b the leader is taken hostage and the player counter-attacks (cstorms.1416 creates a pirate fleet flagged green_skies_pirate_fleet). When that fleet is destroyed, on_fleet_destroyed_victim (00_on_actions.txt:1594) fires hidden cstorms.1417.

## 剧情脉络 Story outline

cstorms.1417 把事件传给记录下来的人质所有者，弹出 cstorms.1420“错不二犯”。选项a：人质获释并返回；选项b：处决被放逐的领袖。

cstorms.1417 hands the event to the recorded hostage owner and cstorms.1420 "Won't Get Fooled Again" appears. Option a: the hostage is released and returns; option b: the exiled leader is killed.

## 分支与结局 Branches and outcomes

两个选项互斥；另一条付钱路线（cstorms.1425）见绿色天空故事。

The two options are exclusive; the pay-up route (cstorms.1425) is in the Green Skies story.

## 条件与文明差异 Conditions and variants

Cosmic Storms DLC；需要此前在绿色天空中选择过反击。

Cosmic Storms DLC; requires the earlier counter-attack choice in Green Skies.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/cosmic_storms_events_1.txt:2540-2703; common/on_actions/00_on_actions.txt:1594
- 已核对入口、触发、选项与结果。
  Checked the entry, trigger, options and outcomes.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
