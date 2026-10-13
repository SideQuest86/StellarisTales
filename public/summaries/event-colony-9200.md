# 隐藏地库 / Hidden Vault

- 分类 Category：文明纪事 Society (C7) · 殖民地事件链 colony event chain（开发者注释名 "Ancient Manufactorium"）
- 来源 Sources：`events/colony_events_3.txt:5152–6653` · `common/special_projects/00_projects_3.txt:1753–1765` · `common/on_actions/00_on_actions.txt:3856`
- DLC：事件触发器中没有 DLC 检查 / no DLC check in the triggers
- 审阅 Reviewed：2026-10-12（c7b-society）

## 如何开始 How it starts

殖民地满四年时（`on_colony_4_years_old`），随机池以权重 2 抽中 colony.9200（池中有权重 150 的“不发生事件”）。要求：可居住星球，且不是栖息地、环世界、破碎环世界或方舟；非母星、非首都、由原主人持有的非 AI 殖民地；所有者不是荒野帝国、此前没有触发过本链（国家标记 `ancient_manufactorium`，每个帝国一次）；星球尚无其他殖民地事件。

On the colony's fourth anniversary (`on_colony_4_years_old`) the pool can pick colony.9200 at weight 2 (the pool has a 150 "no event" weight). It needs a habitable world that is not a habitat, ring world, shattered ring or ark; a non-homeworld, non-capital, original-owner, non-AI colony; an owner that is not a wilderness empire and has not had this chain before (country flag, once per empire); and no earlier colony event on the planet.

## 剧情脉络 Story outline

一条严格按顺序推进、跨度多年的长链；每一步之间都有延时。/ A strictly sequential chain spread over many years:

1. **隐藏地库 Hidden Vault（9200）** → 30–60天 → **黑暗等待 Darkness Awaits（9201）**：研究其秘密（获得“山体地下舱室”矿藏）→ 180–540天后继续；或安放炸药 → 60–120天后 **山炸了！ Mountain Blast!（9202，结局）**。
2. **失踪！ Disappearances!（9210）**：按政体选择应对——普通（非格式塔）→ 9211 一人死亡并有负面媒体修正；平等主义 → 9212 救出工人；威权主义 → 9213 一人死亡；格式塔 → 9214 一个子个体损毁。之后都在 360–720 天后进入纪念堂。
3. **纪念堂 Remembrance Hall（9220）**：普通归档，或工匠公民性/地下帝国/两者兼备的专属选项（设置额外加成标记）→ 360–720天后地震。
4. **发生地震！ Earthquake Incoming!（9230）**：用墙上的管道（9231，之后维护费更高）或笨重机器（9232，之后产出更低）；功能建筑/机器建造者公民性（9233）与分心多用蜂巢（9234）可避免损失 → 720–1080天后洞见。
5. **洞见 Insight（9240）**：温和开门 → 9241 气体泄漏（一人死亡）；爆破 → 9242 爆炸（产出降低）；唯心主义 → 9243 冥想；精英治国 → 9244 第三条道路；格式塔 → 9245 钻穿大门。全部在 360–720 天后到达锻造厂核心。
6. **锻造厂核心 Foundry Heart（9250）**：修复（按技术官僚、哲人王、自然神经网络/共情、内省/预测分析给不同研究加成）→ 开启特殊项目 **启动铸造厂**（2000 工程学，无期限）；或 **拆解它** → 获得“工厂回收厂”矿藏，链结束。
7. **通电运行 Powered Up（9251）**（项目完成）→ 360–720天 → **工作环境 Work Conditions（9260）** → 360–720天 → **回收中心 Recycling Center（9270）** → 360–720天 → **或多或少？ More or Less?（9280）** → 60–120天（不压榨）或 180–540天（其他选项）→ **隆重开业 Grand Opening（9290，结局）**。

## 分支与结局 Branches and outcomes

- **炸毁 Blown up**（9202）：“被毁的舱室” Destroyed Vault 矿藏。
- **拆解 Dismantled**（9250 拆解选项）：“工厂回收厂” Manufactorium Scrapyard 矿藏。
- **开业 Grand opening**（9290）：“运转中的工厂” Operational Manufactorium 矿藏；途中各选择设置的 `manufactorium_*` 标记决定维护费、产量、额外岗位（纪念官、贵族、高管等）。

除 9201 与 9250 的退出选项外，各步骤的选项都是同一主线的不同代价，不会分叉成不同剧情。/ Apart from the exits at 9201 and 9250, the options at each step are different costs on the same line; they do not split the plot.

## 条件与文明差异 Conditions and variants

大量选项只对特定国民理念或公民性显示：平等/威权、格式塔、工匠、地下帝国、功能建筑、机器建造者、分心多用、唯心、精英治国、技术官僚、哲人王、奴隶公会/契约资产、共同负担、环保主义/零浪费/苦行、野蛮掠夺者/狂热净化者/终结者/吞噬虫群、催化处理/生命之树起源、遗民起源、纪念主义、贵族精英、超级企业（非工人合作社）。/ Many options appear only for specific ethics, civics or origins (listed above in Chinese); they replace the generic choice rather than adding new plot.

## 审阅记录 Review notes

- 已核对 Checked：colony.9200–9290 的触发、全部选项条件与效果、所有 `days`/`random` 延时；ANCIENT_MANUFACTORIUM_PROJECT 的 `on_success`；`on_colony_4_years_old` 随机池。编译草稿与源文件一致。/ All triggers, option gates, effects and delays; the project's `on_success`; the on_action pool. The compiled draft matched the source.
- 审阅改动 Changes：标注两个结局（9202、9290）并为 9250 的“拆解”退出与链中重复的殖民地状态检查加注。/ Two endings labelled; notes on the 9250 dismantle exit and on the repeated colony-state checks.
- 不确定 Uncertain：最终矿藏的具体数值取决于途中设置的 `manufactorium_*` 标记，未逐项追踪矿藏定义。/ Final deposit values depend on path flags; deposit definitions were not traced in detail.
- 注释 Commentary：概述为审阅者撰写。/ Summaries are reviewer commentary.
