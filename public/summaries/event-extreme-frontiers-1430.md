# 新布拉图雅 / New Bratulla

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany · DLC：Extreme Frontiers · 来源 Sources：`events/extreme_frontiers_events.txt:4262-4520`、`common/on_actions/00_on_actions.txt:1175`、`common/scripted_effects/extreme_frontiers_scripted_effects.txt:237-265` · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

这是“德纳斯编年史”遗址线（site-site-chronicles-of-dendrus，c2-precursors 负责）之后的一幕：编年史项目完成后，退化的超空间航道被修复，spawn_new_bratulla_system（extreme_frontiers_scripted_effects.txt:237）生成新布拉图雅星系并给行星设置 new_bratulla 旗标。勘测该行星时（on_survey_planet，common/on_actions/00_on_actions.txt:1175）触发 extreme_frontiers.1430。

This is the scene after the Chronicles of Dendrus site story (site-site-chronicles-of-dendrus, owned by c2-precursors): once the chronicles project is done and the degraded hyperlane restored, spawn_new_bratulla_system (extreme_frontiers_scripted_effects.txt:237) creates the New Bratulla system and flags the planet new_bratulla. Surveying it (on_survey_planet, common/on_actions/00_on_actions.txt:1175) fires extreme_frontiers.1430.

## 剧情脉络 Story outline

1430“新布拉图雅”（4262-4380）：发现编年史中记载的植物世界；选项a（非杀戮型、已有基因调整/表观遗传触发科技、食物≥500）：花费500食物，获得社会科研月度加成，1天后发出 1435“附庸提议”复活德纳斯人；选项b（“这个世界很适合我们”，4343-4380）只给社会科研月度加成并结束事件链，不复活德纳斯人。1435 创建德纳斯人国家，有三个选项：接受其成为附庸（影响力月度加成）、直接接管（把该国家交给玩家）、仅取其知识（按已赠予的生物科技数给科研加成并赠送科技），都结束“德纳斯编年史”事件链。

1430 "New Bratulla" (4262-4380): the botanical world described in the chronicles is found. Option a (non-homicidal, Gene Tailoring or Epigenetic Triggers, 500 food) spends 500 food, gives a monthly society-research bonus and 1 day later sends 1435 "Vassalage Offer" which revives the Dendritians. Option b ("This world is perfect for us", 4343-4380) only gives the society-research bonus and ends the event chain without reviving them. 1435 creates the Dendritian country and offers three options: accept them as vassals (monthly influence bonus), take them over directly (the country is handed to the player) or take only their knowledge (research bonus scaled by the biotechs already given, plus technologies); all end the "Chronicles of Dendrus" chain.

## 分支与结局 Branches and outcomes

1430 的选项a与b互斥；只有选项a通向 1435；1435 的三个选项互斥。

Options a and b of 1430 are exclusive; only a leads to 1435; the three options of 1435 are exclusive.

## 条件与文明差异 Conditions and variants

正文依是否光合物种、是否杀戮型、是否有基因科技而变；1435 会按已存在的星球肖像选择 pla11 / pla15 / pla9。

1430 text varies by phototrophic species, homicidal status and gene tech; 1435 picks portrait pla11 / pla15 / pla9 depending on which already exist.

## 审阅记录 Review notes

- 已对照游戏文件核对入口、触发、选项与结果；行号均为游戏文件的真实行号。
  Entry, trigger, options and outcomes were checked against the game files; line numbers are real game-file lines.
- 未确定 Open: New Bratulla is spawned at the end of the Chronicles of Dendrus site story (site-site-chronicles-of-dendrus, c2-precursors).
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
