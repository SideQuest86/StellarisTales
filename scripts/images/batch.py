"""Batch x2 event art -> public/art-hd, x3 museum icons -> public/museum/img-hd (+ manifests). Originals untouched."""
import glob
import json
import os
import sys

from PIL import Image

sys.path.insert(0, os.path.dirname(__file__))
from sr_lib import ROOT, sha256, upscale_rgb, upscale_rgba

MODEL = "realesrgan-x4plus"
ART_Q = 82
only = sys.argv[1] if len(sys.argv) > 1 else "all"

if only in ("all", "art"):
    src_map = {}
    p = os.path.join(ROOT, "public", "data", "art-sources.json")
    for k, v in json.load(open(p, encoding="utf-8")).items():
        src_map[os.path.basename(v["url"])] = {"game_source": v["source"], "sprite": v.get("sprite", k)}
    out = os.path.join(ROOT, "public", "art-hd")
    os.makedirs(out, exist_ok=True)
    man = {}
    files = sorted(glob.glob(os.path.join(ROOT, "public", "art", "*.webp")))
    for i, f in enumerate(files):
        name = os.path.basename(f)
        im = Image.open(f)
        hd = upscale_rgb(im, MODEL, 2)
        dst = os.path.join(out, name)
        hd.save(dst, "WEBP", quality=ART_Q, method=6)
        man[name] = {"original": "art/" + name, **src_map.get(name, {}), "model": MODEL, "scale": 2,
                     "size": list(hd.size), "settings": {"format": "webp", "quality": ART_Q, "method": 6, "resample": "area from x4"},
                     "bytes": os.path.getsize(dst), "sha256": sha256(dst), "original_sha256": sha256(f)}
        if i % 50 == 0:
            print("art", i, len(files), flush=True)
    json.dump({"model": MODEL, "files": man}, open(os.path.join(out, "manifest.json"), "w", encoding="utf-8"), indent=1)

if only in ("all", "icons"):
    out = os.path.join(ROOT, "public", "museum", "img-hd")
    os.makedirs(out, exist_ok=True)
    man = {}
    files = sorted(glob.glob(os.path.join(ROOT, "public", "museum", "img", "*.webp")))
    for i, f in enumerate(files):
        name = os.path.basename(f)
        hd = upscale_rgba(Image.open(f), MODEL, 3)
        dst = os.path.join(out, name)
        hd.save(dst, "WEBP", quality=88, alpha_quality=100, method=6)
        man[name] = {"original": "museum/img/" + name, "model": MODEL, "scale": 3, "size": list(hd.size),
                     "settings": {"format": "webp", "quality": 88, "alpha_quality": 100, "alpha": "original alpha, Lanczos; colour bled under transparent pixels before SR"},
                     "bytes": os.path.getsize(dst), "sha256": sha256(dst), "original_sha256": sha256(f)}
    json.dump({"model": MODEL, "files": man}, open(os.path.join(out, "manifest.json"), "w", encoding="utf-8"), indent=1)
print("done")
