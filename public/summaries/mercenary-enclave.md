# 佣兵城邦 / Mercenary Enclave

- 分类 Category：巨兽与城邦 · DLC：霸主 Overlord

## 如何开始 How it starts
这是一个可重复使用的联络菜单，不是线性剧情。菜单 enclave.205 在三种情况下打开：
This is a repeatable contact menu, not a linear story. Menu enclave.205 opens:
- 首次接触完成或“通讯已建立”之后（enclave.204）；After first contact completes or 'Communications Established' (enclave.204);
- 之后每次向城邦发起外交联络（enclave.200，on_custom_diplomacy）；On every later diplomatic contact (enclave.200);
- 玩家亲手建立佣兵城邦时（见“佣兵城邦基金会”）。Right after the player founds one (see "Mercenary Enclave Foundation").

## 剧情脉络 Story outline（菜单与服务 Menu and services）
每项服务窗口都可“讨论别的事”返回菜单（图中 ↺）。Every service window can return to the menu (↺ in the map).
- 租用舰队 Rent a fleet（210 → 211 致谢）：租期10年，附带佣兵指挥官。到期见独立故事“舰队合约到期”。10-year lease with a mercenary commander; expiry is the separate story "Fleet Contract Ended".
- 管理租用舰队 Manage the fleet（215）：续约或解约。Extend or terminate.
- 佣兵驻军 Garrisons（220 → 225）：信任≥30可见、≥40可买；购买恒星基地建筑许可。
- 战术评估 Tactical appraisal（240 → 245–266）：仅在与天灾或强敌有通讯时出现，分别介绍大可汗、灰色风暴、索林原虫、异次元入侵者、肃正协议、塞塔娜；首次付费，之后免费重看。Only when a crisis/great foe is in contact; first reading is paid, later ones free.
- 雇佣地面部队 Ground troops（270）：五种规模/机械化部队。
- 后勤支援 Logistic support（2030）：按海军容量收费；3600天后“后勤支援合约即将到期”（2035）询问续费。Renewal notice 2035 after 3600 days.
- 资助者事务 Patron panel（280，仅资助者可见 patron only）：扩充城邦舰队（235，五级）、召回已出租舰队（285）、共享科技（2040，每10年一次）。
  - 召回 Recall（285）：当前租用方立即收到“终止通知”（294–299，按城邦等级六个版本，3个月预告并退款）；资助者在90或180天后再加90天收到“征用舰队抵达”（290）。The current client gets a Termination Notice at once; the patron gets "Commandeered Fleet Arrives" after 90/180 + 90 days.
- 敌对时：只显示“支付2500能量和解”。While hostile: only a 2500-energy truce.

## 分支与结局 Branches and outcomes
菜单本身没有结局；城邦被毁见“佣兵城邦被摧毁”。若城邦遭攻击，租用方收到“舰队紧急召回”。相关一次性故事：“不应拒绝的交易”（大可汗）。
The menu has no ending; destruction is the separate story "Mercenary Enclave Destroyed"; an attack on the enclave triggers "Emergency Fleet Recall"; see also "A Deal We Should Not Refuse".

## 条件与文明差异 Conditions and variants
多数服务受信任度门槛（10–50）、冷却与已购买标记限制；游牧帝国不可买驻军，生物舰船帝国以食物替代能量支付扩建。
Most services require trust thresholds (10-50), cooldowns or not-yet-bought flags; nomads cannot buy garrisons; bio-ship empires pay food instead of energy for upgrades.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-12（C6）
- 来源 Sources：events/overlord_enclaves_events.txt:514（enclave.200）, :561（enclave.204）, :586（enclave.205 菜单 menu）, :1009–2358（服务 services 210–285）, :2629–2794（290–299）, :3325–3619（2030–2040）; common/on_actions/00_on_actions.txt:740; common/scripted_effects/first_contact_effects.txt:544; events/leviathans_events_1.txt:265
- 已逐项核对 205 的全部选项、各服务窗口的选项与后续调用、290–299 的接收者。Checked every 205 option, each service's options and follow-ups, recipients of 290–299.
- 更正：草稿中同一菜单出现在五个故事（200、204、建立、可汗交易、合约到期）里；现合并为本故事族，其他故事改为跨故事链接。
  Correction: the draft copied this menu into five stories; it is now one family and the others cross-link to it.
- 覆盖完整。Coverage complete.
- 2026-10-13 r3-inherit：事件继承修复（base = 其他事件）后复查：对照游戏文件核对了现在可见的继承标题、选项与分支，结构无需改动。
  2026-10-13 r3-inherit: re-checked after the event-inheritance fix (base = other event): the inherited titles, options and branches now visible in the tree were compared with the game files; no structural change needed.
