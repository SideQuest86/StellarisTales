# 大可汗战败 / The Great Khan defeated

- 分类 Category：银河轶事 C8 stories · 来源 Sources：events/marauder_events.txt, common/on_actions/00_on_actions.txt · DLC：Marauders · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

on_ship_destroyed_victim（common/on_actions/00_on_actions.txt:1413）触发隐藏事件 marauder.505（events/marauder_events.txt:7618-7655）：觉醒的劫掠者（awakened_marauders）的大可汗旗舰所在舰队被全歼，且全局标记 great_khan_defeated_once 尚未设置。
Hidden marauder.505 runs when the Great Khan's fleet is wiped out for the first time.

## 剧情脉络 Story outline

1. 505 设标记并流放可汗，向所有玩家国发 marauder.506 “大可汗战败”（可汗并非不可战胜）。 Players are told in 506.
2. 180–360 天后全局事件国家触发隐藏 marauder.523：如果发送者仍存在 → marauder.507（创建可汗的第二支舰队和陆军）→ 玩家收到 marauder.508 “大可汗归来”（可汗的外交消息，按是否为附庸/灭绝者而三种正文）；否则玩家收到 marauder.524 “大可汗被视为已死”。
   180-360 days later hidden 523 either revives the Khan (507 -> player notice 508) or announces 524.
3. 第二次战败走 marauder.509（见“大可汗之死”的后续故事）。 The second defeat is hidden 509 (death story).

## 分支与结局 Branches and outcomes

- 508 与 524 互斥（归来 / 被视为已死）。 508 and 524 are exclusive.
- 524 的两个选项按玩家身份（普通 / 其他）出现。 524's options depend on the player.

## 条件与文明差异 Conditions and variants

- 508 的三种正文：卫星国/反叛卫星国、普通国家、灭绝类政体。 508 has three texts (satrapy, ordinary, genocidal).

## 审阅记录 Review notes

- 已核对 Checked：marauder.505-508、523、524 的触发与分派。
- 不确定 Uncertain：523 中 exists = from 的 from 在脚本里是 505 的发起国；未能从文件独立证实 524 的具体出现条件（when 'from' no longer exists）。
  The exact scope of 'from' in marauder.523 was not verified.
