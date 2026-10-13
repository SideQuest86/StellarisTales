# 闪烁地表 / Glimmering Surface

- 分类 Category：深空异闻 Exploration · DLC：Shadows of the Shroud（has_shroud_dlc） · 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：common/anomalies/103_anomaly_categories_extreme_frontiers.txt:137; events/extreme_frontiers_events.txt:370 (extreme_frontiers.160)

## 如何开始 How it starts

冰冻星球可能生成（6级，权重3，全局一次 max_once；需要 has_shroud_dlc）。

Can spawn on a frozen planet (level 6, weight 3, once per game via max_once; needs has_shroud_dlc).

## 剧情脉络 Story outline

单一结果 extreme_frontiers.160“彩虹冰盖”：机械帝国获得 d_minerals_6 与 d_rare_crystals_3 矿藏；其他帝国获得 d_minerals_5 与 d_rare_crystals_2 矿藏，并设置国家标志 can_exhibit_prismatic_ice 与变量 prismatic_ice_exhibit_happened（后续可展出棱镜冰，属于其他系统）。1天后触发通用事件 action.941。

Single result extreme_frontiers.160 "Rainbow Ice Sheet": machine empires gain d_minerals_6 and d_rare_crystals_3 deposits; other empires gain d_minerals_5 and d_rare_crystals_2 and get country flag can_exhibit_prismatic_ice plus variable prismatic_ice_exhibit_happened (a later exhibit handled elsewhere). The generic event action.941 fires 1 day later.

## 分支与结局 Branches and outcomes

唯一结果，无随机分支，无后续章节。

Single outcome; no random branch and no further chapter.

## 条件与文明差异 Conditions and variants

160 按机械帝国与否给出不同的矿藏。

160 gives different deposits to machine and non-machine empires.

## 审阅记录 Review notes

已核对异常定义与结果事件；编译树正确，无需改动。action.941 是共享的通用事件；can_exhibit_prismatic_ice 的展出内容不在本故事内（本次未追查）。生成需要 has_shroud_dlc；本机 dlc 目录中未见对应 DLC，能否生成取决于主机的 DLC。

Checked the anomaly definition and the result event; the compiled tree is correct, no change needed. action.941 is a shared generic event; the prismatic-ice exhibit enabled by can_exhibit_prismatic_ice is outside this story (not traced here). Spawning needs has_shroud_dlc; no matching DLC folder exists in the local dlc directory, so spawning depends on the host's DLC.
