import json
import shutil
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "outputs" / "资产管线_manifest_v0.1.json"


def rounded_alpha(size, radius):
    mask = Image.new("L", size, 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle((0, 0, size[0], size[1]), radius=radius, fill=255)
    return mask


def resolve_source(base_dir, source):
    path = ROOT / base_dir / source
    if not path.exists():
        raise FileNotFoundError(f"Missing source: {path}")
    return path


def resolve_output(prototype_dir, output):
    path = ROOT / prototype_dir / output
    path.parent.mkdir(parents=True, exist_ok=True)
    return path


def crop_image(img, asset):
    if asset["mode"] == "crop":
        crop = img.crop(tuple(asset["crop"]))
    elif asset["mode"] == "gridCrop":
        grid = asset["grid"]
        columns = grid["columns"]
        rows = grid["rows"]
        index = grid["index"]
        padding = grid.get("padding", 0)
        col = index % columns
        row = index // columns
        cell_w = img.width / columns
        cell_h = img.height / rows
        crop = img.crop(
            (
                int(col * cell_w + padding),
                int(row * cell_h + padding),
                int((col + 1) * cell_w - padding),
                int((row + 1) * cell_h - padding),
            )
        )
    else:
        raise ValueError(f"Unsupported crop mode: {asset['mode']}")

    size = tuple(asset.get("size", crop.size))
    crop = crop.resize(size, Image.Resampling.LANCZOS).convert("RGBA")
    radius = asset.get("rounded")
    if radius:
        crop.putalpha(rounded_alpha(size, radius))
    return crop


def build():
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    base_dir = manifest["baseDir"]
    prototype_dir = manifest["prototypeDir"]
    built = []

    for asset in manifest["assets"]:
        source = resolve_source(base_dir, asset["source"])
        output = resolve_output(prototype_dir, asset["output"])
        mode = asset["mode"]

        if mode == "copy":
            shutil.copyfile(source, output)
        elif mode in {"crop", "gridCrop"}:
            img = Image.open(source).convert("RGBA")
            crop_image(img, asset).save(output)
        else:
            raise ValueError(f"Unsupported mode for {asset['id']}: {mode}")

        built.append((asset["id"], output))

    print(f"Built {len(built)} assets")
    for asset_id, output in built:
        print(f"- {asset_id}: {output.relative_to(ROOT)}")


if __name__ == "__main__":
    build()
