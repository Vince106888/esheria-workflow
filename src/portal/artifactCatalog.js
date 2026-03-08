import diagramRegistry from "../architecture/diagramRegistry";

const uniqueDiagrams = (diagramRegistry || []).filter(
  (diagram, index, list) => list.findIndex((entry) => entry.id === diagram.id) === index
);

const DIAGRAM_DOWNLOAD_IDS = uniqueDiagrams.map((diagram) => diagram.id);

const DASHBOARD_SLIDE_DOWNLOAD_IDS = [
  "institution-analytics",
  "institution-workspace",
  "operator-console",
  "support-incident-center",
  "workflow-monitoring",
];

const DASHBOARD_VISUAL_DOWNLOAD_IDS = [
  "board-command-center",
  "institution-analytics",
  "institution-workspace",
  "operator-console",
  "portfolio-forecast",
  "support-incident-center",
  "workflow-monitoring",
];

const titleFromId = (id) =>
  id
    .split("-")
    .map((token) => (token === "vs" ? "vs" : token.charAt(0).toUpperCase() + token.slice(1)))
    .join(" ");

const diagramGalleryItems = uniqueDiagrams.map((diagram, index) => {
  const title = diagram?.title?.replace(/\s+Diagram$/i, "") || titleFromId(diagram.id);
  const isExecutive = diagram?.audiences?.includes("executive");
  return {
    label: `Enhanced: ${title}`,
    url: `/artifacts/visuals/diagrams/enhanced/html/${diagram.id}.html`,
    type: isExecutive ? "Board Visual" : "Technical Visual",
    summary: diagram?.purpose || `Enhanced diagram render for ${title}.`,
    recommended: index < 3,
  };
});

const downloadDocumentItems = [
  {
    label: "Executive Proposal (PDF)",
    url: "/artifacts/exports/pdf/executive_proposal.pdf",
    type: "Primary Download",
    summary: "Board-ready executive PDF artifact.",
    recommended: true,
  },
  {
    label: "Technical Blueprint (PDF)",
    url: "/artifacts/exports/pdf/technical_blueprint.pdf",
    type: "Primary Download",
    summary: "Implementation-ready technical PDF artifact.",
    recommended: true,
  },
  {
    label: "Executive Proposal (DOCX)",
    url: "/artifacts/esheria-executive-proposal.docx",
    type: "Editable Download",
    summary: "Word source for stakeholder edits.",
  },
  {
    label: "Technical Blueprint (DOCX)",
    url: "/artifacts/esheria-technical-blueprint.docx",
    type: "Editable Download",
    summary: "Word source for implementation review edits.",
  },
  {
    label: "Product Design Appendix (DOCX)",
    url: "/artifacts/esheria-product-design-appendix.docx",
    type: "Editable Download",
    summary: "Editable appendix for product and design addenda.",
  },
];

const downloadDiagramSlideItems = DIAGRAM_DOWNLOAD_IDS.map((id) => ({
  label: `Slides: ${titleFromId(id)} (PNG)`,
  url: `/artifacts/exports/slides/assets/diagrams/${id}.png`,
  type: "Slide Diagram Asset",
  summary: "Slide-ready diagram PNG export.",
}));

const downloadDiagramPngItems = DIAGRAM_DOWNLOAD_IDS.map((id) => ({
  label: `Source Diagram: ${titleFromId(id)} (PNG)`,
  url: `/diagrams/exports/png/${id}.png`,
  type: "Source Diagram PNG",
  summary: "Rendered Mermaid PNG source export.",
}));

const downloadDiagramSvgItems = DIAGRAM_DOWNLOAD_IDS.map((id) => ({
  label: `Source Diagram: ${titleFromId(id)} (SVG)`,
  url: `/diagrams/exports/svg/${id}.svg`,
  type: "Source Diagram SVG",
  summary: "Editable vector source diagram export.",
}));

const downloadDashboardSlideItems = DASHBOARD_SLIDE_DOWNLOAD_IDS.map((id) => ({
  label: `Slides: ${titleFromId(id)} (PNG)`,
  url: `/artifacts/exports/slides/assets/dashboards/${id}.png`,
  type: "Slide Dashboard Asset",
  summary: "Slide-ready dashboard PNG export.",
}));

const downloadDashboardPngItems = DASHBOARD_VISUAL_DOWNLOAD_IDS.map((id) => ({
  label: `Dashboard Export: ${titleFromId(id)} (PNG)`,
  url: `/artifacts/visuals/dashboards/png/${id}.png`,
  type: "Dashboard PNG",
  summary: "High-resolution dashboard export for decks and docs.",
}));

const downloadRunbookItems = [
  {
    label: "PDF Export Notes",
    url: "/artifacts/exports/pdf/README.md",
    type: "Runbook",
    summary: "PDF generation details and assumptions.",
  },
  {
    label: "Slides Export Notes",
    url: "/artifacts/exports/slides/README.md",
    type: "Runbook",
    summary: "Slides export structure and usage notes.",
  },
  {
    label: "Artifact Review Runbook",
    url: "/artifacts/RUNBOOK.md",
    type: "Runbook",
    summary: "Single-command review and route map instructions.",
  },
];

export const portalSections = [
  {
    id: "diagrams",
    navLabel: "Diagrams",
    title: "Diagram Gallery",
    description: "Executive-ready architecture visuals with direct access to source exports.",
    bestFor: "Architecture narrative in both 5-minute executive and 20-minute technical reviews.",
    reviewHint: "Use enhanced renders here; open Downloads for PNG/SVG/Mermaid source assets.",
    items: diagramGalleryItems,
  },
  {
    id: "documents",
    navLabel: "Documents",
    title: "Documents",
    description: "Curated narrative and technical source notes for executive and engineering review.",
    bestFor: "Storyline alignment, architecture reasoning, and source-traceable technical deep dives.",
    reviewHint: "Use this page for primary PDFs and authored notes; use Downloads for full packaged export sets.",
    items: [
      {
        label: "Executive Proposal (PDF)",
        url: "/artifacts/exports/pdf/executive_proposal.pdf",
        type: "Primary PDF",
        summary: "Board-oriented proposal narrative and value case.",
        recommended: true,
      },
      {
        label: "Technical Blueprint (PDF)",
        url: "/artifacts/exports/pdf/technical_blueprint.pdf",
        type: "Primary PDF",
        summary: "Implementation-grade architecture and integration blueprint.",
        recommended: true,
      },
      {
        label: "Executive Deck Outline",
        url: "/docs/presentation/executive-deck-outline.md",
        type: "Narrative Outline",
        summary: "Board storyline and decision flow for executive review.",
      },
      {
        label: "Appendix Outline",
        url: "/docs/presentation/appendix-outline.md",
        type: "Narrative Outline",
        summary: "Supporting appendix structure for deeper architecture discussion.",
      },
      {
        label: "Technical Blueprint Notes",
        url: "/docs/architecture/technical-blueprint.md",
        type: "Architecture Note",
        summary: "Implementation-grade architecture and integration blueprint notes.",
        recommended: true,
      },
      {
        label: "Integration Strategy",
        url: "/docs/architecture/integration-strategy.md",
        type: "Architecture Note",
        summary: "Phased strategy for connector-led platform integration.",
      },
      {
        label: "Implementation Roadmap",
        url: "/docs/architecture/implementation-roadmap.md",
        type: "Architecture Note",
        summary: "Phase plan and sequencing for delivery and adoption.",
      },
      {
        label: "Consistency Review",
        url: "/docs/architecture/consistency-review.md",
        type: "Architecture Note",
        summary: "Cross-artifact consistency checks and findings.",
      },
      {
        label: "API Catalog",
        url: "/docs/discovery/api-catalog.md",
        type: "Discovery Note",
        summary: "Cross-repo endpoint inventory and auth constraints.",
      },
      {
        label: "Repository Deep Scan",
        url: "/docs/discovery/repo-deep-scan.md",
        type: "Discovery Note",
        summary: "Evidence scan of platform capabilities and integration constraints.",
      },
    ],
  },
  {
    id: "downloads",
    navLabel: "Downloads",
    title: "Download Center",
    description: "Export-ready assets for decks, PDFs, and architecture inserts.",
    bestFor: "Preparing external decks, internal reviews, and implementation packets.",
    reviewHint: "Use the Download action in the viewer toolbar to save the selected asset directly.",
    items: [
      ...downloadDocumentItems,
      ...downloadDiagramSlideItems,
      ...downloadDiagramPngItems,
      ...downloadDiagramSvgItems,
      ...downloadDashboardSlideItems,
      ...downloadDashboardPngItems,
      ...downloadRunbookItems,
    ],
  },
  {
    id: "dashboards",
    navLabel: "Dashboards",
    title: "Dashboard Gallery",
    description: "Enterprise product mockups for customer and operator experiences.",
    bestFor: "Product walkthrough context and UI direction discussions.",
    reviewHint: "Open HTML views first for full context, then use PNG exports for slides.",
    items: [
      {
        label: "Institution Workspace (HTML)",
        url: "/artifacts/visuals/dashboards/html/institution-workspace.html",
        type: "Interactive Mockup",
        summary: "Customer workflow and matter operations surface.",
        recommended: true,
      },
      {
        label: "Operator Console (HTML)",
        url: "/artifacts/visuals/dashboards/html/operator-console.html",
        type: "Interactive Mockup",
        summary: "Internal governance and tenant operations surface.",
      },
      {
        label: "Workflow Monitoring (HTML)",
        url: "/artifacts/visuals/dashboards/html/workflow-monitoring.html",
        type: "Interactive Mockup",
        summary: "Operational workflow status and issue monitoring.",
      },
      {
        label: "Institution Analytics (HTML)",
        url: "/artifacts/visuals/dashboards/html/institution-analytics.html",
        type: "Interactive Mockup",
        summary: "Tenant-facing analytics and KPI review.",
      },
      {
        label: "Support / Incident Center (HTML)",
        url: "/artifacts/visuals/dashboards/html/support-incident-center.html",
        type: "Interactive Mockup",
        summary: "Support triage and incident handling workspace.",
      },
      {
        label: "Board Command Center (HTML)",
        url: "/artifacts/visuals/dashboards/html/board-command-center.html",
        type: "Executive Mockup",
        summary: "CEO-level revenue, risk, and trust signal consolidation view.",
      },
      {
        label: "Portfolio Forecast (HTML)",
        url: "/artifacts/visuals/dashboards/html/portfolio-forecast.html",
        type: "Executive Mockup",
        summary: "Portfolio risk-weighted forecasting and planning scenarios.",
      },
    ],
  },
  {
    id: "website",
    navLabel: "Website",
    title: "Product Website Artifact",
    description: "Marketing-style product website with role-based app-shell launch surfaces and conversion-oriented navigation.",
    bestFor: "CEO, GTM, and product review of positioning, packaging, and live dashboard entry points.",
    reviewHint: "Start at Home, then walk Product/Solutions/Pricing; use the theme toggle to validate dark/light consistency.",
    items: [
      {
        label: "Website: Full Package",
        url: "/artifacts/website/index.html",
        type: "Product Site",
        summary: "Marketing + app-shell artifact with role-specific launch links and pricing interactions.",
        recommended: true,
      },
    ],
  },
  {
    id: "appendix",
    navLabel: "Appendix",
    title: "Appendix / Repo Intelligence",
    description: "Canonical source references, model files, and implementation notes.",
    bestFor: "Technical validation and source-level traceability in deep review.",
    reviewHint: "Use after core narrative pages to validate exact model and implementation references.",
    items: [
      {
        label: "Legacy Architecture Artifact (Interactive)",
        url: "/legacy-architecture",
        type: "Legacy Interactive",
        summary: "Rendered legacy architecture JSX artifact.",
        recommended: true,
      },
      {
        label: "Legacy Diagrams Artifact (Interactive)",
        url: "/legacy-diagrams",
        type: "Legacy Interactive",
        summary: "Rendered legacy 10-page diagram JSX artifact.",
        recommended: true,
      },
      {
        label: "Executive JSX",
        url: "/src/pages/ExecutivePage.jsx",
        type: "Source Code",
        summary: "Executive page implementation source.",
      },
      {
        label: "Blueprint JSX",
        url: "/src/pages/BlueprintPage.jsx",
        type: "Source Code",
        summary: "Blueprint page implementation source.",
      },
      {
        label: "Explorer JSX",
        url: "/src/pages/ExplorerPage.jsx",
        type: "Source Code",
        summary: "Explorer page implementation source.",
      },
      {
        label: "Architecture Model",
        url: "/src/architecture/architectureModel.js",
        type: "Model Source",
        summary: "Canonical architecture data model.",
        recommended: true,
      },
      {
        label: "Diagram Registry",
        url: "/src/architecture/diagramRegistry.js",
        type: "Model Source",
        summary: "Diagram inventory, audiences, and purpose metadata.",
      },
      {
        label: "Technical Blueprint Notes",
        url: "/docs/architecture/technical-blueprint.md",
        type: "Architecture Note",
        summary: "Blueprint rationale and technical detail.",
      },
      {
        label: "Implementation Roadmap",
        url: "/docs/architecture/implementation-roadmap.md",
        type: "Architecture Note",
        summary: "Phase plan and outcome sequencing.",
      },
      {
        label: "Consistency Review",
        url: "/docs/architecture/consistency-review.md",
        type: "Architecture Note",
        summary: "Cross-artifact consistency checks and findings.",
      },
    ],
  },
];

const coreNavSections = [
  { to: "/overview", label: "Overview" },
  { to: "/executive", label: "Executive" },
  { to: "/blueprint", label: "Blueprint" },
  { to: "/explorer", label: "Explorer" },
];

export const sectionById = portalSections.reduce((acc, section) => {
  acc[section.id] = section;
  return acc;
}, {});

const presentationSectionOrder = [
  "diagrams",
  "dashboards",
  "website",
  "documents",
  "downloads",
  "appendix",
];

const presentationCoreOrder = ["overview", "executive", "blueprint", "diagrams", "dashboards", "website", "documents", "explorer", "downloads", "appendix"];

export const presentationSections = presentationSectionOrder
  .map((sectionId) => sectionById[sectionId])
  .filter(Boolean);

const orderedNavSections = [
  ...presentationCoreOrder
    .map((slug) => {
      const core = coreNavSections.find((entry) => entry.to === `/${slug}`);
      if (core) return core;

      const section = sectionById[slug];
      if (section) {
        return { to: `/${section.id}`, label: section.navLabel || section.title };
      }

      return null;
    })
    .filter(Boolean),
];

const toStepLabel = (index, label) => `${String(index + 1).padStart(2, "0")} ${label}`;

export const navSections = orderedNavSections.map((entry, index) => ({
  ...entry,
  label: toStepLabel(index, entry.label),
}));
