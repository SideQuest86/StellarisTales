# 以太巨龙 / Ether Drake

- 分类 Category：巨兽与城邦 · 来源 Sources：events/leviathans_events_1.txt:7973-8710（610, 640-655）, :9004-9202（670, 675）; common/special_projects/00_projects_leviathans.txt:450-474; common/on_actions/00_on_actions.txt:998, :1641-1643, :2893 · DLC：利维坦 Leviathans · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts
玩家（或堕落帝国）的舰队首次进入有以太巨龙的守护者星系：610 “遭遇以太巨龙”（每个帝国一次）。
The first fleet of a default or fallen empire entering the Drake's system gets 610 (once per empire).

## 剧情脉络 Story outline
1. 遭遇 610（单选项“不祥”）。
2. 战斗中巨龙血量在15%–80%之间时：若我们的舰队被毁，隐藏 648 派龙去报复，并给我们 649“龙来了”；若我们紧急跃迁逃离，650 同样通知，龙会追击并袭击我们有空间站的星系（隐藏 651/652/654，未建模）。血量低于16%时龙撤回休眠修复（隐藏 655）。
3. 击杀（on_fleet_destroyed_perp → 670“屠龙者”）：按能力三选一——300影响力+龙战利品遗物；亡灵师可启动复活项目 REANIMATE_GUARDIAN_DRAGON（1万点，限时1080天，需科学家）→ 675“逝者复生”；能收割DNA者得到DNA标记。指挥官得到“屠龙者”特质，并开启庆典情境（见庆典故事）。

## 分支与结局 Branches and outcomes
- 屠龙 670（三项互斥，由 can_harvest_dna / is_reanimator 决定）。
- 复活 675：生成被动的复活大龙舰队。
- 逃跑/被毁：只产生通知，并让龙追击。

## 条件与文明差异 Conditions and variants
“天龙起源”（Here Be Dragons）有专用 610 文本；格式塔意识使用不同的 649/650 选项。巨龙宝库小行星见“龙之宝藏”故事。

## 审阅记录 Review notes
合并 event-leviathans-610 / -648 / -650 / -670 四个单文档故事。追击与休眠的隐藏事件只在概要层面阅读（不确定）。
Four one-doc stories merged. Hidden pursuit/hibernation events 640-655 were read at summary level only (uncertain).
