# 白雪异变 / Unusual Snow

- 分类 Category：文明纪事 Society (C7)

## 如何开始 How it starts

- 殖民地满 4 年或 5 年时的随机殖民地事件（权重 6/189 与 6/194）。限非 AI、非格式塔帝国，非首都、非母星的沙漠星球殖民地；每局一次。
  A random colony event when a colony turns 4 or 5 years old (weights 6/189 and 6/194). Only for non-AI, non-gestalt empires, on a desert colony that is not the capital or homeworld; fires once per game.
- 150「白雪异变」：沙漠殖民地外出现了不会融化的“雪”。唯一选项开启局势「白雪异变」。
  150 "Unusual Snow": "snow" gathers outside a desert settlement. Its only option starts the situation "Unusual Snow".

## 剧情脉络 Story outline

1. 局势每月 +5 进度（选“把它们全融了”且已加倍努力时再 +5）。第一阶段 0–25% 没有事件。
   The situation gains 5 progress per month (+5 more with the hostile approach after "redoubling" in 160). Stage 1 (0–25%) has no events.
2. 25%：155「散播寒意」——选择“平静地观测它”或“把它们全融了”。
   At 25%: 155 "Spreading Chills" — choose to observe it peacefully or to melt it all.
3. 第二阶段（25–80%）的随机事件（可能都不发生，顺序不定）：160「移除问题」（仅融化方式；加倍努力或维持现状）、170「被雪吞噬」（殖民者失踪，观测花费上升）、175「气候变化」（研究奖励）。160 与 170 至多其一，175 至多一次。
   Random events in stage 2 (25–80%; possibly none, any order): 160 "Removal Problems" (hostile approach only; redouble or keep the current effort), 170 "Swallowed by the Snow" (colonists vanish; observing costs more), 175 "Climate Change" (research reward). At most one of 160/170; 175 at most once.
4. 80%：165「被雪淹没」——最后一次选择方式，之后方式被锁定。
   At 80%: 165 "Swamped by Snow" — the last choice of approach; afterwards it is locked.
5. 100%：雪获得了智慧，发来通讯。
   At 100% the snow has become sapient and sends a transmission.

## 分支与结局 Branches and outcomes

- 锁定为“把它们全融了” → 180：只能开战。锁定为“平静地观测它” → 185：可让出土地（获得“活雪保留地”矿藏与标本“活雪雕塑”，和平结束），或开战。两者互斥。
  Locked to "Melt it. All." → 180: war is the only answer. Locked to "Observe it Peacefully" → 185: cede some land (the planet gains the "Living Snow Reserve" deposit and you receive the "Living Snow Sculpture" specimen; peaceful end) or go to war. The two are mutually exclusive.
- 开战时在星球上生成“活雪”派系及 6 支冰雪军队。若它们攻占殖民地 → 190「殖民地丢失！」；1800–2160 天后若雪仍控制星球 → 195「无尽冰雪」：殖民地被毁，星球变为冰冻世界并获得研究矿藏。
  War spawns a "Living Snow" faction with 6 ice armies on the planet. If they seize the colony → 190 "Colony Lost!"; if the snow still controls it 1800–2160 days later → 195 "Unending Ice": the colony is destroyed and the planet turns frozen with research deposits.
- （评注）若守住或在 195 之前夺回星球，没有后续窗口，故事静默结束。
  (Commentary) If the colony holds, or is retaken before 195, no further window appears and the story ends silently.

## 条件与文明差异 Conditions and variants

- 160 只在“把它们全融了”方式且第二阶段时触发；175 在观测时权重加倍。165 的两组同名选项分别对应“切换到该方式”与“保持该方式”。
  160 requires the hostile approach in stage 2; 175 is twice as likely while observing. 165 has two copies of each option: one switches to that approach, the other keeps it.
- 若殖民地易主，局势中止（abort_trigger）。
  The situation aborts if the colony changes owner.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-12
- 来源 Sources：`events/situation_events.txt:397-799`；`common/situations/01_narrative_situations.txt:1-147`；`common/on_actions/00_on_actions.txt:877-884`（以及 on_colony_4/5_years_old 随机殖民地事件池）
- 已核对：150–195 全部事件、局势定义（阶段、权重、接近方式与锁定、on_progress_complete 分支）、on_colony_defenders_lose 回调与 195 的延时和条件。
  Checked: all events 150–195, the situation definition (stages, weights, approaches and lock, on_progress_complete branch), the on_colony_defenders_lose callback and 195's delay and trigger.
- 更正 Corrections：草稿把 180/185 挂在局势卡下与 155 并列，现改接在 165 之后（由 165 锁定的方式决定）；原独立卡片 `event-situation-190`（殖民地丢失/无尽冰雪）是本故事的战争后续，已并入并用条件连接接在 180/185 的开战选项后。
  The draft hung 180/185 beside 155 under the situation card; they now follow 165 (the approach it locks decides the outcome). The separate card `event-situation-190` (Colony Lost / Unending Ice) is this story's war aftermath and is merged in, linked from the war options of 180/185.
