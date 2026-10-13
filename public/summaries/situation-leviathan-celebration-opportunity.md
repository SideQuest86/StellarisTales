# 巨兽庆典机遇 / Leviathan Celebration Opportunity（情境 Situation）

- 分类 Category：巨兽与城邦 · 来源 Sources：common/situations/01_narrative_situations.txt:349-623; events/situation_events.txt:4185-5380; common/scripted_effects/00_scripted_effects.txt:5860-6000 · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts
击败（或解决）某头巨兽后，对应的事件对拥有行星的帝国执行 start_situation：以太巨龙(leviathans.670)、噬星者(1016)、星际幽魂(2014)、神秘堡垒(2099/2151/2154/2156)、位面之魇(3003)、无畏战舰(3102)，以及其他DLC的拾荒机器人、族母、天空龙、虚空孳孽、裂爪龙、古老者、巨虫。每个事件设置一个 celebration_* 标记和奖励等级。
Each victory event starts the situation on a planet and sets a celebration_* flag plus a reward tier.

## 剧情脉络 Story outline
1. 开始：若帝国是纪念主义者，隐藏事件 1105 立刻提高奖励等级。
2. 进度（每月基础+4，鼓励+2，抑制-8，重组：花1000凝聚力并暂停）：到50进入阶段2，70阶段3，100完成。 Progress; stage 2 at 50, stage 3 at 70, complete at 100.
3. 阶段2：同时触发11个事件，但每个只在对应战利品标记存在时出现，所以实际是“按战利品只发生一种”的并列分支（以太龙1045、裂爪龙1050、无畏战舰1055、族母1060、天空龙1065、拾荒机器人1070、幽魂1075、位面之魇等1080、神秘堡垒1100、虚空孳孽1110、噬星者1120）。 Stage 2 fires all eleven events, but each checks its trophy flag, so exactly one trophy's complication appears.
4. 完成：非格式塔 1005 / 格式塔 1000，选项按奖励等级（小/标准/大）给出不同的每月凝聚力奖励并为星球添加战利品修正，然后情境结束。
5. 失败：目标星球易主则中止，隐藏事件 1180 销毁情境。

## 分支与结局 Branches and outcomes
- 1045 慢速处理(-30进度)/研究(7200天修正，结束)/复制品(降低奖励)；1050/1055/1060/1065/1070/1075 各有三到四个选项，涉及进度增减、奖励升降、研究加成或结束情境。 Stage-2 events trade progress, reward tier and bonuses.
- 1110 虚空孳孽：a 开启污染情境(“净化”完成后 1115 再提高一级奖励)，b 立刻清除并结束。
- 1120 噬星者：a 把卵鞘送回，开启项目 STELLARITE_DEAD_PROJECT → leviathans.1017 → STELLARITE_STAR_PROJECT → 1018（见噬星者故事）；b 带回星球(+15进度)。
- 恐怖负相物质类战利品：1080 选“研究/控制/神化/送回黑洞”；完成时 1085 在 2480 天（控制则4960天）后触发 → 1090（1240天）→ 1095（720天）：行星约2/3变为黑洞，1/3稳定。 Horror trophies: study/contain/deify, with long-delayed fallout.

## 条件与文明差异 Conditions and variants
格式塔与否决定 1000/1005；1080 选项受唯物/唯灵限制（1080.a 需非唯物主义，1080.b 需非唯灵，1080.d 需唯灵）；1110 的描述随机器/石质/常规而变。

## 审阅记录 Review notes
纠正：编译器原先把阶段2的11个事件排成一条先后链；现改为并列互斥分支（用 suppress+bridges）。1085 仅出现于恐怖负相物质类战利品。覆盖完整；各战利品的启动事件在各自的故事中交叉链接。
Correction: the draft chained the eleven stage-2 events in order; they are alternatives selected by trophy flag. 1085 only follows the horror trophies.
