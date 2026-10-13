# 噬星者 / Stellar Devourer

- 分类 Category：巨兽与城邦 · 来源 Sources：events/leviathans_events_2.txt:13-1171; common/special_projects/00_projects_leviathans.txt:1-50; common/on_actions/00_on_actions.txt:996, :1012-1013, :1452 · DLC：利维坦 Leviathans · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts
第一个舰队进入带有噬星者标记的星系时（leviathans.999“缩小的恒星”），星系行星获得低温修正，7天后噬星者及其所属国家生成（leviathans.1000）。其他玩家在别处看到它时收到 leviathans.1001（每帝国一次）。
The first fleet entering the flagged system gets 999; 7 days later 1000 spawns the Devourer. 1001 is the notice for empires meeting it elsewhere.

## 剧情脉络 Story outline
1. 噬星者游荡时，每进入一个星系，隐藏事件 1005 就把高温修正转移到那里（隐藏机制，未建模）。
2. 被击杀（on_ship_destroyed_perp → 1016）：留下卵鞘和消化器官。选项 a：研究遗骸（项目 STELLARITE_DEAD_PROJECT，60天，科研船）；选项 c：取走卵鞘并开启庆典情境（见庆典故事）——二者互为替代。
3. 项目完成 → 1017：a 重燃恒星（项目 STELLARITE_STAR_PROJECT，90天）；b 收割能量（每月能量/矿物/影响力加成）。
4. 恒星项目完成 → 1018，进入时掷 70:30。

## 分支与结局 Branches and outcomes
- 成功(70%)：EXCELLENT，母星体积+12，冰冻行星升温，其一成为盖亚世界。
- 失败(30%)：科学家死亡、舰队被毁；UNFORTUNATE，恒星体积+8，行星只部分改善。
- 收割能量(1017.b)：持续资源加成，故事结束。

## 条件与文明差异 Conditions and variants
格式塔意识使用不同的 1016/1017 描述；其余分支与文明无关。

## 审阅记录 Review notes
已核对 999/1000/1001/1016/1017/1018 全部选项与项目定义。合并了原先三个单文档故事（event-leviathans-999 / -1001 / -1016）。隐藏的战斗与温度事件 1005–1015 未建模（不确定）。
Checked all options and project definitions; three one-doc stories were merged. Hidden combat/temperature events 1005-1015 are not modelled (uncertain).
