# 搭载代表团 / Delegates on Board

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany · DLC: Nomads

## 如何开始 How it starts

游牧帝国承接合约 contract_diplomatic_support（common/missions/missions/02_contracts.txt），方舟舰到达指定星系时触发。

A nomadic empire accepts the contract_diplomatic_support contract (common/missions/missions/02_contracts.txt); events fire when its arkship reaches the flagged systems.

## 剧情脉络 Story outline

游牧方承接“外交护送”合约：方舟舰抵达接人星球时收到3036，代表团登舰并开启前往目的地的旅行项目；抵达目的地后“代表团已到达”3045（均由 on_entering_system_fleet 检查）。

The nomad takes a diplomatic escort contract: when its arkship reaches the pickup world it gets 3036, the delegates board and a travel project starts; at the destination Delegates Have Arrived 3045 follows (both checked on on_entering_system_fleet).

## 分支与结局 Branches and outcomes

3045 的正文按合约方与目的地关系变化；合约本身的成败由合约系统结算。

3045's text varies with the issuer and destination; the contract result is settled by the contract system.

## 条件与文明差异 Conditions and variants

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-12
- 来源 Sources：events/nomads_events_1.txt:11557-11755; common/missions/missions/02_contracts.txt; common/on_actions/00_on_actions.txt:1086-1092
- 修正：草稿把同一份合约的两站拆成两个故事；现按合约顺序连接。
  Correction: the draft split the two legs of one contract into two stories; they are now linked in contract order.
- 注：本文件的行号取自游戏文件本身；编译数据中该文件记录的行号有偏移（见账本请求）。
  Note: line numbers are from the game file itself; the compiled records for this file carry shifted line numbers (see ledger requests).
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
