# Final Output Stack Recommendation

## 1) What remains in React/JSX
- Interactive architecture explorer (`/explorer`) with searchable module/api/workflow metadata.
- Live route-based presentation modes (`/executive`, `/blueprint`).
- Reusable model-driven rendering for architecture entities.

Reason:
- React is best for navigable, evolving architecture knowledge base and internal collaboration.

## 2) What should be Mermaid first
- Canonical architecture and systems diagrams:
  - context, layered architecture, topology, sequence, state machine, auth boundaries, API boundaries.

Reason:
- text-based, versionable, reviewable diffs, easy CI export to SVG/PNG.

## 3) What should move to Figma / diagrams.net / Pencil
- Figma or diagrams.net:
  - executive-grade polished composites, board-level visual refinement.
- Pencil:
  - fast dashboard mockups and hero architecture page compositions.

Reason:
- These tools are better for polished visual storytelling and layout craft than raw Mermaid.

## 4) What should become PDF/slide deck
- CEO narrative pack (10-15 slides).
- Technical blueprint pack (15-25 slides).
- Implementation roadmap and dependency plan (appendix).

Reason:
- formal review workflows and stakeholder circulation depend on static, printable outputs.

## 5) What should become static exports/images
- All Mermaid diagrams exported as SVG and PNG.
- Hero architecture visual, dashboard mockups, and topology canvases.

Reason:
- embed in docs, RFPs, and executive materials without requiring runtime app.

## Recommended pipeline
1. Author canonical architecture in `architectureModel.js` + Mermaid.
2. Render/export diagrams to `diagrams/exports/svg` and `diagrams/exports/png`.
3. Compose narrative decks in Figma/Pencil using exported visuals.
4. Publish PDFs and slide decks into `exports/`.
