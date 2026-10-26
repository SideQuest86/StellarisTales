// GPU adapter detection and rendering tiers, shared by every WebGL renderer on the site.
// A page cannot pick the physical GPU. Chrome and Edge on Windows run all WebGL and WebGPU work on the one adapter
// their GPU process chose at start-up, whatever powerPreference a context asks for (measured on a hybrid
// Intel + RTX 5070 laptop: verification/gpu/README.md). So renderers still ask for "high-performance" (honoured by
// other browsers and dual-GPU Macs), read which adapter they actually got, and adapt: integrated and software
// adapters get a cheaper tier, and on Windows a dismissible hint explains how to move the browser to the discrete GPU.

// Rendering tiers. maxFps / idleFps 0 = display refresh rate; idleFps applies when only the idle motion animates.
export const TIERS = {
  // Discrete, Apple, mobile or unidentified adapters: unchanged quality.
  high: { name: "high", maxPixelRatio: 2, antialias: true, maxFps: 0, idleFps: 0, breathing: true },
  // Integrated desktop GPU: ≤ 1.5× resolution, no MSAA, motion ≤ 60 fps, idle motion ≤ 30 fps.
  low: { name: "low", maxPixelRatio: 1.5, antialias: false, maxFps: 60, idleFps: 30, breathing: true },
  // Software rasteriser (SwiftShader, WARP, llvmpipe): 1×, no MSAA, ≤ 30 fps, no idle motion.
  minimal: { name: "minimal", maxPixelRatio: 1, antialias: false, maxFps: 30, idleFps: 30, breathing: false },
};
const TIER_OF_KIND = { discrete: "high", apple: "high", mobile: "high", unknown: "high", integrated: "low", software: "minimal", none: "minimal" };

/** Classify an adapter from its WebGL vendor/renderer strings (WEBGL_debug_renderer_info or the masked fallback). */
export function classifyAdapter(renderer = "", vendor = "") {
  const r = String(renderer), all = `${vendor} ${r}`;
  if (/swiftshader|llvmpipe|softpipe|software|basic render driver|\bwarp\b/i.test(all)) return "software";
  if (/adreno|mali|powervr|immortalis|xclipse|videocore|tegra/i.test(all)) return "mobile";
  if (/nvidia|geforce|quadro|\brtx\b|tesla/i.test(r)) return "discrete";
  if (/radeon|\bamd\b|ati technologies/i.test(r)) {
    // APUs: "AMD Radeon(TM) Graphics", "Radeon 780M", "Radeon(TM) Vega 8 Graphics", "Radeon RX Vega 10 Graphics".
    if (/radeon(\(tm\))? (graphics|\d{3}m\b|vega \d+ graphics|rx vega \d+)/i.test(r)) return "integrated";
    if (/\brx\s?\d{3,4}|radeon pro|firepro|radeon (hd|r[579]) \d|radeon vii/i.test(r)) return "discrete";
    return "unknown";
  }
  if (/intel/i.test(r)) {
    // Arc A/B-series cards and Iris Xe MAX are discrete; UHD, Iris, "Intel(R) Graphics" and "Arc(TM) Graphics" are not.
    return /arc(\(tm\))? [ab]\d{3}|iris(\(r\))? xe max/i.test(r) ? "discrete" : "integrated";
  }
  if (/apple/i.test(all)) return "apple";
  return "unknown";
}

/** Short adapter name for people: "ANGLE (Intel, Intel(R) Graphics (0x00007D67) Direct3D11 …, D3D11)" → "Intel(R) Graphics". */
export function adapterName(renderer = "") {
  let s = String(renderer);
  if (s.startsWith("ANGLE (")) {
    const parts = s.slice(7, -1).split(", ");
    if (parts.length >= 3) s = parts.slice(1, -1).join(", ");
  }
  return s.replace(/\s*\(0x[0-9a-f]+\)/gi, "").replace(/\s+(Direct3D|OpenGL|vs_\d).*$/i, "").trim();
}

function readRenderer(gl) {
  const debug = gl.getExtension("WEBGL_debug_renderer_info");
  return {
    vendor: String(gl.getParameter(debug ? debug.UNMASKED_VENDOR_WEBGL : gl.VENDOR) || ""),
    renderer: String(gl.getParameter(debug ? debug.UNMASKED_RENDERER_WEBGL : gl.RENDERER) || ""),
  };
}

let detected = null;
/**
 * Which adapter this page renders on, probed once with a throwaway 1×1 context (released at once) so renderers can
 * pick their context attributes (MSAA) before creating the real one. `?gpu=integrated|software|discrete` fakes the
 * classification for testing the tiers and the hint.
 */
export function detectAdapter() {
  if (detected) return detected;
  const t0 = performance.now();
  const probe = (attributes) => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const options = { powerPreference: "high-performance", antialias: false, depth: false, stencil: false, ...attributes };
    return canvas.getContext("webgl2", options) || canvas.getContext("webgl", options);
  };
  let info = { vendor: "", renderer: "" }, caveat = false, gl = null;
  try {
    // A major performance caveat (software rendering) makes this first request fail.
    gl = probe({ failIfMajorPerformanceCaveat: true });
    if (!gl) {
      caveat = true;
      gl = probe({});
    }
    if (gl) {
      info = readRenderer(gl);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    }
  } catch {}
  let kind = !gl ? "none" : caveat ? "software" : classifyAdapter(info.renderer, info.vendor);
  let forced = null;
  try {
    forced = new URLSearchParams(location.search).get("gpu");
  } catch {}
  if (forced && TIER_OF_KIND[forced]) kind = forced;
  else forced = null;
  const tier = TIER_OF_KIND[kind];
  detected = { ...info, name: adapterName(info.renderer), kind, tier, caveat, forced, probeMs: +(performance.now() - t0).toFixed(1), settings: TIERS[tier] };
  return detected;
}

/** Device pixel ratio capped by the tier (and by `cap`, a renderer's own limit). */
export function pixelRatioFor(gpu, cap = 2) {
  return Math.min(devicePixelRatio || 1, cap, gpu.settings.maxPixelRatio);
}

/**
 * A THREE.WebGLRenderer on the high-performance adapter with tier-dependent MSAA. `antialias` is the renderer's own
 * wish; the tier may turn it off. Returns the renderer and the adapter info (renderer string read from the real
 * context, which is the adapter that actually draws).
 */
export function createRenderer(THREE, { antialias = true, ...parameters } = {}) {
  const gpu = detectAdapter();
  const renderer = new THREE.WebGLRenderer({
    ...parameters,
    antialias: antialias && gpu.settings.antialias,
    powerPreference: "high-performance",
  });
  try {
    const actual = readRenderer(renderer.getContext());
    if (actual.renderer && actual.renderer !== gpu.renderer) Object.assign(gpu, actual, { name: adapterName(actual.renderer) });
  } catch {}
  return { renderer, gpu };
}

// ------------------------------------------------------------ hint
const HINT_KEY = "st-gpu-hint"; // "dismissed" (× / Escape: never again)
/**
 * Dismissible notice when the page draws on an integrated (Windows) or software adapter. Steps are shown only where
 * they apply: the Windows graphics setting on Windows, the browser flag in Chrome and Edge (not in embedded apps).
 * Text comes from i18n.js via data-i18n, so a language switch updates it. Dismissal is remembered.
 * The notice is advice, not content: it appears as a small "i" chip whose tooltip is its title and whose click opens it,
 * so on the most common laptops the archive's first words are the stories', not a technical notice.
 */
export function showAdapterHint(gpu, { t, parent = document.body, delay = 1200 } = {}) {
  if (!gpu || (gpu.kind !== "integrated" && gpu.kind !== "software")) return null;
  let stored = "";
  try {
    stored = localStorage.getItem(HINT_KEY) || "";
  } catch {}
  if (stored === "dismissed") return null;
  const ua = navigator.userAgent;
  const windows = /Windows/.test(navigator.userAgentData?.platform || ua);
  const chromium = /Chrome\//.test(ua) && !/Electron\//.test(ua);
  const edge = /Edg\//.test(ua);
  const integrated = gpu.kind === "integrated";
  // On other systems a browser that got the integrated GPU for a high-performance request has no switch to offer.
  if (integrated ? !windows : !chromium) return null;
  const hint = document.createElement("aside");
  hint.id = "gpu-hint";
  hint.className = "gpu-hint";
  hint.setAttribute("data-i18n-aria", "gpu.label");
  hint.setAttribute("aria-label", t("gpu.label"));
  const flag = `${edge ? "edge" : "chrome"}://flags/#force-high-performance-gpu`;
  const text = (key, tag = "span") => `<${tag} data-i18n="${key}">${t(key)}</${tag}>`;
  const titleKey = integrated ? "gpu.title" : "gpu.softwareTitle";
  // Collapsed to two lines (title + disclosure) so it never covers the selected story; the steps open on demand. The chip
  // (shown only in the collapsed state, CSS) is the notice's small form.
  hint.innerHTML = `
    <button type="button" class="gpu-hint-chip" aria-expanded="false" data-i18n-aria="gpu.label" aria-label="${t("gpu.label")}" data-i18n-title="${titleKey}" title="${t(titleKey)}"><span aria-hidden="true">i</span></button>
    <div class="gpu-hint-head">${text(titleKey, "strong")}
      <button type="button" class="gpu-hint-close" data-i18n-aria="gpu.close" aria-label="${t("gpu.close")}">×</button></div>
    <details><summary>${text(integrated ? "gpu.more" : "gpu.softwareMore")}</summary>
      <small class="gpu-hint-adapter"></small>
      ${text(integrated ? "gpu.body" : "gpu.softwareBody", "p")}
      ${integrated ? `<ol>${windows ? `<li>${text("gpu.windows")}</li>` : ""}${chromium ? `<li>${text("gpu.flag")} <code></code></li>` : ""}</ol>` : ""}
    </details>`;
  hint.querySelector(".gpu-hint-adapter").textContent = gpu.name || gpu.renderer;
  const code = hint.querySelector("code");
  if (code) code.textContent = flag;
  const close = () => {
    try {
      localStorage.setItem(HINT_KEY, "dismissed");
    } catch {}
    const focused = hint.contains(document.activeElement);
    hint.remove();
    if (focused) document.querySelector("#scene canvas")?.focus({ preventScroll: true });
  };
  hint.querySelector(".gpu-hint-close").addEventListener("click", close);
  hint.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      close();
    }
  });
  // Card <-> chip: fade out, swap the form while it is invisible, fade in (opacity only, like the notice's own entrance).
  const chip = hint.querySelector(".gpu-hint-chip");
  let timer = 0;
  const swap = (toChip, { focus = false } = {}) => {
    clearTimeout(timer);
    hint.classList.remove("show");
    timer = setTimeout(() => {
      if (!hint.isConnected) return;
      hint.classList.toggle("is-chip", toChip);
      chip.setAttribute("aria-expanded", String(!toChip));
      requestAnimationFrame(() => hint.classList.add("show"));
      if (focus) hint.querySelector("summary")?.focus({ preventScroll: true });
    }, 200);
  };
  chip.addEventListener("click", () => swap(false, { focus: true }));
  hint.classList.add("is-chip");
  // Wording set while the notice waited to be shown follows a language switch made in the meantime.
  const relabel = () => {
    hint.setAttribute("aria-label", t("gpu.label"));
    for (const el of hint.querySelectorAll("[data-i18n]")) el.textContent = t(el.dataset.i18n);
    for (const el of hint.querySelectorAll("[data-i18n-aria]")) el.setAttribute("aria-label", t(el.dataset.i18nAria));
    for (const el of hint.querySelectorAll("[data-i18n-title]")) el.setAttribute("title", t(el.dataset.i18nTitle));
  };
  // After the first frames: the notice never competes with the archive's first paint.
  setTimeout(() => {
    relabel();
    parent.append(hint);
    requestAnimationFrame(() => hint.classList.add("show"));
  }, delay);
  return hint;
}
