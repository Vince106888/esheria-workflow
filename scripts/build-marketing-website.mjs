import fs from "node:fs/promises";
import path from "node:path";

const ensureDir = async (p) => fs.mkdir(p, { recursive: true });
const write = async (p, content) => {
  await ensureDir(path.dirname(p));
  await fs.writeFile(p, content, "utf8");
};
const THEME_STORAGE_KEY = "esheria-theme";

const nav = [
  { href: "/index.html", label: "Home" },
  { href: "/pages/product.html", label: "Product" },
  { href: "/pages/solutions.html", label: "Solutions" },
  { href: "/pages/platform.html", label: "Platform" },
  { href: "/pages/security.html", label: "Security" },
  { href: "/pages/integrations.html", label: "Integrations" },
  { href: "/pages/analytics.html", label: "Analytics" },
  { href: "/pages/pricing.html", label: "Pricing" },
  { href: "/pages/customers.html", label: "Customers" },
  { href: "/pages/resources.html", label: "Resources" },
  { href: "/pages/appendix.html", label: "Appendix" },
];

const trustSignals = [
  "Trusted by enterprise legal teams",
  "Policy-safe by default",
  "Tenant boundaries + immutable evidence",
  "Operator-grade reliability loops",
];

const roles = [
  {
    id: "institution",
    label: "Institution Workspace",
    audience: "Legal Operations",
    summary: "Tenant-level workspace for intake, review, SLA risk, and export evidence.",
    href: "/artifacts/visuals/dashboards/html/institution-workspace.html",
  },
  {
    id: "operator",
    label: "Operator Console",
    audience: "Platform Operations",
    summary: "Cross-tenant governance for provisioning, policy enforcement, and incident command.",
    href: "/artifacts/visuals/dashboards/html/operator-console.html",
  },
  {
    id: "board",
    label: "Board Command Center",
    audience: "CEO + Board",
    summary: "Revenue confidence view linking reliability posture to renewal and expansion signals.",
    href: "/artifacts/visuals/dashboards/html/board-command-center.html",
  },
];

const pages = [
  {
    route: "index.html",
    title: "Legal Workflow OS Built for Enterprise Velocity",
    kicker: "B2B Product Website",
    subtitle: "Move contracts from intake to signed with policy-safe automation, live operator controls, and revenue-linked analytics.",
    summary:
      "Esheria is the operating system for legal workflow execution. Teams launch faster, keep governance intact, and turn operations telemetry into board-ready decisions.",
    highlights: ["2.4x faster legal turnaround", "91% forecast confidence", "Enterprise-grade tenant isolation by default"],
    modules: [
      { title: "Workflow Orchestration", body: "Automate intake, routing, compliance checks, review, and export with full traceability." },
      { title: "Operator Governance", body: "Run policy enforcement, connector controls, and incident workflows without exposing tenant internals." },
      { title: "Revenue Intelligence", body: "Tie SLA, trust posture, and adoption signals directly to renewal and expansion planning." },
    ],
    primaryCta: { label: "Schedule CEO Strategy Demo", href: "/pages/pricing.html" },
    secondaryCta: { label: "Open Live Institution Workspace", href: "/artifacts/visuals/dashboards/html/institution-workspace.html" },
  },
  {
    route: "product.html",
    title: "One Product, Three Control Surfaces",
    kicker: "Product Suite",
    subtitle: "Customer workspace, operator command, and executive foresight in one connected platform.",
    summary: "Role-specific interfaces run on shared policy and evidence primitives so teams can move independently while staying aligned.",
    highlights: ["Role-based UX by design", "Shared audit backbone", "Evidence packet generation in-flow"],
    modules: [
      { title: "Institution Surface", body: "Legal teams manage work queues, risk findings, and exports with tenant-scoped controls." },
      { title: "Operator Surface", body: "Platform teams govern multi-tenant reliability and response operations." },
      { title: "Board Surface", body: "Leadership tracks risk-weighted ARR and trust index to steer growth with confidence." },
    ],
    primaryCta: { label: "Compare Role Surfaces Live", href: "/artifacts/visuals/dashboards/html/operator-console.html" },
    secondaryCta: { label: "Read Technical Blueprint", href: "/docs/architecture/technical-blueprint.md" },
  },
  {
    route: "solutions.html",
    title: "Solutions for Regulated, High-Volume Legal Operations",
    kicker: "Use Cases",
    subtitle: "Purpose-built flows for enterprise legal teams and cross-functional leadership.",
    summary: "Esheria packages contract velocity, governance confidence, and board clarity into one operating model.",
    highlights: ["Enterprise legal intake at scale", "Policy-first risk containment", "Cross-team decision loops"],
    modules: [
      { title: "Enterprise Legal Ops", body: "Reduce cycle times while keeping a verifiable record of every review and decision." },
      { title: "Platform + SRE", body: "Coordinate failures, retries, and mitigations with explicit ownership." },
      { title: "Executive Planning", body: "Forecast risk and growth from operational leading indicators." },
    ],
    primaryCta: { label: "See Solution Walkthrough", href: "/artifacts/visuals/dashboards/html/workflow-monitoring.html" },
    secondaryCta: { label: "Open Architecture Explorer", href: "/explorer" },
  },
  {
    route: "platform.html",
    title: "Composable Platform Architecture for Scale",
    kicker: "Platform",
    subtitle: "Control plane governance, data plane execution, connector contracts, and observability as core product features.",
    summary: "Identity, tenancy, and policy stay centralized while workflow capabilities remain modular and fast to evolve.",
    highlights: ["Control/data plane split", "Connector drift shielding", "Shared observability contracts"],
    modules: [
      { title: "Control Plane", body: "Identity, policy, tenant configuration, and governance orchestration." },
      { title: "Data Plane", body: "Workflow runtime, review ops, analytics, and export execution." },
      { title: "Integration Plane", body: "Stable adapter contracts into OCR, drafting, research, and analytics services." },
    ],
    primaryCta: { label: "Review Platform Blueprint", href: "/blueprint" },
    secondaryCta: { label: "Open Integration Map", href: "/diagrams/exports/svg/service-integration-map.svg" },
  },
  {
    route: "security.html",
    title: "Security and Governance Built Into Every Flow",
    kicker: "Security",
    subtitle: "Tenant boundaries, role-gated actions, immutable evidence, and policy-aware execution across every workflow.",
    summary: "Security is an operating pattern, not an add-on. Every path is permissioned, traceable, and reviewable.",
    highlights: ["Tenant isolation boundaries", "Role-based permissioning", "Immutable audit evidence"],
    modules: [
      { title: "Identity + Access", body: "Organization-aware identity controls and policy evaluation for workflow actions." },
      { title: "Audit + Evidence", body: "Signed workflow events and export traces for compliance and dispute defense." },
      { title: "Operational Guardrails", body: "Drift checks, policy packs, and escalation loops for controlled scale." },
    ],
    primaryCta: { label: "Review Governance Dashboard", href: "/artifacts/visuals/dashboards/html/operator-console.html" },
    secondaryCta: { label: "Read Consistency Review", href: "/docs/architecture/consistency-review.md" },
  },
  {
    route: "integrations.html",
    title: "Integration Layer That Absorbs Downstream Drift",
    kicker: "Integrations",
    subtitle: "Connector gateway standardizes calls into OCR, drafting, compliance, research, and analytics.",
    summary: "Adapter contracts protect workflow stability while downstream services evolve.",
    highlights: ["Stable connector contracts", "Normalized error semantics", "Trace envelope continuity"],
    modules: [
      { title: "Connector Gateway", body: "Unified abstraction for auth, retries, and transport to external services." },
      { title: "Error Translation", body: "Consistent failure semantics feeding incident and replay workflows." },
      { title: "Future Extensibility", body: "Edge channels and new providers added behind existing contracts." },
    ],
    primaryCta: { label: "See Integration Blueprint", href: "/diagrams/exports/svg/service-integration-map.svg" },
    secondaryCta: { label: "Open API Boundary Map", href: "/diagrams/exports/svg/api-boundary-map.svg" },
  },
  {
    route: "analytics.html",
    title: "Analytics That Serve Operators and Executives",
    kicker: "Analytics",
    subtitle: "Separate tenant outcomes from cross-tenant internal telemetry while preserving a shared decision language.",
    summary: "Esheria analytics link runtime reliability, policy posture, and adoption depth to revenue confidence.",
    highlights: ["Tenant-safe KPI exposure", "Cross-tenant internal intelligence", "Forecast-ready executive narratives"],
    modules: [
      { title: "Institution KPI Layer", body: "Turnaround, SLA, risk density, reviewer output, and escalation trends." },
      { title: "Operator Telemetry", body: "Latency, incidents, policy drift, and connector reliability insights." },
      { title: "Board Forecast Layer", body: "Risk-weighted ARR and confidence-index narratives for strategic planning." },
    ],
    primaryCta: { label: "Open Institution Analytics", href: "/artifacts/visuals/dashboards/html/institution-analytics.html" },
    secondaryCta: { label: "Open Portfolio Forecast", href: "/artifacts/visuals/dashboards/html/portfolio-forecast.html" },
  },
  {
    route: "pricing.html",
    title: "Enterprise Pricing With Outcome Alignment",
    kicker: "Pricing",
    subtitle: "Pricing scales with workflow depth, governance requirements, and intelligence needs.",
    summary: "Choose by operating maturity. Every plan includes workflow execution and evidence-grade traceability.",
    highlights: ["Transparent enterprise packaging", "Role-specific surface access", "Scale-up pathways for GTM expansion"],
    modules: [
      { title: "Foundation", body: "Core workflow execution for legal teams with tenant controls and export traces." },
      { title: "Growth", body: "Adds operator governance and advanced connector controls." },
      { title: "Strategic", body: "Adds executive command surfaces, forecasting, and board narrative instrumentation." },
    ],
    primaryCta: { label: "Request Board-Ready Proposal", href: "/documents" },
    secondaryCta: { label: "View Board Command Center", href: "/artifacts/visuals/dashboards/html/board-command-center.html" },
  },
  {
    route: "customers.html",
    title: "Customer Outcomes That Compound Over Time",
    kicker: "Customers",
    subtitle: "Teams start with contract velocity and expand into governance confidence and revenue intelligence.",
    summary: "The model improves legal cycle times first, then unlocks stronger renewal confidence and expansion readiness.",
    highlights: ["Faster time-to-value", "Lower churn risk through trust posture", "Board-ready proof from live operations"],
    modules: [
      { title: "Head of Legal", body: "Run predictable intake-to-signature execution without losing policy rigor." },
      { title: "Platform Leaders", body: "Operate multi-tenant environments with clear accountability." },
      { title: "CEO + Board", body: "Use operations-derived confidence signals for planning and growth allocation." },
    ],
    primaryCta: { label: "Open Executive Brief", href: "/executive" },
    secondaryCta: { label: "Review Delivery Roadmap", href: "/docs/architecture/implementation-roadmap.md" },
  },
  {
    route: "resources.html",
    title: "Resources for Technical and Commercial Review",
    kicker: "Resources",
    subtitle: "Everything stakeholders need to evaluate product fit and implementation readiness.",
    summary: "Resource center consolidates architecture docs, blueprint references, and visual artifacts.",
    highlights: ["Technical blueprint", "Implementation roadmap", "Cross-artifact consistency checks"],
    modules: [
      { title: "Architecture Notes", body: "System rationale, tradeoffs, and governance model definitions." },
      { title: "Visual Artifacts", body: "Diagrams and dashboards aligned with implementation reality." },
      { title: "Export Packages", body: "PDF, DOCX, and slide-ready outputs for stakeholder communication." },
    ],
    primaryCta: { label: "Open Full Artifact Portal", href: "/overview" },
    secondaryCta: { label: "Download Technical PDF", href: "/artifacts/exports/pdf/technical_blueprint.pdf" },
  },
  {
    route: "appendix.html",
    title: "Appendix and Source Intelligence",
    kicker: "Appendix",
    subtitle: "Reference model files, registries, and implementation sources for deep due diligence.",
    summary: "Use this page when reviewers need exact source references behind product and architecture claims.",
    highlights: ["Architecture model source", "Diagram registry metadata", "Implementation page source references"],
    modules: [
      { title: "Canonical Model", body: "Shared architecture model defining modules and dashboard semantics." },
      { title: "Registry and Metadata", body: "Diagram inventory with audience, objective, and dependencies." },
      { title: "Implementation Source", body: "Page-level sources used to render executive, blueprint, and explorer surfaces." },
    ],
    primaryCta: { label: "Open Source Appendix Viewer", href: "/appendix" },
    secondaryCta: { label: "Open Diagram Registry", href: "/src/architecture/diagramRegistry.js" },
  },
];

const evidenceByRoute = {
  "index.html": ["/artifacts/visuals/dashboards/html/institution-workspace.html", "/artifacts/visuals/dashboards/html/operator-console.html", "/artifacts/visuals/dashboards/html/board-command-center.html"],
  "product.html": ["/executive", "/blueprint", "/explorer"],
  "solutions.html": ["/artifacts/visuals/dashboards/html/workflow-monitoring.html", "/docs/architecture/implementation-roadmap.md"],
  "platform.html": ["/diagrams/exports/svg/control-vs-data-plane.svg", "/src/architecture/architectureModel.js"],
  "security.html": ["/docs/architecture/consistency-review.md", "/diagrams/exports/svg/auth-and-tenant-boundary.svg"],
  "integrations.html": ["/diagrams/exports/svg/service-integration-map.svg", "/diagrams/exports/svg/api-boundary-map.svg"],
  "analytics.html": ["/artifacts/visuals/dashboards/html/institution-analytics.html", "/artifacts/visuals/dashboards/html/portfolio-forecast.html"],
  "pricing.html": ["/artifacts/exports/pdf/executive_proposal.pdf", "/artifacts/exports/pdf/technical_blueprint.pdf"],
  "customers.html": ["/artifacts/visuals/dashboards/html/board-command-center.html", "/src/pages/ExecutivePage.jsx"],
  "resources.html": ["/docs/architecture/technical-blueprint.md", "/docs/architecture/implementation-roadmap.md", "/docs/architecture/consistency-review.md"],
  "appendix.html": ["/src/architecture/architectureModel.js", "/src/architecture/diagramRegistry.js", "/src/pages/ExplorerPage.jsx"],
};

const css = `
:root {
  color-scheme: dark;
  --bg: #09142a;
  --bg-glow-1: #11244a;
  --bg-glow-2: #0b3a3a;
  --surface: #101f3c;
  --surface-2: #14284d;
  --line: #284a78;
  --text: #e8f0ff;
  --muted: #9eb3d6;
  --accent: #50a4ff;
  --accent-2: #27c5bd;
  --chip-bg: #122747;
  --chip-border: #2e5688;
  --chip-text: #b8d6ff;
  --hero-a: #11284d;
  --hero-b: #10203d;
  --hero-c: #0f3030;
  --btn-secondary-bg: #132a4b;
  --btn-secondary-border: #3a679d;
  --btn-secondary-text: #b5d3ff;
  --panel-soft: #112341;
  --link-bg: #142a4a;
  --link-border: #355d8f;
  --link-text: #b3d0f9;
}
:root[data-theme="light"] {
  color-scheme: light;
  --bg: #f3f7ff;
  --bg-glow-1: #dbe8ff;
  --bg-glow-2: #d6fff7;
  --surface: #ffffff;
  --surface-2: #f1f7ff;
  --line: #d6e4f8;
  --text: #0f1f3b;
  --muted: #5e7498;
  --accent: #0d5bd8;
  --accent-2: #06a39f;
  --chip-bg: #f3f8ff;
  --chip-border: #c8daf5;
  --chip-text: #35557e;
  --hero-a: #ffffff;
  --hero-b: #f0f6ff;
  --hero-c: #ebfff8;
  --btn-secondary-bg: #eaf2ff;
  --btn-secondary-border: #a9c4ed;
  --btn-secondary-text: #0d5bd8;
  --panel-soft: #f7faff;
  --link-bg: #f3f8ff;
  --link-border: #c3d7f6;
  --link-text: #355987;
}
* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: "Sora", "IBM Plex Sans", "Segoe UI", sans-serif;
  color: var(--text);
  background:
    radial-gradient(circle at 10% 0%, var(--bg-glow-1) 0%, transparent 38%),
    radial-gradient(circle at 100% 0%, var(--bg-glow-2) 0%, transparent 33%),
    var(--bg);
}
.topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  background: color-mix(in srgb, var(--bg) 88%, transparent);
  backdrop-filter: blur(9px);
  border-bottom: 1px solid var(--line);
}
.topbar .inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 10px 22px;
  display: flex;
  gap: 10px;
  align-items: center;
}
.brand-logo { height: 28px; }
.topbar-nav {
  display: flex;
  gap: 6px;
  min-width: 0;
  flex: 1;
  overflow-x: auto;
}
.topbar-nav a {
  text-decoration: none;
  color: var(--muted);
  font-size: 12px;
  border: 1px solid transparent;
  border-radius: 999px;
  padding: 6px 10px;
  white-space: nowrap;
}
.topbar-nav a.active,
.topbar-nav a:hover {
  color: var(--text);
  border-color: var(--line);
  background: var(--surface-2);
}
.theme-toggle {
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 7px 11px;
  font-size: 12px;
  background: var(--surface);
  color: var(--muted);
  cursor: pointer;
}
.theme-toggle:hover {
  color: var(--text);
  border-color: var(--accent);
}
.top-cta {
  text-decoration: none;
  border-radius: 999px;
  border: 1px solid var(--line);
  padding: 7px 12px;
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  background: var(--surface-2);
}
main { max-width: 1280px; margin: 0 auto; padding: 30px 22px 44px; }
.hero {
  background: linear-gradient(128deg, var(--hero-a), var(--hero-b) 60%, var(--hero-c));
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 26px;
  box-shadow: 0 20px 55px color-mix(in srgb, var(--bg) 55%, transparent);
}
.hero-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 16px; }
.kicker {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 5px 11px;
  font-size: 10px;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 10%, var(--surface) 90%);
  font-weight: 700;
}
.kicker i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 12px color-mix(in srgb, var(--accent) 80%, transparent);
}
.hero h1 { margin: 12px 0 10px; font-size: clamp(30px, 4vw, 52px); line-height: 1.05; letter-spacing: -0.02em; }
.hero p { margin: 0 0 13px; color: var(--muted); font-size: 16px; line-height: 1.55; }
.hero-actions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 16px; }
.btn { text-decoration: none; border-radius: 10px; border: 1px solid transparent; padding: 10px 14px; font-size: 13px; font-weight: 600; }
.btn-primary { color: #fff; background: linear-gradient(110deg, var(--accent), color-mix(in srgb, var(--accent) 80%, #49b9ff)); }
.btn-secondary {
  color: var(--btn-secondary-text);
  background: var(--btn-secondary-bg);
  border-color: var(--btn-secondary-border);
}
.hero-highlights { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
.hero-highlights li {
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 10px 11px;
  font-size: 13px;
  color: var(--text);
  background: color-mix(in srgb, var(--surface) 78%, var(--surface-2) 22%);
}
.trust-strip { margin-top: 16px; display: flex; gap: 8px; flex-wrap: wrap; }
.trust-chip {
  border: 1px solid var(--chip-border);
  border-radius: 999px;
  padding: 6px 11px;
  font-size: 12px;
  color: var(--chip-text);
  background: var(--chip-bg);
}
.section-grid { margin-top: 20px; display: grid; grid-template-columns: 1.1fr 1fr; gap: 14px; }
.card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 15px;
}
.card h3 { margin: 0 0 11px; font-size: 15px; color: var(--accent); }
.module-grid { display: grid; gap: 10px; }
.module {
  border: 1px solid var(--line);
  border-radius: 11px;
  padding: 11px;
  background: var(--panel-soft);
}
.module b { display: block; font-size: 13px; color: var(--text); margin-bottom: 4px; }
.module span { font-size: 12px; color: var(--muted); line-height: 1.5; }
.surface-card {
  border: 1px solid var(--line);
  border-radius: 12px;
  background: linear-gradient(150deg, color-mix(in srgb, var(--surface) 85%, var(--surface-2) 15%), color-mix(in srgb, var(--surface-2) 85%, var(--surface) 15%));
  padding: 13px;
}
.surface-title { margin: 0 0 8px; font-size: 12px; color: var(--muted); letter-spacing: .08em; text-transform: uppercase; }
.role-tabs { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; margin-bottom: 10px; }
.role-btn {
  border: 1px solid var(--line);
  background: var(--surface);
  border-radius: 9px;
  padding: 8px 9px;
  text-align: left;
  font-size: 11px;
  color: var(--muted);
  cursor: pointer;
}
.role-btn.active,
.role-btn:hover { border-color: var(--accent); color: var(--text); background: var(--surface-2); }
.role-panel {
  display: none;
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 11px;
  background: var(--surface);
}
.role-panel.active { display: block; }
.role-panel b { display: block; font-size: 14px; margin-bottom: 4px; }
.role-panel em {
  display: block;
  font-size: 11px;
  color: var(--muted);
  margin-bottom: 6px;
  font-style: normal;
  text-transform: uppercase;
  letter-spacing: .06em;
}
.role-panel p { margin: 0 0 9px; font-size: 12px; color: var(--muted); line-height: 1.45; }
.role-link {
  text-decoration: none;
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 7px 10px;
  font-size: 12px;
  color: var(--accent);
  background: var(--surface-2);
  display: inline-block;
}
.evidence-strip {
  margin-top: 18px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--surface);
  padding: 12px;
}
.evidence-title { margin: 0 0 9px; font-size: 11px; text-transform: uppercase; letter-spacing: .08em; color: var(--muted); }
.evidence-links { display: flex; gap: 8px; flex-wrap: wrap; }
.evidence-link {
  text-decoration: none;
  border: 1px solid var(--link-border);
  border-radius: 999px;
  padding: 5px 10px;
  font-size: 12px;
  color: var(--link-text);
  background: var(--link-bg);
}
.pricing-toggle {
  margin-top: 14px;
  display: inline-flex;
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 3px;
  background: var(--surface-2);
}
.pricing-toggle button {
  border: 0;
  background: transparent;
  border-radius: 999px;
  padding: 6px 11px;
  font-size: 12px;
  color: var(--muted);
  cursor: pointer;
}
.pricing-toggle button.active { background: color-mix(in srgb, var(--accent) 16%, var(--surface) 84%); color: var(--text); }
.pricing-grid { margin-top: 14px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
.plan {
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 13px;
  background: var(--panel-soft);
}
.plan h4 { margin: 0 0 7px; font-size: 14px; color: var(--text); }
.plan .price { font-size: 24px; font-weight: 700; color: var(--accent); margin: 0 0 6px; }
.plan p { margin: 0; font-size: 12px; color: var(--muted); line-height: 1.45; }
.resource-list { margin: 0; padding: 0; list-style: none; display: grid; gap: 8px; }
.resource-list li {
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 10px;
  background: var(--panel-soft);
}
.resource-list b { display: block; font-size: 13px; color: var(--text); margin-bottom: 4px; }
.resource-list span { font-size: 12px; color: var(--muted); }
.feature-strip {
  margin-top: 18px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--surface);
  padding: 12px;
}
.feature-strip h3 {
  margin: 0 0 10px;
  color: var(--accent);
  font-size: 14px;
}
.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 9px;
}
.feature-card {
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--panel-soft);
  padding: 10px;
}
.feature-card b {
  display: block;
  color: var(--text);
  font-size: 12px;
  margin-bottom: 4px;
}
.feature-card span {
  color: var(--muted);
  font-size: 12px;
  line-height: 1.45;
}
.signal-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 8px;
}
.signal-list li {
  border: 1px solid var(--line);
  border-radius: 9px;
  padding: 8px;
  background: var(--panel-soft);
}
.signal-list li b {
  display: block;
  color: var(--text);
  font-size: 12px;
  margin-bottom: 3px;
}
.signal-list li span {
  color: var(--muted);
  font-size: 12px;
  line-height: 1.45;
}
.footer {
  margin-top: 26px;
  border-top: 1px solid var(--line);
  padding-top: 14px;
  display: flex;
  gap: 10px;
  align-items: center;
  color: var(--muted);
  font-size: 12px;
}
.footer-logo { height: 16px; }
@media (max-width: 1024px) {
  .hero-grid,
  .section-grid,
  .pricing-grid,
  .feature-grid { grid-template-columns: 1fr; }
}
@media (max-width: 760px) {
  .topbar .inner { padding: 10px 14px; }
  main { padding: 18px 14px 30px; }
  .hero { padding: 16px; }
  .top-cta { display: none; }
  .role-tabs { grid-template-columns: 1fr; }
}
`;

const hrefForRoute = (route, depth) => (depth === 0 ? (route === "index.html" ? "index.html" : `pages/${route}`) : (route === "index.html" ? "../index.html" : `../pages/${route}`));
const hrefForAsset = (href, depth) => (/^https?:\/\//i.test(href) || href.startsWith("/") ? href : depth === 0 ? href : `../${href}`);
const navLabelByRoute = Object.fromEntries(nav.map((item) => [item.href.split("/").pop(), item.label]));

const prettifyAssetLabel = (href = "") => {
  const base = href.split("/").filter(Boolean).pop() || href;
  const withoutExt = base.replace(/\.(html|md|svg|pdf|jsx|js)$/i, "");
  return withoutExt
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const navHtml = (route, depth, logoFileName) => {
  const logoHref = depth === 0 ? `assets/${logoFileName}` : `../assets/${logoFileName}`;
  const links = nav
    .map((item) => {
      const href = depth === 0 ? item.href.replace(/^\//, "") : `..${item.href}`;
      const active = (route === "index.html" && item.href === "/index.html") || (route !== "index.html" && item.href.endsWith(`/${route}`));
      return `<a class="${active ? "active" : ""}" href="${href}">${item.label}</a>`;
    })
    .join("");
  const pricingHref = depth === 0 ? "pages/pricing.html" : "../pages/pricing.html";
  const homeHref = depth === 0 ? "index.html" : "../index.html";
  return `<a class="brand-link" href="${homeHref}" aria-label="Esheria home"><img class="brand-logo" src="${logoHref}" alt="Esheria" /></a><nav class="topbar-nav">${links}</nav><button class="theme-toggle" data-theme-toggle type="button">Dark Mode</button><a class="top-cta" href="${pricingHref}">Book Demo</a>`;
};

const roleHtml = (depth) => {
  const tabs = roles.map((role, idx) => `<button class="role-btn ${idx === 0 ? "active" : ""}" data-role-btn="${role.id}" type="button">${role.label}</button>`).join("");
  const panels = roles.map((role, idx) => `<article class="role-panel ${idx === 0 ? "active" : ""}" data-role-panel="${role.id}"><b>${role.label}</b><em>${role.audience}</em><p>${role.summary}</p><a class="role-link" href="${hrefForAsset(role.href, depth)}">Open Live Surface</a></article>`).join("");
  return `<section class="surface-card" data-role-surface><h3 class="surface-title">Role-Based App Shell Entry</h3><div class="role-tabs">${tabs}</div>${panels}</section>`;
};

const pricingBlock = `
<section class="card">
  <h3>Commercial Packaging</h3>
  <div class="pricing-toggle" data-pricing-toggle>
    <button class="active" type="button" data-billing="monthly">Monthly</button>
    <button type="button" data-billing="annual">Annual</button>
  </div>
  <div class="pricing-grid">
    <article class="plan"><h4>Foundation</h4><div class="price" data-price data-monthly="$19k" data-annual="$16k">$19k</div><p>Workflow execution, tenant controls, and evidence-grade exports.</p></article>
    <article class="plan"><h4>Growth</h4><div class="price" data-price data-monthly="$34k" data-annual="$29k">$34k</div><p>Adds operator console, policy packs, and incident command workflows.</p></article>
    <article class="plan"><h4>Strategic</h4><div class="price" data-price data-monthly="$58k" data-annual="$49k">$58k</div><p>Adds board command center, forecasting, and strategic planning surfaces.</p></article>
  </div>
</section>`;

const trustRoutes = new Set(["index.html", "customers.html"]);
const roleRoutes = new Set(["index.html", "product.html"]);
const primarySectionTitleByRoute = {
  "index.html": "Core Experience Modules",
  "product.html": "Product Surfaces",
  "solutions.html": "Solution Tracks",
  "platform.html": "Platform Layers",
  "security.html": "Control Domains",
  "integrations.html": "Connector Capabilities",
  "analytics.html": "Analytics Packs",
  "pricing.html": "Package Principles",
  "customers.html": "Customer Outcome Tracks",
  "resources.html": "Resource Modules",
  "appendix.html": "Appendix Focus Areas",
};
const lensNoteByRoute = {
  "solutions.html": "Solution readiness signal used in deal and onboarding planning.",
  "platform.html": "Architecture confidence signal tied to implementation quality.",
  "security.html": "Governance signal used for enterprise trust reviews.",
  "integrations.html": "Integration resilience signal tracked in delivery operations.",
  "analytics.html": "Decision signal used in leadership planning loops.",
  "pricing.html": "Commercial signal used in packaging and procurement conversations.",
  "customers.html": "Outcome signal used in expansion and renewal narratives.",
  "resources.html": "Reference signal used by technical and commercial reviewers.",
  "appendix.html": "Source-verification signal used in due-diligence reviews.",
};
const evidenceNoteByRoute = {
  "solutions.html": "Evidence link to live solution-supporting artifacts.",
  "platform.html": "Evidence link to architecture source and system definition.",
  "security.html": "Evidence link to controls and boundary validation artifacts.",
  "integrations.html": "Evidence link to connector and API contract artifacts.",
  "analytics.html": "Evidence link to analytics surfaces and forecast outputs.",
  "pricing.html": "Evidence link to commercial and executive package artifacts.",
  "customers.html": "Evidence link to customer-impact and executive narrative artifacts.",
  "resources.html": "Evidence link to implementation and review documents.",
  "appendix.html": "Evidence link to source files and canonical model references.",
};

const sidePanelForPage = (page, depth) => {
  if (roleRoutes.has(page.route)) return roleHtml(depth);
  const lensNote = lensNoteByRoute[page.route] || "Page-level strategic signal for stakeholder review.";
  const evidenceNote = evidenceNoteByRoute[page.route] || "Evidence link for this page narrative.";
  const evidence = (evidenceByRoute[page.route] || [])
    .slice(0, 2)
    .map((href) => `<li><b>${prettifyAssetLabel(href)}</b><span>${evidenceNote}</span></li>`)
    .join("");
  const highlights = (page.highlights || [])
    .slice(0, 3)
    .map((item) => `<li><b>${item}</b><span>${lensNote}</span></li>`)
    .join("");
  return `<section class="surface-card"><h3 class="surface-title">Page-Specific Lens</h3><ul class="signal-list">${highlights}${evidence}</ul></section>`;
};

const featureBlockForPage = (page) => {
  if (!["solutions.html", "platform.html", "security.html", "analytics.html", "customers.html", "appendix.html"].includes(page.route)) {
    return "";
  }
  const cards = (page.modules || [])
    .slice(0, 3)
    .map((module) => `<article class="feature-card"><b>${module.title}</b><span>${module.body}</span></article>`)
    .join("");
  const titleByRoute = {
    "solutions.html": "Execution Playbooks",
    "platform.html": "Architecture Execution Anchors",
    "security.html": "Governance Guardrails",
    "analytics.html": "Decision Intelligence Loops",
    "customers.html": "Outcome Narrative Blocks",
    "appendix.html": "Source Validation Anchors",
  };
  return `<section class="feature-strip"><h3>${titleByRoute[page.route]}</h3><div class="feature-grid">${cards}</div></section>`;
};

const htmlForPage = (page, depth, logoFileName) => {
  const faviconHref = depth === 0 ? `assets/${logoFileName}` : `../assets/${logoFileName}`;
  const footerLogoHref = depth === 0 ? `assets/${logoFileName}` : `../assets/${logoFileName}`;
  const pageOrder = pages.map((p) => p.route);
  const idx = pageOrder.indexOf(page.route);
  const journey = [pageOrder[idx - 1], pageOrder[idx + 1], "pricing.html", "appendix.html"]
    .filter(Boolean)
    .filter((v, i, arr) => arr.indexOf(v) === i && v !== page.route);
  const journeyLinks = journey
    .map((route) => `<a class="evidence-link" href="${hrefForRoute(route, depth)}">${navLabelByRoute[route] || route.replace(".html", "")}</a>`)
    .join("");
  const highlights = page.highlights.map((item) => `<li>${item}</li>`).join("");
  const modules = page.modules.map((module) => `<article class="module"><b>${module.title}</b><span>${module.body}</span></article>`).join("");
  const trust = trustSignals.map((item) => `<span class="trust-chip">${item}</span>`).join("");
  const showTrust = trustRoutes.has(page.route);
  const primarySectionTitle = primarySectionTitleByRoute[page.route] || "Core Experience Modules";
  const sidePanel = sidePanelForPage(page, depth);
  const featureBlock = featureBlockForPage(page);
  const evidence = (evidenceByRoute[page.route] || [])
    .map((href) => `<a class="evidence-link" href="${hrefForAsset(href, depth)}">${prettifyAssetLabel(href)}</a>`)
    .join("");
  const resources = (evidenceByRoute[page.route] || [])
    .map((href) => `<li><b>${prettifyAssetLabel(href)}</b><span>Linked reference for technical and commercial validation.</span></li>`)
    .join("");
  const resourcesBlock = page.route === "resources.html" ? `<section class="card"><h3>Resource Index</h3><ul class="resource-list">${resources}</ul></section>` : "";
  const pricing = page.route === "pricing.html" ? pricingBlock : "";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${page.title} | Esheria</title>
  <link rel="icon" type="image/png" href="${faviconHref}" />
  <link rel="stylesheet" href="${depth === 0 ? "styles.css" : "../styles.css"}" />
</head>
<body>
  <header class="topbar"><div class="inner">${navHtml(page.route, depth, logoFileName)}</div></header>
  <main>
    <section class="hero">
      <div class="hero-grid">
        <div>
          <span class="kicker"><i></i>${page.kicker}</span>
          <h1>${page.title}</h1>
          <p>${page.subtitle}</p>
          <p>${page.summary}</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="${hrefForAsset(page.primaryCta.href, depth)}">${page.primaryCta.label}</a>
            <a class="btn btn-secondary" href="${hrefForAsset(page.secondaryCta.href, depth)}">${page.secondaryCta.label}</a>
          </div>
        </div>
        <aside>
          <h3 class="surface-title">Value Signals</h3>
          <ul class="hero-highlights">${highlights}</ul>
        </aside>
      </div>
      ${showTrust ? `<div class="trust-strip">${trust}</div>` : ""}
    </section>
    <section class="section-grid">
      <article class="card">
        <h3>${primarySectionTitle}</h3>
        <div class="module-grid">${modules}</div>
      </article>
      ${sidePanel}
    </section>
    ${pricing}
    ${resourcesBlock}
    ${featureBlock}
    <section class="evidence-strip">
      <h3 class="evidence-title">Evidence + Next Steps</h3>
      <div class="evidence-links">${evidence}${journeyLinks}</div>
    </section>
    <div class="footer"><img class="footer-logo" src="${footerLogoHref}" alt="Esheria" /><span>Esheria product website artifact &middot; marketing narrative + app-shell launch surfaces</span></div>
  </main>
  <script>
  (() => {
    const THEME_KEY = "${THEME_STORAGE_KEY}";
    const root = document.documentElement;
    const themeToggle = document.querySelector("[data-theme-toggle]");
    const resolveTheme = () => {
      try {
        const stored = window.localStorage.getItem(THEME_KEY);
        if (stored === "dark" || stored === "light") return stored;
      } catch {}
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    };
    const applyTheme = (theme) => {
      root.dataset.theme = theme;
      if (!themeToggle) return;
      themeToggle.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
      themeToggle.setAttribute("aria-label", "Switch to " + (theme === "dark" ? "light" : "dark") + " theme");
    };
    let theme = resolveTheme();
    applyTheme(theme);
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        theme = theme === "dark" ? "light" : "dark";
        applyTheme(theme);
        try {
          window.localStorage.setItem(THEME_KEY, theme);
        } catch {}
      });
    }

    const roleSurface = document.querySelector("[data-role-surface]");
    if (roleSurface) {
      const roleButtons = Array.from(roleSurface.querySelectorAll("[data-role-btn]"));
      const rolePanels = Array.from(roleSurface.querySelectorAll("[data-role-panel]"));
      const setRole = (roleId) => {
        roleButtons.forEach((button) => button.classList.toggle("active", button.dataset.roleBtn === roleId));
        rolePanels.forEach((panel) => panel.classList.toggle("active", panel.dataset.rolePanel === roleId));
      };
      roleButtons.forEach((button) => button.addEventListener("click", () => setRole(button.dataset.roleBtn || "")));
    }

    const pricingToggle = document.querySelector("[data-pricing-toggle]");
    if (pricingToggle) {
      const billingButtons = Array.from(pricingToggle.querySelectorAll("[data-billing]"));
      const priceNodes = Array.from(document.querySelectorAll("[data-price]"));
      const setBilling = (mode) => {
        billingButtons.forEach((button) => button.classList.toggle("active", button.dataset.billing === mode));
        priceNodes.forEach((node) => {
          const value = mode === "annual" ? node.getAttribute("data-annual") : node.getAttribute("data-monthly");
          if (value) node.textContent = value;
        });
      };
      billingButtons.forEach((button) => button.addEventListener("click", () => setBilling(button.dataset.billing || "monthly")));
      setBilling("monthly");
    }
  })();
  </script>
</body>
</html>`;
};

export async function buildMarketingWebsite({ websiteRoot, websitePagesRoot, logoFileName }) {
  await write(path.join(websiteRoot, "styles.css"), css);
  for (const page of pages) {
    const dest = page.route === "index.html" ? path.join(websiteRoot, "index.html") : path.join(websitePagesRoot, page.route);
    await write(dest, htmlForPage(page, page.route === "index.html" ? 0 : 1, logoFileName));
  }
  const staleRoutes = ["thesis.html", "current-system.html", "platform-architecture.html", "workflow.html", "dashboards.html", "deployment.html", "roadmap.html"];
  for (const stale of staleRoutes) {
    try {
      await fs.unlink(path.join(websitePagesRoot, stale));
    } catch {
      // no-op if file does not exist
    }
  }
}
