# 第一次接触 / First Contact

- 分类 Category: C8 银河轶事 / C8 Galactic miscellany · 来源 Sources: events/on_action_events_1.txt:10-3437,3985-4141,4265-4340; common/on_actions/00_on_actions.txt:2265-2271 on_post_communications_established; events/first_contact_events.txt:10373-10377 · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

两国首次建立通讯后（on_post_communications_established，00_on_actions.txt:2265-2267）弹出 action.11“通讯已建立”，同时对方收到 action.13（首次接触流程中则由 first_contact.1050 触发 action.13）。

After two countries first establish communications (on_post_communications_established, 00_on_actions.txt:2265-2267) action.11 "Communications Established" appears and the other side gets action.13 (in the first-contact process first_contact.1050 fires action.13).

## 剧情脉络 Story outline

三个选项的差别只在遗民文本：普通版（获得影响力，异形友好者更多）、“被遗弃的难民”版本；选项后隐藏事件打开 action.1“第一次接触”——一个外交窗口，开场白随对方的伦理、政体、是否有黑客劣迹等而变。action.1 的 after 块在对方与我方异种时再触发 progress.4/5/6（初次遭遇外星生命/发展中文明）和 progress.9（偿还起源）。

The three options of action.11 differ only by the abandoned-refugees text variant (all grant influence, more for xenophiles); the hidden effect then opens action.1 "First Contact" - a diplomatic window whose greeting varies with the other empire's ethics, government and caught-hacking history. The after block of action.1 fires progress.4/5/6 (first alien encounter / developing civilization) and progress.9 (Payback origin) when the other empire is a different species.

## 分支与结局 Branches and outcomes

选项互斥：普通通讯（action.11.a）、“被遗弃难民”关系且不排外（WORRYING）、“被遗弃难民”关系且排外（OK）。

Options are exclusive by relation: normal contact (action.11.a), abandoned-refugee relation and not xenophobe (WORRYING), abandoned-refugee relation and xenophobe (OK).

## 条件与文明差异 Conditions and variants

action.11 要求双方都不是 day_0 国家，对方为默认国家或太空城邦，且未完成过对该国的第一次接触。

action.11 needs both sides not day_0, the other a default or enclave country, and no completed first contact with it.

## 审阅记录 Review notes

- 已核对入口、触发、选项与结果。
  Checked the entry, trigger, options and outcomes.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
