import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, isAbsolute, join, relative, resolve } from "node:path";

const [portArg = "4173", host = "127.0.0.1", rootArg = ".", fallbackRootArg] = process.argv.slice(2);
const port = Number(portArg);
const root = resolve(rootArg);
const fallbackRoot = fallbackRootArg ? resolve(fallbackRootArg) : null;
const fallbackPrefixes = ["/design/", "/art/"];

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

function resolveFrom(baseRoot, pathname) {
  let filePath = resolve(baseRoot, pathname.replace(/^[/\\]+/, ""));
  const relativePath = relative(baseRoot, filePath);
  if (relativePath.startsWith("..") || isAbsolute(relativePath)) return null;
  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = join(filePath, "index.html");
  }
  return filePath;
}

function resolveRequest(url) {
  const pathname = decodeURIComponent(new URL(url, `http://${host}:${port}`).pathname);
  const primaryPath = resolveFrom(root, pathname);
  if (primaryPath && existsSync(primaryPath)) return primaryPath;

  const mayUseFallback = fallbackPrefixes.some(
    (prefix) => pathname === prefix.slice(0, -1) || pathname.startsWith(prefix),
  );
  return fallbackRoot && mayUseFallback ? resolveFrom(fallbackRoot, pathname) : primaryPath;
}

createServer((request, response) => {
  const filePath = resolveRequest(request.url);
  if (!filePath || !existsSync(filePath) || !statSync(filePath).isFile()) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  response.writeHead(200, {
    "Content-Type": mime[extname(filePath).toLowerCase()] || "application/octet-stream",
    "Cache-Control": "no-cache",
  });
  createReadStream(filePath).pipe(response);
}).listen(port, host, () => {
  console.log(`Preview serving ${root} at http://${host}:${port}/`);
  if (fallbackRoot) console.log(`Repair resources mounted from ${fallbackRoot}`);
});
