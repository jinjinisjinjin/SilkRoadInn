from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "outputs"

W, H = 1170, 2532

bg_path = OUT / "丝路食肆_视觉探索02_Lv1流沙驿后厨_明亮版.png"
icons_path = OUT / "丝路食肆_视觉探索04_胡饼8级图标合辑_v2.png"
keeper_path = OUT / "丝路食肆_视觉探索08_主角女掌柜.png"
output_path = OUT / "丝路食肆_视觉探索10_Lv1完整主界面Mockup_6x8字体版.png"

HEITI = "/System/Library/Fonts/STHeiti Medium.ttc"
HEITI_LIGHT = "/System/Library/Fonts/STHeiti Light.ttc"
SONGTI = "/System/Library/Fonts/Supplemental/Songti.ttc"


def font(size, style="ui"):
    if style == "title":
        return ImageFont.truetype(SONGTI, size)
    if style == "light":
        return ImageFont.truetype(HEITI_LIGHT, size)
    return ImageFont.truetype(HEITI, size)


def cover(img, size, x_bias=0.5, y_bias=0.5):
    tw, th = size
    scale = max(tw / img.width, th / img.height)
    nw, nh = int(img.width * scale), int(img.height * scale)
    resized = img.resize((nw, nh), Image.Resampling.LANCZOS)
    left = int((nw - tw) * x_bias)
    top = int((nh - th) * y_bias)
    return resized.crop((left, top, left + tw, top + th))


def rounded(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def text_center(draw, xy, text, fnt, fill):
    bbox = draw.textbbox((0, 0), text, font=fnt)
    draw.text((xy[0] - (bbox[2] - bbox[0]) / 2, xy[1] - (bbox[3] - bbox[1]) / 2), text, font=fnt, fill=fill)


def crop_icons(sheet):
    icons = []
    cell_w = sheet.width / 4
    cell_h = sheet.height / 2
    for row in range(2):
        for col in range(4):
            x0 = int(col * cell_w + 34)
            y0 = int(row * cell_h + 34)
            x1 = int((col + 1) * cell_w - 34)
            y1 = int((row + 1) * cell_h - 34)
            icons.append(sheet.crop((x0, y0, x1, y1)).convert("RGBA"))
    return icons


def paste_icon(base, icon, center, size):
    im = icon.resize((size, size), Image.Resampling.LANCZOS)
    base.alpha_composite(im, (int(center[0] - size / 2), int(center[1] - size / 2)))


bg = cover(Image.open(bg_path).convert("RGB"), (W, H), y_bias=0.48).convert("RGBA")
canvas = bg
draw = ImageDraw.Draw(canvas)

ink = (55, 39, 29, 255)
muted = (98, 72, 50, 255)
paper = (250, 229, 188, 234)
paper2 = (247, 219, 170, 226)
gold = (151, 101, 36, 255)
gold_dark = (109, 70, 28, 255)
blue = (63, 104, 117, 248)
green = (70, 126, 90, 248)
red = (149, 67, 48, 245)
wood = (104, 61, 30, 225)

# Readability overlay: stronger over central play area, lighter elsewhere.
canvas.alpha_composite(Image.new("RGBA", (W, H), (248, 224, 178, 36)))

# Logo/title plaque.
rounded(draw, (318, 28, 852, 122), 16, (120, 76, 35, 232), (75, 46, 24, 240), 3)
text_center(draw, (585, 73), "丝路食肆", font(50, "title"), (255, 238, 188, 255))
draw.line((376, 111, 794, 111), fill=(207, 160, 82, 230), width=3)

# Resource row.
rounded(draw, (42, 142, W - 42, 222), 18, paper, (125, 86, 41, 210), 3)
text_center(draw, (180, 181), "铜币 128", font(29), ink)
text_center(draw, (420, 181), "驼铃 18/24", font(29), ink)
text_center(draw, (675, 181), "食单 3/8", font(29), ink)
text_center(draw, (930, 181), "Lv.1 流沙驿", font(29, "title"), gold_dark)

# Compact orders.
orders = [
    ("沙州驿卒", "炉饼 x1", "6", True),
    ("粟特胡商", "胡麻饼 x1", "14", False),
    ("求法僧人", "胡麻饼 x1", "12", False),
]
start_y = 246
for i, (npc, need, reward, ready) in enumerate(orders):
    x = 58 + i * 352
    y = start_y
    rounded(draw, (x, y, x + 330, y + 122), 18, paper2, (126, 84, 42, 190), 2)
    rounded(draw, (x + 13, y + 20, x + 72, y + 79), 12, (224, 194, 142, 255), (122, 86, 50, 150), 2)
    draw.ellipse((x + 30, y + 32, x + 55, y + 57), fill=(103, 73, 50, 210))
    draw.text((x + 86, y + 16), npc, font=font(22), fill=ink)
    draw.text((x + 86, y + 48), need, font=font(21, "light"), fill=muted)
    draw.text((x + 86, y + 78), f"{reward}铜币", font=font(19, "light"), fill=gold_dark)
    rounded(draw, (x + 236, y + 72, x + 310, y + 106), 8, gold if ready else (132, 118, 95, 210), None, 1)
    text_center(draw, (x + 273, y + 88), "交付", font(19), (255, 242, 207, 255))

# Main board 6x8.
icons = crop_icons(Image.open(icons_path).convert("RGBA"))
cols, rows = 6, 8
cell, gap = 132, 10
board_w = cols * cell + (cols - 1) * gap
board_h = rows * cell + (rows - 1) * gap
board_x = (W - board_w) // 2
board_y = 430

rounded(draw, (board_x - 24, board_y - 26, board_x + board_w + 24, board_y + board_h + 26), 24, wood, (73, 43, 24, 230), 4)

placements = {
    (0, 0): 0, (1, 0): 1, (2, 0): 0, (4, 0): 2, (5, 0): 0,
    (1, 1): 0, (3, 1): 1, (5, 1): 3,
    (0, 2): 2, (2, 2): 0, (3, 2): 4,
    (1, 3): 5, (4, 3): 1, (5, 3): 0,
    (0, 4): 3, (2, 4): 6, (4, 4): 2,
    (1, 5): 0, (3, 5): 7, (5, 5): 1,
    (0, 6): 2, (2, 6): 0, (3, 6): 5, (4, 6): 1,
    (1, 7): 0, (4, 7): 2,
}

for r in range(rows):
    for c in range(cols):
        x = board_x + c * (cell + gap)
        y = board_y + r * (cell + gap)
        rounded(draw, (x, y, x + cell, y + cell), 14, (237, 201, 143, 222), (118, 75, 38, 135), 2)
        if (c, r) in placements:
            paste_icon(canvas, icons[placements[(c, r)]], (x + cell / 2, y + cell / 2), 106)

# Small selected info strip.
info_y = board_y + board_h + 44
rounded(draw, (86, info_y, W - 86, info_y + 96), 18, (251, 232, 194, 238), (126, 89, 46, 190), 2)
draw.text((124, info_y + 20), "胡麻饼", font=font(28, "title"), fill=ink)
draw.text((255, info_y + 25), "饼面撒胡麻，一口尝到西域风。", font=font(25, "light"), fill=muted)

# Collapsed keeper guidance bubble.
keeper = Image.open(keeper_path).convert("RGBA")
keeper_crop = keeper.crop((530, 620, 890, 1040))
keeper_crop = cover(keeper_crop, (132, 132))
mask = Image.new("L", (132, 132), 0)
md = ImageDraw.Draw(mask)
md.rounded_rectangle((0, 0, 132, 132), radius=28, fill=255)
keeper_crop.putalpha(mask)

tip_y = info_y + 118
rounded(draw, (92, tip_y, W - 92, tip_y + 152), 22, (250, 231, 190, 234), (127, 87, 43, 190), 2)
canvas.alpha_composite(keeper_crop, (112, tip_y + 10))
draw.text((270, tip_y + 28), "掌柜", font=font(27, "title"), fill=gold_dark)
draw.text((270, tip_y + 72), "案板修宽了，能多备些路上的吃食。", font=font(27, "light"), fill=ink)

# Bottom buttons: shorter.
nav_y = H - 265
buttons = [
    (92, "食单", blue),
    (372, "迎客", gold),
    (652, "驿站", green),
    (932, "行囊", red),
]
for x, label, color in buttons:
    rounded(draw, (x, nav_y, x + 202, nav_y + 112), 10, color, (67, 43, 25, 190), 3)
    text_center(draw, (x + 101, nav_y + 55), label, font(34, "title"), (255, 241, 205, 255))

draw.rectangle((0, H - 88, W, H), fill=(64, 42, 29, 68))
canvas.convert("RGB").save(output_path, quality=95)
print(output_path)
