import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const args = process.argv.slice(2);

const getArgValue = (flag) => {
  const index = args.indexOf(flag);
  if (index < 0) return null;
  return args[index + 1] || null;
};

const reportPathArg = getArgValue("--report-path");
const reportPathEnv = process.env.READINESS_REPORT_PATH;
const reportPath = path.resolve(
  root,
  reportPathArg || reportPathEnv || "artifacts/reports/readiness-report.json"
);

const requireSubmissionPdfs = process.env.REQUIRE_SUBMISSION_PDFS !== "0";
const requireBuildOutput = process.env.REQUIRE_BUILD_OUTPUT !== "0";
const requireExecutiveDeck = process.env.REQUIRE_EXECUTIVE_DECK === "1";
const expectedExecutiveDeckFiles = [
  "artifacts/exports/slides/esheria-workflow-executive-deck.pdf",
  "artifacts/exports/slides/esheria-workflow-executive-deck.pptx",
];

const checks = [];
const warnings = [];
const errors = [];

const ensureParentDir = async (targetPath) => {
  await fs.mkdir(path.dirname(targetPath), { recursive: true });
};

const exists = async (targetPath) => {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
};

const checkFile = async ({ label, relPath, required = true }) => {
  const absPath = path.join(root, relPath);
  const ok = await exists(absPath);
  checks.push({ label, path: relPath, kind: "file", required, ok });
  if (!ok) {
    const message = `Missing ${label}: ${relPath}`;
    if (required) errors.push(message);
    else warnings.push(message);
  }
};

const checkDir = async ({ label, relPath, required = true }) => {
  const absPath = path.join(root, relPath);
  const ok = await exists(absPath);
  checks.push({ label, path: relPath, kind: "directory", required, ok });
  if (!ok) {
    const message = `Missing ${label}: ${relPath}`;
    if (required) errors.push(message);
    else warnings.push(message);
  }
};

await checkFile({ label: "README", relPath: "README.md" });
await checkFile({ label: "release checklist", relPath: "RELEASE_CHECKLIST.md" });
await checkFile({ label: "package manifest", relPath: "package.json" });

await checkDir({ label: "PDF export directory", relPath: "artifacts/exports/pdf" });
await checkDir({ label: "slides export directory", relPath: "artifacts/exports/slides" });
await checkDir({ label: "static website output", relPath: "artifacts/website" });

await checkFile({ label: "static website entrypoint", relPath: "artifacts/website/index.html" });
await checkFile({
  label: "review shell entrypoint",
  relPath: "artifacts/portal/index.html",
  required: false,
});

if (requireBuildOutput) {
  await checkDir({ label: "build output directory", relPath: "dist" });
  await checkFile({ label: "build output entrypoint", relPath: "dist/index.html" });
} else {
  await checkDir({ label: "build output directory", relPath: "dist", required: false });
  await checkFile({ label: "build output entrypoint", relPath: "dist/index.html", required: false });
}

if (requireSubmissionPdfs) {
  await checkFile({ label: "published executive PDF", relPath: "artifacts/exports/pdf/executive_proposal.pdf" });
  await checkFile({ label: "published technical PDF", relPath: "artifacts/exports/pdf/technical_blueprint.pdf" });
} else {
  warnings.push(
    "Submission PDF checks are disabled (REQUIRE_SUBMISSION_PDFS=0)."
  );
}

let executiveDeckReady = true;
for (const relPath of expectedExecutiveDeckFiles) {
  const ok = await exists(path.join(root, relPath));
  checks.push({
    label: "executive deck deliverable",
    path: relPath,
    kind: "file",
    required: requireExecutiveDeck,
    ok,
  });
  if (!ok) {
    executiveDeckReady = false;
    const message = `Missing executive deck deliverable: ${relPath}`;
    if (requireExecutiveDeck) {
      errors.push(message);
    } else {
      warnings.push(`${message} (required for CEO submission)`);
    }
  }
}

const hostingReady = errors.length === 0;
const submissionReady = hostingReady && executiveDeckReady;

const report = {
  generatedAt: new Date().toISOString(),
  status: errors.length > 0 ? "failed" : "passed",
  config: {
    requireSubmissionPdfs,
    requireBuildOutput,
    requireExecutiveDeck,
  },
  readiness: {
    hostingReady,
    submissionReady,
  },
  checks,
  warnings,
  errors,
};

await ensureParentDir(reportPath);
await fs.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

for (const warning of warnings) {
  console.warn(`WARN: ${warning}`);
}
for (const error of errors) {
  console.error(`ERROR: ${error}`);
}

if (errors.length > 0) {
  console.error(`Readiness verification failed. Report written to ${path.relative(root, reportPath)}.`);
  process.exit(1);
}

console.log(`Readiness verification passed. Report written to ${path.relative(root, reportPath)}.`);
