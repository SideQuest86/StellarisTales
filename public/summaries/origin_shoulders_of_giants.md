# 屹于巨人之肩 / On the Shoulders of Giants

- 分类 Category：起源 Origins · DLC：Federations · 审阅 Reviewed 2026-10-13
- 来源 Sources：`events/origin_events_2.txt:785-3060`、`common/archaeological_site_types/03_federations_arc_sites.txt:62-489`、`common/special_projects/00_projects_federations.txt`、`common/on_actions/00_on_actions.txt`

> 本导读是审阅者的说明文字，不是游戏原文。 This guide is reviewer commentary, not game text.

## 如何开始 How it starts

开局隐藏事件 origin.1199 在母星系的卫星或岩石行星上创建遗址“重力之下”（Ex Gravitas），并按需补足行星数量。遗址可见 30 天后触发一份通用的接触报告（story.5）。
At game start hidden origin.1199 creates the Ex Gravitas site on a moon or rocky planet of the home system and adds planets if needed. 30 days after the site becomes visible a generic contact report (story.5) fires.

## 剧情脉络 Story outline

1. **五处遗址依次连锁**：Ex Gravitas（1200 → 1205 → 1210 → 1215）→ 3 天后“静待揭晓”（1220–1235）→ “深埋”（1240–1245）→ “纪念”（1250–1265）→ “最后的遗世之幢”（1270–1285）→ “黑暗秘密”（1290、1295，随后随机结果）。
   **Five chained sites**: Ex Gravitas -> Something Waiting -> Buried Deep -> In Memoriam -> The Last Stand -> Dark Secret; each last stage spawns the next site after about 3 days.
2. **黑暗秘密的结局**：第三阶段五选一（1300 / 1305 / 1315 / 1320 / 1325，各 20%）；1305 之后是 1310（第二部分），其余为 1330。1310 或“愿尔安好”（1325）设置“追踪无情者”，其余设置“中断的历史”。
   **Dark Secret outcome**: one of five at random; 1305 continues with 1310, others with 1330; Godspeed or 1310 sets *relentless pursuit*, otherwise *intercepting history*.
3. **游戏中期之后（五年脉冲，隐藏 1334）**：
   **After mid-game (five-year pulse, hidden 1334)**:
   - 拦截历史：1335 → 项目“追踪”→ 1340 → 抵达终点星系 1345 → 项目 → 1350 → 抵达恩人家园 1351 → 接触恩人文明 1355 → 项目“衔尾蛇”→ 遗址“善意的谎言”（1365 → 1370）→ 1360。
     *Intercepting history*: 1335 -> Pathfinding -> 1340 -> 1345 -> project -> 1350 -> 1351 -> contact 1355 -> Project Ouroboros -> Benign Cover-Up site -> 1360.
   - 不懈追寻：1380 → 项目“追踪猎食者”→ 1385 → 抵达会合星系 1390 → 项目 → 1395 → 抵达暴君安息地 1400 → 项目“古老信标”→ 1405 → 遗址“放下屠刀”（1410 → 1415）→ 1420。
     *Relentless pursuit*: 1380 -> Tracking the Predator -> 1385 -> 1390 -> project -> 1395 -> 1400 -> Old Beacon -> 1405 -> Bury the Hatchet site -> 1420.

## 分支与结局 Branches and outcomes

- 两条延续线互斥，由黑暗秘密的结果决定。 The two continuations are exclusive and depend on the Dark Secret outcome.
- 结局：1360（了结）、1420（并非敌人）。 Endings: 1360, 1420.

## 条件与文明差异 Conditions and variants

遗址均要求科学家领袖；失败结果为各遗址的随机事件。 Sites require a scientist leader; failures use each site's random events.

## 审阅记录 Review notes

- 已核对 Checked：全部 1199–1420 事件、七处遗址定义、项目、on_action 钩子。 All events 1199-1420, the seven site definitions, projects and hooks.
- 更正 Corrections：黑暗秘密第三/四阶段由编译器串成一条链，现改为五选一并抑制错误的阶段边；补上各个“舰队抵达”类状态连接（1340→1345、1350→1351、1351→1355、1385→1390、1395→1400）。
  The compiler chained Dark Secret stage-3/4 alternatives; now five-way exclusive with the false stage edges suppressed; fleet-arrival links added.
- 不确定 Uncertain：中段项目选项只通过 on_success 钩子阅读。 Mid-chain projects read through their on_success hooks only.
