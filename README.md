# Esheria Workflow Artifact Workspace

This repository packages the Esheria Legal Workflow OS architecture narrative, interactive review cockpit, diagrams, and submission-ready document exports.

It is organized to keep authored strategy/architecture sources separate from generated artifact outputs, while still allowing a single local review flow for executive and technical stakeholders.

## Scope

- Architecture and discovery narratives (`docs/**`)
- Interactive artifact cockpit app (`src/**`)
- Artifact build/verification scripts (`scripts/**`)
- Diagram source and exports (`diagrams/**`)
- Executive/technical document sources and exports (`artifacts/documents/**`, `artifacts/exports/**`)
- Static review surfaces (`artifacts/website/**`, `artifacts/portal/**`, `artifacts/hub/**`)

## Repository Layout

```
.
|-- docs/
|   |-- discovery/
|   |-- architecture/
|   |-- presentation/
|   `-- design/
|-- src/
|   |-- pages/
|   |-- components/
|   |-- portal/
|   `-- architecture/
|-- scripts/
|-- diagrams/
|   |-- mermaid/        # canonical editable diagrams
|   `-- exports/        # rendered png/svg outputs
|-- artifacts/
|   |-- documents/      # authored .tex + compiled .pdf
|   |-- exports/        # submission-facing export bundles
|   |-- visuals/        # generated diagram/dashboard visuals
|   |-- website/        # generated static architecture website
|   |-- hub/            # static legacy hub
|   `-- portal/         # static legacy portal
|-- public/             # static assets used by app/site builds
`-- package.json
```

## Prerequisites

- Node.js 20+ (recommended)
- npm 10+
- Optional for full document pipeline:
  - `xelatex` or `pdflatex` available on PATH
  - Chrome/Chromium for screenshot rendering (or `PUPPETEER_EXECUTABLE_PATH`)

## Quick Start

```bash
npm install
npm run dev
```

For unified local review surface:

```bash
npm run artifacts:hub
```

Then open `http://localhost:8080/`.

## Key Commands

- `npm run dev`: run Vite app locally
- `npm run build`: produce app build output in `dist/` and generate `dist/404.html` SPA fallback for GitHub Pages route refreshes
- `npm run pages:sync`: mirror review assets (`artifacts/`, `diagrams/`, `docs/`, `src/`) into `dist/` for Pages-hosted artifact browsing
- `npm run artifacts:hub`: build app + serve cockpit and repo artifacts from one local server
- `npm run artifacts:serve`: lightweight static server for repository root (PowerShell/Python)
- `npm run review`: alias of `artifacts:hub`
- `npm run verify:artifacts`: verify document/export artifact requirements
- `npm run verify:readiness`: verify repository + hosting readiness and write a report
- `npm run ci:readiness`: local CI-equivalent run (build + artifact build + verification)

## CI/CD Pipeline

### CI (`.github/workflows/ci.yml`)

Triggered on:
- push to `main`
- pull request targeting `main`

CI performs:
- dependency install (`npm ci`)
- app build (`npm run build`)
- artifact website generation (`npm run artifacts:build`)
- artifact verification (`npm run verify:artifacts`)
- readiness verification (`npm run verify:readiness`)

CI uploads these action artifacts for review:
- `readiness-report`
- `webapp-dist`
- `static-review-website`
- `submission-pdf-exports`
- `submission-slides-assets`

### CD (`.github/workflows/deploy.yml`)

Deployment target: **GitHub Pages**

Deployment source folder:
- `dist` (Vite production build output)

Deploy trigger model:
- automatic after successful `CI - Readiness` run on `main` (`workflow_run`)
- optional manual run via `workflow_dispatch`

Before deployment, CD re-runs:
- build
- artifact generation
- static asset sync into deploy output
- artifact verification
- readiness verification

Deployment is executed only after those checks pass.

This repository intentionally uses a single production deployment workflow (`deploy.yml`).
Legacy "deploy entire repo" workflows are not used, to avoid bypassing CI/readiness gates.

### Production Gate (Required Approval)

The deploy job uses:
- `environment: production`

Set protection rules on that environment so hosting/submission is blocked until a reviewer approves production deployment.

## GitHub Settings To Enable

After pushing workflows, configure:

1. **Pages source**
   - `Settings -> Pages -> Build and deployment -> Source: GitHub Actions`
2. **Production environment**
   - `Settings -> Environments -> New environment: production`
   - add required reviewers (manual approval gate)
   - optionally restrict deployment branches to `main`
3. **Actions permissions**
   - keep default workflow permissions compatible with Pages deploy (`pages:write`, `id-token:write` are defined in workflow)

No custom deployment secrets are required for GitHub Pages in this setup.

## Artifact Lifecycle

### Authored/canonical sources

- `docs/**` markdown narratives
- `diagrams/mermaid/*.mmd`
- `artifacts/documents/*.tex`
- `src/**` and `scripts/**`

### Generated/review outputs (versioned intentionally)

- `diagrams/exports/**`
- `artifacts/visuals/**`
- `artifacts/website/**`
- `artifacts/documents/*.pdf`
- `artifacts/exports/**`

### Local transient outputs (ignored)

- `node_modules/`
- `dist/`
- `backups/`
- LaTeX intermediates in `artifacts/documents/*.aux|*.log|*.out`
- temporary server logs and local scratch design file

## Non-Destructive Build Rules

The build pipeline is expected to preserve curated authored files:

- Script-generated templates should not overwrite curated narrative docs.
- Canonical authored LaTeX files are treated as source-of-truth.
- Export folders are synchronized from canonical compiled outputs.
- Any generated placeholder/template content should be isolated from authored docs.

## Submission Deliverables

Primary submission artifacts are expected under:

- `artifacts/esheria-executive-proposal.docx`
- `artifacts/esheria-technical-blueprint.docx`
- `artifacts/esheria-product-design-appendix.docx`
- `artifacts/exports/pdf/executive_proposal.pdf`
- `artifacts/exports/pdf/technical_blueprint.pdf`
- `artifacts/exports/slides/esheria-workflow-executive-deck.pptx` (final deck, required)
- `artifacts/exports/slides/esheria-workflow-executive-deck.pdf` (final deck companion, required)
- `artifacts/exports/slides/assets/**` (supporting visuals)

Current deck status is tracked in:
- `artifacts/exports/slides/deliverable-manifest.json`

If the deck files are not present yet, submission is not complete even if hosting is ready.

## Reviewer Open Order

For CEO/exec review, open these first:

1. `artifacts/exports/pdf/executive_proposal.pdf`
2. `artifacts/exports/pdf/technical_blueprint.pdf`
3. `docs/presentation/executive-deck-outline.md` (until final deck files are exported)

## Review Navigation

Primary route map (from cockpit):

- `/overview`
- `/executive`
- `/blueprint`
- `/diagrams`
- `/documents`
- `/downloads`
- `/explorer`
- `/dashboards`
- `/website`
- `/appendix`

Legacy static surfaces are still available:

- `/artifacts/portal/index.html`
- `/artifacts/hub/index.html`
