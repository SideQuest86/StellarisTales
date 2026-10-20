// Interactive story-tree map hosted on the reader's left card.
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
const ZOOM_MIN = 0.3;
const ZOOM_MAX = 1.8;
const PAD = 28;
const SLICE_MS = 8; // time budget of one slice of a progressive map build
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
  return (c >= 0x4e00 && c <= 0x9fff) || (c >= 0x3400 && c <= 0x4dbf) || (c >= 0x3041 && c <= 0x30ff) || (c >= 0xf900 && c <= 0xfaff) || (c >= 0x20000 && c <= 0x2ebef);
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
/** Fit text into `width`, on up to `lines` lines, with an ellipsis. */
function fitLines(text, width, font, lines = 1) {
  const measure = measurer(font);
  const ellipsis = measure("…");
  const chars = [...String(text || "").replace(/\s+/g, " ").trim()];
  const out = [];
  let start = 0;
  while (start < chars.length && out.length < lines) {
    const last = out.length === lines - 1;
    let used = 0, end = start;
    while (end < chars.length) {
      const w = measure(chars[end]);
      if (used + w > width) break;
      used += w;
      end++;
    }
    if (end >= chars.length) {
      out.push(chars.slice(start).join(""));
      start = chars.length;
      break;
    }
    if (last) {
      while (end > start && used + ellipsis > width) used -= measure(chars[--end]);
      out.push(chars.slice(start, end).join("").trimEnd() + "…");
      start = chars.length;
      break;
    }
    // Prefer breaking Latin text at a space.
    const space = chars.lastIndexOf(" ", end);
    if (space > start + (end - start) * 0.6) end = space;
    out.push(chars.slice(start, end).join("").trim());
    start = end;
    while (chars[start] === " ") start++;
  }
  return out;
}
export class FlowSurface {
  constructor(element) {
    this.element = element;
    this.image = false;
    this.expanded = false;
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
  setExpanded(value) {
    this.expanded = value;
    this.element.classList.toggle("map-expanded", value);
    const button = this.element.querySelector("[data-flow-expand]");
    if (button) {
      button.setAttribute("aria-pressed", String(value));
      button.setAttribute("aria-label", value ? t("map.collapse") : t("map.expand"));
      button.title = button.getAttribute("aria-label");
    }
  }

  // ---------------------------------------------------------------- render
  render(fresh, progressive = false) {
    const tree = this.tree;
    this.fillToken = (this.fillToken || 0) + 1; // any pending slices of an earlier build stop here
    const titleFont = `500 13px ${getComputedStyle(document.documentElement).getPropertyValue("--sans") || "sans-serif"}`;
    const captionFont = `400 11px ${getComputedStyle(document.documentElement).getPropertyValue("--sans") || "sans-serif"}`;
    this.fonts = { titleFont, captionFont };
    for (const node of tree.nodes.values()) node.caption = this.groupCaption(node);
    const anchor = !fresh && this.currentNode && this.layout?.nodes.get(this.currentNode);
    const anchorScreen = anchor ? this.toScreen(anchor.x, anchor.y) : null;
    this.layout = layoutTree(tree, {
      measure: measurer(captionFont),
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
    this.element.innerHTML = `
      <div class="flow-band"><p class="flow-caption-line"></p><div class="flow-band-actions"><button type="button" data-flow-image aria-pressed="false">${esc(t("map.image"))}</button><button type="button" data-flow-expand aria-pressed="false" aria-label="${esc(t("map.expand"))}" title="${esc(t("map.expand"))}"><span aria-hidden="true">⤢</span></button><button type="button" class="flow-mobile-close" data-flow-close aria-label="${esc(t("map.close"))}">×</button></div></div>
      <div class="flow-surface-map">
        <div class="flow-surface-toolbar">
          <span class="flow-title">${esc(t("map.title"))}</span><span class="flow-stats"></span>
          <div class="flow-controls" role="toolbar" aria-label="${esc(t("map.title"))}">
            <button type="button" data-flow-zoom="-0.15" aria-label="${esc(t("map.zoomOut"))}" title="${esc(t("map.zoomOut"))}">−</button><small data-flow-scale>100%</small><button type="button" data-flow-zoom="0.15" aria-label="${esc(t("map.zoomIn"))}" title="${esc(t("map.zoomIn"))}">+</button><button type="button" data-flow-fit aria-label="${esc(t("map.fit"))}" title="${esc(t("map.fit"))}"><span aria-hidden="true">⊡</span></button><button type="button" data-flow-current aria-label="${esc(t("map.locate"))}" title="${esc(t("map.locate"))}"><span aria-hidden="true">◎</span></button>
          </div>
        </div>
        <div class="flow-viewport" tabindex="0" role="group" aria-label="${esc(t("map.viewport"))}" aria-roledescription="${esc(t("map.title"))}">
          <svg class="flow-svg" role="group" xmlns="${SVG}"><g class="flow-connections"></g><g class="flow-joins"></g><path class="flow-link-preview" d="" visibility="hidden"/><g class="flow-nodes"></g></svg>
        </div>
        <div class="flow-key" aria-hidden="true"><span class="key-current">${esc(t("map.keyCurrent"))}</span><span class="key-path">${esc(t("map.keyPath"))}</span><span class="key-read">${esc(t("map.keyRead"))}</span><span class="key-other">${esc(t("map.keyOther"))}</span><span class="key-ref">${esc(t("map.keyRef"))}</span></div>
      </div>`;
    this.viewport = this.element.querySelector(".flow-viewport");
    this.svg = this.element.querySelector(".flow-svg");
    this.edgeLayer = this.svg.querySelector(".flow-connections");
    this.joinLayer = this.svg.querySelector(".flow-joins");
    this.nodeLayer = this.svg.querySelector(".flow-nodes");
    this.stats = this.element.querySelector(".flow-stats");
    this.captionLine = this.element.querySelector(".flow-caption-line");
    this.scaleLabel = this.element.querySelector("[data-flow-scale]");
    this.resizeObserver.disconnect();
    this.resizeObserver.observe(this.viewport);
    this.setImage(this.image);
    this.setExpanded(this.expanded);
    this.lastSize = null;
    this.builtLanguage = this.language;
  }  local(value) {
    return this.prose(value?.[this.language] || value?.zh || value?.en || "");
  }
  docTitle(doc) {
    return this.local(this.tree.labels?.[doc] || this.tree.docs.get(doc)?.title) || t("reader.chapter");
  }
  groupCaption(node) {
    switch (node.type) {
      case "parallel": {
        const base = node.via?.required ? t("map.parallelRequired", { n: node.via.required }) : t("map.parallel");
        const title = this.local(node.via?.label);
        return title ? `∥ ${title} · ${base}` : `∥ ${base}`;
      }
      case "exclusive":
      case "refset":
        if (node.type === "refset" && !node.exclusive) return "";
        return `${node.via?.random ? "⚄" : "◈"} ${this.local(node.via?.label) || (node.via?.random ? t("map.random") : t("map.exclusive"))}`;
      case "fork":
        return `◇ ${this.local(node.via?.label) || t("map.option")}`;
      case "appendix":
        return t("map.appendix");
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
  chanceCaption(via) {
    if (via?.chance === undefined || via.chance === null) return "";
    const p = via.chance * 100;
    return (via.modified ? "≈" : "") + t("map.chance", { p: p < 1 ? p.toFixed(1) : Math.round(p) });
  }
  viaCaption(node) {
    const via = node.via || {};
    const parts = [];
    const option = this.tree && optionLabel(this.tree, node);
    if (option) parts.push(`◇ ${this.local(option)}`);
    else if (via.kind === "entry") {
      const trigger = via.triggers?.[0];
      parts.push(via.secondary ? t("map.secondary") : trigger ? this.local(trigger) : t("map.entry"));
    } else if (via.label) parts.push(this.local(via.label));
    const chance = this.chanceCaption(via);
    if (chance) parts.push(chance);
    else if (via.weight !== undefined && via.kind === "random") parts.push(t("map.weight", { w: via.weight }));
    const delay = this.delayCaption(via.delay);
    if (delay) parts.push(delay);
    if (!parts.length) {
      const generic = { random: "map.random", condition: "map.condition", failure: "map.failure", project: "map.project", research: "map.researchOutcome", bridge: "map.later" }[via.kind];
      if (generic) parts.push(t(generic));
      else if (via.condition) parts.push(this.local(via.condition));
    }
    return parts.join(" · ");
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
  nodeMarkup(node, b) {
    const x = b.x - b.w / 2;
    const folded = this.collapsed.has(node.id) ? hiddenCount(this.tree, node.id) : 0;
    const badge = folded
      ? `<g class="flow-fold" data-fold="${esc(node.id)}" transform="translate(${b.w / 2} ${b.h + 2})"><rect x="-19" y="0" width="38" height="16" rx="8"/><text x="0" y="11.5" text-anchor="middle">+${folded}</text></g>`
      : "";
    if (node.type === "doc") {
      const title = this.docTitle(node.doc);
      const caption = this.viaCaption(node) || this.roleCaption(node);
      const textWidth = b.w - 22;
      const captionLines = caption ? fitLines(caption, textWidth, this.fonts.captionFont, 1) : [];
      const titleLines = fitLines(title, textWidth, this.fonts.titleFont, caption ? 1 : 2);
      const ending = this.tree.endings?.[node.doc];
      const task = this.taskNote(node);
      const label = [caption, title, ending ? this.local(ending.label) : "", task].filter(Boolean).join(" — ");
      const y0 = caption ? 19 : titleLines.length > 1 ? 24 : 32;
      const text = [
        ...captionLines.map((line) => `<text class="flow-caption" x="12" y="${y0}">${esc(line)}</text>`),
        ...titleLines.map((line, i) => `<text class="flow-label" x="12" y="${(caption ? 39 : y0) + i * 17}">${esc(line)}</text>`),
      ].join("");
      return `<g class="flow-node doc${node.gate ? " gate" : ""}${ending ? " ending" : ""}${node.returns ? " returns" : ""}${folded ? " folded" : ""}" data-node="${esc(node.id)}" data-chapter="${esc(node.doc)}" role="link" tabindex="-1" aria-label="${esc(label)}" transform="translate(${x} ${b.y})"><title>${esc(label)}</title><rect class="flow-box" width="${b.w}" height="${b.h}" rx="3"/><rect class="flow-bar" width="3" height="${b.h}"/>${text}${ending ? `<g class="flow-ending" transform="translate(${b.w - 13} 11)"><path d="M0 -5L5 0L0 5L-5 0Z"/></g>` : ""}${node.returns ? `<text class="flow-return" x="${b.w - 8}" y="${b.h - 7}" text-anchor="end">↻</text>` : ""}${badge}</g>`;
    }
    if (node.type === "ref") {
      const title = this.docTitle(node.doc);
      const verb = node.via?.kind === "return" ? t("map.return") : t("map.ref");
      const line = fitLines(`↩ ${verb} · ${title}`, b.w - 18, this.fonts.captionFont, 1)[0];
      const caption = this.viaCaption(node);
      const label = [caption, `${verb} ${title}`].filter(Boolean).join(" — ");
      return `<g class="flow-node ref" data-node="${esc(node.id)}" data-chapter="${esc(node.doc)}" data-ref="${esc(node.ref || "")}" role="link" tabindex="-1" aria-label="${esc(label)}" transform="translate(${x} ${b.y})"><title>${esc(label)}</title><rect class="flow-box" width="${b.w}" height="${b.h}" rx="${b.h / 2}"/><text class="flow-caption" x="12" y="${b.h / 2 + 4}">${esc(line)}</text></g>`;
    }
    if (node.type === "refset") {
      const caption = node.exclusive ? node.caption : this.viaCaption(node);
      const head = fitLines(caption || `↩ ${t("map.ref")}`, b.w - 18, this.fonts.captionFont, 1)[0];
      const shown = node.items.slice(0, NODE.refsetMax);
      const rows = shown
        .map((item, i) => {
          const title = this.docTitle(item.doc);
          const chance = this.chanceCaption(item.via);
          const room = b.w - 20 - (chance ? measurer(this.fonts.captionFont)(chance) + 8 : 0);
          const line = fitLines(`↩ ${title}`, room, this.fonts.captionFont, 1)[0];
          return `<g class="flow-refitem" data-item="${esc(item.doc)}" data-chapter="${esc(item.doc)}" data-ref="${esc(item.ref || "")}" role="link" tabindex="-1" aria-label="${esc([`${t("map.ref")} ${title}`, chance].filter(Boolean).join(" · "))}" transform="translate(0 ${22 + i * NODE.refsetRow})"><rect width="${b.w}" height="${NODE.refsetRow}"/><text x="12" y="13">${esc(line)}</text>${chance ? `<text class="flow-chance" x="${b.w - 9}" y="13" text-anchor="end">${esc(chance)}</text>` : ""}</g>`;
        })
        .join("");
      const more = node.items.length > shown.length
        ? `<text class="flow-more" x="12" y="${22 + shown.length * NODE.refsetRow + 13}">+${node.items.length - shown.length} · ${esc(node.items.slice(shown.length).map((i) => this.docTitle(i.doc)).join(" / ").slice(0, 60))}</text>`
        : "";
      const label = [caption, ...node.items.map((i) => this.docTitle(i.doc))].filter(Boolean).join(" — ");
      return `<g class="flow-node refset" data-node="${esc(node.id)}" role="group" aria-label="${esc(label)}" transform="translate(${x} ${b.y})"><title>${esc(label)}</title><rect class="flow-box" width="${b.w}" height="${b.h}" rx="4"/><text class="flow-caption" x="10" y="15">${esc(head)}</text>${rows}${more}</g>`;
    }
    // Structural pills: parallel / exclusive / fork / appendix.
    const caption = fitLines(node.caption, b.w - 22, this.fonts.captionFont, 1)[0] || "";
    return `<g class="flow-node group ${esc(node.type)}${folded ? " folded" : ""}" data-node="${esc(node.id)}" role="group" tabindex="-1" aria-label="${esc(node.caption)}" transform="translate(${x} ${b.y})"><title>${esc(node.caption)}</title><rect class="flow-box" width="${b.w}" height="${b.h}" rx="${b.h / 2}"/><text class="flow-caption" x="${b.w / 2}" y="${b.h / 2 + 4}" text-anchor="middle">${esc(caption)}</text>${badge}</g>`;
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
  }

  // ---------------------------------------------------------------- view
  toScreen(x, y) {
    return { x: this.view.x + (x - this.origin.x) * this.view.k, y: this.view.y + (y - this.origin.y) * this.view.k };
  }
  applyView(animate) {
    if (!this.svg) return;
    const { k, x, y } = this.view;
    const smooth = animate && !this.reducedMotion();
    this.svg.style.transition = smooth ? "transform 420ms cubic-bezier(.2,.8,.2,1)" : "none";
    this.svg.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${k.toFixed(4)})`;
    if (this.scaleLabel) this.scaleLabel.textContent = `${Math.round(k * 100)}%`;
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
  setZoom(value, cx, cy, animate = true) {
    const k = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, value));
    if (!this.viewport) return;
    cx ??= this.viewSize().w / 2;
    cy ??= this.viewSize().h / 2;
    const ratio = k / this.view.k;
    this.view.x = cx - (cx - this.view.x) * ratio;
    this.view.y = cy - (cy - this.view.y) * ratio;
    this.view.k = k;
    this.followCurrent = false;
    this.clampView();
    this.applyView(animate);
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
  fit(animate = true) {
    const { w, h } = this.viewSize();
    if (!w) return;
    const k = Math.max(ZOOM_MIN, Math.min(1, Math.min(w / this.size.w, h / this.size.h)));
    this.view = { k, x: (w - this.size.w * k) / 2, y: Math.max(8, (h - this.size.h * k) / 2), placed: true };
    this.applyView(animate);
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
    if (this.size.w * 0.85 <= w && this.size.h * 0.85 <= h) this.fit(false);
    else this.centerOn(this.currentNode, false, 0.92);
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
        if (e.ctrlKey || e.metaKey) {
          this.setZoom(this.view.k * Math.exp(-e.deltaY * 0.0022), e.clientX - rect.left, e.clientY - rect.top, false);
        } else {
          const unit = e.deltaMode === 1 ? 16 : 1;
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
      if (e.target.closest("[data-flow-expand]")) {
        this.setExpanded(!this.expanded);
        requestAnimationFrame(() => this.focusCurrent(false));
      }
      if (e.target.closest("[data-flow-fit]")) {
        this.followCurrent = false;
        this.fit();
      }
      if (e.target.closest("[data-flow-current]")) {
        this.followCurrent = true;
        this.centerOn(this.currentNode, true, Math.max(this.view.k, 0.75));
      }
      const fold = e.target.closest("[data-fold]") || (e.target.closest(".flow-node.group.folded") && e.target.closest("[data-node]"));
      if (fold) {
        e.stopPropagation();
        this.toggleFold(fold.dataset.fold || fold.dataset.node);
      } else if (e.target.closest(".flow-node.group:not(.folded)") && !e.target.closest("[data-chapter]")) {
        const id = e.target.closest("[data-node]").dataset.node;
        if (this.tree.nodes.get(id).children.length) this.toggleFold(id);
      }
    });
    el.addEventListener("keydown", (e) => this.onKey(e));
    el.addEventListener("focusin", (e) => {
      const node = e.target.closest?.("[data-node]");
      if (node) {
        this.focusNode = node.dataset.node;
        this.ensureVisible(this.focusNode);
      }
      this.previewLink(e.target.closest?.("[data-ref]"));
    });
    el.addEventListener("focusout", () => this.previewLink(null));
    // A link back is drawn only on demand, so convergence never becomes spaghetti.
    el.addEventListener("pointerover", (e) => this.previewLink(e.target.closest?.("[data-ref]")));
    el.addEventListener("pointerout", (e) => {
      if (!e.relatedTarget?.closest?.("[data-ref]")) this.previewLink(null);
    });
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
      this.fit();
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
