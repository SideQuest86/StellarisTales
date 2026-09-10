import * as THREE from "../vendor/three.module.js";
import {
  wrap,
  damp,
  breath,
  selectionWave,
  Momentum,
  inverseProjection,
} from "./archive-motion.js";
const LANES = 7,
  ROWS = 41,
  SPACING = 5.45,
  DEPTH = 0.62;
const COLORS = [
  "#748a80",
  "#678e8b",
  "#9e9b7b",
  "#7d8798",
  "#948477",
  "#75897a",
  "#819a91",
  "#7c8b8e",
];
export class ArchiveScene {
  constructor(container, { columns, onSelect, onOpen, reduced, asset }) {
    Object.assign(this, {
      container,
      columns,
      onSelect,
      onOpen,
      reduced,
      asset,
    });
    this.lane = { value: 2, velocity: 0 };
    this.row = { value: 0, velocity: 0 };
    this.targetLane = 2;
    this.targetRow = 0;
    this.memories = columns.map(() => 0);
    this.selection = { lane: 2, row: 0 };
    this.pulses = [];
    this.detail = { value: 0, velocity: 0 };
    this.detailTarget = 0;
    this.lift = { value: 0.45, velocity: 0 };
    this.cells = [];
    this.last = 0;
    this.lastDraw = 0;
    this.frame = 0;
    this.dirty = true;
    this.imageToken = 0;
    this.textures = new Map();
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    this.renderer.setClearColor(0x071216, 0);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.canvas = this.renderer.domElement;
    this.canvas.setAttribute(
      "aria-label",
      "三维故事档案阵列，可拖动浏览；也可使用分类与方向按钮",
    );
    this.canvas.tabIndex = 0;
    container.append(this.canvas);
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x0c181d, 89, 110);
    this.camera = new THREE.PerspectiveCamera(9, 1, 2, 180);
    this.camera.position.set(-19, 13, 23);
    this.camera.lookAt(0, 1, 0);
    this.scene.add(new THREE.HemisphereLight(0xd5e8e2, 0x152827, 1.7));
    const light = new THREE.DirectionalLight(0xf6e9c9, 2.8);
    light.position.set(-12, 22, 8);
    light.castShadow = true;
    light.shadow.mapSize.set(2048, 2048);
    Object.assign(light.shadow.camera, {
      left: -18,
      right: 18,
      top: 18,
      bottom: -18,
      near: 1,
      far: 65,
    });
    light.shadow.bias = -0.0003;
    light.shadow.normalBias = 0.035;
    this.scene.add(light);
    const fill = new THREE.DirectionalLight(0x94c7cf, 1.2);
    fill.position.set(12, 10, -8);
    this.scene.add(fill);
    const shape = new THREE.Shape();
    const w = 2.5,
      h = 1.85,
      r = 0.045;
    shape.moveTo(-w + r, -h);
    shape.lineTo(w - r, -h);
    shape.quadraticCurveTo(w, -h, w, -h + r);
    shape.lineTo(w, h - r);
    shape.quadraticCurveTo(w, h, w - r, h);
    shape.lineTo(-w + r, h);
    shape.quadraticCurveTo(-w, h, -w, h - r);
    shape.lineTo(-w, -h + r);
    shape.quadraticCurveTo(-w, -h, -w + r, -h);
    const shell = new THREE.ExtrudeGeometry(shape, {
      depth: 0.25,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.028,
      bevelThickness: 0.028,
      curveSegments: 2,
    });
    shell.translate(0, 0, -0.125);
    this.genericTexture = new THREE.CanvasTexture(this.makeFace(null, 0));
    this.genericTexture.colorSpace = THREE.SRGBColorSpace;
    this.body = new THREE.InstancedMesh(
      shell,
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.06,
        roughness: 0.58,
      }),
      LANES * ROWS,
    );
    this.faces = new THREE.InstancedMesh(
      new THREE.PlaneGeometry(4.88, 3.58),
      new THREE.MeshStandardMaterial({
        map: this.genericTexture,
        roughness: 0.78,
        metalness: 0,
      }),
      LANES * ROWS,
    );
    this.body.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.faces.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.body.frustumCulled = false;
    this.faces.frustumCulled = false;
    this.body.castShadow = true;
    this.body.receiveShadow = true;
    this.faces.receiveShadow = true;
    this.scene.add(this.body, this.faces);
    this.spines = new THREE.InstancedMesh(
      new THREE.BoxGeometry(0.105, 3.6, 0.33),
      new THREE.MeshStandardMaterial({
        color: 0x54706b,
        roughness: 0.4,
        metalness: 0.08,
      }),
      LANES * ROWS,
    );
    this.scene.add(this.spines);
    this.fasteners = new THREE.InstancedMesh(
      new THREE.SphereGeometry(0.034, 6, 4),
      new THREE.MeshStandardMaterial({
        color: 0x8e8e86,
        roughness: 0.37,
        metalness: 0.6,
      }),
      LANES * ROWS * 2,
    );
    this.scene.add(this.fasteners);
    this.active = new THREE.Group();
    this.active.add(
      new THREE.Mesh(
        shell,
        new THREE.MeshStandardMaterial({
          color: 0xb4a778,
          metalness: 0.12,
          roughness: 0.4,
        }),
      ),
    );
    this.activeFace = new THREE.Mesh(
      new THREE.PlaneGeometry(4.88, 3.58),
      new THREE.MeshStandardMaterial({
        map: this.genericTexture,
        roughness: 0.72,
        metalness: 0.1,
      }),
    );
    this.activeFace.position.z = 0.156;
    this.active.add(this.activeFace);
    this.coverReveal = { value: 0 };
    this.artTransition = { value: 1, velocity: 0 };
    this.artTarget = 1;
    this.outgoing = [];
    this.artFace = new THREE.Mesh(
      this.activeFace.geometry,
      new THREE.MeshStandardMaterial({
        map: this.genericTexture,
        roughness: 0.72,
        transparent: true,
        depthWrite: false,
      }),
    );
    this.artFace.position.z = 0.159;
    this.artFace.visible = false;
    this.artFace.material.onBeforeCompile = (shader) => {
      shader.uniforms.coverReveal = this.coverReveal;
      shader.fragmentShader =
        "uniform float coverReveal;\n" + shader.fragmentShader;
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <map_fragment>",
        `
        vec2 uv = vMapUv;
        float p = clamp(coverReveal, 0.0, 1.0);
        float diamond = abs(uv.x - 0.5) * 0.7 + abs(uv.y - 0.5) * 0.9;
        float facet = floor((uv.x + uv.y) * 9.0) / 9.0;
        float threshold = diamond * 0.75 + facet * 0.12;
        float clearArea = smoothstep(threshold, threshold + 0.28, p * 1.15);
        vec2 radius = vec2(0.008, 0.012) * (1.0 - clearArea);
        vec4 softImage = texture2D(map, uv) * 0.2;
        softImage += texture2D(map, uv + vec2(radius.x, 0.0)) * 0.12;
        softImage += texture2D(map, uv - vec2(radius.x, 0.0)) * 0.12;
        softImage += texture2D(map, uv + vec2(0.0, radius.y)) * 0.12;
        softImage += texture2D(map, uv - vec2(0.0, radius.y)) * 0.12;
        softImage += texture2D(map, uv + radius) * 0.08;
        softImage += texture2D(map, uv - radius) * 0.08;
        softImage += texture2D(map, uv + vec2(radius.x, -radius.y)) * 0.08;
        softImage += texture2D(map, uv + vec2(-radius.x, radius.y)) * 0.08;
        float grain = fract(sin(dot(floor(uv * 900.0), vec2(12.9898,78.233))) * 43758.5453);
        vec3 matte = vec3(0.075, 0.12, 0.125) + (grain - 0.5) * 0.016;
        vec3 frosted = mix(matte, softImage.rgb, 0.18 + clearArea * 0.82);
        diffuseColor *= vec4(mix(frosted, texture2D(map, uv).rgb, clearArea), 1.0);
        `,
      );
    };
    this.active.add(this.artFace);

    this.active.add(
      new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(5.02, 3.72, 0.31)),
        new THREE.LineBasicMaterial({
          color: 0xbaa875,
          transparent: true,
          opacity: 0.8,
        }),
      ),
    );
    this.active.children[0].castShadow = true;
    this.scene.add(this.active);
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(180, 180),
      new THREE.MeshStandardMaterial({ color: 0x15262b, roughness: 1 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2;
    floor.receiveShadow = true;
    this.scene.add(floor);
    this.dummy = new THREE.Object3D();
    this.tint = new THREE.Color();
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(container);
    this.bind();
    this.updateFace();
    this.resize();
    this.wake();
  }
  get current() {
    const col = this.columns[wrap(this.selection.lane, this.columns.length)];
    return col.stories[wrap(this.selection.row, col.stories.length)];
  }
  makeFace(story, lane, image) {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 700;
    const c = canvas.getContext("2d");
    c.fillStyle = "#1a3034";
    c.fillRect(0, 0, 1024, 700);
    c.strokeStyle = "#405c59";
    c.lineWidth = 2;
    c.strokeRect(18, 18, 988, 664);
    c.fillStyle = COLORS[wrap(lane, COLORS.length)];
    c.fillRect(36, 35, 12, 85);
    c.font = "18px monospace";
    c.fillText("STELLARIS  /  STORIES", 72, 54);
    c.strokeStyle = "#8b957a";
    c.beginPath();
    c.moveTo(36, 590);
    c.lineTo(988, 590);
    c.stroke();
    if (image) {
      c.save();
      c.beginPath();
      c.rect(38, 91, 948, 312);
      c.clip();
      const scale = Math.max(948 / image.width, 312 / image.height);
      c.drawImage(
        image,
        38 + (948 - image.width * scale) / 2,
        91 + (312 - image.height * scale) / 2,
        image.width * scale,
        image.height * scale,
      );
      c.restore();
    } else {
      c.strokeStyle = "#34524e";
      for (let i = 0; i < 3; i++) {
        c.beginPath();
        c.ellipse(510, 260, 135 + i * 35, 130 - i * 13, -0.3, 0, Math.PI * 2);
        c.stroke();
      }
      c.fillStyle = "#aaa99d";
      c.fillRect(505, 255, 10, 10);
    }
    c.fillStyle = "#d6dfce";
    c.font = '500 42px "Microsoft YaHei",sans-serif';
    const text = story?.title?.zh || "";
    const width = c.measureText(text).width;
    if (width > 925)
      c.font = `500 ${Math.max(23, (42 * 925) / width)}px "Microsoft YaHei",sans-serif`;
    c.fillText(text, 40, 484);
    c.fillStyle = "#9bb2a0";
    c.font = "20px sans-serif";
    c.fillText(story ? `${story.chapters} 篇` : "", 42, 547);
    c.font = "14px monospace";
    c.strokeStyle = "#cbb57c";
    c.beginPath();
    c.moveTo(930, 623);
    c.lineTo(954, 623);
    c.lineTo(954, 647);
    c.moveTo(929, 648);
    c.lineTo(954, 623);
    c.stroke();
    return canvas;
  }
  async updateFace(override) {
    const token = ++this.imageToken,
      story = override || this.current,
      lane = this.selection.lane;
    const apply = (image) => {
      if (token !== this.imageToken) return;
      const canvas = this.makeFace(story, lane, image);
      if (!this.eventTexture) {
        this.eventTexture = new THREE.CanvasTexture(canvas);
        this.eventTexture.colorSpace = THREE.SRGBColorSpace;
        this.eventTexture.anisotropy = Math.min(4, this.renderer.capabilities.getMaxAnisotropy());
        this.artFace.material.map = this.eventTexture;
        this.artFace.material.needsUpdate = true;
      } else {
        this.eventTexture.image = canvas;
        this.eventTexture.needsUpdate = true;
      }
      this.wake();
    };
    apply(null);
    if (!story?.image) return;
    let image = this.textures.get(story.image);
    if (!image) {
      image = new Image();
      image.decoding = "async";
      image.src = this.asset(story.image);
      try {
        await image.decode();
      } catch {
        return;
      }
      this.textures.set(story.image, image);
      if (this.textures.size > 24)
        this.textures.delete(this.textures.keys().next().value);
    }
    apply(image);
  }
  resize() {
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;
    this.camera.aspect = this.width / Math.max(this.height, 1);
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
    this.wake();
  }
  setSelection(lane, row) {
    if (this.selection.lane === lane && this.selection.row === row) return;
    if (!this.reduced() && this.lift.value > 0.02) {
      const mesh = new THREE.Group();
      for (const child of this.active.children) {
        if (child === this.artFace) continue;
        mesh.add(child.clone());
      }
      this.scene.add(mesh);
      this.outgoing.push({
        mesh,
        lane: this.selection.lane,
        row: this.selection.row,
        lift: { value: this.lift.value, velocity: this.lift.velocity },
      });
      if (this.outgoing.length > 4)
        this.scene.remove(this.outgoing.shift().mesh);
    }
    const returning = this.outgoing.find(
      (old) => old.lane === lane && old.row === row,
    );
    this.lift.value = returning?.lift.value ?? 0;
    this.lift.velocity = returning?.lift.velocity ?? 0;
    if (returning) {
      this.scene.remove(returning.mesh);
      this.outgoing = this.outgoing.filter((old) => old !== returning);
    }
    this.selection = { lane, row };
    this.memories[wrap(lane, this.columns.length)] = row;
    this.pulses.push({ lane, row, time: performance.now() / 1000 });
    this.pulses = this.pulses.slice(-4);
    this.updateFace();
    this.onSelect(
      this.current,
      wrap(lane, this.columns.length),
      wrap(row, this.columns[wrap(lane, this.columns.length)].stories.length),
    );
  }
  navigate(axis, direction) {
    if (this.detailTarget) return;
    this.momentum = null;
    this.drag = null;
    if (axis === "lane") {
      this.targetLane = Math.round(this.targetLane) + direction;
      this.targetRow =
        this.memories[wrap(this.targetLane, this.columns.length)];
    } else this.targetRow = Math.round(this.targetRow) + direction;
    this.setSelection(Math.round(this.targetLane), Math.round(this.targetRow));
    this.wake();
  }
  selectCategory(index) {
    const distance =
      wrap(
        index -
          wrap(this.targetLane, this.columns.length) +
          Math.floor(this.columns.length / 2),
        this.columns.length,
      ) - Math.floor(this.columns.length / 2);
    this.navigate("lane", distance);
  }
  selectStory(id) {
    for (let i = 0; i < this.columns.length; i++) {
      const row = this.columns[i].stories.findIndex((s) => s.id === id);
      if (row >= 0) {
        this.detailTarget = 0;
        this.selectCategory(i);
        this.targetRow = row;
        this.setSelection(Math.round(this.targetLane), row);
        this.wake();
        return;
      }
    }
  }
  setChapterArt(image, title) {
    const key = image + JSON.stringify(title);
    if (this.chapterArtKey === key) return;
    this.chapterArtKey = key;
    this.pendingArt = {
      ...this.current,
      image: image || this.current.image,
      title,
    };
    this.artTarget = 0;
    this.wake();
  }
  setDetail(open) {
    this.detailTarget = open ? 1 : 0;
    this.momentum = null;
    this.drag = null;
    this.wake();
  }
  hit(e) {
    const b = this.canvas.getBoundingClientRect();
    this.pointer.set(
      ((e.clientX - b.left) / b.width) * 2 - 1,
      1 - ((e.clientY - b.top) / b.height) * 2,
    );
    this.raycaster.setFromCamera(this.pointer, this.camera);
    if (this.raycaster.intersectObject(this.active, true).length)
      return this.selection;
    const hit = this.raycaster.intersectObject(this.body)[0];
    return hit ? this.cells[hit.instanceId] : null;
  }
  projection() {
    const origin = new THREE.Vector3(0, 0, 0).project(this.camera),
      a = new THREE.Vector3(-SPACING, 0, 0).project(this.camera),
      b = new THREE.Vector3(0, 0, -DEPTH).project(this.camera);
    return inverseProjection(
      {
        x: ((a.x - origin.x) * this.width) / 2,
        y: (-(a.y - origin.y) * this.height) / 2,
      },
      {
        x: ((b.x - origin.x) * this.width) / 2,
        y: (-(b.y - origin.y) * this.height) / 2,
      },
    );
  }
  bind() {
    this.canvas.addEventListener("pointerdown", (e) => {
      if (this.detailTarget || e.button > 0) return;
      this.canvas.setPointerCapture(e.pointerId);
      this.momentum = null;
      this.drag = {
        x: e.clientX,
        y: e.clientY,
        lane: this.lane.value,
        row: this.row.value,
        inverse: this.projection(),
        samples: [],
        moved: false,
      };
      this.wake();
    });
    this.canvas.addEventListener("pointermove", (e) => {
      if (!this.drag) return;
      const d = this.drag,
        dx = e.clientX - d.x,
        dy = e.clientY - d.y;
      if (Math.hypot(dx, dy) > 8) d.moved = true;
      if (!d.moved || !d.inverse) return;
      this.lane.value = d.lane + dx * d.inverse.lane.x + dy * d.inverse.lane.y;
      this.row.value = d.row + dx * d.inverse.row.x + dy * d.inverse.row.y;
      this.lane.velocity = this.row.velocity = 0;
      this.targetLane = this.lane.value;
      this.targetRow = this.row.value;
      d.samples.push({
        time: performance.now(),
        lane: this.lane.value,
        row: this.row.value,
      });
      d.samples = d.samples.filter((s) => performance.now() - s.time < 100);
      this.setSelection(
        Math.round(this.lane.value),
        Math.round(this.row.value),
      );
      this.wake();
    });
    const finish = (e, cancelled = false) => {
      const d = this.drag;
      if (!d) return;
      this.drag = null;
      if (d.moved) {
        const first = d.samples[0],
          last = d.samples.at(-1),
          dt = first && last ? (last.time - first.time) / 1000 : 0;
        const velocity = (axis) =>
          !cancelled &&
          !this.reduced() &&
          dt > 0.008 &&
          performance.now() - last.time < 90
            ? (last[axis] - first[axis]) / dt
            : 0;
        this.momentum = {
          lane: new Momentum(this.lane.value, velocity("lane")),
          row: new Momentum(this.row.value, velocity("row")),
        };
      } else if (!cancelled) {
        const hit = this.hit(e);
        if (hit) {
          if (
            hit.lane === this.selection.lane &&
            hit.row === this.selection.row
          )
            this.onOpen(this.current);
          else {
            this.targetLane = hit.lane;
            this.targetRow = hit.row;
            this.setSelection(hit.lane, hit.row);
          }
        }
      }
      this.wake();
    };
    this.canvas.addEventListener("pointerup", (e) => finish(e));
    this.canvas.addEventListener("pointercancel", (e) => finish(e, true));
    let wheel = 0;
    this.canvas.addEventListener(
      "wheel",
      (e) => {
        if (this.detailTarget) return;
        e.preventDefault();
        const horizontal =
          e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.4;
        wheel += horizontal ? e.deltaX || e.deltaY : e.deltaY;
        if (Math.abs(wheel) > 38) {
          this.navigate(horizontal ? "lane" : "row", Math.sign(wheel));
          wheel = 0;
        }
      },
      { passive: false },
    );
    this.canvas.addEventListener("keydown", (e) => {
      const keys = {
        ArrowLeft: ["lane", -1],
        ArrowRight: ["lane", 1],
        ArrowUp: ["row", -1],
        ArrowDown: ["row", 1],
      };
      if (keys[e.key]) {
        e.preventDefault();
        this.navigate(...keys[e.key]);
      }
      if (e.key === "Enter") {
        e.preventDefault();
        this.onOpen(this.current);
      }
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        cancelAnimationFrame(this.frame);
        this.frame = 0;
      } else this.wake();
    });
    this.canvas.addEventListener("webglcontextlost", (e) => {
      e.preventDefault();
      cancelAnimationFrame(this.frame);
      this.frame = 0;
      this.container.dispatchEvent(new Event("scene-lost"));
    });
  }
  wake() {
    this.dirty = true;
    if (!this.frame && !document.hidden) {
      this.last = performance.now();
      this.frame = requestAnimationFrame((t) => this.tick(t));
    }
  }
  tick(now) {
    this.frame = 0;
    if (document.hidden) return;
    const dt = Math.min((now - this.last) / 1000, 0.05);
    this.last = now;
    if (!this.drag) {
      if (this.momentum) {
        this.momentum.lane.step(dt);
        this.momentum.row.step(dt);
        this.lane.value = this.momentum.lane.value;
        this.row.value = this.momentum.row.value;
        this.targetLane = Math.round(this.lane.value);
        this.targetRow = Math.round(this.row.value);
        this.setSelection(this.targetLane, this.targetRow);
        if (this.momentum.lane.done && this.momentum.row.done)
          this.momentum = null;
      } else {
        damp(this.lane, this.targetLane, 6.5, dt);
        damp(this.row, this.targetRow, 7, dt);
      }
    }
    for (const old of this.outgoing) {
      damp(old.lift, 0, 7, dt);
      if (this.reduced()) old.lift.value = 0;
    }
    this.outgoing = this.outgoing.filter((old) => {
      if (old.lift.value < 0.002) {
        this.scene.remove(old.mesh);
        return false;
      }
      return true;
    });
    damp(this.detail, this.detailTarget, 5.5, dt);
    damp(this.artTransition, this.artTarget, this.artTarget ? 5 : 11, dt);
    if (this.reduced()) this.artTransition.value = this.artTarget;
    if (this.pendingArt && this.artTransition.value < 0.025) {
      const next = this.pendingArt;
      this.pendingArt = null;
      const key = this.chapterArtKey;
      this.updateFace(next).then(() => {
        if (key === this.chapterArtKey) this.artTarget = 1;
        this.wake();
      });
    }
    damp(this.lift, this.detailTarget ? 4.1 : 1.15, 5, dt);
    if (this.reduced()) {
      this.lane.value = this.targetLane;
      this.row.value = this.targetRow;
      this.detail.value = this.detailTarget;
      this.lift.value = this.detailTarget ? 4.1 : 1.15;
    }
    const moving =
      Math.abs(this.lane.value - this.targetLane) > 0.001 ||
      Math.abs(this.row.value - this.targetRow) > 0.001 ||
      Math.abs(this.detail.value - this.detailTarget) > 0.001 ||
      Math.abs(this.artTransition.value - this.artTarget) > 0.001 ||
      !!this.drag ||
      !!this.momentum;
    if (this.dirty || moving || now - this.lastDraw >= 32) {
      this.draw(now / 1000);
      this.lastDraw = now;
      this.dirty = false;
    }
    if (!this.reduced() || moving)
      this.frame = requestAnimationFrame((t) => this.tick(t));
  }
  draw(time) {
    const centerLane = Math.round(this.lane.value),
      centerRow = Math.round(this.row.value);
    this.pulses = this.pulses.filter((p) => time - p.time < 3);
    let index = 0;
    const height = (row, lane) =>
      0.95 *
        Math.exp(-Math.pow(row - this.row.value, 2) / 15) *
        Math.exp(-Math.pow(lane - this.lane.value, 2) * 0.6) +
      (this.reduced()
        ? 0
        : breath(row, lane, time) +
          this.pulses.reduce(
            (sum, p) =>
              sum +
              selectionWave(
                Math.hypot(row - p.row, (lane - p.lane) * 2.2),
                time - p.time,
              ),
            0,
          ));
    for (let l = -3; l <= 3; l++)
      for (let r = -20; r <= 20; r++) {
        const lane = centerLane + l,
          row = centerRow + r;
        this.cells[index] = { lane, row };
        const selected =
          (lane === this.selection.lane && row === this.selection.row) ||
          this.outgoing.some((old) => old.lane === lane && old.row === row);
        this.dummy.position.set(
          (lane - this.lane.value) * SPACING,
          height(row, lane),
          (row - this.row.value) * DEPTH,
        );
        this.dummy.scale.setScalar(selected ? 0 : 1);
        this.dummy.updateMatrix();
        this.body.setMatrixAt(index, this.dummy.matrix);
        this.dummy.position.z += 0.156;
        this.dummy.updateMatrix();
        this.faces.setMatrixAt(index, this.dummy.matrix);
        this.dummy.position.x -= 2.43;
        this.dummy.position.z -= 0.156;
        this.dummy.updateMatrix();
        this.spines.setMatrixAt(index, this.dummy.matrix);
        this.dummy.position.x -= 0.063;
        for (let screw = 0; screw < 2; screw++) {
          this.dummy.position.y += screw ? -3.12 : 1.56;
          this.dummy.updateMatrix();
          this.fasteners.setMatrixAt(index * 2 + screw, this.dummy.matrix);
        }
        index++;
      }
    for (let i = 0; i < this.cells.length; i++) {
      this.tint.set(COLORS[wrap(this.cells[i].lane, COLORS.length)]);
      this.body.setColorAt(i, this.tint);
      this.faces.setColorAt(i, this.tint);
    }
    this.body.instanceColor.needsUpdate = true;
    this.faces.instanceColor.needsUpdate = true;
    this.spines.instanceMatrix.needsUpdate = true;
    this.fasteners.instanceMatrix.needsUpdate = true;
    this.body.instanceMatrix.needsUpdate = true;
    this.faces.instanceMatrix.needsUpdate = true;
    this.active.position.set(
      (this.selection.lane - this.lane.value) * SPACING,
      this.lift.value +
        height(this.selection.row, this.selection.lane) *
          (1 - this.detail.value),
      (this.selection.row - this.row.value) * DEPTH,
    );
    for (const old of this.outgoing)
      old.mesh.position.set(
        (old.lane - this.lane.value) * SPACING,
        height(old.row, old.lane) + old.lift.value,
        (old.row - this.row.value) * DEPTH,
      );
    this.coverReveal.value = Math.max(
      0,
      Math.min(1, (this.detail.value - 0.25) / 0.55, this.artTransition.value),
    );
    this.artFace.visible = this.detail.value > 0.05;
    const mobile = this.width < 700,
      d = this.detail.value;
    const direction = new THREE.Vector3(-0.76, 0.44, 0.53).normalize(),
      distance = 85;
    const span = mobile
      ? Math.max(10.5, 8.2 / this.camera.aspect)
      : 10.2 - 1.2 * d;
    const right = new THREE.Vector3()
        .crossVectors(new THREE.Vector3(0, 1, 0), direction)
        .normalize(),
      up = new THREE.Vector3().crossVectors(direction, right).normalize();
    const anchor = new THREE.Vector3(0, 0.8 + this.detail.value * 3.1, 0),
      px = mobile ? 0.5 : 0.29 - 0.04 * d,
      py = mobile ? 0.36 : 0.46;
    const aim = anchor
      .addScaledVector(right, (0.5 - px) * span * this.camera.aspect)
      .addScaledVector(up, (py - 0.5) * span);
    this.camera.position.copy(aim).addScaledVector(direction, distance);
    this.camera.lookAt(aim);
    this.camera.fov = THREE.MathUtils.radToDeg(
      2 * Math.atan(span / (2 * distance)),
    );
    this.camera.updateProjectionMatrix();
    this.camera.updateMatrixWorld();
    const pose = THREE.MathUtils.smoothstep(d, 0.2, 0.95);
    this.active.quaternion.identity().slerp(this.camera.quaternion, pose);
    this.active.scale.setScalar(1 + 0.12 * pose);
    this.active.position.addScaledVector(direction, 2.5 * pose);
    this.renderer.render(this.scene, this.camera);
  }
  diagnostics() {
    return {
      lane: this.selection.lane,
      row: this.selection.row,
      story: this.current.id,
      detail: this.detail.value,
      selectedY: this.active.position.y,
      coverReveal: this.coverReveal.value,
      artTransition: this.artTransition.value,
      closeup: this.detail.value > 0.95,
      outgoing: this.outgoing.length,
      breathing: !this.reduced(),
      instances: LANES * ROWS,
      drawCalls: this.renderer.info.render.calls,
      triangles: this.renderer.info.render.triangles,
      textureCount: this.renderer.info.memory.textures,
      framePending: !!this.frame,
    };
  }
}
