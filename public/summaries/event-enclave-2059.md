# 舰队合约到期 / Fleet Contract Ended

- 分类 Category：巨兽与城邦 Leviathans & enclaves · DLC：霸主 Overlord（灵督变体需相应起源）
- 来源 Sources：events/overlord_enclaves_events.txt:3937（enclave.2059）, :3979（enclave.2060）; events/shroud_events.txt:19269（shroud.6878）; common/on_actions/00_on_actions.txt:1837
- 审阅 Reviewed 2026-10-12（C6）

## 如何开始 How it starts
从佣兵城邦租用的舰队合约到期时（on_fleet_contract_expired），隐藏事件 enclave.2059 检查租用方为玩家、出租方为佣兵城邦后，向租用方发出通知。
When a fleet leased from a mercenary enclave reaches the end of its contract (on_fleet_contract_expired), hidden enclave.2059 checks that the client is a player and the owner a mercenary enclave, then notifies the client.

## 剧情脉络 Story outline
单窗口通知，按出租城邦类型二选一（互斥）：
One notice, chosen by enclave type (exclusive):
- 普通佣兵城邦 → enclave.2060“舰队合约到期”。Ordinary mercenary enclave → enclave.2060.
- 灵督城邦 → shroud.6878（同标题，灵督画面）。Mindwarden enclave → shroud.6878 (same title, Mindwarden art).

## 分支与结局 Branches and outcomes
- “是的，打开通信频道”：普通城邦打开“佣兵城邦”联络菜单（跨故事链接，可在那里续约）；灵督城邦打开其自身菜单（灵督起源内容，此处未展开）。
  'Yes, open communications' opens the Mercenary Enclave contact menu (cross-story link, where the lease can be renewed); for a Mindwarden enclave it opens that enclave's own menu (Mindwardens origin content, not expanded here).
- “这次就不了”：舰队离开，结束。'Not at this time': the fleet departs.

## 条件与文明差异 Conditions and variants
仅玩家租用方会收到；AI 无通知。Only player clients receive it.

## 审阅记录 Review notes
- 已核对 enclave.2059 的 if/else、两份通知的选项，以及 on_action 位置。Checked the if/else in enclave.2059, both notices' options and the on_action.
- 更正：草稿把灵督城邦的整套联络菜单（约40个窗口）嵌入本故事；已用 suppress 断开，并在台账中请求为该菜单建立独立故事族，届时应删除这些 suppress 以恢复跨故事链接。
  Correction: the draft embedded the whole Mindwarden contact menu (~40 windows); those edges are suppressed pending a Mindwarden-menu family (ledger request 3), after which the suppressions should be removed.
- 覆盖完整。Coverage complete.
