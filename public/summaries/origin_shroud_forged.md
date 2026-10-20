# 虚境铸就 / Shroud-Forged

- 分类 Category：起源 Origins · DLC：未核对 DLC not checked

## 如何开始 How it starts

开局事件 shroud_forged.1（隐藏）在首都建立虚境裂口并启动局势“虚铸者”（初始进度1500）。2–7天后抟土之塑师（10）首次传来讯息：三个选项决定局势方针（安抚、镇压、扶持）。
At game start the hidden shroud_forged.1 sets up the rift on the capital and starts the situation (initial progress 1500). 2-7 days later the Animator of Clay speaks (10); its three options choose the situation approach (appease, suppress, support).

## 剧情脉络 Story outline

1. **局势进度** 双向变化，当前阶段决定事件：受压迫 280、受控 270（选项可降低进度并触发“利用检测”5）、不受限 250、自由 260；阶段并非固定顺序。每月另有随机的小事件 500–690（每月权重80:52（约39%），局势开始后设有1年冷却标志）。
   **Situation progress** moves both ways; the stage you are in selects the event (280/270/250/260). They are states, not a fixed order. Each month a random small event 500-690 may fire (weights 80 nothing : 52 events, 1-year cooldown flag set at start).
2. **进度降到0 → 控制结局**：强行控制（50）→ 特殊项目“重同化”→ 60 → 30天后 30 解锁物现引擎科技。
   **Progress at 0 -> control ending**: 50 -> project Reintegration -> 60 -> 30 days later 30 unlocks the Materiality Engine tech.
3. **进度满 → 解放结局**：70 → 项目“指引” → 80；360–2160天后另开始“泽珞族遗产”事件链（300）。
   **Progress full -> liberation ending**: 70 -> project The Guide -> 80; after 360-2160 days the Zroni Legacy chain begins (300).
4. **泽珞遗产**：殖民三颗泽珞核心星球（305/306/307）并在其上建平衡仪 → 308 → 310 → 311 → 312：选“背叛”（312.a，困住虚境实体，313，之后可用决定捕获实体）或“忠诚”。
   **Zroni Legacy**: colonise three Zroni core worlds (305/306/307), build equilibrators -> 308 -> 310 -> 311 -> 312: traitor (trap the entity, 313) or loyalist.

## 分支与结局 Branches and outcomes

- 局势结局互斥：控制（50/60/30）或解放（70/80）。 Control or liberation, exclusive.
- 物现引擎（39）：项目完成后抽取一项尚未拥有的灵能科技（41–47）或研究加成（48），之后可重复使用。 Materiality Engine: each completion grants one missing psionic tech (41-47) or a research bonus (48); repeatable.
- 抟土之塑师外交（400）：军事/民政/研究援助消耗泽珞，随机得到修饰、舰队、资源或遭虚境生物袭击（444）。 Animator of Clay diplomacy (400): assistance costs Zro with random rewards or an attack (444).
- 失去平衡仪时被困实体挣脱（320）。 Losing an equilibrator frees the trapped entity (320).

## 条件与文明差异 Conditions and variants

仅限起源“虚境铸就”帝国；机械种族/机器单位影响进度（局势 monthly_progress）。 Only for Shroud-Forged empires; machine/mechanical pops modify progress.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：`events/shroud_forged_events.txt`、`common/situations/03_origin_situations.txt:1-340`、`common/special_projects/00_projects_origins.txt:1-59`、`common/decisions/02_special_decisions.txt:2690-2860`、`common/buildings/12_event_buildings.txt:433-498`、`events/game_start.txt:424`
- 本导读是审阅者的说明文字，不是游戏原文。 This guide is reviewer commentary, not game text.
- 已核对 Checked：全部事件窗口、局势阶段与结局、三个特殊项目、决定、建筑钩子与 on_action 入口。 All event windows, situation stages/endings, three projects, decisions, building hooks and on_action entries.
- 更正 Corrections：补充物现引擎入口 30→39、背叛路线的 312→330/320 连接；阶段以并列（状态）标注；入口加了可读标签。 Added the 30->39, 312->330/320 links; stages annotated as states; entries labelled.
- 不确定 Uncertain：编译树把阶段事件串成链（编译器限制）；月度随机事件的排除规则在 inline_script 中未读。 Compiled tree chains the stage events (compiler limitation); the random-event exclusion script was not read.
- 2026-10-13 r3-inherit：事件继承修复（base = 其他事件）后复查：对照游戏文件核对了现在可见的继承标题、选项与分支，结构无需改动。
  2026-10-13 r3-inherit: re-checked after the event-inheritance fix (base = other event): the inherited titles, options and branches now visible in the tree were compared with the game files; no structural change needed.
