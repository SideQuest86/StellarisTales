# 遭遇 / Encounter（首次接触主线 the main first-contact line）
- 分类 Category：文明纪事 Society (C7) · 首次接触 first contact（入口事件 first_contact.1）

## 如何开始 How it starts

两个帝国第一次相遇时，游戏创建“首次接触站点”，运行 base_contact_set（难度2）：对普通国家发出 first_contact.1；对龙（Here Be Dragons）、跳跃旅者、奴隶主（Payback / Broken Shackles）、Cutholoid、被放逐者等特殊国家类型改发各自的开场事件（权重 1000，`common/first_contact/00_first_contact.txt:7–141`）。/ When two empires meet, the game creates a first-contact site and runs base_contact_set (difficulty 2): ordinary countries get first_contact.1; special country types (dragons, jaunting traveler, slavers, cutholoids, exiled) get their own opener at weight 1000.

## 剧情脉络 Story outline

首次接触是一台“阶段机”：事件的选项不直接指向下一事件，而是 set_first_contact_stage 设定下一个阶段，阶段结束后（按难度检定）再触发该阶段的事件（见 README）。本篇和同类篇里的“进入阶段”连线就是这些隐藏跳转。/ First contact is a stage machine: options set the next stage and the stage fires its event later; the “Stage:” links are those hidden hand-offs.

1. **遭遇（1）**：单一选项，进入默认第一阶段（难度5），按条件加权抽取 **5 / 10 / 15 / 20 / 25**（见分支标签）。/ One option into stage 1, which draws 5, 10, 15, 20 or 25.
2. **第一阶段事件**：每个都有“攻击”选项（需允许攻击政策；进入敌对阶段，见 event-first-contact-250）和平和选项：同族 → **101**；双方机械 → **102**（失落殖民地 **1020**）；双方蜂巢 → **105**；否则进入第二阶段。/ Each offers attack (hostile route) or a peaceful option routed by relationship.
3. **第二阶段（难度7）**按权重抽取一条故事线：标准开场 **50**（对方非主动，权重80）/ **60**（对方主动，权重80），或特殊故事线——蜂巢遇常规帝国(380，event-first-contact-385)、机械遇有机(390，event-first-contact-395)、谜语人(350，event-first-contact-355)、恐怖噪音(365，-375)、表面敌意(400，-405)、频率问题(415，-420)、光影展示(430，-435)、色彩语言学(5070，-5071)、诗歌(450，-480)、异星晚宴(1120，-1120)、穿梭机审判(5080，-5085)。/ Stage 2 draws a storyline: the standard 50/60 or one of the special chains listed (each has its own story).
4. **50**：A/B 进入通用谨慎收尾阶段（难度7）；C（仅非主动政策）→ 入侵阶段（event-first-contact-200）。**60** → 通用主动收尾阶段（难度5）。收尾事件 100 / 103 / 104 是共享的收尾页。/ 50: A/B generic cautious end, C hacking; 60: proactive end; 100/103/104 are the shared closing pages.

## 分支与结局 Branches and outcomes

- 第一阶段五个事件互斥；50/60 互斥；特殊替代入口（2000/3000/4000/grand_archive.2800）取代 first_contact.1。/ Exclusive sets as annotated.
- 提前收尾：101（同族）、102/1020（机械）、105（蜂巢）。/ Early endings.
- 阶段难度检定失败时按各阶段的 on_roll_failed 随机池触发杂项事件（early/late/hostile_fc_random_events）。/ Failed progress rolls fire the stage’s on_roll_failed random pool.

## 条件与文明差异 Conditions and variants

遭遇与第一阶段事件有大量按伦理、格式塔、机械、游牧、荒野帝国的文本变体；101 的选项依政策和是否曾试图攻击。/ Many ethic / gestalt / nomad text variants; 101’s options depend on policy and on an earlier attack attempt.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（c7b-society）
- 来源 Sources：`events/first_contact_events.txt:11–1313, 1557–1699, 1955–1983` · `common/first_contact/00_first_contact.txt:1–768, 937–1038` · `common/first_contact/99_README_FIRST_CONTACT.txt`
- 已核对 Checked：first_contact.1、5–25、50、60、101、102、1020、105 脚本；default_stage_1/2 阶段全部条件与权重；base_contact_set；各 set_first_contact_stage 调用。/ Scripts and stage definitions.
- 审阅改动 Changes：把 event-first-contact-1、-5、-50（以及 101/102/105/1020 四个提前收尾）并为一条主线；各特殊故事线拆为独立篇章（355、375、405、420、435、480、5071、1120、5085、385、395、200、250），不再混在“难以捉摸的外星人”里。/ Stories 1, 5 and 50 and four early-ending singles are merged into one main line; each special storyline has its own story.
- 请求 Request：leviathans.98 是特殊首次接触事件 → 隐藏的 leviathans.97 的 720 天后续，归利维坦篇所有。/ leviathans.98 is a delayed follow-up of the special contacts and belongs to the leviathan stories.
