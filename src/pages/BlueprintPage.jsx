import { Link } from "react-router-dom";
import { useState } from "react";
import architectureModel from "../architecture/architectureModel";
import { diagramRegistryByAudience } from "../architecture/diagramRegistry";
import { getDiagramPreview } from "../architecture/diagramPreviews";
import { Reveal, SectionEyebrow as Eyebrow } from "../components/presentation/Primitives";

// ─── DIAGRAM CONFIG ───────────────────────────────────────────
const blueprintDiagramOrder = [
  "layered-architecture",
  "control-vs-data-plane",
  "auth-and-tenant-boundary",
  "api-boundary-map",
  "service-integration-map",
  "contract-intake-sequence",
  "workflow-state-machine",
  "deployment-topology",
  "ontology-er",
  "dashboard-topology",
  "system-context",
  "current-vs-target-architecture",
];

const blueprintDiagrams = blueprintDiagramOrder
  .map((id) => diagramRegistryByAudience?.technical?.find((d) => d.id === id))
  .filter(Boolean);

// ─── LAYER COLOURS ────────────────────────────────────────────
const LAYER_COLORS = {
  L5: "#4F7EF7",
  L4: "#00D4AA",
  L3: "#9B6EF5",
  L2: "#E8A020",
  L1: "#586070",
};
const LAYER_LABELS = {
  L5: "Experience",
  L4: "Control Plane",
  L3: "Object Model",
  L2: "Connectors",
  L1: "Services",
};

const STATUS_COLORS = {
  active: "#00D4AA",
  primary: "#00D4AA",
  planned: "#4F7EF7",
  future: "#586070",
  evolve: "#E8A020",
  beta: "#9B6EF5",
};

const REVIEW_STEPS = [
  {
    n: "01",
    title: "Architecture Shape",
    body: "Platform layers establish the control/data plane boundary. Read this first to understand what the orchestration layer does and what it doesn't touch.",
    color: "#00D4AA",
  },
  {
    n: "02",
    title: "Build Responsibilities",
    body: "Backend module and connector tables are implementation anchors — each module owns a specific slice of the platform with defined inputs and outputs.",
    color: "#4F7EF7",
  },
  {
    n: "03",
    title: "Diagram Evidence",
    body: "12 technical diagrams cover sequence, identity, deployment, and data model. Walk them after the tables to validate the design decisions.",
    color: "#9B6EF5",
  },
];

const DIAGRAM_GROUPS = [
  {
    label: "Architecture",
    color: "#00D4AA",
    ids: ["layered-architecture", "control-vs-data-plane", "system-context", "current-vs-target-architecture"],
  },
  {
    label: "Identity & API",
    color: "#4F7EF7",
    ids: ["auth-and-tenant-boundary", "api-boundary-map"],
  },
  {
    label: "Services & Integration",
    color: "#E8A020",
    ids: ["service-integration-map", "deployment-topology"],
  },
  {
    label: "Workflow & Data",
    color: "#9B6EF5",
    ids: ["contract-intake-sequence", "workflow-state-machine", "ontology-er", "dashboard-topology"],
  },
];

// ─── INTERSECTION REVEAL ──────────────────────────────────────

// ─── SECTION EYEBROW ──────────────────────────────────────────

// ─── LAYER BADGE ──────────────────────────────────────────────
function LayerBadge({ id }) {
  const color = LAYER_COLORS[id] || "#586070";
  const label = LAYER_LABELS[id] || id;
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "6px",
      padding: "3px 10px", borderRadius: "4px",
      background: `${color}12`, border: `1px solid ${color}30`,
    }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", fontWeight: 700, color }}>{id}</span>
      <span style={{ fontSize: "10px", color: `${color}80` }}>·</span>
      <span style={{ fontSize: "10px", color: `${color}90` }}>{label}</span>
    </div>
  );
}

// ─── STATUS BADGE ─────────────────────────────────────────────
function StatusBadge({ status }) {
  const s = (status || "").toLowerCase();
  const color = STATUS_COLORS[s] || "#586070";
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "5px",
      padding: "2px 8px", borderRadius: "4px",
      background: `${color}12`, border: `1px solid ${color}30`,
    }}>
      <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: color }} />
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", fontWeight: 600, color, textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {status}
      </span>
    </div>
  );
}

// ─── DIVIDER ──────────────────────────────────────────────────
function Div() {
  return <div style={{ height: "1px", background: "var(--tone-border)", margin: "0 clamp(24px, 5vw, 72px)" }} />;
}

// ─── SECTION WRAPPER ──────────────────────────────────────────
function Section({ children, last = false }) {
  return (
    <section style={{
      padding: "72px clamp(24px, 5vw, 72px)",
      borderBottom: last ? "none" : "1px solid var(--tone-border)",
    }}>
      {children}
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
export default function BlueprintPage() {
  const [activeLayer, setActiveLayer] = useState(null);
  const [activeDiagram, setActiveDiagram] = useState(null);
  const [activeModule, setActiveModule] = useState(null);
  const meta = architectureModel?.meta || { platformName: "Esheria Legal Workflow OS", version: "1.0" };
  const layers = architectureModel?.platformLayers || [];
  const modules = architectureModel?.backendModules || [];
  const connectors = architectureModel?.serviceConnectors || [];

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--tone-bg)",
      color: "var(--tone-text)",
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      overflowX: "hidden",
    }}>

      {/* ── GRID TEXTURE ── */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `
          linear-gradient(var(--tone-grid-strong) 1px, transparent 1px),
          linear-gradient(90deg, var(--tone-grid-strong) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }} />
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 70% 50% at 50% 0%, var(--tone-glow) 0%, transparent 65%)",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ══ HERO ══════════════════════════════════════════ */}
        <section style={{ padding: "72px clamp(24px, 5vw, 72px) 64px", borderBottom: "1px solid var(--tone-border)" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "40px" }}>
            <Link to="/overview" style={{ textDecoration: "none" }}>
              <span style={{
                fontSize: "11px", color: "var(--tone-dim)", fontWeight: 600,
                letterSpacing: "0.08em", cursor: "pointer",
                fontFamily: "'JetBrains Mono', monospace",
                transition: "color 0.15s",
              }}
                onMouseEnter={e => e.target.style.color = "var(--tone-muted)"}
                onMouseLeave={e => e.target.style.color = "var(--tone-dim)"}
              >overview</span>
            </Link>
            <span style={{ color: "var(--tone-border)", fontFamily: "monospace" }}>/</span>
            <Link to="/executive" style={{ textDecoration: "none" }}>
              <span style={{
                fontSize: "11px", color: "var(--tone-dim)", fontWeight: 600,
                letterSpacing: "0.08em", cursor: "pointer",
                fontFamily: "'JetBrains Mono', monospace",
                transition: "color 0.15s",
              }}
                onMouseEnter={e => e.target.style.color = "var(--tone-muted)"}
                onMouseLeave={e => e.target.style.color = "var(--tone-dim)"}
              >executive</span>
            </Link>
            <span style={{ color: "var(--tone-border)", fontFamily: "monospace" }}>/</span>
            <span style={{ fontSize: "11px", color: "#4F7EF7", fontWeight: 700, letterSpacing: "0.08em", fontFamily: "'JetBrains Mono', monospace" }}>
              blueprint
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "48px", alignItems: "start" }}>
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "4px 14px", borderRadius: "4px",
                background: "#4F7EF70A", border: "1px solid #4F7EF730",
                marginBottom: "24px",
              }}>
                <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4F7EF7" }} />
                <span style={{
                  fontSize: "10px", color: "#4F7EF7", letterSpacing: "0.12em",
                  fontWeight: 700, fontFamily: "'JetBrains Mono', monospace",
                }}>
                  TECHNICAL BLUEPRINT · ENGINEERING REVIEW
                </span>
              </div>

              <h1 style={{
                fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 800, lineHeight: 1.08,
                letterSpacing: "-0.03em", color: "var(--tone-text-strong)",
                margin: "0 0 20px", maxWidth: "700px",
              }}>
                Implementation Blueprint
                <br />
                <span style={{
                  background: "linear-gradient(90deg, #4F7EF7, #9B6EF5)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>for the Workflow OS.</span>
              </h1>

              <p style={{
                fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)", color: "var(--tone-subtle)",
                lineHeight: 1.75, maxWidth: "600px", margin: "0 0 32px",
              }}>
                Platform layers, module responsibilities, connector contracts, and 12 architecture
                diagrams — sequenced as a single technical review flow. Anchors for implementation
                decisions across every layer of the stack.
              </p>

              {/* Stats row */}
              <div style={{ display: "flex", gap: "0", flexWrap: "wrap" }}>
                {[
                  { v: layers.length || 5, l: "Platform Layers" },
                  { v: modules.length || 0, l: "Backend Modules" },
                  { v: connectors.length || 0, l: "Connectors" },
                  { v: blueprintDiagrams.length, l: "Diagrams" },
                ].map((s, i) => (
                  <div key={i} style={{
                    padding: "16px 24px",
                    borderRight: i < 3 ? "1px solid var(--tone-border)" : "none",
                    borderLeft: i === 0 ? "1px solid var(--tone-border)" : "none",
                    borderTop: "1px solid var(--tone-border)",
                    borderBottom: "1px solid var(--tone-border)",
                    background: "var(--tone-surface)",
                    minWidth: "100px",
                  }}>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "1.6rem", fontWeight: 700,
                      color: "#4F7EF7", lineHeight: 1,
                      marginBottom: "4px",
                    }}>{s.v}</div>
                    <div style={{ fontSize: "10px", color: "var(--tone-muted)", letterSpacing: "0.08em" }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: review order */}
            <div style={{ minWidth: "240px", flexShrink: 0 }}>
              <div style={{
                background: "var(--tone-surface)", border: "1px solid var(--tone-border)",
                borderRadius: "8px", overflow: "hidden",
              }}>
                <div style={{
                  padding: "12px 16px", borderBottom: "1px solid var(--tone-border)",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px", fontWeight: 700,
                  letterSpacing: "0.1em", color: "#4F7EF7",
                }}>
                  // REVIEW ORDER
                </div>
                {REVIEW_STEPS.map((step, i) => (
                  <div key={i} style={{
                    padding: "16px", display: "flex", gap: "12px",
                    borderBottom: i < REVIEW_STEPS.length - 1 ? "1px solid var(--tone-surface-2)" : "none",
                  }}>
                    <div style={{
                      width: "24px", height: "24px", borderRadius: "4px",
                      background: `${step.color}12`, border: `1px solid ${step.color}30`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "10px", fontWeight: 700, color: step.color,
                      flexShrink: 0,
                    }}>{step.n}</div>
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--tone-text)", marginBottom: "4px" }}>{step.title}</div>
                      <div style={{ fontSize: "11px", color: "var(--tone-muted)", lineHeight: 1.6 }}>{step.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ PLATFORM LAYERS ═══════════════════════════════ */}
        <Section>
          <Reveal>
            <Eyebrow text="PLATFORM LAYERS" color="#4F7EF7" />
            <h2 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 700, color: "var(--tone-text-strong)", margin: "0 0 8px", letterSpacing: "-0.02em" }}>
              Five layers. One coherent stack.
            </h2>
            <p style={{ fontSize: "14px", color: "var(--tone-muted)", margin: "0 0 40px", maxWidth: "540px", lineHeight: 1.7 }}>
              Every architectural decision maps to one of these layers. No layer has a direct dependency on a non-adjacent layer.
              Existing services live at L1 — untouched.
            </p>
          </Reveal>

          {/* Layer stack — visual */}
          <div style={{ display: "flex", flexDirection: "column", gap: "3px", marginBottom: "24px" }}>
            {Object.entries(LAYER_LABELS).reverse().map(([id, label], i) => {
              const color = LAYER_COLORS[id];
              const layer = layers.find(l => l.id === id || l.name?.includes(label));
              const isActive = activeLayer === id;
              return (
                <div
                  key={id}
                  onClick={() => setActiveLayer(isActive ? null : id)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "80px 1fr auto",
                    alignItems: "center",
                    gap: "0",
                    border: `1px solid ${isActive ? color + "50" : "var(--tone-border)"}`,
                    borderRadius: "6px",
                    background: isActive ? `${color}08` : "var(--tone-surface)",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    overflow: "hidden",
                  }}
                  onMouseEnter={e => !isActive && (e.currentTarget.style.borderColor = "var(--tone-dim)")}
                  onMouseLeave={e => !isActive && (e.currentTarget.style.borderColor = "var(--tone-border)")}
                >
                  {/* Layer ID */}
                  <div style={{
                    padding: "18px 16px",
                    borderRight: "1px solid var(--tone-border)",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "13px", fontWeight: 700,
                    color,
                    background: `${color}08`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {id}
                  </div>

                  {/* Name + purpose */}
                  <div style={{ padding: "16px 20px" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: isActive ? "12px" : "4px" }}>
                      <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--tone-text-strong)" }}>
                        {layer?.name || label}
                      </span>
                    </div>
                    <div style={{ fontSize: "12px", color: isActive ? "var(--tone-subtle)" : "var(--tone-muted)", lineHeight: 1.6, transition: "color 0.15s" }}>
                      {layer?.purpose || `Layer ${id} — ${label}`}
                    </div>

                    {/* Expanded modules */}
                    {isActive && layer?.modules && (
                      <div style={{
                        marginTop: "14px",
                        display: "flex", flexWrap: "wrap", gap: "6px",
                      }}>
                        {layer.modules.map(m => (
                          <div key={m} style={{
                            padding: "3px 10px", borderRadius: "4px",
                            background: `${color}10`, border: `1px solid ${color}25`,
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "10px", color,
                          }}>
                            {m}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Expand toggle */}
                  <div style={{
                    padding: "18px 20px",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px", color: isActive ? color : "var(--tone-dim)",
                    transition: "color 0.15s",
                    display: "flex", alignItems: "center", gap: "6px",
                  }}>
                    {layer?.modules?.length > 0 && (
                      <>
                        <span style={{ fontSize: "10px", color: "var(--tone-dim)" }}>{layer.modules.length} modules</span>
                        <span style={{ transform: isActive ? "rotate(90deg)" : "rotate(0)", transition: "transform 0.2s", display: "inline-block" }}>›</span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <Reveal delay={100}>
            <div style={{
              padding: "12px 16px", borderRadius: "6px",
              background: "var(--tone-surface)", border: "1px dashed var(--tone-border)",
              display: "flex", alignItems: "center", gap: "10px",
            }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "var(--tone-dim)" }}>NOTE</span>
              <span style={{ fontSize: "12px", color: "var(--tone-dim-2)" }}>
                Click any layer to expand its module list. No layer calls a non-adjacent layer directly.
                L5 → /api/* only. L2 → /internal/* only.
              </span>
            </div>
          </Reveal>
        </Section>

        {/* ══ BACKEND MODULES ════════════════════════════════ */}
        <Section>
          <Reveal>
            <Eyebrow text="BACKEND MODULE RESPONSIBILITIES" color="#00D4AA" />
            <h2 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 700, color: "var(--tone-text-strong)", margin: "0 0 8px", letterSpacing: "-0.02em" }}>
              Every module. One responsibility.
            </h2>
            <p style={{ fontSize: "14px", color: "var(--tone-muted)", margin: "0 0 40px", maxWidth: "540px", lineHeight: 1.7 }}>
              These are the implementation anchors. Each module owns a specific slice of platform behaviour.
              Use this table to assign ownership during sprint planning.
            </p>
          </Reveal>

          {modules.length > 0 ? (
            <Reveal delay={80}>
              <div style={{
                border: "1px solid var(--tone-border)", borderRadius: "8px", overflow: "hidden",
              }}>
                {/* Table header */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "240px 1fr",
                  background: "var(--tone-surface-2)",
                  borderBottom: "1px solid var(--tone-border)",
                }}>
                  {["Module", "Responsibilities"].map((h, i) => (
                    <div key={i} style={{
                      padding: "12px 20px",
                      borderRight: i === 0 ? "1px solid var(--tone-border)" : "none",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "10px", fontWeight: 700,
                      color: "#4F7EF7", letterSpacing: "0.1em",
                    }}>
                      {h.toUpperCase()}
                    </div>
                  ))}
                </div>

                {/* Rows */}
                {modules.map((mod, i) => (
                  <div
                    key={mod.id}
                    onClick={() => setActiveModule(activeModule === mod.id ? null : mod.id)}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "240px 1fr",
                      borderBottom: i < modules.length - 1 ? "1px solid var(--tone-surface-2)" : "none",
                      background: activeModule === mod.id ? "var(--tone-surface)" : i % 2 === 0 ? "var(--tone-bg)" : "var(--tone-bg-elevated)",
                      cursor: "pointer",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "var(--tone-surface)"}
                    onMouseLeave={e => e.currentTarget.style.background = activeModule === mod.id ? "var(--tone-surface)" : i % 2 === 0 ? "var(--tone-bg)" : "var(--tone-bg-elevated)"}
                  >
                    {/* Module name */}
                    <div style={{
                      padding: "16px 20px",
                      borderRight: "1px solid var(--tone-surface-2)",
                    }}>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--tone-text)", marginBottom: "4px" }}>
                        {mod.name}
                      </div>
                      <div style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "10px", color: "var(--tone-dim)",
                      }}>
                        {mod.id}
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <div style={{ padding: "16px 20px" }}>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {mod.responsibilities.map((r, ri) => (
                          <div key={ri} style={{
                            display: "flex", alignItems: "center", gap: "6px",
                          }}>
                            {ri > 0 && (
                              <span style={{ color: "var(--tone-border)", fontFamily: "monospace", fontSize: "10px" }}>→</span>
                            )}
                            <span style={{
                              fontSize: "12px", color: "var(--tone-subtle)",
                              padding: "2px 8px", background: "var(--tone-surface-2)",
                              borderRadius: "3px", border: "1px solid var(--tone-border)",
                            }}>
                              {r}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <div style={{
                padding: "40px", border: "1px dashed var(--tone-border)", borderRadius: "8px",
                textAlign: "center",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px", color: "var(--tone-dim)",
              }}>
                // architectureModel.backendModules — no data loaded
              </div>
            </Reveal>
          )}
        </Section>

        {/* ══ CONNECTOR MAP ══════════════════════════════════ */}
        <Section>
          <Reveal>
            <Eyebrow text="CONNECTOR MAP" color="#E8A020" />
            <h2 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 700, color: "var(--tone-text-strong)", margin: "0 0 8px", letterSpacing: "-0.02em" }}>
              How the platform reaches existing services.
            </h2>
            <p style={{ fontSize: "14px", color: "var(--tone-muted)", margin: "0 0 40px", maxWidth: "580px", lineHeight: 1.7 }}>
              The Connector Gateway is the only way the platform communicates with L1 services. No frontend
              ever calls an internal endpoint directly. Each connector owns the auth, retry, and
              error-normalisation contract for its target service.
            </p>
          </Reveal>

          {connectors.length > 0 ? (
            <Reveal delay={60}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {connectors.map((conn, i) => {
                  const statusColor = STATUS_COLORS[(conn.status || "").toLowerCase()] || "#586070";
                  return (
                    <div key={conn.id} style={{
                      display: "grid",
                      gridTemplateColumns: "200px 160px 120px 1fr",
                      gap: "0",
                      border: "1px solid var(--tone-border)",
                      borderRadius: "6px",
                      overflow: "hidden",
                      background: "var(--tone-surface)",
                      transition: "border-color 0.15s",
                    }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = "var(--tone-dim)"}
                      onMouseLeave={e => e.currentTarget.style.borderColor = "var(--tone-border)"}
                    >
                      {/* Connector ID */}
                      <div style={{
                        padding: "16px 18px",
                        borderRight: "1px solid var(--tone-border)",
                        background: "var(--tone-bg)",
                      }}>
                        <div style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "11px", fontWeight: 700,
                          color: "var(--tone-text)", marginBottom: "4px",
                        }}>
                          {conn.id}
                        </div>
                        <div style={{ fontSize: "10px", color: "var(--tone-dim)", fontFamily: "'JetBrains Mono', monospace" }}>
                          connector
                        </div>
                      </div>

                      {/* Target service */}
                      <div style={{
                        padding: "16px 18px",
                        borderRight: "1px solid var(--tone-border)",
                        display: "flex", flexDirection: "column", justifyContent: "center",
                      }}>
                        <div style={{ fontSize: "10px", color: "var(--tone-muted)", marginBottom: "4px", letterSpacing: "0.06em" }}>TARGET</div>
                        <div style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "11px", color: "#E8A020", fontWeight: 600,
                        }}>
                          {conn.targetService}
                        </div>
                      </div>

                      {/* Status */}
                      <div style={{
                        padding: "16px 18px",
                        borderRight: "1px solid var(--tone-border)",
                        display: "flex", flexDirection: "column", justifyContent: "center",
                      }}>
                        <div style={{ fontSize: "10px", color: "var(--tone-muted)", marginBottom: "8px", letterSpacing: "0.06em" }}>STATUS</div>
                        <StatusBadge status={conn.status} />
                      </div>

                      {/* Endpoints */}
                      <div style={{ padding: "14px 18px", display: "flex", flexWrap: "wrap", gap: "5px", alignItems: "center" }}>
                        {conn.currentEndpoints && conn.currentEndpoints.length > 0
                          ? conn.currentEndpoints.map(ep => (
                            <div key={ep} style={{
                              padding: "3px 10px", borderRadius: "3px",
                              background: "var(--tone-surface-2)", border: "1px solid var(--tone-border)",
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: "10px", color: "var(--tone-muted)",
                            }}>
                              {ep}
                            </div>
                          ))
                          : (
                            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "var(--tone-dim)" }}>
                              — not published yet
                            </span>
                          )
                        }
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <div style={{
                padding: "40px", border: "1px dashed var(--tone-border)", borderRadius: "8px",
                textAlign: "center",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px", color: "var(--tone-dim)",
              }}>
                // architectureModel.serviceConnectors — no data loaded
              </div>
            </Reveal>
          )}

          <Reveal delay={100}>
            <div style={{
              marginTop: "16px",
              padding: "12px 18px", borderRadius: "6px",
              background: "var(--tone-surface)", border: "1px dashed #E8A02030",
              display: "flex", alignItems: "center", gap: "12px",
            }}>
              <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#E8A020", flexShrink: 0 }} />
              <span style={{ fontSize: "12px", color: "var(--tone-dim-2)", lineHeight: 1.6 }}>
                <strong style={{ color: "#E8A02080" }}>Design constraint:</strong> All connector calls originate from the Connector Gateway only.
                The prefix <code style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--tone-muted)", fontSize: "11px" }}>/internal/*</code> is
                never exposed outside the platform backend service boundary.
              </span>
            </div>
          </Reveal>
        </Section>

        {/* ══ DIAGRAMS ════════════════════════════════════════ */}
        <Section last>
          <Reveal>
            <Eyebrow text="TECHNICAL DIAGRAM SET" color="#9B6EF5" />
            <h2 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 700, color: "var(--tone-text-strong)", margin: "0 0 8px", letterSpacing: "-0.02em" }}>
              {blueprintDiagrams.length} diagrams. Four groups.
            </h2>
            <p style={{ fontSize: "14px", color: "var(--tone-muted)", margin: "0 0 48px", maxWidth: "540px", lineHeight: 1.7 }}>
              Sequenced from architecture shape → identity/API → service integration → workflow and data.
              Walk them in order for a complete technical evidence trail.
            </p>
          </Reveal>

          {/* Diagram groups */}
          {DIAGRAM_GROUPS.map((group, gi) => {
            const groupDiagrams = group.ids
              .map(id => blueprintDiagrams.find(d => d.id === id))
              .filter(Boolean);
            if (groupDiagrams.length === 0) return null;

            return (
              <Reveal key={group.label} delay={gi * 60}>
                <div style={{ marginBottom: "48px" }}>
                  {/* Group header */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    marginBottom: "16px", paddingBottom: "12px",
                    borderBottom: `1px solid ${group.color}20`,
                  }}>
                    <div style={{
                      width: "6px", height: "6px", borderRadius: "50%",
                      background: group.color, boxShadow: `0 0 8px ${group.color}80`,
                    }} />
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "11px", fontWeight: 700,
                      color: group.color, letterSpacing: "0.1em",
                    }}>
                      {group.label.toUpperCase()}
                    </span>
                    <span style={{ fontSize: "11px", color: "var(--tone-dim)" }}>
                      {groupDiagrams.length} diagram{groupDiagrams.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Diagram grid */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
                    gap: "12px",
                  }}>
                    {groupDiagrams.map((d, di) => (
                      <div
                        key={d.id}
                        onClick={() => setActiveDiagram(activeDiagram === d.id ? null : d.id)}
                        style={{
                          background: "var(--tone-surface)",
                          border: `1px solid ${activeDiagram === d.id ? group.color + "50" : "var(--tone-border)"}`,
                          borderRadius: "8px", overflow: "hidden",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          boxShadow: activeDiagram === d.id ? `0 8px 32px ${group.color}15` : "none",
                        }}
                        onMouseEnter={e => activeDiagram !== d.id && (e.currentTarget.style.borderColor = "var(--tone-dim)")}
                        onMouseLeave={e => activeDiagram !== d.id && (e.currentTarget.style.borderColor = "var(--tone-border)")}
                      >
                        {/* Image area */}
                        <div style={{
                          aspectRatio: "16/9",
                          background: "var(--tone-surface-2)",
                          borderBottom: "1px solid var(--tone-border)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          position: "relative", overflow: "hidden",
                        }}>
                          {(() => {
                            const previewSrc = getDiagramPreview(d.id);
                            return previewSrc ? (
                              <img
                                src={previewSrc} alt={d.title}
                                style={{ width: "100%", height: "100%", objectFit: "contain", padding: "8px" }}
                              />
                            ) : (
                              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "var(--tone-dim)" }}>
                                {d.id}
                              </div>
                            );
                          })()}

                          {/* Index badge */}
                          <div style={{
                            position: "absolute", top: "8px", left: "8px",
                            padding: "2px 8px", borderRadius: "3px",
                            background: "var(--tone-bg-overlay)", border: "1px solid var(--tone-border)",
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "9px", color: "var(--tone-dim)",
                          }}>
                            {blueprintDiagrams.findIndex(x => x.id === d.id) + 1}/{blueprintDiagrams.length}
                          </div>

                          {/* Group badge */}
                          <div style={{
                            position: "absolute", top: "8px", right: "8px",
                            padding: "2px 8px", borderRadius: "3px",
                            background: `${group.color}18`, border: `1px solid ${group.color}30`,
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "9px", color: group.color, fontWeight: 700,
                          }}>
                            {group.label}
                          </div>
                        </div>

                        {/* Info */}
                        <div style={{ padding: "16px 18px" }}>
                          <div style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "9px", color: "var(--tone-dim)",
                            marginBottom: "6px", letterSpacing: "0.06em",
                          }}>
                            {d.id}
                          </div>
                          <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--tone-text)", marginBottom: "6px" }}>
                            {d.title}
                          </div>
                          {d.purpose && (
                            <div style={{ fontSize: "11px", color: "var(--tone-muted)", lineHeight: 1.6 }}>
                              {d.purpose}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}

          {/* Evidence trail */}
          <Reveal>
            <div style={{
              padding: "20px 24px",
              background: "var(--tone-surface)", border: "1px solid var(--tone-border)",
              borderRadius: "8px",
              display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap",
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px", color: "var(--tone-dim)",
              }}>
                // DEEP EVIDENCE
              </div>
              {[
                "docs/discovery/repo-deep-scan.md",
                "docs/discovery/api-catalog.md",
              ].map(f => (
                <div key={f} style={{
                  padding: "4px 12px", borderRadius: "4px",
                  background: "var(--tone-surface-2)", border: "1px solid var(--tone-border)",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px", color: "#4F7EF7",
                }}>
                  {f}
                </div>
              ))}
              <div style={{ marginLeft: "auto", fontSize: "11px", color: "var(--tone-dim)", fontFamily: "'JetBrains Mono', monospace" }}>
                {meta.platformName} · v{meta.version}
              </div>
            </div>
          </Reveal>

          {/* Footer nav */}
          <div style={{
            marginTop: "48px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: "16px", flexWrap: "wrap",
          }}>
            <Link to="/executive" style={{ textDecoration: "none" }}>
              <div style={{
                padding: "11px 24px", borderRadius: "8px",
                border: "1px solid var(--tone-border)", background: "var(--tone-surface)",
                color: "var(--tone-subtle)", fontWeight: 600, fontSize: "13px",
                cursor: "pointer", transition: "all 0.2s",
                display: "flex", alignItems: "center", gap: "8px",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--tone-dim)"; e.currentTarget.style.color = "var(--tone-text)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--tone-border)"; e.currentTarget.style.color = "var(--tone-subtle)"; }}
              >
                ← Executive Brief
              </div>
            </Link>
            <Link to="/explorer" style={{ textDecoration: "none" }}>
              <div style={{
                padding: "11px 24px", borderRadius: "8px",
                background: "#4F7EF7", color: "var(--tone-text-strong)",
                fontWeight: 700, fontSize: "13px",
                cursor: "pointer", transition: "all 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                Architecture Explorer →
              </div>
            </Link>
          </div>
        </Section>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; }
        ::selection { background: #4F7EF725; color: var(--tone-text-strong); }
        scrollbar-width: thin; scrollbar-color: var(--tone-border) var(--tone-bg);
      `}</style>
    </div>
  );
}
