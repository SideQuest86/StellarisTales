# 大可汗之死（领袖死亡补漏） / Great Khan death failsafe

- 分类 Category：银河轶事 C8 stories · 来源 Sources：events/marauder_events.txt, common/on_actions/00_on_actions.txt · DLC：Marauders · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

on_leader_death（common/on_actions/00_on_actions.txt:2386）触发 marauder.711（events/marauder_events.txt:10254-10281）：死者带 great_khan 领袖标记。

## 剧情脉络 Story outline

711 补设全局标记 great_khan_dead、清理可汗领袖，10 天后 marauder.712（若尚未处理死亡：按年老死亡处理）→ 玩家通知 marauder.513，200–300 天后 marauder.600 决定部落未来。内容见“大可汗之死”(event-marauder-511)。

## 分支与结局 Branches and outcomes

- 与 511 / 514 的自然死亡路径互斥（khan_dead_event_fine 标记）。

## 条件与文明差异 Conditions and variants

- 无。

## 审阅记录 Review notes

- 已核对 Checked：marauder.711、712。通知页由 event-marauder-511 持有。
