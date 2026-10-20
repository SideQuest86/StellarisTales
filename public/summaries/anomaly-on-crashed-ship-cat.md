# 失事地点 / Crash Site

- 分类 Category：深空异闻 Exploration · DLC：上古遗物 Ancient Relics（ancrel 考古事件 archaeology events）

## 如何开始 How it starts

拥有非集体意识且存在科学家领袖的国家，在小行星上可能生成（2级，权重3；集体意识所有者权重为0）。

A non-gestalt country with a scientist leader can find it on an asteroid (level 2, weight 3; weight 0 for gestalt owners).

## 剧情脉络 Story outline

anomaly.7030“失事地点”清除矿藏，唯一选项在小行星上创建考古遗址 site_rage_sage_dig“毁灭的种子”（4个阶段，需要科学家，仅非集体意识帝国可见；30天后 story.5 报告）。阶段依次为 ancrel.14001“笼中怒”（外星飞船里船员互相残杀）→ 14002“精密实验室”（有毒药剂实验室）→ 14003“丢掉开关！”（重启反应堆或运行诊断，两者都随机（各50%）引出 14004“极乐爆发”或 14005“狂怒爆发”，是延误的小插曲，无遗物奖励）→ 14006“技术的诱惑”。阶段1-3各给一个小型遗物；14006 二选一：a 小型遗物并永久获得 rage_sage_soldiers 修正；b 小型遗物与100影响力。

anomaly.7030 "Crash Site" clears the deposits and its only option creates the archaeological site site_rage_sage_dig "Seeds of Destruction" on the asteroid (4 stages, needs a scientist, visible only to non-gestalt empires; a story.5 report 30 days later). The stages run ancrel.14001 "Rage in a Cage" (the ship's crew tore each other apart) → 14002 "Elaborate Laboratory" (a toxic-gas pharmacy lab) → 14003 "Throw the Switch!" (restart the reactor or run diagnostics; both options trigger, 50% each, 14004 "Bliss Outbreak" or 14005 "Rage Outbreak", a delaying side event with no artifact reward) → 14006 "Temptations of Technology". Stages 1-3 each give a small artifact; 14006 is a choice: a a small artifact and the permanent rage_sage_soldiers modifier; b a small artifact and 100 influence.

## 分支与结局 Branches and outcomes

阶段顺序固定；14004 / 14005 为 50/50 的插曲；14006 的 a / b 二选一。遗址的失败事件（ancrel.8200–8215，爆炸性减压、系统关闭）是所有飞船类遗址共用的事故，不属于本故事。

The stage order is fixed; 14004 / 14005 are a 50/50 side event; 14006's a / b are alternatives. The site's failure events (ancrel.8200-8215, Explosive Decompression, System Lockout) are incidents shared by all spaceship sites, not part of this story.

## 条件与文明差异 Conditions and variants

遗址只对非集体意识帝国可见；失败事件的文本对机器人物种有变体。

The site is visible only to non-gestalt empires; the failure events have text variants for robotic species.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：common/anomalies/00_anomaly_categories.txt:928 (on_crashed_ship_cat); events/anomaly_events_4.txt:3853 (anomaly.7030); common/archaeological_site_types/02_ancient_relics_arc_sites.txt:2473 (site_rage_sage_dig, 4 stages); events/ancient_relics_arcsite_events_2.txt:9753-9890 (ancrel.14001-14006); events/ancient_relics_random_site_events.txt:1430-1640 (ancrel.8200-8215, shared failures)
已核对异常、anomaly.7030、遗址定义与 ancrel.14001–14006。修正：编译器把无名阶段的事件全部列为遗址的并列子节点，现用审阅连接还原 14001→14002→14003→14006，并抑制并列的假边；ancrel.8200–8203 / 8215 是所有飞船/空间站类遗址共用的失败事故，标为枢纽。

Checked the anomaly, anomaly.7030, the site definition and ancrel.14001-14006. Correction: the compiler lists the events of unnamed stages as parallel children of the site; reviewed links now restore 14001 → 14002 → 14003 → 14006 and the false parallel edges are suppressed; ancrel.8200-8203 / 8215 are failure incidents shared by all spaceship and station sites and are marked as hubs.
