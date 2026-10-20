# 巨兽之怒 / Behemoth Fury

- 分类 Category：天灾（玩家天灾路线）Crisis (player crisis path) · DLC: 生物起源 BioGenesis

## 如何开始 How it starts

选择“巨兽之怒”飞升天赋后进入该天灾路线；第一级开启“巨兽天灾”事件链，3天后收到“第一级：胚胎实验”（biocrisis.50）。天灾货币为“野性洞见”。
Choosing the "Behemoth Fury" ascension perk enters this crisis path; level 1 opens the "Behemoth Crisis" event chain, and 3 days later "Level 1: Embryo Experiment" (biocrisis.50) arrives. The crisis currency is "Wild Insight".

## 剧情脉络 Story outline

1. **五个等级**：二级要求建成巨兽之卵（2000）；三级要求巨兽孵化（6000），开启项目“脑联试验”→“突触交响”；四级要求该项目完成（18000），开启“心灵融合”项目（→“与兽合一”）与变异项目（→ 280 选择变异）；五级要求项目四完成、45000、非附庸。
   **Five levels**: level 2 requires a completed Behemoth Egg (2000); level 3 requires a Behemoth hatching (6000), opening the project "Mind-Link Trial" -> "Synaptic Symphony"; level 4 requires that project completed (18000), opening the "Psychic Fusion" project (-> "One with the Beast") and a mutation project (-> 280, choose a mutation); level 5 requires project four completed, 45000, and not being a vassal.
2. **成长期支线**：首次在茧中孵出巨兽（130）；孵出的巨兽若被非巨兽帝国击瘫会死去，你获得洞见（105；击杀者若为复生者帝国则见 520）。
   **Growth-phase side branch**: the first Behemoth hatched in a cocoon (130); if a hatched Behemoth is crippled by a non-Behemoth empire it dies and you gain insight (105; if the killer is a Resurrected empire, see 520).
3. **第五级**：共同体被迫宣告你为星系危机（星海天罚档案 4105）；其他五级巨兽帝国与其余帝国分别收到 185/187。选择开启局势“成长之痛”：各阶段选择变异（210–245）；第二阶段召来虚空之子（150；若有策展人，非巨兽玩家收到其警告 155；它闯入未获警告者领土时另有 162）；击杀虚空之子者得到遗珍（180），其他人收到 175。局势完成得到“直接控制”（250）。
   **Level 5**: the Community is forced to declare you a galactic crisis (Stellar Retribution archive 4105); other level-5 Behemoth empires and the remaining empires receive 185/187 respectively. Choosing to open the situation "Growing Pains": each stage offers a mutation choice (210–245); the second stage summons a Void Spawn (150; if a Curator exists, non-Behemoth players receive its warning, 155; if it breaks into the territory of those who received no warning, 162 also applies); whoever kills the Void Spawn gets a relic (180), and others receive 175. Completing the situation grants "Direct Control" (250).
4. **结局**：当没有其他五级巨兽帝国、虚空之子也已不在时，年度检查给出“顶点虚空形态”（190）：立即完成转化（30天后）或先进行转化项目，均到“巨兽胜利”（191）——留下肆虐、离开银河，或在得知“猎手”后前去对抗（其他玩家720天后收到“吞噬殆尽”196 → 项目 → 197）。其他玩家在 190 后1天收到警告（192）。
   **Ending**: when no other level-5 Behemoth empire exists and the Void Spawn is also gone, the annual check gives "Apex Void Form" (190): either complete the transformation immediately (30 days later) or run the transformation project first; both lead to "Behemoth Victory" (191) — either leave the galaxy ravaged and depart, or, after learning of the "Hunter", go to confront it (other players receive "Consumed Entirely" 196 after 720 days -> project -> 197). Other players receive a warning (192) one day after 190.
5. **失败**：心灵连接的四级巨兽被摧毁，帝国随之覆灭（265）。
   **Failure**: if the level-4 Behemoth in the psychic link is destroyed, the empire falls with it (265).

## 分支与结局 Branches and outcomes

- 胜利：191（`win = yes`）；失败：265。
  Victory: 191 (`win = yes`); failure: 265.
- 互斥：185/187（收件方是否也是五级巨兽）；180/175（击杀者与其他人）。
  Mutually exclusive: 185/187 (whether the recipient is also a level-5 Behemoth); 180/175 (the killer versus everyone else).

## 条件与文明差异 Conditions and variants

- 191 的“前去对抗”选项需要先在索林原虫天灾中通过外交得知“猎手”（learned_about_redacted）。
  The "go confront it" option in 191 requires first learning of the "Hunter" through diplomacy in the Prethoryn crisis (learned_about_redacted).
- 第五级天赋“心灵融合”反过来让该帝国能读懂索林原虫的讯息（can_talk_to_prethoryn）。
  Conversely, the level-5 perk "Psychic Fusion" lets the empire read Prethoryn messages (can_talk_to_prethoryn).
- 197 的回应按宇宙创生天赋或索林原虫虫后遗珍变化。
  The response in 197 varies with the Cosmogenesis perk or the Prethoryn Queen relic.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-12 (c5b-crisis)
- 来源 Sources：`events/biogenesis_crisis_events.txt`, `common/crisis_levels/00_crisis_levels.txt:533-705`, `common/situations/12_biogenesis_situations.txt:811-950`, `common/special_projects/05_projects_biogenesis.txt`
- 审阅者导读（评注），不是游戏原文。 / Reviewer commentary, not game text.
- 已核对 Checked: biogenesis_crisis_events.txt 全部可见事件；等级条件与 on_unlock（00_crisis_levels.txt:533-705）；局势阶段（12_biogenesis_situations.txt:811-950）；虚空之子 on_action（00_on_actions.txt:1070, 1439-1440）；年度检查（00_on_actions.txt:424）。
- 更正 Corrections: 原树只有各等级作为“次要入口”；现按等级条件串成主线，补局势后的胜利检查、虚空之子分支、失败结局；把独立的“巨兽天灾”事件链小故事（chain-behemoth-crisis-chain）并入本族；标出 185/187、175、192、196 是发给其他玩家的通报。
- 不确定 Uncertain: 局势阶段进度数值未建模；巨兽之卵与茧的建造条件未逐一重读。
- 覆盖范围 Coverage: 42 篇，全部审阅。
</content>
