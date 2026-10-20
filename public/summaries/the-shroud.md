# 虚境 / The Shroud

- 分类 Category：银河轶事 C8 stories · DLC：乌托邦 Utopia

## 如何开始 How it starts

- 采纳灵能传统中的“突入虚境”（tr_psionics_breach_shroud，需先有“大觉醒”传统）时触发“虚境”（utopia.2655），开启社会学项目“突入虚境”（基础500，按人口增加）。项目完成后“降灵会”（2656）建立与虚境的联系，并第一次打开虚境大厅（3000）。前两段灵能传统见故事“心胜于物”。
  Adopting the Psionics tradition *Breach the Shroud* (requires the *Great Awakening* tradition) fires *The Shroud* (utopia.2655) and enables the society project *Breaching the Shroud* (500 + population). On completion *The Séance* (2656) links the empire to the Shroud and opens the Shroud contact (3000) for the first time. The earlier Psionics steps are the story *Mind Over Matter*.
- 此后虚境大厅是可重复的联络入口：通过外交界面联络虚境（on_custom_diplomacy）。没有冷却时显示大厅（3000），冷却中显示“虚境（冷却中）”（3010）。大厅只在未拥有“虚境之影”DLC时启用（has_shroud_dlc = no，utopia_shroud_events.txt:134）；本地安装的DLC目录中没有该DLC。
  Afterwards the contact is a repeatable hub reached through diplomacy with the Shroud: without a cooldown it shows 3000, during the cooldown 3010. It is only active without the *Shadows of the Shroud* DLC (has_shroud_dlc = no); that DLC is not among this install's DLC folders.

## 剧情脉络 Story outline

1. 首次深入（大厅带 shroud_intro 标记）：花费能量后进入“镜中窥视”（2657），某个存在注视着我们。三种回应：尝试交流 → 项目“与不可名状者交流”→ 缔结“传统契约”；或自行探索 / 退缩 → 180 / 360 天后“入口”（2659）→ 一次随机幻象。
   First delve (intro flag): after paying energy, *Through the Looking Glass* (2657): a presence watches. Commune → project *Commune with the Ineffable* → a "tradition covenant"; or venture alone / hold back → *A Way In* (2659) after 180 / 360 days → one random vision.
2. 之后每次“深入虚境”（1000能量×修正）都加2160天冷却（“灵能传统完成”可缩短20%），并从幻象池随机抽一个：灰烬残垣、灵争幻斗、灵能访客、无尽沙漠、多重宇宙、失落之声（需与非格式塔堕落帝国有联络）、虚空闪烁、护盾灵体、等待未来、高密度能量，或“虚境住民”；已见过或不适用的幻象改为“幻象”（3200）。每次只出现其一。
   Each later delve (1000 energy, modified) adds a 2160-day cooldown and draws one vision from the pool; seen or inapplicable visions fall back to *A Vision* (3200).
3. 幻象中的选择：召唤化身（舰船/陆军化身、召唤失败，或失控的灵能实体 → “虚境侵军”，化身若3600天内未被击毁则退回虚境）；随机列出的若干“恩赐”选项，各按高/中/低成功率随机得到对应恩赐、被逐出虚境或相应诅咒（70/20/10、50/30/20、30/40/30）；部分幻象有专属分支（窥探堕落帝国 → 科技或被发现后的警告；跃迁引擎、灵能护盾、预知接口；把能量灌注给一名领袖 → 天选者、死亡或失控）。
   Inside a vision: summon an Avatar (ship / army, failure, or an uncontrolled entity → *Shroud Incursion*; an undefeated Avatar withdraws after 3600 days); a random handful of boons, each resolving to the boon, ejection or a matching curse (70/20/10, 50/30/20, 30/40/30); vision-specific branches (spying on a Fallen Empire, jump drives, psionic shields, precognition, empowering a leader into a Chosen One).
4. 契约：大厅的“寻求更高力量”（2000能量+500泽珞）或幻象池中的“虚境住民”（3300，需先前被提议过契约）。交流先判定成功或两种“交流遭拒”（后者会失去一名领袖），成功后按帝国倾向选出守护者：虚空之低语、生命之织缕、世界之喰煞、渴求之器具；极少数情况下是“轮回之终末”。接受后签订契约（3310）并开始对应事件链；项目缔结的“传统契约”须等完成灵能传统360天后的“坚振圣事”（2658）确认，也可在此放弃。
   Covenants: *Reach out to a higher power* (2000 energy + 500 Zro) or the vision *A Presence in the Shroud*. The attempt rolls success or one of two rejections (one kills a leader); success picks a patron by the empire's leanings — Whisperers, Composer, Eater, Instrument, rarely the End of the Cycle. Accepting forms the covenant (3310) and starts its event chain; a project ("tradition") covenant waits for *A Confirmation* (2658), 360 days after completing the Psionics traditions, where it can also be renounced.
5. 契约成长：确认后契约等级每月增长（喜好的国策、思潮、传统、飞升天赋会加速），超过20 / 50 / 90 / 150 时依次出现“我们的纽带加深了”、“实现潜能”、“能量残屑”→“超升”（选择一名领袖成为天选者）、“赐福武备”（守护者专属科技）。期间约每15年一次的副作用按守护者各自随机。
   Covenant growth: after confirmation the rank grows monthly; at 20 / 50 / 90 / 150 come *Our Bond Grows Deeper*, *Potential Achieved*, *Scraps of Power* → *Ascended* (a Chosen leader), *Blessed Armaments*. Side effects roll about every 15 years per patron.
6. 天选之帝：拥有天选者领袖的非企业帝国约10年后可能拥立其为统治者（3400），其他帝国收到加冕通知（3401）。
   *A Divine Sovereign*: an empire with a Chosen One leader (not a megacorp) may crown them (MTTH 10 years); others get the coronation notice.
7. 轮回之终末：与其缔约获得巨大加成，18000天（50年）后“最终清算”（3320）吞没帝国，帝国在边缘的流放世界重生（或游牧者的方舟），清算之舰此后不断吞噬行星（3325）；其他帝国收到3321。
   *The End of the Cycle*: great power, then after 18000 days *The Reckoning* consumes the empire, which is reborn on an exile world (an arkship for nomads); the Reckoning keeps devouring worlds.

## 分支与结局 Branches and outcomes

- 幻象、召唤化身结果、交流结果、各守护者的副作用都是互斥的随机结果；地图上的多条线是同一时刻的替代可能，不是先后发生。
  Visions, Avatar outcomes, communion outcomes and side effects are mutually exclusive random results, not a sequence.
- 契约等级事件按门槛顺序发生；“超升”的天选者与幻象“高密度能量”的天选者都可引出“天选之帝”。
  Rank events follow their thresholds in order; both Chosen paths can lead to *A Divine Sovereign*.
- 大厅本身没有终点：冷却结束后可再次联络，地图中的“冷却结束后再次联络”是返回而非新剧情。“轮回之终末：最终清算”是这条线唯一终结帝国的结局。
  The hub has no end; returning after the cooldown is a loop. The Reckoning is the only empire-ending outcome.

## 条件与文明差异 Conditions and variants

- 机械、蜂巢、格式塔帝国在多处有不同正文与选项文字；恩赐对格式塔给予稳定度而非幸福度。
  Machine, hive and gestalt empires get different texts; the happiness boon becomes stability for gestalts.
- 器具的副作用在无“虚境之影”时只会是“腐化”；织缕的“退化”对机械帝国或拥有该DLC时不会出现；魂灵之月窠的三项副作用只属于“虚境之影”内容，本线无法缔结该契约。
  Without *Shadows of the Shroud* the Instrument's side effect is always *Decadence*; *Regression* never happens for machine empires or with that DLC; the three Cradle of Souls side effects belong to Shadows of the Shroud content.
- “能量残屑”（等级3）只在无“虚境之影”时由本线触发；该DLC有自己的流程，并另有故事收录同一事件。
  *Scraps of Power* (rank 3) is fired by this line only without Shadows of the Shroud; the DLC has its own flow and stories that share the event.
- 大厅另有“联络黏土塑造者”选项，属于塞塔娜危机（crisis.24100），见该故事。
  The *Animator of Clay* option belongs to the Cetana crisis story.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-12
- 来源 Sources：events/utopia_shroud_events.txt（utopia.3000–3402）、events/utopia_on_action_events.txt:1985–2431, 2493–3928、common/special_projects/00_projects_utopia.txt:67–129、common/traditions/01_psionics.txt:57–135、common/on_actions/00_on_actions.txt:352–356, 725–726
- 已核对 Checked：utopia.2655–2686（传统事件、项目回调、契约确认与等级检查，阈值 utopia_on_action_events.txt:5–8 为20/50/90/150），utopia.3000–3402 全部事件块，隐藏分派 3002/2659（权重10×10、20、10）、3303（守护者加权，终末基础权重2且受危机等级与 no_end_of_cycle 修正）、3330（MTTH 15年，冷却标记3600天）、恩赐脚本效果 shroud_scripted_effects.txt:869 起；on_custom_diplomacy / on_monthly_pulse_country 调用；“虚境之影”DLC判定 00_scripted_triggers.txt:487。
  Checked all of the above blocks, routers, weights and on_action calls.
- 更正 Corrections：旧标题“虚境的低语”不是游戏原文，改为原文“虚境”；起点由无序的次级入口改为 utopia.2655；“突入虚境”项目与降灵会、契约等级事件（原为4个单页故事）并入；补充副作用、契约等级、天选之帝与清算吞噬行星的条件连接。
  The old title was not game text; the root is now 2655; the breach project, Séance and four rank-up one-page stories were merged; state-triggered links were added.
- 不确定 Uncertain：清算后续的 shroud.11225/11235/11255/11260 来自 events/shroud_events.txt，与“终末使者”起源共享，只核对了本线如何到达；“虚境侵军”也可由“虚境之影”内容触发（shroud.13000），未在此审阅；契约等级的实际时间取决于存档状态。
  Shared Reckoning docs were only checked for how this line reaches them; the Shadows of the Shroud trigger of *Shroud Incursion* is out of scope; real rank timing depends on save state.
- 覆盖范围 Coverage：本故事全部文档已对照源码；编辑注释（地图标签、条件连接文字）均为审阅说明，不是游戏原文。
  All docs checked; map labels and link texts are commentary.
