# 恐怖噪音 / Monstrous Noises
- 分类 Category：文明纪事 Society (C7) · 首次接触阶段链 first-contact stage chain（首个事件「恐怖噪音」first_contact.365）

## 如何开始 How it starts

第二阶段抽取故事线时，“恐怖噪音”权重 5：本方已有此链标记、本方为格式塔或灭绝倾向、对方为格式塔则为 0；对方好战 ×2.5，对方为荣誉战士 AI 或狂热净化者 ×4（`common/first_contact/00_first_contact.txt:489–527`）。/ Drawn in stage 2 with weight 5; zero for empires that already had the chain, gestalt or homicidal owners and gestalt contacts; ×2.5 if the contact is militarist, ×4 if it is an honorbound-warriors AI or fanatic purifiers.

## 剧情脉络 Story outline

1. **恐怖噪音（365）**：对方发出威胁性轰鸣。三选一：/ Booming, grinding signals; three choices:
   - A 不理会（获得5400天“未回应挑战”修正）→ 无行动收尾阶段（对方主动难度5 / 谨慎难度7）→ 378 或 379。/ Ignore → no-action end stage → 378 or 379.
   - B 回敬威胁噪音 → 隐藏随机 9:1：9 进入“回应通知”阶段（难度0）→ 370 → 回应收尾阶段（难度3）→ 375 / 376 / 377；1（和平主义对方除外）→ 500 战斗，随后通用谨慎收尾阶段。/ Return threatening noises → hidden 9:1: usually the notification stage → 370 → end stage → 375/376/377; rarely a fight (500).
   - C 备战（5400天备战修正）→ 通用收尾阶段（100/103/104）。/ Prepare for war → generic end stage.

## 分支与结局 Branches and outcomes

- 回应后：375（对方是净化者）、376（对方好战，通过考验）、377（侮辱）互斥。/ After answering: 375 / 376 / 377 are exclusive.
- 未回应：378（错过了挑战，对方好战或为净化者）、379（不回应是对的，对方不是净化者）互斥。/ After silence: 378 (missed the challenge; militarist or purifier contact) / 379 (right not to respond; non-purifier) are exclusive.
- 500/505：对方开火（与“表面敌意”链共用，500 也可由 400.A 到达）。/ 500/505 fire a fight; 500 is shared with the Apparent Hostility chain (400.A).
- 所有收尾选项都调用 finish_first_contact_effect（建立正式通讯，之后按帝国类型转入后续事件，如反向接触、教程、商队等），并调用 first_contact_inform_intel。 / Every ending option calls finish_first_contact_effect (opens regular communications, then routes to follow-ups such as reverse first contact, tutorial, caravaneer events) and first_contact_inform_intel.

## 条件与文明差异 Conditions and variants

选项名称随本方好战、和平、亲异族而变；375、376 的选项文字按军国、排外、唯物等分支。/ Option labels vary with militarist / pacifist / xenophile ethics.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（c7b-society）
- 来源 Sources：`events/first_contact_events.txt:5182–5613, 7992–8045` · `common/first_contact/00_first_contact.txt:488–527, 1584–1740`
- 已核对 Checked：365–379、500/505 脚本，阶段 default_stage_2 条目与 default_monstrous_noises_* 四个阶段，权重及零权重条件。
- 审阅改动 Changes：把 365 与 370/375–379 并成一篇（原 event-first-contact-375 仅含 375–377）；用阶段桥连接 365→370/378/379 与 370→375–377，并标出互斥结局。/ Previously only 375–377 formed a story and 365 sat in the stage-2 pile; stage bridges now give one tree.
- 不确定 Uncertain：阶段检定公式与失败池在引擎内。/ Roll formula is engine code.
