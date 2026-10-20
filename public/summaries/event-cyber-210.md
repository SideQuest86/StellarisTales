# 平行发展 / Parallel Development

- 分类 Category：文明纪事 Society (C7)

## 如何开始 How it starts

- 网络化局势（Cyberization）每月运行隐藏事件 cyber.5，从 on_cyberization_situation_random_events_list 中等权重（各1）抽取一个满足条件的随机事件（共7个：120、160、210、220、260、320、360）；事件期间设置 situation_cyberization_pause 暂停局势，结束后移除。
  The Cyberization situation runs hidden cyber.5 monthly, which draws one valid event with equal weight (1 each) from on_cyberization_situation_random_events_list (seven events: 120, 160, 210, 220, 260, 320, 360); the event sets situation_cyberization_pause while open and removes it afterwards.
- 触发：局势进度≥450；每局至多一次（cyber_210_happened，局势标志）。
  Trigger: situation progress >= 450; at most once (cyber_210_happened, a situation flag).

## 剧情脉络 Story outline

- 「并行开发」：两个选项——借用研究（borrowed_research 修正，1年）或让研究被毁（cyber_research_destroyed 标志，12个月）。
  "Parallel Development": two options, borrow the research (borrowed_research modifier, 1 year) or let it be destroyed (cyber_research_destroyed flag, 12 months).

## 分支与结局 Branches and outcomes

- 单个窗口（无后续或只通向共享结局）；选项互斥，只能选一个。
  A single window (no follow-up, or only into the shared ending); options are exclusive, only one is chosen.

## 条件与文明差异 Conditions and variants

- 选项集合随帝国的伦理、权威、政体特质而变，见条件。
  The available options vary with ethics, authority and civics, see the conditions.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：`events/machine_age_situation_events_1.txt:758-822`；`common/on_actions/00_on_actions.txt`
- 已核对：来源池与权重、触发条件、选项分支与目标事件。
  Checked: source pool and weights, trigger conditions, option branches and target events.
- 未逐行核对选项的数值收益，只记录其性质（修正名、资源、标志）。
  Option numbers were not checked line by line; only their nature (modifier names, resources, flags) is recorded.
