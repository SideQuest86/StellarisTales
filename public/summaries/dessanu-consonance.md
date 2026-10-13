# 德萨努协和国 / The Dessanu Consonance

- 分类 Category: 探索 Exploration · 来源 Sources: `events/gray_goo_events.txt:754-2135`, `events/distant_stars_events_3.txt:1110-1135, 1375-1378`, `events/observer_events.txt:1130-1155` · 远星（Distant Stars）DLC · 审阅 Reviewed 2026-10-13 (c5b-crisis)

> 审阅者导读（评注），不是游戏原文。 / Reviewer commentary, not game text.

## 如何开始 How it starts

- 开局随机（`distar.8000`，权重 30）若选中 `gray_goo_empire_set`，则打开 L 星门（`distar.10950`）时触发隐藏的 `graygoo.100`：建立德萨努协和国（门径建造者）并开通 L 星团；随后发出 `graygoo.110`「链接已建立」和 observer.66。
- Only when the game-start roll picked the Dessanu outcome does opening the L-Gate fire hidden graygoo.100.

## 剧情脉络 Story outline

- 110 的选项→ `graygoo.115` 截获的信号；其他国家按是否持有 L 星团线索得到 111 或 112（互斥），再接 116。
- 之后没有固定顺序，取决于玩家行为：
  - **通讯**（可重复，非剧情步骤）：`graygoo.120` 开场；121 的问答树（122-126）；`graygoo.119` 再次询问；追问纳米机器到底（126）会使德萨努转为敌对。
  - **越界**：首次进入工厂星系 `graygoo.160`，要求 60 天内离开 → `graygoo.161`；再次进入 `graygoo.162`。
  - **冲突**：与其舰船交战 `graygoo.155`；地面攻陷其殖民地 `graygoo.150`（星球化为灰蛊）→ 3 天后 `graygoo.156`。
  - 敌对后的通讯改为 `graygoo.130`；若持有「德萨努赠礼」修正的国家与其敌对，每月检查后 `graygoo.184` 终止赠礼。

## 分支与结局 Branches and outcomes

- **结局**：摧毁工厂（隐藏的 `graygoo.180`）→ 击破者 `graygoo.181`，其他玩家 `graygoo.182`，观察者 observer.67；协和国所有人与舰队化为灰尘并销毁国家，盖亚星球变为灰蛊星球。
- 敌对的来源（160/161/162/155/150/126）互为并列，任一都会设置 `gate_builders_hostility`。

## 条件与文明差异 Conditions and variants

- 通讯事件要求 From 为 `gate_builders` 国家，且未处于对话中；`graygoo.120` 与 `130` 按敌对标记二选一。

## 审阅记录 Review notes

- 由原“星团的秘密”拆出。通讯屏幕是 on_custom_diplomacy 的可重复菜单，已标注而没有穿插进主线。
- 未追踪：`dessanu_gift` 修正的来源；问答树的其余后果。
