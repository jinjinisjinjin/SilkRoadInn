from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "outputs"
OUT_PATH = OUT / "丝路食肆_视觉探索12_Logo标题字方向.png"

W, H = 1600, 1200
SONGTI = "/System/Library/Fonts/Supplemental/Songti.ttc"
HEITI = "/System/Library/Fonts/STHeiti Medium.ttc"


def font(path, size):
    return ImageFont.truetype(path, size)


def text_center(draw, box, text, fnt, fill):
    bbox = draw.textbbox((0, 0), text, font=fnt)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x = box[0] + (box[2] - box[0] - tw) / 2
    y = box[1] + (box[3] - box[1] - th) / 2 - 8
    draw.text((x, y), text, font=fnt, fill=fill)


img = Image.new("RGB", (W, H), "#ead3a2")
draw = ImageDraw.Draw(img)

# Paper grain dots.
for x in range(0, W, 17):
    for y in range((x * 7) % 19, H, 23):
        draw.point((x, y), fill="#dec18a")

title_font = font(SONGTI, 118)
subtitle_font = font(HEITI, 34)
small_font = font(HEITI, 28)

draw.text((80, 62), "《丝路食肆》Logo / 标题字探索 v0.1", font=subtitle_font, fill="#4a3425")
draw.text((80, 108), "方向：敦煌写经感 + 唐代木牌题签 + 小游戏可读性；文字为概念，不代表最终字库。", font=small_font, fill="#70543f")

cards = [
    {
        "label": "A 木牌横匾：适合主界面顶部",
        "box": (150, 210, 1450, 440),
        "fill": "#74471f",
        "stroke": "#3f2818",
        "text": "#ffefbd",
        "line": "#c7923f",
        "round": 28,
    },
    {
        "label": "B 古卷题签：适合图鉴与章节标题",
        "box": (150, 510, 1450, 740),
        "fill": "#f4dfad",
        "stroke": "#8b602f",
        "text": "#5b3520",
        "line": "#b87a38",
        "round": 18,
    },
    {
        "label": "C 朱砂印牌：适合启动页/活动章",
        "box": (150, 810, 1450, 1040),
        "fill": "#913f32",
        "stroke": "#57271e",
        "text": "#ffe8ba",
        "line": "#e3b262",
        "round": 22,
    },
]

for card in cards:
    x0, y0, x1, y1 = card["box"]
    draw.rounded_rectangle((x0, y0, x1, y1), radius=card["round"], fill=card["fill"], outline=card["stroke"], width=6)
    draw.text((x0, y0 - 44), card["label"], font=small_font, fill="#4a3425")

    # Decorative corner ticks.
    for sx in (x0 + 42, x1 - 42):
        draw.line((sx - 30, y0 + 32, sx + 30, y0 + 32), fill=card["line"], width=4)
        draw.line((sx - 30, y1 - 32, sx + 30, y1 - 32), fill=card["line"], width=4)
    draw.line((x0 + 360, y1 - 42, x1 - 360, y1 - 42), fill=card["line"], width=4)

    # Slight ink shadow and main title.
    text_box = (x0 + 150, y0 + 30, x1 - 150, y1 - 46)
    shadow_box = (text_box[0] + 4, text_box[1] + 4, text_box[2] + 4, text_box[3] + 4)
    text_center(draw, shadow_box, "丝路食肆", title_font, "#2d1b13")
    text_center(draw, text_box, "丝路食肆", title_font, card["text"])

draw.text((80, 1110), "后续若进入正式商用，需要做真正原创字形矢量化：调整笔画、收笔、重心与间架，不直接依赖系统字体。", font=small_font, fill="#70543f")

img.save(OUT_PATH, quality=95)
print(OUT_PATH)
