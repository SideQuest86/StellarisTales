# 未知内部 / Unknown Insides

- 分类 Category：深空异闻 Exploration · DLC：无DLC检查（定义位于《遥远繁星》文件中，但类别与事件都不检查 has_distar）/ no DLC check (defined in the Distant Stars files, but neither category nor events test has_distar)

## 如何开始 How it starts

无战略资源的小行星可能生成（3级，权重2）；格式塔帝国为0（注释：剧情不适用于蜂巢与机器人）。

Can spawn on asteroids without strategic resources (level 3, weight 2); 0 for gestalt empires (script comment: the fiction does not work for hive minds/robots).

## 剧情脉络 Story outline

distar.3000“内部机械”：小行星里藏着储能巨大的机械。
- 小心挖掘 → distar.3001：里面是见人就攻击的旧采矿无人机，科学官及时干扰并使其失效，可以抽取其能量。
- 钻探取样 → distar.3002：无人机被惊醒。若小行星不在他国境内，15天后隐藏 distar.3004 生成10艘敌对“远古采矿无人机”，90天后 distar.3003 把消息传回首都，开启 trojan_asteroid_project（30天）→ distar.3005：无人机守护的是富含矿物的核心（矿物矿藏）。

distar.3000 "Machinery Inside": the asteroid hides machinery holding a lot of stored energy.
- Excavate carefully → distar.3001: old mining drones programmed to attack are jammed and disabled; their cores can be siphoned for energy.
- Probe it → distar.3002: the drones wake. If the asteroid is not inside another empire's borders, the hidden distar.3004 spawns 10 hostile "Ancient Mining Drones" after 15 days, and after 90 days distar.3003 reports back home and opens trojan_asteroid_project (30 days) → distar.3005: the drones were guarding a mineral-rich core (minerals deposit).

## 分支与结局 Branches and outcomes

两个选项通向互斥的结果；钻探路线还需击败或避开无人机。

The two options lead to exclusive results; the probe route also involves the drone fleet.

## 条件与文明差异 Conditions and variants

无文明差异选项。

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-12（已审阅 reviewed）
- 来源 Sources：common/anomalies/95_anomaly_categories_distant_stars.txt:1535-1555; events/distant_stars_events_2.txt:6933 (distar.3000); events/distant_stars_events_2.txt:6968/6987 (distar.3001/3002); events/distant_stars_events_2.txt:7027-7114 (distar.3003, 3004); common/special_projects/00_projects_distant_stars.txt:693 (trojan_asteroid_project); events/distant_stars_events_2.txt:7117 (distar.3005)
已核对异常、distar.3000–3005 与项目。树结构正确；3004 为隐藏生成舰队事件。

Checked the anomaly, distar.3000–3005 and the project. Tree correct; 3004 is a hidden fleet-spawn event.
