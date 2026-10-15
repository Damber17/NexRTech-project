export default function OrderStatusWidget({ items }) {
  const total = items.reduce((sum, item) => sum + item.count, 0) || 1;
  const palette = ["#087a4c", "#4ba77b", "#e0a13c", "#91a09a", "#d86a6a"];

  let runningPercent = 0;
  const stops = items.map((item, index) => {
    const start = runningPercent;
    const value = (item.count / total) * 100;
    runningPercent += value;
    return `${palette[index % palette.length]} ${start}% ${runningPercent}%`;
  });

  return (
    <div className="status-analytics-widget">
      <div
        className="status-donut"
        style={{ background: `conic-gradient(${stops.join(", ")})` }}
      >
        <div>
          <strong>{total.toLocaleString()}</strong>
          <span>Orders</span>
        </div>
      </div>

      <div className="status-metrics">
        {items.map((item, index) => {
          const percentage = (item.count / total) * 100;

          return (
            <div className="status-metric" key={item.status}>
              <div className="status-metric-head">
                <span>
                  <i style={{ background: palette[index % palette.length] }} />
                  {item.status.replaceAll("_", " ")}
                </span>
                <b>{item.count.toLocaleString()}</b>
              </div>

              <div className="status-progress">
                <div
                  className="status-progress-fill"
                  style={{
                    width: `${percentage}%`,
                    background: palette[index % palette.length],
                  }}
                />
              </div>

              <small>{percentage.toFixed(1)}% of orders</small>
            </div>
          );
        })}
      </div>
    </div>
  );
}
