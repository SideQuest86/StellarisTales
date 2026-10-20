# 万华镜 / The Kaleidoscope

- 分类 Category：文明纪事 Society (C7) · DLC：复仇女神 Nemesis（脚本检查 `has_nemesis`）· 审阅 Reviewed 2026-10-12

## 如何开始 How it starts

- 开局时隐藏事件 1999 以 30% 概率设置全局标记，决定本局是否会出现万华镜。之后 `on_five_year_pulse` 每五年以 50/200 的权重运行隐藏事件 2000：须已进入游戏中期且万华镜尚未出现。2000 为能量寄生体选择宿主（人类玩家帝国 5、玩家的邻国 3、AI 帝国 1，首都不能有行星护盾），在 0–360 天后到达。
- At game start hidden event 1999 sets a global flag with 30% chance, deciding whether the Kaleidoscope can appear at all. Afterwards `on_five_year_pulse` runs hidden event 2000 with weight 50/200, once mid-game has begun and only if it has not started yet. 2000 picks the host (a human player's empire 5, a player's neighbour 3, an AI empire 1; the capital must not have a planetary shield); it arrives 0–360 days later.
- 首次接触的宿主看到 2003「太空之彩」（首都全球大停电、天空出现万花筒般的光幕），其他掌握该星系情报的帝国看到 2004。曾经拥有过它的帝国再次被选中时，跳过开场直接到 2010（「黑暗伊始」的“它回来了”版本）。
- A first-time host sees 2003 "Color Out of Space" (a planet-wide blackout at the capital and kaleidoscopic lights); empires with intel on the system see 2004. An empire that hosted it before skips the opening and goes straight to 2010 ("Black Start", the "it has returned" text).

## 剧情脉络 Story outline

1. 2003 → 特殊项目「能量停供」（200 工程研究，须工程船或方舟在轨道）；进度一半时 2005「大停电」，完成后 2010「黑暗伊始」。
   2003 → special project "Power Outage" (200 engineering, needs a construction ship or arkship in orbit); at 50% event 2005 "Blackout", on success 2010 "Black Start".
2. 2010 开启局势「万华镜」，玩家选择不喂养、少量喂养或大量喂养（三种接近方式，可随时切换）。不喂养不增加进度；少量 +0.5/月；大量 +1.5/月。月度隐藏事件 2001 记录全球进度并依喂养方式调整它的心情。
   2010 starts the situation "The Kaleidoscope" and asks how to feed it (starve / feed / overfeed; approaches can be changed later). Starving adds no progress, feeding 0.5/month, overfeeding 1.5/month. Hidden monthly event 2001 stores the global progress and moves its mood according to the approach.
3. 局势期间的每月随机插曲（可重复、顺序不定；无事权重 100，各事件 1，「无尽的饥饿」2）：
   Monthly random interludes while it lasts (repeatable, no fixed order; nothing 100, each event 1, "Endless Hunger" 2):
   - 不喂养时：2030 轻度侵染（另一颗行星停电 → 项目「流光溢彩」→ 2011）、2032 焦躁模式、2033 噩兆模式（仅唯心主义）、2034 幻吸模式；2031 电击疗法在非“大量喂养”时都可能发生。
     When starved: 2030 Minor Infestation (another planet blacks out → project "Color Bleed" → 2011), 2032 Unnerving Patterns, 2033 Ominous Patterns (spiritualists only), 2034 Pilfering Patterns; 2031 Electroshock can occur unless overfeeding.
   - 喂养时：2037 宽慰模式、2038 眩目模式、2048 无尽的饥饿（拥有完整或修复的戴森球且非排外）。
     When fed: 2037 Soothing Patterns, 2038 Dazzling Patterns, 2048 Endless Hunger (owns a finished or restored Dyson Sphere, not xenophobe).

## 分支与结局 Branches and outcomes

宿主的结局只会发生其一 / Only one of these ends it for the host:

- **撑爆 Burst（进度 100%）**：随机 2041「万华镜之花」（基础权重 10，获得遗珍“真空花朵”）或 2043「万华镜爆炸」（基础 90，星系殖民地荒芜度 +50），权重随心情值调整；他国分别收到 2042 / 2044。
  Random 2041 "Blooming Kaleidoscope" (base 10, grants the Vacuum Flower relic) or 2043 "Exploding Kaleidoscope" (base 90, +50 devastation in the system), weights shifted by its mood; others get 2042 / 2044.
- **消散 Fade**：全局 25 年寿命标记到期后，月度检查在 15 天后触发 2040「天清空净」，他国收到 2045。
  When the 25-year global lifetime flag expires, the monthly check fires 2040 "Clear Skies" 15 days later; others get 2045.
- **迪斯科球 Disco Sphere**：2048 选择改造戴森球后可建造“迪斯科球”升级（360 天）；完工触发 2049「奇迹球」，移除万华镜。
  After choosing 2048.a, the Disco Sphere upgrade of a Dyson Sphere can be built (360 days); completion fires 2049 "Wonder Sphere", removing the Kaleidoscope.
- **送给他国 Hand-off**：拥有万华镜的帝国可发动两阶段间谍行动「引诱万华镜」（2020 → 2021）。2021 销毁本国局势，目标帝国从 2003（或曾拥有者的 2010）重新开始；若目标在 30 年内陷入能量赤字，原宿主收到 2025「嫁祸于人」。
  The host can run the two-stage espionage operation "Lure the Kaleidoscope" (2020 → 2021). 2021 destroys your situation and the target starts over at 2003 (or 2010 if it hosted it before); if the target enters an energy deficit within 30 years, the former host receives 2025 "Offloading The Problem".
- 其他状态 Other state：宿主迁都时万华镜跟随新首都（隐藏 2050）；宿主被灭亡时，首都无护盾的征服者接手（2002），否则它消散并通知他国（隐藏 2060 → 2045）。
  It follows a capital move (hidden 2050); if the host is destroyed, an unshielded conqueror inherits it (2002), otherwise it fades and others are notified (hidden 2060 → 2045).

## 条件与文明差异 Conditions and variants

- 2004 和 2010 各有两种正文：第一次看到/第一次拥有，或再次遇见/被送回。
  2004 and 2010 each have two texts: first sighting / first time hosting, or seen again / sent back.
- 2033 只对唯心主义帝国触发；2048 要求非排外并拥有完整或修复的戴森球。
  2033 only for spiritualist empires; 2048 needs a non-xenophobe owner with a completed or restored Dyson Sphere.

## 审阅记录 Review notes

- 来源 Sources：`events/situation_events.txt:2828-4178`；`common/situations/01_narrative_situations.txt:1253-1659`；`common/special_projects/00_projects_nemesis.txt:618-689`；`common/espionage_operation_types/operations.txt:1224-1290`；`common/megastructures/01_dyson_sphere.txt:1043-1135, 1137-1272`；`common/on_actions/00_on_actions.txt:22, 286-289, 3445-3448, 3603-3621`；`common/situations/02_deficit_situations.txt:37-42`
- 已核对：入口（00_on_actions 第22行开局1999、第288行五年检查2000）、2002 首次/再次分流、两个特殊项目、局势定义的进度/接近方式/月度事件/on_progress_complete 权重、2001 寿命与心情、四种结局、间谍行动阶段、迁都与灭亡回调、迪斯科球巨构。
  Checked: entries (00_on_actions line 22 game-start 1999, line 288 five-year 2000), the 2002 first/again split, both special projects, the situation's progress/approaches/monthly events/on_progress_complete weights, 2001 lifetime and mood, all four endings, the espionage stages, capital-move and destruction callbacks, the Disco Sphere megastructure.
- 更正 Corrections：原草稿把同一故事拆成三张卡（2000 五年入口、2060 灭亡回调、2020/2021 间谍行动），另把 2049 单独成卡；现合并为一个故事族，并用审阅连接把间谍行动挂在局势下、把 2049 接在 2048 的改造选择后、把 2025 接在送出行动后。
  The draft split this story into three cards (2000 five-year entry, 2060 destruction callback, 2020/2021 espionage) plus a separate 2049 card; they are now one family, with reviewed links hanging the operation under the situation, 2049 after 2048's upgrade choice and 2025 after the hand-off.
- 不确定 Uncertain：心情值、正负事件倍率的 script value 未在 `common/script_values` 中追查，指南只给基础权重。
  The mood and event-weight script values were not traced in `common/script_values`; only base weights are given.
