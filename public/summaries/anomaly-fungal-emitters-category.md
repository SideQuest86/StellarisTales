# 怪异辐射 / Strange Emissions

- 分类 Category：深空异闻 Exploration · 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：common/anomalies/00_anomaly_categories.txt:832; events/anomaly_events_4.txt:1769 (anomaly.6755); common/special_projects/00_projects_3.txt (FOLLOWING_FUNGI_PROJECT); events/anomaly_events_4.txt:1898 (anomaly.6770); events/anomaly_events_4.txt:1956 (anomaly.6780); common/event_chains/00_event_chains.txt:360 (fumongus_chain); events/anomaly_events_4.txt:1813 (anomaly.6760); common/special_projects/00_projects_3.txt (MUSHROOMING_NETWORK_PROJECT); events/anomaly_events_4.txt:1982 (anomaly.6785); events/anomaly_events_4.txt:1849 (anomaly.6765); common/solar_system_initializers/special_system_initializers.txt:1646 (fumongus_spawned); events/ancient_relics_arcsite_events_2.txt:9628-9744 (fumongus_active/resolved/dismantled)

## 如何开始 How it starts

福蒙格斯系统生成（special_system_initializers.txt:1646 设置全局标志 fumongus_spawned）后，该系统1-12跳内的荒芜星球可能生成（4级，权重30）。哪个结果出现取决于福蒙格斯任务的进度（见下）。

Once the Fumongus system has been spawned (special_system_initializers.txt:1646 sets the global flag fumongus_spawned), a barren planet within 1-12 jumps of it can spawn this (level 4, weight 30). Which result appears depends on the progress of the Fumongus quest (below).

## 剧情脉络 Story outline

- 任务未解决：anomaly.6755“真菌发射器”：a 启用项目 FOLLOWING_FUNGI_PROJECT“真菌航迹”（360天）；b 每月能量；c 每月团结。项目完成后（若任务未被解决/启用/拆除）80% anomaly.6770“跟随真菌”：开启事件链“真菌航迹”并在福蒙格斯系统创建兴趣点（舰队进入该系统时 anomaly.6775 清除链）；20% anomaly.6780“跟随真菌”（找不到信号：每月社会研究）。
- 已解决且启用：anomaly.6760：a 启用项目 MUSHROOMING_NETWORK_PROJECT“嫁接孢子”（2000，社会）→ anomaly.6785“蘑菇网络”（把 mycelial_network_modifier 升级为改良版，标本 mutated_fumongus）；b 每月社会研究。
- 已解决且拆除：anomaly.6765：三选一，每月社会研究、能量或影响力。

- Quest unresolved: anomaly.6755 "Fungal Emitters": a enables project FOLLOWING_FUNGI_PROJECT "The Fungal Trail" (360 days); b monthly energy; c monthly unity. After the project (if the quest is not yet resolved, active or dismantled) 80% anomaly.6770 "Following the Fungi": starts the event chain "The Fungal Trail" with a point of interest in the Fumongus system (anomaly.6775 clears the chain when a fleet enters that system); 20% anomaly.6780 "Following the Fungi" (the signal cannot be traced: monthly society research).
- Resolved and active: anomaly.6760: a enables project MUSHROOMING_NETWORK_PROJECT "Grafting the Spores" (2000, society) → anomaly.6785 "Mushrooming the Network" (upgrades mycelial_network_modifier to the improved version, specimen mutated_fumongus); b monthly society research.
- Resolved and dismantled: anomaly.6765: a three-way choice of monthly society research, energy or influence.

## 分支与结局 Branches and outcomes

三个起始结果由任务状态决定（互斥）；6755 的项目结果 6770 / 6780 为 80/20，且任务已有进展时 6770 的权重为0。

The three starting results are decided by the quest state (exclusive); the project results 6770 / 6780 of 6755 are 80/20, and 6770's weight is 0 once the quest has progressed.

## 条件与文明差异 Conditions and variants

无文明差异。

No empire differences.

## 审阅记录 Review notes

已核对异常、6755–6785、三个项目与福蒙格斯标志。草稿把三个结果显示为 p=0.33*（平均值），实际按任务状态互斥，已加互斥组说明。福蒙格斯系统本身（异常 ALPHA_CENTAURI_CAT、考古遗址、殖民事件）属于其他故事（c3b 的 anomaly-alpha-centauri-cat 等），这里只是通向它的线索。

Checked the anomaly, 6755-6785, the three projects and the Fumongus flags. The draft shows the three results at p=0.33* (an average); in reality they are exclusive by quest state, now stated by an exclusive group. The Fumongus system itself (anomaly ALPHA_CENTAURI_CAT, the archaeological site, colony events) belongs to other stories (e.g. c3b's anomaly-alpha-centauri-cat); this story is only the breadcrumb leading to it.
