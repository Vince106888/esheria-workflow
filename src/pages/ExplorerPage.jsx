import { useMemo, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import architectureModel from "../architecture/architectureModel";
import diagramRegistry from "../architecture/diagramRegistry";
import { getDiagramPreview } from "../architecture/diagramPreviews";
import { Reveal, SectionHead, Chip, EmptyState as Empty } from "../components/presentation/Primitives";

// ─── VIEW CONFIG ──────────────────────────────────────────────
const VIEWS = [
  { id: "diagrams",  label: "Diagrams",  icon: "◈", shortcut: "1", color: "#00D4AA", desc: "Full diagram registry with audience coverage and purpose annotations." },
  { id: "modules",   label: "Modules",   icon: "⬡", shortcut: "2", color: "#4F7EF7", desc: "Customer and operator module capabilities mapped to platform surfaces." },
  { id: "apis",      label: "APIs",      icon: "≋", shortcut: "3", color: "#9B6EF5", desc: "Cross-service auth models, key domains, and integration-ready endpoints." },
  { id: "workflows", label: "Workflows", icon: "⟳", shortcut: "4", color: "#E8A020", desc: "Workflow states, step sequences, and connector dependency chains." },
  { id: "ontology",  label: "Ontology",  icon: "◎", shortcut: "5", color: "#00D4AA", desc: "Canonical entity definitions and field-level data contracts." },
  { id: "roadmap",   label: "Roadmap",   icon: "◷", shortcut: "6", color: "#4F7EF7", desc: "Phased implementation outcomes, durations, and milestones." },
];

const AUDIENCE_COLORS = {
  executive: "#00D4AA",
  technical: "#4F7EF7",
  product: "#9B6EF5",
  all: "#E8A020",
};

// ─── REVEAL ───────────────────────────────────────────────────

// ─── SECTION HEADER ───────────────────────────────────────────

// ─── CHIP ─────────────────────────────────────────────────────

// ─── EMPTY STATE ──────────────────────────────────────────────

// ═══════════════════════════════════════════════════════════════
// VIEW: DIAGRAMS
// ═══════════════════════════════════════════════════════════════
function DiagramsView({ search }) {
  const [activeId, setActiveId] = useState(null);
  const diagrams = diagramRegistry || [];
  const filtered = search
    ? diagrams.filter(d =>
        d.title?.toLowerCase().includes(search) ||
        d.purpose?.toLowerCase().includes(search) ||
        d.audiences?.some(a => a.toLowerCase().includes(search))
      )
    : diagrams;

  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach(d => {
      const aud = d.audiences?.[0] || "all";
      if (!map[aud]) map[aud] = [];
      map[aud].push(d);
    });
    return map;
  }, [filtered]);

  if (filtered.length === 0) return <Empty label="diagramRegistry" />;

  return (
    <div>
      {Object.entries(grouped).map(([audience, items], gi) => {
        const color = AUDIENCE_COLORS[audience] || "#586070";
        return (
          <Reveal key={audience} delay={gi * 60}>
            <div style={{ marginBottom: "40px" }}>
              <SectionHead label={`${audience} · ${items.length} diagrams`} color={color} />
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: "10px",
              }}>
                {items.map((d) => {
                  const isActive = activeId === d.id;
                  const previewSrc = getDiagramPreview(d.id);
                  return (
                    <div
                      key={d.id}
                      onClick={() => setActiveId(isActive ? null : d.id)}
                      style={{
                        background: "var(--tone-surface)",
                        border: `1px solid ${isActive ? color + "50" : "var(--tone-border)"}`,
                        borderRadius: "8px", overflow: "hidden",
                        cursor: "pointer", transition: "all 0.2s",
                        boxShadow: isActive ? `0 8px 24px ${color}12` : "none",
                      }}
                      onMouseEnter={e => !isActive && (e.currentTarget.style.borderColor = "var(--tone-dim)")}
                      onMouseLeave={e => !isActive && (e.currentTarget.style.borderColor = "var(--tone-border)")}
                    >
                      {/* Thumbnail */}
                      <div style={{
                        aspectRatio: "16/9", background: "var(--tone-surface-2)",
                        borderBottom: "1px solid var(--tone-border)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        position: "relative", overflow: "hidden",
                      }}>
                        {previewSrc
                          ? <img src={previewSrc} alt={d.title} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "8px" }} />
                          : <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "var(--tone-dim)" }}>{d.id}</div>
                        }
                        <div style={{
                          position: "absolute", bottom: "8px", right: "8px",
                          display: "flex", gap: "4px",
                        }}>
                          {d.audiences?.map(a => (
                            <div key={a} style={{
                              padding: "2px 7px", borderRadius: "3px",
                              background: "var(--tone-bg-overlay)", border: `1px solid ${AUDIENCE_COLORS[a] || "#586070"}40`,
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: "9px", color: AUDIENCE_COLORS[a] || "#586070",
                              fontWeight: 700,
                            }}>{a}</div>
                          ))}
                        </div>
                      </div>
                      {/* Info */}
                      <div style={{ padding: "14px 16px" }}>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "var(--tone-dim)", marginBottom: "4px" }}>{d.id}</div>
                        <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--tone-text-strong)", marginBottom: "6px" }}>{d.title}</div>
                        {d.purpose && <div style={{ fontSize: "11px", color: "var(--tone-muted)", lineHeight: 1.6 }}>{d.purpose}</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// VIEW: MODULES
// ═══════════════════════════════════════════════════════════════
function ModulesView({ search }) {
  const [expanded, setExpanded] = useState(null);
  const customer = architectureModel?.customerModules || [];
  const operator = architectureModel?.operatorModules || [];

  const filterModules = (mods) => search
    ? mods.filter(m => m.name?.toLowerCase().includes(search) || m.id?.toLowerCase().includes(search) || m.capabilities?.some(c => c.toLowerCase().includes(search)))
    : mods;

  const filteredCustomer = filterModules(customer);
  const filteredOperator = filterModules(operator);

  function ModuleGrid({ modules, color }) {
    if (modules.length === 0) return <div style={{ padding: "24px", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "var(--tone-dim)" }}>// no results</div>;
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "8px" }}>
        {modules.map((mod) => {
          const isExpanded = expanded === mod.id;
          return (
            <div
              key={mod.id}
              onClick={() => setExpanded(isExpanded ? null : mod.id)}
              style={{
                background: "var(--tone-surface)",
                border: `1px solid ${isExpanded ? color + "40" : "var(--tone-border)"}`,
                borderRadius: "8px", padding: "16px 18px",
                cursor: "pointer", transition: "all 0.2s",
              }}
              onMouseEnter={e => !isExpanded && (e.currentTarget.style.borderColor = "var(--tone-dim)")}
              onMouseLeave={e => !isExpanded && (e.currentTarget.style.borderColor = "var(--tone-border)")}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "8px" }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--tone-text-strong)", marginBottom: "3px" }}>{mod.name}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "var(--tone-dim)" }}>{mod.id}</div>
                </div>
                <div style={{
                  padding: "2px 8px", borderRadius: "3px",
                  background: `${color}10`, border: `1px solid ${color}25`,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "9px", color, fontWeight: 700,
                }}>{mod.capabilities?.length || 0}</div>
              </div>
              {/* Preview or expanded */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "10px" }}>
                {(isExpanded ? mod.capabilities : mod.capabilities?.slice(0, 3))?.map(cap => (
                  <Chip key={cap} text={cap} color={color} />
                ))}
                {!isExpanded && (mod.capabilities?.length || 0) > 3 && (
                  <div style={{ fontSize: "11px", color: "var(--tone-dim)", padding: "2px 4px" }}>
                    +{mod.capabilities.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (filteredCustomer.length === 0 && filteredOperator.length === 0) return <Empty label="modules" />;

  return (
    <div>
      <Reveal>
        <div style={{ marginBottom: "40px" }}>
          <SectionHead label={`Customer Modules · ${filteredCustomer.length}`} color="#4F7EF7" />
          <ModuleGrid modules={filteredCustomer} color="#4F7EF7" />
        </div>
      </Reveal>
      <Reveal delay={80}>
        <div>
          <SectionHead label={`Operator Modules · ${filteredOperator.length}`} color="#9B6EF5" />
          <ModuleGrid modules={filteredOperator} color="#9B6EF5" />
        </div>
      </Reveal>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// VIEW: APIs
// ═══════════════════════════════════════════════════════════════
function ApisView({ search }) {
  const [activeRow, setActiveRow] = useState(null);

  const apiRows = useMemo(() => {
    const catalog = architectureModel?.apiCatalog || {};
    return Object.entries(catalog).map(([service, value]) => ({
      service,
      authModel: value.authModel,
      keyDomains: value.keyDomains || [],
      endpoints: value.integrationReadyEndpoints || [],
      constraints: value.constraints || [],
    }));
  }, []);

  const filtered = search
    ? apiRows.filter(r =>
        r.service.toLowerCase().includes(search) ||
        r.authModel?.toLowerCase().includes(search) ||
        r.keyDomains.some(d => d.toLowerCase().includes(search))
      )
    : apiRows;

  if (filtered.length === 0) return <Empty label="apiCatalog" />;

  return (
    <Reveal>
      <div style={{ border: "1px solid var(--tone-border)", borderRadius: "8px", overflow: "hidden" }}>
        {/* Header */}
        <div style={{
          display: "grid", gridTemplateColumns: "180px 160px 1fr 1fr",
          background: "var(--tone-surface-2)", borderBottom: "1px solid var(--tone-border)",
        }}>
          {["Service", "Auth Model", "Key Domains", "Integration Endpoints"].map((h, i) => (
            <div key={i} style={{
              padding: "11px 16px",
              borderRight: i < 3 ? "1px solid var(--tone-border)" : "none",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px", fontWeight: 700, color: "#9B6EF5", letterSpacing: "0.1em",
            }}>{h.toUpperCase()}</div>
          ))}
        </div>

        {filtered.map((row, i) => {
          const isActive = activeRow === row.service;
          return (
            <div key={row.service}>
              <div
                onClick={() => setActiveRow(isActive ? null : row.service)}
                style={{
                  display: "grid", gridTemplateColumns: "180px 160px 1fr 1fr",
                  borderBottom: isActive ? "none" : (i < filtered.length - 1 ? "1px solid var(--tone-surface-2)" : "none"),
                  background: isActive ? "var(--tone-surface)" : i % 2 === 0 ? "var(--tone-bg)" : "var(--tone-bg-elevated)",
                  cursor: "pointer", transition: "background 0.15s",
                }}
                onMouseEnter={e => !isActive && (e.currentTarget.style.background = "var(--tone-surface)")}
                onMouseLeave={e => !isActive && (e.currentTarget.style.background = i % 2 === 0 ? "var(--tone-bg)" : "var(--tone-bg-elevated)")}
              >
                {/* Service */}
                <div style={{ padding: "14px 16px", borderRight: "1px solid var(--tone-surface-2)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#9B6EF5", flexShrink: 0 }} />
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", fontWeight: 700, color: "var(--tone-text)" }}>
                      {row.service}
                    </span>
                  </div>
                </div>
                {/* Auth */}
                <div style={{ padding: "14px 16px", borderRight: "1px solid var(--tone-surface-2)" }}>
                  <Chip text={row.authModel || "—"} color="#9B6EF5" mono />
                </div>
                {/* Domains */}
                <div style={{ padding: "12px 16px", borderRight: "1px solid var(--tone-surface-2)", display: "flex", flexWrap: "wrap", gap: "4px", alignItems: "flex-start" }}>
                  {row.keyDomains.slice(0, 3).map(d => <Chip key={d} text={d} color="#4F7EF7" />)}
                  {row.keyDomains.length > 3 && <span style={{ fontSize: "10px", color: "var(--tone-dim)" }}>+{row.keyDomains.length - 3}</span>}
                </div>
                {/* Endpoints */}
                <div style={{ padding: "12px 16px", display: "flex", flexWrap: "wrap", gap: "4px", alignItems: "flex-start" }}>
                  {row.endpoints.slice(0, 2).map(ep => <Chip key={ep} text={ep} color="#00D4AA" mono />)}
                  {row.endpoints.length > 2 && <span style={{ fontSize: "10px", color: "var(--tone-dim)" }}>+{row.endpoints.length - 2}</span>}
                </div>
              </div>

              {/* Expanded row */}
              {isActive && (
                <div style={{
                  background: "var(--tone-surface)",
                  borderBottom: i < filtered.length - 1 ? "1px solid var(--tone-border)" : "none",
                  padding: "16px 20px",
                  display: "grid", gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                }}>
                  <div>
                    <div style={{ fontSize: "10px", color: "var(--tone-muted)", letterSpacing: "0.08em", marginBottom: "8px", fontFamily: "'JetBrains Mono', monospace" }}>ALL DOMAINS</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {row.keyDomains.map(d => <Chip key={d} text={d} color="#4F7EF7" />)}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "10px", color: "var(--tone-muted)", letterSpacing: "0.08em", marginBottom: "8px", fontFamily: "'JetBrains Mono', monospace" }}>ALL ENDPOINTS</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {row.endpoints.map(ep => <Chip key={ep} text={ep} color="#00D4AA" mono />)}
                    </div>
                  </div>
                  {row.constraints.length > 0 && (
                    <div style={{ gridColumn: "1 / -1" }}>
                      <div style={{ fontSize: "10px", color: "#E8506A80", letterSpacing: "0.08em", marginBottom: "8px", fontFamily: "'JetBrains Mono', monospace" }}>CONSTRAINTS</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                        {row.constraints.map(c => <Chip key={c} text={c} color="#E8506A" />)}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}

// ═══════════════════════════════════════════════════════════════
// VIEW: WORKFLOWS
// ═══════════════════════════════════════════════════════════════
function WorkflowsView({ search }) {
  const [activeWf, setActiveWf] = useState(null);
  const workflows = architectureModel?.workflows || [];
  const filtered = search
    ? workflows.filter(w => w.name?.toLowerCase().includes(search) || w.id?.toLowerCase().includes(search))
    : workflows;

  if (filtered.length === 0) return <Empty label="workflows" />;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {filtered.map((wf, i) => {
        const isActive = activeWf === wf.id;
        return (
          <Reveal key={wf.id} delay={i * 40}>
            <div style={{
              background: "var(--tone-surface)",
              border: `1px solid ${isActive ? "#E8A02050" : "var(--tone-border)"}`,
              borderRadius: "8px", overflow: "hidden",
              transition: "all 0.2s",
            }}>
              {/* Header */}
              <div
                onClick={() => setActiveWf(isActive ? null : wf.id)}
                style={{
                  display: "grid", gridTemplateColumns: "auto 1fr auto",
                  alignItems: "center", gap: "16px",
                  padding: "16px 20px", cursor: "pointer",
                  borderBottom: isActive ? "1px solid var(--tone-border)" : "none",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--tone-surface-2)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <div style={{
                  width: "32px", height: "32px", borderRadius: "6px",
                  background: "#E8A02015", border: "1px solid #E8A02030",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "14px", color: "#E8A020",
                }}>⟳</div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--tone-text-strong)", marginBottom: "3px" }}>{wf.name}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "var(--tone-dim)" }}>{wf.id}</div>
                </div>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <div style={{ padding: "3px 10px", borderRadius: "4px", background: "#E8A02010", border: "1px solid #E8A02025", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#E8A020" }}>
                    {wf.states?.length || 0} states
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--tone-dim)", transition: "transform 0.2s", transform: isActive ? "rotate(90deg)" : "rotate(0)" }}>›</div>
                </div>
              </div>

              {/* Expanded */}
              {isActive && (
                <div style={{ padding: "20px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
                  <div>
                    <div style={{ fontSize: "9px", fontWeight: 700, color: "#E8A02080", letterSpacing: "0.12em", marginBottom: "10px", fontFamily: "'JetBrains Mono', monospace" }}>STATES</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      {wf.states?.map((s, si) => (
                        <div key={s} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          {si > 0 && <div style={{ width: "1px", height: "8px", background: "var(--tone-border)", marginLeft: "7px" }} />}
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: si === 0 ? "#E8A020" : si === wf.states.length - 1 ? "#00D4AA" : "var(--tone-dim)", flexShrink: 0 }} />
                            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "var(--tone-subtle)" }}>{s}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "9px", fontWeight: 700, color: "#4F7EF780", letterSpacing: "0.12em", marginBottom: "10px", fontFamily: "'JetBrains Mono', monospace" }}>STEPS</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      {wf.steps?.map((s, si) => (
                        <div key={si} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "var(--tone-dim)", marginTop: "2px", minWidth: "16px" }}>{String(si + 1).padStart(2, "0")}</span>
                          <span style={{ fontSize: "11px", color: "var(--tone-subtle)", lineHeight: 1.5 }}>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "9px", fontWeight: 700, color: "#9B6EF580", letterSpacing: "0.12em", marginBottom: "10px", fontFamily: "'JetBrains Mono', monospace" }}>CONNECTORS</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {wf.connectors?.map(c => <Chip key={c} text={c} color="#9B6EF5" mono />)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// VIEW: ONTOLOGY
// ═══════════════════════════════════════════════════════════════
function OntologyView({ search }) {
  const [activeEntity, setActiveEntity] = useState(null);
  const entities = architectureModel?.ontologyEntities || [];
  const filtered = search
    ? entities.filter(e => e.id?.toLowerCase().includes(search) || e.fields?.some(f => f.toLowerCase().includes(search)))
    : entities;

  if (filtered.length === 0) return <Empty label="ontologyEntities" />;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "8px" }}>
      {filtered.map((entity, i) => {
        const isActive = activeEntity === entity.id;
        return (
          <Reveal key={entity.id} delay={i * 30}>
            <div
              onClick={() => setActiveEntity(isActive ? null : entity.id)}
              style={{
                background: "var(--tone-surface)",
                border: `1px solid ${isActive ? "#00D4AA50" : "var(--tone-border)"}`,
                borderRadius: "8px", padding: "16px 18px",
                cursor: "pointer", transition: "all 0.2s",
                boxShadow: isActive ? "0 4px 16px #00D4AA10" : "none",
              }}
              onMouseEnter={e => !isActive && (e.currentTarget.style.borderColor = "var(--tone-dim)")}
              onMouseLeave={e => !isActive && (e.currentTarget.style.borderColor = "var(--tone-border)")}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", fontWeight: 700, color: isActive ? "#00D4AA" : "var(--tone-text)" }}>
                  {entity.id}
                </div>
                <div style={{
                  padding: "2px 8px", borderRadius: "3px",
                  background: "#00D4AA10", border: "1px solid #00D4AA20",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "9px", color: "#00D4AA",
                }}>{entity.fields?.length || 0} fields</div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                {(isActive ? entity.fields : entity.fields?.slice(0, 4))?.map((field, fi) => {
                  const parts = field.split(":").map(s => s.trim());
                  const fieldName = parts[0];
                  const fieldType = parts[1];
                  return (
                    <div key={fi} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "4px 8px", borderRadius: "4px",
                      background: "var(--tone-surface-2)",
                      gap: "8px",
                    }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "var(--tone-subtle)" }}>{fieldName}</span>
                      {fieldType && (
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#00D4AA60" }}>{fieldType}</span>
                      )}
                    </div>
                  );
                })}
                {!isActive && (entity.fields?.length || 0) > 4 && (
                  <div style={{ fontSize: "10px", color: "var(--tone-dim)", padding: "4px 8px", fontFamily: "'JetBrains Mono', monospace" }}>
                    + {entity.fields.length - 4} more fields
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// VIEW: ROADMAP
// ═══════════════════════════════════════════════════════════════
function RoadmapView({ search }) {
  const roadmap = architectureModel?.roadmap || [];
  const filtered = search
    ? roadmap.filter(p => p.phase?.toLowerCase().includes(search) || p.name?.toLowerCase().includes(search) || p.outcomes?.some(o => o.toLowerCase().includes(search)))
    : roadmap;

  if (filtered.length === 0) return <Empty label="roadmap" />;

  const PHASE_COLORS = ["#586070", "#4F7EF7", "#00D4AA", "#9B6EF5", "#E8A020"];

  return (
    <div>
      {/* Timeline strip */}
      <Reveal>
        <div style={{
          display: "flex", alignItems: "stretch",
          border: "1px solid var(--tone-border)", borderRadius: "8px",
          overflow: "hidden", marginBottom: "32px",
        }}>
          {roadmap.map((phase, i) => {
            const color = PHASE_COLORS[i] || "#586070";
            const isFilt = filtered.find(p => p.phase === phase.phase);
            return (
              <div key={phase.phase} style={{
                flex: 1, padding: "16px 14px",
                background: isFilt ? "var(--tone-surface)" : "var(--tone-bg)",
                borderRight: i < roadmap.length - 1 ? "1px solid var(--tone-border)" : "none",
                opacity: isFilt ? 1 : 0.4,
                transition: "opacity 0.2s",
              }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", fontWeight: 700, color, marginBottom: "4px" }}>{phase.phase}</div>
                <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--tone-text)", marginBottom: "4px", lineHeight: 1.3 }}>{phase.name}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "var(--tone-dim)" }}>{phase.duration}</div>
              </div>
            );
          })}
        </div>
      </Reveal>

      {/* Phase detail cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {filtered.map((phase, i) => {
          const phaseIdx = roadmap.findIndex(p => p.phase === phase.phase);
          const color = PHASE_COLORS[phaseIdx] || "#586070";
          return (
            <Reveal key={phase.phase} delay={i * 60}>
              <div style={{
                background: "var(--tone-surface)",
                border: `1px solid var(--tone-border)`,
                borderLeft: `3px solid ${color}`,
                borderRadius: "8px",
                padding: "24px 28px",
                display: "grid", gridTemplateColumns: "200px 1fr",
                gap: "32px", alignItems: "start",
              }}>
                {/* Left */}
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", fontWeight: 700, color, marginBottom: "6px" }}>{phase.phase}</div>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--tone-text-strong)", marginBottom: "8px", lineHeight: 1.3 }}>{phase.name}</div>
                  <div style={{
                    display: "inline-flex", padding: "4px 10px", borderRadius: "100px",
                    background: `${color}10`, border: `1px solid ${color}25`,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "10px", color,
                  }}>{phase.duration}</div>
                </div>
                {/* Right: outcomes */}
                <div>
                  <div style={{ fontSize: "9px", fontWeight: 700, color: "var(--tone-muted)", letterSpacing: "0.12em", marginBottom: "10px", fontFamily: "'JetBrains Mono', monospace" }}>OUTCOMES</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {phase.outcomes?.map((outcome, oi) => (
                      <div key={oi} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                        <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: color, marginTop: "6px", flexShrink: 0 }} />
                        <span style={{ fontSize: "13px", color: "var(--tone-subtle)", lineHeight: 1.6 }}>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════
export default function ExplorerPage() {
  const [view, setView] = useState("diagrams");
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);
  const activeView = VIEWS.find(v => v.id === view);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === "INPUT") return;
      if (e.key === "/") { e.preventDefault(); searchRef.current?.focus(); return; }
      const match = VIEWS.find(v => v.shortcut === e.key);
      if (match) { setView(match.id); setSearch(""); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const searchNorm = search.trim().toLowerCase();

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
          linear-gradient(var(--tone-grid) 1px, transparent 1px),
          linear-gradient(90deg, var(--tone-grid) 1px, transparent 1px)
        `,
        backgroundSize: "32px 32px",
      }} />
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 60% 40% at 50% 0%, var(--tone-glow) 0%, transparent 65%)",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ══ TOP BAR ══════════════════════════════════════ */}
        <header style={{
          height: "52px", borderBottom: "1px solid var(--tone-border)",
          background: "var(--tone-bg-glass)", backdropFilter: "blur(12px)",
          position: "sticky", top: 0, zIndex: 50,
          display: "flex", alignItems: "center",
          padding: "0 clamp(16px, 4vw, 64px)", gap: "16px",
        }}>
          {/* Left: breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Link to="/overview" style={{ textDecoration: "none" }}>
              <span style={{ fontSize: "11px", color: "var(--tone-dim)", fontFamily: "'JetBrains Mono', monospace", cursor: "pointer", transition: "color 0.15s" }}
                onMouseEnter={e => e.target.style.color = "var(--tone-muted)"}
                onMouseLeave={e => e.target.style.color = "var(--tone-dim)"}
              >overview</span>
            </Link>
            <span style={{ color: "var(--tone-border)", fontFamily: "monospace", margin: "0 2px" }}>/</span>
            <span style={{ fontSize: "11px", color: "#9B6EF5", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>explorer</span>
            <span style={{ color: "var(--tone-border)", fontFamily: "monospace", margin: "0 2px" }}>/</span>
            <span style={{ fontSize: "11px", color: "var(--tone-text)", fontFamily: "'JetBrains Mono', monospace" }}>{view}</span>
          </div>

          {/* Center: search */}
          <div style={{ flex: 1, maxWidth: "360px", margin: "0 auto", position: "relative" }}>
            <div style={{
              position: "absolute", left: "12px", top: "50%",
              transform: "translateY(-50%)", fontSize: "12px", color: "var(--tone-dim)",
              pointerEvents: "none",
            }}>⌕</div>
            <input
              ref={searchRef}
              type="text"
              placeholder={`Search ${view}…`}
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: "100%", padding: "7px 32px 7px 32px",
                background: "var(--tone-surface-2)", border: "1px solid var(--tone-border)",
                borderRadius: "6px", color: "var(--tone-text)",
                fontSize: "12px", fontFamily: "'JetBrains Mono', monospace",
                outline: "none", transition: "border-color 0.15s",
                boxSizing: "border-box",
              }}
              onFocus={e => e.target.style.borderColor = "var(--tone-dim)"}
              onBlur={e => e.target.style.borderColor = "var(--tone-border)"}
            />
            {search ? (
              <button onClick={() => setSearch("")} style={{
                position: "absolute", right: "10px", top: "50%",
                transform: "translateY(-50%)", background: "none", border: "none",
                color: "var(--tone-muted)", cursor: "pointer", fontSize: "11px", padding: "2px",
              }}>✕</button>
            ) : (
              <div style={{
                position: "absolute", right: "10px", top: "50%",
                transform: "translateY(-50%)",
                padding: "1px 6px", borderRadius: "3px",
                background: "var(--tone-border)", border: "1px solid var(--tone-dim)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "9px", color: "var(--tone-dim)",
                pointerEvents: "none",
              }}>/</div>
            )}
          </div>

          {/* Right: links */}
          <div style={{ display: "flex", gap: "8px", marginLeft: "auto" }}>
            <Link to="/executive" style={{ textDecoration: "none" }}>
              <div style={{ padding: "5px 12px", borderRadius: "5px", border: "1px solid var(--tone-border)", background: "transparent", color: "var(--tone-muted)", fontSize: "11px", fontWeight: 600, cursor: "pointer", transition: "all 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--tone-dim)"; e.currentTarget.style.color = "var(--tone-text)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--tone-border)"; e.currentTarget.style.color = "var(--tone-muted)"; }}
              >Executive</div>
            </Link>
            <Link to="/blueprint" style={{ textDecoration: "none" }}>
              <div style={{ padding: "5px 12px", borderRadius: "5px", border: "1px solid var(--tone-border)", background: "transparent", color: "var(--tone-muted)", fontSize: "11px", fontWeight: 600, cursor: "pointer", transition: "all 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--tone-dim)"; e.currentTarget.style.color = "var(--tone-text)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--tone-border)"; e.currentTarget.style.color = "var(--tone-muted)"; }}
              >Blueprint</div>
            </Link>
          </div>
        </header>

        {/* ══ PAGE HEADER ══════════════════════════════════ */}
        <section style={{ padding: "48px clamp(16px, 4vw, 64px) 18px", borderBottom: "1px solid var(--tone-border)" }}>
          <div style={{
            border: "1px solid var(--tone-border)",
            borderRadius: "16px",
            background: "linear-gradient(150deg, var(--explorer-hero-surface-start), var(--explorer-hero-surface-end) 66%)",
            padding: "26px 24px 0",
            marginBottom: "14px",
          }}>
            <div style={{ marginBottom: "24px" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                marginBottom: "16px", padding: "4px 12px",
                borderRadius: "999px", border: "1px solid #9B6EF550",
                background: "#9B6EF514",
              }}>
                <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#9B6EF5", boxShadow: "0 0 8px #9B6EF5" }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", fontWeight: 700, color: "#9B6EF5", letterSpacing: "0.1em" }}>
                  INTERACTIVE APPENDIX | ARCHITECTURE EXPLORER
                </span>
              </div>
              <h1 style={{
                fontSize: "clamp(2rem, 4.2vw, 3rem)", fontFamily: "'DM Sans', sans-serif",
                fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em",
                color: "var(--tone-text-strong)", margin: "0 0 12px", maxWidth: "640px",
              }}>
                Full model reference.
                <br />
                <span style={{
                  background: "linear-gradient(90deg, #9B6EF5, #4F7EF7)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>Six views.</span>
              </h1>
              <p style={{ fontSize: "14px", color: "var(--tone-muted)", margin: 0, maxWidth: "520px", lineHeight: 1.7 }}>
                Use after Executive and Blueprint review for deeper model-level validation.
                Press <kbd style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", background: "var(--tone-surface-2)", border: "1px solid var(--tone-dim)", borderRadius: "3px", padding: "1px 6px", color: "var(--tone-subtle)" }}>1</kbd>-<kbd style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", background: "var(--tone-surface-2)", border: "1px solid var(--tone-dim)", borderRadius: "3px", padding: "1px 6px", color: "var(--tone-subtle)" }}>6</kbd> to switch tabs, {" "}
                <kbd style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", background: "var(--tone-surface-2)", border: "1px solid var(--tone-dim)", borderRadius: "3px", padding: "1px 6px", color: "var(--tone-subtle)" }}>/</kbd> to search.
              </p>
            </div>

            <div style={{ display: "flex", gap: "2px", overflowX: "auto" }}>
              {VIEWS.map((v) => {
                const isActive = view === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => { setView(v.id); setSearch(""); }}
                    style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      padding: "10px 18px",
                      background: isActive ? "var(--tone-surface)" : "transparent",
                      border: "none",
                      borderBottom: `2px solid ${isActive ? v.color : "transparent"}`,
                      color: isActive ? "var(--tone-text-strong)" : "var(--tone-muted)",
                      cursor: "pointer", transition: "all 0.15s",
                      whiteSpace: "nowrap",
                      borderRadius: "6px 6px 0 0",
                    }}
                    onMouseEnter={e => !isActive && (e.currentTarget.style.color = "var(--tone-subtle)")}
                    onMouseLeave={e => !isActive && (e.currentTarget.style.color = "var(--tone-muted)")}
                  >
                    <span style={{ fontSize: "13px", color: isActive ? v.color : "inherit" }}>{v.icon}</span>
                    <span style={{ fontSize: "12px", fontWeight: isActive ? 700 : 500 }}>{v.label}</span>
                    <kbd style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: "9px",
                      background: isActive ? `${v.color}15` : "var(--tone-surface-2)",
                      border: `1px solid ${isActive ? v.color + "30" : "var(--tone-border)"}`,
                      borderRadius: "3px", padding: "1px 5px",
                      color: isActive ? v.color : "var(--tone-dim)",
                    }}>{v.shortcut}</kbd>
                  </button>
                );
              })}
            </div>
          </div>
        </section>


        {/* ══ TAB DESCRIPTION ══════════════════════════════ */}
        {activeView && (
          <div style={{
            padding: "16px clamp(16px, 4vw, 64px)",
            borderBottom: "1px solid var(--tone-border)",
            background: "var(--tone-surface)",
            display: "flex", alignItems: "center", gap: "12px",
          }}>
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: activeView.color, boxShadow: `0 0 6px ${activeView.color}` }} />
            <span style={{ fontSize: "13px", color: "var(--tone-subtle)" }}>{activeView.desc}</span>
            {searchNorm && (
              <div style={{
                marginLeft: "auto",
                padding: "3px 10px", borderRadius: "4px",
                background: "var(--tone-surface-2)", border: "1px solid var(--tone-border)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px", color: "var(--tone-muted)",
              }}>
                filtering: "{searchNorm}"
              </div>
            )}
          </div>
        )}

        {/* ══ VIEW CONTENT ══════════════════════════════════ */}
        <main style={{ padding: "40px clamp(16px, 4vw, 64px) 80px" }}>
          {view === "diagrams"  && <DiagramsView  search={searchNorm} />}
          {view === "modules"   && <ModulesView   search={searchNorm} />}
          {view === "apis"      && <ApisView       search={searchNorm} />}
          {view === "workflows" && <WorkflowsView  search={searchNorm} />}
          {view === "ontology"  && <OntologyView   search={searchNorm} />}
          {view === "roadmap"   && <RoadmapView    search={searchNorm} />}
        </main>

        {/* ══ FOOTER ════════════════════════════════════════ */}
        <footer style={{
          borderTop: "1px solid var(--tone-border)",
          padding: "20px clamp(16px, 4vw, 64px)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "16px", flexWrap: "wrap",
          background: "var(--tone-surface)",
        }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "var(--tone-dim)" }}>
            {architectureModel?.meta?.platformName} · v{architectureModel?.meta?.version} · Architecture Explorer
          </div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "var(--tone-border)" }}>
              deep evidence →
            </span>
            {["docs/discovery/repo-deep-scan.md", "docs/discovery/api-catalog.md"].map(f => (
              <div key={f} style={{
                padding: "3px 10px", borderRadius: "3px",
                background: "var(--tone-surface-2)", border: "1px solid var(--tone-border)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px", color: "#4F7EF7",
              }}>{f}</div>
            ))}
          </div>
        </footer>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; }
        ::selection { background: #9B6EF725; color: var(--tone-text-strong); }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: var(--tone-bg); }
        ::-webkit-scrollbar-thumb { background: var(--tone-border); border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--tone-dim); }
      `}</style>
    </div>
  );
}
