import { copyFile, lstat, mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const sourceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = path.join(sourceRoot, "dist");
const releaseModeSource =
  'const BUILD_MODE = new URLSearchParams(location.search).get("mode") === "release" ? "release" : "dev";';
const releaseModeOutput = 'const BUILD_MODE = "release";';
const textExtensions = new Set([".css", ".html", ".js", ".json", ".svg", ".webmanifest"]);
const rasterSourceExtensions = new Set([".png", ".jpg", ".jpeg"]);
const skippedDirectories = new Set(["dist", "node_modules", "scripts", "design-previews", ".playwright-cli"]);
const skippedFiles = new Set(["README.md", "package.json", "package-lock.json", "vercel.json", ".DS_Store"]);
const productionDesignPreviews = Object.freeze([
  path.join("design-previews", "seven-day-activity-panel-v1.html"),
]);

if (path.relative(sourceRoot, outputRoot) !== "dist") {
  throw new Error("The production output must be the game's own dist directory.");
}

try {
  const existingOutput = await lstat(outputRoot);
  if (existingOutput.isSymbolicLink()) {
    throw new Error("Refusing to replace a symbolic-link dist directory.");
  }
  await rm(outputRoot, { recursive: true });
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const inputs = [];
async function collect(directory, relativeDirectory = "") {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name.endsWith(".bak") || skippedFiles.has(entry.name)) continue;
    const relativePath = path.join(relativeDirectory, entry.name);
    if (entry.isDirectory()) {
      if (!skippedDirectories.has(entry.name)) {
        await collect(path.join(directory, entry.name), relativePath);
      }
    } else if (entry.isFile()) {
      inputs.push(relativePath);
    } else {
      throw new Error(`Unsupported source entry: ${relativePath}`);
    }
  }
}
await collect(sourceRoot);
inputs.push(...productionDesignPreviews);

const outputPaths = new Set();
for (const relativePath of inputs) {
  const destination = relativePath.replace(/\.(?:png|jpe?g)$/i, ".webp");
  if (outputPaths.has(destination)) {
    throw new Error(`Production asset name collision: ${destination}`);
  }
  outputPaths.add(destination);
}

let nextInput = 0;
let convertedImages = 0;
let recompressedImages = 0;
let totalBytes = 0;
async function worker() {
  while (nextInput < inputs.length) {
    const relativePath = inputs[nextInput++];
    const source = path.join(sourceRoot, relativePath);
    const sourceExtension = path.extname(relativePath).toLowerCase();
    const destination = path.join(outputRoot, relativePath.replace(/\.(?:png|jpe?g)$/i, ".webp"));
    await mkdir(path.dirname(destination), { recursive: true });

    if (rasterSourceExtensions.has(sourceExtension)) {
      const isAlphaMask = relativePath.includes(`${path.sep}masks-alpha${path.sep}`);
      await sharp(source)
        .webp(isAlphaMask ? { lossless: true, effort: 4 } : { quality: 82, effort: 4 })
        .toFile(destination);
      convertedImages++;
    } else if (/\.webp$/i.test(relativePath)) {
      await sharp(source).webp({ quality: 82, effort: 4 }).toFile(destination);
      recompressedImages++;
    } else if (textExtensions.has(path.extname(relativePath).toLowerCase())) {
      let content = await readFile(source, "utf8");
      if (relativePath === "app.js") {
        if (content.split(releaseModeSource).length !== 2) {
          throw new Error("Could not find the expected development-mode switch in app.js.");
        }
        content = content.replace(releaseModeSource, releaseModeOutput);
      }
      content = content.replaceAll(".png", ".webp");
      content = content.replaceAll(".jpg", ".webp");
      content = content.replaceAll(".jpeg", ".webp");
      if (relativePath === "index.html") {
        content = content.replace('type="image/png"', 'type="image/webp"');
      }
      if (/\.(?:png|jpe?g)/i.test(content)) {
        throw new Error(`Unconverted raster reference in ${relativePath}.`);
      }
      await writeFile(destination, content);
    } else {
      await copyFile(source, destination);
    }
    const destinationStat = await stat(destination);
    totalBytes += destinationStat.size;
  }
}

await Promise.all(Array.from({ length: 4 }, () => worker()));

if (!outputPaths.has("index.html") || !outputPaths.has("app.js")) {
  throw new Error("Production output is missing the playable entry point.");
}
console.log(
  `Built ${inputs.length} production files (${convertedImages} raster images converted, ${recompressedImages} WebP images recompressed, ${(totalBytes / 1048576).toFixed(1)} MiB).`,
);
