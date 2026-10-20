# 诗歌 / Poetry
- 分类 Category：文明纪事 Society (C7) · 首次接触阶段链 first-contact stage chain（首个事件「诗歌」first_contact.450）

## 如何开始 How it starts

第二阶段抽取，权重 2；本方有此链标记或为格式塔、对方为格式塔则为 0，且对方必须采用“主动”首次接触政策，否则为 0（`common/first_contact/00_first_contact.txt:679–704`）。/ Stage-2 weight 2; zero if the owner already had the chain or is gestalt, if the contact is gestalt, or if the contact is not on the proactive first-contact policy.

## 剧情脉络 Story outline

**诗歌（450）**：对方信号富有节奏、令人平静。五个选择：/ Five choices:
- A 战歌（非和平主义者）→ 隐藏随机三选一：455 对方不悦（→通用谨慎收尾）；460 对方回以战歌（→诗歌收尾阶段→480）；462 战歌反噬开火，并进入敌对收尾阶段（→475）。/ Battle chant → hidden random: offence (455), war chant exchange (460 → 480) or backfire (462 → 475).
- B 探索诗歌 → 465 交换诗歌 → 诗歌收尾阶段 → **480**。/ Discovery poem → 465 → 480.
- C 友谊诗（非排外者）→ 对方亲异族则 470 调戏 → 花言巧语收尾阶段 → **490**；否则 472 无回应（通用谨慎收尾）。/ Friendship poem → 470 → 490 if the contact is xenophile, else 472.
- D 晦涩之物 → 474 随机噪音 → 达达收尾阶段 → **485**。/ Something enigmatic → 474 → 485.
- E 没时间 → 直接进入通用主动收尾阶段。/ No time → generic proactive end stage.

## 分支与结局 Branches and outcomes

475 / 480 / 485 / 490 为四种专属结局；455、472、E 落入通用收尾。/ Four dedicated endings (475, 480, 485, 490); 455, 472 and option E fall into the generic end.
所有收尾选项都调用 finish_first_contact_effect（建立正式通讯，之后按帝国类型转入后续事件，如反向接触、教程、商队等），并调用 first_contact_inform_intel。 / Every ending option calls finish_first_contact_effect (opens regular communications, then routes to follow-ups such as reverse first contact, tutorial, caravaneer events) and first_contact_inform_intel.

## 条件与文明差异 Conditions and variants

选项 A 要求本方非和平主义；C 要求非排外。/ Option A needs a non-pacifist owner; C needs a non-xenophobe.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（c7b-society）
- 来源 Sources：`events/first_contact_events.txt:6738–7170, 8017–8030` · `common/first_contact/00_first_contact.txt:678–704, 2169–2243`
- 已核对 Checked：450–490、462 脚本及五个诗歌阶段、第二阶段条目。
- 审阅改动 Changes：原 event-first-contact-475/480/485/490 四篇单页合并入本篇，450 为根。/ The four single-event stories 475, 480, 485 and 490 are merged here under root 450.
- 不确定 Uncertain：各结局的好感修正数值在 opinion_modifiers 中，未逐项核对。/ Opinion modifier values not checked.
- 2026-10-13 r3-inherit：事件继承修复（base = 其他事件）后复查：对照游戏文件核对了现在可见的继承标题、选项与分支，结构无需改动。
  2026-10-13 r3-inherit: re-checked after the event-inheritance fix (base = other event): the inherited titles, options and branches now visible in the tree were compared with the game files; no structural change needed.
