# Executive Deck Outline - Esheria Legal Workflow OS

Date: 2026-03-07
Audience: CEO + exec staff
Duration target: 20-25 minutes

## 10-slide narrative structure

1. Slide 1 - Why Now, Why Esheria
- Objective: frame Legal Workflow OS as platform expansion from existing proven capabilities.
- Copy:
  - Esheria already owns critical legal capabilities: OCR, compliance engine, retrieval, drafting, and analytics.
  - The strategic gap is orchestration, tenancy standardization, and enterprise-grade operating model.
  - Proposal: unify into Esheria Legal Workflow OS.
- Diagram: `current-vs-target-architecture.mmd` (left panel only, current-state anchors).

2. Slide 2 - Current State Evidence (Code-Backed)
- Objective: show this is implementation-grounded, not conceptual.
- Copy:
  - Architecture is built on direct repo/API/deployment evidence across core services.
  - Existing strengths reduce build risk; fragmentation defines integration scope.
  - Highest risks today: auth fragmentation, workflow-state fragmentation, analytics boundary ambiguity.
- Diagram: `system-context.mmd`.

3. Slide 3 - Platform Thesis
- Objective: define product in one architecture sentence.
- Copy:
  - Legal Workflow OS is a multi-tenant orchestration and control layer over existing Esheria capabilities.
  - It separates control plane governance from data plane execution.
  - It preserves service autonomy while standardizing enterprise contracts.
- Diagram: `layered-architecture.mmd`.

4. Slide 4 - Business-Critical Separation: Customer vs Internal Analytics
- Objective: make governance and trust model explicit.
- Copy:
  - Institution analytics is tenant-scoped and customer-facing.
  - Esheria internal analytics remains cross-tenant/internal only.
  - Physical and logical separation is enforced in APIs, stores, and dashboards.
- Diagram: `dashboard-topology.mmd`.

5. Slide 5 - Value Wedge: Contract Intake to Decision
- Objective: show short path from architecture to customer value.
- Copy:
  - First workflow wedge is contract intake/review with audit-grade decision trail.
  - OCR + compliance + review + export can be delivered without rewriting existing services.
  - This wedge creates measurable throughput/SLA/risk improvements.
- Diagram: `contract-intake-sequence.mmd`.

6. Slide 6 - Integration Strategy (Reuse > Rewrite)
- Objective: show pragmatic execution model.
- Copy:
  - Connector Gateway normalizes capability APIs into stable platform contracts.
  - Existing services remain independently deployable.
  - Platform owns tenancy, policy, auditability, and workflow semantics.
- Diagram: `service-integration-map.mmd`.

7. Slide 7 - Enterprise-Ready Control and Security
- Objective: establish confidence in security/governance design.
- Copy:
  - Identity federation at platform edge (OIDC/SAML boundary).
  - Short-lived service tokens propagate tenant/user/workflow claims.
  - Policy and audit controls are centralized and operator actions are reason-coded.
- Diagram: `auth-and-tenant-boundary.mmd`.

8. Slide 8 - Operating Model and Reliability
- Objective: show production readiness trajectory.
- Copy:
  - Runtime topology supports EKS-hosted platform services and SageMaker OCR capability.
  - Standard health/readiness/metrics and trace envelope are enforced across connectors.
  - Incident operations and workflow replay are first-class operator capabilities.
- Diagram: `deployment-topology.mmd`.

9. Slide 9 - Phased Execution Plan
- Objective: establish realistic delivery sequencing.
- Copy:
  - Phase 1: architecture package + model normalization + diagram system.
  - Phase 2: visual/asset pipeline + executive/technical review packs.
  - Phase 3: integration proposal to MVP build design (intake/review wedge).
- Diagram: `current-vs-target-architecture.mmd` (full).

10. Slide 10 - Decision Ask and Next 90 Days
- Objective: close with concrete ask.
- Copy:
  - Approve Legal Workflow OS architecture baseline and MVP wedge scope.
  - Approve control-plane identity/tenancy standard and connector contract program.
  - Approve execution charter for technical design and pilot-ready delivery plan.
- Diagram: none (decision slide with milestones and owners).

## Recommended speaking flow
1. Open with evidence and strategic gap, not target-state visuals.
2. Move quickly from current-state fragmentation to control/data-plane thesis.
3. Spend explicit time on analytics separation and tenancy boundaries.
4. Anchor value in one executable workflow (contract intake/review).
5. Close with phased plan and executive decisions required.

## Slide-diagram mapping summary
- Slide 1: `current-vs-target-architecture`
- Slide 2: `system-context`
- Slide 3: `layered-architecture`
- Slide 4: `dashboard-topology`
- Slide 5: `contract-intake-sequence`
- Slide 6: `service-integration-map`
- Slide 7: `auth-and-tenant-boundary`
- Slide 8: `deployment-topology`
- Slide 9: `current-vs-target-architecture`
- Slide 10: no diagram
