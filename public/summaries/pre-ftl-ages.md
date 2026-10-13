# 科技进步 / Technological Progression
- 分类 Category：文明纪事 Society (C7) · 前FTL文明发展情境 pre-FTL development situation
- 来源 Sources：`common/situations/03_AI_empire_situations.txt:1-400` · `events/first_contact_dlc_situation_events.txt:12-1130` · `common/on_actions/00_on_actions.txt:140-200, 563-575`
- 审阅 Reviewed：2026-10-13（c7b-society）

## 如何开始 How it starts

每个原始（前FTL）国家在生成时就带有“科技进度”情境 pre_ftl_tech_progress_situation（也可由决定/星系生成启动），总进度 1920，每月按时代（早期 +1、中期 +2、后期 +4）、觉醒度（低 0.5 … 完全 2）和各种倍率增长（`03_AI_empire_situations.txt:1–200`）。/ Every primitive country carries the tech-progress situation (1920 progress, growing monthly by era, awareness and modifiers).

## 剧情脉络 Story outline

1. **情境运行时**每月：5% 触发 preftl.50（随机观察事件守门员，参见观察篇）；检查 preftl.5（科技突破/挫折，各 5%）、preftl.20（社会启蒙守门员）与觉醒度衰减 awareness.200。/ Monthly: 5% preftl.50 (observation events), plus the tech progress/setback, societal enlightenment and awareness-decay gatekeepers.
2. **进度满**：销毁情境并触发 preftl.0，按当前时代分派到 preftl.199 / 299 / … / 999 / 1099，设置新时代并**重新开始**情境：石器 → **青铜（200）** → **铁器（300）** → **晚期中世纪/印刷术（400）** → **文艺复兴/爆炸物（500）** → **蒸汽（600）** → **工业革命（700）** → **机器时代/无线电（800）** → **原子（900 分裂原子）** → **早期太空（1000 第一颗卫星）**；每次新时代，观察站主人收到相应的通知事件（200…1000）。/ Completing the situation fires preftl.0, which advances the age (stone → bronze → … → early space), restarts the situation and notifies the observer.
3. **早期太空时代之后**：机器人起义（1010/1015/1020/1030/1035/1110/1115）作为随机观察插曲出现；到最后一个时代，**1099** 结束原始阶段，**1100 太空时代 / 1105 启蒙完成 / 180 / 1111 通讯建立** 引导对方文明成为太空国家并建立联系；若觉醒度满，awareness.920「谁在监视监视者？」可直接触发首次接触（action.2）。/ After the last age 1099 ends the primitive phase, followed by 1100 / 1105 / 180 / 1111 and first contact; awareness.920 can trigger first contact earlier.

## 分支与结局 Branches and outcomes

时代是**顺序**的（同一情境循环），不是互斥分支；各时代内的观察事件、情境和行动见其他篇章。/ The ages are sequential rounds of one looping situation, not exclusive branches; observation events, situations and operations are covered in their own stories.

## 条件与文明差异 Conditions and variants

进度倍率受觉醒度、开放科技启蒙（×3 / ×4.5）、科技冻结、栖息地首都等影响。/ Progress is modified by awareness, open technological enlightenment, tech freezes and habitat capitals.

## 审阅记录 Review notes

- 已核对 Checked：情境定义（进度、倍率、月度事件）、preftl.0 的时代分派、各时代事件。/ Situation definition, the preftl.0 age dispatch and the age events.
- 审阅改动 Changes：未改变编译结构（时代事件均为情境的条件子项）；加入了顺序说明。/ Structure unchanged; sequential ordering documented.
- 不确定 Uncertain：机器人起义与 awareness.920 的入口条件只按调用图读取。 / The robotic-uprising and awareness.920 entry conditions were read from the call graph only.
