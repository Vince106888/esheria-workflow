# Recommended File and Folder Structure

```text
b2b-platform/
  docs/
    discovery/
      repo-deep-scan.md
      api-catalog.md
    architecture/
      integration-strategy.md
      technical-blueprint.md
      implementation-roadmap.md
      file-folder-structure.md
    presentation/
      jsx-refactor-plan.md
      output-stack-recommendation.md
    design/
      pencil-design-brief.md
  diagrams/
    mermaid/
      system-context.mmd
      layered-architecture.mmd
      dashboard-topology.mmd
      contract-intake-sequence.mmd
      service-integration-map.mmd
      ontology-er.mmd
      deployment-topology.mmd
      control-vs-data-plane.mmd
      auth-and-tenant-boundary.mmd
      api-boundary-map.mmd
      workflow-state-machine.mmd
      current-vs-target-architecture.mmd
    exports/
      png/
      svg/
      pdf/
  assets/
    presentation/
      logos/
      icons/
      backgrounds/
      cover-images/
  src/
    architecture/
      architectureModel.js
      diagramRegistry.js
    pages/
      ExecutivePage.jsx
      BlueprintPage.jsx
      ExplorerPage.jsx
    components/
      TopNav.jsx
      HeroSection.jsx
      SectionCard.jsx
      DiagramPanel.jsx
      MetricGrid.jsx
    styles/
      architecture-theme.css
    App.jsx
    main.jsx
  exports/
    slides/
      executive-deck.pptx
      architecture-blueprint-deck.pptx
    pdf/
      executive-summary.pdf
      technical-blueprint.pdf
```

## Guidance
- `diagrams/mermaid/*` is the canonical source for architecture logic diagrams.
- `diagrams/exports/*` stores generated static assets from Mermaid or Figma/diagrams.net.
- `docs/discovery/*` stays evidence-heavy and traceable to code.
- `src/architecture/*` is reusable structured model content consumed by presentation pages.
- `exports/*` stores publication-ready artifacts for leadership and technical handoff.
