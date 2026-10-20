# 竞技场之战 / The Arena
- 分类 Category：文明纪事 Society (C7) · 联邦领袖挑战 federation leadership challenge

## 如何开始 How it starts

联邦领袖换届时（on_federation_leader_challenge，`00_on_actions.txt:3560–3568`）同时触发五个隐藏根事件（fedel.1、500、900、1500、1800），每个只在联邦的“挑战类型”法律与之匹配时通过（`13_challenge_type.txt`）。隐藏根 fedel.1 要求联邦采用“竞技场格斗”(challenge_type_arena_combat) 法律；向所有成员发 **2**，30 天后触发隐藏结算 **5**。 / When a federation leadership challenge starts (on_federation_leader_challenge, 00_on_actions.txt:3560–3568) five hidden roots (fedel.1, 500, 900, 1500, 1800) fire; each passes only if the federation’s challenge-type law matches (13_challenge_type.txt). Hidden fedel.1 needs the arena-combat law; it sends 2 to every member and runs the hidden resolution 5 after 30 days.

## 剧情脉络 Story outline

1. **竞技场（2）**：每个成员派出本国统治者（意识集合或没有统治者、附庸国则不参赛）。/ Every member sends its ruler (gestalts, empires without a ruler and subjects abstain).
2. **隐藏结算（5）**：按每位统治者的特质和物种/文明加分算出“能力值”（如凶残 +10、心灵 +25、合成 +20、选召者 +500；知识分子/官僚 −10；物种强壮 +10 / 很强壮 +15；战士文化 +20 等），再按能力档位给权重加成，加权随机选出胜者。/ The hidden 5 computes a combat ability from each ruler’s traits, species and civics and draws the winner by weighted random.
3. 胜者收到 **10 竞技场胜利**，其他参赛者收到 **15 竞技场失败**，不参赛者收到 **16 给胜利者**；胜者成为联邦领袖。/ The winner gets 10, the other contestants 15 and abstainers 16; the winner becomes federation leader.

## 分支与结局 Branches and outcomes

10 / 15 / 16 互斥（按是否胜出与是否参赛）。/ 10 / 15 / 16 are exclusive by outcome and participation.

## 条件与文明差异 Conditions and variants

统治者特质与文明/物种决定权重；意识集合不参赛。/ Ruler traits and civics decide the weights; gestalts abstain.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（c7b-society）
- 来源 Sources：`events/federations_election_events.txt:15-720` · `common/federation_laws/13_challenge_type.txt:4-106` · `common/on_actions/00_on_actions.txt:3560-3568`
- 已核对 Checked：根 1、2、5 与 10/15/16。/ Roots 1, 2, 5 and 10/15/16.
- 审阅改动 Changes：结构与草稿一致；补充了能力值与权重规则。/ Matches; ability and weighting rules added.
