# JSX Presentation Refactor Plan

## Objective
Transform current monolithic architecture JSX into a modular, diagram-first system with three route-level presentation modes:
- `/executive`
- `/blueprint`
- `/explorer`

## Current issues observed
- Single-file architecture artifact tries to satisfy CEO narrative, technical blueprint, and detailed explorer simultaneously.
- Redundant content across tabs.
- Diagram and narrative are tightly coupled to component layout.
- Hard to export cleanly to slides/static assets.

## Target presentation architecture

## 1. Data-driven content layer
- `src/architecture/architectureModel.js`
  - source of truth for layers, modules, workflows, APIs, ontology, roadmap, metrics.
- `src/architecture/diagramRegistry.js`
  - metadata + mermaid source references + audience labels.

## 2. Presentation routes
- `/executive`
  - concise narrative, strategic framing, top-level diagrams only.
- `/blueprint`
  - technical architecture and implementation details, service boundaries, tenancy, deployment.
- `/explorer`
  - interactive catalog of modules/apis/workflows/ontology and full diagram set.

## 3. Shared component system
- `src/components/TopNav.jsx`
- `src/components/HeroSection.jsx`
- `src/components/SectionCard.jsx`
- `src/components/DiagramPanel.jsx`
- `src/components/MetricGrid.jsx`

## 4. Diagram-first content strategy
- Each route starts from diagrams, then descends into supporting details.
- Use canonical Mermaid files from `diagrams/mermaid/`.
- Keep route pages thin; push domain content to model objects.

## 5. Export-safe design constraints
- 16:9-friendly section proportions and spacing.
- deterministic typography scale and color tokens.
- route pages render cleanly in browser print/PDF capture.

## 6. Migration plan from current JSX
1. Preserve old JSX files as legacy references.
2. Introduce model and registry modules.
3. Implement route shell and shared components.
4. Re-map existing sections into executive/blueprint/explorer pages.
5. Validate with `vite build` and print/PDF export checks.

## 7. Acceptance criteria
- Clear separation of audience-specific narratives.
- At least one major diagram above the fold on each route.
- No hard-coded duplicated architecture data across pages.
- All mandatory diagrams discoverable in explorer mode.
