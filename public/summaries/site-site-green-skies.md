# 绿色天空 / Green Skies

- 分类 Category：先驱者与考古 Precursors · 来源 Sources：common/archaeological_site_types/10_cosmic_storms_arc_sites.txt:5；events/cosmic_storms_events_1.txt:2421 · DLC：《宇宙风暴》Cosmic Storms（has_cosmic_storms_dlc） Cosmic Storms · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

随机遗址：权重+15，出现在可居住星球上；没有《宇宙风暴》或所有者为格式塔时权重为0；全银河最多一处（common/archaeological_site_types/10_cosmic_storms_arc_sites.txt:5）。

A random site: +15 on habitable planets, weight 0 without Cosmic Storms or for a gestalt owner; at most one per galaxy (common/archaeological_site_types/10_cosmic_storms_arc_sites.txt:5).

## 剧情脉络 Story outline

遗址是海盗为引诱寻宝者布下的陷阱：用营地材料搭成的假“遗迹”，信号发自一台收发机。风暴降临时，藏在风暴里的海盗舰队劫持了科考队，向你勒索。

1. 奇特的混合风格：各文明风格混杂的奇怪遗迹，材料却是殖民营地用的
2. 山雨欲来：地下小洞穴里有人住过的痕迹，天空开始变绿（触发风暴 cstorms.1406）
3. 失算之举：“愚行”：仓库里堆满各大公司的货物和一台转发机；获得消费品、矿物、合金
4. 海盗来袭！：“海盗！”：风暴里藏着海盗舰队，劫持领袖与队员（能量-2000，进入两种选择）

The "site" is a pirate lure for relic hunters: fake ruins of camp materials and a transponder. When a cosmic storm rolls in, the pirate fleet hiding inside takes the dig team hostage and demands a ransom.

1. A Curious Collage: ruins mixing every known architectural style, built of colony-camp materials
2. Weathered Situation: a cave with signs of recent occupants; the sky turns green (a storm cstorms.1406 begins)
3. Folly: a storeroom of branded goods and a transponder (consumer goods, minerals, alloys)
4. Pirates!: A fleet hidden in the storm takes the leader and crew hostage (energy -2000, two answers)

## 分支与结局 Branches and outcomes

- 合作愉快 / The Pleasures of Doing Business：付赎金 → 15天后“合作愉快”：人质获释，获得修正 green_skies_outcome_modifier / pay up → 15 days later "The Pleasures of Doing Business": the crew is freed, modifier green_skies_outcome_modifier
- 反击 / Pushback：拒绝 → 15天后“反击”：创建海盗舰队，考察队被困 / refuse → 15 days later "Pushback": a pirate fleet is created and the team is besieged
- 击毁该海盗舰队会触发 cstorms.1417 → 1420（另一个故事 event-cstorms-1417）。 / Destroying that pirate fleet fires cstorms.1417 → 1420 (the separate story event-cstorms-1417).

## 条件与文明差异 Conditions and variants

- 无特殊的文明差异。 / No empire-specific variants beyond the reward wording.
- 本遗址的 on_roll_failed 把事件池参数设为 no_events（不存在同名事件池），所以掷骰失败不会触发随机意外。 / The site passes RANDOM_EVENTS = no_events to its roll-failure effect (no pool of that name exists), so a failed roll triggers no incident.

## 审阅记录 Review notes

- 已核对：遗址定义（common/archaeological_site_types/10_cosmic_storms_arc_sites.txt:5）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/10_cosmic_storms_arc_sites.txt:5) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
