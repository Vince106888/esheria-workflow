import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "../theme/ThemeProvider";

const sourceLoaders = import.meta.glob("../../diagrams/mermaid/*.mmd", {
  query: "?raw",
  import: "default",
});

let mermaidImportPromise = null;

async function getMermaid() {
  if (!mermaidImportPromise) {
    mermaidImportPromise = import("mermaid").then((mod) => mod.default);
  }
  return mermaidImportPromise;
}

function resolveLoader(file) {
  return sourceLoaders[`../../${file}`] || null;
}

export default function DiagramPanel({ title, file, purpose }) {
  const { isDark } = useTheme();
  const [source, setSource] = useState("");
  const [error, setError] = useState("");
  const [showSource, setShowSource] = useState(false);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  const diagramId = useMemo(
    () => `diagram-${file.replace(/[^a-z0-9]/gi, "-")}-${Math.random().toString(36).slice(2, 8)}`,
    [file]
  );

  useEffect(() => {
    let active = true;
    const loader = resolveLoader(file);

    if (!loader) {
      setLoading(false);
      setError(`Diagram source not found: ${file}`);
      return undefined;
    }

    loader()
      .then((raw) => {
        if (!active) return;
        setSource(raw);
        setLoading(false);
      })
      .catch((e) => {
        if (!active) return;
        setLoading(false);
        setError(e?.message || "Failed to load diagram source");
      });

    return () => {
      active = false;
    };
  }, [file]);

  useEffect(() => {
    if (!source || !containerRef.current) return;

    let cancelled = false;
    const mermaidTheme = isDark ? "dark" : "default";

    getMermaid()
      .then((mermaid) => {
        mermaid.initialize({
          startOnLoad: false,
          theme: mermaidTheme,
          securityLevel: "loose",
          fontFamily: "IBM Plex Sans, Segoe UI, sans-serif",
          flowchart: { useMaxWidth: true, htmlLabels: true },
        });
        return mermaid.render(diagramId, source);
      })
      .then(({ svg }) => {
        if (cancelled || !containerRef.current) return;
        containerRef.current.innerHTML = svg;
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e?.message || "Failed to render Mermaid diagram");
        setShowSource(true);
      });

    return () => {
      cancelled = true;
    };
  }, [diagramId, isDark, source]);

  return (
    <section className="diagram-panel">
      <div className="diagram-head">
        <div>
          <h4>{title}</h4>
          {purpose ? <div className="diagram-meta">{purpose}</div> : null}
        </div>
        <button className="inline" onClick={() => setShowSource((v) => !v)}>
          {showSource ? "Hide Source" : "Show Source"}
        </button>
      </div>

      <div className="diagram-body">
        {loading ? <div className="diagram-meta">Loading diagram...</div> : null}
        {!loading && error ? <div className="diagram-meta">{error}</div> : null}
        {!loading && !error ? <div className="diagram-svg" ref={containerRef} /> : null}
        {showSource && source ? <pre className="diagram-source">{source}</pre> : null}
      </div>
    </section>
  );
}

