import { spawnSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const docsRoot = path.join(root, "artifacts", "documents");
const texFiles = ["executive_proposal.tex", "technical_blueprint.tex"];

const canRun = (bin) => {
  const result = spawnSync(bin, ["--version"], { stdio: "ignore" });
  return !result.error && result.status === 0;
};

const requestedEngine = process.env.LATEX_ENGINE;
const engine = requestedEngine || (canRun("xelatex") ? "xelatex" : canRun("pdflatex") ? "pdflatex" : null);

if (!engine) {
  console.error(
    "No LaTeX engine found. Install xelatex or pdflatex, or set LATEX_ENGINE to an available executable."
  );
  process.exit(1);
}

for (const file of texFiles) {
  const texPath = path.join(docsRoot, file);
  const args = ["-interaction=nonstopmode", "-halt-on-error", "-output-directory", docsRoot, texPath];
  const run = spawnSync(engine, args, { stdio: "inherit" });
  if (run.status !== 0) {
    process.exit(run.status || 1);
  }
}

console.log(`Compiled ${texFiles.length} document(s) with ${engine}.`);
