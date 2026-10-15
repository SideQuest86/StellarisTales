"""Shared helpers for the Stellaris Tales super-resolution pipeline (local, offline, no uploads).

Run with the st-tools venv:  ../st-tools/venv/Scripts/python.exe -I scripts/images/<script>.py
"""
import hashlib
import os
import sys

import cv2
import numpy as np
import torch
from PIL import Image
from spandrel import ModelLoader

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
WEIGHTS = os.path.abspath(os.path.join(ROOT, "..", "st-tools", "weights"))

MODELS = {
    "realesrgan-x4plus": "RealESRGAN_x4plus.pth",
    "realesr-general-x4v3": "realesr-general-x4v3.pth",
    "swinir-m-realsr-x4": "003_realSR_BSRGAN_DFO_s64w8_SwinIR-M_x4_GAN.pth",
}

_cache = {}


def sha256(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for b in iter(lambda: f.read(1 << 20), b""):
            h.update(b)
    return h.hexdigest()


def load_model(name):
    if name not in _cache:
        m = ModelLoader().load_from_file(os.path.join(WEIGHTS, MODELS[name]))
        _cache[name] = m.cuda().eval()
    return _cache[name]


@torch.inference_mode()
def sr4(rgb, name):
    """rgb: HxWx3 uint8 -> 4x uint8 via the named model (tiled for SwinIR memory)."""
    m = load_model(name)
    x = torch.from_numpy(rgb).float().div(255).permute(2, 0, 1)[None].cuda()
    tile = 128 if "swinir" in name else 0
    if tile:
        _, _, h, w = x.shape
        pad = 16
        out = torch.zeros(1, 3, h * 4, w * 4, device="cuda")
        # SwinIR window 8: reflect-pad every tile to a multiple of 8
        for y in range(0, h, tile):
            for xx in range(0, w, tile):
                y0, x0 = max(y - pad, 0), max(xx - pad, 0)
                y1, x1 = min(y + tile + pad, h), min(xx + tile + pad, w)
                t = x[:, :, y0:y1, x0:x1]
                ph, pw = (-t.shape[2]) % 8, (-t.shape[3]) % 8
                t = torch.nn.functional.pad(t, (0, pw, 0, ph), mode="reflect")
                o = m(t)[:, :, : (y1 - y0) * 4, : (x1 - x0) * 4]
                ys, xs = (y - y0) * 4, (xx - x0) * 4
                hh, ww = min(tile, h - y) * 4, min(tile, w - xx) * 4
                out[:, :, y * 4 : y * 4 + hh, xx * 4 : xx * 4 + ww] = o[:, :, ys : ys + hh, xs : xs + ww]
    else:
        out = m(x)
    out = out.clamp(0, 1).mul(255).round().byte()[0].permute(1, 2, 0).cpu().numpy()
    return out


def lanczos(img, size):
    return img.resize(size, Image.LANCZOS)


def downscale_from4(big, size):
    """4x SR result -> target size with area-averaging (keeps SR sharpness, no aliasing)."""
    return cv2.resize(big, size, interpolation=cv2.INTER_AREA)


def bleed_colour(rgba):
    """Replace RGB of fully/partly transparent pixels with the nearest opaque colour (prevents halos)."""
    a = rgba[..., 3]
    solid = a >= 128
    if solid.all() or not solid.any():
        return rgba[..., :3].copy()
    _, labels = cv2.distanceTransformWithLabels((~solid).astype(np.uint8), cv2.DIST_L2, 3, labelType=cv2.DIST_LABEL_PIXEL)
    ys, xs = np.nonzero(solid)
    lut = np.zeros((labels.max() + 1, 3), np.uint8)
    lut[labels[ys, xs]] = rgba[ys, xs, :3]
    out = lut[labels]
    out[solid] = rgba[..., :3][solid]
    return out


def upscale_rgba(img, name, scale):
    """RGBA PIL image -> RGBA PIL image at `scale`x, alpha from the original (Lanczos), no halo."""
    arr = np.array(img.convert("RGBA"))
    h, w = arr.shape[:2]
    rgb = sr4(bleed_colour(arr), name)
    size = (w * scale, h * scale)
    rgb = downscale_from4(rgb, size)
    alpha = np.array(Image.fromarray(arr[..., 3]).resize(size, Image.LANCZOS))
    return Image.fromarray(np.dstack([rgb, alpha]), "RGBA")


def upscale_rgb(img, name, scale):
    arr = np.array(img.convert("RGB"))
    h, w = arr.shape[:2]
    return Image.fromarray(downscale_from4(sr4(arr, name), (w * scale, h * scale)), "RGB")
