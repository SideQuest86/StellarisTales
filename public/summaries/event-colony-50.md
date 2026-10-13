# 地底文明 / Subterranean Civilization

- 分类 Category：文明纪事 Society (C7) · 审阅 Reviewed 2026-10-13
- 来源 Sources：`events/colony_events_1.txt:559-2183`；`common/special_projects/00_projects_1.txt:297-329`；`common/on_actions/00_on_actions.txt:862-883`

## 如何开始 How it starts

- 殖民地2或3岁时的随机事件（权重3/958、2/739）；全局仅一次（seismic_disturbance_global）。星球需有人口，排除核爆、环世界、栖息地、城市、火山、方舟等类型。
  Random colony event at age 2 or 3 (weights 3/958, 2/739); once per game (seismic_disturbance_global). The planet needs pops and excludes nuked, ring, habitat, city, volcanic and ark classes.

## 剧情脉络 Story outline

- 50「地震」：选项a启用项目1“建立沟通”与项目2“先发制人”；选项b（仅嗜杀文明）只启用先发制人。
  50 "Seismic Disturbances": option a enables project 1 "Establish Communications" and project 2 "Preemptive Strike"; option b (homicidal empires only) enables only the strike.
- 项目1成功 → 51（设“友好”标记）→ 53「地底人」：和平或战争选项；战争选项在35+随机40天后引发54「入侵」。
  Project 1 success -> 51 (sets the friendly flag) -> 53 "Subterranean Aliens": peace options or war; war leads to 54 "Invasion" after 35 days + random 40.
- 项目2成功 → 52「文明被摧毁」；失败则60%引发54入侵、40%出现59「地底人现身」→ 53。
  Project 2 success -> 52 (civilization destroyed); failure gives 60% invasion 54, 40% 59 "Aliens Surface" -> 53.
- 54：地底国家带6支军队登陆。击退 → 56「胜利」（设“战争”标记并启用项目3“消灭地底文明”→ 52）；失守 → 57「失败」→ 58「来电」，星球归地底帝国。
  54: a subterranean country lands 6 armies. Repelled -> 56 "Victory" (sets the war flag and enables project 3 "Destroy Subterranean Civilization" -> 52); lost -> 57 "Defeat" -> 58 "Incoming Transmission", the planet goes to a new subterranean empire.
- 之后按所带标记进入三个每月随机池：战争池60–63、摧毁池64–68、友好池69–74，每个事件平均240个月、至多一次。
  Afterwards three monthly random pools run by flag: war 60-63, destroyed 64-68, friendly 69-74; each event has a mean of 240 months and happens at most once.
- 友好池的选项会累积“地底人怒气”；超过2时75（20天）→ 76 → 再次引发54入侵。
  Friendly-pool options raise "angry subterraneans"; above 2, 75 (20 days) -> 76 -> invasion 54 again.

## 分支与结局 Branches and outcomes

- 先发制人失败时的 60/40 与 54/59 互斥；其余池为并行、各至多一次。
  The 60/40 split between 54 and 59 is exclusive; the other pools are parallel, each event at most once.
- 终局：消灭文明（52）后进入摧毁池；失守后星球易主（58）；友好共存可持续并可能因怒气转为入侵。
  Ends: destroyed civilization (52) continues into the destroyed pool; losing the colony (58) ends the story; friendly coexistence can turn into invasion through anger.

## 条件与文明差异 Conditions and variants

- 嗜杀文明有仅限先发制人的选项；地底文明帝国（is_subterranean_empire）使用不同的措辞版本；奴役选项限于威权/排外文明。
  Homicidal empires get a strike-only option; subterranean empires see alternative wording; enslavement options need authoritarian or xenophobe empires.

## 审阅记录 Review notes

- 已核对：入口、三个项目、战争与失败的 on_action 衔接、三个池的标志与均值、75/76 的触发变量。
  Checked: entry, the three projects, the on_action links for victory and defeat, flags and means of the three pools, the trigger variable of 75/76.
- 更正：草稿把56、57及60–75拆成互不相连的单窗口故事；现全部并入，用标志衔接（bridge）。
  Correction: the draft split 56, 57 and 60-75 into disconnected one-window stories; all are merged here with flag-based bridges.
- 不确定：友好标记在53选择战争后是否仍保留（脚本未清除）。
  Uncertain: whether the friendly flag still lets friendly-pool events fire after war is chosen at 53 (the script does not clear it).
