# Integration Strategy Report - Esheria Legal Workflow OS

Date: 2026-03-07
Input: repository evidence from core cluster (`esheria-ai`, `lexdraft`, `esheria-contract-engine`, `esheria-ocr`, `esheria-analytics`, `esheria-foundation`, `website`, `lexchat-plugin`)

## 1. Current capability mapping

## 1.1 What each service does today
- `esheria-ocr`: OCR inference service on SageMaker (`/invocations`, `/ping`), best treated as a pure extraction capability.
- `esheria-contract-engine`: compliance-first contract workflow API (matter/document/profile/packs/resolve/assemble/review/export/audit/jobs).
- `esheria-ai`: legal research/chat platform plus retrieval APIs (`/search`, `/search/constitution`, `/search/statutes`).
- `lexdraft`: drafting/review/document app with extensive app API routes (auth, docs, submissions, assistant, reviews).
- `esheria-analytics`: internal analytics API + ETL for cross-tenant/internal and investor-facing analytics.
- `lexchat-plugin`: browser extension shell for legal context augmentation (currently mostly simulated assistant behavior).

## 1.2 Customer-facing vs internal today
- Customer-facing now:
  - `esheria-ai` product surfaces
  - `lexdraft` product surfaces
- Internal-facing now:
  - `esheria-analytics` dashboard
- Capability services:
  - `esheria-contract-engine`, `esheria-ocr`
- Future edge surface:
  - `lexchat-plugin`

## 2. Reuse and overlap analysis

## 2.1 Reusable platform capabilities
- OCR extraction pipeline (`esheria-ocr`)
- Contract compliance and auditable lifecycle API (`esheria-contract-engine`)
- Legal retrieval/research operator (`esheria-ai` pipeline API)
- Drafting and review interaction patterns (`lexdraft`)
- Internal telemetry and ETL patterns (`esheria-analytics`)

## 2.2 Overlapping scope
- `esheria-ai` and `lexdraft` both contain user-facing assistant/chat-like features.
- `lexdraft` review and `esheria-contract-engine` compliance overlap around clause/risk surfaces.
- Analytics appears in both product context and internal operations but is split by implementation, not by explicit tenancy semantics.

## 3. Gap analysis (must be addressed in platform)

## 3.1 Auth fragmentation
- Session cookie auth (`esheria-ai`, `esheria-analytics`)
- JWT bearer (`lexdraft`)
- API key/JWT mode (`esheria-contract-engine`)
- IAM-only boundary (`esheria-ocr`)

Risk:
- inconsistent identity propagation and weak cross-service trust model.

## 3.2 Service contract drift
- Different response envelope conventions.
- Route-local auth/policy logic in some services.
- Inconsistent error semantics and correlation id propagation.

## 3.3 Deployment divergence
- SageMaker deployment path for OCR.
- EKS patterns for analytics/contract engine/foundation.
- Mixed monorepo stacks and inconsistent CI/CD maturity.

## 3.4 Workflow state gaps
- No shared cross-service workflow execution state as a platform primitive.
- Existing services own local state but not end-to-end orchestration state.

## 3.5 Missing shared ontology
- Core objects (Matter, Document, Clause, Risk, ReviewAction, WorkflowRun, Evidence) are not normalized across repos.

## 3.6 Tenant-aware orchestration gap
- Tenancy semantics not consistently enforced at service boundaries.
- Need tenant claim propagation and policy checks in connectors.

## 3.7 Analytics split gap
- Internal analytics exists (`esheria-analytics`), but customer tenant-scoped analytics service is not first-class.

## 4. Target integration strategy (proposed)

## 4.1 Control plane and data plane split
- Control plane responsibilities:
  - tenant/org provisioning
  - identity federation and token minting for internal service-to-service calls
  - policy and feature controls
  - connector configuration and secrets references
  - operator governance and audit policy
- Data plane responsibilities:
  - workflow execution engine and state transitions
  - document intake and processing orchestration
  - review tasks and approvals
  - evidence/audit event stream
  - tenant-scoped analytics event capture

## 4.2 Connector gateway pattern
- Build a Connector Gateway that exposes stable platform contracts and adapts each service:
  - OCR Connector -> `esheria-ocr`
  - Compliance Connector -> `esheria-contract-engine`
  - Research Connector -> `esheria-ai` retrieval API
  - Drafting Connector -> `lexdraft`
  - Internal Analytics Connector -> `esheria-analytics`

Note:
- Institution/customer analytics is served by a new tenant-scoped platform module, not by direct connector passthrough to `esheria-analytics`.

Principle:
- downstream services remain independently deployable; platform owns business contracts and workflow semantics.

## 4.3 Tenant identity propagation model
- External users authenticate through platform IdP boundary.
- Platform issues short-lived signed service tokens with claims:
  - `tenant_id`, `org_id`, `user_id`, `roles`, `workflow_id`, `trace_id`.
- Connector gateway maps claims to downstream auth format.

## 4.4 Workflow execution model
- Workflow definitions are declarative and versioned.
- Every run persists:
  - state transitions
  - task assignments
  - service call evidence
  - compliance decisions
  - operator interventions

## 4.5 Analytics model split (required)
- Institution/customer analytics (tenant scoped):
  - throughput, turnaround, bottlenecks, SLA, risk trends, compliance trendlines.
- Esheria internal analytics (cross-tenant/internal only):
  - operations health, commercial telemetry, support and reliability metrics.

## 5. Integration order (phased)

## Phase A (lowest coupling, highest value)
1. OCR connector with async orchestration and audit events.
2. Contract engine connector for compliance lifecycle.
3. Minimal workflow run state machine + review task UI.

## Phase B
4. Research connector (`esheria-ai` retrieval endpoints) for citation/evidence enrichment.
5. Drafting connector (`lexdraft`) for clause drafting and redline generation.

## Phase C
6. Tenant analytics service (new) + internal analytics bridge.
7. Operator control plane full feature set.

## 6. Service boundary decisions
- Keep `esheria-ocr` as capability service, not user-facing API.
- Keep `esheria-contract-engine` as compliance domain engine, wrapped by platform workflow context.
- Use `esheria-ai` primarily for retrieval/research in workflow steps.
- Consume selective `lexdraft` drafting/review endpoints via adapter (do not expose raw route sprawl directly to customers).
- Keep `esheria-analytics` internal; do not use directly as customer analytics API.

## 7. Major risks and mitigations
- Risk: auth inconsistency across services.
  - Mitigation: connector-issued service tokens + centralized policy engine.
- Risk: workflow state split across systems.
  - Mitigation: workflow runtime database as source of truth for orchestration state.
- Risk: analytics boundary leakage.
  - Mitigation: physically and logically separate customer analytics datastore and access paths.
- Risk: deployment inconsistency.
  - Mitigation: standard deployment contract per service (health/readiness/metrics, trace headers, versioned API contracts).

## 8. Decision summary
- Build Legal Workflow OS as orchestration and control-plane layer over existing capabilities.
- Preserve current service strengths; do not rewrite capability services prematurely.
- Standardize identity, tenancy, workflow state, and auditability before aggressive feature expansion.
