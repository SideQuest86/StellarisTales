# 意外矿层 / Unexpected Mineral Seams

- 分类 Category：文明纪事 Society (C7) · 殖民地事件链 colony event chain（开发者注释 "Greed is Bad"）

## 如何开始 How it starts

殖民地满两年（权重 8）或满三年（权重 3）时，随机池可抽中 colony.9050。要求：非母星/非首都、原主人、非 AI、无地面战斗、未被占领；星球没有矿物丰富/超富/贫瘠修正，也没有其他殖民地事件；全银河只发生一次（`crystal_colony`）。

At the second (weight 8) or third (weight 3) anniversary; once per galaxy, on a colony without mineral-richness modifiers or earlier colony events.

## 剧情脉络 Story outline

每一步都可以“见好就收”，也可以花更多能量继续深挖：/ At every step you can stop or pay more energy to dig deeper:

1. **意外矿层（9050）**：直接开采（矿石洞穴）；或花 1000 能量深层勘探 → 90–110 天 → **深层矿脉（9055）**。
2. **深层矿脉（9055）**：开始开采（矿物丰富修正）；或花 1500 能量继续——非地下帝国 → 120–140 天 → **为“石”过早（9060）**（结局）；地下帝国或“宇宙黎明”起源 → 90–110 天 → **更多矿物（9065）**。
3. **更多矿物（9065）**：开采；或花 2000 能量 → **炽热水晶（9070）**。
4. **炽热水晶（9070）**：停止（水晶洞穴、超富矿）→ 3000–3600 天后 **异常事件（9085）**：继续开采 → 1000–1200 天后 **贪婪的代价（9090）**，或“安全第一”（失去水晶，结束）；或花 2500 能量继续挖 → 90–110 天后 **贪婪的代价（9075）**（获得更多矿藏）。
5. **贪婪的代价（9075/9090）**：水晶海妖苏醒，以敌对陆军出现在星球上。地面战击败它 → 一天后 **水晶实体被击败（9081）**。

English: the deeper (and more expensive) you dig, the richer the deposits — until the Crystal Kraken wakes, either right away (9075) or years after you stopped (9085 → 9090). Defeating it on the ground gives *Crystalline Entity Defeated*.

## 分支与结局 Branches and outcomes

- 任何一步选择开采即结束；为“石”过早（9060）是非地下帝国的终点。/ Choosing to mine at any step ends the chain; 9060 is the non-subterranean end.
- 海妖结局：地面击败（9081：尸体矿藏、凝聚力）；以其他方式被消灭（隐藏 9082：“被轰炸”尸体矿藏）；或海妖占领星球（隐藏 9095：大批人口死亡、海妖修正）。/ Kraken outcomes: ground defeat (9081), destroyed otherwise (hidden 9082), or it occupies the planet (hidden 9095).
- 若帝国有“平息水晶”修正，海妖出现时的描述不同。/ The kraken text differs if the empire has the *pacified crystals* modifier.

## 条件与文明差异 Conditions and variants

地下帝国与“宇宙黎明”起源可以挖到第二层之后；其他帝国在第二层就到底。/ Only subterranean empires or Cosmic Dawn can go past the second probe.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-12（c7b-society）
- 来源 Sources：`events/colony_events_3.txt:4633–5150` · `common/on_actions/00_on_actions.txt:2841、2928、2945、3769、3820`
- 已核对 Checked：9050–9095 全部脚本（含隐藏回调 9080/9082/9095 及其 on_action）、四档能量费用与延时。
- 合并 Merged：原独立故事 event-colony-9080（9080 隐藏 → 9081）是本链海妖战斗的结果，现以家族方式并入，并从 9075、9090 加审阅连接。/ The former story event-colony-9080 is merged via a family and two reviewed bridges.
- 审阅改动 Changes：标注两个结局与三条审阅注释（同名选项分流、海妖三种下场、安全第一退出）。
