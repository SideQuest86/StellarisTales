# 邀请 / The Invitation（异星晚宴 Xeno Dinner Party）
- 分类 Category：文明纪事 Society (C7) · 首次接触阶段链 first-contact stage chain（首个事件「邀请」first_contact.1120）

## 如何开始 How it starts

第二阶段抽取，权重 5；本方有此链标记、为格式塔、灭绝倾向或政策允许攻击则为 0；对方为格式塔，或对方非主动政策且亲异族，也为 0（`common/first_contact/00_first_contact.txt:706–738`）。/ Stage-2 weight 5; zero if the owner had the chain, is gestalt, homicidal or has the attack-allowed policy; zero for gestalt contacts and for non-proactive xenophile contacts.

## 剧情脉络 Story outline

1. **邀请（1120）**：对方在边境停泊飞船，邀请我方代表参加为期数日的文化交流。A 接受 / B 拒绝。/ The aliens invite a representative to a multi-day cultural exchange; A accepts, B refuses.
2. 接受 → **准备（1125）**：A 学习机会 / B 趁机刺探情报（设标记）→ 赛前阶段 → **赛前（1130）**。/ Accepted → Mise En Place (1125): learn, or covertly gather intel (sets a flag) → Pre-Game (1130).
3. 拒绝 → **第二次机会（1135）**：A 勉强出席 → 回到 1130；B 再次拒绝 → **1165 不就是不**。/ Refused → Second Chances (1135): attend → back to 1130; refuse again → 1165.
4. **赛前（1130）**：A 尽情投入 / B 谨慎克制 / C（仅有间谍标记时）行动，结果见下。/ A embrace, B stay professional, C (spy flag only) begin the operation.

## 分支与结局 Branches and outcomes

- A/B：双方恰有一方为岩石体质 → **1160 渴望连接**；否则随机 **1150 聚会明星** / **1155 扫兴**（A 60:40，B 40:60，受魅力/可憎/有害特质修正）。/ Lithoid mismatch → 1160; else 1150 or 1155 by a weighted roll.
- C：随机 **1140 被抓** / **1145 成功**，加密/解密比各 +100。/ 1140 or 1145, shifted by encryption vs decryption.
- 所有收尾选项都调用 finish_first_contact_effect（建立正式通讯，之后按帝国类型转入后续事件，如反向接触、教程、商队等），并调用 first_contact_inform_intel。 / Every ending option calls finish_first_contact_effect (opens regular communications, then routes to follow-ups such as reverse first contact, tutorial, caravaneer events) and first_contact_inform_intel.

## 条件与文明差异 Conditions and variants

1120 对游牧帝国有单独文本；1130 选项由间谍标记决定。/ 1120 has nomad text; 1130’s options depend on the spy flag.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（c7b-society）
- 来源 Sources：`events/first_contact_events.txt:8287–8870` · `common/first_contact/00_first_contact.txt:705–738, 2244–2420`
- 已核对 Checked：1120–1165 脚本，9 个晚宴阶段，第二阶段条目。
- 审阅改动 Changes：把 1120 与 1125–1165 九个单页并成一棵树（原各自为篇），按选项连接阶段，并标出互斥结局组。/ The ten events (formerly one story each plus the entry in the stage-2 pile) are now one tree; mutually exclusive endings are grouped.
