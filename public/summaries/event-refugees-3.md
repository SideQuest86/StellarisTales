# [Root.GetSpeciesName]难民抵达 / [Root.GetSpeciesName] Refugees Arrive

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany · 来源 Sources：`events/refugee_events.txt:10-258`、`common/scripted_effects/refugee_effects.txt:1-130,236-262`、`common/on_actions/00_on_actions.txt:2176,3326` · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

有两条路径进入同一个窗口 refugees.1：(1) 人口被迫迁出（on_pop_displaced，common/on_actions/00_on_actions.txt:3326）→ 隐藏 refugees.3 → refugees.4；(2) 危机方轰炸行星（on_planet_bombarded，common/on_actions/00_on_actions.txt:2176）→ 隐藏 refugees.5 → 45–90天后 refugees.6（需全局 galactic_crisis_happened、行星受危机轰炸、归属国是普通国家）。两者都调用 refugee_pop_effect。

Two paths lead to the same window refugees.1: (1) a pop is displaced (on_pop_displaced, common/on_actions/00_on_actions.txt:3326) -> hidden refugees.3 -> refugees.4; (2) a crisis faction bombards a planet (on_planet_bombarded, common/on_actions/00_on_actions.txt:2176) -> hidden refugees.5 -> 45-90 days later refugees.6 (needs the global galactic_crisis_happened flag, a planet under crisis bombardment and a normal-empire owner). Both call refugee_pop_effect.

## 剧情脉络 Story outline

refugee_pop_effect（refugee_effects.txt:1-130）：65%：若有物种创始国等适宜国家，难民回到故乡国家（宜居度0.7、有住房）；35%：按适宜度和住房依次尝试（0.7+住房 → 0.7 → 0.5+住房 → 0.5 → 0.2+住房 → 0.2 → 仅住房 → 任意可居），从候选国家中按“难民吸引力”加权随机挑一个。被选中的国家在随机一颗合适星球上安置人口，并收到 refugees.1“难民抵达”（该物种与来源国的组合是新的）或隐藏的 refugees.2（组合已出现过，只发消息）。窗口唯一选项“欢迎他们”，且在难民来源非危机阵营时对来源国情报+10。

refugee_pop_effect (refugee_effects.txt:1-130): 65%: if a suitable empire of the species' origin exists, the refugees go home (habitability 0.7 plus housing); 35%: tries in turn by habitability and housing (0.7+housing, 0.7, 0.5+housing, 0.5, 0.2+housing, 0.2, housing only, any habitability), picking from candidates weighted by refugee attraction. The chosen empire settles the pop on a random suitable planet and receives refugees.1 "Refugees Arrive" (this species/origin pairing is new) or hidden refugees.2 (pairing already seen; message only). The only option, They are welcome here, adds 10 intel on the origin empire unless it is a crisis faction.

## 分支与结局 Branches and outcomes

正文有四种：普通、被清洗（普通国家 / 格式塔国家）、被危机轰炸；无分支选项。

Four body versions: ordinary, purged (non-gestalt / gestalt origin), and crisis bombardment; no branching options.

## 条件与文明差异 Conditions and variants

接收国需对该物种有至少0.2宜居度的星球。编译器在入口上显示的 p=0.65 只是“返回故乡”这一支的概率（65/100），另外35%的各档位同样汇入这个窗口，并非该窗口只有65%出现。

The receiving empire needs planets with at least 0.2 habitability for the species. The compiler's entry p=0.65 is only the "go home" branch (65/100); the 35% tiers lead to the same window, so the window is not limited to 65%.

## 审阅记录 Review notes

- 已对照游戏文件核对入口、触发、选项与结果；行号均为游戏文件的真实行号。
  Entry, trigger, options and outcomes were checked against the game files; line numbers are real game-file lines.
- 合并说明：event-refugees-5 与本故事以同一个窗口 refugees.1 为根（危机轰炸路径），已并入。
  Merge note: event-refugees-5 had the same root window refugees.1 (the crisis-bombardment path) and is merged here.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
