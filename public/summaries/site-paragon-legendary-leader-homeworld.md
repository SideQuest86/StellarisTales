# 瓦格罗人废墟 / Vagrosian Ruins

- 分类 Category：先驱者与考古 Precursors · DLC：《典范》Paragon（脚本文件 08_paragon_arc_sites） Paragon

## 如何开始 How it starts

遗址权重为0，由星系初始化器 legendary_leader_last_site 创建（common/solar_system_initializers/paragon_initializers.txt:783）：传奇领袖基德斯（Keides）的故乡。遗址必须由基德斯本人发掘。

Weight 0: created by the system initializer legendary_leader_last_site (common/solar_system_initializers/paragon_initializers.txt:783), the homeworld of the legendary leader Keides. The site must be excavated by Keides himself.

## 剧情脉络 Story outline

瓦格罗人的行政星球：基德斯坐上“继承者”王座，通过幻视看到了族人被异星主人审判、被迫交出“钥匙”、把他作为种子送入太空的真相。发掘结束后他提交一份报告。

1. 行政中心？：“权力中心？”：以行政为主的巨型广场城市
2. 保险库：地下保险库里的空冷冻舱与王座状基座
3. 强制幻视：基德斯坐上王座，昏迷抽搐后醒来
4. 幻视报告其一：第一份幻视报告：巨舰降临，宣告审判，钥匙将被收走
5. 幻视报告其二：第二份报告：一个月的期限和绝望中的求生计划
6. 幻视之终结：幻视终结：作为“继承者”的基德斯被送入太空，钥匙碎片散落银河
7. 发掘完成：基德斯再次坐上王座，先人的记忆平静地流入他

The Vagrosian administrative world: Keides sits on the Scion's throne and sees how his people were judged by off-world masters, forced to give up their Keys, and sent him into space as a seed. He then files his excavation report.

1. Seat of Power?: an administrative city of vast squares
2. The Vault: a vault of empty cryo-pods and a throne-like pedestal
3. Forceful Visions: Keides sits on the throne, convulses and wakes
4. First Vision Report: first vision: a ship descends and announces judgement; the Keys will be taken
5. Second Vision Report: second vision: a month's grace and a survival plan
6. Visions' End: visions' end: the Scion Keides is launched, a fragment of the Key scattered
7. Excavation Concluded: excavation concluded: the memories flow into him calmly

## 分支与结局 Branches and outcomes

- 瓦格罗人发掘汇报 / Vagrosian Excavation Report：15–45天后：基德斯的发掘汇报（对话）。获得特质“先祖的知识”；选项“钥匙呢？”仅在条件满足时出现，其余选项决定他今后的志向（科学、军事、统治） / 15-45 days later: Keides' excavation report (a conversation). He gains the trait legendary_ancestors_knowledge; "What of the Key?" appears only under its condition and the other answers shape his future (science, military, rule)

## 条件与文明差异 Conditions and variants

- 本遗址的 on_roll_failed 把事件池参数设为 no_events（不存在同名事件池），所以掷骰失败不会触发随机意外。 / The site passes RANDOM_EVENTS = no_events to its roll-failure effect (no pool of that name exists), so a failed roll triggers no incident.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：common/archaeological_site_types/08_paragon_arc_sites.txt:3；events/paragon_events_3.txt:2998；common/solar_system_initializers/paragon_initializers.txt:783
- 已核对：遗址定义（common/archaeological_site_types/08_paragon_arc_sites.txt:3）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/08_paragon_arc_sites.txt:3) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
