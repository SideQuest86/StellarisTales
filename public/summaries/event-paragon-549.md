# 一位伟大领袖之死 / Death of a Great Leader

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany · DLC: Paragon

## 如何开始 How it starts

领袖死亡时（on_leader_death），隐藏事件 paragon.549 检查（需 Paragon DLC，或帝国化的演化捕食者；领袖服役≥2年、非使者/非大可汗、技能≥4或是统治者或为知名/传奇）。随机表中“什么都不做”权重为80，葬礼权重从0起按领袖重要度累加（统治者+1000，议员/知名/传奇领袖、高技能、长服役各自加权，服役100年以上+300）；近期办过葬礼则“什么都不做”权重乘5。

When a leader dies (on_leader_death) hidden paragon.549 checks (Paragon DLC, or an imperial Evolutionary Predator; the leader served >=2 years, is not an envoy or Great Khan, and has skill >=4 or is the ruler or a renowned/legendary leader). In the random list "do nothing" weighs 80 while the funeral weight starts at 0 and grows with importance (ruler +1000; councilor, renowned/legendary, high skill and long service each add weight, 100+ years +300); a funeral in the last five years multiplies the "do nothing" weight by 5.

## 剧情脉络 Story outline

按帝国与领袖类型选一个窗口（if/else）：非集群帝国——paragon.550“一位伟大领袖之死”；蜂巢——paragon.571“…永存”（5年“蜂巢/荒野永存”修正）；领袖物种为机器/机械的集群帝国——paragon.570“死亡驱役”（5年虚拟顾问修正）；其余情形无窗口。paragon.550 从若干葬礼中让玩家选择，并给出相应的修正或花费能量。

One window by empire and leader type (if / else): non-gestalt - paragon.550 "Death of a Great Leader"; hive - paragon.571 "The ... Endures" (5-year hive/wilderness endures modifier); gestalt with a robot/machine leader species - paragon.570 "Servitude in Death" (5-year virtual advisors modifier); otherwise no window. paragon.550 lets the player pick one of several funerals, each with its own modifier and energy cost.

## 分支与结局 Branches and outcomes

选项互斥，并由领袖标记决定是否出现：b 私密葬礼（始终可选，paragon.552）；a 公开葬礼（统治者必有，其他随机，费用高，paragon.551）；c 负面特质（paragon.553）；d 唯物（554）；e 灵性（555）；f 军国（556，费用中）；g 和平（557，费用中）；h 排外（558，费用低）；i 亲外（559，费用低）；j 威权（560，费用中）；k 平等（561）；l 公司（562，费用中）；m 植物/真菌（563）；另有4个“演化捕食者”吃掉统治者的选项。

The options are exclusive and gated by leader flags: b private funeral (always, paragon.552); a public funeral (always for rulers, otherwise random, high cost, paragon.551); c negative traits (553); d materialist (554); e spiritualist (555); f militarist (556, medium cost); g pacifist (557, medium); h xenophobe (558, low); i xenophile (559, low); j authoritarian (560, medium); k egalitarian (561); l megacorp (562, medium); m plantoid/fungoid (563); plus four Evolutionary Predator "eat the ruler" options.

## 条件与文明差异 Conditions and variants

至多4个选项出现（私密、必要时公开、再随机补足到总数3–4个）；伦理类选项还要求领袖或帝国持有对应伦理。

At most about four options show (private, public when needed, then random extras up to the limit); ethic options also need the leader or empire to hold that ethic.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/paragon_events.txt:2792-3990; common/on_actions/00_on_actions.txt (on_leader_death)
- 已核对入口、触发、选项与结果。
  Checked the entry, trigger, options and outcomes.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
