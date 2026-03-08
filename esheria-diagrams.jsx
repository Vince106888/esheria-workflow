import { useState } from "react";

// ─── DESIGN TOKENS ───────────────────────────────────────────────
const C = {
  bg: "#07090F",
  surface: "#0D1018",
  surface2: "#111520",
  border: "#1A2035",
  borderBright: "#243050",
  accent: "#00D4AA",
  accentDim: "#00D4AA22",
  blue: "#4F7EF7",
  blueDim: "#4F7EF720",
  amber: "#E8A020",
  amberDim: "#E8A02018",
  rose: "#E8506A",
  roseDim: "#E8506A18",
  violet: "#9B6EF5",
  violetDim: "#9B6EF518",
  text: "#D8E2F0",
  muted: "#586070",
  muted2: "#3A4255",
  white: "#F0F4FF",
};

const F = {
  mono: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
  sans: "'DM Sans', 'Segoe UI', sans-serif",
};

// ─── SHARED PRIMITIVES ───────────────────────────────────────────

function Box({ x, y, w, h, color = C.border, bg, children, style = {} }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={3}
        fill={bg || C.surface2} stroke={color} strokeWidth={1} style={style} />
      {children}
    </g>
  );
}

function Label({ x, y, text, color = C.muted, size = 10, weight = "normal", anchor = "middle", fontFamily = F.mono }) {
  return (
    <text x={x} y={y} fill={color} fontSize={size} fontWeight={weight}
      textAnchor={anchor} fontFamily={fontFamily} dominantBaseline="middle">
      {text}
    </text>
  );
}

function Arrow({ x1, y1, x2, y2, color = C.muted2, dashed = false, label = "", bidirectional = false }) {
  const id = `arr-${Math.random().toString(36).slice(2)}`;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  return (
    <g>
      <defs>
        <marker id={id} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill={color} />
        </marker>
      </defs>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={1.5}
        strokeDasharray={dashed ? "4 3" : undefined}
        markerEnd={`url(#${id})`} />
      {label && <text x={mx} y={my - 6} fill={color} fontSize={9} textAnchor="middle" fontFamily={F.mono}>{label}</text>}
    </g>
  );
}

function Chip({ x, y, w = 90, h = 22, text, color = C.accent, bg }) {
  return (
    <g>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={2}
        fill={bg || `${color}18`} stroke={color} strokeWidth={1} />
      <text x={x} y={y} fill={color} fontSize={9} textAnchor="middle"
        fontFamily={F.mono} dominantBaseline="middle" fontWeight="600">
        {text}
      </text>
    </g>
  );
}

// ─── PAGE WRAPPER ─────────────────────────────────────────────────

function Page({ num, title, subtitle, children, wide = false }) {
  return (
    <div style={{
      background: C.bg,
      minHeight: "100vh",
      padding: wide ? "48px 32px" : "48px",
      position: "relative",
      borderBottom: `1px solid ${C.border}`,
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "flex-start",
        marginBottom: "32px", flexWrap: "wrap", gap: "12px",
      }}>
        <div>
          <div style={{ fontFamily: F.mono, fontSize: "10px", letterSpacing: "4px", color: C.accent, marginBottom: "6px" }}>
            {String(num).padStart(2, "0")} / 10
          </div>
          <div style={{ fontFamily: F.mono, fontSize: "22px", fontWeight: "700", color: C.white, letterSpacing: "-0.5px" }}>
            {title}
          </div>
          {subtitle && <div style={{ fontFamily: F.mono, fontSize: "11px", color: C.muted, marginTop: "4px" }}>{subtitle}</div>}
        </div>
        <div style={{ fontFamily: F.mono, fontSize: "10px", color: C.muted, letterSpacing: "2px", textAlign: "right" }}>
          ESHERIA LEGAL WORKFLOW OS<br />
          <span style={{ color: C.muted2 }}>ARCHITECTURE BLUEPRINT · CONFIDENTIAL</span>
        </div>
      </div>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PAGE 1 — THESIS
// ═══════════════════════════════════════════════════════════════════
function P1_Thesis() {
  return (
    <Page num={1} title="Platform Thesis" subtitle="The strategic shift — from features to operating system">
      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
        {/* Big statement */}
        <div style={{ flex: "1 1 100%", background: C.surface, border: `1px solid ${C.borderBright}`, borderLeft: `4px solid ${C.accent}`, padding: "32px 40px", marginBottom: "8px" }}>
          <div style={{ fontFamily: F.mono, fontSize: "11px", letterSpacing: "4px", color: C.accent, marginBottom: "12px" }}>CORE THESIS</div>
          <div style={{ fontFamily: F.sans, fontSize: "clamp(18px,2.5vw,28px)", fontWeight: "700", color: C.white, lineHeight: 1.3 }}>
            Esheria's strongest long-term moat is not another legal AI feature.
            <br />
            <span style={{ color: C.accent }}>It is becoming the programmable operating layer</span> through which organisations run intelligent legal workflows.
          </div>
        </div>

        {/* FROM → TO */}
        <div style={{ flex: "1 1 420px" }}>
          <svg viewBox="0 0 520 320" style={{ width: "100%", overflow: "visible" }}>
            {/* FROM column */}
            <Label x={80} y={20} text="FROM" color={C.muted} size={10} weight="700" />
            {["Legal AI Chat", "OCR Service", "Contract Engine", "Drafting Tool", "Analytics"].map((label, i) => (
              <g key={label}>
                <rect x={10} y={35 + i * 46} width={140} height={34} rx={3}
                  fill={C.surface2} stroke={C.border} strokeWidth={1} />
                <text x={80} y={52 + i * 46} fill={C.muted} fontSize={10}
                  textAnchor="middle" fontFamily={F.mono} dominantBaseline="middle">{label}</text>
              </g>
            ))}
            {/* Arrow */}
            <defs>
              <marker id="bigArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L0,8 L8,4 z" fill={C.accent} />
              </marker>
            </defs>
            <line x1={162} y1={155} x2={210} y2={155} stroke={C.accent} strokeWidth={2.5} markerEnd="url(#bigArrow)" />
            <text x={186} y={145} fill={C.accent} fontSize={9} textAnchor="middle" fontFamily={F.mono}>EVOLVES TO</text>

            {/* TO */}
            <Label x={370} y={20} text="TO" color={C.accent} size={10} weight="700" />
            <rect x={220} y={60} width={280} height={190} rx={4}
              fill={`${C.accent}0A`} stroke={C.accent} strokeWidth={1.5} />
            <text x={360} y={120} fill={C.accent} fontSize={14} textAnchor="middle"
              fontFamily={F.mono} fontWeight="700" dominantBaseline="middle">LEGAL WORKFLOW</text>
            <text x={360} y={142} fill={C.accent} fontSize={14} textAnchor="middle"
              fontFamily={F.mono} fontWeight="700" dominantBaseline="middle">OPERATING SYSTEM</text>
            <rect x={250} y={160} width={220} height={1} fill={C.accent} opacity={0.3} />
            {["Programmable workflows", "Shared business objects", "Agent orchestration", "Enterprise audit trails"].map((t, i) => (
              <text key={t} x={260} y={178 + i * 16} fill={C.muted} fontSize={9}
                fontFamily={F.mono} dominantBaseline="middle">▸ {t}</text>
            ))}
          </svg>
        </div>

        {/* Why now cards */}
        <div style={{ flex: "1 1 260px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {[
            { label: "B2B REALITY", text: "Enterprise buyers want workflow outcomes, not isolated AI demos. They need audit, approvals, compliance, and reporting.", color: C.blue },
            { label: "TIMING", text: "Esheria already has OCR, contract engine, drafting, research, and analytics. The missing layer is orchestration.", color: C.amber },
            { label: "MOAT", text: "Workflows embedded in enterprise processes are orders of magnitude harder to replace than point features.", color: C.accent },
            { label: "ASK", text: "Greenlight a narrow Contract Intake & Review MVP that proves the platform thesis on top of current capabilities.", color: C.rose },
          ].map((c) => (
            <div key={c.label} style={{ background: C.surface, border: `1px solid ${C.border}`, borderLeft: `3px solid ${c.color}`, padding: "12px 16px" }}>
              <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "3px", color: c.color, marginBottom: "6px" }}>{c.label}</div>
              <div style={{ fontFamily: F.mono, fontSize: "11px", color: C.muted, lineHeight: 1.6 }}>{c.text}</div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PAGE 2 — SYSTEM CONTEXT DIAGRAM
// ═══════════════════════════════════════════════════════════════════
function P2_SystemContext() {
  return (
    <Page num={2} title="System Context Diagram" subtitle="Who uses the platform, what they touch, and how it connects">
      <svg viewBox="0 0 900 540" style={{ width: "100%", maxHeight: "560px", overflow: "visible" }}>
        {/* ── Background zones ── */}
        <rect x={0} y={0} width={900} height={540} fill={C.bg} />

        {/* Platform core — center */}
        <rect x={300} y={165} width={300} height={220} rx={6}
          fill={`${C.accent}08`} stroke={C.accent} strokeWidth={1.5} strokeDasharray="0" />
        <text x={450} y={185} fill={C.accent} fontSize={10} textAnchor="middle"
          fontFamily={F.mono} letterSpacing={3} fontWeight="700">ESHERIA PLATFORM CORE</text>

        {/* Platform boxes */}
        {[
          { label: "Auth & Tenant Mgmt", y: 200 },
          { label: "Workflow Engine", y: 232 },
          { label: "Canonical Object Model", y: 264 },
          { label: "Connector Gateway", y: 296 },
          { label: "Audit & Event Service", y: 328 },
        ].map(({ label, y }) => (
          <g key={label}>
            <rect x={316} y={y} width={268} height={22} rx={2}
              fill={`${C.accent}12`} stroke={`${C.accent}40`} strokeWidth={1} />
            <text x={450} y={y + 11} fill={C.accent} fontSize={9} textAnchor="middle"
              fontFamily={F.mono} dominantBaseline="middle">{label}</text>
          </g>
        ))}

        {/* ── LEFT: External users ── */}
        {/* Institution users */}
        <rect x={20} y={60} width={160} height={90} rx={4}
          fill={`${C.blue}10`} stroke={`${C.blue}60`} strokeWidth={1} />
        <text x={100} y={80} fill={C.blue} fontSize={10} textAnchor="middle" fontFamily={F.mono} fontWeight="700">INSTITUTION</text>
        <text x={100} y={96} fill={C.blue} fontSize={10} textAnchor="middle" fontFamily={F.mono} fontWeight="700">USERS</text>
        <text x={100} y={114} fill={C.muted} fontSize={8.5} textAnchor="middle" fontFamily={F.mono}>Legal teams, compliance,</text>
        <text x={100} y={126} fill={C.muted} fontSize={8.5} textAnchor="middle" fontFamily={F.mono}>procurement, banks</text>

        {/* Esheria operators */}
        <rect x={20} y={220} width={160} height={80} rx={4}
          fill={`${C.rose}10`} stroke={`${C.rose}60`} strokeWidth={1} />
        <text x={100} y={240} fill={C.rose} fontSize={10} textAnchor="middle" fontFamily={F.mono} fontWeight="700">ESHERIA</text>
        <text x={100} y={256} fill={C.rose} fontSize={10} textAnchor="middle" fontFamily={F.mono} fontWeight="700">OPERATORS</text>
        <text x={100} y={276} fill={C.muted} fontSize={8.5} textAnchor="middle" fontFamily={F.mono}>Ops, support, engineering</text>

        {/* Public / demo */}
        <rect x={20} y={370} width={160} height={70} rx={4}
          fill={`${C.amber}10`} stroke={`${C.amber}50`} strokeWidth={1} />
        <text x={100} y={395} fill={C.amber} fontSize={10} textAnchor="middle" fontFamily={F.mono} fontWeight="700">PUBLIC / DEMO</text>
        <text x={100} y={414} fill={C.muted} fontSize={8.5} textAnchor="middle" fontFamily={F.mono}>Prospects, signups</text>

        {/* Arrows: users → platform */}
        {[
          { y1: 105, y2: 250, color: C.blue, label: "workspace API" },
          { y1: 260, y2: 280, color: C.rose, label: "operator API" },
          { y1: 405, y2: 330, color: C.amber, label: "public API" },
        ].map(({ y1, y2, color, label }, i) => (
          <g key={i}>
            <defs>
              <marker id={`ctx${i}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 z" fill={color} />
              </marker>
            </defs>
            <line x1={182} y1={y1} x2={298} y2={y2} stroke={color} strokeWidth={1.5}
              strokeDasharray="4 3" markerEnd={`url(#ctx${i})`} />
            <text x={240} y={(y1 + y2) / 2 - 6} fill={color} fontSize={8} textAnchor="middle" fontFamily={F.mono}>{label}</text>
          </g>
        ))}

        {/* ── RIGHT: Existing services ── */}
        {[
          { label: "esheria-ai", sub: "Research & Retrieval", y: 60, color: C.accent },
          { label: "esheria-ocr", sub: "Document Ingestion", y: 135, color: C.accent },
          { label: "contract-engine", sub: "Compliance & Clauses", y: 210, color: C.accent },
          { label: "lexdraft", sub: "Drafting & Redlines", y: 285, color: C.accent },
          { label: "esheria-analytics", sub: "Analytics Pipeline", y: 360, color: C.accent },
        ].map(({ label, sub, y, color }) => (
          <g key={label}>
            <rect x={720} y={y} width={160} height={56} rx={3}
              fill={`${color}0A`} stroke={`${color}50`} strokeWidth={1} />
            <text x={800} y={y + 20} fill={color} fontSize={10} textAnchor="middle" fontFamily={F.mono} fontWeight="700">{label}</text>
            <text x={800} y={y + 38} fill={C.muted} fontSize={8.5} textAnchor="middle" fontFamily={F.mono}>{sub}</text>
          </g>
        ))}

        {/* Arrows: platform → services */}
        {[88, 163, 238, 313, 388].map((y, i) => (
          <g key={i}>
            <defs>
              <marker id={`svc${i}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 z" fill={C.accent} />
              </marker>
            </defs>
            <line x1={602} y1={260 + (i - 2) * 28} x2={718} y2={y + 28}
              stroke={C.accent} strokeWidth={1} strokeDasharray="4 3" markerEnd={`url(#svc${i})`} />
          </g>
        ))}

        {/* ── BOTTOM: External enterprise systems ── */}
        <rect x={200} y={460} width={500} height={60} rx={4}
          fill={`${C.violet}0A`} stroke={`${C.violet}40`} strokeWidth={1} strokeDasharray="5 3" />
        <text x={450} y={480} fill={C.violet} fontSize={9} textAnchor="middle" fontFamily={F.mono} fontWeight="700" letterSpacing={2}>EXTERNAL ENTERPRISE SYSTEMS</text>
        {["DMS", "CRM", "ERP", "E-Sign", "Legal Research", "Email / SSO"].map((s, i) => (
          <text key={s} x={230 + i * 85} y={500} fill={C.muted} fontSize={8.5}
            textAnchor="middle" fontFamily={F.mono}>{s}</text>
        ))}
        <defs>
          <marker id="extArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill={C.violet} />
          </marker>
        </defs>
        <line x1={450} y1={387} x2={450} y2={458} stroke={C.violet} strokeWidth={1.5}
          strokeDasharray="4 3" markerEnd="url(#extArrow)" />
        <text x={464} y={422} fill={C.violet} fontSize={8} fontFamily={F.mono}>integrations</text>
      </svg>
    </Page>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PAGE 3 — LAYERED ARCHITECTURE DIAGRAM
// ═══════════════════════════════════════════════════════════════════
function P3_LayeredArch() {
  const layers = [
    { label: "L5 — EXPERIENCE", sub: "Customer Workspace · Operator Console · Public Surface", color: C.blue, boxes: ["Institution Workspace", "Esheria Operator Console", "Public / Sales Surface"], y: 40 },
    { label: "L4 — WORKFLOW CONTROL PLANE", sub: "Workflow Engine · State Machine · Approval Router · Escalation · Audit Log", color: C.accent, boxes: ["Workflow Engine", "State Machine Runtime", "Approval Router", "Escalation Manager", "Audit / Event Log"], y: 145 },
    { label: "L3 — CANONICAL OBJECT MODEL", sub: "Org · Matter · Document · Clause · Risk · WorkflowRun · Action · Review · Citation", color: C.violet, boxes: ["Organization", "Matter", "Document", "Clause", "Risk", "WorkflowRun", "Action", "Review", "Citation"], y: 250 },
    { label: "L2 — CAPABILITY CONNECTORS", sub: "Stable internal API gateway — frontends never call services directly", color: C.amber, boxes: ["OCR Connector", "Contract Connector", "Drafting Connector", "Research Connector", "Analytics Connector"], y: 355 },
    { label: "L1 — EXISTING SERVICES", sub: "Current Esheria repos — plugged in, not rebuilt", color: C.muted, boxes: ["esheria-ocr", "esheria-contract-engine", "esheria-ai", "lexdraft", "esheria-analytics", "lexchat-plugin"], y: 460 },
  ];

  return (
    <Page num={3} title="Layered Architecture" subtitle="The hero diagram — 5 horizontal layers from services to experience">
      <svg viewBox="0 0 900 580" style={{ width: "100%", overflow: "visible" }}>
        <rect x={0} y={0} width={900} height={580} fill={C.bg} />

        {layers.map((layer, li) => {
          const bw = Math.floor(760 / layer.boxes.length) - 8;
          return (
            <g key={layer.label}>
              {/* Layer background */}
              <rect x={130} y={layer.y} width={760} height={80} rx={4}
                fill={`${layer.color}08`} stroke={`${layer.color}30`} strokeWidth={1} />

              {/* Layer label */}
              <text x={8} y={layer.y + 28} fill={layer.color} fontSize={9.5}
                fontFamily={F.mono} fontWeight="700" writingMode="horizontal-tb">{layer.label}</text>
              <text x={8} y={layer.y + 44} fill={C.muted} fontSize={7.5}
                fontFamily={F.mono}>{layer.sub.split("·")[0]}</text>

              {/* Boxes */}
              {layer.boxes.map((box, bi) => {
                const bx = 138 + bi * (bw + 8);
                return (
                  <g key={box}>
                    <rect x={bx} y={layer.y + 14} width={bw} height={52} rx={3}
                      fill={C.surface} stroke={`${layer.color}50`} strokeWidth={1} />
                    <text x={bx + bw / 2} y={layer.y + 40} fill={layer.color}
                      fontSize={9} textAnchor="middle" fontFamily={F.mono}
                      dominantBaseline="middle">{box}</text>
                  </g>
                );
              })}

              {/* Connector arrows between layers */}
              {li < layers.length - 1 && (
                <g>
                  <defs>
                    <marker id={`la${li}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                      <path d="M0,0 L0,6 L6,3 z" fill={layer.color} />
                    </marker>
                  </defs>
                  <line x1={510} y1={layer.y + 80} x2={510} y2={layers[li + 1].y}
                    stroke={layer.color} strokeWidth={1} strokeDasharray="4 3" markerEnd={`url(#la${li})`} />
                </g>
              )}
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div style={{ display: "flex", gap: "24px", marginTop: "12px", flexWrap: "wrap" }}>
        {[["L5", C.blue, "Frontends"], ["L4", C.accent, "Orchestration"], ["L3", C.violet, "Object Model"], ["L2", C.amber, "Connectors"], ["L1", C.muted, "Existing Services"]].map(([l, c, label]) => (
          <div key={l} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <div style={{ width: "12px", height: "12px", background: `${c}30`, border: `1px solid ${c}`, borderRadius: "2px" }} />
            <span style={{ fontFamily: F.mono, fontSize: "10px", color: C.muted }}>{l} — {label}</span>
          </div>
        ))}
      </div>
    </Page>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PAGE 4 — CONTROL PLANE vs DATA PLANE
// ═══════════════════════════════════════════════════════════════════
function P4_ControlVsData() {
  return (
    <Page num={4} title="Control Plane vs Data Plane" subtitle="Architectural distinction between governance and execution">
      <svg viewBox="0 0 900 460" style={{ width: "100%", overflow: "visible" }}>
        <rect x={0} y={0} width={900} height={460} fill={C.bg} />

        {/* Divider */}
        <line x1={450} y1={20} x2={450} y2={440} stroke={C.border} strokeWidth={1.5} strokeDasharray="6 4" />
        <text x={450} y={10} fill={C.muted} fontSize={9} textAnchor="middle" fontFamily={F.mono} letterSpacing={2}>ARCHITECTURAL BOUNDARY</text>

        {/* ── CONTROL PLANE (left) ── */}
        <text x={220} y={38} fill={C.blue} fontSize={13} textAnchor="middle" fontFamily={F.mono} fontWeight="700">CONTROL PLANE</text>
        <text x={220} y={54} fill={C.muted} fontSize={9} textAnchor="middle" fontFamily={F.mono}>Governance, orchestration, policy</text>
        <rect x={20} y={62} width={408} height={360} rx={4}
          fill={`${C.blue}05`} stroke={`${C.blue}25`} strokeWidth={1} />

        {[
          { label: "Tenant & Identity Management", sub: "Org isolation · User roles · Auth boundaries", color: C.blue },
          { label: "Workflow Orchestration Engine", sub: "State machines · Step routing · Transitions", color: C.blue },
          { label: "Approval & Escalation Router", sub: "Human-in-loop · SLA enforcement · Overrides", color: C.accent },
          { label: "Policy & Governance Rules", sub: "Permissions · Data retention · Audit policy", color: C.accent },
          { label: "Audit & Event Log (Immutable)", sub: "Actor tracking · Evidence chain · Timestamps", color: C.violet },
          { label: "Observability & Monitoring", sub: "Workflow health · Failed runs · SLA breaches", color: C.violet },
          { label: "Operator Control Console", sub: "Tenant ops · Support interventions · Billing", color: C.rose },
        ].map(({ label, sub, color }, i) => (
          <g key={label}>
            <rect x={32} y={76 + i * 48} width={384} height={38} rx={3}
              fill={`${color}10`} stroke={`${color}35`} strokeWidth={1} />
            <text x={50} y={90 + i * 48} fill={color} fontSize={10}
              fontFamily={F.mono} fontWeight="700" dominantBaseline="middle">{label}</text>
            <text x={50} y={106 + i * 48} fill={C.muted} fontSize={8.5}
              fontFamily={F.mono} dominantBaseline="middle">{sub}</text>
          </g>
        ))}

        {/* ── DATA PLANE (right) ── */}
        <text x={680} y={38} fill={C.accent} fontSize={13} textAnchor="middle" fontFamily={F.mono} fontWeight="700">DATA PLANE</text>
        <text x={680} y={54} fill={C.muted} fontSize={9} textAnchor="middle" fontFamily={F.mono}>Capability execution, processing</text>
        <rect x={472} y={62} width={408} height={360} rx={4}
          fill={`${C.accent}05`} stroke={`${C.accent}25`} strokeWidth={1} />

        {[
          { label: "OCR / Document Ingestion", sub: "File parsing · Text extraction · Structure detect", color: C.accent },
          { label: "Extraction Engine", sub: "Clause parsing · Entity detection · Metadata", color: C.accent },
          { label: "Compliance / Contract Engine", sub: "Policy checking · Regulation matching · Scoring", color: C.amber },
          { label: "Legal Research & Retrieval", sub: "Precedent lookup · Citation generation · RAG", color: C.amber },
          { label: "Drafting & Redline Engine", sub: "Content generation · Redlines · Suggestions", color: C.violet },
          { label: "Review Summarisation", sub: "Finding compilation · Briefing prep · Scoring", color: C.violet },
          { label: "Analytics Event Processing", sub: "Metric ingestion · Aggregation · Reporting data", color: C.rose },
        ].map(({ label, sub, color }, i) => (
          <g key={label}>
            <rect x={484} y={76 + i * 48} width={384} height={38} rx={3}
              fill={`${color}10`} stroke={`${color}35`} strokeWidth={1} />
            <text x={502} y={90 + i * 48} fill={color} fontSize={10}
              fontFamily={F.mono} fontWeight="700" dominantBaseline="middle">{label}</text>
            <text x={502} y={106 + i * 48} fill={C.muted} fontSize={8.5}
              fontFamily={F.mono} dominantBaseline="middle">{sub}</text>
          </g>
        ))}

        {/* Cross-boundary arrows */}
        {[2, 4].map((i) => (
          <g key={i}>
            <defs>
              <marker id={`cpArrow${i}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 z" fill={C.muted} />
              </marker>
            </defs>
            <line x1={418} y1={92 + i * 48} x2={482} y2={92 + i * 48}
              stroke={C.muted2} strokeWidth={1} strokeDasharray="3 2" markerEnd={`url(#cpArrow${i})`} />
          </g>
        ))}
      </svg>
    </Page>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PAGE 5 — WORKFLOW SEQUENCE DIAGRAM
// ═══════════════════════════════════════════════════════════════════
function P5_WorkflowSequence() {
  const actors = ["User", "Ingestion Op", "Extraction Op", "Compliance Op", "Research Op", "Drafting Op", "Review Op", "Human Reviewer", "Analytics Op"];
  const actorColors = [C.blue, C.accent, C.accent, C.amber, C.amber, C.violet, C.violet, C.rose, C.muted];
  const W = 900, H = 560;
  const colW = W / (actors.length);
  const xs = actors.map((_, i) => colW * i + colW / 2);

  const steps = [
    { from: 0, to: 1, y: 110, label: "upload document", output: "WorkflowRun created" },
    { from: 1, to: 1, y: 155, label: "trigger OCR", output: "raw text extracted", self: true },
    { from: 1, to: 2, y: 185, label: "pass parsed content", output: "" },
    { from: 2, to: 2, y: 215, label: "extract clauses & parties", output: "Clause objects", self: true },
    { from: 2, to: 3, y: 245, label: "send clauses for compliance", output: "" },
    { from: 3, to: 3, y: 275, label: "check policies/regs", output: "Risk objects", self: true },
    { from: 3, to: 4, y: 305, label: "request citations", output: "" },
    { from: 4, to: 4, y: 335, label: "retrieve precedents", output: "Citation objects", self: true },
    { from: 4, to: 5, y: 365, label: "request drafting suggestions", output: "" },
    { from: 5, to: 6, y: 395, label: "send drafts + findings", output: "Review packet" },
    { from: 6, to: 7, y: 425, label: "request human review", output: "" },
    { from: 7, to: 7, y: 455, label: "review, decide, annotate", output: "Decision logged", self: true },
    { from: 7, to: 8, y: 485, label: "decision event emitted", output: "Analytics updated" },
  ];

  return (
    <Page num={5} title="Workflow Sequence: Contract Intake & Review" subtitle="Runtime execution path — actor by actor, step by step">
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", overflow: "visible" }}>
        <rect x={0} y={0} width={W} height={H} fill={C.bg} />

        {/* Actor headers */}
        {actors.map((a, i) => (
          <g key={a}>
            <rect x={xs[i] - colW / 2 + 3} y={8} width={colW - 6} height={50} rx={3}
              fill={`${actorColors[i]}15`} stroke={`${actorColors[i]}50`} strokeWidth={1} />
            <text x={xs[i]} y={30} fill={actorColors[i]} fontSize={8.5}
              textAnchor="middle" fontFamily={F.mono} fontWeight="700" dominantBaseline="middle">
              {a.split(" ")[0]}
            </text>
            <text x={xs[i]} y={46} fill={C.muted} fontSize={7.5}
              textAnchor="middle" fontFamily={F.mono} dominantBaseline="middle">
              {a.split(" ").slice(1).join(" ")}
            </text>
            {/* Lifeline */}
            <line x1={xs[i]} y1={60} x2={xs[i]} y2={H - 10}
              stroke={`${actorColors[i]}20`} strokeWidth={1} strokeDasharray="3 4" />
          </g>
        ))}

        {/* Steps */}
        {steps.map((s, i) => {
          const x1 = xs[s.from], x2 = xs[s.to];
          const color = actorColors[s.from];
          const isSelf = s.self || s.from === s.to;
          const id = `seq${i}`;
          return (
            <g key={i}>
              <defs>
                <marker id={id} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L6,3 z" fill={color} />
                </marker>
              </defs>
              {isSelf && !s.self ? null : isSelf ? (
                <>
                  <path d={`M${x1},${s.y} C${x1 + 40},${s.y} ${x1 + 40},${s.y + 20} ${x1},${s.y + 20}`}
                    fill="none" stroke={color} strokeWidth={1.5} markerEnd={`url(#${id})`} />
                </>
              ) : (
                <line x1={x1} y1={s.y} x2={x2} y2={s.y}
                  stroke={color} strokeWidth={1.5} markerEnd={`url(#${id})`} />
              )}

              {/* Label */}
              <text x={(x1 + x2) / 2 + (isSelf ? 24 : 0)} y={s.y - 7}
                fill={color} fontSize={8} textAnchor="middle" fontFamily={F.mono}>{s.label}</text>

              {/* Output badge */}
              {s.output && (
                <text x={x2 + (s.from < s.to ? 6 : -6)} y={s.y + 3}
                  fill={C.muted} fontSize={7.5} fontFamily={F.mono}
                  textAnchor={s.from < s.to ? "start" : "end"}>↳ {s.output}</text>
              )}
            </g>
          );
        })}
      </svg>
    </Page>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PAGE 6 — SERVICE INTEGRATION MAP
// ═══════════════════════════════════════════════════════════════════
function P6_ServiceIntegration() {
  return (
    <Page num={6} title="Service Integration Map" subtitle="How existing repos connect to the platform through the connector gateway">
      <svg viewBox="0 0 900 460" style={{ width: "100%", overflow: "visible" }}>
        <rect x={0} y={0} width={900} height={460} fill={C.bg} />

        {/* Platform Backend — center */}
        <rect x={310} y={120} width={280} height={220} rx={6}
          fill={`${C.accent}08`} stroke={C.accent} strokeWidth={1.5} />
        <text x={450} y={145} fill={C.accent} fontSize={10} textAnchor="middle"
          fontFamily={F.mono} fontWeight="700" letterSpacing={3}>PLATFORM BACKEND</text>

        {/* Connector gateway inside */}
        <rect x={326} y={158} width={248} height={28} rx={2}
          fill={`${C.amber}18`} stroke={`${C.amber}60`} strokeWidth={1} />
        <text x={450} y={172} fill={C.amber} fontSize={9} textAnchor="middle"
          fontFamily={F.mono} fontWeight="700">CONNECTOR GATEWAY</text>

        {["Workflow Engine", "Object Model Store", "Auth & Tenant", "Audit Log", "Analytics Events"].map((b, i) => (
          <g key={b}>
            <rect x={326} y={196 + i * 28} width={248} height={22} rx={2}
              fill={`${C.accent}10`} stroke={`${C.accent}30`} strokeWidth={1} />
            <text x={450} y={207 + i * 28} fill={C.accent} fontSize={8.5}
              textAnchor="middle" fontFamily={F.mono} dominantBaseline="middle">{b}</text>
          </g>
        ))}

        {/* ── LEFT: Internal services ── */}
        {[
          { label: "esheria-ocr", sub: "POST /internal/ocr/process", y: 60, color: C.accent },
          { label: "esheria-contract-engine", sub: "POST /internal/contracts/review", y: 170, color: C.amber },
          { label: "esheria-analytics", sub: "POST /internal/analytics/events", y: 280, color: C.rose },
        ].map(({ label, sub, y, color }) => (
          <g key={label}>
            <rect x={20} y={y} width={220} height={70} rx={3}
              fill={`${color}0A`} stroke={`${color}45`} strokeWidth={1} />
            <text x={130} y={y + 22} fill={color} fontSize={10} textAnchor="middle"
              fontFamily={F.mono} fontWeight="700" dominantBaseline="middle">{label}</text>
            <text x={130} y={y + 42} fill={C.muted} fontSize={8} textAnchor="middle"
              fontFamily={F.mono} dominantBaseline="middle">{sub}</text>

            <defs>
              <marker id={`svcL${y}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 z" fill={color} />
              </marker>
            </defs>
            <line x1={242} y1={y + 35} x2={308} y2={172}
              stroke={color} strokeWidth={1} strokeDasharray="4 3" markerEnd={`url(#svcL${y})`} />
          </g>
        ))}

        {/* ── RIGHT: Internal services ── */}
        {[
          { label: "esheria-ai", sub: "POST /internal/research/query", y: 60, color: C.blue },
          { label: "lexdraft", sub: "POST /internal/drafting/generate", y: 170, color: C.violet },
          { label: "lexchat-plugin", sub: "future / browser edge", y: 280, color: C.muted },
        ].map(({ label, sub, y, color }) => (
          <g key={label}>
            <rect x={660} y={y} width={220} height={70} rx={3}
              fill={`${color}0A`} stroke={`${color}45`} strokeWidth={1} />
            <text x={770} y={y + 22} fill={color} fontSize={10} textAnchor="middle"
              fontFamily={F.mono} fontWeight="700" dominantBaseline="middle">{label}</text>
            <text x={770} y={y + 42} fill={C.muted} fontSize={8} textAnchor="middle"
              fontFamily={F.mono} dominantBaseline="middle">{sub}</text>

            <defs>
              <marker id={`svcR${y}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 z" fill={color} />
              </marker>
            </defs>
            <line x1={658} y1={y + 35} x2={590} y2={172}
              stroke={color} strokeWidth={1} strokeDasharray="4 3" markerEnd={`url(#svcR${y})`} />
          </g>
        ))}

        {/* Bottom: External integrations */}
        <rect x={250} y={380} width={400} height={55} rx={4}
          fill={`${C.violet}08`} stroke={`${C.violet}35`} strokeWidth={1} strokeDasharray="5 3" />
        <text x={450} y={400} fill={C.violet} fontSize={9} textAnchor="middle"
          fontFamily={F.mono} fontWeight="700" letterSpacing={2}>EXTERNAL INTEGRATIONS</text>
        {["DMS", "CRM / ERP", "E-Signature", "Legal Research APIs", "Email / SSO"].map((s, i) => (
          <text key={s} x={275 + i * 86} y={422} fill={C.muted} fontSize={8.5}
            textAnchor="middle" fontFamily={F.mono}>{s}</text>
        ))}
        <defs>
          <marker id="extI" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill={C.violet} />
          </marker>
        </defs>
        <line x1={450} y1={342} x2={450} y2={378} stroke={C.violet} strokeWidth={1}
          strokeDasharray="4 3" markerEnd="url(#extI)" />
      </svg>
    </Page>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PAGE 7 — DASHBOARD TOPOLOGY MAP
// ═══════════════════════════════════════════════════════════════════
function P7_DashboardTopology() {
  return (
    <Page num={7} title="Dashboard Topology" subtitle="Three frontend surfaces — who sees what, and why they're separate">
      <svg viewBox="0 0 900 480" style={{ width: "100%", overflow: "visible" }}>
        <rect x={0} y={0} width={900} height={480} fill={C.bg} />

        {[
          {
            title: "INSTITUTION WORKSPACE", sub: "Customer-facing B2B product",
            x: 20, color: C.blue,
            modules: ["Home Dashboard", "Matters Module", "Documents Module", "Reviews Workspace", "Drafting Module", "Compliance Module", "Tasks & Approvals", "Analytics Suite", "Integrations", "Settings & Users"],
          },
          {
            title: "ESHERIA OPERATOR CONSOLE", sub: "Internal control plane",
            x: 320, color: C.rose,
            modules: ["Tenant Operations", "Workflow Monitoring", "Service Health", "Incident Center", "Support Console", "Usage & Billing", "Global Analytics", "Policy & Governance"],
          },
          {
            title: "PUBLIC / SALES SURFACE", sub: "Demos, onboarding, prospects",
            x: 620, color: C.amber,
            modules: ["Demo Environment", "Self-Serve Signup", "Workflow Templates", "Vertical Landing Pages", "Onboarding Wizard"],
          },
        ].map((surface) => (
          <g key={surface.title}>
            <rect x={surface.x} y={20} width={265} height={440} rx={5}
              fill={`${surface.color}07`} stroke={`${surface.color}40`} strokeWidth={1.5} />
            <text x={surface.x + 132} y={44} fill={surface.color} fontSize={10}
              textAnchor="middle" fontFamily={F.mono} fontWeight="700" letterSpacing={1}>{surface.title}</text>
            <text x={surface.x + 132} y={60} fill={C.muted} fontSize={8.5}
              textAnchor="middle" fontFamily={F.mono}>{surface.sub}</text>
            <line x1={surface.x + 16} y1={70} x2={surface.x + 249} y2={70}
              stroke={`${surface.color}30`} strokeWidth={1} />

            {surface.modules.map((mod, i) => (
              <g key={mod}>
                <rect x={surface.x + 14} y={80 + i * 36} width={237} height={28} rx={3}
                  fill={`${surface.color}12`} stroke={`${surface.color}30`} strokeWidth={1} />
                <text x={surface.x + 28} y={94 + i * 36} fill={surface.color} fontSize={9.5}
                  fontFamily={F.mono} dominantBaseline="middle">▸ {mod}</text>
              </g>
            ))}
          </g>
        ))}

        {/* Platform backend below */}
        <rect x={300} y={400} width={300} height={40} rx={4}
          fill={`${C.accent}0A`} stroke={`${C.accent}40`} strokeWidth={1} />
        <text x={450} y={420} fill={C.accent} fontSize={9} textAnchor="middle"
          fontFamily={F.mono} fontWeight="700" dominantBaseline="middle">← PLATFORM BACKEND API GATEWAY →</text>

        {/* Arrows from surfaces to backend */}
        {[152, 452, 752].map((x, i) => (
          <g key={x}>
            <defs>
              <marker id={`dash${x}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 z" fill={[C.blue, C.rose, C.amber][i]} />
              </marker>
            </defs>
            <line x1={x} y1={462} x2={450} y2={462}
              stroke={[C.blue, C.rose, C.amber][i]} strokeWidth={1}
              strokeDasharray="4 3" markerEnd={`url(#dash${x})`} />
          </g>
        ))}
      </svg>
    </Page>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PAGE 8 — DATA MODEL / ONTOLOGY
// ═══════════════════════════════════════════════════════════════════
function P8_DataModel() {
  return (
    <Page num={8} title="Canonical Data Model" subtitle="ER-style object map — the shared language of the entire platform">
      <svg viewBox="0 0 900 520" style={{ width: "100%", overflow: "visible" }}>
        <rect x={0} y={0} width={900} height={520} fill={C.bg} />

        {/* ── ENTITIES ── */}
        {/* Organization */}
        <rect x={20} y={20} width={160} height={100} rx={3} fill={C.surface} stroke={C.accent} strokeWidth={1.5} />
        <rect x={20} y={20} width={160} height={22} rx={3} fill={`${C.accent}20`} />
        <text x={100} y={31} fill={C.accent} fontSize={10} textAnchor="middle" fontFamily={F.mono} fontWeight="700" dominantBaseline="middle">Organization</text>
        {["org_id (PK)", "name", "sector", "policy_set_id (FK)", "jurisdiction_profile"].map((f, i) => (
          <text key={f} x={32} y={54 + i * 14} fill={C.muted} fontSize={8.5} fontFamily={F.mono}>{f}</text>
        ))}

        {/* Matter */}
        <rect x={230} y={20} width={160} height={90} rx={3} fill={C.surface} stroke={C.blue} strokeWidth={1.5} />
        <rect x={230} y={20} width={160} height={22} rx={3} fill={`${C.blue}20`} />
        <text x={310} y={31} fill={C.blue} fontSize={10} textAnchor="middle" fontFamily={F.mono} fontWeight="700" dominantBaseline="middle">Matter</text>
        {["matter_id (PK)", "org_id (FK)", "matter_type", "status", "owner_user_id"].map((f, i) => (
          <text key={f} x={242} y={54 + i * 14} fill={C.muted} fontSize={8.5} fontFamily={F.mono}>{f}</text>
        ))}

        {/* Document */}
        <rect x={440} y={20} width={165} height={100} rx={3} fill={C.surface} stroke={C.blue} strokeWidth={1.5} />
        <rect x={440} y={20} width={165} height={22} rx={3} fill={`${C.blue}20`} />
        <text x={522} y={31} fill={C.blue} fontSize={10} textAnchor="middle" fontFamily={F.mono} fontWeight="700" dominantBaseline="middle">Document</text>
        {["doc_id (PK)", "matter_id (FK)", "org_id (FK)", "ocr_status", "classification", "current_version"].map((f, i) => (
          <text key={f} x={452} y={54 + i * 14} fill={C.muted} fontSize={8.5} fontFamily={F.mono}>{f}</text>
        ))}

        {/* Clause */}
        <rect x={660} y={20} width={225} height={100} rx={3} fill={C.surface} stroke={C.violet} strokeWidth={1.5} />
        <rect x={660} y={20} width={225} height={22} rx={3} fill={`${C.violet}20`} />
        <text x={772} y={31} fill={C.violet} fontSize={10} textAnchor="middle" fontFamily={F.mono} fontWeight="700" dominantBaseline="middle">Clause</text>
        {["clause_id (PK)", "doc_id (FK)", "clause_type", "clause_text", "risk_ids[ ]", "linked_precedents[ ]"].map((f, i) => (
          <text key={f} x={672} y={54 + i * 14} fill={C.muted} fontSize={8.5} fontFamily={F.mono}>{f}</text>
        ))}

        {/* WorkflowRun */}
        <rect x={20} y={200} width={175} height={110} rx={3} fill={C.surface} stroke={C.amber} strokeWidth={1.5} />
        <rect x={20} y={200} width={175} height={22} rx={3} fill={`${C.amber}20`} />
        <text x={107} y={211} fill={C.amber} fontSize={10} textAnchor="middle" fontFamily={F.mono} fontWeight="700" dominantBaseline="middle">WorkflowRun</text>
        {["run_id (PK)", "matter_id (FK)", "workflow_type", "current_step", "status", "triggered_by (FK)", "started_at"].map((f, i) => (
          <text key={f} x={32} y={234 + i * 14} fill={C.muted} fontSize={8.5} fontFamily={F.mono}>{f}</text>
        ))}

        {/* Action */}
        <rect x={245} y={200} width={170} height={100} rx={3} fill={C.surface} stroke={C.amber} strokeWidth={1.5} />
        <rect x={245} y={200} width={170} height={22} rx={3} fill={`${C.amber}20`} />
        <text x={330} y={211} fill={C.amber} fontSize={10} textAnchor="middle" fontFamily={F.mono} fontWeight="700" dominantBaseline="middle">Action</text>
        {["action_id (PK)", "run_id (FK)", "actor_id", "action_type", "input (jsonb)", "output (jsonb)", "evidence_ids[ ]"].map((f, i) => (
          <text key={f} x={257} y={234 + i * 14} fill={C.muted} fontSize={8.5} fontFamily={F.mono}>{f}</text>
        ))}

        {/* Review */}
        <rect x={465} y={200} width={170} height={100} rx={3} fill={C.surface} stroke={C.rose} strokeWidth={1.5} />
        <rect x={465} y={200} width={170} height={22} rx={3} fill={`${C.rose}20`} />
        <text x={550} y={211} fill={C.rose} fontSize={10} textAnchor="middle" fontFamily={F.mono} fontWeight="700" dominantBaseline="middle">Review</text>
        {["review_id (PK)", "doc_id (FK)", "reviewer_id (FK)", "reviewer_type", "findings (jsonb)", "decision"].map((f, i) => (
          <text key={f} x={477} y={234 + i * 14} fill={C.muted} fontSize={8.5} fontFamily={F.mono}>{f}</text>
        ))}

        {/* Risk */}
        <rect x={690} y={200} width={195} height={100} rx={3} fill={C.surface} stroke={C.rose} strokeWidth={1.5} />
        <rect x={690} y={200} width={195} height={22} rx={3} fill={`${C.rose}20`} />
        <text x={787} y={211} fill={C.rose} fontSize={10} textAnchor="middle" fontFamily={F.mono} fontWeight="700" dominantBaseline="middle">Risk</text>
        {["risk_id (PK)", "clause_id (FK)", "severity", "policy_violated", "regulation_ref", "remediation"].map((f, i) => (
          <text key={f} x={702} y={234 + i * 14} fill={C.muted} fontSize={8.5} fontFamily={F.mono}>{f}</text>
        ))}

        {/* Citation */}
        <rect x={245} y={380} width={180} height={90} rx={3} fill={C.surface} stroke={C.muted} strokeWidth={1.5} />
        <rect x={245} y={380} width={180} height={22} rx={3} fill={`${C.muted}20`} />
        <text x={335} y={391} fill={C.muted} fontSize={10} textAnchor="middle" fontFamily={F.mono} fontWeight="700" dominantBaseline="middle">Citation / Evidence</text>
        {["evidence_id (PK)", "action_id (FK)", "source_type", "citation_text", "confidence (float)"].map((f, i) => (
          <text key={f} x={257} y={414 + i * 14} fill={C.muted2} fontSize={8.5} fontFamily={F.mono}>{f}</text>
        ))}

        {/* ── RELATIONSHIP LINES ── */}
        {[
          // Org → Matter
          { x1: 180, y1: 65, x2: 230, y2: 65, color: C.accent },
          // Matter → Document
          { x1: 390, y1: 65, x2: 440, y2: 65, color: C.blue },
          // Document → Clause
          { x1: 605, y1: 65, x2: 660, y2: 65, color: C.blue },
          // Clause → Risk
          { x1: 787, y1: 120, x2: 787, y2: 200, color: C.violet },
          // Matter → WorkflowRun
          { x1: 310, y1: 110, x2: 107, y2: 200, color: C.amber },
          // WorkflowRun → Action
          { x1: 195, y1: 250, x2: 245, y2: 250, color: C.amber },
          // Action → Citation
          { x1: 330, y1: 300, x2: 335, y2: 380, color: C.muted },
          // Document → Review
          { x1: 522, y1: 120, x2: 550, y2: 200, color: C.rose },
        ].map((rel, i) => (
          <g key={i}>
            <defs>
              <marker id={`rel${i}`} markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                <path d="M0,0 L0,5 L5,2.5 z" fill={rel.color} />
              </marker>
            </defs>
            <line x1={rel.x1} y1={rel.y1} x2={rel.x2} y2={rel.y2}
              stroke={rel.color} strokeWidth={1.5} markerEnd={`url(#rel${i})`} />
          </g>
        ))}

        {/* Relationship labels */}
        <text x={205} y={58} fill={C.accent} fontSize={7.5} fontFamily={F.mono} textAnchor="middle">1:N</text>
        <text x={415} y={58} fill={C.blue} fontSize={7.5} fontFamily={F.mono} textAnchor="middle">1:N</text>
        <text x={633} y={58} fill={C.blue} fontSize={7.5} fontFamily={F.mono} textAnchor="middle">1:N</text>
      </svg>
    </Page>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PAGE 9 — DEPLOYMENT TOPOLOGY
// ═══════════════════════════════════════════════════════════════════
function P9_DeploymentTopology() {
  return (
    <Page num={9} title="Deployment Topology" subtitle="Infrastructure view — ingress to storage, trust boundaries, tenant isolation">
      <svg viewBox="0 0 900 520" style={{ width: "100%", overflow: "visible" }}>
        <rect x={0} y={0} width={900} height={520} fill={C.bg} />

        {/* INTERNET zone */}
        <rect x={10} y={10} width={880} height={80} rx={4}
          fill={`${C.muted}05`} stroke={`${C.muted}25`} strokeWidth={1} strokeDasharray="5 3" />
        <text x={28} y={28} fill={C.muted} fontSize={9} fontFamily={F.mono} letterSpacing={2}>INTERNET / CLIENTS</text>
        {["Browser (Institution)", "Browser (Operator)", "Mobile Client", "API Consumer"].map((c, i) => (
          <g key={c}>
            <rect x={30 + i * 210} y={38} width={180} height={38} rx={3}
              fill={C.surface} stroke={C.border} strokeWidth={1} />
            <text x={120 + i * 210} y={57} fill={C.text} fontSize={9}
              textAnchor="middle" fontFamily={F.mono} dominantBaseline="middle">{c}</text>
          </g>
        ))}

        {/* Ingress */}
        <rect x={350} y={108} width={200} height={30} rx={3}
          fill={`${C.amber}15`} stroke={`${C.amber}50`} strokeWidth={1} />
        <text x={450} y={123} fill={C.amber} fontSize={9} textAnchor="middle"
          fontFamily={F.mono} fontWeight="700" dominantBaseline="middle">API GATEWAY / INGRESS</text>
        <line x1={450} y1={92} x2={450} y2={107} stroke={C.amber} strokeWidth={1.5} />

        {/* Auth boundary */}
        <rect x={155} y={148} width={590} height={28} rx={2}
          fill={`${C.rose}10`} stroke={`${C.rose}40`} strokeWidth={1} />
        <text x={450} y={162} fill={C.rose} fontSize={9} textAnchor="middle"
          fontFamily={F.mono} fontWeight="700" dominantBaseline="middle">AUTH BOUNDARY — JWT Validation + Tenant Resolution</text>
        <line x1={450} y1={138} x2={450} y2={148} stroke={C.rose} strokeWidth={1.5} />

        {/* Platform backend */}
        <rect x={60} y={192} width={780} height={90} rx={4}
          fill={`${C.accent}07`} stroke={`${C.accent}35`} strokeWidth={1.5} />
        <text x={80} y={210} fill={C.accent} fontSize={9} fontFamily={F.mono} fontWeight="700" letterSpacing={2}>PLATFORM BACKEND — Multi-Tenant Core</text>
        {["Workflow Engine", "Object Service", "Review Service", "Audit Service", "Notification Svc", "Connector Gateway"].map((b, i) => (
          <g key={b}>
            <rect x={74 + i * 126} y={220} width={116} height={50} rx={3}
              fill={`${C.accent}12`} stroke={`${C.accent}30`} strokeWidth={1} />
            <text x={132 + i * 126} y={245} fill={C.accent} fontSize={8.5}
              textAnchor="middle" fontFamily={F.mono} dominantBaseline="middle">{b}</text>
          </g>
        ))}
        <line x1={450} y1={176} x2={450} y2={192} stroke={C.accent} strokeWidth={1.5} />

        {/* Queue/Workers */}
        <rect x={60} y={296} width={260} height={60} rx={3}
          fill={`${C.violet}08`} stroke={`${C.violet}35`} strokeWidth={1} />
        <text x={190} y={315} fill={C.violet} fontSize={9} textAnchor="middle"
          fontFamily={F.mono} fontWeight="700" dominantBaseline="middle">MESSAGE QUEUE</text>
        <text x={190} y={336} fill={C.muted} fontSize={8} textAnchor="middle"
          fontFamily={F.mono} dominantBaseline="middle">Async OCR · Workflow steps · Retries</text>

        {/* Capability services */}
        <rect x={340} y={296} width={500} height={60} rx={3}
          fill={`${C.amber}06`} stroke={`${C.amber}30`} strokeWidth={1} />
        <text x={360} y={315} fill={C.amber} fontSize={9} fontFamily={F.mono} fontWeight="700">CAPABILITY SERVICES</text>
        {["esheria-ocr", "contract-engine", "esheria-ai", "lexdraft", "analytics"].map((s, i) => (
          <text key={s} x={365 + i * 92} y={338} fill={C.muted} fontSize={8}
            fontFamily={F.mono} dominantBaseline="middle">{s}</text>
        ))}

        {/* Arrow: backend → queue + services */}
        <line x1={200} y1={284} x2={190} y2={296} stroke={C.violet} strokeWidth={1} strokeDasharray="3 2" />
        <line x1={600} y1={284} x2={590} y2={296} stroke={C.amber} strokeWidth={1} strokeDasharray="3 2" />

        {/* Data stores */}
        <rect x={60} y={378} width={780} height={110} rx={3}
          fill={`${C.blue}05`} stroke={`${C.blue}25`} strokeWidth={1} />
        <text x={80} y={396} fill={C.blue} fontSize={9} fontFamily={F.mono} fontWeight="700" letterSpacing={2}>DATA STORES</text>
        {[
          { label: "Transactional DB", sub: "Orgs · Users · Workflows · Docs · Tasks", color: C.blue },
          { label: "Object Storage", sub: "Files · Exports · Attachments", color: C.blue },
          { label: "Search / Retrieval", sub: "Clauses · Citations · Legal Index", color: C.violet },
          { label: "Analytics / Events Store", sub: "Metrics · Throughput · Reporting", color: C.amber },
        ].map(({ label, sub, color }, i) => (
          <g key={label}>
            <rect x={76 + i * 193} y={404} width={183} height={70} rx={3}
              fill={`${color}10`} stroke={`${color}35`} strokeWidth={1} />
            <text x={167 + i * 193} y={430} fill={color} fontSize={9}
              textAnchor="middle" fontFamily={F.mono} fontWeight="700" dominantBaseline="middle">{label}</text>
            <text x={167 + i * 193} y={452} fill={C.muted} fontSize={8}
              textAnchor="middle" fontFamily={F.mono} dominantBaseline="middle">{sub}</text>
          </g>
        ))}
        <line x1={450} y1={356} x2={450} y2={378} stroke={C.blue} strokeWidth={1.5} />
      </svg>
    </Page>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PAGE 10 — ROADMAP
// ═══════════════════════════════════════════════════════════════════
function P10_Roadmap() {
  const phases = [
    { id: "P0", name: "Validation", color: C.muted, duration: "2–3 wks", items: ["CEO alignment + scope agreement", "MVP wedge selection", "Service readiness audit", "Success criteria"] },
    { id: "P1", name: "Design", color: C.blue, duration: "3–4 wks", items: ["Minimum ontology schema", "Workflow state machine design", "API contract spec", "Auth + tenant model", "UI/UX scope"] },
    { id: "P2", name: "MVP Build", color: C.accent, duration: "6–8 wks", items: ["Core backend + workflow engine", "2–3 service connectors", "Reviewer dashboard + audit log", "End-to-end demo flow"] },
    { id: "P3", name: "Internal Pilot", color: C.amber, duration: "3–4 wks", items: ["Test 2–3 real scenarios", "Refine action + evidence model", "Operator console v1", "Performance baseline"] },
    { id: "P4", name: "B2B Launch", color: C.rose, duration: "4–6 wks", items: ["Target customer workflow profile", "Pilot onboarding flow", "Institution analytics v1", "Pricing + packaging", "First pilot conversation"] },
  ];

  return (
    <Page num={10} title="MVP Roadmap" subtitle="Phased delivery — validation to first B2B pilot">
      <svg viewBox="0 0 900 340" style={{ width: "100%", overflow: "visible", marginBottom: "24px" }}>
        <rect x={0} y={0} width={900} height={340} fill={C.bg} />

        {/* Timeline spine */}
        <line x1={50} y1={80} x2={870} y2={80} stroke={C.border} strokeWidth={1.5} />

        {phases.map(({ id, name, color, duration }, i) => {
          const cx = 90 + i * 200;
          return (
            <g key={id}>
              {/* Node */}
              <circle cx={cx} cy={80} r={20} fill={`${color}20`} stroke={color} strokeWidth={2} />
              <text x={cx} y={80} fill={color} fontSize={11} textAnchor="middle"
                fontFamily={F.mono} fontWeight="700" dominantBaseline="middle">{id}</text>

              {/* Phase name */}
              <text x={cx} y={116} fill={color} fontSize={10} textAnchor="middle"
                fontFamily={F.mono} fontWeight="700">{name}</text>
              <text x={cx} y={130} fill={C.muted} fontSize={8.5} textAnchor="middle"
                fontFamily={F.mono}>{duration}</text>

              {/* Connector line */}
              {i < phases.length - 1 && (
                <line x1={cx + 20} y1={80} x2={cx + 180} y2={80}
                  stroke={color} strokeWidth={1} strokeDasharray="4 3" />
              )}
            </g>
          );
        })}
      </svg>

      {/* Phase detail cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "8px" }}>
        {phases.map(({ id, name, color, duration, items }) => (
          <div key={id} style={{ background: C.surface, border: `1px solid ${C.border}`, borderTop: `3px solid ${color}`, padding: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ fontFamily: F.mono, fontSize: "13px", fontWeight: "700", color }}>{id} — {name}</span>
              <span style={{ fontFamily: F.mono, fontSize: "9px", color: C.muted, background: `${color}15`, border: `1px solid ${color}40`, padding: "2px 6px", borderRadius: "2px" }}>{duration}</span>
            </div>
            {items.map((item) => (
              <div key={item} style={{ fontFamily: F.mono, fontSize: "10px", color: C.muted, padding: "5px 0", borderBottom: `1px solid ${C.border}`, display: "flex", gap: "8px" }}>
                <span style={{ color }}>▸</span>{item}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Success metrics summary */}
      <div style={{ marginTop: "24px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
        {[
          { title: "Technical", color: C.blue, metrics: ["Workflow completes E2E", "Connectors stable", "Audit trail complete"] },
          { title: "Product", color: C.accent, metrics: ["5-min demo story", "Reviewer finds value", "Orchestration is clear"] },
          { title: "Business", color: C.amber, metrics: ["CEO alignment", "1 pilot conversation", "Platform pitch ready"] },
        ].map(({ title, color, metrics }) => (
          <div key={title} style={{ background: C.surface, border: `1px solid ${C.border}`, borderLeft: `3px solid ${color}`, padding: "14px" }}>
            <div style={{ fontFamily: F.mono, fontSize: "11px", color, marginBottom: "10px", fontWeight: "700" }}>{title} Success</div>
            {metrics.map((m) => (
              <div key={m} style={{ fontFamily: F.mono, fontSize: "10px", color: C.muted, padding: "4px 0", borderBottom: `1px solid ${C.border}` }}>✓ {m}</div>
            ))}
          </div>
        ))}
      </div>
    </Page>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MASTER APP
// ═══════════════════════════════════════════════════════════════════

const PAGES = [
  { num: 1, label: "Thesis", component: P1_Thesis },
  { num: 2, label: "System Context", component: P2_SystemContext },
  { num: 3, label: "Layered Arch", component: P3_LayeredArch },
  { num: 4, label: "Control vs Data", component: P4_ControlVsData },
  { num: 5, label: "Workflow Seq", component: P5_WorkflowSequence },
  { num: 6, label: "Service Map", component: P6_ServiceIntegration },
  { num: 7, label: "Dashboards", component: P7_DashboardTopology },
  { num: 8, label: "Data Model", component: P8_DataModel },
  { num: 9, label: "Deployment", component: P9_DeploymentTopology },
  { num: 10, label: "Roadmap", component: P10_Roadmap },
];

export default function App() {
  const [page, setPage] = useState(0);
  const PageComp = PAGES[page].component;

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: F.mono }}>
      {/* Top nav */}
      <div style={{
        background: C.surface, borderBottom: `1px solid ${C.border}`,
        padding: "0 16px", display: "flex", alignItems: "center",
        gap: "0", overflowX: "auto", position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ fontSize: "11px", color: C.accent, letterSpacing: "2px", padding: "14px 16px 14px 4px", borderRight: `1px solid ${C.border}`, whiteSpace: "nowrap", marginRight: "8px" }}>
          ESHERIA OS
        </div>
        {PAGES.map((p, i) => (
          <button key={p.num} onClick={() => setPage(i)} style={{
            padding: "14px 14px", background: "none", border: "none",
            borderBottom: i === page ? `2px solid ${C.accent}` : "2px solid transparent",
            color: i === page ? C.accent : C.muted,
            cursor: "pointer", fontSize: "10px", letterSpacing: "1px",
            whiteSpace: "nowrap", fontFamily: F.mono,
            transition: "color 0.15s",
          }}>
            {String(p.num).padStart(2, "0")} {p.label}
          </button>
        ))}
      </div>

      {/* Page content */}
      <PageComp />

      {/* Bottom nav */}
      <div style={{
        background: C.surface, borderTop: `1px solid ${C.border}`,
        padding: "16px 48px", display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0} style={{
          background: "none", border: `1px solid ${C.border}`, color: C.muted,
          padding: "8px 20px", cursor: page === 0 ? "default" : "pointer",
          fontSize: "11px", fontFamily: F.mono, opacity: page === 0 ? 0.3 : 1,
        }}>
          ← PREV
        </button>
        <div style={{ fontSize: "10px", color: C.muted, letterSpacing: "2px" }}>
          {String(page + 1).padStart(2, "0")} / {PAGES.length} — {PAGES[page].label.toUpperCase()}
        </div>
        <button onClick={() => setPage(Math.min(PAGES.length - 1, page + 1))} disabled={page === PAGES.length - 1} style={{
          background: `${C.accent}15`, border: `1px solid ${C.accent}50`, color: C.accent,
          padding: "8px 20px", cursor: page === PAGES.length - 1 ? "default" : "pointer",
          fontSize: "11px", fontFamily: F.mono, opacity: page === PAGES.length - 1 ? 0.3 : 1,
        }}>
          NEXT →
        </button>
      </div>
    </div>
  );
}
