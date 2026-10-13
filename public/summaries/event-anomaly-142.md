# 古神神殿 / Shrines to the Old Gods

- 分类 Category：探索 Exploration · 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：events/anomaly_events_1.txt:1735-1880 (anomaly.140, chain start; story anomaly-ast-shrine-1-cat); common/event_chains (old_gods_chain, counter shrines_searched max 3); events/anomaly_events_1.txt:1927 (anomaly.142); events/anomaly_events_1.txt:1970 (anomaly.143); events/anomaly_events_1.txt:2013 (anomaly.144); common/on_actions/00_on_actions.txt:1015-1017 (on_entering_system_fleet); common/special_projects/00_projects_2.txt:114 (OLD_GODS_*_PROJECT); events/anomaly_events_1.txt:2056 (anomaly.165); events/anomaly_events_1.txt:2097 (anomaly.166); events/anomaly_events_1.txt:2138 (anomaly.167); events/anomaly_events_1.txt:2179 (anomaly.168)

## 如何开始 How it starts

事件链“古神神殿”由异常 AST_SHRINE_1_CAT（“被雕琢的小行星”，另一故事 anomaly-ast-shrine-1-cat）的 anomaly.140“熟悉的古龛”选项b开启：它在最多8-10跳内的无殖民、无海盗、非敌对系统中选出三座神殿（标志 old_gods_system_1/2/3@拥有者），并创建三个兴趣点。

The event chain "Shrines to the Old Gods" is started by option b of anomaly.140 "Familiar Shrine" from the anomaly AST_SHRINE_1_CAT ("An Asteroid, Carved", another story, anomaly-ast-shrine-1-cat): it picks three uncolonised, pirate-free, non-hostile systems within 8-10 jumps as shrine systems (flags old_gods_system_1/2/3@owner) and creates three points of interest.

## 剧情脉络 Story outline

三座神殿可按任意顺序拜访：舰队进入神殿所在系统（on_entering_system_fleet）→ anomaly.142“古神：接近恩赐女神” / 143“接近勇气之神” / 144“接近洞察女神”：创建神殿环境物体，启用对应项目（OLD_GODS_BENEFACTRESS/UNDAUNTED/PERCIPIENT，各90天；社会/工程/物理方向；需要科学船+科学家）。项目完成 → anomaly.165/166/167“…的神殿”：事件链计数 +1。三座都完成后触发 anomaly.168“古神：揭示”。

The three shrines can be visited in any order: a fleet entering a shrine system (on_entering_system_fleet) → anomaly.142 "Old Gods: Approaching the Benefactress" / 143 "Approaching the Undaunted" / 144 "Approaching the Percipient": creates the shrine ambient object and enables the matching project (OLD_GODS_BENEFACTRESS / UNDAUNTED / PERCIPIENT, 90 days each; society / engineering / physics; science ship and scientist). Finishing a project → anomaly.165/166/167 "Shrine to ..." adds 1 to the chain counter. Once all three are done, anomaly.168 "Old Gods: Revelation" fires.

## 分支与结局 Branches and outcomes

三座神殿并行，无先后；anomaly.168 的四个选项互斥：a 压下发现（每月影响力，结束事件链）、b 变现（每月能量）、c 研究（每月社会研究）、d 神恩（团结并转向灵性，狂热灵性者改为更高团结）。

The three shrines are parallel; the four options of anomaly.168 are alternatives: a suppress (monthly influence, ends the chain), b monetise (monthly energy), c study (monthly society research), d divine favour (unity and a shift toward spiritualist; fanatic spiritualists get more unity).

## 条件与文明差异 Conditions and variants

开启事件链的 anomaly.140 对狂热灵性者有不同选项（直接结束链）；168 的选项d按是否狂热灵性者变化。

anomaly.140, which starts the chain, has a different option for fanatic spiritualists (it ends the chain at once); 168's option d depends on being a fanatic spiritualist.

## 审阅记录 Review notes

已核对 anomaly.140、142–144、165–168、三个项目与事件链。修正：草稿把三座神殿拆成三个各自以共享的 anomaly.168 收尾的故事；现合为一个以事件链“古神神殿”为起点的故事，三座神殿作为并行组，门控 anomaly.168。anomaly.140 属另一故事（c3b），仅作入口说明。

Checked anomaly.140, 142-144, 165-168, the three projects and the chain. Correction: the draft made three separate stories that all end in the shared anomaly.168; they are now one story starting from the chain "Shrines to the Old Gods" with the three shrines as a parallel group gating anomaly.168. anomaly.140 belongs to another story (c3b) and is only described as the entry.
