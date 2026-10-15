# Brief: image agent (super-resolution pipeline)

Read docs/refine/RULES.md first (no git, no build.mjs; `node scripts/dev-sync.mjs` to test; browser windows headless or
on the left monitor). Project: D:/Saving/Living/CodexProjects/StellarisTales.

Facts (coordinator survey): site art `public/art/*.webp` = 623 game event pictures already at the game's native
resolution (564 × 450×150, 53 × 220×115, 6 × 828×358; mapping `public/data/art-sources.json` → `gfx/...dds`, no larger
game original exists for them); museum icons `public/museum/img/*.webp` 258 × 100×100; museum UI `public/museum/ui/*`
(5 game textures); `public/music/cover.webp` 600×600; `public/mark.svg` (vector — do not upscale). Already installed
locally (no download needed): `D:/Saving/Living/CodexProjects/st-tools/venv` (Python 3.12, torch cu128, `spandrel`),
`st-tools/weights/RealESRGAN_x4plus.pth` (BSD-3-Clause, xinntao/Real-ESRGAN), and 400×400 Real-ESRGAN icon inputs in
`verification/museum/inputs/<key>-x4.png`. GPU: RTX 5070 8 GB (free).

Ownership: new `scripts/images/` (pipeline), new `public/art-hd/`, new `public/museum/img-hd/`, new `docs/IMAGES.md`,
new `verification/images/` (comparison sheets; keep out of git if large: list in your report), new tests
`tests/images.test.mjs` if useful. In `src/app.js` ONLY the chapter-art `<img>` markup inside the `chapter-art` div
(add `srcset`/`sizes` or an HD `src` with `loading="lazy" decoding="async"` and width/height); in `src/museum.js` ONLY the
`museum-stage-image` `<img>`. Do not change the 3D archive texture atlas (src/cover-atlas.js): it must keep using the
small originals (bounded GPU memory) — say so in docs.

Tasks
1. Research current open-source single-image SR options (e.g. Real-ESRGAN x4plus / realesr-general-x4v3, SwinIR,
   HAT, DAT, 4x community models) and record code + weight licences with links in docs/IMAGES.md. Reject anything
   non-commercial or unclear. Free downloads of permissively licensed weights (BSD/MIT/Apache) are allowed; record
   source URL + sha256. No paid services, no uploads of game art anywhere.
2. Compare on representative art (≥ 6 diverse event pictures incl. one with text-like details, one dark, one 828×358
   origin picture, plus 4 specimen icons with transparency): Lanczos ×2 baseline vs at least two SR models. Make
   side-by-side sheets in verification/images/, inspect them yourself (Read the PNG), pick the model that best preserves
   composition, colours, edges and does not invent texture; justify in docs.
3. Batch: event pictures → ×2 derivative (900×300 etc.) WebP (quality ~82, check file size; target ≤ ~60 KB each),
   museum icons → ×3 (300×300) WebP with alpha preserved (alpha from the original, resized; no halo). Keep originals
   untouched (rollback = delete the HD folder / revert markup). Write a manifest `public/art-hd/manifest.json`
   (per file: source original path, game source, model, scale, settings, sha256) and the same for icons.
4. Web delivery: reader close-up uses the HD file via `srcset` (1x original, 2x HD) so small screens may keep the
   original; lazy loading; museum detail image uses the HD icon. Measure total added bytes and a page-load comparison
   (Playwright: transferred bytes for opening one story and one exhibit, before/after).
5. Coverage table in docs/IMAGES.md: every image group, count processed, exceptions with reasons (SVG mark, UI
   textures if you decide they are not shown large, the album cover if already 600×600, etc.).

Report (short): model chosen + licence, comparisons viewed, counts, sizes, page-load numbers, files changed.
