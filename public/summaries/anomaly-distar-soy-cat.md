# 杂草丛生的遗迹 / Overgrown Ruins

- 分类 Category：深空异闻 Exploration · DLC：《遥远繁星》Distant Stars（has_distar） · 审阅 Reviewed：2026-10-12（已审阅 reviewed）
- 来源 Sources：common/anomalies/95_anomaly_categories_distant_stars.txt:864-898; events/distant_stars_events_1.txt:9799 (distar.260); events/distant_stars_events_1.txt:9832 (distar.261); events/distant_stars_events_1.txt:9980 (distar.262); common/on_actions/00_on_actions.txt:1307

## 如何开始 How it starts

需要《遥远繁星》。热带、大陆、草原、高山、海洋或盖亚星球可能生成（6级，权重1；被前超光速文明占有的星球为0）。生成时隐藏事件 distar.260 立即在星球上放置城市废墟矿藏、创建前智慧真菌类“家畜”物种（5个人口组）并标记 funlent_planet。

Requires Distant Stars. Can spawn on tropical, continental, savannah, alpine, ocean or Gaia planets (level 6, weight 1; 0 if owned by a primitive civilisation). On spawn the hidden distar.260 adds city ruins, creates a pre-sapient fungoid "livestock" species (5 pop groups) and flags the planet funlent_planet.

## 剧情脉络 Story outline

1. distar.261“野生真核生物”：被植被掩盖的建筑是比我们更先进的文明为真菌类生物建造的培养室，这些温顺的生物被基因定制为造主的食物。各选项都给予社会学研究。
2. 若之后殖民这颗星球（非机械帝国），on_colonized 触发 distar.262“美味的真核生物”：按既有前智慧政策处理（获得影响力），或支付300能量把它们圈进加工栏（获得加工栏矿藏，所有家畜人口被消灭）。

1. distar.261 "Wild Eukaryotes": the overgrown structures were growing chambers built by a civilisation more advanced than ours for the fungoids, which were engineered to be its livestock. Every option rewards society research.
2. If the planet is later colonised by a non-machine empire, on_colonized fires distar.262 "Delicious Eukaryotes": keep to the pre-sapient policies (influence) or pay 300 energy to pen them (processing pens deposit; all livestock pops are killed).

## 分支与结局 Branches and outcomes

distar.261 只有一个结果；distar.262 的两个选项互斥（b 需300能量）。

distar.261 has one result; distar.262's two options are exclusive (b needs 300 energy).

## 条件与文明差异 Conditions and variants

distar.261 的选项文本随文明变化：排外/令人不安（默认）、狂热威权或奴隶公会、吞噬虫群、仆从、同化者、终结者、狂热净化者、演化猎手（获得DNA与局势进度）。

distar.261's option wording varies: default "Disturbing", fanatic authoritarian or Slaver Guilds, Devouring Swarm, Servitor, Assimilator, Terminator, Fanatic Purifier, Evolutionary Predators (DNA and situation progress).

## 审阅记录 Review notes

已核对异常定义（含 on_spawn distar.260）、distar.261、distar.262 与 on_colonized。修正：distar.262 在草稿中是独立故事；现以审阅连接接在异常结果之后。distar.262 不要求先调查异常（标记在生成时设置）。

Checked the anomaly (incl. on_spawn distar.260), distar.261, distar.262 and on_colonized. Correction: distar.262 was a separate story; it now follows the anomaly result through a reviewed link. It does not require the anomaly to be researched (the flag is set on spawn).
