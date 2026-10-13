# 艾克萨凯德斯 / Exakeides

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / Galactic miscellany
- 来源 Sources：`events/paragon_events_3.txt:1713-3000`; `common/event_chains/00_event_chains_paragon.txt:11`; `common/solar_system_initializers/paragon_initializers.txt:466,796`; `common/on_actions/00_on_actions.txt:935,960-962,1670`; `common/special_projects/01_projects_paragon.txt`
- DLC：Galactic Paragons
- 审阅 Reviewed：2026-10-13（已审阅 reviewed）

## 如何开始 How it starts

银河生成时某个系统被标记为 legendary_leader_spawn_system；任一舰队首次进入该系统、且尚无人找到冷冻舱时，触发舰队事件 paragon.3100“求救信号”（on_entering_system_first_time）。

At galaxy generation one system is flagged legendary_leader_spawn_system; the first fleet to enter it while nobody has found the cryostasis capsule triggers the ship event paragon.3100 "Distress Signal" (on_entering_system_first_time).

## 剧情脉络 Story outline

3100：微弱信号，可定位或无视 → 专项“求救信号来源”→ 3104：古老逃生舱，里面是外星幼儿 → 专项“冷冻复苏”→ 3105：复苏成功，可收养、不管或吃掉 → 遗物碎片专项（3110）；收养后10年 3114 成长（按帝国伦理选择教导）、再10年 3115 长大成人 → 3116 招募或忽略凯德斯 → 60–120天后 3117 遗物幻视，开启事件链“遗物幻视”。之后带着凯德斯去三处地点（火山行星 3120、舰船坟场 3130、丛林行星 3125，次序不限），每处完成专项并看到幻视；三处完成后 3135 复原遗物 → 专项 → 3140 → 3141 在终点星系与本国附近各生成虫洞。进入终点系统 3144：自动无人机舰队，三种对策：电磁脉冲（3145→专项→3148）、交出钥匙（3146→3147，失去遗物）、武力击毁（3149）。终点星球的考古遗址见 C2 的故事。

3100: a faint signal — try to locate it or ignore it → project "Source of the Distress Signal" → 3104: an ancient escape pod with an alien child → project "Cryo Resuscitation" → 3105: the child lives; adopt, ignore or eat him → relic-fragment project (3110); if adopted, 3114 growth at 10 (upbringing by empire ethic) and 3115 adulthood 10 years later → 3116 recruit or ignore Keides → 3117 relic visions 60–120 days later, starting the event chain "Relic Visions". Then take Keides to three sites (volcanic planet 3120, ship graveyard 3130, jungle planet 3125, any order), each with a project and a vision; after all three, 3135 restores the relic → project → 3140 → 3141 spawns wormholes in the final system and near the empire. Entering the final system, 3144: an automated drone fleet with three answers: an electromagnetic pulse (3145 → project → 3148), hand over the Key (3146 → 3147, relic lost) or destroy them (3149). The planet's archaeological site is in the C2 story.

## 分支与结局 Branches and outcomes

三个互相替代的结局对付无人机（见上）；招募或忽略凯德斯（3116）；收养、不管或吃掉幼儿（3105，后两者没有后续的长大与招募）。

Three alternative answers to the drones (above); recruit or ignore Keides (3116); adopt, ignore or eat the child (3105 — the last two end the growth and recruitment line).

## 条件与文明差异 Conditions and variants

3114 的教导选项依帝国伦理出现（亲外/排外/和平/军国/平等/威权/灵性/唯物）；3105 的“收养”不对嗜杀和集群开放，“吃掉”只对吞噬蜂群或“进化掠食者”起源（且不尊重他者）开放，所有选项都会给予遗物碎片 r_wormhole_key_fragment_1。

The upbringing options of 3114 depend on empire ethics (xenophile/xenophobe/pacifist/militarist/egalitarian/authoritarian/spiritualist/materialist); in 3105 "adopt" is closed to homicidal and gestalt empires, "eat" is open only to Devouring Swarm or Evolutionary Predators (not valuing others), and every option grants the relic fragment r_wormhole_key_fragment_1.

## 审阅记录 Review notes

核对了 events/paragon_events_3.txt:1713-3000 全部事件、专项、事件链定义（common/event_chains/00_event_chains_paragon.txt:11）和 common/solar_system_initializers/paragon_initializers.txt:466,796。原先的6张卡（3100、3120、3125、3130、3144、3149）并为一条故事，三处幻视地点共用的 3135→3141 合为一条路径。

Checked all events, projects and the event-chain definition (common/event_chains/00_event_chains_paragon.txt:11) in events/paragon_events_3.txt:1713-3000 and the initializers (common/solar_system_initializers/paragon_initializers.txt:466,796). The former six cards (3100, 3120, 3125, 3130, 3144, 3149) are merged into one story; the shared 3135→3141 tail of the three vision sites is now a single path.
