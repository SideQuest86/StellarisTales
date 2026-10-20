# 第二次生命 / Second Life

- 分类 Category：文明纪事 Society (C7)

## 如何开始 How it starts

- 数字化局势（Digitization）每月运行隐藏事件 synth.5，从 on_digitization_situation_random_events_list 等权重抽取一个满足条件的随机事件（共6个：120、160、220、260、320、360）；事件期间设置 situation_digitization_pause。
  The Digitization situation runs hidden synth.5 monthly, which draws one valid event with equal weight from on_digitization_situation_random_events_list (six events: 120, 160, 220, 260, 320, 360); the event sets situation_digitization_pause while open.
- 触发：局势进度>250；每局至多一次。
  Trigger: situation progress > 250; at most once.

## 剧情脉络 Story outline

- 「第二次生命」（机会）：局势暂停标志选项；犯罪遗产/公关/影子议会政体有 synth_AI_actor 修正。
  "Second Life" (opportunity): situation-pause flag options; Criminal Heritage / Public Relations / Shadow Council civics get the synth_AI_actor modifier.

## 分支与结局 Branches and outcomes

- 单个窗口（无后续或只通向共享结局）；选项互斥，只能选一个。
  A single window (no follow-up, or only into the shared ending); options are exclusive, only one is chosen.

## 条件与文明差异 Conditions and variants

- 选项集合随帝国的伦理、权威、政体特质而变，见条件。
  The available options vary with ethics, authority and civics, see the conditions.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：`events/machine_age_situation_events_2.txt:478-557`；`common/on_actions/00_on_actions.txt`
- 已核对：来源池与权重、触发条件、选项分支与目标事件。
  Checked: source pool and weights, trigger conditions, option branches and target events.
- 未逐行核对选项的数值收益，只记录其性质（修正名、资源、标志）。
  Option numbers were not checked line by line; only their nature (modifier names, resources, flags) is recorded.
