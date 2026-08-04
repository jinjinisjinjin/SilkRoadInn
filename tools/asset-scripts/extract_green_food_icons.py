from pathlib import Path
from collections import deque

import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter


ROOT = Path("/Users/zhuangjin/Documents/Codex/2026-07-11/hei")
OUT = ROOT / "outputs"
ASSETS = OUT / "丝路食肆_可玩原型_v0.1" / "assets"


SHEETS = [
    (
        OUT / "丝路食肆_肉食线8级绿幕源图_v1.png",
        [
            "meat_lv01_yangrou_luan.png",
            "meat_lv02_roumi_xian.png",
            "meat_lv03_roupu.png",
            "meat_lv04_jiaochi_yangrou.png",
            "meat_lv05_yangrou_geng.png",
            "meat_lv06_suzhi_yanglei.png",
            "meat_lv07_zhiyangrou.png",
            "meat_lv08_shangdui_zhiyangyan.png",
        ],
    ),
    (
        OUT / "丝路食肆_香料线8级绿幕源图_v1.png",
        [
            "spice_lv01_huma.png",
            "spice_lv02_ziran_mo.png",
            "spice_lv03_hujiao_li.png",
            "spice_lv04_jiaochi_jiang.png",
            "spice_lv05_xiangliao_yan.png",
            "spice_lv06_hexiang_jiangzhan.png",
            "spice_lv07_xiyu_xiangliao_xia.png",
            "spice_lv08_silu_baiwei_xia.png",
        ],
    ),
    (
        OUT / "丝路食肆_果品甜食线8级绿幕源图_v1.png",
        [
            "fruit_lv01_putao.png",
            "fruit_lv02_gan_putao.png",
            "fruit_lv03_yezao.png",
            "fruit_lv04_wuhuaguo.png",
            "fruit_lv05_guopu_pan.png",
            "fruit_lv06_mijian_guo.png",
            "fruit_lv07_hutao_miguo.png",
            "fruit_lv08_xiyu_zhenguo_pan.png",
        ],
    ),
    (
        OUT / "丝路食肆_浆饮酒水线8级绿幕源图_v1.png",
        [
            "drink_lv01_putaozhi.png",
            "drink_lv02_putaojiang.png",
            "drink_lv03_sanlejiang.png",
            "drink_lv04_shiliujiang.png",
            "drink_lv05_mijiang.png",
            "drink_lv06_putaojiu.png",
            "drink_lv07_xiangyaojiu.png",
            "drink_lv08_silu_yanyin.png",
        ],
    ),
]


def remove_green(cell: Image.Image) -> Image.Image:
    rgba = cell.convert("RGBA")
    arr = np.asarray(rgba).copy()
    r = arr[:, :, 0].astype(np.int16)
    g = arr[:, :, 1].astype(np.int16)
    b = arr[:, :, 2].astype(np.int16)

    # Remove only the pure chroma-key background. Preserve natural mineral greens
    # on grapes, leaves, ceramic patterns, and Dunhuang ornament.
    hard = (g > 215) & (r < 70) & (b < 70)
    soft = (g > 185) & (r < 105) & (b < 105)
    key_strength = np.clip((g - np.maximum(r, b) - 80) * 3, 0, 255)
    alpha = np.where(soft, 255 - key_strength, 255)
    alpha[hard] = 0
    alpha = Image.fromarray(alpha.astype("uint8")).filter(ImageFilter.GaussianBlur(0.45))
    arr[:, :, 3] = np.asarray(alpha)

    # Despill any green edge pixels left on the antialias fringe.
    fringe = (arr[:, :, 3] > 0) & (arr[:, :, 3] < 245)
    arr[:, :, 1][fringe] = np.minimum(arr[:, :, 1][fringe], ((arr[:, :, 0][fringe].astype(int) + arr[:, :, 2][fringe].astype(int)) // 2 + 8).astype(np.uint8))
    return Image.fromarray(arr, "RGBA")


def connected_components(mask):
    h, w = mask.shape
    seen = np.zeros_like(mask, dtype=bool)
    comps = []
    for y in range(h):
        for x in range(w):
            if not mask[y, x] or seen[y, x]:
                continue
            q = deque([(x, y)])
            seen[y, x] = True
            xs = []
            ys = []
            while q:
                cx, cy = q.popleft()
                xs.append(cx)
                ys.append(cy)
                for nx, ny in ((cx + 1, cy), (cx - 1, cy), (cx, cy + 1), (cx, cy - 1)):
                    if 0 <= nx < w and 0 <= ny < h and mask[ny, nx] and not seen[ny, nx]:
                        seen[ny, nx] = True
                        q.append((nx, ny))
            comps.append((len(xs), min(xs), min(ys), max(xs) + 1, max(ys) + 1, np.array(xs), np.array(ys)))
    return comps


def keep_center_subject(icon: Image.Image) -> Image.Image:
    arr = np.asarray(icon).copy()
    alpha = arr[:, :, 3] > 18
    if not alpha.any():
        return icon
    h, w = alpha.shape
    cx, cy = w / 2, h / 2
    keep = np.zeros_like(alpha, dtype=bool)
    for area, x0, y0, x1, y1, xs, ys in connected_components(alpha):
        if area < 90:
            continue
        mx = (x0 + x1) / 2
        my = (y0 + y1) / 2
        box_w = x1 - x0
        box_h = y1 - y0
        dist = abs(mx - cx) / w + abs(my - cy) / h
        overlaps_core = not (x1 < w * 0.18 or x0 > w * 0.82 or y1 < h * 0.12 or y0 > h * 0.9)
        center_in_core = (w * 0.18 <= mx <= w * 0.82) and (h * 0.12 <= my <= h * 0.9)
        if overlaps_core and center_in_core and (dist < 0.54 or (box_w > 50 and box_h > 40 and dist < 0.6)):
            keep[ys, xs] = True
    if keep.any():
        arr[:, :, 3] = np.where(keep, arr[:, :, 3], 0)
    return Image.fromarray(arr, "RGBA")


def normalize(icon: Image.Image) -> Image.Image:
    bbox = icon.getbbox()
    if not bbox:
        return Image.new("RGBA", (256, 256), (0, 0, 0, 0))
    icon = icon.crop(bbox)
    max_side = 214
    scale = min(max_side / icon.width, max_side / icon.height)
    new_size = (max(1, round(icon.width * scale)), max(1, round(icon.height * scale)))
    icon = icon.resize(new_size, Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (256, 256), (0, 0, 0, 0))
    canvas.alpha_composite(icon, ((256 - new_size[0]) // 2, (256 - new_size[1]) // 2))
    return canvas


def split_sheet(path: Path, names):
    img = Image.open(path).convert("RGBA")
    saved = []
    cell_w = img.width / 4
    cell_h = img.height / 2
    overlap_x = round(cell_w * 0.14)
    overlap_y = round(cell_h * 0.1)
    for idx, name in enumerate(names):
        col = idx % 4
        row = idx // 4
        center_x = (col + 0.5) * cell_w
        center_y = (row + 0.5) * cell_h
        x0 = max(0, round(center_x - cell_w / 2 - overlap_x))
        x1 = min(img.width, round(center_x + cell_w / 2 + overlap_x))
        y0 = max(0, round(center_y - cell_h / 2 - overlap_y))
        y1 = min(img.height, round(center_y + cell_h / 2 + overlap_y))
        cell = img.crop((x0, y0, x1, y1))
        icon = normalize(keep_center_subject(remove_green(cell)))
        icon.save(ASSETS / name)
        saved.append((name, icon))
    return saved


def make_preview(saved):
    cols = 8
    rows = 4
    tile = 150
    label_h = 26
    canvas = Image.new("RGB", (cols * tile, rows * (tile + label_h) + 64), (232, 205, 156))
    draw = ImageDraw.Draw(canvas)
    try:
        font = ImageFont.truetype("/System/Library/Fonts/PingFang.ttc", 16)
        small = ImageFont.truetype("/System/Library/Fonts/PingFang.ttc", 12)
    except Exception:
        font = small = None
    draw.text((24, 18), "丝路食肆 剩余四条食物线透明图标预览 v7", fill=(72, 42, 24), font=font)
    for i, (name, icon) in enumerate(saved):
        x = (i % cols) * tile
        y = 56 + (i // cols) * (tile + label_h)
        draw.rounded_rectangle((x + 10, y + 8, x + tile - 10, y + tile - 12), radius=18, fill=(244, 226, 184), outline=(146, 96, 52), width=1)
        resized = icon.resize((112, 112), Image.Resampling.LANCZOS)
        canvas.paste(resized, (x + 19, y + 14), resized)
        draw.text((x + 10, y + tile - 4), name.replace(".png", ""), fill=(74, 44, 27), font=small)
    out = OUT / "丝路食肆_剩余四条食物线_透明单图标预览_v7.png"
    canvas.save(out)
    return out


if __name__ == "__main__":
    all_saved = []
    for sheet_path, names in SHEETS:
        all_saved.extend(split_sheet(sheet_path, names))
    print(make_preview(all_saved))
    print(f"saved {len(all_saved)} icons")
