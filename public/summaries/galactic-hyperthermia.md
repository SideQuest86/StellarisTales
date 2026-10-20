# 星系热症 / Galactic Hyperthermia

- 分类 Category：天灾 Crisis

## 如何开始 How it starts

- 玩家选取飞升天赋 `ap_galactic_hyperthermia`（星系热症）时，其 on_enabled 触发 `infernals.1000`（《新力量》），并开启事件链 `galactic_hyperthermia_chain`（`00_ascension_perks.txt:587`；`infernals_crisis_events.txt:6-94`）。这是**玩家选择的危机**，不是随机天灾。
- Taking the ascension perk fires infernals.1000 and begins the event chain. This is a player-driven crisis, not a random one.

## 剧情脉络 Story outline

1. **一级**：1000 启用项目「新能量源」(`INF_CRISIS_ENTROPY`)，完成后设置 Lv1 标记 → 危机一级解锁 → `infernals.1005`（结晶成果）；非炎魔（非 infernal）帝国 90 天后得到 1006，并启用项目「热耐性进化」(`INF_THERMOPHILE_ADAPTATION`，完成后加修正）。
2. **二级**：建成星系熔炉第 1 阶段（标记 Lv2）→ `infernals.1010`（启动导管群）。
3. **三级**：建成第 2 阶段（Lv3）→ `infernals.1015`（温度将如何提升？）。**二选一**：`策划火风暴` 项目 → 1020，或 `抑制野心`（`意外关联`项目）→ 1021（Hyperthermia_Peaceful，熔炉只能走和平阶段，不会解锁下一级）。
4. **四级**：「策划火风暴」后建成第 3 阶段（Lv4）→ `infernals.1025`（环绕核心）。
5. **五级**：建成第 4 阶段（Lv5）→ `infernals.1030`（点火竞赛）：设置 `Hyperthermia_ongoing`，开通通往 6 个核心星系的虫洞，开始「动员」倒计时（`situation_galactic_hyperthermia_timer`）。
6. **倒计时**：进度到阶段 2 时 `infernals.1035` 开启核心航路，并对其他国家发送 `infernals.1040`；若干古老帝国被拉入（难度 3/4/5/6 分别为 1/2/4/6 次抽取，`infernals_crisis_events.txt:410-434`）。倒计时结束，隐藏事件 `infernals.1041` 让联军宣战，启动「星系火风暴」状况，并给危机国家发 1042、给其他国家发 1043。
7. **火风暴**：阶段 3 时 1045「与时间赛跑」。进度由危机国家占据的核心星系数量决定（少于 3 个每月 -3，多于 3 个每月 +3）。

## 分支与结局 Branches and outcomes

- **发动者获胜** `infernals.1055`：进度满、且是危机国家：胜利（`win = yes`），设置 `Hyperthermia_happened`，银河中的恒星被改造。
- **他人见证** `infernals.1056`：持有该天赋的另一国在进度满时看到「银河重生」。（两者互斥。）
- **熔炉被夺**：战争结束时夺得熔炉 → 隐藏 1051 → `infernals.1052`（可选「摧毁」得资源，或「利用」得到和平熔炉）；战争期间夺得 → 隐藏 10530 → `infernals.1053`。夺回自己的熔炉由隐藏的 1054 处理；危机国家被灭由隐藏的 1050 终止状况。
- 1055 的世界改造会顺带触发“机械世界毁灭”类通知（见天灾「肃正协议」），这是副作用，不属于本故事。

## 条件与文明差异 Conditions and variants

- 选项按是否为蜂群/机械（gestalt）显示 a/b 版本；`is_infernal_empire` 影响是否需要 1006 的适应项目；1055 有炎魔狂信、其他炎魔、通用灭绝者等额外选项。
- 战争领导者的选择顺序：银河皇帝/监管者（带 anti_hyperthermia_coalition 标记）→ 古老帝国 → 最强联盟国家 → 随机（`infernals_crisis_events.txt:605-698`）。

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13 (c5b-crisis)
- 来源 Sources：`events/infernals_crisis_events.txt`, `common/situations/13_infernal_situations.txt:689-862`, `common/crisis_levels/00_crisis_levels.txt:707-835`, `common/megastructures/22_galactic_crucible.txt`, `common/special_projects/00_projects_infernals.txt:1-48, 220-231` · 地狱（Infernals）DLC
- 审阅者导读（评注），不是游戏原文。 / Reviewer commentary, not game text.
- 将原先 8 个独立的 `event-infernals-*` 草稿合并为一个家族 `galactic-hyperthermia`；等级链用桥接（标记 + 熔炉阶段，行号见片段）连接，因为调用图看不见“危机等级 on_unlock”和“熔炉升级设置标记”。
- 移除了 1055 经 `hyperthermia_galaxy_effect → destroy_machine_world` 到 `crisis.2037/2035/2046`、`observer.50` 的副作用连线。
- 未映射：隐藏的熵晶体奖励事件（`infernals.2000-2020`）；倒计时的具体时间取决于占领的核心星系数。
