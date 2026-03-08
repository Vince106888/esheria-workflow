# API Catalog - Legal Workflow OS Integration Baseline

Date: 2026-03-07
Scope: `esheria-ai`, `lexdraft`, `esheria-contract-engine`, `esheria-ocr`, `esheria-analytics`

Notes:
- This catalog is extracted from route code, FastAPI decorators, and OpenAPI snapshots.
- Auth column reflects observed route/runtime behavior, not target-state policy.

## 1) esheria-ai
Evidence: `src/routes/**/+server.ts`, `src/hooks.server.ts`, `pipeline/api/server.py`

### 1.1 SvelteKit app API routes
| Method | Path | Auth type observed | Purpose | Integration use | Notes / risk |
|---|---|---|---|---|---|
| GET | `/api/models` | session/user context | list available models | Research connector model discovery | gated by app-level settings |
| GET | `/api/assistants` | session/user context | list assistants | assistant config bootstrap | |
| GET | `/api/assistant/[id]` | session/user context | fetch assistant detail | assistant routing metadata | |
| GET | `/api/conversations` | session/user context | list conversations | context retrieval | |
| GET | `/api/conversation/[id]` | session/user context | fetch conversation | evidence/context replay | |
| GET | `/api/user` | session/user context | current user profile | identity context passthrough | |
| POST | `/conversation` | session/user context | create conversation | start research thread | writes conversation state |
| GET | `/conversation` | public redirect behavior | redirect root behavior | not used by connector | |
| POST | `/conversation/[id]` | session/user context | message append/generate | research execution | long-running interactions |
| PATCH | `/conversation/[id]` | session/user context | update conversation | workflow sync metadata | |
| DELETE | `/conversation/[id]` | session/user context | archive/delete conversation | lifecycle cleanup | |
| POST | `/conversation/[id]/share` | session/user context | share conversation | evidence sharing | public link concerns |
| GET | `/conversation/[id]/output/[sha256]` | session/user context | file output retrieval | attachment retrieval | |
| POST | `/conversation/[id]/stop-generating` | session/user context | abort generation | workflow cancellation | |
| POST | `/conversation/[id]/message/[messageId]/vote` | session/user context | feedback signal | quality telemetry | |
| GET | `/conversation/[id]/message/[messageId]/prompt` | session/user context | inspect prompt | audit/debug | sensitive prompt data |
| GET | `/healthcheck` | none | app health | health probe | |

### 1.2 Retrieval FastAPI (pipeline)
| Method | Path | Auth type observed | Purpose | Integration use | Notes / risk |
|---|---|---|---|---|---|
| GET | `/health` | none observed | service health + pool/cache status | readiness probe | consider gateway auth wrapping |
| POST | `/search` | none observed | case retrieval/search | research connector core | should be tenant-gated by caller |
| POST | `/search/constitution` | none observed | constitution retrieval | specialized legal research | |
| POST | `/search/statutes` | none observed | statutes retrieval | specialized legal research | |

## 2) lexdraft
Evidence: `apps/api/app/api/**/route.ts`, `apps/api/app/lib/auth.ts`

Auth pattern summary:
- JWT bearer parsing utility (`Authorization: Bearer <token>`)
- Many routes call `getUserIdFromToken`; some auth routes are public.

### 2.1 Auth and profile
| Method | Path | Auth type observed | Purpose | Integration use | Notes / risk |
|---|---|---|---|---|---|
| POST | `/api/auth/login` | public | issue JWT | identity bootstrap | local auth silo |
| POST | `/api/auth/register` | public | register user + token | provisioning bridge | |
| POST | `/api/auth/google` | public (google token input) | federated login | SSO bridge candidate | |
| POST | `/api/auth/logout` | token/session context | logout | session teardown | |
| GET | `/api/auth/profile` | bearer JWT | get profile | user profile sync | |
| PUT | `/api/auth/profile` | bearer JWT | update profile | user settings sync | |
| POST | `/api/auth/reset-password` | public | request password reset | admin/self-service | |
| POST | `/api/auth/reset-password/[token]` | token-based flow | confirm reset | account recovery | |

### 2.2 Documents and submissions
| Method | Path | Auth type observed | Purpose | Integration use | Notes / risk |
|---|---|---|---|---|---|
| GET | `/api/documents` | bearer JWT | list docs | document service sync | |
| POST | `/api/documents` | bearer JWT | create doc | intake/create doc | |
| GET | `/api/documents/[id]` | bearer JWT | fetch doc | review workspace load | |
| GET | `/api/documents/[id]/content` | bearer JWT | fetch doc content | drafting/review content retrieval | |
| GET | `/api/documents/[id]/autosave` | bearer JWT | fetch autosave state | editor recovery | |
| GET | `/api/documents/recent` | bearer JWT | recent docs | dashboard cards | |
| GET | `/api/documents/search` | bearer JWT | search docs | workspace search | |
| POST | `/api/documents/create` | bearer JWT | create draft doc | quick-start drafting | overlaps `/api/documents` |
| GET | `/api/submissions` | bearer JWT | list submissions | intake queue | |
| POST | `/api/submissions` | bearer JWT | create submission | contract intake flow | |
| GET | `/api/submissions/[id]` | bearer JWT | submission detail | intake tracking | |
| GET | `/api/submissions/ongoing` | bearer JWT | ongoing submissions | status widgets | |
| POST | `/api/webhooks/submissions` | webhook token pattern | webhook ingestion | async status updates | verify signature contract |

### 2.3 Review and assistant
| Method | Path | Auth type observed | Purpose | Integration use | Notes / risk |
|---|---|---|---|---|---|
| GET | `/api/reviews` | bearer JWT | list reviews | reviewer queue | |
| POST | `/api/reviews` | bearer JWT | create review | review lifecycle | |
| GET | `/api/reviews/[id]` | bearer JWT | review detail | review page load | |
| POST | `/api/reviews/[id]` | bearer JWT | update review action | accept/reject/escalate style actions | method semantics should be explicit |
| POST | `/api/suggestions/[id]/apply` | bearer JWT | apply suggestion | redline automation | verify route inventory consistency in adapter contract |
| POST | `/api/assistant/chat` | bearer JWT | chat assistant | drafting/review assistant | |
| GET | `/api/assistant/chat/history` | bearer JWT | prior chat history | context memory | |
| GET | `/api/assistant/benchmark` | bearer JWT | benchmark retrieval | quality metrics | |
| POST | `/api/assistant/benchmark` | bearer JWT | benchmark run/create | quality checks | |
| GET | `/api/assistant/draft` | bearer JWT | draft suggestions retrieval | drafting assist | |
| POST | `/api/assistant/draft` | bearer JWT | draft generation | drafting assist core | |

### 2.4 Editor and settings
| Method | Path | Auth type observed | Purpose | Integration use | Notes / risk |
|---|---|---|---|---|---|
| POST | `/api/tiptap/convert` | bearer JWT | document format conversion | intake normalization | external conversion dependencies |
| GET | `/api/tiptap/token` | bearer JWT | tiptap token issue | editor session | |
| GET | `/api/settings` | bearer JWT | get settings | profile/preferences | |
| PUT | `/api/settings` | bearer JWT | update settings | profile/preferences | |
| GET | `/api/users/settings` | bearer JWT | user settings | overlap with `/api/settings` | boundary clarity needed |
| PUT | `/api/users/settings` | bearer JWT | user settings update | settings sync | |
| GET | `/api/status` | none | health endpoint | health probe | used by k8s readiness/liveness |

## 3) esheria-contract-engine
Evidence: `api/routes.py`, `api/security.py`, `api/openapi.v1.json`

Auth pattern summary:
- every `/api/v1/*` route depends on `authenticate_request`
- mode from env: `none`, `api_key`, `jwt`

| Method | Path | Auth type observed | Purpose | Integration use | Notes / risk |
|---|---|---|---|---|---|
| GET | `/healthz` | none | liveness | probe | envelope format |
| GET | `/readyz` | none | readiness/dependency state | probe | includes startup deps |
| GET | `/metrics` | none | prometheus metrics | observability | secure in prod network |
| POST | `/api/v1/matters` | configurable auth | create matter | workflow root object | control plane should issue service identity |
| POST | `/api/v1/matters/{matter_id}/documents` | configurable auth | upload/parse document | document ingestion connector | supports async parse |
| POST | `/api/v1/matters/{matter_id}/regulatory-profile` | configurable auth | create regulatory profile | compliance profile build | |
| POST | `/api/v1/matters/{matter_id}/regulatory-packs` | configurable auth | lock packs/versions | deterministic compliance runs | |
| POST | `/api/v1/obligations/resolve` | configurable auth | resolve obligations | compliance mapping | |
| POST | `/api/v1/clauses/resolve` | configurable auth | resolve clauses | clause inventory and enrichment | |
| POST | `/api/v1/drafts/assemble` | configurable auth | assemble draft | draft generation orchestration | sync + async |
| GET | `/api/v1/drafts/{draft_id}` | configurable auth | fetch draft | review UI | |
| POST | `/api/v1/review/regulatory-overlay` | configurable auth | overlay compliance to draft | reviewer evidence | |
| POST | `/api/v1/review/issue-log` | configurable auth | generate issue log | risk review artifact | |
| POST | `/api/v1/compliance/check` | configurable auth | pass/fail compliance check | gating approvals | |
| POST | `/api/v1/drafts/{draft_id}/export` | configurable auth | export draft doc | deliverable artifact | sync + async |
| GET | `/api/v1/audit/{audit_log_id}` | configurable auth | audit retrieval | evidence/audit chain | |
| GET | `/api/v1/jobs/{job_id}` | configurable auth | async job status | orchestration poll | |
| GET | `/api/v1/admin/retrieval/status` | configurable auth | retrieval readiness status | ops panel | should be operator-only policy |
| POST | `/api/v1/admin/retrieval/reindex` | configurable auth | rebuild index | operator maintenance | heavy job boundary |
| POST | `/api/v1/admin/targeting/tune` | configurable auth | tune targeting | operator maintenance | heavy job boundary |

## 4) esheria-ocr
Evidence: `app.py`

| Method | Path | Auth type observed | Purpose | Integration use | Notes / risk |
|---|---|---|---|---|---|
| POST | `/invocations` | none in app (IAM at platform layer) | OCR inference on image payload | OCR connector execution | wrap behind platform document service |
| GET | `/ping` | none in app | readiness against local llm backend | health probe | exposes backend readiness |

## 5) esheria-analytics
Evidence: `api/main.py`, `api/auth_backend.py`, `api/config_routes.py`, `api/admin_routes.py`

Auth pattern summary:
- session cookie `analytics_session` (JWT) set by login route
- role-gated dependencies: `require_user`, `require_admin`, `require_super_admin`

### 5.1 Auth and access
| Method | Path | Auth type observed | Purpose | Integration use | Notes / risk |
|---|---|---|---|---|---|
| POST | `/auth/login` | credentials in body | login and set cookie | internal console auth | tied to legacy auth DB |
| POST | `/auth/logout` | cookie session | logout and clear cookie | internal console | |
| GET | `/auth/me` | cookie session | current identity | session introspection | includes role flags |
| GET | `/admin/internal-users` | super admin | list internal users | operator admin | internal only |
| PATCH | `/admin/internal-users/{user_id}` | super admin | mutate internal user flags | operator admin | internal only |
| GET | `/config/analytics-mode` | user | get mode (`real_only`/`mixed`) | analytics mode control | |
| PUT | `/config/analytics-mode` | super admin | set analytics mode | governance control | |

### 5.2 Analytics data endpoints
| Method | Path | Auth type observed | Purpose | Integration use | Notes / risk |
|---|---|---|---|---|---|
| GET | `/analytics/health` | none | service health | probe | |
| GET | `/analytics/fx` | user | FX quote helper | display conversion | narrow utility |
| GET | `/analytics/overview` | user | top-level analytics overview | internal dashboard | cross-tenant/internal semantics |
| GET | `/analytics/engagement` | user | engagement metrics | internal dashboard | |
| GET | `/analytics/revenue/overview` | user | revenue metrics | internal dashboard | |
| GET | `/analytics/orgs` | user | org list and status | internal ops | business-only filters in code |
| GET | `/analytics/orgs/{org_id}` | user | org detail metrics | internal ops deep view | |
| GET | `/analytics/debug/revenue` | admin + dev mode | debug revenue quality | troubleshooting | disable in prod |

## Integration suitability notes

### Most integration-ready surfaces
- `esheria-contract-engine` `/api/v1/*` suite: strongest workflow API shape.
- `esheria-ocr` `/invocations`: narrow and predictable capability endpoint.
- `esheria-ai` retrieval endpoints (`/search*`): strong for connector adaptation.

### Surfaces requiring boundary hardening
- `lexdraft` API: broad and useful but mixed concerns, duplicated settings endpoints, and route-level auth checks.
- `esheria-analytics` API: designed for internal analytics; should not be reused directly for tenant-facing analytics without tenancy guardrails.

### Missing/weak contracts to fix in target platform
- unified tenant identity propagation claims across services
- standard error envelope and correlation id across all services
- service-to-service auth standard (short-lived signed tokens)
- canonical workflow status/state event contract
- formal data classification and audit policy for cross-tenant analytics access
