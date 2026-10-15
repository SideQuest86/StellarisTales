# UI copy review (less is more)

Scope: every visible interface string. Decision: keep / shorten / remove. Shown text is the final text.

## src/i18n.js (all keys)

| key | zh | en | decision |
|---|---|---|---|
| site.title | Stellaris Tales | Stellaris Tales | keep |
| site.titleSuffix | Stellaris Tales | Stellaris Tales | keep |
| site.description | 完整收录《群星》游戏内的故事文本，附原版配乐。 | Every story from the game Stellaris, with the original soundtrack. | keep |
| brand.home | Stellaris Tales 首页 | Stellaris Tales home | keep |
| header.search | 搜索 | Search | keep |
| header.museum | 博物天枢 | Grand Archive | keep |
| header.museumLabel | 打开博物天枢 | Open the Grand Archive | keep |
| header.language | 中 / EN | EN / 中 | keep |
| header.languageLabel | 切换为英文 | Switch to Chinese | keep |
| motion.reduce | 减少动态 | Reduce motion | keep |
| motion.reduced | 动态已减少 | Motion reduced | keep |
| catalogue.label | 故事类别 | Story categories | keep |
| catalogue.count | {n} 份 | {n} | keep |
| cat.origins | 起源故事 | Origins | keep |
| cat.precursors | 先驱者与遗迹 | Precursors | keep |
| cat.exploration | 深空异闻 | Exploration | keep |
| cat.rifts | 星界裂隙 | Astral Rifts | keep |
| cat.crisis | 银河天灾 | Crises | keep |
| cat.leviathans | 星神与巨兽 | Leviathans | keep |
| cat.society | 文明纪事 | Civilizations | keep |
| cat.stories | 银河轶事 | Chronicles | keep |
| cat.fallback | 银河故事 | Galactic story | keep |
| scene.label | 三维故事档案，可拖动浏览；方向键切换，回车展开 | 3D story archive. Drag to browse, arrow keys to move, Enter to open | shorten (dropped 阵列) |
| scene.fallback | 可用分类和方向按钮浏览。 | Use the categories and arrow buttons to browse. | shorten |
| scene.lost | 三维画面已暂停，分类和搜索仍可使用。 | The 3D view paused. Categories and search still work. | shorten |
| gpu.label | 显卡提示 | Graphics notice | keep |
| gpu.close | 关闭提示 | Dismiss | keep |
| gpu.title | 正在使用集成显卡 | Running on integrated graphics | keep |
| gpu.more | 已改用省电画质 · 如何改用独立显卡？ | Lighter mode is on · How to use the discrete GPU? | keep |
| gpu.softwareMore | 已改用最低画质 · 如何开启图形加速？ | Lightest mode is on · How to turn on acceleration? | keep |
| gpu.body | 浏览器正在用集成显卡绘制本页，已自动改用省电画质。若电脑有独立显卡（如 NVIDIA GeForce RTX），可让浏览器改用它： | Your browser is using integrated graphics, so a lighter mode is on. If this computer has a discrete GPU (such as an NVIDIA GeForce RTX), you can switch the browser to it: | shorten |
| gpu.windows | Windows：设置 → 系统 → 屏幕 → 显示卡，在“应用的自定义选项”中选择浏览器，将 GPU 首选项设为“高性能”，然后重启浏览器。 | Windows: Settings → System → Display → Graphics. Under "Custom options for apps" pick your browser, set its GPU preference to "High performance", then restart the browser. | keep |
| gpu.flag | 或在 Chrome / Edge 地址栏打开下面的地址，把“Force High Performance GPU”设为“已启用”（Enabled）并重启浏览器（耗电会增加）： | Or open this address in Chrome / Edge, set "Force High Performance GPU" to Enabled and relaunch (uses more battery): | keep |
| gpu.softwareTitle | 显卡加速不可用 | No graphics acceleration | keep |
| gpu.softwareBody | 浏览器正在以软件方式绘制本页，已改用最低画质。可在浏览器设置的“系统”页开启硬件加速，然后重启浏览器。 | Your browser is drawing this page in software, so the lightest mode is on. Turn on hardware acceleration in the browser's System settings, then restart. | shorten |
| archive.chapters | {n} 篇 | {n} chapters | keep |
| archive.chapter1 | {n} 篇 | {n} chapter | keep |
| archive.open | 展开故事 | Open story | keep |
| archive.previousStory | 上一份故事 | Previous story | keep |
| archive.nextStory | 下一份故事 | Next story | keep |
| archive.previousCategory | 上一个类别 | Previous category | keep |
| archive.nextCategory | 下一个类别 | Next category | keep |
| archive.loadingTitle | 载入中 | Loading | keep |
| archive.offline | 档案暂时无法连接 | Archive unavailable | shorten |
| archive.reconnect | 重新连接 | Reconnect | keep |
| error.load | 未能载入，请稍后重试。 | Could not load. Please try again. | shorten |
| reader.label | 故事阅读 | Story reader | keep |
| reader.close | 收起档案 | Back to archive | keep |
| reader.map | 剧情脉络 | Story map | keep |
| reader.languageShort | EN | 中文 | keep |
| reader.languageLabel | 切换为英文 | Switch to Chinese | keep |
| reader.back | 回到上一步 | Go back | keep |
| reader.currentChapter | 当前篇章 | Current chapter | keep |
| reader.untitled | 插曲 | Interlude | shorten (zh) |
| reader.chapter | 篇章 | Chapter | keep |
| reader.continue | 继续 | Continue | keep |
| reader.continueReading | 继续阅读 | Continue reading | keep |
| reader.yourChoice | 你的选择 | Your choice | keep |
| reader.storyContinues | 故事继续 | The story continues | keep |
| reader.next | 下一篇 | Next | keep |
| reader.finished | 已读完 | End of record | keep |
| reader.onFailure | 未能成功时 | If it fails | keep |
| reader.otherPossibility | 另一种可能 | Another possibility | keep |
| reader.afterTime | 时间流逝之后 | After some time | keep |
| reader.whenConditions | 满足条件后继续 | Continues once conditions are met | keep |
| reader.optionalFollowUp | 可选后续 · 需另行开启 | Optional follow-up · start separately | keep |
| reader.measuresDone | 四项措施已读完 · 全部成功且仍拥有母星后 | All four measures read · if all succeed and the homeworld is held | keep |
| reader.chooseArrival | 选择一种抵达方式 | Choose how it arrives | keep |
| reader.chooseResponse | 选择一个回应 | Choose a response | shorten |
| reader.routeEnded | 这条路线到此结束 | This route ends here | shorten (hint removed) |
| reader.nextInvestigation | 选择下一处调查 · 顺序不限 | Choose the next investigation · any order | shorten |
| reader.nextMeasure | 继续另一项措施 · 顺序不限 | Continue another measure · any order | shorten |
| reader.branchEnds | 这条分支到此结束 | This branch ends here | keep |
| reader.conversationDone | 对话已结束 | Conversation complete | keep |
| reader.conversationContinue | 继续对话 | Continue the conversation | keep |
| reader.perspective | 文明视角 | Empire perspective | keep |
| reader.perspectiveShort | 视角 | Perspective | keep |
| reader.responsePerspective | 回应视角 | Response perspective | keep |
| reader.dialogueSpecies | 对话物种 | Dialogue species | keep |
| reader.priorExperience | 此前的经历 | Prior experience | keep |
| reader.guide | 故事导读 · 含剧透 | Story reading notes · Spoilers | keep |
| reader.guideDownload | 下载 Markdown | Download Markdown | keep |
| reader.contentsClose | 关闭剧情脉络 | Close story map | keep |
| reader.chapterList | 故事篇章 | Story chapters | keep |
| reader.routeLabel | 档案剧情路线 | Story route map | keep |
| reader.position | 第 {n} / {total} 篇 | Chapter {n} of {total} | keep |
| search.title | 搜索 | Search | keep |
| search.close | 关闭搜索 | Close search | keep |
| search.placeholder | 故事名称、中文或英文关键词 | Story title, Chinese or English keywords | keep |
| search.label | 搜索故事 | Search stories | shorten |
| search.count | {n} 份档案 | {n} records | keep |
| search.chapters | {n} 篇章 | {n} chapters | keep |
| search.empty | 没有匹配结果。 | No matching stories. | keep |
| search.previous | 上一页 | Previous page | keep |
| search.next | 下一页 | Next page | keep |
| music.cover | 群星原声专辑封面 | Stellaris soundtrack album cover | keep |
| music.previous | 上一首 | Previous track | keep |
| music.next | 下一首 | Next track | keep |
| music.play | 播放音乐 | Play music | keep |
| music.seek | 音乐进度 | Track position | keep |
| music.volume | 音乐音量 | Volume | keep |
| music.loop | 专辑循环播放 | Album loops | shorten |
| music.loopShort | 专辑循环 | Album loop | keep |
| music.playlist | 原声列表 | Soundtrack playlist | shorten |
| music.playlistTitle | 原声 | Soundtrack | keep |
| music.playlistClose | 关闭音乐列表 | Close playlist | keep |
| music.defaultTitle | 群星原声音乐集 | Stellaris soundtrack | keep |
| music.unavailable | 原声音乐暂时未能加载 | The soundtrack could not be loaded | keep |
| map.title | 剧情图 | Story map | keep |
| map.close | 关闭剧情图 | Close story map | keep |
| map.image | 事件图 | Event image | keep |
| map.expand | 展开剧情图 | Expand map | keep |
| map.collapse | 收起剧情图 | Collapse map | keep |
| map.zoomIn | 放大剧情图 | Zoom in | keep |
| map.zoomOut | 缩小剧情图 | Zoom out | keep |
| map.fit | 显示全部 | Fit whole map | keep |
| map.locate | 定位当前篇章 | Locate current chapter | keep |
| map.viewport | 剧情树。方向键在篇章之间移动，回车阅读，加减号缩放，0 显示全部。 | Story tree. Arrow keys move between chapters, Enter reads, plus and minus zoom, 0 fits the map. | keep |
| map.keyCurrent | 当前 | Current | keep |
| map.keyPath | 本次路线 | Your route | keep |
| map.keyRead | 已读 | Read | keep |
| map.keyOther | 未走的可能 | Untaken path | keep |
| map.keyRef | 回到已有篇章 | Returns to a page | keep |
| map.exclusive | 择一结果 | One outcome | keep |
| map.random | 随机结果 | Random outcome | keep |
| map.parallel | 任意顺序 | Any order | keep |
| map.parallelRequired | 任意顺序 · 需完成 {n} | Any order · {n} required | keep |
| map.ref | 转至 | Turn to | keep |
| map.return | 返回 | Back to | keep |
| map.option | 选择 | Choice | keep |
| map.chance | {p}% 几率 | {p}% chance | keep |
| map.weight | 权重 {w} | weight {w} | keep |
| map.delay | {d} 天后 | after {d} days | keep |
| map.delayMonths | {d} 个月后 | after {d} months | keep |
| map.delayYears | {d} 年后 | after {d} years | keep |
| map.condition | 满足条件时 | if conditions are met | keep |
| map.entry | 独立触发 | Starts on its own | keep |
| map.secondary | 另一个入口 | Another way in | keep |
| map.failure | 失败时 | On failure | keep |
| map.project | 项目完成后 | When the project completes | keep |
| map.researchOutcome | 研究结果 | Research outcome | keep |
| map.later | 随后 | Later | keep |
| doc.anomaly | 异常 | Anomaly | keep |
| doc.site | 考古遗址 | Dig site | keep |
| doc.rift | 星界裂隙 | Astral rift | keep |
| doc.project | 研究项目 | Special project | keep |
| doc.situation | 局势 | Situation | keep |
| doc.chain | 事件链 | Event chain | keep |
| doc.origin | 起源 | Origin | keep |
| map.appendix | 相关记录 | Related records | keep |
| map.stats | {n} 篇 · 已读 {r} | {n} pages · {r} read | keep |
| map.measures | 措施已读 {r}/{n} | {r}/{n} measures read | keep |
| map.measuresNote | 成功需完成全部措施且仍拥有母星。 | Success requires all measures and homeworld ownership. | keep |
| map.unread | 未读： | Unread:  | keep |
| map.research | 研究项目 | Research project | keep |
| map.discovery | 发现 | Discovery | keep |
| map.report | 调查报告 | Report | keep |
| map.stage | 剧情阶段 | Story stages | keep |
| map.empty | 这份档案只有一页。 | This record has a single page. | keep |
| music.vocal | 人声 | Vocal | keep |
| music.instrumental | 纯音乐 | Instrumental | keep |
| music.playFailed | 点击播放开始。 | Press play to start. | shorten |
| music.loadFailed | 这一首未能加载，可重试或跳到下一首。 | This track could not be loaded. Retry or skip. | shorten |
| music.pause | 暂停音乐 | Pause music | keep |
| music.description | {n} 首原版配乐 · 循环播放 | {n} original tracks · looped | shorten |

## Other files

| file | location | zh | en | decision |
|---|---|---|---|---|
| app.js | 117 load error | 未能载入，请稍后重试。 | Could not load. Please try again. | shorten (was 这份记忆暂时未能抵达…; en aligned with error.load) |
| app.js | 138 motion | 动态已减少 / 减少动态 | Motion reduced / Reduce motion | keep |
| app.js | 158/541 chapter count | {n} 篇 | {n} document(s) | keep |
| app.js | 289-291 fallback titles | 篇章 / 继续 | Document / Continue | keep |
| app.js | 304-325 edge captions | 约N天后；随机结果 · 基础约N%；（受条件修正）；研究完成后；项目结束后；失败时；下一阶段；开端；条件：；进入另一则故事；继续阅读 | about N days later; Random outcome · base ~N%; (modified); When the research completes; When the project ends; On failure; Next stage; Opening; If:; Leads into another story; Continue reading | keep (meaningful conditions) |
| app.js | 344 exclusive | 以下结果互斥，只会发生其一 | Only one of these outcomes happens | keep |
| app.js | 396-401 profile summary | 狂热 / 非 / N 项情境假设 / 阅读设定 / 未指定文明 / 文明设定 / 重置 | Fanatic / not / N assumed condition(s) / Reading as / No empire set / Empire profile / Reset | keep |
| app.js | 404-417 profile panel labels | 正在载入…… / 未指定 / 是 / 否 / 政体 / 起源 | Loading… / Unspecified / Yes / No / Authority / Origin | keep |
| app.js | 418 profile intro | 设定后，所有文档按此一致显示文明相关文本与选项；未指定项显示全部可能。非存档模拟。 | Once set, all documents show empire-dependent text and options consistently; unspecified traits show every possibility. Not a save simulation. | shorten |
| app.js | 456-465 text version | 文本版本 / 版本 N / 按此情形阅读 / 若 | Text version / Version N / Read with this condition / If | keep |
| app.js | 545-546 captions | 触发：/ 故事开端 / 当前篇章 | Trigger: / Opening / Current document | keep |
| app.js | 553 | 选择一个回应 | Choose a response | shorten (was 选择回应，沿这条路线继续) |
| app.js | 555 | 这条路线到此结束 | This route ends here | shorten (removed 可在左侧探索其他可能) |
| app.js | 562 | 已读 N / M；，需要 N 项 | N of M read; N required | keep |
| app.js | 566/872 | 对话已结束 / 继续对话 | Conversation complete / Continue the conversation | keep |
| app.js | 574 | 这条分支到此结束 | This branch ends here | keep |
| app.js | 578-580 | 仅在以下情形出现：/ 不可选：/ 需要： | Only when: / Unavailable: / Requires: | keep |
| app.js | 585-586 review notes | 审阅结论 · 原版脚本中无法自然触发 / 审阅注释 · 非游戏原文 | Review finding · not reachable in the shipped script / Reviewer note · not game text | keep (required marking) |
| app.js | 588 | 此文档也出现在： | This document also appears in: | keep |
| app.js | 591 | ← 上一步；插曲；你的选择；故事继续；剧情脉络 | ← Back; Interlude; Your choices; The story continues; Story map | keep (插曲 shortened from 故事的间奏) |
| app.js | 589/621/629/655 pickers | 文明视角 / 视角 / 回应视角 / 对话物种 / 此前的经历 | Perspective / Perspective / Response perspective / Speaker / Earlier events | keep |
| app.js | 604-608 guide | 故事导读 · 含剧透；下载 Markdown；显示英文；仅显示中文 | Story reading notes · Spoilers; Download Markdown; Show Chinese; English only | keep (spoiler warning) |
| app.js | 613 | 剧情脉络 / 关闭剧情脉络 | Story map / Close story map | keep |
| app.js | 757/764/767 search | N 份档案；N 篇；银河故事；没有匹配结果。 | N dossiers; N docs; Galactic story; No matches. | keep |
| app.js | 910 | 博物天枢 · 此文档给予的标本 | Grand Archive · specimens from this document | keep |
| app.js | 945 | 起源 · 开局效果 | Origin · starting effects | keep |
| app.js | 972 | 博物天枢暂时无法打开。 | The Grand Archive could not be opened. | keep |
| app.js | 1026 | 三维画面已暂停，分类和搜索仍可使用。 | The 3D view paused. Categories and search still work. | shorten (aligned with scene.lost) |
| app.js | 1033/1035/1041 | 档案暂时无法连接 / 重新连接 / 原声音乐暂时未能加载 | Archive unavailable / Reconnect / The soundtrack could not be loaded | shorten (first) |
| name-fill.js | 62 | 他们 / 这个名字 / …… | they / this name / … | keep (placeholder substitution) |
| effects-panel.js | 54-57 durations | 永久；时长由游戏计算；N 天… | Permanent; Duration set by the game; N units | keep |
| effects-panel.js | 73 | 隐藏 (title: 游戏界面不会显示这条效果) | Hidden (The game does not show this effect) | keep |
| effects-panel.js | 78 | 对象： | On: | keep |
| effects-panel.js | 123-134 sections | 开局效果（游戏原文）；代价（游戏原文）；在以下情况：；另一种开局；具体数值；效果；立即发生；事件结束后 | Starting benefits (game text); Drawbacks (game text); When:; Alternative start; Numbers behind it; Effects; Immediately; After the event | keep |
| effects-panel.js | 140 | 游戏内效果 | Gameplay effects | keep |
| effects-panel.js | 141 | 另有 N 项效果未逐条整理，请见游戏脚本。 | N more effects are not itemised; see the game script. | keep |
| effects-panel.js | 143 | 依游戏文件静态解读，不模拟具体存档；概率按基础权重计算。 | Read from the game files; no save is simulated. Chances use base weights. | shorten |
| museum.js | 110-124 header/filters | 离开博物天枢；搜索标本名称或描述；搜索标本；展区；全部展区；稀有度；全部稀有度；仅看有三维模型；N 件标本 | Leave the Grand Archive; Search specimen names or descriptions; Search specimens; Collection; All collections; Rarity; Any rarity; With 3D model only; N specimens | keep |
| museum.js | 136-153 | （游戏未提供名称）；条件：；，且；/ 月；原版脚本中没有任何事件、效果或奖励池给予此标本。；事件给予；事件声明；随机奖励池；游戏机制 | (no game label); If:; , and; / month; No event, effect or reward pool…; Given by; Declared by event; Random reward pool; Game mechanic | keep |
| museum.js | 167-175 | 关闭展品；三维模型操作说明(aria)；三维模型；原版图像；非官方三维诠释…；尚无三维模型，显示原版图像。 | Close exhibit; Rotatable 3D model… (aria); 3D model; Original image; Unofficial 3D interpretation…; No 3D model yet… | keep (non-canon disclosure, aria) |
| museum.js | 181-182 | 展览效果；在博物天枢展出时生效；数值为基础值，会乘以展区产出加成（如“着重展区”政策：重点展区 +50%，其余 −25%）。 | While exhibited; Applies while exhibited in a Grand Archive; values are base values, multiplied by the collection's output bonus (e.g. Exhibition Focus: +50% / −25%). | shorten |
| museum.js | 184-188,214 | 获得方式；来源与模型信息；模型；个三角面；下载 GLB；三维模型未能加载，显示原版图像。 | How it is acquired; Sources and model information; Model; triangles; Download GLB; The 3D model could not be loaded… | keep |
| audio-player.js | — | (no literal strings; uses i18n music.* keys above) | — | n/a |
| index.html | static text | Mirrors the i18n keys (data-i18n fallback). Edited to match: scene.fallback, search aria-label, loop title, playlist aria-label. Others unchanged. | — | synced |

## Summary

- i18n keys: 165; other rows (grouped): 44
- Rows kept: 182; shortened: 27; removed: 0 (redundant hints folded into shortened strings)
- Tests: node --test tests/*.test.mjs -> 68 pass, 0 fail (tests pin the effects-panel note phrases 不模拟具体存档 / no save is simulated).
