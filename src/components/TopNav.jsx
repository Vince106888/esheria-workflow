import { NavLink, useLocation } from "react-router-dom";
import { navSections, portalSections } from "../portal/artifactCatalog";
import { useTheme } from "../theme/ThemeProvider";

export default function TopNav() {
  const { isDark, theme, toggleTheme } = useTheme();
  const location = useLocation();
  const activeIndex = navSections.findIndex(
    (item) => location.pathname === item.to || location.pathname.startsWith(`${item.to}/`)
  );
  const safeIndex = activeIndex >= 0 ? activeIndex : 0;
  const activeRoute = navSections[safeIndex];
  const activeLabel = activeRoute?.label?.replace(/^\d+\s+/, "") || "Overview";
  const totalSections = portalSections.length;
  const totalAssets = portalSections.reduce((count, section) => count + (section.items?.length || 0), 0);

  return (
    <header className="top-nav">
      <div className="top-nav-inner">
        <div className="top-nav-left">
          <div className="brand-wrap">
            <div className="brand-row">
              <img className="brand-logo" src="/assets/img/logo/vl-footer-logo5.1.png" alt="Esheria" />
              <div className="brand">Unified Artifact Portal</div>
            </div>
            <div className="brand-context">
              Presentation Flow {String(safeIndex + 1).padStart(2, "0")}/{String(navSections.length).padStart(2, "0")} | {activeLabel}
            </div>
          </div>
        </div>

        <nav className="nav-links" aria-label="Primary">
          {navSections.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="top-nav-right">
          <div className="top-nav-meta">
            {totalSections} Sections | {totalAssets} Assets
          </div>
          <div className="top-nav-meta top-nav-meta-mono">npm run artifacts:hub</div>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            title={`Current theme: ${theme}`}
          >
            <span className="theme-toggle-icon" aria-hidden>
              {isDark ? (
                <svg viewBox="0 0 24 24" className="theme-icon-svg">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2V5M12 19V22M2 12H5M19 12H22M4.9 4.9L7.1 7.1M16.9 16.9L19.1 19.1M19.1 4.9L16.9 7.1M7.1 16.9L4.9 19.1" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="theme-icon-svg">
                  <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />
                </svg>
              )}
            </span>
            <span className="sr-only">{isDark ? "Switch to light mode" : "Switch to dark mode"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
