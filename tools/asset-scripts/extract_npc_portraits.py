from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "outputs" / "丝路食肆_可玩原型_v0.1" / "assets" / "npc"
OUT.mkdir(parents=True, exist_ok=True)

sources = {
    "pair": Image.open(ROOT / "outputs" / "丝路食肆_视觉探索06_NPC粟特胡商与求法僧人_v2.png").convert("RGBA"),
    "set_a": Image.open(ROOT / "outputs" / "丝路食肆_视觉探索12_NPC驿卒使者牧民波斯随从_v2.png").convert("RGBA"),
    "set_b": Image.open(ROOT / "outputs" / "丝路食肆_视觉探索14_NPC农户脚夫神秘胡商商队首领.png").convert("RGBA"),
}

# Coordinates are hand-tuned for the current concept sheets.
crops = {
    "npc_sogdian_merchant": ("pair", (70, 115, 640, 690)),
    "npc_pilgrim_monk": ("pair", (610, 130, 1135, 690)),
    "npc_shazhou_guard": ("set_a", (55, 95, 595, 640)),
    "npc_changan_envoy": ("set_a", (600, 90, 1140, 640)),
    "npc_uighur_herder": ("set_a", (80, 690, 610, 1210)),
    "npc_persian_attendant": ("set_a", (610, 690, 1140, 1210)),
    "npc_farmer": ("set_b", (70, 90, 600, 610)),
    "npc_camel_worker": ("set_b", (610, 95, 1140, 610)),
    "npc_mystery_merchant": ("set_b", (80, 680, 610, 1210)),
    "npc_caravan_leader": ("set_b", (610, 680, 1140, 1210)),
}

def make_portrait(img, box, out_path):
    crop = img.crop(box)
    crop = crop.resize((256, 256), Image.Resampling.LANCZOS)
    mask = Image.new("L", (256, 256), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle((0, 0, 256, 256), radius=48, fill=255)
    crop.putalpha(mask)
    crop.save(out_path)

for npc_id, (source_name, box) in crops.items():
    make_portrait(sources[source_name], box, OUT / f"{npc_id}.png")

print(f"wrote {len(crops)} npc portraits to {OUT}")
