# 掠袭 / Raiding

- 分类 Category: C8 银河轶事 / C8 Galactic miscellany · 来源 Sources: events/marauder_events.txt:4290-6390; events/marauder_events.txt:6388-6674; common/on_actions/00_on_actions.txt:92,95,241,1583,2166 · 审阅 Reviewed 2026-10-12

## 如何开始 How it starts

- 索贡：开局25年后的年度检查 marauder.100 有30%机会选中一个与掠夺者有通讯、未被掠袭也不在冷却中的帝国，1–11天后掠夺者发来索要贡品的 marauder.101（L4290-4352）。
  Tribute: from year 25 the yearly marauder.100 has a 30% chance to pick an empire in contact with marauders, not under attack or on cooldown; 1-11 days later the marauders demand tribute in marauder.101 (L4290-4352).
- 受雇掠袭：开局50年后，每月 marauder.150 让一个 AI 帝国雇掠夺者袭击其对手，目标在1–31天内收到“[物种]来袭”marauder.120（已接触）或 123（未接触）；玩家在掠夺者菜单中付款雇佣时，目标也收到同样的通知（marauder.33）。
  Hired raid: from year 50 the monthly marauder.150 lets an AI empire hire marauders against a rival; within 1-31 days the target gets Incoming Raid marauder.120 (if in contact) or 123 (if not); a raid paid for through the marauder menu warns its target the same way (marauder.33).

## 剧情脉络 Story outline

- marauder.101 可用能量、矿物或食物纳贡（解除威胁），或拒绝（只得到对方回应）。被列为目标期间，联络该氏族会打开 marauder.102（仍可纳贡）；受雇掠袭期间打开 marauder.112（可问是谁雇了他们）。
  marauder.101 can be paid in energy, minerals or food (ending the threat) or refused (only a spoken reply). While marked as their target, contacting that clan opens marauder.102 (tribute still possible); during a hired raid it opens marauder.112 (ask who paid them).
- 掠袭舰队轰炸使星球荒废度达到15时，星球主人收到“掠袭艇攻击”（104–108之一）；20天后掠袭者带着战利品返航，受害方收到 marauder.111，雇主收到 marauder.122。
  When raiders bombard a planet to 15 devastation, its owner gets Raiders Hit (one of 104-108); 20 days later the raiders head home, the victim gets marauder.111 and the hirer marauder.122.
- 若掠袭舰队被击毁，目标收到 marauder.116，雇主收到 marauder.124；若舰队受损且脱离战斗，每月检查判定放弃掠袭，目标收到 marauder.114，雇主收到 marauder.117。
  If the raiding fleet is destroyed, the target gets marauder.116 and the hirer marauder.124; if it is weakened and out of combat, the monthly check abandons the raid: target 114, hirer 117.

## 分支与结局 Branches and outcomes

三种收场互斥；被掠袭后进入冷却（raid_cooldown），五年内不会再被索贡（recently_raided_or_threatened）。

The three endings are exclusive; afterwards a cooldown applies (raid_cooldown) and no new tribute demand comes for five years (recently_raided_or_threatened).

## 条件与文明差异 Conditions and variants

104/105 随机各半（星球人口不超过100时不会被掠走人口）；机械帝国 106、机仆 107、蜂巢 108。三个氏族的索贡与对话台词不同。

104/105 are 50/50 (no pops taken from planets with 100 pops or fewer); machines get 106, Rogue Servitors 107, hives 108. The three clans have different demand and dialogue lines.

## 审阅记录 Review notes

- 修正：草稿把索贡（event-marauder-100）、掠袭得手（103）、放弃（113）、被毁（115）、受雇来袭（150）分成五个故事；它们共享 raid_ongoing / under_marauder_attack / raid_target_of 标记，属于同一次掠袭的开头与收场，现合并，并按窗口接收方注明视角。
  Correction: the draft split the tribute demand (event-marauder-100), the raid hit (103), abandonment (113), destruction (115) and the hired-raid warning (150) into five stories; they share the raid_ongoing / under_marauder_attack / raid_target_of flags as the start and end of one raid, so they are merged, with each window's recipient noted.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
- 不确定之处：拒绝纳贡后掠袭舰队何时出动由脚本外的掠夺者行为决定，此处只能说明“仍是掠袭目标”。
  Open questions: When a raiding fleet actually launches after a refusal is decided outside these events; we only state that the empire remains a raid target.
