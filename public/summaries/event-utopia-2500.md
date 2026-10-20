# 血肉苦弱 / The Flesh is Weak

- 分类 Category：银河轶事 C8 stories · DLC：乌托邦 / 机械时代 Utopia / The Machine Age

## 如何开始 How it starts

采纳“义体”传统（需飞升天赋“血肉苦弱”与相应科技；蜂巢需“有机-机械接口”天赋；“义体信条”起源另走起源故事）时，按 DLC 与帝国类型三选一（01_cybernetics.txt:56–140）：
Adopting the *Cybernetics* traditions picks one of three versions by DLC and empire type:

1. 无“机械时代”，或“强制重置”起源：事件“血肉苦弱”（utopia.2500）开启同名工程项目（基础500+人口）。
   Without *The Machine Age*, or with the *Hard Reset* origin: *The Flesh is Weak* project.
2. 有“机械时代”的普通帝国：隐藏事件 cyber.1 开启“义体化”局势。
   With *The Machine Age*: the *Cyberization* situation.
3. 有“机械时代”的蜂巢：蜂巢版“义体化”局势。
   With *The Machine Age*, hive minds: the hive version.

本地已安装“机械时代”，因此本地游戏中普通帝国实际出现的是局势版本。
*The Machine Age* is installed locally, so the situation is what this install plays.

## 剧情脉络 Story outline

- 乌托邦版：项目完成 → “义体革命”（2501）：主物种及其他人口改造为义体人，领袖获得义体特质；5天后其他帝国收到通知（2505），观察者见 observer.55。
  Utopia version: project → *A Cybernetic Revolution*; other empires are notified after 5 days.
- 局势版（进度0–1000，基础每月5，约14年；第二阶段起需要“强化改造中心”才会推进）：
  Situation version (progress 0–1000, base 5/month, needs an *Augmentation Center* from stage 2):
  1. 第一阶段：“控制未来”（cyber.100）选择由政府或企业主导；进度100时“取之于民，用之于民”（105）可让独立方取而代之——由此确定一名“对手”（政府/企业/独立方）。
     Stage 1: *Controlling the Future* (government or corporate control); at 100, *By the People, For the People* may hand control to independents — this fixes one rival.
  2. 第二阶段：“强化改造中心”（200）；进度300时“示范项目”（205）选择改造重点。
     Stage 2: *Augmentation Centers*; at 300 *Pilot Projects* picks the focus.
  3. 第三阶段：“首秀”（300）开始每月改造人口；主物种全部改造后且进度600时“义体化反对者”（305）决定如何对待唯心主义者。
     Stage 3: *Rollout* starts monthly conversion; once the main species is converted and progress is 600, *Cybernetic Objectors*.
  4. 第四阶段：只出现与对手对应的一件——“植入体税”（政府，405）、“无保障”（企业，415）或“控制软件攻击”（独立方，425）；进度850时对应的升级事件“司法之战”（410）、“危险设计”（420）或“不自主的强化件”（430）。
     Stage 4: only the current rival's event (405 / 415 / 425), then at 850 its escalation (410 / 420 / 430).
  5. 完成：“强化人口”（21）结束局势；若已完成义体传统，180天后按政体出现“未来震撼”系列之一（505 民主、510 寡头、515 独裁、520 帝制、525 企业）。
     Completion: *An Augmented Population*; 180 days later (with the traditions finished) one *Future Shock* event by authority.
- 蜂巢版：“躯体万千，意志独一。”（2100）→“独一目标：强化改造”（2200）→ 进度300“原型万千，唯选其一。”（2205）→“工蜂万千，计划独一。”（2300）→“思绪万千，大脑独一。”（2400）→ 完成“工蜂万千，意志独一？”（2004）：按累积倾向选择自主或整合蜂巢。
  Hive version: five stage events and a final choice between a volitional or integrated hive.

## 分支与结局 Branches and outcomes

- 三个入口互斥；局势中对手事件与“未来震撼”各只出现一件。405/415/425 现在是第三阶段（首秀）之后的并列互斥分支（08_machine_age_situations.txt:850-857）。
  The three entries are exclusive; rival events and Future Shock show only one each. 405/415/425 now hang as exclusive siblings after stage 3.
- 局势期间另有随机事件池（cyber.5 / cyber.2005 经 on_action 列表抽取，如 cyber.120、160、210、220、260、320、360 与蜂巢 22xx），收录在其他故事中，现以外链连接（cyber.5 每月七选一、蜂巢 2005 六选一，等权，各有进度门槛：00_on_actions.txt:5183-5204）。
  Random situation events from the on_action pools are separate stories, now linked externally (cyber.5 one of seven, hive 2005 one of six; equal weight, own progress gates; 00_on_actions.txt:5183-5204).

## 条件与文明差异 Conditions and variants

- 企业帝国与“强制重置”起源在多处有专属正文和选项；唯心/唯物主义影响“义体化反对者”的选项；和平主义影响“危险设计”。
  Megacorps and *Hard Reset* get their own texts; spiritualist/materialist and pacifist ethics change options.
- 局势推进速度受方针（谨慎/流程化/超载）、传统与事件标记影响，文中的数值是进度门槛，不是日期。
  Progress speed depends on approach, traditions and flags; the numbers are progress gates.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13（r2-mixed）
- 来源 Sources：common/traditions/01_cybernetics.txt:1–141、events/utopia_on_action_events.txt:322–726、common/special_projects/00_projects_utopia.txt:1–32、common/situations/08_machine_age_situations.txt:806–1455、events/machine_age_situation_events_1.txt
- 已核对 Checked：传统 on_enabled 分派、utopia.2500–2510、FLESH_IS_WEAK_PROJECT、两个局势定义（阶段、on_monthly、完成、阻塞条件）、cyber.1–6/20–22/100–430/500–525、cyber.2002–2400。
- 更正 Corrections：月度剧情事件原本全部挂在局势根部，现按进度门槛移到对应阶段之后；完成事件移到第四阶段之后；三个入口与对手事件标为互斥。
  Monthly story events were re-parented after their stages; completion moved after stage 4; exclusive groups added.
- 补审 Completion (2026-10-13)：第四阶段互斥事件用桥接挂到 cyber.300 之后并抑制局势根的直连；月度随机事件池以外链连到 c7a 的各单文档故事。仍有的不确定：进度速度随方针、传统与标记变化。
  Completion: stage-4 rival events bridged after cyber.300 with the direct situation edges suppressed; the monthly random pools are linked externally to c7a's one-doc stories. Remaining uncertainty: progress speed varies with approach, traditions and flags.
