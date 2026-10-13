# 灵能之战 / Psionic Battle
- 分类 Category：文明纪事 Society (C7) · 联邦领袖挑战 federation leadership challenge
- 来源 Sources：`events/federations_election_events.txt:1695-2280` · `common/federation_laws/13_challenge_type.txt:107-201` · `common/on_actions/00_on_actions.txt:3560-3568`
- 审阅 Reviewed：2026-10-13（c7b-society）

## 如何开始 How it starts

联邦领袖换届时（on_federation_leader_challenge，`00_on_actions.txt:3560–3568`）同时触发五个隐藏根事件（fedel.1、500、900、1500、1800），每个只在联邦的“挑战类型”法律与之匹配时通过（`13_challenge_type.txt`）。隐藏根 fedel.500 要求联邦采用“灵能战斗”(challenge_type_psionic_battle) 法律；向所有成员发 **501**，60 天后触发隐藏结算 **505**。 / When a federation leadership challenge starts (on_federation_leader_challenge, 00_on_actions.txt:3560–3568) five hidden roots (fedel.1, 500, 900, 1500, 1800) fire; each passes only if the federation’s challenge-type law matches (13_challenge_type.txt). Hidden fedel.500 needs the psionic-battle law; it sends 501 to every member and runs the hidden resolution 505 after 60 days.

## 剧情脉络 Story outline

1. **灵能战斗（501）**：每个成员可献上 100 / 500 / 1000 佐罗（对应灵能 +40 / +60 / +80），或不献、或（附庸/没有灵能人口者）不参战。/ Members may offer 100 / 500 / 1000 zro (+40 / +60 / +80 psionic ability), none, or abstain.
2. **隐藏结算（505）**：灵能能力 = 潜在灵能人口 +1/个、灵能人口 +3/个、通灵者岗位 +40/个、再加献祭；按能力档位给胜出权重（每 20 点 +40，≥400 +200），加权随机选胜者。/ Ability = latent psionic pops (+1), psionic pops (+3), telepath jobs (+40) plus the offering; the winner is drawn by weight.
3. 胜者收到 **510 灵能战斗胜利**，其他成员收到 **515 灵能战斗失败**。/ The winner gets 510, everyone else 515.

## 分支与结局 Branches and outcomes

510 / 515 互斥。/ 510 and 515 are exclusive.

## 条件与文明差异 Conditions and variants

需要灵能人口；意识集合不参加此计算。/ Needs psionic pops; gestalts are excluded from the ability calculation.

## 审阅记录 Review notes

- 已核对 Checked：根 500、501、505、510、515。/ Roots and events.
- 审阅改动 Changes：结构与草稿一致；补充了能力值计算。/ Matches; ability calculation added.
