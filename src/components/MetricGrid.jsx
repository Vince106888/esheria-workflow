export default function MetricGrid({ items }) {
  return (
    <div className="grid cols-3">
      {items.map((item) => (
        <div key={item.label} className="card">
          <h3>{item.label}</h3>
          <div className="kv">
            <div className="kv-item">
              <div className="kv-label">Current</div>
              <div className="kv-value">{item.current}</div>
            </div>
            <div className="kv-item">
              <div className="kv-label">Target</div>
              <div className="kv-value">{item.target}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
