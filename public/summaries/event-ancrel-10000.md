# 奥术解密 / Arcane Deciphering

- 分类 Category：先驱者与考古 Precursors · DLC：《远古遗物》Ancient Relics

## 如何开始 How it starts

稀有文物行动“奥术解密”（artifact_arcane_deciphering，common/artifact_actions/artifact_actions.txt:5）：需要科技 tech_arcane_deciphering，花费500稀有文物，之后有720天冷却（修正 arcane_deciphering_cooldown）。执行时隐藏事件 ancrel.10000 掷骰。

The artifact action "Arcane Deciphering" (artifact_arcane_deciphering, common/artifact_actions/artifact_actions.txt:5): needs the tech tech_arcane_deciphering, costs 500 minor artifacts and then has a 720-day cooldown (modifier arcane_deciphering_cooldown). Running it fires hidden ancrel.10000, which rolls.

## 剧情脉络 Story outline

ancrel.10000 的随机结果（权重30/25/25/20）：10001（30）一次性获得三类研究奖励；10002（25）获得持续1800天的修正“奥术洞见”（arcane_insight，加快研究）；10003（25）意外突破——在工程、物理、社会学中随机一项得到一个科技选项并推进20%（失败则给研究点）；其余20 为隐藏结果：授予一座随机的堕落帝国建筑（grant_random_fe_building，拥有“考古工程师”飞升天赋时权重×2）。

行动还会给玩家设置成就标志 arcana_achievement。

Random results of ancrel.10000 (weights 30/25/25/20): 10001 (30) gives research rewards in all three fields; 10002 (25) grants the 1800-day modifier arcane_insight (faster research); 10003 (25) an unexpected breakthrough — a tech option in a random one of engineering, physics or society with 20% progress (research points as the fallback); the remaining 20 is a hidden result that grants a random Fallen-Empire building (grant_random_fe_building, x2 weight with the Archaeo-Engineers ascension perk).

The action also sets the achievement flag arcana_achievement for players.

## 分支与结局 Branches and outcomes

- 四个结果互斥，由 ancrel.10000 的 random_list 抽取。 / The four results are exclusive, drawn by the random_list of ancrel.10000.

## 条件与文明差异 Conditions and variants

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：common/artifact_actions/artifact_actions.txt:5–58（artifact_arcane_deciphering）；events/ancient_relics_arcsite_events_2.txt:6106–6200（ancrel.10000–10003）
- 编辑备注 Editor note：第四个没有可读文本。 / The fourth result has no readable text.
- 已核对：行动定义与 ancrel.10000–10003 的脚本；中英文正文已读。
- Checked: the action definition and the scripts of ancrel.10000-10003; both languages read.
- 修正：原先 10001/10002/10003 被当成三个互不相关的入口；现标明它们是同一次掷骰的互斥结果。
- Fix: The three results were shown as unrelated entries; they are now marked as exclusive outcomes of one roll.
