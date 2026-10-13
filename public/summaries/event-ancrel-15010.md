# 林冠传信 / Message in the Canopy

- 分类 Category：先驱者与考古 Precursors · 来源 Sources：events/ancient_relics_arcsite_events_2.txt:10357–10650（ancrel.15010、15000–15008）；common/archaeological_site_types/00_base_game_arc_sites.txt:251；common/scripted_effects/archaeology_event_effects.txt:1075；common/on_actions/00_on_actions.txt:3780 · DLC：《远古遗物》Ancient Relics · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

殖民地满两年（on_colony_2_years_old，common/on_actions/00_on_actions.txt:3780，随机权重3/958）时，ancrel.15010 对玩家拥有的、非母星、非首都、有人口且无遗址的热带、盖亚或大陆星球触发；全银河只有一次（全局标志 arc_transformation）。

When a colony turns two years old (on_colony_2_years_old, common/on_actions/00_on_actions.txt:3780, random weight 3 of 958), ancrel.15010 fires for a player-owned, non-capital, populated, site-free tropical, gaia or continental planet; only once per galaxy (global flag arc_transformation).

## 剧情脉络 Story outline

选项“好奇”创建遗址 site_transformation_dig（四个阶段）：15000 欢迎来到丛林（社会学研究）→ 15001 灵能质变（星球曾是另一种气候，物理学研究）→ 15002 洞穴（稀有文物+10、矿物+200）→ 15003 石笋支柱（文物与合金；两种做法）。

15003：a “小心行事” → 15005“造化面具”（修正 mask_of_transformation）；b “必须查明这股力量的来源” → 15004“支离破碎！”（矿物+1000、稀有水晶+200）。两者都在30天（±20）后出现。

The option "Curious" creates the site site_transformation_dig (four stages): 15000 Welcome to the Jungle (society research) -> 15001 Psionic Metamorphosis (the planet once had another climate; physics research) -> 15002 The Cave (minor artifacts +10, minerals +200) -> 15003 The Pillar (artifacts and alloys; two approaches).

15003: a "Proceed with caution" -> 15005 "The Mask of Transformation" (modifier mask_of_transformation); b "We must uncover the source of this power" -> 15004 "Shattered!" (minerals +1000, rare crystals +200). Either appears 30 days (+-20) later.

## 分支与结局 Branches and outcomes

- 失败事件：15006 林间偷袭（领袖获得“固执”）、15007 失物招领、15008 灌木派对（均权重10）。 / Failure events: 15006 Bushwhacked (the leader gains Stubborn), 15007 Lost and Found, 15008 Bush Party (weight 10 each).

## 条件与文明差异 Conditions and variants

- 无。 / None.

## 审阅记录 Review notes

- 已核对：ancrel.15010、15000–15008 的脚本，遗址定义 site_transformation_dig 与专属池 site_transformation_random_events（只含15006–15008），on_colony_2_years_old 的权重行；中英文正文已读。
- Checked: the scripts of ancrel.15010 and 15000-15008, the site definition site_transformation_dig with its own pool site_transformation_random_events (15006-15008 only) and the weight line in on_colony_2_years_old; both languages read.
- 不确定：遗址定义位于基础游戏文件，但触发事件在远古遗物文件中，具体 DLC 限制只有 15010 本身未检查 has_ancrel。
- Uncertain: The site definition is in the base-game file while the trigger event sits in the Ancient Relics file; ancrel.15010 itself does not check has_ancrel.
