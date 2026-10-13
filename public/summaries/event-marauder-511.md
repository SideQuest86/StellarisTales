# 大可汗之死 / The Death of the Great Khan

- 分类 Category：银河轶事 C8 stories · 来源 Sources：events/marauder_events.txt, common/on_actions/00_on_actions.txt, common/scripted_effects/marauder_scripted_effects.txt · DLC：Marauders · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

三个入口都汇入同一条通知 marauder.513：
Three entries lead to the same notice 513:
- marauder.511（on_monthly_pulse，common/on_actions/00_on_actions.txt:88；events/marauder_events.txt:7841-7868）：劫掠危机已开始、可汗未死亡、可汗国家由AI控制时，每月 2% 几率触发 512（98% 无事）→ 随机设置死因（中毒 / 疾病 / 暗杀 / 情人，各10）→ 513。 Monthly 2% natural death (poison, disease, assassination, concubine).
- marauder.514（marauder_scripted_effects.txt:1405）：可汗在 10800–15800 天后“死于年老”→ 513。 Old age after 10800-15800 days.
- marauder.711（on_leader_death，common/on_actions/00_on_actions.txt:2386；events/marauder_events.txt:10254-10281）：任何带 great_khan 标记的领袖死亡时补设全局标记，10 天后 712（若还没处理过）→ 当作年老死亡 → 513。 Failsafe on leader death -> 712 -> 513.

## 剧情脉络 Story outline

1. marauder.513 “大可汗之死”：向玩家国（非“可汗后裔”扮演者）通知，正文按死因标记（毒 / 病 / 刺 / 情 / 老）而变。 Notice with five cause texts.
2. 同时 200–300 天后隐藏 marauder.600 “部落的未来”（events/marauder_events.txt:9082-9142），随机一种：60 分裂为继业者（需 ≥6 个星球 → 601）、10 新汗国（需 ≥1 个星球 → 602，640 “新汗国”）、10 民主联邦（需 ≥2 个卫星国 → 603，660/661 “新银河部落”）、10 回归旧俗（仅当没有星球 → 604，630 “部落回归旧俗”）。 Aftermath notices 620 (Horde splinters), 640 (New Khanate), 660/661 (New Galactic Horde), 630 (old ways), 670/671 (satrapies end, garrisons withdrawn) belong to the second-defeat story.
   200-300 days later hidden 600 picks one fate: Diadochi (60), New Khanate (10), Democratic Federation (10), Old Ways (10, only without planets).

## 分支与结局 Branches and outcomes

- 部落未来的四种结局互斥（权重 60 / 10 / 10 / 10，有星球数门槛）。 Four exclusive fates with planet gates.
- 这些结局事件（620-671）是同一事件链，与“大可汗战败”并行的另一故事“大可汗…（509）”共享，不在此重复。 The aftermath events are shared with the second-defeat story.

## 条件与文明差异 Conditions and variants

- 已死亡（全局标记 great_khan_dead）后不再触发 511。 Once great_khan_dead is set, 511 stops.

## 审阅记录 Review notes

- 已核对 Checked：511、512、513、514、600、711、712 的触发与分派。
- 更正 Corrections：marauder.711（领袖死亡补漏）原是独立故事，其后果与 511 相同，现并入。
  The 711 failsafe story is merged because it ends in the same 513.
- r3-integrate（2026-10-13）：并入原 event-marauder-711（补漏路径）：on_leader_death（00_on_actions.txt:2386）触发隐藏 marauder.711（events/marauder_events.txt:10254-10281），死者带 great_khan 领袖标记时补设全局标记 great_khan_dead、清理可汗领袖，10天后 marauder.712（若尚未处理死亡：按年老死亡处理）→ 玩家通知 marauder.513，200–300天后 marauder.600 决定部落未来；与 511/514 的自然死亡路径互斥（khan_dead_event_fine 标记）。
  r3-integrate (2026-10-13): Folded in the former event-marauder-711 (failsafe path): on_leader_death (00_on_actions.txt:2386) fires hidden marauder.711 (events/marauder_events.txt:10254-10281); for a great_khan leader it sets the global flag great_khan_dead and clears the Khan leader, 10 days later marauder.712 (treats the death as old age if not yet handled) -> player notice marauder.513, 200-300 days later marauder.600 decides the horde's future; exclusive with the natural-death path of 511/514 (khan_dead_event_fine flag).
