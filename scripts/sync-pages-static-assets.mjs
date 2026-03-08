import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const distDir = path.join(root, "dist");
const mirrors = ["artifacts", "diagrams", "docs", "src"];

const exists = async (target) => {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
};

if (!(await exists(distDir))) {
  console.error("Cannot sync Pages assets: dist directory does not exist. Run build first.");
  process.exit(1);
}

for (const relPath of mirrors) {
  const source = path.join(root, relPath);
  const destination = path.join(distDir, relPath);
  if (!(await exists(source))) continue;
  await fs.cp(source, destination, { recursive: true, force: true });
}

console.log(`Synced static review assets into ${path.relative(root, distDir)}.`);
