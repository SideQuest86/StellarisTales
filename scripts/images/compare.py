"""Build comparison sheets: Lanczos x2 vs SR models, for representative event art and specimen icons."""
import glob
import json
import os
import sys

import numpy as np
from PIL import Image, ImageDraw

sys.path.insert(0, os.path.dirname(__file__))
from sr_lib import ROOT, lanczos, upscale_rgb, upscale_rgba, MODELS

OUT = os.path.join(ROOT, "verification", "images")
os.makedirs(OUT, exist_ok=True)
models = list(MODELS)


def pick_art():
    files = sorted(glob.glob(os.path.join(ROOT, "public", "art", "*.webp")))
    info = []
    for f in files:
        im = Image.open(f).convert("RGB")
        g = np.array(im.convert("L")).astype(float)
        edge = np.abs(np.diff(g, axis=1)).mean() + np.abs(np.diff(g, axis=0)).mean()
        info.append((f, im.size, g.mean(), edge))
    big = [i for i in info if i[1] == (828, 358)]
    small = [i for i in info if i[1] == (220, 115)]
    std = [i for i in info if i[1] == (450, 150)]
    dark = min(std, key=lambda i: i[2])
    text = max(std, key=lambda i: i[3])
    bright = max(std, key=lambda i: i[2])
    mid = sorted(std, key=lambda i: i[3])[len(std) // 2]
    chosen = [("dark", dark), ("text-like(high-edge)", text), ("bright", bright), ("median", mid),
              ("828x358-a", big[0]), ("828x358-b", big[3]), ("220x115", small[0])]
    return chosen


def label(im, txt):
    d = ImageDraw.Draw(im)
    d.rectangle((0, 0, 8 + 7 * len(txt), 14), fill=(0, 0, 0))
    d.text((4, 2), txt, fill=(255, 255, 0))
    return im


def art_sheet(tag, f):
    im = Image.open(f).convert("RGB")
    w, h = im.size
    size = (w * 2, h * 2)
    cols = [("lanczos x2", lanczos(im, size))]
    for m in models:
        cols.append((m, upscale_rgb(im, m, 2)))
    sheet = Image.new("RGB", (size[0], (size[1] + 4) * len(cols)), (30, 30, 30))
    for i, (n, c) in enumerate(cols):
        sheet.paste(label(c.copy(), n), (0, i * (size[1] + 4)))
    name = f"art-{tag.split('(')[0]}-{os.path.basename(f)[:8]}.png"
    sheet.save(os.path.join(OUT, name))
    # also a 3x zoomed crop of the centre (nearest) for texture/edge inspection
    cw, ch = min(w, 120), min(h, 60)
    x0, y0 = (w - cw) // 2, (h - ch) // 2
    z = Image.new("RGB", (cw * 6 * 2 // 2, (ch * 6 + 4) * len(cols)))
    for i, (n, c) in enumerate(cols):
        crop = c.crop((x0 * 2, y0 * 2, (x0 + cw) * 2, (y0 + ch) * 2)).resize((cw * 6, ch * 6), Image.NEAREST)
        z.paste(label(crop, n), (0, i * (ch * 6 + 4)))
    z.save(os.path.join(OUT, name.replace(".png", "-zoom.png")))
    print(name, f, im.size)


def pick_icons():
    want = ["acidic_spores", "advisor_core", "adakkaria_propaganda_poster"]
    files = sorted(glob.glob(os.path.join(ROOT, "public", "museum", "img", "*.webp")))
    names = {os.path.basename(f): f for f in files}
    out = []
    # use art-hashed names: map via specimens.json would be long; just pick by alpha coverage variety
    import random
    random.seed(7)
    cand = []
    for f in files:
        a = np.array(Image.open(f).convert("RGBA"))[..., 3]
        cov = (a > 10).mean()
        cand.append((cov, f))
    cand.sort()
    idx = [len(cand) // 8, len(cand) // 2, len(cand) * 3 // 4, len(cand) - 3]
    return [cand[i][1] for i in idx]


def icon_sheet(files):
    S = 300
    cols = ["lanczos x3"] + models
    sheet = Image.new("RGB", (S * len(cols), (S + 4) * len(files) * 2), (0, 0, 0))
    for r, f in enumerate(files):
        im = Image.open(f).convert("RGBA")
        outs = [lanczos(im, (S, S))] + [upscale_rgba(im, m, 3) for m in models]
        for c, o in enumerate(outs):
            for k, bg in enumerate([(24, 52, 60), (240, 240, 240)]):
                tile = Image.new("RGBA", (S, S), bg + (255,))
                tile.alpha_composite(o)
                t = label(tile.convert("RGB"), cols[c]) if r == 0 and k == 0 else tile.convert("RGB")
                sheet.paste(t, (c * S, (r * 2 + k) * (S + 4)))
    sheet.save(os.path.join(OUT, "icons.png"))
    print("icons", [os.path.basename(f) for f in files])


if __name__ == "__main__":
    for tag, (f, *_r) in pick_art():
        art_sheet(tag, f)
    icon_sheet(pick_icons())
