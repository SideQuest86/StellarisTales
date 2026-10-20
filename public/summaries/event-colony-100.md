# 废弃地形改造设备 / Abandoned Terraforming Equipment

- 分类 Category：文明纪事 Society (C7)

## 如何开始 How it starts

- 殖民地2岁（权重15/958）或3岁（10/739）时的随机事件；每个帝国一次（abandoned_terraforming_country）；非机械/荒野帝国；星球不是核爆、盖亚、遗迹、方舟，且星球类型与帝国的理想类型之一一致。
  Random colony event at age 2 (15/958) or 3 (10/739); once per empire (abandoned_terraforming_country); non-machine, non-wilderness empire; excludes nuked, Gaia, relic and ark worlds, and the world must match one of the empire's ideal classes.

## 剧情脉络 Story outline

- 100「废弃地形改造设备」：启用项目1“继续改造”与项目2“拆除设备”。
  100 "Abandoned Terraforming Equipment": enables project 1 "Resume Process" and project 2 "Dismantle Equipment".
- 项目1成功 → 随机一个结果（各25%）：104改变星球类型、105「变异生物」入侵、106盖亚世界、107墓地世界。
  Project 1 success -> one of four outcomes (25% each): 104 planet class change, 105 "Mutated Creatures" invasion, 106 Gaia world, 107 Tomb world.
- 105：变异体入侵。击退 → 108「击败怪物」；失守 → 113「变异体占领」；夺回 → 114「解放」。108/114 之后进入每月随机（平均240个月）的109「变异潜伏者」→ 击杀项目：成功110，失败时111（潜伏者老死）或112（繁殖出新国家）各50%。
  105: mutants invade. Repelled -> 108 "Creatures Defeated"; lost -> 113 "Mutants Overrun"; retaken -> 114 "Liberation". After 108/114, 109 "Mutant Stalker" (mean 240 months) offers a kill project: success 110; on failure 111 (died of old age) or 112 (multiplied into a new country), 50% each.
- 项目2成功 → 101「设备已拆除」（获得地形塑造科技或资源），之后每月随机出现102「不稳定的天气」与103「干旱」，各至多一次。
  Project 2 success -> 101 "Dismantled" (grants terrestrial sculpting or resources), after which 102 "Unstable Weather" and 103 "Drought" can each occur once at random.

## 分支与结局 Branches and outcomes

- 项目1/2互斥；104–107 互斥；111/112 互斥；102/103 并行。
  Projects 1/2 are exclusive; 104-107 exclusive; 111/112 exclusive; 102/103 parallel.

## 条件与文明差异 Conditions and variants

- 末日文明或具核爆星球偏好的物种在107得到不同选项；103的选项按能量储备分档付费。
  Apocalyptic empires or species preferring nuked worlds get different 107 options; 103 offers energy-priced options by stockpile tier.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：`events/colony_events_1.txt:2185-3175`；`common/on_actions/00_on_actions.txt:832,864,880,3758,3810`
- 已核对：触发、项目、四个结果、变异体入侵的标志与三个 on_action 衔接、102/103/109 的触发标志。
  Checked: trigger, projects, four outcomes, mutant-invasion flags and the three on_action links, trigger flags of 102/103/109.
- 更正：108、113、114、102、103 原为孤立的单窗口故事，现并入。
  Correction: 108, 113, 114, 102 and 103 were isolated one-window stories; merged here.
