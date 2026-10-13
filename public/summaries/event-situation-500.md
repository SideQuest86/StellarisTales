# 自由落体 / Free Fall

- 分类 Category：文明纪事 Society (C7) · 审阅 Reviewed 2026-10-12
- 来源 Sources：`events/situation_events.txt:806-1573`；`common/situations/01_narrative_situations.txt:626-838`（局势「重力井」）；`common/on_actions/00_on_actions.txt:504`（on_five_year_random_pulse_country）

## 如何开始 How it starts

- 每五年的随机国家检查以 25/2335 的权重运行隐藏事件 500：帝国须拥有一个黑洞星系，其恒星基地为星辰要塞或更高并建有黑洞观测站；每个帝国一次。500 随机挑选这样的星系，并立即触发 501。
  The five-year random country pulse runs hidden event 500 with weight 25/2335: the empire must own a black-hole system whose starbase is a star fortress or larger with a Black Hole Observatory; once per empire. 500 picks such a system and fires 501.
- 501「自由落体」：空间站被碎片撞离稳定轨道，开始坠向黑洞。选择初始方式：撤离、维持轨道或前进（越靠近，暗物质与物理研究产出越高）。
  501 "Free Fall": debris knocks the station out of its stable orbit and it begins to spiral in. Choose the starting approach: Retreat, Maintain Orbit or Advance (the closer, the more Dark Matter and physics output).

## 剧情脉络 Story outline

1. 局势「重力井」从 25% 开始。每月基础 +5；中、高阶段与不归阶段分别再加 2/3/7 的引力；撤离 -10、维持 -3、前进 +3。
   The situation "Gravity Well" starts at 25%. Base +5 per month; the mid, high and no-return stages add 2/3/7 pull; Retreat -10, Maintain -3, Advance +3.
2. 每月随机事件（可能都不发生，顺序不定）：510「深渊致意」/ 511「黑暗之怖」兵变（非格式塔；把方式锁定为前进/撤离，20–45 天后 513「夺回控制」恢复原方式）、520「比预想更近」（+10）、530「黑暗发现」（物理研究）、540「彭罗斯过程」（进度 ≥70，仅一次：拆除空间站全部建筑后 15 天，70% 541 进度 -30，30% 542 进度 -10；也可拒绝）。
   Monthly random events (possibly none, any order): mutinies 510 "Hello Darkness" / 511 "Fear of the Dark" (non-gestalt; they lock the approach to Advance / Retreat until 513 "Regaining Control" 20–45 days later), 520 "Closer Than We Thought" (+10), 530 "Dark Discoveries" (physics research), 540 "The Penrose Process" (progress ≥70, once: strip all station buildings and 15 days later 70% 541 progress -30 or 30% 542 -10; or refuse).
3. 80%：580「不归点」——推进器已无法抵抗引力。
   At 80%: 580 "Point Of No Return" — the thrusters can no longer resist the pull.

## 分支与结局 Branches and outcomes

- 100% → 590「事件视界」：空间站与舰队被摧毁。非格式塔只能接受（-100 影响力）；蜂巢/机械帝国可选择“目睹坠落”，2 天后 591（好，获得研究与正面修正）或 592（坏，负面修正），基础 5:5，受公民性质影响。
  100% → 590 "Event Horizon": the station and its fleet are destroyed. Non-gestalts can only accept it (-100 influence); hive/machine empires may "witness the fall": 2 days later 591 (good: research and a positive modifier) or 592 (bad: a negative modifier), base 5:5, shifted by civics.
- 0% → 逃脱：隐藏 595 以 5:5 选择 596「来自黑暗的归还」（大量物理研究）或 597（同名，获得一位 6 级科学家）。
  0% → escape: hidden 595 picks at 5:5 between 596 "Back From Black" (a large physics reward) and 597 (same title, grants a level-6 scientist).
- 坠落与逃脱互斥。
  Falling in and escaping are mutually exclusive.

## 条件与文明差异 Conditions and variants

- 510 的正文按唯心主义与否、511 按是否见过事件视界（曾经历 distar.20 或 anomaly.3070 的旗标）而不同；590/591/592 有蜂巢、机械与普通帝国的不同写法。
  510's text differs for spiritualists, 511's for empires that have seen an event horizon before (flag from distar.20 / anomaly.3070); 590/591/592 have hive, machine and regular versions.

## 审阅记录 Review notes

- 已核对：500–597 全部事件、局势定义（初始值、阶段、每月进度与引力、方式、每月事件权重、on_progress_complete/on_fail）。
  Checked: all events 500–597 and the situation definition (initial value, stages, monthly progress and pull, approaches, monthly weights, on_progress_complete / on_fail).
- 更正 Corrections：590 由局势卡下改接在 580 之后（只有经过不归阶段才会到 100%）；兵变后 513 的连接注明延迟。
  590 moved from under the situation card to after 580 (100% is only reached through the no-return stage); the mutiny → 513 links note the delay.
- 备注：源码注释把 596/597 的奖励写反了，本指南以实际效果为准。
  Note: the script comments swap the rewards of 596/597; this guide follows the actual effects.
