# 矿物短缺 / Mineral Shortages
- 分类 Category：文明纪事 Society (C7) · 资源赤字情境 resource-deficit situation
- 来源 Sources：`common/situations/02_deficit_situations.txt:316` · `events/situation_deficit_events.txt` · `common/scripted_effects/first_contact_dlc_effects.txt:2960-3020`
- 审阅 Reviewed：2026-10-13（c7b-society）

## 如何开始 How it starts

资源赤字情境是引擎在该资源出现实际赤字时开始的（脚本中没有 start_situation 调用，仅在 `first_contact_dlc_effects.txt:2960–3020` 等处按类型引用）；初始进度 15，共四个阶段（进度 25 / 50 / 75 / 100），每个阶段的惩罚递增：民用经济外交权重 −10%…−50%、人口组装减慢、舰船伤害与航速 −20%…−80%（非生物舰船）、机械帝国的科研劳动力 −33%…−75%（`02_deficit_situations.txt:1–16, 16–300`）。每月进度：赤字时增加“赤字进度值”，收入不为负时 −5，有库存缓冲时 −1；平民难度 ×0.1、学员难度 ×0.5（对非AI）。进度满即“破产”；情境被中止时按资源给予救助金。 / The engine starts a resource-deficit situation when the country has an actual deficit of that resource (no start_situation call exists in the shipped scripts; only type switches in first_contact_dlc_effects.txt:2960–3020). It begins at progress 15 with four stages (25 / 50 / 75 / 100) whose penalties escalate: diplomatic economy weight −10%…−50%, slower pop assembly, ship damage and speed −20%…−80% (non-bio ships), machine research workforce −33%…−75%. Monthly progress rises with the deficit, falls by 5 when income is not negative and by 1 with a stockpile; civilian difficulty ×0.1, cadet ×0.5 for humans. Full progress is bankruptcy; aborting grants a bailout.

## 剧情脉络 Story outline

1. **情境“矿物短缺”**：路线（approach）：无作为 / 削减投资。/ Approaches: do nothing / cut investment.
2. **进入第四阶段（进度 ≥75）→ deficit.125 失控的赤字**：A 向支持者借款（仅当统治者有所属派系）/ B 从被掠夺的星球上重新分配资源（需有被掠夺星球）/ C 一切按计划进行。 / A borrow from supporters (needs a ruler faction), B reallocate resources from a looted planet, C everything goes to plan.
3. **进度满 → deficit.130 破产！**：违约并大幅削减开支（意识集合则强制重新分配资源）。/ Progress complete → bankruptcy event deficit.130: the country defaults and makes sharp cutbacks.

## 分支与结局 Branches and outcomes

没有分叉结局：要么在进度满前把赤字扭转（情境失败 = 解除），要么破产。/ No branching ending: either the deficit is reversed before completion (the situation fails and ends) or bankruptcy follows.

## 条件与文明差异 Conditions and variants

意识集合/机械帝国有不同文本与惩罚；破碎枷锁/分离主义者的相关支援会在阶段2–4提供少量资源。/ Gestalt and machine empires have different texts and penalties; separatist help (Fear of the Dark) adds small resources in stages 2–4.

## 审阅记录 Review notes

- 已核对 Checked：情境定义、阶段惩罚、进度公式、路线，以及阶段四和破产事件。/ Situation definition, stage penalties, progress formula, approaches and the stage-4 and bankruptcy events.
- 审阅改动 Changes：编译结构正确（情境 → 阶段四事件 → 破产事件）；补充了共同机制与本资源的路线。/ The compiled structure was correct; the shared mechanism and this resource’s approaches are documented.
- 不确定 Uncertain：情境的开始由引擎判定，脚本里看不到。 / The start of the situation is engine-side and not visible in the scripts.
