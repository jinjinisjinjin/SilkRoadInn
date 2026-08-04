from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "outputs"

W, H = 1170, 2532

bg_path = OUT / "丝路食肆_视觉探索02_Lv1流沙驿后厨_明亮版.png"
icons_path = OUT / "丝路食肆_视觉探索04_胡饼8级图标合辑_v2.png"
keeper_path = OUT / "丝路食肆_视觉探索08_主角女掌柜.png"
output_path = OUT / "丝路食肆_视觉探索09_Lv1完整主界面Mockup.png"

FONT = "/System/Library/Fonts/STHeiti Medium.ttc"
FONT_LIGHT = "/System/Library/Fonts/STHeiti Light.ttc"


def font(size, light=False):
    return ImageFont.truetype(FONT_LIGHT if light else FONT, size)


def cover(img, size):
    tw, th = size
    scale = max(tw / img.width, th / img.height)
    nw, nh = int(img.width * scale), int(img.height * scale)
    resized = img.resize((nw, nh), Image.Resampling.LANCZOS)
    left = (nw - tw) // 2
    top = (nh - th) // 2
    return resized.crop((left, top, left + tw, top + th))


def rounded(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def paste_icon(base, icon, center, size):
    im = icon.resize((size, size), Image.Resampling.LANCZOS)
    x = center[0] - size // 2
    y = center[1] - size // 2
    base.alpha_composite(im, (x, y))


def crop_icons(sheet):
    icons = []
    cell_w = sheet.width / 4
    cell_h = sheet.height / 2
    for row in range(2):
        for col in range(4):
            x0 = int(col * cell_w + 30)
            y0 = int(row * cell_h + 30)
            x1 = int((col + 1) * cell_w - 30)
            y1 = int((row + 1) * cell_h - 30)
            crop = sheet.crop((x0, y0, x1, y1)).convert("RGBA")
            icons.append(crop)
    return icons


def draw_text_center(draw, xy, text, fnt, fill):
    bbox = draw.textbbox((0, 0), text, font=fnt)
    draw.text((xy[0] - (bbox[2] - bbox[0]) / 2, xy[1] - (bbox[3] - bbox[1]) / 2), text, font=fnt, fill=fill)


bg = cover(Image.open(bg_path).convert("RGB"), (W, H)).convert("RGBA")

# Mild bright veil for UI readability.
veil = Image.new("RGBA", (W, H), (246, 224, 178, 42))
bg.alpha_composite(veil)
canvas = bg
draw = ImageDraw.Draw(canvas)

paper = (245, 222, 176, 224)
paper_light = (252, 235, 196, 232)
ink = (58, 42, 31, 255)
muted = (99, 72, 49, 255)
gold = (150, 103, 43, 255)
dark_gold = (116, 75, 33, 255)
stone_blue = (66, 103, 116, 245)
malachite = (75, 122, 91, 245)
disabled = (124, 111, 93, 180)

# Top resource bar.
rounded(draw, (40, 42, W - 40, 150), 24, (247, 225, 182, 232), (121, 86, 42, 220), 3)
draw_text_center(draw, (165, 97), "铜币 128", font(34), ink)
draw_text_center(draw, (W // 2, 97), "驼铃 18/24", font(34), ink)
draw_text_center(draw, (W - 175, 97), "食单 3/8", font(34), ink)

# Title tag.
rounded(draw, (384, 170, 786, 238), 18, (80, 112, 116, 220), None, 1)
draw_text_center(draw, (585, 204), "流沙驿 · 后厨", font(33), (255, 242, 205, 255))

# Order cards.
orders = [
    ("沙州驿卒", "炉饼 x1", "6", True),
    ("粟特胡商", "胡麻饼 x1", "14", False),
    ("求法僧人", "胡麻饼 x1", "12", False),
]
order_x, order_y = 58, 270
card_w, card_h, gap = 470, 132, 18
for i, (npc, need, reward, ready) in enumerate(orders):
    y = order_y + i * (card_h + gap)
    rounded(draw, (order_x, y, order_x + card_w, y + card_h), 20, paper, (127, 87, 43, 210), 3)
    # portrait placeholder
    rounded(draw, (order_x + 18, y + 22, order_x + 92, y + 96), 16, (224, 194, 142, 255), (122, 86, 50, 180), 2)
    draw.ellipse((order_x + 39, y + 35, order_x + 71, y + 67), fill=(109, 79, 52, 220))
    draw.arc((order_x + 36, y + 55, order_x + 74, y + 93), 200, -20, fill=(109, 79, 52, 220), width=5)
    draw.text((order_x + 112, y + 20), npc, font=font(27), fill=ink)
    draw.text((order_x + 112, y + 60), need, font=font(27, light=True), fill=muted)
    draw.text((order_x + 112, y + 97), f"奖励 {reward} 铜币", font=font(22, light=True), fill=dark_gold)
    btn_fill = gold if ready else disabled
    rounded(draw, (order_x + 340, y + 70, order_x + 448, y + 113), 10, btn_fill, None, 1)
    draw_text_center(draw, (order_x + 394, y + 91), "交付", font(24), (255, 241, 205, 255))

# Board panel.
board_x, board_y = 160, 765
cell, cell_gap = 150, 16
board_w = 5 * cell + 4 * cell_gap
board_h = 6 * cell + 5 * cell_gap
rounded(draw, (board_x - 28, board_y - 32, board_x + board_w + 28, board_y + board_h + 32), 26, (124, 80, 45, 180), (96, 59, 31, 210), 4)

icons = crop_icons(Image.open(icons_path).convert("RGBA"))
placements = {
    (0, 0): 0,
    (1, 0): 0,
    (2, 0): 1,
    (4, 0): 2,
    (1, 1): 1,
    (3, 1): 2,
    (0, 2): 3,
    (2, 2): 0,
    (4, 2): 4,
    (1, 3): 5,
    (3, 3): 0,
    (0, 4): 2,
    (2, 4): 6,
    (4, 4): 1,
}

for r in range(6):
    for c in range(5):
        x = board_x + c * (cell + cell_gap)
        y = board_y + r * (cell + cell_gap)
        rounded(draw, (x, y, x + cell, y + cell), 18, (236, 202, 145, 205), (116, 75, 39, 150), 2)
        if (c, r) in placements:
            paste_icon(canvas, icons[placements[(c, r)]], (x + cell // 2, y + cell // 2), 126)

# Selected item info.
rounded(draw, (112, 1810, W - 112, 1928), 24, (250, 230, 188, 232), (126, 89, 46, 200), 3)
draw.text((145, 1832), "选中：胡麻饼", font=font(31), fill=ink)
draw.text((145, 1877), "饼面撒胡麻，一口尝到西域风。", font=font(27, light=True), fill=muted)

# Keeper dialogue portrait from lower-right vignette.
keeper = Image.open(keeper_path).convert("RGBA")
keeper_crop = keeper.crop((500, 600, 900, 1040))
keeper_crop = cover(keeper_crop, (210, 210))
mask = Image.new("L", (210, 210), 0)
md = ImageDraw.Draw(mask)
md.rounded_rectangle((0, 0, 210, 210), radius=34, fill=255)
portrait = Image.new("RGBA", (210, 210), (0, 0, 0, 0))
portrait.alpha_composite(keeper_crop)
portrait.putalpha(mask)

dialog_y = 1960
rounded(draw, (58, dialog_y, W - 58, dialog_y + 220), 28, (250, 231, 190, 238), (127, 87, 43, 220), 3)
canvas.alpha_composite(portrait, (78, dialog_y + 5))
draw.text((320, dialog_y + 38), "掌柜", font=font(30), fill=dark_gold)
draw.text((320, dialog_y + 88), "远处有驼铃声。先收下这份麦面，", font=font(29, light=True), fill=ink)
draw.text((320, dialog_y + 132), "试着在案板上揉成炉饼吧。", font=font(29, light=True), fill=ink)

# Bottom navigation.
nav_y = 2242
buttons = [
    (118, "食单", stone_blue),
    (435, "迎客", gold),
    (752, "驿站", malachite),
]
for x, label, color in buttons:
    rounded(draw, (x, nav_y, x + 300, nav_y + 156), 22, color, (72, 47, 31, 190), 3)
    draw_text_center(draw, (x + 150, nav_y + 78), label, font(42), (255, 243, 210, 255))

# Bottom safe area shade.
draw.rectangle((0, H - 58, W, H), fill=(67, 45, 30, 60))

canvas.convert("RGB").save(output_path, quality=95)
print(output_path)
