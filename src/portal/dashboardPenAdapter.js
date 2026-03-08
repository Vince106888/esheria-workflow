import { DASHBOARD_SIDEBAR_OVERRIDES } from "./dashboardSidebarConfig";

const PEN_DASHBOARD_COMPONENT_ID = "4Z7PP";
const PEN_DASHBOARD_URL = "/artifacts/visuals/architecture-artifacts.pen";

const FIELD_IDS = {
  sidebarBrand: "Q5JA0",
  sidebarNav: "3UUlo",
  title: "oTPQg",
  badge: "OwIgc",
  kpiOne: "51kW0",
  kpiTwo: "PnoI6",
  kpiThree: "n8UJw",
  kpiFour: "L6uyG",
  leftContent: "gYdEn",
  rightContent: "F1aJL",
};

function linesFrom(text = "") {
  return String(text)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function slugify(value = "") {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseKpiValue(text = "") {
  const [label = "", value = ""] = String(text).split("\n");
  return {
    label: label.trim(),
    value: value.trim(),
  };
}

function findNodeById(node, id) {
  if (!node) return null;
  if (node.id === id) return node;
  for (const child of node.children || []) {
    const found = findNodeById(child, id);
    if (found) return found;
  }
  return null;
}

function getSidebarDefaults(document) {
  const nodes = Array.isArray(document?.children) ? document.children : [];
  const component = nodes.find((node) => node?.id === PEN_DASHBOARD_COMPONENT_ID);
  const brandNode = findNodeById(component, FIELD_IDS.sidebarBrand);
  const navNode = findNodeById(component, FIELD_IDS.sidebarNav);
  return {
    brand: brandNode?.content || "Esheria OS",
    nav: linesFrom(navNode?.content || ""),
  };
}

function parseChartAndActivity(raw = "") {
  const rows = linesFrom(raw);
  const chart = [];
  const activity = [];
  let mode = "none";

  for (const row of rows) {
    if (/^analytics chart$/i.test(row)) {
      mode = "chart";
      continue;
    }
    if (/^activity log$/i.test(row)) {
      mode = "activity";
      continue;
    }
    if (mode === "chart") {
      const valueMatch = row.match(/([0-9.,]+%?)$/);
      if (valueMatch && typeof valueMatch.index === "number") {
        const rawLabel = row.slice(0, valueMatch.index);
        const cleanLabel = rawLabel
          .replace(/[^A-Za-z0-9/ -]/g, " ")
          .replace(/\s+/g, " ")
          .trim();
        if (!cleanLabel) continue;
        chart.push({
          label: cleanLabel,
          value: Number(String(valueMatch[1]).replace(/[^0-9.]/g, "")) || 0,
          rawValue: String(valueMatch[1]).trim(),
        });
      }
      continue;
    }
    if (mode === "activity") {
      const timed = row.match(/^([0-9]{2}:[0-9]{2})\s+(.+)$/);
      if (timed) {
        activity.push({
          at: timed[1],
          message: timed[2].trim(),
        });
      } else {
        activity.push({
          at: "",
          message: row,
        });
      }
    }
  }

  return { chart, activity };
}

function parseApprovalAndTimeline(raw = "") {
  const rows = linesFrom(raw);
  const approval = {
    pending: "",
    actions: [],
  };
  const timeline = [];
  let mode = "none";

  for (const row of rows) {
    if (/^approval panel$/i.test(row)) {
      mode = "approval";
      continue;
    }
    if (/^timeline$/i.test(row)) {
      mode = "timeline";
      continue;
    }
    if (mode === "approval") {
      if (/^pending:/i.test(row)) {
        approval.pending = row.replace(/^pending:\s*/i, "").trim();
        continue;
      }
      if (/^action:/i.test(row)) {
        approval.actions = row
          .replace(/^action:\s*/i, "")
          .split("|")
          .map((value) => value.trim())
          .filter(Boolean);
      }
      continue;
    }
    if (mode === "timeline") {
      const timed = row.match(/^([0-9]{2}:[0-9]{2})\s+(.+)$/);
      if (timed) {
        timeline.push({
          at: timed[1],
          message: timed[2].trim(),
        });
      } else {
        timeline.push({
          at: "",
          message: row,
        });
      }
    }
  }

  return { approval, timeline };
}

function getSeverity(message = "") {
  const value = message.toLowerCase();
  if (/(failed|incident|critical|rollback|risk|breach)/.test(value)) return "risk";
  if (/(retry|warning|delayed|pending|timeout|escalat|mitigation)/.test(value)) return "warn";
  return "normal";
}

function parseDashboardFrame(frame, sidebarDefaults) {
  const instance = (frame.children || []).find(
    (node) => node.type === "ref" && node.ref === PEN_DASHBOARD_COMPONENT_ID
  );
  if (!instance) return null;

  const descendant = instance.descendants || {};
  const panelLeft = descendant[FIELD_IDS.leftContent]?.content || "";
  const panelRight = descendant[FIELD_IDS.rightContent]?.content || "";

  const { chart, activity } = parseChartAndActivity(panelLeft);
  const { approval, timeline } = parseApprovalAndTimeline(panelRight);
  const sectionTitle = String(frame.name || "").split("/").slice(1).join("/").trim();
  const slug = slugify(sectionTitle);
  const sidebarOverride = DASHBOARD_SIDEBAR_OVERRIDES[slug];
  const sidebarBrand = sidebarOverride?.brand
    || instance.descendants?.[FIELD_IDS.sidebarBrand]?.content
    || sidebarDefaults.brand;
  const sidebarNavRaw = sidebarOverride?.nav?.join("\n")
    || instance.descendants?.[FIELD_IDS.sidebarNav]?.content
    || sidebarDefaults.nav.join("\n");

  return {
    id: slug,
    frameId: frame.id,
    sidebarBrand,
    sidebarNav: linesFrom(sidebarNavRaw),
    title: descendant[FIELD_IDS.title]?.content || sectionTitle || "Dashboard",
    badge: descendant[FIELD_IDS.badge]?.content || "Enterprise View",
    kpis: [FIELD_IDS.kpiOne, FIELD_IDS.kpiTwo, FIELD_IDS.kpiThree, FIELD_IDS.kpiFour]
      .map((id) => parseKpiValue(descendant[id]?.content || ""))
      .filter((item) => item.label || item.value),
    chart,
    activity: activity.map((entry) => ({
      ...entry,
      severity: getSeverity(entry.message),
    })),
    approval,
    timeline,
    htmlUrl: `/artifacts/visuals/dashboards/html/${slug}.html`,
    pngUrl: `/artifacts/visuals/dashboards/png/${slug}.png`,
  };
}

export function parseDashboardsFromPenDocument(document) {
  const nodes = Array.isArray(document?.children) ? document.children : [];
  const sidebarDefaults = getSidebarDefaults(document);
  return nodes
    .filter(
      (node) =>
        node?.type === "frame" &&
        String(node?.name || "").toLowerCase().startsWith("dashboard /")
    )
    .map((frame) => parseDashboardFrame(frame, sidebarDefaults))
    .filter(Boolean);
}

export async function loadDashboardsFromPen(url = PEN_DASHBOARD_URL) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Unable to load dashboard source (${response.status})`);
  }
  const document = await response.json();
  const dashboards = parseDashboardsFromPenDocument(document);
  if (!dashboards.length) {
    throw new Error("No dashboard frames found in architecture-artifacts.pen");
  }
  return dashboards;
}
