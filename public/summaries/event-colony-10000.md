# 鲜花之庭 / A Court of Blossoms

- 分类 Category：文明纪事 Society (C7) · 殖民地事件链 colony event chain
- DLC：事件触发器中没有 DLC 检查 / no DLC check in the event triggers

## 如何开始 How it starts

殖民地建立满两年时（`on_colony_2_years_old`），随机事件池以权重 15 抽中 colony.10000「怪异脚印」（池中另有权重 150 的“不发生事件”）。事件自身要求：非母星、非首都、由原主人拥有、非 AI、无地面战斗；所有者不是机械/格式塔/排外/灭绝主义帝国；大陆、热带或稀树草原星球，且有已达上限的农业区划；整个银河只发生一次（全局标记 `court_of_blossoms`），且该星球尚未发生过其他殖民地事件（`colony_event` 标记）。

On the colony's second anniversary (`on_colony_2_years_old`) the random pool can pick colony.10000 *Strange Footprints* at weight 15 (the pool also has a 150-weight "no event" entry). The event itself requires a non-homeworld, non-capital colony held by its original non-AI owner with no ground combat; an owner that is not a machine, gestalt, xenophobe or homicidal empire; a continental, tropical or savanna world with a capped farming district; it happens once per galaxy (global flag `court_of_blossoms`) and only on a planet that has not had another colony event (`colony_event` flag).

## 剧情脉络 Story outline

1. **怪异脚印 Strange Footprints（10000）**：农民失踪，只留下巨大的脚印。调查（花费100能量）→ 15–25天后「死亡的怪兽」；不理会 → 35–75天后「持续失踪事件」。/ Farmers vanish. Investigate (100 energy) → *A Dead Monster* in 15–25 days; ignore → *Continued Disappearances* in 35–75 days.
2. **持续失踪事件 Continued Disappearances（10010）**：再次调查（150能量）→ 35–75天后「死亡的怪兽」；仍不理会 → 90–140天后随机结局（60% 万物当有终 / 40% 巧合还是命运？）。/ Investigate now (150 energy) → *A Dead Monster*; keep ignoring → a random ending after 90–140 days (60 bad / 40 good).
3. **死亡的怪兽 A Dead Monster（10005）**：发现巨兽尸体和隐形的生物；此事件创建阿纳萨里物种与坦佩里翁国王。120–160天后进入「鲜花之庭」。/ The expedition finds the dead beast and a cloaked presence; the event creates the Anathari species and King Tamperion. *A Court of Blossoms* follows after 120–160 days.
4. **鲜花之庭 A Court of Blossoms（10015）**：可自由提三个问题（仅对话）。「我们乐意学习」→ 10016（致谢）→ 150–190天后「其中一员」；「我们来此建立殖民地」→ 10017（国王的警告）→ 150–190天后「突然袭击」（10%人口死亡）→ 90–140天后随机结局（60/40）。/ Three free questions (dialogue only). "We are here to learn" → 10016 → *One of Them* after 150–190 days; "We are here to establish a colony" → 10017 → *A Swift Attack* after 150–190 days (10% of pops die) → random ending after 90–140 days (60/40).
5. **其中一员 One of Them（10025）→ 坦佩里翁国王 King Tamperion（10026）**：15–20天后第二次会谈，三个自由问题。「我们必须阻止永朽之暗」→ 特殊项目「研究魂魄」（1500，社会学，需科研船与科学家）；「我们可不能相信这个什么国王」→「怀疑之种」（10027）。/ After 15–20 days, a second audience with three free questions. "We must stop this Dark Immortal" → special project *Research the Essence* (1500 society, science ship + scientist); "We can't trust this so-called king" → *A Seedling of Doubt*.
6. **怀疑之种 A Seedling of Doubt（10027）**：仍然帮忙 → 同名项目，但花费3000；袭击国王（250能量）→ 5–15天后「死亡之后」（10%人口死亡）→ 90–140天后随机结局（50/50）。/ Help anyway → the same project at cost 3000; strike the king (250 energy) → *What Lies Beyond Death* after 5–15 days (10% of pops die) → random ending (50/50).
7. **永朽之暗 The Dark Immortal（10035）**：两个项目任一完成后到来。接受挑战 → 15–35天后「勇气试炼」；拒绝并直接进攻 → 15–35天后「战争是唯一答案」。/ Follows either project. Accept the challenge → *Trial of Bravery*; refuse and attack → *War is the only Answer* (both after 15–35 days).
8. **三项试炼 The three trials**（顺序固定 / fixed order）：
   - 勇气试炼 Trial of Bravery（10040）：杀死怪虫（非尚武）70%成功；“用火烧死它”（尚武帝国替代选项）95%成功；智取 70%成功；成功 → 10045/10046，失败 → 10047。/ Kill the beast (non‑militarist) 70% success; *Kill it with fire* (militarist replacement) 95%; trick it 70%; success → 10045/10046, failure → 10047.
   - 智慧试炼 Trial of Wisdom（10050）：答“飞升” → 失败（10055）；答“星海大同” → 通过（10060）。/ "Ascension" fails (10055); "Galactic Harmony" passes (10060).
   - 牺牲试炼 Trial of Sacrifice（10065）：“再见了，国王”（刺杀国王）→ 通过（10070）；“我们会做出牺牲的”（殖民者自我牺牲）→ 失败（10075）。/ "Goodbye, king" (killing the king) passes (10070); "We will make the sacrifice" (the colonist's self-sacrifice) fails (10075).
9. **内心的渴望 Innermost Desire（10080）**：全部通过后的愿望。/ The wish after passing all trials.
10. **盛大的失败 A Grandiose Failure（10085）**：任一试炼失败后到来（10–30天，牺牲试炼失败为5–15天）。/ Follows any failed trial.

## 分支与结局 Branches and outcomes

| 结局 Ending | 如何到达 How reached |
| --- | --- |
| 盛大的成功 A Grandiose Success（10081） | 内心的渴望 → “滚出这颗行星永远别回来”；阿纳萨里加入（500人口），获得“统一未来”修正。/ Innermost Desire → "Leave this planet. Forever."; 500 Anathari pops join, modifier *A Unified Future*. |
| 金色花瓣雨 A Rain of Golden Petals（10082） | 内心的渴望 → “消灭阿纳萨里”。/ Innermost Desire → "Eradicate the Anathari." |
| 战争是唯一答案 War is the only Answer（10086） | 拒绝挑战直接进攻，或试炼失败后花费1000能量进攻；阿纳萨里加入（500人口）。/ Refuse the challenge, or attack for 1000 energy after failing; 500 Anathari pops join. |
| 仆从之路 The Way of the Thralls（10087） | 试炼失败后选择成为仆从：+50荒废度、“永朽之暗所在”修正。/ After failing, become thralls: +50 devastation, *Dark Immortal's Presence*. |
| 万物当有终 All Life Must End（10090） | 随机坏结局：50%人口死亡、+50荒废度。/ Random bad ending: 50% of pops die, +50 devastation. |
| 巧合还是命运？ Coincidence or Fate?（10095） | 随机好结局：+10荒废度、“鲜花之庭的残余”修正。/ Random good ending: +10 devastation, *Remnants of the Court of Blossoms*. |

随机结局的权重取决于来路：置之不理 60/40，拒绝派人后遭袭 60/40，袭击国王 50/50，试炼失败后撤退 30/70（坏/好）。All random endings arrive 90–140 days later; bad/good weights depend on the route: ignoring 60/40, refusal and attack 60/40, killing the king 50/50, retreat after failed trials 30/70.

## 条件与文明差异 Conditions and variants

- “用火烧死它”只对尚武帝国显示，并替代普通的“试着杀死这头怪虫”。/ *Kill it with fire* replaces *Try to kill the beast* for militarist empires only.
- 多个选项需要能量储备：调查100、再次调查150、袭击国王250、背水一战1000。/ Energy-gated options: 100, 150, 250 and 1000.
- 两个“研究魂魄”项目文本相同；怀疑国王的路线费用翻倍（3000对1500）。/ The two *Research the Essence* projects share text; the distrust route costs 3000 instead of 1500.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-12（c7b-society）
- 来源 Sources：`events/colony_events_3.txt:10587–11675` · `common/special_projects/00_projects_3.txt:2037–2080` · `common/on_actions/00_on_actions.txt:3772`
- 已核对 Checked：colony.10000–10095 全部脚本（选项、`days`/`random` 延时、`random_list` 权重、立即效果），两个特殊项目的 `on_success`，以及 `on_colony_2_years_old` 随机池。编译草稿的结构与源文件一致，无需桥接或抑制。/ All event scripts, both projects' `on_success`, and the on_action pool; the compiled draft already matched the source, so no bridges or suppressions were needed.
- 审阅改动 Changes：故事标题取自 10015「鲜花之庭」（开发者注释与随机池注释均以此命名此链）；两次会谈登记为自由问答（问题仅对话，退出选项推进剧情）；标注六个结局。/ Title taken from 10015 (the chain's name in developer comments); the two audiences registered as free-question dialogues; six endings labelled.
- 不确定 Uncertain：随机池的抽取规则（先检查事件触发器还是先按权重抽取）属于引擎行为，脚本中不可见。/ The engine's pool-selection rule is not visible in script.
- 注释 Commentary：以上概述为审阅者撰写，原文见阅读器。/ Summaries above are reviewer commentary; the original text is in the reader.
