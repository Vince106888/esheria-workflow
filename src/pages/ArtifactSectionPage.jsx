import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { navSections, sectionById } from "../portal/artifactCatalog";

const IMAGE_EXT_PATTERN = /\.(png|jpe?g|webp|gif|svg)(?:\?.*)?$/i;
const PDF_EXT_PATTERN = /\.pdf(?:\?.*)?$/i;
const HTML_EXT_PATTERN = /\.html?(?:\?.*)?$/i;
const TEXT_EXT_PATTERN = /\.(md|txt|json|ya?ml|toml|csv|log|tex|js|jsx|ts|tsx|css|scss|mjs|cjs|py|java|go|rs|sh|bat|xml)(?:\?.*)?$/i;
const DOWNLOAD_ONLY_EXT_PATTERN = /\.(docx?|xlsx?|pptx?|zip)(?:\?.*)?$/i;
const SOURCE_PREVIEW_ROUTE = {
  "/src/pages/ExecutivePage.jsx": "/executive",
  "/src/pages/BlueprintPage.jsx": "/blueprint",
  "/src/pages/ExplorerPage.jsx": "/explorer",
};

function isImageUrl(url = "") {
  return IMAGE_EXT_PATTERN.test(url);
}

function cleanUrl(url = "") {
  return url.split("?")[0].split("#")[0];
}

function resolveAssetPreview(item) {
  const url = item?.url || "";
  const clean = cleanUrl(url);
  const sourcePreviewRoute = SOURCE_PREVIEW_ROUTE[clean];

  if (sourcePreviewRoute) {
    return {
      kind: "web",
      src: sourcePreviewRoute,
      note: `Compiled preview of ${clean}`,
    };
  }
  if (isImageUrl(url)) return { kind: "image", src: url, note: "" };
  if (PDF_EXT_PATTERN.test(url)) return { kind: "pdf", src: url, note: "" };
  if (HTML_EXT_PATTERN.test(url)) return { kind: "web", src: url, note: "" };
  if (TEXT_EXT_PATTERN.test(url)) return { kind: "text", src: url, note: "" };
  if (DOWNLOAD_ONLY_EXT_PATTERN.test(url)) return { kind: "download", src: url, note: "Preview unavailable for this file type." };
  return { kind: "web", src: url, note: "" };
}

function typeTone(type = "") {
  const key = type.toLowerCase();
  if (key.includes("diagram")) return { color: "#00D4AA", label: "Diagram" };
  if (key.includes("pdf") || key.includes("doc") || key.includes("document")) {
    return { color: "#4F7EF7", label: "Document" };
  }
  if (key.includes("mockup") || key.includes("website") || key.includes("narrative")) {
    return { color: "#9B6EF5", label: "Experience" };
  }
  if (key.includes("source") || key.includes("model") || key.includes("code")) {
    return { color: "#E8A020", label: "Source" };
  }
  return { color: "var(--tone-muted)", label: type || "Asset" };
}

const HERO_THEME_BY_SECTION = {
  diagrams: {
    accent: "#00D4AA",
    gradientStart: "#00D4AA",
    gradientEnd: "#4F7EF7",
    highlightWord: "Diagram",
    emphasis: "Architecture visuals styled for executive and technical walkthroughs.",
    tag: "Visual Evidence Surface",
  },
  dashboards: {
    accent: "#4F7EF7",
    gradientStart: "#4F7EF7",
    gradientEnd: "#9B6EF5",
    highlightWord: "Dashboard",
    emphasis: "Product and operations mockups framed as decision-ready review artifacts.",
    tag: "Experience Surface",
  },
  website: {
    accent: "#9B6EF5",
    gradientStart: "#9B6EF5",
    gradientEnd: "#00D4AA",
    highlightWord: "Website",
    emphasis: "Single-entry narrative site with full architecture journey navigation.",
    tag: "Narrative Surface",
  },
  documents: {
    accent: "#4F7EF7",
    gradientStart: "#4F7EF7",
    gradientEnd: "#00D4AA",
    highlightWord: "Documents",
    emphasis: "Board and engineering documents aligned to the same architecture model.",
    tag: "Decision Surface",
  },
  downloads: {
    accent: "#E8A020",
    gradientStart: "#E8A020",
    gradientEnd: "#4F7EF7",
    highlightWord: "Download",
    emphasis: "Export-ready assets prepared for slides, PDFs, and implementation packets.",
    tag: "Export Surface",
  },
  appendix: {
    accent: "#E8A020",
    gradientStart: "#E8A020",
    gradientEnd: "#9B6EF5",
    highlightWord: "Appendix",
    emphasis: "Source-level references and model internals for deep technical validation.",
    tag: "Source Surface",
  },
};

function getHeroTheme(sectionId) {
  return (
    HERO_THEME_BY_SECTION[sectionId] || {
      accent: "#4F7EF7",
      gradientStart: "#4F7EF7",
      gradientEnd: "#00D4AA",
      highlightWord: "",
      emphasis: "Curated artifacts aligned to the platform narrative and implementation plan.",
      tag: "Artifact Surface",
    }
  );
}

function renderStyledTitle(title = "", highlightWord = "") {
  if (!highlightWord) return title;
  const normalizedTitle = title.toLowerCase();
  const normalizedHighlight = highlightWord.toLowerCase();
  const startIndex = normalizedTitle.indexOf(normalizedHighlight);
  if (startIndex < 0) return title;

  const endIndex = startIndex + highlightWord.length;
  return (
    <>
      {title.slice(0, startIndex)}
      <span className="artifact-title-accent">{title.slice(startIndex, endIndex)}</span>
      {title.slice(endIndex)}
    </>
  );
}

function inferDownloadName(url = "") {
  const cleanUrl = url.split("?")[0].split("#")[0];
  const parts = cleanUrl.split("/").filter(Boolean);
  return parts[parts.length - 1] || "artifact";
}

export default function ArtifactSectionPage({ sectionId }) {
  const section = sectionById[sectionId];
  const [activeUrl, setActiveUrl] = useState(section?.items?.[0]?.url || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [textPreview, setTextPreview] = useState({
    status: "idle",
    content: "",
    error: "",
  });

  useEffect(() => {
    setActiveUrl(section?.items?.[0]?.url || "");
    setSearchQuery("");
  }, [sectionId, section]);

  const filteredItems = useMemo(() => {
    const items = section?.items || [];
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase();
    return items.filter((item) => [item.label, item.summary, item.type].some((field) => field?.toLowerCase().includes(q)));
  }, [section, searchQuery]);

  const activeItem = useMemo(() => {
    if (!section?.items?.length) return null;
    return section.items.find((item) => item.url === activeUrl) || section.items[0];
  }, [section, activeUrl]);

  const activeIndex = useMemo(() => {
    if (!section?.items?.length || !activeItem) return -1;
    return section.items.findIndex((item) => item.url === activeItem.url);
  }, [section, activeItem]);
  const activeAsset = useMemo(() => resolveAssetPreview(activeItem), [activeItem]);

  const prevItem = activeIndex > 0 ? section.items[activeIndex - 1] : null;
  const nextItem = activeIndex >= 0 && activeIndex < section.items.length - 1 ? section.items[activeIndex + 1] : null;

  const activeDownloadName = inferDownloadName(activeItem?.url || "");
  const showSidebar = sectionId !== "website" && (section?.items?.length || 0) > 1;
  const tone = typeTone(activeItem?.type);
  const heroTheme = getHeroTheme(sectionId);
  const heroFrameStyle = {
    "--artifact-accent": heroTheme.accent,
    "--artifact-gradient-start": heroTheme.gradientStart,
    "--artifact-gradient-end": heroTheme.gradientEnd,
  };

  const currentRoute = `/${sectionId}`;
  const activeNavIndex = navSections.findIndex((item) => item.to === currentRoute);
  const activeNavLabel = activeNavIndex >= 0 ? navSections[activeNavIndex].label : section.navLabel || section.title;

  const copyActiveUrl = useCallback(() => {
    if (!activeItem?.url) return;
    const absolute = `${window.location.origin}${activeItem.url}`;
    navigator?.clipboard?.writeText(absolute).catch(() => {
      window.prompt("Copy link:", absolute);
    });
  }, [activeItem]);

  useEffect(() => {
    if (!activeAsset?.src || activeAsset.kind !== "text") {
      setTextPreview({ status: "idle", content: "", error: "" });
      return;
    }
    const controller = new AbortController();
    setTextPreview({ status: "loading", content: "", error: "" });

    fetch(activeAsset.src, { signal: controller.signal, cache: "no-store" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to load source (${response.status})`);
        }
        return response.text();
      })
      .then((content) => {
        setTextPreview({ status: "ready", content, error: "" });
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        setTextPreview({ status: "error", content: "", error: error.message || "Unable to load this file." });
      });

    return () => controller.abort();
  }, [activeAsset.kind, activeAsset.src]);

  if (!section) {
    return <Navigate to="/overview" replace />;
  }

  return (
    <main className="artifact-shell">
      <section className="artifact-hero">
        <div className="artifact-hero-frame" style={heroFrameStyle}>
          <div className="artifact-breadcrumb">
            <Link to="/overview">Overview</Link>
            <span>/</span>
            <span>{section.navLabel || section.title}</span>
          </div>

          <div className="artifact-hero-grid">
            <div>
              <div className="artifact-hero-kicker">
                <span className="artifact-hero-dot" />
                <span>{activeNavLabel}</span>
              </div>
              <h1 className="artifact-hero-title">{renderStyledTitle(section.title, heroTheme.highlightWord)}</h1>
              <div className="artifact-hero-emphasis">{heroTheme.emphasis}</div>
              <p className="artifact-hero-description">{section.description}</p>
              <div className="artifact-hero-tag-row">
                <span className="artifact-hero-tag">{heroTheme.tag}</span>
                <span className="artifact-hero-tag artifact-hero-tag-secondary">{section.items.length} linked assets</span>
              </div>
            </div>

            <div className="artifact-hero-stats">
              <div className="artifact-stat">
                <div className="artifact-stat-label">Total Assets</div>
                <div className="artifact-stat-value">{section.items.length}</div>
              </div>
              <div className="artifact-stat">
                <div className="artifact-stat-label">Best For</div>
                <div className="artifact-stat-value">{section.bestFor || "Cross-functional review"}</div>
              </div>
              <div className="artifact-stat">
                <div className="artifact-stat-label">Current Asset</div>
                <div className="artifact-stat-value">{activeItem?.label || "None selected"}</div>
              </div>
              <div className="artifact-stat">
                <div className="artifact-stat-label">Visible In List</div>
                <div className="artifact-stat-value">{filteredItems.length}/{section.items.length}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="artifact-stage">
        <div className={`artifact-panel ${showSidebar ? "" : "artifact-panel-single"}`}>
          {showSidebar ? (
            <aside className="artifact-list">
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Filter assets..."
                className="artifact-filter-input"
              />
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => {
                  const isActive = item.url === activeItem?.url;
                  return (
                    <button
                      key={item.url}
                      type="button"
                      className={`artifact-item ${isActive ? "active" : ""}`}
                      onClick={() => setActiveUrl(item.url)}
                    >
                      <div className="artifact-item-label">{item.label}</div>
                      {item.type ? <div className="artifact-item-type">{item.type}</div> : null}
                      {item.summary ? <div className="artifact-item-summary">{item.summary}</div> : null}
                    </button>
                  );
                })
              ) : (
                <div className="artifact-empty-list">No assets match this filter.</div>
              )}
            </aside>
          ) : null}

          <div className="artifact-viewer-wrap">
            <div className="artifact-viewer-toolbar">
              <div className="artifact-toolbar-title-wrap">
                <div className="artifact-selected-title">{activeItem?.label || "No asset selected"}</div>
                <div className="artifact-selected-url">{activeItem?.url || "No URL selected"}</div>
                {activeAsset.note ? <div className="artifact-selected-url">{activeAsset.note}</div> : null}
              </div>
              <div className="artifact-toolbar-actions">
                {activeItem?.type ? (
                  <span
                    className="badge"
                    style={{ borderColor: `${tone.color}66`, color: tone.color, background: `${tone.color}10` }}
                  >
                    {tone.label}
                  </span>
                ) : null}
                {prevItem ? (
                  <button type="button" className="inline" onClick={() => setActiveUrl(prevItem.url)}>
                    Prev
                  </button>
                ) : null}
                {nextItem ? (
                  <button type="button" className="inline" onClick={() => setActiveUrl(nextItem.url)}>
                    Next
                  </button>
                ) : null}
                <button type="button" className="inline" onClick={copyActiveUrl}>
                  Copy Link
                </button>
                {activeItem?.url ? (
                  <a className="inline-link" href={activeItem.url} download={activeDownloadName}>
                    Download
                  </a>
                ) : null}
                {activeItem?.url ? (
                  <a className="inline-link" href={activeItem.url} target="_blank" rel="noreferrer">
                    Open Raw
                  </a>
                ) : null}
              </div>
            </div>

            {activeItem?.url ? (
              activeAsset.kind === "image" ? (
                <div className="artifact-image-viewer">
                  <img
                    src={activeItem.url}
                    alt={activeItem.label}
                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                  />
                </div>
              ) : activeAsset.kind === "text" ? (
                <div className="artifact-text-viewer" style={{ height: showSidebar ? "calc(100vh - 350px)" : "calc(100vh - 310px)" }}>
                  {textPreview.status === "loading" ? (
                    <div className="diagram-meta">Loading source...</div>
                  ) : textPreview.status === "error" ? (
                    <div className="diagram-meta">{textPreview.error}</div>
                  ) : (
                    <pre className="artifact-code-block">{textPreview.content}</pre>
                  )}
                </div>
              ) : activeAsset.kind === "download" ? (
                <div className="artifact-download-viewer" style={{ height: showSidebar ? "calc(100vh - 350px)" : "calc(100vh - 310px)" }}>
                  <div className="artifact-download-card">
                    <h3>Preview unavailable</h3>
                    <p>This file type cannot be rendered inline reliably. Use Open Raw or Download.</p>
                  </div>
                </div>
              ) : activeAsset.kind === "pdf" ? (
                <object
                  data={activeAsset.src}
                  type="application/pdf"
                  className="artifact-viewer"
                  style={{ height: showSidebar ? "calc(100vh - 350px)" : "calc(100vh - 310px)" }}
                >
                  <div className="diagram-meta">PDF preview failed. Use Open Raw to view in a new tab.</div>
                </object>
              ) : (
                <iframe
                  title={activeItem.label}
                  src={activeAsset.src}
                  className="artifact-viewer"
                  style={{ height: showSidebar ? "calc(100vh - 350px)" : "calc(100vh - 310px)" }}
                />
              )
            ) : (
              <div className="artifact-viewer" style={{ display: "grid", placeItems: "center" }}>
                <div className="diagram-meta">No asset selected.</div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="artifact-footnote">
        <div className="footer-note">{section.reviewHint || "Use this section to browse and open artifacts."}</div>
      </section>
    </main>
  );
}
