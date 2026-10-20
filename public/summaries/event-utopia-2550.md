# 合成嬗变 / Synthetic Transformation

- 分类 Category：银河轶事 C8 stories · DLC：乌托邦 / 机械时代 Utopia / The Machine Age

## 如何开始 How it starts

采纳“合成”传统（需飞升天赋“合成进化”与相应科技）时按 DLC 二选一（01_synthetics.txt:34–110）：有“机械时代”时隐藏事件 synth.1 开启“合成化”局势（“合成繁衍”起源另走起源故事）；无该DLC的非机械帝国才出现事件“合成嬗变”（utopia.2550）与工程项目“合成进化”。本地已安装“机械时代”，因此本地游戏实际出现的是局势版本。
Adopting the *Synthetics* traditions: with *The Machine Age* the *Synthesization* situation starts (Synthetic Fertility has its own); only without that DLC does a non-machine empire get *Synthetic Transformation* and the *Synthetic Evolution* project. The Machine Age is installed locally.

## 剧情脉络 Story outline

- 乌托邦版：项目（基础1000+2×人口）完成 →“合成人时代”（2551）：全部有机人口、领袖、军队与殖民船改为合成人；5天后其他帝国收到通知（2555），10天后收到公开宣告（2556）；若有与其通讯的狂热唯心堕落帝国（否则一个狂热唯心帝国），15天后本国收到其回应（2558）。
  Utopia version: project → *The Synthetic Age*; notices to others after 5 and 10 days; a fanatic spiritualist (Fallen) empire replies after 15 days.
- 局势版（进度0–1000，基础每月5；需要“人格复合体”建筑才推进）：
  Situation version (progress 0–1000; needs an *Identity Complex*):
  1. “启动阶段”（synth.100）→ 进度100时“优化版本”（105）选择优先转化的阶层。
     *Booting Up* → at 100 *Better Builds*.
  2. “精神哲学”（200）：选择如何应对反对声音，180–210天后且进度350时“执着过去”（205），可资助遗产或放任出现抵抗。
     *Philosophy of Mind* → *Clinging to the Past*.
  3. “大规模人格上传”（300）开始逐月转化人口；按是否出现抵抗，360–390天后且进度600时出现“合成旅游”（305，旧城区）或“抵抗”（310，生物保留地），二者互斥。
     *Mass Identity Upload* → either *Synthetic Tourism* or *The Resistance*.
  4. “完美复制体”（400）→ 180–210天后且进度850时“多样化人格”（405）选择后续科技方向。
     *A Perfect Copy* → *Diversifying Identities*.
  5. 完成：“人口合成化”（4）结束局势；若已完成合成传统，180天后按政体出现一件“数字重构”（505–525）。
     *A Synthetic Population*; 180 days later one *Digital Refactoring* event by authority.

## 分支与结局 Branches and outcomes

- 两个入口互斥；305/310 互斥；“数字重构”五件按政体只出现其一（与“合成繁衍”起源共享）。
  Entries, 305/310 and the five *Digital Refactoring* events are each exclusive.
- 局势随机事件池（synth.5 经 on_action 列表抽取：synth.120、160、220、260、320、360）收录在其他故事中。
  The random pool events are separate stories.

## 条件与文明差异 Conditions and variants

- 唯物主义、唯心主义、纪念主义、企业、平等主义、亲外帝国在多处有不同选项；“强制重置”起源的完成事件有专属正文。
  Several ethics and authorities change options; Hard Reset has its own final text.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-12
- 来源 Sources：common/traditions/01_synthetics.txt:1–129、events/utopia_on_action_events.txt:882–1286、common/special_projects/00_projects_utopia.txt:34–64、common/situations/08_machine_age_situations.txt:1543–1775、events/machine_age_situation_events_2.txt:13–1768
- 已核对 Checked：传统 on_enabled 与 tradition_swap、utopia.2550–2558、SYNTHETIC_EVOLUTION_PROJECT、局势定义、synth.1–5、100–405、2、4、500–525 的触发与调度。
- 更正 Corrections：月度事件原本全部挂在局势根部，现按调度与进度门槛移到对应阶段之后；完成事件移到第四阶段之后；入口与互斥结果分组。
  Monthly events re-parented; completion moved after stage 4; exclusive groups added.
- 不确定 Uncertain：局势时长依方针、传统与事件标记而变；“数字重构”与“合成繁衍”起源共享，只核对了本线如何到达。
