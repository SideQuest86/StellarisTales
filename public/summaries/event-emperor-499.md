# 银河帝国的崛起 / Rise of the Galactic Imperium

- 分类 Category：银河轶事 C8 stories · DLC：Nemesis

## 如何开始 How it starts

银河共同体通过决议 resolution_custodian_form_empire（common/resolutions/01_resolutions_nemesis.txt:1017，事件调用在 1047）或觉醒帝国的 resolution_awakened_galactic_empire（:1186，调用在 1203）后，触发隐藏事件 emperor.1（events/nemesis_emperor_events.txt:113-160）。emperor.499 / 498 等“测试事件”（is_test_event，trigger = always = no）只用于调试，不是游戏流程。
Passing resolution_custodian_form_empire or resolution_awakened_galactic_empire fires hidden emperor.1; emperor.499 is only a debug test event (always = no).

## 剧情脉络 Story outline

1. emperor.1（隐藏）：记录现有的看守者决议（统一战线、INA、GTO）；若有银河防卫军 / 扩张防卫军决议，10 天后触发 emperor.51；若有银河警察决议，4 天后触发 emperor.71；然后加冕：emperor.2。
   Hidden 1 notes the Custodian resolutions, schedules 51 (10 days) and 71 (4 days), then crowns the emperor with 2.
2. emperor.2 “新秩序的黎明”：新皇帝收到加冕通知（获得银河君主政体、帝国权威等；选项“Hear, hear!”）；随即向其他玩家国触发 emperor.3。
3. emperor.3：其他玩家国收到“新秩序”通知；根据情况触发 emperor.10（附庸国的宗主不是成员 → 被禁止加入帝国）、emperor.4（对成员的帝国宣言）、emperor.5（联邦成员被要求退出“过时”的联邦）。
4. emperor.52 “帝国舰队”（隐藏 51 之后）：银河防卫军改名为帝国舰队；emperor.72 “帝国安全局”（隐藏 71 之后）：银河警察改名为帝国安全局。 52 / 72 only appear when the old Custodian force / police resolutions were active.

## 分支与结局 Branches and outcomes

- 3 的后续按各国情况互斥：附庸不能加入（10）/ 成员（4）/ 联邦成员另得 5。 The follow-ups of 3 depend on each empire.
- 52 与 72 各自独立，且只在原决议生效时出现。 52 and 72 are independent.

## 条件与文明差异 Conditions and variants

- 需要新霸权DLC；帝国之后的法案和内战见另两个故事。 Needs Nemesis; the later laws and civil war are in the other two Imperium stories.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/nemesis_emperor_events.txt, common/resolutions/01_resolutions_nemesis.txt
- 已核对 Checked：emperor.1-10、51、52、71、72 的触发与调用点；两个决议的事件调用。
- 更正 Corrections：原故事的根是测试事件 499，实际起点是决议；帝国舰队 / 军团 / 安全局的成立（emperor.50 / 55 / 70）是之后的法案，另见“帝国议会的法案”。
  The old root was the test event 499; the real start is the resolution.
