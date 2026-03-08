# Implementation Roadmap

## Phase 1 - Discovery and architecture normalization (0-3 weeks)

### Deliverables
- deep architecture extraction from core repos
- evidence-backed API catalog and current-state map
- canonical model definitions (`architectureModel.js`, `diagramRegistry.js`)
- first-pass Mermaid diagram set (12 mandatory diagrams)
- JSX refactor scaffold with `/executive`, `/blueprint`, `/explorer`

### Work items
1. Lock service contracts and connector assumptions per capability service.
2. Define canonical ontology and workflow model.
3. Define customer vs operator dashboard taxonomy.
4. Publish baseline technical blueprint and integration strategy.

### Exit criteria
- architecture review ready pack available and internally validated.

## Phase 2 - Visual polish and export pipeline (3-6 weeks)

### Deliverables
- polished visual pages and dashboard mockups
- executive and technical slide/PDF export pack
- static diagram asset generation pipeline (SVG/PNG/PDF)

### Work items
1. Apply Pencil/Figma visual refinement on top of canonical diagrams.
2. Build automated export scripts for mermaid -> svg/png.
3. Create board-ready executive deck and implementation blueprint deck.

### Exit criteria
- CEO-ready deck, technical review deck, and documentation bundle approved.

## Phase 3 - Integration proposal to MVP technical design (6-12 weeks)

### Deliverables
- target platform MVP architecture and service integration plan
- connector contract specs for OCR, contract-engine, research, drafting
- phased implementation backlog (control plane + data plane)

### Work items
1. Design service-to-service auth and tenant claim propagation.
2. Define workflow runtime state machine and audit model.
3. Produce MVP implementation design for contract intake/review wedge.
4. Prepare deployment and observability standards for all connectors.

### Exit criteria
- build-ready MVP technical design with execution plan and risks signed off.
