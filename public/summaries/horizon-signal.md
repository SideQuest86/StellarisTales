# 视界信号 / The Horizon Signal

- 分类 Category：深空异闻 Exploration (C3)
- DLC：“视界信号”故事包（本地安装为 `dlc013_horizon_signal`；事件脚本本身没有 DLC 检查）/ Horizon Signal story pack (installed as `dlc013_horizon_signal`; the event scripts contain no DLC check)

## 如何开始 How it starts

开局时，`on_game_start` 的随机事件以 4/20 的权重（约五局一次）运行隐藏事件 akx.8000，选定一个黑洞星系：不在堕落帝国星团或帝国起始星团内，没有星港，也不是守护者星系（`00_on_actions.txt:25-28`，`horizonsignal_events.txt:10-29`）。此后，第一个由科学家率领的舰队进入该黑洞星系的玩家帝国（非 AI、非格式塔、非游牧）触发“视界信号”akx.9000，全局仅一次（`horizonsignal_events.txt:81-144`，`on_entering_system_fleet` 于 `00_on_actions.txt:1040`）。

At game start a weighted random roll (4 of 20, roughly one game in five) runs hidden event akx.8000, which flags a black-hole system outside fallen-empire and empire-start clusters, without a starbase or guardian (`00_on_actions.txt:25-28`, `horizonsignal_events.txt:10-29`). The first player empire (not AI, not gestalt, not nomadic) whose scientist-led fleet enters that system receives akx.9000 "The Horizon Signal", once per game (`horizonsignal_events.txt:81-144`, `on_entering_system_fleet` at `00_on_actions.txt:1040`).

## 剧情脉络 Story outline

1. **信号 The signal.** 9000 开启20天的物理项目“分析视界信号”，完成后 9001“引力即欲望”：派船前往坐标（开启事件链“时之螶：信号”）或视为陷阱（9006，结束）。/ 9000 opens a 20-day physics project; its completion fires 9001. Sending the ship begins the chain "The Worm-in-Waiting: Signals"; calling it a trap ends the story at 9006.
2. **第一位领袖消失 The first leader is lost.** 9005：科研船与科学家在坐标处消失，获得大量物理研究。320–360天后 9010“谜团重现”：信号用失踪者的声音点名第二位领袖。/ 9005: the science ship vanishes with its scientist, leaving a large physics reward. 320–360 days later, 9010 "Reprise" names a second leader.
3. **第二位领袖 The second leader（9010，三选一 / one of three）**
   - 派出（威权与非威权措辞不同）→ 30天后 9011“无尽穿越”→ 再过320–360天 9020“事已过三”点名第三位领袖。/ Send them (wording depends on authoritarian ethics) → 9011 after 30 days → 9020 another 320–360 days later.
   - 派出但在引擎装炸药 → 30天后 9012“紧急介入”：信号就此停止，残骸开放40天工程项目（→ 9095，时之螶科技1进度），并预约环形神殿。/ Rig the drive → 9012 after 30 days: the signal stops; a 40-day debris project (→ 9095) and the Loop Temple are scheduled.
   - 无视 → 9013，事件链结束。/ Ignore → 9013, chain ends.
4. **第三位领袖 The third leader（9020）**：派出 → 9021“终末之始”（第一艘船以“浪子号”之名归来，时之螶科技1进度）；引爆 → 9022（同样的残骸项目）；不理 → 9023，事件链结束。9021 与 9022 都在320–360天后触发环形神殿。/ Send → 9021 (the first ship returns as the "Foundling"); rig → 9022 (debris project); refuse → 9023, chain ends. Both 9021 and 9022 schedule the Loop Temple 320–360 days later.
5. **环形神殿 The Loop Temple.** 首都事件 9100 发现地下神殿，开启1000点社会学项目；完成 9101“时与石”：开放（灵性/非灵性措辞）、仅供学术研究，或封印。前两种设置 `worm_events_available` 并给予时之螶科技2进度；封印结束事件链。/ Capital event 9100 opens a 1,000-point society project; 9101 offers opening the temple (two ethic wordings), academic study, or sealing it. The first two set `worm_events_available` and give Worm technology 2 progress; sealing ends the chain.
6. **插曲（并行，顺序不定） Episodes (parallel, any order)**：
   - **信使 The Messenger**（9200 → 60天项目 → 9201）：继续研究分“解放”（尚武）或“束缚”两种项目；科学家改造自身后可处决（9210/9220 的 a/b）或继续，320–360天后 9211/9221 爆发病毒：控制在首都、威权清洗或让全物种转变。/ A pod with a kin species; research leads to the "Unleashed" (militarist) or "Leashed" project, then an outbreak 320–360 days after letting the scientist continue.
   - **命中相会 A Rendezvous**（9300 → 9310）：来自未来的“朔望”号舰长请求一战。问答三项可依次询问；狂热和平主义可劝其自毁并获得舰船；其余选择或 9300.b 直接开战（9315）。击毁后由隐藏事件9318三选一：镜像舰长亲自击毁 9320、他人击毁 9321（二者均使舰长获得“注定相会”特质，日后其死亡触发 9330），其他情形 9319（残骸项目 → 9340）。/ The future Syzygy asks to be destroyed. Fanatic pacifists can talk it down and receive the ship; otherwise battle (9315). Hidden 9318 then picks 9320, 9321 or 9319; the foredoomed commander's later death fires 9330.
   - **神之圆环 The Coils of God**（隐藏9399，平均600个月 → 9400）：镇压 → 360天后 75% 9410（结束）或 25% 9420 → 320–360天后 9450；观察 → 360天后 9450。9450 可开启扰乱（75% 9460 / 25% 9465）、阻止（9470）、参与（9480：全星球人口与科研船一并消失）项目，三者限时1080天，失败或选择继续观察（360天）都到 9490（全星球人口消失）。/ Suppression or observation leads to the Labyrinth Ceremonies; disrupt, prevent or participate projects (1,080-day limit); failure or passive watching ends in 9490.
   - **时螶之界 The Waiting World**（殖民30天后 9500）：修复设施或拆除（9505）；每隔360天依次 9510 → 9520 → 9525，人口不断增加；可随时拆除。9525 继续 → 360天后 25% 9530（殖民地消失，可调查 → 9535 或隔离）或 75% 9540（居民被替换：放弃并独立、威权/排外净化 → 9541、或调查 → 9545）。/ Restore or demolish; extra pops appear every 360 days; at the end 25% exit (9530) or 75% replacement (9540).
   - **圣仆 The Retainer**（舰队进入无限神机星系 → 9600）：可问“摘录者”（9601）与“圆环”（9602），支付800能量与800矿物 → 9620（神机熔毁，新生命出现）；“以后再说/不行”后再访 → 9610，仍可付款。/ Ask about the Brief and the Loop; paying 800 energy and 800 minerals leads to 9620; declining allows "The Retainer, Again" (9610).
7. **终章 Finale.** 时之螶科技1、2只能由本故事事件加入研究选项；二者完成后可研究危险科技3并在首都建造欧米伽同调装置。建成且事件链“信号”仍在时触发 10000：开启“时之螶：征兆”与600点物理项目“开启大门”（需军舰）→ 10010“烈阳之心”。/ Worm technologies 1 and 2 only become research options through these events; with both, the dangerous technology 3 unlocks the Omega Alignment building on the capital. Completing it while the Signals chain is active fires 10000, then the 600-point "Generate the Entry Point" project → 10010.

## 分支与结局 Branches and outcomes

- 10010 选择“好的”→ 10020“见证未来”：母星系行星变为墓穴世界、恒星变为黑洞，物种改写。/ "YES" → 10020: tomb worlds and a black-hole home star.
- 选择“不” → 时之螶化身作为敌对势力出现；击毁后 10030“被粉碎的圆环”：能源与物理奖励，拥有远古遗物时得到“螶之鳞”遗珍，并开启庆典局势（另一故事）。/ "NO" → the Worm manifests as a hostile fleet; destroying it fires 10030 (rewards, Worm Scales relic with Ancient Relics, a celebration situation).
- 提前退出：9006、9013、9023 或 9101 封印。/ Early exits: 9006, 9013, 9023 or sealing the temple at 9101.
- 插曲各有独立结局，互不影响终章。/ Each episode ends on its own and does not gate the finale.

## 条件与文明差异 Conditions and variants

- 许多选项按思潮切换措辞或可用性：9005（灵性/唯物/中立）、9010（威权）、9100/9101（灵性）、9201（尚武）、9211/9221.b（威权）、9310（和平、唯物、灵性、尚武、狂热威权）、9540.b（威权或排外）。/ Many options switch wording or availability by ethics as listed.
- 9310 的前三个问题为同窗对话（is_dialog_only），已配置为可连续询问的对话。/ 9310's first three questions are in-window dialogue and are configured as such.
- 信使项目要求创始物种的科学家；阻止/参与仪式需要运输船，扰乱需要科学家；净化项目需要军舰。/ Project requirements: founder-species scientist (Messenger), transport (prevent/participate), scientist (disrupt), military ship (purge).

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-12（c3b-exploration）
- 来源 Sources：`events/horizonsignal_events.txt`（akx.8000–akx.10030）· `common/special_projects/00_projects_horizonsignal.txt` · `common/event_chains/00_event_chains_horizonsignal.txt` · `common/technology/00_horizonsignal_tech.txt` · `common/buildings/12_event_buildings.txt:43-85` · `common/on_actions/00_on_actions.txt`
- 已核对 Checked：完整阅读 `horizonsignal_events.txt` 第1–3896行、全部项目、事件链、科技与建筑定义及相关 on_action（`00_on_actions.txt:25-28, 1000-1003, 1040, 1300, 1650-1651, 2384, 2957, 3044`）。/ Whole event file, projects, chains, technology, building and on_action hooks read.
- 本轮更正 Corrections：保留 V3 的18条神殿→插曲连接并改写为触发条件标签；新增朔望号被击毁后的三种结果（9318）、“注定相会”指挥官死亡（9330）、圣仆再临（9610）的状态连接；移除仅观察者模式可见的 observer.70/71/72；标注并行插曲与随机互斥组。/ Kept the 18 V3 temple→episode bridges with trigger labels; added the 9318 outcomes, 9330 and 9610 links; removed observer-mode notifications; annotated the parallel episodes and random exclusive groups.
- 不确定 Uncertain：akx.8888 是调试测试事件（`is_test_event = yes`），仍显示为次要入口；9600.d 的 `default_hide_option` 按“窗口关闭时默认选项”理解。/ akx.8888 is a debug event still shown as a secondary entry; `default_hide_option` read as the dismissed-window default.
- 覆盖 Coverage：75个文档全部审阅。/ All 75 docs reviewed.
