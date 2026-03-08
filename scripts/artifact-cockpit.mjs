import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const port = Number(process.argv[2] || process.env.PORT || 8080);

const textTypes = new Set([
  ".css",
  ".csv",
  ".html",
  ".js",
  ".json",
  ".md",
  ".mjs",
  ".svg",
  ".tex",
  ".txt",
  ".xml",
  ".yaml",
  ".yml",
]);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".csv": "text/csv; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".tex": "text/plain; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

const spaPrefixes = [
  "/overview",
  "/executive",
  "/blueprint",
  "/explorer",
  "/website",
  "/dashboards",
  "/diagrams",
  "/documents",
  "/downloads",
  "/appendix",
];

const toSafeResolvedPath = (baseDir, requestPath) => {
  const decodedPath = decodeURIComponent(requestPath.split("?")[0]);
  const normalized = decodedPath.replace(/\\/g, "/");
  const relative = normalized.startsWith("/") ? normalized.slice(1) : normalized;
  const resolved = path.resolve(baseDir, relative || ".");
  const baseResolved = path.resolve(baseDir);
  const inBounds =
    resolved.toLowerCase() === baseResolved.toLowerCase() ||
    resolved.toLowerCase().startsWith(`${baseResolved.toLowerCase()}${path.sep.toLowerCase()}`);
  return inBounds ? resolved : null;
};

const fileIfExists = async (filePath) => {
  try {
    const stats = await fs.stat(filePath);
    if (stats.isDirectory()) {
      const indexPath = path.join(filePath, "index.html");
      const indexStats = await fs.stat(indexPath);
      return indexStats.isFile() ? indexPath : null;
    }
    return stats.isFile() ? filePath : null;
  } catch {
    return null;
  }
};

const sendFile = async (res, filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  const mimeType = mimeTypes[ext] || "application/octet-stream";
  const encoding = textTypes.has(ext) ? "utf8" : null;

  try {
    const payload = await fs.readFile(filePath, encoding || undefined);
    res.writeHead(200, {
      "Content-Type": mimeType,
      "Cache-Control": "no-store",
    });
    res.end(payload);
  } catch {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Failed to read file.");
  }
};

const shouldServeSpa = (pathname) =>
  spaPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

const server = http.createServer(async (req, res) => {
  const requestPath = req.url || "/";
  const pathname = requestPath.split("?")[0];

  if (pathname === "/hub" || pathname === "/hub/") {
    res.writeHead(302, { Location: "/overview" });
    res.end();
    return;
  }

  const distCandidate = toSafeResolvedPath(distDir, pathname);
  if (distCandidate) {
    const distFile = await fileIfExists(distCandidate);
    if (distFile) {
      await sendFile(res, distFile);
      return;
    }
  }

  const repoCandidate = toSafeResolvedPath(rootDir, pathname);
  if (repoCandidate) {
    const repoFile = await fileIfExists(repoCandidate);
    if (repoFile) {
      await sendFile(res, repoFile);
      return;
    }
  }

  if (shouldServeSpa(pathname) || path.extname(pathname) === "") {
    const indexFile = await fileIfExists(path.join(distDir, "index.html"));
    if (indexFile) {
      await sendFile(res, indexFile);
      return;
    }
  }

  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not found");
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Artifact cockpit running at http://localhost:${port}/`);
});
