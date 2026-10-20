# 异常立方体 / Anomalous Cube

- 分类 Category：先驱者与考古 Precursors · DLC：脚本文件 12_strange_worlds_arc_sites.txt（事件需 has_biogenesis_dlc） strange-worlds script files (events need has_biogenesis_dlc)

## 如何开始 How it starts

随机遗址：基础权重1000，出现在非恒星、非小行星的天体上；全银河最多一处（common/archaeological_site_types/12_strange_worlds_arc_sites.txt:58）。

A random site with base weight 1000 on bodies that are neither stars nor asteroids; at most one per galaxy (common/archaeological_site_types/12_strange_worlds_arc_sites.txt:58).

## 剧情脉络 Story outline

一块由活体金属构成的巨大立方体，里面的软体生物指挥官留下了两段录音：他是一位和平使者，驾驶的六面体飞船被破坏而迫降，和平信物没能送达，战争无可避免。

1. 金属涟漪：涟漪般的金属表面，由活体金属构成
2. 进入方块：立方体向考古队张开入口，里面的指挥台旁是软体生物的尸骨和一个会响动的容器
3. 发现音频日志：破译录音一：劝说统治者避免战争

A colossal cube of Living Metal. Inside, a molluscoid commander left two recordings: he was a peace envoy whose hexahedral ship was sabotaged; the peace token was never delivered and war was unavoidable.

1. Rippling Metal: a rippling surface of Living Metal
2. Into the Cube: the cube opens; a molluscoid husk by the console and a container that thuds
3. Audio Logs Discovered: first audio log: pleading with the presidium to avoid war

## 分支与结局 Branches and outcomes

- 活体金属奇观 / Living Metal Marvel：录音二揭示迫降与未送达的和平信物，容器里是活体金属块。a：若存在未交战的堕落帝国，把它作为礼物送出（对方好感、团结奖励）；b：自己留下（活体金属开采科技进度25%、巨型建设洞见修正）。结束后星球获得活体金属资源点与稀有文物资源点 / The second log tells of the crash and the undelivered peace token; the crate holds a nugget of Living Metal. a: if a Fallen Empire exists and we are not at war with it, gift it (opinion, unity reward); b: keep it (living-metal mining tech progress 25%, mega-construction insight modifier). Afterwards the planet gains a Living Metal deposit and artifact deposits

## 条件与文明差异 Conditions and variants

- 本遗址的 on_roll_failed 把事件池参数设为 no_events（不存在同名事件池），所以掷骰失败不会触发随机意外。 / The site passes RANDOM_EVENTS = no_events to its roll-failure effect (no pool of that name exists), so a failed roll triggers no incident.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：common/archaeological_site_types/12_strange_worlds_arc_sites.txt:58；events/strange_worlds_events.txt:3027
- 已核对：遗址定义（common/archaeological_site_types/12_strange_worlds_arc_sites.txt:58）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/12_strange_worlds_arc_sites.txt:58) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
