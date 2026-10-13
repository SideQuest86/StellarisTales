# 预知 / Divination（虚境行者的占卜仪式 The Shroudwalkers' rite）

- 分类 Category：巨兽与城邦 · DLC：霸主 Overlord
- 来源 Sources：events/overlord_enclaves_events.txt:7380（enclave.415）, :7585（enclave.4100）, :7397（enclave.416）, :8064–12157（预言事件 prophecies enclave.5000–5576）, :7627/:7677（4150/4151）; common/situations/01_overlord_situations.txt:5, :116; common/on_actions/00_on_actions.txt:4932–4958; common/special_projects/00_projects_overlord.txt
- 审阅 Reviewed 2026-10-12（C6）

## 如何开始 How it starts
在“虚境行者城邦”菜单询问“我们的命运将会如何？”并付费（enclave.410.b，同一时间只能进行一次占卜，且有冷却）后，“预知仪式开始”（enclave.415）。
After asking the Shroudwalkers about our fate and paying (enclave.410.b; one divination at a time, with a cooldown), "the rite of divination has begun" (enclave.415).

## 剧情脉络 Story outline
1. 10天后（enclave.4100）以5:5随机开启两种征兆之一（互斥）；20年内出现过的征兆权重×0.2。
   10 days later one of two signs starts at 5:5; a sign seen in the last 20 years has weight ×0.2.
   - 轨迹的征兆 Sign of the Locus：空间本身发生异变。
   - 来访者的征兆 Sign of the Visitor：有来客造访我们的世界。
2. 征兆是一个局势（基础每月+2，外交姿态等可±2）。每月以10（无事）:1:1…从九则预言中抽取；每则预言有自己的前置（一次性标记、进度门槛、人口等），先通过的一则会设置“已发生”，因此一次征兆至多应验一则。进度达90%仍无预言时，每月强制从同组中抽一。
   Each sign is a situation (base +2/month, ±2 from diplomatic stance etc.). Monthly it draws 10 (nothing) : 1 : 1 … among nine prophecies; each has its own gate, and the first that fires marks the sign as fulfilled, so at most one prophecy per sign. From 90% progress one is forced each month.
3. 局势完成：若有预言应验则“征兆消退”（416），否则“不透明的帷幕”（5557，退还1000能量）。两者互斥。
   On completion: "The Sign Fades" (416) if a prophecy happened, otherwise "Opaque Veil" (5557, 1000 energy back).

## 分支与结局 Branches and outcomes（预言 Prophecies）
**轨迹的征兆 Locus**
- 过于清醒 All Too Lucid（5005）：名为“Lucid”的药物在殖民地蔓延。取缔 → 每隔约2–3个月恶化（5025→5030→5035）；或研究（两个特殊项目 → 5015 → 5020）。
- 遮蔽 Shrouded（5055）：一艘科研船被虚境吞没 → 项目 → “作为概念的船”（5060）→ 180天后“最终形态”（5065）归来。
- 轨道裂口 A Rupture in Orbit（5500，进度≥50%）：调查项目；失败则崩塌（5501）→ 混乱（5502）→ 1–2年后恢复（5503）；成功则“轨道风暴”（5505）：继续观察 → 风暴平息（5510）→ 遇到“受困的殖民船”，对话分为两种开场（5515/5535，按条件互斥）与多种结局；停止扫描 → 风暴余波（5506）。
- 漂浮外壳 Floating Shell（5130，≥10%）：两段项目 → 拼合出受虚境侵染的舰船（5145，编入舰队或拆解）。
- 五则“心灵异常” Psionic Anomaly（5150/5155/5160/5180/5185，部分需≥10%或≥15%）：在某行星上生成一处异常现象（冰雪发光、瞬息万变、不可能的轨道、怪异共鸣、终结轨道），后续见各异常现象故事。
**来访者的征兆 Visitor**
- 叛离的萨满 Rogue Shaman（5075）：驱逐 → 宗教狂热（5076）→ 殉道者（5077）；观察或欢迎 → 织梦者（5080）→ 制止（回到5076）或放任 → 突然飞升（5081）→ 灵能交流（5082）。各步间隔约2–4个月。
- 大分裂 The Great Schism（5090）：接纳“改革者” → 城邦警告（5095）→ “门与钥匙”（5100）：资助 → 钥匙铸成（5105）→ 约半年后门开启（5110 / 5115，50:50）；拒绝资助 → 被虚境侵染的世界（5106）。拒绝入境 → 城邦赞许（5120）。排外者专属的“异族不得入境”在脚本中却同样接到5100（疑为原版笔误，按脚本记录）。The xenophobe-only refusal is scripted to lead to 5100 as well (probably a script slip; recorded as is).
- 英雄归来 Hero Redivivus（5195）：自称传奇英雄者现身 → 调查项目 → 虚境触及的英雄（5200）。
- 迷途朝圣者 Wayward Pilgrims（5566→5565）：援助 → 神圣边境（5570）→ 接触（5571）或驱逐；拒绝/不给食物 → 邪恶终结（5575）。
- 两则心灵异常（5165、5175）：生成“废弃聚落”“生命迹象”异常现象。
- 借用其他故事的事件（跨故事链接 cross-story links）：裂解的云群（federations3.2001）、烦人的使节（envoy_events.5）、门扉（colony.3005）。

## 条件与文明差异 Conditions and variants
预言前置差异很大：如“过于清醒”要求非AI、非格式塔、人口>400且有多个殖民地；“轨道裂口”需进度≥50%。许多窗口有格式塔/机械专属文本与选项。征兆在虚境行者被毁或与之敌对时中止。
Gates differ (e.g. All Too Lucid needs a non-AI, non-gestalt empire with >400 pops and several colonies; Rupture needs ≥50%). Many windows have gestalt/machine variants. The sign aborts if the Shroudwalkers are gone or hostile.

## 审阅记录 Review notes
- 已核对 enclave.4100 随机表、两个局势定义（月进度、修正、on_monthly 随机表、完成/失败）、4个强制抽取路由、所有预言路由的前置与各链主要分支、延迟。
- 更正：草稿把整个占卜嵌在打捞者和虚境行者菜单的四个副本中，并把“门扉”等其他故事的整条事件链吞入；现为独立故事，借用事件以跨故事链接表示（hub）。心灵异常生成的异常现象以审阅注说明，未建桥接（桥接会破坏这些异常现象的独立故事，见台账请求）。
- 不确定：各预言前置以文字概括，未逐一建模为边条件。
- 覆盖完整。Coverage complete.
- 2026-10-13 r3-inherit：事件继承修复（base = 其他事件）后复查：对照游戏文件核对了现在可见的继承标题、选项与分支，结构无需改动。
  2026-10-13 r3-inherit: re-checked after the event-inheritance fix (base = other event): the inherited titles, options and branches now visible in the tree were compared with the game files; no structural change needed.
