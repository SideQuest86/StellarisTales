// Exhibit viewer for generated specimen models (GLB). One renderer, reused between exhibits; frames are drawn only
// while something changes (interaction, damping, the slow turntable) — never in a free-running loop. At most
// CACHE models stay in memory; older ones are disposed with their geometries and textures.
//
// Each model is normalised exactly once, when it is loaded: the glTF scene is centred and scaled to SIZE inside its
// own wrapper group, and its original bounds are kept (immutable) in userData. The turntable rotates only the
// wrapper, so reopening a cached model shows the same size, centre and opening view every time.
import * as THREE from "../vendor/three.module.js";
import { OrbitControls } from "../vendor/addons/controls/OrbitControls.js";
import { GLTFLoader } from "../vendor/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "../vendor/addons/libs/meshopt_decoder.module.js";
import { createRenderer, pixelRatioFor } from "./gpu.js";
import { openingView, cameraPosition } from "./museum-view.js";

const CACHE = 3;
const SIZE = 1.6; // bounding-box diagonal after normalisation

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
    // Models are meshopt-compressed (EXT_meshopt_compression, gltfpack -cc): about half the download.
    this.loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
    this.cache = new Map(); // url -> normalised wrapper group (LRU order)
    this.pending = new Map(); // url -> load promise (one download per url, however often it is requested)
    this.ticket = 0;
    this.frame = 0;
    this.resize = new ResizeObserver(() => this.fit());
  }

  async show(host, url, meta) {
    const ticket = ++this.ticket;
    this.detach();
    this.host = host;
    host.append(this.renderer.domElement);
    this.resize.observe(host);
    this.fit();
    const model = await this.load(url);
    // A later show() (rapid switching) or a detach() while this model was loading: leave the scene to it.
    if (ticket !== this.ticket || this.host !== host) return;
    this.setCurrent(model);
    this.url = url;
    this.view =openingView(model.userData.extents, meta?.view);
    this.resetView();
  }

  /** Opening view again: model unturned, camera at the model's opening angle and distance, turntable as on open. */
  resetView() {
    if (!this.current) return;
    this.current.rotation.set(0, 0, 0);
    // Consume any drag momentum left from the previous exhibit before placing the camera, so it lands exactly.
    this.controls.enableDamping = false;
    this.controls.update();
    this.controls.target.set(0, 0, 0);
    this.camera.position.set(...cameraPosition(this.view));
    this.controls.update();
    this.controls.enableDamping = true;
    this.spin = !this.reduced();
    this.last = 0;
    this.request();
  }

  setCurrent(model) {
    const previous = this.current;
    if (previous === model) return;
    if (previous) {
      this.scene.remove(previous);
      // Evicted from the cache while it was on show: nobody else holds it any more.
      if (![...this.cache.values()].includes(previous)) dispose(previous);
    }
    this.current = model;
    this.scene.add(model);
  }

  async load(url) {
    if (this.cache.has(url)) {
      const hit = this.cache.get(url);
      this.cache.delete(url);
      this.cache.set(url, hit);
      return hit;
    }
    if (!this.pending.has(url)) {
      this.pending.set(url, this.loader.loadAsync(url).then((gltf) => {
        const model = normalise(gltf.scene);
        this.cache.set(url, model);
        while (this.cache.size > CACHE) {
          const [oldUrl, old] = this.cache.entries().next().value;
          this.cache.delete(oldUrl);
          if (old !== this.current) dispose(old);
        }
        return model;
      }).finally(() => this.pending.delete(url)));
    }
    return this.pending.get(url);
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
    if (k === "0" || k === "Home") { e.preventDefault(); this.resetView(); return; }
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

  /** For checks (scripts/verify-museum-viewer.mjs): what is on show and what is held in memory. */
  diagnostics() {
    let box = null;
    if (this.current) {
      // Measured unturned, so the figure does not depend on where the turntable happens to be.
      const turn = this.current.rotation.y;
      this.current.rotation.y = 0;
      this.current.updateMatrixWorld(true);
      box = new THREE.Box3().setFromObject(this.current);
      this.current.rotation.y = turn;
      this.current.updateMatrixWorld(true);
    }
    return {
      url: this.url || null,
      cached: [...this.cache.keys()],
      pending: this.pending.size,
      diagonal: box ? box.getSize(new THREE.Vector3()).length() : null,
      centre: box ? box.getCenter(new THREE.Vector3()).toArray() : null,
      rotation: this.current?.rotation.y ?? null,
      camera: this.camera.position.toArray(),
      target: this.controls.target.toArray(),
      view: this.view || null,
      extents: this.current?.userData.extents || null,
      geometries: this.renderer.info.memory.geometries,
      textures: this.renderer.info.memory.textures,
    };
  }
}

/** Centre and scale a loaded glTF scene once, inside a wrapper group the viewer may rotate freely. */
function normalise(root) {
  root.traverse((o) => {
    if (o.isMesh && o.material) o.material.side = THREE.FrontSide;
  });
  root.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(root);
  const size = box.getSize(new THREE.Vector3());
  const scale = SIZE / (size.length() || 1);
  const centre = box.getCenter(new THREE.Vector3());
  root.position.sub(centre).multiplyScalar(scale);
  root.scale.multiplyScalar(scale);
  const wrapper = new THREE.Group();
  wrapper.add(root);
  wrapper.userData.extents = Object.freeze(size.toArray().map((v) => v * scale));
  return wrapper;
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
