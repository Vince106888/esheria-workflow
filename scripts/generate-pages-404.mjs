import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const distDir = path.join(root, "dist");
const indexFile = path.join(distDir, "index.html");
const fallbackFile = path.join(distDir, "404.html");

try {
  await fs.access(indexFile);
} catch {
  console.error("Cannot generate Pages fallback: dist/index.html does not exist.");
  process.exit(1);
}

await fs.copyFile(indexFile, fallbackFile);
console.log("Generated GitHub Pages SPA fallback: dist/404.html");
