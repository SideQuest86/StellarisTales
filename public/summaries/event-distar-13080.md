# L-星团 / The L-Cluster

- 分类 Category：探索 Exploration · DLC：《遥远繁星》Distant Stars（has_distar） · 审阅 Reviewed：2026-10-13（部分审阅 partial）
- 来源 Sources：events/distant_stars_events_3.txt:2366-2410 (distar.13080); events/apocalypse_events.txt:80-98 (apoc.3, same chain start); common/event_chains/00_event_chains_distant_stars.txt:25 (l_cluster_chain, max 7 clues); common/scripted_effects/00_scripted_effects.txt:3243 (generate_lcluster_clue); common/scripted_effects/00_scripted_effects.txt:3291 (pop_lcluster_event); events/distant_stars_events_3.txt:1141 (distar.9000); events/distant_stars_events_3.txt:1280 (distar.10904); common/on_actions/00_on_actions.txt:2698 (distar.10903); events/distant_stars_events_3.txt:1196-1303 (distar.10900-10905); common/special_projects/00_projects_distant_stars.txt:650 (LCLUSTER_PROJECT); events/distant_stars_events_3.txt:1331-1428 (distar.10950); events/distant_stars_events_3.txt:1109-1129 (distar.8000); events/distant_stars_events_3.txt:1812-2142 (distar.13000-13035); events/distant_stars_events_3.txt:1498-1566 (distar.10955/10956)

## 如何开始 How it starts

拥有《遥远繁星》时，银河里有被封存的L-星门（abandoned lgate_base 巨型建筑）。国家第一次看到一座（在外国领土内、未经科学船勘测则触发 distar.13080；经科学船勘测则触发 apoc.3，另一故事）就设置标志 encountered_first_lgate，并通过 start_lcluster_chain 开启事件链“L-星团”。

With Distant Stars the galaxy contains sealed L-Gates (lgate_base megastructures). The first time a country sees one (distar.13080 when it lies in foreign territory and was not surveyed by a science ship; apoc.3, another story, when surveyed) it sets the flag encountered_first_lgate and starts the event chain "The L-Cluster" through start_lcluster_chain.

## 剧情脉络 Story outline

1. distar.13080“遗弃星门”：发现L-星门，开始事件链“L-星团”（7条线索）。
2. 收集线索：之后许多异常的结果事件会调用 pop_lcluster_event（约30%概率在10天后触发 distar.9000“L-星门线索”）或直接调用 generate_lcluster_clue；可重复科技 tech_repeatable_lcluster_clue 也会产生线索。7条线索齐全 → distar.10904“已收集好L-星门的线索”：解锁研究 tech_lgate_activation。
3. 研究该科技：若拥有L-星门 → distar.10905“打开L-星团”，启用项目 LCLUSTER_PROJECT“启动L-星门”（科学船+科学家，180天；他国先开则中止）；若没有 → distar.10901“需要L-星门”（每60天复查，或放弃线索换取最多3500工程研究与能量）。
4. 项目完成 → distar.10950（隐藏）：设置 l_cluster_opened，生成L-星团的星系，激活这座星门，并按开局已决定的全局标志发生四种结局之一：灰色风暴危机（graygoo.1，另一故事）、龙之季（distar.13000 → 13010“L-星龙出现”/13011“释放未知”）、灰雾帝国（graygoo.100，另一故事）、或平静的 distar.10951“链接已建立”（其余L-星门之后陆续启用）。其他国家随后收到 distar.10952（中止项目）/10953/10954（得知星团已开）通知。
5. 龙之季的后续：科学船到达幼龙所在恒星 → distar.13030“观察到L-星龙”，可启动项目 TAME_LDRAGON_PROJECT“驯服L-星龙”（180天）→ distar.13035；或击杀L-星龙 → distar.13020“被消灭”（每月影响力与矿物，已知时再加研究）。
6. 旁支：邻国线索超过5条且拥有L-星门时，你会收到 distar.10956“L-星团的召唤”。

1. distar.13080 "Abandoned Gateway": the L-Gate is found and the event chain "The L-Cluster" (7 clues) begins.
2. Collecting clues: the outcomes of many later anomalies call pop_lcluster_event (about 30% to fire distar.9000 "L-Gate Insights" 10 days later) or generate_lcluster_clue directly; the repeatable tech tech_repeatable_lcluster_clue also yields clues. With all 7 clues → distar.10904 "L-Gate Insights Gathered" unlocks the research tech_lgate_activation.
3. Researching it: if you own an L-Gate → distar.10905 "Opening the L-Cluster" enables project LCLUSTER_PROJECT "Activate L-Gate" (science ship and scientist, 180 days; aborted if another country opens first); if not → distar.10901 "L-Gate Needed" (re-checked every 60 days, or liquidate the clues for up to 3500 engineering research and energy).
4. Project complete → distar.10950 (hidden): sets l_cluster_opened, spawns the L-Cluster systems, activates this gate, and one of four outcomes happens according to a global flag fixed at game start: the Gray Tempest crisis (graygoo.1, another story), dragon season (distar.13000 → 13010 "L-Drakes Emerge" / 13011 "Unknowns Unleashed"), a gray goo empire (graygoo.100, another story), or the quiet distar.10951 "Link Established" (the other L-Gates activate over time). Other countries then get distar.10952 (project aborted) / 10953 / 10954 (the cluster is open).
5. Dragon season follow-up: a science ship reaching the star of a young L-Drake → distar.13030 "L-Drake Observed", which can start project TAME_LDRAGON_PROJECT (180 days) → distar.13035; or killing an L-Drake → distar.13020 "Slayed" (monthly influence and minerals, plus research if known).
6. Side branch: when a neighbour has more than 5 clues and owns an L-Gate you get distar.10956 "The L-Cluster Beckons".

## 分支与结局 Branches and outcomes

开启后的四种结局互斥，且在新游戏开局时就已抽定（权重 50/30/30/30；禁用破坏性玩法时灰色风暴权重为0）；龙之季之后“驯服”与“击杀”是两种并行的处理方式。

The four outcomes after opening are mutually exclusive and are rolled at new-game start (weights 50/30/30/30; the gray-goo crisis drops to 0 when disruptive gameplay is blocked); after dragon season, taming and killing are two parallel ways to deal with a drake.

## 条件与文明差异 Conditions and variants

distar.13030 的驯服选项禁止杀戮与狂热排外帝国；13020 的奖励按是否已知晓L-星龙变化；9000 的正文按线索来源（声波、三种描述）变化。

distar.13030's taming option is disallowed for homicidal and fanatic xenophobe empires; distar.13020's reward depends on whether the L-Drake was already known; distar.9000's text varies with the clue source (sonic, three descriptions).

## 审阅记录 Review notes

已核对 distar.8000–13080 的相关事件、事件链、线索脚本效果、on_action 和 LCLUSTER_PROJECT / TAME_LDRAGON_PROJECT。修正：草稿把“打开星团”“线索”“龙之季后续”“邻国预警”分成七个互不相连的故事；现合为一个从 distar.13080 开始的故事，并按真实顺序用审阅连接串起（链→线索→7条线索→研究→项目→结局→龙之季）。灰色风暴（graygoo.1）与灰雾帝国（graygoo.100）属其他故事，仅作外链。

Checked the related events of distar.8000-13080, the event chain, the clue script effects, the on_actions and LCLUSTER_PROJECT / TAME_LDRAGON_PROJECT. Correction: the draft split opening, clues, the dragon aftermath and the neighbour warning into seven unconnected stories; they are now one story from distar.13080 with reviewed links in the real order (chain → clues → 7 clues → research → project → outcome → dragon season). The Gray Tempest (graygoo.1) and gray goo empire (graygoo.100) belong to other stories and appear only as external links.
