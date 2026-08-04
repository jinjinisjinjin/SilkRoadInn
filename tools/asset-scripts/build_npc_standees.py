from collections import deque
from pathlib import Path

from PIL import Image, ImageStat

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "outputs/丝路食肆_可玩原型_v0.1/assets/npc_standee"
OUT.mkdir(parents=True, exist_ok=True)

STANDEES = [
    ("outputs/丝路食肆_视觉探索06_NPC粟特胡商与求法僧人_v2.png", "npc_sogdian_merchant", (0, 95, 515, 1425)),
    ("outputs/丝路食肆_视觉探索06_NPC粟特胡商与求法僧人_v2.png", "npc_pilgrim_monk", (505, 85, 1024, 1435)),
    ("outputs/丝路食肆_视觉探索12_NPC驿卒使者牧民波斯随从_v2.png", "npc_shazhou_guard", (0, 75, 530, 825)),
    ("outputs/丝路食肆_视觉探索12_NPC驿卒使者牧民波斯随从_v2.png", "npc_changan_envoy", (500, 72, 1024, 825)),
    ("outputs/丝路食肆_视觉探索12_NPC驿卒使者牧民波斯随从_v2.png", "npc_uighur_herder", (5, 720, 535, 1505)),
    ("outputs/丝路食肆_视觉探索12_NPC驿卒使者牧民波斯随从_v2.png", "npc_persian_attendant", (500, 720, 1024, 1510)),
    ("outputs/丝路食肆_视觉探索14_NPC农户脚夫神秘胡商商队首领.png", "npc_farmer", (0, 60, 525, 770)),
    ("outputs/丝路食肆_视觉探索14_NPC农户脚夫神秘胡商商队首领.png", "npc_camel_worker", (495, 62, 1024, 775)),
    ("outputs/丝路食肆_视觉探索14_NPC农户脚夫神秘胡商商队首领.png", "npc_mystery_merchant", (0, 720, 525, 1505)),
    ("outputs/丝路食肆_视觉探索14_NPC农户脚夫神秘胡商商队首领.png", "npc_caravan_leader", (495, 720, 1024, 1508)),
]

VISUAL_OVERRIDES = {
    "npc_pilgrim_monk": {"crop_bottom": 0.82},
    "npc_sogdian_merchant": {"crop_bottom": 0.78},
}


def distance(a, b):
    return sum((int(a[i]) - int(b[i])) ** 2 for i in range(3)) ** 0.5


def background_color(image):
    w, h = image.size
    samples = []
    for x in range(0, w, max(1, w // 24)):
        samples.append(image.getpixel((x, 0))[:3])
        samples.append(image.getpixel((x, h - 1))[:3])
    for y in range(0, h, max(1, h // 24)):
        samples.append(image.getpixel((0, y))[:3])
        samples.append(image.getpixel((w - 1, y))[:3])
    stat = ImageStat.Stat(Image.new("RGB", (len(samples), 1)))
    # Manual average keeps this script dependency-light and predictable.
    return tuple(sum(pixel[i] for pixel in samples) // len(samples) for i in range(3))


def remove_connected_paper(image):
    image = image.convert("RGBA")
    w, h = image.size
    bg = background_color(image)
    alpha = image.getchannel("A")
    seen = bytearray(w * h)
    queue = deque()

    def enqueue(x, y):
        idx = y * w + x
        if not seen[idx]:
            seen[idx] = 1
            queue.append((x, y))

    for x in range(w):
        enqueue(x, 0)
        enqueue(x, h - 1)
    for y in range(h):
        enqueue(0, y)
        enqueue(w - 1, y)

    while queue:
        x, y = queue.popleft()
        pixel = image.getpixel((x, y))[:3]
        r, g, b = pixel
        is_light_paper = r > 145 and g > 120 and b > 82 and max(pixel) - min(pixel) < 95
        is_near_edge_color = distance(pixel, bg) < 58
        if not (is_light_paper or is_near_edge_color):
            continue
        alpha.putpixel((x, y), 0)
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < w and 0 <= ny < h:
                idx = ny * w + nx
                if not seen[idx]:
                    seen[idx] = 1
                    queue.append((nx, ny))

    image.putalpha(alpha)
    return image


def remove_small_alpha_islands(image):
    image = image.convert("RGBA")
    w, h = image.size
    alpha = image.getchannel("A")
    visited = bytearray(w * h)
    components = []

    for y in range(h):
        for x in range(w):
            idx = y * w + x
            if visited[idx] or alpha.getpixel((x, y)) == 0:
                visited[idx] = 1
                continue
            queue = deque([(x, y)])
            visited[idx] = 1
            pixels = []
            touches_edge = False
            while queue:
                px, py = queue.popleft()
                pixels.append((px, py))
                if px in (0, w - 1) or py in (0, h - 1):
                    touches_edge = True
                for nx, ny in ((px - 1, py), (px + 1, py), (px, py - 1), (px, py + 1)):
                    if 0 <= nx < w and 0 <= ny < h:
                        nidx = ny * w + nx
                        if not visited[nidx]:
                            visited[nidx] = 1
                            if alpha.getpixel((nx, ny)) > 0:
                                queue.append((nx, ny))
            components.append((len(pixels), touches_edge, pixels))

    if not components:
        return image

    largest = max(size for size, _, _ in components)
    keep_threshold = max(900, largest * 0.025)
    new_alpha = Image.new("L", (w, h), 0)
    for size, touches_edge, pixels in components:
        if touches_edge and size < largest * 0.45:
            continue
        if size >= keep_threshold:
            for pixel in pixels:
                new_alpha.putpixel(pixel, alpha.getpixel(pixel))
    image.putalpha(new_alpha)
    return image


def normalize_standee(image, scale_boost=1.0, stretch_x=1.0, crop_bottom=1.0):
    bbox = image.getchannel("A").getbbox()
    if not bbox:
        return Image.new("RGBA", (300, 420), (0, 0, 0, 0))
    image = image.crop(bbox)
    if crop_bottom < 1.0:
        image = image.crop((0, 0, image.width, max(1, round(image.height * crop_bottom))))
    target_h = 405
    target_w = 282
    base_scale = min(target_w / image.width, target_h / image.height)
    max_scale = min(300 / image.width, 420 / image.height)
    scale = min(base_scale * scale_boost, max_scale)
    size = (max(1, round(image.width * scale)), max(1, round(image.height * scale)))
    image = image.resize(size, Image.Resampling.LANCZOS)
    if stretch_x != 1.0:
        stretched_width = min(300, max(1, round(image.width * stretch_x)))
        image = image.resize((stretched_width, image.height), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (300, 420), (0, 0, 0, 0))
    x = (canvas.width - image.width) // 2
    y = canvas.height - image.height
    canvas.alpha_composite(image, (x, y))
    return canvas


def main():
    for source, npc_id, crop in STANDEES:
        image = Image.open(ROOT / source).crop(crop)
        override = VISUAL_OVERRIDES.get(npc_id, {})
        standee = normalize_standee(
            remove_small_alpha_islands(remove_connected_paper(image)),
            override.get("scale", 1.0),
            override.get("stretch_x", 1.0),
            override.get("crop_bottom", 1.0),
        )
        path = OUT / f"{npc_id}.png"
        standee.save(path)
        print(path.relative_to(ROOT))


if __name__ == "__main__":
    main()
