# 破损的大门 / The Broken Gates

- 分类 Category：先驱者与考古 Precursors · 来源 Sources：common/archaeological_site_types/04_leviathans_arc_sites.txt:3；events/ancient_relics_arcsite_events_2.txt:7669 · DLC：《利维坦》Leviathans（脚本文件 04_leviathans_arc_sites） Leviathans · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

随机遗址：基础权重10（需要《利维坦》）；不会出现在恒星、气态巨行星、小行星、起始/首都/黑洞星系或格式塔拥有的星球上；全银河最多一处；仅非格式塔帝国可见（common/archaeological_site_types/04_leviathans_arc_sites.txt:3）。

A random site with base weight 10 (needs Leviathans); never on stars, gas giants, asteroids, starting, capital or black-hole systems, or gestalt-owned bodies; at most one per galaxy; visible to non-gestalt empires only (common/archaeological_site_types/04_leviathans_arc_sites.txt:3).

## 剧情脉络 Story outline

一座破碎穹顶按阶层分成四层，越往里越富有也越疯狂；最内层是一座布满星图的神殿和一台机器，里面有被“长者”低语的存在。考古队摆弄机器时，要么撕碎它，要么把它放出来——那会摧毁一个恒星系并让一个“古神”苏醒。

1. 第一层：城市贫民窟与地下遗骸
2. 第二层：整齐的城市规划和集市
3. 第三层：更富裕的区域，一名科学家忽然攻击同事
4. 最后一层：灵能冲击，神殿与指向本星系的星图；摆弄机器

A broken dome split into four class layers, richer and madder toward the middle; the innermost temple holds a machine and a voice that demands to be unshackled. The team can either rip the machine apart or let the Elder One out — which destroys a star system and wakes a cosmic horror.

1. The First Layer: the first layer: slums and remains below
2. The Second Layer: the second layer: orderly planning and marketplaces
3. The Third Layer: the third layer: a wealthier district; a scientist suddenly kills a colleague
4. The Final Layer: the final layer: psionic waves, a temple with star diagrams pointing at this system; tinkering with the machine

## 分支与结局 Branches and outcomes

- 长者 / The Elder One：a 撕碎机器（工程学研究，获得标本“长者祭坛”，故事结束）；b 放它出来 → 若星系没有黑洞，该系统被摧毁，其他帝国在场的舰队全军覆没（收到 ancrel.11035），并在黑洞星球上创建“古神”守护者国家；10天后 ancrel.11025 / the Elder One: a rip the machine apart (engineering research, the specimen "altar to the Elder One", end); b let it out → if the system has no black hole it is destroyed and other empires' fleets there are lost (they receive ancrel.11035), and the guardian-horror country is created at a black-hole planet; ancrel.11025 follows after 10 days
- 信号传输接入 / Incoming Transmission：古神来电：a 膜拜（影响力月度奖励、在系统建立前哨站、获得修正）→ ancrel.11027“明智之路”；b 后悔放它出来 → ancrel.11030“选择了死亡”（古神敌对） / the horror calls: a worship it (influence reward, an outpost, a modifier) → ancrel.11027 "path of wisdom"; b regret it → ancrel.11030 "chosen death" (hostile)
- 古神被击毁时 ancrel.11040（on_ship_destroyed_victim）会清除其修正并开启一次“恐怖庆典”情境；该事件目前不属于任何可读故事。 / When the horror is destroyed ancrel.11040 (on_ship_destroyed_victim) removes its modifier and starts a "horrific celebration" situation; that hidden event is not part of any readable story.

## 条件与文明差异 Conditions and variants

- 无特殊的文明差异。 / No empire-specific variants beyond the reward wording.
- 掷骰失败时使用通用事件池 all_random_events（见“考古遗址：发掘意外”）。 / Failed rolls use the generic pool all_random_events (see "Archaeological Sites: excavation incidents").

## 审阅记录 Review notes

- 已核对：遗址定义（common/archaeological_site_types/04_leviathans_arc_sites.txt:3）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/04_leviathans_arc_sites.txt:3) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
