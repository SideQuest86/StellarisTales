"""Synthesize novel views of a specimen with Zero123++ v1.2 (sudo-ai, Apache-2.0) for multi-view reconstruction.

  <tool python> scripts/museum/novel-views.py <key> ... [--tools D:/Saving/Living/CodexProjects/st-tools]
Input: verification/museum/inputs/<key>-x4.png (Real-ESRGAN upscale of the game icon, from generate-models-v2.py).
Output: verification/museum/views/<key>-grid.png (3x2 grid, 320 px views at azimuth 30/90/150/210/270/330 deg,
elevation +20/-10 alternating — the model's fixed layout) and <key>-<azimuth>.png with the grey background removed.
The pipeline code (sudo-ai/zero123plus-pipeline pipeline.py) was read before use: it only imports diffusers/torch.
"""
import argparse, sys
from pathlib import Path

import numpy as np
import torch
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
ap = argparse.ArgumentParser()
ap.add_argument('keys', nargs='*')
ap.add_argument('--all', action='store_true', help='every specimen, rarest first; skips specimens whose views exist')
ap.add_argument('--tools', default='D:/Saving/Living/CodexProjects/st-tools')
ap.add_argument('--steps', type=int, default=75)
args = ap.parse_args()
sys.path.insert(0, args.tools)
import json  # noqa: E402
import spandrel  # noqa: E402
from diffusers import DiffusionPipeline, EulerAncestralDiscreteScheduler  # noqa: E402

specimens = {s['key']: s for s in json.loads((ROOT / 'public/museum/specimens.json').read_text(encoding='utf-8'))['specimens']}
RANK = {'exceptional': 0, 'epic': 1, 'rare': 2, 'common': 3}
if args.all:
    args.keys = [k for k in sorted(specimens, key=lambda k: (RANK.get(specimens[k]['rarity'], 9), k))
                 if not (ROOT / f'verification/museum/views/{k}-330.png').exists()]
upscaler = None


def ensure_input(key):
    """The Real-ESRGAN x4 input shared with generate-models-v2.py (same method), created if missing."""
    path = ROOT / f'verification/museum/inputs/{key}-x4.png'
    if path.exists():
        return path
    global upscaler
    upscaler = upscaler or spandrel.ModelLoader().load_from_file(str(Path(args.tools) / 'weights/RealESRGAN_x4plus.pth')).to('cpu').eval()
    icon = Image.open(ROOT / 'public' / specimens[key]['icon']['url']).convert('RGBA')
    rgba = np.asarray(icon).astype(np.float32) / 255
    rgb = rgba[..., :3] * rgba[..., 3:] + 0.5 * (1 - rgba[..., 3:])
    with torch.no_grad():
        y = upscaler(torch.from_numpy(rgb).permute(2, 0, 1)[None]).clamp(0, 1)[0].permute(1, 2, 0).numpy()
    out = Image.fromarray((y * 255).astype(np.uint8)).convert('RGBA')
    out.putalpha(icon.getchannel('A').resize((y.shape[1], y.shape[0]), Image.LANCZOS))
    path.parent.mkdir(parents=True, exist_ok=True)
    out.save(path)
    return path

pipe = DiffusionPipeline.from_pretrained('sudo-ai/zero123plus-v1.2', custom_pipeline=str(Path(args.tools) / 'zero123plus_pipeline.py'),
                                         torch_dtype=torch.float16)
pipe.scheduler = EulerAncestralDiscreteScheduler.from_config(pipe.scheduler.config, timestep_spacing='trailing')
pipe.to('cuda')
out = ROOT / 'verification/museum/views'
out.mkdir(parents=True, exist_ok=True)
AZ = [30, 90, 150, 210, 270, 330]
for key in args.keys:
    src = Image.open(ensure_input(key)).convert('RGBA')
    # Zero123++ expects a square, centred object on white-ish/grey; composite on grey.
    bg = Image.new('RGBA', src.size, (127, 127, 127, 255))
    bg.alpha_composite(src)
    grid = pipe(bg.convert('RGB').resize((320, 320), Image.LANCZOS), num_inference_steps=args.steps,
                generator=torch.manual_seed(2026)).images[0]
    grid.save(out / f'{key}-grid.png')
    arr = np.asarray(grid.convert('RGB')).astype(np.int16)
    for i, az in enumerate(AZ):
        r, c = divmod(i, 2)
        tile = arr[r * 320:(r + 1) * 320, c * 320:(c + 1) * 320]
        # Background removal: the model paints a flat grey backdrop.
        bgc = np.median(np.concatenate([tile[:4].reshape(-1, 3), tile[-4:].reshape(-1, 3)]), axis=0)
        alpha = (np.abs(tile - bgc).sum(-1) > 24).astype(np.uint8) * 255
        im = Image.fromarray(tile.astype(np.uint8)).convert('RGBA')
        im.putalpha(Image.fromarray(alpha))
        im.save(out / f'{key}-{az}.png')
    print(key, 'views done', flush=True)
