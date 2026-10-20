# 晨间打卡缺席 / Missed The Morning Check-in（静滞监狱 · Stasis Prison）

- 分类 Category：文明纪事 Society (C7) · 殖民地事件链 colony event chain

## 如何开始 How it starts

殖民地满五年时（`on_colony_5_years_old`），随机池以权重 3 抽中 colony.9900（注释 “Dimensional Prison”）。要求：人口超过 400（脚本单位）、本身不是卫星但有卫星、非人造星球、非母星/非首都的非 AI 殖民地；全银河一次（`dimensional_prison_colony`）。

At the fifth anniversary (weight 3) on a large, non-artificial colony that has a moon; once per galaxy.

## 剧情脉络 Story outline

1. **晨间打卡缺席（9900）**：大量殖民者失踪（立即一人消失）。花 500 能量植入追踪器（“安心追踪”修正）→ 180–360 天后；或“没有必要恐慌”（“集体自我恐惧”修正）→ 360–720 天后——都到达 **扫描成功（9905）**（正文按先前选择不同）。
2. 项目 **粒子谜题**（科研船+科学家，180 天）→ **待机模式（9910）**：失踪者在卫星上的静滞监狱里 → 60–120 天 → **逃离卫星（9915）**：监狱里还关着大批外星囚犯。
3. 处置方式见下。

## 分支与结局 Branches and outcomes

- 留作监狱：获得静滞监狱矿藏，结束。/ Keep the prison: a stasis prison deposit.
- 释放（非格式塔）→ 60–120 天后随机：**坏邻居（9920）** 25、**大杂烩（9925）** 50、**好邻居（9930）** 25；亲外帝国坏 −15/好 +15，排外相反。/ Release them: random Bad/Mixed/Good 25/50/25, ±15 by xenophile/xenophobe.
- 逐步释放（和平主义、平等主义或警察国家）：融合矿藏，新物种人口，结束。/ Gradual release: integration deposit and new pops.
- 吞噬虫群：把他们当作“预包装餐食”，结束。/ Devouring Swarm: pre-packaged meals.

## 条件与文明差异 Conditions and variants

见上：释放需非格式塔；逐步释放与“餐食”按理念/公民性显示。/ See above.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-12（c7b-society）
- 来源 Sources：`events/colony_events_3.txt:9073–9540` · `common/special_projects/00_projects_3.txt:1787–1806` · `common/on_actions/00_on_actions.txt:3882`
已核对 9900–9930 全部脚本、项目与随机池；编译草稿正确；标注三个随机结局与 9915 的四种处置。/ Draft correct; endings and the four choices annotated.
