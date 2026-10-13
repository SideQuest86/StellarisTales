# 索林原虫：银河之外 / The Prethoryn Scourge

- 分类 Category: 天灾 Crisis · 来源 Sources: `events/crisis_events_1.txt`, `events/crisis_trigger_events.txt:9-375`, `events/observer_events.txt:507-616`, `common/special_projects/00_projects_1.txt:3235-3263`, `common/relics/relics.txt:785-837` · 审阅 Reviewed 2026-10-12 (c5b-crisis)

> 以下为审阅者导读（评注），不是游戏原文；原文见各篇章。 / Reviewer commentary, not game text.

## 如何开始 How it starts

- 游戏进入终局后，每五年的检查（`crisis_trigger.1`，on_five_year_pulse）从索林原虫、破界者、肃正协议、塞塔娜或“无事发生”中随机选择（基础权重 10/8/10/10/120，受终局年份、天灾类型设置、堕落帝国等修正）。选中索林原虫时，200–800 天后隐藏事件 `crisis.10` 向所有帝国发送“亚空间回声”（crisis.11）。
- 星河卫士的项目 4/5 也可能召来本天灾（`06_projects_nomads.txt:443, 607`）。
- The end-game five-year check picks a crisis at random; for the Prethoryn, hidden crisis.10 sends *Subspace Echoes* 200–800 days later. Defender of the Galaxy projects 4/5 can also summon it.

## 剧情脉络 Story outline

1. **三个预兆（按时间先后，由全局标记串联）**：亚空间回声 → 随机延时（隐藏事件12，平均600个月）接近星系外缘 → 随机延时（隐藏事件14，平均120个月）亚空间信号 → 立即收到虫群讯息（crisis.16）。
   Three omens chained by global flags and MTTH; the message follows the signal at once.
2. **先锋入侵**：隐藏事件17（平均30个月）生成虫群国家并发送“第一波接触”（crisis.18）；从此可随时通过外交界面联络虫群（crisis.30，可重复，不是剧情进程）。若已研究“重力陷阱”，30天后收到“凶猛的索林原虫”（大档案馆）。
3. **主力入侵**：先锋抵达400–600天后“第二波接触”（crisis.20）。若存在银河监管人或帝皇，30天后收到其宣告或成员国求援。
4. **战争期间的可能发展**（没有固定先后，都不是必经）：
   - 哨兵组织：虫群占银河15%或超过90个星系后崛起（51→52）；可联络（55）、可能赠舰（71）、在虫群占据过半时分享解剖资料（78）；若其空间站被毁则覆灭（81→82）。
   - 受伤的虫后（101，隐藏事件100，平均820个月，可能整局都不发生）→“俘获虫后”项目 → 自己先完成得到虫后（105），否则收到“虫后被抢走”（107），二者互斥。灵能物种帝国之后可能收到“虚空之洞”（234）。
   - 育母虫后：人类玩家击毁虫后舰时 5/105 机会夺得虫卵（252，全局一次），之后激活遗珍可反复召出新虫群（250）。
5. **结局**：虫群无行星且舰船少于20艘时被年度检查移除，所有帝国收到“虫灾终平”（211）。余波：哨兵15–25天后解散（76）；360天后起野生索林原虫可能筑巢（121，首次出现时通知）。

## 分支与结局 Branches and outcomes

- 唯一的结局事件是胜利（211）；脚本没有虫群获胜的结局事件。/ The only ending event is victory; there is none for a swarm victory.
- 互斥：105 / 107（谁先完成俘获项目）。/ Exclusive: who completes Capture the Queen first.
- 先锋、主力事件的十个选项只是按政府思潮区分的反应，都开启“虚空之鞭”事件链。

## 条件与文明差异 Conditions and variants

- 能否读懂虫群讯息：灵能物种或蜂巢思维物种可读出 crisis.16 原文；crisis.30 的“理解”分支还接受巨兽之怒威胁特质“心灵融合”。
- 生物舰船帝国看到 crisis.18 的另一段描述。
- 恐惧黑暗起源在入侵开始与胜利时另有起源事件（外部链接）。

## 审阅记录 Review notes

- 已核对 Checked: crisis_events_1.txt 全部可见事件及隐藏路由（L15-4329）、触发器与 on_action 调用（00_on_actions.txt:90, 233, 709-710, 1411, 1418, 1635, 3607）、项目与遗珍、观察者副本（文本与玩家窗口相同，挂在对应篇章下）。
- 更正 Corrections: 107 原被误挂在 105 之后——它其实发给其他帝国，现为项目的互斥结果；三个预兆、先锋、主力的连接标签补上隐藏事件与平均时间；补齐哨兵、虫后、育母虫后、结局余波的连接，消除全部“次要入口”。
- 不确定 Uncertain: MTTH 为引擎平均值，实际间隔会变化；仅凭“心灵融合”能沟通的帝国在 crisis.16 不匹配任何描述条件，实机表现未验证。
- 覆盖范围 Coverage: 38 篇，全部审阅。
