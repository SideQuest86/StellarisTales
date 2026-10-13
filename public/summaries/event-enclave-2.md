# 佣兵城邦基金会 / Mercenary Enclave Foundation

- 分类 Category：巨兽与城邦 · DLC：霸主 Overlord
- 来源 Sources：events/overlord_enclaves_events.txt:76（enclave.2）, :203（enclave.21）, :2179（enclave.275）, :2817–3325（enclave.2000–2025）; common/situations/03_AI_empire_situations.txt:275; common/scripted_effects/enclave_effects.txt:8; common/on_actions/00_on_actions.txt:4806
- 审阅 Reviewed 2026-10-12（C6）

## 如何开始 How it starts
帝国下令让一支舰队独立为佣兵城邦时（on_establish_mercenary_enclave）出现本窗口，说明需投入能量（生物舰船为食物）、合金与影响力，换取股份与分红。佣兵城邦只会以这种方式在开局后诞生（enclave_effects.txt:5 注释）。
Shown when an empire orders a fleet to become an independent mercenary enclave; it costs energy (food for bio-ships), alloys and influence in exchange for shares and dividends. Mercenary enclaves only come into being this way after game start.

## 剧情脉络 Story outline
1. enclave.2：“成交”或“不成交”。'Deal' or 'No deal'.
2. 成交 → 隐藏 enclave.21 建立城邦国家（初始信任30），并立即打开新城邦的联络菜单（跨故事链接“佣兵城邦”）；城邦同时开启“佣兵分红”局势。
   Deal → hidden enclave.21 creates the enclave (trust 30), immediately opens its contact menu (cross-link to "Mercenary Enclave"), and the enclave starts the "Mercenary Dividends" situation.
3. 分红局势完成时，enclave.275 向资助者（城邦所在星系的拥有者或游牧资助者）随机发放一份分红：2000/2005/2010 各32，2020/2025 各2；随后局势重新开始，形成循环。
   When the situation completes, enclave.275 pays the patron (the owner of the enclave's system or a nomad patron) one dividend: 2000/2005/2010 weight 32 each, 2020/2025 weight 2 each; the situation then restarts, so dividends recur.

## 分支与结局 Branches and outcomes
- 2000/2005/2010：常规分红（研究发现、追回资产、创纪录利润）；奖励随城邦扩建等级。Regular dividends; rewards scale with the enclave's upgrade tier.
- 2020：清剿海盗所得的丰厚分红（罕见）。Rare windfall from pirate busts.
- 2025：经营困难——可接受、解雇董事会，或出资援助。Hard times: accept, fire the Board, or pay to help.
- 不成交：无事发生。No deal: nothing happens.

## 条件与文明差异 Conditions and variants
分红局势进度受城邦等级、银河议会决议、“战争之王”飞升等影响（03_AI_empire_situations.txt 注释与阶段定义）。“灵督”起源下 enclave.2 被中止（abort_trigger）。
Situation progress depends on enclave rank, Galactic Community resolutions and Lord of War; enclave.2 is aborted for the Mindwardens origin.

## 审阅记录 Review notes
- 已核对 enclave.2 选项与费用、enclave.21/22、create_mercenary_enclave_country、分红局势定义与 enclave.275 权重。
- 注意：分红发给“资助者”，通常是建立者（城邦建在其领土内），但若星系易主则随之改变。Dividends go to the patron, usually the founder, but follow the system's owner.
- 覆盖完整。Coverage complete.
