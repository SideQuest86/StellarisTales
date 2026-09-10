import * as THREE from "../vendor/three.module.js";

// Stable slots keep the complete archive instanced while each dossier has its own art.
export class CoverAtlas {
  constructor(asset, wake) {
    this.asset = asset;
    this.wake = wake;
    this.canvas = document.createElement("canvas");
    this.canvas.width = 2048;
    this.canvas.height = 4096;
    this.context = this.canvas.getContext("2d");
    this.context.fillStyle = "#536966";
    this.context.fillRect(0, 0, 2048, 4096);
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.texture.generateMipmaps = false;
    this.texture.minFilter = THREE.LinearFilter;
    this.slots = new Map();
    this.queue = [];
    this.running = 0;
    this.frame = 0;
    this.loaded = 0;
  }
  get(image) {
    let slot = this.slots.get(image);
    if (!slot) {
      let index = this.slots.size;
      if (index === 512) {
        const oldest = [...this.slots.values()].sort(
          (a, b) => a.frame - b.frame,
        )[0];
        index = oldest.index;
        this.slots.delete(oldest.image);
      }
      slot = { image, index, frame: this.frame };
      this.slots.set(image, slot);
      this.queue.push(slot);
      this.pump();
    }
    slot.frame = this.frame;
    return [
      (slot.index % 16) / 16 + 1 / 2048,
      1 - (Math.floor(slot.index / 16) + 1) / 32 + 1 / 4096,
      126 / 2048,
      126 / 4096,
    ];
  }
  pump() {
    while (this.running < 4 && this.queue.length) {
      const slot = this.queue.shift();
      if (!slot.image || this.slots.get(slot.image) !== slot) continue;
      this.running++;
      const image = new Image();
      image.src = this.asset(slot.image);
      image
        .decode()
        .then(() => {
          if (this.slots.get(slot.image) !== slot) return;
          const x = (slot.index % 16) * 128,
            y = Math.floor(slot.index / 16) * 128;
          const sourceWidth = Math.min(
            image.width,
            (image.height * 4.88) / 3.58,
          );
          const sourceHeight = (sourceWidth * 3.58) / 4.88;
          this.context.save();
          this.context.beginPath();
          this.context.rect(x, y, 128, 128);
          this.context.clip();
          this.context.drawImage(
            image,
            (image.width - sourceWidth) / 2,
            (image.height - sourceHeight) / 2,
            sourceWidth,
            sourceHeight,
            x,
            y,
            128,
            128,
          );
          this.context.restore();
          this.texture.needsUpdate = true;
          this.loaded++;
          this.wake();
        })
        .catch(() => {})
        .finally(() => {
          this.running--;
          this.pump();
        });
    }
  }
}
