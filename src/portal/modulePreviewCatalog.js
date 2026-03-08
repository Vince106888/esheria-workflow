import architectureModel from "../architecture/architectureModel";
import { DASHBOARD_SIDEBAR_OVERRIDES } from "./dashboardSidebarConfig";

const CUSTOMER_CAPABILITIES = architectureModel.customerModules.flatMap((module) => module.capabilities || []);
const OPERATOR_CAPABILITIES = architectureModel.operatorModules.flatMap((module) => module.capabilities || []);
const WORKFLOW_RESPONSIBILITIES = architectureModel.backendModules
  .filter((module) => ["workflow-engine", "review-task-service", "audit-evidence-service", "notification-service"].includes(module.id))
  .flatMap((module) => module.responsibilities || []);
const ANALYTICS_METRICS = architectureModel.dashboards.customer.flatMap((dashboard) => dashboard.metrics || []);
const SUPPORT_SIGNALS = architectureModel.dashboards.operator.flatMap((dashboard) => dashboard.metrics || []);
const ALL_SIGNALS = Array.from(new Set([...ANALYTICS_METRICS, ...SUPPORT_SIGNALS]));

const DASHBOARD_PREVIEW_CONTEXT = {
  "institution-workspace": {
    audience: "Head of Legal, legal operations, and practice managers",
    mission: "Convert incoming legal demand into fast, auditable decisions.",
    businessValue: "Protect renewal confidence by showing predictable turnaround and risk control per tenant.",
    architectureAnchors: ["contract-intake-review", "review-task-service", "audit-evidence-service"],
    capabilityPool: CUSTOMER_CAPABILITIES,
  },
  "operator-console": {
    audience: "Platform operations and control-plane administrators",
    mission: "Keep tenant onboarding, policy, and governance safe at platform scale.",
    businessValue: "Reduce operational drag while preserving compliance posture across every tenant.",
    architectureAnchors: ["identity-tenant-service", "policy-service", "integration-manager"],
    capabilityPool: OPERATOR_CAPABILITIES,
  },
  "workflow-monitoring": {
    audience: "Runtime operators and engineering on-call teams",
    mission: "Stabilize execution throughput and recover failures before SLA damage.",
    businessValue: "Turn workflow reliability into a measurable enterprise trust signal.",
    architectureAnchors: ["workflow-engine", "review-task-service", "notification-service"],
    capabilityPool: WORKFLOW_RESPONSIBILITIES,
  },
  "institution-analytics": {
    audience: "Customer leadership and business stakeholders",
    mission: "Translate execution telemetry into board-facing legal performance outcomes.",
    businessValue: "Support expansion conversations with concrete throughput, SLA, and risk trends.",
    architectureAnchors: ["customer-analytics-service", "analytics-event-service", "customer-analytics-store"],
    capabilityPool: ANALYTICS_METRICS,
  },
  "support-incident-center": {
    audience: "Support command, incident managers, and SRE stakeholders",
    mission: "Contain tenant-impacting incidents with accountable response playbooks.",
    businessValue: "Preserve confidence during incidents by making response speed and visibility explicit.",
    architectureAnchors: ["service-health", "support-tools", "audit-evidence-service"],
    capabilityPool: SUPPORT_SIGNALS,
  },
};

function slugify(value = "") {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function moduleIdFromLabel(label = "") {
  return slugify(label);
}

export function buildModulePreviewPath(dashboardId, moduleId) {
  return `/dashboards/${dashboardId}/${moduleId}`;
}

function toReadableToken(value = "") {
  return String(value)
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function pickFromPool(pool, index, count = 3) {
  if (!pool.length) return [];
  const output = [];
  for (let offset = 0; offset < count; offset += 1) {
    output.push(pool[(index + offset) % pool.length]);
  }
  return output;
}

const MODULE_RULES = [
  {
    id: "overview",
    test: /(home|overview)/i,
    mode: "overview",
    summary: "Core command surface that sets the daily operating context.",
    outcome: "Leaders can set priorities without switching systems.",
    playbook: [
      "Confirm daily operating baseline and critical alerts.",
      "Assign accountable owners to top outcomes.",
      "Publish an executive summary with next decisions.",
    ],
    actions: ["Publish Daily Brief", "Escalate Priority Risk", "Freeze Non-Critical Changes"],
    riskLens: ["Signal blindness during rapid queue growth", "Unowned actions in cross-team handoffs", "Delayed visibility for board-level risk"],
  },
  {
    id: "flow",
    test: /(inbox|intake|queue|provision|onboarding|active runs|runs active|throughput|export)/i,
    mode: "flow",
    summary: "Execution lane that moves work from request to completed outcome.",
    outcome: "Higher throughput with fewer stalled items and predictable cycle time.",
    playbook: [
      "Validate queue age distribution and routing balance.",
      "Prioritize oldest high-value work with SLA proximity.",
      "Trigger automated reassignment for blocked items.",
    ],
    actions: ["Rebalance Queue", "Trigger Auto-Routing", "Open Throughput War-Room"],
    riskLens: ["Queue aging without intervention", "Capacity mismatch across teams", "Export bottlenecks blocking closure"],
  },
  {
    id: "review",
    test: /(review|approvals|approve|approval|signoff)/i,
    mode: "review",
    summary: "Decision governance lane for legal and operational approvals.",
    outcome: "Faster approvals while preserving defensible audit evidence.",
    playbook: [
      "Surface pending signoffs with business impact context.",
      "Bundle evidence and rationale before escalation.",
      "Enforce approval policy with explicit accountability.",
    ],
    actions: ["Approve with Conditions", "Request Targeted Rework", "Escalate to Governance Lead"],
    riskLens: ["Approval latency during peak volume", "Missing supporting evidence in high-risk cases", "Policy exceptions without audit trace"],
  },
  {
    id: "governance",
    test: /(policy|governance|entitlements|rbac|audit|settings|benchmarks)/i,
    mode: "governance",
    summary: "Control-plane guardrails that keep scale aligned with policy and trust.",
    outcome: "Consistent controls across tenants with lower compliance overhead.",
    playbook: [
      "Compare live behavior against policy baseline.",
      "Pinpoint drift and bind owners to remediation windows.",
      "Record policy decisions for replay and audit review.",
    ],
    actions: ["Apply Guardrail Patch", "Open Policy Exception", "Start Compliance Verification"],
    riskLens: ["Silent policy drift across tenant segments", "Over-permissioned roles increasing exposure", "Audit gaps after urgent interventions"],
  },
  {
    id: "operations",
    test: /(runtime|latency|retry|replay|alert|connector|logs|activity|team activity)/i,
    mode: "operations",
    summary: "Runtime reliability lane for service health, retries, and on-call response.",
    outcome: "Lower incident duration and stable workflow execution under load.",
    playbook: [
      "Detect degradation early from latency and error signatures.",
      "Execute retry or replay strategy by connector profile.",
      "Close the loop with post-action verification metrics.",
    ],
    actions: ["Run Auto-Retry", "Shift Traffic to Healthy Path", "Page Cross-Functional On-Call"],
    riskLens: ["Retry storms amplifying load", "Alert fatigue masking true incidents", "Repeated degradation in the same connector path"],
  },
  {
    id: "incident",
    test: /(incident|triage|mitigation|advisories|postmortems|runbooks|p1|p2|impacted)/i,
    mode: "incident",
    summary: "Incident command lane for containment, communication, and recovery.",
    outcome: "Shorter mitigation time and higher customer confidence during incidents.",
    playbook: [
      "Contain blast radius and confirm affected tenants.",
      "Execute mitigation plan with timed owner checkpoints.",
      "Publish advisory and capture learnings into runbooks.",
    ],
    actions: ["Launch Incident Protocol", "Send Tenant Advisory", "Start Postmortem Draft"],
    riskLens: ["Mitigation lag beyond SLA commitments", "Incomplete customer communication", "Repeated incident classes without prevention"],
  },
  {
    id: "analytics",
    test: /(analytics|kpi|sla|risk|executive|performance|trends)/i,
    mode: "analytics",
    summary: "Outcome analytics lane translating operations into executive decisions.",
    outcome: "Data-backed planning for renewal, expansion, and resourcing.",
    playbook: [
      "Align KPI lens to executive planning horizon.",
      "Flag movement against target bands and confidence intervals.",
      "Package recommendation with measurable expected impact.",
    ],
    actions: ["Publish KPI Review", "Trigger Forecast Refresh", "Prepare Board Narrative"],
    riskLens: ["Misleading trend interpretation from short windows", "Unclear KPI ownership", "No linkage between signals and decisions"],
  },
];

function resolveRule(label = "") {
  return MODULE_RULES.find((rule) => rule.test.test(label)) || MODULE_RULES[0];
}

function buildTargetValue(mode, index) {
  const targetByMode = {
    overview: ["< 3 unresolved critical flags", "95% owner assignment within 15m", "100% leadership brief by 09:30"],
    flow: ["< 24h average queue age", ">= 88% flow completion", "< 5% stalled items"],
    review: ["< 90m signoff latency", ">= 97% evidence completeness", "< 2% returned approvals"],
    governance: ["< 1 policy drift incident/week", "100% role-policy match", ">= 99% audit trace coverage"],
    operations: ["P95 latency < 3.0s", "Retry success >= 92%", "Connector error rate < 1.5%"],
    incident: ["Mitigation < 45m", "Advisory issued < 12m", "Postmortem draft < 24h"],
    analytics: [">= 93% SLA compliance", "Risk escalation trend down", "Forecast confidence >= 85%"],
  };
  const source = targetByMode[mode] || targetByMode.overview;
  return source[index % source.length];
}

function enrichModule(dashboardId, label, index) {
  const context = DASHBOARD_PREVIEW_CONTEXT[dashboardId] || {
    audience: "Cross-functional stakeholders",
    mission: "Maintain strong system execution.",
    businessValue: "Create measurable decision confidence.",
    architectureAnchors: [],
    capabilityPool: [],
  };
  const rule = resolveRule(label);
  const moduleId = moduleIdFromLabel(label);
  const capabilitySlice = pickFromPool(context.capabilityPool, index * 2, 3).map(toReadableToken);
  const anchor = context.architectureAnchors[index % Math.max(context.architectureAnchors.length, 1)] || "workflow-engine";
  const signalSlice = pickFromPool(ALL_SIGNALS, index * 3 + dashboardId.length, 3).map(toReadableToken);
  const targets = signalSlice.map((metric, metricIndex) => ({
    metric,
    target: buildTargetValue(rule.mode, metricIndex),
  }));

  return {
    id: moduleId,
    label,
    mode: rule.mode,
    summary: `${label} - ${rule.summary}`,
    executiveOutcome: `${rule.outcome} ${context.businessValue}`,
    technicalNarrative: [
      `${label} aligns with ${anchor.replace(/-/g, " ")} controls for execution guardrails.`,
      `Key signal focus: ${signalSlice.join(", ")} with explicit owner accountability.`,
      `Capability emphasis: ${capabilitySlice.join(", ")}.`,
    ],
    decisionChecklist: [
      `Is ${label.toLowerCase()} exposing the right decision points for ${context.audience.toLowerCase()}?`,
      "Are escalation and approval actions bound to auditable evidence?",
      "Can this module be measured using outcome KPIs rather than activity counts?",
    ],
    playbook: rule.playbook,
    actionSet: rule.actions,
    riskLens: rule.riskLens,
    focusMetrics: signalSlice,
    operatingTargets: targets,
    linkedArtifacts: [
      { label: "Dashboard Gallery", to: "/dashboards" },
      { label: "Architecture Diagrams", to: "/diagrams" },
      { label: "Technical Blueprint", to: "/blueprint" },
      { label: "Source Documents", to: "/documents" },
    ],
  };
}

export const dashboardModuleCatalog = Object.entries(DASHBOARD_SIDEBAR_OVERRIDES).reduce((acc, [dashboardId, config]) => {
  const modules = (config.nav || []).map((label, index) => enrichModule(dashboardId, label, index));
  acc[dashboardId] = {
    dashboardId,
    brand: config.brand,
    audience: DASHBOARD_PREVIEW_CONTEXT[dashboardId]?.audience || "Cross-functional stakeholders",
    mission: DASHBOARD_PREVIEW_CONTEXT[dashboardId]?.mission || "System excellence",
    modules,
  };
  return acc;
}, {});

export function getDashboardModulePreview(dashboardId, moduleId) {
  const dashboard = dashboardModuleCatalog[dashboardId];
  if (!dashboard) return null;
  const module = dashboard.modules.find((entry) => entry.id === moduleId);
  if (!module) return null;
  return { dashboard, module };
}

export default dashboardModuleCatalog;
