"""Generate unofficial 3D interpretations (GLB) of Grand Archive specimens from their original game icons.

Runs with the TripoSR tool environment, not the project Python:
  $env:HF_HOME = 'D:/Saving/Living/CodexProjects/st-tools/hf'
  D:/Saving/Living/CodexProjects/st-tools/venv/Scripts/python.exe scripts/museum/generate-models.py <key> [<key> ...]
      [--triposr D:/Saving/Living/CodexProjects/st-tools/triposr] [--mc 192] [--texture 1024]

Pipeline per specimen (settings are written into public/museum/models/manifest.json with every model):
  1. public/museum/img/<key>.webp (the game's 100x100 RGBA icon, unmodified) -> object cropped by its alpha,
     upscaled (Lanczos) to fill 85 % of a 512x512 frame, composited on TripoSR's neutral grey background.
  2. TripoSR (stabilityai/TripoSR, MIT licence) image -> triplane NeRF -> marching cubes at --mc resolution.
  3. Texture baked from the radiance field into a UV atlas (xatlas), saved as JPEG inside a GLB with a PBR material.
Models are interpretations: the icon shows one side at 100 px, so geometry and back surfaces are inferred.
"""
import argparse, datetime, hashlib, io, json, sys, time
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
ap = argparse.ArgumentParser()
ap.add_argument('keys', nargs='+')
ap.add_argument('--triposr', default='D:/Saving/Living/CodexProjects/st-tools/triposr')
ap.add_argument('--mc', type=int, default=128)
ap.add_argument('--texture', type=int, default=512)
ap.add_argument('--fg', type=float, default=0.85)
args = ap.parse_args()
sys.path.insert(0, args.triposr)

import torch  # noqa: E402
import trimesh  # noqa: E402
from tsr.system import TSR  # noqa: E402
from tsr.bake_texture import bake_texture  # noqa: E402

out_dir = ROOT / 'public/museum/models'
out_dir.mkdir(parents=True, exist_ok=True)
manifest_path = out_dir / 'manifest.json'
manifest = json.loads(manifest_path.read_text(encoding='utf-8')) if manifest_path.exists() else {'models': []}
specimens = {s['key']: s for s in json.loads((ROOT / 'public/museum/specimens.json').read_text(encoding='utf-8'))['specimens']}

device = 'cuda:0' if torch.cuda.is_available() else 'cpu'
t0 = time.time()
model = TSR.from_pretrained('stabilityai/TripoSR', config_name='config.yaml', weight_name='model.ckpt')
model.renderer.set_chunk_size(8192)
model.to(device)
print(f'model ready on {device} in {time.time() - t0:.1f}s', flush=True)


def prepare(path):
    """Alpha-cropped icon, upscaled into a 512 frame on grey (TripoSR's expected input)."""
    im = Image.open(path).convert('RGBA')
    bbox = im.getchannel('A').point(lambda a: 255 if a > 8 else 0).getbbox()
    im = im.crop(bbox)
    side = int(512 * args.fg)
    scale = side / max(im.size)
    im = im.resize((max(1, round(im.width * scale)), max(1, round(im.height * scale))), Image.LANCZOS)
    canvas = Image.new('RGBA', (512, 512), (127, 127, 127, 255))
    canvas.alpha_composite(im, ((512 - im.width) // 2, (512 - im.height) // 2))
    return canvas.convert('RGB')


for key in args.keys:
    s = specimens[key]
    src = ROOT / 'public' / s['icon']['url']
    t1 = time.time()
    image = prepare(src)
    (ROOT / 'verification/museum/inputs').mkdir(parents=True, exist_ok=True)
    image.save(ROOT / f'verification/museum/inputs/{key}.png')
    with torch.no_grad():
        codes = model([image], device=device)
    mesh = model.extract_mesh(codes, False, resolution=args.mc)[0]
    bake = bake_texture(mesh, model, codes[0], args.texture)
    tex = Image.fromarray((bake['colors'] * 255.0).astype(np.uint8)).transpose(Image.FLIP_TOP_BOTTOM).convert('RGB')
    # JPEG inside the GLB (trimesh keeps the image's format): ~10x smaller than PNG for baked colour.
    buf = io.BytesIO()
    tex.save(buf, 'JPEG', quality=85, optimize=True)
    tex = Image.open(io.BytesIO(buf.getvalue()))
    verts = mesh.vertices[bake['vmapping']]
    material = trimesh.visual.material.PBRMaterial(baseColorTexture=tex, metallicFactor=0.1, roughnessFactor=0.75,
                                                   name=f'{key}_interpretation')
    textured = trimesh.Trimesh(vertices=verts, faces=bake['indices'], process=False,
                               visual=trimesh.visual.TextureVisuals(uv=bake['uvs'], material=material))
    # TripoSR's frame is z-up; glTF is y-up.
    textured.apply_transform(trimesh.transformations.rotation_matrix(-np.pi / 2, [1, 0, 0]))
    glb = textured.export(file_type='glb')  # provenance and the "unofficial" note live in manifest.json
    dest = out_dir / f'{key}.glb'
    dest.write_bytes(glb)
    entry = {
        'key': key, 'file': f'museum/models/{key}.glb', 'bytes': len(glb), 'triangles': int(len(bake['indices'])),
        'source': {'image': s['icon']['url'], 'gameTexture': s['icon']['source'], 'sha256': s['icon']['sha256'], 'size': [s['icon']['width'], s['icon']['height']]},
        'generator': 'TripoSR (stabilityai/TripoSR, MIT) via scripts/museum/generate-models.py',
        'settings': {'input': '512x512, alpha-cropped, Lanczos upscale, grey background', 'foregroundRatio': args.fg,
                     'marchingCubes': args.mc, 'texture': args.texture, 'device': torch.cuda.get_device_name(0) if device.startswith('cuda') else 'cpu'},
        'date': datetime.date.today().isoformat(), 'seconds': round(time.time() - t1, 1),
        'status': 'generated', 'canonical': False,
    }
    manifest['models'] = [m for m in manifest['models'] if m['key'] != key] + [entry]
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
    print(f"{key}: {entry['triangles']} triangles, {entry['bytes'] // 1024} KB, {entry['seconds']} s", flush=True)
