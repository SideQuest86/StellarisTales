# 打捞者城邦 / Salvager Enclave

- 分类 Category：巨兽与城邦 · DLC：霸主 Overlord
- 来源 Sources：events/overlord_enclaves_events.txt:4174（enclave.300）, :4202（enclave.304）, :4227（enclave.305 菜单 menu）, :4550–6643（服务 services 310–365）, :12754（enclave.7005）; common/on_actions/00_on_actions.txt:741, :2703
- 审阅 Reviewed 2026-10-12（C6）

## 如何开始 How it starts
可重复使用的联络菜单 enclave.305：首次接触完成或“通讯已建立”后经 enclave.304 打开，之后每次外交联络经 enclave.300 打开。另有“引见”：玩家研究战列舰、5级恒星基地、巨型工程或（非虚空居民）栖息地科技且尚未接触时，打捞者主动问候并赠送合金（enclave.7005）。
Repeatable contact menu enclave.305, opened via enclave.304 after first contact / 'Communications Established' and via enclave.300 on later contacts. Introduction: on certain technologies the Salvagers greet an empire they have not met and send alloys (enclave.7005).

## 剧情脉络 Story outline（菜单与服务 Menu and services）
- 拆解舰队 Scrap a fleet（310）：把舰队开到打捞者星系后可选；确认后显示致谢（315），120–160天后“回收的赏金”（360）送达资源（有机舰船另收清理费）。Scrapped ships return as "Reclaimed Bounty" 120-160 days later.
- 翻新舰船 Reclaimed vessels（320）：购买其他帝国设计的舰船；购满后需约2年补货。Buy ships of other empires' designs; restock takes about two years.
- 维修工坊 Salvage Works（330 → 325）：信任≥30可见、≥40购买恒星基地建筑。
- 建造援助 Construction aid（335 → 325）：需已有维修工坊；1441天后提示可再次加速（336）。
- 委托打捞残骸 Commission salvage（340）：若残骸已消失则为342；否则341确认，60–90天后“委托打捞”（365）送达，可继续委托（返回340）。
- 工程学研究援助 Engineering research（345 → 325）：1801天后学徒归队（346）。
- 雇佣打捞大师 Master Salvager（350 → 325）：获得5级科学家；若日后攻击打捞者，此人离开（跨故事“攻击[城邦]”）。
- 面纱旅人 Veilfarer：若听过该故事（首次接触事件 fircon.1212），可询问——会转到虚境行者城邦的窗口（跨故事链接）。
- 敌对或屠杀主义帝国：只有“……”。Hostile/homicidal empires get no services.

## 分支与结局 Branches and outcomes
菜单无结局；城邦被毁见“打捞者城邦被毁”。The menu has no ending; see "Salvager Enclave Destroyed".

## 条件与文明差异 Conditions and variants
问候文本随是否初次见面、是否为拾荒者（scavenger）帝国、是否曾拆解有机舰船而变化；服务受信任度（10–50）与冷却限制。
Greetings vary by first/return visit, scavenger empires and past organic scrapping; services have trust thresholds and cooldowns.

## 审阅记录 Review notes
- 已核对 305 全部选项与各服务的后续调用、延迟（360、336、346、365）。
- 更正：草稿中菜单重复于两个故事（300/304），且经“面纱旅人”把虚境行者城邦的全部内容（含预知事件、虚境庇护者事件）嵌入；现均为跨故事链接。
  Correction: the menu was duplicated (300/304) and embedded the whole Shroudwalker content through the Veilfarer question; now cross-links.
- 340 的三个后续中 341 与 365 是先后关系（编译器把三者标为同一条件组）。In 340, 341 then 365 are sequential although the compiler groups all three.
- 覆盖完整。Coverage complete.
- 2026-10-13 r3-inherit：事件继承修复（base = 其他事件）后复查：对照游戏文件核对了现在可见的继承标题、选项与分支，结构无需改动。
  2026-10-13 r3-inherit: re-checked after the event-inheritance fix (base = other event): the inherited titles, options and branches now visible in the tree were compared with the game files; no structural change needed.
