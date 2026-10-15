# Images: super-resolution derivatives

Event pictures and museum icons ship at the game's native size. For sharp close-ups on high-DPI screens there are
**derivative** HD copies produced locally and offline (no service, no upload of game art). Originals are never modified.
Rollback: delete `public/art-hd/` and `public/museum/img-hd/`, and revert the two `<img>` markups (app.js `chapter-art`,
museum.js `museum-stage-image`).

## Model choice

| Model | Code licence | Weight licence / source | sha256 | Verdict |
|---|---|---|---|---|
| **Real-ESRGAN x4plus** | BSD-3-Clause (xinntao/Real-ESRGAN) | BSD-3 release asset `RealESRGAN_x4plus.pth` | 4fa0d38905f75aa... see below | **chosen** |
| realesr-general-x4v3 | BSD-3-Clause | release v0.2.5.0 asset | 8dc7edb9ac80cccc... (full below) | compared; adds grit/noise-like texture |
| SwinIR-M real-world x4 GAN | Apache-2.0 (JingyunLiang/SwinIR) | release v0.0 asset | b9afb61e65e04eb7... | compared; near-identical, 10x slower, tiling needed |
| HAT / DAT | Apache-2.0 | weights hosted on Drive/HF, not fetched | n/a | not evaluated (heavier, no clear gain expected for 450x150 art) |
| OpenModelDB community 4x models | mixed (many CC-BY-NC or unstated) | varies | n/a | **rejected**: non-commercial or unclear terms |

Licences are as stated in each project's LICENSE file at the time of writing (not re-checked online this session).
Full hashes (weights live outside the repo in `D:/Saving/Living/CodexProjects/st-tools/weights/`):

- RealESRGAN_x4plus.pth `4FA0D38905F75AC06EB49A7951B426670021BE3018265FD191D2125DF9D682F1`
  (https://github.com/xinntao/Real-ESRGAN/releases/download/v0.1.0/RealESRGAN_x4plus.pth)
- realesr-general-x4v3.pth `8DC7EDB9AC80CCDC30C3A5DCA6616509367F05FBC184AD95B731F05BECE96292`
  (https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.5.0/realesr-general-x4v3.pth)
- 003_realSR_BSRGAN_DFO_s64w8_SwinIR-M_x4_GAN.pth `B9AFB61E65E04EB7F8ABA5095D070BBE9AF28DF76ACD0C9405AEB33B814BCFC6`
  (https://github.com/JingyunLiang/SwinIR/releases/download/v0.0/003_realSR_BSRGAN_DFO_s64w8_SwinIR-M_x4_GAN.pth)

### Comparison (verification/images/, `scripts/images/compare.py`)

Seven art pictures (dark, high-edge "text-like" ornament, bright, median, two 828x358 origin pictures, one 220x115) and four
transparent specimen icons on dark and light backgrounds; each against Lanczos x2/x3, with 6x nearest-neighbour crops.
All three SR models keep composition and colour. Lanczos is visibly soft. realesr-general-x4v3 sharpens most but adds
crunchy grain in dark gradients; SwinIR is equal to x4plus visually but slow. **x4plus** gives clean edges, smooth dark
gradients (no banding or invented noise) and the most faithful flat painterly shading, so it was chosen.

## Pipeline (`scripts/images/`)

`sr_lib.py` (model load via spandrel, RGBA handling), `compare.py`, `batch.py`, `measure.mjs`. Run with the st-tools venv:
`../st-tools/venv/Scripts/python.exe -I scripts/images/batch.py [art|icons]`.
Event art: x4 SR, then area-downscale to x2, WebP q82 method 6. Icons: transparent pixels get the nearest opaque colour
before SR (no halo), x4 then area-downscale to x3 (300x300), alpha taken from the original and Lanczos-resized, WebP q88
with lossless alpha. Manifests with source, game source, model, settings, sha256: `public/art-hd/manifest.json`,
`public/museum/img-hd/manifest.json`.

## Delivery

- Reader chapter art (shown on narrow screens only): `srcset="art/x.webp 1x, art-hd/x.webp 2x"`, `loading="lazy"`.
  Phones at DPR 1 keep the original.
- Museum detail image (200 CSS px): HD icon (300 px) as `src`.
- The 3D archive texture atlas (`src/cover-atlas.js`) keeps using the small originals (bounded GPU memory); it is unchanged.

Measured (headless Chrome, 390 px phone for the reader): opening one story at DPR 1 transfers the originals only; at DPR 2/3 it
adds one HD file, 13.9 KB. Opening one exhibit adds 13.1 KB (HD icon). Whole-set added size: art-hd 13.9 MB (618 files,
max 65.8 KB, mean 22.5 KB), img-hd 5.2 MB (258 files, max 144 KB), fetched only on demand.

## Coverage

| Group | Count | Processed | Note |
|---|---|---|---|
| `public/art/*.webp` event pictures (559 450x150, 53 220x115, 6 828x358) | 618 | 618 -> x2 | the coordinator survey said 623; 618 files exist |
| `public/museum/img/*.webp` icons 100x100 RGBA | 258 | 258 -> x3 | |
| `public/museum/ui/*` game textures | 5 | 0 | UI chrome, not shown large |
| `public/music/cover.webp` 600x600 | 1 | 0 | already large enough |
| `public/mark.svg` | 1 | 0 | vector |
