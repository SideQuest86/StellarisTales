# 以牙还牙 / Payback

- 分类 Category：起源 Origins · DLC：First Contact · 审阅 Reviewed 2026-10-13
- 来源 Sources：`events/origin_events_4.txt:1-3620`、`common/archaeological_site_types/07_first_contact_dlc_arc_sites.txt:1-59`、`common/special_projects`、`common/deposits/09_first_contact_deposits.txt:70-85`、`common/on_actions/00_on_actions.txt`

> 本导读是审阅者的说明文字，不是游戏原文。 This guide is reviewer commentary, not game text.

## 如何开始 How it starts

开局隐藏事件 origin.4000 在首都创建“战争创伤”遗址与残骸；隐藏的 4005 随后安排两条主线：180天后 4900“取回战舰”（轨道残骸清理项目），约3600天后 4010“账单”（债务催收者）。
At game start hidden origin.4000 creates the dig site and debris at the capital; hidden 4005 then schedules two lines: 180 days later 4900 (orbital debris cleanup project) and about 3600 days later 4010 *The Bill* (debt collectors).

## 剧情脉络 Story outline

1. **战舰线**：4900 → 项目“轨道残骸清理”（4930 完成一半，4931 完成）→ 遗址变为可勘探 → 阶段 4905 → 4910（三选一：剖析/游行/安葬）→ 4920 → 4925 → 同时启用项目“旗舰修复”（4934）与“栖息地修复”（4935）。研发三级以上星港科技后可升级旗舰（4936）。
   **Warship line**: 4900 -> debris project (4930 half, 4931 done) -> the site becomes surveyable -> stages 4905 -> 4910 (dissect / parade / burial) -> 4920 -> 4925 -> projects Flagship Restoration (4934) and Habitat Restoration (4935). Starbase tech 3-5 later allows an upgrade (4936).
2. **债务线**：4010 → 1800天后 4015：付款（4016）、拒绝（4019）。付款可用能量/消费品/合金/人口，之后每5400天回访（4029 → 4030）；拒绝则战斗，赢（4020）或输被轰炸（4025）。第二次交涉后 15 天 4040：选择武力或言辞。击败3次后 4021 奴隶贩子大怒。
   **Debt line**: 4010 -> 1800 days later 4015: pay (4016) or refuse (4019). Paying (energy / consumer goods / alloys / pops) is followed by visits every 5400 days; refusing means a fight, won (4020) or lost with bombardment (4025). After the second meeting 4040: force or words. Three defeats lead to 4021.
3. **复仇**：武力（4041 → 复仇战争事件链，胜利 4060/4061，或被他人抢先 4070/4071）；言辞（4042 → 加入银河议会 4050 选“平等地位”或“不干涉”两条线 → 决议里程碑 4052、全部通过 4055）。
   **Revenge**: by force (4041 -> chain, won 4060/4061, or stolen by others 4070/4071) or by words (4042 -> Galactic Community 4050, Equal Standing or Non-interference -> resolution milestones 4052, all passed 4055).

## 分支与结局 Branches and outcomes

- 复仇结局互斥：武力 4060/4061、被抢 4070/4071、言辞 4055。 Revenge endings: 4060/4061, 4070/4071, 4055.
- 与奴隶贩子首次接触（4200/4205/4210）为首次接触阶段。 First-contact stages with the slavers: 4200/4205/4210.

## 条件与文明差异 Conditions and variants

- 与“破碎枷锁”互助（4110–4141）、巨兽被灭（4150）、提升原始文明（4160）、资源赤字（4170）为状态触发的小事件。 Small state-triggered events: mutual support (4110-4141), leviathan slain (4150), uplift (4160), deficits (4170).
- 基因诊所线（4300–4306）：每十年可能触发，诊所损坏后选择修复或改作纪念设施。 Gene clinic line (4300-4306): a decade pulse can break the clinic; repair or repurpose it.

## 审阅记录 Review notes

- 已核对 Checked：全部 4000–4936 事件窗口、遗址与项目定义、on_action 钩子、事件链计数。 All 4000-4936 windows, the site and projects, on_action hooks and chain counters.
- 更正 Corrections：遗址在清理项目后才可见（新增连接）；债务战斗→4020/4025；复仇结局与诊所事件接入各自事件链；移除误并入的宇宙风暴“坚守战线”遗址（cstorms.1270，原因是其触发条件在 if 中提到本起源）与通用“起源升级”路由 origin.112/113（连带破碎枷锁遗址）。
  The dig site only opens after the cleanup project (new link); fights -> 4020/4025; revenge endings and clinic events attached to their chains; removed the cosmic-storm Hold the Line site (cstorms.1270 mentions the origin inside an if) and the generic uplift routers origin.112/113 (which dragged in the Broken Shackles site).
- 不确定 Uncertain：复仇事件链的计数细节仅通过消费事件阅读。 Swords-chain counter details read only through the consuming events.
