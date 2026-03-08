import { useState } from "react";

const colors = {
  bg: "#0A0D14",
  surface: "#111520",
  surface2: "#161B2E",
  border: "#1E2640",
  accent: "#00E5C0",
  accent2: "#5B6EF5",
  accent3: "#F5A623",
  accent4: "#E85D75",
  text: "#E8EDF5",
  muted: "#6B7A99",
  gold: "#C9A84C",
};

const style = {
  page: {
    background: colors.bg,
    color: colors.text,
    fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
    minHeight: "100vh",
    padding: "0",
  },
  header: {
    background: `linear-gradient(135deg, #0A0D14 0%, #0E1A2E 50%, #0A1628 100%)`,
    borderBottom: `1px solid ${colors.border}`,
    padding: "48px 48px 40px",
    position: "relative",
    overflow: "hidden",
  },
  tag: {
    background: `${colors.accent}18`,
    border: `1px solid ${colors.accent}40`,
    color: colors.accent,
    fontSize: "10px",
    letterSpacing: "3px",
    padding: "4px 12px",
    display: "inline-block",
    marginBottom: "16px",
    textTransform: "uppercase",
  },
  h1: {
    fontSize: "clamp(28px, 4vw, 52px)",
    fontWeight: "700",
    lineHeight: 1.1,
    marginBottom: "12px",
    background: `linear-gradient(135deg, ${colors.text} 0%, ${colors.accent} 100%)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "-1px",
  },
  subtitle: {
    color: colors.muted,
    fontSize: "14px",
    letterSpacing: "1px",
    marginBottom: "32px",
  },
  nav: {
    display: "flex",
    gap: "4px",
    flexWrap: "wrap",
    borderBottom: `1px solid ${colors.border}`,
    padding: "0 48px",
    background: colors.surface,
  },
  navBtn: (active) => ({
    padding: "14px 20px",
    background: "none",
    border: "none",
    borderBottom: active ? `2px solid ${colors.accent}` : "2px solid transparent",
    color: active ? colors.accent : colors.muted,
    cursor: "pointer",
    fontSize: "11px",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    transition: "all 0.2s",
    fontFamily: "inherit",
  }),
  content: {
    padding: "40px 48px",
    maxWidth: "1400px",
  },
  sectionTitle: {
    fontSize: "11px",
    letterSpacing: "4px",
    color: colors.accent,
    textTransform: "uppercase",
    marginBottom: "8px",
  },
  h2: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "32px",
    color: colors.text,
  },
  card: (accent) => ({
    background: colors.surface,
    border: `1px solid ${accent || colors.border}30`,
    borderLeft: `3px solid ${accent || colors.border}`,
    borderRadius: "4px",
    padding: "20px 24px",
    marginBottom: "16px",
  }),
  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "16px",
    marginBottom: "32px",
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "16px",
    marginBottom: "32px",
  },
  badge: (color) => ({
    display: "inline-block",
    background: `${color}20`,
    border: `1px solid ${color}50`,
    color: color,
    fontSize: "10px",
    padding: "2px 8px",
    borderRadius: "2px",
    letterSpacing: "1px",
    marginRight: "6px",
    marginBottom: "4px",
  }),
};

const tabs = [
  "Overview",
  "Architecture Layers",
  "System Modules",
  "API Structure",
  "Data Model",
  "Workflows",
  "Dashboards",
  "Integrations",
  "Roadmap",
];

// ─────────────────────────────────────────────
// OVERVIEW TAB
// ─────────────────────────────────────────────
function Overview() {
  return (
    <div style={style.content}>
      <div style={style.sectionTitle}>System Overview</div>
      <h2 style={style.h2}>Platform Architecture at a Glance</h2>

      {/* Platform positioning */}
      <div style={{ marginBottom: "40px" }}>
        <div
          style={{
            background: `linear-gradient(135deg, ${colors.surface2}, ${colors.surface})`,
            border: `1px solid ${colors.border}`,
            borderRadius: "8px",
            padding: "32px",
            textAlign: "center",
            marginBottom: "32px",
            position: "relative",
          }}
        >
          <div style={{ fontSize: "11px", letterSpacing: "3px", color: colors.muted, marginBottom: "12px" }}>
            THE SHIFT
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "32px", flexWrap: "wrap" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "13px", color: colors.muted, marginBottom: "12px" }}>FROM</div>
              {["Legal AI Chat", "OCR Service", "Contract Engine", "Drafting Tool", "Analytics"].map((f) => (
                <div
                  key={f}
                  style={{
                    background: colors.bg,
                    border: `1px solid ${colors.border}`,
                    padding: "8px 16px",
                    marginBottom: "8px",
                    fontSize: "12px",
                    color: colors.muted,
                  }}
                >
                  {f}
                </div>
              ))}
            </div>
            <div style={{ fontSize: "40px", color: colors.accent }}>→</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "13px", color: colors.accent, marginBottom: "12px" }}>TO</div>
              <div
                style={{
                  background: `${colors.accent}10`,
                  border: `2px solid ${colors.accent}`,
                  padding: "24px 32px",
                  fontSize: "16px",
                  color: colors.accent,
                  letterSpacing: "1px",
                  fontWeight: "700",
                }}
              >
                LEGAL WORKFLOW
                <br />
                OPERATING SYSTEM
              </div>
              <div style={{ fontSize: "11px", color: colors.muted, marginTop: "8px" }}>
                Programmable Legal Operations Platform
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Layer overview */}
      <div style={style.sectionTitle}>Platform Layers</div>
      <div style={{ marginBottom: "20px", color: colors.muted, fontSize: "12px" }}>
        4 major layers that transform isolated capabilities into enterprise-grade platform infrastructure
      </div>

      {[
        {
          num: "01",
          title: "Customer-Facing Workflow Products",
          desc: "What institutions use — contract portals, review workspaces, compliance dashboards, legal operations assistants, and analytics",
          color: colors.accent,
          items: ["Institution Workspace", "Legal Review Portal", "Compliance Dashboard", "Document Submission", "Analytics Suite"],
        },
        {
          num: "02",
          title: "Shared Platform Backend",
          desc: "The real engine — multi-tenant core handling auth, workflow state, document management, audit trails, and orchestration",
          color: colors.accent2,
          items: ["Tenant Management", "Workflow Engine", "Auth & Permissions", "Audit Service", "API Gateway"],
        },
        {
          num: "03",
          title: "Capability Services",
          desc: "Existing Esheria strengths become plugged-in services consumed by the platform — not isolated product worlds",
          color: colors.accent3,
          items: ["OCR Service", "Contract Engine", "Drafting Engine", "Legal Research", "Analytics Pipeline"],
        },
        {
          num: "04",
          title: "Internal Esheria Control Plane",
          desc: "For Esheria operators — tenant provisioning, workflow monitoring, service health, support console, billing and usage",
          color: colors.accent4,
          items: ["Tenant Admin", "Workflow Ops", "Service Health", "Support Console", "Usage & Billing"],
        },
      ].map((layer) => (
        <div
          key={layer.num}
          style={{
            background: colors.surface,
            border: `1px solid ${colors.border}`,
            borderLeft: `4px solid ${layer.color}`,
            borderRadius: "4px",
            padding: "24px",
            marginBottom: "12px",
            display: "flex",
            gap: "24px",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <div style={{ fontSize: "32px", fontWeight: "700", color: layer.color, opacity: 0.4, minWidth: "48px" }}>
            {layer.num}
          </div>
          <div style={{ flex: 1, minWidth: "200px" }}>
            <div style={{ fontSize: "16px", fontWeight: "700", color: layer.color, marginBottom: "6px" }}>
              {layer.title}
            </div>
            <div style={{ fontSize: "12px", color: colors.muted, marginBottom: "12px", lineHeight: 1.6 }}>
              {layer.desc}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {layer.items.map((i) => (
                <span key={i} style={style.badge(layer.color)}>
                  {i}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Analytics Split */}
      <div style={{ marginTop: "40px" }}>
        <div style={style.sectionTitle}>Analytics Split — Two Worlds</div>
        <div style={style.grid2}>
          {[
            {
              title: "Esheria Internal Analytics",
              color: colors.accent2,
              items: [
                "CRM + Customer Success",
                "System usage & ops monitoring",
                "Service health dashboards",
                "Billing & revenue tracking",
                "Internal performance KPIs",
                "Support ticket analytics",
              ],
            },
            {
              title: "Institution Analytics",
              color: colors.accent,
              items: [
                "Document volumes & throughput",
                "Review turnaround times",
                "Approval bottlenecks",
                "Common risk categories",
                "Compliance failure patterns",
                "Workflow SLA breaches",
                "Department performance",
                "Trend analysis by matter type",
              ],
            },
          ].map((a) => (
            <div
              key={a.title}
              style={{
                ...style.card(a.color),
                background: `${a.color}08`,
              }}
            >
              <div style={{ fontSize: "14px", fontWeight: "700", color: a.color, marginBottom: "16px" }}>
                {a.title}
              </div>
              {a.items.map((i) => (
                <div
                  key={i}
                  style={{
                    fontSize: "12px",
                    color: colors.muted,
                    padding: "6px 0",
                    borderBottom: `1px solid ${colors.border}`,
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                  }}
                >
                  <span style={{ color: a.color }}>▸</span> {i}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ARCHITECTURE LAYERS TAB
// ─────────────────────────────────────────────
function ArchitectureLayers() {
  return (
    <div style={style.content}>
      <div style={style.sectionTitle}>Technical Architecture</div>
      <h2 style={style.h2}>System Layer Diagram</h2>

      {/* Layered diagram */}
      <div style={{ marginBottom: "40px" }}>
        {[
          {
            label: "LAYER 5 — EXPERIENCE",
            sublabel: "Frontend surfaces for customers and operators",
            color: colors.accent,
            boxes: ["Institution Workspace", "Operator Admin Console", "Public/Sales Surface", "Embedded Widgets"],
          },
          {
            label: "LAYER 4 — WORKFLOW CONTROL PLANE",
            sublabel: "Workflow definitions, state machines, routing, approvals, audit",
            color: colors.accent2,
            boxes: ["Workflow Engine", "State Machine Runtime", "Approval Router", "Escalation Manager", "Audit Log"],
          },
          {
            label: "LAYER 3 — ONTOLOGY / OBJECT MODEL",
            sublabel: "Shared canonical legal business objects",
            color: "#A78BFA",
            boxes: ["Organization", "Matter", "Document", "Clause", "Risk", "Review", "WorkflowRun", "Action", "Citation"],
          },
          {
            label: "LAYER 2 — CAPABILITY CONNECTORS",
            sublabel: "Stable internal API gateway to all services",
            color: colors.accent3,
            boxes: ["OCR Connector", "Contract Engine Connector", "Drafting Connector", "Research Connector", "Analytics Connector"],
          },
          {
            label: "LAYER 1 — EXISTING SERVICES",
            sublabel: "Current Esheria repos — plugged in, not replaced",
            color: colors.muted,
            boxes: ["esheria-ocr", "esheria-contract-engine", "esheria-ai", "lexdraft", "esheria-analytics", "lexchat-plugin"],
          },
        ].map((layer, idx) => (
          <div
            key={idx}
            style={{
              border: `1px solid ${layer.color}40`,
              borderRadius: "6px",
              marginBottom: "8px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                background: `${layer.color}15`,
                borderBottom: `1px solid ${layer.color}30`,
                padding: "12px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <span style={{ fontSize: "11px", fontWeight: "700", color: layer.color, letterSpacing: "2px" }}>
                {layer.label}
              </span>
              <span style={{ fontSize: "11px", color: colors.muted }}>{layer.sublabel}</span>
            </div>
            <div
              style={{
                padding: "16px 20px",
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                background: colors.surface,
              }}
            >
              {layer.boxes.map((b) => (
                <div
                  key={b}
                  style={{
                    background: colors.bg,
                    border: `1px solid ${layer.color}30`,
                    color: colors.text,
                    fontSize: "11px",
                    padding: "8px 14px",
                    borderRadius: "3px",
                  }}
                >
                  {b}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Backend architecture */}
      <div style={style.sectionTitle}>Backend Architecture</div>
      <div style={style.grid2}>
        {[
          {
            title: "Core Platform Backend",
            color: colors.accent2,
            desc: "The stable platform spine",
            items: ["Tenancy & multi-org management", "Auth & role-based access", "Workflow state & orchestration", "Audit & event log", "API gateway layer", "Task routing & notifications", "Connector orchestration"],
          },
          {
            title: "Service Connectors",
            color: colors.accent3,
            desc: "Thin adapter modules for each service",
            items: ["OCR service adapter", "Contract engine adapter", "Drafting service adapter", "Research/retrieval adapter", "Notification connector", "External CRM/DMS adapters", "Email & storage connectors"],
          },
          {
            title: "Event Bus / Queue",
            color: colors.accent,
            desc: "Async orchestration backbone",
            items: ["Async OCR processing", "Long-running review jobs", "Workflow step transitions", "Retry logic", "Analytics ingestion", "Alert propagation"],
          },
          {
            title: "Data Stores",
            color: "#A78BFA",
            desc: "Purpose-built storage per concern",
            items: ["Transactional DB (orgs, users, workflows)", "Search/retrieval layer (clauses, citations)", "Event/analytics store (metrics, reporting)", "Object storage (files, exports, attachments)"],
          },
        ].map((b) => (
          <div key={b.title} style={style.card(b.color)}>
            <div style={{ fontSize: "13px", fontWeight: "700", color: b.color, marginBottom: "4px" }}>{b.title}</div>
            <div style={{ fontSize: "11px", color: colors.muted, marginBottom: "12px" }}>{b.desc}</div>
            {b.items.map((i) => (
              <div key={i} style={{ fontSize: "11px", color: colors.text, padding: "4px 0", borderBottom: `1px solid ${colors.border}`, display: "flex", gap: "8px" }}>
                <span style={{ color: b.color }}>·</span> {i}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SYSTEM MODULES TAB
// ─────────────────────────────────────────────
function SystemModules() {
  const [selected, setSelected] = useState("customer");
  return (
    <div style={style.content}>
      <div style={style.sectionTitle}>Module Breakdown</div>
      <h2 style={style.h2}>All Platform Modules</h2>

      <div style={{ display: "flex", gap: "8px", marginBottom: "32px", flexWrap: "wrap" }}>
        {[
          { key: "customer", label: "Customer Modules", color: colors.accent },
          { key: "internal", label: "Internal Esheria Modules", color: colors.accent4 },
          { key: "backend", label: "Shared Backend Modules", color: colors.accent2 },
          { key: "agents", label: "Agent Operators", color: colors.accent3 },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setSelected(t.key)}
            style={{
              padding: "10px 20px",
              background: selected === t.key ? `${t.color}20` : "transparent",
              border: `1px solid ${selected === t.key ? t.color : colors.border}`,
              color: selected === t.key ? t.color : colors.muted,
              cursor: "pointer",
              fontSize: "11px",
              letterSpacing: "1px",
              fontFamily: "inherit",
              borderRadius: "3px",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {selected === "customer" && (
        <div style={style.grid3}>
          {[
            { title: "Home Dashboard", icon: "◉", desc: "Overview of active matters, pending tasks, recent activity, risk summary", features: ["Matter status overview", "Task queue", "Recent documents", "Risk alerts"] },
            { title: "Matters Module", icon: "⊞", desc: "Case and process management — create, track and manage all legal matters", features: ["Matter creation", "Status tracking", "Team assignment", "Timeline view"] },
            { title: "Documents Module", icon: "⊟", desc: "Upload, classify, and manage all legal documents with OCR and extraction", features: ["Drag & drop upload", "OCR status", "Version history", "Classification tags"] },
            { title: "Reviews Module", icon: "◈", desc: "Human review workspace for AI-generated findings and recommendations", features: ["Finding review", "Accept/reject/escalate", "Annotation tools", "Evidence sidebar"] },
            { title: "Drafting Module", icon: "✎", desc: "AI-assisted contract drafting with redlines, suggestions, and templates", features: ["Template library", "AI suggestions", "Redline comparison", "Clause insertion"] },
            { title: "Compliance Module", icon: "⊛", desc: "Policy and regulatory compliance checking across all documents", features: ["Policy rule sets", "Deviation alerts", "Regulation mapping", "Remediation suggestions"] },
            { title: "Tasks & Approvals", icon: "✓", desc: "Task routing, approval workflows, and escalation management", features: ["Task assignment", "Approval chains", "SLA tracking", "Escalation alerts"] },
            { title: "Analytics Module", icon: "∿", desc: "Institution-level operational intelligence and reporting", features: ["Throughput charts", "Risk trend analysis", "SLA performance", "Department views"] },
            { title: "Integrations Module", icon: "⊕", desc: "Connect to external systems — DMS, CRM, email, ERPs", features: ["Integration catalog", "Auth management", "Sync status", "Webhook config"] },
            { title: "Settings & Users", icon: "⊙", desc: "Organization configuration, user management, roles and permissions", features: ["User management", "Role definition", "Org policies", "Billing info"] },
          ].map((m) => (
            <div key={m.title} style={{ ...style.card(colors.accent), background: `${colors.accent}05` }}>
              <div style={{ fontSize: "20px", marginBottom: "8px" }}>{m.icon}</div>
              <div style={{ fontSize: "13px", fontWeight: "700", color: colors.accent, marginBottom: "6px" }}>{m.title}</div>
              <div style={{ fontSize: "11px", color: colors.muted, marginBottom: "12px", lineHeight: 1.5 }}>{m.desc}</div>
              {m.features.map((f) => (
                <div key={f} style={{ fontSize: "10px", color: colors.text, padding: "3px 0", borderTop: `1px solid ${colors.border}` }}>
                  ▸ {f}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {selected === "internal" && (
        <div style={style.grid3}>
          {[
            { title: "Tenant Admin", icon: "⊞", desc: "Create, provision, configure and manage all customer organizations", features: ["Org creation", "Plan assignment", "Workspace provisioning", "Suspend/activate"] },
            { title: "Workflow Ops", icon: "◈", desc: "Monitor all active workflows across tenants — catch failures, stuck approvals", features: ["Active run monitor", "Failed run inspector", "Stuck approval alerts", "SLA breach view"] },
            { title: "Service Health", icon: "∿", desc: "Real-time health of all capability services — OCR, contract engine, drafting", features: ["Service uptime", "Latency metrics", "Error rates", "Queue depths"] },
            { title: "Incident Center", icon: "⚠", desc: "Escalated issues, errors, and production incidents across the platform", features: ["Incident timeline", "Impact scope", "Resolution tracking", "Post-mortems"] },
            { title: "Support Console", icon: "◉", desc: "Customer support tools with impersonation, log access and interventions", features: ["Impersonation (audited)", "Retry failed jobs", "Log export", "Evidence chain inspect"] },
            { title: "Usage & Billing", icon: "⊕", desc: "Per-tenant usage tracking, plan monitoring, and billing reconciliation", features: ["Document volumes", "API call counts", "Feature usage", "Billing export"] },
            { title: "Global Analytics", icon: "⊛", desc: "Cross-tenant aggregated analytics — platform performance and growth", features: ["Platform throughput", "Growth trends", "Feature adoption", "Churn signals"] },
            { title: "Policy & Governance", icon: "⊙", desc: "Platform-wide policy enforcement, model controls, and compliance settings", features: ["Data retention rules", "Model/provider config", "Audit policy config", "Integration governance"] },
          ].map((m) => (
            <div key={m.title} style={{ ...style.card(colors.accent4), background: `${colors.accent4}05` }}>
              <div style={{ fontSize: "20px", marginBottom: "8px" }}>{m.icon}</div>
              <div style={{ fontSize: "13px", fontWeight: "700", color: colors.accent4, marginBottom: "6px" }}>{m.title}</div>
              <div style={{ fontSize: "11px", color: colors.muted, marginBottom: "12px", lineHeight: 1.5 }}>{m.desc}</div>
              {m.features.map((f) => (
                <div key={f} style={{ fontSize: "10px", color: colors.text, padding: "3px 0", borderTop: `1px solid ${colors.border}` }}>
                  ▸ {f}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {selected === "backend" && (
        <div style={style.grid3}>
          {[
            { title: "Auth & Identity", color: colors.accent2, desc: "JWT-based auth, multi-tenant isolation, SSO support", features: ["Login/logout", "Token refresh", "SSO/SAML", "Invitation flow"] },
            { title: "Tenant Management", color: colors.accent2, desc: "Org lifecycle, workspace creation, data isolation", features: ["Org CRUD", "Workspace config", "Data boundary enforcement"] },
            { title: "Workflow Engine", color: colors.accent2, desc: "State machines, step execution, transition rules", features: ["Template management", "Run lifecycle", "Step execution", "State persistence"] },
            { title: "Document Service", color: colors.accent2, desc: "Document storage, versioning, metadata, extraction jobs", features: ["File ingestion", "Version control", "Metadata indexing", "OCR orchestration"] },
            { title: "Review Service", color: colors.accent2, desc: "Human-in-loop review coordination and findings management", features: ["Review assignment", "Finding management", "Decision recording", "Comment threads"] },
            { title: "Audit Service", color: colors.accent2, desc: "Immutable log of all platform actions with full context", features: ["Event capture", "Actor tracking", "Immutable storage", "Export/reporting"] },
            { title: "Notification Service", color: colors.accent2, desc: "In-app, email and webhook notifications for events", features: ["Event subscriptions", "Email dispatch", "Webhook delivery", "Preference management"] },
            { title: "Connector Gateway", color: colors.accent2, desc: "Internal API gateway to all capability services", features: ["Request routing", "Auth normalization", "Rate limiting", "Service failover"] },
            { title: "Analytics Event Service", color: colors.accent2, desc: "Event ingestion pipeline feeding institution analytics", features: ["Event streaming", "Metric aggregation", "Dashboard data API"] },
          ].map((m) => (
            <div key={m.title} style={{ ...style.card(m.color), background: `${m.color}05` }}>
              <div style={{ fontSize: "13px", fontWeight: "700", color: m.color, marginBottom: "6px" }}>{m.title}</div>
              <div style={{ fontSize: "11px", color: colors.muted, marginBottom: "12px", lineHeight: 1.5 }}>{m.desc}</div>
              {m.features.map((f) => (
                <div key={f} style={{ fontSize: "10px", color: colors.text, padding: "3px 0", borderTop: `1px solid ${colors.border}` }}>
                  ▸ {f}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {selected === "agents" && (
        <div style={style.grid3}>
          {[
            { title: "Ingestion Operator", color: colors.accent, icon: "↓", desc: "First-stage agent — accepts uploaded material, triggers OCR, validates structure", actions: ["Accept upload", "Trigger OCR", "Validate completeness", "Classify document type"] },
            { title: "Extraction Operator", color: colors.accent, icon: "◈", desc: "Parses document content into structured legal objects", actions: ["Identify parties", "Extract clauses", "Detect obligations", "Attach metadata"] },
            { title: "Research Operator", color: colors.accent2, icon: "⊕", desc: "Retrieves statutes, precedents, authorities, and internal knowledge", actions: ["Search legal sources", "Retrieve precedents", "Link citations", "Rank relevance"] },
            { title: "Compliance Operator", color: colors.accent3, icon: "⊛", desc: "Checks content against rules, policies, and regulations", actions: ["Apply policy rules", "Check regulations", "Flag deviations", "Score risk"] },
            { title: "Drafting Operator", color: "#A78BFA", icon: "✎", desc: "Generates proposed wording, redlines, and draft sections", actions: ["Generate fallback language", "Create redlines", "Draft clauses", "Negotiation support"] },
            { title: "Review Operator", color: colors.accent4, icon: "◉", desc: "Summarizes findings, scores severity, prepares reviewer briefing", actions: ["Summarize findings", "Score severity", "Propose next action", "Prepare briefing doc"] },
            { title: "Routing Operator", color: colors.gold, icon: "→", desc: "Routes work to the right human role, triggers SLA alerts", actions: ["Assign to reviewer", "Set SLA timer", "Escalate unresolved risk", "Notify stakeholders"] },
            { title: "Analytics Operator", color: colors.muted, icon: "∿", desc: "Measures throughput, identifies bottlenecks, powers dashboards", actions: ["Emit events", "Track metrics", "Detect anomalies", "Feed dashboards"] },
          ].map((a) => (
            <div key={a.title} style={{ ...style.card(a.color), background: `${a.color}05` }}>
              <div style={{ fontSize: "24px", marginBottom: "8px", color: a.color }}>{a.icon}</div>
              <div style={{ fontSize: "13px", fontWeight: "700", color: a.color, marginBottom: "6px" }}>{a.title}</div>
              <div style={{ fontSize: "11px", color: colors.muted, marginBottom: "12px", lineHeight: 1.5 }}>{a.desc}</div>
              <div style={{ fontSize: "10px", color: colors.muted, letterSpacing: "2px", marginBottom: "8px" }}>ACTIONS</div>
              {a.actions.map((f) => (
                <div key={f} style={{ fontSize: "10px", color: colors.text, padding: "3px 0", borderTop: `1px solid ${colors.border}` }}>
                  ▸ {f}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// API STRUCTURE TAB
// ─────────────────────────────────────────────
function ApiStructure() {
  const [group, setGroup] = useState("external");
  const external = [
    { path: "/api/auth/*", methods: ["POST /auth/login", "POST /auth/logout", "POST /auth/invite", "POST /auth/refresh", "GET /me"], color: colors.accent },
    { path: "/api/orgs/*", methods: ["POST /orgs", "GET /orgs/:id", "PATCH /orgs/:id", "POST /orgs/:id/users", "GET /orgs/:id/users", "PATCH /users/:id/roles"], color: colors.accent },
    { path: "/api/matters/*", methods: ["POST /matters", "GET /matters", "GET /matters/:id", "PATCH /matters/:id", "DELETE /matters/:id", "GET /matters/:id/documents"], color: colors.accent2 },
    { path: "/api/documents/*", methods: ["POST /documents/upload", "GET /documents/:id", "POST /documents/:id/ocr", "POST /documents/:id/extract", "GET /documents/:id/clauses", "GET /documents/:id/risks", "GET /documents/:id/citations"], color: colors.accent2 },
    { path: "/api/workflows/*", methods: ["GET /workflow-templates", "POST /workflow-runs", "GET /workflow-runs/:id", "POST /workflow-runs/:id/actions", "POST /workflow-runs/:id/approve", "POST /workflow-runs/:id/escalate"], color: "#A78BFA" },
    { path: "/api/reviews/*", methods: ["GET /reviews", "GET /reviews/:id", "POST /reviews/:id/decision", "POST /reviews/:id/comment", "GET /reviews/:id/findings"], color: "#A78BFA" },
    { path: "/api/tasks/*", methods: ["GET /tasks", "GET /tasks/:id", "PATCH /tasks/:id", "POST /tasks/:id/assign", "POST /tasks/:id/complete"], color: colors.accent3 },
    { path: "/api/analytics/*", methods: ["GET /analytics/overview", "GET /analytics/throughput", "GET /analytics/risks", "GET /analytics/sla", "GET /analytics/trends"], color: colors.accent3 },
    { path: "/api/integrations/*", methods: ["GET /integrations", "POST /integrations/:type/connect", "DELETE /integrations/:id", "GET /integrations/:id/status"], color: colors.accent4 },
  ];
  const internal = [
    { path: "/internal/ocr/*", methods: ["POST /internal/ocr/process", "GET /internal/ocr/jobs/:id", "GET /internal/ocr/status/:id"], color: colors.muted },
    { path: "/internal/contracts/*", methods: ["POST /internal/contracts/review", "POST /internal/contracts/analyze-clauses", "POST /internal/contracts/check-compliance"], color: colors.muted },
    { path: "/internal/drafting/*", methods: ["POST /internal/drafting/generate", "POST /internal/drafting/redline", "POST /internal/drafting/suggest-clause"], color: colors.muted },
    { path: "/internal/research/*", methods: ["POST /internal/research/query", "GET /internal/research/citations/:id", "POST /internal/research/precedents"], color: colors.muted },
    { path: "/internal/analytics/*", methods: ["POST /internal/analytics/events", "GET /internal/analytics/metrics", "POST /internal/analytics/aggregate"], color: colors.muted },
  ];
  const data = group === "external" ? external : internal;
  return (
    <div style={style.content}>
      <div style={style.sectionTitle}>API Design</div>
      <h2 style={style.h2}>API Structure & Endpoints</h2>
      <div style={{ display: "flex", gap: "8px", marginBottom: "32px" }}>
        {[{ key: "external", label: "External Platform APIs" }, { key: "internal", label: "Internal Service APIs" }].map((t) => (
          <button key={t.key} onClick={() => setGroup(t.key)} style={{ padding: "10px 20px", background: group === t.key ? `${colors.accent}20` : "transparent", border: `1px solid ${group === t.key ? colors.accent : colors.border}`, color: group === t.key ? colors.accent : colors.muted, cursor: "pointer", fontSize: "11px", letterSpacing: "1px", fontFamily: "inherit", borderRadius: "3px" }}>
            {t.label}
          </button>
        ))}
      </div>
      {group === "internal" && (
        <div style={{ ...style.card(colors.accent3), marginBottom: "24px", background: `${colors.accent3}10` }}>
          <div style={{ fontSize: "12px", color: colors.accent3 }}>
            ⚡ Internal APIs are shielded from frontends — they are called only by the Connector Gateway. This means: service auth is internal, versioning is decoupled, and services can be swapped without breaking frontend contracts.
          </div>
        </div>
      )}
      {data.map((grp) => (
        <div key={grp.path} style={{ marginBottom: "16px" }}>
          <div style={{ background: `${grp.color}15`, border: `1px solid ${grp.color}30`, borderRadius: "4px 4px 0 0", padding: "10px 16px", fontSize: "13px", fontWeight: "700", color: grp.color, letterSpacing: "1px" }}>
            {grp.path}
          </div>
          <div style={{ background: colors.surface, border: `1px solid ${grp.color}20`, borderTop: "none", borderRadius: "0 0 4px 4px", padding: "12px 16px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {grp.methods.map((m) => {
              const method = m.split(" ")[0];
              const mc = { GET: "#22D3EE", POST: colors.accent, PATCH: colors.accent3, DELETE: colors.accent4 }[method] || colors.muted;
              return (
                <div key={m} style={{ background: colors.bg, border: `1px solid ${colors.border}`, padding: "6px 12px", fontSize: "11px", display: "flex", gap: "8px", alignItems: "center", borderRadius: "2px" }}>
                  <span style={{ color: mc, fontWeight: "700", minWidth: "42px" }}>{method}</span>
                  <span style={{ color: colors.muted }}>{m.split(" ").slice(1).join(" ")}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// DATA MODEL TAB
// ─────────────────────────────────────────────
function DataModel() {
  const entities = [
    { name: "Organization", color: colors.accent, fields: [{ n: "organization_id", t: "UUID", pk: true }, { n: "name", t: "string" }, { n: "sector", t: "enum" }, { n: "policy_set_id", t: "UUID", fk: true }, { n: "jurisdiction_profile", t: "jsonb" }, { n: "subscription_status", t: "enum" }, { n: "created_at", t: "timestamp" }] },
    { name: "User", color: colors.accent, fields: [{ n: "user_id", t: "UUID", pk: true }, { n: "organization_id", t: "UUID", fk: true }, { n: "email", t: "string" }, { n: "role", t: "enum" }, { n: "permissions", t: "jsonb" }, { n: "reviewer_level", t: "int" }, { n: "created_at", t: "timestamp" }] },
    { name: "Matter", color: colors.accent2, fields: [{ n: "matter_id", t: "UUID", pk: true }, { n: "organization_id", t: "UUID", fk: true }, { n: "matter_type", t: "enum" }, { n: "status", t: "enum" }, { n: "owner_user_id", t: "UUID", fk: true }, { n: "deadline", t: "timestamp" }, { n: "created_at", t: "timestamp" }] },
    { name: "Document", color: colors.accent2, fields: [{ n: "document_id", t: "UUID", pk: true }, { n: "matter_id", t: "UUID", fk: true }, { n: "organization_id", t: "UUID", fk: true }, { n: "source_type", t: "enum" }, { n: "file_url", t: "string" }, { n: "ocr_status", t: "enum" }, { n: "classification", t: "string" }, { n: "current_version", t: "int" }] },
    { name: "Clause", color: "#A78BFA", fields: [{ n: "clause_id", t: "UUID", pk: true }, { n: "document_id", t: "UUID", fk: true }, { n: "clause_type", t: "enum" }, { n: "clause_text", t: "text" }, { n: "metadata", t: "jsonb" }, { n: "risk_ids", t: "UUID[]" }, { n: "precedent_ids", t: "UUID[]" }] },
    { name: "Risk", color: colors.accent4, fields: [{ n: "risk_id", t: "UUID", pk: true }, { n: "clause_id", t: "UUID", fk: true }, { n: "severity", t: "enum" }, { n: "policy_violated", t: "string" }, { n: "regulation_ref", t: "string" }, { n: "suggested_remediation", t: "text" }, { n: "created_at", t: "timestamp" }] },
    { name: "WorkflowRun", color: colors.accent3, fields: [{ n: "workflow_run_id", t: "UUID", pk: true }, { n: "workflow_type", t: "enum" }, { n: "matter_id", t: "UUID", fk: true }, { n: "current_step", t: "string" }, { n: "status", t: "enum" }, { n: "triggered_by", t: "UUID", fk: true }, { n: "started_at", t: "timestamp" }, { n: "completed_at", t: "timestamp" }] },
    { name: "Action", color: colors.accent3, fields: [{ n: "action_id", t: "UUID", pk: true }, { n: "workflow_run_id", t: "UUID", fk: true }, { n: "actor_id", t: "UUID" }, { n: "action_type", t: "enum" }, { n: "input", t: "jsonb" }, { n: "output", t: "jsonb" }, { n: "evidence_ids", t: "UUID[]" }, { n: "created_at", t: "timestamp" }] },
    { name: "Review", color: colors.gold, fields: [{ n: "review_id", t: "UUID", pk: true }, { n: "document_id", t: "UUID", fk: true }, { n: "reviewer_id", t: "UUID", fk: true }, { n: "reviewer_type", t: "enum" }, { n: "findings", t: "jsonb" }, { n: "decision", t: "enum" }, { n: "comments", t: "text" }, { n: "created_at", t: "timestamp" }] },
    { name: "Citation", color: colors.muted, fields: [{ n: "evidence_id", t: "UUID", pk: true }, { n: "action_id", t: "UUID", fk: true }, { n: "source_type", t: "enum" }, { n: "citation_text", t: "text" }, { n: "source_url", t: "string" }, { n: "confidence", t: "float" }, { n: "created_at", t: "timestamp" }] },
  ];

  return (
    <div style={style.content}>
      <div style={style.sectionTitle}>Data Architecture</div>
      <h2 style={style.h2}>Canonical Object Model</h2>
      <div style={{ ...style.card(colors.accent3), background: `${colors.accent3}10`, marginBottom: "32px" }}>
        <div style={{ fontSize: "12px", color: colors.accent3, lineHeight: 1.7 }}>
          These canonical objects become the <strong>primary unit of architecture</strong> — not the repos. Once all services operate on shared objects, capabilities stop being isolated and start compounding each other.
        </div>
      </div>

      {/* Relationship diagram */}
      <div style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: "6px", padding: "24px", marginBottom: "32px" }}>
        <div style={{ fontSize: "11px", letterSpacing: "3px", color: colors.muted, marginBottom: "16px" }}>OBJECT RELATIONSHIPS</div>
        <div style={{ fontSize: "12px", color: colors.muted, lineHeight: 2.2, fontFamily: "monospace" }}>
          <span style={{ color: colors.accent }}>Organization</span> → has many → <span style={{ color: colors.accent }}>Users</span><br />
          <span style={{ color: colors.accent }}>Organization</span> → has many → <span style={{ color: colors.accent2 }}>Matters</span><br />
          <span style={{ color: colors.accent2 }}>Matter</span> → has many → <span style={{ color: colors.accent2 }}>Documents</span><br />
          <span style={{ color: colors.accent2 }}>Matter</span> → has many → <span style={{ color: colors.accent3 }}>WorkflowRuns</span><br />
          <span style={{ color: colors.accent2 }}>Document</span> → has many → <span style={{ color: "#A78BFA" }}>Clauses</span><br />
          <span style={{ color: "#A78BFA" }}>Clause</span> → has many → <span style={{ color: colors.accent4 }}>Risks</span><br />
          <span style={{ color: colors.accent3 }}>WorkflowRun</span> → has many → <span style={{ color: colors.accent3 }}>Actions</span><br />
          <span style={{ color: colors.accent3 }}>Action</span> → references → <span style={{ color: colors.muted }}>Citations/Evidence</span><br />
          <span style={{ color: colors.accent2 }}>Document</span> → triggers → <span style={{ color: colors.gold }}>Review</span><br />
          <span style={{ color: colors.gold }}>Review</span> → made by → <span style={{ color: colors.accent }}>User</span>
        </div>
      </div>

      <div style={style.grid2}>
        {entities.map((e) => (
          <div key={e.name} style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: "4px", overflow: "hidden" }}>
            <div style={{ background: `${e.color}15`, borderBottom: `1px solid ${e.color}30`, padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "13px", fontWeight: "700", color: e.color }}>{e.name}</span>
              <span style={{ fontSize: "10px", color: colors.muted }}>TABLE</span>
            </div>
            <div style={{ padding: "0" }}>
              {e.fields.map((f) => (
                <div key={f.n} style={{ display: "flex", justifyContent: "space-between", padding: "6px 16px", borderBottom: `1px solid ${colors.border}`, alignItems: "center" }}>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    {f.pk && <span style={{ color: colors.gold, fontSize: "9px" }}>PK</span>}
                    {f.fk && <span style={{ color: colors.accent3, fontSize: "9px" }}>FK</span>}
                    {!f.pk && !f.fk && <span style={{ width: "20px" }} />}
                    <span style={{ fontSize: "11px", color: colors.text }}>{f.n}</span>
                  </div>
                  <span style={{ fontSize: "10px", color: colors.muted }}>{f.t}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// WORKFLOWS TAB
// ─────────────────────────────────────────────
function Workflows() {
  const [wf, setWf] = useState(0);
  const workflows = [
    {
      name: "Contract Intake & Review",
      color: colors.accent,
      desc: "Primary MVP workflow — full lifecycle from upload to decision",
      steps: [
        { n: "1", title: "Document Upload", actor: "User", actions: ["Upload PDF/DOCX", "Select matter", "Add metadata"], output: "Document record + WorkflowRun created", icon: "↑" },
        { n: "2", title: "OCR & Ingestion", actor: "Ingestion Operator", actions: ["Trigger OCR service", "Validate structure", "Store raw text"], output: "Parsed document content", icon: "◈" },
        { n: "3", title: "Extraction", actor: "Extraction Operator", actions: ["Identify parties & dates", "Extract clauses", "Detect obligations"], output: "Structured Clause + Obligation objects", icon: "⊟" },
        { n: "4", title: "Compliance Check", actor: "Compliance Operator", actions: ["Apply policy rules", "Check regulations", "Flag deviations"], output: "Risk objects with severity scores", icon: "⊛" },
        { n: "5", title: "Research & Citations", actor: "Research Operator", actions: ["Query legal sources", "Retrieve precedents", "Attach citations"], output: "Citation/Evidence objects linked to findings", icon: "⊕" },
        { n: "6", title: "Drafting Suggestions", actor: "Drafting Operator", actions: ["Generate fallback language", "Create redlines", "Suggest clause alternatives"], output: "Draft suggestions attached to clauses", icon: "✎" },
        { n: "7", title: "Review Briefing", actor: "Review Operator", actions: ["Compile findings summary", "Score overall risk", "Prepare reviewer packet"], output: "Review record ready for human", icon: "◉" },
        { n: "8", title: "Human Review", actor: "Legal Reviewer", actions: ["Review findings", "Accept/reject/escalate", "Add comments"], output: "Decision recorded on Review object", icon: "✓" },
        { n: "9", title: "Approval / Escalation", actor: "Routing Operator + Manager", actions: ["Route to approver", "Trigger SLA timer", "Escalate if needed"], output: "Approval object created, matter updated", icon: "→" },
        { n: "10", title: "Analytics Update", actor: "Analytics Operator", actions: ["Emit workflow events", "Update dashboards", "Log metrics"], output: "Institution analytics updated", icon: "∿" },
      ],
    },
    {
      name: "Compliance Review",
      color: colors.accent3,
      desc: "Standalone compliance check against policy and regulatory rule sets",
      steps: [
        { n: "1", title: "Document Submission", actor: "User", actions: ["Upload document", "Select policy set", "Set jurisdiction"], output: "Document + compliance run created", icon: "↑" },
        { n: "2", title: "Policy Loading", actor: "Compliance Operator", actions: ["Load active policy rules", "Load regulation mappings", "Identify applicable jurisdictions"], output: "Rule set loaded for evaluation", icon: "⊛" },
        { n: "3", title: "Clause Analysis", actor: "Extraction + Compliance Operators", actions: ["Extract all clauses", "Map to policy rules", "Score each clause"], output: "Clause-level compliance scores", icon: "◈" },
        { n: "4", title: "Deviation Flagging", actor: "Compliance Operator", actions: ["Identify missing clauses", "Flag deviating language", "Reference violated policy"], output: "Risk objects with policy references", icon: "⚠" },
        { n: "5", title: "Remediation Suggestions", actor: "Drafting Operator", actions: ["Suggest compliant language", "Reference policy standard", "Generate compliant alternatives"], output: "Remediation draft suggestions", icon: "✎" },
        { n: "6", title: "Compliance Report", actor: "Review Operator", actions: ["Generate compliance scorecard", "Rank by severity", "Summarize for reviewer"], output: "Compliance report artifact", icon: "◉" },
        { n: "7", title: "Sign-off", actor: "Compliance Officer", actions: ["Review report", "Accept or escalate", "Record decision"], output: "Compliance decision logged", icon: "✓" },
      ],
    },
    {
      name: "Legal Memo Drafting",
      color: "#A78BFA",
      desc: "Assisted drafting workflow from brief to final memo",
      steps: [
        { n: "1", title: "Brief Submission", actor: "User", actions: ["Describe matter context", "Upload reference docs", "Specify memo type"], output: "Matter + drafting task created", icon: "↑" },
        { n: "2", title: "Research Phase", actor: "Research Operator", actions: ["Query relevant cases", "Pull statutes", "Find precedents"], output: "Research package compiled", icon: "⊕" },
        { n: "3", title: "Structure Generation", actor: "Drafting Operator", actions: ["Generate memo outline", "Suggest section structure", "Apply jurisdiction formatting"], output: "Memo skeleton with structure", icon: "⊟" },
        { n: "4", title: "Content Drafting", actor: "Drafting Operator", actions: ["Draft each section", "Embed citations", "Apply policy context"], output: "Initial memo draft", icon: "✎" },
        { n: "5", title: "Review & Refinement", actor: "Legal Reviewer", actions: ["Review draft sections", "Add redlines", "Approve or revise"], output: "Revised draft with reviewer notes", icon: "◈" },
        { n: "6", title: "Final Output", actor: "Drafting Operator + User", actions: ["Apply all revisions", "Format final document", "Generate export"], output: "Final memo document ready", icon: "✓" },
      ],
    },
  ];
  const w = workflows[wf];
  return (
    <div style={style.content}>
      <div style={style.sectionTitle}>Workflow Diagrams</div>
      <h2 style={style.h2}>End-to-End Workflow Maps</h2>
      <div style={{ display: "flex", gap: "8px", marginBottom: "32px", flexWrap: "wrap" }}>
        {workflows.map((wfl, i) => (
          <button key={i} onClick={() => setWf(i)} style={{ padding: "10px 20px", background: wf === i ? `${wfl.color}20` : "transparent", border: `1px solid ${wf === i ? wfl.color : colors.border}`, color: wf === i ? wfl.color : colors.muted, cursor: "pointer", fontSize: "11px", letterSpacing: "1px", fontFamily: "inherit", borderRadius: "3px" }}>
            {wfl.name}
          </button>
        ))}
      </div>
      <div style={{ ...style.card(w.color), background: `${w.color}08`, marginBottom: "32px" }}>
        <div style={{ fontSize: "16px", fontWeight: "700", color: w.color, marginBottom: "6px" }}>{w.name}</div>
        <div style={{ fontSize: "12px", color: colors.muted }}>{w.desc}</div>
      </div>
      <div style={{ position: "relative" }}>
        {w.steps.map((step, idx) => (
          <div key={idx} style={{ display: "flex", gap: "0", marginBottom: "0" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "20px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: `${w.color}20`, border: `2px solid ${w.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", color: w.color, flexShrink: 0 }}>
                {step.icon}
              </div>
              {idx < w.steps.length - 1 && <div style={{ width: "2px", flex: "1", minHeight: "20px", background: `${w.color}30`, margin: "4px 0" }} />}
            </div>
            <div style={{ flex: 1, background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: "4px", padding: "16px 20px", marginBottom: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", flexWrap: "wrap", gap: "8px" }}>
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <span style={{ fontSize: "10px", color: w.color, fontWeight: "700" }}>STEP {step.n}</span>
                  <span style={{ fontSize: "13px", fontWeight: "700", color: colors.text }}>{step.title}</span>
                </div>
                <span style={style.badge(colors.accent2)}>{step.actor}</span>
              </div>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <div style={{ fontSize: "9px", letterSpacing: "2px", color: colors.muted, marginBottom: "6px" }}>ACTIONS</div>
                  {step.actions.map((a) => (
                    <div key={a} style={{ fontSize: "11px", color: colors.muted, padding: "2px 0" }}>▸ {a}</div>
                  ))}
                </div>
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <div style={{ fontSize: "9px", letterSpacing: "2px", color: colors.muted, marginBottom: "6px" }}>OUTPUT</div>
                  <div style={{ fontSize: "11px", color: colors.accent3, lineHeight: 1.5 }}>{step.output}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// DASHBOARDS TAB
// ─────────────────────────────────────────────
function Dashboards() {
  return (
    <div style={style.content}>
      <div style={style.sectionTitle}>Dashboard Architecture</div>
      <h2 style={style.h2}>Three Frontend Surfaces</h2>

      {[
        {
          title: "Surface 1 — Institution Workspace",
          color: colors.accent,
          audience: "Customer organizations — legal teams, procurement, compliance",
          desc: "The main B2B product interface. Each organization gets their own isolated workspace.",
          sections: [
            { name: "Home Dashboard", items: ["Active matters count + status", "Pending review queue", "Recent document activity", "Risk alerts feed", "SLA breach warnings", "Quick actions panel"] },
            { name: "Matters View", items: ["Matter list with status filters", "Matter detail with timeline", "Linked documents + reviews", "Team assignment", "Deadline tracker"] },
            { name: "Documents View", items: ["Upload zone", "Document grid with classification", "OCR status indicator", "Version history", "Clause viewer", "Risk panel sidebar"] },
            { name: "Reviews Workspace", items: ["Review queue", "Finding cards with severity", "Accept/Reject/Escalate actions", "Citation sidebar", "Annotation panel", "Reviewer notes"] },
            { name: "Analytics Dashboard", items: ["Volume trends", "Turnaround time charts", "Risk category breakdown", "SLA performance", "Department comparison", "Export reports"] },
          ],
        },
        {
          title: "Surface 2 — Esheria Operator Console",
          color: colors.accent4,
          audience: "Esheria internal teams — ops, support, engineering, sales",
          desc: "Internal control plane for managing the platform and supporting customers.",
          sections: [
            { name: "Tenant Operations", items: ["Org list with plan/status", "Create/provision org", "Suspend or modify plan", "Per-org usage metrics", "Feature flag controls"] },
            { name: "Workflow Monitoring", items: ["Live workflow run monitor", "Failed/stuck run inspector", "Step-level execution logs", "SLA breach alerts", "Re-trigger / retry actions"] },
            { name: "Service Health", items: ["OCR service latency + uptime", "Contract engine error rates", "Drafting service queue depth", "Research service availability", "Incident timeline"] },
            { name: "Support Console", items: ["Customer lookup", "Impersonation (fully audited)", "Log search + export", "Evidence chain inspector", "Override / intervention tools"] },
            { name: "Usage & Billing", items: ["Per-org document volumes", "API call counts", "Feature usage breakdown", "Plan vs actual usage", "Billing export"] },
          ],
        },
        {
          title: "Surface 3 — Public / Sales Surface",
          color: colors.accent3,
          audience: "Prospects, new signups, marketing",
          desc: "Separate from operational surfaces. Handles demos, self-serve signup, and vertical landing pages.",
          sections: [
            { name: "Demo Environment", items: ["Pre-loaded demo org", "Guided workflow tour", "Sample contract review", "Analytics preview"] },
            { name: "Onboarding", items: ["Org creation wizard", "User invitations", "Workflow template selection", "Integration setup guide"] },
            { name: "Workflow Templates", items: ["Contract Intake template", "Compliance Review template", "Memo Drafting template", "Vertical-specific presets"] },
          ],
        },
      ].map((surface) => (
        <div key={surface.title} style={{ marginBottom: "40px" }}>
          <div style={{ background: `${surface.color}10`, border: `1px solid ${surface.color}30`, borderRadius: "6px 6px 0 0", padding: "20px 24px" }}>
            <div style={{ fontSize: "16px", fontWeight: "700", color: surface.color, marginBottom: "4px" }}>{surface.title}</div>
            <div style={{ fontSize: "11px", color: colors.muted, marginBottom: "8px" }}>AUDIENCE: {surface.audience}</div>
            <div style={{ fontSize: "12px", color: colors.text }}>{surface.desc}</div>
          </div>
          <div style={{ background: colors.surface, border: `1px solid ${surface.color}20`, borderTop: "none", borderRadius: "0 0 6px 6px", padding: "20px 24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
              {surface.sections.map((sec) => (
                <div key={sec.name}>
                  <div style={{ fontSize: "11px", fontWeight: "700", color: surface.color, marginBottom: "10px", letterSpacing: "1px" }}>{sec.name}</div>
                  {sec.items.map((i) => (
                    <div key={i} style={{ fontSize: "11px", color: colors.muted, padding: "4px 0", borderBottom: `1px solid ${colors.border}` }}>
                      · {i}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// INTEGRATIONS TAB
// ─────────────────────────────────────────────
function Integrations() {
  return (
    <div style={style.content}>
      <div style={style.sectionTitle}>Integration Strategy</div>
      <h2 style={style.h2}>How Existing Repos Plug In</h2>

      {/* Existing repos */}
      <div style={style.grid2}>
        {[
          { repo: "esheria-ai", color: colors.accent, role: "Research & Retrieval Service", capabilities: ["Legal research operator", "Retrieval-augmented responses", "Citation generation", "Conversational workflow support", "Legal assistant within context"], status: "PRIMARY" },
          { repo: "lexdraft", color: "#A78BFA", role: "Drafting & Review Service", capabilities: ["Contract drafting operator", "Redline/revision generation", "Document revision surface", "Submission support", "Template management"], status: "PRIMARY" },
          { repo: "esheria-contract-engine", color: colors.accent3, role: "Compliance & Clause Analysis Service", capabilities: ["Compliance operator engine", "Clause extraction", "Obligation detection", "Policy/regulation check", "Risk scoring"], status: "PRIMARY" },
          { repo: "esheria-ocr", color: colors.accent2, role: "Document Ingestion Service", capabilities: ["OCR processing", "First-stage document transformation", "Structure detection", "File type handling"], status: "PRIMARY" },
          { repo: "esheria-analytics", color: colors.accent4, role: "Analytics Infrastructure", capabilities: ["Esheria internal CRM/ops analytics", "Infrastructure for institution analytics layer", "Metric pipeline patterns", "Reporting infrastructure"], status: "EVOLVE" },
          { repo: "lexchat-plugin", color: colors.gold, role: "Browser Edge Assistant (Future)", capabilities: ["Browser-side legal assistance", "Legal website augmentation", "Research extension", "Embedded widget potential"], status: "FUTURE" },
        ].map((r) => (
          <div key={r.repo} style={style.card(r.color)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <div style={{ fontSize: "14px", fontWeight: "700", color: r.color, fontFamily: "monospace" }}>{r.repo}</div>
              <span style={style.badge(r.status === "PRIMARY" ? colors.accent : r.status === "EVOLVE" ? colors.accent3 : colors.muted)}>
                {r.status}
              </span>
            </div>
            <div style={{ fontSize: "12px", color: colors.text, marginBottom: "12px" }}>{r.role}</div>
            {r.capabilities.map((c) => (
              <div key={c} style={{ fontSize: "11px", color: colors.muted, padding: "4px 0", borderTop: `1px solid ${colors.border}` }}>
                ▸ {c}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* External integrations */}
      <div style={{ marginTop: "32px" }}>
        <div style={style.sectionTitle}>External Integration Targets</div>
        <div style={style.grid3}>
          {[
            { cat: "Document Management", color: colors.accent, examples: ["SharePoint", "Google Drive", "Dropbox", "Box", "NetDocuments"] },
            { cat: "CRM / Sales", color: colors.accent2, examples: ["Salesforce", "HubSpot", "Pipedrive"] },
            { cat: "ERP / Enterprise", color: colors.accent3, examples: ["SAP", "Oracle", "Microsoft 365"] },
            { cat: "Email / Comms", color: "#A78BFA", examples: ["Gmail", "Outlook", "Slack", "Teams"] },
            { cat: "E-Signature", color: colors.gold, examples: ["DocuSign", "Adobe Sign", "HelloSign"] },
            { cat: "Legal Research", color: colors.accent4, examples: ["LexisNexis", "Westlaw", "Casetext", "vLex"] },
          ].map((ext) => (
            <div key={ext.cat} style={style.card(ext.color)}>
              <div style={{ fontSize: "12px", fontWeight: "700", color: ext.color, marginBottom: "12px" }}>{ext.cat}</div>
              {ext.examples.map((e) => (
                <div key={e} style={{ fontSize: "11px", color: colors.muted, padding: "4px 0", borderTop: `1px solid ${colors.border}` }}>
                  · {e}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ROADMAP TAB
// ─────────────────────────────────────────────
function Roadmap() {
  return (
    <div style={style.content}>
      <div style={style.sectionTitle}>Implementation Plan</div>
      <h2 style={style.h2}>Phased Roadmap</h2>

      {[
        {
          phase: "PHASE 0",
          name: "Validation & Alignment",
          color: colors.muted,
          duration: "2–3 weeks",
          type: "Strategic",
          deliverables: [
            "CEO alignment on strategic direction",
            "Choose one workflow wedge (recommended: Contract Intake & Review)",
            "Define success criteria and MVP scope",
            "Confirm which existing services are usable in prototype form",
            "Capability ownership map",
            "Integration readiness assessment",
          ],
          milestone: "Green light + scope agreement",
        },
        {
          phase: "PHASE 1",
          name: "Design",
          color: colors.accent2,
          duration: "3–4 weeks",
          type: "Architecture",
          deliverables: [
            "Define minimum ontology (core entity schemas)",
            "Define workflow states and transition rules",
            "Identify service connectors needed",
            "Define audit log data model",
            "Define UI/UX scope for MVP",
            "API contract design",
            "Auth and tenant model design",
          ],
          milestone: "Architecture doc + API spec approved",
        },
        {
          phase: "PHASE 2",
          name: "MVP Build",
          color: colors.accent,
          duration: "6–8 weeks",
          type: "Engineering",
          deliverables: [
            "Core platform backend (auth, tenancy, workflow engine)",
            "2–3 service connectors (OCR, contract engine, drafting)",
            "Shared object model (Matter, Document, Clause, Risk, WorkflowRun)",
            "Reviewer dashboard and review flow",
            "Audit log and evidence chain",
            "Approval / escalation logic",
            "End-to-end demo workflow",
          ],
          milestone: "Live demo: upload → analyze → review → approve",
        },
        {
          phase: "PHASE 3",
          name: "Internal Pilot",
          color: colors.accent3,
          duration: "3–4 weeks",
          type: "Validation",
          deliverables: [
            "Test with 2–3 internal workflow scenarios",
            "Identify workflow failures and edge cases",
            "Refine action model and evidence tracking",
            "Performance and reliability testing",
            "Improve reviewer UX based on usage",
            "Operator console basic version",
          ],
          milestone: "Internal validation + refined platform",
        },
        {
          phase: "PHASE 4",
          name: "B2B Packaging",
          color: colors.gold,
          duration: "4–6 weeks",
          type: "Go-to-Market",
          deliverables: [
            "Define target customer workflow profile",
            "Create demo materials and pitch narrative",
            "Shape product packaging and pricing model",
            "Build pilot onboarding flow",
            "Develop vertical-specific workflow templates",
            "Institution analytics dashboard v1",
            "Position as Legal Workflow Platform",
          ],
          milestone: "First pilot conversation with target B2B customer",
        },
      ].map((p, idx) => (
        <div key={idx} style={{ marginBottom: "16px", display: "flex", gap: "0" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "20px" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: `${p.color}20`, border: `2px solid ${p.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: p.color, letterSpacing: "1px", flexShrink: 0, textAlign: "center", lineHeight: 1.2 }}>
              {idx + 1}
            </div>
            {idx < 4 && <div style={{ width: "2px", height: "40px", background: `${p.color}30` }} />}
          </div>
          <div style={{ flex: 1, background: colors.surface, border: `1px solid ${colors.border}`, borderLeft: `3px solid ${p.color}`, borderRadius: "0 4px 4px 0", padding: "20px 24px", marginBottom: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
              <div>
                <span style={{ fontSize: "10px", color: p.color, letterSpacing: "2px", fontWeight: "700" }}>{p.phase} — </span>
                <span style={{ fontSize: "16px", fontWeight: "700", color: colors.text }}>{p.name}</span>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <span style={style.badge(p.color)}>{p.duration}</span>
                <span style={style.badge(colors.muted)}>{p.type}</span>
              </div>
            </div>
            <div style={style.grid2}>
              <div>
                <div style={{ fontSize: "9px", letterSpacing: "2px", color: colors.muted, marginBottom: "8px" }}>DELIVERABLES</div>
                {p.deliverables.map((d) => (
                  <div key={d} style={{ fontSize: "11px", color: colors.muted, padding: "4px 0", borderBottom: `1px solid ${colors.border}`, display: "flex", gap: "8px" }}>
                    <span style={{ color: p.color }}>▸</span> {d}
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: "9px", letterSpacing: "2px", color: colors.muted, marginBottom: "8px" }}>MILESTONE</div>
                <div style={{ background: `${p.color}15`, border: `1px solid ${p.color}30`, padding: "16px", borderRadius: "4px", fontSize: "12px", color: p.color, lineHeight: 1.5 }}>
                  🎯 {p.milestone}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Success metrics */}
      <div style={{ marginTop: "40px" }}>
        <div style={style.sectionTitle}>Success Metrics</div>
        <div style={style.grid3}>
          {[
            { title: "Technical", color: colors.accent2, metrics: ["End-to-end workflow completes successfully", "Service connectors stable under load", "Audit trail is complete and queryable", "Key actions are observable", "Workflow states are reliable"] },
            { title: "Product", color: colors.accent, metrics: ["Workflow is easy to demo in 5 minutes", "Output is useful to human reviewers", "Recommendations are grounded & reviewable", "Internal teams see clear orchestration value"] },
            { title: "Business", color: colors.gold, metrics: ["CEO/leadership interest confirmed", "Viable pilot conversation with 1 target customer", "Esheria can pitch as a workflow platform", "Clear pricing model defined"] },
          ].map((s) => (
            <div key={s.title} style={style.card(s.color)}>
              <div style={{ fontSize: "13px", fontWeight: "700", color: s.color, marginBottom: "12px" }}>{s.title} Success</div>
              {s.metrics.map((m) => (
                <div key={m} style={{ fontSize: "11px", color: colors.muted, padding: "6px 0", borderBottom: `1px solid ${colors.border}`, display: "flex", gap: "8px" }}>
                  <span style={{ color: s.color }}>✓</span> {m}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────
const tabComponents = [Overview, ArchitectureLayers, SystemModules, ApiStructure, DataModel, Workflows, Dashboards, Integrations, Roadmap];

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const TabComponent = tabComponents[activeTab];

  return (
    <div style={style.page}>
      {/* Header */}
      <div style={style.header}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "400px", height: "200px", background: `radial-gradient(circle at 100% 0%, ${colors.accent}08 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={style.tag}>CONFIDENTIAL — CEO REVIEW</div>
        <h1 style={style.h1}>Esheria Legal Workflow OS</h1>
        <div style={style.subtitle}>Architecture & Implementation Blueprint · Vincent Nyamao</div>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          {[
            { label: "Status", value: "Concept → Structure" },
            { label: "Stage", value: "Pre-MVP" },
            { label: "Priority", value: "Strategic" },
            { label: "Type", value: "B2B Platform" },
          ].map((m) => (
            <div key={m.label}>
              <div style={{ fontSize: "9px", color: colors.muted, letterSpacing: "2px", marginBottom: "2px" }}>{m.label}</div>
              <div style={{ fontSize: "12px", color: colors.accent }}>{m.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Nav */}
      <div style={style.nav}>
        {tabs.map((t, i) => (
          <button key={t} onClick={() => setActiveTab(i)} style={style.navBtn(activeTab === i)}>
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <TabComponent />
    </div>
  );
}
