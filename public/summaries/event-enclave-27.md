# 舰队紧急召回 / Emergency Fleet Recall

- 分类 Category：巨兽与城邦 · DLC：霸主 Overlord

## 如何开始 How it starts
佣兵城邦的空间站卷入战斗时（on_entering_battle → 隐藏 enclave.27），城邦收回已出租的军舰；若租用方本身不是攻击者，1天后向其发送本通知。
When a mercenary enclave's station enters battle, hidden enclave.27 recalls its leased warfleet; if the client is not itself the attacker, it receives this notice one day later.

## 剧情脉络 Story outline
单窗口：合约按“285b.15条款”终止，舰队返回城邦星系，费用退还。两个选项（祝福对方 / 抱怨没读细则）效果相同。灵督城邦使用专门文本与画面。
One window: the contract is ended under "clause 285b.15", the fleet returns home and the fee is refunded. Both replies have the same effect. Mindwarden enclaves use their own text and art.

## 分支与结局 Branches and outcomes

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-12（C6）
- 来源 Sources：events/overlord_enclaves_events.txt:352（enclave.27）, :400（enclave.29）; common/on_actions/00_on_actions.txt:1378
已核对触发条件、退款效果与变体文本。覆盖完整。Checked trigger, refund and text variants. Coverage complete.
