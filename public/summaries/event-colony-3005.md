# 传送门 / The Doorway
- 分类 Category: society (colony) · 来源 Sources: events/colony_events_3.txt:1175-2005, 7586-7790; common/special_projects/00_projects_3.txt:803-936; common/on_actions/00_on_actions.txt:3766, 3819, 885, 1668 · 审阅 Reviewed 2026-10-13 (r2-society)

## 如何开始 How it starts
- 中文：`colony.3005` 是殖民地满2年（权重 8/958）或3年（5/739）时的随机殖民地事件（on_actions:3766、3819），也可由荒原飞地事件 enclave.5170 直接触发（overlord_enclaves_events.txt:9926）。条件：非AI、非首都、非母星的原殖民地，非栖息地/环世界，该国此前没有触发过（`dportal_country`，每国一次）。唯一选项启用特殊项目 `DPORTAL_PROJECT`（1500，物理科技）并添加研究区矿藏。
- English: `colony.3005` is a random colony event at colony age 2 years (weight 8/958) or 3 years (5/739), and can also be fired directly by enclave.5170. It needs a non-AI owner, a non-capital, non-homeworld original colony that is not a habitat or ring segment, and is once per country (`dportal_country`). Its single option enables the `DPORTAL_PROJECT` special project (cost 1500, physics) and adds a research-zone deposit.

## 剧情脉络 Story outline
1. 项目完成后随机其一，延迟 10–15 天（00_projects_3.txt:811-851）：痛苦次元 3006 (10)、高能次元 3007 (10)、太虚 3008 (10)、镜面次元 3009 (10)、虚无次元 9800 (5)。9800 对AI、若干起源（合成生育、进化掠食者、有毒骑士）、母星为人造/城市等类型，或本局已出现过（`b_world_intrudes`）时权重为0。 / On project completion one of five dimensions follows after 10-15 days (weights 10/10/10/10/5). The Negative Mass branch (9800) is zeroed for AI empires, three origins, artificial/city-type home planets and once it has happened in the game.
2. **痛苦次元 3006**：按帝国提供选项——科学（非唯灵）→ DPORTAL_PROJECT_SCIENCE → 3010；灵能祈祷（唯灵且有灵能理论）→ 3011；祈祷（唯灵）→ 3011；投石（非唯灵、封建）→ 3012；保留传送门（总是）；骑士（有毒骑士起源）：创造永生指挥官“末日骑士”，随后 3600–4500 天后随机：无事 15 / 黑暗骑士 3050 (25，禁止破坏性玩法时为0) / 归自地狱 3060 (20) / 维度难民 3055 (40)（colony_events_3.txt:1261-1364）。 / Hell: options depend on the empire; project outcomes 3010/3011/3012 close the portal; the Toxic Knights route rolls 15 nothing / 25 incursion 3050 / 20 quest-complete 3060 / 40 refugees 3055 after 3600-4500 days.
3. **高能次元 3007**：给予工程研究加成（add_monthly_resource_mult），无后续事件。 / Energy: grants an engineering research bonus, no follow-up event.
4. **太虚 3008**：1825–3650 天后 3040 提供 `NULLVOID_PROJECT`（5000，工程），完成后 3041 设置 `dportal_void2` 标记（colony_events_3.txt:1641-1716；00_projects_3.txt:925-936）。 / Null Void: 3040 comes 1825-3650 days later and enables NULLVOID_PROJECT; its completion shows 3041.
5. **镜面次元 3009**：一段线性对话 3020→3021→3022→3023→3024。在 3021 可选“只做贸易”（`3021.b`）提前结束；走完全程则在 3024 选择通商。两条路都会设置 `dportal_trader` 与永久修正 `dportal_trade_normal`（1822-1834、1976-2003），其后续每五年一次的贸易检查是故事 event-colony-3029。机械帝国使用 `.robot` 选项版本，结构相同。 / Mirror: a linear conversation; at 3021 'just trade' ends it early, otherwise 3024 offers the trade. Both set the trade flag and modifier; the follow-up trade interludes are the story event-colony-3029. Machine empires use `.robot` option twins with the same structure.
6. **虚无次元 9800**（负相物质，Victor Haeggman 作）：设置全局标记 `b_world_intrudes`，选项给物理研究并在 900±100 天后触发 9805；9805 两个选项都在 150–200 天后（±30）进入 9810；9810 启动事件链 `negative_mass`，克隆一位科学家，并在 360±360 天后触发 9815（天裂之夜），传送门出现并派出“熟悉的舰队”。击毁该舰队（on_fleet_destroyed_perp，on_actions:1668）进入下半部分 event-colony-9820。 / Static: 9800 sets the global flag, then 9805 (about 900 days), 9810 (150-200 days) starts the Negative Mass chain and 9815 follows after 360-720 days; destroying the portal fleet starts the second half, event-colony-9820.

## 分支与结局 Branches and outcomes
- 五种次元互斥（见上权重）。 / The five dimensions are exclusive.
- 痛苦次元内部：项目选项互斥（取决于帝国）；骑士路线三个结果互斥。 / Within Hell: project options depend on the empire; the three knight outcomes are exclusive.
- 跨故事：3021/3024 → colony.3031（event-colony-3029）；3050 → colony.3051（on_colony_defenders_lose，on_actions:885，event-colony-3051）；9815 → colony.9820（event-colony-9820）。 / Cross-story links as listed.

## 条件与文明差异 Conditions and variants
- 3006 的正文和选项随唯灵、有毒骑士起源、封建领地而变；9810/9815 随机械/蜂巢/普通帝国而变；3020–3024 有机械版选项。 / Texts and options vary with spiritualist, Toxic Knights origin, feudal realm, and machine/hive/regular status.

## 审阅记录 Review notes
- 已核对 Checked: events/colony_events_3.txt 1175-2005 (3005–3024 options, flags, delays) and 7586-7790 (9800–9815); special projects DPORTAL_*, NULLVOID_PROJECT; the callers of 3005 (two on_action pools, enclave.5170) and cross-story entries 3031, 3051, 9820.
- 更正 Corrections: this chain had been swept into the Shroudwalker story (event-enclave-300); it is now its own colony story.
- 不确定 Uncertain: rewards inside 3050/3055/3060 and NULLVOID_PROJECT were checked for structure only; the developer comment at colony_events_3.txt:7587 calls DPORTAL part of the "Rogue Moon" chain but no script call connects them.
