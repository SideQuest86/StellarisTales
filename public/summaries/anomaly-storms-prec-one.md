# 远古信号：阿达卡利亚公约 / Ancient Signals: the adAkkaria Convention

- 分类 Category：先驱者 Precursors（审阅改定；编译默认为深空异闻）
- 来源 Sources：`common/anomalies/102_anomaly_categories_cosmic_storms.txt:30-49` · `events/precursor_events_cosmic_storms.txt:1800-4717` · `common/archaeological_site_types/10_cosmic_storms_arc_sites.txt:346-620` · `common/special_projects/03_projects_cosmic_storms.txt:125-193` · `common/solar_system_initializers/cosmic_storm_initializers.txt:68-161` · `common/on_actions/00_on_actions.txt:1180-1192`
- DLC：宇宙风暴 Cosmic Storms（先驱者定义 `01_precursor_civilizations_cosmic_storms.txt:10-17` 要求 `has_cosmic_storms_dlc`）；远古遗物 Ancient Relics 时部分奖励改为稀有文物
- 审阅 Reviewed：2026-10-12（c3b-exploration）

## 如何开始 How it starts

“远古信号”异常不会自然生成。银河生成时若选中阿达卡利亚先驱者，玩家（非 AI、尚无先驱者开场）在带有该先驱者标记的星系勘察一颗合适行星时，`on_survey_planet` 的随机事件（“无事”权重100，阿达卡利亚权重25）可能触发隐藏事件 cstorms.200：生成本异常，并在30天后发出通用联络报告（另一枢纽故事）。研究异常成功即触发 cstorms.205。

The anomaly never spawns on its own. If the galaxy includes the adAkkaria precursor, surveying a suitable planet in one of its flagged systems can roll hidden event cstorms.200 (`on_survey_planet` random events: 100 for nothing, 25 for adAkkaria, plus the other precursors) for a player empire without a precursor intro. It adds this anomaly and sends a generic contact report 30 days later (a separate hub story). Researching the anomaly fires cstorms.205.

## 剧情脉络 Story outline

1. **仁善信号 → 宣传中心 A Signal of Benevolence → the Propaganda Station.** 205 开启事件链“先驱者——阿达卡利亚”并建立考古遗址；五个阶段依次解读广播（215–235）：领袖讲话、与“宇联”的争执、关于灵能的广播剧、关于“启蒙进程”战事的新闻。/ Five stages decode the station's broadcasts.
2. **风扫命运 Windswept Fates.** 235 结束后120–150天，隐藏事件 cstorms.240 在本国境内（优先阿达卡利亚星系的贫瘠行星）生成一场宇宙风暴；再70–90天后 245：风暴揭开遗址。六个阶段（2105–2130）发现被沙暴掩埋的军队与公约公民哈图尔·盖隆的遗体。/ A storm uncovers a mass grave and the body of haToor Gailon.
3. **三咒舰队 Fleets of the Thrice Damned.** 2130 之后15天 2140 在优先阿达卡利亚、带小行星带的星系建立舰船墓场遗址；五个阶段（2150–2170）找到阿拉塔·蓝迪尔的冰冻遗体，科学家（视是否灵能、是否机器人）遭到精神冲击；遗体被抛出，风暴随之出现。/ The frozen body of alAtta Landeer assaults the crew's minds.
4. **追踪历史 Tracing History.** 隐藏 2179 生成一个新星系（初始化器 `adSalivul_system`） → 2180 开启180天科研项目 → 2185 发现远古居住站，立即建立“崇高仁善协会”遗址；六个阶段（2200–2225）揭示灵能实验与研究所关闭，得到首都艾德苏尔的坐标。/ A 180-day project leads to the Institute of Exalted Benevolence.
5. **风暴的呼唤 The Storm calls.** 2225 之后15天，隐藏 2230 生成艾德苏尔星系（初始化器 `adSul_system`）：若调查协会遗址的科学家有灵能特质 → 2245“虚空的呼唤”；否则 → 2240，再经180天项目“仁善之地” → 2250。两条路都进入三段式对话“风暴”（2260→2265→2270，前几问可同窗反复询问），最后的选项在艾德苏尔首都建立“庆典学院”遗址。/ Psionic or not, both routes reach the three-part conversation with the Storm, which opens the Celebration site.
6. **庆典学院 Celebration.** 六个阶段（2285–2310）：实验牢房、“内在风暴”理论、风暴召唤器的机库，最后在“最终阶段”记下被用作电源的少年们的名字。2295 可让未觉醒灵能的非机器人科学家“沉浸”而获得灵能特质。/ Six stages; at 2295 a non-psionic organic scientist may be allowed to "indulge" and becomes psionic.
7. **风暴的绝唱 The Storm's swansong.** 2310 之后15天进入对话 2320→2325→2330→2335（念出全部名字使风暴恢复神智）。/ 15 days later the swansong dialogue begins; reciting the names restores the voices.

## 分支与结局 Branches and outcomes

- **释放风暴（2335.a → 2340 → 2350“风暴不再”）**：摧毁召唤器，艾德苏尔首都变为曾被改造的大陆星球并获得爱国研究所；设置 `adakkaria_world_found`。拥有远古遗物时，可另行花费750稀有文物开启“阿达卡利亚的秘密”研究（`artifact_actions.txt:650-680`，另一故事）。/ Free the Storm: the homeworld is restored; the optional Secrets research becomes available (separate story).
- **驱使风暴（2335.b → 2345 → 2355“痛怒悲惧”）**：获得遗珍“风暴召唤器”，事件链结束，母星永远无法抵达。/ Command the Storm: gain the Tempest Invocator relic; the homeworld stays closed.
- 2240 与 2245 是按科学家是否灵能的互斥分支。/ 2240 and 2245 are exclusive by the scientist's psionic trait.

## 条件与文明差异 Conditions and variants

- 2165、2170、2205、2245、2295、2300、2305、2310 的正文按格式塔/机械智能、威权或杀戮型文明、科学家是否灵能与是否机器人切换。/ Many texts vary by gestalt or machine intelligence, authoritarian/homicidal empires, and a psionic or robotic scientist.
- 拥有远古遗物时，多数阶段奖励改为少量稀有文物；2130 依次给予风暴科技进度。/ With Ancient Relics many stage rewards become minor artifacts; 2130 advances storm technologies.
- 遗址掷骰失败会随机触发通用考古意外（爆炸性减压、系统关闭等），它们是共享枢纽故事，不是本故事章节。/ Failed dig rolls can fire generic dig incidents, which are shared hub stories.

## 审阅记录 Review notes

- 已核对 Checked：异常定义、cstorms.200–2355 全部事件（含隐藏 240、2179、2230）、四处遗址与三个项目、星系初始化器、`on_survey_planet` 权重、稀有文物行动。/ All definitions listed above.
- 本轮更正 Corrections：分类改为先驱者；将通用的空间站考古意外 ancrel.8200–8203、8215 标为枢纽（与已是枢纽的 8040/8045/8055/8070/8210 一致）；标注两组互斥分支、两个结局与五段同窗对话。/ Category set to precursors; generic dig incidents made hubs; exclusive branches, endings and in-window dialogues annotated.
- 不确定 Uncertain：`on_survey_planet` 随机事件在所选事件条件不满足时是否重掷属于引擎行为；“秘密”研究在另一故事中，仅以注释链接。/ Engine re-roll behaviour unknown; the Secrets epilogue is linked by note only.
- 覆盖 Coverage：56个文档全部审阅。/ All 56 docs reviewed.
