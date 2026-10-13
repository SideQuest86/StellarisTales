# 人畜共患瘟疫 / Zoonotic Plague
- 分类 Category：文明纪事 Society (C7) · 前FTL观察情境 pre-FTL observation situation（入口 preftl.2001）
- 来源 Sources：`events/first_contact_dlc_situation_events.txt:3010–4970` · `common/situations/04_first_contact_dlc_situations.txt:370–582` · `common/on_actions/00_on_actions.txt:140–200`
- 审阅 Reviewed：2026-10-13（c7b-society）

## 如何开始 How it starts

观察池 on_monthly_pulse_pre_ftl_observation 里的**瘟疫情境**（权重 10，`00_on_actions.txt:140–200`）：隐藏事件 preftl.2000 要求观察站主人非格式塔，且本国尚未发生过（preftl_2000_fired）；触发 **2001 爆发**。/ Part of the observation pool (weight 10): preftl.2000 needs a non-gestalt observer who has not had it.

## 剧情脉络 Story outline

1. **爆发（2001）**：选择路线——观望并学习 / 提供援助 / 促成疾病，并开始情境“人畜共患瘟疫”（共三个阶段，进度 35 / 70 / 100）。若星球不再是前FTL文明，开局事件 **2049 情势变化** 收场。/ Choose watch & learn, provide aid or promote disease; if the planet is no longer pre-FTL, 2049 closes the situation.
2. **阶段二（进度 35，一次）**：按路线抽取 — 观望：**2006 宗教狂热** / **2007 军阀崛起**（50:50）；援助：**2008 慈悲天使** / **2009 恶魔入侵**（50:50）；促成：**2010 肆虐的瘟疫**（70%）/ **2011 适者生存**（30%）。这些事件的“标准”选项设下一个国家标志；一个特殊选项（灵性者 2006.a、2007.a 等）改设跳过阶段三的标志。/ Stage 2 draws an event by approach; the standard option sets the line’s flag, a special option jumps ahead.
3. **阶段三（进度 70，一次）**：按标志分派 — 宗教狂热 → **2025 弥赛亚综合征**；军阀 → **2030 破旗**；慈悲天使 → **2020 压倒性的需求**（保密 / 坦白）；恶魔入侵 → **2021 信仰的力量**（保密 / 坦白）；肆虐的瘟疫 → **2035 世界末日**；适者生存 → **2040 增强免疫**；“眼界大开”标志 → **2065 思想大开**。/ Stage 3 dispatches by flag.
4. **完成（进度 100，一次）**：按标志分派结局 — **2070 狂热信仰**（2025）、**2075 战场之王**（2030）、**2080 感恩的民众**（2020 保密）、**2085 大规模驱魔**（2021 保密）、**2051 死亡世界**（2035）、**2090 青春之泉**（2040）、**2026 真先知**（2006.a）、**2031 辉煌旗帜**（2007.a）、**2065 思想大开**（坦白线）。/ Completion dispatches the ending by flag.
5. **每月随机插曲**：**2062 大量死亡** / **2063 寂静世界**（各 15%，隐藏分发）。/ Monthly 2062 / 2063 at 15% each.

## 分支与结局 Branches and outcomes

阶段二三对事件互斥；阶段三、结局都由国家标志决定，同一条线内可由选项改道（保密 → 原结局，坦白 → 2065）。/ Stage-2 pairs are exclusive; stages 3 and the ending are dispatched by flags, with options that reroute within a line.

## 条件与文明差异 Conditions and variants

“提供援助”“促成疾病”在禁止干涉政策下不可选；灵性者、军队倾向者有额外选项；岩石体质与有机物种的瘟疫文本不同。/ Aid and promote are unavailable under non-interference; spiritualists and others get extra options; lithoid and organic species differ.

## 审阅记录 Review notes

- 已核对 Checked：preftl.2000–2090 全部脚本（含 2002/2003/2005 分派）、情境定义、观察池入口。
- 审阅改动 Changes：把阶段三/结局的隐藏标志分派用审阅桥画成真实顺序（原先全部挂在情境下），并抑制了情境到这些事件的直连边；标出每月随机插曲。/ The flag-based hidden dispatch is now shown as reviewed bridges, with the direct situation edges suppressed.
- 不确定 Uncertain：灵性者等特殊选项（2025.a、2026.a）对后续标志的细节只按名称读取。
