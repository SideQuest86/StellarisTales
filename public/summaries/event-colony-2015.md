# 古怪工厂 / An Odd Factor

- 分类 Category：文明纪事 Society (C7)

## 如何开始 How it starts

- 殖民地2岁（15/958）或3岁（10/739）时的随机事件；非机械/荒野帝国；每个帝国一次（colony_odd_factory）。事件给星球添加“怪异工厂”矿藏（需要玩家安排工人）。
  Random colony event at age 2 (15/958) or 3 (10/739); non-machine, non-wilderness empire; once per empire (colony_odd_factory). The event adds an "Odd Factory" deposit (the player must staff it).

## 剧情脉络 Story outline

- 2015「怪异因素」：随机列表，权重30设绑架标志，权重35设“无事”标志。
  2015 "An Odd Factor": a random list; weight 30 sets the kidnap flag, weight 35 the no-effect flag.
- 绑架线：矿藏有≥100名工厂工人时，平均4个月后 2016（工人失踪1%）。选项b关闭工厂；选项a继续，再50%进入 2017（再次绑架，选项a使人口惊恐、选项b结束）或50%进入“无事”线。
  Kidnap line: with 100+ factory workers, 2016 (1% of workers vanish) fires after a mean of 4 months. Option b shuts the factory; option a continues, then 50% 2017 (second kidnapping; a scares the pops, b ends) or 50% the nothing line.
- 无事线：平均6个月后 2019，故事结束。
  Nothing line: 2019 after a mean of 6 months; the story ends.

## 分支与结局 Branches and outcomes

- 绑架线与无事线互斥。
  The kidnap line and the nothing line are exclusive.

## 条件与文明差异 Conditions and variants

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：`events/colony_events_2.txt:2360-2584`；`common/on_actions/00_on_actions.txt:3763,3815`
- 已核对：触发、随机权重、两次绑架的触发标志与均值、选项效果。
  Checked: trigger, random weights, trigger flags and means of both kidnappings, option effects.
- 更正：2016、2017、2019 原为各自孤立的故事，现并入（标志衔接）。
  Correction: 2016, 2017 and 2019 were isolated stories; merged here with flag bridges.
