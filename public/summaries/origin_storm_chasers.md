# 追风者 / Storm Chasers

- 分类 Category：起源 Origins · DLC：Cosmic Storms

## 如何开始 How it starts

开局隐藏事件 cstorms.3101 启动局势“风暴降临”。游戏进入中期后（隐藏 3200）：若风暴降临仍在进行，每 1800 天重新检查，否则 15 天后出现 3205“风暴热”。
At game start hidden cstorms.3101 starts the Stormfall situation. After mid-game (hidden 3200) it re-checks every 1800 days while Stormfall still runs, otherwise 3205 *Storm Fever* appears after 15 days.

## 剧情脉络 Story outline

1. **风暴降临**：进度 0–750、三个阶段：3100（项目“酝酿风暴”→ 3105）→ 3140 → 3170；每月故事 3110 / 3130 / 3160；完成时 3190。
   **Stormfall**: three stages 3100 (Tempest Brewing project -> 3105) -> 3140 -> 3170; monthly stories 3110 / 3130 / 3160; completion 3190.
2. **风暴热**：3205 → 六项挑战（击败风暴中的舰队 305、探索边缘 310、驾驭风暴 315、调查遗留异常 320、传播欢乐 325、风暴骑手死亡/失踪 330 / 331），顺序任意；全部完成 3215 → 1800±360 天后 3220。
   **Storm Fever**: 3205 -> six challenges in any order -> 3215 -> 3220 1800+0-360 days later.
3. **风暴狂热**：3220 → 项目“引诱大风暴”→ 3222 → 3224 → 3225 → 项目“隐藏菜品”（可重复喂养 3226）→ 3227 → 3230（大风暴诞生）或 3235（风暴尾声）。
   **Storm Frenzy**: 3220 -> Entice the Big One -> 3222 -> 3224 -> 3225 -> Something Off the Menu (repeatable feeding 3226) -> 3227 -> 3230 or 3235.

## 分支与结局 Branches and outcomes

- 结局二选一：3230 / 3235（3227 的选项）。 Two endings: 3230 / 3235.

## 条件与文明差异 Conditions and variants

游牧（方舟）帝国的风暴固定在锚点星系，其他帝国在首都所在星系。 Nomad empires keep the storm at a fixed anchor system; others at the capital system.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：`events/origin_events_cosmic_storms.txt`、`common/situations/07_cosmic_storms_situations.txt:431-600`、`common/missions/missions/00_missions_cosmic_storms.txt`、`common/special_projects/03_projects_cosmic_storms.txt`
- 本导读是审阅者的说明文字，不是游戏原文。 This guide is reviewer commentary, not game text.
- 已核对 Checked：cstorms.3100–3235、300–331、风暴降临局势、任务钩子、on_action。 Events, the situation, mission hooks and on_actions.
- 更正 Corrections：六项挑战原为孤立入口，现挂在“风暴热”事件链下并标注并列与门槛 3215。 The six challenges were floating entries; now under the Storm Fever chain as a parallel group with gate 3215.
- 不确定 Uncertain：任务定义只读取了事件钩子。 Mission definitions read only for event hooks.
