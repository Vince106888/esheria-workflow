# Esheria Legal Workflow OS - Deep Repository Scan (Evidence Based)

Date: 2026-03-07
Scope: core legal/ai/platform repos plus optional comparison repos
Method: direct code inspection in local workspace (`C:\Users\HP\work\esherialabs`)

## Evidence discipline
- [FACT] means directly observed in code or config files.
- [INFERENCE] means reasoned from observed implementation patterns.
- [PROPOSED] means target-state design recommendation (not yet implemented).

## Core repo scan summary

### 1) esheria-ai
- Repo path: `C:\Users\HP\work\esherialabs\esheria-ai`
- [FACT] Purpose: SvelteKit legal assistant platform plus a separate FastAPI retrieval API.
  - Evidence: `package.json`, `src/routes/**`, `pipeline/api/server.py`.
- [FACT] Product role: user-facing legal chat/research product with sessions, conversations, assistants, and org membership data.
  - Evidence: `src/lib/server/database.ts`, `src/lib/server/auth.ts`.
- [FACT] Architecture style: monolithic web app (SvelteKit) + standalone retrieval microservice.
- [FACT] Runtime model:
  - Web: Node/SvelteKit, MongoDB session and domain data.
  - Retrieval: FastAPI + asyncpg/pgvector + Redis cache.
- [FACT] Entrypoints:
  - Web routes under `src/routes` including conversation and settings endpoints.
  - Retrieval API in `pipeline/api/server.py` (`/health`, `/search`, `/search/constitution`, `/search/statutes`).
- [FACT] Frontend/backend split: mixed in SvelteKit; backend handlers in `+server.ts` and `hooks.server.ts`.
- [FACT] Auth model:
  - Session cookie + hashed session id, optional OpenID provider flow.
  - Admin bearer secret for `/admin/*`.
  - Evidence: `src/hooks.server.ts`, `src/lib/server/auth.ts`.
- [FACT] Role/permission model: user/session based auth; admin secret-protected admin routes.
- [FACT] Data stores:
  - Mongo collections: conversations, assistants, users, sessions, organization, organizationmembers, subscriptions, transactions, etc.
  - Retrieval DB: Postgres + pgvector + Redis.
  - Evidence: `src/lib/server/database.ts`, `pipeline/api/server.py`.
- [FACT] External integrations: embedding/reranker providers, OpenID, Paystack webhooks.
- [FACT] Deployment clues: Dockerized app with optional local Mongo startup; extra infra under `infrastructure/`.
  - Evidence: `Dockerfile`, `entrypoint.sh`.
- [FACT] Observability clues: metrics server initialization, structured logging references.
  - Evidence: `src/hooks.server.ts`.
- [FACT] Testing/quality signals: route/schema validation patterns (zod), migration checks.
- [INFERENCE] Maturity: medium-high for user app; retrieval service appears production-hardened but separate deployment boundary.
- [PROPOSED] Legal Workflow OS integration opportunity:
  - Use as Research Connector service behind platform connector gateway.
  - Keep direct end-user chat features separate from orchestrated workflow APIs.
- [RISK] Contract/API boundary between Svelte endpoints and retrieval API is not unified under one stable platform contract.

### 2) lexdraft
- Repo path: `C:\Users\HP\work\esherialabs\lexdraft`
- [FACT] Purpose: monorepo with React/Vite frontend and Next.js API for drafting/review/documents.
  - Evidence: `README.md`, `apps/api`, `apps/frontend`.
- [FACT] Product role: contract/document drafting and review workspace.
- [FACT] Architecture style: monorepo, app-server API routes in Next App Router.
- [FACT] Runtime model: Node/Next API + MongoDB.
  - Evidence: `docker-compose.yml`, `apps/api/package.json`.
- [FACT] Entrypoints:
  - API routes in `apps/api/app/api/**/route.ts`.
  - Frontend app in `apps/frontend`.
- [FACT] Auth model: JWT bearer token extraction and verification utility.
  - Evidence: `apps/api/app/lib/auth.ts`.
- [FACT] Role model in user schema: `admin`, `advocate`, `ngo`.
  - Evidence: `apps/api/app/lib/db/models/User.ts`.
- [FACT] API surface: auth, documents, submissions, reviews, assistant, settings, tiptap conversion/token.
- [FACT] Data stores/entities:
  - Mongo models: User, Document, Review, Submission, Suggestion, ChatMessage, Benchmark, DraftClause.
- [FACT] External integrations: Google auth, OpenAI, Tiptap Cloud, CloudConvert.
- [FACT] Deployment model:
  - Local compose for API/frontend/mongo profile.
  - EKS infrastructure + K8s manifests and scripts.
  - Evidence: `infrastructure/*`.
- [FACT] Observability clues: `/api/status` health probes used in K8s deployment.
- [FACT] Testing/quality: route-level validation via zod; lint scripts.
- [INFERENCE] Maturity: feature-rich product code, contract consistency varies by route implementation style.
- [PROPOSED] Legal Workflow OS integration opportunity:
  - Treat as Drafting Connector and Review UI capability.
  - Reuse drafting APIs but standardize auth/tenant claims through control plane-issued tokens.
- [RISK] Auth/authorization checks are route-local; policy enforcement is not centralized.

### 3) esheria-contract-engine
- Repo path: `C:\Users\HP\work\esherialabs\esheria-contract-engine`
- [FACT] Purpose: regulatory-first contract API with explicit domain workflow and runtime persistence.
  - Evidence: `api/README.md`, `api/routes.py`, `api/services/domain.py`.
- [FACT] Product role: compliance checking, obligation/clause resolution, draft assembly/export, audit and job orchestration.
- [FACT] Architecture style: clean layered FastAPI service (routes, services, repositories, middleware, migrations).
- [FACT] Runtime model: FastAPI + PostgreSQL with API-owned runtime schema (`api_runtime`).
- [FACT] Entrypoints: `api/app.py` and `/api/v1/*` router.
- [FACT] Auth model configurable:
  - `none`, `api_key` via `X-API-Key`, or `jwt` bearer HS256.
  - Evidence: `api/config.py`, `api/security.py`.
- [FACT] API surface includes health/readiness/metrics, core contract lifecycle, admin retrieval ops, async jobs.
- [FACT] Data stores/entities:
  - Runtime tables for matters, documents, profiles, pack locks, drafts, audit logs, jobs, idempotency.
  - Evidence: `api/migrations/*.sql`, `api/repositories.py`.
- [FACT] Internal dependencies:
  - Reuses pipeline scripts (`pipeline/run_msa_pipeline.py`, `pipeline/index_clause_pack_pgvector.py`, `pipeline/tune_obligation_clause_targets.py`).
- [FACT] Deployment model:
  - Terraform modules for API platform and worker deployment on EKS.
  - Evidence: `infra/terraform/modules/regulatory_api_platform`.
- [FACT] Observability: Prometheus `/metrics`, correlation IDs, structured errors.
- [FACT] Testing/quality signals: smoke scripts, docs, OpenAPI snapshot, migration discipline.
- [INFERENCE] Maturity: highest service boundary clarity among scanned repos.
- [PROPOSED] Legal Workflow OS integration opportunity:
  - Anchor compliance orchestration around this service as core compliance connector.
- [RISK] Current auth modes may diverge from enterprise SSO/OIDC model unless normalized by control plane.

### 4) esheria-ocr
- Repo path: `C:\Users\HP\work\esherialabs\esheria-ocr`
- [FACT] Purpose: OCR inference proxy over SGLang vision model deployed on SageMaker.
  - Evidence: `README.md`, `app.py`, `deploy_sagemaker_ocr.sh`.
- [FACT] Product role: document text extraction capability service.
- [FACT] Architecture style: single FastAPI proxy service fronting local OpenAI-compatible LLM server.
- [FACT] Runtime model: SageMaker endpoint with GPU instances, containerized SGLang + FastAPI.
- [FACT] Entrypoints:
  - `POST /invocations`
  - `GET /ping`
- [FACT] Auth model: no explicit app-layer auth in service code; security intended via AWS IAM InvokeEndpoint boundaries.
- [FACT] Data stores: none local; transient processing.
- [FACT] External integrations: SGLang local server, optional remote image fetch.
- [FACT] Deployment model: CodeBuild -> ECR -> SageMaker endpoint rollout.
  - Evidence: `buildspec.yml`, `deploy_sagemaker_ocr.sh`.
- [FACT] Observability: CloudWatch/SageMaker metrics referenced in ops runbook.
- [INFERENCE] Maturity: production MLOps path is clear; API contract intentionally narrow.
- [PROPOSED] Legal Workflow OS integration opportunity:
  - Use as asynchronous OCR connector via queue-backed jobs.
- [RISK] Direct user-facing use should be avoided; wrap in platform document service with audit and retry semantics.

### 5) esheria-analytics
- Repo path: `C:\Users\HP\work\esherialabs\esheria-analytics`
- [FACT] Purpose: internal analytics and investor dashboard with ETL and API.
  - Evidence: `README.md`, `api/main.py`, `etl/*`.
- [FACT] Product role: Esheria internal analytics and operational reporting (cross-tenant/internal visibility).
  - Includes internal and investor-oriented views; not implemented as institution tenant analytics API.
- [FACT] Architecture style: FastAPI backend + React/Vite UI + ETL jobs + k8s scheduled jobs.
- [FACT] Runtime model: Mongo SOT analytics DB + auth DB, k8s deployment and cronjobs.
- [FACT] Auth model: cookie-based session JWT (`analytics_session`) with role gates.
  - Roles include `super_admin`, `internal_admin`, `internal_user`, `external_investor`.
  - Evidence: `api/auth_backend.py`.
- [FACT] API surface: auth/me/logout, analytics overview/engagement/revenue/org views, config and admin routes.
- [FACT] Distinct analytics mode support: `real_only` vs `mixed`, including synthetic filtering.
  - Evidence: `api/main.py`, ETL modules.
- [FACT] Deployment model:
  - Kustomize overlays for staging/prod with API/UI + ETL cronjobs.
  - Terraform modules for ECR and deploy roles.
- [FACT] Observability/testing:
  - health endpoints, API tests, ETL tests.
- [INFERENCE] Maturity: strong for internal analytics; not structured as tenant-facing analytics product API.
- [PROPOSED] Legal Workflow OS integration opportunity:
  - Keep as Internal Analytics Connector.
  - Build a separate tenant-scoped analytics service for customer analytics.
- [RISK] Current model blends internal and external-investor views; tenant isolation semantics should be explicit for customer-facing analytics.

### 6) esheria-foundation
- Repo path: `C:\Users\HP\work\esherialabs\esheria-foundation`
- [FACT] Purpose: Next.js foundation/public website.
- [FACT] Product role: public content + lead/forms capture.
- [FACT] API surface:
  - `POST /api/contact`
  - `POST /api/subscribe`
  - `POST /api/vitals`
- [FACT] Security model for forms: turnstile verification, origin checks, in-memory rate limiting, SES readiness checks.
  - Evidence: `app/api/contact/route.ts`, `app/api/subscribe/route.ts`, `lib/forms/server.ts`, `lib/forms/turnstile.ts`.
- [FACT] Deployment model: EKS manifests (`k8s/*`) with ALB ingress.
- [INFERENCE] Not part of legal workflow runtime; useful for enterprise landing/onboarding surfaces.

### 7) website (legacy site)
- Repo path: `C:\Users\HP\work\esherialabs\website`
- [FACT] Purpose: older Next.js marketing/content site with heavy static component library.
- [FACT] Architecture: Next.js pages router, middleware for blog URL redirects.
- [FACT] API layer: no meaningful product API surface observed.
- [FACT] Notable integration clues: links out to chat/login surfaces and external content APIs in blog workflows.
- [FACT] Deployment clues: Ansible + Nginx + PM2 documented under `devops`.
- [INFERENCE] Platform relevance is low for Legal Workflow OS core; mostly marketing legacy.

### 8) lexchat-plugin
- Repo path: `C:\Users\HP\work\esherialabs\lexchat-plugin`
- [FACT] Purpose: Chrome extension scaffold targeting `https://new.kenyalaw.org/*`.
  - Evidence: `public/manifest.json`.
- [FACT] Runtime model: content script + background worker + React UI.
- [FACT] Current API usage: no live backend integration; assistant responses are simulated in UI.
  - Evidence: `src/components/LegalAssistant.tsx`.
- [FACT] Auth model: none implemented yet.
- [INFERENCE] Best treated as future edge connector, not current production dependency.

## Optional comparison scan (light)

### saferide / saferider / saferide-analytics / usikimye_webiste
- [FACT] These repos are safety/transport adjacent products with mobile and analytics patterns, not legal workflow core.
- [INFERENCE] Reusable patterns:
  - privacy-oriented workflow capture,
  - incident analytics surfaces,
  - operator dashboards and role-aware interfaces.
- [PROPOSED] Reuse only generic platform patterns (ops dashboards, risk analytics UX), not domain model.

## Cross-repo findings for Legal Workflow OS design

### What exists today (fact)
- Strong capability services exist: OCR, compliance/contract engine, research/chat, drafting, internal analytics.
- Deployment patterns are heterogeneous: SageMaker service, EKS services, monorepos, mixed route styles.
- Auth is fragmented: session cookie (esheria-ai, analytics), JWT bearer (lexdraft), API key/JWT/none modes (contract-engine), IAM boundary (OCR).
- Tenancy semantics are inconsistent across repos.

### Required platform-level corrections (proposed)
- Introduce control plane for tenant identity, policy, provisioning, and integration management.
- Introduce data plane for workflow execution and document processing with strict tenant isolation.
- Standardize service contracts through a connector gateway.
- Separate customer analytics (tenant-scoped) from esheria internal analytics (cross-tenant/internal).
