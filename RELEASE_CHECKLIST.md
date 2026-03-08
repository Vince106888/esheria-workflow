# Release Checklist

Use this checklist before publishing a review branch or sending submission artifacts.

## 1) Workspace Integrity

- [ ] `git status` is understood (no accidental noise included).
- [ ] Ignored/transient files are not staged (`node_modules`, `dist`, LaTeX intermediates, backups, temp logs).
- [ ] Curated authored docs were not overwritten by generated output.

## 2) Source Completeness

- [ ] `docs/` narratives are current (discovery, architecture, presentation, design).
- [ ] `diagrams/mermaid/*.mmd` source files are present for all diagram exports.
- [ ] `src/` app routes and artifact catalogs resolve correctly.
- [ ] `scripts/` pipeline scripts reflect current artifact generation and verification flow.

## 3) Build + Review

- [ ] Install deps: `npm install`
- [ ] Run app build: `npm run build`
- [ ] Run artifact verification: `npm run verify:artifacts`
- [ ] Run readiness verification: `npm run verify:readiness`
- [ ] Start unified review surface: `npm run artifacts:hub`
- [ ] Verify key routes load: `/overview`, `/executive`, `/blueprint`, `/diagrams`, `/documents`, `/website`

## 4) Document Pipeline

- [ ] Authored LaTeX exists:
  - `artifacts/documents/executive_proposal.tex`
  - `artifacts/documents/technical_blueprint.tex`
- [ ] Compiled PDFs exist:
  - `artifacts/documents/executive_proposal.pdf`
  - `artifacts/documents/technical_blueprint.pdf`
- [ ] Published PDFs are synced:
  - `artifacts/exports/pdf/executive_proposal.pdf`
  - `artifacts/exports/pdf/technical_blueprint.pdf`

## 5) Submission Artifacts

- [ ] Executive proposal DOCX present
- [ ] Technical blueprint DOCX present
- [ ] Product design appendix DOCX present
- [ ] Official submission PDFs are current in:
  - `artifacts/exports/pdf/executive_proposal.pdf`
  - `artifacts/exports/pdf/technical_blueprint.pdf`
- [ ] Slides export support assets present under `artifacts/exports/slides/assets/`
- [ ] Final executive deck files present:
  - `artifacts/exports/slides/esheria-workflow-executive-deck.pptx`
  - `artifacts/exports/slides/esheria-workflow-executive-deck.pdf`
- [ ] Diagram exports present under `diagrams/exports/`

## 6) Final Git Hygiene

- [ ] Commits are split by concern (hygiene, scripts, app, docs, assets, exports).
- [ ] Commit messages are specific and reviewable.
- [ ] No giant catch-all commit.
- [ ] `git log --oneline -n 20` reflects logical history.
- [ ] `git status` is clean (or intentional leftovers are documented).

## 7) Publication

- [ ] Confirm current branch name
- [ ] Confirm `origin` remote
- [ ] Push with:
  - `git push -u origin <branch>`

## 8) CI/CD + Hosting Gate

- [ ] CI workflow (`CI - Readiness`) is green on latest commit
- [ ] Readiness report artifact is present in CI run
- [ ] Deploy workflow (`CD - Production Deploy`) completed successfully
- [ ] Production deployment was approved through GitHub `production` environment gate
- [ ] Hosted URL is reachable and reviewed (GitHub Pages output from `artifacts/website`)
- [ ] Submission exports (PDFs + slides assets) match approved release content
