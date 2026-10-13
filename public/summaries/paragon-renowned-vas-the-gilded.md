# 万人迷沃斯 / Vas the Gilded

- 分类 Category：银河轶事 C8 stories · 来源 Sources：events/paragon_events_4.txt:1250-1340、3283-3305, 3309-3344、1728–1866（paragon.41234）、15–160（paragon.40000/40001）· DLC：典范 Galactic Paragons · 审阅 Reviewed 2026-10-12

## 如何开始 How it starts

“知名领袖”抽签：每十年（on_decade_pulse_country）隐藏事件 paragon.40000 检查（典范DLC、玩家、非杀戮帝国、已研究外星语言学、近期未招募），按基础1（有招募办公室+2）对“随失败而递增”的权重决定是否在1–360天内抽签（40001）。抽签只放入与本国思潮相符、尚未出现过且未被解雇的领袖；本故事的人物属于**和平**思潮（renowned_pacifist2）。
Renowned leader lottery: each decade hidden paragon.40000 (Paragon, player, not homicidal, Xeno-Linguistics, no recent recruit) may draw within 1–360 days (40001); only leaders matching your ethics, not yet offered and not dismissed are in the pool. This one is **pacifist**.

## 剧情脉络 Story outline

1. 招募对话：珠光宝气的修女，愿任总督与外交官。可反复询问（只显示回答），然后“解雇”或“招募”。
   Recruitment: an opulent Sister offering to serve as governor and diplomat. Ask questions (replies only), then dismiss or enlist.
2. 招募后，每十年隐藏事件 paragon.41234 随机挑选一名知名领袖，对此人按10%/10%/80%抽取下面两段故事之一或都不发生，延迟1–1800天；两段都只发生一次，可在不同的十年里先后出现。
   After hiring, every decade paragon.41234 picks a renowned leader; for this one 10% / 10% / 80% (nothing), 1–1800 days later. Each episode fires once; both may happen in different decades.

- **和平与繁荣 / Peace and Prosperity**（paragon.41210）：奢华宴会凝聚人心：获得修正。
  her lavish feasts unite people: a modifier.
- **在我们需要的时候 / In Our Time of Need**（paragon.41220）：利用人脉与政治影响力在危难时刻相助：获得凝聚力与影响力。
  she uses her contacts and clout in our time of need: unity and influence.

## 分支与结局 Branches and outcomes

- “解雇”：人物回到全局池，但本国设置 dismissed 标记，以后不会再抽到。“招募”：成为知名领袖（李萨拓等人另带舰队）。
  Dismiss: never offered to you again. Enlist: becomes a renowned leader.
- 两段后续是相互独立的随机事件，不是先后两章；领袖死亡或离开后不再发生。
  The two episodes are independent random events, not chapters in order.

## 条件与文明差异 Conditions and variants

- 只有拥有和平思潮的帝国会被提供此人。后续故事的额外条件见上（括号内）。
  Offered only to pacifist empires; extra episode conditions are given in brackets above.

## 审阅记录 Review notes

- 已核对 Checked：40000/40001 抽签与权重（01_script_values_paragon.txt ethic_leader_randomizer）、招募事件全部选项、ethic_leader_hire_effect 设置领袖标记、41234 的分派与权重、后续事件的触发条件、选项与项目。
- 更正 Corrections：原先十六名领袖的招募对话被合成一个故事（按抽签器），而所有后续故事又被合成另一个故事；现按人物拆分，每人一则故事，招募后接各自的后续。
  The lottery-based story and the follow-up story were split into one story per leader.
- 不确定 Uncertain：每十年只随机挑选一名知名领袖进行判定，拥有多名知名领袖时后续可能更晚出现。
