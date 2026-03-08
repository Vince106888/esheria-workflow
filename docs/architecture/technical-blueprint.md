# Esheria Legal Workflow OS - Technical Blueprint

Date: 2026-03-07
Audience: CEO review, architecture review, implementation planning

## 0. Scope and method
- This blueprint integrates observed current-state services and proposes a target B2B multi-tenant workflow platform.
- Facts are anchored in code scans in `docs/discovery/repo-deep-scan.md` and `docs/discovery/api-catalog.md`.

## 1) Current-state architecture
- Capability services already exist but are not unified:
  - OCR (`esheria-ocr`)
  - compliance/contract API (`esheria-contract-engine`)
  - retrieval/research (`esheria-ai` retrieval API)
  - drafting/review app APIs (`lexdraft`)
  - internal analytics (`esheria-analytics`)
- User-facing products are fragmented across independent service UIs.
- No single platform-level workflow state engine coordinates all service calls.

## 2) Target-state architecture
- Build Legal Workflow OS with three presentation layers:
  - executive narrative
  - technical blueprint
  - interactive explorer
- Build platform backend with explicit control/data plane split:
  - Control plane: tenant, policy, identity, connector config, governance
  - Data plane: workflow runtime, document/review tasks, audit evidence, analytics events
- Expose unified B2B product surfaces:
  - institution workspace (customer)
  - operator control plane (internal)

## 3) Integration strategy
- Preserve and wrap existing services via Connector Gateway.
- Start with OCR + contract-engine + workflow runtime for MVP wedge.
- Add research and drafting connectors in phase 2.
- Keep internal analytics separate; create tenant analytics service for customer-facing KPIs.

## 4) Service boundary map
- Customer-facing modules (tenant scoped):
  - Intake, Review, Approval, Customer Analytics, Settings/Integrations.
- Operator-facing modules (esheria internal):
  - Tenant provisioning, workflow ops, incidents/support, cross-tenant analytics, billing/governance.
- Shared backend modules:
  - Auth/Tenant service
  - Workflow engine
  - Document service
  - Review/Task service
  - Audit/Evidence service
  - Policy service
  - Connector gateway
  - Notification service
  - Analytics event service
  - Customer analytics service (tenant-scoped)
  - Integration manager

## 5) Tenancy model
- Multi-tenant, org-scoped data isolation by default.
- Tenant key on all workflow entities and event streams.
- Policy checks enforce tenant boundary at API and connector layers.
- Operator overrides require audited elevation and reason codes.

## 6) Auth model
- Platform entry auth via enterprise-capable identity (OIDC/SAML compatible boundary).
- Internal service calls use short-lived signed service tokens with tenant/user claims.
- Downstream connector adapters transform platform tokens to service-specific auth requirements.

## 7) Dashboard taxonomy

### 7.1 Customer dashboards (institution analytics)
- Throughput and turnaround
- SLA breaches and bottlenecks
- Risk category and compliance trend
- Review queue health
- Department/team performance

### 7.2 Esheria operator dashboards (internal analytics)
- Cross-tenant service health
- Incident and support queue
- Capacity and utilization
- Commercial usage and billing telemetry
- Deployment and connector error trends
- Esheria internal/investor analytics views remain internal surfaces, not institution dashboards.

## 8) Customer vs operator surfaces

### 8.1 Customer surfaces
- Institution workspace
- Contract intake/review interface
- Approval and escalation views
- Tenant settings and integrations

### 8.2 Operator surfaces
- Admin console and tenant provisioning
- Workflow run monitor
- Service health and incident center
- Governance/billing operations

## 9) Workflow execution model
- Workflows are versioned templates with deterministic state machine transitions.
- Core states:
  - draft
  - intake_received
  - preprocessing
  - compliance_analysis
  - review_pending
  - changes_requested
  - approved
  - exported
  - archived
- Every transition emits an audit event with actor identity and evidence links.

## 10) Data model / ontology
- Canonical entities:
  - Tenant
  - Organization
  - User
  - Matter
  - Document
  - Clause
  - Obligation
  - Risk
  - Review
  - ReviewAction
  - WorkflowDefinition
  - WorkflowRun
  - Task
  - Evidence/Citation
  - IntegrationConfig
  - ApiCredentialRef
- Principle:
  - connectors return capability-specific payloads, then mapping layer projects to canonical model.

## 11) Deployment and infra topology
- Platform services on Kubernetes (EKS-compatible target) with explicit namespaces and environment overlays.
- OCR remains SageMaker-hosted capability; invoked via secured connector.
- Shared infra components:
  - transactional store
  - object storage
  - queue/event bus
  - search index
  - analytics warehouse/metrics store
  - centralized logging/tracing/metrics
  - secrets and feature flag management

## 12) Observability and governance
- Standardized telemetry envelope on all services:
  - `trace_id`, `tenant_id`, `workflow_run_id`, `service`, `operation`, latency, status.
- Unified audit record for user and operator actions.
- Governance controls:
  - operator role boundaries
  - escalation rules
  - data retention policies
  - policy evaluation logs

## 13) Implementation phases

### Phase 1 - extraction and architecture foundations
- Normalize architecture model definitions.
- Generate canonical diagrams and blueprint docs.
- Scaffold route-based presentation system.

### Phase 2 - platform MVP slice
- Implement control plane identity + tenant service.
- Implement workflow runtime with OCR + contract-engine connectors.
- Deliver institution intake/review UI and operator run monitor.

### Phase 3 - expansion
- Add research and drafting connectors.
- Launch customer analytics service and dashboards.
- Add integration manager and governance hardening.

## 14) Risks, assumptions, migration notes

### Risks
- auth fragmentation and inconsistent policy enforcement
- route-level contract drift in existing services
- deployment heterogeneity and operational complexity
- analytics boundary confusion (internal vs tenant)

### Assumptions
- Existing capability services remain deployable and callable in near-term.
- Platform team can define and enforce connector contracts.
- Tenant boundary and auditability are mandatory non-functional requirements.

### Migration notes
- Prefer adapter-first migration over service rewrites.
- Introduce platform contracts in front of existing APIs.
- Move high-value workflows first (contract intake/review), then expand by template.
