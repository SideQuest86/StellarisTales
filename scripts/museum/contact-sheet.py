"""Contact sheet of generated specimen models: original icon + the four viewer angles captured by
scripts/verify-museum.mjs (verification/museum/shots/model-<key>-<0..3>.png) → verification/museum/contact-sheet.png."""
import json
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[2]
models = json.loads((ROOT / 'public/museum/models/manifest.json').read_text(encoding='utf-8'))['models']
W, H = 300, 200
sheet = Image.new('RGB', (W * 5, H * len(models)), (8, 21, 26))
draw = ImageDraw.Draw(sheet)
for row, m in enumerate(models):
    icon = Image.open(ROOT / 'public/museum/img' / f"{m['key']}.webp").convert('RGBA').resize((150, 150))
    sheet.paste(icon, (75, row * H + 25), icon)
    draw.text((6, row * H + 4), m['key'], fill=(220, 200, 140))
    for i in range(4):
        shot = ROOT / 'verification/museum/shots' / f"model-{m['key']}-{i}.png"
        if shot.exists():
            im = Image.open(shot).convert('RGB')
            im.thumbnail((W, H))
            sheet.paste(im, (W * (i + 1), row * H))
sheet.save(ROOT / 'verification/museum/contact-sheet.png')
(ROOT / 'verification/museum/contact-order.json').write_text(json.dumps([m['key'] for m in models]), encoding='utf-8')
print('contact sheet:', len(models), 'models')
