# 旧版编码 / An Old Code（负相物质·后篇 / Negative Mass, part two）

- 分类 Category：文明纪事 Society (C7) · 殖民地事件链与叙事局势 colony chain + narrative situation
- 来源 Sources：`events/colony_events_3.txt:7579–8909` · `common/situations/01_narrative_situations.txt:1661–1817` · `common/on_actions/00_on_actions.txt:1668` · 前篇 prologue `common/special_projects/00_projects_3.txt:803–845`
- 审阅 Reviewed：2026-10-13（c7b-society；r2-society 完成）· 状态 Status：已审阅 reviewed

## 如何开始 How it starts

这是“负相物质”事件链（开发者注释 "Negative Mass"）的后半段。前半段：殖民地事件「传送门 The Doorway」（colony.3005）开启传送门研究；项目完成时以权重 5 随机抽到 colony.9800「虚无次元」（AI、人工/城市/蜂巢/机械/遗迹母星、合成繁衍/进化掠食者/毒性骑士起源以及全银河已发生过的情况下权重为0）；900–1000 天后 9805，再过 150–230 天 9810「负质量」开启事件链并克隆一位科学家领袖；360–720 天后 9815 母星旁出现传送门，一支与我们旧式护卫舰相同的舰队来袭。前半段现为独立故事 event-colony-3005。

**本篇入口**：击败那支舰队（`on_fleet_destroyed_perp`，被歼灭方带 `B_world_relation` 关系标记）时触发 colony.9820「旧版编码」，全局只发生一次。

This is the second half of the *Negative Mass* chain. Its prologue — the colony event *The Doorway* (colony.3005), the portal project (Negative Mass outcome weight 5, zero for AI empires, artificial/city/hive/machine/relic homeworlds, some origins, or if it already happened), 9800, 9805, 9810 *Negative Mass* (clones a scientist leader) and 9815 (a portal appears and a fleet of our own old corvette design attacks) — is now the story event-colony-3005. Destroying that fleet (`on_fleet_destroyed_perp`, the destroyed side carries the `B_world_relation` flag) fires colony.9820 *An Old Code*, once per game.

## 剧情脉络 Story outline

1. **旧版编码（9820）**：舰船来自一个镜像宇宙。→ **跨次元呼叫（9821）**：对方的通讯者是我们那位科学家的复制体（“阿尔法/贝塔”）。可自由询问“你们是什么”“为何没有超光速”（常规、蜂巢、机械各有回答），然后“你们想要什么” → **跨次元呼叫（9822）**：贝塔宇宙正在崩溃，他们请求接纳。“我们必须与专家协商” → 360–380 天后 **峰会（9840）**。
2. **峰会（9840）**四个方案，都会在母星开启局势 **贝塔宇宙的窘境**：
   - 研究该事件 → 方案“观测贝塔宇宙的毁灭”（物理研究+40%）。
   - 搜刮他们的资源 → 方案“趁火打劫贝塔”（每月产出合金、矿物、能量、食物）。
   - 接纳难民（文本随帝国类型变化）→ 母星立即增加6个“非此世”的人口，方案“将贝塔带到我们的宇宙”。
   - 尝试把贝塔母星带过来 → 同一拯救方案。
3. **局势进程**：从 75% 开始（第三阶段）。
   - **拯救**：每月 −7（加倍努力再 −3，前五年每年 +1）。进度降到 74 以下（第二阶段）33 天后：非格式塔 **穿越次元的边界（9855）**／格式塔 **分流优化（9875）**；降到 30 以下（第一阶段）12 天后：非格式塔 **任务：异次元（9860）**（可每 120 天重复）／格式塔 **绝望子个体（9880）**：另一个意识派陆军夺取星球，地面战结果二选一——守住星球 → **跨次元呼叫（9885）**（若选择过“分析原因”可再降 15 进度）；星球失守 → **要求（9890）**（星球交还，进度 +15，方案锁定为拯救）。降到 0 → **乐！（9850）**。
   - **观测或掠夺**：每月 +3（每年 +1，五年后 +10）。升到 95（第四阶段）→ **最后的请求（9870）**：可改为拯救（加倍努力），或“一切尽在掌握”；达到 100 → **虚无（9851）**。

Summary in English: the summit's four answers all start the situation *Plight of the Beta-Universe* on the homeworld, at 75%. The rescue approach drives progress down (stage-2 event after it falls below 74, stage-1 event below 30, rescue at 0); observing or plundering drives it up (the *One Last Plea* at 95, loss at 100). Non-gestalt and gestalt empires get different stage events.

## 分支与结局 Branches and outcomes

- **乐！ Elation!（9850）**：贝塔世界出现在母星系（多数为海洋星球；海洋天堂/海洋机械为海洋、生命播种为盖亚、末日帝国为核爆星球），带 18 个“非此世”人口与 3600 天“被拯救”修正。/ The Beta-world appears in the home system with 18 pops and the *Saved* modifier.
- **虚无 Static（9851）**：探测器记录下贝塔宇宙的终结。/ Probes record the end of the Beta-Universe.
- 两者互斥；“最后的请求”中的反悔可以把失败路线改回拯救。/ Exclusive; regretting at the last plea can turn a losing route into a rescue.

## 条件与文明差异 Conditions and variants

- 9820–9840 的正文与选项按常规/蜂巢/机械三类帝国分别给出；峰会选项文字还按排外、吞噬虫群、终结者变化（已登记为选项文字变体）。/ Texts vary for regular, hive and machine empires; summit option wording also varies (registered as label variants).
- 第二、第一阶段事件按是否格式塔二选一；穿越边界的“他们应该留在那边”仅非平等主义可选。/ Stage events depend on gestalt status; "They should stay on their side" requires non-egalitarian ethics.

## 审阅记录 Review notes

- 已核对 Checked：9800–9880 全部脚本、局势定义（初始进度、月进度修正、三个方案的 potential、四个阶段的 on_first_enter、on_fail/on_progress_complete）、`on_fleet_destroyed_perp`、DPORTAL_PROJECT 的随机权重。
- 合并 Merged：原独立故事 event-colony-9885（9885，`on_colony_defenders_win`）与 event-colony-9889（隐藏 9889 → 9890，`on_colony_attackers_win`）是 9880 地面战的两种结果（00_on_actions.txt:834、868 注释即写明“Negative Mass”），现作为本篇的互斥分支。/ The former single-page stories 9885 and 9889/9890 are the two results of 9880's ground battle and are merged here as exclusive branches.
- 审阅改动 Changes：按局势实际进度方向加入 12 条审阅连接（第二阶段→第一阶段→成功；第四阶段→失败；反悔→第二阶段）；把成功结局下由通用“开局建筑”效果带出的 3 个起源事件连接标为伪连接并抑制；登记 9821 自由问答（按帝国类型选回答）与 9840 选项文字变体；标注两个结局与互斥组。
- 完成 Completed (2026-10-13)：用 `noStageSequence` 关闭局势阶段自动串联，并抑制 局势→9880（已由 9875→9880 桥接放到正确位置），4 条错误的“下一阶段”引用已消失。前半段现为独立故事 event-colony-3005（9815 → 9820 为跨故事连接）。 / Stage auto-chaining switched off with `noStageSequence`; situation→9880 suppressed (placed under 9875 by bridge). The prologue is now its own story event-colony-3005.
- 不确定 Uncertain：若某个月进度从 95 以下直接越过 100，9870 的触发条件会失败，此时直接到 9851。/ If progress jumps past 100 in one tick, 9870's trigger fails and 9851 follows directly.
