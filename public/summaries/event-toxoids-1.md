# 无情的工业家 / Relentless Industrialists

- 分类 Category：银河轶事 C8 stories · 来源 Sources：events/toxoids_events.txt, common/situations/01_toxoid_situations.txt, common/on_actions/00_on_actions.txt · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

on_colony_yearly_pulse（common/on_actions/00_on_actions.txt:3934）触发 toxoids.1（events/toxoids_events.txt:10-133）：有协调履行中心（1级+1/年，故障+0.5，2级+2）的非特殊行星，所有者是“无情工业家”。变量达30后：若还没发生过情境，15–195天后 toxoids.5；已发生过则该行星直接变为墓地世界。
Accumulating pollution reaches 30: first time -> toxoids.5 and the situation; later times turn the planet into a Tomb World directly.

## 剧情脉络 Story outline

toxoids.5 开启情境（初始进度50，双向）。态度：不作为/随它去（+2.5/月）、清理（−2.5/月）、拥抱变化。阶段：清理(≤50)、浩劫一(≤80，稳定−10)、浩劫二(≤100，稳定−20；首次进入时随机 1:4：toxoids.15 民众无所谓 / toxoids.10 民众抗议，若种族在墓地世界宜居则10不会出现)。
结局：进度归零 → toxoids.35 “恢复”；进度满 → 不作为 toxoids.25 “为了进步”（履行中心加强）/ 其他 toxoids.30 “变革的知识”（可制造墓地世界）。

## 分支与结局 Branches and outcomes

- 10 / 15 互斥（随机）；35、25、30 互斥。

## 条件与文明差异 Conditions and variants

- 进入浩劫二后不能再改变态度。

## 审阅记录 Review notes

- 已核对 Checked：toxoids.1-35 与情境。
