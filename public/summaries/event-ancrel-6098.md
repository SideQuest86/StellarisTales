# 隐形场现形 / Chameleon Field Exposed

- 分类 Category：先驱者与考古 Precursors · DLC：《远古遗物》Ancient Relics

## 如何开始 How it starts

这是一个每银河一次的事件：隐藏事件 ancrel.6098 每年一次（on_yearly_pulse，common/on_actions/00_on_actions.txt:246）检查：中期游戏已过20年、拥有《远古遗物》、尚无 zarqlan_spawned、且银河里有一个带 fallen_empire_2 标志的堕落帝国（唯心主义堕落帝国）与某个非AI国家建立了通信。首次通过时按75/25决定由玩家（player_gets_zarqlan）还是AI（ai_gets_zarqlan）得到这个遗迹；之后每年有5/105的机会生成：设置 zarqlan_spawned，向一个与该堕落帝国通信的玩家（或AI）发出 ancrel.6099，延迟1–350天。ancrel.6099 在其领土内选一颗没有遗址的熔岩、荒芜、寒冷荒芜或冰冻星球，让一次碰巧的小行星撞击露出“隐形场”后的古墓，选项创建遗址 site_zarqlan（权重0）。

This happens once per galaxy. Hidden ancrel.6098 runs every year (on_yearly_pulse, common/on_actions/00_on_actions.txt:246) and needs: 20 mid-game years passed, Ancient Relics, no zarqlan_spawned, and a Fallen Empire with the flag fallen_empire_2 (the spiritualist one) in contact with a non-AI empire. The first pass rolls 75/25 whether a player (player_gets_zarqlan) or an AI (ai_gets_zarqlan) gets the tomb; each year thereafter there is a 5 in 105 chance to spawn it: zarqlan_spawned is set and the chosen player (or AI) in contact with that Fallen Empire gets ancrel.6099 after 1-350 days. ancrel.6099 picks a molten, barren, cold barren or frozen planet inside borders without a site; the option creates the site site_zarqlan (weight 0).

## 剧情脉络 Story outline

遗址“古墓”（site_zarqlan）共六个阶段，每阶段在墓室门上刻着先知扎克兰（Zarqlan）的自述：6100 陵墓 → 6105 前厅（设置 zarqlan_language_translated：“我是扎克兰，莫兹-塔尔布的守护者，兹瓦的先知，击败了切塔纳的人……”）→ 6110 进院 → 6115 中堂 → 6120 后室 → 6125 尾室。每个阶段都给文物，最后一间有巨大的王座与一具类人的巨大尸骸。

6125 的选项（演化猎手有“即使是亵渎也要基因”选项）都得到遗珍“先知之首”（r_severed_head）、大型文物，并在1天内触发 ancrel.6130“信号传输接入”：唯心主义堕落帝国得知你找到了扎克兰之墓，赋予修正“扎克兰选民”。

之后可以随时激活遗珍（见分支）。

The "Ancient Tomb" site (site_zarqlan) has six stages with the Prophet Zarqlan's own words on each door: 6100 The Mausoleum -> 6105 The First Chamber (sets zarqlan_language_translated: "I am ZARQLAN, the Guardian of MOZ-TARB, the Prophet of ZVA, he who felled CETANA...") -> 6110 -> 6115 -> 6120 -> 6125 The Final Chamber. Every stage gives artifacts; the last room holds a gigantic throne and a humanoid corpse.

Both options at 6125 (Evolutionary Predators have an extra "sacrilege or not, we must have its DNA" option) give the relic "severed head of the Prophet" (r_severed_head) and a large artifact and fire ancrel.6130 "Incoming Transmission": the spiritualist Fallen Empire learns of the find and grants the modifier "Chosen of Zarqlan".

The relic can then be activated at will (see below).

## 分支与结局 Branches and outcomes

- 6132/6133：激活遗珍（常规激活消耗，见 common/relics/relics.txt:507）先由 ancrel.6131 设 zarqlan_fervor，再分派给 6132（堕落帝国信徒舰队，大型舰数量随 zarqlan_fervor）或 6133（朝圣者护航舰队）。 / 6132/6133: activating the relic (normal activation cost, common/relics/relics.txt:507) runs ancrel.6131, which sets zarqlan_fervor and then dispatches to 6132 (a Fallen-Empire-style zealot fleet whose size scales with zarqlan_fervor) or 6133 (a pilgrim escort fleet).
- AI 抽中时，遗址由 AI 国家得到；玩家只在 player_gets_zarqlan 时遇到。 / If the draw gives it to an AI the tomb goes to an AI state; players only meet it under player_gets_zarqlan.

## 条件与文明差异 Conditions and variants

- 6125 与 6130 对演化猎手有额外选项；6132/6133 的舰队按所有者的飞船风格生成。 / 6125 offers an extra Evolutionary-Predator option; the 6132/6133 fleets use the owner's ship set.
- 掷骰失败时使用通用事件池 all_random_events（见“考古遗址：发掘意外”）。 / Failed rolls use the generic pool all_random_events (see "Archaeological Sites: excavation incidents").

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/ancient_relics_arcsite_events_2.txt:605–687（ancrel.6098/6099）、760–940（遗址与6130）、1015–1119（6131–6133）；common/archaeological_site_types/02_ancient_relics_arc_sites.txt:164；common/relics/relics.txt:507、623；common/on_actions/00_on_actions.txt:246
- 已核对：ancrel.6098、6099、6100–6130、6131–6133 的脚本、遗址定义、遗珍定义与 on_yearly_pulse 调用点；中英文正文已读。
- Checked: the scripts of ancrel.6098, 6099, 6100-6130 and 6131-6133, the site and relic definitions and the on_yearly_pulse call site; both languages read.
- 修正：原先“扎克兰的信徒”（6131–6133，遗珍激活）是一个孤立的小故事；现作为本故事的尾声并入。
- Fix: The relic-activation events (6131-6133) were a separate one-card story; they are now the epilogue of this story.
- 不确定：“扎克兰选民”（chosen_of_zarqlan）修正的具体数值未在脚本里展开阅读。
- Uncertain: The numeric effect of the modifier chosen_of_zarqlan was not read out.
