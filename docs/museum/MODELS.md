# Museum 3D models — generation workflow

The museum's 3D models are **unofficial interpretations** generated from each specimen's original game icon
(100×100 px, `gfx/interface/icons/specimens/*.dds`). The game ships no 3D model for any specimen. Unseen surfaces are
inferred, not canonical; the viewer and the manifest say so. The user authorised generated reconstructions for this
feature only (2026-10-14); all other site art stays original.

## Locations

| What | Where |
| --- | --- |
| Models (GLB, JPEG texture, PBR material) | `public/museum/models/<key>.glb` |
| Provenance + settings per model | `public/museum/models/manifest.json` |
| Inputs actually fed to the generator | `verification/museum/inputs/<key>-x4.png` (v2), `<key>.png` (v1) |
| Visual inspection | `verification/museum/contact-sheet.png` (icon + 4 viewer angles per model), `verification/museum/shots/` |
| Tool environment (outside the repo) | `D:/Saving/Living/CodexProjects/st-tools/` — `venv/` (Python 3.12, torch 2.11 cu128, ~5 GB), `hunyuan3d/` (code), `hy3dgen-models/` (only the weights v3 loads: Hunyuan3D-2mv `hunyuan3d-dit-v2-mv` and Hunyuan3D-2 `hunyuan3d-vae-v2-0-turbo`, config + `.fp16.safetensors`, ~5.1 GB; the generator sets `HY3DGEN_MODELS` to it), `hf/` (Hugging Face cache: Zero123++ ~5.3 GB), `weights/RealESRGAN_x4plus.pth`, `gltfpack/`, `triposr/` (v1 code) |
| Storage note (2026-10-14) | Unused weights deleted at the user's request (44.5 GB: Hunyuan3D-2 full DiT, Hunyuan3D-2mini, TripoSR, DINO, duplicate checkpoint formats). Running v1 (TripoSR), single-view v2 or `--hq` again re-downloads their weights. |

## Pipelines

**v3 (current, user-chosen for quality)** — `scripts/museum/novel-views.py` then `generate-models-v2.py --mv`
1. Same Real-ESRGAN x4 input (`verification/museum/inputs/<key>-x4.png`).
2. Zero123++ v1.2 (`sudo-ai/zero123plus-v1.2`, Apache-2.0; custom pipeline code `sudo-ai/zero123plus-pipeline`
   reviewed before use, copied to `st-tools/zero123plus_pipeline.py`) synthesizes 6 views (azimuth 30…330°,
   elevation +20/−10) → `verification/museum/views/<key>-<az>.png` (grey background removed) and `<key>-grid.png`.
3. Hunyuan3D-2mv (`tencent/Hunyuan3D-2mv`, `hunyuan3d-dit-v2-mv`, 50 steps, octree 380) from front = icon,
   left = az 90, back = az 210, right = az 270 (map "a", chosen visually on the altar test); 40k triangles.
4. Texture 2048²: front from the original icon (weight 4), sides/back from the six synthesized views by facing weight;
   the rotation sense of the views is chosen by silhouette fit. Manifest `pipeline: "v3"`, `settings.viewsIoU`.
   Synthesized views are AI guesses of unseen sides — still non-canonical.
   Run: `novel-views.py --all` then `generate-models-v2.py --all --mv --skip-existing` (resumable, rarest first).

**v2 (single view)** — `scripts/museum/generate-models-v2.py`
1. Real-ESRGAN x4plus (BSD-3, `RealESRGAN_x4plus.pth` from github.com/xinntao/Real-ESRGAN, run via `spandrel`)
   upscales the icon 100 → 400 px; alpha by Lanczos.
2. Hunyuan3D-2mini shape (`tencent/Hunyuan3D-2mini`, subfolder `hunyuan3d-dit-v2-mini`, 30 steps, octree 256,
   seed 2026, FlashVDM decoding with the repo's turbo VAE). Licence: Tencent Hunyuan 3D 2.0 community licence —
   non-commercial; not licensed for use in the EU, UK or South Korea. Floaters/degenerate faces removed, reduced to
   24k triangles.
3. Automatic view alignment: silhouettes along ±X/±Y/±Z (and mirrored) against the icon alpha (IoU); the best view
   becomes the projection axis and is rotated to +X (the viewer's opening view).
4. Texture: xatlas UV atlas (1024²); each texel samples the upscaled icon by projection along the view. Faces turned
   away get the same projection dimmed — a guess, labelled as such. JPEG q86 inside the GLB.

**v1 (superseded)** — `scripts/museum/generate-models.py`: TripoSR (stabilityai/TripoSR, MIT) with baked radiance
colour. Patches in the tool copy: PyMCubes instead of torchmcubes (no CUDA build toolchain), lazy rembg import,
texture query on the model's device. Rejected by the user for low resolution and weak shapes.

## Commands

```powershell
$env:HF_HOME = 'D:/Saving/Living/CodexProjects/st-tools/hf'
$env:PYTHONUNBUFFERED = '1'
D:/Saving/Living/CodexProjects/st-tools/venv/Scripts/python.exe scripts/museum/generate-models-v2.py <key> ...
D:/Saving/Living/CodexProjects/st-tools/venv/Scripts/python.exe scripts/museum/generate-models-v2.py --all --skip-existing
node scripts/verify-museum.mjs            # browser check + 4 viewer angles per model (STELLARIS_WINDOW_POSITION=-1900,20 puts the window on the left monitor)
python scripts/museum/contact-sheet.py    # verification/museum/contact-sheet.png
```

All generation is local on the RTX 5070 (8 GB); no paid service is used. Timing: ~40–140 s per specimen depending
on GPU contention (the diffusion step slows ~30× when another process uses the GPU).

## Coverage (2026-10-14)

All 258 specimens: pipeline v3, 40k triangles, ~0.73 MB each (187 MB total). Inspected on
`verification/museum/review-1..6.png` (icon, opening view, opposite side). Silhouette IoU of the chosen view against
the icon: p10 0.66, median 0.83, p90 0.93; below 0.5: black_needle_ceremonial_sword (0.38), massive_metatarsal,
yuht_audio_console, crystal_nest_fragments — still recognisable, candidates for a re-run with another seed. Thin flat
items (maps, blueprints, panels) open edge-on in the viewer.

## Viewer and re-run (2026-10-16)

- Opening view (`src/museum-view.js`): a manifest entry may carry `"view": {"azimuth", "elevation", "distance"}`
  (degrees; azimuth 0 = the icon side +X). Without it, a model whose thinnest extent is under 0.3 of its longest faces
  the camera along that axis; all others keep the three-quarter view. Every model's extents and opening view:
  `verification/museum/opening-views.json` (43 flat: 41 thin along X, 2 along Z — kuurian_cybrex_blueprints and
  star_mall_map, which opened edge-on and now open face-on; screenshots `verification/museum/opening/`). No model
  needed a manual `view`. Reset button / `0` key return to the opening view. Check: `node scripts/verify-museum-viewer.mjs`.
- Weakest matches re-inspected (icon + four turns): black_needle_ceremonial_sword, massive_metatarsal and
  crystal_nest_fragments read correctly (their low IoU comes from thin or diagonal silhouettes). yuht_audio_console
  (hologram over a console) was re-generated with `--candidate --seed 7 / 1234 / 99` (outputs in
  `verification/museum/candidates/`, not shipped): IoU 0.446 / 0.443 / 0.436 vs 0.441 shipped, visually the same slab
  for 7 and 1234 and worse for 99 — no benefit, so the shipped model stays. `generate-models-v2.py` now takes `--seed`
  and `--candidate` (writes only to verification/, manifest untouched).
- Second pass, same day: seeds 7 / 1234 for the other three and `--mvmap b` for yuht_audio_console. Silhouette IoU
  (shipped → candidates): black_needle_ceremonial_sword 0.38 → 0.329 / 0.392; massive_metatarsal 0.396 → 0.377 /
  **0.442**; crystal_nest_fragments 0.483 → 0.433 / 0.492; yuht_audio_console 0.441 → 0.446 (map b). Visual
  comparison (icon + four turns, shipped row above candidate row): `verification/museum/rerun-2026-10-16.png`.
  **Shipped: massive_metatarsal seed 1234** (clear silhouette gain, same or better from every side; manifest entry
  carries the candidate's settings, seed and a `review` note; the seed-2026 model stays in git history for rollback).
  The others look the same as the shipped models and were not replaced.
- Third pass: seeds 99 / 4242 for the remaining three. black_needle_ceremonial_sword 0.311 / **0.404**;
  crystal_nest_fragments **0.503** / 0.466; yuht_audio_console 0.436 / 0.447. Comparison:
  `verification/museum/rerun-2026-10-16b.png`. **Shipped: black_needle_ceremonial_sword seed 4242** (swept hilt closer
  to the icon) and **crystal_nest_fragments seed 99** (the two fragments read as a separate pair, as in the icon).
  yuht_audio_console stays: seven attempts (seeds 7, 99, 1234, 2027 map b, 4242 …) all give the same slab-and-panel
  shape (IoU 0.436–0.447 vs 0.441); a hologram is outside what the shape model reconstructs from one icon.

## Known limits

- One 100 px view per specimen: depth, thickness and the back are inferred. Flat objects (posters, plaques, books)
  may come out as slabs; elongated or thin items may lose thin parts.
- v2: the back carries a dimmed mirror of the front art. v3: sides and back come from synthesized views — AI
  guesses, not real surfaces.
- Compression: every GLB is passed through gltfpack 1.3 (`st-tools/gltfpack/gltfpack.exe -cc -kn`, MIT, from
  github.com/zeux/meshoptimizer releases): quantized geometry + EXT_meshopt_compression, decoded in the viewer by
  three's `meshopt_decoder.module.js` (copied to `dist/vendor/addons/libs/` by the build). v3 models: ~1.6 MB → ~0.85 MB
  (most of the rest is the 2048² JPEG texture). Visual check after compression: unchanged (contact sheet).
