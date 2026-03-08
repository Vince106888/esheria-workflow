import { useEffect, useRef, useState } from "react";

export function Reveal({ children, delay = 0, y = 14, threshold = 0.12 }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function SectionEyebrow({ text, color = "#586070", prefix = null }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "10px",
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.14em",
        color,
        marginBottom: "20px",
        fontFamily: "'JetBrains Mono', 'DM Mono', monospace",
      }}
    >
      {prefix ? <span style={{ color: "var(--tone-border)" }}>{prefix}</span> : <div style={{ width: "24px", height: "1px", background: color }} />}
      {text}
    </div>
  );
}

export function SectionHead({ label, count, color = "#586070", action }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "10px",
        marginBottom: "16px",
        paddingBottom: "12px",
        borderBottom: `1px solid ${color}25`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: color,
            boxShadow: `0 0 8px ${color}80`,
          }}
        />
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px",
            fontWeight: 700,
            color,
            letterSpacing: "0.1em",
          }}
        >
          {label.toUpperCase()}
        </span>
        {count != null ? (
          <span
            style={{
              padding: "1px 8px",
              borderRadius: "100px",
              background: `${color}12`,
              border: `1px solid ${color}25`,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              color,
            }}
          >
            {count}
          </span>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function Chip({ text, color = "#586070", mono = false }) {
  return (
    <div
      style={{
        display: "inline-flex",
        padding: "3px 10px",
        borderRadius: "999px",
        background: `${color}10`,
        border: `1px solid ${color}22`,
        fontSize: mono ? "10px" : "11px",
        color: mono ? color : `${color}CC`,
        fontFamily: mono ? "'JetBrains Mono', monospace" : "inherit",
        lineHeight: 1.5,
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </div>
  );
}

export function EmptyState({ label }) {
  return (
    <div
      style={{
        padding: "48px",
        textAlign: "center",
        border: "1px dashed var(--tone-border)",
        borderRadius: "8px",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "12px",
        color: "var(--tone-dim)",
      }}
    >
      // {label} - no data loaded
    </div>
  );
}
