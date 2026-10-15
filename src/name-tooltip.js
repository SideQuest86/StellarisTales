// Substitution helpers + a single reusable, accessible tooltip for `.game-name` spans.
export const GENERIC_NOTE = { zh: "这里是游戏按存档填入的名称。", en: "The game fills in this name from your save." };
export const SCRIPTED_NOTE = { zh: "按你的档案设定选用的游戏原文。", en: "The game's own wording, chosen for your reading profile." };

const ARTICLE = "(?:the|a|an|this|that|our|your|their|his|her|its|my)";

/** English: collapse doubled articles ("the the", "the our", "the this") and capitalise a sentence start. */
export function cleanEnglish(text) {
  let s = String(text);
  s = s.replace(/\b(the|The)\s+(the|our|this|that|your|their|these|those)\b/g, (_, a, b) => (a === "The" ? b[0].toUpperCase() + b.slice(1) : b));
  s = s.replace(/\b(a|an|A|An)\s+(the|our|this|that|your|their)\b/g, (_, a, b) => (a[0] === "A" ? b[0].toUpperCase() + b.slice(1) : b));
  s = s.replace(/(^|[.!?…]["”’']?\s+|\n)([a-z])/g, (_, p, c) => p + c.toUpperCase());
  return s;
}
export { ARTICLE };

/** Chinese: collapse an immediately repeated noun phrase (2+ chars): 帝国帝国 -> 帝国. */
export function cleanChinese(text) {
  return String(text).replace(/([㐀-鿿]{2,6})\1/g, "$1");
}
export const cleanText = (text, lang) => (lang === "en" ? cleanEnglish(text) : cleanChinese(text));

let tip = null, active = null, counter = 0;
function ensure() {
  if (tip) return tip;
  tip = document.createElement("div");
  tip.className = "name-tip";
  tip.id = "name-tip";
  tip.setAttribute("role", "tooltip");
  document.body.append(tip);
  return tip;
}
function place(target) {
  const t = ensure(), r = target.getBoundingClientRect(), m = 8;
  const w = t.offsetWidth, h = t.offsetHeight;
  let x = Math.min(Math.max(m, r.left + r.width / 2 - w / 2), innerWidth - w - m);
  let y = r.bottom + 6;
  if (y + h > innerHeight - m) y = Math.max(m, r.top - h - 6);
  t.style.transform = `translate(${Math.round(x)}px,${Math.round(y)}px)`;
}
export function showTip(target) {
  const t = ensure();
  active = target;
  t.textContent = target.dataset.note || "";
  t.classList.add("show");
  target.setAttribute("aria-describedby", t.id);
  place(target);
}
export function hideTip() {
  if (!tip) return;
  tip.classList.remove("show");
  active?.removeAttribute("aria-describedby");
  active = null;
}

let installed = false;
/** Install delegated listeners once. Hover/focus show; tap toggles; tap elsewhere or Esc closes. */
export function installNameTooltips(root = document) {
  if (installed) return;
  installed = true;
  const find = (e) => e.target.closest?.(".game-name[data-note]");
  root.addEventListener("pointerover", (e) => { const n = find(e); if (n && e.pointerType === "mouse") showTip(n); });
  root.addEventListener("pointerout", (e) => { const n = find(e); if (n && e.pointerType === "mouse" && n !== document.activeElement) hideTip(); });
  root.addEventListener("focusin", (e) => { const n = find(e); if (n) showTip(n); });
  root.addEventListener("focusout", (e) => { if (find(e)) hideTip(); });
  root.addEventListener("click", (e) => {
    const n = find(e);
    if (n) { active === n && tip?.classList.contains("show") && e.detail !== 0 && e.pointerType !== "mouse" ? hideTip() : showTip(n); }
    else hideTip();
  });
  root.addEventListener("keydown", (e) => { if (e.key === "Escape" && tip?.classList.contains("show")) { hideTip(); e.stopPropagation(); } }, true);
  addEventListener("scroll", () => { if (active) place(active); }, true);
  addEventListener("resize", hideTip);
}

/** HTML for one substitution. `note` is {zh,en} or a string. Text must already be escaped by the caller. */
export function nameSpan(escapedText, noteText, escFn) {
  return `<span class="game-name" tabindex="0" role="note" data-note="${escFn(noteText)}" data-tip="${++counter}">${escapedText}`;
}
