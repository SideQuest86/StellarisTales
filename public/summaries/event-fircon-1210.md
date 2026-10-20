# 万爪之母 / The Many-Tentacled One

- 分类 Category：文明纪事 Society (C7)

## 如何开始 How it starts

- 隐藏事件 fircon.1200 在五年脉冲池中权重为5；需 First Contact DLC，每个帝国一次（jaunting_traveler_chain）。它创建虚拟国家“万爪之母”并自动启动首次接触，三个阶段按普通首次接触的检定推进。
  Hidden event fircon.1200 sits in the five-year pulse pool with weight 5; needs the First Contact DLC, once per country (jaunting_traveler_chain). It creates the "Many-Tentacled One" dummy country and starts a first-contact procedure with three stages.

## 剧情脉络 Story outline

- 阶段1（难度3）1210「建立联络」→ 阶段2（难度2）1211「万爪之母」→ 最终阶段（难度3）1212「迷失旅行者」。
  Stage 1 (difficulty 3) 1210 "Communication Established" -> stage 2 (difficulty 2) 1211 "The Many-Tentacled One" -> final stage (difficulty 3) 1212 "Lost Traveler".
- 任一阶段检定失败时，有1/20的机会触发随机事件（之后125天冷却）：1220「食物中毒」或 1221「外交事故」（权重各1，各至多一次）。
  A failed roll in any stage has a 1-in-20 chance of a random event (then a 125-day cooldown): 1220 "Food Poisoning" or 1221 "Diplomatic Accident" (weight 1 each, each at most once).
- 1212 三个结局：和平（她成为通灵科学家领袖；60+随机30天后 1230，1800+随机360天后思乡事件 1231）；实验室（社会研究奖励）；牺牲（团结奖励）。
  1212 has three endings: pacific (she becomes a psionic scientist leader; 1230 after 60 days + random 30, homesickness 1231 after 1800 + random 360); lab (society research); sacrifice (unity).
- 1230（非排外且主种族通灵）可启用 THE_JAUNT_PROJECT（1080天）：进度25%→1240、75%→1241；完成后 10% → 1243「成功」（获得跃迁引擎科技进度/研究），90% → 1242「失败」（工程研究，设“秘密已揭示”标志）。
  1230 (non-xenophobe, psionic main species) can enable THE_JAUNT_PROJECT (1080 days): 25% -> 1240, 75% -> 1241; on completion 10% -> 1243 "success" (Psi Jump Drive progress or research), 90% -> 1242 "failure" (engineering research, sets the secret-revealed flag).
- 1231「思乡」：关心她则10年后 1232「告别」，否则5年后；告别后有20%概率在20年后收到礼物 1233。
  1231 "Homesickness": showing concern keeps her 10 years before 1232 "Goodbye", otherwise 5; after goodbye there is a 20% chance of a gift (1233) 20 years later.

## 分支与结局 Branches and outcomes

- 三个结局互斥；1220/1221 互斥地随机；1242/1243 互斥。
  The three endings are exclusive; 1220/1221 are a random pair; 1242/1243 are exclusive.

## 条件与文明差异 Conditions and variants

- 和平结局名称随是否排外而异；机械/集体意识帝国在1230、1240-1243 有不同措辞。
  The pacific option text varies with xenophobia; machine and gestalt empires see different wording in 1230 and 1240-1243.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：`events/first_contact_dlc_events.txt:511-1108`；`common/first_contact/02_first_contact_unique_stories.txt:177-232`；`common/on_actions/00_on_actions.txt:505`；`common/scripted_effects/first_contact_effects.txt:1818-1836`；`common/special_projects/00_projects_first_contact_dlc.txt:286-325`
- 已核对：fircon.1200 触发、三阶段与失败池、1212 选项条件、项目权重、思乡事件延迟。
  Checked: fircon.1200 trigger, the three stages and the failure pool, 1212 option conditions, the project weights, the homesickness delays.
- 更正：1210、1211、1220、1221 原为各自孤立的单窗口故事，1212 只含后半段；现合并成一条首次接触故事。
  Correction: 1210, 1211, 1220, 1221 were isolated one-window stories and 1212 only held the second half; now one first-contact story.
