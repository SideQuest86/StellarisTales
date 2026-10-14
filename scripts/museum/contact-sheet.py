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

# Review pages: 45 specimens per page (3 per row: icon, opening view, opposite side) — small enough to inspect.
C, PER_ROW, ROWS = 140, 3, 15
per_page = PER_ROW * ROWS
for p in range(0, len(models), per_page):
    page = Image.new('RGB', (PER_ROW * 3 * C, ROWS * C), (8, 21, 26))
    draw = ImageDraw.Draw(page)
    for n, m in enumerate(models[p:p + per_page]):
        x, y = (n % PER_ROW) * 3 * C, (n // PER_ROW) * C
        icon = Image.open(ROOT / 'public/museum/img' / f"{m['key']}.webp").convert('RGBA').resize((C - 24, C - 24))
        page.paste(icon, (x + 12, y + 18), icon)
        for j, i in enumerate((0, 2)):
            shot = ROOT / 'verification/museum/shots' / f"model-{m['key']}-{i}.png"
            if shot.exists():
                im = Image.open(shot).convert('RGB')
                im.thumbnail((C, C))
                page.paste(im, (x + (j + 1) * C, y))
        draw.text((x + 3, y + 2), f"{p + n} {m['key'][:22]}", fill=(220, 200, 140))
    page.save(ROOT / f'verification/museum/review-{p // per_page + 1}.png')
print('review pages:', -(-len(models) // per_page))
