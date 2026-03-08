import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const artifactsRoot = path.join(root, "artifacts");
const docsRoot = path.join(artifactsRoot, "documents");
const exportsPdfRoot = path.join(artifactsRoot, "exports", "pdf");
const exportsSlidesRoot = path.join(artifactsRoot, "exports", "slides");
const slidesSourceRoot = path.join(artifactsRoot, "slides", "source");

const requiredTex = ["executive_proposal.tex", "technical_blueprint.tex"];
const requiredPdf = ["executive_proposal.pdf", "technical_blueprint.pdf"];
const slideDeckExtensions = new Set([".pptx", ".odp", ".key", ".pdf"]);

const ensureDir = async (dir) => fs.mkdir(dir, { recursive: true });
const exists = async (target) => {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
};

const copyFile = async (sourceFile, targetFile) => {
  await ensureDir(path.dirname(targetFile));
  await fs.copyFile(sourceFile, targetFile);
  const [srcStat, outStat] = await Promise.all([fs.stat(sourceFile), fs.stat(targetFile)]);
  if (outStat.mtimeMs + 1 < srcStat.mtimeMs) {
    throw new Error(`Stale export after copy: ${targetFile}`);
  }
};

const listExportedDecks = async () => {
  if (!(await exists(exportsSlidesRoot))) return [];
  const entries = await fs.readdir(exportsSlidesRoot, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => slideDeckExtensions.has(path.extname(name).toLowerCase()));
};

const failIfMissing = async (baseDir, files, label) => {
  for (const file of files) {
    const filePath = path.join(baseDir, file);
    if (!(await exists(filePath))) {
      throw new Error(`Missing ${label}: ${filePath}`);
    }
  }
};

await failIfMissing(docsRoot, requiredTex, "authored LaTeX source");
await failIfMissing(docsRoot, requiredPdf, "compiled PDF");

await ensureDir(exportsPdfRoot);
await ensureDir(exportsSlidesRoot);
await ensureDir(slidesSourceRoot);

for (const file of requiredPdf) {
  const source = path.join(docsRoot, file);
  const target = path.join(exportsPdfRoot, file);
  await copyFile(source, target);
  console.log(`synced ${path.relative(root, target)}`);
}

const deckFiles = await listExportedDecks();
const requireFinalDeck = process.env.REQUIRE_FINAL_DECK === "1";
if (deckFiles.length === 0) {
  const message =
    "No finalized slide deck export found in artifacts/exports/slides (expected .pptx/.odp/.key/.pdf).";
  if (requireFinalDeck) {
    throw new Error(message);
  }
  console.warn(`WARN: ${message}`);
}

const manifest = {
  publishedAt: new Date().toISOString(),
  pdf: requiredPdf,
  slides: deckFiles,
};
await fs.writeFile(
  path.join(artifactsRoot, "exports", "publish-manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
  "utf8"
);

console.log("Artifact publish sync complete.");
