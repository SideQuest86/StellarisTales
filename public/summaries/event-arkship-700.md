# 核心阴谋 / A Core Conspiracy

- 分类 Category：银河轶事 C8 stories · 来源 Sources：events/nomads_arkship_events.txt, common/situations/14_nomads_situations.txt, common/on_actions/00_on_actions.txt · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

游牧帝国的方舟随机事件池 mobile_arkship_random_events（00_on_actions.txt:3979-4006，总权重460）；由隐藏事件 arkship.1（nomads_arkship_events.txt:7-49）定期调用：游戏前5年不会触发，之后每次约三分之一概率（无事则3–5年后再试；近期参战、或所有方舟都在战斗时概率为0），再从方舟殖民地中抽取一个（近期战斗/接受合同/刚发生过方舟事件的权重×0.1）触发该事件池（nomads_effects.txt:96-117）。
The nomad arkship random pool mobile_arkship_random_events (00_on_actions.txt:3979-4006, total weight 460) is drawn by hidden arkship.1 (nomads_arkship_events.txt:7-49): never in the first 5 years, afterwards about one try in three (retry in 3-5 years otherwise; zero during a recent war or while every arkship is fighting), then a random arkship colony (weights x0.1 after recent combat / contract / arkship event) fires the pool (nomads_effects.txt:96-117).
arkship.700（lines 2913-2965，池中权重 20/460）：非格式塔、非个体机械、尚未有其他叙事情境（nomadic_narrative_situation）、本方舟未经历过。
arkship.700 needs a non-gestalt, non-individual-machine owner, no other nomad narrative situation running, and an arkship that has not had it.

## 剧情脉络 Story outline

1. arkship.700 “退出事件”：a 付 1000 能量并获得物理研究加成 → 约半年后 arkship.701；b 不参与。
   Opt-out event: (a) pay 1000 energy for a physics-research bonus -> arkship.701 about six months later; (b) decline.
2. arkship.701（fire_only_once）：开始情境“核心阴谋”（初始进度 50，双向 0–100，锁定至选边），选边：a 站 C.A.E.L.I.（进度每月 +1）或 b 站 S.T.E.R.I.S.（每月 −1）。随后 24 个月的标记。
   Side with C.A.E.L.I. (+1 per month) or S.T.E.R.I.S. (-1 per month); the situation starts at 50 and runs 0-100.
3. 进度带事件：S.T.E.R.I.S. 一侧（进度下降）：≤40 “分析性方法”(705)、≤30 “指令 S.T.E.R.I.S.”(715)、≤20 “一指令胜两指令”(716)、≤2 “排空大气”(717)；C.A.E.L.I. 一侧（上升）：≥60 “感性方法”(710)、≥70 “指令 C.A.E.L.I.”(720)、≥80 “拦截”(721)、≥98 “福祉指令部署”(722)。715/717/720/722 的 b 选项可换边，并在约半年内引出 785/795/790/800。
   Steris side (falls): 705 at <=40, 715 at <=30, 716 at <=20, 717 at <=2; Caeli side (rises): 710 at >=60, 720 at >=70, 721 at >=80, 722 at >=98. The b options of 715/717/720/722 switch sides and queue 785/795/790/800.
4. 每月随机插曲（30 无事，7 件各 1）：C.A.E.L.I. 一侧 750、755、770（进度 ≥90）；S.T.E.R.I.S. 一侧 760、765、775、780（进度 ≤10）。
   Monthly random interludes (30 none, one each for seven events): Caeli 750/755/770 at progress >=90, Steris 760/765/775/780 at progress <=10.

## 分支与结局 Branches and outcomes

- 结局互斥：进度降到 0 → arkship.725 “主逻辑覆写确认”；升到 100 → arkship.730 “主情感覆写确认”。
  Two exclusive endings: progress 0 -> 725 (logic override), 100 -> 730 (emotional override).
- 进度可来回拉扯，两侧的阶段事件都可能在同一局出现（各阶段只在首次进入时触发）。
  Progress swings both ways, so events from both sides can appear in one playthrough (each stage fires on first entry).
- 玩家的 705/710 等选项可短期加速或减速进度（90 天标记 speed_up/slow_down）。
  Options of 705/710 add a 90-day speed-up or slow-down flag.

## 条件与文明差异 Conditions and variants

- 被中途夺走方舟、或所属国变更时情境中止（abort_trigger），约15–20年后重新开始方舟事件循环（lines 932-943）。
  The situation aborts if the arkship changes owner; the event loop resumes 15-20 years later.

## 审阅记录 Review notes

- 已核对 Checked：arkship.700-800 的触发、选项与进度阈值（nomads_arkship_events.txt:2911-4012）、情境定义（14_nomads_situations.txt:770-944）。
- 更正 Corrections：编译器把情境的阶段按文件顺序连成 716→705→710→721，实际是以起点为中心的两个相反方向（S.T.E.R.I.S. 705→716，C.A.E.L.I. 710→721），已用 suppress/bridges 改正，并把每月阈值事件挂到情境下并标明阈值。
  The compiler chained the stages in file order; they are two opposite sides, fixed with suppress and bridges.
- 说明 Note：715/720 等事件的 a 选项正文中的“继续站队”不改变阵营；715/717/720/722 的 b 选项的跟进事件 785/790/795/800 已在树中。
