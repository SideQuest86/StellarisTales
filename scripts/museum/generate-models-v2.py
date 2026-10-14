"""v2 pipeline: unofficial 3D interpretations of Grand Archive specimens with sharper fronts and better shapes.

Runs with the tool environment (see docs/museum/MODELS.md):
  $env:HF_HOME = 'D:/Saving/Living/CodexProjects/st-tools/hf'
  D:/Saving/Living/CodexProjects/st-tools/venv/Scripts/python.exe scripts/museum/generate-models-v2.py <key> ... | --all
      [--tools D:/Saving/Living/CodexProjects/st-tools] [--faces 24000] [--texture 1024] [--octree 256] [--steps 30]

Per specimen:
  1. Original icon public/museum/img/<key>.webp (game texture, 100x100 RGBA) upscaled 4x with Real-ESRGAN x4plus
     (BSD-3, via spandrel); alpha upscaled with Lanczos.
  2. Shape: Hunyuan3D-2mini (tencent/Hunyuan3D-2mini, hunyuan3d-dit-v2-mini; Tencent Hunyuan non-commercial
     community licence, not licensed for the EU, UK or South Korea) from the upscaled RGBA image; floaters and
     degenerate faces removed, reduced to --faces triangles.
  3. Alignment: the mesh is projected along +-X/+-Y/+-Z (and mirrored); the projection whose silhouette best matches
     the icon's alpha mask (IoU) defines the view the icon was "taken" from.
  4. Texture: xatlas UV atlas; every texel samples the upscaled icon by projection along that view. Texels facing
     the view get the original art; texels facing away get the same projection dimmed (a non-canonical guess).
  5. GLB with a JPEG texture and a PBR material; provenance + settings appended to public/museum/models/manifest.json.
"""
import argparse, datetime, io, json, sys, time
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[2]
ap = argparse.ArgumentParser()
ap.add_argument('keys', nargs='*')
ap.add_argument('--all', action='store_true')
ap.add_argument('--skip-existing', action='store_true')
ap.add_argument('--tools', default='D:/Saving/Living/CodexProjects/st-tools')
ap.add_argument('--faces', type=int, default=24000)
ap.add_argument('--texture', type=int, default=1024)
ap.add_argument('--octree', type=int, default=256)
ap.add_argument('--steps', type=int, default=30)
ap.add_argument('--variant', default='hunyuan3d-dit-v2-mini', help='hunyuan3d-dit-v2-mini (30 steps) or hunyuan3d-dit-v2-mini-turbo (5 steps)')
args = ap.parse_args()
TOOLS = Path(args.tools)
sys.path.insert(0, str(TOOLS / 'hunyuan3d'))

import torch  # noqa: E402
import trimesh  # noqa: E402
import xatlas  # noqa: E402
import spandrel  # noqa: E402
from hy3dgen.shapegen import Hunyuan3DDiTFlowMatchingPipeline, FaceReducer, FloaterRemover, DegenerateFaceRemover  # noqa: E402

out_dir = ROOT / 'public/museum/models'
out_dir.mkdir(parents=True, exist_ok=True)
inputs_dir = ROOT / 'verification/museum/inputs'
inputs_dir.mkdir(parents=True, exist_ok=True)
manifest_path = out_dir / 'manifest.json'
manifest = json.loads(manifest_path.read_text(encoding='utf-8')) if manifest_path.exists() else {'models': []}
specimens = {s['key']: s for s in json.loads((ROOT / 'public/museum/specimens.json').read_text(encoding='utf-8'))['specimens']}
# --all runs rarest first, so an interrupted batch has covered the most notable exhibits.
RANK = {'exceptional': 0, 'epic': 1, 'rare': 2, 'common': 3}
keys = sorted(specimens, key=lambda k: (RANK.get(specimens[k]['rarity'], 9), k)) if args.all else args.keys
if args.skip_existing:
    done = {m['key'] for m in manifest['models'] if m.get('pipeline') == 'v2'}
    keys = [k for k in keys if k not in done]

device = 'cuda'
t0 = time.time()
# The upscaler runs on the CPU (a 100 px input takes ~1 s): keeping it in VRAM pushed an 8 GB laptop GPU into
# shared-memory spill and slowed every diffusion step.
upscaler = spandrel.ModelLoader().load_from_file(str(TOOLS / 'weights/RealESRGAN_x4plus.pth')).to('cpu').eval()
TURBO = args.variant.endswith('turbo')
# Turbo settings follow Tencent's examples/faster_shape_gen_with_flashvdm_mini_turbo.py (ckpt weights, 'merge' top-k).
shapegen = Hunyuan3DDiTFlowMatchingPipeline.from_pretrained('tencent/Hunyuan3D-2mini', subfolder=args.variant,
                                                            **({'use_safetensors': False} if TURBO else {}))
# FlashVDM: hierarchical volume decoding (turbo VAE of the same repo) — the plain dense decode of a 256^3 field did
# not finish in 20 min on an 8 GB laptop GPU.
shapegen.enable_flashvdm(mc_algo='mc', **({'topk_mode': 'merge'} if TURBO else {}))
print(f'models ready in {time.time() - t0:.1f}s', flush=True)


def upscale(icon):
    """Real-ESRGAN x4 on colour premultiplied over mid-grey; Lanczos for alpha."""
    rgba = np.asarray(icon.convert('RGBA')).astype(np.float32) / 255
    rgb = rgba[..., :3] * rgba[..., 3:] + 0.5 * (1 - rgba[..., 3:])
    with torch.no_grad():
        x = torch.from_numpy(rgb).permute(2, 0, 1)[None]
        y = upscaler(x).clamp(0, 1)[0].permute(1, 2, 0).cpu().numpy()
    alpha = icon.getchannel('A').resize((y.shape[1], y.shape[0]), Image.LANCZOS)
    out = Image.fromarray((y * 255).astype(np.uint8)).convert('RGBA')
    out.putalpha(alpha)
    return out


def fill_transparent(img):
    """Spread edge colours into transparent pixels so projections past the silhouette stay on-colour."""
    rgb = np.asarray(img.convert('RGB')).astype(np.float32)
    a = (np.asarray(img.getchannel('A')) > 127).astype(np.float32)
    acc, w = rgb * a[..., None], a.copy()
    for radius in (2, 4, 8, 16, 32, 64):
        blur = lambda arr: np.asarray(Image.fromarray(arr).filter(ImageFilter.BoxBlur(radius)), dtype=np.float32)
        c = np.stack([blur(np.clip(acc[..., i] / np.maximum(w, 1e-6), 0, 255).astype(np.uint8) * (w > 0)) for i in range(3)], -1)
        cw = blur((w > 0).astype(np.uint8) * 255) / 255
        fill = (w == 0) & (cw > 0.02)
        acc[fill] = c[fill] / cw[fill, None]
        w[fill] = 1
    return Image.fromarray(np.clip(acc, 0, 255).astype(np.uint8))


AXES = {'+x': np.array([1, 0, 0]), '-x': np.array([-1, 0, 0]), '+z': np.array([0, 0, 1]), '-z': np.array([0, 0, -1]),
        '+y': np.array([0, 1, 0]), '-y': np.array([0, -1, 0])}


def basis(d):
    up = np.array([0, 0, 1.0]) if abs(d[1]) > 0.9 else np.array([0, 1.0, 0])
    right = np.cross(up, d)  # camera at +d looking towards -d: screen-right
    return right / np.linalg.norm(right), up


def silhouette(mesh, d, mirror, size=128):
    right, up = basis(d)
    if mirror:
        right = -right
    p = np.stack([mesh.vertices @ right, mesh.vertices @ up], 1)
    lo, hi = p.min(0), p.max(0)
    scale = (size - 1) / max(hi - lo)
    q = (p - lo) * scale
    q[:, 1] = size - 1 - q[:, 1]
    im = Image.new('L', (size, size), 0)
    dr = ImageDraw.Draw(im)
    for f in mesh.faces[:: max(1, len(mesh.faces) // 40000)]:
        dr.polygon([tuple(q[i]) for i in f], fill=255)
    return np.asarray(im) > 127, (right, up, lo, hi)


def align(mesh, icon):
    """Best view (direction + mirroring) by silhouette IoU against the icon's alpha mask (both bbox-normalised)."""
    a = np.asarray(icon.getchannel('A')) > 127
    ys, xs = np.nonzero(a)
    crop = Image.fromarray((a[ys.min():ys.max() + 1, xs.min():xs.max() + 1] * 255).astype(np.uint8))
    best = None
    for name, d in AXES.items():
        for mirror in (False, True):
            sil, frame = silhouette(mesh, d, mirror)
            ys2, xs2 = np.nonzero(sil)
            if not len(xs2):
                continue
            target = np.asarray(crop.resize((xs2.max() - xs2.min() + 1, ys2.max() - ys2.min() + 1))) > 127
            region = sil[ys2.min():ys2.max() + 1, xs2.min():xs2.max() + 1]
            iou = (region & target).sum() / max(1, (region | target).sum())
            if best is None or iou > best[0]:
                best = (iou, name, mirror, frame)
    return best


def project_texture(mesh, icon, frame, d, texture):
    """UV atlas + per-texel projection of the (upscaled) icon along the chosen view."""
    vmap, faces, uvs = xatlas.parametrize(mesh.vertices, mesh.faces)
    verts, normals = mesh.vertices[vmap], mesh.vertex_normals[vmap]
    right, up, lo, hi = frame
    a = np.asarray(icon.getchannel('A')) > 127
    ys, xs = np.nonzero(a)
    box = (xs.min(), ys.min(), xs.max(), ys.max())
    filled = np.asarray(fill_transparent(icon)).astype(np.float32)
    H, W = filled.shape[:2]
    tex = np.zeros((texture, texture, 3), np.float32)
    written = np.zeros((texture, texture), bool)
    uv_px = uvs * (texture - 1)
    for tri in faces:
        (x0, y0), (x1, y1), (x2, y2) = uv_px[tri]
        minx, maxx = int(np.floor(min(x0, x1, x2))), int(np.ceil(max(x0, x1, x2)))
        miny, maxy = int(np.floor(min(y0, y1, y2))), int(np.ceil(max(y0, y1, y2)))
        gx, gy = np.meshgrid(np.arange(minx, maxx + 1), np.arange(miny, maxy + 1))
        den = (y1 - y2) * (x0 - x2) + (x2 - x1) * (y0 - y2)
        if abs(den) < 1e-12:
            continue
        l0 = ((y1 - y2) * (gx - x2) + (x2 - x1) * (gy - y2)) / den
        l1 = ((y2 - y0) * (gx - x2) + (x0 - x2) * (gy - y2)) / den
        l2 = 1 - l0 - l1
        inside = (l0 >= -0.02) & (l1 >= -0.02) & (l2 >= -0.02)
        if not inside.any():
            continue
        L = np.stack([l0[inside], l1[inside], l2[inside]], 1)
        p = L @ verts[tri]
        n = L @ normals[tri]
        n /= np.linalg.norm(n, axis=1, keepdims=True) + 1e-9
        sx = (p @ right - lo[0]) / (hi[0] - lo[0])
        sy = 1 - (p @ up - lo[1]) / (hi[1] - lo[1])
        px = np.clip(box[0] + sx * (box[2] - box[0]), 0, W - 1).astype(int)
        py = np.clip(box[1] + sy * (box[3] - box[1]), 0, H - 1).astype(int)
        col = filled[py, px]
        facing = n @ d
        shade = np.where(facing >= 0, 1.0, 0.55 + 0.15 * (1 + facing))[:, None]  # away-facing: dimmed guess
        tx, ty = gx[inside], gy[inside]
        ok = (tx >= 0) & (tx < texture) & (ty >= 0) & (ty < texture)
        tex[texture - 1 - ty[ok], tx[ok]] = col[ok] * shade[ok]
        written[texture - 1 - ty[ok], tx[ok]] = True
    # Dilate the atlas a few texels so seams do not show the background.
    img = Image.fromarray(np.clip(tex, 0, 255).astype(np.uint8))
    mask = Image.fromarray((written * 255).astype(np.uint8))
    for _ in range(4):
        grown = img.filter(ImageFilter.MaxFilter(3))
        img = Image.composite(img, grown, mask)
        mask = mask.filter(ImageFilter.MaxFilter(3))
    return verts, faces, uvs, img


for key in keys:
    s = specimens[key]
    t1 = time.time()
    icon = Image.open(ROOT / 'public' / s['icon']['url']).convert('RGBA')
    big = upscale(icon)
    big.save(inputs_dir / f'{key}-x4.png')
    print(f'  {key}: upscaled in {time.time() - t1:.1f}s', flush=True)
    mesh = shapegen(image=big, num_inference_steps=args.steps, octree_resolution=args.octree, num_chunks=20000,
                    generator=torch.manual_seed(2026), output_type='trimesh')[0]
    print(f'  {key}: shape in {time.time() - t1:.1f}s ({len(mesh.faces)} faces)', flush=True)
    mesh = FloaterRemover()(mesh)
    mesh = DegenerateFaceRemover()(mesh)
    mesh = FaceReducer()(mesh, max_facenum=args.faces)
    iou, view, mirror, frame = align(mesh, big)
    d = AXES[view]
    verts, faces, uvs, tex = project_texture(mesh, big, frame, d, args.texture)
    print(f'  {key}: textured in {time.time() - t1:.1f}s', flush=True)
    buf = io.BytesIO()
    tex.save(buf, 'JPEG', quality=86, optimize=True)
    tex = Image.open(io.BytesIO(buf.getvalue()))
    material = trimesh.visual.material.PBRMaterial(baseColorTexture=tex, metallicFactor=0.15, roughnessFactor=0.7, name=f'{key}_interpretation')
    out = trimesh.Trimesh(vertices=verts, faces=faces, process=False, visual=trimesh.visual.TextureVisuals(uv=uvs, material=material))
    # Rotate so the icon's view faces +X (the viewer opens on +X, like the v1 TripoSR models).
    target = np.array([1.0, 0, 0])
    if not np.allclose(d, target):
        axis = np.cross(d, target)
        angle = np.arccos(np.clip(d @ target, -1, 1))
        if np.linalg.norm(axis) < 1e-6:
            axis, angle = np.array([0, 1.0, 0]), np.pi
        out.apply_transform(trimesh.transformations.rotation_matrix(angle, axis))
    glb = out.export(file_type='glb')
    (out_dir / f'{key}.glb').write_bytes(glb)
    entry = {
        'key': key, 'file': f'museum/models/{key}.glb', 'bytes': len(glb), 'triangles': int(len(faces)), 'pipeline': 'v2',
        'source': {'image': s['icon']['url'], 'gameTexture': s['icon']['source'], 'sha256': s['icon']['sha256'], 'size': [s['icon']['width'], s['icon']['height']]},
        'generator': 'Real-ESRGAN x4plus (BSD-3) + Hunyuan3D-2mini shape (Tencent Hunyuan non-commercial community licence) + icon projection, scripts/museum/generate-models-v2.py',
        'licenceNote': 'Shape model licence: Tencent Hunyuan 3D 2.0 community licence (non-commercial; territory excludes EU, UK, South Korea).',
        'settings': {'upscale': 'RealESRGAN_x4plus 100->400 px', 'shape': f'tencent/Hunyuan3D-2mini {args.variant}', 'steps': args.steps,
                     'octree': args.octree, 'seed': 2026, 'faces': args.faces, 'texture': args.texture,
                     'view': view + (' mirrored' if mirror else ''), 'silhouetteIoU': round(float(iou), 3),
                     'device': torch.cuda.get_device_name(0)},
        'date': datetime.date.today().isoformat(), 'seconds': round(time.time() - t1, 1), 'status': 'generated', 'canonical': False,
    }
    manifest['models'] = [m for m in manifest['models'] if m['key'] != key] + [entry]
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
    print(f"{key}: {entry['triangles']} tris, {entry['bytes'] // 1024} KB, view {entry['settings']['view']} IoU {entry['settings']['silhouetteIoU']}, {entry['seconds']} s", flush=True)
