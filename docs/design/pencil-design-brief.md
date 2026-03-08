# Pencil Design Brief - Esheria Legal Workflow OS

## Brief objective
Produce enterprise-grade visual assets for CEO narrative, technical architecture review, and platform dashboard mockups.

## Visual direction
- Style: serious enterprise SaaS, architecture-first, low-noise, high legibility.
- Tone: boardroom technical, control-plane aware, operationally credible.
- Theme: dark-first for architecture screens, light variants for printable exports.

## Design system guidance
- Typography hierarchy:
  - H1: strong display sans (e.g., Sora/Space Grotesk class)
  - H2/H3: geometric sans
  - labels/data chips: mono/technical font
- Spacing system:
  - base 8px scale (`8, 16, 24, 32, 48, 64`)
- Corner radius:
  - small 4, medium 8, large 12
- Line weight:
  - 1px for boundaries, 2px for key emphasis

## Color model by architecture layer
- Customer surface layer: `#15B5A6`
- Operator surface layer: `#E35D7A`
- Control plane: `#4A78FF`
- Data plane: `#F0A12B`
- Capability connectors: `#8A6BFF`
- Data/infra: `#8893A8`
- Background dark: `#0B1020`
- Surface dark: `#121A2F`
- Surface light export: `#F6F8FC`

## Page inventory and composition

## 1) Executive hero page
- Purpose: state platform thesis and strategic shift.
- Modules:
  - platform thesis statement
  - from-products to operating-system transformation panel
  - value pillars (speed, compliance, auditability, integration)
  - one high-level system context diagram

## 2) Executive architecture summary
- Purpose: summarize top-level architecture in 1 view.
- Modules:
  - 4-5 layered stack blocks
  - customer vs operator split
  - existing service capability map

## 3) Technical blueprint overview
- Purpose: provide implementation-level architecture map.
- Modules:
  - control plane vs data plane map
  - service boundaries and connector gateway
  - tenancy and auth boundary callouts

## 4) Workflow deep dive (contract intake)
- Purpose: show end-to-end orchestration.
- Modules:
  - sequence view (intake -> OCR -> compliance -> review -> approval -> export)
  - state machine panel
  - evidence/audit events panel

## 5) Dashboard topology page
- Purpose: distinguish customer analytics from internal analytics.
- Modules:
  - institution dashboard topology
  - operator console topology
  - shared backend APIs and data streams

## 6) Deployment and operations page
- Purpose: infra and reliability posture.
- Modules:
  - ingress/auth boundary
  - kubernetes services + queues + stores
  - sagemaker OCR connector boundary
  - observability stack

## 7) Mockup - Institution workspace
- Purpose: show customer-facing workflow UX.
- Modules:
  - intake queue
  - document detail + clause/risk findings
  - review/approval panel
  - tenant analytics cards

## 8) Mockup - Operator console
- Purpose: show internal control plane UX.
- Modules:
  - tenant list/provisioning
  - workflow run monitor
  - service health and incidents
  - support intervention actions

## 9) Mockup - Workflow monitor
- Purpose: step-level runtime operations.
- Modules:
  - active runs table
  - failure buckets
  - retry/escalate actions
  - trace and audit jump links

## 10) Mockup - Support / incident center
- Purpose: intervention and recovery workflow.
- Modules:
  - incident feed
  - impacted tenants and workflows
  - mitigation playbooks
  - status timeline

## Diagram composition guidance
- Prefer orthogonal layout with explicit trust boundaries.
- Label control plane and data plane separately on all systems diagrams.
- Use directional arrows with action labels (`invoke`, `publish`, `persist`, `notify`).
- Include tenancy and audit markers on key steps.

## Iconography guidance
- Use thin-line enterprise icon set.
- Avoid decorative emojis and illustration-heavy motifs.
- Use icons only to reinforce module category (auth, workflow, storage, ops).

## Export use cases
- 16:9 slide images for CEO/board deck.
- A4 portrait PDF pages for technical blueprint handoff.
- PNG/SVG diagram exports for docs and README embedding.

## Tool split recommendation
- Mermaid: canonical architecture/system/process diagrams (version-controlled source of truth).
- diagrams.net / Figma: high-polish executive visuals and stakeholder-facing composites.
- Pencil.dev: fast dashboard/page mockups and visual composition drafts.

Recommendation:
- keep canonical logic diagrams in Mermaid first.
- use Pencil or Figma for polished presentation layers and dashboard mockups.
