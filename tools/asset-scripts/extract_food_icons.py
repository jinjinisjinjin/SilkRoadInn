from pathlib import Path
from collections import deque

import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter


ROOT = Path("/Users/zhuangjin/Documents/Codex/2026-07-11/hei")
OUT = ROOT / "outputs"
ASSETS = OUT / "丝路食肆_可玩原型_v0.1" / "assets"


SHEETS = [
    (
        OUT / "丝路食肆_肉食线8级美术方案_v2.png",
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
        OUT / "丝路食肆_香料线8级美术方案_v2.png",
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
        OUT / "丝路食肆_果品甜食线8级美术方案_v1.png",
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
        OUT / "丝路食肆_浆饮酒水线8级美术方案_v2.png",
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


def make_icon(cell):
    cell = cell.convert("RGBA")
    arr = np.asarray(cell).astype(np.int16)
    rgb = arr[:, :, :3]
    h, w = rgb.shape[:2]

    patches = [
        rgb[:34, :34],
        rgb[:34, -34:],
        rgb[-34:, :34],
        rgb[-34:, -34:],
    ]
    bg = np.median(np.concatenate([p.reshape(-1, 3) for p in patches], axis=0), axis=0)
    diff = rgb - bg
    dist = np.sqrt(np.sum(diff * diff, axis=2))
    chroma = rgb.max(axis=2) - rgb.min(axis=2)
    bright = rgb.mean(axis=2)

    # Keep colored/dark/bright objects while dropping the parchment backing.
    base = ((chroma > 24) & (bright < 246)) | (bright < 184)
    base[:8, :] = False
    base[-8:, :] = False
    base[:, :8] = False
    base[:, -8:] = False

    mask_img = Image.fromarray((base * 255).astype("uint8"))
    mask_img = mask_img.filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.MinFilter(3))
    mask = np.asarray(mask_img) > 0

    comps = connected_components(mask)
    keep = np.zeros_like(mask, dtype=bool)
    cx, cy = w / 2, h / 2
    subject_zone = (int(w * 0.13), int(h * 0.18), int(w * 0.87), int(h * 0.88))
    for area, x0, y0, x1, y1, xs, ys in comps:
        if area < 120:
            continue
        box_w = x1 - x0
        box_h = y1 - y0
        mx = (x0 + x1) / 2
        my = (y0 + y1) / 2
        overlaps_subject = not (
            x1 < subject_zone[0]
            or x0 > subject_zone[2]
            or y1 < subject_zone[1]
            or y0 > subject_zone[3]
        )
        center_dist = abs(mx - cx) / w + abs(my - cy) / h
        if overlaps_subject and (area > 220 or center_dist < 0.48 or (box_w > 38 and box_h > 22)):
            keep[ys, xs] = True

    if not keep.any():
        keep = mask

    ys, xs = np.where(keep)
    pad = 16
    x0, x1 = max(0, xs.min() - pad), min(w, xs.max() + pad + 1)
    y0, y1 = max(0, ys.min() - pad), min(h, ys.max() + pad + 1)

    alpha = Image.fromarray((keep * 255).astype("uint8")).filter(ImageFilter.GaussianBlur(1.1))
    transparent = Image.new("RGBA", cell.size, (0, 0, 0, 0))
    transparent.paste(cell, (0, 0), alpha)
    cropped = transparent.crop((x0, y0, x1, y1))

    bbox = cropped.getbbox()
    if bbox:
        cropped = cropped.crop(bbox)

    max_side = 214
    scale = min(max_side / cropped.width, max_side / cropped.height)
    new_size = (max(1, round(cropped.width * scale)), max(1, round(cropped.height * scale)))
    cropped = cropped.resize(new_size, Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (256, 256), (0, 0, 0, 0))
    canvas.alpha_composite(cropped, ((256 - new_size[0]) // 2, (256 - new_size[1]) // 2))
    return canvas


def process():
    saved = []
    for sheet_path, names in SHEETS:
        img = Image.open(sheet_path).convert("RGBA")
        cell_w, cell_h = img.width // 4, img.height // 2
        for idx, name in enumerate(names):
            col = idx % 4
            row = idx // 4
            cell = img.crop((col * cell_w, row * cell_h, (col + 1) * cell_w, (row + 1) * cell_h))
            icon = make_icon(cell)
            out_path = ASSETS / name
            icon.save(out_path)
            saved.append((name, icon.copy()))
    return saved


def preview(saved):
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
    draw.text((24, 18), "丝路食肆 剩余四条食物线单图标透明资产预览", fill=(72, 42, 24), font=font)
    for i, (name, icon) in enumerate(saved):
        x = (i % cols) * tile
        y = 56 + (i // cols) * (tile + label_h)
        # Subtle checker/linen backing for transparent asset inspection.
        draw.rounded_rectangle((x + 10, y + 8, x + tile - 10, y + tile - 12), radius=18, fill=(244, 226, 184), outline=(146, 96, 52), width=1)
        canvas.paste(icon.resize((112, 112), Image.Resampling.LANCZOS), (x + 19, y + 14), icon.resize((112, 112), Image.Resampling.LANCZOS))
        draw.text((x + 10, y + tile - 4), name.replace(".png", ""), fill=(74, 44, 27), font=small)
    out_path = OUT / "丝路食肆_剩余四条食物线_透明单图标预览_v3.png"
    canvas.save(out_path)
    return out_path


if __name__ == "__main__":
    saved_icons = process()
    print(preview(saved_icons))
    print(f"saved {len(saved_icons)} icons")
