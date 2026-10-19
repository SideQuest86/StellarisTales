"""Side-by-side sheets from scripts/probe/before-after.mjs output: <dir>/sheet-<n>.jpg (each row: surface, before | after).
Usage: python scripts/probe/before-after-sheet.py [dir]   (needs Pillow; e.g. the st-tools venv)"""
import pathlib, sys
from PIL import Image, ImageDraw

d = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "verification/round4/before-after")
names = sorted({p.name.rsplit("-", 1)[0] for p in d.glob("*-before.png")})
W = 700  # width of each half
rows = []
for n in names:
    a, b = Image.open(d / f"{n}-before.png").convert("RGB"), Image.open(d / f"{n}-after.png").convert("RGB")
    scale = W / max(a.width, b.width)
    a = a.resize((round(a.width * scale), round(a.height * scale)), Image.LANCZOS)
    b = b.resize((round(b.width * scale), round(b.height * scale)), Image.LANCZOS)
    h = max(a.height, b.height) + 28
    row = Image.new("RGB", (W * 2 + 12, h), (8, 16, 20))
    row.paste(a, (0, 28)); row.paste(b, (W + 12, 28))
    dr = ImageDraw.Draw(row)
    dr.text((6, 6), f"{n} - before (v4.6.4)", fill=(220, 200, 150))
    dr.text((W + 18, 6), f"{n} - after (v4.7.3)", fill=(220, 200, 150))
    rows.append(row)
# Group rows into sheets of about 2,400 px.
sheets, cur, hsum = [], [], 0
for r in rows:
    if cur and hsum + r.height > 2400:
        sheets.append(cur); cur, hsum = [], 0
    cur.append(r); hsum += r.height + 10
if cur:
    sheets.append(cur)
for i, s in enumerate(sheets, 1):
    img = Image.new("RGB", (W * 2 + 12, sum(r.height + 10 for r in s)), (0, 0, 0))
    y = 0
    for r in s:
        img.paste(r, (0, y)); y += r.height + 10
    img.save(d / f"sheet-{i}.jpg", quality=80, optimize=True)
    print("sheet", i, img.size)
for p in d.glob("*.png"):  # keep the repository light: the sheets hold the comparison
    p.unlink()
