# 再生 / Respawn

- 分类 Category：文明纪事 Society (C7)

## 如何开始 How it starts

- “合成冲击”事件链后段：隐藏事件 synth.1000 从 on_synthshock_chain_opportunity_events_list（1010、1020、1030，权重各5）抽取一个。
  Late part of the "Synth Shock" chain: hidden synth.1000 draws one of 1010, 1020, 1030 (weight 5 each) from on_synthshock_chain_opportunity_events_list.
- 无额外触发条件。
  No extra trigger.

## 剧情脉络 Story outline

- 「重生」：synth_respawn_push / _caution；贵族精英/反乌托邦有 _elite。
  "Respawn": synth_respawn_push / _caution; Aristocratic / Dystopian get _elite.
- 事件结束后180+随机90天由隐藏事件 synth.1500 选出最终事件 synth.1505–1525 之一（共享结局，视为枢纽）。
  After 180 days (+ random 90) hidden synth.1500 picks one of the final events synth.1505-1525 (a shared ending, treated as a hub).

## 分支与结局 Branches and outcomes

- 单个窗口（无后续或只通向共享结局）；选项互斥，只能选一个。
  A single window (no follow-up, or only into the shared ending); options are exclusive, only one is chosen.

## 条件与文明差异 Conditions and variants

- 选项集合随帝国的伦理、权威、政体特质而变，见条件。
  The available options vary with ethics, authority and civics, see the conditions.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：`events/machine_age_situation_events_2.txt:2332-2408`；`common/on_actions/00_on_actions.txt`
- 已核对：来源池与权重、触发条件、选项分支与目标事件。
  Checked: source pool and weights, trigger conditions, option branches and target events.
- 未逐行核对选项的数值收益，只记录其性质（修正名、资源、标志）。
  Option numbers were not checked line by line; only their nature (modifier names, resources, flags) is recorded.
