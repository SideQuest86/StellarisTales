# 废弃外星平台 / Deserted Star Platform

- 分类 Category：深空异闻 Exploration · DLC：《遥远繁星》Distant Stars（has_distar）

## 如何开始 How it starts

《遥远繁星》专属脉冲星星系 star_lifting_system（至多一个）中的恒星由初始化带有4级、全局一次的异常。

In the Distant Stars pulsar system star_lifting_system (at most one) the star receives this level-4, once-per-game anomaly from the initializer.

## 剧情脉络 Story outline

distar.1020“热能驱动流出”：软体动物设计的平台曾用微波束加热恒星大气，引发持续喷发以收集能量。
- 修复：STAR_LIFTING（需工程船/方舟，60天）→ distar.1021“与火共舞”：险些引发毁灭性恒星爆发，校准后平台运转；恒星获得能量矿藏。
- 武器化（尚未掌握全部五级激光时）：STAR_LIFTING_WEAPONS（60天）→ distar.1022：若仍缺激光科技则成功（推进下一级激光科技），否则平台爆炸失败。
- 离开。

distar.1020 "Thermal Driven Outflow": a molluscoid-built platform once heated the star's atmosphere with microwave beams to harvest the outflow.
- Repair: STAR_LIFTING (constructor/arkship, 60 days) → distar.1021 "Playing with Fire": a near-catastrophic eruption is averted and the platform runs; the star gains an energy deposit.
- Weaponise (if not all five laser techs are known): STAR_LIFTING_WEAPONS (60 days) → distar.1022: succeeds (progress to the next laser tech) if lasers are still missing, otherwise the platform explodes.
- Leave.

## 分支与结局 Branches and outcomes

三个选项互斥；distar.1022 的成功/失败文本由完成时的激光科技决定。

The three options are exclusive; distar.1022's success/failure text depends on laser techs at completion.

## 条件与文明差异 Conditions and variants

distar.1021.b（嘲讽软体动物）不对软体类物种开放。

distar.1021.b (mocking molluscs) is hidden from molluscoid species.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-12（已审阅 reviewed）
- 来源 Sources：common/solar_system_initializers/distant_stars_initializers.txt:5-72 (star_lifting_system); common/anomalies/95_anomaly_categories_distant_stars.txt:1087-1099; events/distant_stars_events_2.txt:1744 (distar.1020); common/special_projects/00_projects_distant_stars.txt:1016/1046 (STAR_LIFTING, STAR_LIFTING_WEAPONS); events/distant_stars_events_2.txt:1808 (distar.1021); events/distant_stars_events_2.txt:1857 (distar.1022)
已核对初始化、异常、distar.1020–1022 与两个项目。树结构正确。30天后的通用接触报告 story.5 是共享事件，不属于本故事。

Checked initializer, anomaly, distar.1020–1022 and both projects. Tree correct. The generic contact report story.5 30 days later is a shared helper, not part of this story.
