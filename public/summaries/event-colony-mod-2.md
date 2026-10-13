# 泰坦巨兽 / Titanic Life

- 分类 Category：文明纪事 Society (C7) · 星球修正殖民地事件 planet-modifier colony event
- 来源 Sources：`events/colony_events_3.txt:150–394` · 分派器 dispatcher `:980–999` · `common/special_projects/00_projects_3.txt:602–669`
- 审阅 Reviewed：2026-10-12（c7b-society）

## 如何开始 How it starts

殖民地满一年时，隐藏分派器 colony_mod.161 发现星球带有“泰坦巨兽”修正（且尚未处理过，前面的磁场、辐照事件不适用）：若帝国是“原始呼唤”起源，改为触发该起源的专属事件（grand_archive.1010，不属于本故事）；否则若不是格式塔，30–120 天后触发本事件。事件排除火山星球和方舟，需要有人口的非母星/非首都、原主人持有的非 AI 殖民地。

At the first anniversary the dispatcher finds *Titanic Life* on the planet. Primal Calling empires get their origin's own event instead (grand_archive.1010, not part of this story); other non-gestalt empires get this event 30–120 days later. Volcanic worlds and arks are excluded.

## 剧情脉络 Story outline

**泰坦巨兽（2）**：本地生物大得超乎想象，是否研究它们？/ The native life is enormous — study it?

- 继续研究 → **研究泰坦巨兽**（3500 社会学）：成功 70% / 失败 30%。/ Proceed → *Titanic Life Study* (3500 society): 70% success / 30% failure.
- 确保研究不伤害它们（仅亲外）→ **监视泰坦巨兽**（5000）：成功 90% / 失败 10%。/ Ensure no harm (xenophile only) → *Titanic Life Monitoring* (5000): 90/10.
- 猎杀并研究（仅排外或蜂巢）→ **解剖泰坦巨兽**（2500）：成功 50% / 失败 50%；立即获得“美味巨兽”类修正（蜂巢、进化掠食者各有版本）。/ Harvest them (xenophobe or hive only) → *Titanic Life Necropsies* (2500): 50/50, plus an immediate "Delicious Titans"-type modifier (hive / Evolutionary Predators variants).
- 不，别管那些巨兽 → 故事结束。/ Leave them alone → the story ends.

## 分支与结局 Branches and outcomes

- **研究成功 Success（101）**：此后可在该星球招募泰坦巨兽；若走“监视”路线，还会清除星球上的泰坦巨兽障碍。/ Titanic Beasts become recruitable; the Monitoring route also clears the Titanic Life blockers.
- **研究失败 Failure（102）**：生成敌对的泰坦巨兽陆军，星球进入驱逐状态；这些陆军被消灭时隐藏事件 colony_mod.103 解除该状态。/ Hostile titan armies spawn and the planet is set to displacement until they are destroyed (hidden colony_mod.103 clears it).

## 条件与文明差异 Conditions and variants

亲外、排外、蜂巢帝国各有专属研究选项；格式塔帝国不会收到本事件；“原始呼唤”起源改走起源事件。/ Xenophile, xenophobe and hive empires have their own study options; gestalt empires never get this event; Primal Calling uses its origin event.

## 审阅记录 Review notes

- 已核对 Checked：事件 2/101/102/103、三个项目的 `on_success` 权重、分派器的泰坦巨兽块。/ Events, the three projects' weights and the dispatcher block.
- 审阅改动 Changes：从合并的“磁力奇迹”故事中拆出为独立故事。/ Split out of the merged modifier-event story.
