# 采掘蘑菇 / Mushroom Picking

- 分类 Category：文明纪事 Society (C7)

## 如何开始 How it starts

- 殖民地2岁（15/958）时的随机事件；全局仅一次（fumongus_colony）；排除火山、方舟及荒野帝国星球。
  Random colony event at age 2 (15/958); once per game (fumongus_colony); excludes volcanic, ark and wilderness-empire planets.

## 剧情脉络 Story outline

- 2060「采蘑菇」：a 清除蘑菇（影响力与食物）；b 仔细观察（仅当帝国未得到过 Fumongus，35+随机40天后 2065）；c 我们认识它们（仅当帝国已有 Fumongus 标志，35+随机40天后 2080）。
  2060 "Mushroom Picking": a dispose of them (influence and food); b a closer look (only without the fumongus_ours flag; 2065 after 35 days + random 40); c we know them (only with that flag; 2080 after 35 days + random 40).
- 未发掘线：2065「孢子有耳」→ 选项a（研究）后 2070（网络活跃）或 2075（不活跃，设完成标志）；选项b给影响力。
  Not-excavated line: 2065 -> option a (research) leads to 2070 (network active) or 2075 (inactive, sets the completion flag); option b gives influence.
- 已发掘线：2080「菌丝阵列」→ a 发展孢子 → 2095「菌群增殖」（吃掉/研究）；b 监听人口（非意识集合体）→ 10% 2085「人口不满」（中止或继续，继续后 25+随机20天 2090）/ 90% 2090「监控生效」；c 网络被拆除时的选项。
  Excavated line: 2080 "Mycelium Array" -> a develop the spores -> 2095 "Growing More Spores" (eat / study); b tune the network to spy on pops (non-Gestalt-Consciousness) -> 10% 2085 "Pops Unhappy" (abort or proceed; proceeding leads to 2090 after 25 days + random 20) / 90% 2090 "Surveillance Active"; c option when the network was dismantled.

## 分支与结局 Branches and outcomes

- 未发掘与已发掘两条线互斥（取决于玩家是否已有 fumongus_ours 标志）。
  The two lines are exclusive (set by whether the player already has the fumongus_ours flag).

## 条件与文明差异 Conditions and variants

- b/c 选项由 fumongus_active / fumongus_dismantled 全局标志限定。
  Options b/c are gated by the fumongus_active / fumongus_dismantled global flags.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：`events/colony_events_2.txt:4524-4835`；`common/on_actions/00_on_actions.txt:3774`
- 已核对：触发、三个主选项、两条线的延迟与随机权重。
  Checked: trigger, the three main options, delays and random weights of both lines.
- 不确定：这些标志来自 Fumongus 发掘点故事（其他审阅者负责）。
  Uncertain: those flags come from the Fumongus excavation-site story (owned by another reviewer).
