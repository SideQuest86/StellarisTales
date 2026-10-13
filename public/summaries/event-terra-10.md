# 环境改造 / Terraforming

- 分类 Category：银河轶事 C8 stories · 来源 Sources：events/terraforming_events.txt:133–518（隐藏随机池 terra.10）、520–1640、events/strange_worlds_terraforming_events.txt、common/on_actions/00_on_actions.txt:2118（on_terraforming_complete）· 部分结果需要 DLC：霸主、植物人物种包、远古遗物、生物起源 · 审阅 Reviewed 2026-10-12

## 如何开始 How it starts

一颗星球环境改造完成时（on_terraforming_complete），隐藏事件 terra.10 检查：星球位于非荒野帝国的领域内、此前没改造过（terraformed_once）、不是遗迹/城市世界、可以拥有宜居矿藏。随后从一个随机池中最多抽一件事，权重30为什么都不发生。每颗星球只会抽一次。
When a planet finishes terraforming, hidden terra.10 (once per planet, not relic/city worlds, not wilderness empires) draws at most one event from a weighted pool; weight 30 means nothing happens.

## 剧情脉络 Story outline

随机池中的结果（权重与条件）/ Pool entries (weight, condition):

- 过剩的环境改造设备（3，殖民地且有空余区划）、改造的美景（3，非死寂世界）、环境改造难题（3，空余区划少于4）。
- ［母星］二号（2，改造成本国理想星球类别，非母星，每国一次）、行星策略（2，非殖民地且非由荒芜/死寂改造而来）、成功过头（3，非荒芜起源、非盖亚）。
- 真一（0.5，蜂巢）、完美的组织（2，格式塔），二者均排除荒芜/死寂改造。
- 出土［前超光速文明］（2，荒芜改造且有霸主DLC）、有所帮助的瑕疵（3，荒芜改造）。
- 未曾预料的突变（2，盖亚殖民地、使用消费品、非生命播种/进化掠食者起源）、［星球］此处便是天堂（2，盖亚、非格式塔、非母星、每国一次）。
- 辐射植物（2，死寂世界改造，植物人物种包，尚未取得辐射营养基因）：可保护、启蒙（项目“启蒙辐合植物”→“辐光四溢的招待会”，新物种加入）、采集基因或继续改造。
- 武器贮藏室（2，死寂世界改造，远古遗物，每国一次；地球为50倍）：创建考古遗址，三个阶段“揭开尘封的过去”→“军械库”→“翻译错误”。
- 生物起源的奇异世界（各5，每国一次，按改造前后的星球类别）：矿化熔岩隧道、遇水即活的卵、冰封异种（狩猎/研究/保护后3600天出现“休眠介质”）、钢之山、可燃大气（需已发现易爆微粒）、蓝色熔岩、永恒闪电、天空墓穴。

## 分支与结局 Branches and outcomes

- 池中各项互斥，一次改造最多一件；不同星球的改造可以各自抽到不同事件，标为“每国一次”的不会重复。
  Entries are exclusive per terraforming; "once per empire" entries never repeat.
- 有后续的只有：辐射植物的启蒙项目、武器贮藏室遗址、冰封异种的休眠介质。
  Only the Radiotrophic project, the Weapons Cache site and the Hibernators have follow-ups.

## 条件与文明差异 Conditions and variants

- 多个事件的选项按蜂巢/机械/格式塔、排外、进化掠食者等改变；“天空墓穴”的排除条件写法特殊（见审阅说明）。
  Options vary by empire type and ethics; Sky Burials has an unusual exclusion clause.

## 审阅记录 Review notes

- 已核对 Checked：terra.10 的全部权重与排除条件、各结果事件、ENLIGHTEN_RADIO 项目、site_tombworld_weapon_cache（权重0，只由 terra.90 创建）、strange_worlds.1010 → 1035（3600天）。
- 更正 Corrections：故事原以第一项“过剩的环境改造设备”为题，实为整个改造完成随机池；改为游戏原文“环境改造”，并把全部结果标为互斥组。
  The story was titled after its first outcome; it is the whole pool, now titled "Terraforming" (game text) with an exclusive group.
- 覆盖范围 Coverage：本故事全部文档已核对；“以错为鉴”（清除改造障碍时触发）是独立故事。
