# 恶贯满盈 / Scum and Villainy

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany

## 如何开始 How it starts

殖民地每年脉冲（on_colony_yearly_pulse，common/on_actions/00_on_actions.txt:3938-3939）以25/100的权重抽中 crime.40“黑社会出现”：犯罪值≥30、人口>0、没有任何失业救济/待机模式等抑制修正，且不在冷却期。反之 crime.41“秩序恢复”在犯罪降低时消除黑社会。

The colony yearly pulse (on_colony_yearly_pulse, common/on_actions/00_on_actions.txt:3938-3939) can draw crime.40 "Scum and Villainy" with weight 25/100: planet crime >= 30, pops present, no suppressing modifier (unemployment benefits, standby mode ...) and not in cooldown. crime.41 "Order Restored" removes the underworld when crime falls again.

## 剧情脉络 Story outline

crime.40 的选项按帝国类型不同：a 普通帝国、b 蜂巢“偏离蜂群”、c 机器“腐化”；选项会给星球加犯罪修正（criminal_underworld / drone_deviancy / drone_corruption）。此后国家年度脉冲（on_yearly_pulse，common/on_actions/00_on_actions.txt:244）触发门卫 crime.50，按帝国类型转 crime.51（普通）、.52（蜂巢）、.53（机器），在有犯罪修正的星球上随机抽小事件：普通帝国 crime.2–8（生活化事件）或升级为 crime.100“帮派战争”、crime.200“毒品交易扩大”、crime.300“黑道统治”，每条升级线再有 4 个后续（101–104、201–204、301–304）；蜂巢为 crime.500–502（偏差无人机），机器为 crime.550–552（腐化无人机）。

crime.40 has options by empire type: a ordinary, b hive "strayed from the Hive Mind", c machine "corruption"; the options set the planet's crime modifier (criminal_underworld / drone_deviancy / drone_corruption). From then on the yearly country pulse (on_yearly_pulse, common/on_actions/00_on_actions.txt:244) fires the gatekeeper crime.50, which routes to crime.51 (ordinary), .52 (hive) or .53 (machine) and draws a random event on a planet with a crime modifier: ordinary empires get crime.2-8 (everyday events) or escalate to crime.100 "Gang Wars", crime.200 "Drug Trade Expands" or crime.300 "Mob Rule", each escalation with four follow-ups (101-104, 201-204, 301-304); hives get crime.500-502 (deviant drones), machines crime.550-552 (corrupted drones).

## 分支与结局 Branches and outcomes

每次抽取的权重是：不发生300（普通）/200（蜂巢、机器），其余每个事件10（部分5）。三条升级线互斥——每个星球一次只带一个修正；crime.303（总督被刺杀）只在黑道统治且有总督、该国家尚未被刺杀过、总督不是传奇/天选者时才能抽到。大多数窗口的实验者（twisted experimenters）文明有专属选项文字。

Each draw has weight 300 (ordinary) or 200 (hive, machine) for nothing and 10 (sometimes 5) for each event. The three escalation lines are exclusive - a planet carries one modifier at a time; crime.303 (governor assassinated) needs Mob Rule, a governor, no earlier assassination for the country and a non-legendary, non-chosen-one governor. Twisted Experimenters empires have their own option text in most windows.

## 条件与文明差异 Conditions and variants

crime.1“失业率攀升”是已被禁用的旧事件，见 unreachable 记录。

crime.1 "Rising Unemployment" is a disabled legacy event (see the unreachable record).

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/crime_events.txt:3-2606; common/on_actions/00_on_actions.txt:244,3933-3941 on_yearly_pulse / on_colony_yearly_pulse
- 已核对入口、触发、选项与结果。
  Checked the entry, trigger, options and outcomes.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
