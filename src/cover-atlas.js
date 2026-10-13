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
  }
  /**
   * Request a tile; returns [u, v, su, sv, tier] where tier is 2 (hi), 1 (lo) or
   * 0 (not ready: the shader shows the card's plain label panel).
   * `source` is {image} or {title, lane} for stories without original art.
   */
  get(key, source, wantHi, out) {
    const hi = wantHi ? this.slot("hi", key, source) : null;
    if (hi?.ready) return write(out, hi.uv, 2);
    const lo = this.slot("lo", key, source);
    if (lo?.ready) return write(out, lo.uv, 1);
    return write(out, null, 0);
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
      this.decode(slot.key, slot.source)
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
  decode(key, source) {
    let pending = this.bitmaps.get(key);
    if (!pending) {
      pending = source.image
        ? fetch(this.asset(source.image))
            .then((r) => (r.ok ? r.blob() : Promise.reject(new Error(r.status))))
            .then((blob) => createImageBitmap(blob, { imageOrientation: "flipY" }))
        : Promise.resolve(titleCard(source));
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
        this.queue.push(slot);
      }
    this.pump();
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
    this.target.dispose();
    this.blit.material.dispose();
    for (const pending of this.bitmaps.values()) pending.then((b) => b?.close?.()).catch(() => {});
    this.bitmaps.clear();
  }
}

function write(out, uv, tier) {
  if (uv) {
    out[0] = uv[0];
    out[1] = uv[1];
    out[2] = uv[2];
    out[3] = uv[3];
  } else out[0] = out[1] = out[2] = out[3] = 0;
  out[4] = tier;
  return out;
}

// Stories without original art get an honest typographic label, not invented art.
const TITLE_COLORS = ["#20363a", "#22383a", "#2b3530", "#232f3b", "#302d2b", "#24362f", "#253a37", "#28323a"];
function titleCard({ title, lane = 0 }) {
  const canvas = document.createElement("canvas");
  canvas.width = 448;
  canvas.height = 150;
  const c = canvas.getContext("2d");
  c.fillStyle = TITLE_COLORS[((lane % 8) + 8) % 8];
  c.fillRect(0, 0, 448, 150);
  c.strokeStyle = "#5f7d7466";
  c.lineWidth = 1;
  for (let x = 0; x < 448; x += 28) {
    c.beginPath();
    c.moveTo(x + 0.5, 0);
    c.lineTo(x + 0.5, 150);
    c.stroke();
  }
  c.fillStyle = "#cdb88a";
  c.fillRect(24, 34, 3, 82);
  c.fillStyle = "#dfe6dc";
  const text = title || "";
  let size = 30;
  c.font = `500 ${size}px "Noto Serif SC", "Source Han Serif SC", "Songti SC", SimSun, serif`;
  while (c.measureText(text).width > 380 && size > 16) {
    size -= 2;
    c.font = `500 ${size}px "Noto Serif SC", "Source Han Serif SC", "Songti SC", SimSun, serif`;
  }
  c.fillText(text, 44, 75 + size / 3, 384);
  return canvas;
}
