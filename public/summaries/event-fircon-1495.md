# 推进力学支持者宣言 / Propulsion Proponent Proclamation

- 分类 Category：文明纪事 Society (C7) · 审阅 Reviewed 2026-10-12
- 来源 Sources：`events/first_contact_dlc_events.txt:4228-4704`；common/on_actions/00_on_actions.txt:140-201（每月观测事件池）；`events/first_contact_dlc_situation_events.txt:316-376`（preftl.50）；`common/scripted_effects/pre_ftl_scripted_effects.txt:3087`（achieve_ftl_effect）

## 如何开始 How it starts

- 被观测的前超光速文明的“科技进步”局势每月有 5/100 的机会运行 preftl.50（之后 1800 天冷却），从每月观测事件池中按权重抽取一个条件满足的事件；本事件权重 25。
  The observed pre-FTL civilization's tech-progress situation has a 5/100 monthly chance to run preftl.50 (then an 1800-day cooldown), which draws one valid event from the monthly observation pool by weight; this event has weight 25.
- 条件：早期太空时代，以被动观察或样本采集任务观测；未禁用毁灭性前超光速事件；同一观测国只发生一次；与“行星际飞行”互斥（后者会设置本事件的标记）。
  Conditions: Early Space Age observed with Passive Observation or Specimen Collection; devastating pre-FTL events not blocked; once per observing empire; exclusive with "Interplanetary Flight" (which sets this event's flag).
- 隐藏分派事件设置一次性标记，然后在 0–25 天后向观测哨站拥有者（及游牧中继站观察者）发出可见事件。
  The hidden dispatcher sets a once-only flag and sends the visible event to the observation post owner (and nomad waystation observers) after 0-25 days.

## 剧情脉络 Story outline

- 1500「推进力学支持者宣言」：他们宣布研制超光速推进 → 500 天后 1505「获得很多，但是失去的更多」。
  1500 "Propulsion Proponent Proclamation": they announce superluminal propulsion → 500 days later 1505 "Much To Gain, Yet Much to Lose".
- 1505：（重视他者）远观，或（不重视他者）破坏试验 → 1000 天后 1510「完全脱离」：曲速试验失败，他们的科技倒退回更早的时代（重新开始科技进步局势）。
  1505: (values others) observe from afar, or (does not) sabotage the test → 1000 days later 1510 "Complete Separation": the warp test fails and their technology regresses to an earlier age (the tech-progress situation restarts).
- 1505：（重视他者）帮助他们，或（不重视他者）加速他们 → 1000 天后 1515「步入太空文明」→ 再 1000 天 1520「在身边」：他们成为太空文明，观测任务结束。
  1505: (values others) help them, or (does not) speed them along → 1000 days later 1515 "Spacefaring Commences" → another 1000 days 1520 "Among Us": they join the galaxy as a spacefaring society and the observation mission ends.

## 分支与结局 Branches and outcomes

- 倒退（1510）与进入太空（1515→1520）互斥。1520 通过 achieve_ftl_effect 让该文明成为太空国家，并在 1 天后由 pre-FTL 年代故事中的 preftl.1111 通报。
  Regression (1510) and spaceflight (1515→1520) are exclusive. 1520 turns the civilization into a spacefaring country via achieve_ftl_effect, announced a day later by preftl.1111 in the pre-FTL ages story.
- 这是随机观测插曲：只在满足条件时可能出现，彼此之间没有固定顺序。
  This is a random observation interlude: it may appear only when its conditions hold, with no fixed order relative to other interludes.

## 条件与文明差异 Conditions and variants

- 1505、1510、1520 的选项措辞按是否重视他者成对出现，效果相同。
  The options of 1505, 1510 and 1520 come in pairs by whether the empire values others; effects match.

## 审阅记录 Review notes

- 已核对：触发、全部延迟（500/1000/1000/1000 天）与分支。
  Checked: trigger, all delays (500/1000/1000/1000 days) and branches.
- 更正：1520 的“成为太空国家”效果内含起源开局效果（克隆大军、控制论信条等），编译器据此连到这些起源故事，属于假连接，已用 suppress 移除；保留到 preftl.1111 与科技进步局势的跨故事连接。
  Correction: the achieve-FTL effect in 1520 contains origin start-up effects (Clone Army, Cybernetic Creed…); the compiler linked them as continuations — false links now suppressed; the cross-story links to preftl.1111 and the tech-progress situation remain.
