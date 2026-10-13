# 星界奇迹 / Astralnomical Marvel

- 分类 Category：星界裂隙 Astral rifts (C4) · DLC：星界位面 Astral Planes
- 来源 Sources：`events/astral_planes_events.txt:4435–4920`（6029–6059）；`common/on_actions/00_on_actions.txt:3845, 3865, 3888, 5017`
- 审阅 Reviewed：2026-10-13（全篇 whole story）

## 如何开始 How it starts

隐藏的行星事件 `astral_planes.6029` 作为随机事件（权重 20）出现在殖民地 3、4、5 岁时（`on_colony_3/4/5_years_old`）。条件：玩家的非首都、非母星、原始所有者的宜居殖民地，所在星系有星界裂隙或星界疤痕；帝国不是格式塔 / 机械 / 唯物主义者，尚未开始探索裂隙，也没触发过本事件（国家标记 `has_found_astral_rift_marvel` / `has_found_astral_scar_marvel`，二选一）。

The hidden planet event `astral_planes.6029` fires as a random event (weight 20) when a colony is 3, 4 or 5 years old. Conditions: a player's non-capital, non-homeworld, originally-owned habitable colony in a system with an astral rift or astral scar; the empire is not gestalt / robot / materialist, has not started exploring rifts and has not had this event (country flag `has_found_astral_rift_marvel` or `has_found_astral_scar_marvel`).

## 剧情脉络 Story outline

每章间隔 180 天 + 最多 120 天随机。

1. 星界奇迹（6030）：殖民者痴迷于天空中的裂隙（或星界疤痕）；行星得“兴趣”修正。
2. 冲突的视景（6035）：幻象分裂为“机械神”与“黑星”两派（行星稳定度降低）。
3. 分歧扩大（6040）：宣布支持机械神（→ 6050）或黑星（→ 6050），或两者都否（→ 6045）。
4. 6045 后理论冲突：一名人口被杀 → 6055 争论管制。

Each chapter follows the last by 180 days plus up to 120 random days.

1. Astralnomical Marvel (6030): colonists are fascinated by the rift (or scar) in the sky; the planet gets an “interest” modifier.
2. Conflicting Visions (6035): the visions split into a “mechanical god” and a “black star” camp (stability drops).
3. Widening Divide (6040): endorse the mechanical god (→ 6050) or the black star (→ 6050), or reject both (→ 6045).
4. 6045 Post-Theoretical Conflict: one pop is killed → 6055 Debate Curtailed.

## 分支与结局 Branches and outcomes

- 6050 星界狂热（支持一种视景）：凝聚力收入、国家修正 `astral_zeal_modifier`；此后每次完成裂隙探索，隐藏事件 6059 再给凝聚力。
- 6055 争论管制（否定两者）：行星修正“星界爱好者”（物理研究 +20%，裂隙探索速度 +20%）与凝聚力收入。

- 6050 Astral Zeal (one vision endorsed): a unity income and the country modifier `astral_zeal_modifier`; hidden event 6059 grants more unity after each completed rift exploration.
- 6055 Debate Curtailed (both rejected): planet modifier “astral aficionados” (physics research +20%, rift exploration speed +20%) and a unity income.

## 条件与文明差异 Conditions and variants

- 正文随裂隙版 / 疤痕版（国家标记）变化；6050 的正文还随所选视景（机械神 / 黑星）变化。
- 疤痕版在 6050 / 6055 后会阻止该疤痕再生成异常。

- Text varies between the rift and scar versions (country flags); the text of 6050 also varies with the chosen vision (mechanical god / black star).
- The scar version prevents the scar from generating anomalies after 6050 / 6055.

## 审阅记录 Review notes

- 已核对：6029–6059 全部事件及其 `on_actions` 条目、相关静态修正。编译结构正确；补充互斥组、结局、说明。
- 不确定：6050 / 6055 是否清除 `widening_divide_N` 修正，在这些事件中未见。

- Checked: all events 6029–6059, their `on_actions` entries and the related static modifiers. Compiled structure was correct; added the exclusive group, endings and notes.
- Uncertain: whether 6050 / 6055 clear the `widening_divide_N` modifier is not visible in these events.
