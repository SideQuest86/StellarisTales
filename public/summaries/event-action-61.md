# [LastKilledCountryName]的末日 / End of the [LastKilledCountryName]

- 分类 Category: C8 银河轶事 / C8 Galactic miscellany · 来源 Sources: events/on_action_events_1.txt:6640-6840; common/on_actions/00_on_actions.txt:3603-3609 on_country_destroyed; events/observer_events.txt:26-55; events/synthetic_dawn_events.txt:2455-2890 · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

国家被摧毁时（on_country_destroyed，00_on_actions.txt:3603-3609），隐藏事件 action.61 通知其余玩家（仅限非附庸的默认国家、堕落帝国或觉醒堕落帝国，且未被“静默摧毁”标记）。

When a country is destroyed (on_country_destroyed, 00_on_actions.txt:3603-3609) hidden action.61 notifies the others (non-subject default, fallen or awakened fallen empires only, not flagged silence_destroy_event).

## 剧情脉络 Story outline

按被毁国家的类型分三种互斥情形：(1) 普通国家且没有机械叛乱战争——每个与其有通讯的玩家国收到 action.62，观察者收到 observer.2；(2) 机械叛乱战争中被毁的国家——其他有通讯的国家收到 syndaw.1030（毁灭者是机械帝国）或 syndaw.1035，毁灭者自己收到 syndaw.1201 或 syndaw.1206（并带出观察者版本 observer.82/83）；(3) 未被同化的堕落帝国——action.63 与 observer.3。

Three exclusive cases by the destroyed country: (1) an ordinary country with no machine-uprising war - every player empire in contact gets action.62 and observers observer.2; (2) a country destroyed in a machine-uprising war - the others in contact get syndaw.1030 (destroyer is a machine empire) or syndaw.1035, the destroyer itself gets syndaw.1201 or syndaw.1206 (with observer versions observer.82/83); (3) a fallen empire not assimilated - action.63 and observer.3.

## 分支与结局 Branches and outcomes

action.62 的 after 块：若玩家有 payback_stolen_revenge 标记则 15 天后触发 origin.4070，若有 payback_killed_MSI 则触发 origin.4061（“偿还”起源，属其他故事）。纪念主义文明有额外选项。

The after block of action.62: with the payback_stolen_revenge flag origin.4070 follows after 15 days, with payback_killed_MSI origin.4061 (Payback origin, other stories). Memorialist civics get an extra option.

## 审阅记录 Review notes

- 已核对入口、触发、选项与结果。
  Checked the entry, trigger, options and outcomes.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
