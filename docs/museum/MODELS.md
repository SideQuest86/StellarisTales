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
| Tool environment (outside the repo) | `D:/Saving/Living/CodexProjects/st-tools/` — `venv/` (Python 3.12, torch 2.11 cu128), `triposr/`, `hunyuan3d/`, `weights/RealESRGAN_x4plus.pth`, `hf/` (Hugging Face cache) |

## Pipelines

**v2 (current)** — `scripts/museum/generate-models-v2.py`
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

## Known limits

- One 100 px view per specimen: depth, thickness and the back are inferred. Flat objects (posters, plaques, books)
  may come out as slabs; elongated or thin items may lose thin parts.
- The back carries a dimmed mirror of the front art, not a real back.
- Models are ~0.7–1 MB each (24k triangles + 1024² JPEG). No Draco/meshopt compression yet (no encoder installed);
  three.js would decode both if added later.
