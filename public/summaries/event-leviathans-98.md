# 城邦建立通讯 / Enclave Establishes Communications

- 分类 Category：巨兽与城邦 Leviathans & enclaves (C6) · 来源 Sources：`events/leviathans_events_1.txt:226-274`（leviathans.97 / 98）· `common/scripted_effects/first_contact_effects.txt:63-71` · `common/on_actions/00_on_actions.txt`（on_decade_pulse_country → leviathans.560）· 审阅 Reviewed 2026-10-12 (C6)，导读 2026-10-13

## 如何开始 How it starts

- 中文：两种来源。（1）首次接触城邦后，首次接触系统在 720–1080 天后触发隐藏事件 leviathans.97：若城邦尚未与你建立通讯，就建立通讯并向你发送本窗口（`leviathans_events_1.txt:226-244`）。（2）每十年的“城邦通讯扩散”（leviathans.560，on_decade_pulse_country）也会发送本窗口。
- English: Two sources. (1) After first contact with an enclave, the first-contact system fires hidden leviathans.97 720–1080 days later: if the enclave has no communications with you yet, it establishes them and sends you this window (`leviathans_events_1.txt:226-244`). (2) The decade "communication spread" (leviathans.560, on_decade_pulse_country) sends the same window.

## 剧情脉络 Story outline

1. leviathans.98「城邦建立通讯」：一则通用通知（单一选项）。/ A generic notice with a single option.
2. 读完后（`after`，第 257–273 行）按对方城邦的国家旗标打开其问候：商人城邦 → leviathans.101/102，艺术家联盟 → 290/295，策展人 → 501/502，佣兵 → enclave.204/205，打捞者 → enclave.304/305，虚境行者 → enclave.404/405。/ Afterwards a `switch` on the enclave's country flag opens that enclave's own greeting.

## 分支与结局 Branches and outcomes

- 六个问候互斥，由对方城邦类型决定（不是玩家选择）；每个问候继续在该城邦自己的故事里（商人城邦、艺术家联盟、策展人、佣兵、打捞者、虚境行者）。/ The six greetings are mutually exclusive and decided by the enclave type, not by the player; each continues in that enclave's own story.
- 灵督城邦（shroud.4199）与冠军熔炉（nomads.155）同样由此分派，但它们的问候属于其他故事，这里不作为本故事的章节连接（第 268–269 行）。/ The Mindwarden (shroud.4199) and Champion's Forge (nomads.155) greetings are dispatched here too but belong to other stories and are not linked as chapters.

## 条件与文明差异 Conditions and variants

- 本窗口正文没有按帝国类型变化的版本；唯一的分叉条件是对方城邦的国家旗标（has_country_flag）。leviathans.97 要求对方尚未与你建立通讯（第 233–236 行）。/ The window text has no empire-type variants; the only branching condition is the enclave's country flag. leviathans.97 requires that the enclave has no communications with you yet.

## 审阅记录 Review notes

- C6 审阅（2026-10-12）：把 leviathans.98 定为共享入口并独立成篇（此前它被误放在策展人故事里，并嵌入 event-first-contact-1 与 origin_mindwardens）；六个问候以条件桥接连接，证据见片段。/ Made a shared entry and its own story (it had been inside the Curators range and embedded in two other stories); six greetings bridged with evidence.
- 导读（2026-10-13，协调者）：此前缺少导读；已核对 `leviathans_events_1.txt:226-274` 的 leviathans.97/98 原文脚本后撰写。首次接触效果与十年脉冲的行号引自审阅片段，未逐行复核。/ The guide was missing; written after checking the leviathans.97/98 script; the first-contact effect and decade-pulse line numbers are cited from the fragment and were not re-checked line by line.
