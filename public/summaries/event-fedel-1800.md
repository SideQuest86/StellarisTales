# 教团召集 / The Conclave Convenes
- 分类 Category：文明纪事 Society (C7) · 联邦领袖挑战 federation leadership challenge

## 如何开始 How it starts

联邦领袖换届时（on_federation_leader_challenge，`00_on_actions.txt:3560–3568`）同时触发五个隐藏根事件（fedel.1、500、900、1500、1800），每个只在联邦的“挑战类型”法律与之匹配时通过（`13_challenge_type.txt`）。隐藏根 fedel.1800 要求联邦采用“议会”(challenge_type_conclave) 法律；设置标志 conclave_underway，并在 3 的概率权重下让议会“接受贿赂”（conclave_accepts_bribes）。 / When a federation leadership challenge starts (on_federation_leader_challenge, 00_on_actions.txt:3560–3568) five hidden roots (fedel.1, 500, 900, 1500, 1800) fire; each passes only if the federation’s challenge-type law matches (13_challenge_type.txt). Hidden fedel.1800 needs the conclave law, sets conclave_underway and may mark the conclave as accepting bribes.

## 剧情脉络 Story outline

1. **议会召开（1805）**：成员选择捐献（小额 / 稍多 / 最豪华的供奉，或“凭德行”），影响自己的得票。/ Members choose how generously to contribute.
2. **议会：持续审议（1815）**（45 天后）：透露领先者，可再追加另一种货币的捐献。/ 45 days later a frontrunner is revealed and more contributions are possible.
3. **最有德行者（1825）**（再 45 天后）：宣布胜者；胜者“领导好我们的羊群”，其他人“愿他们领导好我们”。/ 45 more days later the winner is announced.

## 分支与结局 Branches and outcomes

线性三步；胜负由捐献与随机因子决定。/ Three linear steps; the result depends on contributions and a random factor.

## 条件与文明差异 Conditions and variants

议会可能（约 3 分之几的概率）接受贿赂。/ The conclave may accept bribes.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（c7b-society）
- 来源 Sources：`events/federations_election_events.txt:3536-3760` · `common/federation_laws/13_challenge_type.txt:319-400` · `common/on_actions/00_on_actions.txt:3560-3568`
- 已核对 Checked：根 1800、1805、1815、1825。/ Roots and events.
- 审阅改动 Changes：结构与草稿一致。/ Matches the draft.
- 不确定 Uncertain：各捐献档位对得票的精确加成未逐项展开。 / The exact vote bonus of each contribution tier was not expanded.
