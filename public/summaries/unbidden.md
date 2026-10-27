# 破界者：异次元入侵 / The Unbidden

- 分类 Category：天灾 Crisis

## 如何开始 How it starts

- 终局五年检查（`crisis_trigger.1`）选中破界者（基础权重 8）时，200–800 天后隐藏事件 `crisis.1000` 在某星系撕开传送门。星河卫士项目 4/5 也可能召来。
  When the endgame five-year check (`crisis_trigger.1`) selects The Unbidden (base weight 8), 200–800 days later the hidden event `crisis.1000` tears open a portal in a system. Defender of the Galaxy projects 4/5 can also summon them.
- 对该星系有高情报的帝国直接收到“破界者”（1007）；其余帝国先收到“星系能源波动”（1008），30天后才确认威胁（1009）。两条开场都接到“截获的信号”（1010）。
  Empires with high intel on that system receive "The Unbidden" directly (1007); the others first receive "Stellar Energy Fluctuation" (1008) and confirm the threat only 30 days later (1009). Both openings lead to "Intercepted Signal" (1010).

## 剧情脉络 Story outline

1. 开场（按情报二选一）→ 截获的信号。此后可随时联络破界者（1050，可重复）；每当一处殖民地被轰炸至毁灭会收到通报（1011，可重复）。若有银河监管人或帝皇，30天后收到宣告/求援。
   Opening (one of two, by intel) -> Intercepted Signal. Afterwards The Unbidden can be contacted at any time (1050, repeatable); each time a colony is bombarded to destruction, a notice arrives (1011, repeatable). If a Galactic Custodian or Emperor exists, a proclamation or appeal arrives 30 days later.
2. **第二道传送门**：破界者占据银河15%或超过90个星系后（隐藏事件1100，平均12个月）出现“背道者”（1110）；可联络（1051）。
   **Second portal**: after The Unbidden hold 15% of the galaxy or more than 90 systems (hidden event 1100, on average 12 months), the "Apostates" appear (1110); they can be contacted (1051).
3. **两派交战**：两股异次元势力首次互相歼灭舰队时收到“背道者”（1112→1113）。
   **Two factions at war**: the first time two otherworldly factions wipe out each other's fleets, the player receives "Apostates" (1112 -> 1113).
4. **第三道传送门**：交战之后（隐藏事件1200，平均40个月）“狂热者”出现（1210→1211）；可联络（1052）。
   **Third portal**: after the fighting (hidden event 1200, on average 40 months) the "Fanatics" appear (1210 -> 1211); they can be contacted (1052).
5. **摧毁传送门**：每道传送门被毁时，按其余传送门是否已全部摧毁二选一：1013/1016、1116/1117、1216/1217。最后一道被毁时，人类摧毁者可俘获“术士”（1250，遗珍）。
   **Destroying portals**: each time a portal is destroyed, one of two events is chosen depending on whether all the other portals have already been destroyed: 1013/1016, 1116/1117, 1216/1217. When the last one is destroyed, a human Destroyer can capture the "Warlock" (1250, relic).
6. **结局**：最后一个异次元势力覆灭（年度检查在无传送门、无行星且舰船少于20艘时移除）→“击退入侵”（1271）。
   **Ending**: when the last otherworldly faction is destroyed (the annual check removes it when there are no portals, no planets and fewer than 20 ships) -> "Invasion Repelled" (1271).

## 分支与结局 Branches and outcomes

- 唯一结局事件是胜利（1271）；脚本没有入侵者获胜的结局事件。
  The only ending event is victory (1271); the script has no ending event for the invaders winning.
- 互斥：开场 1007/1008；三组传送门被毁通报。第二、第三道传送门不是必然出现（取决于势力规模与交战）。
  Mutually exclusive: openings 1007/1008; the three portal-destroyed notice pairs. The second and third portals do not always appear (depending on faction size and fighting).

## 条件与文明差异 Conditions and variants

- 外交界面对灵能物种、机械帝国/机械物种显示不同开场白和回应；背道者在有“无形”舰队指挥官时另有台词。
  The diplomacy screen shows different opening lines and responses for psionic species and machine empires or species; the Apostates have different lines when a "Formless" fleet commander exists.
- 开场选项按政府思潮区分。
  Opening options differ by government ethics.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-12 (c5b-crisis)
- 来源 Sources：`events/crisis_events_2.txt`, `events/crisis_trigger_events.txt:131-202`, `events/observer_events.txt:618-727`
- 审阅者导读（评注），不是游戏原文。 / Reviewer commentary, not game text.
- 已核对 Checked: crisis_events_2.txt 全部可见事件与隐藏路由（L13-4245）、on_action 调用（00_on_actions.txt:235, 711-713, 1406-1408, 1634, 2160, 3608）、观察者副本 observer.34–40。
- 更正 Corrections: 原草稿只有开场两篇在主树，其余均为“次要入口”；现按传送门与交战条件建立完整结构，并把三组传送门通报标为互斥。
- 不确定 Uncertain: 第二、第三道传送门的“术士”调用写在异次元国家作用域（L1772-1778、L2320-2326），只有第一道明确发给人类摧毁者；传送门分支条件按脚本照录（例如第三道从未出现时摧毁第二道，显示“仍有其他传送门”）。
- 覆盖范围 Coverage: 35 篇，全部审阅。
