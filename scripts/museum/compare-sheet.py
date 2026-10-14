"""Before/after sheet: rows from an older contact sheet (before) next to the current viewer shots (after).
  python scripts/museum/compare-sheet.py <old-contact-sheet.png> <key> [<key> ...]  → verification/museum/compare.png"""
import json, sys
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[2]
old = Image.open(sys.argv[1]).convert('RGB')
keys = sys.argv[2:]
# The old sheet lists models in manifest order at that time; find each key's row by matching the label order file.
order = json.loads((ROOT / 'verification/museum/contact-order.json').read_text(encoding='utf-8')) if (ROOT / 'verification/museum/contact-order.json').exists() else []
W, H = 300, 200
sheet = Image.new('RGB', (W * 5, H * 2 * len(keys)), (8, 21, 26))
draw = ImageDraw.Draw(sheet)
for i, key in enumerate(keys):
    y = i * 2 * H
    if key in order:
        sheet.paste(old.crop((0, order.index(key) * H, W * 5, order.index(key) * H + H)), (0, y))
    draw.text((6, y + H - 16), 'before: Hunyuan3D-2mini, 30 steps', fill=(200, 160, 120))
    icon = Image.open(ROOT / 'public/museum/img' / f'{key}.webp').convert('RGBA').resize((150, 150))
    sheet.paste(icon, (75, y + H + 25), icon)
    draw.text((6, y + H + 4), key + '  after: Hunyuan3D-2 full, 50 steps, octree 380', fill=(140, 220, 180))
    for a in range(4):
        shot = ROOT / 'verification/museum/shots' / f'model-{key}-{a}.png'
        if shot.exists():
            im = Image.open(shot).convert('RGB')
            im.thumbnail((W, H))
            sheet.paste(im, (W * (a + 1), y + H))
sheet.save(ROOT / 'verification/museum/compare.png')
print('compare sheet', keys)
