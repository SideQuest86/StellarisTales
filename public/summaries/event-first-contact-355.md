# 谜语人 / Speaking in Riddles
- 分类 Category：文明纪事 Society (C7) · 首次接触阶段链 first-contact stage chain（首个事件「谜语人」first_contact.350）

## 如何开始 How it starts

首次接触第二阶段（default_stage_2）按权重抽取故事线；“谜语人”权重 5，若本方已有此链标记 first_contact_speaking_in_riddles_chain、本方为格式塔且已与常规帝国通讯、本方或对方为“灭绝”倾向、或对方为格式塔，则权重为 0（`00_first_contact.txt:454–486`）。/ In stage 2 the game draws one storyline by weight; Speaking in Riddles has weight 5 and is excluded once the empire has had the chain, for gestalt observers who already talk to a regular empire, for homicidal empires, or gestalt contacts.

## 剧情脉络 Story outline

1. **谜语人（350）**：单一选项，根据对方的首次接触政策进入“谜语收尾阶段”（对方主动：难度5；否则：难度7）。/ One option; the other empire’s policy picks the proactive (difficulty 5) or cautious (difficulty 7) end stage.
2. **一种隐喻语言（355）**（阶段完成后触发）：A 用“低级语言”接触并结束；B → 356。/ After the stage completes, A finishes with the low speech; B goes on to 356.
3. **联系对方（356）**：随机决定两种问候语中哪一种“正确”（各 50%），选A或B → 说对 357 / 说错 358；C 放弃。/ A random coin decides which of two greetings is right; a right choice leads to 357, a wrong one to 358; C gives up.

## 分支与结局 Branches and outcomes

- 357：说对 → 良好印象；选项 C 另得间谍网加成。/ Right greeting: good impression, option C grants a spy-network modifier.
- 358：说错 → 极大冒犯。/ Wrong greeting: they are very insulted.
- 355.A、356.C：以“不太聪明”意见修正直接结束。/ 355.A and 356.C end with a not-very-intelligent opinion modifier.
- 所有收尾选项都调用 finish_first_contact_effect（建立正式通讯，之后按帝国类型转入后续事件，如反向接触、教程、商队等），并调用 first_contact_inform_intel。 / Every ending option calls finish_first_contact_effect (opens regular communications, then routes to follow-ups such as reverse first contact, tutorial, caravaneer events) and first_contact_inform_intel.

## 条件与文明差异 Conditions and variants

355 的文本对格式塔与非格式塔不同；357 的选项文字按排外与否变化。/ 355 has gestalt and non-gestalt text; 357’s option text depends on xenophobia.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（c7b-society）
- 来源 Sources：`events/first_contact_events.txt:4908–5180` · `common/first_contact/00_first_contact.txt:453–486, 1544–1581`
- 已核对 Checked：350–358 全部脚本、default_stage_2 条目、两个谜语收尾阶段（`00_first_contact.txt:1544–1581`）。/ Scripts 350–358, the stage-2 entry and both end-stage definitions.
- 审阅改动 Changes：原先 355 单独成篇，350 混在“难以捉摸的外星人”中；现用阶段连接把 350→355 串成一棵树并并入本篇（story event-first-contact-355 现含 350）。/ 355 used to be a separate story and 350 sat in the stage-2 pile; a stage bridge now links 350 → 355 and both live here.
- 注意 Note：阶段完成后的触发是“进度检定”，成功才触发该事件；失败时按 on_roll_failed 的随机池处理（谜语收尾阶段失败池为 no_events 之外的设置见阶段定义）。/ A stage fires its event only when its progress roll succeeds; failures go through the stage’s on_roll_failed pool.
