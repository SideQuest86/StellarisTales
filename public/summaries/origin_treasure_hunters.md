# 寻宝猎人 / Treasure Hunters

- 分类 Category：起源 Origins · DLC：Grand Archive · 审阅 Reviewed 2026-10-12（V4 源文件复核；沿用并核对 V3 的对话与读法）
- 来源 Sources：`events/origin_events_grand_archive.txt:1964-7434`、`events/grand_archive_events.txt:6273-6669`、`common/special_projects/04_projects_grand_archive.txt:236-719`、`common/situations/11_grand_archive_situations.txt:315-503`、`common/archaeological_site_types/11_grand_archive_arc_sites.txt:2-43`、`common/megastructures/05_gateways.txt:526-623`、`common/megastructures/20_grand_archive.txt:156-159`、`common/relics/grand_archive_relics.txt:897-1035`、`common/on_actions/00_on_actions.txt`

> 本导读是审阅者的说明文字，不是游戏原文；原文见各章节。
> This guide is reviewer commentary, not game text; the original text is in each chapter.

## 如何开始 How it starts

- 起源卡片：文明在母星轨道上找到一枚远古胶囊，里面是加密星图（游牧变体为在未知星系中找到）。开局时 `on_game_start_country` 赠送遗珍《星国图志》初始形态（`grand_archive.2220`，`00_on_actions.txt:61`），并经隐藏事件 7999 在第1天弹出 8000“远古胶囊”（`00_on_actions.txt:64`，`origin_events_grand_archive.txt:2005-2048`）。
- The origin card: the civilisation found an ancient capsule with an encrypted star chart in orbit (nomad variant: in an uncharted system). At game start the empire receives the first stage of the Celestial Chart relic (`grand_archive.2220`) and, through hidden 7999, event 8000 *Ancient Capsule* on day 1.
- 8000 的唯一选项开启事件链与 500 物理研究的“远古胶囊分析”项目；8005（项目完成）生成第一个隐藏星系并升级星图，1 天后 8015 公告。
- 8000's only option opens the event chain and the 500-physics *Ancient Capsule Analysis* project; 8005 (project complete) spawns the first hidden system and upgrades the chart; 8015 announces it one day later.

## 剧情脉络 Story outline

主线由五片星图推进，每一段都要玩家行动（研究、勘察、进入星系、击败舰船），不是自动计时。
The main line follows the five stages of the chart; every step needs a player action (research, survey, entering a system, defeating a ship), not a timer.

1. **荷仁船长（黑针）**：舰船首次进入标记星系 → 8020 遭遇 → 8025 交涉。提问均为对话；问过 e 后才能“结束通讯”，此后 1 天舰队敌对。瘫痪其旗舰（任何帝国皆可）→ 8045。
   **Captain Hoo (Black Needle)**: first entry into the marked system → 8020 → parley 8025 (dialog-only questions; after asking e, *Close communications* makes the fleet hostile a day later). Disabling his flagship (by anyone) → 8045.
2. **碎裂的乙特人母星**：勘察碎裂世界后开放“八块行星”打捞项目（工程船或方舟，180天）→ 8055：胶囊、乙特人遗物与一张字条（字条称被盗巨像意外毁灭了这个前超光速文明）。同一选项开启第二胶囊研究（1000 物理）→ 8060 生成黑针基地星系。
   **The shattered Ytterite homeworld**: survey the shattered world, salvage it (constructor or arkship, 180 days) → 8055: capsule, artefacts and a note (it says a stolen Colossus accidentally destroyed this pre-FTL people). The same option starts the second capsule research (1000 physics) → 8060 reveals the pirate base system.
3. **黑针基地**（勘察基地行星或取得星系 → 8100）：和平主义只能潜入；否则可轰炸或登陆，潜入始终可选。三个项目同属一个选项组（替代关系）。
   **The Black Needle base** (survey the base planet or gain the system → 8100): pacifists may only hack; others may also bombard or land troops; hacking is always offered. The three projects share one option group (alternatives).
   - 潜入（540天，科研船+科学家）：成功 8115 / 失败 8120（科学家阵亡），基础 50/50，受技能、特质、灵能修正；两者都开启“解密星图碎片”，随后 8125 基地被弃（窃取科技）。
     Hack (540 days): success 8115 / failure 8120 (the scientist dies), base 50/50 modified by skill, traits and psionics; both open *Decode Chart Piece*, then 8125 (base abandoned, technology stolen).
   - 轰炸（90天，舰队实力2000）：进度25%时 8103 援军（仅一次）；击毁援军改为1000实力的替代项目；完成 8105 → 5天后 8130 掠夺。
     Bombard (90 days, fleet power 2000): at 25% the reinforcement 8103 (once); destroying them swaps in a 1000-power project; 8105 → 8130 looting after 5 days.
   - 登陆（135天，4艘运兵船）→ 8110 → 5天后 8130。8130 可归还、出售或私留赃物，之后都开启解密项目。
     Land (135 days, 4 transports) → 8110 → 8130 after 5 days; return, sell or keep the loot — every choice opens the decoding project.
4. **斯密吉卜的藏身地**：解密（2000 物理）→ 8135 → 勘察藏身行星或取得星系 → 8200 → 8205 斯密吉卜（自由问答，关闭通讯后 8210）→ 废弃安全屋考古三阶段 8220 → 8225 → 8230（奈斯最后的日志）。
   **Smeegibb's hideout**: decode (2000 physics) → 8135 → survey or gain the system → 8200 → 8205 Smeegibb (free questions; closing leads to 8210) → three-stage dig 8220 → 8225 → 8230 (Ness's last log).
5. **伊那克斯船长**：发掘结束 1 天后若己方舰队在场直接 8241，否则先 8236 通知、舰队返回后 8241 → 8245 交涉 → 关闭通讯后交战，瘫痪其舰 → 8265 → 隐藏胶囊（60天）→ 8270 雕像中的星图 → 最后胶囊（2000 物理）→ 8280 星图完成 → 30天后 8285 指向星门。
   **Captain Inax**: one day after the dig, 8241 at once if a fleet is present, otherwise 8236 first and 8241 when a fleet returns → 8245 parley → fight after closing, disable his ship → 8265 → hidden capsule (60 days) → 8270 → final capsule (2000 physics) → 8280 chart complete → 8285 thirty days later points at a gateway.
6. **虫穴星门**：首次进入星门星系 → 8300，星门虚空虫敌对；击毁它们后三者择一：缺“星门激活”科技 → 8315（研究或项目）→ 8325；有科技但星门未修 → 8325（修复星门720天；游牧则30天激活项目）→ 8400；星门已修 → 直接 8400。
   **The worm-riddled gate**: first entry → 8300; after the voidworms die, one of three: no Gateway Activation → 8315 → 8325; technology but gate unrestored → 8325 (restore, 720 days; nomads a 30-day project) → 8400; gate already restored → 8400.
7. **钴羽与提议**：穿过星门首次进入藏宝星系 → 8405 伏击 → 8410 交涉（a→b→c→d 依次解锁，可随时关闭）→ 8415 提议。
   **Cobalt Quill's offer**: first entry into the treasure system → 8405 → 8410 (a→b→c→d unlock in turn; closing is always possible) → 8415.

## 分支与结局 Branches and outcomes

- **交易结局 8500**：卖出星图，获得能量币与旗舰“针眼”，宝库被标为已被搬空；寻宝在此结束。
  **Deal ending 8500**: sell the chart for energy and the flagship *Eye of the Needle*; the vault is marked plundered and the hunt ends.
- **拒绝 → 8505 破坏局势“黑针破坏分子”**：初始进度25，每月 -0.5；清洗 +4.5、缓解 +2.5。进入第二阶段（100）时若有合格领袖出现 8520 揭露叛徒：处决（按机械/蜂巢/其他分 8526/8527/8528）、再教育（8531/8532/8533）、或交给民众（仅非格式塔，随机 8535 死亡 / 8536 赎罪）。局势三种收场互斥：进度150 → 8550；进度归零 → 8545；局势中击毁黑针主舰队 → 8555（袭击舰队不算）。8550/8545 之后仍须击毁该舰队（“黑针最后的抵抗”）。
  **Refusal → 8505, the sabotage situation**: starts at 25, -0.5 per month; purge +4.5, mitigate +2.5. Entering stage two (100) may show 8520 if an eligible leader exists: execute (8526/8527/8528 by empire type), re-educate (8531/8532/8533) or let the people decide (non-gestalt only, random 8535 death / 8536 atonement). The situation ends one of three exclusive ways: 150 → 8550; zero → 8545; killing the main fleet mid-situation → 8555 (raid fleets do not count). After 8550/8545 the fleet must still be destroyed.
- **宝库**：8560 钴羽落败 → 奈斯宝库项目（30天）→ 8565 → 8570 奈斯船长（c→d→e→f→g 逐级解锁；a 的回答取决于银河中是否有失落帝国）→ 8575 分配：私吞、归还可溯源物品、或全部分发（后两者私掠许可/野蛮掠夺者不可选）→ 30天后 8580 处置奈斯：任用为指挥官、让她训练飞行员（格式塔为吸收其经验）、监禁（→ 1天后 8590）、或打发（→ 1天后 8585）。
  **The hoard**: 8560 → hoard project (30 days) → 8565 → 8570 Captain Ness (c→d→e→f→g unlock in turn; a's answer depends on whether a fallen empire exists) → 8575: keep it, return traceable items, or give it all away (the last two not for Letters of Marque / Barbaric Despoilers) → 30 days later 8580 decides Ness's fate: hire her, let her train pilots (gestalt: absorb her experience), imprison her (→ 8590) or dismiss her (→ 8585).
- **主线结局 8600**：处置奈斯 30 天后，事件链结束。**审判后日谈 8595**：只在监禁路线上，8590 之后 1800–3600 天。
  **Main ending 8600**: thirty days after deciding Ness's fate the chain ends. **Judgment epilogue 8595**: only on the imprisonment route, 1800-3600 days after 8590.
- **可选支线 Optional branches**
  - 展览：8055 后按是否已提出档案馆计划 8075/8076（8075 可付500能量币换科技进度，不付也会开启项目）→ 展览项目（3000 工程）→ 8080 → 研究“星系归档”后开放“建造博物天枢”提示项目 → 建成博物天枢（游牧为方舟模块）→ 8090。
    Exhibition: after 8055, 8075 or 8076 → exhibition project (3000 engineering) → 8080 → after Galactic Archivism a *Construct the Grand Archive* reminder → building the Grand Archive (nomads: arkship module) → 8090.
  - 星图完成后：激活完整星图可建立珍宝馆（5015）；每五年检查一次珍宝藏库（6000 → 6010/6011 → 60天项目 → 6015）。两者中首先发生的一次在5天后带来 8290“初涉珍宝”（需 Galactic Paragons）。
    After the chart is complete: activating it founds a Treasure Vault (5015); every five years a trove may appear (6000 → 6010/6011 → 60-day project → 6015). Whichever comes first leads 5 days later to 8290 (Galactic Paragons).
  - 虚空虫遗骸：击毁星门虚空虫时同时出现遗骸项目（30天）→ 8310；若尚未与虚空虫联络，接通用的首次接触末段 2006。
    Voidworm carcass: killing the gateway voidworms also leaves a 30-day carcass project → 8310; if the voidworms were never contacted, the generic first-contact final stage 2006 follows.

## 条件与文明差异 Conditions and variants

- 私掠许可（Letters of Marque）帝国有专用选项文字；格式塔、机械、蜂巢在 8015、8205、8236、8265、8410、8520、8580 等处有不同正文或回答。
  Letters of Marque empires get their own option texts; gestalt, machine and hive empires get different texts or answers in 8015, 8205, 8236, 8265, 8410, 8520, 8580 and others.
- 8200、8245 的开场随此前选择变化：8025 中问过 b/c，8200 多一句提到奈斯；8245 按基地被掠夺（8130）或被窃取科技（8125）显示不同开场。
  8200 and 8245 depend on earlier choices: asking b/c in 8025 adds a line about Ness to 8200; 8245 opens differently after the base was looted (8130) or hacked (8125).
- 共享内容只作链接 Shared content is linked, not merged：通用“虚空虫行为”局势与“虚空虫疫”（8310 可能创建虚空虫国家而启动它）为独立故事；海盗出现事件 pirate.1/2 中的寻宝猎人专用文字属于通用海盗故事。
  The generic Voidworms Behavior situation and the voidworm plague (8310 may start it by creating the voidworm country) are a separate story; the Treasure Hunters lines in the pirate events pirate.1/2 belong to the generic piracy story.

## 审阅记录 Review notes

- 已核对 Checked：上列源文件全部相关事件、项目、局势、遗址、巨构与 on_action 钩子；V3 的对话状态（8025、8205、8245、8410、8570）与 8580 七种读法仍与源文件一致。
  All events, projects, the situation, the dig site, megastructures and on_action hooks listed above; V3 dialogue states (8025, 8205, 8245, 8410, 8570) and the seven 8580 readings still match the source.
- 更正 Corrections：将通用虚空虫局势与瘟疫移出本起源（设为独立故事并链接）；删去 2006 → 原始呼唤专属事件的不可能链接；删去四处事件链卡片的“重启”伪连接；把珍宝馆、珍宝藏库、博物天枢、虚空虫遗骸支线从根节点下的孤立入口改挂到真正的前置节点；补上交易、主线、审判后日谈三个结局与互斥组。
  Moved the generic voidworm situation and plague out of this origin (separate linked story); removed impossible links from 2006 to Primal Calling events; removed four false "chain restart" links; attached the vault, trove, Grand Archive and carcass branches to their real predecessors instead of loose root entries; recorded the deal, main and epilogue endings and the exclusive groups.
- 不确定 Uncertain：三个基地项目同属选项组，是开始还是完成某一项时移除其他项属于引擎行为，脚本中看不到；8531（机械再教育）引用的标题键在中英文本地化中都不存在；破坏局势的实时竞速（月度进度、袭击、舰队战）不作模拟。
  Whether starting or finishing one base project removes the others is engine behaviour; 8531 refers to a title key missing in both localisations; the real-time race inside the sabotage situation is not simulated.
