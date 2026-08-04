from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "outputs" / "丝路食肆_可玩原型_v0.1" / "assets"
OUT.mkdir(parents=True, exist_ok=True)

icon_sheet = Image.open(ROOT / "outputs" / "丝路食肆_视觉探索04_胡饼8级图标合辑_v2.png").convert("RGBA")
names = [
    "hubing_lv01_dough",
    "hubing_lv02_lubing",
    "hubing_lv03_humabing",
    "hubing_lv04_youhubing",
    "hubing_lv05_congchihubing",
    "hubing_lv06_yangrouhubing",
    "hubing_lv07_suibing",
    "hubing_lv08_gulouzi",
]

cell_w = icon_sheet.width / 4
cell_h = icon_sheet.height / 2
for idx, name in enumerate(names):
    row, col = divmod(idx, 4)
    x0 = int(col * cell_w + 34)
    y0 = int(row * cell_h + 34)
    x1 = int((col + 1) * cell_w - 34)
    y1 = int((row + 1) * cell_h - 34)
    crop = icon_sheet.crop((x0, y0, x1, y1))
    crop = crop.resize((256, 256), Image.Resampling.LANCZOS)
    crop.save(OUT / f"{name}.png")

keeper = Image.open(ROOT / "outputs" / "丝路食肆_视觉探索08_主角女掌柜.png").convert("RGBA")
keeper_crop = keeper.crop((530, 620, 890, 1040))
keeper_crop = keeper_crop.resize((256, 256), Image.Resampling.LANCZOS)
mask = Image.new("L", (256, 256), 0)
draw = ImageDraw.Draw(mask)
draw.rounded_rectangle((0, 0, 256, 256), radius=44, fill=255)
keeper_crop.putalpha(mask)
keeper_crop.save(OUT / "keeper_portrait.png")

print(f"wrote assets to {OUT}")
