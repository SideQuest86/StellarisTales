# 心胜于物 / Mind Over Matter

- 分类 Category：银河轶事 C8 stories · 来源 Sources：events/utopia_on_action_events.txt:1339–1982、common/traditions/01_psionics.txt:1–135、common/scripted_effects/shroud_shadows_scripted_effects.txt:10–110, 4068 起、events/observer_events.txt · DLC：乌托邦 Utopia · 审阅 Reviewed 2026-10-12

## 如何开始 How it starts

采纳“灵能传统”（tr_psionics_adopt，需飞升天赋“心胜于物”与科技“灵能理论”；“虚境导师”起源及 ratling_country 标记的国家只需科技）时立即触发“心胜于物”（utopia.2600）。主物种获得“灵能潜势”特质，同时向其他帝国发送通知（2602），观察者另见 observer.5。
Adopting the *Psionic Traditions* (requires the *Mind Over Matter* ascension perk and *Psionic Theory*; the *Teachers of the Shroud* origin and countries flagged ratling_country need only the tech) fires *Mind Over Matter* (utopia.2600). The main species gains *Latent Psionic*, other empires get a notice (2602) and observers observer.5.

## 剧情脉络 Story outline

1. 心胜于物（2600）：古老传说中的“巫师”成为现实，少数个体展现灵能。“强制重置”起源有另一段正文；“虚境导师”起源的选项不显示特质提示。
   *Mind Over Matter*: the old sorcerer tales turn out true. The *Hard Reset* origin has its own text; the *Teachers of the Shroud* option shows no trait tooltip.
2. “灵能潜势”期间（随机，平均220个月，可重复）：一名同物种、尚无灵能/天选特质的领袖被确认为灵能者——有机非格式塔（2606）、机械非格式塔（2607）或格式塔的统治者（2608），按帝国类型三选一。
   While *Latent Psionic* (random, MTTH 220 months, repeatable): a leader is identified as psionic; one of three versions by empire type.
3. 大觉醒（2650）：采纳“大觉醒”传统（需先有“灵能军团”与“读心术”）后，主物种全面觉醒为灵能物种，所有领袖更新特质；其他帝国收到通知（2652），观察者见 observer.6。
   *The Great Awakening*: after the *Great Awakening* tradition (requires *Psi Corps* and *Mind Readers*) the main species becomes fully psionic; other empires are notified.
4. 采纳“突入虚境”后进入故事“虚境”（utopia.2655）。
   Adopting *Breach the Shroud* continues in the story *The Shroud*.

## 分支与结局 Branches and outcomes

- 2606/2607/2608 是互斥版本，不是先后三章；只要仍有“灵能潜势”物种与合格领袖就可能再次发生。大觉醒后主物种不再是“灵能潜势”，因此通常不再触发。
  The three identification events are alternatives; after the Awakening the main species is no longer *Latent Psionic*, so they normally stop.
- 本段没有失败结局；“大觉醒”传统另在360–1080天后安排虚境行者飞地的接触（enclave.7000，属于其他故事，非本段事件直接调用）。
  No failure branch; the *Great Awakening* tradition also schedules the Shroudwalker enclave contact (enclave.7000, another story).

## 条件与文明差异 Conditions and variants

- 其他帝国收到的通知按发出方是否机械/格式塔改变正文；接收方是唯物主义、与其交战或本身为灵能物种时选项不同。
  The notices vary by the sender's type and by whether the receiver is materialist, at war, or psionic itself.
- 在无“虚境之影”时，蜂巢思维物种不会获得“灵能潜势”（add_latent_psionic_trait 的条件）。
  Without *Shadows of the Shroud*, hive-mind species do not receive *Latent Psionic*.

## 审阅记录 Review notes

- 已核对 Checked：01_psionics.txt 传统前置与 on_enabled 调用（2600、2650、2655、2658）；2600–2608、2650–2652 事件块；mind_over_matter_immediate、add_latent_psionic_trait、turn_main_species_to_psionic 脚本效果；2605 的 MTTH 与按帝国类型的分派。
  Checked tradition prerequisites and calls, all event blocks, the scripted effects and 2605's MTTH dispatch.
- 更正 Corrections：原先“心胜于物”“灵能者被识别”“大觉醒”是三个互不相连的故事；按灵能传统树（同一容器）的顺序合并，2605 的三个版本放在“灵能潜势”阶段下并标为互斥；“虚境”以条件连接相接，作为单独故事。
  Three disconnected stories were merged in tradition-tree order; *The Shroud* continues as its own story.
- 不确定 Uncertain：2602/2652 与 observer.5/6 也由“虚境之影”内容触发（shroud.2750、8310、2780、2830），在那些故事中同样出现。
  These shared docs also appear in the Shadows of the Shroud stories.
- 覆盖范围 Coverage：本故事全部文档已对照源码；连接文字为审阅说明。
  All docs checked; link texts are commentary.
