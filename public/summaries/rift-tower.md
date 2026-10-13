# 巨塔 / The Tower

- 分类 Category：星界裂隙 Astral rifts (C4) · DLC：星界位面 Astral Planes
- 来源 Sources：`common/astral_rifts/00_astral_rifts.txt:69`；`events/astral_rifts_0_events.txt:2333–2822`（600–696）；`common/on_actions/00_on_actions.txt:2394`（on_leader_death）
- 审阅 Reviewed：2026-10-12（全篇 whole story；原独立故事 event-astral-rift-695 已并入 / former standalone story event-astral-rift-695 merged in）

## 如何开始 How it starts

裂隙类型从探索帝国的裂隙池中按权重抽取，权重 1，无额外条件（`00_astral_rifts.txt:69–78`）。每阶段结束掷 1–10 的骰子，加技能与线索、减难度，≥14 进入下一章；第一章 600 难度为 0。

Drawn by weight from the explorer's rift pool, weight 1, no extra conditions (`00_astral_rifts.txt:69–78`). Each phase ends with a d10 plus skill and clues minus difficulty; 14+ opens the next chapter. Chapter 600 has difficulty 0.

## 剧情脉络 Story outline

1. 巨塔（600）：探球降落在一座高耸入云的石塔顶端，基座的尺寸恰好与探球吻合；一个披着破旧长袍的生物在等候。选择沟通（→ 605，非“非友好”帝国）、观察（→ 610）或杀了它（→ 611，仅非友好帝国）。
2. 二进制通讯（605）/ 恭迎已久（610）：生物把探球的到来视为预言应验，众人献上礼物；这座塔可能是这个前超光速文明第一次“触及太空”的尝试。可以邀请他们上船（→ 615）、花 100 合金回礼（→ 620）或离开（→ 625）；610 中非友好帝国还可以杀死它（→ 611）。
3. 一网打尽（611）：探球升起后以极限速度落下，砸死了塔顶的生物；之后扫描行星（→ 625），获得凝聚力。
4. 东道主（615）：那个生物是同类中的领袖。邀请其来帝国（615.a）或扣押其文件后放走（615.b，立即获得一项随机社会学科技）；两者都结束探索。

1. The Tower (600): the Sphere lands atop a cloud-piercing stone tower on a pedestal shaped exactly for it; a creature in a tattered robe waits. Communicate (→ 605, not-unfriendly empires), observe (→ 610) or kill it (→ 611, unfriendly empires only).
2. Binary Communication (605) / A Long Awaited Welcome (610): the creatures treat the arrival as a fulfilled prophecy and bring gifts; the tower may be this pre-FTL civilisation's first reach toward space. Invite them aboard (→ 615), return the gift for 100 alloys (→ 620) or leave (→ 625); in 610 unfriendly empires may also kill the creature (→ 611).
3. Fish in a Barrel (611): the Sphere rises and drops at terminal velocity onto the crowd; then scan the planet (→ 625) for unity.
4. Playing Host (615): the creature is a leader of its kind. Invite it to the empire (615.a) or confiscate its documents and release it (615.b, a random society technology at once); both end the exploration.

## 分支与结局 Branches and outcomes

- 620 互惠：留下礼物与母星坐标，获得凝聚力，探索结束。
- 625 预言否决：改为采集云中星界物质，获得大量星界丝缕，探索结束（杀死生物后显示另一段文字）。
- 615.a → 360 天后（隐藏事件 690 生成人物）691“晋升”：作为普通公民生活（凝聚力，人物移除）或招募为科学官。
- 696 葬礼：只有 691.b 招募的科学官去世时触发（on_leader_death → 695 检查 `recruited_tower_rift_leader` 国家标记与 `tower_rift_leader` 领袖标记，且帝国非格式塔），获得社会学研究与凝聚力。691.a 没有这个尾声。

- 620 Reciprocity: a gift and the home coordinates are left behind; unity; the exploration ends.
- 625 Prophecy Rejected: astral material is harvested from the clouds instead; a large astral thread reward; the exploration ends (a different text after the killing).
- 615.a → 360 days later (hidden event 690 creates the person) 691 “Advancement”: let them live as a citizen (unity; the leader is removed) or recruit them as a scientist.
- 696 funeral: only when the scientist recruited in 691.b dies (on_leader_death → 695 checks the country flag `recruited_tower_rift_leader`, the leader flag `tower_rift_leader` and a non-gestalt empire); society research and unity. 691.a has no such epilogue.

## 条件与文明差异 Conditions and variants

- 600、610 的选项按 `is_unfriendly`（非友好帝国）分开；625 的正文按是否杀死生物（裂隙标记 killed_creature）变化。

- Options in 600 and 610 split on `is_unfriendly`; the text of 625 changes if the creature was killed (rift flag killed_creature).

## 审阅记录 Review notes

- 已核对：裂隙定义；600–696 全部事件；615.a 的 360 天延时（`astral_rifts_0_events.txt:2596–2602`）；691 两个选项；`on_leader_death` → 695 → 696 的条件（`00_on_actions.txt:2394`，`astral_rifts_0_events.txt:2776–2796`）。
- 修正：V3 迁移的桥接（691.b → 696）正确，补齐证据；隐藏事件 695 原为独立故事的入口，现通过故事族成员并入本篇，避免同一葬礼出现在两张卡片上。本裂隙没有失败分支。

- Checked: rift definition; every event 600–696; the 360-day delay of 615.a (`astral_rifts_0_events.txt:2596–2602`); both options of 691; the `on_leader_death` → 695 → 696 conditions (`00_on_actions.txt:2394`, `astral_rifts_0_events.txt:2776–2796`).
- Correction: the V3 bridge (691.b → 696) was right and now carries file:line evidence; the hidden router 695 had opened a separate story and is now a family member, so the funeral no longer appears on two cards. No failure branch in this rift.
