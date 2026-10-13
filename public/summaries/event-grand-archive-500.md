# 策展人：收藏奖励 / Curators: collection rewards

- 分类 Category：银河轶事 C8 stories · 来源 Sources：events/grand_archive_events.txt, common/on_actions/00_on_actions.txt · DLC：Grand Archive · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

隐藏事件 grand_archive.4120（events/grand_archive_events.txt:4961-4990）挂在 on_post_communications_established_always_fire（common/on_actions/00_on_actions.txt:2286）、on_megastructure_built（3664）与方舟模块 arkship_grand_archive：已与策展人联络（或策展人已被灭绝而有替代国）、没有攻击过策展人、拥有大档案馆时，30 天后触发 4121“策展人”（外交窗口，选项“很好”并增加信任 +10），再过 30 天启动收藏奖励循环 4100。
Hidden 4120 (on contact, when a Grand Archive is built, or for the arkship module) fires 4121 Curators after 30 days, then starts the reward loop 4100.
策展人被灭绝时（grand_archive.500，events/grand_archive_events.txt:213-286）会创建替身国“策展人团”，让所有玩家国家重新联络并按情况进入 4100 或 4120。
If the Curators are destroyed, hidden 500 creates a stand-in country so the loop continues.

## 剧情脉络 Story outline

1. 4100 → 4101（360–540 天后）：若没有类别符合条件则清除标记，否则按 if/else_if 触发第1阶段（4105）→ 第2阶段（4106）→ 第3阶段（4107）事件之一；每个奖励事件结束后又回到 4100，直至所有可得奖励领完或跳过。
   4100 -> 4101 (360-540 days) fires the first eligible stage event 4105 / 4106 / 4107; each ends by returning to 4100.
2. 第1、2阶段：每类别（异星地质 / 美学奇观 / 历史器物）按所选的奖励付 1000 能量（@curator_stage_1/2_price）；第3阶段付 5000，并在遗物与资源之间选择（先抽出两件遗物）。
   Stages 1-2 cost 1000 energy, stage 3 costs 5000 and offers relics; every stage can be declined ("no").

## 分支与结局 Branches and outcomes

- 每个周期只触发一个阶段事件（if / else_if，互斥）；类别也按顺序判断（异星地质→美学奇观→历史器物）。
  One stage per cycle (if/else_if), and one category per event.
- 灭绝型帝国不走这条线，见“次等者的饰品”。 Homicidal empires use Trinkets from our Lessers instead.

## 条件与文明差异 Conditions and variants

- 条件 can_get_collection_rewards_from_curators 等由展品数量（on_specimen_acquired / on_exhibit_unlocked 触发 4100）决定。 Eligibility depends on exhibits unlocked.

## 审阅记录 Review notes

- 已核对 Checked：4100-4121、500、4110/4115（五年脉冲的联络）及各阶段事件的触发与选项。
- 更正 Corrections：编译器把 4105/4106/4107 互相连成环；现改为 4121→4105→4106→4107 的先后顺序，循环写在说明中。
  The compiler looped 4105/4106/4107 into each other; now 4121 -> 4105 -> 4106 -> 4107 in stage order.
- 说明 Note：“策展人”的联络事件 leviathans.502 / 500 属于故事“策展人”（守护者类）。
