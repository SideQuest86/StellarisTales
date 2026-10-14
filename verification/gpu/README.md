# GPU selection and rendering efficiency (2026-10-13)

Machine: Windows 11 laptop, Intel(R) Graphics (0x7D67, drives the built-in display) + NVIDIA GeForce RTX 5070 Laptop GPU,
Chrome 155 / Edge (Chromium). Display refresh 170 Hz, devicePixelRatio 1 in the measured windows.

## Which adapter a page gets (adapter-selection.json, probe-adapter.mjs, probe-flags-page.mjs)

| Launch | WebGL (default / low-power / high-performance) | WebGPU adapter |
| --- | --- | --- |
| Chrome, no flags (headed or headless) | Intel for all three | intel / xe-lpg for all |
| Chrome `--force-high-performance-gpu` (headed or headless) | RTX 5070 for all three | nvidia / blackwell |
| Chrome `--use-angle=d3d11` / `d3d11on12` / `gl` | Intel | Intel / none |
| Chrome `--use-angle=vulkan` | RTX 5070 (ANGLE Vulkan) | none |
| Chrome `--use-webgpu-power-preference=force-high-performance` | Intel | none |
| Edge, no flags / `--force-high-performance-gpu` | Intel / RTX 5070 | Intel / NVIDIA |
| Chrome and Edge, `chrome://flags/#force-high-performance-gpu` (`edge://flags/…`) set to Enabled, then relaunch | Intel → RTX 5070 | – |

- `powerPreference` is ignored on this machine: the browser's GPU process uses one adapter for every context, WebGL and
  WebGPU alike (chrome://gpu: GPU0 Intel *ACTIVE*, GPU1 NVIDIA, "Optimus: false", "Has Discrete GPU: yes").
- A page therefore cannot switch to the RTX. It can only detect where it landed and adapt (src/gpu.js).
- What switches the browser: `--force-high-performance-gpu`, the chrome/edge flag above (verified by toggling it on the
  flags page and relaunching), ANGLE's Vulkan backend (not offered in chrome://flags here: "Choose ANGLE graphics
  backend" lists only Default / D3D11 / D3D11 WARP). The Windows per-app setting (Settings → System → Display →
  Graphics → app → GPU preference "High performance", stored under `HKCU\Software\Microsoft\DirectX\UserGpuPreferences`)
  is the documented OS route; it was **not** tested because it changes system settings. No entry exists today for
  chrome.exe, msedge.exe or claude.exe.
- The Claude desktop app's GPU process (claude.exe `--type=gpu-process`) was observed rendering on the Intel adapter
  (LUID 0x1a56e) at ~15 % 3D load, matching the reported "ANGLE (Intel …)" app pane.

## What changed

- `src/gpu.js` (new): probes the adapter once (1×1 context, `failIfMajorPerformanceCaveat` first → software detection,
  context released at once), classifies it (discrete / integrated / software / apple / mobile / unknown) and picks a tier;
  `createRenderer()` / `pixelRatioFor()` are used by the archive scene and the museum viewer. `?gpu=integrated|software|
  discrete` fakes the classification. The probe costs ~3–5 ms net: the first WebGL context of a page pays ~55–60 ms for
  GPU-channel setup either way (probe or renderer).
- Tiers: **high** (discrete, Apple, mobile, unknown) = unchanged quality. **low** (integrated) = pixel ratio ≤ 1.5, no
  MSAA, scene motion ≤ 60 fps, idle breathing ≤ 30 fps. **minimal** (software) = ratio 1, no MSAA, ≤ 30 fps, no breathing.
- Archive render loop (`src/archive-scene.js`): **fixed duplicate render loops** — `wake()` called during a frame (cover
  atlas uploads from `draw()`) started a second rAF chain, so the scene was drawn up to 18× per displayed frame on both
  GPUs. Frame caps use a timeout between capped frames (no wake-ups every refresh). The museum overlay counts as covering
  the archive (no frames while open; it wakes on close). Hidden pages stop the loop and the cap timer. Hover now starts the
  idle breathing as the code intended (the first frame's rAF timestamp preceded the input, so it never started from hover
  alone); it still fades after ~10.6 s and respects reduced motion.
- Graphics notice (`showAdapterHint`, text in `src/i18n.js`, style in `src/style.css`): two-line, top right, collapsed by
  default; steps open in a `<details>`. Shown only for integrated adapters on Windows and software rendering in
  Chrome/Edge; hidden while the reader or museum is open; × or Escape dismisses, remembered in `localStorage`
  (`st-gpu-hint`, wrapped in try/catch).

## Measurements (before-*.json / after-*.json, before-after.md)

`scripts/verify-ui-perf.mjs`, headed Chrome, window on the left monitor; `STELLARIS_GPU=integrated` drops
`--force-high-performance-gpu`. Before = original sources served from a copy, after = this change, same session.

Integrated GPU (Intel) — clean:

| step | scene draws per displayed frame | scene GPU busy | rAF p50/p95 ms | frames > 25 ms |
| --- | --- | --- | --- | --- |
| keyboard scroll | 4.86 → 0.36 | 80 % → 51 % | 12/47 → 5.9/11.8 | 38 → 1 |
| drag + momentum | 15.25 → 0.33 | 87 % → 18 % | 58.8/82.3 → 5.9/6 | 55 → 0 |
| open story | 17 → 0.34 | 69 % → 22 % | 88/276 → 5.9/6 | 16 → 4 |
| chapter change | 17.7 → 0.34 | 59 % → 23 % | 106/294 → 5.9/6 | 12 → 2 |
| map pan + zoom | 2.76 → 0.32 | 55 % → 22 % | 5.9/117 → 5.9/6 | 34 → 0 |
| close story | 1 → 0.33 | 68 % → 19 % | 17.6/29.5 → 5.9/6 | 11 → 0 |
| hover breathing | did not start → 34 fps | 0 → 29 % | 5.9/6 both | 0 |

Discrete GPU (RTX 5070): draws per displayed frame 2.4–16 → 1.0 in every step. Frame timings and GPU ms of both
discrete runs are **disturbed**: a Hunyuan3D model-generation job held the RTX at ~100 % (7.7 GB) throughout, giving
multi-hundred-ms rAF gaps in either version; they are not quality evidence. The first baseline run of the session
(same script, possibly before the job started) showed the same pattern: 4.8–11 draws per frame at ~0.3 ms each.
Re-measure the discrete path with `verify-ui-perf.mjs` once the GPU is free.

## Functional checks (verify-gpu.json, scripts/verify-gpu.mjs) — 62/62 pass

| run | adapter | tier | idle frames / 2 s | breathing fps | motion fps | hidden / museum frames | notice |
| --- | --- | --- | --- | --- | --- | --- | --- |
| discrete | RTX 5070 | high | 0 | 170 | ~168 | 0 / 0 | none |
| integrated | Intel | low | 0 | 34 | ~57 | 0 / 0 | shown |
| ?gpu=integrated | RTX 5070 | low | 0 | 34 | ~57 | 0 / 0 | shown |
| ?gpu=software | RTX 5070 | minimal | 0 | 0 | ~34 | 0 / 0 | shown (software text) |

Also checked: zh ⇄ en switch of the notice, hidden in the reader, Escape and × dismiss, dismissal survives reload, fits
390 px below the category row, reduced motion → no breathing, archive redraws after the museum closes, MSAA off on the
low tier for both archive and museum viewer (museum-viewer.json, `check-museum-viewer.mjs`), no page errors. Hidden-page
state is emulated in the page (`document.hidden` + `visibilitychange`): Chrome launched by Playwright keeps minimised
windows visible. Known unrelated 404: the museum floor image resolves to `src/museum/ui/…` (museum.css custom property).

Screenshots: `hint-*-collapsed.png`, `hint-*-zh.png`, `hint-*-en.png`, `hint-*-390*.png`, `museum-*.png`.
