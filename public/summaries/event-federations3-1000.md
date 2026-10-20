# 地下室位移 / Basement Shift

- 分类 Category：文明纪事 Society (C7)

## 如何开始 How it starts

- 建筑完成时（on_building_complete）隐藏 federations3.1000：已安装远古遗物DLC，玩家非AI，全局没有人触发过铁路遗址；星球为未超3000人口的殖民地（非首都/栖息地/环世界等），刚建好的建筑是豪华住宅/集体住房/无人机仓库/蜂巢兵营之一。通过后 1/26 概率3天后触发 1005。
  When a building completes (on_building_complete) hidden federations3.1000: Ancient Relics installed, a non-AI player, nobody has triggered the Relic Rails dig site globally; the planet is a colony under 3000 pops (not capital, habitat, ring …) and the building just completed is a luxury residence / communal housing / drone storage / hive warren. It then has a 1/26 chance of 1005 after 3 days.

## 剧情脉络 Story outline

- 1005「地下室移位」→ 遗址“铁路遗迹”：阶段事件 1010「车库存货」、1015「武装访客」、1020「持盾者」→ 1022「驶向另一条轨道」（83%）/1021「悲剧线圈」（17%）；1026「重新服役」（83%，经修正）→ 1030「铁轨与庇护所」/1027「空空如也的棚屋」（17%）。
  1005 "Basement Shift" -> the "Relic Rails" site: stage events 1010 "Depot Deposits", 1015 "The Well-Armed Visitor", 1020 "The Targe-Bearer" -> 1022 "Onto a Different Track" (83%) / 1021 "Tragic Coil" (17%); 1026 "Back in Service" (83%, modified) -> 1030 "Rails and Refuge" / 1027 "Naught But Empty Sheds" (17%).

## 分支与结局 Branches and outcomes

- 1022 与 1021 互斥；1026 与 1027 互斥。
  1022 and 1021 are exclusive; 1026 and 1027 are exclusive.

## 条件与文明差异 Conditions and variants

- 遗址阶段的事件按随机选取。
  Site stage events are picked at random.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：`events/federations_events_3.txt:454-1320`；`common/on_actions/00_on_actions.txt:2958`
- 已核对：触发条件、概率、阶段结果。
  Checked: trigger conditions, probabilities, stage results.
- 说明：结局引向的 ancrel.* 事件属于远古遗物故事，由其他审阅者负责。
  Note: the ancrel.* events this leads to belong to ancient-relics stories owned by another reviewer.
