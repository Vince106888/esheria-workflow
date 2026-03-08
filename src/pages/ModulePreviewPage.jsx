import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { loadDashboardsFromPen } from "../portal/dashboardPenAdapter";
import {
  buildModulePreviewPath,
  getDashboardModulePreview,
} from "../portal/modulePreviewCatalog";

const WINDOW_OPTIONS = [
  { id: "7d", label: "7D", factor: 1 },
  { id: "30d", label: "30D", factor: 1.06 },
  { id: "90d", label: "90D", factor: 1.11 },
];

function tweakValue(raw = "", factor = 1) {
  const value = String(raw).trim();
  const pct = value.match(/^([0-9]+(?:\.[0-9]+)?)%$/);
  if (pct) {
    return `${Math.min(100, Number(pct[1]) * factor).toFixed(0)}%`;
  }

  const unit = value.match(/^([0-9]+(?:\.[0-9]+)?)([a-zA-Z]+)$/);
  if (unit) {
    return `${(Number(unit[1]) * factor).toFixed(1)}${unit[2]}`;
  }

  const numeric = value.replace(/,/g, "");
  if (/^[0-9]+(?:\.[0-9]+)?$/.test(numeric)) {
    return Number(numeric * factor).toLocaleString();
  }

  return value;
}

export default function ModulePreviewPage() {
  const { dashboardId, moduleId } = useParams();
  const [status, setStatus] = useState("loading");
  const [dashboards, setDashboards] = useState([]);
  const [windowId, setWindowId] = useState("30d");

  useEffect(() => {
    let mounted = true;
    loadDashboardsFromPen()
      .then((items) => {
        if (!mounted) return;
        setDashboards(items);
        setStatus("ready");
      })
      .catch(() => {
        if (!mounted) return;
        setStatus("error");
      });
    return () => {
      mounted = false;
    };
  }, []);

  const preview = getDashboardModulePreview(dashboardId || "", moduleId || "");
  const activeDashboard = useMemo(
    () => dashboards.find((item) => item.id === dashboardId) || null,
    [dashboards, dashboardId]
  );
  const windowPreset = WINDOW_OPTIONS.find((item) => item.id === windowId) || WINDOW_OPTIONS[1];

  if (!preview) {
    return <Navigate to="/dashboards" replace />;
  }

  const { dashboard, module } = preview;
  const moduleIndex = dashboard.modules.findIndex((entry) => entry.id === module.id);
  const previous = moduleIndex > 0 ? dashboard.modules[moduleIndex - 1] : null;
  const next = moduleIndex >= 0 && moduleIndex < dashboard.modules.length - 1
    ? dashboard.modules[moduleIndex + 1]
    : null;

  return (
    <main className="artifact-shell module-shell">
      <section className="artifact-hero">
        <div
          className="artifact-hero-frame"
          style={{
            "--artifact-accent": "#22C4B8",
            "--artifact-gradient-start": "#22C4B8",
            "--artifact-gradient-end": "#4F7EF7",
          }}
        >
          <div className="artifact-breadcrumb">
            <Link to="/overview">Overview</Link>
            <span>/</span>
            <Link to="/dashboards">Dashboards</Link>
            <span>/</span>
            <span>{module.label}</span>
          </div>
          <div className="artifact-hero-grid">
            <div>
              <div className="artifact-hero-kicker">
                <span className="artifact-hero-dot" />
                <span>Module Preview</span>
              </div>
              <h1 className="artifact-hero-title">{module.label}</h1>
              <div className="artifact-hero-emphasis">{dashboard.brand}</div>
              <p className="artifact-hero-description">{module.summary}</p>
              <div className="artifact-hero-tag-row">
                <span className="artifact-hero-tag">{dashboard.audience}</span>
                <span className="artifact-hero-tag artifact-hero-tag-secondary">
                  Module {String(moduleIndex + 1).padStart(2, "0")} of {String(dashboard.modules.length).padStart(2, "0")}
                </span>
              </div>
            </div>
            <div className="artifact-hero-stats">
              <div className="artifact-stat">
                <div className="artifact-stat-label">Mission</div>
                <div className="artifact-stat-value">{dashboard.mission}</div>
              </div>
              <div className="artifact-stat">
                <div className="artifact-stat-label">Dashboard</div>
                <div className="artifact-stat-value">{activeDashboard?.title || dashboard.brand}</div>
              </div>
              <div className="artifact-stat">
                <div className="artifact-stat-label">Source Route</div>
                <div className="artifact-stat-value">/dashboards/{dashboardId}/{module.id}</div>
              </div>
              <div className="artifact-stat">
                <div className="artifact-stat-label">Status</div>
                <div className="artifact-stat-value">{status === "ready" ? "Live connected to .pen data" : "Loading snapshot..."}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="artifact-stage">
        <div className="module-layout">
          <article className="module-panel">
            <h3>Executive Outcome</h3>
            <p className="module-text">{module.executiveOutcome}</p>
          </article>

          <article className="module-panel">
            <h3>Technical Narrative</h3>
            <ul className="module-list">
              {module.technicalNarrative.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </article>

          <article className="module-panel">
            <h3>Decision Checklist</h3>
            <ul className="module-list">
              {module.decisionChecklist.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </article>

          <article className="module-panel">
            <div className="module-panel-head">
              <h3>Related Modules</h3>
            </div>
            <div className="module-chip-row">
              {dashboard.modules.map((entry) => (
                <Link
                  key={entry.id}
                  className={`module-chip ${entry.id === module.id ? "active" : ""}`}
                  to={buildModulePreviewPath(dashboard.dashboardId, entry.id)}
                >
                  {entry.label}
                </Link>
              ))}
            </div>
          </article>
        </div>

        <div className="module-runtime">
          <div className="module-runtime-toolbar">
            <div className="module-window-toggle">
              {WINDOW_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`dashboard-chip ${option.id === windowId ? "active" : ""}`}
                  onClick={() => setWindowId(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <div className="module-runtime-links">
              <Link className="inline-link" to="/dashboards">Back to Gallery</Link>
              {previous ? (
                <Link className="inline-link" to={buildModulePreviewPath(dashboard.dashboardId, previous.id)}>
                  Prev Module
                </Link>
              ) : null}
              {next ? (
                <Link className="inline-link" to={buildModulePreviewPath(dashboard.dashboardId, next.id)}>
                  Next Module
                </Link>
              ) : null}
            </div>
          </div>

          <div className="module-runtime-grid">
            <article className="module-panel">
              <h3>Live KPI Snapshot</h3>
              <div className="module-kpi-grid">
                {activeDashboard?.kpis?.map((kpi) => (
                  <div key={kpi.label} className="module-kpi">
                    <span>{kpi.label}</span>
                    <strong>{tweakValue(kpi.value, windowPreset.factor)}</strong>
                  </div>
                ))}
              </div>
            </article>

            <article className="module-panel">
              <h3>Activity Trace</h3>
              <ul className="module-list">
                {(activeDashboard?.activity || []).slice(0, 4).map((item) => (
                  <li key={`${item.at}-${item.message}`}>{item.at} {item.message}</li>
                ))}
              </ul>
            </article>
          </div>

          <div className="module-link-row">
            {module.linkedArtifacts.map((item) => (
              <Link key={`${module.id}-${item.to}`} className="inline-link" to={item.to}>
                {item.label}
              </Link>
            ))}
            {dashboard.modules[0] ? (
              <Link className="inline-link" to={buildModulePreviewPath(dashboard.dashboardId, dashboard.modules[0].id)}>
                Jump to First Module
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
