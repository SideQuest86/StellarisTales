// Exhibit viewer for generated specimen models (GLB). One renderer, reused between exhibits; frames are drawn only
// while something changes (interaction, damping, the slow turntable) — never in a free-running loop. At most
// CACHE models stay in memory; older ones are disposed with their geometries and textures.
import * as THREE from "../vendor/three.module.js";
import { OrbitControls } from "../vendor/addons/controls/OrbitControls.js";
import { GLTFLoader } from "../vendor/addons/loaders/GLTFLoader.js";
import { createRenderer, pixelRatioFor } from "./gpu.js";

const CACHE = 3;

export class ExhibitViewer {
  constructor({ reduced }) {
    this.reduced = reduced;
    // Shared adapter tier (src/gpu.js): no MSAA and a lower resolution cap on integrated / software adapters.
    ({ renderer: this.renderer, gpu: this.gpu } = createRenderer(THREE, { antialias: true, alpha: true }));
    this.renderer.setPixelRatio(pixelRatioFor(this.gpu));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    // Baked radiance-field colour is already "lit": neutral tone mapping and a brighter exposure keep it close
    // to the source icon instead of darkening it.
    this.renderer.toneMapping = THREE.NeutralToneMapping;
    this.renderer.toneMappingExposure = 1.35;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(35, 1, 0.01, 100);
    this.scene.add(new THREE.HemisphereLight(0xf2fbf8, 0x2a3a37, 2.4));
    const key = new THREE.DirectionalLight(0xfff1d6, 2.0);
    key.position.set(2, 3, 2.5);
    const rim = new THREE.DirectionalLight(0x6fd6c3, 1.2);
    rim.position.set(-2.5, 1.5, -2);
    this.scene.add(key, rim);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.enablePan = false;
    this.controls.minDistance = 1.1;
    this.controls.maxDistance = 6;
    this.controls.addEventListener("change", () => this.request());
    this.controls.addEventListener("start", () => { this.spin = false; });
    this.loader = new GLTFLoader();
    this.cache = new Map();
    this.frame = 0;
    this.resize = new ResizeObserver(() => this.fit());
  }

  async show(host, url, meta) {
    this.detach();
    this.host = host;
    host.append(this.renderer.domElement);
    this.resize.observe(host);
    this.fit();
    const model = await this.load(url);
    if (this.host !== host) return;
    if (this.current) this.scene.remove(this.current);
    this.current = model;
    this.scene.add(model);
    // Frame the model: unit size, centred, camera at a three-quarter view.
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3()).length() || 1;
    const centre = box.getCenter(new THREE.Vector3());
    model.position.sub(centre);
    model.scale.setScalar(1.6 / size);
    model.position.multiplyScalar(1.6 / size);
    // TripoSR reconstructs the input view along +X (its z-up frame is rotated to glTF y-up on export), so the
    // first view looks at the side the icon shows, slightly turned to reveal depth.
    this.camera.position.set(2.5, 0.45, 0.6);
    this.controls.target.set(0, 0, 0);
    this.controls.update();
    this.spin = !this.reduced();
    this.request();
  }

  async load(url) {
    if (this.cache.has(url)) {
      const hit = this.cache.get(url);
      this.cache.delete(url);
      this.cache.set(url, hit);
      return hit;
    }
    const gltf = await this.loader.loadAsync(url);
    const root = gltf.scene;
    root.traverse((o) => {
      if (o.isMesh && o.material) o.material.side = THREE.FrontSide;
    });
    this.cache.set(url, root);
    while (this.cache.size > CACHE) {
      const [oldUrl, old] = this.cache.entries().next().value;
      this.cache.delete(oldUrl);
      if (old !== this.current) dispose(old);
    }
    return root;
  }

  fit() {
    if (!this.host) return;
    const w = this.host.clientWidth || 1, h = this.host.clientHeight || 1;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.request();
  }

  request(delay = 0) {
    if (this.frame || this.timer || !this.host) return;
    if (delay) this.timer = setTimeout(() => { this.timer = 0; this.request(); }, delay);
    else this.frame = requestAnimationFrame((t) => this.tick(t));
  }

  tick(time) {
    this.frame = 0;
    if (!this.host) return;
    // The turntable advances by time, so a capped frame rate (integrated GPUs: idleFps) turns at the same speed.
    if (this.spin && this.current) this.current.rotation.y += 0.24 * Math.min(0.1, (time - (this.last || time)) / 1000);
    this.last = time;
    const moving = this.controls.update();
    this.renderer.render(this.scene, this.camera);
    if (moving) this.request();
    else if (this.spin) this.request(this.gpu?.settings?.idleFps ? 1000 / this.gpu.settings.idleFps : 0);
  }

  key(e) {
    const step = 0.18;
    const k = e.key;
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "+", "=", "-", "_"].includes(k)) return;
    e.preventDefault();
    this.spin = false;
    const offset = this.camera.position.clone().sub(this.controls.target);
    const sph = new THREE.Spherical().setFromVector3(offset);
    if (k === "ArrowLeft") sph.theta -= step;
    if (k === "ArrowRight") sph.theta += step;
    if (k === "ArrowUp") sph.phi = Math.max(0.15, sph.phi - step);
    if (k === "ArrowDown") sph.phi = Math.min(Math.PI - 0.15, sph.phi + step);
    if (k === "+" || k === "=") sph.radius = Math.max(this.controls.minDistance, sph.radius * 0.88);
    if (k === "-" || k === "_") sph.radius = Math.min(this.controls.maxDistance, sph.radius / 0.88);
    this.camera.position.copy(this.controls.target).add(new THREE.Vector3().setFromSpherical(sph));
    this.controls.update();
    this.request();
  }

  detach() {
    cancelAnimationFrame(this.frame);
    clearTimeout(this.timer);
    this.frame = this.timer = 0;
    this.last = 0;
    if (this.host) this.resize.unobserve(this.host);
    this.renderer.domElement.remove();
    this.host = null;
  }
}

function dispose(root) {
  root.traverse((o) => {
    if (!o.isMesh) return;
    o.geometry?.dispose();
    for (const m of [].concat(o.material || [])) {
      for (const v of Object.values(m)) if (v?.isTexture) v.dispose();
      m.dispose();
    }
  });
}
