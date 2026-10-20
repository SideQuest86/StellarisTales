# 烈焰灰烬 / From The Ashes

- 分类 Category：先驱者与考古 Precursors · DLC：《地狱》Infernals（需 has_infernals，遗址文件 14_infernals_arc_sites） Infernals (needs has_infernals)

## 如何开始 How it starts

随机遗址：权重+100，出现在熔岩星球（pc_molten）上；没有 has_infernals 时权重为0；全银河最多一处（common/archaeological_site_types/14_infernals_arc_sites.txt:2）。

A random site: +100 on molten planets (pc_molten), weight 0 without has_infernals; at most one per galaxy (common/archaeological_site_types/14_infernals_arc_sites.txt:2).

## 剧情脉络 Story outline

灼热星球上由石化有机材料建成的废墟，属于一个目睹生态崩溃、迎接火雨终局的文明；他们把末日前的文字刻在青铜片上。

1. 遗落帝国：石化有机材料的废墟，今已无来源的建材
2. 末日见证：地下青铜档案库
3. 厄运逼近：地下墓窟，守卫雕像是已灭绝的本地动物（中型文物）
4. 烈火终结：末日：文明目睹生态崩溃，用文字和艺术记录最后的火焰（两个反应；大型文物）

Ruins of petrified organic material on a scorching world, a civilisation that watched its ecosystem collapse and wrote its last days on bronze sheets.

1. Forgotten Empire: ruins of petrified organic material with no present source
2. Witnesses of Demise: an underground archive of bronze sheets
3. Incoming Doom: a catacomb guarded by statues of extinct fauna (medium artifact)
4. Blazing Downfall: the end: a civilisation that saw its ecosystem collapse recorded its fiery last days (two answers; large artifact)

## 分支与结局 Branches and outcomes

## 条件与文明差异 Conditions and variants

- 本遗址的 on_roll_failed 把事件池参数设为 no_events（不存在同名事件池），所以掷骰失败不会触发随机意外。 / The site passes RANDOM_EVENTS = no_events to its roll-failure effect (no pool of that name exists), so a failed roll triggers no incident.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：common/archaeological_site_types/14_infernals_arc_sites.txt:2；events/infernals_1_events.txt:5760
- 已核对：遗址定义（common/archaeological_site_types/14_infernals_arc_sites.txt:2）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/14_infernals_arc_sites.txt:2) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
