# 太空城邦：冠军之铸现场秀！ / Enclave: Champion's Forge Live!

- 分类 Category: C6 巨兽与城邦 / C6 Leviathans and enclaves · 来源 Sources: events/nomads_events_1.txt:2382-3700; events/nomads_events_1.txt:8108-9310; common/on_actions/00_on_actions.txt:724,4010-4014,1754,1697,843,1176; common/scripted_effects/nomads_effects.txt:592,647 · DLC: Nomads (has_nomads_dlc) · 审阅 Reviewed 2026-10-12

## 如何开始 How it starts

冠军之铸是一个游牧太空城邦（Nomads DLC）。在外交界面联络它时，隐藏事件 nomads.150 打开联络菜单 nomads.100；若城邦已拒绝与我方往来（enclave_champions_forge_ignores），则改为 nomads.105 或 160（00_on_actions.txt:724；L2382-2735）。比武大会由 on_champions_forge_tournament_start 触发（nomads_effects.txt:592,647 → nomads.250）。

The Champion's Forge is a nomadic enclave (Nomads DLC). Contacting it fires hidden nomads.150, which opens the contact menu nomads.100; if the enclave ignores us (enclave_champions_forge_ignores), nomads.105 or 160 appear instead (00_on_actions.txt:724; L2382-2735). Tournaments are started through on_champions_forge_tournament_start (nomads_effects.txt:592,647 -> nomads.250).

## 剧情脉络 Story outline

- 联络菜单是可反复打开的枢纽：报名或停止参赛邀请（110/115）、招募英杰（120→1500，冷却期内不可再招）、或在3600天后获得对手的战斗简报（125，可再次续订）。
  The contact menu is a repeatable hub: sign up for or stop tournament invitations (110/115), recruit a paragon (120 -> 1500; not again during the cooldown), or receive a combat briefing on a rival after 3600 days (125, renewable).
- 比武：nomads.255“重燃铸火”邀请各国（可开启前往城邦的虫洞项目）；12个月后开幕 270；参赛舰队交战，战斗结束30天后各国按名次收到冠军295/亚军290/季军285/其他305；3年内未决出胜负则歇战306。
  Tournament: nomads.255 "The Forge Lights Again" invites empires (a wormhole travel project can be enabled); it opens 12 months later (270); contestant fleets fight, and 30 days after the battle each empire gets first 295, second 290, third 285 or other 305; with no result within 3 years it is abandoned (306).
- 招募：1500 从六位英杰中随机给出一位（奥伦·维斯、亚夏尔、小塞罗、索拉斯单元、萨尔·哈斯克古戎、塞拉伦涅）。除亚夏尔外，每人都有一次由游戏状态触发的个人事件：1511、1525、1545、1565；塞拉伦涅则在720–840天后开启“过去的碎片”事件链（另一故事）。
  Recruitment: 1500 offers one of six paragons at random (Orun Veyth, Ashar, Sero the Younger, Unit Solace, Th'aal Hask'Guron, Seralune). All except Ashar have one state-triggered personal event: 1511, 1525, 1545, 1565; Seralune instead starts the "Fragments of the Past" chain after 720-840 days (another story).
- 城邦方舟舰被击毁时，击毁者收到 405，其他国家收到 410，观察者收到 observer.105（nomads.400）。
  When the enclave arkship is destroyed, the destroyer gets 405, other empires 410 and observers observer.105 (nomads.400).

## 分支与结局 Branches and outcomes

菜单无结局；比武每届以名次或歇战收场，可多次举办；英杰个人事件各自只发生一次。

The menu has no ending; each tournament ends with placings or abandonment and can recur; each paragon's personal event happens once.

## 条件与文明差异 Conditions and variants

狂热净化者只得到“异形渣滓”回应；联络正文按是否曾接触城邦变化；各英杰招募窗口有物种/公民性相关的问答。

Fanatic Purifiers only get the "Xeno scum" reply; the contact text depends on whether we met the enclave before; each recruitment window has species/civic-dependent questions.

## 审阅记录 Review notes

- 修正：草稿把联络菜单、比武开幕/歇战（event-nomads-250）、比武结果（275）、城邦被毁（400）、拒绝联络（155）以及四位英杰的个人事件（1510、1524、4000、4300、1556、3002）拆成十一个故事；它们共享城邦标记、比武事件链和英杰雇佣标记，现合并为一个城邦故事。类别改为 C6（城邦）。
  Correction: the draft split the contact menu, tournament opening/abandonment (event-nomads-250), results (275), destruction (400), refusal (155) and four paragons' personal events (1510, 1524, 4000, 4300, 1556, 3002) into eleven stories; they share the enclave flags, the tournament chain and the paragon hiring flags, so they are one enclave story. Category changed to C6 (enclave).
- 注：本文件的行号取自游戏文件本身；编译数据中该文件记录的行号有偏移（见账本请求）。
  Note: line numbers are from the game file itself; the compiled records for this file carry shifted line numbers (see ledger requests).
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
