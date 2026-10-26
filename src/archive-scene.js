import * as THREE from "../vendor/three.module.js";
import { CoverAtlas, drawSlate, slateReady, slateStackNow, slateTitle } from "./cover-atlas.js";
import { t } from "./i18n.js";
import {
  wrap,
  damp,
  breath,
  selectionWave,
  Momentum,
  inverseProjection,
  smooth,
  easeInOutCubic,
  idleEnvelope,
  capDelay,
  FrameGovernor,
} from "./archive-motion.js";
import { createRenderer, pixelRatioFor } from "./gpu.js";

// Geometry. Rows (cards within a category) recede in depth; lanes (categories)
// run side by side. The window is wider than any viewport so rows always leave
// both screen edges and cells are recycled out of sight, never popped in view.
const LANES = 7,
  ROWS = 33,
  HALF_LANES = 3,
  HALF_ROWS = 16,
  SPACING = 5.45,
  DEPTH = 1.12,
  CARD_W = 2.5,
  CARD_H = 1.85,
  FACE_W = 4.88,
  FACE_H = 3.58,
  FACE_Z = 0.156,
  PREVIEW_LIFT = 1.15,
  DETAIL_LIFT = 4.1;
// The 3:1 event banner sits in the top band of every face, as on the detail card.
const INSET_X = 0.018,
  INSET_Y = (INSET_X * FACE_W) / FACE_H,
  BAND_H = ((1 - 2 * INSET_X) * FACE_W) / 3 / FACE_H,
  BAND_TOP = 1 - INSET_Y,
  BAND_BOTTOM = BAND_TOP - BAND_H;
export const CARD_BAND = { top: INSET_Y, height: BAND_H }; // fractions of the face, from the top
const FACE_PX = { w: 1024, h: 752 };
const TINTS = ["#5d7a73", "#557b7a", "#857f61", "#66738a", "#7c6b5f", "#61786a", "#6a8a82", "#687a80"];
const pageLanguage = () => (document.documentElement.lang === "en" ? "en" : "zh");
/** The small category line of a typographic slate: the page language's category name (capitals in English). */
function kickerOf(column, lang) {
  const label = t(`cat.${column?.id}`, null, lang);
  const name = label === `cat.${column?.id}` ? (lang === "en" ? column?.en : column?.title) || "" : label;
  return lang === "en" ? name.toUpperCase() : name;
}
const HIGHLIGHT = new THREE.Color("#c2ab72");
const BACKGROUND = 0x08151a;
// Camera: browse looks down onto the rows so their art band reads; detail turns
// toward a near-frontal close-up. Unit vectors from target to camera.
const dirFrom = (azimuth, elevation) => {
  const a = THREE.MathUtils.degToRad(azimuth), e = THREE.MathUtils.degToRad(elevation);
  return new THREE.Vector3(-Math.sin(a) * Math.cos(e), Math.sin(e), Math.cos(a) * Math.cos(e));
};
const BROWSE_DIR = dirFrom(36, 37);
const DETAIL_DIR = dirFrom(14, 11);
const DISTANCE = 85;

const FACE_COMMON = /* glsl */ `
uniform sampler2D coverAtlas;
uniform vec3 laneTints[8];
#define INSET_X ${INSET_X.toFixed(5)}
#define BAND_TOP ${BAND_TOP.toFixed(5)}
#define BAND_BOTTOM ${BAND_BOTTOM.toFixed(5)}
// Albedo of a closed card: original art in the top band, a quiet label panel below.
vec3 archiveFace(vec2 uv, vec4 cover, float tier, float tint, out float artMask) {
  artMask = 0.0;
  vec3 tintColor = laneTints[int(tint + 0.5)];
  float rule = step(0.982, fract(uv.y * 24.0)) * 0.025;
  vec3 panel = mix(vec3(0.030, 0.058, 0.066), tintColor * 0.30, 0.5) + rule;
  float accent = (1.0 - smoothstep(0.0, 0.0045, abs(uv.y - (BAND_BOTTOM - 0.03)))) * step(0.05, uv.x) * step(uv.x, 0.27);
  panel = mix(panel, vec3(0.74, 0.62, 0.40), accent * 0.8);
  vec2 bandUv = vec2((uv.x - INSET_X) / (1.0 - 2.0 * INSET_X), (uv.y - BAND_BOTTOM) / (BAND_TOP - BAND_BOTTOM));
  float inBand = step(0.0, bandUv.x) * step(bandUv.x, 1.0) * step(0.0, bandUv.y) * step(bandUv.y, 1.0);
  // Explicit LOD: the atlas has no mipmaps, and the reveal samples it inside a loop.
  vec3 art = tier > 0.5 ? textureLod(coverAtlas, cover.xy + clamp(bandUv, 0.0, 1.0) * cover.zw, 0.0).rgb : mix(panel, tintColor * 0.42, 0.5);
  artMask = inBand * step(0.5, tier);
  return mix(panel, art, inBand);
}
`;
const REVEAL_COMMON = /* glsl */ `
uniform sampler2D faceFrom;
uniform sampler2D faceTo;
uniform vec4 fromCover;
uniform vec4 toCover;
uniform vec3 fromInfo; // x: 1 atlas / 0 texture, y: tier, z: tint
uniform vec3 toInfo;
uniform float revealProgress;
uniform float revealDir;
uniform float faceLod; // log2(texture width / projected card width): no derivatives needed
float revealHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 sideFrom(vec2 uv, float lod, out float m) {
  vec3 c = vec3(0.0);
  m = 1.0;
  if (fromInfo.x > 0.5) c = archiveFace(uv, fromCover, fromInfo.y, fromInfo.z, m);
  else c = textureLod(faceFrom, uv, lod).rgb;
  return c;
}
vec3 sideTo(vec2 uv, float lod, out float m) {
  vec3 c = vec3(0.0);
  m = 1.0;
  if (toInfo.x > 0.5) c = archiveFace(uv, toCover, toInfo.y, toInfo.z, m);
  else c = textureLod(faceTo, uv, lod).rgb;
  return c;
}
// Frosted geometric reveal: triangular facets clear along a diagonal sweep; each
// facet passes through frosted glass. Progress endpoints are wholly old/new.
vec3 revealFace(vec2 uv, out float artMask) {
  float mt = 1.0; float mf = 1.0;
  vec3 to = sideTo(uv, faceLod, mt);
  if (revealProgress >= 0.9999) { artMask = mt; return to; }
  vec3 from = sideFrom(uv, faceLod, mf);
  vec2 grid = vec2(6.0, 4.4);
  vec2 g = uv * grid;
  vec2 cell = floor(g);
  vec2 f = fract(g);
  float upper = step(f.x, f.y);
  vec2 centre = (cell + mix(vec2(0.67, 0.33), vec2(0.33, 0.67), upper)) / grid;
  float along = revealDir > 0.0 ? centre.x * 0.62 + (1.0 - centre.y) * 0.38 : (1.0 - centre.x) * 0.62 + centre.y * 0.38;
  float threshold = along * 0.78 + revealHash(cell * 2.0 + upper) * 0.22;
  const float F = 0.16;
  float w = smoothstep(threshold - F, threshold + F, revealProgress * (1.0 + 2.0 * F) - F);
  float frost = max(4.0 * w * (1.0 - w), sin(3.14159265 * revealProgress) * 0.28);
  vec3 sharp = mix(from, to, w);
  artMask = mix(mf, mt, w);
  if (frost < 0.003) return sharp;
  float r = 0.016 * frost;
  vec3 soft = vec3(0.0);
  float mm = 0.0;
  for (int i = 0; i < 8; i++) {
    float a = float(i) * 0.7853982 + revealHash(cell) * 0.6;
    vec2 o = vec2(cos(a), sin(a) * 1.36) * r;
    soft += mix(sideFrom(uv + o, faceLod + 1.0, mm), sideTo(uv + o, faceLod + 1.0, mm), w);
  }
  soft = (soft + sharp) / 9.0;
  vec3 glass = mix(soft, soft * 0.82 + vec3(0.055, 0.085, 0.095), 0.55);
  float edge = 1.0 - smoothstep(0.0, 0.035, min(min(f.x, f.y), min(1.0 - max(f.x, f.y), abs(f.x - f.y) * 0.7071)));
  return mix(sharp, glass, frost) + vec3(0.62, 0.58, 0.46) * edge * frost * 0.22;
}
`;

const tmpColor = new THREE.Color();
const tmpSphere = new THREE.Sphere(new THREE.Vector3(), 3.4);

export class ArchiveScene {
  constructor(container, { columns, onSelect, onOpen, reduced, asset }) {
    Object.assign(this, { container, columns, onSelect, onOpen, reduced, asset });
    this.lane = { value: 2, velocity: 0 };
    this.row = { value: 0, velocity: 0 };
    this.targetLane = 2;
    this.targetRow = 0;
    this.memories = columns.map(() => 0);
    this.selection = { lane: 2, row: 0 };
    this.pulses = [];
    this.detail = { value: 0, velocity: 0 };
    this.detailTarget = 0;
    this.lift = { value: PREVIEW_LIFT, velocity: 0 };
    this.outgoing = [];
    this.frame = 0;
    this.compiled = false; // set by warmUp(): the loop starts once the programs are linked (or after 1.2 s)
    this.timer = 0; // pending timeout of a frame-rate-capped frame
    this.last = 0;
    this.lastDraw = 0;
    this.dirty = true;
    this.lastInput = performance.now();
    this.framesDrawn = 0;
    this.governor = new FrameGovernor({ budget: 20 });
    // Adapter tier (src/gpu.js): integrated/software adapters get a lower resolution cap, no MSAA and frame caps.
    const { renderer, gpu } = createRenderer(THREE, {
      antialias: (devicePixelRatio || 1) < 2,
      alpha: false,
      stencil: false,
      depth: true,
      preserveDrawingBuffer: false,
    });
    this.renderer = renderer;
    this.gpu = gpu;
    this.quality = gpu.settings;
    this.maxPixelRatio = pixelRatioFor(gpu);
    this.pixelRatio = this.maxPixelRatio;
    this.renderer.setPixelRatio(this.pixelRatio);
    this.renderer.setClearColor(BACKGROUND, 1);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.06;
    this.renderer.shadowMap.enabled = false;
    // Status queries after compile force a synchronous link (hundreds of ms on first
    // use); programs are warmed asynchronously instead (see warmUp()).
    this.renderer.debug.checkShaderErrors = /[?&]debug\b/.test(location.search);
    this.renderer.info.autoReset = true;
    this.canvas = this.renderer.domElement;
    this.canvas.tabIndex = 0; // arrow keys and Enter are handled on the canvas itself, so it stays a (named) tab stop
    this.canvas.setAttribute("role", "group");
    this.lang = pageLanguage();
    this.covers = new WeakMap(); // story → {art | zh | en: {key, source}}: what its closed card asks the atlas for
    const nameCanvas = () => this.canvas.setAttribute("aria-label", t("scene.label", null, this.lang));
    nameCanvas();
    new MutationObserver(() => {
      if (pageLanguage() === this.lang) return;
      this.lang = pageLanguage();
      nameCanvas();
      this.wake(); // typographic slates are keyed by language: the closed cards ask for the new ones
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    // Newsreader (Google Fonts) may land after the first English slate was set in the self-hosted stand-in.
    document.fonts?.addEventListener?.("loadingdone", () => this.restyleSlate());
    container.append(this.canvas);

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(BACKGROUND, DISTANCE - 4, DISTANCE + 40);
    this.camera = new THREE.PerspectiveCamera(9, 1, 6, 220);
    this.scene.add(new THREE.HemisphereLight(0xd8e9e4, 0x10201f, 1.55));
    const key = new THREE.DirectionalLight(0xf6e7c6, 2.3);
    key.position.set(-12, 22, 14);
    this.scene.add(key);
    const fill = new THREE.DirectionalLight(0x8fc4cf, 0.85);
    fill.position.set(14, 8, 10);
    this.scene.add(fill);

    this.coverAtlas = new CoverAtlas(this.renderer, asset, () => this.wake());
    this.tintUniform = { value: TINTS.map((c) => new THREE.Color(c)) };
    this.atlasUniform = { value: this.coverAtlas.texture };

    // Shared shell geometry for array cards and the extracted card.
    const shape = new THREE.Shape();
    const r = 0.045;
    shape.moveTo(-CARD_W + r, -CARD_H);
    shape.lineTo(CARD_W - r, -CARD_H);
    shape.quadraticCurveTo(CARD_W, -CARD_H, CARD_W, -CARD_H + r);
    shape.lineTo(CARD_W, CARD_H - r);
    shape.quadraticCurveTo(CARD_W, CARD_H, CARD_W - r, CARD_H);
    shape.lineTo(-CARD_W + r, CARD_H);
    shape.quadraticCurveTo(-CARD_W, CARD_H, -CARD_W, CARD_H - r);
    shape.lineTo(-CARD_W, -CARD_H + r);
    shape.quadraticCurveTo(-CARD_W, -CARD_H, -CARD_W + r, -CARD_H);
    const shell = new THREE.ExtrudeGeometry(shape, {
      depth: 0.25,
      bevelEnabled: true,
      bevelSegments: 1,
      steps: 1,
      bevelSize: 0.028,
      bevelThickness: 0.028,
      curveSegments: 2,
    });
    shell.translate(0, 0, -0.125);
    const faceGeometry = new THREE.PlaneGeometry(FACE_W, FACE_H);
    faceGeometry.translate(0, 0, FACE_Z);

    // Instanced array: body + face share one instance-matrix buffer.
    const count = LANES * ROWS;
    this.instanceMatrix = new THREE.InstancedBufferAttribute(new Float32Array(count * 16), 16);
    this.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.body = new THREE.InstancedMesh(shell, this.bodyMaterial(), count);
    this.body.instanceMatrix = this.instanceMatrix;
    this.body.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(count * 3), 3);
    this.body.instanceColor.setUsage(THREE.DynamicDrawUsage);
    const faceInstanced = faceGeometry.clone();
    this.coverUV = new THREE.InstancedBufferAttribute(new Float32Array(count * 4), 4);
    this.coverInfo = new THREE.InstancedBufferAttribute(new Float32Array(count * 3), 3); // tier, tint, focus
    this.coverUV.setUsage(THREE.DynamicDrawUsage);
    this.coverInfo.setUsage(THREE.DynamicDrawUsage);
    faceInstanced.setAttribute("coverUV", this.coverUV);
    faceInstanced.setAttribute("coverInfo", this.coverInfo);
    this.faces = new THREE.InstancedMesh(faceInstanced, this.faceMaterial(), count);
    this.faces.instanceMatrix = this.instanceMatrix;
    for (const mesh of [this.body, this.faces]) {
      mesh.frustumCulled = false; // culled per instance below
      mesh.count = 0;
      this.scene.add(mesh);
    }
    this.cells = new Int32Array(count * 2); // visible instance → lane,row
    this.tileOut = new Float32Array(5);

    // The extracted card: its own body and a face that runs the frosted reveal.
    this.active = new THREE.Group();
    this.activeBodyMaterial = new THREE.MeshStandardMaterial({ color: HIGHLIGHT, metalness: 0.12, roughness: 0.42 });
    this.activeBody = new THREE.Mesh(shell, this.activeBodyMaterial);
    this.reveal = {
      faceFrom: { value: null },
      faceTo: { value: null },
      fromCover: { value: new THREE.Vector4() },
      toCover: { value: new THREE.Vector4() },
      fromInfo: { value: new THREE.Vector3(1, 0, 0) },
      toInfo: { value: new THREE.Vector3(1, 0, 0) },
      revealProgress: { value: 1 },
      revealDir: { value: 1 },
      faceLod: { value: 0 },
    };
    this.activeFace = new THREE.Mesh(faceGeometry, this.revealMaterial());
    this.activeFrame = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(5.02, 3.72, 0.31)),
      new THREE.LineBasicMaterial({ color: 0xbaa875, transparent: true, opacity: 0.75 }),
    );
    this.active.add(this.activeBody, this.activeFace, this.activeFrame);
    this.scene.add(this.active);
    this.art = {
      progress: 1,
      duration: 0.9,
      key: null,
      history: [],
      canvases: [makeCanvas(), makeCanvas()],
      textures: [],
      which: 0,
      snapshots: [],
      pendingDetail: null,
      images: new Map(),
      token: 0,
    };
    this.art.textures = this.art.canvases.map((canvas) => {
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      // No anisotropy: the face is viewed head-on, and querying the limit stalls (sync GL query).
      return texture;
    });
    this.snapshotScene = new THREE.Scene();
    this.snapshotCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.snapshotScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.snapshotMaterial()));

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.frustum = new THREE.Frustum();
    this.projScreen = new THREE.Matrix4();
    this.cameraDirection = new THREE.Vector3();
    this.cameraRight = new THREE.Vector3();
    this.cameraUp = new THREE.Vector3();
    this.cameraAim = new THREE.Vector3();
    this.worldUp = new THREE.Vector3(0, 1, 0);
    this.corner = [new THREE.Vector3(), new THREE.Vector3()];
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(container);
    // Test hook (no global): verification scripts slow time to capture transition frames.
    this.timeScale = 1;
    container.__scene = this;
    this.bind();
    this.resize();
    this.warmUp();
  }
  /** Compile every program off the critical path (KHR_parallel_shader_compile when available). The first frame waits
   *  for the scene's programs (at most 1.2 s): drawing it earlier compiled them synchronously inside that frame
   *  (a 265 ms animation-frame callback on a cold load, docs/refine/round4/perf-audit.md #3). */
  warmUp() {
    const scene = this.renderer.compileAsync(this.scene, this.camera).catch(() => {});
    Promise.race([scene, new Promise((resolve) => setTimeout(resolve, 1200))]).then(() => {
      this.compiled = true;
      this.wake();
    });
    const snapshot = async () => {
      try {
        await scene;
        // The snapshot pass renders into a target: compile that program variant there.
        const target = this.snapshotTarget(0);
        const previous = this.renderer.getRenderTarget();
        this.renderer.setRenderTarget(target);
        const pending = this.renderer.compileAsync(this.snapshotScene, this.snapshotCamera);
        this.renderer.setRenderTarget(previous);
        await pending;
      } catch {}
    };
    (window.requestIdleCallback || ((f) => setTimeout(f, 300)))(snapshot);
  }

  // ------------------------------------------------------------ materials
  bodyMaterial() {
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.08, roughness: 0.56 });
    material.onBeforeCompile = (shader) => {
      shader.vertexShader = "varying vec3 vLocal;\n" + shader.vertexShader.replace("#include <begin_vertex>", "#include <begin_vertex>\nvLocal = position;");
      // No shadow pass: a baked-in gradient grounds each card, and the left edge reads as a spine.
      shader.fragmentShader =
        "varying vec3 vLocal;\n" +
        shader.fragmentShader.replace(
          "#include <color_fragment>",
          `#include <color_fragment>
          diffuseColor.rgb *= mix(0.42, 1.0, smoothstep(${(-CARD_H).toFixed(2)}, 0.9, vLocal.y));
          diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * 0.45, step(vLocal.x, ${(-CARD_W + 0.11).toFixed(3)}));`,
        );
    };
    return material;
  }
  faceMaterial() {
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0, roughness: 0.62 });
    material.onBeforeCompile = (shader) => {
      shader.uniforms.coverAtlas = this.atlasUniform;
      shader.uniforms.laneTints = this.tintUniform;
      shader.vertexShader =
        "attribute vec4 coverUV;\nattribute vec3 coverInfo;\nvarying vec4 vCover;\nvarying vec3 vInfo;\nvarying vec2 vFaceUv;\n" +
        shader.vertexShader.replace("#include <begin_vertex>", "#include <begin_vertex>\nvCover = coverUV; vInfo = coverInfo; vFaceUv = uv;");
      shader.fragmentShader =
        "varying vec4 vCover;\nvarying vec3 vInfo;\nvarying vec2 vFaceUv;\n" +
        FACE_COMMON +
        shader.fragmentShader
          .replace("#include <map_fragment>", "float artMask; vec3 faceAlbedo = archiveFace(vFaceUv, vCover, vInfo.x, vInfo.y, artMask) * mix(0.58, 1.0, vInfo.z); diffuseColor.rgb *= faceAlbedo;")
          .replace("#include <emissivemap_fragment>", "#include <emissivemap_fragment>\ntotalEmissiveRadiance += faceAlbedo * artMask * 0.5;");
    };
    return material;
  }
  revealMaterial() {
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0, roughness: 0.55 });
    material.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, this.reveal, { coverAtlas: this.atlasUniform, laneTints: this.tintUniform });
      shader.vertexShader = "varying vec2 vFaceUv;\n" + shader.vertexShader.replace("#include <begin_vertex>", "#include <begin_vertex>\nvFaceUv = uv;");
      shader.fragmentShader =
        "varying vec2 vFaceUv;\n" +
        FACE_COMMON +
        REVEAL_COMMON +
        shader.fragmentShader
          .replace("#include <map_fragment>", "float artMask; vec3 faceAlbedo = revealFace(vFaceUv, artMask); diffuseColor.rgb *= faceAlbedo;")
          .replace("#include <emissivemap_fragment>", "#include <emissivemap_fragment>\ntotalEmissiveRadiance += faceAlbedo * artMask * 0.55;");
    };
    return material;
  }
  /** Unlit copy of the reveal composite, used to freeze an interrupted transition. */
  snapshotMaterial() {
    return new THREE.ShaderMaterial({
      uniforms: { ...this.reveal, coverAtlas: this.atlasUniform, laneTints: this.tintUniform },
      vertexShader: "varying vec2 vFaceUv; void main(){ vFaceUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",
      fragmentShader: `varying vec2 vFaceUv;\n${FACE_COMMON}${REVEAL_COMMON}\nvoid main(){ float m; gl_FragColor = vec4(revealFace(vFaceUv, m), 1.0); }`,
      depthTest: false,
      depthWrite: false,
    });
  }

  /** The story lists: the scene is built (renderer, programs, atlas) while the index still downloads. */
  setColumns(columns) {
    this.columns = columns;
    this.memories = columns.map(() => 0);
    this.dirty = true;
    this.wake();
  }

  // ------------------------------------------------------------ selection
  get current() {
    const col = this.columns[wrap(this.selection.lane, this.columns.length)];
    return col.stories[wrap(this.selection.row, col.stories.length)];
  }
  storyAt(lane, row) {
    const col = this.columns[wrap(lane, this.columns.length)];
    return col.stories[wrap(row, col.stories.length)];
  }
  /** What a closed card asks the atlas for in its art band: the story's picture or, without one, its typographic slate in
   *  the page language (a new key per language, so a language switch fetches the new slates). Cached per story (no
   *  allocation per card per frame). */
  cover(story, lane) {
    let entry = this.covers.get(story);
    if (!entry) this.covers.set(story, (entry = {}));
    const which = story.image ? "art" : this.lang;
    if (entry[which]) return entry[which];
    if (story.image) return (entry.art = { key: story.image, source: { image: story.image } });
    const index = wrap(lane, this.columns.length);
    return (entry[which] = {
      key: `title:${story.id}:${this.lang}`,
      source: { title: this.slateText(story, this.lang) || t("cat.fallback", null, this.lang), kicker: kickerOf(this.columns[index], this.lang), lang: this.lang, tint: TINTS[index % TINTS.length] },
    });
  }
  /** A story's slate title: the app's display wording (`storyTitle`: the game's names filled in, typeset) when it has one
   *  for this language, else the data title with its placeholders elided. */
  slateText(story, lang) {
    const shown = this.storyTitle?.(story, lang);
    return slateTitle(shown ? { [lang]: shown } : story.title, lang);
  }
  setSelection(lane, row) {
    if (this.selection.lane === lane && this.selection.row === row) return;
    if (!this.reduced() && this.lift.value > 0.02)
      this.outgoing.push({ lane: this.selection.lane, row: this.selection.row, lift: { value: this.lift.value, velocity: this.lift.velocity } });
    if (this.outgoing.length > 6) this.outgoing.shift();
    const returning = this.outgoing.findIndex((old) => old.lane === lane && old.row === row);
    this.lift.value = returning >= 0 ? this.outgoing[returning].lift.value : 0;
    this.lift.velocity = returning >= 0 ? this.outgoing[returning].lift.velocity : 0;
    if (returning >= 0) this.outgoing.splice(returning, 1);
    this.selection = { lane, row };
    this.memories[wrap(lane, this.columns.length)] = row;
    this.pulses.push({ lane, row, time: performance.now() / 1000 });
    if (this.pulses.length > 4) this.pulses.shift();
    this.art.key = null;
    this.art.history.length = 0;
    this.art.progress = 1;
    this.reveal.revealProgress.value = 1;
    this.setFaceSide("to", { atlas: true });
    this.onSelect(this.current, wrap(lane, this.columns.length), wrap(row, this.columns[wrap(lane, this.columns.length)].stories.length));
  }
  navigate(axis, direction) {
    if (this.detailTarget) return;
    this.momentum = null;
    this.drag = null;
    this.touch();
    if (axis === "lane") {
      this.targetLane = Math.round(this.targetLane) + direction;
      this.targetRow = this.memories[wrap(this.targetLane, this.columns.length)];
    } else this.targetRow = Math.round(this.targetRow) + direction;
    this.setSelection(Math.round(this.targetLane), Math.round(this.targetRow));
    this.wake();
  }
  selectCategory(index) {
    const n = this.columns.length;
    const distance = wrap(index - wrap(this.targetLane, n) + Math.floor(n / 2), n) - Math.floor(n / 2);
    this.navigate("lane", distance);
  }
  selectStory(id) {
    for (let i = 0; i < this.columns.length; i++) {
      const row = this.columns[i].stories.findIndex((s) => s.id === id);
      if (row < 0) continue;
      if (wrap(this.selection.lane, this.columns.length) === i && wrap(this.selection.row, this.columns[i].stories.length) === row) return;
      this.detailTarget = 0;
      this.selectCategory(i);
      // Nearest occurrence of that row in the endless track.
      const len = this.columns[i].stories.length;
      this.targetRow = row + Math.round((this.targetRow - row) / len) * len;
      this.setSelection(Math.round(this.targetLane), this.targetRow);
      this.wake();
      return;
    }
  }
  setDetail(open) {
    const target = open ? 1 : 0;
    if (this.detailTarget === target) return;
    this.detailTarget = target;
    this.momentum = null;
    this.drag = null;
    this.touch();
    if (open) {
      // Start from the archive face; the chapter face arrives via setChapterArt.
      this.setFaceSide("to", { atlas: true });
      this.art.progress = 1;
      this.reveal.revealProgress.value = 1;
      this.art.openedAt = performance.now();
    } else {
      this.art.key = null;
      this.art.history.length = 0;
      this.art.pendingDetail = null;
      this.startReveal({ atlas: true }, -1, 0.6);
      this.setFlowReady(false);
    }
    this.wake();
  }

  // ------------------------------------------------------------ chapter art
  /** Chapter (doc) changes run the frosted geometric reveal on the extracted card. */
  setChapterArt(image, title, meta = {}) {
    const lang = pageLanguage();
    const story = this.current;
    // Without a picture the face carries a typographic slate (cover-atlas.js): the chapter's title as the reader sets it
    // (meta.heading: the game's names filled in), else the chapter's data title, else the story's.
    const text = slateTitle({ [lang]: meta.heading }, lang) || slateTitle(title, lang) || this.slateText(story, lang) || t("cat.fallback", null, lang);
    const source = image || story.image || null;
    // Keyed by doc identity (both languages), so history survives a language switch.
    const key = `${source}|${title?.zh || ""}|${title?.en || ""}`;
    const column = this.columns[wrap(this.selection.lane, this.columns.length)];
    const kicker = meta.category || kickerOf(column, lang);
    const lane = wrap(this.selection.lane, this.columns.length);
    if (this.art.key === key) {
      // Same doc in another language: redraw the face in place, no transition.
      if (this.art.lang !== lang && this.detailTarget && !this.art.pendingDetail) {
        this.art.lang = lang;
        const token = ++this.art.token;
        this.faceInputs(source, { lang, title: text, kicker }).then(({ img, stack }) => {
          if (token !== this.art.token) return;
          this.drawDetail(this.art.which, { img, stack, text, kicker, lang, story, lane });
          this.art.textures[this.art.which].needsUpdate = true;
          this.wake();
        });
      }
      return;
    }
    this.art.lang = lang;
    const history = this.art.history;
    const back = history.length > 1 && history[history.length - 2] === key;
    if (back) history.pop();
    else history.push(key);
    if (history.length > 24) history.shift();
    this.art.key = key;
    const token = ++this.art.token;
    this.faceInputs(source, { lang, title: text, kicker }).then(({ img, stack }) => {
      if (token !== this.art.token) return;
      this.art.pendingDetail = { img, stack, text, kicker, lang, story, lane, dir: back ? -1 : 1 };
      this.wake();
    });
  }
  /** A chapter face's inputs: its picture, or (none) the faces its typographic slate is set in, loaded before any drawing. */
  faceInputs(source, slate) {
    return this.loadImage(source).then((img) => (img ? { img } : slateReady(slate).then((stack) => ({ img: null, stack }))));
  }
  /** A face a slate stood in for (Newsreader) has loaded since: set the visible slate again, in place. */
  restyleSlate() {
    const drawn = this.art?.slate;
    if (!drawn || drawn.stack === slateStackNow(drawn.lang)) return;
    this.drawDetail(drawn.index, { ...drawn.spec, stack: undefined });
    this.art.textures[drawn.index].needsUpdate = true;
    this.wake();
  }
  loadImage(path) {
    if (!path) return Promise.resolve(null);
    let pending = this.art.images.get(path);
    if (!pending) {
      // The close-up face is a fixed-size canvas (FACE_PX), so the ×2 super-resolved derivative (public/art-hd,
      // docs/IMAGES.md) only sharpens the drawing; the original is the fallback when no derivative exists.
      const decode = (src) => {
        const img = new Image();
        img.decoding = "async";
        img.src = this.asset(src);
        return img.decode().then(() => img);
      };
      const hd = /^art\//.test(path) ? path.replace(/^art\//, "art-hd/") : null;
      pending = (hd ? decode(hd).catch(() => decode(path)) : decode(path)).catch(() => null);
      this.art.images.set(path, pending);
      if (this.art.images.size > 8) this.art.images.delete(this.art.images.keys().next().value);
    }
    return pending;
  }
  drawDetail(index, spec) {
    const { img, stack, text, kicker, lane } = spec;
    const lang = spec.lang || pageLanguage();
    const canvas = this.art.canvases[index];
    const c = canvas.getContext("2d");
    const { w, h } = FACE_PX;
    const bx = INSET_X * w, by = INSET_Y * h, bw = (1 - 2 * INSET_X) * w, bh = BAND_H * h;
    c.save();
    c.fillStyle = "#0a191e";
    c.fillRect(0, 0, w, h);
    if (img) {
      // Pre-blurred backdrop, so the frosted glass under the map costs nothing per
      // frame. Blur by down- then up-sampling (a CSS-style canvas blur filter of this
      // radius cost tens of ms on the main thread per chapter change).
      const small = (this.art.blurCanvas ??= Object.assign(document.createElement("canvas"), { width: 24, height: 18 }));
      const sc = small.getContext("2d");
      sc.imageSmoothingQuality = "high";
      const cover = Math.max(small.width / img.width, small.height / img.height) * 1.1;
      sc.drawImage(img, (small.width - img.width * cover) / 2, (small.height - img.height * cover) / 2, img.width * cover, img.height * cover);
      c.imageSmoothingQuality = "high";
      c.drawImage(small, -w * 0.05, -h * 0.05, w * 1.1, h * 1.1);
      c.fillStyle = "#06121780";
      c.fillRect(0, 0, w, h);
    } else {
      const g = c.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, TINTS[lane % TINTS.length] + "66");
      g.addColorStop(1, "#0a191e");
      c.fillStyle = g;
      c.fillRect(0, 0, w, h);
    }
    const shade = c.createLinearGradient(0, by + bh, 0, h);
    shade.addColorStop(0, "#08161bcc");
    shade.addColorStop(1, "#06121690");
    c.fillStyle = shade;
    c.fillRect(0, by + bh, w, h - by - bh);
    c.strokeStyle = "#9fb7ad14";
    c.lineWidth = 1;
    for (let y = by + bh + 22; y < h; y += 22) {
      c.beginPath();
      c.moveTo(0, y + 0.5);
      c.lineTo(w, y + 0.5);
      c.stroke();
    }
    if (img) {
      const aspect = img.width / img.height;
      let sx = 0, sy = 0, sw = img.width, sh = img.height;
      if (aspect > 3) (sw = img.height * 3), (sx = (img.width - sw) / 2);
      else (sh = img.width / 3), (sy = (img.height - sh) / 2);
      c.imageSmoothingQuality = "high";
      c.drawImage(img, sx, sy, sw, sh, bx, by, bw, bh);
    } else {
      // No picture: the typographic slate, in the page language (cover-atlas.js drawSlate). The reader's own heading is
      // the exact title (it has the game's names filled in); the data title, placeholders elided, is the fallback.
      const heading = this.detailTarget ? document.querySelector("#reader-title")?.textContent.trim() : "";
      drawSlate(c, bx, by, bw, bh, { title: heading || text, kicker, lang, tint: TINTS[lane % TINTS.length], stack });
    }
    this.art.slate = img ? null : { index, spec, lang, stack: stack || slateStackNow(lang) };
    // The map overlay's "Event image" toggle has nothing to show for a slate: styling can hide it on `.no-art`.
    (this.flowElement ??= document.querySelector("#flow-surface"))?.classList.toggle("no-art", !img);
    c.strokeStyle = "#d9c08a55";
    c.strokeRect(bx + 0.5, by + 0.5, bw - 1, bh - 1);
    // No text on the face: the reader panel carries the title, and the map covers this panel.
    c.fillStyle = "#cbb27a";
    c.fillRect(bx, by + bh + 18, 48, 2);
    c.restore();
  }
  /** Point one side of the reveal at the archive face (atlas) or a texture. */
  setFaceSide(side, { atlas, texture }) {
    const info = this.reveal[`${side}Info`].value;
    if (atlas) {
      info.x = 1;
      this.reveal[`face${side === "to" ? "To" : "From"}`].value = this.art.textures[0];
    } else {
      info.x = 0;
      this.reveal[`face${side === "to" ? "To" : "From"}`].value = texture;
    }
    this.refreshActiveCover();
  }
  refreshActiveCover() {
    const story = this.current;
    const cover = this.cover(story, this.selection.lane);
    const tile = this.coverAtlas.get(cover.key, cover.source, true, this.tileOut);
    for (const side of ["from", "to"]) {
      if (this.reveal[`${side}Info`].value.x < 0.5) continue;
      this.reveal[`${side}Cover`].value.set(tile[0], tile[1], tile[2], tile[3]);
      this.reveal[`${side}Info`].value.y = tile[4];
      this.reveal[`${side}Info`].value.z = wrap(this.selection.lane, this.columns.length) % 8;
    }
  }
  /** Begin a reveal toward `to`; an interrupted reveal is frozen into a snapshot first. */
  startReveal(to, dir, duration = 0.9) {
    const reveal = this.reveal;
    if (this.reduced()) {
      this.setFaceSide("to", to);
      this.art.progress = 1;
      reveal.revealProgress.value = 1;
      return;
    }
    if (this.art.progress < 1) {
      const snapshot = this.snapshot();
      this.setFaceSide("from", { texture: snapshot });
    } else if (reveal.toInfo.value.x > 0.5) {
      reveal.fromInfo.value.copy(reveal.toInfo.value);
      reveal.fromCover.value.copy(reveal.toCover.value);
    } else this.setFaceSide("from", { texture: reveal.faceTo.value });
    this.setFaceSide("to", to);
    reveal.revealDir.value = dir;
    this.art.progress = 0;
    this.art.duration = duration;
    reveal.revealProgress.value = 0;
  }
  snapshotTarget(index) {
    return (this.art.snapshots[index] ??= new THREE.WebGLRenderTarget(FACE_PX.w, FACE_PX.h, {
      depthBuffer: false,
      stencilBuffer: false,
      generateMipmaps: false,
      colorSpace: THREE.SRGBColorSpace,
    }));
  }
  snapshot() {
    const index = (this.art.snapshotIndex = ((this.art.snapshotIndex || 0) + 1) % 2);
    const target = this.snapshotTarget(index);
    // The snapshot target is never the texture being sampled (ping-pong).
    if (this.reveal.faceFrom.value === target.texture) {
      this.reveal.faceFrom.value = this.art.snapshots[1 - index]?.texture || this.art.textures[0];
    }
    const previous = this.renderer.getRenderTarget();
    this.renderer.setRenderTarget(target);
    this.renderer.render(this.snapshotScene, this.snapshotCamera);
    this.renderer.setRenderTarget(previous);
    return target.texture;
  }
  advanceArt(dt) {
    // Apply a pending chapter face once the card has lifted far enough to read.
    const pending = this.art.pendingDetail;
    if (pending && this.detailTarget && (this.detail.value > 0.35 || this.reduced())) {
      this.art.pendingDetail = null;
      const next = (this.art.which = 1 - this.art.which);
      this.drawDetail(next, pending);
      this.art.textures[next].needsUpdate = true;
      // If the outgoing side still shows this canvas, freeze it first.
      if (this.reveal.faceFrom.value === this.art.textures[next] && this.reveal.fromInfo.value.x < 0.5) {
        this.setFaceSide("from", { texture: this.snapshot() });
      }
      this.startReveal({ texture: this.art.textures[next] }, pending.dir, this.detail.value < 0.98 ? 1.05 : 0.85);
    }
    if (this.art.progress < 1) {
      this.art.progress = Math.min(1, this.art.progress + dt / this.art.duration);
      this.reveal.revealProgress.value = easeInOutCubic(this.art.progress);
      return true;
    }
    return false;
  }

  // ------------------------------------------------------------ layout
  resize() {
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;
    if (!this.width || !this.height) return;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height, false);
    this.canvas.style.width = this.width + "px";
    this.canvas.style.height = this.height + "px";
    this.flowBounds = null;
    this.wake();
  }
  setPixelRatio(ratio) {
    ratio = Math.max(1, Math.min(this.maxPixelRatio, Math.round(ratio * 4) / 4));
    if (ratio === this.pixelRatio) return;
    this.pixelRatio = ratio;
    this.renderer.setPixelRatio(ratio);
    this.renderer.setSize(this.width, this.height, false);
  }
  hit(e) {
    const b = this.canvas.getBoundingClientRect();
    this.pointer.set(((e.clientX - b.left) / b.width) * 2 - 1, 1 - ((e.clientY - b.top) / b.height) * 2);
    this.raycaster.setFromCamera(this.pointer, this.camera);
    if (this.raycaster.intersectObject(this.active, true).length) return this.selection;
    const hit = this.raycaster.intersectObject(this.body)[0];
    if (!hit || hit.instanceId === undefined || hit.instanceId >= this.body.count) return null;
    return { lane: this.cells[hit.instanceId * 2], row: this.cells[hit.instanceId * 2 + 1] };
  }
  projection() {
    const origin = new THREE.Vector3(0, 0, 0).project(this.camera),
      a = new THREE.Vector3(-SPACING, 0, 0).project(this.camera),
      b = new THREE.Vector3(0, 0, -DEPTH).project(this.camera);
    return inverseProjection(
      { x: ((a.x - origin.x) * this.width) / 2, y: (-(a.y - origin.y) * this.height) / 2 },
      { x: ((b.x - origin.x) * this.width) / 2, y: (-(b.y - origin.y) * this.height) / 2 },
    );
  }
  touch() {
    this.lastInput = performance.now();
  }
  bind() {
    this.canvas.addEventListener("pointerdown", (e) => {
      if (this.detailTarget || e.button > 0) return;
      this.canvas.setPointerCapture(e.pointerId);
      this.momentum = null;
      this.touch();
      this.drag = { x: e.clientX, y: e.clientY, lane: this.lane.value, row: this.row.value, inverse: this.projection(), samples: [], moved: false };
      this.wake();
    });
    this.canvas.addEventListener("pointermove", (e) => {
      if (!this.drag) {
        // Hovering keeps the archive breathing; nothing renders while unattended.
        if (!this.detailTarget && performance.now() - this.lastInput > 400) {
          this.touch();
          this.wake();
        }
        return;
      }
      const d = this.drag, dx = e.clientX - d.x, dy = e.clientY - d.y;
      if (Math.hypot(dx, dy) > 8) d.moved = true;
      if (!d.moved || !d.inverse) return;
      this.touch();
      this.lane.value = d.lane + dx * d.inverse.lane.x + dy * d.inverse.lane.y;
      this.row.value = d.row + dx * d.inverse.row.x + dy * d.inverse.row.y;
      this.lane.velocity = this.row.velocity = 0;
      this.targetLane = this.lane.value;
      this.targetRow = this.row.value;
      const now = performance.now();
      d.samples.push({ time: now, lane: this.lane.value, row: this.row.value });
      while (d.samples.length && now - d.samples[0].time > 100) d.samples.shift();
      this.setSelection(Math.round(this.lane.value), Math.round(this.row.value));
      this.wake();
    });
    const finish = (e, cancelled = false) => {
      const d = this.drag;
      if (!d) return;
      this.drag = null;
      if (d.moved) {
        const first = d.samples[0], last = d.samples.at(-1), dt = first && last ? (last.time - first.time) / 1000 : 0;
        const velocity = (axis) => (!cancelled && !this.reduced() && dt > 0.008 && performance.now() - last.time < 90 ? (last[axis] - first[axis]) / dt : 0);
        this.momentum = { lane: new Momentum(this.lane.value, velocity("lane")), row: new Momentum(this.row.value, velocity("row")) };
      } else if (!cancelled) {
        const hit = this.hit(e);
        if (hit) {
          if (hit.lane === this.selection.lane && hit.row === this.selection.row) this.onOpen(this.current);
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
        const horizontal = e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.4;
        wheel += horizontal ? e.deltaX || e.deltaY : e.deltaY;
        if (Math.abs(wheel) > 38) {
          this.navigate(horizontal ? "lane" : "row", Math.sign(wheel));
          wheel = 0;
        }
      },
      { passive: false },
    );
    this.canvas.addEventListener("keydown", (e) => {
      const keys = { ArrowLeft: ["lane", -1], ArrowRight: ["lane", 1], ArrowUp: ["row", -1], ArrowDown: ["row", 1] };
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
      if (document.hidden) this.halt();
      else this.wake();
    });
    this.canvas.addEventListener("webglcontextlost", (e) => {
      e.preventDefault();
      this.lost = true;
      this.halt();
      this.container.dispatchEvent(new Event("scene-lost"));
    });
    this.canvas.addEventListener("webglcontextrestored", () => {
      this.lost = false;
      // three re-uploads geometry and textures lazily; render targets come back empty.
      this.coverAtlas.reset();
      this.art.snapshots.forEach((t) => t?.dispose());
      this.art.snapshots = [];
      for (const texture of this.art.textures) texture.needsUpdate = true;
      if (this.art.progress < 1) {
        this.art.progress = 1;
        this.reveal.revealProgress.value = 1;
      }
      const fallback = this.container.querySelector("#scene-fallback");
      if (fallback) fallback.hidden = true;
      this.container.dispatchEvent(new Event("scene-restored"));
      this.dirty = true;
      this.wake();
    });
  }

  // ------------------------------------------------------------ loop
  wake() {
    this.dirty = true;
    // Input never waits for a capped frame's timeout.
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = 0;
      this.frame ||= requestAnimationFrame((t) => this.tick(t));
    }
    // Inside tick() the loop decides on the next frame itself: a second request here would start a parallel loop
    // that draws the scene again in the same display frame (measured: up to 18 draws per displayed frame before 2026-10-13; atlas uploads call wake() from draw()).
    // Not before the programs are linked: the first draw would wait for them synchronously (a ~100 ms frame, measured).
    if (!this.frame && !this.ticking && !document.hidden && !this.lost && this.compiled && this.columns.length) {
      this.last = performance.now();
      this.frame = requestAnimationFrame((t) => this.tick(t));
    }
  }
  /** Stop the loop (hidden tab, lost context); wake() resumes it. */
  halt() {
    cancelAnimationFrame(this.frame);
    clearTimeout(this.timer);
    this.frame = this.timer = 0;
  }
  /** Next frame: at the next display refresh, or after a timeout when a frame-rate cap leaves several refreshes idle. */
  schedule(delay) {
    if (this.frame || this.timer) return;
    if (delay > 10) {
      this.timer = setTimeout(() => {
        this.timer = 0;
        this.paced = true;
        this.frame ||= requestAnimationFrame((t) => this.tick(t));
      }, delay - 6);
    } else this.frame = requestAnimationFrame((t) => this.tick(t));
  }
  tick(now) {
    this.frame = 0;
    if (document.hidden || this.lost) return;
    this.ticking = true;
    try {
      this.step(now);
    } finally {
      this.ticking = false;
    }
  }
  step(now) {
    // A frame resumed after a cap timeout has a long interval by design: not a slow frame for the governor.
    const paced = this.paced;
    this.paced = false;
    const interval = now - this.last;
    // rAF timestamps are frame-start times and can precede the wake() call: never step backwards.
    const dt = Math.min(Math.max(interval, 0) / 1000, 0.05) * this.timeScale;
    this.last = now;
    // Read once per frame: reduced() consults matchMedia.
    const reduced = (this.isReduced = this.reduced());
    if (!this.drag) {
      if (this.momentum) {
        this.momentum.lane.step(dt);
        this.momentum.row.step(dt);
        this.lane.value = this.momentum.lane.value;
        this.row.value = this.momentum.row.value;
        this.targetLane = Math.round(this.lane.value);
        this.targetRow = Math.round(this.row.value);
        this.setSelection(this.targetLane, this.targetRow);
        if (this.momentum.lane.done && this.momentum.row.done) this.momentum = null;
      } else {
        damp(this.lane, this.targetLane, 6.5, dt);
        damp(this.row, this.targetRow, 7, dt);
      }
    }
    for (let i = this.outgoing.length - 1; i >= 0; i--) {
      const old = this.outgoing[i];
      damp(old.lift, 0, 7, dt);
      if (reduced || Math.abs(old.lift.value) < 0.002) this.outgoing.splice(i, 1);
    }
    damp(this.detail, this.detailTarget, 5.5, dt);
    damp(this.lift, this.detailTarget ? DETAIL_LIFT : PREVIEW_LIFT, 5, dt);
    if (reduced) {
      this.lane.value = this.targetLane;
      this.row.value = this.targetRow;
      this.detail.value = this.detailTarget;
      this.lift.value = this.detailTarget ? DETAIL_LIFT : PREVIEW_LIFT;
      this.lane.velocity = this.row.velocity = this.detail.velocity = this.lift.velocity = 0;
    }
    const settle = (s, target, eps = 0.0008) => {
      if (Math.abs(s.value - target) < eps && Math.abs(s.velocity) < eps * 4) {
        s.value = target;
        s.velocity = 0;
        return false;
      }
      return true;
    };
    let moving = false;
    moving = settle(this.lane, this.targetLane) || moving;
    moving = settle(this.row, this.targetRow) || moving;
    moving = settle(this.detail, this.detailTarget, 0.0004) || moving;
    moving = settle(this.lift, this.detailTarget ? DETAIL_LIFT : PREVIEW_LIFT) || moving;
    moving = moving || !!this.drag || !!this.momentum || this.outgoing.length > 0;
    const revealing = this.advanceArt(dt) || !!this.art.pendingDetail;
    const time = now / 1000;
    const pulsing = !reduced && this.pulses.length > 0 && time - this.pulses[this.pulses.length - 1].time < 3;
    // Breathing only while someone is here and the array is in view (not on the software tier).
    // rAF timestamps can precede the input that woke the loop: clamp, or the first frame reads "no input yet".
    const sinceInput = Math.max(0, now - this.lastInput) / 1000;
    const canBreathe = !reduced && this.quality.breathing && this.detail.value <= 0.6;
    this.breathing = canBreathe ? idleEnvelope(sinceInput) : 0;
    // The envelope starts at 0: keep the loop alive while it rises, or hovering alone would never start breathing.
    const breathingOn = this.breathing > 0.0005 || (canBreathe && sinceInput < 1.2);
    // Covered: the close-up reader fills a narrow screen, or the museum sits over the archive.
    const covered = (this.width < 700 && this.detailTarget === 1 && this.detail.value > 0.98) || document.body.classList.contains("museum-open");
    const tiles = this.coverAtlas.ready.length > 0;
    const animating = moving || revealing || pulsing || breathingOn;
    // Frame-rate caps of the adapter tier; only the idle motion left uses the lower idle cap.
    const fps = moving || revealing || pulsing || tiles ? this.quality.maxFps : this.quality.idleFps || this.quality.maxFps;
    let wait = capDelay(now, this.lastDraw, fps);
    if (!covered && (this.dirty || animating || tiles) && wait <= 1) {
      const t0 = performance.now();
      this.draw(time);
      this.cpuMs = performance.now() - t0;
      this.dirty = false;
      this.lastDraw = now;
      wait = capDelay(now, now, fps);
      if (animating && interval < 250 && !paced) {
        const step = this.governor.sample(interval);
        if (step) this.setPixelRatio(this.pixelRatio + step * 0.25);
      }
    }
    if (!covered && (animating || tiles || this.coverAtlas.pending > 0 || this.dirty)) this.schedule(wait);
    else if (covered && (moving || revealing)) this.schedule(0);
  }
  frameCamera(d) {
    const aspect = this.width / Math.max(1, this.height);
    const mobile = this.width < 700;
    const pose = smooth(d);
    const direction = this.cameraDirection.copy(BROWSE_DIR).lerp(DETAIL_DIR, mobile ? pose * 0.4 : pose).normalize();
    this.cameraRight.crossVectors(this.worldUp, direction).normalize();
    this.cameraUp.crossVectors(direction, this.cameraRight).normalize();
    const browseSpan = mobile ? Math.max(12.5, 10.2 / aspect) : Math.max(10.6, (10.6 * 1.55) / aspect);
    // Landscape phones (wide but at most 520 px tall): the opened card is drawn smaller and keeps its left edge, so the
    // reading column beside it (style.css: 58 % there) gets more than a third of the screen.
    const short = !mobile && this.height <= 520;
    // Otherwise the card takes about 44 % of the width, left of the reading column (style.css: 50 %, 54 % at <= 1100 px);
    // on a portrait tablet that needs a span above 11 (a cap here once let the card run under the text at 768 x 1024), and
    // there the card is drawn a little smaller, clear of the screen's edge, and higher, level with the text. `portrait` is 1
    // up to aspect 0.9 and 0 from 1.3 (every landscape screen keeps its framing).
    const portrait = mobile ? 0 : THREE.MathUtils.clamp((1.3 - aspect) / 0.4, 0, 1);
    const detailSpan = mobile ? browseSpan : short ? 7.6 : Math.max(6.6, THREE.MathUtils.lerp(12.2, 13.4, portrait) / aspect);
    const span = THREE.MathUtils.lerp(browseSpan, detailSpan, pose);
    const px = mobile ? 0.5 : THREE.MathUtils.lerp(0.31, short ? 0.205 : this.width < 1100 ? 0.245 : 0.262, pose);
    const py = mobile ? THREE.MathUtils.lerp(0.36, 0.3, pose) : THREE.MathUtils.lerp(0.47, 0.515 - 0.09 * portrait, pose);
    const anchor = this.cameraAim.set(0, 0.6 + pose * 3.5, 0);
    anchor.addScaledVector(this.cameraRight, (0.5 - px) * span * aspect).addScaledVector(this.cameraUp, (py - 0.5) * span);
    this.camera.position.copy(anchor).addScaledVector(direction, DISTANCE);
    this.camera.up.copy(this.worldUp);
    this.camera.lookAt(anchor);
    this.camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(span / (2 * DISTANCE)));
    this.camera.updateProjectionMatrix();
    this.camera.updateMatrixWorld();
    return pose;
  }
  cellHeight(row, lane, time) {
    let h = 0.95 * Math.exp(-((row - this.row.value) ** 2) / 15) * Math.exp(-((lane - this.lane.value) ** 2) * 0.6);
    if (this.breathing) h += breath(row, lane, time) * this.breathing;
    if (!this.isReduced)
      for (let i = 0; i < this.pulses.length; i++) {
        const p = this.pulses[i];
        h += selectionWave(Math.hypot(row - p.row, (lane - p.lane) * 2.2), time - p.time);
      }
    return h;
  }
  draw(time) {
    const d = this.detail.value;
    const pose = this.frameCamera(d);
    this.projScreen.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse);
    this.frustum.setFromProjectionMatrix(this.projScreen);
    while (this.pulses.length && time - this.pulses[0].time > 3) this.pulses.shift();
    this.coverAtlas.flush(4);
    const centerLane = Math.round(this.lane.value), centerRow = Math.round(this.row.value);
    const matrices = this.instanceMatrix.array;
    const colors = this.body.instanceColor.array;
    const covers = this.coverUV.array;
    const infos = this.coverInfo.array;
    const tile = this.tileOut;
    const laneCount = this.columns.length;
    let n = 0;
    for (let l = -HALF_LANES; l <= HALF_LANES; l++)
      for (let r = -HALF_ROWS; r <= HALF_ROWS; r++) {
        const lane = centerLane + l, row = centerRow + r;
        if (lane === this.selection.lane && row === this.selection.row) continue;
        let extra = 0;
        for (let i = 0; i < this.outgoing.length; i++) if (this.outgoing[i].lane === lane && this.outgoing[i].row === row) extra = this.outgoing[i].lift.value;
        const x = (lane - this.lane.value) * SPACING, z = (row - this.row.value) * DEPTH;
        const y = this.cellHeight(row, lane, time) + extra;
        tmpSphere.center.set(x, y, z);
        if (!this.frustum.intersectsSphere(tmpSphere)) continue;
        const o = n * 16;
        matrices[o] = 1; matrices[o + 1] = 0; matrices[o + 2] = 0; matrices[o + 3] = 0;
        matrices[o + 4] = 0; matrices[o + 5] = 1; matrices[o + 6] = 0; matrices[o + 7] = 0;
        matrices[o + 8] = 0; matrices[o + 9] = 0; matrices[o + 10] = 1; matrices[o + 11] = 0;
        matrices[o + 12] = x; matrices[o + 13] = y; matrices[o + 14] = z; matrices[o + 15] = 1;
        const tintIndex = wrap(lane, laneCount) % 8;
        tmpColor.copy(this.tintUniform.value[tintIndex]);
        if (extra > 0) tmpColor.lerp(HIGHLIGHT, Math.min(1, extra / PREVIEW_LIFT));
        colors[n * 3] = tmpColor.r; colors[n * 3 + 1] = tmpColor.g; colors[n * 3 + 2] = tmpColor.b;
        const story = this.storyAt(lane, row);
        const near = Math.abs(l) <= 2 && r >= -4 && r <= 3;
        const cover = this.cover(story, lane);
        this.coverAtlas.get(cover.key, cover.source, near, tile);
        covers[n * 4] = tile[0]; covers[n * 4 + 1] = tile[1]; covers[n * 4 + 2] = tile[2]; covers[n * 4 + 3] = tile[3];
        const dl = lane - this.lane.value, dr = row - this.row.value;
        infos[n * 3] = tile[4]; infos[n * 3 + 1] = tintIndex; infos[n * 3 + 2] = Math.exp(-dl * dl * 0.3 - dr * dr * 0.01);
        this.cells[n * 2] = lane;
        this.cells[n * 2 + 1] = row;
        n++;
      }
    this.body.count = this.faces.count = n;
    for (const [attribute, size] of [[this.instanceMatrix, 16], [this.body.instanceColor, 3], [this.coverUV, 4], [this.coverInfo, 3]]) {
      attribute.clearUpdateRanges();
      attribute.addUpdateRange(0, Math.max(1, n) * size);
      attribute.needsUpdate = true;
    }
    this.visibleInstances = n;
    // The extracted card: lifts in place, then turns to face the camera.
    this.refreshActiveCover();
    const sel = this.selection;
    this.active.position.set(
      (sel.lane - this.lane.value) * SPACING,
      this.lift.value + this.cellHeight(sel.row, sel.lane, time) * (1 - d),
      (sel.row - this.row.value) * DEPTH,
    );
    const turn = smooth((d - 0.15) / 0.8);
    this.active.quaternion.identity().slerp(this.camera.quaternion, turn);
    this.active.scale.setScalar(1 + 0.12 * turn);
    this.active.position.addScaledVector(this.cameraDirection, 2.5 * turn);
    tmpColor.copy(this.tintUniform.value[wrap(sel.lane, laneCount) % 8]).lerp(HIGHLIGHT, Math.min(1, Math.max(0, this.lift.value) / PREVIEW_LIFT));
    this.activeBodyMaterial.color.copy(tmpColor);
    this.activeFrame.material.opacity = 0.35 + 0.45 * Math.min(1, this.lift.value / PREVIEW_LIFT);
    this.updateFlowBounds(d);
    if (d > 0.02) {
      // Mip level for the chapter face from its projected width (no shader derivatives).
      this.active.updateMatrixWorld(true);
      const [a, b] = this.corner;
      a.set(-FACE_W / 2, 0, FACE_Z).applyMatrix4(this.active.matrixWorld).project(this.camera);
      b.set(FACE_W / 2, 0, FACE_Z).applyMatrix4(this.active.matrixWorld).project(this.camera);
      const px = ((Math.abs(b.x - a.x) * this.width) / 2) * this.pixelRatio;
      this.reveal.faceLod.value = px > 1 ? Math.max(0, Math.log2(FACE_PX.w / px)) : 0;
    }
    this.scene.fog.near = DISTANCE - 4 - pose * 2;
    this.scene.fog.far = DISTANCE + 40;
    this.gpuTimer?.begin();
    this.renderer.render(this.scene, this.camera);
    this.gpuTimer?.end();
    this.framesDrawn++;
  }
  setFlowReady(ready) {
    this.flowElement ??= document.querySelector("#flow-surface");
    if (!this.flowElement || this.flowReady === ready) return;
    this.flowReady = ready;
    this.flowElement.classList.toggle("card-ready", ready);
  }
  /** Map overlay follows the card once it rests (one layout write, not one per frame). */
  updateFlowBounds(d) {
    this.flowElement ??= document.querySelector("#flow-surface");
    const el = this.flowElement;
    if (!el) return;
    const settled = this.detailTarget === 1 && d > 0.985 && this.width >= 700;
    if (!settled) {
      if (this.detailTarget === 0) this.setFlowReady(false);
      return;
    }
    this.active.updateMatrixWorld(true);
    const [a, b] = this.corner;
    a.set(-FACE_W / 2, FACE_H / 2, FACE_Z).applyMatrix4(this.active.matrixWorld).project(this.camera);
    b.set(FACE_W / 2, -FACE_H / 2, FACE_Z).applyMatrix4(this.active.matrixWorld).project(this.camera);
    const rect = this.canvas.getBoundingClientRect();
    const left = Math.round(rect.left + ((a.x + 1) * this.width) / 2);
    const top = Math.round(rect.top + ((1 - a.y) * this.height) / 2);
    const width = Math.round(((b.x - a.x) * this.width) / 2);
    const height = Math.round(((a.y - b.y) * this.height) / 2);
    const signature = `${left},${top},${width},${height}`;
    if (signature !== this.flowBounds) {
      this.flowBounds = signature;
      // On the reader root so the map and the card caption both follow the card.
      const host = el.parentElement || el;
      host.style.setProperty("--card-left", left + "px");
      host.style.setProperty("--card-top", top + "px");
      host.style.setProperty("--card-width", width + "px");
      host.style.setProperty("--card-height", height + "px");
      host.style.setProperty("--card-band", (INSET_Y + BAND_H).toFixed(4));
    }
    this.setFlowReady(d > 0.995 || this.reduced());
  }

  // ------------------------------------------------------------ instrumentation
  /** GPU time per frame via EXT_disjoint_timer_query_webgl2, when the browser exposes it. */
  enableGpuTiming() {
    if (this.gpuTimer) return !!this.gpuTimer.ext;
    const gl = this.renderer.getContext();
    const ext = gl.getExtension("EXT_disjoint_timer_query_webgl2");
    const samples = [];
    const pending = [];
    let active = null;
    this.gpuTimer = {
      ext,
      samples,
      begin() {
        if (!ext || active) return;
        active = gl.createQuery();
        gl.beginQuery(ext.TIME_ELAPSED_EXT, active);
      },
      end() {
        if (!ext || !active) return;
        gl.endQuery(ext.TIME_ELAPSED_EXT);
        pending.push({ query: active, at: performance.now() });
        active = null;
        for (let i = pending.length - 1; i >= 0; i--) {
          const { query, at } = pending[i];
          if (!gl.getQueryParameter(query, gl.QUERY_RESULT_AVAILABLE)) continue;
          if (!gl.getParameter(ext.GPU_DISJOINT_EXT)) samples.push({ at, ms: gl.getQueryParameter(query, gl.QUERY_RESULT) / 1e6 });
          gl.deleteQuery(query);
          pending.splice(i, 1);
        }
        if (samples.length > 4000) samples.splice(0, samples.length - 4000);
      },
    };
    return !!ext;
  }
  diagnostics() {
    const info = this.renderer.info;
    return {
      lane: this.selection.lane,
      row: this.selection.row,
      story: this.current.id,
      detail: this.detail.value,
      selectedY: this.active.position.y,
      coverReveal: this.reveal.revealProgress.value,
      artTransition: this.art.progress,
      imageCovers: this.coverAtlas.loaded,
      atlas: this.coverAtlas.stats(),
      closeup: this.detail.value > 0.95,
      outgoing: this.outgoing.length,
      breathing: this.breathing > 0,
      instances: LANES * ROWS,
      visibleInstances: this.visibleInstances,
      drawCalls: info.render.calls,
      triangles: info.render.triangles,
      textureCount: info.memory.textures,
      geometries: info.memory.geometries,
      framePending: !!this.frame || !!this.timer,
      framesDrawn: this.framesDrawn,
      pixelRatio: this.pixelRatio,
      maxPixelRatio: this.maxPixelRatio,
      antialias: this.renderer.getContextAttributes()?.antialias,
      cpuMs: this.cpuMs,
      // Adapter, its kind (discrete / integrated / software / …) and the rendering tier chosen for it (src/gpu.js).
      gpu: this.gpu,
      tier: this.quality.name,
      gpuTiming: this.gpuTimer ? !!this.gpuTimer.ext : undefined,
    };
  }
}

function makeCanvas() {
  const canvas = document.createElement("canvas");
  canvas.width = FACE_PX.w;
  canvas.height = FACE_PX.h;
  return canvas;
}
