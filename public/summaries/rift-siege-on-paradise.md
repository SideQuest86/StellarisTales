# 天堂围攻 / Siege on Paradise

- 分类 Category：星界裂隙 Astral rifts (C4) · DLC：星界位面 Astral Planes
- 来源 Sources：`common/astral_rifts/00_astral_rifts.txt:392`（裂隙定义 rift definition）；`events/astral_rifts_3_events.txt:11–1583`（3000–3099）；`common/inline_scripts/astral_rift/3060_tech_option.txt`
- 审阅 Reviewed：2026-10-12（全篇 whole story）

## 如何开始 How it starts

科学家乘科研船进入一处星界裂隙后，裂隙类型从探索帝国的裂隙池中按权重抽取。本裂隙基础权重 1；帝国正在进行巴奥事件链时 ×2，已完成时 ×4（`00_astral_rifts.txt:392–410`）。探索分阶段进行：每阶段结束掷一次 1–10 的骰子，加上科学家技能加值与线索、减去本章难度，结果 ≥14 即取得突破，进入下一章；第一章 3000 难度为 0。

A scientist on a science ship enters an astral rift; the rift type is drawn from the explorer's rift pool by weight. This rift has base weight 1, ×2 while the empire runs the Baol event chain and ×4 once it has completed it (`00_astral_rifts.txt:392–410`). Exploration runs in phases: at the end of each phase a d10 is rolled, skill bonus and clues are added and the chapter difficulty subtracted; a result of 14 or more is a breakthrough that opens the next chapter. The first chapter, 3000, has difficulty 0.

## 剧情脉络 Story outline

裂隙另一侧是一颗被精心照料的花园行星：植物类居民正在加固城市，星系外一支重装舰队已完成封锁（3000）。玩家先选择联络谁：

- **联络行星居民**（3000.a）：若帝国已接触巴奥事件链，科学家认出他们正是本宇宙早已灭绝的巴奥人（3005），并告知其未来，3010 中巴奥人请求援助；否则以“我们是探险家”的身份结识（3006），在 3015 中听巴奥人自述被古茹努尔围困。两条路线随后汇合：援助（3020/3021 的四种方案）或袖手旁观（3025）。
- **联络在轨舰队**（3000.b）：科学家被古茹努尔旗舰扣押审问（3050 → 3055）。知晓巴奥历史的帝国可以说出“我们看到了你们的未来”（3060），否则只能表明探险家身份（3065）。

At the far side lies a meticulously tended garden world: plantoid inhabitants fortify their cities while a heavily armed fleet blockades the system (3000). The player chooses whom to contact:

- **The inhabitants** (3000.a): if the empire knows the Baol event chain, the scientists recognise them as the Baol, extinct in our universe (3005), reveal their fate and receive a plea for help (3010); otherwise they introduce themselves as explorers (3006) and hear the Baol describe the Grunur siege (3015). Both routes reach the same decision: help with one of four plans (3020/3021) or stay out of it (3025).
- **The orbiting fleet** (3000.b): the scientists are taken aboard the Grunur flagship and questioned (3050 → 3055). An empire that knows the Baol history can say it has “seen your future” (3060); otherwise it can only claim to be explorers (3065).

## 分支与结局 Branches and outcomes

援助巴奥（3020/3021，内容相同，只是前文不同）：

- 基因改造（需基因剪裁科技）→ 3030 基因强化，结束探索，并可招募巴奥指挥官“橡树茎”（3031，可先问四个问题再招募或遣散）。
- 行星隐形（需基础隐形场，花费 50 星界丝缕）→ 3035，结束探索，解锁“星界隐形”法令。
- 保存幼苗（总可选）→ 3040，结束探索，在离裂隙最近的己方殖民地出现一批巴奥人口。
- 星界护盾（仅在未同时拥有上述两项科技时出现，花费 100 星界丝缕）→ 3049，获得“星界护盾实验”修正。

袖手旁观（3025）→ 3045 或 3046（按是否知晓巴奥人），结束探索并留下社会研究矿藏；约 720–1440 天后 3047“土归土”：殖民地被古茹努尔毁灭，矿藏移除，换取研究产出。

古茹努尔路线：

- 3060 中分享一项本帝国已有的军事科技 → 3070 → 3085，获得“古茹努尔武器界面”修正。
- 分享巴奥研究数据 → 3075；观看灭绝 → 3090，可建造“焰爆部队”；拒绝 → 3095。
- 拒绝合作 → 3095（本章难度 +1）。
- 未知巴奥人时（3065）：虚张声势 → 3076，按下水晶下令发射 → 3090，拒绝 → 3095；讲道理 → 3080 被判惩罚 → 3095。
- 3095“远征结束”：科学家被古茹努尔扣押，探索结束；约 1800–2520 天后科学家归来（3099），获得推进或舰船相关专长与“裂隙扭曲”特质。

Helping the Baol (3020/3021 offer the same four plans after different lead-ins):

- Genetic modification (requires Gene Tailoring) → 3030, the exploration ends and the Baol commander Oakenstalk can be enlisted (3031, a recruitment window with four questions, then Enlist or Dismiss).
- Planetary cloaking (requires Basic Cloaking Fields, costs 50 astral threads) → 3035, unlocks the Astral Cloaking edict.
- Preserve the seedlings (always available) → 3040, a Baol pop group appears on the empire's colony nearest the rift.
- Astral shield (shown only if the empire lacks one of the two technologies; costs 100 astral threads) → 3049, Astral Shield Experimentation modifier.

Staying out (3025) → 3045 or 3046 (by Baol knowledge), which ends the exploration and leaves a society research deposit; about 720–1440 days later 3047 “Dust to Dust” reports the colony destroyed, removes the deposit and grants research.

The Grunur route:

- Share one military technology the empire owns (3060) → 3070 → 3085, Grunur Weapons Interface modifier.
- Share Baol research data → 3075; watch the extermination → 3090 (Flamestorm Troopers can be built); refuse → 3095.
- Refuse to cooperate → 3095 (chapter difficulty +1).
- Without Baol knowledge (3065): bravado → 3076, then press the crystal (→ 3090) or refuse (→ 3095); reasoning → 3080 punishment → 3095.
- 3095 “Expedition's End”: the scientist is detained by the Grunur and the exploration ends; about 1800–2520 days later the scientist returns (3099) with a propulsion or voidcraft expertise and the Rift Warped trait.

## 条件与文明差异 Conditions and variants

- 巴奥事件链状态决定 3000.a、3025.a、3050、3055 出现哪一个版本，以及 3005/3010/3020/3040/3090 的叙述。
- 3055 的开场描写随科学家物种而变（机械、有机、岩石）；3085 的感想随和平/军国/灭绝倾向而变；3095 对格式塔帝国使用另一段文字。这些差异由探索时设置的裂隙描述标记决定（`astral_planes.6`），网站目前把它们显示为未解析的条件。
- 3060 只出现一个“分享科技”选项：3055.a 按固定顺序记录帝国拥有的第一项相关科技（`astral_rifts_3_events.txt:975–998`）。

- The Baol event chain status selects which version of 3000.a, 3025.a, 3050 and 3055 appears and changes the narration of 3005/3010/3020/3040/3090.
- 3055's opening varies with the scientist's species (machine, organic, lithoid); 3085 varies for pacifist/militarist/exterminator empires; 3095 has a gestalt text. These variants are chosen by rift description flags set when each chapter fires (`astral_planes.6`); the site currently shows them as unresolved conditions.
- Only one “Share <technology>” option appears in 3060: 3055.a records the first relevant technology the empire owns, in a fixed order (`astral_rifts_3_events.txt:975–998`).

## 审阅记录 Review notes

- 已核对：裂隙定义与权重；3000–3099 全部事件的选项条件、费用、`set_next_astral_rift_event` 目标、`finish_astral_rift`、延时后续 3047（720+720 天）与 3098→3099（1800+720 天）；3060 内联选项脚本。本裂隙没有 `on_roll_failed` 失败分支。
- 修正：编译草稿结构正确；新增三组互斥说明（按巴奥事件链二选一）、八个结局标注和 3060 选项说明。
- 不确定：描述标记驱动的文本变体尚未被条件模型解析（见台账 Requests）。

- Checked: rift definition and weight; every event 3000–3099 — option conditions and costs, `set_next_astral_rift_event` targets, `finish_astral_rift`, the delayed follow-ups 3047 (720+720 days) and 3098→3099 (1800+720 days), and the 3060 inline option script. This rift has no `on_roll_failed` failure branch.
- Corrections: the compiled draft was structurally correct; added three exclusive groups (Baol-chain variants), eight ending labels and a note on the 3060 options.
- Uncertain: description-flag text variants are not resolved by the condition model (see ledger Requests).
