# 君临天下 / Under One Rule

- 分类 Category：起源 Origins · DLC：Galactic Paragons

## 如何开始 How it starts

独裁政体的文明由一位传奇统治者“光耀者”统一。开局隐藏事件 5000 赋予统治者光耀者特质并使其免于普通死亡事件，180–540 天后 5004“承诺”开启“统一承诺”局势。
A dictatorship united by a legendary ruler, the Luminary. Hidden 5000 at game start grants the Luminary trait and protects the ruler from ordinary death events; 180–540 days later 5004 *The Promise* starts the *Unifying Promise* situation.

## 剧情脉络 Story outline

1. **统一承诺**：局势期间可能出现国内问题（5110 海盗、5120 通讯中断、5130 罢工、5140 军中异见、5150 裙带关系，各由一个项目解决），起源议程“君临天下”与各思潮议程会带来光耀者洞见（5305–5370）及“理事会不堪重负”（5014）。局势结束时按兑现的承诺判定 5009“承诺兑现”或 5008“空头承诺”。
   **The Unifying Promise**: domestic problems may surface (5110 pirates, 5120 comms, 5130 strike, 5140 dissidents, 5150 nepotism, each solved by a project); the origin agenda and ethics agendas bring Luminary insights (5305–5370) and the overworked council (5014). At the end 5009 *Promise Delivered* or 5008 *False Promises*.
2. **前路（5020）**：称帝（帝制）或维持独裁。维持独裁时，10–20 年与 20–30 年后分别有“勤勉的领袖”（5059）与“领导的重负”（5058）。
   **What Lies Ahead (5020)**: proclaim an empire or stay a dictatorship; staying brings *Diligent Leader* (5059) and *Burden of Leadership* (5058) after 10–20 and 20–30 years.
3. **帝制路线**：5021 加冕（按思潮获得传奇特质）→ 5–15 年后 5050 反对声浪 → 局势“异见崛起”（阶段事件 5054 → 5055 → 5056）→ 5057 镇压 → 5060 → 5–10 年后 5061 悲剧（继承人身亡）→ 5062 → 局势“改革派诉求”（随机月度事件 5064–5090）→ 5200 → 5210 十字路口。
   **The imperial line**: 5021 coronation (legendary traits by ethics) → 5–15 years later 5050 → situation *Dissidence on the Rise* (stage events 5054 → 5055 → 5056) → 5057 → 5060 → 5–10 years later 5061 (the heir dies) → 5062 → situation *Reformists Demands* (random monthly 5064–5090) → 5200 → 5210 *Crossroads*.
4. **飞升演说**：光耀者超过正常寿命，或完成某类飞升传统后，5201“演说”→ 5202“陨落”：拒绝则光耀者死去；接受则 6000“第二次机会”选择延续方式（维生装置、义体、灵能、合成或基因）→ 6035“新时代”。
   **The ascension speech**: when the Luminary outlives a normal lifespan or an ascension tradition is finished, 5201 → 5202: refusing lets the Luminary die; accepting leads to 6000 *The Second Chance* (apparatus, cybernetic, psionic, synthetic or genetic) → 6035 *A New Age*.

## 分支与结局 Branches and outcomes

- 十字路口（5210）：谈判 → 5220 和平；开战 → 5221 内战 → 5223“一统天下”；处决（妄想程度≥10）→ 5222；倒向改革派（光耀者死去、政体改为民主）→ 5211 → 赢得内战 5213。
  Crossroads: negotiate → 5220 peace; war → 5221 → 5223 *One Rule*; executions (delusion ≥ 10) → 5222; side with the reformists (the Luminary dies, democracy) → 5211 → 5213 on winning the civil war.
- 6035“新时代”：维持现状，或改行民主/寡头制，起源变为默认（光耀者特权结束）。 *A New Age*: keep things, or adopt democracy/oligarchy and return to the default origin.
- 光耀者在任何时候去世 → 5900，起源转为“光耀者已逝”。灵能光耀者每月需要泽珞（6030），否则死去。
  If the Luminary dies at any point → 5900; a psionic Luminary needs Zro every month (6030) or dies.

## 条件与文明差异 Conditions and variants

- 首个殖民地：开始殖民 5005，建成 5010 → 三种纪念方式 5011/5012/5013。 First colony: 5005 on starting, 5010 on completion → 5011/5012/5013.
- 外交里程碑（各一次、顺序不定）：组建联邦 5023、成为宗主 5025、胜战 5027、败战 5029、沦为附庸 5033、成为银河皇帝 5039、成为银河守护者 5038。
  Diplomatic milestones (each once, any order): 5023, 5025, 5027, 5029, 5033, 5039, 5038.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-12
- 来源 Sources：`events/origin_events_paragon.txt:1-5277`、`common/situations/05_paragon_situations.txt:872-1290`、`common/council_agendas/00_council_agendas.txt:143-212`、`common/council_agendas/00_council_agendas_ethics.txt`、`events/game_start.txt:522-526`、`common/on_actions/00_on_actions.txt`
- 本导读是审阅者的说明文字，不是游戏原文。 This guide is reviewer commentary, not game text.
- 已核对 Checked：事件文件全部窗口与隐藏路由、三个局势定义、相关议程、开局与 on_action 钩子。 All windows and hidden routers, three situations, related agendas, start and on_action hooks.
- 更正 Corrections：原树只有 5004 一个入口，其余 30 处以根节点孤立入口出现；现以 8 个入口、19 条状态连接组织，并补互斥组与 5 个结局。地图标签沿用游戏中的“光耀者”称呼（V3 曾写作“启明者”）。
  Only 5004 was an entry and 30 docs floated at the root; now 8 entries, 19 state bridges, exclusive groups and five endings. Map labels use the game's term for the Luminary.
- 不确定 Uncertain：改革派内战的结束取决于战争结果与隐藏保底事件 5950，只展示路线。 The civil-war ending depends on war outcomes and the hidden failsafe 5950; routes only.
