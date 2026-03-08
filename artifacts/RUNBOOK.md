# Artifact Review Runbook

## Single-command startup

1. From repo root, run:
   - `npm run artifacts:hub`
2. Open:
   - `http://localhost:8080/`

The command builds the React shell and starts a single local server that serves:
- React artifact routes (`/overview`, `/executive`, `/blueprint`, `/explorer`, etc.)
- static website artifacts (`/artifacts/website/...`)
- dashboard and diagram HTML/PNG assets
- PDF exports and LaTeX sources
- source docs, model files, and diagram exports

## Unified route map

- `/overview`: landing and category navigator
- `/executive`: executive architecture narrative
- `/blueprint`: technical blueprint view
- `/diagrams`: enhanced/source diagram gallery
- `/documents`: PDF and LaTeX document access
- `/downloads`: export-ready assets
- `/explorer`: interactive architecture explorer
- `/dashboards`: dashboard mockup gallery
- `/website`: static architecture website pages in unified viewer
- `/appendix`: source/model/docs appendix

Suggested review flows:
- 5-minute executive: `/overview` -> `/executive` -> `/diagrams` -> `/documents`
- 20-minute technical: `/overview` -> `/blueprint` -> `/diagrams` -> `/explorer` -> `/appendix`

## Operator notes

- Legacy static portals still exist:
  - `/artifacts/portal/index.html`
  - `/artifacts/hub/index.html`
- Unified experience should be consumed from `/` and `/overview`.

## Stop server

- Use `Ctrl + C` in the same terminal.
