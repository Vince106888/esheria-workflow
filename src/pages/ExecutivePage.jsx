import { Link } from "react-router-dom";
import { useState } from "react";
import architectureModel from "../architecture/architectureModel";
import { diagramRegistryByAudience } from "../architecture/diagramRegistry";
import { getDiagramPreview } from "../architecture/diagramPreviews";
import { Reveal, SectionEyebrow } from "../components/presentation/Primitives";

// ─── DATA ─────────────────────────────────────────────────────

const executiveDiagramOrder = [
  "current-vs-target-architecture",
  "system-context",
  "layered-architecture",
  "dashboard-topology",
];

const executiveDiagrams = executiveDiagramOrder
  .map((id) => diagramRegistryByAudience?.executive?.find((d) => d.id === id))
  .filter(Boolean);

const NARRATIVE_STEPS = [
  {
    num: "01",
    label: "The Problem",
    color: "#E8506A",
    headline: "Five strong capabilities operating as five separate systems.",
    body: "Esheria has credible, functioning AI services across OCR, contract analysis, legal research, drafting, and analytics. But they share no data model, no workflow state, and no orchestration layer. Every service is a silo. There is no platform.",
    detail: "Enterprise legal teams don't buy isolated AI tools — they buy repeatable, auditable workflows. Without a shared object model, approval chains, and compliance audit trails, Esheria cannot compete for the enterprise contract that matters.",
  },
  {
    num: "02",
    label: "The Move",
    color: "#00D4AA",
    headline: "Build the orchestration layer above the capabilities that already exist.",
    body: "Not a new product. Not a rebuilt service. A control plane and data plane that unifies what Esheria already has — giving it shared canonical objects, workflow state machines, human-in-loop review, and a governance layer that turns features into a platform.",
    detail: "The five repos become Layer 1. The platform wraps them in four layers above: Connectors → Object Model → Control Plane → Experience. Each layer adds compounding value without touching what already works.",
  },
  {
    num: "03",
    label: "The Outcome",
    color: "#4F7EF7",
    headline: "Enterprise-grade legal workflows with institutional memory and moat.",
    body: "The result is a B2B Legal Workflow Operating System that enterprise legal teams, compliance functions, and procurement departments run their operations inside. Workflow depth creates switching cost. Audit trails create institutional memory. Integration surface creates lock-in.",
    detail: "The moat comes from workflow depth, ontology quality, process memory, and integration surface — not from AI capability alone. Platform businesses compound. Feature businesses plateau.",
  },
];

const STRATEGIC_SHIFT = {
  left: {
    label: "Current State",
    color: "#E8506A",
    points: [
      "Five repos with independent auth models and inconsistent APIs",
      "No shared canonical representation of Documents, Matters, or Clauses",
      "Workflow state is not preserved or transferable between services",
      "Analytics serves Esheria's internal ops — no customer-facing intelligence",
      "No approval chains, escalation logic, or SLA enforcement",
      "No audit trail — no evidence chain linking AI output to source",
      "Selling feature-by-feature to individual users, not to organisations",
    ],
  },
  right: {
    label: "Target State",
    color: "#00D4AA",
    points: [
      "Single API gateway with org-scoped JWT auth across all services",
      "Canonical Object Model: Org · Matter · Document · Clause · Risk · Action · Citation",
      "Workflow Engine with state machine, step tracing, and full run history",
      "Institution Analytics layer — turnaround times, risk trends, SLA compliance",
      "Approval router with escalation manager and SLA deadline enforcement",
      "Immutable audit log — every operator action linked to evidence",
      "Selling workflow outcomes to enterprise organisations at subscription scale",
    ],
  },
};

const DECISION_METRICS = [
  {
    label: "Workflow Throughput",
    current: "Service-level throughput — measured per API call per capability",
    target: "End-to-end throughput per tenant — measured by matters closed and SLA compliance rate",
    icon: "⟳",
    color: "#00D4AA",
  },
  {
    label: "Compliance Assurance",
    current: "Point-in-time checks — a compliance scan runs in isolation with no linkage to prior or subsequent steps",
    target: "Audited workflow-level traceability — every risk finding linked to clause, citation, reviewer decision, and timestamp",
    icon: "◎",
    color: "#4F7EF7",
  },
  {
    label: "Platform Leverage",
    current: "Feature-by-feature value — each capability sold and retained independently; no compounding",
    target: "Operating-system-led retention — workflow depth creates switching cost; institutional data creates lock-in",
    icon: "◈",
    color: "#9B6EF5",
  },
  {
    label: "Enterprise Sales Motion",
    current: "Individual user acquisition — demos to legal analysts and compliance staff one by one",
    target: "Org-level subscription — sell to Head of Legal, CCO, or procurement director; deploy to entire function",
    icon: "⬡",
    color: "#E8A020",
  },
];

const THE_ASK = [
  {
    num: "1",
    title: "Strategic Alignment",
    body: "Confirm that the platform direction — Esheria as a programmable legal workflow OS — is the right strategic bet for this phase of growth.",
    color: "#00D4AA",
  },
  {
    num: "2",
    title: "MVP Greenlight",
    body: "Approve Phase 0 through Phase 2: validation, design, and MVP build culminating in a live Contract Intake & Review end-to-end demo.",
    color: "#4F7EF7",
  },
  {
    num: "3",
    title: "Platform Ownership",
    body: "Name a platform lead responsible for coordinating across existing repo owners. Without this, the orchestration layer will stall.",
    color: "#9B6EF5",
  },
  {
    num: "4",
    title: "Pilot Target",
    body: "Identify one B2B customer type or named prospect as the north star for the MVP and B2B packaging phases.",
    color: "#E8A020",
  },
];

const MVP_STEPS = [
  { n: "01", actor: "User", action: "Upload contract", out: "Document + WorkflowRun created", color: "#586070" },
  { n: "02", actor: "Ingestion Op", action: "OCR + classify", out: "Parsed text · DocumentVersion", color: "#00D4AA" },
  { n: "03", actor: "Extraction Op", action: "Extract clauses + parties", out: "Clause[] attached to Document", color: "#00D4AA" },
  { n: "04", actor: "Compliance Op", action: "Check policies + regs", out: "Risk[] with severity scores", color: "#E8A020" },
  { n: "05", actor: "Research Op", action: "Retrieve precedents", out: "Citation[] linked to findings", color: "#4F7EF7" },
  { n: "06", actor: "Drafting Op", action: "Generate fallback language", out: "Draft suggestions per clause", color: "#9B6EF5" },
  { n: "07", actor: "Review Op", action: "Compile briefing + score", out: "Review record prepared", color: "#9B6EF5" },
  { n: "08", actor: "Human Reviewer", action: "Decide + annotate", out: "Decision on Review object", color: "#E8506A" },
  { n: "09", actor: "Routing Op", action: "Approve or escalate", out: "Approval + SLA enforced", color: "#E8A020" },
  { n: "10", actor: "Analytics Op", action: "Emit events + update dash", out: "Institution analytics updated", color: "#586070" },
];

// ─── ANIMATED REVEAL ──────────────────────────────────────────

// ─── SECTION LABEL ────────────────────────────────────────────

// ─── DIVIDER ──────────────────────────────────────────────────

// ═══════════════════════════════════════════════════════════════
export default function ExecutivePage() {
  const [activeStep, setActiveStep] = useState(null);
  const [hoveredAsk, setHoveredAsk] = useState(null);
  const meta = architectureModel?.meta || { platformName: "Esheria Legal Workflow OS", version: "1.0" };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--tone-bg)",
      color: "var(--tone-text)",
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      overflowX: "hidden",
    }}>

      {/* ── AMBIENT GRADIENT ── */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 60% 40% at 50% 0%, var(--tone-glow) 0%, transparent 70%)",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ══ HERO ═══════════════════════════════════════════ */}
        <section style={{ padding: "80px clamp(24px, 5vw, 80px) 72px", borderBottom: "1px solid var(--tone-border)" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "48px" }}>
            <Link to="/overview" style={{ textDecoration: "none" }}>
              <span style={{ fontSize: "12px", color: "var(--tone-dim)", fontWeight: 600, letterSpacing: "0.06em", cursor: "pointer" }}
                onMouseEnter={e => e.target.style.color = "var(--tone-muted)"}
                onMouseLeave={e => e.target.style.color = "var(--tone-dim)"}
              >OVERVIEW</span>
            </Link>
            <span style={{ fontSize: "12px", color: "var(--tone-border)" }}>›</span>
            <span style={{ fontSize: "12px", color: "#00D4AA", fontWeight: 600, letterSpacing: "0.06em" }}>EXECUTIVE BRIEF</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "48px", alignItems: "end" }}>
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "4px 14px", borderRadius: "100px",
                background: "#00D4AA0A", border: "1px solid #00D4AA30",
                marginBottom: "28px",
              }}>
                <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#00D4AA", boxShadow: "0 0 8px #00D4AA" }} />
                <span style={{ fontSize: "10px", color: "#00D4AA", letterSpacing: "0.1em", fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>
                  EXECUTIVE NARRATIVE · CEO PRESENTATION
                </span>
              </div>

              <h1 style={{
                fontSize: "clamp(2rem, 5vw, 3.6rem)",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 800,
                lineHeight: 1.06,
                letterSpacing: "-0.03em",
                color: "var(--tone-text-strong)",
                margin: "0 0 24px",
                maxWidth: "780px",
              }}>
                Board Brief: The Case for a{" "}
                <span style={{
                  background: "linear-gradient(90deg, #00D4AA 0%, #4F7EF7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  Legal Workflow
                </span>{" "}
                Operating System.
              </h1>

              <p style={{
                fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                color: "var(--tone-subtle)", lineHeight: 1.75,
                maxWidth: "640px", margin: 0,
              }}>
                Esheria can move from siloed legal tooling to a multi-tenant operating system with clear
                governance, measurable workflow outcomes, and a defensible platform moat — without
                rebuilding a single existing service.
              </p>
            </div>

            {/* Right: doc meta */}
            <div style={{
              background: "var(--tone-surface)", border: "1px solid var(--tone-border)",
              borderRadius: "10px", padding: "20px 24px",
              minWidth: "200px", flexShrink: 0,
            }}>
              {[
                ["Audience", "CEO · Board"],
                ["Format", "5-min narrative"],
                ["Sections", "6"],
                ["Decision", "4 asks"],
                ["Source", `v${meta.version}`],
              ].map(([k, v]) => (
                <div key={k} style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom: "1px solid var(--tone-border)",
                  gap: "16px",
                }}>
                  <span style={{ fontSize: "11px", color: "var(--tone-muted)", fontFamily: "'DM Mono', monospace" }}>{k}</span>
                  <span style={{ fontSize: "11px", color: "var(--tone-text)", fontWeight: 600 }}>{v}</span>
                </div>
              ))}
              <Link to="/blueprint" style={{ textDecoration: "none" }}>
                <div style={{
                  marginTop: "16px", padding: "9px 0", borderRadius: "6px",
                  background: "var(--tone-border)", textAlign: "center",
                  fontSize: "11px", color: "var(--tone-subtle)", fontWeight: 600,
                  cursor: "pointer", transition: "all 0.2s",
                  letterSpacing: "0.04em",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "var(--tone-dim)"; e.currentTarget.style.color = "var(--tone-text)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "var(--tone-border)"; e.currentTarget.style.color = "var(--tone-subtle)"; }}
                >
                  Technical Blueprint →
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ══ 5-MIN NARRATIVE ════════════════════════════════ */}
        <section style={{ padding: "80px clamp(24px, 5vw, 80px)", borderBottom: "1px solid var(--tone-border)" }}>
          <Reveal>
            <SectionEyebrow text="5-MINUTE NARRATIVE FLOW" />
            <h2 style={{ fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 700, color: "var(--tone-text-strong)", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
              Three arguments. One platform decision.
            </h2>
            <p style={{ fontSize: "14px", color: "var(--tone-muted)", margin: "0 0 56px", maxWidth: "520px", lineHeight: 1.7 }}>
              The executive case for this proposal rests on three sequential arguments. Each one builds on the last.
              If the CEO accepts all three, the ask becomes obvious.
            </p>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {NARRATIVE_STEPS.map((step, i) => (
              <Reveal key={step.num} delay={i * 100}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr",
                  gap: "0",
                  borderTop: i === 0 ? "1px solid var(--tone-border)" : "none",
                  borderBottom: "1px solid var(--tone-border)",
                  transition: "background 0.2s",
                  cursor: "default",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--tone-surface)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  {/* Number column */}
                  <div style={{
                    padding: "40px 0 40px 0",
                    display: "flex", alignItems: "flex-start", justifyContent: "center",
                    borderRight: "1px solid var(--tone-border)",
                  }}>
                    <div style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "11px", fontWeight: 700,
                      color: step.color,
                      background: `${step.color}10`,
                      border: `1px solid ${step.color}30`,
                      borderRadius: "6px",
                      padding: "4px 8px",
                      letterSpacing: "0.06em",
                    }}>
                      {step.num}
                    </div>
                  </div>

                  {/* Content column */}
                  <div style={{ padding: "40px 0 40px clamp(24px, 4vw, 48px)" }}>
                    <div style={{
                      fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em",
                      color: step.color, marginBottom: "12px",
                      fontFamily: "'DM Mono', monospace",
                    }}>
                      {step.label.toUpperCase()}
                    </div>
                    <h3 style={{
                      fontSize: "clamp(1.1rem, 2.2vw, 1.45rem)",
                      fontWeight: 700, color: "var(--tone-text-strong)",
                      lineHeight: 1.25, letterSpacing: "-0.02em",
                      margin: "0 0 16px", maxWidth: "700px",
                    }}>
                      {step.headline}
                    </h3>
                    <p style={{ fontSize: "15px", color: "var(--tone-subtle)", lineHeight: 1.75, margin: "0 0 12px", maxWidth: "680px" }}>
                      {step.body}
                    </p>
                    <p style={{ fontSize: "13px", color: "var(--tone-muted)", lineHeight: 1.75, margin: 0, maxWidth: "640px", fontStyle: "italic" }}>
                      {step.detail}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ STRATEGIC SHIFT ════════════════════════════════ */}
        <section style={{ padding: "80px clamp(24px, 5vw, 80px)", borderBottom: "1px solid var(--tone-border)" }}>
          <Reveal>
            <SectionEyebrow text="STRATEGIC SHIFT" />
            <h2 style={{ fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 700, color: "var(--tone-text-strong)", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
              What changes. What stays.
            </h2>
            <p style={{ fontSize: "14px", color: "var(--tone-muted)", margin: "0 0 48px", maxWidth: "520px", lineHeight: 1.7 }}>
              The existing repos don't get rebuilt. They get connected. Everything below is what the platform layer adds above them.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              border: "1px solid var(--tone-border)", borderRadius: "12px", overflow: "hidden",
            }}>
              {/* Current */}
              <div style={{ background: "var(--tone-surface)", padding: "clamp(24px, 4vw, 40px)", borderRight: "1px solid var(--tone-border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E8506A" }} />
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#E8506A", letterSpacing: "0.1em", fontFamily: "'DM Mono', monospace" }}>
                    CURRENT STATE
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                  {STRATEGIC_SHIFT.left.points.map((p, i) => (
                    <div key={i} style={{
                      padding: "14px 0",
                      borderBottom: i < STRATEGIC_SHIFT.left.points.length - 1 ? "1px solid var(--tone-surface-2)" : "none",
                      display: "flex", gap: "12px", alignItems: "flex-start",
                    }}>
                      <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#E8506A40", marginTop: "8px", flexShrink: 0 }} />
                      <span style={{ fontSize: "13px", color: "var(--tone-muted)", lineHeight: 1.65 }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target */}
              <div style={{ background: "var(--tone-bg)", padding: "clamp(24px, 4vw, 40px)", position: "relative", overflow: "hidden" }}>
                <div style={{
                  position: "absolute", top: 0, right: 0, width: "60%", height: "100%",
                  background: "radial-gradient(ellipse at 100% 30%, #00D4AA06, transparent 60%)",
                  pointerEvents: "none",
                }} />
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00D4AA", boxShadow: "0 0 8px #00D4AA" }} />
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#00D4AA", letterSpacing: "0.1em", fontFamily: "'DM Mono', monospace" }}>
                    TARGET STATE
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0", position: "relative" }}>
                  {STRATEGIC_SHIFT.right.points.map((p, i) => (
                    <div key={i} style={{
                      padding: "14px 0",
                      borderBottom: i < STRATEGIC_SHIFT.right.points.length - 1 ? "1px solid var(--tone-border)" : "none",
                      display: "flex", gap: "12px", alignItems: "flex-start",
                    }}>
                      <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#00D4AA", marginTop: "8px", flexShrink: 0, boxShadow: "0 0 6px #00D4AA60" }} />
                      <span style={{ fontSize: "13px", color: "var(--tone-subtle-strong)", lineHeight: 1.65 }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ══ DECISION METRICS ═══════════════════════════════ */}
        <section style={{ padding: "80px clamp(24px, 5vw, 80px)", borderBottom: "1px solid var(--tone-border)" }}>
          <Reveal>
            <SectionEyebrow text="DECISION METRICS" />
            <h2 style={{ fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 700, color: "var(--tone-text-strong)", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
              How we measure the platform shift.
            </h2>
            <p style={{ fontSize: "14px", color: "var(--tone-muted)", margin: "0 0 48px", maxWidth: "520px", lineHeight: 1.7 }}>
              Four metrics define the difference between where Esheria is today and where the platform takes it.
              Each maps a current state limitation to a measurable target outcome.
            </p>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "16px" }}>
            {DECISION_METRICS.map((m, i) => (
              <Reveal key={i} delay={i * 80}>
                <div style={{
                  background: "var(--tone-surface)",
                  border: "1px solid var(--tone-border)",
                  borderRadius: "12px",
                  overflow: "hidden",
                  height: "100%",
                }}>
                  {/* Header */}
                  <div style={{
                    padding: "20px 24px",
                    borderBottom: "1px solid var(--tone-border)",
                    display: "flex", alignItems: "center", gap: "12px",
                    background: `${m.color}08`,
                  }}>
                    <div style={{
                      width: "32px", height: "32px", borderRadius: "8px",
                      background: `${m.color}15`, border: `1px solid ${m.color}30`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "16px", color: m.color, flexShrink: 0,
                    }}>
                      {m.icon}
                    </div>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--tone-text-strong)", letterSpacing: "-0.01em" }}>
                      {m.label}
                    </span>
                  </div>

                  <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
                    {/* From */}
                    <div>
                      <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em", color: "#E8506A", marginBottom: "6px", fontFamily: "'DM Mono', monospace" }}>
                        NOW
                      </div>
                      <div style={{ fontSize: "13px", color: "var(--tone-muted)", lineHeight: 1.65 }}>{m.current}</div>
                    </div>

                    {/* Arrow */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, var(--tone-border), ${m.color}40)` }} />
                      <div style={{ fontSize: "11px", color: m.color }}>→</div>
                    </div>

                    {/* To */}
                    <div>
                      <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em", color: m.color, marginBottom: "6px", fontFamily: "'DM Mono', monospace" }}>
                        TARGET
                      </div>
                      <div style={{ fontSize: "13px", color: "var(--tone-subtle-strong)", lineHeight: 1.65 }}>{m.target}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ MVP WORKFLOW ════════════════════════════════════ */}
        <section style={{ padding: "80px clamp(24px, 5vw, 80px)", borderBottom: "1px solid var(--tone-border)" }}>
          <Reveal>
            <SectionEyebrow text="THE MVP — CONTRACT INTAKE & REVIEW" />
            <h2 style={{ fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 700, color: "var(--tone-text-strong)", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
              One workflow. All five services. One audit trail.
            </h2>
            <p style={{ fontSize: "14px", color: "var(--tone-muted)", margin: "0 0 12px", maxWidth: "600px", lineHeight: 1.7 }}>
              The Phase 2 MVP is a Contract Intake and Review workflow — the narrowest, highest-value path to proving
              the platform thesis. It requires orchestration across all five existing capability services in sequence.
            </p>
            <p style={{ fontSize: "13px", color: "var(--tone-dim-2)", margin: "0 0 48px", fontStyle: "italic" }}>
              Hover a step to see its output object.
            </p>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {MVP_STEPS.map((step, i) => (
              <Reveal key={step.n} delay={i * 40}>
                <div
                  onMouseEnter={() => setActiveStep(i)}
                  onMouseLeave={() => setActiveStep(null)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "60px 180px 1fr 1fr",
                    gap: "0",
                    borderRadius: "6px",
                    background: activeStep === i ? "var(--tone-surface)" : "transparent",
                    border: `1px solid ${activeStep === i ? "var(--tone-border)" : "transparent"}`,
                    cursor: "default",
                    transition: "all 0.15s",
                    padding: "12px 0",
                    alignItems: "center",
                  }}
                >
                  {/* Step number */}
                  <div style={{
                    paddingLeft: "8px",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "10px", fontWeight: 700,
                    color: activeStep === i ? step.color : "var(--tone-dim)",
                    transition: "color 0.15s",
                  }}>
                    {step.n}
                  </div>

                  {/* Actor */}
                  <div style={{
                    fontSize: "12px", fontWeight: 700,
                    color: activeStep === i ? step.color : "var(--tone-dim-2)",
                    transition: "color 0.15s",
                    paddingLeft: "8px",
                  }}>
                    {step.actor}
                  </div>

                  {/* Action */}
                  <div style={{
                    fontSize: "13px",
                    color: activeStep === i ? "var(--tone-text)" : "var(--tone-muted)",
                    transition: "color 0.15s",
                    paddingLeft: "8px",
                  }}>
                    {step.action}
                  </div>

                  {/* Output */}
                  <div style={{
                    fontSize: "12px",
                    color: activeStep === i ? step.color : "var(--tone-dim)",
                    transition: "color 0.15s",
                    paddingLeft: "8px",
                    fontFamily: activeStep === i ? "'DM Mono', monospace" : "inherit",
                    opacity: activeStep === i ? 1 : 0.5,
                  }}>
                    ↳ {step.out}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Timeline note */}
          <Reveal delay={200}>
            <div style={{
              marginTop: "40px",
              display: "flex", gap: "24px", flexWrap: "wrap",
              padding: "20px 24px",
              background: "var(--tone-surface)", border: "1px solid var(--tone-border)",
              borderRadius: "8px",
              alignItems: "center",
            }}>
              {[
                { label: "P0 Validation", dur: "2–3 wks", color: "var(--tone-muted)" },
                { label: "P1 Design", dur: "3–4 wks", color: "#4F7EF7" },
                { label: "P2 MVP Build", dur: "6–8 wks", color: "#00D4AA" },
                { label: "P3 Pilot", dur: "3–4 wks", color: "#9B6EF5" },
                { label: "P4 B2B Launch", dur: "4–6 wks", color: "#E8A020" },
              ].map((p, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {i > 0 && <span style={{ color: "var(--tone-border)", fontSize: "12px" }}>›</span>}
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: p.color }}>{p.label}</span>
                    <span style={{ fontSize: "10px", color: "var(--tone-dim)", fontFamily: "'DM Mono', monospace" }}>{p.dur}</span>
                  </div>
                </div>
              ))}
              <div style={{ marginLeft: "auto", fontSize: "12px", color: "var(--tone-muted)" }}>
                18–27 weeks → first B2B pilot conversation
              </div>
            </div>
          </Reveal>
        </section>

        {/* ══ DIAGRAMS ════════════════════════════════════════ */}
        {executiveDiagrams.length > 0 && (
          <section style={{ padding: "80px clamp(24px, 5vw, 80px)", borderBottom: "1px solid var(--tone-border)" }}>
            <Reveal>
              <SectionEyebrow text="EXECUTIVE DIAGRAM SET" />
              <h2 style={{ fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 700, color: "var(--tone-text-strong)", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
                Architecture in four pictures.
              </h2>
              <p style={{ fontSize: "14px", color: "var(--tone-muted)", margin: "0 0 48px", maxWidth: "520px", lineHeight: 1.7 }}>
                Use these during the presentation. Each diagram is sequenced to support the narrative — start with the shift, walk the context, reveal the layers, close with the product surfaces.
              </p>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", gap: "16px" }}>
              {executiveDiagrams.map((d, i) => (
                <Reveal key={d.id} delay={i * 80}>
                  {(() => {
                    const previewSrc = getDiagramPreview(d.id);
                    return (
                  <div style={{
                    background: "var(--tone-surface)",
                    border: "1px solid var(--tone-border)",
                    borderRadius: "12px", overflow: "hidden",
                    transition: "border-color 0.2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = "var(--tone-dim)"}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "var(--tone-border)"}
                  >
                    <div style={{
                      aspectRatio: "16/9", background: "var(--tone-surface-2)",
                      borderBottom: "1px solid var(--tone-border)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      position: "relative", overflow: "hidden",
                    }}>
                      {previewSrc ? (
                        <img
                          src={previewSrc} alt={d.title}
                          style={{ width: "100%", height: "100%", objectFit: "contain", padding: "12px" }}
                        />
                      ) : (
                        <div style={{ fontSize: "12px", color: "var(--tone-dim)", fontFamily: "'DM Mono', monospace" }}>
                          {d.id}
                        </div>
                      )}
                      <div style={{
                        position: "absolute", top: "10px", left: "10px",
                        padding: "3px 8px", borderRadius: "4px",
                        background: "var(--tone-bg-overlay)", border: "1px solid var(--tone-border)",
                        fontSize: "9px", color: "var(--tone-muted)", fontFamily: "'DM Mono', monospace",
                      }}>
                        {String(i + 1).padStart(2, "0")}/{String(executiveDiagrams.length).padStart(2, "0")}
                      </div>
                    </div>
                    <div style={{ padding: "20px 24px" }}>
                      <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--tone-text)", marginBottom: "8px" }}>{d.title}</div>
                      {d.purpose && <div style={{ fontSize: "12px", color: "var(--tone-muted)", lineHeight: 1.6 }}>{d.purpose}</div>}
                    </div>
                  </div>
                    );
                  })()}
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* ══ THE ASK ═════════════════════════════════════════ */}
        <section style={{ padding: "80px clamp(24px, 5vw, 80px)", borderBottom: "1px solid var(--tone-border)" }}>
          <Reveal>
            <SectionEyebrow text="THE ASK" color="#00D4AA" />
            <h2 style={{ fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 700, color: "var(--tone-text-strong)", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
              Four decisions. Not a full platform build.
            </h2>
            <p style={{ fontSize: "14px", color: "var(--tone-muted)", margin: "0 0 48px", maxWidth: "600px", lineHeight: 1.7 }}>
              This proposal doesn't ask for a reorganisation, a new team, or a full platform rebuild. It asks for
              four specific decisions that unlock the first proof-of-concept without disrupting anything that currently works.
            </p>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
            {THE_ASK.map((ask, i) => (
              <Reveal key={i} delay={i * 80}>
                <div
                  onMouseEnter={() => setHoveredAsk(i)}
                  onMouseLeave={() => setHoveredAsk(null)}
                  style={{
                    background: "var(--tone-surface)",
                    border: `1px solid ${hoveredAsk === i ? ask.color + "50" : "var(--tone-border)"}`,
                    borderRadius: "12px", padding: "28px",
                    cursor: "default",
                    transition: "all 0.2s",
                    transform: hoveredAsk === i ? "translateY(-3px)" : "translateY(0)",
                    boxShadow: hoveredAsk === i ? `0 16px 48px ${ask.color}15` : "none",
                    height: "100%", boxSizing: "border-box",
                    position: "relative", overflow: "hidden",
                  }}
                >
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                    background: `linear-gradient(90deg, ${ask.color}, transparent)`,
                    opacity: hoveredAsk === i ? 1 : 0.3,
                    transition: "opacity 0.2s",
                  }} />
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "8px",
                    background: `${ask.color}12`, border: `1px solid ${ask.color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'DM Mono', monospace", fontWeight: 700,
                    fontSize: "13px", color: ask.color,
                    marginBottom: "20px",
                  }}>
                    {ask.num}
                  </div>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--tone-text-strong)", marginBottom: "12px", letterSpacing: "-0.01em" }}>
                    {ask.title}
                  </div>
                  <div style={{ fontSize: "13px", color: "var(--tone-subtle)", lineHeight: 1.7 }}>
                    {ask.body}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Closing statement */}
          <Reveal delay={200}>
            <div style={{
              marginTop: "40px",
              padding: "32px 36px",
              background: "linear-gradient(135deg, var(--tone-surface), var(--tone-surface-2))",
              border: "1px solid var(--tone-border)",
              borderRadius: "12px",
              borderLeft: "3px solid #00D4AA",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: 0, right: 0, width: "50%", height: "100%",
                background: "radial-gradient(ellipse at 100% 50%, #00D4AA06, transparent 60%)",
                pointerEvents: "none",
              }} />
              <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "#00D4AA", marginBottom: "12px", fontFamily: "'DM Mono', monospace" }}>
                CLOSING STATEMENT
              </div>
              <p style={{ fontSize: "clamp(1rem, 1.8vw, 1.15rem)", color: "var(--tone-subtle-strong)", lineHeight: 1.75, margin: 0, maxWidth: "680px", position: "relative" }}>
                We are not asking to rebuild Esheria. We are asking for permission to prove that what Esheria
                has already built can operate as one coherent system — and that this coherence creates the
                enterprise story that drives the next phase of growth.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ══ FOOTER NAV ══════════════════════════════════════ */}
        <section style={{ padding: "48px clamp(24px, 5vw, 80px) 64px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
            <div style={{ fontSize: "11px", color: "var(--tone-dim)", fontFamily: "'DM Mono', monospace" }}>
              {meta.platformName} · v{meta.version} · Executive Brief
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <Link to="/blueprint" style={{ textDecoration: "none" }}>
                <div style={{
                  padding: "11px 24px", borderRadius: "8px",
                  background: "#00D4AA", color: "var(--tone-bg)",
                  fontWeight: 700, fontSize: "13px",
                  cursor: "pointer", transition: "all 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                >
                  Technical Blueprint →
                </div>
              </Link>
              <Link to="/explorer" style={{ textDecoration: "none" }}>
                <div style={{
                  padding: "11px 24px", borderRadius: "8px",
                  border: "1px solid var(--tone-border)", background: "var(--tone-surface)",
                  color: "var(--tone-subtle)", fontWeight: 600, fontSize: "13px",
                  cursor: "pointer", transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--tone-dim)"; e.currentTarget.style.color = "var(--tone-text)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--tone-border)"; e.currentTarget.style.color = "var(--tone-subtle)"; }}
                >
                  Architecture Explorer
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&family=DM+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; }
        ::selection { background: #00D4AA20; color: var(--tone-text-strong); }
      `}</style>
    </div>
  );
}
