# 神秘堡垒 / The Enigmatic Fortress

- 分类 Category：巨兽与城邦 · DLC：利维坦 Leviathans

## 如何开始 How it starts
- 玩家舰队首次进入堡垒星系且仍有未瘫痪的超大型空间站时，出现提示 2105。 The first player ship entering the fortress system gets warning 2105 while an active XL station remains.
- 堡垒全部舰船被瘫痪后，on_ship_disabled → 隐藏 2100 → 窗口 2101；或最后一艘堡垒舰船被击毁时，on_ship_destroyed_perp → 窗口 2099（同样正文）。 Once all fortress ships are disabled, hidden 2100 opens window 2101; alternatively destroying the last fortress ship opens 2099 (same text).

## 剧情脉络 Story outline
1. 2101 / 2099：“那就上吧”开启事件链并进入堡垒（2111）；“离远点”360天后堡垒重启（2160）。 Go ahead starts the event chain (2111); staying away restarts the fortress after 360 days.
2. 第一阶段项目（二选一）：1A 爆破组（运输舰，成功→2112→30天后塔楼 2131）或 1B 局部电力（科研船，成功→2113：高估值500能量→2114 堡垒重启；低估值50能量→2115→塔楼 2131）。 Stage 1 (one of two): 1A demolition or 1B local power surge.
3. 塔楼谜题 2131：四个选项中只有“重新排列金属环”通向 2133 → 30天 → 2150；其余三项→2132 堡垒重启。 Tower puzzle: only one option of four continues.
4. 第二阶段项目（四选一，2150）：5A 黑洞研究（需附近黑洞与科学家）→2151；5B 母星研究→2152；5C 供应暗物质（需>10暗物质）→2156；5D 武力→2157。 Stage 2 (one of four).
5. 2152“星光见证”：开头→2153（失败）、中段→2154（成功）、结尾→2155（失败）。

## 分支与结局 Branches and outcomes
- 成功 Solved：2151 / 2154 / 2156，获得谜码编码/解码科技进度30%及研究加成，堡垒移除并启动庆典情境（见该故事）。
- 武力 By force：2157，恒星系宜居行星化为废土，其余岩质行星熔融，系内舰队被毁，无研究奖励。
- 失败 Failure：2114、2132、2153、2155、2160，堡垒修复重启，事件链结束；项目 1A/5A 超时（1080天）也进入 2160。
- 2101 选项 c（需 can_harvest_parts）直接获得 tech_leviathan_techgenesis 研究选项。

## 条件与文明差异 Conditions and variants
格式塔意识：2099 的选项 c.gesta 直接给予科研加成与科技进度、清除堡垒并启动庆典，无需项目。 Gestalt Consciousness gets an immediate reward at 2099 without projects.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/leviathans_events_2.txt:2838-3904, :3071（2105）; common/special_projects/00_projects_leviathans.txt:158-306; common/on_actions/00_on_actions.txt:914, :1453, :2047
已核对：三个入口（on_actions 行号如上）、所有项目的 same_option_group_as 与时限、各事件的 hidden_effect 去向和失败分支。原先两个重复故事（event-leviathans-2099 / -2100）合并为本家族。不确定：same_option_group_as 的引擎细节（是否隐藏同组项目）按“互斥”呈现。
Checked: entry on_actions, project option groups and time limits, every event's outcome. The two duplicate stories were merged. Uncertain: engine handling of same_option_group_as (shown as exclusive).
