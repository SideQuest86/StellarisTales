# 恒星异常现象 / Unusual Star Stuff

- 分类 Category：探索 Exploration · 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：events/anomaly_events_3.txt:815-925 (anomaly.4035, chain start; story anomaly-sun-rays-cat); events/anomaly_events_3.txt:925-1060 (anomaly.4036); common/on_actions/00_on_actions.txt:1023 (on_entering_system_fleet); events/anomaly_events_3.txt:1062 (anomaly.4037); events/failures.txt:456 (anomaly_failure.4037); common/special_projects/00_projects_3.txt:94 (ODD_STAR_PROJECT); events/anomaly_events_3.txt:1097 (anomaly.4038)

## 如何开始 How it starts

事件链“恒星异常现象”由异常 SUN_RAYS_CAT（“令人疑惑的宇宙射线”，另一故事 anomaly-sun-rays-cat）的 anomaly.4035“炉中之火”选项a开启：在该恒星3-8跳内（和2-7跳内）选出两个无主、无敌对、非海盗的候选星系（标志 some_system_1 / some_system_2），并各创建一个兴趣点。

The event chain "Unusual Star Stuff" is started by option a of anomaly.4035 "Fire of the Furnace" of the anomaly SUN_RAYS_CAT ("Cosmic Rays", another story, anomaly-sun-rays-cat): it picks two unowned, non-hostile, non-pirate candidate systems 3-8 and 2-7 jumps away (flags some_system_1 / some_system_2), each with a point of interest.

## 剧情脉络 Story outline

舰队进入候选系统（on_entering_system_fleet → 隐藏的 anomaly.4036）：每个系统40%直接找到那颗恒星 → anomaly.4037（启用项目 ODD_STAR_PROJECT“炉中之火”，科学船+科学家，60天；另一个候选系统被取消）；60%落空——第一次落空会显示 anomaly_failure.4037，第二次落空使计数器完成，同样触发 anomaly.4037。项目完成 → anomaly.4038：根据已有能源科技推进下一级科技，已有零点能则获得每月影响力，事件链结束。

A fleet entering a candidate system (on_entering_system_fleet → hidden anomaly.4036): each system has a 40% chance to be the right star → anomaly.4037 (enables project ODD_STAR_PROJECT "Fire of the Furnace", science ship and scientist, 60 days; the other candidate is cancelled); 60% is a miss — the first miss shows anomaly_failure.4037, the second miss completes the counter and also fires anomaly.4037. Project complete → anomaly.4038: advances the next power tech by the current one, or gives monthly influence with zero-point power; the chain ends.

## 分支与结局 Branches and outcomes

每个候选系统的 40/60 是独立判定，但两次落空后一定会找到（计数器完成）；因此最终必有一次 anomaly.4037。

Each candidate system rolls 40/60 independently, but after two misses the star is found anyway (the counter completes); so anomaly.4037 always happens exactly once.

## 条件与文明差异 Conditions and variants

anomaly.4038 的选项按当前能源科技（裂变/聚变/冷聚变/反物质/零点）互斥。

anomaly.4038's options are exclusive by the current power tech (fission / fusion / cold fusion / antimatter / zero point).

## 审阅记录 Review notes

已核对 anomaly.4035–4038、anomaly_failure.4037、ODD_STAR_PROJECT 与 on_action 钩子（1023）。草稿把成功与落空拆成两个起点（anomaly.4037 的 p=0.40、anomaly_failure.4037 的 p=0.60）；实际是两个候选系统各自独立的判定，必定会找到一次。现合为一个以事件链“恒星异常现象”为起点的故事。

Checked anomaly.4035-4038, anomaly_failure.4037, ODD_STAR_PROJECT and the on_action hook (1023). The draft showed success and miss as two entries (anomaly.4037 p=0.40, anomaly_failure.4037 p=0.60); in fact the two candidate systems roll independently and the star is always found once. They are now one story starting from the chain "Unusual Star Stuff".
