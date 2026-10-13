# 磁力奇迹 / Magnetic Miracle

- 分类 Category：文明纪事 Society (C7) · 星球修正殖民地事件 planet-modifier colony event
- 来源 Sources：`events/colony_events_3.txt:764–898`（事件）· `:919–1034`（分派器 colony_mod.161）· `common/special_projects/00_projects_3.txt:671–684` · `common/on_actions/00_on_actions.txt:3721`
- 审阅 Reviewed：2026-10-12（c7b-society）

## 如何开始 How it starts

每个新殖民地满一年时（`on_colony_1_year_old`）运行隐藏分派器 colony_mod.161。若星球带有“强力磁场”修正、此前未解开磁场之谜、当前没有“磁力奇迹/磁力破坏”修正、无地面战斗且有人口，则在 30–120 天后以 50/50 触发 **磁力奇迹**（16）或 **磁力破坏**（17）。分派器按固定优先级只触发一种修正事件：强力磁场排在第一位。事件本身还要求非母星、非首都、由原主人持有的非 AI 殖民地。

When a colony turns one year old, the hidden dispatcher colony_mod.161 runs. If the planet has *Strong Magnetic Field*, the mystery is unsolved and neither magnetic modifier is active, it fires **Magnetic Miracle** (16) or **Magnetic Disruption** (17), 50/50, after 30–120 days. The dispatcher fires only one modifier event per colony, in a fixed priority order; magnetic field is first. The events also require a non-homeworld, non-capital colony held by its original non-AI owner.

## 剧情脉络 Story outline

1. **磁力奇迹 Magnetic Miracle（16）**：电脑运行得反而更快——获得 1800 天“磁力奇迹”修正。/ Computers run better; the *Magnetic Miracle* modifier for 1800 days.
   **或 or 磁力破坏 Magnetic Disruption（17）**：干扰加剧——获得 1800 天“磁力破坏”修正。/ Interference worsens; *Magnetic Disruption* for 1800 days.
2. 两个事件都会给帝国的磁场事件计数加一。计数为 3 的那一次，选项还会开启特殊项目 **调查磁场之谜**（5000 物理学）。/ Both add 1 to an empire-wide counter; on the occasion the counter is 3 the option also opens **Investigate the Magnetic Mystery** (5000 physics).
3. **磁场谜团揭晓 Magnetic Mystery Revealed（18）**：该星球是一台自组织的量子计算机；获得永久“磁力奇迹”修正，之后不再触发。/ The planet is a self-organizing quantum computer; permanent *Magnetic Miracle*, no further events.

## 分支与结局 Branches and outcomes

- 16 与 17 互斥（50/50）。/ 16 and 17 are exclusive (50/50).
- 只有第三次磁场事件所在的星球获得项目与最终结局；其他磁场殖民地只得到 1800 天的修正。/ Only the planet of the third magnetic event gets the project and the final result; other magnetic colonies just get the timed modifier.

## 条件与文明差异 Conditions and variants

无文明身份差异。/ No empire-identity variants.

## 审阅记录 Review notes

- 已核对 Checked：分派器 colony_mod.161 的全部 `if … break = yes` 块、事件 16/17/18、项目定义与 `on_colony_1_year_old`。/ The dispatcher's `if … break` blocks, events 16/17/18, the project and the on_action.
- 审阅改动 Changes：编译草稿把分派器能触发的六种互不相关的星球修正事件（磁场、辐照、泰坦巨兽、地震、彗星、致幻大气）合成一个“磁力奇迹”故事。现拆为六个故事：本故事（event-colony-mod-161）只保留磁场事件；其他见 event-colony-mod-1/2/3/4/5。泰坦巨兽在“原始呼唤”起源下改走 grand_archive.1010，属于该起源故事。/ The draft merged six unrelated modifier events behind one dispatcher; split into six stories. The Primal Calling titanic-life variant (grand_archive.1010) belongs to that origin's story.
- 不确定 Uncertain：`check_variable value = 3` 按脚本注释理解为“计数等于3”；引擎是否按“≥3”处理在脚本中不可见。/ Read as "counter equals 3"; engine semantics not visible in script.
