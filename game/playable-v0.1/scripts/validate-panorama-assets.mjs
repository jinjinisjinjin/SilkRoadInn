import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import sharp from "sharp";

const root = resolve(import.meta.dirname, "..");
const app = readFileSync(resolve(root, "app.js"), "utf8");
const source = app.match(/const LONGSCROLL_REPAIRED_SOURCE = `\$\{LONGSCROLL_ROOT\}\/([^`]+)`;/);
assert.ok(source, "The repaired panorama must have an identifiable asset source");
const file = process.argv[2]
  ? resolve(root, process.argv[2])
  : resolve(root, "assets/longscroll", source[1]);
const metadata = await sharp(file).metadata();
assert.equal(metadata.width, 1254, "Repaired art must retain mask coordinates");
assert.equal(metadata.height, 1254, "Repaired art must retain mask coordinates");
if (metadata.hasAlpha) {
  const stats = await sharp(file).stats();
  assert.equal(stats.channels.at(-1).min, 255,
    "The full repaired scene must be opaque; striped alpha holes expose the damaged base");
}
console.log("Panorama: full repaired artwork is opaque and preserves 1254×1254 mask coordinates.");
