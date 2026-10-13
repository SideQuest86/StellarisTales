# 毒圣骑士 / Knights of the Toxic God

- 分类 Category：起源 Origins · DLC：Toxoids · 审阅 Reviewed 2026-10-13
- 来源 Sources：`events/toxoids_events.txt:572-3890`、`common/situations/01_toxoid_situations.txt:190-365`、`common/on_actions/00_on_actions.txt`

> 本导读是审阅者的说明文字，不是游戏原文。 This guide is reviewer commentary, not game text.

## 如何开始 How it starts

开局隐藏事件 toxoids.7000 启动局势“毒圣试炼”，并在首都附近把一颗星球改为熔岩世界（带合金与能量矿藏）。
At game start hidden toxoids.7000 starts the *Quest for the Toxic God* situation and turns a nearby planet into a molten world with alloy and energy deposits.

## 剧情脉络 Story outline

1. **局势与七段骑士传说**：进度0–1000分8个阶段，每月基础+0.4；进入阶段2–8依次开启骑士传说：被放逐的骑士（7006）、二人同行（7025）、神圣访客（7050）、挑战者（7080）、守门人（7110）、妖精的指引（7145）、林中女巫（7195）。
   **The situation and seven tales**: eight stages; entering stages 2-8 opens the tales: banished knight (7006), two knights (7025), the Holy Visitor (7050), the Challenger (7080), the Gatekeeper (7110), Guidance of the Fey (7145), the Witch of the Woods (7195).
2. **终章**：进度满 → 7250 → 7255 传奇骑士归来 → 7260–7290 与骑士交谈（三个话题都问过后才可询问毒圣）→ 7295 对决骗术师 → 7300 → 7305 打开通往封印星系的航道（销毁局势，开启事件链）。
   **Finale**: progress full -> 7250 -> 7255 a legend returns -> 7260-7290 talks (all three topics before asking about the god) -> 7295 the Trickster -> 7300 -> 7305 the hyperlane opens (situation destroyed, event chain starts).
3. **毒圣星系**：骑士团舰队到达 → 7310（毒圣仍在）或 7312（毒圣已不在）；击败毒圣 → 7315：驯服（900天后 7320 解散骑士团）或终结（遗物 7510，6000±1500 天后 8020）。7312 后 8020 在 6000±1500 天后到来。
   **The Toxic God system**: a knights fleet arrives -> 7310 (entity present) or 7312 (gone); defeating it -> 7315: tame (7320 after 900 days) or finish (relic 7510; 8020 after 6000±1500 days). After 7312, 8020 follows 6000±1500 days later.

## 分支与结局 Branches and outcomes

- 7007/7009 两条分支各 50%；7095 的选择决定 7300 中是黑骑士得救还是传奇骑士身亡。 7007/7009 are 50/50; 7095's choice decides the outcome of 7300.
- 其他帝国进入星系为 7311，击毁毒圣得 7515（遗物）。 Other empires: 7311, relic 7515.
- 要塞失守/被毁/夺回：8015 / 8017 / 8025；方舟起源在故乡定居 8030。 Keep lost / destroyed / retaken: 8015 / 8017 / 8025; arkship settling 8030.
- 满100年的“百年试炼”8010、每月随机的 8000/8005。 The Hundred Years Quest 8010; monthly random 8000/8005.

## 条件与文明差异 Conditions and variants

游牧（方舟）形态下有专属选项与解毒机制（8100–8110 隐藏事件）。 Nomadic (arkship) empires get their own options and the detox mechanic (hidden 8100-8110).

## 审阅记录 Review notes

- 已核对 Checked：局势全部阶段、7000–8110 事件、on_action 钩子。 All situation stages, events 7000-8110 and on_action hooks.
- 更正 Corrections：封印星系三种入口与击败毒圣的连接（原先为孤立入口）；要塞线入口加标签。 The three sealed-system entries and the defeat links (previously floating entries); keep entries labelled.
- 不确定 Uncertain：中段传说（7055–7225）的选项细节取自编译树。 Option details of the middle tales are taken from the compiled tree.
