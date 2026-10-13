# 谜题一角，转瞬即逝（被解体的云团）/ Pieces of an Ephemeral Puzzle (The Dismembered Cloud)
- 分类 Category: society (federation joint operation) · 来源 Sources: events/federations_events_3.txt:786-1312; common/special_projects/00_projects_federations.txt:421-462; common/on_actions/00_on_actions.txt:1903 · DLC: Federations · 审阅 Reviewed 2026-10-13 (r2-society)

## 如何开始 How it starts
- 中文：隐藏飞船事件 `federations3.2000`：建成研究站时由 `on_building_research_station` 以 5/105 权重抽到，或由荒原飞地 `enclave.4150` 触发。要求：联邦类型为默认或研究型；联邦尚未完成、近期（7200天内）也没有进行过本事件；至少一名成员不在战争中且有 `tech_sensors_2`；没有成员正处于该事件链。触发后该飞船所属国成为协调国，给每个成员随机一种颜色标记（只影响2010的正文），在每个成员首都生成云团，并向每个成员发出 **2001**。
- English: The hidden ship event `federations3.2000` is drawn from `on_building_research_station` (5/105) or fired by `enclave.4150`. It needs a default or research federation with no completed or recent (7200-day) run, a member not at war with `tech_sensors_2`, and nobody already on the chain. The owner of the ship becomes the coordinator; every member gets a random colour flag (only changes 2010's text), a cloud appears at each capital and **2001** is sent to every member.

## 剧情脉络 Story outline
1. **2001 谜题一角，转瞬即逝**（每个成员各自一次）：选“很迷人”开始事件链“云团簇聚”并启用特殊项目 `DISMEMBERED_CLOUD_PROJECT`（成本200，限时1080天，需要科学家和科学船；位于首都恒星基地或首都星系），协调国的队伍计数+1；选“我们没有时间”则不参与。 / Each member sees 2001 once: 'Fascinating' begins the chain 'Flocks of Cloud', enables the project (cost 200, 1080 days, scientist and science ship needed) and adds one to the team count; 'No time' opts out.
2. **项目**：成功 → 2010；失败 → 隐藏 2011（计入失败数）；取消/退出联邦 → 隐藏 2012（队伍数-1）。 / Project: success -> 2010; failure -> hidden 2011; cancel or leaving the federation -> hidden 2012.
3. **2010 特殊项目完成**（个人）：“放它自由”使“已修复”计数+1，并在360/719天后清除风暴；“把它留在这儿”不加计数、云团变为风暴。 / 2010: 'Set it free' adds to the fixed counter; 'Keep it here' does not.
4. **协调检查**：每次完成/失败/退出后1天内检查 2013——完成数加失败数达到队伍数时设置联邦标记并进入 2014。 / After each result a hidden check (2013) waits until finished + failed >= team size, then 2014 chooses the finale.
5. **结局**（10天后发给全体成员）：全部成员都选“放它自由” → **2015 完美**（联邦+30凝聚力，3600天“联合云团恩惠”）；没有任何人选 → **2017 未重组**（+20凝聚力，首都获得1440天的负面修正）；其余 → **2016 部分重组**（2160天临时恩惠）。三个窗口都会结束事件链。 / Finale, 10 days later: everyone freed it -> 2015 perfect; nobody -> 2017 non-reassembly; otherwise 2016 partial. All end the event chain.

## 分支与结局 Branches and outcomes
- 三个结局互斥（见上）。个人选择只影响计数；失败或退出的成员不计为“修复”。 / The three finales are exclusive; failed or withdrawn members do not count as fixed.

## 条件与文明差异 Conditions and variants
- 2010 正文有十种颜色变体（红、黄、绿、蓝、靛、粉、灰、橙、棕、青）；AI 的选择按人格加权。 / 2010's text has ten colour variants; AI choices are weighted by personality.

## 审阅记录 Review notes
- 已核对 Checked: hidden 2000, 2001, project definition, 2010-2017, 2020 in federations_events_3.txt; on_actions and enclave callers.
- 更正 Corrections: story had no recorded entry; the real entry (2000) and its conditions are documented in a note. Finale events are marked as an exclusive group and given endings.
- 不确定 Uncertain: 2000's ship owner as coordinator follows the script (discloud_coordinator = owner); other federation types are excluded by 2000's trigger.
