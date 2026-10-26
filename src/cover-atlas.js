import * as THREE from "../vendor/three.module.js";

// One bounded GPU atlas for every closed card (16 MiB, sRGB, no mipmaps).
// Stellaris event art is a 3:1 banner (450×150), so tiles keep that shape:
//   hi tier: 448×150 tiles for the cards nearest the focus (36 slots)
//   lo tier: 128×43 tiles for everything else in view (256 slots)
// Each tile is decoded off the main thread (createImageBitmap), uploaded once as a
// small texture, drawn into its rectangle of the render-target atlas, then freed.
// Slots are evicted least-recently-used; uploads are budgeted per frame.
const SIZE = 2048;
const TIERS = {
  hi: { w: 448, h: 150, cols: 4, rows: 9, top: 0 },
  lo: { w: 128, h: 43, cols: 16, rows: 16, top: 9 * 150 + 2 },
};
const BITMAP_CACHE = 40;
/** A card's art fades in over this long the first time any tile of it is drawn (archive-scene.js passes the fraction). */
export const FADE_MS = 450;

export class CoverAtlas {
  constructor(renderer, asset, wake) {
    this.renderer = renderer;
    this.asset = asset;
    this.wake = wake;
    this.target = new THREE.WebGLRenderTarget(SIZE, SIZE, {
      depthBuffer: false,
      stencilBuffer: false,
      generateMipmaps: false,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      colorSpace: THREE.SRGBColorSpace,
    });
    this.texture = this.target.texture;
    this.tiers = {};
    for (const [name, tier] of Object.entries(TIERS))
      this.tiers[name] = { ...tier, slots: new Map(), free: [...Array(tier.cols * tier.rows).keys()].reverse() };
    this.frame = 0;
    this.loaded = 0;
    this.queue = [];
    this.inflight = 0;
    this.ready = []; // decoded sources waiting for a GPU blit
    this.shownAt = new Map(); // key → time its first tile (either tier) was blitted: the hi tile replacing a lo one does not fade again
    this.fadingUntil = 0;
    this.bitmaps = new Map(); // key → Promise<ImageBitmap|HTMLCanvasElement>
    this.blit = {
      scene: new THREE.Scene(),
      camera: new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1),
      material: new THREE.ShaderMaterial({
        uniforms: { map: { value: null }, crop: { value: new THREE.Vector4(0, 0, 1, 1) } },
        vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy * 2.0, 0.0, 1.0); }",
        fragmentShader:
          "uniform sampler2D map; uniform vec4 crop; varying vec2 vUv; void main(){ gl_FragColor = vec4(texture2D(map, crop.xy + vUv * crop.zw).rgb, 1.0); }",
        depthTest: false,
        depthWrite: false,
      }),
    };
    this.blit.scene.add(new THREE.Mesh(new THREE.PlaneGeometry(1, 1), this.blit.material));
    this.cleared = false;
    // Newsreader (Google Fonts) can arrive after the first slates were set in the self-hosted stand-in: redraw those.
    this.onFonts = () => this.restyle();
    document.fonts?.addEventListener?.("loadingdone", this.onFonts);
  }
  /**
   * Request a tile; returns [u, v, su, sv, tier, shownAt] where tier is 2 (hi), 1 (lo) or
   * 0 (not ready: the shader shows the card's plain label panel), and shownAt is when the card's art first appeared.
   * `source` is {image} or a typographic slate {title, kicker, lang, tint} for stories without original art.
   */
  get(key, source, wantHi, out) {
    const hi = wantHi ? this.slot("hi", key, source) : null;
    if (hi?.ready) return write(out, hi.uv, 2, this.shownAt.get(key));
    const lo = this.slot("lo", key, source);
    if (lo?.ready) return write(out, lo.uv, 1, this.shownAt.get(key));
    return write(out, null, 0, 0);
  }
  slot(tierName, key, source) {
    const tier = this.tiers[tierName];
    let slot = tier.slots.get(key);
    if (!slot) {
      let index = tier.free.pop();
      if (index === undefined) {
        // Evict the least recently used slot that was not needed this frame.
        let oldest = null;
        for (const candidate of tier.slots.values())
          if (candidate.frame < this.frame && (!oldest || candidate.frame < oldest.frame)) oldest = candidate;
        if (!oldest) return null;
        tier.slots.delete(oldest.key);
        oldest.dead = true;
        index = oldest.index;
      }
      const col = index % tier.cols;
      const row = Math.floor(index / tier.cols);
      const px = col * tier.w, py = tier.top + row * tier.h;
      slot = {
        key,
        tier: tierName,
        source,
        index,
        rect: [px, SIZE - py - tier.h, tier.w, tier.h], // GL viewport, origin bottom-left
        uv: [(px + 0.5) / SIZE, (SIZE - py - tier.h + 0.5) / SIZE, (tier.w - 1) / SIZE, (tier.h - 1) / SIZE],
        ready: false,
        queued: true,
        stack: null, // the font stack a slate was last drawn with
        frame: this.frame,
      };
      tier.slots.set(key, slot);
      this.queue.push(slot);
      this.pump();
    }
    slot.frame = this.frame;
    return slot;
  }
  /** Decode at most a few sources concurrently, off the main thread. */
  pump() {
    while (this.inflight < 6 && this.queue.length) {
      const slot = this.queue.shift();
      if (slot.dead) continue;
      this.inflight++;
      this.decode(slot)
        .then((bitmap) => {
          if (!slot.dead && bitmap) this.ready.push({ slot, bitmap });
          this.wake();
        })
        .catch(() => {})
        .finally(() => {
          this.inflight--;
          this.pump();
        });
    }
  }
  decode(slot) {
    const { key, source } = slot;
    // A slate is set once the faces it needs have loaded, and drawn per tier at that tier's size: a few hundred
    // microseconds, so nothing is cached (the canvas is freed after its blit).
    if (!source.image) return slateReady(source).then((stack) => slateCard(source, TIERS[slot.tier], stack));
    let pending = this.bitmaps.get(key);
    if (!pending) {
      pending = fetch(this.asset(source.image))
        .then((r) => (r.ok ? r.blob() : Promise.reject(new Error(r.status))))
        .then((blob) => createImageBitmap(blob, { imageOrientation: "flipY" }));
      this.bitmaps.set(key, pending);
      // Dropping the reference is enough: a bitmap may still be queued for the
      // other tier's blit, so it is never closed here (GC reclaims it).
      if (this.bitmaps.size > BITMAP_CACHE) this.bitmaps.delete(this.bitmaps.keys().next().value);
      pending.catch(() => this.bitmaps.delete(key));
    }
    return pending;
  }
  /** GPU blits for decoded tiles, bounded per frame. Returns true if any tile changed. */
  flush(budget = 4) {
    this.frame++;
    if (!this.ready.length && this.cleared) return false;
    const renderer = this.renderer;
    const previous = renderer.getRenderTarget();
    const autoClear = renderer.autoClear;
    renderer.autoClear = false;
    if (!this.cleared) {
      renderer.setRenderTarget(this.target);
      const color = renderer.getClearColor(new THREE.Color());
      const alpha = renderer.getClearAlpha();
      renderer.setClearColor(0x14262b, 1);
      renderer.clear(true, false, false);
      renderer.setClearColor(color, alpha);
      this.cleared = true;
    }
    let changed = false;
    while (budget-- > 0 && this.ready.length) {
      const { slot, bitmap } = this.ready.shift();
      if (slot.dead) continue;
      const texture = bitmap instanceof HTMLCanvasElement ? new THREE.CanvasTexture(bitmap) : new THREE.Texture(bitmap);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.flipY = bitmap instanceof HTMLCanvasElement;
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      texture.needsUpdate = true;
      // Cover-crop to the 3:1 banner (anomaly art is 220×115).
      const aspect = bitmap.width / bitmap.height;
      const target = TIERS[slot.tier].w / TIERS[slot.tier].h;
      const crop = this.blit.material.uniforms.crop.value;
      if (aspect > target) crop.set((1 - target / aspect) / 2, 0, target / aspect, 1);
      else crop.set(0, (1 - aspect / target) / 2, 1, aspect / target);
      this.blit.material.uniforms.map.value = texture;
      this.target.viewport.set(...slot.rect);
      this.target.scissor.set(...slot.rect);
      this.target.scissorTest = true;
      renderer.setRenderTarget(this.target);
      renderer.render(this.blit.scene, this.blit.camera);
      texture.dispose();
      slot.ready = true;
      slot.queued = false;
      slot.stack = bitmap.stack || null;
      if (!this.shownAt.has(slot.key)) {
        const now = performance.now();
        this.shownAt.set(slot.key, now);
        this.fadingUntil = now + FADE_MS;
      }
      this.loaded++;
      changed = true;
    }
    this.target.scissorTest = false;
    this.target.viewport.set(0, 0, SIZE, SIZE);
    this.target.scissor.set(0, 0, SIZE, SIZE);
    renderer.setRenderTarget(previous);
    renderer.autoClear = autoClear;
    this.blit.material.uniforms.map.value = null;
    if (this.ready.length) this.wake();
    return changed;
  }
  /** After a lost context the render target is empty: re-blit every slot. */
  reset() {
    this.cleared = false;
    for (const tier of Object.values(this.tiers))
      for (const slot of tier.slots.values()) {
        if (!slot.ready) continue;
        slot.ready = false;
        slot.queued = true;
        this.queue.push(slot);
      }
    this.pump();
  }
  /** A face a slate stood in for has loaded since it was drawn: set those slates again (their tiles stay valid until the new one lands). */
  restyle() {
    let again = false;
    const english = slateStackNow("en"); // only the English slates can change: Chinese ones are always the self-hosted face
    for (const tier of Object.values(this.tiers))
      for (const slot of tier.slots.values()) {
        if (!slot.ready || slot.queued || slot.source.image || slot.source.lang !== "en" || slot.stack === english) continue;
        slot.queued = true;
        this.queue.push(slot);
        again = true;
      }
    if (again) this.pump();
  }
  get pending() {
    return this.queue.length + this.ready.length + this.inflight;
  }
  stats() {
    return {
      bytes: SIZE * SIZE * 4,
      hi: this.tiers.hi.slots.size,
      lo: this.tiers.lo.slots.size,
      capacity: { hi: TIERS.hi.cols * TIERS.hi.rows, lo: TIERS.lo.cols * TIERS.lo.rows },
      bitmaps: this.bitmaps.size,
    };
  }
  dispose() {
    document.fonts?.removeEventListener?.("loadingdone", this.onFonts);
    this.target.dispose();
    this.blit.material.dispose();
    for (const pending of this.bitmaps.values()) pending.then((b) => b?.close?.()).catch(() => {});
    this.bitmaps.clear();
  }
}

function write(out, uv, tier, shownAt = 0) {
  if (uv) {
    out[0] = uv[0];
    out[1] = uv[1];
    out[2] = uv[2];
    out[3] = uv[3];
  } else out[0] = out[1] = out[2] = out[3] = 0;
  out[4] = tier;
  out[5] = shownAt;
  return out;
}

// -----------------------------------------------------------------------------------------------------------------------
// Typographic slate: what a story without an event picture shows where the art would be (59 of 1,388). Honest typography on
// the archive's own panel, never invented imagery: a lane-tinted dark ground, ledger rules, a gold hairline frame, the
// category as a small gold kicker and the title in the page language, set in the site's faces. It is drawn on a 448x150
// design grid (the 3:1 banner) at whatever size its target has: the 448x150 and 128x43 atlas tiles here, and the band of the
// reader's card in archive-scene.js. Canvas text uses only faces that have loaded, so slateReady() comes first.
const DESIGN_W = 448,
  DESIGN_H = 150;
const SERIF_ZH = '"Noto Serif SC", "Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", "STSong", "SimSun", serif';
const SERIF_EN = '"Newsreader", "Noto Serif SC", serif';
const SANS = '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif';
const GOLD = "#d8bb84";
const NO_START = "，。、！？：；）」』》〉】〕”’…·,.!?:;)]}%—–"; // closing marks never begin a line
const NO_END = "（「『《〈【〔“‘([{"; // opening marks never end one
const hasFace = (family, status) => {
  if (document.fonts) for (const face of document.fonts) if (face.family.includes(family) && (!status || face.status === status)) return true;
  return false;
};

/** The serif stack a slate can use right now: Newsreader once it has loaded (English), else the self-hosted Noto Serif SC. */
export const slateStackNow = (lang) => (lang === "en" && hasFace("Newsreader", "loaded") ? SERIF_EN : SERIF_ZH);

/** The title a slate sets: the page language's (the other language if missing), with the game's placeholders elided. */
export function slateTitle(title, lang) {
  const raw = title?.[lang] || (lang === "en" ? title?.zh : title?.en) || "";
  const text = String(raw).replace(/§./g, "").replace(/\[[^\]]*\]/g, "…").replace(/\$[^$]*\$/g, "").replace(/\s+/g, " ").trim();
  return /^[…\s]*$/.test(text) ? "" : text;
}

/** Resolves with the serif stack to draw with once the faces the slate's letters need have loaded (2.5 s cap; never rejects). */
export async function slateReady({ lang = "zh", title = "", kicker = "" }) {
  const fonts = document.fonts;
  if (!fonts?.load) return slateStackNow(lang);
  const within = (jobs) => Promise.race([Promise.allSettled(jobs), new Promise((resolve) => setTimeout(resolve, 2500))]);
  const kickerFace = fonts.load(`500 12px ${SANS}`, kicker || " ");
  const cjk = /[^\u0000-ɏ -⁯]/.test(title);
  if (lang === "en" && hasFace("Newsreader")) {
    await within([kickerFace, fonts.load('600 30px "Newsreader"', title || " "), cjk ? fonts.load(`600 30px ${SERIF_ZH}`, title) : null]);
    if (hasFace("Newsreader", "loaded")) return SERIF_EN;
  }
  await within([kickerFace, fonts.load(`600 30px ${SERIF_ZH}`, title || " ")]);
  return SERIF_ZH;
}

/** A slate as a canvas of an atlas tier's size. */
function slateCard(spec, tier, stack) {
  const canvas = document.createElement("canvas");
  canvas.width = tier.w;
  canvas.height = tier.h;
  drawSlate(canvas.getContext("2d", { alpha: false }), 0, 0, tier.w, tier.h, { ...spec, stack });
  canvas.stack = stack;
  return canvas;
}

/** Lines of `text` that fit `maxW` in the context's current font: Latin words stay whole, Han breaks between characters,
 *  closing marks hang on the previous line, and the lines are balanced (the narrowest width that needs no extra line). */
function wrapText(c, text, maxW) {
  const tokens = text.match(/[A-Za-z0-9À-ɏ][A-Za-z0-9À-ɏ'’.\-:_]*|\s+|[\s\S]/gu) || [];
  const widths = tokens.map((token) => c.measureText(token).width);
  const pack = (limit) => {
    const lines = [];
    let line = "", lineW = 0, gap = 0, prev = "", prevW = 0;
    tokens.forEach((token, i) => {
      if (/^\s/.test(token)) {
        gap = widths[i];
        return;
      }
      if (line && lineW + gap + widths[i] > limit && !NO_START.includes(token)) {
        let carry = "";
        if (NO_END.includes(prev)) {
          line = line.slice(0, -prev.length);
          carry = prev;
        }
        lines.push(line.trimEnd());
        line = carry;
        lineW = carry ? prevW : 0;
        gap = 0;
      }
      if (line && gap) line += " ";
      line += token;
      lineW += gap + widths[i];
      gap = 0;
      prev = token;
      prevW = widths[i];
    });
    if (line) lines.push(line);
    return lines;
  };
  const first = pack(maxW);
  if (first.length < 2) return first;
  let lo = Math.max(maxW / first.length, ...widths.filter((_, i) => !/^\s/.test(tokens[i]))), hi = maxW;
  for (let i = 0; i < 12; i++) {
    const mid = (lo + hi) / 2;
    if (pack(mid).length <= first.length) hi = mid;
    else lo = mid;
  }
  return pack(hi);
}

/** The largest size (30 down to 17) at which the title sets in two lines (three when small) inside `maxW`; " / " joins two titles. */
function setTitle(c, text, fontAt, maxW) {
  const parts = text.split(/\s+\/\s+/).filter(Boolean);
  let set = null;
  for (const size of [30, 27, 24, 21, 19, 17]) {
    c.font = fontAt(size);
    const lines = parts.flatMap((part) => wrapText(c, part, maxW));
    set = { size, lines };
    if (lines.length <= (size >= 24 ? 2 : 3) && lines.every((line) => c.measureText(line).width <= maxW * 1.05)) return set;
  }
  set.lines = set.lines.slice(0, 3);
  return set;
}

/**
 * Draw the slate into the rectangle (x, y, w, h) of a 2D context. `stack` is the serif stack from slateReady(); it falls back
 * to whatever has loaded. Hairlines are one target pixel wide whatever the size; the ledger rules and frame corners drop out
 * of the small atlas tiles, where they would only shimmer.
 */
export function drawSlate(c, x, y, w, h, { title = "", kicker = "", lang = "zh", tint = "#5d7a73", stack }) {
  const s = w / DESIGN_W, hair = 1 / s, serif = stack || slateStackNow(lang), detail = s >= 0.6;
  const cjk = lang !== "en" || /[　-鿿＀-￯]/.test(title);
  const alpha = (hex, a) => hex + Math.round(a * 255).toString(16).padStart(2, "0");
  c.save();
  c.beginPath();
  c.rect(x, y, w, h);
  c.clip();
  c.translate(x, y + (h - DESIGN_H * s) / 2);
  c.scale(s, s);
  if ("textRendering" in c) c.textRendering = "geometricPrecision";
  // Ground: the archive's panel, washed with the lane's tint from the top left, with a faint teal lamp behind the lettering.
  c.fillStyle = "#0a191e";
  c.fillRect(-2, -2, DESIGN_W + 4, DESIGN_H + 4);
  const wash = c.createLinearGradient(0, 0, DESIGN_W, DESIGN_H);
  wash.addColorStop(0, alpha(tint, 0.5));
  wash.addColorStop(0.6, alpha(tint, 0.16));
  wash.addColorStop(1, alpha(tint, 0.06));
  c.fillStyle = wash;
  c.fillRect(-2, -2, DESIGN_W + 4, DESIGN_H + 4);
  const lamp = c.createRadialGradient(224, 72, 0, 224, 72, 210);
  lamp.addColorStop(0, "rgba(124,196,189,0.11)");
  lamp.addColorStop(1, "rgba(124,196,189,0)");
  c.fillStyle = lamp;
  c.fillRect(-2, -2, DESIGN_W + 4, DESIGN_H + 4);
  c.lineWidth = hair;
  if (detail) {
    c.strokeStyle = "rgba(159,183,173,0.06)";
    c.beginPath();
    for (let ry = 12.5; ry < DESIGN_H; ry += 10) {
      c.moveTo(0, ry);
      c.lineTo(DESIGN_W, ry);
    }
    c.stroke();
  }
  // Gold hairline frame; corner brackets on the larger sizes.
  c.strokeStyle = alpha(GOLD, 0.26);
  c.strokeRect(9, 9, DESIGN_W - 18, DESIGN_H - 18);
  if (detail) {
    c.strokeStyle = alpha(GOLD, 0.8);
    c.lineWidth = hair * 1.5;
    c.beginPath();
    for (const [cx, cy, dx, dy] of [[9, 9, 1, 1], [DESIGN_W - 9, 9, -1, 1], [9, DESIGN_H - 9, 1, -1], [DESIGN_W - 9, DESIGN_H - 9, -1, -1]]) {
      c.moveTo(cx + dx * 13, cy);
      c.lineTo(cx, cy);
      c.lineTo(cx, cy + dy * 13);
    }
    c.stroke();
  }
  // Lettering block, centred a little above the middle (the cards behind it in the archive hide the lower half).
  const text = title.trim();
  const titleSet = text ? setTitle(c, text, (px) => `600 ${px}px ${serif}`, 336) : { size: 30, lines: [] };
  const lineH = titleSet.size * (cjk ? 1.32 : 1.2);
  const KICKER = 12, GAP = 8, RULE = 5, GAP_TITLE = 14;
  const block = KICKER + GAP + RULE + (titleSet.lines.length ? GAP_TITLE + lineH * titleSet.lines.length : 0);
  const top = (DESIGN_H - block) / 2 - 2;
  if (kicker) {
    const size = lang === "en" ? 10.5 : 11.5, track = size * (lang === "en" ? 0.26 : 0.42);
    c.font = `500 ${size}px ${SANS}`;
    c.textAlign = "left";
    c.textBaseline = "alphabetic";
    c.fillStyle = GOLD;
    const chars = [...kicker], widths = chars.map((ch) => c.measureText(ch).width);
    let cx = 224 - (widths.reduce((a, b) => a + b, 0) + track * (chars.length - 1)) / 2;
    chars.forEach((ch, i) => {
      c.fillText(ch, cx, top + KICKER / 2 + size * 0.36);
      cx += widths[i] + track;
    });
  }
  const ry = top + KICKER + GAP + RULE / 2;
  c.strokeStyle = alpha(GOLD, 0.6);
  c.lineWidth = hair;
  c.beginPath();
  c.moveTo(224 - 44, ry);
  c.lineTo(224 - 8, ry);
  c.moveTo(224 + 8, ry);
  c.lineTo(224 + 44, ry);
  c.stroke();
  c.fillStyle = GOLD;
  c.beginPath();
  c.moveTo(224, ry - 3);
  c.lineTo(227, ry);
  c.lineTo(224, ry + 3);
  c.lineTo(221, ry);
  c.closePath();
  c.fill();
  if (titleSet.lines.length) {
    c.font = `600 ${titleSet.size}px ${serif}`;
    c.textAlign = "center";
    c.textBaseline = "alphabetic";
    c.fillStyle = "#e8eee9";
    const first = top + KICKER + GAP + RULE + GAP_TITLE;
    titleSet.lines.forEach((line, i) => c.fillText(line, 224, first + lineH * (i + 0.5) + titleSet.size * 0.36));
  }
  c.restore();
}

