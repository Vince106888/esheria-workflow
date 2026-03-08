import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { sectionById } from "../portal/artifactCatalog";
import { loadDashboardsFromPen } from "../portal/dashboardPenAdapter";
import { getDashboardModulePreview, moduleIdFromLabel } from "../portal/modulePreviewCatalog";

const TIME_WINDOWS = [
  { id: "today", label: "Today", factor: 0.92 },
  { id: "week", label: "7D", factor: 1 },
  { id: "month", label: "30D", factor: 1.07 },
];

const ACTIVITY_FILTERS = [
  { id: "all", label: "All" },
  { id: "risk", label: "Risk" },
  { id: "warn", label: "Watch" },
  { id: "normal", label: "Normal" },
];

function inferActiveWindow(windowId) {
  return TIME_WINDOWS.find((window) => window.id === windowId) || TIME_WINDOWS[1];
}

function parseValueParts(value = "") {
  const raw = String(value).trim();
  const percent = raw.match(/^([0-9]+(?:\.[0-9]+)?)%$/);
  if (percent) return { kind: "percent", value: Number(percent[1]), suffix: "%" };

  const withUnit = raw.match(/^([0-9]+(?:\.[0-9]+)?)([a-zA-Z]+)$/);
  if (withUnit) return { kind: "unit", value: Number(withUnit[1]), suffix: withUnit[2] };

  const numeric = raw.replace(/,/g, "");
  if (/^[0-9]+(?:\.[0-9]+)?$/.test(numeric)) {
    return { kind: "number", value: Number(numeric), suffix: "" };
  }

  return { kind: "text", value: raw, suffix: "" };
}

function formatNumber(value, decimals = 0) {
  return Number(value).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function tweakMetricValue(base = "", factor = 1, tick = 0, index = 0) {
  const parts = parseValueParts(base);
  if (parts.kind === "text") return parts.value;

  const drift = (((tick + 1) * (index + 2)) % 7) - 3;
  const scaled = parts.value * factor;
  const adjusted = Math.max(0, scaled + drift * 0.35);

  if (parts.kind === "percent") {
    return `${Math.min(100, adjusted).toFixed(parts.value % 1 ? 1 : 0)}%`;
  }

  if (parts.kind === "unit") {
    const decimals = /[sdm]/i.test(parts.suffix) ? 1 : 0;
    return `${formatNumber(adjusted, decimals)}${parts.suffix}`;
  }

  const decimals = parts.value % 1 ? 1 : 0;
  return formatNumber(adjusted, decimals);
}

function tweakChartValue(baseValue = 0, factor = 1, tick = 0, index = 0) {
  const drift = (((tick + 1) * (index + 3)) % 9) - 4;
  return Math.max(6, Math.min(100, Math.round(baseValue * factor + drift)));
}

function statusPillClass(severity = "normal") {
  if (severity === "risk") return "dashboard-pill dashboard-pill-risk";
  if (severity === "warn") return "dashboard-pill dashboard-pill-warn";
  return "dashboard-pill";
}

function isLandingModule(label = "", index = 0) {
  return index === 0 || /(home|overview)/i.test(label);
}

export default function DashboardGalleryPage() {
  const section = sectionById.dashboards;
  const brandLogoSrc = `${import.meta.env.BASE_URL}assets/img/logo/vl-footer-logo5.1.png`;
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [dashboards, setDashboards] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [timeWindow, setTimeWindow] = useState("week");
  const [liveMode, setLiveMode] = useState(true);
  const [search, setSearch] = useState("");
  const [activityFilter, setActivityFilter] = useState("all");
  const [tick, setTick] = useState(0);
  const [decisions, setDecisions] = useState({});
  const [moduleActions, setModuleActions] = useState({});
  const [sidebarIndex, setSidebarIndex] = useState(0);

  useEffect(() => {
    let mounted = true;
    setStatus("loading");
    setError("");

    loadDashboardsFromPen()
      .then((items) => {
        if (!mounted) return;
        setDashboards(items);
        setActiveId(items[0]?.id || "");
        setStatus("ready");
      })
      .catch((loadError) => {
        if (!mounted) return;
        setStatus("error");
        setError(loadError.message || "Failed to load dashboards.");
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!liveMode) return undefined;
    const timer = window.setInterval(() => {
      setTick((prev) => prev + 1);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [liveMode]);

  const active = useMemo(
    () => dashboards.find((item) => item.id === activeId) || dashboards[0] || null,
    [dashboards, activeId]
  );

  useEffect(() => {
    setSidebarIndex(0);
  }, [active?.id]);
  const windowPreset = inferActiveWindow(timeWindow);

  const kpis = useMemo(() => {
    if (!active) return [];
    return active.kpis.map((kpi, index) => ({
      ...kpi,
      displayValue: tweakMetricValue(kpi.value, windowPreset.factor, tick, index),
    }));
  }, [active, windowPreset.factor, tick]);

  const chart = useMemo(() => {
    if (!active) return [];
    return active.chart.map((item, index) => ({
      ...item,
      displayValue: tweakChartValue(item.value, windowPreset.factor, tick, index),
    }));
  }, [active, windowPreset.factor, tick]);

  const activities = useMemo(() => {
    if (!active) return [];
    const term = search.trim().toLowerCase();
    return active.activity.filter((entry) => {
      const passFilter = activityFilter === "all" || entry.severity === activityFilter;
      const passSearch = !term || `${entry.at} ${entry.message}`.toLowerCase().includes(term);
      return passFilter && passSearch;
    });
  }, [active, search, activityFilter]);

  const activeDecision = decisions[active?.id] || "";
  const activeModuleLabel = active?.sidebarNav?.[sidebarIndex] || "";
  const activeModuleId = moduleIdFromLabel(activeModuleLabel);
  const modulePreview = active ? getDashboardModulePreview(active.id, activeModuleId)?.module : null;
  const showOverview = isLandingModule(activeModuleLabel, sidebarIndex) || !modulePreview;
  const moduleActionKey = `${active?.id || "none"}:${activeModuleId}`;
  const selectedModuleAction = moduleActions[moduleActionKey] || modulePreview?.actionSet?.[0] || "";
  const moduleTargets = useMemo(() => {
    if (!modulePreview) return [];
    return modulePreview.operatingTargets.map((target, index) => ({
      ...target,
      live: tweakMetricValue(
        kpis[index % Math.max(kpis.length, 1)]?.value || `${72 + index * 4}%`,
        windowPreset.factor + (sidebarIndex + index) * 0.01,
        tick,
        index + sidebarIndex
      ),
    }));
  }, [modulePreview, kpis, windowPreset.factor, sidebarIndex, tick]);
  const onDecision = (choice) => {
    if (!active) return;
    setDecisions((prev) => ({
      ...prev,
      [active.id]: choice,
    }));
  };

  const heroFrameStyle = {
    "--artifact-accent": "#4F7EF7",
    "--artifact-gradient-start": "#4F7EF7",
    "--artifact-gradient-end": "#22C4B8",
  };

  return (
    <main className="artifact-shell dashboard-shell">
      <section className="artifact-hero">
        <div className="artifact-hero-frame" style={heroFrameStyle}>
          <div className="artifact-breadcrumb">
            <Link to="/overview">Overview</Link>
            <span>/</span>
            <span>{section.navLabel}</span>
          </div>
          <div className="artifact-hero-grid">
            <div>
              <div className="artifact-hero-kicker">
                <span className="artifact-hero-dot" />
                <span>Live Dashboard Surface</span>
              </div>
              <h1 className="artifact-hero-title">
                <span className="artifact-title-accent">Interactive</span> Dashboard Gallery
              </h1>
              <div className="artifact-hero-emphasis">
                Sourced directly from architecture-artifacts.pen dashboard frames
              </div>
              <p className="artifact-hero-description">{section.description}</p>
              <div className="artifact-hero-tag-row">
                <span className="artifact-hero-tag">Dynamic KPI + Timeline</span>
                <span className="artifact-hero-tag artifact-hero-tag-secondary">
                  {dashboards.length || 0} dashboards loaded
                </span>
              </div>
            </div>

            <div className="artifact-hero-stats">
              <div className="artifact-stat">
                <div className="artifact-stat-label">Source</div>
                <div className="artifact-stat-value">/artifacts/visuals/architecture-artifacts.pen</div>
              </div>
              <div className="artifact-stat">
                <div className="artifact-stat-label">Render Mode</div>
                <div className="artifact-stat-value">{liveMode ? "Live simulation on" : "Static review"}</div>
              </div>
              <div className="artifact-stat">
                <div className="artifact-stat-label">Time Window</div>
                <div className="artifact-stat-value">{windowPreset.label}</div>
              </div>
              <div className="artifact-stat">
                <div className="artifact-stat-label">Focused View</div>
                <div className="artifact-stat-value">{active?.title || "Loading..."}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="artifact-stage">
        <div className="dashboard-gallery-wrap">
          <aside className="dashboard-nav">
            <div className="dashboard-nav-title">Dashboards from .pen</div>
            {dashboards.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`dashboard-nav-item ${active?.id === item.id ? "active" : ""}`}
                onClick={() => setActiveId(item.id)}
              >
                <div className="dashboard-nav-item-title">{item.title}</div>
                <div className="dashboard-nav-item-sub">{item.badge}</div>
              </button>
            ))}
          </aside>

          <div className="dashboard-workspace">
            {status === "loading" ? (
              <div className="dashboard-empty">Loading dashboards from architecture-artifacts.pen...</div>
            ) : null}
            {status === "error" ? (
              <div className="dashboard-empty">
                <div>Could not load dashboards.</div>
                <div className="dashboard-error">{error}</div>
              </div>
            ) : null}
            {status === "ready" && active ? (
              <div className="dashboard-runtime-layout">
                <aside className="dashboard-runtime-sidebar">
                  <div className="dashboard-runtime-brand">
                    <img className="dashboard-runtime-logo" src={brandLogoSrc} alt="Esheria" />
                    <div className="dashboard-runtime-brand-text">{active.sidebarBrand || "Esheria OS"}</div>
                  </div>
                  <div className="dashboard-runtime-nav-title">Dashboard Navigation</div>
                  <div className="dashboard-runtime-nav">
                    {active.sidebarNav.map((item, index) => (
                      <button
                        key={`${active.id}-${item}`}
                        type="button"
                        className={`dashboard-runtime-nav-item ${index === sidebarIndex ? "active" : ""}`}
                        onClick={() => setSidebarIndex(index)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </aside>

                <div className="dashboard-runtime-main">
                  <div className="dashboard-toolbar">
                    <div className="dashboard-toolbar-left">
                      <h2>{active.title}</h2>
                      <span className="dashboard-pill">{active.badge}</span>
                      {active.sidebarNav[sidebarIndex] ? (
                        <span className="dashboard-pill">{active.sidebarNav[sidebarIndex]}</span>
                      ) : null}
                    </div>
                    <div className="dashboard-toolbar-right">
                      <div className="dashboard-window-toggle">
                        {TIME_WINDOWS.map((window) => (
                          <button
                            key={window.id}
                            type="button"
                            className={`dashboard-chip ${window.id === timeWindow ? "active" : ""}`}
                            onClick={() => setTimeWindow(window.id)}
                          >
                            {window.label}
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        className={`dashboard-chip ${liveMode ? "active" : ""}`}
                        onClick={() => setLiveMode((value) => !value)}
                      >
                        {liveMode ? "Live On" : "Live Off"}
                      </button>
                      <a className="inline-link" href={active.htmlUrl} target="_blank" rel="noreferrer">
                        Open HTML
                      </a>
                      <a className="inline-link" href={active.pngUrl} target="_blank" rel="noreferrer">
                        Open PNG
                      </a>
                    </div>
                  </div>

                  {showOverview ? (
                    <>
                      <div className="dashboard-kpi-grid">
                        {kpis.map((kpi) => (
                          <article key={kpi.label} className="dashboard-kpi-card">
                            <div className="dashboard-kpi-label">{kpi.label}</div>
                            <div className="dashboard-kpi-value">{kpi.displayValue}</div>
                          </article>
                        ))}
                      </div>

                      <div className="dashboard-mid-grid">
                        <article className="dashboard-panel-card">
                          <h3>Analytics Chart</h3>
                          <div className="dashboard-bar-list">
                            {chart.map((item) => (
                              <div key={item.label} className="dashboard-bar-row">
                                <div className="dashboard-bar-label">{item.label}</div>
                                <div className="dashboard-bar-track">
                                  <div className="dashboard-bar-fill" style={{ width: `${item.displayValue}%` }} />
                                </div>
                                <div className="dashboard-bar-value">{item.displayValue}</div>
                              </div>
                            ))}
                          </div>
                        </article>

                        <article className="dashboard-panel-card">
                          <h3>Approval Panel</h3>
                          <p className="dashboard-approval-pending">{active.approval.pending}</p>
                          <div className="dashboard-action-row">
                            {active.approval.actions.map((action) => {
                              const selected = action === activeDecision;
                              return (
                                <button
                                  key={action}
                                  type="button"
                                  className={`dashboard-chip ${selected ? "active" : ""}`}
                                  onClick={() => onDecision(action)}
                                >
                                  {action}
                                </button>
                              );
                            })}
                          </div>
                          {activeDecision ? (
                            <div className="dashboard-decision-state">Current decision: {activeDecision}</div>
                          ) : (
                            <div className="dashboard-decision-state">Select an action to simulate operator approval.</div>
                          )}
                        </article>
                      </div>

                      <div className="dashboard-bottom-grid">
                        <article className="dashboard-panel-card">
                          <div className="dashboard-panel-head">
                            <h3>Activity Log</h3>
                            <input
                              className="dashboard-search"
                              value={search}
                              onChange={(event) => setSearch(event.target.value)}
                              placeholder="Search activity..."
                            />
                          </div>
                          <div className="dashboard-action-row">
                            {ACTIVITY_FILTERS.map((filter) => (
                              <button
                                key={filter.id}
                                type="button"
                                className={`dashboard-chip ${activityFilter === filter.id ? "active" : ""}`}
                                onClick={() => setActivityFilter(filter.id)}
                              >
                                {filter.label}
                              </button>
                            ))}
                          </div>
                          <ul className="dashboard-log-list">
                            {activities.map((item) => (
                              <li key={`${item.at}-${item.message}`} className="dashboard-log-row">
                                <span className={statusPillClass(item.severity)}>{item.at || "--:--"}</span>
                                <span>{item.message}</span>
                              </li>
                            ))}
                            {!activities.length ? (
                              <li className="dashboard-log-row dashboard-log-empty">No activity entries match this filter.</li>
                            ) : null}
                          </ul>
                        </article>

                        <article className="dashboard-panel-card">
                          <h3>Timeline</h3>
                          <ul className="dashboard-timeline-list">
                            {active.timeline.map((item) => (
                              <li key={`${item.at}-${item.message}`} className="dashboard-timeline-row">
                                <span className="dashboard-timeline-at">{item.at || "--:--"}</span>
                                <span>{item.message}</span>
                              </li>
                            ))}
                          </ul>
                        </article>
                      </div>
                    </>
                  ) : (
                    <div className="dashboard-module-preview-grid">
                      <article className="module-panel">
                        <h3>Module Summary</h3>
                        <p className="module-text">{modulePreview.summary}</p>
                      </article>
                      <article className="module-panel">
                        <h3>Executive Outcome</h3>
                        <p className="module-text">{modulePreview.executiveOutcome}</p>
                      </article>
                      <article className="module-panel">
                        <h3>Execution Playbook</h3>
                        <ul className="module-list">
                          {modulePreview.playbook.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                      </article>
                      <article className="module-panel">
                        <h3>Technical Narrative</h3>
                        <ul className="module-list">
                          {modulePreview.technicalNarrative.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                      </article>
                      <article className="module-panel">
                        <h3>Operating Targets</h3>
                        <div className="module-target-grid">
                          {moduleTargets.map((item) => (
                            <div key={`${item.metric}-${item.target}`} className="module-target-row">
                              <div className="module-target-metric">{item.metric}</div>
                              <div className="module-target-values">
                                <span className="module-target-goal">Target: {item.target}</span>
                                <strong className="module-target-live">Live: {item.live}</strong>
                              </div>
                            </div>
                          ))}
                        </div>
                      </article>
                      <article className="module-panel">
                        <h3>Action Console</h3>
                        <div className="dashboard-action-row">
                          {modulePreview.actionSet.map((action) => (
                            <button
                              key={action}
                              type="button"
                              className={`dashboard-chip ${action === selectedModuleAction ? "active" : ""}`}
                              onClick={() =>
                                setModuleActions((prev) => ({
                                  ...prev,
                                  [moduleActionKey]: action,
                                }))
                              }
                            >
                              {action}
                            </button>
                          ))}
                        </div>
                        <div className="module-action-state">
                          Active module action: {selectedModuleAction}
                        </div>
                      </article>
                      <article className="module-panel">
                        <h3>Risk Lens</h3>
                        <ul className="module-list">
                          {modulePreview.riskLens.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                      </article>
                      <article className="module-panel">
                        <h3>Decision Checklist</h3>
                        <ul className="module-list">
                          {modulePreview.decisionChecklist.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                      </article>
                      <article className="module-panel">
                        <h3>Live Activity Trace</h3>
                        <ul className="module-list">
                          {activities.slice(0, 5).map((item) => (
                            <li key={`${item.at}-${item.message}`}>{item.at || "--:--"} {item.message}</li>
                          ))}
                          {!activities.length ? <li>No activity entries match this filter.</li> : null}
                        </ul>
                        <div className="dashboard-action-row">
                          {ACTIVITY_FILTERS.map((filter) => (
                            <button
                              key={filter.id}
                              type="button"
                              className={`dashboard-chip ${activityFilter === filter.id ? "active" : ""}`}
                              onClick={() => setActivityFilter(filter.id)}
                            >
                              {filter.label}
                            </button>
                          ))}
                        </div>
                      </article>
                      <article className="module-panel">
                        <h3>Linked Artifacts</h3>
                        <div className="module-link-row">
                          {modulePreview.linkedArtifacts.map((item) => (
                            <Link key={`${modulePreview.id}-${item.to}`} className="inline-link" to={item.to}>
                              {item.label}
                            </Link>
                          ))}
                          <button type="button" className="dashboard-chip" onClick={() => setSidebarIndex(0)}>
                            Back to Overview
                          </button>
                        </div>
                      </article>
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="artifact-footnote">
        <div className="footer-note">
          Dashboard logic source: architecture artifacts `.pen` instance overrides (component `4Z7PP`) now drive this gallery directly.
        </div>
      </section>
    </main>
  );
}
