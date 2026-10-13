# 虚空虫行为与虚空虫疫 / Voidworms Behavior and the Voidworm Plague
- 分类 Category: society (situation) · 来源 Sources: common/situations/11_grand_archive_situations.txt:6-312; events/grand_archive_events.txt:732-847, 1535-1710, 1808-2650; common/inline_scripts/grand_archive/voidworm_crisis_random_events.txt · DLC: Grand Archive · 审阅 Reviewed 2026-10-13 (r2-society)

## 如何开始 How it starts
- 中文：虚空虫国家被创建时（`create_voidworms_country`，grand_archive_effects.txt:25-57）自动启动国家局势 `voidworm_country_situation`——银河生成时的虚空虫星系初始化器、五年脉冲 `grand_archive.1005`（权重 1/5）、`grand_archive.8310` 都可能创建它。它只有一个阶段、一种方式“无所事事”，进度恒为0；真正的内容在它的每月事件里。
- English: The country situation `voidworm_country_situation` starts when the Voidworms country is created (`create_voidworms_country`): by the galaxy-generation voidworm system initializers, by the five-year pulse `grand_archive.1005`, or by `grand_archive.8310`. It has one stage and one approach and its progress stays 0; the content is in its monthly event.

## 剧情脉络 Story outline
1. **每月脉冲**（隐藏 `grand_archive.2055`）：每月触发 2065（有虫巢且虫群舰船少于星系规模阈值时，按 5:150 补充一批虫群舰队）；每12个月触发 2300；虫巢存在且到重生间隔时触发 2460（小规模补充）。 / Monthly pulse: hidden 2055 fires 2065 (a small 5:150 fleet top-up), every 12th month 2300 (crisis check) and, on the respawn interval, 2460.
2. **危机开始检定** 2300（隐藏）：需要游戏已过至少3年中期、尚未终局、危机未曾开始、虫群国家仍有虫巢，并通过随机检定（滚点 0–100 对“起始概率”，上限50）。成功后设置全局标记、把虚空虫国家变为危机类型，给每个玩家国发出 **2310 虚空虫疫**，360 天后 2305 开始周期性补充危机舰队。 / The yearly check 2300 needs 3+ mid-game years, no end game, no earlier crisis and surviving nests, then a random roll against the start chance (cap 50). On success the voidworm country becomes the crisis type and each playable empire receives **2310**.
3. **2310 虚空虫疫**：启动事件链“根除虚空虫”（找到所有虫巢）并开始 **虚空虫疫局势** `situation_voidworm_plague`。已拥有免疫科技的国家开局即获得 +100 进度，等同于立即完成。 / 2310 begins the 'Eradicate the Voidworms' chain and the plague situation; an empire that already has the immunity technology gets +100 progress at once.
4. **虚空虫疫局势**（进度 0→600，阶段 200/400/600）：四种方式：无所事事、支援舰队、清除感染人口、寻找治疗方法，每月进度基础 +0.5，分别 +0 / +0.5 / +0.7 / +1.0；击杀虚空虫和清除人口也推进进度（每人口 +3）。阶段二与阶段三首次进入时，按**当时所选方式**随机抽一件事件（等权，已发生的不再抽，故最多两件）：
   - 支援舰队：2400 多余的零件 / 2405 号召入伍 / 2410 前线的新发明
   - 清除感染人口：2420 领袖受染（需要有机科学家） / 2425 隔离带缺口（需要受感染殖民地） / 2430 玩忽职守（格式塔、机械、杀戮帝国不出现）
   - 寻找治疗方法：2440 平行突破 / 2445 早期测试（机械物种不出现；含五个选项） / 2450 虚空虫腺体（第二项启动特殊项目 `VOIDWORM_GLANDS_PROJECT`）
   “无所事事”没有事件。 / Stages 2 and 3 each draw one random event from the pool of the current approach (none for 'do nothing').
5. **完成**：进度满，局势销毁并触发 **2500 发现治疗方法**；该国之后不再受虫群轰炸。所有玩家国都治愈后整个危机结束。 / At completion the situation is destroyed and **2500 Cure Discovered** shows; once all playable empires are cured the crisis ends.

（并入自 event-grand-archive-2040，评注）“寻找治疗方法”的 2450 第二选项启动 VOIDWORM_GLANDS_PROJECT；项目进行中若击毁一只正在轰炸的敌对虚空三头虫（on_fleet_destroyed_perp），隐藏事件 2040 中止该项目、创建尸骸并启用 VOIDWORM_TITAN_DEBRIS_PROJECT（40天）→ 2455“取回腺体”：团结月度加成，并给虚空虫疫局势加100进度。

(Merged from event-grand-archive-2040; commentary.) The second option of 2450 (Search for a Cure) starts VOIDWORM_GLANDS_PROJECT; if, while it runs, a bombarding hostile Voidworm Troika is destroyed (on_fleet_destroyed_perp), hidden 2040 aborts the project, creates a carcass and enables VOIDWORM_TITAN_DEBRIS_PROJECT (40 days) -> 2455 "Glands Recovered": a monthly unity bonus and +100 progress to the Voidworm Plague situation.

## 分支与结局 Branches and outcomes
- 治愈结局：2500（见上）。 / Cure: 2500.
- 另一种终结：摧毁最后一个虚空虫巢穴（`grand_archive.2051`）会给局势进度直接加1000并结束危机与事件链，随后出现 2053/2052（故事 event-grand-archive-2051）。 / Alternative end: destroying the last nest adds 1000 progress, ends the crisis and chain, then shows 2053/2052 (separate story).
- 每个方式内的三件随机事件互斥地抽取（见分组）。 / The three events of each approach are drawn exclusively.

## 条件与文明差异 Conditions and variants
- 2310 的文本随是否已与虚空虫国家通讯、是否有免疫科技而变；2420/2430/2445 对机械、格式塔等有排除条件。 / 2310's text varies with contact and immunity; 2420/2430/2445 have species and ethic exclusions.

## 审阅记录 Review notes
- 已核对 Checked: the situation definitions (6-312), the inline random-event script, 2055/2065/2300/2305/2310/2460/2500 and the 24xx events, create/end crisis effects, and the nest-destruction event 2051; callers via callers.py.
- 更正 Corrections: grouped the 9 random stage events into three approach pools (the compiler listed them as one flat set); added the cross-story bridge to the 2051 eradication story.
- 不确定 Uncertain: the numeric start chance (script values) and the reward details of each 24xx option were not evaluated. 冻结虫 (situation_frenzied_voidworms) and 破坏 (situation_sabotage) belong to the origin story, not here.
- r3-integrate（2026-10-13）：合并了 event-grand-archive-2040（events/grand_archive_events.txt:509-560、2597-2615；project 04_projects_grand_archive.txt:739-757），增加 GLANDS → TITAN_DEBRIS 条件桥接。
  r3-integrate (2026-10-13): Merged event-grand-archive-2040 (events/grand_archive_events.txt:509-560, 2597-2615; project 04_projects_grand_archive.txt:739-757) with a GLANDS -> TITAN_DEBRIS conditional bridge.
