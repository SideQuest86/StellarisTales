// Interface chrome dictionary. Story text never passes through here: original
// bilingual game text stays in the story data. Every key has zh and en.
export const UI = {
  "site.title": { zh: "Stellaris Tales", en: "Stellaris Tales" },
  "site.titleSuffix": { zh: "Stellaris Tales", en: "Stellaris Tales" },
  "site.description": {
    zh: "完整收录《群星》游戏内的故事文本，附原版配乐。",
    en: "Every story from the game Stellaris, with the original soundtrack.",
  },
  "brand.home": { zh: "Stellaris Tales 首页", en: "Stellaris Tales home" },
  "header.search": { zh: "搜索", en: "Search" },
  "header.museum": { zh: "博物天枢", en: "Grand Archive" },
  "header.museumLabel": { zh: "打开博物天枢", en: "Open the Grand Archive" },
  "header.language": { zh: "中 / EN", en: "EN / 中" },
  "header.languageLabel": { zh: "切换为英文", en: "Switch to Chinese" },
  "motion.reduce": { zh: "减少动态", en: "Reduce motion" },
  "motion.reduced": { zh: "动态已减少", en: "Motion reduced" },
  "catalogue.label": { zh: "故事类别", en: "Story categories" },
  "catalogue.count": { zh: "{n} 份", en: "{n}" },
  "cat.origins": { zh: "起源故事", en: "Origins" },
  "cat.precursors": { zh: "先驱者与遗迹", en: "Precursors" },
  "cat.exploration": { zh: "深空异闻", en: "Exploration" },
  "cat.rifts": { zh: "星界裂隙", en: "Astral Rifts" },
  "cat.crisis": { zh: "银河天灾", en: "Crises" },
  "cat.leviathans": { zh: "星神与巨兽", en: "Leviathans" },
  "cat.society": { zh: "文明纪事", en: "Civilizations" },
  "cat.stories": { zh: "银河轶事", en: "Chronicles" },
  "cat.fallback": { zh: "银河故事", en: "Galactic story" },
  "scene.label": {
    zh: "三维故事档案，可拖动浏览；方向键切换，回车展开",
    en: "3D story archive. Drag to browse, arrow keys to move, Enter to open",
  },
  "scene.fallback": { zh: "可用分类和方向按钮浏览。", en: "Use the categories and arrow buttons to browse." },
  "scene.lost": { zh: "三维画面已暂停，分类和搜索仍可使用。", en: "The 3D view paused. Categories and search still work." },
  // Graphics-adapter notice (src/gpu.js). Windows 11 labels: Settings › System › Display › Graphics, "Custom options
  // for apps", GPU preference "High performance" (zh-CN: 设置 › 系统 › 屏幕 › 显示卡, 应用的自定义选项, GPU 首选项, 高性能).
  "gpu.label": { zh: "显卡提示", en: "Graphics notice" },
  "gpu.close": { zh: "关闭提示", en: "Dismiss" },
  "gpu.title": { zh: "正在使用集成显卡", en: "Running on integrated graphics" },
  "gpu.more": { zh: "已改用省电画质 · 如何改用独立显卡？", en: "Lighter mode is on · How to use the discrete GPU?" },
  "gpu.softwareMore": { zh: "已改用最低画质 · 如何开启图形加速？", en: "Lightest mode is on · How to turn on acceleration?" },
  "gpu.body": {
    zh: "浏览器正在用集成显卡绘制本页，已自动改用省电画质。若电脑有独立显卡（如 NVIDIA GeForce RTX），可让浏览器改用它：",
    en: "Your browser is using integrated graphics, so a lighter mode is on. If this computer has a discrete GPU (such as an NVIDIA GeForce RTX), you can switch the browser to it:",
  },
  "gpu.windows": {
    zh: "Windows：设置 → 系统 → 屏幕 → 显示卡，在“应用的自定义选项”中选择浏览器，将 GPU 首选项设为“高性能”，然后重启浏览器。",
    // Straight quotes in English: the CJK-first sans stack draws curly quotes full-width.
    en: 'Windows: Settings → System → Display → Graphics. Under "Custom options for apps" pick your browser, set its GPU preference to "High performance", then restart the browser.',
  },
  "gpu.flag": {
    zh: "或在 Chrome / Edge 地址栏打开下面的地址，把“Force High Performance GPU”设为“已启用”（Enabled）并重启浏览器（耗电会增加）：",
    en: 'Or open this address in Chrome / Edge, set "Force High Performance GPU" to Enabled and relaunch (uses more battery):',
  },
  "gpu.softwareTitle": { zh: "显卡加速不可用", en: "No graphics acceleration" },
  "gpu.softwareBody": {
    zh: "浏览器正在以软件方式绘制本页，已改用最低画质。可在浏览器设置的“系统”页开启硬件加速，然后重启浏览器。",
    en: "Your browser is drawing this page in software, so the lightest mode is on. Turn on hardware acceleration in the browser's System settings, then restart.",
  },
  "archive.chapters": { zh: "{n}篇", en: "{n} chapters" },
  "archive.chapter1": { zh: "{n}篇", en: "{n} chapter" },
  "archive.open": { zh: "展开故事", en: "Open story" },
  "archive.skip": { zh: "跳到故事选择", en: "Skip to story selection" },
  "archive.previousStory": { zh: "上一则故事", en: "Previous story" },
  "archive.nextStory": { zh: "下一则故事", en: "Next story" },
  "archive.previousCategory": { zh: "上一个类别", en: "Previous category" },
  "archive.nextCategory": { zh: "下一个类别", en: "Next category" },
  "archive.loadingTitle": { zh: "载入中", en: "Loading" },
  "archive.offline": { zh: "档案暂时无法连接", en: "Archive unavailable" },
  "archive.reconnect": { zh: "重新连接", en: "Reconnect" },
  "error.load": { zh: "未能载入，请稍后重试。", en: "Could not load. Please try again." },
  "reader.label": { zh: "故事阅读", en: "Story reader" },
  "reader.close": { zh: "收起档案", en: "Back to archive" },
  "reader.map": { zh: "剧情脉络", en: "Story map" },
  "reader.languageShort": { zh: "EN", en: "中文" },
  "reader.languageLabel": { zh: "切换为英文", en: "Switch to Chinese" },
  "reader.back": { zh: "回到上一步", en: "Go back" },
  "reader.currentChapter": { zh: "当前篇章", en: "Current chapter" },
  "reader.untitled": { zh: "插曲", en: "Interlude" },
  "reader.chapter": { zh: "篇章", en: "Chapter" },
  "reader.continue": { zh: "继续", en: "Continue" },
  "reader.continueReading": { zh: "继续阅读", en: "Continue reading" },
  "reader.yourChoice": { zh: "你的选择", en: "Your choice" },
  "reader.storyContinues": { zh: "故事继续", en: "The story continues" },
  "reader.next": { zh: "下一篇", en: "Next" },
  "reader.finished": { zh: "已读完", en: "End of record" },
  "reader.onFailure": { zh: "未能成功时", en: "If it fails" },
  "reader.otherPossibility": { zh: "另一种可能", en: "Another possibility" },
  "reader.afterTime": { zh: "时间流逝之后", en: "After some time" },
  "reader.whenConditions": { zh: "满足条件后继续", en: "Continues once conditions are met" },
  "reader.optionalFollowUp": { zh: "可选后续 · 需另行开启", en: "Optional follow-up · start separately" },
  "reader.measuresDone": { zh: "四项措施已读完 · 全部成功且仍拥有母星后", en: "All four measures read · if all succeed and the homeworld is still held" },
  "reader.chooseArrival": { zh: "选择一种抵达方式", en: "Choose how it arrives" },
  "reader.chooseResponse": { zh: "选择一个回应", en: "Choose a response" },
  "reader.routeEnded": { zh: "这条路线到此结束", en: "This route ends here" },
  "reader.nextInvestigation": { zh: "选择下一处调查 · 顺序不限", en: "Choose the next investigation · any order" },
  "reader.nextMeasure": { zh: "继续另一项措施 · 顺序不限", en: "Continue another measure · any order" },
  "reader.branchEnds": { zh: "这条分支到此结束", en: "This branch ends here" },
  "reader.conversationDone": { zh: "对话已结束", en: "Conversation complete" },
  "reader.conversationContinue": { zh: "继续对话", en: "Continue the conversation" },
  "reader.perspective": { zh: "文明视角", en: "Empire perspective" },
  "reader.perspectiveShort": { zh: "视角", en: "Perspective" },
  "reader.responsePerspective": { zh: "回应视角", en: "Response perspective" },
  "reader.dialogueSpecies": { zh: "对话物种", en: "Dialogue species" },
  "reader.priorExperience": { zh: "此前的经历", en: "Earlier events" },
  "reader.guide": { zh: "故事导读（含剧透）", en: "Reading guide · Spoilers" },
  "reader.guideDownload": { zh: "下载 Markdown", en: "Download Markdown" },
  "reader.contentsClose": { zh: "关闭剧情脉络", en: "Close story map" },
  "reader.chapterList": { zh: "故事篇章", en: "Story chapters" },
  "reader.routeLabel": { zh: "档案剧情路线", en: "Story route map" },
  "reader.position": { zh: "第 {n} / {total} 篇", en: "Chapter {n} of {total}" },
  "search.title": { zh: "搜索", en: "Search" },
  "search.close": { zh: "关闭搜索", en: "Close search" },
  "search.placeholder": { zh: "故事名称、中文或英文关键词", en: "Story title, Chinese or English keywords" },
  "search.label": { zh: "搜索故事", en: "Search stories" },
  "search.count": { zh: "{n} 份档案", en: "{n} records" },
  "search.chapters": { zh: "{n}篇", en: "{n} chapters" },
  "search.empty": { zh: "没有匹配结果。", en: "No matches." },
  "search.previous": { zh: "上一页", en: "Previous page" },
  "search.next": { zh: "下一页", en: "Next page" },
  "music.cover": { zh: "群星原声专辑封面", en: "Stellaris soundtrack album cover" },
  "music.previous": { zh: "上一首", en: "Previous track" },
  "music.next": { zh: "下一首", en: "Next track" },
  "music.play": { zh: "播放音乐", en: "Play music" },
  "music.seek": { zh: "音乐进度", en: "Track position" },
  "music.volume": { zh: "音乐音量", en: "Volume" },
  "music.playlist": { zh: "原声列表", en: "Soundtrack playlist" },
  "music.playlistTitle": { zh: "原声", en: "Soundtrack" },
  "music.playlistClose": { zh: "关闭音乐列表", en: "Close playlist" },
  "music.defaultTitle": { zh: "群星原声音乐集", en: "Stellaris soundtrack" },
  "music.unavailable": { zh: "原声音乐暂时未能载入", en: "The soundtrack could not be loaded" },
  "map.title": { zh: "剧情图", en: "Story map" },
  "map.close": { zh: "关闭剧情图", en: "Close story map" },
  "map.image": { zh: "事件图", en: "Event image" },
  "map.expand": { zh: "展开剧情图", en: "Expand map" },
  "map.expandShort": { zh: "展开", en: "Expand" },
  "map.collapse": { zh: "收起剧情图", en: "Collapse map" },
  "map.zoomIn": { zh: "放大剧情图", en: "Zoom in" },
  "map.zoomOut": { zh: "缩小剧情图", en: "Zoom out" },
  "map.fit": { zh: "总览全图（再按一次回到当前）", en: "Overview: fit the whole map (again: back to current)" },
  "map.locate": { zh: "定位当前篇章", en: "Locate current chapter" },
  "map.viewport": {
    zh: "剧情树。方向键在篇章之间移动，回车阅读，加减号缩放，0 总览全图。",
    en: "Story tree. Arrow keys move between chapters, Enter reads, plus and minus zoom, 0 shows the whole map.",
  },
  "map.keyCurrent": { zh: "当前", en: "Current" },
  "map.keyPath": { zh: "本次路线", en: "Your route" },
  "map.keyRead": { zh: "已读", en: "Read" },
  "map.keyOther": { zh: "尚未读到", en: "Not read yet" },
  "map.keyRef": { zh: "链接到已有篇章", en: "Link to a chapter" },
  "map.keyChoice": { zh: "你的选择", en: "Your choice" },
  "map.keyReturn": { zh: "回到枢纽篇章", en: "Back to the hub" },
  "map.keyEnding": { zh: "结局", en: "Ending" },
  "map.keyFold": { zh: "已折叠，点击展开", en: "Folded, click to open" },
  "map.keyChance": { zh: "几率（≈ 受条件调整）", en: "Chance (≈ adjusted by conditions)" },
  "map.help": { zh: "图例", en: "Key" },
  "map.hint": { zh: "拖动平移 · 滚轮缩放 · 按 0 看全图 · Esc 关闭", en: "Drag to pan · scroll to zoom · press 0 to fit · Esc to close" },
  "map.reading": { zh: "正在阅读", en: "Reading" },
  "map.overview": { zh: "总览", en: "Overview" },
  "map.cases": { zh: "{n} 种情形", en: "{n} cases" },
  "map.ifCond": { zh: "若{c}", en: "If {c}" },
  "map.notCond": { zh: "非", en: "not " },
  "map.and": { zh: "、", en: ", " },
  "map.or": { zh: " 或 ", en: " or " },
  "map.exclusive": { zh: "择一结果", en: "One outcome" },
  "map.random": { zh: "随机结果", en: "Random outcome" },
  "map.parallel": { zh: "任意顺序", en: "Any order" },
  "map.parallelRequired": { zh: "任意顺序 · 需完成 {n}", en: "Any order · {n} required" },
  "map.ref": { zh: "转至", en: "Turn to" },
  "map.return": { zh: "返回", en: "Back to" },
  "map.option": { zh: "选择", en: "Choice" },
  "map.chance": { zh: "{p}% 概率", en: "{p}% chance" },
  "map.weight": { zh: "权重 {w}", en: "weight {w}" },
  "map.delay": { zh: "{d} 天后", en: "after {d} days" },
  "map.delayMonths": { zh: "{d} 个月后", en: "after {d} months" },
  "map.delayYears": { zh: "{d} 年后", en: "after {d} years" },
  "map.entry": { zh: "独立触发", en: "Starts on its own" },
  "map.secondary": { zh: "另一个入口", en: "Another way in" },
  "map.failure": { zh: "失败时", en: "On failure" },
  "map.project": { zh: "项目完成后", en: "When the project completes" },
  "map.researchOutcome": { zh: "研究结果", en: "Research outcome" },
  "doc.anomaly": { zh: "异常", en: "Anomaly" },
  "doc.site": { zh: "考古遗址", en: "Dig site" },
  "doc.rift": { zh: "星界裂隙", en: "Astral rift" },
  "doc.project": { zh: "特殊项目", en: "Special project" },
  "doc.situation": { zh: "局势", en: "Situation" },
  "doc.chain": { zh: "事件链", en: "Event chain" },
  "doc.origin": { zh: "起源", en: "Origin" },
  "map.appendix": { zh: "相关记录", en: "Related records" },
  "map.stats": { zh: "{n}篇 · 已读{r}", en: "{n} chapters · {r} read" },
  "map.stats1": { zh: "{n}篇 · 已读{r}", en: "{n} chapter · {r} read" },
  "map.measures": { zh: "措施已读 {r}/{n}", en: "{r}/{n} measures read" },
  "map.measuresNote": { zh: "成功需完成全部措施且仍拥有母星。", en: "Success requires all measures and keeping the homeworld." },
  "map.unread": { zh: "未读：", en: "Unread: " },
  "map.research": { zh: "研究项目", en: "Research project" },
  "map.discovery": { zh: "发现", en: "Discovery" },
  "map.report": { zh: "调查报告", en: "Report" },
  "map.stage": { zh: "剧情阶段", en: "Story stages" },
  "map.empty": { zh: "这份档案只有一篇。", en: "This record has a single chapter." },
  // audio-refine
  "music.vocal": { zh: "人声", en: "Vocal" },
  "music.instrumental": { zh: "纯音乐", en: "Instrumental" },
  "music.playFailed": { zh: "点击播放开始。", en: "Press play to start." },
  "music.loadFailed": { zh: "这一首未能载入，可重试或跳到下一首。", en: "This track could not be loaded. Retry or skip." },
  "music.pause": { zh: "暂停音乐", en: "Pause music" },
  "music.description": { zh: "{n} 首原版配乐 · 循环播放", en: "{n} original tracks · looped" },
  // end audio-refine
};

const FALLBACK = "zh";
let current = FALLBACK;

export function setLanguage(lang) {
  current = lang === "en" ? "en" : "zh";
  return current;
}
export const language = () => current;

/** Look up a chrome string; `{name}` placeholders are filled from vars. */
export function t(key, vars, lang = current) {
  const entry = UI[key];
  if (!entry) return key;
  let text = entry[lang] ?? entry[FALLBACK];
  if (vars) text = text.replace(/\{(\w+)\}/g, (_, name) => String(vars[name] ?? ""));
  return text;
}

/** Plural-aware chapter count. */
export const chapters = (n, lang = current) =>
  t(lang === "en" && Number(n) === 1 ? "archive.chapter1" : "archive.chapters", { n }, lang);

/**
 * Static markup carries data-i18n (textContent), data-i18n-aria (aria-label),
 * data-i18n-title, data-i18n-placeholder and data-i18n-content (meta content).
 */
export function applyStaticText(root = document, lang = current) {
  document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
  for (const node of root.querySelectorAll("[data-i18n]")) {
    node.textContent = t(node.dataset.i18n, null, lang);
    // Chinese chrome text inside the English page (e.g. the reader's "中文" switch) is marked for screen readers.
    // (Skipped when an aria-label supplies the name: that label is in the page language.)
    if (lang === "en" && !node.hasAttribute("data-i18n-aria") && /[㐀-鿿]/.test(node.textContent)) node.setAttribute("lang", "zh-CN");
    else if (node.getAttribute("lang") === "zh-CN") node.removeAttribute("lang");
  }
  for (const [attribute, name] of [
    ["data-i18n-aria", "aria-label"],
    ["data-i18n-title", "title"],
    ["data-i18n-placeholder", "placeholder"],
    ["data-i18n-content", "content"],
    ["data-i18n-alt", "alt"],
  ])
    for (const node of root.querySelectorAll(`[${attribute}]`))
      node.setAttribute(name, t(node.getAttribute(attribute), null, lang));
}
