from collections import deque
from pathlib import Path

from PIL import Image, ImageStat

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "outputs/丝路食肆_视觉探索15_NPC女性顾客4人.png"
PROTO_ASSETS = ROOT / "outputs/丝路食肆_可玩原型_v0.1/assets"
STANDEE_OUT = PROTO_ASSETS / "npc_standee"
AVATAR_OUT = PROTO_ASSETS / "npc"
STANDEE_OUT.mkdir(parents=True, exist_ok=True)
AVATAR_OUT.mkdir(parents=True, exist_ok=True)

WOMEN = [
    ("npc_dunhuang_woman", (0, 0, 627, 627)),
    ("npc_silkroad_musician", (627, 0, 1254, 627)),
    ("npc_changan_maid", (0, 627, 627, 1254)),
    ("npc_temple_donor", (627, 627, 1254, 1254)),
]

STANDEE_TRIMS = {
    "npc_dunhuang_woman": (54, 0, 40, 0),
    "npc_silkroad_musician": (70, 0, 100, 0),
    "npc_temple_donor": (28, 0, 28, 0),
}


def distance(a, b):
    return sum((int(a[i]) - int(b[i])) ** 2 for i in range(3)) ** 0.5


def background_color(image):
    w, h = image.size
    samples = []
    step_x = max(1, w // 20)
    step_y = max(1, h // 20)
    for x in range(0, w, step_x):
        samples.append(image.getpixel((x, 0))[:3])
        samples.append(image.getpixel((x, h - 1))[:3])
    for y in range(0, h, step_y):
        samples.append(image.getpixel((0, y))[:3])
        samples.append(image.getpixel((w - 1, y))[:3])
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
        is_paper = r > 150 and g > 125 and b > 85 and max(pixel) - min(pixel) < 110
        is_near_edge = distance(pixel, bg) < 70
        if not (is_paper or is_near_edge):
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
            while queue:
                px, py = queue.popleft()
                pixels.append((px, py))
                for nx, ny in ((px - 1, py), (px + 1, py), (px, py - 1), (px, py + 1)):
                    if 0 <= nx < w and 0 <= ny < h:
                        nidx = ny * w + nx
                        if not visited[nidx]:
                            visited[nidx] = 1
                            if alpha.getpixel((nx, ny)) > 0:
                                queue.append((nx, ny))
            components.append((len(pixels), pixels))

    if not components:
        return image

    largest = max(size for size, _ in components)
    keep_threshold = max(900, largest * 0.025)
    new_alpha = Image.new("L", (w, h), 0)
    for size, pixels in components:
        if size >= keep_threshold:
            for pixel in pixels:
                new_alpha.putpixel(pixel, alpha.getpixel(pixel))
    image.putalpha(new_alpha)
    return image


def normalize_standee(image):
    bbox = image.getchannel("A").getbbox()
    if not bbox:
        return Image.new("RGBA", (300, 420), (0, 0, 0, 0))
    image = image.crop(bbox)
    target_w, target_h = 282, 405
    scale = min(target_w / image.width, target_h / image.height)
    image = image.resize((round(image.width * scale), round(image.height * scale)), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (300, 420), (0, 0, 0, 0))
    canvas.alpha_composite(image, ((canvas.width - image.width) // 2, canvas.height - image.height))
    return canvas


def make_avatar(panel):
    crop = panel.crop((50, 30, panel.width - 50, panel.height - 70)).convert("RGBA")
    crop.thumbnail((256, 256), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (256, 256), (238, 216, 178, 255))
    canvas.alpha_composite(crop, ((256 - crop.width) // 2, (256 - crop.height) // 2))
    return canvas


def main():
    sheet = Image.open(SOURCE).convert("RGB")
    for npc_id, crop in WOMEN:
        panel = sheet.crop(crop)
        avatar = make_avatar(panel)
        avatar.save(AVATAR_OUT / f"{npc_id}.png")
        left, top, right, bottom = STANDEE_TRIMS.get(npc_id, (0, 0, 0, 0))
        inner = panel.crop((28 + left, 28 + top, panel.width - 28 - right, panel.height - 28 - bottom))
        standee = normalize_standee(remove_small_alpha_islands(remove_connected_paper(inner)))
        standee.save(STANDEE_OUT / f"{npc_id}.png")
        print(npc_id)


if __name__ == "__main__":
    main()
