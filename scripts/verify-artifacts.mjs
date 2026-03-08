import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const docsRoot = path.join(root, "artifacts", "documents");
const exportsPdfRoot = path.join(root, "artifacts", "exports", "pdf");
const exportsSlidesRoot = path.join(root, "artifacts", "exports", "slides");
const slidesSourceRoot = path.join(root, "artifacts", "slides", "source");

const requiredTex = ["executive_proposal.tex", "technical_blueprint.tex"];
const requiredPdf = ["executive_proposal.pdf", "technical_blueprint.pdf"];
const slideDeckExtensions = new Set([".pptx", ".odp", ".key", ".pdf"]);
const strictPdfFreshness = process.env.STRICT_PDF_FRESHNESS === "1";

const exists = async (target) => {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
};

const errors = [];
const warnings = [];

const addMissingErrors = async (baseDir, files, label) => {
  for (const file of files) {
    const target = path.join(baseDir, file);
    if (!(await exists(target))) {
      errors.push(`Missing ${label}: ${path.relative(root, target)}`);
    }
  }
};

await addMissingErrors(docsRoot, requiredTex, "authored LaTeX source");
await addMissingErrors(docsRoot, requiredPdf, "compiled PDF source");
await addMissingErrors(exportsPdfRoot, requiredPdf, "published PDF");

for (const file of requiredPdf) {
  const source = path.join(docsRoot, file);
  const published = path.join(exportsPdfRoot, file);
  if (!(await exists(source)) || !(await exists(published))) continue;
  const [sourceStat, publishedStat] = await Promise.all([fs.stat(source), fs.stat(published)]);
  if (publishedStat.mtimeMs + 1 < sourceStat.mtimeMs) {
    const staleMessage = `Published PDF may be stale: ${path.relative(root, published)} is older than ${path.relative(root, source)}`;
    if (strictPdfFreshness) {
      errors.push(staleMessage);
    } else {
      warnings.push(`${staleMessage} (set STRICT_PDF_FRESHNESS=1 to enforce as error)`);
    }
  }
}

if (!(await exists(exportsSlidesRoot))) {
  errors.push(`Missing slides export directory: ${path.relative(root, exportsSlidesRoot)}`);
}
if (!(await exists(slidesSourceRoot))) {
  warnings.push(`Missing slides source directory: ${path.relative(root, slidesSourceRoot)}`);
}

if (await exists(exportsSlidesRoot)) {
  const entries = await fs.readdir(exportsSlidesRoot, { withFileTypes: true });
  const deckFiles = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => slideDeckExtensions.has(path.extname(name).toLowerCase()));
  if (deckFiles.length === 0) {
    warnings.push(
      "No finalized slide deck found in artifacts/exports/slides (.pptx/.odp/.key/.pdf)."
    );
  }
}

for (const warning of warnings) {
  console.warn(`WARN: ${warning}`);
}

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`ERROR: ${error}`);
  }
  process.exit(1);
}

console.log("Artifact verification passed.");
