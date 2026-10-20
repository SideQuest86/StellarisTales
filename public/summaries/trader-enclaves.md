# 商人城邦 / Trader Enclave（雪拉企业、里甘商业交易所、穆塔根商人公会）

- 分类 Category：巨兽与城邦 · DLC：利维坦 Leviathans

## 如何开始 How it starts
三家商人城邦共用同一套菜单结构（脚本注释 leviathans_events_1.txt:359）。首次接触完成或“通讯已建立”后显示“与[城邦]的第一次接触”（102，正文分三家）。此后每次外交联络经隐藏事件 100 打开对应城邦的菜单——雪拉企业（105）、里甘商业交易所（106）或穆塔根商人公会（107）。可重复使用，不是线性剧情。
The three trader enclaves share one menu design. After first contact, 102 introduces whichever enclave it is; later contacts open its menu (105/106/107) through hidden 100. Repeatable hub, not a chain.

## 剧情脉络 Story outline（菜单与服务 Menu and services）
- 战略资源 Strategic resources（130 雪拉：异星天然气；131 里甘：易爆微粒；132 穆塔根：稀有水晶）：每月1–5单位，换取每月10–50能量；确认后致谢（133–135）。协议期3600天，到期询问续约（150–152：续约回到资源窗口，或返回菜单，或放弃）。
- 雇佣顾问 Consultant（123–125，信任≥50）：获得贸易专长官员；确认后致谢（126–128）。日后攻击该城邦则顾问离去（跨故事“攻击[城邦]”）。
- 结束贸易协定、告别。End the deal, goodbye.
- 后台：拥有协定的帝国每年获得城邦好感（121/122，隐藏）。Yearly hidden trust gain while a deal is active.

## 分支与结局 Branches and outcomes
- 攻击某商人城邦（on_entering_battle → 155）：被攻击的一方作出反应（156 雪拉 / 159 里甘 / 162 穆塔根，若有协定则终止且不退款）；之后再联络只得到拒绝（157 / 160 / 163）。
- 每月检查：仍有协定而能量耗尽时，所有以能量支付的协定被取消（171）。
- 城邦总部被毁见独立故事“[城邦]被摧毁”。Destruction is the separate story event-leviathans-140.

## 条件与文明差异 Conditions and variants
屠杀主义帝国只能回复“外星渣滓”，无法交易；格式塔与工人合作社在顾问窗口有特别文本。
Homicidal empires cannot trade; gestalts and Worker Cooperatives get special consultant wording.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-12（C6）
- 来源 Sources：events/leviathans_events_1.txt:377（100）, :422–438（101/102）, :506–786（105–107 菜单 menus）, :929–2041（121–135）, :2404–2466（150–152）, :2501–2854（155–163）, :2905–2939（170/171）; common/scripted_variables/00_scripted_variables.txt:293; common/on_actions/00_on_actions.txt:93, :409, :715–718, :1371
- 已核对 100/101 路由、三份菜单的选项与条件、资源窗口与续约、顾问、攻击反应、拒绝与能量取消。
- 更正：草稿把三家菜单、首次接触（event-leviathans-101）、攻击反应（-155）、三份拒绝（-157/-160/-163）、能量取消（-170）拆成七个故事；现合并为一个商人城邦故事，城邦被毁仍为独立故事。
- 覆盖完整。Coverage complete.
- 2026-10-13 r3-inherit：事件继承修复（base = 其他事件）后复查：对照游戏文件核对了现在可见的继承标题、选项与分支，结构无需改动。
  2026-10-13 r3-inherit: re-checked after the event-inheritance fix (base = other event): the inherited titles, options and branches now visible in the tree were compared with the game files; no structural change needed.
