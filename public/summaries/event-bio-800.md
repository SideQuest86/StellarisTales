# 准备入侵 / Prepare Invasion

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany · DLC: BioGenesis

## 如何开始 How it starts

“寄生兽”蜂巢意识（civic_hive_bodysnatcher）可对非游牧、非原始、非合成的帝国发动谍报行动“准备入侵”，花费影响力和谍报力量；同一目标已有渗透时不可再次发动（operations.txt:1300-1368）。

A Bodysnatcher hive (civic_hive_bodysnatcher) can launch the espionage operation Prepare Invasion against a non-nomadic, non-primitive, non-synthetic empire, paying influence and spy power; it cannot be repeated while that target is still infiltrated (operations.txt:1300-1368).

## 剧情脉络 Story outline

- 行动三个阶段依次弹出：新工作 bio.800 → 额外人手 bio.805 → 新的开口 bio.810；每阶段需通过难度检定，失败时改由通用谍报随机事件处理（on_roll_failed，另属他人故事）。
  The three stages appear in order: New Job bio.800 -> Additional Staffing bio.805 -> New Openings bio.810; each needs its difficulty roll, and failed rolls go to the generic operation random events (on_roll_failed, another story).
- bio.810“开始行动”后一天，新兵员 bio.815 决定派出多少渗透者：不派人口，或派100/300/500/2000人口（需有足够可用人口），并在目标国设置为期十年的渗透标记；行动随即结束。
  One day after "Commence Operation" in bio.810, Fresh Recruits bio.815 decides how many infiltrators to send: none, or 100/300/500/2000 pops (if available). It sets a ten-year infiltration flag on the target and ends the operation.
- 十年内若寄生兽向目标宣战，或目标向寄生兽宣战（均须为主攻方/主防方），on_war_beginning 的隐藏事件 bio.819→bio.820 夺取按渗透规模计算的5%–50%星系的恒星基地、在其殖民地生成寄生兽陆军，两天后目标方收到“入侵[物种]”bio.825。
  If within ten years the Bodysnatcher declares war on the target, or the target on the Bodysnatcher (as primary attacker/defender), hidden bio.819 -> bio.820 on war start takes over the starbases of 5%-50% of the target's systems (by infiltration size) and spawns bodysnatcher armies on their colonies; two days later the target receives Invasion of the [species] bio.825.

## 分支与结局 Branches and outcomes

bio.815 的五个选项只决定渗透规模，彼此互斥；bio.825 的正文按规模分“小规模”和“2000人口”两版。若十年内没有战争，标记过期，没有后续窗口。

The five bio.815 options only set the infiltration size and are mutually exclusive; bio.825 has a small and a 2000-pop text. If no war starts within ten years the flag expires with no further window.

## 条件与文明差异 Conditions and variants

bio.825 是目标国（受害方）看到的窗口，与前四个窗口的视角不同。

bio.825 is shown to the target (victim) empire, a different perspective from the first four windows.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-12
- 来源 Sources：common/espionage_operation_types/operations.txt:1300-1368; events/biogenesis_events.txt:5951-6172; events/biogenesis_events.txt:6174-6417; common/on_actions/00_on_actions.txt:2620
- 修正：草稿把三个阶段事件并列为三个入口，并把 bio.825 作为独立故事 event-bio-819；现按行动定义串成三阶段，并以带条件的连接接上开战后的入侵。
  Corrections: the draft showed the three stage events as three parallel entries and bio.825 as a separate story event-bio-819; the stages now follow the operation definition, and the war-time invasion is a conditional link.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
