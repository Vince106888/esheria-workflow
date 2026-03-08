import fs from "node:fs/promises";
import path from "node:path";
import { buildMarketingWebsite } from "./build-marketing-website.mjs";

const root = process.cwd();
const logoFileName = "vl-footer-logo5.1.png";
const siblingFoundationLogoPath = path.join(
  root,
  "..",
  "esheria-foundation",
  "public",
  "assets",
  "img",
  "logo",
  logoFileName
);
const localLogoCandidates = [
  path.join(root, "public", "brand", logoFileName),
  path.join(root, "public", "assets", "img", "logo", logoFileName),
];

const ensureDir = async (p) => fs.mkdir(p, { recursive: true });
const write = async (p, content) => {
  await ensureDir(path.dirname(p));
  await fs.writeFile(p, content, "utf8");
};
const fileExists = async (p) => {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
};
const writeIfMissing = async (p, content) => {
  if (await fileExists(p)) return false;
  await write(p, content);
  return true;
};
const resolveFirstExistingPath = async (candidates) => {
  for (const candidate of candidates) {
    if (!candidate) continue;
    if (await fileExists(candidate)) return candidate;
  }
  return null;
};
const copy = async (src, dest) => {
  await ensureDir(path.dirname(dest));
  await fs.copyFile(src, dest);
};

const artifactsRoot = path.join(root, "artifacts");
const websiteRoot = path.join(artifactsRoot, "website");
const websitePagesRoot = path.join(websiteRoot, "pages");
const docsRoot = path.join(artifactsRoot, "documents");
const generatedDocTemplatesRoot = path.join(
  artifactsRoot,
  "generated",
  "documents",
  "templates"
);
const visualsRoot = path.join(artifactsRoot, "visuals");
const diagSourceSvgRoot = path.join(visualsRoot, "diagrams", "source", "svg");
const diagSourcePngRoot = path.join(visualsRoot, "diagrams", "source", "png");
const diagEnhancedHtmlRoot = path.join(visualsRoot, "diagrams", "enhanced", "html");
const dashboardsHtmlRoot = path.join(visualsRoot, "dashboards", "html");
const exportsPdfRoot = path.join(artifactsRoot, "exports", "pdf");
const exportsSlidesRoot = path.join(artifactsRoot, "exports", "slides");

const diagrams = [
  "system-context",
  "layered-architecture",
  "dashboard-topology",
  "contract-intake-sequence",
  "service-integration-map",
  "ontology-er",
  "deployment-topology",
  "control-vs-data-plane",
  "auth-and-tenant-boundary",
  "api-boundary-map",
  "workflow-state-machine",
  "current-vs-target-architecture",
];

for (const d of diagrams) {
  await copy(
    path.join(root, "diagrams", "exports", "svg", `${d}.svg`),
    path.join(diagSourceSvgRoot, `${d}.svg`)
  );
  await copy(
    path.join(root, "diagrams", "exports", "png", `${d}.png`),
    path.join(diagSourcePngRoot, `${d}.png`)
  );
  await copy(
    path.join(root, "diagrams", "exports", "png", `${d}.png`),
    path.join(websiteRoot, "assets", "diagrams", `${d}.png`)
  );
}

const preferredLogoPath = await resolveFirstExistingPath([
  process.env.ESHERIA_LOGO_PATH,
  ...localLogoCandidates,
  siblingFoundationLogoPath,
]);
if (!preferredLogoPath) {
  throw new Error(
    `Unable to locate ${logoFileName}. Set ESHERIA_LOGO_PATH or provide a local logo under public/.`
  );
}
await copy(preferredLogoPath, path.join(websiteRoot, "assets", logoFileName));

const nav = [
  { href: "/index.html", label: "Index" },
  { href: "/pages/thesis.html", label: "Thesis" },
  { href: "/pages/current-system.html", label: "Current System" },
  { href: "/pages/platform-architecture.html", label: "Platform Architecture" },
  { href: "/pages/workflow.html", label: "Workflow" },
  { href: "/pages/dashboards.html", label: "Dashboards" },
  { href: "/pages/integrations.html", label: "Integrations" },
  { href: "/pages/analytics.html", label: "Analytics" },
  { href: "/pages/deployment.html", label: "Deployment" },
  { href: "/pages/roadmap.html", label: "Roadmap" },
  { href: "/pages/appendix.html", label: "Appendix" },
];

const pageSpecs = [
  {
    route: "index.html",
    title: "Esheria Legal Workflow OS",
    subtitle: "Enterprise legal workflow platform proposal",
    diagram: "current-vs-target-architecture",
    summary:
      "Unified B2B legal operating system built by orchestrating existing Esheria services under shared tenancy, policy, and audit boundaries.",
    callouts: [
      "Capability-first: reuse OCR, compliance, drafting, research, and analytics services.",
      "Control plane standardizes identity, tenancy, and governance.",
      "Data plane executes contract workflows with auditable evidence chains.",
    ],
  },
  {
    route: "thesis.html",
    title: "Platform Thesis",
    subtitle: "From fragmented tools to a multi-tenant workflow operating system",
    diagram: "layered-architecture",
    summary:
      "The platform thesis is orchestration-first integration: preserve proven services, centralize policy and workflow semantics.",
    callouts: [
      "Control vs data plane separation is a hard architecture boundary.",
      "Connector gateway normalizes downstream contracts.",
      "Tenant-aware execution and auditability are mandatory defaults.",
    ],
  },
  {
    route: "current-system.html",
    title: "Current System",
    subtitle: "Evidence-backed current-state capability map",
    diagram: "system-context",
    summary:
      "Current systems already provide deep legal capabilities but expose inconsistent auth, tenancy, and orchestration models.",
    callouts: [
      "Customer experiences exist in separate products.",
      "Service boundaries are deployable but heterogeneous.",
      "Platform value is in integration and governance, not rewrites.",
    ],
  },
  {
    route: "platform-architecture.html",
    title: "Platform Architecture",
    subtitle: "Target architecture and service boundary strategy",
    diagram: "control-vs-data-plane",
    summary:
      "Target architecture aligns governance, identity, and configuration in control plane while executing workflows in data plane.",
    callouts: [
      "Identity and policy services gate every workflow call path.",
      "Workflow runtime and review services own state transitions.",
      "Shared stores and observability are standardized across modules.",
    ],
  },
  {
    route: "workflow.html",
    title: "Workflow",
    subtitle: "Contract intake to approval execution path",
    diagram: "contract-intake-sequence",
    summary:
      "The first value wedge is contract intake, compliance analysis, review, and export with full evidence capture.",
    callouts: [
      "Asynchronous OCR and compliance operations are orchestrated by workflow engine.",
      "Decision points are role-aware and policy-enforced.",
      "Every transition emits auditable events with traceability.",
    ],
  },
  {
    route: "dashboards.html",
    title: "Dashboard Topology",
    subtitle: "Customer vs operator views",
    diagram: "dashboard-topology",
    summary:
      "Dashboards are explicitly split between institution outcomes and Esheria internal operations.",
    callouts: [
      "Institution dashboards are tenant-scoped.",
      "Operator dashboards are cross-tenant internal-only.",
      "Boundary controls prevent analytics leakage.",
    ],
  },
  {
    route: "integrations.html",
    title: "Integrations",
    subtitle: "Connector gateway and downstream service contracts",
    diagram: "service-integration-map",
    summary:
      "The connector gateway shields the platform from downstream drift and provides stable integration contracts.",
    callouts: [
      "Adapters map platform claims and policies into service-specific auth.",
      "Error semantics and trace envelopes are normalized.",
      "Future edge integration (browser plugin) remains isolated behind connector boundary.",
    ],
  },
  {
    route: "analytics.html",
    title: "Analytics Architecture",
    subtitle: "Tenant analytics vs Esheria internal analytics",
    diagram: "api-boundary-map",
    summary:
      "Analytics is bifurcated by design: tenant-facing workflow analytics and internal cross-tenant telemetry.",
    callouts: [
      "Customer analytics API serves institution KPIs only.",
      "Internal analytics connector remains Esheria-only.",
      "Access paths are role-gated and audit-logged.",
    ],
  },
  {
    route: "deployment.html",
    title: "Deployment Topology",
    subtitle: "Runtime model across EKS, SageMaker, and shared data services",
    diagram: "deployment-topology",
    summary:
      "Deployment topology preserves best-fit runtime placements while standardizing operational contracts and observability.",
    callouts: [
      "Platform services run in Kubernetes with clear API ingress boundaries.",
      "OCR remains SageMaker-hosted capability service.",
      "Queue, storage, index, and metrics systems are shared foundational controls.",
    ],
  },
  {
    route: "roadmap.html",
    title: "Roadmap",
    subtitle: "Phased platform delivery plan",
    diagram: "current-vs-target-architecture",
    summary:
      "Delivery is phased from architecture normalization, to executive packaging, to MVP integration design and rollout.",
    callouts: [
      "Phase 1: evidence + model + diagrams + explorer.",
      "Phase 2: visual polish and executive/technical export assets.",
      "Phase 3: MVP technical design and integration contracts.",
    ],
  },
  {
    route: "appendix.html",
    title: "Appendix",
    subtitle: "Technical reference and deeper architecture artifacts",
    diagram: "ontology-er",
    summary:
      "Appendix consolidates API boundaries, ontology model, workflow state machine, and deployment controls for technical review.",
    callouts: [
      "Canonical entity model supports cross-service orchestration.",
      "API boundary map anchors connector contracts.",
      "Auth and tenant boundary model underpins governance controls.",
    ],
  },
];

const websiteEvidenceByRoute = {
  "index.html": [
    { label: "Executive Brief", href: "/executive" },
    { label: "Technical Blueprint", href: "/blueprint" },
    { label: "Architecture Explorer", href: "/explorer" },
  ],
  "thesis.html": [
    { label: "Consistency Review", href: "/docs/architecture/consistency-review.md" },
    { label: "Integration Strategy", href: "/docs/architecture/integration-strategy.md" },
  ],
  "current-system.html": [
    { label: "API Catalog", href: "/docs/discovery/api-catalog.md" },
    { label: "Repo Deep Scan", href: "/docs/discovery/repo-deep-scan.md" },
  ],
  "platform-architecture.html": [
    { label: "Technical Blueprint Notes", href: "/docs/architecture/technical-blueprint.md" },
    { label: "Architecture Model Source", href: "/src/architecture/architectureModel.js" },
  ],
  "workflow.html": [
    { label: "Workflow Monitoring Dashboard", href: "/artifacts/visuals/dashboards/html/workflow-monitoring.html" },
    { label: "Operator Console Dashboard", href: "/artifacts/visuals/dashboards/html/operator-console.html" },
  ],
  "dashboards.html": [
    { label: "Institution Workspace", href: "/artifacts/visuals/dashboards/html/institution-workspace.html" },
    { label: "Operator Console", href: "/artifacts/visuals/dashboards/html/operator-console.html" },
    { label: "Board Command Center", href: "/artifacts/visuals/dashboards/html/board-command-center.html" },
  ],
  "integrations.html": [
    { label: "Service Integration Map", href: "/diagrams/exports/svg/service-integration-map.svg" },
    { label: "API Boundary Map", href: "/diagrams/exports/svg/api-boundary-map.svg" },
  ],
  "analytics.html": [
    { label: "Institution Analytics Dashboard", href: "/artifacts/visuals/dashboards/html/institution-analytics.html" },
    { label: "Portfolio Forecast Dashboard", href: "/artifacts/visuals/dashboards/html/portfolio-forecast.html" },
  ],
  "deployment.html": [
    { label: "Deployment Topology Diagram", href: "/diagrams/exports/svg/deployment-topology.svg" },
    { label: "Implementation Roadmap", href: "/docs/architecture/implementation-roadmap.md" },
  ],
  "roadmap.html": [
    { label: "Implementation Roadmap", href: "/docs/architecture/implementation-roadmap.md" },
    { label: "Consistency Review", href: "/docs/architecture/consistency-review.md" },
  ],
  "appendix.html": [
    { label: "Architecture Model", href: "/src/architecture/architectureModel.js" },
    { label: "Diagram Registry", href: "/src/architecture/diagramRegistry.js" },
    { label: "Technical Blueprint Notes", href: "/docs/architecture/technical-blueprint.md" },
  ],
};

const websiteCss = `
:root {
  --bg: #070d18;
  --panel: #10192b;
  --panel-2: #14233b;
  --text: #edf3ff;
  --muted: #95a8c7;
  --line: #2a3f62;
  --accent: #22c4b8;
  --accent-2: #4f7ef7;
}
* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: "IBM Plex Sans", "Segoe UI", sans-serif;
  background: radial-gradient(ellipse 70% 45% at 50% -10%, #15305c80 0%, transparent 72%), var(--bg);
  color: var(--text);
}
.topbar {
  position: sticky;
  top: 0;
  z-index: 3;
  background: rgba(8, 14, 27, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--line);
}
.topbar .inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: nowrap;
}
.brand-link {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}
.brand-logo {
  height: 28px;
  width: auto;
  display: block;
}
.topbar-nav {
  display: flex;
  gap: 8px;
  flex-wrap: nowrap;
  align-items: center;
  min-width: 0;
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: thin;
  padding-bottom: 1px;
}
.topbar-nav a {
  color: var(--muted);
  text-decoration: none;
  padding: 6px 9px;
  border-radius: 8px;
  border: 1px solid transparent;
  font-size: 12px;
  white-space: nowrap;
  flex: 0 0 auto;
}
.topbar-nav a.active, .topbar-nav a:hover {
  color: var(--text);
  border-color: var(--line);
  background: #12203a;
}
main {
  max-width: 1280px;
  margin: 0 auto;
  padding: 34px 24px 44px;
}
.hero {
  background: linear-gradient(155deg, #112041, #10192b 62%);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 24px 24px 22px;
}
.hero-layout {
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  gap: 16px;
  align-items: start;
}
.hero h1 { margin: 0 0 8px; font-size: 34px; line-height: 1.08; }
.hero p { margin: 0 0 14px; color: var(--muted); font-size: 16px; line-height: 1.55; }
.eyebrow {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 14px;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid #22c4b855;
  background: #22c4b818;
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 700;
}
.eyebrow i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 10px #22c4b8;
}
.hero-aside {
  background: #0f1b30;
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 12px;
}
.hero-aside h3 {
  margin: 0 0 10px;
  font-size: 13px;
  color: var(--accent-2);
  letter-spacing: 0.02em;
}
.meta-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 8px;
}
.meta-list li {
  border: 1px solid #2d4568;
  border-radius: 8px;
  padding: 9px 10px;
  background: #0d182b;
}
.meta-list strong {
  display: block;
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #74a4ff;
  margin-bottom: 4px;
}
.meta-list span {
  display: block;
  font-size: 12px;
  color: var(--muted);
}
.journey {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}
.journey a {
  text-decoration: none;
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 10px;
  background: #0f1b30;
}
.journey a:hover {
  border-color: #4f7ef780;
  background: #12233f;
}
.journey b {
  display: block;
  font-size: 11px;
  color: var(--accent-2);
  margin-bottom: 4px;
}
.journey span {
  font-size: 12px;
  color: var(--muted);
}
.grid {
  margin-top: 22px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}
.evidence-strip {
  margin-top: 18px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #0f1b30;
  padding: 12px;
}
.evidence-title {
  margin: 0 0 10px;
  font-size: 11px;
  letter-spacing: 0.08em;
  color: #74a4ff;
  text-transform: uppercase;
  text-shadow: 0 0 10px #4f7ef744;
}
.evidence-links {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.evidence-link {
  text-decoration: none;
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 12px;
  color: var(--muted);
  background: #12213a;
}
.evidence-link:hover {
  color: var(--text);
  border-color: #22c4b870;
  box-shadow: 0 0 14px #22c4b833;
}
.card {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 14px;
}
.card h3 { margin: 0 0 10px; font-size: 15px; color: var(--accent); }
.card p { margin: 0; color: var(--muted); font-size: 14px; line-height: 1.45; }
.footer {
  margin-top: 28px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--muted);
  font-size: 12px;
}
.footer-logo {
  height: 16px;
  width: auto;
  opacity: 0.9;
}
@media (max-width: 960px) {
  .topbar .inner {
    gap: 10px;
  }
  .brand-logo {
    height: 24px;
  }
  .hero-layout {
    grid-template-columns: 1fr;
  }
  .journey { grid-template-columns: 1fr; }
  .grid { grid-template-columns: 1fr; }
}
`;
await write(path.join(websiteRoot, "styles.css"), websiteCss);

const navHtml = (currentRoute, depth = 0) => {
  const homeHref = depth === 0 ? "index.html" : "../index.html";
  const logoHref = depth === 0 ? `assets/${logoFileName}` : `../assets/${logoFileName}`;
  const links = nav
    .map((n) => {
      const href = depth === 0 ? n.href.replace(/^\//, "") : `..${n.href}`;
      const active =
        (currentRoute === "index.html" && n.href === "/index.html") ||
        (currentRoute !== "index.html" && n.href.endsWith(`/${currentRoute}`));
      return `<a class="${active ? "active" : ""}" href="${href}">${n.label}</a>`;
    })
    .join("\n");
  return `<a class="brand-link" href="${homeHref}" aria-label="Esheria home"><img class="brand-logo" src="${logoHref}" alt="Esheria" /></a><nav class="topbar-nav">${links}</nav>`;
};

const pageRouteOrder = pageSpecs.map((spec) => spec.route);
const navLabelByRoute = Object.fromEntries(
  nav.map((entry) => [entry.href.replace(/^\/(?:pages\/)?/, ""), entry.label])
);

const websiteHref = (route, depth = 0) => {
  if (depth === 0) return route === "index.html" ? "index.html" : `pages/${route}`;
  return route === "index.html" ? "../index.html" : `../pages/${route}`;
};

const websiteAssetHref = (href, depth = 0) => {
  if (/^https?:\/\//i.test(href)) return href;
  if (href.startsWith("/")) return href;
  if (depth === 0) return href;
  return `../${href}`;
};

const pageHtml = (spec, depth = 0) => {
  const faviconHref = depth === 0 ? `assets/${logoFileName}` : `../assets/${logoFileName}`;
  const footerLogoHref = depth === 0 ? `assets/${logoFileName}` : `../assets/${logoFileName}`;
  const currentIndex = pageRouteOrder.indexOf(spec.route);
  const prevRoute = currentIndex > 0 ? pageRouteOrder[currentIndex - 1] : null;
  const nextRoute = currentIndex >= 0 && currentIndex < pageRouteOrder.length - 1 ? pageRouteOrder[currentIndex + 1] : null;
  const journeyRoutes = [prevRoute, nextRoute, "dashboards.html", "appendix.html"]
    .filter(Boolean)
    .filter((route, idx, arr) => arr.indexOf(route) === idx && route !== spec.route);
  const journeyHtml = journeyRoutes
    .map((route) => {
      const label = navLabelByRoute[route] || route.replace(/\.html$/, "");
      const href = websiteHref(route, depth);
      return `<a href="${href}"><b>${label}</b><span>Open ${label.toLowerCase()} track</span></a>`;
    })
    .join("");

  const calloutHtml = spec.callouts
    .slice(0, 3)
    .map((callout, idx) => `<li><strong>Signal ${idx + 1}</strong><span>${callout}</span></li>`)
    .join("");
  const evidenceItems = websiteEvidenceByRoute[spec.route] || [];
  const evidenceHtml = evidenceItems
    .map((item) => `<a class="evidence-link" href="${websiteAssetHref(item.href, depth)}">${item.label}</a>`)
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${spec.title} | Esheria Legal Workflow OS</title>
  <link rel="icon" type="image/png" href="${faviconHref}" />
  <link rel="stylesheet" href="${depth === 0 ? "styles.css" : "../styles.css"}" />
</head>
<body>
  <header class="topbar"><div class="inner">${navHtml(spec.route, depth)}</div></header>
  <main>
    <section class="hero">
      <div class="hero-layout">
        <div>
          <div class="eyebrow"><i></i><span>Architecture Narrative Page</span></div>
          <h1>${spec.title}</h1>
          <p>${spec.subtitle}</p>
          <p>${spec.summary}</p>
        </div>
        <aside class="hero-aside">
          <h3>What To Validate Here</h3>
          <ul class="meta-list">${calloutHtml}</ul>
        </aside>
      </div>
      <div class="journey">${journeyHtml}</div>
    </section>
    <section class="grid">
      <article class="card"><h3>Narrative Focus</h3><p>${spec.summary}</p></article>
      <article class="card"><h3>Callout 1</h3><p>${spec.callouts[0]}</p></article>
      <article class="card"><h3>Callout 2</h3><p>${spec.callouts[1]}</p></article>
    </section>
    <section class="evidence-strip">
      <h3 class="evidence-title">Artifact Evidence Links</h3>
      <div class="evidence-links">${evidenceHtml}</div>
    </section>
    <section class="grid">
      <article class="card"><h3>Callout 3</h3><p>${spec.callouts[2]}</p></article>
      <article class="card"><h3>Navigation Logic</h3><p>Use top navigation for the full storyline and use Dashboard pages for live product-experience previews.</p></article>
      <article class="card"><h3>Architecture Precision</h3><p>This website intentionally avoids repeating diagram galleries. Visual diagrams are centralized in the Diagrams section.</p></article>
    </section>
    <div class="footer"><img class="footer-logo" src="${footerLogoHref}" alt="Esheria" /><span>EsheriaLabs Architecture Package &middot; Export-safe layout for PDF/slides &middot; 16:9 visual intent</span></div>
  </main>
</body>
</html>`;
};

for (const spec of pageSpecs) {
  if (spec.route === "index.html") {
    await write(path.join(websiteRoot, "index.html"), pageHtml(spec, 0));
  } else {
    await write(path.join(websitePagesRoot, spec.route), pageHtml(spec, 1));
  }
}

await buildMarketingWebsite({
  websiteRoot,
  websitePagesRoot,
  logoFileName,
});

const dashboardCss = `
:root {
  --bg: #0d1422;
  --panel: #121d31;
  --panel-2: #162543;
  --line: #2a3d60;
  --text: #e5edf8;
  --muted: #9ab0cf;
  --accent: #18b8a7;
  --warn: #f59e0b;
  --risk: #ef4444;
}
* { box-sizing: border-box; }
body { margin: 0; font-family: "Inter", "Segoe UI", sans-serif; background: var(--bg); color: var(--text); }
.layout { display: grid; grid-template-columns: 260px 1fr; min-height: 100vh; }
.sidebar { border-right: 1px solid var(--line); background: #0f1a2f; padding: 20px 14px; display: flex; flex-direction: column; gap: 14px; }
.sidebar-brand { margin: 0; }
.sidebar-brand img { width: 126px; height: auto; display: block; }
.sidebar-brand span { display: block; margin-top: 8px; font-size: 10px; letter-spacing: 0.08em; color: #9dc2ff; text-transform: uppercase; text-shadow: 0 0 8px #4f7ef766; }
.sidebar-title {
  margin: 0;
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--muted);
  text-transform: uppercase;
}
.sidebar-workspace {
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 10px;
  background: #101e36;
}
.sidebar-workspace-btn {
  width: 100%;
  text-align: left;
  border: 1px solid transparent;
  background: transparent;
  color: var(--muted);
  border-radius: 8px;
  padding: 8px 10px;
  margin-bottom: 6px;
  font-size: 12px;
  cursor: pointer;
}
.sidebar-workspace-btn.active,
.sidebar-workspace-btn:hover {
  color: #dff7ff;
  border-color: #22c4b866;
  background: #143049;
  box-shadow: 0 0 18px #22c4b833;
}
.sidebar-autopilot {
  width: 100%;
  border: 1px solid #2d4568;
  border-radius: 8px;
  background: #101d34;
  color: #b8e8ff;
  font-size: 11px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 8px 10px;
  cursor: pointer;
}
.sidebar-autopilot:hover {
  border-color: #4f7ef7;
  box-shadow: 0 0 16px #4f7ef744;
}
.main { padding: 18px 22px; }
.top { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 14px; }
.top h1 { margin: 0; font-size: 24px; color: #e9f6ff; text-shadow: 0 0 18px #4f7ef740; }
.badge { font-size: 12px; border: 1px solid var(--line); color: var(--muted); border-radius: 999px; padding: 4px 10px; }
.cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 12px; }
.card { background: var(--panel); border: 1px solid var(--line); border-radius: 12px; padding: 12px; }
.metric { font-size: 24px; margin: 6px 0 0; }
.label { color: var(--muted); font-size: 12px; }
.context { display: grid; grid-template-columns: 1.3fr 1fr; gap: 12px; margin-bottom: 12px; }
.context-card { background: linear-gradient(160deg, #182949, #121d31 72%); border: 1px solid var(--line); border-radius: 12px; padding: 12px; }
.kicker { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; color: var(--accent); text-transform: uppercase; margin-bottom: 8px; }
.context-card h2 { margin: 0 0 8px; font-size: 17px; }
.context-card p { margin: 0; color: var(--muted); font-size: 13px; line-height: 1.5; }
.proof-row { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
.proof-pill { display: inline-block; padding: 3px 8px; border-radius: 999px; border: 1px solid #32507c; color: #bdd2ef; font-size: 11px; }
.decision-list { margin: 0; padding: 0 0 0 16px; color: var(--muted); font-size: 12px; line-height: 1.5; }
.decision-list li { margin-bottom: 6px; }
.workspace-preview {
  margin-bottom: 12px;
  background: linear-gradient(160deg, #162c4a, #101e33 72%);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 14px;
}
.workspace-preview h3 {
  margin: 0 0 8px;
  color: #22c4b8;
  font-size: 15px;
  text-shadow: 0 0 14px #22c4b855;
}
.workspace-preview p {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.5;
}
.workspace-tags {
  margin-top: 10px;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.workspace-tags span {
  border: 1px solid #32507c;
  border-radius: 999px;
  padding: 3px 8px;
  font-size: 11px;
  color: #bdd2ef;
}
.future-board {
  display: grid;
  grid-template-columns: 1.15fr 1fr 1fr;
  gap: 12px;
  margin-bottom: 12px;
}
.future-card {
  background: linear-gradient(165deg, #142742, #101c30 70%);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 12px;
}
.future-card h4 {
  margin: 0 0 10px;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #7eb2ff;
  text-shadow: 0 0 12px #4f7ef755;
}
.future-kpis {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}
.future-kpi {
  border: 1px solid #2d4568;
  border-radius: 8px;
  background: #102036;
  padding: 8px;
}
.future-kpi strong {
  display: block;
  font-size: 15px;
  color: #d8f8ff;
  text-shadow: 0 0 12px #22c4b855;
  margin-bottom: 4px;
}
.future-kpi span {
  font-size: 11px;
  color: var(--muted);
}
.future-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 7px;
}
.future-list li {
  font-size: 12px;
  color: var(--muted);
  border: 1px solid #2d4568;
  border-radius: 8px;
  padding: 7px 8px;
  background: #101f34;
}
.future-list li b {
  color: #d8f8ff;
}
.command-deck {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 12px;
  margin-bottom: 12px;
}
.signal-stream {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 8px;
}
.signal-stream li {
  border: 1px solid #2d4568;
  border-radius: 8px;
  background: #101f34;
  padding: 8px;
  color: var(--muted);
  font-size: 12px;
}
.signal-stream li b {
  color: #d8f8ff;
}
.sim-controls {
  display: grid;
  gap: 9px;
}
.sim-controls label {
  display: grid;
  gap: 5px;
  color: #b8cae4;
  font-size: 11px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.sim-controls input[type="range"] {
  width: 100%;
  accent-color: #22c4b8;
}
.sim-output {
  margin: 10px 0 0;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.45;
  border: 1px solid #2d4568;
  border-radius: 8px;
  padding: 9px;
  background: #101f34;
}
.grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 12px; }
.panel { background: var(--panel); border: 1px solid var(--line); border-radius: 12px; padding: 12px; min-height: 220px; }
.panel h3 { margin: 0 0 10px; font-size: 14px; color: var(--accent); text-shadow: 0 0 10px #18b8a744; }
.table-controls { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 10px; }
.table-search {
  min-width: 180px;
  flex: 1;
  background: #0f192d;
  border: 1px solid var(--line);
  border-radius: 8px;
  color: var(--text);
  font-size: 12px;
  padding: 6px 9px;
}
.filter-btn {
  border: 1px solid var(--line);
  background: transparent;
  color: var(--muted);
  font-size: 11px;
  border-radius: 999px;
  padding: 4px 8px;
  cursor: pointer;
}
.filter-btn.active,
.filter-btn:hover { color: var(--text); border-color: #4f7ef7; box-shadow: 0 0 14px #4f7ef744; }
.table { width: 100%; border-collapse: collapse; font-size: 12px; }
.table th, .table td { border-bottom: 1px solid #253653; text-align: left; padding: 8px 4px; color: var(--muted); }
.table-empty td { text-align: center; color: var(--muted); font-style: italic; }
.pill { display: inline-block; padding: 3px 8px; border-radius: 999px; border: 1px solid var(--line); font-size: 11px; }
.pill.warn { color: var(--warn); border-color: #6a4d1a; }
.pill.risk { color: var(--risk); border-color: #6d2731; }
.timeline { list-style: none; margin: 0; padding: 0; }
.timeline li { border-left: 2px solid #2f466b; margin-left: 6px; padding: 0 0 12px 12px; color: var(--muted); font-size: 12px; }
.footer-note { margin-top: 10px; border: 1px solid var(--line); border-radius: 10px; background: var(--panel-2); padding: 10px 12px; color: var(--muted); font-size: 12px; line-height: 1.45; }
@media (max-width: 1280px) {
  .cards { grid-template-columns: repeat(2, 1fr); }
  .context { grid-template-columns: 1fr; }
  .future-board { grid-template-columns: 1fr; }
  .command-deck { grid-template-columns: 1fr; }
  .grid { grid-template-columns: 1fr; }
}
@media (max-width: 980px) {
  .layout { grid-template-columns: 1fr; }
  .sidebar { border-right: 0; border-bottom: 1px solid var(--line); }
  .cards { grid-template-columns: 1fr; }
}
`;
await write(path.join(dashboardsHtmlRoot, "dashboard.css"), dashboardCss);

const dashboardPages = [
  {
    file: "institution-workspace.html",
    title: "Institution Workspace",
    badge: "Tenant Scoped",
    cards: ["Active Matters|482", "Pending Reviews|96", "SLA Risk|12%", "High Severity|18"],
    leftTitle: "Intake and Review Queue",
    rightTitle: "Recent Activity",
    contextTitle: "Customer value is operational certainty, not model novelty.",
    contextBody:
      "This view ties legal turnaround speed, risk exposure, and reviewer throughput to a single tenant outcome dashboard. It is the pane a Head of Legal uses to decide renewal, expansion, and staffing.",
    proof: ["Tenant-scoped SLA risk", "Case-level audit evidence", "Reviewer productivity", "Escalation traceability"],
    decisionTitle: "CEO signal",
    decisions: [
      "Conversion and expansion improve when workflow outcomes are measurable by tenant.",
      "Risk concentration becomes visible before it turns into churn.",
      "This surface can anchor pricing around outcomes, not seat count.",
    ],
    timeline: [
      "09:12 - WF-1198 failed OCR parse; customer notified with retry ETA.",
      "09:20 - Reviewer reassignment triggered to protect SLA window.",
      "09:35 - Connector recovered and replay completed.",
      "09:46 - Review package regenerated with evidence chain intact.",
    ],
    footer:
      "Executive takeaway: this dashboard translates platform reliability into renewal confidence and expansion potential.",
  },
  {
    file: "operator-console.html",
    title: "Operator Console",
    badge: "Internal Only",
    cards: ["Active Tenants|74", "Provisioning Queue|9", "Policy Violations|3", "Incidents Open|5"],
    leftTitle: "Tenant and Policy Operations",
    rightTitle: "Governance Timeline",
    contextTitle: "Internal governance is the control surface for scale.",
    contextBody:
      "Operator workflows separate tenant support, policy enforcement, and incident response from customer-facing views. This protects data boundaries while keeping onboarding and compliance throughput high.",
    proof: ["Cross-tenant controls", "Policy breach workflow", "Provisioning latency", "Incident ownership"],
    decisionTitle: "CEO signal",
    decisions: [
      "Scale without governance creates legal and reputational risk.",
      "Faster provisioning shortens time-to-value for new accounts.",
      "Policy operations are a strategic moat in regulated deals.",
    ],
    timeline: [
      "08:55 - New enterprise tenant provisioning started.",
      "09:10 - Contract policy pack deployed to production namespace.",
      "09:26 - Access anomaly detected and auto-remediated.",
      "09:43 - Governance review completed, controls green.",
    ],
    footer:
      "Executive takeaway: robust internal controls are what let revenue scale safely across more enterprise tenants.",
  },
  {
    file: "workflow-monitoring.html",
    title: "Workflow Monitoring",
    badge: "Ops Runtime",
    cards: ["Runs Active|311", "Failures|17", "Retries Pending|24", "P95 Step Latency|2.8s"],
    leftTitle: "Failed Steps and Connector Status",
    rightTitle: "Run Event Timeline",
    contextTitle: "Runtime reliability determines enterprise trust.",
    contextBody:
      "This board gives SRE and platform teams shared visibility into step-level failures, retries, and connector health. It turns incidents into managed events with measurable recovery behavior.",
    proof: ["Step-level error taxonomy", "Connector recovery status", "Replay queue depth", "Latency trend tracking"],
    decisionTitle: "CEO signal",
    decisions: [
      "Lower variance in runtime performance improves enterprise confidence.",
      "Fast replay keeps SLA promises even during connector volatility.",
      "Operational telemetry reduces support cost per tenant.",
    ],
    timeline: [
      "09:04 - Retry queue rose above threshold for OCR connector.",
      "09:17 - Auto-scaling expanded worker pool by 2 nodes.",
      "09:29 - Backlog normalized below alert threshold.",
      "09:44 - P95 latency returned to target band.",
    ],
    footer:
      "Executive takeaway: predictable runtime behavior is directly tied to contractability in enterprise procurement.",
  },
  {
    file: "institution-analytics.html",
    title: "Institution Analytics Dashboard",
    badge: "Tenant Analytics",
    cards: ["Turnaround|2.1d", "SLA Compliance|93%", "Risk Escalations|27", "Review Throughput|1,204"],
    leftTitle: "Performance and Risk Breakdown",
    rightTitle: "Executive Notes",
    contextTitle: "Institution analytics prove measurable business outcomes.",
    contextBody:
      "The analytics plane shows legal teams where risk accumulates, which workflows degrade, and how intervention affects SLA performance. This supports quarterly business reviews and upsell discussions.",
    proof: ["SLA trend by workflow", "Risk class concentration", "Reviewer utilization", "Evidence-linked decisions"],
    decisionTitle: "CEO signal",
    decisions: [
      "Outcome dashboards support premium packaging for enterprise tiers.",
      "Risk trends can justify proactive advisory offerings.",
      "Analytics-backed QBRs increase renewal probability.",
    ],
    timeline: [
      "Q1 - SLA compliance improved from 88% to 93%.",
      "Q1 - High-risk clause findings dropped 11% after policy updates.",
      "Q1 - Average review cycle shortened by 0.6 days.",
      "Q1 - Escalation resolution time improved by 22%.",
    ],
    footer:
      "Executive takeaway: this view turns platform telemetry into board-level business evidence.",
  },
  {
    file: "support-incident-center.html",
    title: "Support / Incident Center",
    badge: "Incident Response",
    cards: ["P1 Incidents|1", "P2 Incidents|4", "Impacted Tenants|7", "Avg Mitigation|34m"],
    leftTitle: "Incident Board",
    rightTitle: "Response Timeline",
    contextTitle: "Incident discipline protects trust and revenue.",
    contextBody:
      "Centralized incident operations coordinate product, platform, and support teams with explicit owner accountability and communication logs for affected tenants.",
    proof: ["Severity SLA policy", "Owner assignment", "Tenant comms log", "Post-incident actions"],
    decisionTitle: "CEO signal",
    decisions: [
      "Short mitigation windows reduce churn risk from service events.",
      "Structured response lowers reputational damage in enterprise accounts.",
      "Consistent RCA loops improve platform maturity each quarter.",
    ],
    timeline: [
      "09:02 - P1 declared for connector timeout spike.",
      "09:08 - Incident commander and tenant comms owner assigned.",
      "09:22 - Mitigation deployed; affected queue drained.",
      "09:38 - Service restored; RCA draft in progress.",
    ],
    footer:
      "Executive takeaway: disciplined incident response is a visible enterprise differentiator, not only an ops necessity.",
  },
  {
    file: "board-command-center.html",
    title: "Board Command Center",
    badge: "Executive View",
    cards: ["ARR at Risk|$1.8M", "Renewals in 90d|14", "Expansion Pipeline|$3.2M", "Trust Index|8.7/10"],
    leftTitle: "Account Risk and Expansion Signals",
    rightTitle: "Board-Ready Narrative Timeline",
    contextTitle: "One page that links platform health to revenue outcomes.",
    contextBody:
      "This board-level view connects reliability, compliance posture, and workflow adoption to renewal risk and expansion potential. It is designed for CEO and board discussions, not only daily operations.",
    proof: ["Revenue-linked risk scoring", "Adoption vs renewal correlation", "SLA to churn model", "Expansion readiness"],
    decisionTitle: "CEO signal",
    decisions: [
      "Prioritize top-5 at-risk accounts with targeted reliability actions.",
      "Allocate GTM focus to tenants with high adoption and low risk.",
      "Use trust index in board narrative for forward revenue confidence.",
    ],
    timeline: [
      "Week 1 - Identified 5 accounts with rising operational risk.",
      "Week 2 - Applied targeted workflow optimization plans.",
      "Week 3 - Trust index improved from 8.2 to 8.7.",
      "Week 4 - Renewal confidence increased for 3 priority accounts.",
    ],
    footer:
      "Executive takeaway: platform metrics are translated into a direct revenue-defense and expansion story.",
  },
  {
    file: "portfolio-forecast.html",
    title: "Portfolio Risk & Revenue Forecast",
    badge: "Finance + Legal Ops",
    cards: ["Forecast Accuracy|91%", "Risk-Weighted ARR|$22.4M", "Escalation Burn Down|67%", "Margin Impact|+4.1%"],
    leftTitle: "Forecast Drivers and Risk Buckets",
    rightTitle: "Scenario Outlook Timeline",
    contextTitle: "Forecasting converts operational data into planning confidence.",
    contextBody:
      "This dashboard combines workflow throughput, incident frequency, and policy adherence into a portfolio-level forecast model for leadership planning and budget decisions.",
    proof: ["Scenario planning inputs", "Risk-weighted forecast", "Cost-to-serve trend", "Mitigation effect model"],
    decisionTitle: "CEO signal",
    decisions: [
      "Increase investment in high-leverage workflow automation areas.",
      "Use risk-weighted ARR model for quarterly planning cadence.",
      "Link reliability targets directly to margin and growth goals.",
    ],
    timeline: [
      "Scenario A - Baseline reliability; moderate growth trajectory.",
      "Scenario B - Improved SLA and lower incident rate; upside case.",
      "Scenario C - Elevated connector failures; downside containment case.",
      "Action - Adopt Scenario B roadmap with monthly recalibration.",
    ],
    footer:
      "Executive takeaway: the platform can now support defensible, data-driven strategic planning.",
  },
];

const defaultRows = [
  ["WF-1192", "Compliance Resolve", "esheria-contract-engine", "retrying", "<span class=\"pill warn\">warning</span>"],
  ["WF-1198", "OCR Parse", "esheria-ocr", "failed", "<span class=\"pill risk\">critical</span>"],
  ["WF-1202", "Review Assignment", "platform", "running", "<span class=\"pill\">normal</span>"],
  ["WF-1207", "Draft Export", "lexdraft", "queued", "<span class=\"pill\">normal</span>"],
];

const workspaceByDashboard = {
  "institution-workspace.html": {
    title: "Institution Workspace Navigation",
    items: [
      { label: "Matter Inbox", detail: "Queue of inbound contracts grouped by SLA window and assigned counsel.", tags: ["SLA", "Intake", "Assignment"] },
      { label: "Review Board", detail: "Clause-level risk findings, citations, and approval status at reviewer level.", tags: ["Risk", "Review", "Evidence"] },
      { label: "Escalations", detail: "Breached timelines and high-severity decisions requiring management intervention.", tags: ["Escalation", "Priority", "Governance"] },
      { label: "Export Center", detail: "Finalized packages, audit trails, and client-ready outputs.", tags: ["Export", "Audit", "Client"] },
    ],
  },
  "operator-console.html": {
    title: "Operator Console Navigation",
    items: [
      { label: "Tenant Provisioning", detail: "Create org spaces, apply baseline policy packs, and allocate service capacity.", tags: ["Tenant Ops", "Provisioning", "Policy Packs"] },
      { label: "Policy Enforcement", detail: "Run policy drift checks and push contract rules across active tenants.", tags: ["Compliance", "Drift", "Rules"] },
      { label: "Incident Command", detail: "Coordinate RCA, owner assignment, and communication updates by severity tier.", tags: ["Incidents", "RCA", "Comms"] },
      { label: "Connector Health", detail: "Monitor cross-service connector latency, retries, and failure propagation.", tags: ["Connectors", "Latency", "Recovery"] },
    ],
  },
  "workflow-monitoring.html": {
    title: "Workflow Runtime Navigation",
    items: [
      { label: "Active Runs", detail: "Live state transitions for in-flight workflow runs.", tags: ["Runtime", "State", "Live"] },
      { label: "Retry Queues", detail: "Step retries and dead-letter queue backlog by connector.", tags: ["Retries", "DLQ", "Throughput"] },
      { label: "Failure Clusters", detail: "Grouped error signatures for faster remediation patterns.", tags: ["Errors", "Clusters", "SRE"] },
      { label: "Latency Radar", detail: "P95/P99 step latency trend with service-level deltas.", tags: ["Latency", "Trend", "SLO"] },
    ],
  },
  "institution-analytics.html": {
    title: "Institution Analytics Navigation",
    items: [
      { label: "SLA Trends", detail: "Quarter-over-quarter compliance curves segmented by workflow category.", tags: ["SLA", "Trend", "QBR"] },
      { label: "Risk Density", detail: "Where clause risk concentrations are rising by matter type.", tags: ["Risk", "Density", "Heatmap"] },
      { label: "Reviewer Yield", detail: "Reviewer throughput and exception handling efficiency.", tags: ["Productivity", "Teams", "Yield"] },
      { label: "Adoption Signals", detail: "Usage depth indicators used in renewal and expansion discussions.", tags: ["Adoption", "Renewal", "Expansion"] },
    ],
  },
  "support-incident-center.html": {
    title: "Incident Center Navigation",
    items: [
      { label: "Severity Queue", detail: "P1/P2 incident queue with assignment and escalation ownership.", tags: ["Severity", "Queue", "Owners"] },
      { label: "Tenant Comms", detail: "Message templates and sent status for affected enterprise contacts.", tags: ["Comms", "Tenants", "Updates"] },
      { label: "Mitigation Tasks", detail: "Runbooks and mitigation checklists tied to each incident.", tags: ["Runbook", "Mitigation", "Ops"] },
      { label: "Postmortem Tracker", detail: "Action items and accountability matrix after restoration.", tags: ["Postmortem", "Actions", "Learning"] },
    ],
  },
  "board-command-center.html": {
    title: "Board Narrative Navigation",
    items: [
      { label: "Revenue At Risk", detail: "Accounts at risk mapped to reliability and trust metrics.", tags: ["ARR", "Risk", "Renewal"] },
      { label: "Expansion Pipeline", detail: "Accounts ready for cross-sell/upsell based on workflow depth.", tags: ["Pipeline", "Expansion", "GTM"] },
      { label: "Trust Index", detail: "Composite confidence score derived from incidents, SLA, and adoption.", tags: ["Trust", "Health", "Signal"] },
      { label: "Decision Brief", detail: "Board-facing summary narrative for quarterly strategy review.", tags: ["Board", "Narrative", "Strategy"] },
    ],
  },
  "portfolio-forecast.html": {
    title: "Forecast Navigation",
    items: [
      { label: "Scenario Inputs", detail: "Operational variables used to model upside/downside cases.", tags: ["Inputs", "Scenario", "Planning"] },
      { label: "Risk Weighting", detail: "Probability-adjusted exposure by tenant and workflow family.", tags: ["Risk", "Weighting", "Forecast"] },
      { label: "Margin Lens", detail: "Cost-to-serve and automation leverage impact on margin.", tags: ["Margin", "Cost", "Leverage"] },
      { label: "Leadership Plan", detail: "Recommended operating plan based on current data confidence.", tags: ["Leadership", "Plan", "Confidence"] },
    ],
  },
};

for (const page of dashboardPages) {
  const tableId = page.file.replace(/\.html$/, "").replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  const workspaceConfig = workspaceByDashboard[page.file] || workspaceByDashboard["operator-console.html"];

  const cardTuples = page.cards.map((c) => {
    const [label, value] = c.split("|");
    return { label, value };
  });
  const metricHtml = cardTuples
    .map((card, idx) => `<div class="card"><div class="label">${card.label}</div><div id="${tableId}-metric-${idx}" class="metric" data-base="${card.value}">${card.value}</div></div>`)
    .join("");

  const rowObjects = (page.rows || defaultRows).map((r) => {
    const severityCell = String(r[4] || "").toLowerCase();
    const status = String(r[3] || "").toLowerCase();
    let severity = "normal";
    if (severityCell.includes("risk") || status.includes("fail")) severity = "critical";
    else if (severityCell.includes("warn") || status.includes("retry")) severity = "warning";
    return {
      id: r[0],
      step: r[1],
      service: r[2],
      status: r[3],
      severity,
    };
  });

  const tableRows = rowObjects
    .map((r) => {
      const status = String(r.status || "").toLowerCase();
      const search = [r.id, r.step, r.service, r.status].join(" ").toLowerCase().replace(/"/g, "&quot;");
      const pillClass = r.severity === "critical" ? "risk" : r.severity === "warning" ? "warn" : "";
      return `<tr data-status="${status}" data-search="${search}"><td>${r.id}</td><td>${r.step}</td><td>${r.service}</td><td>${r.status}</td><td><span class="pill ${pillClass}">${r.severity}</span></td></tr>`;
    })
    .join("\n");

  const proofHtml = (page.proof || [])
    .map((item) => `<span class="proof-pill">${item}</span>`)
    .join("");

  const decisionHtml = (page.decisions || [])
    .map((item) => `<li>${item}</li>`)
    .join("");

  const timelineHtml = (page.timeline || [])
    .map((item) => `<li>${item}</li>`)
    .join("");

  const workspaceItems = workspaceConfig.items || [];
  const workspaceInitial = workspaceItems[0] || { label: "Workspace", detail: "", tags: [] };
  const sidebarWorkspaceHtml = workspaceItems
    .map(
      (item, idx) =>
        `<button class="sidebar-workspace-btn ${idx === 0 ? "active" : ""}" data-sidebar-workspace-id="${tableId}" data-sidebar-workspace-index="${idx}" type="button">${item.label}</button>`
    )
    .join("");
  const workspaceInitialTags = (workspaceInitial.tags || []).map((tag) => `<span>${tag}</span>`).join("");
  const workspaceDataJson = JSON.stringify(workspaceItems).replace(/</g, "\\u003c");
  const baseRowsJson = JSON.stringify(rowObjects).replace(/</g, "\\u003c");
  const baseTimelineJson = JSON.stringify(page.timeline || []).replace(/</g, "\\u003c");
  const baseCardValuesJson = JSON.stringify(cardTuples.map((card) => card.value)).replace(/</g, "\\u003c");

  const html = `<!doctype html>
<html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${page.title}</title><link rel="icon" type="image/png" href="../../../website/assets/${logoFileName}" /><link rel="stylesheet" href="dashboard.css" /></head>
<body><div class="layout">
<aside class="sidebar"><div class="sidebar-brand"><img src="../../../website/assets/${logoFileName}" alt="Esheria" /><span>${page.badge}</span></div>
<div class="sidebar-title">${workspaceConfig.title}</div>
<div class="sidebar-workspace">
${sidebarWorkspaceHtml}
<button id="${tableId}-autopilot" class="sidebar-autopilot" type="button">Autopilot: On</button>
</div>
</aside>
<main class="main">
<div class="top">
<h1>${page.title}</h1>
<div class="badge">${page.badge}</div>
</div>
<section class="cards">${metricHtml}</section>
<section class="context">
<article class="context-card">
<div class="kicker">Executive Context</div>
<h2>${page.contextTitle}</h2>
<p>${page.contextBody}</p>
<div class="proof-row">${proofHtml}</div>
</article>
<article class="context-card">
<div class="kicker">Decision Signal</div>
<h2>${page.decisionTitle}</h2>
<ul class="decision-list">${decisionHtml}</ul>
</article>
</section>
<section class="workspace-preview">
<h3 id="${tableId}-workspace-title">${workspaceInitial.label}</h3>
<p id="${tableId}-workspace-detail">${workspaceInitial.detail}</p>
<div id="${tableId}-workspace-tags" class="workspace-tags">${workspaceInitialTags}</div>
</section>
<section class="future-board">
<article class="future-card">
<h4>Future KPI Pulse</h4>
<div id="${tableId}-future-kpis" class="future-kpis"></div>
</article>
<article class="future-card">
<h4>Automation Stack</h4>
<ul id="${tableId}-future-automation" class="future-list"></ul>
</article>
<article class="future-card">
<h4>90-Day Moves</h4>
<ul id="${tableId}-future-moves" class="future-list"></ul>
</article>
</section>
<section class="command-deck">
<article class="future-card">
<h4>Live Signal Stream</h4>
<ul id="${tableId}-signal-stream" class="signal-stream"></ul>
</article>
<article class="future-card">
<h4>Intervention Simulator</h4>
<div class="sim-controls">
<label>Automation Leverage <input id="${tableId}-sim-auto" type="range" min="0" max="100" step="1" value="68" /></label>
<label>Policy Strictness <input id="${tableId}-sim-policy" type="range" min="0" max="100" step="1" value="72" /></label>
<label>Recovery Speed <input id="${tableId}-sim-recovery" type="range" min="0" max="100" step="1" value="65" /></label>
</div>
<p id="${tableId}-sim-output" class="sim-output"></p>
</article>
</section>
<section class="grid">
<div class="panel"><h3>${page.leftTitle}</h3>
<div class="table-controls">
<button class="filter-btn active" data-table-filter="${tableId}" data-filter-value="all">All</button>
<button class="filter-btn" data-table-filter="${tableId}" data-filter-value="failed">Failed</button>
<button class="filter-btn" data-table-filter="${tableId}" data-filter-value="retrying">Retrying</button>
<button class="filter-btn" data-table-filter="${tableId}" data-filter-value="running">Running</button>
<input class="table-search" data-table-search="${tableId}" placeholder="Search ID, step, or service..." />
</div>
<table class="table"><thead><tr><th>ID</th><th>Step</th><th>Service</th><th>Status</th><th>Severity</th></tr></thead><tbody id="${tableId}-tbody">${tableRows}<tr id="${tableId}-empty" class="table-empty" style="display:none;"><td colspan="5">No rows match your filter.</td></tr></tbody></table>
</div>
<div class="panel"><h3>${page.rightTitle}</h3>
<ul id="${tableId}-timeline" class="timeline">
${timelineHtml}
</ul>
</div>
</section>
<section class="footer-note">${page.footer}</section>
</main>
</div>
<script>
(() => {
  const tableId = "${tableId}";
  const pageTitle = ${JSON.stringify(page.title)};
  const workspaceData = ${workspaceDataJson};
  const baseRows = ${baseRowsJson};
  const baseTimeline = ${baseTimelineJson};
  const baseCardValues = ${baseCardValuesJson};
  const tbodyEl = document.getElementById(tableId + "-tbody");
  let emptyRow = document.getElementById(tableId + "-empty");
  const buttons = Array.from(document.querySelectorAll('[data-table-filter="' + tableId + '"]'));
  const searchInput = document.querySelector('[data-table-search="' + tableId + '"]');
  const workspaceButtons = Array.from(document.querySelectorAll('[data-sidebar-workspace-id="' + tableId + '"]'));
  const autopilotBtn = document.getElementById(tableId + "-autopilot");
  const workspaceTitle = document.getElementById(tableId + "-workspace-title");
  const workspaceDetail = document.getElementById(tableId + "-workspace-detail");
  const workspaceTags = document.getElementById(tableId + "-workspace-tags");
  const timelineEl = document.getElementById(tableId + "-timeline");
  const futureKpisEl = document.getElementById(tableId + "-future-kpis");
  const futureAutomationEl = document.getElementById(tableId + "-future-automation");
  const futureMovesEl = document.getElementById(tableId + "-future-moves");
  const signalStreamEl = document.getElementById(tableId + "-signal-stream");
  const simAutoEl = document.getElementById(tableId + "-sim-auto");
  const simPolicyEl = document.getElementById(tableId + "-sim-policy");
  const simRecoveryEl = document.getElementById(tableId + "-sim-recovery");
  const simOutputEl = document.getElementById(tableId + "-sim-output");
  const metricEls = baseCardValues.map((_, idx) => document.getElementById(tableId + "-metric-" + idx));
  let activeFilter = "all";
  let activeState = null;
  let activeWorkspaceIndex = 0;
  let autopilotEnabled = true;

  const seedFrom = (text) => {
    let hash = 0;
    for (let i = 0; i < text.length; i += 1) hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
    return hash;
  };

  const tweakMetric = (base, seed, idx) => {
    if (!base) return "";
    const step = ((seed >> (idx + 1)) % 7) - 3;
    if (base.includes("/10")) {
      const n = Number(base.split("/")[0]);
      if (Number.isFinite(n)) return Math.max(0, Math.min(10, n + step * 0.2)).toFixed(1) + "/10";
    }
    if (base.includes("%")) {
      const n = Number(base.replace(/[^0-9.]/g, ""));
      if (Number.isFinite(n)) return Math.max(0, n + step).toFixed(n % 1 ? 1 : 0) + "%";
    }
    if (base.includes("$")) {
      const n = Number(base.replace(/[^0-9.]/g, ""));
      if (Number.isFinite(n)) {
        const scaled = n * (1 + step * 0.025);
        if (base.includes("M")) return "$" + scaled.toFixed(1) + "M";
        return "$" + Math.round(scaled).toLocaleString();
      }
    }
    const intNum = Number(base.replace(/,/g, ""));
    if (Number.isFinite(intNum) && /^[-+]?[0-9,]+$/.test(base)) {
      return Math.max(0, intNum + step).toLocaleString();
    }
    return base;
  };

  const severityClass = (severity) => {
    if (severity === "critical") return "risk";
    if (severity === "warning") return "warn";
    return "";
  };

  const severityFromStatus = (status, fallback) => {
    const s = String(status || "").toLowerCase();
    if (s.includes("fail") || s.includes("blocked")) return "critical";
    if (s.includes("retry") || s.includes("delayed")) return "warning";
    return fallback || "normal";
  };

  const buildRowsForWorkspace = (item, index, seed) => {
    const statusCycle = ["running", "retrying", "failed", "queued", "running", "running"];
    const prefix = (item?.label || "Mode")
      .split(/\\s+/)
      .slice(0, 3)
      .map((token) => token[0] || "")
      .join("")
      .toUpperCase() || "WS";
    const tagSlug = (item?.tags?.[0] || "core").toLowerCase().replace(/\\s+/g, "-");
    return baseRows.map((row, rowIndex) => {
      const localSeed = (seed >> ((rowIndex % 5) + 1)) + index + rowIndex;
      const status = statusCycle[Math.abs(localSeed) % statusCycle.length];
      const seq = 1100 + ((Math.abs(seed) + rowIndex * 19 + index * 31) % 790);
      return {
        id: prefix + "-" + String(seq),
        step: row.step + " / " + (item?.label || "Workspace"),
        service: row.service + "." + tagSlug,
        status,
        severity: severityFromStatus(status, row.severity),
      };
    });
  };

  const renderRows = (rowsData) => {
    if (!tbodyEl) return;
    tbodyEl.innerHTML = rowsData
      .map((row) => {
        const status = String(row.status || "").toLowerCase();
        const search = [row.id, row.step, row.service, row.status].join(" ").toLowerCase().replace(/"/g, "&quot;");
        return '<tr data-status="' + status + '" data-search="' + search + '"><td>' + row.id + "</td><td>" + row.step + "</td><td>" + row.service + "</td><td>" + row.status + '</td><td><span class="pill ' + severityClass(row.severity) + '">' + row.severity + "</span></td></tr>";
      })
      .join("")
      + '<tr id="' + tableId + '-empty" class="table-empty" style="display:none;"><td colspan="5">No rows match your filter.</td></tr>';
    emptyRow = document.getElementById(tableId + "-empty");
  };

  const buildFutureState = (item, index) => {
    const seed = seedFrom(pageTitle + "|" + (item?.label || "") + "|" + (item?.tags || []).join("|"));
    const t0 = item?.tags?.[0] || "Workflow";
    const t1 = item?.tags?.[1] || "Governance";
    const kpis = [
      { value: String(78 + (seed % 18)) + "%", label: "Automation Confidence" },
      { value: String(9 + ((seed >> 3) % 16)) + "m", label: "Predicted Decision Latency" },
      { value: String(90 + ((seed >> 5) % 9)) + "%", label: "SLA Guardrail" },
      { value: String(2 + ((seed >> 7) % 5)), label: "Risk Drift Alerts" },
    ];
    const automations = [
      "<b>" + (item?.label || "Mode") + "</b> auto-builds evidence packets before human approval.",
      "<b>" + t0 + "</b> checks trigger predictive mitigation when confidence dips.",
      "<b>" + t1 + "</b> policy route is pre-computed for escalations and board updates.",
    ];
    const moves = [
      "<b>30d</b> - launch " + (item?.label || "mode") + " with live tenant telemetry.",
      "<b>60d</b> - automate intervention playbooks tied to reliability thresholds.",
      "<b>90d</b> - package " + pageTitle + " as enterprise operating standard.",
    ];
    const timeline = [
      ...(baseTimeline.slice(0, 2)),
      "Forecast - " + (item?.label || "Mode") + " produces proactive risk interventions.",
      "Target - leadership review uses this mode as renewal-confidence narrative.",
    ];
    const signals = [
      "<b>" + (item?.label || "Mode") + "</b> confidence recalculated from live execution inputs.",
      "<b>" + (item?.tags?.[0] || "Workflow") + "</b> variance moved into proactive mitigation lane.",
      "<b>" + (item?.tags?.[1] || "Governance") + "</b> alerts routed with accountable owner + ETA.",
    ];
    return { seed, kpis, automations, moves, timeline, signals, index };
  };

  const renderSignals = (state, tick = 0) => {
    if (!signalStreamEl) return;
    const now = new Date(Date.now() + tick * 60000);
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    signalStreamEl.innerHTML = (state.signals || [])
      .map((entry, idx) => "<li><b>" + hh + ":" + String((Number(mm) + idx) % 60).padStart(2, "0") + "</b> - " + entry + "</li>")
      .join("");
  };

  const updateSimulator = () => {
    if (!simOutputEl || !activeState) return;
    const a = Number(simAutoEl?.value || 0);
    const p = Number(simPolicyEl?.value || 0);
    const r = Number(simRecoveryEl?.value || 0);
    const readiness = Math.max(0, Math.min(100, Math.round(a * 0.35 + p * 0.25 + r * 0.4)));
    const riskDrift = Math.max(1, Math.round((100 - p) / 22 + (100 - r) / 28));
    simOutputEl.innerHTML =
      "<b>Mode readiness:</b> " + readiness + "% &nbsp;|&nbsp; <b>Projected drift alerts:</b> " + riskDrift +
      "<br /><span>Signal: " + (readiness >= 78 ? "board-ready operating confidence." : "strengthen recovery + policy posture before scale push.") + "</span>";
  };

  const renderFutureState = (state) => {
    if (futureKpisEl) {
      futureKpisEl.innerHTML = state.kpis
        .map((kpi) => '<div class="future-kpi"><strong>' + kpi.value + "</strong><span>" + kpi.label + "</span></div>")
        .join("");
    }
    if (futureAutomationEl) {
      futureAutomationEl.innerHTML = state.automations.map((item) => "<li>" + item + "</li>").join("");
    }
    if (futureMovesEl) {
      futureMovesEl.innerHTML = state.moves.map((item) => "<li>" + item + "</li>").join("");
    }
    if (timelineEl) {
      timelineEl.innerHTML = state.timeline.map((item) => "<li>" + item + "</li>").join("");
    }
    renderSignals(state);
    metricEls.forEach((el, idx) => {
      if (!el) return;
      const base = baseCardValues[idx] || el.dataset.base || el.textContent || "";
      el.textContent = tweakMetric(base, state.seed, idx + state.index);
    });
    if (simAutoEl) simAutoEl.value = String(60 + (state.seed % 25));
    if (simPolicyEl) simPolicyEl.value = String(58 + ((state.seed >> 3) % 30));
    if (simRecoveryEl) simRecoveryEl.value = String(55 + ((state.seed >> 5) % 35));
    updateSimulator();
  };

  const applyFilters = () => {
    const query = (searchInput?.value || "").trim().toLowerCase();
    const rows = Array.from(document.querySelectorAll("#" + tableId + "-tbody tr[data-status]"));
    let shown = 0;
    for (const row of rows) {
      const status = (row.dataset.status || "").toLowerCase();
      const search = (row.dataset.search || "").toLowerCase();
      const passFilter = activeFilter === "all" || status.includes(activeFilter);
      const passSearch = !query || search.includes(query);
      const visible = passFilter && passSearch;
      row.style.display = visible ? "" : "none";
      if (visible) shown += 1;
    }
    if (emptyRow) emptyRow.style.display = shown === 0 ? "" : "none";
  };

  for (const button of buttons) {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filterValue || "all";
      for (const b of buttons) b.classList.toggle("active", b === button);
      applyFilters();
    });
  }

  const setWorkspace = (index) => {
    const item = workspaceData[index];
    if (!item || !workspaceTitle || !workspaceDetail || !workspaceTags) return;
    activeWorkspaceIndex = index;
    workspaceTitle.textContent = item.label || "Workspace";
    workspaceDetail.textContent = item.detail || "";
    workspaceTags.innerHTML = (item.tags || []).map((tag) => "<span>" + tag + "</span>").join("");
    const state = buildFutureState(item, index);
    activeState = state;
    renderRows(buildRowsForWorkspace(item, index, state.seed));
    renderFutureState(state);
    applyFilters();
    for (const b of workspaceButtons) b.classList.toggle("active", Number(b.dataset.sidebarWorkspaceIndex || "-1") === index);
  };

  for (const button of workspaceButtons) {
    button.addEventListener("click", () => {
      autopilotEnabled = false;
      if (autopilotBtn) autopilotBtn.textContent = "Autopilot: Off";
      setWorkspace(Number(button.dataset.sidebarWorkspaceIndex || "0"));
    });
  }

  if (searchInput) searchInput.addEventListener("input", applyFilters);
  if (simAutoEl) simAutoEl.addEventListener("input", updateSimulator);
  if (simPolicyEl) simPolicyEl.addEventListener("input", updateSimulator);
  if (simRecoveryEl) simRecoveryEl.addEventListener("input", updateSimulator);
  if (autopilotBtn) {
    autopilotBtn.addEventListener("click", () => {
      autopilotEnabled = !autopilotEnabled;
      autopilotBtn.textContent = "Autopilot: " + (autopilotEnabled ? "On" : "Off");
    });
  }
  setInterval(() => {
    if (!activeState) return;
    renderSignals(activeState, Math.floor(Date.now() / 5000) % 12);
  }, 5000);
  setInterval(() => {
    if (!autopilotEnabled || workspaceData.length < 2) return;
    const nextIndex = (activeWorkspaceIndex + 1) % workspaceData.length;
    setWorkspace(nextIndex);
  }, 9000);
  setWorkspace(0);
})();
</script>
</body></html>`;

  await write(path.join(dashboardsHtmlRoot, page.file), html);
}

const enhancedCss = `
:root {
  --bg: #0a1324;
  --panel: #111c32;
  --line: #2a4063;
  --text: #edf3fb;
  --muted: #a4b5ce;
}
* { box-sizing: border-box; }
body { margin: 0; background: radial-gradient(circle at 20% 0%, #1a3259 0%, #0a1324 48%); color: var(--text); font-family: "IBM Plex Sans", "Segoe UI", sans-serif; min-height: 100vh; }
.canvas { max-width: 1920px; width: 100%; min-height: 100vh; margin: 0 auto; padding: clamp(18px, 3vw, 42px); }
.head { display: flex; justify-content: space-between; align-items: flex-start; gap: 18px; }
.title h1 { margin: 0; font-size: 40px; }
.title p { margin: 8px 0 0; color: var(--muted); font-size: 18px; max-width: 980px; }
.legend { display: flex; gap: 8px; flex-wrap: wrap; justify-content: flex-end; max-width: 560px; }
.chip { border: 1px solid var(--line); border-radius: 999px; padding: 6px 12px; font-size: 12px; color: var(--muted); }
.diagram {
  margin-top: 24px;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 18px;
}
.diagram img { width: 100%; max-width: 100%; height: auto; max-height: min(68vh, 920px); object-fit: contain; object-position: top center; display: block; border-radius: 10px; margin: 0 auto; }
.notes { margin-top: 14px; display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; }
.note { background: #0f192d; border: 1px solid #243959; border-radius: 10px; padding: 10px; color: var(--muted); font-size: 13px; line-height: 1.4; }
@media (max-width: 1200px) {
  .head { flex-direction: column; }
  .legend { justify-content: flex-start; max-width: none; }
}
@media (max-width: 900px) {
  .title h1 { font-size: 30px; }
  .title p { font-size: 15px; }
  .notes { grid-template-columns: 1fr; }
}
`;
await write(path.join(diagEnhancedHtmlRoot, "enhanced.css"), enhancedCss);

const enhancedSpecs = [
  ["system-context", "System Context", "Actors, platform, existing services, and enterprise boundary map", ["Actors", "Platform Core", "Existing Services", "Enterprise Systems"]],
  ["layered-architecture", "Layered Architecture", "Experience, control plane, data plane, connectors, and infrastructure", ["Experience", "Control Plane", "Data Plane", "Connector Layer", "Infra"]],
  ["dashboard-topology", "Dashboard Topology", "Institution analytics separated from Esheria internal analytics", ["Tenant Scoped", "Internal Only", "Role Boundaries"]],
  ["contract-intake-sequence", "Contract Intake Sequence", "Execution timeline from intake to approval and export", ["Workflow Runtime", "Connector Calls", "Review Controls", "Audit Events"]],
  ["service-integration-map", "Service Integration Map", "Gateway-to-service adapter boundaries and dependencies", ["Gateway", "Connector Contracts", "Downstream Services"]],
  ["ontology-er", "Ontology Model", "Canonical entities and relationship model for workflow data", ["Tenant", "Matter", "Document", "WorkflowRun", "Evidence"]],
  ["deployment-topology", "Deployment Topology", "Runtime placement across ingress, EKS, SageMaker, and shared stores", ["Ingress", "Kubernetes", "SageMaker", "Data Stores", "Observability"]],
  ["control-vs-data-plane", "Control vs Data Plane", "Governance and provisioning split from workflow execution", ["Identity", "Policy", "Runtime", "Shared Services"]],
  ["auth-and-tenant-boundary", "Auth and Tenant Boundary", "Claim flow and authorization boundaries", ["OIDC/SAML", "Tenant Claims", "Service Tokens", "Policy Enforcement"]],
  ["api-boundary-map", "API Boundary Map", "Public API, operator API, connector contracts, and downstream endpoints", ["Platform API", "Connector API", "Downstream APIs"]],
  ["workflow-state-machine", "Workflow State Machine", "Deterministic lifecycle transitions with audit hooks", ["States", "Transitions", "Exception Paths"]],
  ["current-vs-target-architecture", "Current vs Target", "Transformation view from service fragmentation to platform orchestration", ["Current", "Gaps", "Target", "Resolution Path"]],
];

for (const [id, title, subtitle, chips] of enhancedSpecs) {
  const chipHtml = chips.map((c) => `<span class="chip">${c}</span>`).join("");
  const html = `<!doctype html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>${title}</title><link rel="stylesheet" href="enhanced.css" /></head>
<body>
<div class="canvas">
  <section class="head">
    <div class="title"><h1>${title}</h1><p>${subtitle}</p></div>
    <div class="legend">${chipHtml}</div>
  </section>
  <section class="diagram"><img src="../../source/svg/${id}.svg" alt="${title}" /></section>
  <section class="notes">
    <div class="note">Layer coding and boundary labels are standardized for executive readability.</div>
    <div class="note">Diagram source remains Mermaid-canonical; this version is presentation-polished.</div>
    <div class="note">Rendered at boardroom-safe 16:9 layout for direct deck insertion.</div>
  </section>
</div>
</body>
</html>`;
  await write(path.join(diagEnhancedHtmlRoot, `${id}.html`), html);
}

const executiveTex = `\\documentclass[11pt]{article}
\\usepackage[margin=1in]{geometry}
\\usepackage{graphicx}
\\usepackage{float}
\\usepackage{hyperref}
\\title{Esheria Legal Workflow OS: Executive Proposal}
\\date{2026-03-07}
\\begin{document}
\\maketitle

\\section{Strategic Shift}
Esheria moves from product-fragmented capabilities to a unified multi-tenant legal workflow operating system. The strategic thesis is orchestration-first integration with strict tenancy, governance, and auditability controls.

\\section{Current Architecture}
\\begin{figure}[H]
\\centering
\\includegraphics[width=\\textwidth]{../visuals/diagrams/source/png/system-context.png}
\\caption{Current system context across actors, services, and enterprise integrations}
\\end{figure}

\\section{Platform Architecture}
\\begin{figure}[H]
\\centering
\\includegraphics[width=\\textwidth]{../visuals/diagrams/source/png/layered-architecture.png}
\\caption{Target layered architecture with control and data plane split}
\\end{figure}

\\section{Workflow Example}
\\begin{figure}[H]
\\centering
\\includegraphics[width=\\textwidth]{../visuals/diagrams/source/png/contract-intake-sequence.png}
\\caption{Contract intake and review workflow sequence}
\\end{figure}

\\section{Dashboards}
\\begin{figure}[H]
\\centering
\\includegraphics[width=\\textwidth]{../visuals/diagrams/source/png/dashboard-topology.png}
\\caption{Customer vs operator dashboard topology and analytics separation}
\\end{figure}

\\section{Integrations}
\\begin{figure}[H]
\\centering
\\includegraphics[width=\\textwidth]{../visuals/diagrams/source/png/service-integration-map.png}
\\caption{Connector gateway integration map across Esheria services}
\\end{figure}

\\section{Deployment}
\\begin{figure}[H]
\\centering
\\includegraphics[width=\\textwidth]{../visuals/diagrams/source/png/deployment-topology.png}
\\caption{Deployment topology across EKS, SageMaker, and shared data services}
\\end{figure}

\\section{Roadmap}
\\begin{figure}[H]
\\centering
\\includegraphics[width=\\textwidth]{../visuals/diagrams/source/png/current-vs-target-architecture.png}
\\caption{Transformation roadmap from current to target architecture}
\\end{figure}

\\end{document}
`;

const technicalTex = `\\documentclass[10pt]{article}
\\usepackage[margin=0.9in]{geometry}
\\usepackage{graphicx}
\\usepackage{float}
\\usepackage{hyperref}
\\title{Esheria Legal Workflow OS: Technical Blueprint}
\\date{2026-03-07}
\\begin{document}
\\maketitle

\\section{System Architecture}
\\begin{figure}[H]
\\centering
\\includegraphics[width=\\textwidth]{../visuals/diagrams/source/png/layered-architecture.png}
\\caption{System architecture layers and boundaries}
\\end{figure}

\\section{API Boundaries}
\\begin{figure}[H]
\\centering
\\includegraphics[width=\\textwidth]{../visuals/diagrams/source/png/api-boundary-map.png}
\\caption{Platform API and connector boundary map}
\\end{figure}

\\section{Ontology Model}
\\begin{figure}[H]
\\centering
\\includegraphics[width=\\textwidth]{../visuals/diagrams/source/png/ontology-er.png}
\\caption{Canonical ontology and key entity relationships}
\\end{figure}

\\section{Workflow Engine Design}
\\begin{figure}[H]
\\centering
\\includegraphics[width=\\textwidth]{../visuals/diagrams/source/png/workflow-state-machine.png}
\\caption{Workflow state machine with deterministic transitions}
\\end{figure}

\\section{Tenancy Model}
\\begin{figure}[H]
\\centering
\\includegraphics[width=\\textwidth]{../visuals/diagrams/source/png/dashboard-topology.png}
\\caption{Tenant-scoped customer analytics separated from internal analytics}
\\end{figure}

\\section{Control vs Data Plane}
\\begin{figure}[H]
\\centering
\\includegraphics[width=\\textwidth]{../visuals/diagrams/source/png/control-vs-data-plane.png}
\\caption{Control-plane and data-plane responsibility split}
\\end{figure}

\\section{Deployment Topology}
\\begin{figure}[H]
\\centering
\\includegraphics[width=\\textwidth]{../visuals/diagrams/source/png/deployment-topology.png}
\\caption{Deployment topology for runtime services and shared infrastructure}
\\end{figure}

\\section{Integration Architecture}
\\begin{figure}[H]
\\centering
\\includegraphics[width=\\textwidth]{../visuals/diagrams/source/png/service-integration-map.png}
\\caption{Connector integration architecture}
\\end{figure}

\\end{document}
`;

// Non-destructive rule:
// - Canonical docs in artifacts/documents must never be overwritten by generator output.
// - If authored docs are missing, bootstrap once from default templates.
await writeIfMissing(path.join(docsRoot, "executive_proposal.tex"), executiveTex);
await writeIfMissing(path.join(docsRoot, "technical_blueprint.tex"), technicalTex);

// Remove legacy generated LaTeX templates to avoid stale editor diagnostics.
await fs.rm(generatedDocTemplatesRoot, { recursive: true, force: true });

await writeIfMissing(
  path.join(exportsSlidesRoot, "README.md"),
  "# Slides Export Placeholder\n\nPlace generated PPTX/Keynote exports here.\n"
);
await writeIfMissing(
  path.join(exportsPdfRoot, "README.md"),
  "# PDF Export Placeholder\n\nPlace compiled PDF outputs here.\n"
);

await write(
  path.join(artifactsRoot, "README.md"),
  `# Artifacts\n\n- website: static architecture website pages\n- documents: LaTeX executive + technical documents\n- visuals: diagram sources/enhancements and dashboard mockup pages\n- exports: pdf/slide output folders\n`
);

console.log("Artifact structure generated at", artifactsRoot);
