export const architectureModel = {
  meta: {
    platformName: "Esheria Legal Workflow OS",
    version: "0.1.0",
    generatedOn: "2026-03-07",
    classification: "confidential",
    audiences: ["executive", "technical", "implementation"],
  },

  evidenceSources: [
    { repo: "esheria-ai", files: ["src/hooks.server.ts", "src/lib/server/database.ts", "pipeline/api/server.py"] },
    { repo: "lexdraft", files: ["apps/api/app/api/**/route.ts", "apps/api/app/lib/auth.ts", "docker-compose.yml"] },
    { repo: "esheria-contract-engine", files: ["api/routes.py", "api/security.py", "api/openapi.v1.json"] },
    { repo: "esheria-ocr", files: ["app.py", "deploy_sagemaker_ocr.sh", "buildspec.yml"] },
    { repo: "esheria-analytics", files: ["api/main.py", "api/auth_backend.py", "etl/*", "deploy/k8s/*"] },
  ],

  platformLayers: [
    {
      id: "experience",
      name: "Experience Layer",
      purpose: "Customer and operator user interfaces",
      modules: ["institution-workspace", "operator-console"],
    },
    {
      id: "control-plane",
      name: "Control Plane",
      purpose: "Tenant management, policy, identity, orchestration governance",
      modules: ["identity-tenant-service", "policy-service", "integration-manager", "operator-governance"],
    },
    {
      id: "data-plane",
      name: "Data Plane",
      purpose: "Workflow execution, document/review lifecycle, eventing, evidence",
      modules: [
        "workflow-engine",
        "document-service",
        "review-task-service",
        "audit-evidence-service",
        "notification-service",
        "analytics-event-service",
        "customer-analytics-service",
      ],
    },
    {
      id: "connector-layer",
      name: "Capability Connector Layer",
      purpose: "Stable platform contracts over existing Esheria capabilities",
      modules: [
        "ocr-connector",
        "compliance-connector",
        "research-connector",
        "drafting-connector",
        "internal-analytics-connector",
        "edge-browser-connector",
      ],
    },
    {
      id: "data-infra",
      name: "Data and Infrastructure Layer",
      purpose: "Storage, queueing, indexing, observability, security controls",
      modules: [
        "transaction-store",
        "object-store",
        "event-bus",
        "search-index",
        "customer-analytics-store",
        "internal-analytics-store",
        "observability",
        "config-secrets",
      ],
    },
  ],

  customerModules: [
    {
      id: "institution-workspace",
      name: "Institution Workspace",
      capabilities: ["tenant landing", "matter queue", "review assignments", "team views"],
    },
    {
      id: "contract-intake",
      name: "Contract Intake Interface",
      capabilities: ["document upload", "metadata capture", "routing to workflow templates"],
    },
    {
      id: "review-approval",
      name: "Review and Approval Surfaces",
      capabilities: ["risk findings", "clause suggestions", "decision capture", "escalation"],
    },
    {
      id: "institution-analytics",
      name: "Institution Analytics Dashboard",
      capabilities: ["throughput", "sla", "risk trends", "compliance bottlenecks", "team performance"],
    },
    {
      id: "tenant-settings",
      name: "Settings and Integrations",
      capabilities: ["user/role management", "connector settings", "workflow template config"],
    },
  ],

  operatorModules: [
    {
      id: "operator-console",
      name: "Operator Admin Console",
      capabilities: ["tenant provisioning", "plan management", "feature controls"],
    },
    {
      id: "workflow-ops-monitor",
      name: "Workflow Ops Monitor",
      capabilities: ["run status", "failed step inspection", "retry/replay actions"],
    },
    {
      id: "service-health",
      name: "Service Health and Incident Views",
      capabilities: ["latency/error by connector", "incident timeline", "dependency checks"],
    },
    {
      id: "support-tools",
      name: "Support and Intervention Tools",
      capabilities: ["tenant lookup", "audited impersonation", "manual override"],
    },
    {
      id: "internal-analytics",
      name: "Cross-tenant Internal Analytics",
      capabilities: ["commercial telemetry", "ops metrics", "support load", "billing usage"],
    },
  ],

  backendModules: [
    {
      id: "identity-tenant-service",
      name: "Auth, Identity, Tenant Management",
      responsibilities: ["federated auth", "tenant claims", "role policies", "service token issuance"],
    },
    {
      id: "workflow-engine",
      name: "Workflow Engine",
      responsibilities: ["state machine execution", "step orchestration", "retry/escalation", "versioned templates"],
    },
    {
      id: "document-service",
      name: "Document Service",
      responsibilities: ["ingestion", "storage references", "content lifecycle", "document metadata"],
    },
    {
      id: "review-task-service",
      name: "Review and Task Service",
      responsibilities: ["review queues", "assignment", "decision capture", "action history"],
    },
    {
      id: "audit-evidence-service",
      name: "Audit and Evidence Service",
      responsibilities: ["event trail", "evidence links", "compliance logs", "forensic replay"],
    },
    {
      id: "policy-service",
      name: "Policy Service",
      responsibilities: ["authorization policies", "workflow guardrails", "governance checks"],
    },
    {
      id: "connector-gateway",
      name: "Connector Gateway",
      responsibilities: ["contract normalization", "adapter invocation", "error normalization", "trace propagation"],
    },
    {
      id: "notification-service",
      name: "Notification Service",
      responsibilities: ["alerts", "email/webhook dispatch", "sla notifications"],
    },
    {
      id: "analytics-event-service",
      name: "Analytics Event Service",
      responsibilities: ["event collection", "customer/internal split", "metric stream fanout"],
    },
    {
      id: "customer-analytics-service",
      name: "Customer Analytics Service",
      responsibilities: ["tenant-scoped metric models", "dashboard aggregates", "sla/risk trend analytics"],
    },
    {
      id: "integration-manager",
      name: "Integration Manager",
      responsibilities: ["connector config", "credential references", "integration health"],
    },
  ],

  serviceConnectors: [
    {
      id: "ocr-connector",
      targetService: "esheria-ocr",
      purpose: "document text extraction",
      currentEndpoints: ["POST /invocations", "GET /ping"],
      status: "available",
    },
    {
      id: "compliance-connector",
      targetService: "esheria-contract-engine",
      purpose: "compliance, obligations, clauses, draft assembly/export",
      currentEndpoints: ["/api/v1/matters", "/api/v1/obligations/resolve", "/api/v1/clauses/resolve", "/api/v1/drafts/assemble"],
      status: "available",
    },
    {
      id: "research-connector",
      targetService: "esheria-ai",
      purpose: "legal retrieval and citations",
      currentEndpoints: ["POST /search", "POST /search/constitution", "POST /search/statutes"],
      status: "available",
    },
    {
      id: "drafting-connector",
      targetService: "lexdraft",
      purpose: "drafting and review assist",
      currentEndpoints: ["/api/assistant/draft", "/api/reviews", "/api/documents"],
      status: "available-with-adapter-hardening",
    },
    {
      id: "internal-analytics-connector",
      targetService: "esheria-analytics",
      purpose: "internal telemetry and ops analytics",
      currentEndpoints: ["/analytics/overview", "/analytics/engagement", "/analytics/revenue/overview"],
      status: "internal-only",
    },
    {
      id: "edge-browser-connector",
      targetService: "lexchat-plugin",
      purpose: "browser-side legal workflow assist",
      currentEndpoints: [],
      status: "future",
    },
  ],

  workflows: [
    {
      id: "contract-intake-review",
      name: "Contract Intake and Review",
      states: [
        "draft",
        "intake_received",
        "preprocessing",
        "compliance_analysis",
        "review_pending",
        "changes_requested",
        "approved",
        "exported",
        "archived",
      ],
      steps: [
        "capture intake and metadata",
        "OCR and normalization",
        "clause and obligation resolution",
        "risk scoring and issue log generation",
        "review assignment",
        "approve/escalate/rework",
        "export and audit closure",
      ],
      connectors: ["ocr-connector", "compliance-connector", "research-connector", "drafting-connector"],
    },
  ],

  dashboards: {
    customer: [
      { id: "cust-throughput", name: "Throughput and Queue Health", metrics: ["intake_count", "active_reviews", "turnaround_time"] },
      { id: "cust-risk", name: "Risk and Compliance Trends", metrics: ["risk_category_rate", "compliance_failures", "high_severity_findings"] },
      { id: "cust-sla", name: "SLA and Bottlenecks", metrics: ["sla_breach_rate", "pending_age", "step_latency"] },
    ],
    operator: [
      { id: "ops-health", name: "Service Health", metrics: ["error_rate_by_connector", "latency_p95", "incident_open_count"] },
      { id: "ops-workflows", name: "Workflow Operations", metrics: ["failed_runs", "retry_success_rate", "queue_depth"] },
      { id: "ops-commercial", name: "Usage and Billing", metrics: ["tenant_usage", "plan_utilization", "revenue_trend"] },
    ],
  },

  apiCatalog: {
    esheriaAi: {
      authModel: "session-based app auth; retrieval API auth not explicit",
      keyDomains: ["models", "assistants", "conversations", "retrieval"],
      integrationReadyEndpoints: ["POST /search", "POST /search/constitution", "POST /search/statutes"],
    },
    lexdraft: {
      authModel: "JWT bearer per route",
      keyDomains: ["auth", "documents", "reviews", "submissions", "assistant", "settings"],
      integrationReadyEndpoints: ["POST /api/assistant/draft", "GET/POST /api/reviews", "GET/POST /api/documents"],
    },
    esheriaContractEngine: {
      authModel: "configurable none/api_key/jwt",
      keyDomains: ["matters", "documents", "obligations", "clauses", "drafts", "audit", "jobs"],
      integrationReadyEndpoints: ["POST /api/v1/matters", "POST /api/v1/matters/{matter_id}/documents", "POST /api/v1/obligations/resolve", "POST /api/v1/drafts/assemble"],
    },
    esheriaOcr: {
      authModel: "app-level none; infra-level IAM",
      keyDomains: ["ocr_inference", "health"],
      integrationReadyEndpoints: ["POST /invocations"],
    },
    esheriaAnalytics: {
      authModel: "session cookie JWT with role gates",
      keyDomains: ["auth", "overview", "engagement", "revenue", "orgs", "admin"],
      integrationReadyEndpoints: ["GET /analytics/overview", "GET /analytics/engagement", "GET /analytics/revenue/overview"],
      constraints: ["internal analytics semantics", "not tenant-facing by default"],
    },
  },

  ontologyEntities: [
    { id: "tenant", fields: ["tenant_id", "name", "status", "plan", "created_at"] },
    { id: "organization", fields: ["org_id", "tenant_id", "name", "industry", "region"] },
    { id: "user", fields: ["user_id", "tenant_id", "org_id", "role", "email"] },
    { id: "matter", fields: ["matter_id", "tenant_id", "org_id", "title", "status", "owner_user_id"] },
    { id: "document", fields: ["document_id", "matter_id", "source", "storage_uri", "parse_status", "version"] },
    { id: "clause", fields: ["clause_id", "document_id", "normalized_text", "clause_type", "confidence"] },
    { id: "obligation", fields: ["obligation_id", "matter_id", "source_clause_id", "severity", "status"] },
    { id: "risk", fields: ["risk_id", "matter_id", "clause_id", "severity", "policy_reference"] },
    { id: "review", fields: ["review_id", "matter_id", "assigned_to", "status", "decision"] },
    { id: "review_action", fields: ["action_id", "review_id", "action_type", "actor_user_id", "reason"] },
    { id: "workflow_definition", fields: ["workflow_def_id", "name", "version", "state_schema"] },
    { id: "workflow_run", fields: ["workflow_run_id", "workflow_def_id", "matter_id", "state", "started_at", "ended_at"] },
    { id: "task", fields: ["task_id", "workflow_run_id", "task_type", "assignee", "status", "due_at"] },
    { id: "evidence", fields: ["evidence_id", "workflow_run_id", "source_type", "uri", "hash", "captured_at"] },
    { id: "integration_config", fields: ["integration_id", "tenant_id", "connector_type", "status", "config_ref"] },
  ],

  roadmap: [
    {
      phase: "phase-1",
      name: "Deep extraction and architecture normalization",
      duration: "0-3 weeks",
      outcomes: ["evidence-based architecture pack", "canonical model", "diagram set", "presentation scaffold"],
    },
    {
      phase: "phase-2",
      name: "Visual polish and export pipeline",
      duration: "3-6 weeks",
      outcomes: ["executive and blueprint decks", "diagram exports", "design quality uplift"],
    },
    {
      phase: "phase-3",
      name: "Integration proposal and MVP technical design",
      duration: "6-12 weeks",
      outcomes: ["connector contracts", "mvp architecture", "phased build plan"],
    },
  ],

  successMetrics: {
    technical: [
      "end-to-end workflow success rate",
      "connector error rate and latency",
      "audit completeness ratio",
      "workflow state transition correctness",
    ],
    product: [
      "review turnaround reduction",
      "high-risk issue detection rate",
      "user decision confidence",
      "workflow completion rate",
    ],
    business: [
      "pilot conversion count",
      "tenant expansion rate",
      "net revenue retention indicators",
      "support burden per tenant",
    ],
  },

  currentStateAnalysis: {
    facts: [
      "service capability depth is strong across OCR, compliance, research, drafting, and analytics",
      "authentication and tenancy models are fragmented",
      "deployment patterns are heterogeneous across EKS, SageMaker, and monolithic app runtimes",
    ],
    inferences: [
      "highest implementation risk is cross-service identity and policy consistency",
      "fastest MVP path is orchestration-first over existing services rather than rewrites",
    ],
    proposals: [
      "introduce control plane and data plane separation",
      "standardize connector contracts and trace propagation",
      "separate customer analytics service from internal analytics service",
    ],
  },
};

export default architectureModel;
