# 虚境行者城邦 / Shroudwalker Enclave

- 分类 Category：巨兽与城邦 · DLC：霸主 Overlord（部分服务需“虚境”“星界”相关内容）

## 如何开始 How it starts
可重复使用的联络菜单 enclave.405：首次接触完成或“通讯已建立”后经 enclave.404 打开，之后每次外交联络经 enclave.400 打开。另有“引见”（enclave.7000）：采纳“大觉醒”传统（灵能或虚境版本）360–1080天后，若尚未联络，虚境行者主动问候并建立通讯。
Repeatable menu enclave.405, opened via enclave.404 after first contact and via enclave.400 on later contacts. Introduction 7000: 360–1080 days after adopting certain psionic traditions, the Shroudwalkers greet an empire they have not met.

## 剧情脉络 Story outline（菜单与服务 Menu and services）
大多数服务以“考虑别的事”返回菜单（↺）。Most services return to the menu.
- 寻求虚境掌控 Mastery of the Shroud（需虚境DLC、已突破虚境、已与一位庇护者完成接触）：打开子菜单（shroud.5300，继承本菜单标题，现为独立页面），含六项：
  - 与其他虚境存在交流（5305）：支付泽珞或星界丝线 → 随机与一位尚未接触的虚境庇护者建立初次接触（各庇护者的初次接触为独立故事，跨故事链接）。
  - 加深庇护者调谐（5310）、灵能光环说明（5320）。
  - 探求虚境秘密（5315）：开启“探秘仪式”项目 → 随机获得一项灵能相关发现（部分为“虚境的低语”故事中的事件，跨故事链接）；若该发现已由我们自行获得，则为5318。
  - 增强灵能光环（5325）：3600天冷却，10年后询问续约（5327）。扩展庇护者领域（5330）。
- 预知 Divination（410）：说明代价，付费后开始“预知”仪式（独立故事，跨故事链接）。
- 延请导师 Teacher（7100 → 7105）：获得5级“虚境行者导师”官员；日后攻击城邦则其离去（跨故事“攻击[城邦]”）。
- 洞见 Insight（7050 → 7055）：需对某帝国拥有带领袖的间谍网络（且拥有复仇女神DLC内容），开启“虚境行者洞见”局势；完成时随机一种结果：策反线人 7060（40）、间谍网络提升 7065（25）、情报 7070（25）、一无所获 7075（10）。
- 虚境信标 Shroud Beacon（420 → 425）：获得在恒星基地建造信标的许可；建成后见“虚境隧道”故事。
- 泽珞开采 Zro（7250 → 7255）：学习泽珞开采，永久缴纳什一税。
- 开启星界裂隙（shroud.5355）、开启心灵（shroud.5350，获得灵能理论）。
- 面纱旅人 Veilfarer（7110）：若在首次接触事件中听过其故事，可询问；得知“跨维度灵能旅行”，提高灵能跃迁引擎出现率。打捞者城邦菜单的同一询问也打开此窗口。

## 分支与结局 Branches and outcomes
菜单无结局；城邦被毁见“虚境行者城邦被毁”。The menu has no ending; see "Shroudwalker Enclave Destroyed".

## 条件与文明差异 Conditions and variants
问候按首次/再次来访、是否灵能飞升变化；敌对、屠杀主义、“灵督”起源、与灵督交好（信任≥100）或已与“轮回之终末”立约的帝国，城邦拒绝交谈（只剩“……”）。
Greetings differ for first/return visits and psionic ascension. Hostile or homicidal empires, the Mindwardens origin, friends of the Mindwardens (trust ≥100) and empires covenanted with the End of the Cycle are refused service.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-12（C6）
- 来源 Sources：events/overlord_enclaves_events.txt:6756（enclave.400）, :6795（enclave.404）, :6820（enclave.405 菜单 menu）, :7226–7485（410–425）, :12711（7000）, :12810–13318（7050–7255）; events/shroud_events.txt:17388–18347（shroud.5300–5355）; common/situations/01_overlord_situations.txt:226; common/on_actions/00_on_actions.txt:742, :4960–4966; common/special_projects/04_projects_shroud.txt:899
- 已核对 405 全部选项条件、各服务窗口、shroud.5300 子菜单、洞见局势定义与 on_action 随机表、探秘仪式项目的随机结果。
- 更正：草稿中本菜单在四个故事里重复，并吞入占卜、他人故事事件与十二个庇护者初次接触；现拆为本故事、“预知”与跨故事链接。“洞见”四种结果原本是四个孤立的一页故事，现按局势完成时的互斥随机组接回。
- 事件继承修复后 shroud.5300 成为独立页面，5325/5330 付费后经 5326 回到它；原先为避免误边而设的 10 条 suppress 已删除（树中只剩回指）。
- 覆盖完整。Coverage complete.
- 2026-10-13 r3-inherit：事件继承修复后复查：shroud.5300 子菜单现为独立页面，删除 10 条已无用的 suppress，修正审阅注；其余服务窗口（base = enclave.405 + option_clear）与菜单回指核对无误。
  2026-10-13 r3-inherit: re-checked after the inheritance fix: submenu shroud.5300 is now its own page; the 10 now-redundant suppress entries were removed and the review note corrected; the other service windows (base = enclave.405 + option_clear) and their returns were checked.
