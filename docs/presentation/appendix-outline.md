# Technical Appendix Outline - Esheria Legal Workflow OS

Date: 2026-03-07
Audience: architecture review, engineering leads, platform/security reviewers

## 1. Appendix structure

1. Section A - Evidence Base and Current State
- Include:
  - `docs/discovery/repo-deep-scan.md`
  - `docs/discovery/api-catalog.md`
- Purpose: prove claims with repo/API/deployment evidence.

2. Section B - Current vs Target Architecture
- Include diagrams:
  - `current-vs-target-architecture.mmd`
  - `system-context.mmd`
  - `layered-architecture.mmd`
- Include blueprint sections:
  - Technical Blueprint Sections 1, 2, 3.

3. Section C - Service Boundaries and API Contracts
- Include diagrams:
  - `api-boundary-map.mmd`
  - `service-integration-map.mmd`
- Include API catalog sections:
  - esheria-ai
  - lexdraft
  - esheria-contract-engine
  - esheria-ocr
  - esheria-analytics
- Include blueprint sections:
  - Sections 3, 4, 6.

4. Section D - Workflow and Data Model
- Include diagrams:
  - `contract-intake-sequence.mmd`
  - `workflow-state-machine.mmd`
  - `ontology-er.mmd`
- Include blueprint sections:
  - Sections 9, 10.

5. Section E - Tenancy, Auth, Governance
- Include diagrams:
  - `auth-and-tenant-boundary.mmd`
  - `control-vs-data-plane.mmd`
- Include blueprint sections:
  - Sections 5, 6, 12, 14.

6. Section F - Dashboards and Analytics Separation
- Include diagrams:
  - `dashboard-topology.mmd`
- Include blueprint sections:
  - Sections 7, 8.
- Include integration strategy subsection:
  - Analytics model split.

7. Section G - Deployment and Operations
- Include diagrams:
  - `deployment-topology.mmd`
- Include blueprint sections:
  - Sections 11, 12, 13.

8. Section H - Delivery Plan and Decision Log
- Include:
  - `docs/architecture/implementation-roadmap.md`
  - `docs/architecture/integration-strategy.md` (Section 5 and 8)
- Purpose: align implementation sequencing and governance decisions.

## 2. Appendix artifact set for review packet
- Diagram pack (SVG + PNG exports)
- API contract baseline tables
- Canonical model source:
  - `src/architecture/architectureModel.js`
  - `src/architecture/diagramRegistry.js`
- Technical blueprint narrative document

## 3. Suggested review order (technical session)
1. Current vs target architecture
2. API boundary + service integration maps
3. Auth/tenant boundary and control-vs-data plane
4. Workflow sequence + state machine + ontology
5. Deployment topology and rollout roadmap
