import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import TopNav from "./components/TopNav";
import ExecutivePage from "./pages/ExecutivePage";
import BlueprintPage from "./pages/BlueprintPage";
import ExplorerPage from "./pages/ExplorerPage";
import OverviewPage from "./pages/OverviewPage";
import DashboardGalleryPage from "./pages/DashboardGalleryPage";
import ModulePreviewPage from "./pages/ModulePreviewPage";
import ArtifactSectionPage from "./pages/ArtifactSectionPage";
import { navSections, sectionById } from "./portal/artifactCatalog";
import LegacyArchitecturePage from "../esheria-architecture.jsx";
import LegacyDiagramsPage from "../esheria-diagrams.jsx";

const staticRouteComponents = {
  overview: OverviewPage,
  executive: ExecutivePage,
  blueprint: BlueprintPage,
  dashboards: DashboardGalleryPage,
  explorer: ExplorerPage,
};

function pathToSlug(path) {
  return path.replace(/^\//, "");
}

const knownPaths = navSections.map((item) => item.to);
const HEADERLESS_ROUTES = new Set(["/legacy-architecture", "/legacy-diagrams"]);

function NotFoundPage() {
  return (
    <main className="page-wrap">
      <section className="hero">
        <div className="hero-kicker">Route Not Found</div>
        <h1>Use {knownPaths.join(", ").replace(/, ([^,]+)$/, ", or $1")}</h1>
      </section>
    </main>
  );
}

function AppRoutes() {
  const location = useLocation();
  const hideTopNav = HEADERLESS_ROUTES.has(location.pathname);

  return (
    <div className="app-shell">
      {!hideTopNav ? <TopNav /> : null}
      <Routes>
        <Route path="/" element={<Navigate to="/overview" replace />} />
        <Route path="/legacy-architecture" element={<LegacyArchitecturePage />} />
        <Route path="/legacy-diagrams" element={<LegacyDiagramsPage />} />
        <Route path="/dashboards/:dashboardId/:moduleId" element={<ModulePreviewPage />} />
        {navSections.map((entry) => {
          const slug = pathToSlug(entry.to);
          const StaticPage = staticRouteComponents[slug];

          if (StaticPage) {
            return <Route key={entry.to} path={entry.to} element={<StaticPage />} />;
          }

          if (sectionById[slug]) {
            return (
              <Route
                key={entry.to}
                path={entry.to}
                element={<ArtifactSectionPage sectionId={slug} />}
              />
            );
          }

          return null;
        })}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
