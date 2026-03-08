import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { portalSections, presentationSections } from "../portal/artifactCatalog";

// ─── CONSTANTS ────────────────────────────────────────────────
const PRIMARY_VIEWS = [
  {
    to: "/executive",
    label: "01",
    title: "Executive Brief",
    subtitle: "Strategic Narrative",
    description:
      "Board-ready case for the platform shift. Why we build the layer above, not the sixth feature. Decision metrics, moat analysis, and the four asks.",
    accent: "#00D4AA",
    tag: "CEO PRESENTATION",
  },
  {
    to: "/blueprint",
    label: "02",
    title: "Technical Blueprint",
    subtitle: "Architecture Specification",
    description:
      "Full engineering specification. Five-layer architecture, canonical object model, control/data plane split, API contracts, and deployment topology.",
    accent: "#4F7EF7",
    tag: "ENGINEERING REVIEW",
  },
  {
    to: "/explorer",
    label: "03",
    title: "Architecture Explorer",
    subtitle: "Interactive Reference",
    description:
      "Live browser for every diagram, module, API surface, workflow sequence, data model, and roadmap phase. Navigate by audience or layer.",
    accent: "#9B6EF5",
    tag: "ALL AUDIENCES",
  },
];

const WALKTHROUGHS = [
  {
    id: "ceo",
    title: "CEO Storyline",
    duration: "~12 min",
    audience: "Executive",
    description: "Problem framing → platform thesis → architecture → MVP workflow → roadmap → the ask.",
    steps: ["Overview", "Executive Brief", "Blueprint", "Diagrams", "Explorer", "Documents"],
    to: "/executive",
    color: "#00D4AA",
  },
  {
    id: "tech",
    title: "Technical Deep Dive",
    duration: "~25 min",
    audience: "Engineering",
    description: "Architecture layers → object model → API contracts → deployment → implementation guidance.",
    steps: ["Blueprint", "Diagrams", "Explorer", "Dashboards", "Appendix"],
    to: "/blueprint",
    color: "#4F7EF7",
  },
];

const PLATFORM_FACTS = [
  { value: "5", label: "Architecture Layers", sub: "L1 Services → L5 Experience" },
  { value: "9", label: "Canonical Objects", sub: "Shared legal data model" },
  { value: "8", label: "Workflow Operators", sub: "AI agents per workflow step" },
  { value: "3", label: "Frontend Surfaces", sub: "Institution · Operator · Public" },
  { value: "6", label: "Existing Repos", sub: "Connected, not rebuilt" },
  { value: "18–27", label: "Weeks to Pilot", sub: "P0 to first B2B conversation" },
];

const CAPABILITY_SHIFT = [
  { from: "esheria-ocr", to: "Document Ingestion Operator", layer: "L1 → L2" },
  { from: "esheria-contract-engine", to: "Compliance & Clause Engine", layer: "L1 → L2" },
  { from: "esheria-ai", to: "Research & Citation Operator", layer: "L1 → L2" },
  { from: "lexdraft", to: "Drafting & Redline Engine", layer: "L1 → L2" },
  { from: "esheria-analytics", to: "Analytics Event Pipeline", layer: "L1 → L2 (evolve)" },
];

// ─── ANIMATED COUNTER ─────────────────────────────────────────
function AnimatedStat({ value, label, sub, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      <div style={{
        fontSize: "clamp(2rem, 4vw, 3rem)",
        fontFamily: "'DM Mono', 'JetBrains Mono', monospace",
        fontWeight: 700,
        color: "#00D4AA",
        letterSpacing: "-0.02em",
        lineHeight: 1,
        marginBottom: "6px",
      }}>
        {value}
      </div>
      <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--tone-text)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px" }}>
        {label}
      </div>
      <div style={{ fontSize: "11px", color: "var(--tone-muted)" }}>{sub}</div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────
export default function OverviewPage() {
  const totalSections = portalSections.length;
  const totalAssets = portalSections.reduce((c, s) => c + s.items.length, 0);
  const [hoveredView, setHoveredView] = useState(null);
  const [hoveredTrack, setHoveredTrack] = useState(null);

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "var(--tone-bg)",
      color: "var(--tone-text)",
      fontFamily: "'DM Sans', 'Inter', sans-serif",
      overflowX: "hidden",
    }}>
      {/* -- NOISE TEXTURE OVERLAY -- */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        opacity: 0.6,
      }} />

      {/* -- HERO GRADIENT -- */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "700px", pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 50% at 50% -10%, #00D4AA18 0%, transparent 70%)",
        zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ══ HERO ═════════════════════════════════════════════ */}
        <section style={{ padding: "clamp(64px, 10vw, 120px) clamp(24px, 5vw, 80px) 80px" }}>

          {/* Kicker */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "5px 14px", borderRadius: "100px",
            background: "#00D4AA0A", border: "1px solid #00D4AA30",
            marginBottom: "32px",
          }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00D4AA", boxShadow: "0 0 8px #00D4AA" }} />
            <span style={{ fontSize: "11px", color: "#00D4AA", letterSpacing: "0.1em", fontWeight: 600 }}>
              UNIFIED ARCHITECTURE REVIEW SYSTEM
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "var(--tone-text-strong)",
            maxWidth: "900px",
            margin: "0 0 8px",
          }}>
            From five isolated AI{" "}
            <span style={{
              background: "linear-gradient(90deg, #00D4AA, #4F7EF7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              capabilities
            </span>{" "}
            to one coherent{" "}
            <span style={{ color: "var(--tone-text-strong)" }}>legal workflow platform.</span>
          </h1>

          {/* Subhead */}
          <p style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "var(--tone-subtle)",
            maxWidth: "680px",
            lineHeight: 1.7,
            margin: "28px 0 48px",
            fontWeight: 400,
          }}>
            Esheria already has OCR, contract analysis, legal research, AI drafting, and analytics. This review
            package proposes the orchestration layer that makes them one platform — with shared objects, audit
            trails, human review, and enterprise-grade workflow governance.
          </p>

          {/* CTA row */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
            <Link to="/executive" style={{ textDecoration: "none" }}>
              <div style={{
                padding: "13px 28px", borderRadius: "8px",
                background: "#00D4AA",
                color: "var(--tone-bg)",
                fontWeight: 700, fontSize: "14px",
                letterSpacing: "0.04em",
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: "0 0 32px #00D4AA40",
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                Start CEO Walkthrough →
              </div>
            </Link>
            <Link to="/blueprint" style={{ textDecoration: "none" }}>
              <div style={{
                padding: "13px 28px", borderRadius: "8px",
                border: "1px solid var(--tone-border)",
                background: "var(--tone-surface)",
                color: "var(--tone-subtle)",
                fontWeight: 600, fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#4F7EF760"; e.currentTarget.style.color = "var(--tone-text)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--tone-border)"; e.currentTarget.style.color = "var(--tone-subtle)"; }}
              >
                Technical Blueprint
              </div>
            </Link>
            <Link to="/explorer" style={{ textDecoration: "none" }}>
              <div style={{
                padding: "13px 28px", borderRadius: "8px",
                border: "1px solid var(--tone-border)",
                background: "var(--tone-surface)",
                color: "var(--tone-subtle)",
                fontWeight: 600, fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#9B6EF560"; e.currentTarget.style.color = "var(--tone-text)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--tone-border)"; e.currentTarget.style.color = "var(--tone-subtle)"; }}
              >
                Architecture Explorer
              </div>
            </Link>
          </div>
        </section>

        {/* ══ THE CORE ARGUMENT ════════════════════════════════ */}
        <section style={{
          padding: "0 clamp(24px, 5vw, 80px) 80px",
          borderBottom: "1px solid var(--tone-border)",
        }}>
          <div style={{
            background: "linear-gradient(135deg, var(--tone-surface), var(--tone-surface-2))",
            border: "1px solid var(--tone-border)",
            borderRadius: "16px",
            padding: "clamp(32px, 5vw, 56px)",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Background accent */}
            <div style={{
              position: "absolute", top: 0, right: 0, width: "40%", height: "100%",
              background: "radial-gradient(ellipse at 100% 50%, #00D4AA08, transparent 60%)",
              pointerEvents: "none",
            }} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px, 5vw, 64px)", alignItems: "start" }}>

              {/* Left: The problem */}
              <div>
                <div style={{
                  fontSize: "10px", letterSpacing: "0.14em", fontWeight: 700,
                  color: "#E8506A", marginBottom: "16px",
                  display: "flex", alignItems: "center", gap: "8px",
                }}>
                  <div style={{ width: "20px", height: "1px", background: "#E8506A" }} />
                  THE CURRENT STATE
                </div>
                <h2 style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", fontWeight: 700, color: "var(--tone-text-strong)", lineHeight: 1.3, margin: "0 0 20px", letterSpacing: "-0.02em" }}>
                  Five capabilities. No platform.
                </h2>
                <p style={{ fontSize: "14px", color: "var(--tone-subtle)", lineHeight: 1.8, margin: "0 0 24px" }}>
                  Esheria's current repos — OCR, contract engine, AI research, drafting, analytics — each do their
                  job well. But they operate without a shared data model, shared workflow state, or orchestration layer.
                  No canonical objects. No audit trail. No approval chains.
                </p>
                <p style={{ fontSize: "14px", color: "var(--tone-subtle)", lineHeight: 1.8, margin: 0 }}>
                  Enterprise B2B buyers don't buy isolated AI features indefinitely. They buy repeatable, auditable
                  workflows with evidence chains, SLA enforcement, and compliance reporting. Esheria currently
                  cannot sell that story.
                </p>
              </div>

              {/* Right: The shift */}
              <div>
                <div style={{
                  fontSize: "10px", letterSpacing: "0.14em", fontWeight: 700,
                  color: "#00D4AA", marginBottom: "16px",
                  display: "flex", alignItems: "center", gap: "8px",
                }}>
                  <div style={{ width: "20px", height: "1px", background: "#00D4AA" }} />
                  THE PROPOSED SHIFT
                </div>
                <h2 style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", fontWeight: 700, color: "var(--tone-text-strong)", lineHeight: 1.3, margin: "0 0 20px", letterSpacing: "-0.02em" }}>
                  Build the layer above, not the sixth feature.
                </h2>

                {/* Capability shift rows */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {CAPABILITY_SHIFT.map((item, i) => (
                    <div key={i} style={{
                      display: "grid", gridTemplateColumns: "1fr 24px 1fr auto",
                      alignItems: "center", gap: "8px",
                      padding: "8px 12px", borderRadius: "6px",
                      background: "var(--tone-bg)",
                      border: "1px solid var(--tone-border)",
                      fontSize: "11px",
                    }}>
                      <span style={{ fontFamily: "'DM Mono', monospace", color: "var(--tone-muted)" }}>{item.from}</span>
                      <span style={{ color: "#00D4AA", textAlign: "center" }}>→</span>
                      <span style={{ color: "var(--tone-text)", fontWeight: 600 }}>{item.to}</span>
                      <span style={{
                        padding: "2px 7px", borderRadius: "4px",
                        background: "#00D4AA12", border: "1px solid #00D4AA25",
                        color: "#00D4AA", fontSize: "10px", fontWeight: 600,
                        whiteSpace: "nowrap", letterSpacing: "0.04em",
                      }}>{item.layer}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ PLATFORM STATS ═══════════════════════════════════ */}
        <section style={{
          padding: "72px clamp(24px, 5vw, 80px)",
          borderBottom: "1px solid var(--tone-border)",
        }}>
          <div style={{ marginBottom: "48px" }}>
            <div style={{ fontSize: "10px", letterSpacing: "0.14em", fontWeight: 700, color: "var(--tone-muted)", marginBottom: "12px" }}>
              PLATFORM ARCHITECTURE AT A GLANCE
            </div>
            <h2 style={{ fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 700, color: "var(--tone-text-strong)", margin: 0, letterSpacing: "-0.02em" }}>
              The architecture in numbers.
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "1px",
            background: "var(--tone-border)",
            border: "1px solid var(--tone-border)",
            borderRadius: "12px",
            overflow: "hidden",
          }}>
            {PLATFORM_FACTS.map((fact, i) => (
              <div key={i} style={{
                background: "var(--tone-bg)",
                padding: "32px 24px",
                transition: "background 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--tone-surface)"}
                onMouseLeave={e => e.currentTarget.style.background = "var(--tone-bg)"}
              >
                <AnimatedStat {...fact} delay={i * 80} />
              </div>
            ))}
          </div>
        </section>

        {/* ══ RECOMMENDED WALKTHROUGHS ═════════════════════════ */}
        <section style={{ padding: "72px clamp(24px, 5vw, 80px)", borderBottom: "1px solid var(--tone-border)" }}>
          <div style={{ marginBottom: "48px" }}>
            <div style={{ fontSize: "10px", letterSpacing: "0.14em", fontWeight: 700, color: "var(--tone-muted)", marginBottom: "12px" }}>
              RECOMMENDED ENTRY POINTS
            </div>
            <h2 style={{ fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 700, color: "var(--tone-text-strong)", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
              Choose your path through the material.
            </h2>
            <p style={{ fontSize: "14px", color: "var(--tone-subtle)", margin: 0, maxWidth: "520px", lineHeight: 1.7 }}>
              Each walkthrough is a curated sequence through the review surfaces. Start here if you're opening this for the first time.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "16px" }}>
            {WALKTHROUGHS.map((track) => (
              <Link key={track.id} to={track.to} style={{ textDecoration: "none" }}>
                <div
                  onMouseEnter={() => setHoveredTrack(track.id)}
                  onMouseLeave={() => setHoveredTrack(null)}
                  style={{
                    background: "var(--tone-surface)",
                    border: `1px solid ${hoveredTrack === track.id ? track.color + "50" : "var(--tone-border)"}`,
                    borderRadius: "12px",
                    padding: "32px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    transform: hoveredTrack === track.id ? "translateY(-3px)" : "translateY(0)",
                    boxShadow: hoveredTrack === track.id ? `0 16px 48px ${track.color}18` : "none",
                    height: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  {/* Header */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
                    <div>
                      <div style={{
                        fontSize: "10px", letterSpacing: "0.1em", fontWeight: 700,
                        color: track.color, marginBottom: "8px",
                      }}>
                        {track.audience.toUpperCase()} TRACK · {track.duration}
                      </div>
                      <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--tone-text-strong)", letterSpacing: "-0.01em" }}>
                        {track.title}
                      </div>
                    </div>
                    <div style={{
                      width: "36px", height: "36px", borderRadius: "8px",
                      border: `1px solid ${track.color}40`,
                      background: `${track.color}10`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: track.color, fontSize: "16px",
                      flexShrink: 0,
                    }}>→</div>
                  </div>

                  <p style={{ fontSize: "13px", color: "var(--tone-subtle)", lineHeight: 1.7, margin: "0 0 24px" }}>
                    {track.description}
                  </p>

                  {/* Step sequence */}
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                    {track.steps.map((step, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <div style={{
                          padding: "3px 10px", borderRadius: "4px",
                          background: i === 0 ? `${track.color}20` : "var(--tone-surface-2)",
                          border: `1px solid ${i === 0 ? track.color + "40" : "var(--tone-border)"}`,
                          fontSize: "11px",
                          color: i === 0 ? track.color : "var(--tone-muted)",
                          fontWeight: i === 0 ? 700 : 400,
                          fontFamily: "'DM Mono', monospace",
                        }}>
                          {step}
                        </div>
                        {i < track.steps.length - 1 && (
                          <span style={{ color: "var(--tone-dim)", fontSize: "10px" }}>›</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ══ CORE VIEWS ════════════════════════════════════════ */}
        <section style={{ padding: "72px clamp(24px, 5vw, 80px)", borderBottom: "1px solid var(--tone-border)" }}>
          <div style={{ marginBottom: "48px" }}>
            <div style={{ fontSize: "10px", letterSpacing: "0.14em", fontWeight: 700, color: "var(--tone-muted)", marginBottom: "12px" }}>
              CORE VIEWS
            </div>
            <h2 style={{ fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 700, color: "var(--tone-text-strong)", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
              Three ways into the material.
            </h2>
            <p style={{ fontSize: "14px", color: "var(--tone-subtle)", margin: 0, maxWidth: "520px", lineHeight: 1.7 }}>
              Each view is purpose-built for a different audience and level of depth. Use the Executive Brief for the board conversation. Use the Blueprint for the engineering review. Use the Explorer for interactive navigation.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
            {PRIMARY_VIEWS.map((view) => (
              <Link key={view.to} to={view.to} style={{ textDecoration: "none" }}>
                <div
                  onMouseEnter={() => setHoveredView(view.to)}
                  onMouseLeave={() => setHoveredView(null)}
                  style={{
                    background: "var(--tone-surface)",
                    border: `1px solid ${hoveredView === view.to ? view.accent + "50" : "var(--tone-border)"}`,
                    borderRadius: "12px",
                    padding: "32px",
                    cursor: "pointer",
                    transition: "all 0.25s",
                    transform: hoveredView === view.to ? "translateY(-4px)" : "translateY(0)",
                    boxShadow: hoveredView === view.to ? `0 20px 60px ${view.accent}18` : "none",
                    position: "relative",
                    overflow: "hidden",
                    height: "100%", boxSizing: "border-box",
                  }}
                >
                  {/* Accent top line */}
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                    background: `linear-gradient(90deg, ${view.accent}, transparent)`,
                    opacity: hoveredView === view.to ? 1 : 0.4,
                    transition: "opacity 0.25s",
                  }} />

                  {/* Number + tag */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
                    <div style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "11px", fontWeight: 700,
                      color: view.accent, opacity: 0.6,
                    }}>
                      {view.label}
                    </div>
                    <div style={{
                      padding: "3px 10px", borderRadius: "4px",
                      background: `${view.accent}12`,
                      border: `1px solid ${view.accent}25`,
                      fontSize: "10px", color: view.accent,
                      fontWeight: 700, letterSpacing: "0.06em",
                    }}>
                      {view.tag}
                    </div>
                  </div>

                  <div style={{ fontSize: "10px", color: "var(--tone-muted)", letterSpacing: "0.1em", fontWeight: 600, marginBottom: "8px" }}>
                    {view.subtitle.toUpperCase()}
                  </div>
                  <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--tone-text-strong)", letterSpacing: "-0.01em", marginBottom: "16px" }}>
                    {view.title}
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--tone-subtle)", lineHeight: 1.7, margin: "0 0 28px" }}>
                    {view.description}
                  </p>

                  <div style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    fontSize: "12px", fontWeight: 700, color: view.accent,
                    letterSpacing: "0.04em",
                    transition: "gap 0.2s",
                  }}>
                    Open View
                    <span style={{ transition: "transform 0.2s", transform: hoveredView === view.to ? "translateX(4px)" : "translateX(0)" }}>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ══ ARTIFACT SURFACES ════════════════════════════════ */}
        <section style={{ padding: "72px clamp(24px, 5vw, 80px)", borderBottom: "1px solid var(--tone-border)" }}>
          <div style={{ marginBottom: "48px" }}>
            <div style={{ fontSize: "10px", letterSpacing: "0.14em", fontWeight: 700, color: "var(--tone-muted)", marginBottom: "12px" }}>
              ALL ARTIFACT SURFACES
            </div>
            <h2 style={{ fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 700, color: "var(--tone-text-strong)", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
              Every deliverable, indexed and linked.
            </h2>
            <p style={{ fontSize: "14px", color: "var(--tone-subtle)", margin: 0, maxWidth: "520px", lineHeight: 1.7 }}>
              {totalSections} sections covering {totalAssets} linked assets — diagrams, documents, API specs, mockup briefs, and interactive models.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "12px",
          }}>
            {presentationSections.map((section, i) => (
              <Link key={section.id} to={`/${section.id}`} style={{ textDecoration: "none" }}>
                <div style={{
                  background: "var(--tone-surface)",
                  border: "1px solid var(--tone-border)",
                  borderRadius: "10px",
                  padding: "20px 24px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "var(--tone-dim)";
                    e.currentTarget.style.background = "var(--tone-surface-2)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "var(--tone-border)";
                    e.currentTarget.style.background = "var(--tone-surface)";
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--tone-text)" }}>
                      {section.title}
                    </div>
                    <div style={{
                      fontSize: "10px", color: "var(--tone-muted)",
                      fontFamily: "'DM Mono', monospace",
                      background: "var(--tone-surface-2)", border: "1px solid var(--tone-border)",
                      padding: "2px 8px", borderRadius: "4px",
                      whiteSpace: "nowrap", flexShrink: 0, marginLeft: "8px",
                    }}>
                      {section.items.length} assets
                    </div>
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--tone-muted)", lineHeight: 1.6 }}>
                    {section.description}
                  </div>
                  {section.bestFor && (
                    <div style={{
                      fontSize: "10px", color: "#4F7EF7",
                      fontWeight: 600, letterSpacing: "0.04em",
                      marginTop: "4px",
                    }}>
                      ↳ {section.bestFor}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ══ BOTTOM CTA STRIP ═════════════════════════════════ */}
        <section style={{ padding: "64px clamp(24px, 5vw, 80px) 80px" }}>
          <div style={{
            background: "linear-gradient(135deg, var(--tone-surface), var(--tone-surface-2))",
            border: "1px solid var(--tone-border)",
            borderRadius: "16px",
            padding: "clamp(32px, 5vw, 56px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "32px",
            flexWrap: "wrap",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
              background: "radial-gradient(ellipse at 0% 50%, #00D4AA08, transparent 50%)",
              pointerEvents: "none",
            }} />
            <div style={{ position: "relative" }}>
              <div style={{ fontSize: "10px", letterSpacing: "0.14em", color: "var(--tone-muted)", fontWeight: 700, marginBottom: "12px" }}>
                WHAT YOU'RE LOOKING AT
              </div>
              <div style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", fontWeight: 700, color: "var(--tone-text-strong)", letterSpacing: "-0.02em", maxWidth: "520px", lineHeight: 1.3 }}>
                A complete architecture review package for the Esheria Legal Workflow OS platform proposal.
              </div>
              <p style={{ fontSize: "14px", color: "var(--tone-subtle)", lineHeight: 1.7, marginTop: "16px", maxWidth: "480px" }}>
                Built to present a single strategic argument: that connecting Esheria's existing capabilities into
                a programmable workflow platform is the highest-leverage move available. Every artifact in this
                system supports that argument from a different angle.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", position: "relative", flexShrink: 0 }}>
              <Link to="/executive" style={{ textDecoration: "none" }}>
                <div style={{
                  padding: "13px 28px", borderRadius: "8px",
                  background: "#00D4AA", color: "var(--tone-bg)",
                  fontWeight: 700, fontSize: "14px",
                  textAlign: "center", cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: "0 0 32px #00D4AA30",
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                >
                  Executive Brief →
                </div>
              </Link>
              <Link to="/blueprint" style={{ textDecoration: "none" }}>
                <div style={{
                  padding: "13px 28px", borderRadius: "8px",
                  border: "1px solid var(--tone-border)", background: "transparent",
                  color: "var(--tone-subtle)", fontWeight: 600, fontSize: "14px",
                  textAlign: "center", cursor: "pointer",
                  transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#4F7EF760"; e.currentTarget.style.color = "var(--tone-text)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--tone-border)"; e.currentTarget.style.color = "var(--tone-subtle)"; }}
                >
                  Technical Blueprint
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ══ FOOTER ═══════════════════════════════════════════ */}
        <footer style={{
          borderTop: "1px solid var(--tone-border)",
          padding: "24px clamp(24px, 5vw, 80px)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "16px", flexWrap: "wrap",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--tone-dim)", letterSpacing: "0.1em" }}>
              ESHERIA
            </span>
            <span style={{ fontSize: "11px", color: "var(--tone-dim)" }}>
              Legal Workflow OS · Architecture Review Package · Vincent Nyamao · 2025
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{
              fontFamily: "'DM Mono', monospace", fontSize: "11px",
              color: "var(--tone-dim)", background: "var(--tone-surface)",
              border: "1px solid var(--tone-border)", borderRadius: "4px",
              padding: "3px 10px",
            }}>
              localhost:8080/overview
            </div>
            <div style={{ fontSize: "11px", color: "var(--tone-dim)" }}>
              {totalSections} sections · {totalAssets} assets · All validations passed
            </div>
          </div>
        </footer>

      </div>

      {/* ── GOOGLE FONTS ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&family=DM+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; }
        ::selection { background: #00D4AA25; color: var(--tone-text-strong); }
        scrollbar-width: thin;
        scrollbar-color: var(--tone-border) var(--tone-bg);
      `}</style>
    </div>
  );
}

