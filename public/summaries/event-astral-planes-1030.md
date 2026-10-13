# 维度锁正在失稳 / Dimensional Lock Is Destabilizing

- 分类 Category：星界裂隙 Astral rifts (C4) · DLC：星界位面 Astral Planes
- 来源 Sources：`events/astral_planes_events.txt:1697–1733`；`common/astral_actions/astral_planes_actions.txt:578`；`common/defines/00_defines.txt:588–592`
- 审阅 Reviewed：2026-10-13（全篇 whole story）

## 如何开始 How it starts

“维度锁”是一项星界行动（`action_dimensional_lock`，花费 1000 星界丝缕）：用科研船把虫洞 / 旁路锁定，只有得到许可的舰队可以进入。锁持续 3600 天（到期前 30 天有提醒）；锁到期时 on_action `on_dimensional_lock_expired` 触发旁路事件 `astral_planes.1030`（`00_on_actions.txt:5129–5135`；条件仅需星界位面 DLC）。

The “Dimensional Lock” is an astral action (`action_dimensional_lock`, 1000 astral threads): a Science Ship locks a wormhole / bypass so only permitted fleets may enter. The lock lasts 3600 days (a warning appears 30 days before expiry); when it expires the on_action `on_dimensional_lock_expired` fires the bypass event `astral_planes.1030` (`00_on_actions.txt:5129–5135`; it only needs the Astral Planes DLC).

## 剧情脉络 Story outline

单个事件，没有后续：

- “延长锁定”：花 1000 星界丝缕续期（要求该锁可以续期，且有足够的星界丝缕）。
- “由它去吧”：锁到期，之后只能由科研船重新建立。

A single event with no follow-up:

- “Renew Lock”: spend 1000 astral threads to renew it (the lock must be renewable and the threads available).
- “Let it go”: the lock expires and can only be re-established with a Science Ship.

## 分支与结局 Branches and outcomes

两个选项互斥，都结束此事件。

The two options are exclusive and both end the event.

## 条件与文明差异 Conditions and variants

- 续期选项需要 `can_lock_be_renewed` 与足够的星界丝缕，否则不可选。

- The renew option needs `can_lock_be_renewed` and enough astral threads, otherwise it is unavailable.

## 审阅记录 Review notes

- 已核对：事件、行动定义与 defines。它不是裂隙探索的一部分，因此保持单事件故事。
- 不确定：到期前 30 天提醒与 `on_dimensional_lock_expired` 的先后在脚本中不可见；事件文字（“正在失稳”）与 on_action 注释（“到期时触发”）措辞略有出入。

- Checked: the event, the action definition and the defines. It is not part of a rift exploration, so it stays a one-event story.
- Uncertain: the order of the 30-day warning and `on_dimensional_lock_expired` is not visible in script; the event text (“destabilizing”) and the on_action comment (“fired when it expires”) differ slightly.
