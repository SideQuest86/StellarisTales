// Interactive story-tree map hosted on the reader's left card (and, expanded, as a dialog over the reader).
// Tree data comes from flow-tree.js (toTree adapter); this module only renders,
// pans/zooms and keeps the reader's route highlighted. Pan and zoom move one
// composited <svg> layer with a CSS transform, so gestures stay on the GPU
// compositor; the layer re-rasterises crisply once a gesture ends.
import {
  toTree,
  compactTree,
  treePath,
  layoutTree,
  defaultCollapsed,
  hiddenCount,
  connector,
  railConnector,
  joinCurve,
  optionLabel,
  NODE,
} from "./flow-tree.js";
import { t } from "./i18n.js";

const SVG = "http://www.w3.org/2000/svg";
const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const ZOOM_CARD = 0.18; // lowest zoom on the card
const ZOOM_OVERLAY = 0.03; // lowest zoom of the expanded map: the whole of the largest stories
const ZOOM_MAX = 1.8;
const LOD_K = 0.36; // below this scale the map draws boxes only (overview: text would be a grey smear)
const PAD = 28;
const SLICE_MS = 8; // time budget of one slice of a progressive map build
// Inside a doc box: paddings, line heights and the smallest box (text is vertically centred in it).
const BOX = { left: 14, right: 12, top: 9, bottom: 9, cap: 14, title: 17, sub: 14, gap: 3, min: 48 };
const trees = new WeakMap();

// Text fitting without layout: per-character advances are measured once per font
// and cached, so truncating a node label is a few additions, not a binary search
// of measureText calls. (Kerning is ignored; labels keep a few px of slack.)
let measureContext;
const advances = new Map(); // font → Map(char → width)
function charWidths(font) {
  let table = advances.get(font);
  if (!table) advances.set(font, (table = new Map()));
  return table;
}
// CJK ideographs and kana are full-width in the UI fonts (advance = 1 em, also in the system fallbacks), so they need
// no measurement. This also keeps canvas measureText away from the one-character lookahead of fitLines, which used to
// request a web-font slice for a character that is never drawn and then re-laid out the whole page when it arrived.
const fullWidth = (ch) => {
  const c = ch.codePointAt(0);
  return (c >= 0x4e00 && c <= 0x9fff) || (c >= 0x3400 && c <= 0x4dbf) || (c >= 0x3041 && c <= 0x30ff) || (c >= 0xf900 && c <= 0xfaff) || (c >= 0x20000 && c <= 0x2ebef) || (c >= 0xff00 && c <= 0xff60) || (c >= 0x3000 && c <= 0x303f);
};
function measurer(font) {
  measureContext ??= document.createElement("canvas").getContext("2d");
  const table = charWidths(font);
  const em = Number(/(\d+(?:\.\d+)?)px/.exec(font)?.[1]) || 0;
  return (text) => {
    let width = 0;
    for (const ch of String(text)) {
      let w = table.get(ch);
      if (w === undefined) {
        if (em && fullWidth(ch)) w = em;
        else {
          measureContext.font = font;
          w = measureContext.measureText(ch).width;
        }
        table.set(ch, w);
      }
      width += w;
    }
    return width;
  };
}
// Line-break rules (kinsoku): no closing punctuation at the start of a line, no opening bracket at its end.
const NO_START = new Set([..."，。、；：！？）】》」』”’…％"]);
const NO_END = new Set([..."（【《「『“‘"]);
/** Fit text into `width` (a number, or one width per line), on up to `lines` lines, with an ellipsis. */
function fitLines(text, width, font, lines = 1) {
  const measure = measurer(font);
  const ellipsis = measure("…");
  const chars = [...String(text || "").replace(/\s+/g, " ").trim()];
  const limit = (i) => (Array.isArray(width) ? width[Math.min(i, width.length - 1)] : width);
  const out = [];
  let start = 0;
  while (start < chars.length && out.length < lines) {
    const last = out.length === lines - 1;
    const room = limit(out.length);
    let used = 0, end = start;
    while (end < chars.length) {
      const w = measure(chars[end]);
      if (used + w > room) break;
      used += w;
      end++;
    }
    if (end >= chars.length) {
      out.push(chars.slice(start).join(""));
      start = chars.length;
      break;
    }
    if (last) {
      while (end > start && used + ellipsis > room) used -= measure(chars[--end]);
      out.push(chars.slice(start, end).join("").trimEnd() + "…");
      start = chars.length;
      break;
    }
    // Break Latin text at a space (unless the next word would not fit a line of its own anyway), else keep punctuation
    // with the word it belongs to.
    const space = chars.lastIndexOf(" ", end);
    let cut = end;
    let wordFits = false;
    if (space > start + 3) {
      let stop = space + 1;
      while (stop < chars.length && chars[stop] !== " ") stop++;
      wordFits = measure(chars.slice(space + 1, stop).join("")) <= limit(out.length + 1);
    }
    if (wordFits) cut = space;
    else while (cut > start + 1 && (NO_START.has(chars[cut]) || NO_END.has(chars[cut - 1]))) cut--;
    out.push(chars.slice(start, cut).join("").trim());
    start = cut;
    while (chars[start] === " ") start++;
  }
  return out;
}
/** `<text>` of one or more lines (tspans); y is the baseline of the first line. */
function textBlock(cls, x, y, lines, lineHeight, attrs = "") {
  if (!lines.length) return "";
  const body = lines.length === 1 ? esc(lines[0]) : lines.map((line, i) => `<tspan x="${x}" dy="${i ? lineHeight : 0}">${esc(line)}</tspan>`).join("");
  return `<text class="${cls}" x="${x}" y="${y}"${attrs}>${body}</text>`;
}
const norm = (s) => String(s || "").toLowerCase().replace(/[\s\p{P}\p{S}]+/gu, "");
const baseline = (top, lineHeight, size) => +(top + lineHeight / 2 + size * 0.36).toFixed(1);
const KEY_UNITS = [1, 1.5, 2, 3, 4, 6, 9, 14, 20, 30];

export class FlowSurface {
  constructor(element) {
    this.element = element;
    this.image = false;
    this.expanded = false;
    this.help = false;
    this.lod = false;
    this.unit = 1;
    this.fitted = false;
    this.view = { k: 1, x: 0, y: 0 };
    this.followCurrent = true;
    this.collapsed = new Set();
    this.userToggled = new Map();
    this.reducedMotion = () =>
      document.documentElement.classList.contains("reduced-motion") || matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.resizeObserver = new ResizeObserver((entries) => {
      if (!this.viewport) return;
      const box = entries.at(-1).contentRect;
      const w = Math.round(box.width), h = Math.round(box.height);
      if (w === this.lastSize?.[0] && h === this.lastSize?.[1]) return;
      this.lastSize = [w, h];
      if (this.followCurrent) this.focusCurrent(false);
      else this.applyView(false);
    });
    // The expanded map is a dialog: Escape closes it before anything else (the reader's own Escape handler would close
    // the whole reader), unless a dialog or the playlist is open on top of it.
    document.addEventListener(
      "keydown",
      (e) => {
        if (!this.expanded || e.key !== "Escape" || e.defaultPrevented) return;
        if (document.querySelector("dialog[open], #playlist:not([hidden])")) return;
        e.preventDefault();
        e.stopPropagation();
        if (this.help) this.toggleHelp(false);
        else this.setExpanded(false);
      },
      true,
    );
    this.readerWatch = new MutationObserver(() => {
      const reader = document.querySelector("#reader");
      if (this.expanded && (!reader || reader.hidden || reader.classList.contains("prewarm") || !document.body.classList.contains("reader-open"))) this.setExpanded(false, { focus: false });
    });
    this.bindEvents();
  }

  // ---------------------------------------------------------------- data
  /** Build (and cache) a story's tree ahead of update(), e.g. in idle time while the reader opens. */
  prepare(story, chapters, dossier) {
    const key = dossier || story;
    if (!story.tree && !story.flow && !dossier?.tree) return;
    if (!trees.has(key)) trees.set(key, compactTree(toTree(dossier || { story, chapters })));
  }
  /** `options.progressive`: a story that has just opened draws its nodes in slices of a few ms (see fillNodes). */
  update(story, chapters, current, visited, language, prose, trail = [], dossier, options = {}) {
    // Trees are cached per loaded dossier (or story object when no dossier is passed).
    const key = dossier || story;
    const storyChanged = this.story?.id !== story.id || this.sourceKey !== key;
    const languageChanged = this.language !== language;
    Object.assign(this, { story, chapters, current, visited, language, prose, trail, sourceKey: key });
    this.element.hidden = !story.tree && !story.flow && !dossier?.tree;
    if (this.element.hidden) return;
    if (storyChanged) {
      let tree = trees.get(key);
      if (!tree) {
        tree = compactTree(toTree(dossier || { story, chapters }));
        trees.set(key, tree);
      }
      this.tree = tree;
      this.userToggled = new Map();
      this.followCurrent = true;
      this.built = false;
      this.view = { k: 1, x: 0, y: 0, placed: false };
      this.fitted = false;
    }
    this.path = treePath(this.tree, trail, current);
    const currentNode = this.path.current || this.tree.primary.get(current);
    this.currentNode = currentNode;
    // Folding policy, then the reader's explicit choices, then always open
    // the route so the current page is never hidden.
    const next = defaultCollapsed(this.tree, this.path, currentNode);
    for (const [id, folded] of this.userToggled) folded ? next.add(id) : next.delete(id);
    for (const id of this.path.nodes) for (let n = this.tree.nodes.get(id)?.parent; n; n = this.tree.nodes.get(n)?.parent) next.delete(n);
    const foldsChanged = !this.built || next.size !== this.collapsed.size || [...next].some((id) => !this.collapsed.has(id));
    this.collapsed = next;
    if (!this.built || foldsChanged || languageChanged) this.render(storyChanged, storyChanged && !!options.progressive);
    else this.paintState();
    if (this.followCurrent) this.focusCurrent(!storyChanged);
  }
  show(force) {
    const open = force ?? !this.element.classList.contains("mobile-open");
    if (open) this.setImage(false);
    this.element.classList.toggle("mobile-open", open);
    document.querySelector("#chapter-toggle")?.setAttribute("aria-expanded", String(open));
    if (open) requestAnimationFrame(() => this.focusCurrent(false));
  }
  setImage(value) {
    this.image = value;
    this.element.classList.toggle("image-mode", value);
    const map = this.element.querySelector(".flow-surface-map");
    if (map) map.hidden = value;
    const button = this.element.querySelector("[data-flow-image]");
    if (button) {
      button.textContent = value ? t("map.title") : t("map.image");
      button.setAttribute("aria-pressed", String(value));
    }
  }
  /** Expand the map into a dialog over the reader (or fold it back onto the card). */
  setExpanded(value, { focus = true } = {}) {
    value = !!value;
    const changed = value !== this.expanded;
    this.expanded = value;
    this.syncExpanded();
    if (!changed) return;
    this.toggleHelp(false);
    if (value) {
      this.setImage(false);
      this.opener = document.activeElement;
      this.savedLabel = this.element.getAttribute("aria-label");
      this.element.setAttribute("aria-label", `${t("map.title")}: ${this.local(this.story?.title)}`);
      const reader = document.querySelector("#reader");
      this.readerWatch.observe(document.body, { attributes: true, attributeFilter: ["class"] });
      if (reader) this.readerWatch.observe(reader, { attributes: true, attributeFilter: ["hidden", "class"] });
    } else {
      this.readerWatch.disconnect();
      if (this.savedLabel != null) this.element.setAttribute("aria-label", this.savedLabel);
    }
    // The viewport changes size: the observer places the view again (the whole map when it fits, else the current page).
    this.view.placed = false;
    this.followCurrent = true;
    this.fitted = false;
    if (focus) {
      const target = value ? this.viewport : this.element.querySelector("[data-flow-expand]");
      requestAnimationFrame(() => (target?.isConnected ? target : this.element.querySelector("[data-flow-expand]"))?.focus({ preventScroll: true }));
    }
    this.setStatus(null);
  }
  /** Classes, ARIA and the button state of the expanded flag (also after the shell was rebuilt). */
  syncExpanded() {
    const value = this.expanded;
    this.element.classList.toggle("map-expanded", value);
    document.body.classList.toggle("map-overlay", value);
    if (value) {
      this.element.setAttribute("role", "dialog");
      this.element.setAttribute("aria-modal", "true");
    } else {
      this.element.removeAttribute("role");
      this.element.removeAttribute("aria-modal");
    }
    const button = this.element.querySelector("[data-flow-expand]");
    if (button) {
      button.setAttribute("aria-pressed", String(value));
      button.setAttribute("aria-label", value ? t("map.collapse") : t("map.expand"));
      button.title = button.getAttribute("aria-label");
    }
  }
  toggleHelp(force) {
    const open = force ?? !this.help;
    this.help = open;
    const panel = this.element.querySelector(".flow-help");
    if (panel) panel.hidden = !open;
    this.element.querySelector("[data-flow-help]")?.setAttribute("aria-expanded", String(open));
  }

  // ---------------------------------------------------------------- render
  render(fresh, progressive = false) {
    const tree = this.tree;
    this.fillToken = (this.fillToken || 0) + 1; // any pending slices of an earlier build stop here
    const css = getComputedStyle(document.documentElement);
    const sans = css.getPropertyValue("--sans") || "sans-serif";
    const mono = css.getPropertyValue("--mono") || "monospace";
    this.fonts = {
      titleFont: `500 13px ${sans}`,
      captionFont: `400 11px ${sans}`,
      subFont: `italic 400 11px ${sans}`,
      refFont: `400 12px ${sans}`,
      chanceFont: `400 10.5px ${mono}`,
    };
    this.headCounts = null;
    for (const node of tree.nodes.values()) node.caption = this.groupCaption(node);
    this.quiet = this.quietLeads();
    const anchor = !fresh && this.currentNode && this.layout?.nodes.get(this.currentNode);
    const anchorScreen = anchor ? this.toScreen(anchor.x, anchor.y) : null;
    this.layout = layoutTree(tree, {
      measure: measurer(this.fonts.captionFont),
      size: (node) => this.sizeOf(node),
      collapsed: this.collapsed,
      maxRowWidth: 1500,
    });
    const { bounds } = this.layout;
    this.origin = { x: bounds.x - PAD, y: bounds.y - PAD };
    this.size = { w: Math.ceil(bounds.width + PAD * 2), h: Math.ceil(bounds.height + PAD * 2) };
    const rebuilt = !this.built || this.builtLanguage !== this.language;
    if (rebuilt) this.buildShell();
    // The shell is still empty here: reading its size costs one small layout, and the view can then be placed in the same
    // pass as the nodes. A transform that changes after the nodes were laid out makes Blink re-lay out every SVG text
    // (scaled font) and repaint it: a second full pass of 30–60 ms right after the first.
    if (rebuilt && !this.lastSize && this.viewport.clientWidth) this.lastSize = [Math.round(this.viewport.clientWidth), Math.round(this.viewport.clientHeight)];
    this.svg.setAttribute("width", this.size.w);
    this.svg.setAttribute("height", this.size.h);
    this.svg.setAttribute("viewBox", `${this.origin.x} ${this.origin.y} ${this.size.w} ${this.size.h}`);
    const edges = [];
    const joins = [];
    const nodes = [];
    const queued = [];
    const visibleNode = (id) => this.layout.nodes.get(id)?.x !== undefined;
    for (const node of tree.nodes.values()) {
      if (!visibleNode(node.id) || node.type === "forest") continue;
      if (progressive) queued.push(node);
      else nodes.push(this.nodeMarkup(node, this.layout.nodes.get(node.id)));
      const parent = tree.nodes.get(node.parent);
      if (!parent || parent.type === "forest" || !visibleNode(parent.id)) continue;
      const a = this.layout.nodes.get(parent.id), b = this.layout.nodes.get(node.id);
      const d = node.gate ? null : this.layout.bundled.has(parent.id) ? railConnector(a, b) : connector(a, b);
      if (d) edges.push(`<path class="flow-edge ${esc(node.via?.kind || "")}" data-edge="${esc(parent.id)}>${esc(node.id)}" d="${d}"/>`);
    }
    for (const join of tree.joins) {
      if (!visibleNode(join.gate)) continue;
      const gate = this.layout.nodes.get(join.gate);
      // V3: lane tails; V4: the links back to the gate inside each lane.
      const sources = join.tails
        ? join.tails.map((tail) => tree.primary.get(tail))
        : [...tree.nodes.values()].filter((n) => n.gateRef && n.ref === join.gate).map((n) => n.id);
      for (const sourceId of sources) {
        if (!visibleNode(sourceId)) continue;
        joins.push(`<path class="flow-join" data-join="${esc(sourceId)}>${esc(join.gate)}" d="${joinCurve(this.layout.nodes.get(sourceId), gate)}"/>`);
      }
      // A folded parallel group still leads to its gate.
      const group = this.layout.nodes.get(join.group);
      if (group && this.collapsed.has(join.group)) joins.push(`<path class="flow-join" d="${joinCurve(group, gate)}"/>`);
    }
    this.edgeLayer.innerHTML = edges.join("");
    this.joinLayer.innerHTML = joins.join("");
    this.nodeLayer.innerHTML = nodes.join("");
    this.nodeElements = new Map([...this.nodeLayer.querySelectorAll("[data-node]")].map((el) => [el.dataset.node, el]));
    this.edgeElements = [...this.edgeLayer.children];
    this.svg.setAttribute("aria-label", this.local(this.story.title));
    this.paintState();
    if (progressive) this.fillNodes(queued);
    if (anchorScreen) {
      // Keep the anchor fixed on screen while folds change.
      const moved = this.layout.nodes.get(this.currentNode);
      if (moved) {
        this.view.x += anchorScreen.x - (moved.x - this.origin.x) * this.view.k;
        this.view.y += anchorScreen.y - (moved.y - this.origin.y) * this.view.k;
        this.applyView(false);
      }
    } else if (rebuilt && this.view.placed) this.applyView(false);
    this.built = true;
  }
  buildShell() {
    const key = (name, glyph, label, extra = "") => `<span class="k k-${name}"><b class="g${extra}" aria-hidden="true">${glyph}</b>${esc(label)}</span>`;
    const swatch = (name, label) => `<span class="k k-${name}"><i class="sw ${name}" aria-hidden="true"></i>${esc(label)}</span>`;
    const legend = `<span class="key-states">${swatch("cur", t("map.keyCurrent"))}${swatch("path", t("map.keyPath"))}${swatch("read", t("map.keyRead"))}${swatch("unread", t("map.keyOther"))}${swatch("ref", t("map.keyRef"))}</span><span class="key-symbols">${key("choice", "◇", t("map.keyChoice"))}${key("random", "⚄", t("map.random"))}${key("one", "◈", t("map.exclusive"))}${key("any", "∥", t("map.parallel"))}${key("hub", "↻", t("map.keyReturn"))}${key("end", "◆", t("map.keyEnding"))}${key("fold", "+N", t("map.keyFold"), " mono")}${key("pct", "≈%", t("map.keyChance"), " mono")}</span>`;
    this.element.innerHTML = `
      <div class="flow-band"><p class="flow-caption-line"></p><div class="flow-band-actions"><button type="button" data-flow-image aria-pressed="false">${esc(t("map.image"))}</button><button type="button" class="flow-expand" data-flow-expand aria-pressed="false" aria-label="${esc(t("map.expand"))}" title="${esc(t("map.expand"))}"><span aria-hidden="true">⤢ ${esc(t("map.expandShort"))}</span></button><button type="button" class="flow-mobile-close" data-flow-close aria-label="${esc(t("map.close"))}">×</button></div></div>
      <div class="flow-surface-map">
        <div class="flow-surface-toolbar">
          <span class="flow-title">${esc(t("map.title"))}</span><span class="flow-story"></span><span class="flow-stats"></span>
          <div class="flow-controls" role="toolbar" aria-label="${esc(t("map.title"))}">
            <button type="button" data-flow-zoom="-0.15" aria-label="${esc(t("map.zoomOut"))}" title="${esc(t("map.zoomOut"))}">−</button><small data-flow-scale>100%</small><button type="button" data-flow-zoom="0.15" aria-label="${esc(t("map.zoomIn"))}" title="${esc(t("map.zoomIn"))}">+</button><button type="button" data-flow-fit aria-label="${esc(t("map.fit"))}" title="${esc(t("map.fit"))}"><span aria-hidden="true">⊡</span></button><button type="button" data-flow-current aria-label="${esc(t("map.locate"))}" title="${esc(t("map.locate"))}"><span aria-hidden="true">◎</span></button><button type="button" class="flow-help-button" data-flow-help aria-expanded="false" aria-label="${esc(t("map.help"))}" title="${esc(t("map.help"))}"><span aria-hidden="true">?</span></button><button type="button" class="flow-overlay-close" data-flow-collapse aria-label="${esc(t("map.close"))}" title="${esc(t("map.close"))} (Esc)"><span aria-hidden="true">×</span></button>
          </div>
        </div>
        <div class="flow-help" hidden><div class="flow-key">${legend}</div></div>
        <div class="flow-viewport" tabindex="0" role="group" aria-label="${esc(t("map.viewport"))}" aria-roledescription="${esc(t("map.title"))}">
          <svg class="flow-svg" role="group" xmlns="${SVG}"><g class="flow-connections"></g><g class="flow-joins"></g><path class="flow-link-preview" d="" visibility="hidden"/><g class="flow-nodes"></g><rect class="flow-locator" rx="10" visibility="hidden"/></svg>
        </div>
        <div class="flow-foot"><p class="flow-status" aria-hidden="true"></p><div class="flow-key" aria-hidden="true">${legend}</div><p class="flow-hint" aria-hidden="true">${esc(t("map.hint"))}</p></div>
      </div>`;
    this.viewport = this.element.querySelector(".flow-viewport");
    this.svg = this.element.querySelector(".flow-svg");
    this.edgeLayer = this.svg.querySelector(".flow-connections");
    this.joinLayer = this.svg.querySelector(".flow-joins");
    this.nodeLayer = this.svg.querySelector(".flow-nodes");
    this.locator = this.svg.querySelector(".flow-locator");
    this.stats = this.element.querySelector(".flow-stats");
    this.storyName = this.element.querySelector(".flow-story");
    this.statusLine = this.element.querySelector(".flow-status");
    this.captionLine = this.element.querySelector(".flow-caption-line");
    this.scaleLabel = this.element.querySelector("[data-flow-scale]");
    this.resizeObserver.disconnect();
    this.resizeObserver.observe(this.viewport);
    this.setImage(this.image);
    this.syncExpanded();
    this.toggleHelp(false);
    this.lastSize = null;
    this.lod = false;
    this.unit = 1;
    this.builtLanguage = this.language;
  }
  local(value) {
    return this.prose(value?.[this.language] || value?.zh || value?.en || "");
  }
  /** Title of a chapter on the map: the curated label (it tells apart chapters that share an event name), else the heading. */
  docTitle(doc) {
    return this.local(this.tree.labels?.[doc] || this.tree.docs.get(doc)?.title) || t("reader.chapter");
  }
  /** The heading the reader shows for the chapter. */
  docHeading(doc) {
    return this.local(this.tree.docs.get(doc)?.title);
  }
  /** Second line of a node: the reader's heading, when it adds something to the curated label. */
  subtitle(node) {
    const label = this.tree.labels?.[node.doc] ? this.local(this.tree.labels[node.doc]) : "";
    const heading = this.docHeading(node.doc);
    if (!label || !heading || label === heading) return "";
    const a = norm(label), b = norm(heading);
    if (!a || !b || a.includes(b) || b.includes(a)) return "";
    // A heading that dozens of chapters share ("Boon Bestowed") is the event's name, not a way to tell this one apart.
    if (!this.headCounts) {
      this.headCounts = new Map();
      for (const n of this.tree.nodes.values()) if (n.type === "doc") this.headCounts.set(this.docHeading(n.doc), (this.headCounts.get(this.docHeading(n.doc)) || 0) + 1);
    }
    return this.headCounts.get(heading) >= 3 ? "" : heading;
  }
  groupCaption(node) {
    switch (node.type) {
      case "parallel": {
        const base = node.via?.required ? t("map.parallelRequired", { n: node.via.required }) : t("map.parallel");
        const title = this.local(node.via?.label);
        return title ? `∥ ${title} · ${base}` : `∥ ${base}`;
      }
      case "exclusive":
      case "refset": {
        if (node.type === "refset" && !node.exclusive) return "";
        return `${node.via?.random ? "⚄" : "◈"} ${this.local(node.via?.label) || (node.via?.random ? t("map.random") : t("map.exclusive"))}`;
      }
      case "fork":
        return `◇ ${this.local(node.via?.label) || t("map.option")}`;
      case "appendix":
        return t("map.appendix");
      case "shared": {
        const via = node.via || {};
        const text = via.label ? this.local(via.label) : via.secondary ? t("map.secondary") : via.triggers?.length ? this.local(via.triggers[0]) : via.random ? t("map.random") : "";
        return `${via.random && !via.label ? "⚄ " : ""}${text} ×${via.count}`.trim();
      }
      default:
        return "";
    }
  }
  delayCaption(delay) {
    const list = Array.isArray(delay) ? delay : delay ? [delay] : [];
    const first = list[0];
    if (!first) return "";
    for (const unit of ["years", "months", "days"]) {
      const value = Number(first[unit]);
      if (!value) continue;
      const spread = Number(first.random) || 0;
      const d = spread ? `${value}–${value + spread}` : `${value}`;
      return t(unit === "days" ? "map.delay" : unit === "months" ? "map.delayMonths" : "map.delayYears", { d });
    }
    return "";
  }
  /** "25%" / "≈25%" / "20–100%" for a chance, or a [low, high] range of chances. */
  pct(chance, modified) {
    if (chance === undefined || chance === null) return "";
    const [lo, hi] = Array.isArray(chance) ? chance : [chance, chance];
    const f = (v) => (v * 100 < 1 && v > 0 ? (v * 100).toFixed(1) : Math.round(v * 100));
    return (modified ? "≈" : "") + (f(lo) === f(hi) ? f(lo) : `${f(lo)}–${f(hi)}`) + "%";
  }
  /** Spoken form of a chance for the node's accessible name. */
  chanceCaption(via) {
    if (via?.chance === undefined || via.chance === null) return "";
    const p = via.chance * 100;
    return (via.modified ? "≈" : "") + t("map.chance", { p: p < 1 ? p.toFixed(1) : Math.round(p) });
  }
  /** Real condition text from structured conditions: only atoms that have a name; nothing when none does. */
  conditionText(when) {
    if (!Array.isArray(when)) return "";
    const branchText = (branch) =>
      [...new Set(branch.map((atom) => {
        const name = atom?.label?.[this.language] || atom?.label?.zh;
        return name ? (atom.value === false ? t("map.notCond") : "") + this.prose(name) : "";
      }).filter(Boolean))].slice(0, 3).join(t("map.and"));
    const texts = [];
    for (const dnf of when) for (const branch of Array.isArray(dnf) ? dnf : []) {
      const text = branchText(Array.isArray(branch) ? branch : [branch]);
      if (text && !texts.includes(text)) texts.push(text);
    }
    return texts.slice(0, 2).join(t("map.or"));
  }
  /** How you get to this chapter: option text, authored label, trigger or condition; no chance or delay. */
  leadText(node) {
    const via = node.via || {};
    const option = this.tree && optionLabel(this.tree, node);
    if (option) return `◇ ${this.local(option)}`;
    if (via.label) return this.local(via.label);
    if (via.kind === "entry") {
      const trigger = via.triggers?.[0];
      return via.secondary ? t("map.secondary") : trigger ? this.local(trigger) : t("map.entry");
    }
    const condition = this.conditionText(via.when);
    if (condition) return t("map.ifCond", { c: condition });
    const inGroup = ["exclusive", "shared"].includes(this.tree.nodes.get(node.parent)?.type);
    const generic = { random: inGroup ? "" : "map.random", failure: "map.failure", project: "map.project", research: "map.researchOutcome" }[via.kind];
    return generic ? t(generic) : "";
  }
  /** Chapters under the top level or a group caption that all carry the same "how you get here" line need no line at all:
   *  the group (or the map itself) already says it. */
  quietLeads() {
    const quiet = new Set();
    for (const parent of this.tree.nodes.values()) {
      if (!["forest", "parallel", "exclusive", "appendix"].includes(parent.type) || parent.children.length < 3) continue;
      const byText = new Map();
      for (const id of parent.children) {
        const node = this.tree.nodes.get(id);
        if (node?.type !== "doc") continue;
        const text = this.leadText(node);
        if (text) byText.set(text, [...(byText.get(text) || []), id]);
      }
      for (const ids of byText.values()) if (ids.length >= 3) for (const id of ids) quiet.add(id);
    }
    return quiet;
  }
  /** Caption text and chance badge of a node. */
  viaParts(node) {
    const via = node.via || {};
    const shared = this.tree.nodes.get(node.parent)?.type === "shared";
    const lead = shared || this.quiet.has(node.id) ? "" : this.leadText(node);
    const parts = lead ? [lead] : [];
    if (via.weight !== undefined && via.kind === "random" && via.chance === undefined) parts.push(t("map.weight", { w: via.weight }));
    const delay = this.delayCaption(via.delay);
    return { text: [...parts, delay].filter(Boolean).join(" · "), short: parts.join(" · "), chance: this.pct(via.chance, via.modified) };
  }
  /** Caption lines: with the delay when it fits, else without it (the delay stays in the node's accessible name). */
  captionLines(parts, widths, lines) {
    if (!parts.text) return [];
    const full = fitLines(parts.text, widths, this.fonts.captionFont, lines);
    if (parts.short && parts.short !== parts.text && full.at(-1)?.endsWith("…")) return fitLines(parts.short, widths, this.fonts.captionFont, lines);
    return full;
  }
  /** Titles of a link set without the words they all start with ("Ecumenical Council: ..."), when there are some. */
  commonPrefix(titles) {
    if (titles.length < 2) return 0;
    let p = 0;
    while (p < titles[0].length && titles.every((s) => s[p] === titles[0][p])) p++;
    const head = titles[0].slice(0, p);
    const cut = Math.max(head.lastIndexOf(": "), head.lastIndexOf("："));
    if (cut < 3) return 0;
    const skip = cut + (head[cut] === ":" ? 2 : 1);
    return titles.every((s) => s.length - skip >= 2) ? skip : 0;
  }
  roleCaption(node) {
    const kind = this.tree.docs.get(node.doc)?.kind;
    const id = node.doc || "";
    const key = kind && kind !== "event" ? `doc.${kind}` : id.startsWith("special_projects:") ? "doc.project" : "";
    return key ? t(key) : "";
  }
  taskNote(node) {
    const group = this.tree.tasks?.find((g) => g.outcome === node.doc);
    if (!group) return "";
    const done = group.tasks.filter((task) => this.visited.has(task)).length;
    let note = `${t("map.measures", { r: done, n: group.tasks.length })}。${t("map.measuresNote")}`;
    if (this.language === "en") note = `${t("map.measures", { r: done, n: group.tasks.length })}. ${t("map.measuresNote")}`;
    const missing = group.tasks.filter((task) => !this.visited.has(task));
    if (missing.length) note += ` ${t("map.unread")}${missing.map((task) => this.docTitle(task)).join(" / ")}`;
    return note;
  }

  // ---------------------------------------------------------------- node boxes
  /** Box of a node, from its wrapped text; the lines are kept on the node for nodeMarkup. */
  sizeOf(node) {
    const fonts = this.fonts;
    switch (node.type) {
      case "doc": {
        const width = NODE.doc.w - BOX.left - BOX.right;
        const parts = this.viaParts(node);
        const { text, chance } = parts;
        const chanceWidth = chance ? measurer(fonts.chanceFont)(chance) + 10 : 0;
        const role = text ? "" : this.roleCaption(node);
        const captionLines = text ? this.captionLines(parts, [width - chanceWidth, width], 2) : role ? fitLines(role, [width - chanceWidth, width], fonts.captionFont, 1) : [];
        const titleLines = fitLines(this.docTitle(node.doc), width, fonts.titleFont, 2);
        const sub = this.subtitle(node);
        const subLines = sub ? fitLines(sub, width, fonts.subFont, 1) : [];
        const captionRows = captionLines.length || (chance ? 1 : 0);
        const content = (captionRows ? captionRows * BOX.cap + BOX.gap : 0) + titleLines.length * BOX.title + (subLines.length ? 2 + BOX.sub : 0);
        const h = Math.max(BOX.min, Math.ceil(content + BOX.top + BOX.bottom));
        node._t = { captionLines, chance, titleLines, subLines, captionRows, content, text: text || role };
        return { w: NODE.doc.w, h };
      }
      case "ref": {
        const inner = NODE.ref.w - 26;
        const parts = this.viaParts(node);
        const { text } = parts;
        const chance = parts.chance || (node.count > 1 ? `×${node.count}` : "");
        const chanceWidth = chance ? measurer(fonts.chanceFont)(chance) + 8 : 0;
        const glyph = node.via?.kind === "return" ? "↻" : "↩";
        const main = fitLines(`${glyph} ${this.docTitle(node.doc)}`, [inner - chanceWidth, inner], fonts.refFont, 2);
        const captionLines = this.captionLines(parts, inner, 1);
        const content = main.length * 15 + (captionLines.length ? 17 : 0);
        node._t = { main, captionLines, chance, text, content };
        return { w: NODE.ref.w, h: Math.max(NODE.ref.h, Math.ceil(content + 18)) };
      }
      case "refset": {
        const rows = Math.min(node.items.length, NODE.refsetMax) + (node.items.length > NODE.refsetMax ? 1 : 0);
        const caption = node.exclusive ? node.caption : this.viaParts(node).text;
        const titles = node.items.map((item) => this.docTitle(item.doc));
        const cases = node.cases > 1 ? `×${node.cases}` : "";
        const room = NODE.refset.w - 20 - (cases ? measurer(fonts.chanceFont)(cases) + 8 : 0);
        node._t = { head: fitLines(caption || `↩ ${t("map.ref")}`, room, fonts.captionFont, 1)[0] || "", caption, cases, titles, skip: this.commonPrefix(titles) };
        return { w: NODE.refset.w, h: NODE.refset.head + rows * NODE.refsetRow + 4 };
      }
      case "forest":
        return null;
      default: {
        const caption = node.caption || "";
        const w = Math.max(34, Math.min(NODE.group.maxW, measurer(fonts.captionFont)(caption) + 30));
        const lines = fitLines(caption, w - 22, fonts.captionFont, 2);
        node._t = { lines };
        return { w, h: lines.length > 1 ? 38 : NODE.group.h };
      }
    }
  }
  nodeMarkup(node, b) {
    const x = b.x - b.w / 2;
    const folded = this.collapsed.has(node.id) ? hiddenCount(this.tree, node.id) : 0;
    const badge = folded
      ? `<g class="flow-fold" data-fold="${esc(node.id)}" transform="translate(${b.w / 2} ${b.h + 2})"><rect x="-19" y="0" width="38" height="16" rx="8"/><text x="0" y="11.5" text-anchor="middle">+${folded}</text></g>`
      : "";
    const m = node._t;
    if (node.type === "doc") {
      const title = this.docTitle(node.doc);
      const heading = this.docHeading(node.doc);
      const ending = this.tree.endings?.[node.doc];
      const task = this.taskNote(node);
      const parent = this.tree.nodes.get(node.parent);
      const via = node.via || {};
      const lead = [parent?.type === "shared" ? parent.caption : "", m.text || this.roleCaption(node), this.chanceCaption(via)].filter(Boolean).join(" · ");
      const label = [lead, title, heading !== title ? heading : "", ending ? this.local(ending.label) : "", task].filter(Boolean).join(" — ");
      let y = (b.h - m.content) / 2;
      let markup = "";
      if (m.captionRows) {
        const base = baseline(y, BOX.cap, 11);
        markup += textBlock("flow-caption", BOX.left, base, m.captionLines, BOX.cap);
        if (m.chance) markup += `<text class="flow-chance" x="${b.w - 10}" y="${base}" text-anchor="end">${esc(m.chance)}</text>`;
        y += m.captionRows * BOX.cap + BOX.gap;
      }
      markup += textBlock("flow-label", BOX.left, baseline(y, BOX.title, 13), m.titleLines, BOX.title);
      y += m.titleLines.length * BOX.title;
      if (m.subLines.length) markup += textBlock("flow-sub", BOX.left, baseline(y + 2, BOX.sub, 11), m.subLines, BOX.sub);
      const mark = ending ? `<g class="flow-ending" transform="translate(${b.w - 14} ${b.h - 13})"><path d="M0 -5L5 0L0 5L-5 0Z"/></g>` : "";
      const back = node.returns ? `<text class="flow-return" x="${b.w - (ending ? 26 : 9)}" y="${b.h - 8}" text-anchor="end">↻</text>` : "";
      return `<g class="flow-node doc${node.gate ? " gate" : ""}${ending ? " ending" : ""}${node.returns ? " returns" : ""}${folded ? " folded" : ""}" data-node="${esc(node.id)}" data-chapter="${esc(node.doc)}" role="link" tabindex="-1" aria-label="${esc(label)}" transform="translate(${x} ${b.y})"><title>${esc(label)}</title><rect class="flow-box" width="${b.w}" height="${b.h}" rx="3"/><rect class="flow-bar" width="3" height="${b.h}"/>${markup}${mark}${back}${badge}</g>`;
    }
    if (node.type === "ref") {
      const title = this.docTitle(node.doc);
      const verb = node.via?.kind === "return" ? t("map.return") : t("map.ref");
      const caption = [m.text, this.chanceCaption(node.via)].filter(Boolean).join(" · ");
      const label = [caption, `${verb} ${title}`].filter(Boolean).join(" — ");
      const y = (b.h - m.content) / 2;
      const base = baseline(y, 15, 12);
      const chance = m.chance ? `<text class="flow-chance" x="${b.w - 12}" y="${base}" text-anchor="end">${esc(m.chance)}</text>` : "";
      const cap = textBlock("flow-caption", 13, baseline(y + m.main.length * 15 + 3, BOX.cap, 11), m.captionLines, BOX.cap);
      return `<g class="flow-node ref" data-node="${esc(node.id)}" data-chapter="${esc(node.doc)}" data-ref="${esc(node.ref || "")}" role="link" tabindex="-1" aria-label="${esc(label)}" transform="translate(${x} ${b.y})"><title>${esc(label)}</title><rect class="flow-box" width="${b.w}" height="${b.h}" rx="${b.h <= 36 ? b.h / 2 : 10}"/>${textBlock("flow-ref", 13, base, m.main, 15)}${chance}${cap}</g>`;
    }
    if (node.type === "refset") {
      const shown = node.items.slice(0, NODE.refsetMax);
      const rows = shown
        .map((item, i) => {
          const title = m.titles[i];
          const chance = this.pct(item.chance, item.modified);
          const tag = chance || (item.count > 1 ? `×${item.count}` : "");
          const room = b.w - 24 - (tag ? measurer(this.fonts.chanceFont)(tag) + 8 : 0);
          const line = fitLines(`↩ ${title.slice(m.skip)}`, room, this.fonts.captionFont, 1)[0];
          const spoken = chance ? `${title} ${chance}` : title;
          return `<g class="flow-refitem" data-item="${esc(item.doc)}" data-chapter="${esc(item.doc)}" data-ref="${esc(item.ref || "")}" role="link" tabindex="-1" aria-label="${esc(`${t("map.ref")} ${spoken}`)}" transform="translate(0 ${NODE.refset.head + i * NODE.refsetRow})"><rect width="${b.w}" height="${NODE.refsetRow}"/><text x="12" y="13.5">${esc(line)}</text>${tag ? `<text class="flow-chance" x="${b.w - 10}" y="13" text-anchor="end">${esc(tag)}</text>` : ""}</g>`;
        })
        .join("");
      const rest = node.items.slice(shown.length);
      const more = rest.length
        ? `<text class="flow-more" x="12" y="${NODE.refset.head + shown.length * NODE.refsetRow + 13.5}">${esc(fitLines(`+${rest.length} · ${rest.map((i) => this.docTitle(i.doc).slice(m.skip)).join(" / ")}`, b.w - 24, this.fonts.captionFont, 1)[0])}</text>`
        : "";
      const label = [m.caption, node.cases > 1 ? t("map.cases", { n: node.cases }) : "", ...node.items.map((i) => this.docTitle(i.doc))].filter(Boolean).join(" — ");
      const cases = m.cases ? `<text class="flow-chance" x="${b.w - 10}" y="18.5" text-anchor="end">${esc(m.cases)}</text>` : "";
      return `<g class="flow-node refset" data-node="${esc(node.id)}" role="group" aria-label="${esc(label)}" transform="translate(${x} ${b.y})"><title>${esc(label)}</title><rect class="flow-box" width="${b.w}" height="${b.h}" rx="4"/><text class="flow-caption flow-head" x="12" y="19">${esc(m.head)}</text>${cases}${rows}${more}</g>`;
    }
    // Structural pills: parallel / exclusive / fork / appendix / shared caption.
    const lines = m.lines;
    const base = lines.length > 1 ? 16 : b.h / 2 + 4;
    return `<g class="flow-node group ${esc(node.type)}${folded ? " folded" : ""}" data-node="${esc(node.id)}" role="group" tabindex="-1" aria-label="${esc(node.caption)}" transform="translate(${x} ${b.y})"><title>${esc(node.caption)}</title><rect class="flow-box" width="${b.w}" height="${b.h}" rx="${lines.length > 1 ? 12 : b.h / 2}"/>${textBlock("flow-caption", b.w / 2, base, lines, BOX.cap, ' text-anchor="middle"')}${badge}</g>`;
  }
  /** Draw the node boxes in slices, nearest to the current page first. The first layout of a story's labels costs
   *  ~0.3 ms per character not seen before in that font (shaping, then glyph bounds when painting): one pass over a
   *  whole map was a 60–100 ms frame. Each slice stops after SLICE_MS (script + layout), the next one follows in the
   *  next animation frame; an update() that rebuilds the map (fold, language, other story) cancels the rest. */
  fillNodes(list) {
    const token = this.fillToken;
    const from = this.layout.nodes.get(this.currentNode);
    const distance = (node) => {
      const b = this.layout.nodes.get(node.id);
      const dx = b.x - (from?.x ?? 0), dy = (b.y - (from?.y ?? 0)) * 1.8;
      return dx * dx + dy * dy;
    };
    const queue = list.map((node) => [distance(node), node]).sort((a, b) => a[0] - b[0]).map((entry) => entry[1]);
    // The nodes keep the tree's order in the DOM (reading order for assistive technology, Tab order): each one is put in
    // before the next later node that is already there.
    const position = new Map(list.map((node, i) => [node.id, i]));
    const scratch = document.createElementNS(SVG, "g");
    const slice = () => {
      if (token !== this.fillToken) return;
      const started = performance.now();
      do {
        const batch = queue.splice(0, 2);
        for (const node of batch) {
          scratch.innerHTML = this.nodeMarkup(node, this.layout.nodes.get(node.id));
          const el = scratch.firstElementChild;
          let before = null;
          for (let i = position.get(node.id) + 1; i < list.length && !before; i++) before = this.nodeElements.get(list[i].id) || null;
          this.nodeLayer.insertBefore(el, before);
          this.nodeElements.set(node.id, el);
          this.paintNode(node.id, el, this.path);
          if (node.id === (this.focusNode && this.nodeElements.has(this.focusNode) ? this.focusNode : this.currentNode)) el.setAttribute("tabindex", "0");
        }
        this.svg.getBoundingClientRect(); // lay this batch out now, so the slice's cost is known
      } while (queue.length && performance.now() - started < SLICE_MS);
      if (queue.length) requestAnimationFrame(slice);
      else {
        this.nodeElements = new Map(list.filter((node) => this.nodeElements.has(node.id)).map((node) => [node.id, this.nodeElements.get(node.id)]));
        this.paintState();
      }
    };
    requestAnimationFrame(slice);
  }
  /** Route/visited classes of one node. */
  paintNode(id, el, path) {
    const node = this.tree.nodes.get(id);
    const doc = node.doc;
    const isCurrent = id === this.currentNode;
    const onPath = path.nodes.has(id);
    const visited = doc ? this.visited.has(doc) : node.type === "refset" ? node.items.some((i) => this.visited.has(i.doc)) : onPath;
    el.classList.toggle("current", isCurrent);
    el.classList.toggle("path", onPath && !isCurrent);
    el.classList.toggle("visited", !onPath && visited);
    el.classList.toggle("unread", !onPath && !visited && !isCurrent);
    if (isCurrent) el.setAttribute("aria-current", "step");
    else el.removeAttribute("aria-current");
    if (node.type === "refset")
      for (const item of el.querySelectorAll("[data-item]"))
        item.classList.toggle("path", path.items.has(`${id}|${item.dataset.item}`));
  }
  /** Route/visited classes only: no DOM rebuild while reading. */
  paintState() {
    if (!this.nodeElements) return;
    const path = this.path;
    this.stats.textContent = t("map.stats", { n: this.tree.docCount, r: [...this.visited].filter((id) => this.tree.primary.has(id)).length });
    if (this.storyName) this.storyName.textContent = this.local(this.story.title);
    if (this.captionLine) this.captionLine.textContent = this.docTitle(this.current);
    for (const [id, el] of this.nodeElements) this.paintNode(id, el, path);
    for (const el of this.edgeElements) el.classList.toggle("traversed", path.edges.has(el.dataset.edge));
    for (const el of this.joinLayer.children) {
      const [from, to] = (el.dataset.join || "").split(">");
      el.classList.toggle("traversed", path.nodes.has(from) && path.nodes.has(to));
    }
    // Roving tab stop sits on the current page.
    const focusId = this.focusNode && this.nodeElements.has(this.focusNode) ? this.focusNode : this.currentNode;
    for (const [id, el] of this.nodeElements) el.setAttribute("tabindex", id === focusId ? "0" : "-1");
    this.updateLocator();
    if (!this.hovering) this.setStatus(null);
  }
  /** Overview: a ring around the current page, so it is found in a map drawn as boxes. */
  updateLocator() {
    const b = this.locator && this.layout?.nodes.get(this.currentNode);
    if (!b) return;
    const m = Math.round(8 * this.unit);
    this.locator.setAttribute("x", b.x - b.w / 2 - m);
    this.locator.setAttribute("y", b.y - m);
    this.locator.setAttribute("width", b.w + m * 2);
    this.locator.setAttribute("height", b.h + m * 2);
    this.locator.setAttribute("visibility", this.lod ? "visible" : "hidden");
  }
  /** Footer line of the expanded map: the node under the pointer or focus, else where the reader is. */
  setStatus(el) {
    if (!this.statusLine) return;
    this.hovering = !!el;
    let text = el?.getAttribute("aria-label");
    if (!text && this.currentNode && this.tree) {
      const title = this.docTitle(this.current);
      const heading = this.docHeading(this.current);
      text = `◎ ${t("map.reading")}: ${title}${heading && heading !== title ? ` · ${heading}` : ""}`;
    }
    this.statusLine.textContent = text || "";
  }

  // ---------------------------------------------------------------- view
  minZoom() {
    return this.expanded ? ZOOM_OVERLAY : ZOOM_CARD;
  }
  toScreen(x, y) {
    return { x: this.view.x + (x - this.origin.x) * this.view.k, y: this.view.y + (y - this.origin.y) * this.view.k };
  }
  applyView(animate, keepFit = false, ms = 420) {
    if (!this.svg) return;
    const { k, x, y } = this.view;
    if (!keepFit) this.fitted = false;
    const smooth = animate && !this.reducedMotion();
    this.svg.style.transition = smooth ? `transform ${ms}ms cubic-bezier(.2,.8,.2,1)` : "none";
    this.svg.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${k.toFixed(4)})`;
    // Below LOD_K only boxes are drawn; their strokes grow in steps (the --u factor) so the lines stay about as thick on screen.
    const lod = k < LOD_K;
    const unit = lod ? KEY_UNITS.find((v) => v >= 0.9 / k) ?? 30 : 1;
    if (lod !== this.lod) {
      this.lod = lod;
      this.svg.classList.toggle("lod", lod);
    }
    if (unit !== this.unit) {
      this.unit = unit;
      this.svg.style.setProperty("--u", unit);
    }
    if (this.scaleLabel) this.scaleLabel.textContent = `${lod ? t("map.overview") + " " : ""}${Math.round(k * 100)}%`;
    this.updateLocator();
    this.markMoving();
  }
  /** Promote the layer only while it moves; text re-rasterises when it rests. */
  markMoving() {
    this.svg.style.willChange = "transform";
    clearTimeout(this.restTimer);
    this.restTimer = setTimeout(() => {
      if (this.svg) this.svg.style.willChange = "auto";
    }, 480);
  }
  clampView() {
    if (!this.viewport) return;
    const { w, h } = this.viewSize();
    const sw = this.size.w * this.view.k, sh = this.size.h * this.view.k;
    const margin = 80;
    this.view.x = sw < w ? Math.min(Math.max(this.view.x, -sw + margin), w - margin) : Math.min(margin, Math.max(w - sw - margin, this.view.x));
    this.view.y = sh < h ? Math.min(Math.max(this.view.y, -sh + margin), h - margin) : Math.min(margin, Math.max(h - sh - margin, this.view.y));
  }
  setZoom(value, cx, cy, animate = true, ms) {
    const k = Math.max(this.minZoom(), Math.min(ZOOM_MAX, value));
    if (!this.viewport) return;
    cx ??= this.viewSize().w / 2;
    cy ??= this.viewSize().h / 2;
    const ratio = k / this.view.k;
    this.view.x = cx - (cx - this.view.x) * ratio;
    this.view.y = cy - (cy - this.view.y) * ratio;
    this.view.k = k;
    this.followCurrent = false;
    this.clampView();
    this.applyView(animate, false, ms);
  }
  centerOn(id, animate = true, k = this.view.k) {
    const b = this.layout?.nodes.get(id);
    if (!b || !this.viewSize().w) return false;
    const { w, h } = this.viewSize();
    this.view.k = k;
    this.view.x = w / 2 - (b.x - this.origin.x) * k;
    // Slightly below centre: where the reader came from stays in view above.
    const topLevel = this.tree.nodes.get(this.tree.nodes.get(id)?.parent)?.type === "forest";
    this.view.y = h * (topLevel ? 0.3 : 0.56) - (b.y + b.h / 2 - this.origin.y) * k;
    this.clampView();
    this.applyView(animate);
    return true;
  }
  ensureVisible(id) {
    const b = this.layout?.nodes.get(id);
    if (!b || !this.viewport) return;
    const p = this.toScreen(b.x - b.w / 2, b.y);
    const { w, h } = this.viewSize(), k = this.view.k;
    const pad = 24;
    let dx = 0, dy = 0;
    if (p.x < pad) dx = pad - p.x;
    else if (p.x + b.w * k > w - pad) dx = w - pad - (p.x + b.w * k);
    if (p.y < pad) dy = pad - p.y;
    else if (p.y + b.h * k > h - pad) dy = h - pad - (p.y + b.h * k);
    if (dx || dy) {
      this.view.x += dx;
      this.view.y += dy;
      this.applyView(true);
    }
  }
  /** Scale at which the whole map fits the viewport (never above 1:1). */
  fitScale() {
    const { w, h } = this.viewSize();
    return Math.min(1, (w - 24) / this.size.w, (h - 24) / this.size.h);
  }
  fit(animate = true) {
    const { w, h } = this.viewSize();
    if (!w) return;
    const k = Math.max(this.minZoom(), this.fitScale());
    this.view = { k, x: (w - this.size.w * k) / 2, y: Math.max(12, (h - this.size.h * k) / 2), placed: true };
    this.applyView(animate, true);
    this.fitted = true;
  }
  /** Overview button / key 0: the whole map; pressed again, back to the current page at reading scale. */
  overview() {
    // The card cannot hold the whole of a large map at a useful scale: the overview opens in the expanded map instead.
    if (!this.expanded && this.fitScale() < ZOOM_CARD) {
      this.wantOverview = true;
      this.setExpanded(true);
      return;
    }
    if (this.fitted) {
      this.followCurrent = true;
      this.centerOn(this.currentNode, true, Math.max(this.expanded ? 1 : 0.9, this.view.k));
    } else {
      this.followCurrent = false;
      this.fit();
    }
  }
  /** Viewport size from the ResizeObserver: reading clientWidth right after a rebuild forces layout. */
  viewSize() {
    if (this.lastSize?.[0]) return { w: this.lastSize[0], h: this.lastSize[1] };
    // Unknown until the observer reports (after layout); placement waits for it.
    return { w: 0, h: 0 };
  }
  fitOrFocus() {
    const { w, h } = this.viewSize();
    if (!w || !h) return false;
    // Small trees fit whole; larger ones open on the current page at reading scale.
    const whole = this.wantOverview || (this.expanded ? this.fitScale() >= 0.6 : this.size.w * 0.85 <= w && this.size.h * 0.85 <= h);
    this.wantOverview = false;
    if (whole) this.fit(false);
    else this.centerOn(this.currentNode, false, this.expanded ? 1 : 0.92);
    return true;
  }
  focusCurrent(animate = true) {
    if (!this.currentNode || this.image || !this.layout) return;
    if (!this.view.placed) {
      this.view.placed = this.fitOrFocus();
      return;
    }
    this.centerOn(this.currentNode, animate);
  }

  // ---------------------------------------------------------------- input
  bindEvents() {
    const el = this.element;
    let drag = null;
    let pinch = null;
    const pointers = new Map();
    let gestureOn = false;
    const noSelect = (e) => e.preventDefault();
    el.addEventListener("lostpointercapture", end_);
    function end_(e) { el.dispatchEvent(new PointerEvent("pointercancel", { pointerId: e.pointerId })); }
    el.addEventListener("pointerdown", (e) => {
      const viewport = e.target.closest(".flow-viewport");
      if (!viewport || e.button > 0) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      // Gesture started on the map: no page text selection until it ends.
      if (!gestureOn) {
        gestureOn = true;
        document.addEventListener("selectstart", noSelect, true);
        el.classList.add("flow-gesture");
        try { getSelection()?.removeAllRanges(); } catch {}
      }
      if (pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), k: this.view.k };
        drag = null;
        return;
      }
      drag = { x: e.clientX, y: e.clientY, vx: this.view.x, vy: this.view.y, moved: false, id: e.pointerId };
    });
    el.addEventListener("pointermove", (e) => {
      if (pointers.has(e.pointerId)) pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pinch && pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        const rect = this.viewport.getBoundingClientRect();
        this.setZoom((pinch.k * Math.hypot(a.x - b.x, a.y - b.y)) / pinch.d, (a.x + b.x) / 2 - rect.left, (a.y + b.y) / 2 - rect.top, false);
        return;
      }
      if (!drag || drag.id !== e.pointerId) return;
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (!drag.moved && Math.hypot(dx, dy) < 5) return;
      if (!drag.moved) {
        drag.moved = true;
        this.viewport.setPointerCapture(e.pointerId);
        this.viewport.classList.add("dragging");
      }
      this.followCurrent = false;
      this.view.x = drag.vx + dx;
      this.view.y = drag.vy + dy;
      this.clampView();
      this.applyView(false);
    });
    const end = (e) => {
      pointers.delete(e.pointerId);
      if (!pointers.size && gestureOn) {
        gestureOn = false;
        document.removeEventListener("selectstart", noSelect, true);
        el.classList.remove("flow-gesture");
      }
      if (pointers.size < 2) pinch = null;
      if (drag?.id === e.pointerId) {
        if (drag.moved) {
          this.suppressClick = true;
          setTimeout(() => (this.suppressClick = false), 0);
        }
        this.viewport?.classList.remove("dragging");
        drag = null;
      }
    };
    el.addEventListener("pointerup", end);
    el.addEventListener("pointercancel", end);
    // A drag never navigates.
    el.addEventListener(
      "click",
      (e) => {
        if (this.suppressClick) {
          e.stopPropagation();
          e.preventDefault();
        }
      },
      true,
    );
    el.addEventListener(
      "wheel",
      (e) => {
        if (!e.target.closest(".flow-viewport")) return;
        e.preventDefault();
        const rect = this.viewport.getBoundingClientRect();
        const unit = e.deltaMode === 1 ? 16 : 1;
        // On the expanded map a mouse-wheel notch zooms (a trackpad's fine, two-axis deltas still pan); Ctrl / pinch always zoom.
        const notch = this.expanded && !e.shiftKey && (e.deltaMode === 1 || (e.deltaX === 0 && Math.abs(e.deltaY) >= 50 && Number.isInteger(e.deltaY)));
        if (e.ctrlKey || e.metaKey) {
          this.setZoom(this.view.k * Math.exp(-e.deltaY * unit * 0.0022), e.clientX - rect.left, e.clientY - rect.top, false);
        } else if (notch) {
          this.setZoom(this.view.k * Math.exp(-e.deltaY * (e.deltaMode === 1 ? 33 : 1) * 0.0016), e.clientX - rect.left, e.clientY - rect.top, true, 140);
        } else {
          this.followCurrent = false;
          this.view.x -= (e.shiftKey ? e.deltaY : e.deltaX) * unit;
          this.view.y -= (e.shiftKey ? 0 : e.deltaY) * unit;
          this.clampView();
          this.applyView(false);
        }
      },
      { passive: false },
    );
    el.addEventListener("click", (e) => {
      const zoom = e.target.closest("[data-flow-zoom]");
      if (zoom) this.setZoom(this.view.k * (1 + Number(zoom.dataset.flowZoom)));
      if (e.target.closest("[data-flow-close]")) this.show(false);
      if (e.target.closest("[data-flow-image]")) this.setImage(!this.image);
      if (e.target.closest("[data-flow-expand]")) this.setExpanded(!this.expanded);
      if (e.target.closest("[data-flow-collapse]")) this.setExpanded(false);
      if (e.target.closest("[data-flow-help]")) this.toggleHelp();
      else if (this.help && !e.target.closest(".flow-help")) this.toggleHelp(false);
      if (e.target.closest("[data-flow-fit]")) this.overview();
      if (e.target.closest("[data-flow-current]")) {
        this.followCurrent = true;
        this.centerOn(this.currentNode, true, Math.max(this.view.k, 0.75));
      }
      // The dimmed area around the expanded map closes it.
      if (this.expanded && e.target === el) this.setExpanded(false);
      const fold = e.target.closest("[data-fold]") || (e.target.closest(".flow-node.group.folded") && e.target.closest("[data-node]"));
      if (fold) {
        e.stopPropagation();
        this.toggleFold(fold.dataset.fold || fold.dataset.node);
      } else if (e.target.closest(".flow-node.group:not(.folded)") && !e.target.closest("[data-chapter]")) {
        const id = e.target.closest("[data-node]").dataset.node;
        if (this.tree.nodes.get(id).children.length) this.toggleFold(id);
      } else if (this.expanded && e.target.closest(".flow-viewport [data-chapter]")) {
        // A chapter picked in the expanded map opens in the reader behind it (the reader's own handler follows this one).
        this.setExpanded(false, { focus: false });
      }
    });
    el.addEventListener("keydown", (e) => (e.key === "Tab" && this.expanded ? this.trapTab(e) : this.onKey(e)));
    el.addEventListener("focusin", (e) => {
      const node = e.target.closest?.("[data-node]");
      if (node) {
        this.focusNode = node.dataset.node;
        this.ensureVisible(this.focusNode);
      }
      this.previewLink(e.target.closest?.("[data-ref]"));
      this.setStatus(e.target.closest?.("[data-node], [data-item]"));
    });
    el.addEventListener("focusout", () => {
      this.previewLink(null);
      this.setStatus(null);
    });
    // A link back is drawn only on demand, so convergence never becomes spaghetti.
    el.addEventListener("pointerover", (e) => {
      this.previewLink(e.target.closest?.("[data-ref]"));
      if (this.expanded) this.setStatus(e.target.closest?.("[data-item], [data-node]"));
    });
    el.addEventListener("pointerout", (e) => {
      if (!e.relatedTarget?.closest?.("[data-ref]")) this.previewLink(null);
      if (this.expanded && !e.relatedTarget?.closest?.("[data-item], [data-node]")) this.setStatus(null);
    });
  }
  /** Keep Tab inside the expanded map. */
  trapTab(e) {
    const items = [...this.element.querySelectorAll("button:not([disabled]), [tabindex='0']")].filter((n) => n.offsetParent !== null || n.closest("svg"));
    if (!items.length) return;
    const first = items[0], last = items.at(-1);
    const active = document.activeElement;
    if (e.shiftKey && (active === first || !this.element.contains(active))) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && (active === last || !this.element.contains(active))) {
      e.preventDefault();
      first.focus();
    }
  }
  previewLink(element) {
    const preview = this.svg?.querySelector(".flow-link-preview");
    if (!preview) return;
    const targetId = element?.dataset.ref;
    const target = targetId && this.layout?.nodes.get(targetId);
    const owner = element?.closest("[data-node]")?.dataset.node;
    const from = owner && this.layout?.nodes.get(owner);
    if (!target || target.x === undefined || !from) {
      preview.setAttribute("visibility", "hidden");
      return;
    }
    // From the link's right edge, arcing outward, into the target's side.
    const x1 = from.x + from.w / 2, y1 = from.y + Math.min(from.h / 2, 17);
    const side = target.x >= x1 ? -1 : 1;
    const x2 = target.x + (side * target.w) / 2, y2 = target.y + target.h / 2;
    const bow = Math.max(60, Math.abs(y2 - y1) * 0.35);
    preview.setAttribute("d", `M${x1} ${y1}C${x1 + bow} ${y1},${x2 + side * bow} ${y2},${x2} ${y2}`);
    preview.setAttribute("visibility", "visible");
  }
  toggleFold(id, open) {
    if (!id || !this.tree.nodes.get(id)?.children.length) return;
    const folded = open === undefined ? !this.collapsed.has(id) : !open;
    this.userToggled.set(id, folded);
    if (folded) this.collapsed.add(id);
    else this.collapsed.delete(id);
    const anchor = this.layout.nodes.get(id);
    const before = anchor && this.toScreen(anchor.x, anchor.y);
    this.render(false);
    const after = this.layout.nodes.get(id);
    if (before && after) {
      const now = this.toScreen(after.x, after.y);
      this.view.x += before.x - now.x;
      this.view.y += before.y - now.y;
      this.applyView(false);
    }
    this.nodeElements.get(id)?.focus({ preventScroll: true });
  }
  onKey(e) {
    const target = e.target.closest?.("[data-node]");
    const inViewport = e.target.closest?.(".flow-viewport");
    if (!inViewport) return;
    if (e.key === "+" || e.key === "=") {
      e.preventDefault();
      this.setZoom(this.view.k * 1.2);
      return;
    }
    if (e.key === "-" || e.key === "_") {
      e.preventDefault();
      this.setZoom(this.view.k / 1.2);
      return;
    }
    if (e.key === "0") {
      e.preventDefault();
      this.overview();
      return;
    }
    if (e.key === "?") {
      e.preventDefault();
      this.toggleHelp();
      return;
    }
    if (e.key === "Home") {
      e.preventDefault();
      this.moveFocus(this.currentNode);
      return;
    }
    const arrows = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] };
    if (arrows[e.key]) {
      e.preventDefault();
      const from = target?.dataset.node || this.focusNode || this.currentNode;
      this.moveFocus(this.neighbour(from, ...arrows[e.key]));
      return;
    }
    if ((e.key === "Enter" || e.key === " ") && target) {
      e.preventDefault();
      if (target.dataset.chapter) target.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      else if (this.tree.nodes.get(target.dataset.node)?.children.length) this.toggleFold(target.dataset.node);
    }
    if (e.key === "Enter" && !target && this.currentNode) {
      e.preventDefault();
      this.moveFocus(this.currentNode);
    }
  }
  moveFocus(id) {
    if (!id) return;
    const el = this.nodeElements.get(id);
    if (!el) return;
    this.focusNode = id;
    for (const [key, node] of this.nodeElements) node.setAttribute("tabindex", key === id ? "0" : "-1");
    el.focus({ preventScroll: true });
    this.ensureVisible(id);
  }
  /** Tree-aware neighbour: up = parent, down = route child / first child (unfolding), else geometry. */
  neighbour(id, dx, dy) {
    const tree = this.tree;
    const node = tree.nodes.get(id);
    if (!node) return this.currentNode;
    const visible = (n) => this.nodeElements.has(n);
    if (dy < 0) {
      for (let p = node.parent; p; p = tree.nodes.get(p)?.parent) if (visible(p)) return p;
    }
    if (dy > 0) {
      if (this.collapsed.has(id) && node.children.length) {
        this.toggleFold(id, true);
      }
      const kids = node.children.filter(visible);
      const onPath = kids.find((k) => this.path.nodes.has(k));
      if (onPath || kids[0]) return onPath || kids[0];
    }
    // Geometric fallback: nearest node in the pressed direction.
    const from = this.layout.nodes.get(id);
    let best = null, score = Infinity;
    for (const [other] of this.nodeElements) {
      if (other === id) continue;
      const b = this.layout.nodes.get(other);
      const ox = b.x - from.x, oy = b.y + b.h / 2 - (from.y + from.h / 2);
      const along = dx ? ox * dx : oy * dy;
      if (along <= 1) continue;
      const across = dx ? Math.abs(oy) : Math.abs(ox);
      const s = along + across * 2.2;
      if (s < score) (score = s), (best = other);
    }
    return best || id;
  }
}
