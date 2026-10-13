# 哈宾特统一星球国 / Habinte Unified Worlds

- 分类 Category：文明纪事 Society (C7) · 审阅 Reviewed 2026-10-13
- 来源 Sources：`events/first_contact_dlc_events.txt:6658-7560`；`common/on_actions/00_on_actions.txt:474,801,1050-1053,1163,1956,2174,2616`；`common/anomalies/02_anomaly_categories.txt:713`

## 如何开始 How it starts

- 哈宾特统一星球国是一个被“偷走行星”的前超光速太阳朋克文明。玩家舰队进入其边境系统（solarpunk_system_01）时按当前是否已揭示触发 5000 或 5005；进入母星系（solarpunk_system_02）触发 5015。
  The Habinte Unified Worlds are a pre-FTL solarpunk civilization whose planets were taken. A fleet entering the border system (solarpunk_system_01) fires 5000 or 5005 depending on whether it is revealed; entering the home system (solarpunk_system_02) fires 5015.

## 剧情脉络 Story outline

- 5000「失踪的轨道」：首次进入边境系统，给系统添加“失踪的行星”异常（7级，只由 5000 添加，每国一次，`first_contact_dlc_events.txt:6661-6698`），之后再进入则出现 5005。
  5000 "Missing Orbitals": first approach to the border system; it adds the level-7 anomaly "The Missing Planets" (added only by 5000, once per empire); later entries show 5005.
- 异常唯一结果 5010「星球大盗」（权重1，`02_anomaly_categories.txt:703-715`）：探查或不探查都给物理研究；全银河首次时生成达恰（solarpunk_02）星系与前超光速的哈宾特国家（6751-6875）。之后舰队进入该星系才触发 5015。
  The anomaly's single outcome 5010 "Grand Theft Planet" (weight 1): either option gives physics research; the first time in the galaxy it spawns the Dacha (solarpunk_02) system and the pre-FTL Habinte country. A fleet entering that system then fires 5015.
- 5015「富饶世界」：首次进入母星系，物理研究奖励；亲生命起源/理想花园政体与灭绝型文明有专属选项。
  5015 "Worlds of Plenty": first entry into the home system, a physics-research reward; Life-Seeded / Idyllic Bloom civics and homicidal civics have exclusive options.
- 5020「哈宾特统一星球国相遇」：勘测其世界；建造观测站后（隐藏5025）60天后 5026「桥接世界」，哈宾特每30天获得觉醒度直到100。
  5020 "Habinte Unified Worlds Encountered": surveying their world; after building an observation station (hidden 5025) 5026 "Bridge Between Worlds" follows 60 days later, and Habinte gain awareness every 30 days up to 100.
- 入侵或轰炸他们（5034/5035）→ 5036「温和种族的愤怒」：他们在5天后升级为真正的帝国并敌视你；之后再进入其星系出现 5040「外交绝无可能」。
  Invading or bombarding them (5034/5035) -> 5036 "Anger of a Gentle Race": they become a real empire five days later and hostile to you; re-entering their system gives 5040 "Diplomacy Was Never an Option".
- 和平线：观测足够久后五年脉冲出现 5050「礼貌的请求」：a 撤出观测站并交换星球（5051），c 拒绝并触发入侵后果。
  Peaceful line: after enough observation the five-year pulse brings 5050 "Polite Request": a withdraws the outposts and swaps a planet (5051), c refuses and triggers the invasion aftermath.

## 分支与结局 Branches and outcomes

- 愤怒线（5036/5040）与礼貌请求线（5050）互斥地收尾；5000 与 5005 互斥。
  The anger line (5036/5040) and the polite-request line (5050) end the story exclusively; 5000 and 5005 are exclusive.

## 条件与文明差异 Conditions and variants

- 5015 的第三个选项只给灭绝型文明（机械终结者/吞噬群/纯化者）；5050.a 需要哈宾特仍是原始文明。
  The third 5015 option is for homicidal civics (Terminator / Devouring Swarm / Purifiers); 5050.a needs Habinte still primitive.

## 审阅记录 Review notes

- 已核对：每个入口的 on_action、星旗标志（system_01/02、revealed、mad）、观测与愤怒链、5050 触发与选项。
  Checked: each entry on_action, the star flags (system_01/02, revealed, mad), the observation and anger chains, 5050 trigger and options.
- 更正：原本是 5000/5005/5015/5020/5034/5040/5050 七个孤立的单窗口故事；现合成一条，用标志衔接。
  Correction: previously seven isolated one-window stories (5000/5005/5015/5020/5034/5040/5050); now one story linked by flags.
- 说明：fircon.5026 原挂在“谁在监视监视者”的故事下，现归入本故事。
  Note: fircon.5026 hung under the "Who Watches the Watchers?" story; it now belongs here.
- 2026-10-13 协调：异常“失踪的行星”及其结果 5010 原是单独的探索故事（anomaly-solarpunk-cat，r2-mixed 审阅），现并入本故事，路线为 5000 → 异常 → 5010 → 5015。
  2026-10-13 coordination: the anomaly "The Missing Planets" and its outcome 5010 were a separate exploration story (anomaly-solarpunk-cat, reviewed by r2-mixed); they are now part of this story, routed 5000 → anomaly → 5010 → 5015.
