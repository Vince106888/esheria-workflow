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
- `npm run build`: produce app build output in `dist/`
- `npm run artifacts:hub`: build app + serve cockpit and repo artifacts from one local server
- `npm run artifacts:serve`: lightweight static server for repository root (PowerShell/Python)
- `npm run review`: alias of `artifacts:hub`

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
- `artifacts/exports/pdf/*.pdf`
- `artifacts/exports/slides/assets/**` (supporting visuals)

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

