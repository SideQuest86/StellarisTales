# 殖民地正在酝酿叛乱 / Revolt Brewing on a Colony
- 分类 Category：C8 银河轶事 / C8 Galactic miscellany

## 如何开始 How it starts

殖民地每年脉冲（on_colony_yearly_pulse，common/on_actions/00_on_actions.txt:3933）触发 unrest.50：稳定度低于第2档、人口≥1000、无轨道轰炸和地面战斗、国家没有进行中的行星叛乱、近期没有叛乱尝试、至少一个物种对所有者不满，且叛乱情势预计会增长。满足则在300±59天（文化冲击期则1880±180天）后由 unrest.54 再检查并在人口最多的符合条件星球上弹出 unrest.55“叛乱酝酿中”。

The colony yearly pulse (on_colony_yearly_pulse, common/on_actions/00_on_actions.txt:3933) fires unrest.50: stability below level 2, at least 1000 pops, no bombardment or ground combat, no planetary revolt already running for the country, no recent revolt attempt, at least one species unhappy with the owner and a revolt situation that would actually progress. If so, unrest.54 re-checks after 300+-59 days (1880+-180 days during culture shock) and shows unrest.55 "Revolt Brewing" on the most populous qualifying planet.

## 剧情脉络 Story outline

unrest.55 接受后开始“行星叛乱”情势（若有≥500名不满的奴隶人口则为奴隶叛乱）。情势有四个阶段（每25%）：1）稳定度-10；2）进入阶段时 unrest.100 按叛乱性质随机选一个“不满”事件（115 灵性、120 威权、125 排外、130 唯物、135 亲外、140 平等、145 和平、150 军国，皆为警示窗口），奴隶叛乱则改为 unrest.156“蓄意破坏”；3）unrest.4000“组织抵抗”确定叛乱物种并标记愿意加入的邻近星球；4）unrest.4050 请求其他帝国支持：被问到的帝国在 unrest.4055 中可花100影响力支持（原国家收到 unrest.4060），或拒绝并转问下一位。每月另有随机事件（恐袭 101、严重恐袭 105、维和 110、奴隶暴动 157、绝食抗议 159，各占3/103），停止奴役时 unrest.163 使局势缓和。

Accepting unrest.55 starts the "Planetary Revolt" situation (a slave revolt if there are 500+ unhappy enslaved pops). It has four 25% stages: 1) stability -10; 2) on entering, unrest.100 picks a "character of the revolt" event at random (115 spiritualist, 120 authoritarian, 125 xenophobe, 130 materialist, 135 xenophile, 140 egalitarian, 145 pacifist, 150 militarist - all warning windows), or unrest.156 "Sabotage" for a slave revolt; 3) unrest.4000 "Organized Resistance" fixes the rebel species and marks nearby planets that may join; 4) unrest.4050 asks other empires for support: an asked empire can pay 100 influence in unrest.4055 to back the rebels (the owner gets unrest.4060) or decline, and the next empire is asked. Each month random events may also fire (terror 101, severe terror 105, peacekeeping 110, slave riots 157, hunger strike 159, 3/103 each); stopping slave labour gives unrest.163 and eases the revolt.

## 分支与结局 Branches and outcomes

结局互斥：情势满100%（on_progress_complete）——unrest.4200“叛乱发生”：星球脱离，成立叛乱帝国，可宣战（A）或接受（B）；若有帝国加入则 unrest.4220“吞并…”；游牧帝国另有后续。情势失败（进度归零，on_fail）——普通叛乱 unrest.4300“秩序恢复”，奴隶叛乱 unrest.161“叛乱被镇压”。情势受三种方式影响：什么都不做、分发福利（每月20消费品或30团结）、镇压（30团结，士兵稳定度+）。

Mutually exclusive endings: the situation reaches 100% (on_progress_complete) - unrest.4200 "Revolt": the planet secedes into a rebel empire and the player may declare war (A) or accept (B); unrest.4220 "The Annexation of ..." if an empire joins; nomads have further follow-ups. The situation fails (progress back to zero, on_fail) - unrest.4300 "Order Restored" for an ordinary revolt, unrest.161 "Revolt Suppressed" for a slave revolt. The player influences it by approach: do nothing, distribute amenities (20 consumer goods or 30 unity a month) or crack down (30 unity, soldier stability bonus).

## 条件与文明差异 Conditions and variants

正文与选项随帝国类型（普通、集群、荒野）而变；奴隶叛乱、集群叛乱、游牧有各自文本。

Texts and options vary with empire type (ordinary, gestalt, wilderness); slave revolts, gestalt break-aways and nomads have their own wording.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/unrest_events.txt:1-2500; common/situations/02_strategic_situations.txt:2-576 situation_planetary_revolt; common/on_actions/00_on_actions.txt:3933 on_colony_yearly_pulse
- 已核对入口、触发、选项与结果。
  Checked the entry, trigger, options and outcomes.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
