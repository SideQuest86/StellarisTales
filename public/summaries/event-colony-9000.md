# 尼玛星球 / Nemma World

- 分类 Category：文明纪事 Society (C7) · 殖民地事件链 colony event chain（首个事件「不稳地面 Unsteady Ground」）

## 如何开始 How it starts

殖民地满两年时（`on_colony_2_years_old`），随机池以权重 8 抽中 colony.9000「不稳地面」。要求：大陆或海洋星球、有人口、非母星/非首都、原主人持有的非 AI 殖民地；整个银河只出现一次（任何国家都没有 `turtle_world_spawned`）；星球没有其他殖民地事件；所有者不是荒野帝国。事件开启“尼玛星球”事件链，并给星球永久的尼玛修正（进化掠食者另加一项）。

On the second anniversary the pool picks *Unsteady Ground* at weight 8 for a continental or ocean colony (populated, non-homeworld, non-capital, original non-AI owner). It happens once per galaxy and only on a planet with no earlier colony event. The event starts the *Nemma World* event chain and gives the planet a permanent Nemma modifier (Evolutionary Predators get an extra one).

## 剧情脉络 Story outline

1. **不稳地面（9000）**：殖民地其实建在巨大的两栖爬行动物尼玛的背上。700–730 天后——/ The colony sits on the backs of giant reptiles; 700–730 days later:
2. **勇敢的发现（9005）**：年轻人在尼玛头上玩闹，惊扰了它们（格式塔帝国是无人机版本）。必须采取行动 → 特殊项目 **研究尼玛**（180 天）；或任其玩闹 → 事件链结束，星球修正改为永久的“不受打扰”版本。/ Youths (or drones) disturb the Nemma. Act → project *Study the Nemma* (180 days); or let it be → the chain ends with a permanent left-alone modifier.
3. **尼玛特遣队（9010）**：四种方案，按国民理念显示：/ Four proposals, shown by ethics:
   - 繁育（非排外、非灭绝主义；机械帝国仅限侍从）→ 项目 **开始尼玛育种计划**（2000）→ **拓展群岛（9015）** → 约 3600–3700 天后 **生命的奇迹（9020）**，进入繁育循环。
   - 奴役（非平等主义、非共情蜂巢；机械帝国仅限同化者）→ 项目 **开始奴役尼玛**（2000）→ **强制服从（9030）**；非格式塔且非威权帝国 1000–1050 天后发生 **尼玛拥抱者（9035）** 抗议：改为繁育（2000–2100 天后回到 9015）或镇压（永久保留奴役，链结束）。
   - 开采（非亲外、非共情、非侍从）→ 项目 **开始尼玛矿业**（2000）→ **挖掘外壳（9040）**，链结束。
   - 宰杀（仅灭绝主义）→ 项目 **宰杀尼玛**（180 天）→ **消灭这些长寿的爬行动物（9045）**：3000 矿物与 3000 食物。
4. **繁育循环 Breeding cycle**：每次“生命的奇迹”增加一只尼玛矿藏。少于 6 只时可继续：约 3600 天后随机为再次成功（权重 2）或 **环境过载（9025）**（权重 1×当前数量）；过载后重试的权重为 3 : 1×数量。达到 6 只后只剩“大家都干得漂亮”，链结束。/ Each success adds a Nemma deposit; below six you may continue (success 2 vs failure 1×count, ~3600 days apart; after a failure 3 vs 1×count). At six only the closing option remains.

## 分支与结局 Branches and outcomes

- 放任不管（9005）、繁育满六只（9020）、镇压抗议（9035）、开采（9040）、宰杀（9045）都会结束事件链。/ Leaving them alone, completing six Nemmas, suppressing the protest, mining and slaughter all end the chain.
- 四种方案互斥；奴役路线可在抗议后改走繁育。/ The four proposals are exclusive; enslavement can turn into breeding after the protest.

## 条件与文明差异 Conditions and variants

- 9000 的选项名对龟类肖像（rep14）物种不同；9005、9020 对格式塔有专门文本。/ Option text differs for the rep14 (turtle) portrait; gestalt texts in 9005/9020.
- 9045 的结束语按吞噬虫群、终结者、进化掠食者变化。/ 9045's closing line varies for Devouring Swarm, Terminators and Evolutionary Predators.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-12（c7b-society）
- 来源 Sources：`events/colony_events_3.txt:3704–4235` · `common/special_projects/00_projects_3.txt:1103–1171` · `common/event_chains/00_event_chains.txt:366` · `common/on_actions/00_on_actions.txt:3768`
- 已核对 Checked：全部事件与五个项目的成本/工期，`random_list` 权重与 `turtle_amount` 计数，事件链 `abort_trigger`（失去该星球时中止）。/ All events, the five projects, weights and the counter; the chain aborts if the planet is lost.
- 审阅改动 Changes：标题改用事件链名称「尼玛星球」；标注两个结局、三条审阅注释；事件链概览卡片仅作说明，不是剧情步骤。/ Title from the event-chain name; endings and notes added; the chain overview card is informational, not a plot step.
- 不确定 Uncertain：编译图不画自循环（9020→9020、9025→9025），已在注释中说明。/ Self-loops are not drawn; described in notes.
