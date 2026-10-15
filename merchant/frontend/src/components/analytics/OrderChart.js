import { BarChart3, LineChart, PieChart } from "lucide-react";

function BarOrderChart({ series }) {
  const maxValue = Math.max(1, ...series.map((item) => item.orders));

  return (
    <div className="orders-bar-chart" aria-label="Total orders bar chart">
      {series.map((item) => {
        const height = Math.max(8, (item.orders / maxValue) * 170);

        return (
          <div className="order-bar-column" key={item.label}>
            <span className="order-bar-value">{item.orders}</span>
            <div className="order-bar-track">
              <div className="order-bar-fill" style={{ height: `${height}px` }} />
            </div>
            <span className="order-axis-label">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function LineOrderChart({ series }) {
  const width = 760;
  const height = 220;
  const paddingX = 34;
  const paddingY = 28;
  const maxValue = Math.max(1, ...series.map((item) => item.orders));
  const usableWidth = width - paddingX * 2;
  const usableHeight = height - paddingY * 2;

  const points = series.map((item, index) => {
    const x =
      series.length === 1
        ? width / 2
        : paddingX + (index / (series.length - 1)) * usableWidth;
    const y = height - paddingY - (item.orders / maxValue) * usableHeight;

    return { ...item, x, y };
  });

  const polylinePoints = points.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <div className="orders-line-chart">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Total orders line chart"
      >
        {[0.25, 0.5, 0.75, 1].map((fraction) => {
          const y = height - paddingY - usableHeight * fraction;
          return (
            <line
              key={fraction}
              x1={paddingX}
              y1={y}
              x2={width - paddingX}
              y2={y}
              className="line-grid"
            />
          );
        })}

        <polyline points={polylinePoints} className="line-series" />

        {points.map((point) => (
          <g key={point.label}>
            <circle cx={point.x} cy={point.y} r="5" className="line-point" />
            <text x={point.x} y={point.y - 12} className="line-value">
              {point.orders}
            </text>
            <text x={point.x} y={height - 5} className="line-label">
              {point.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function PieOrderChart({ series }) {
  const total = series.reduce((sum, item) => sum + item.orders, 0) || 1;
  const palette = ["#087a4c", "#34a56f", "#83c5a2", "#c9e7d7", "#f0b45b", "#c78a32"];

  let runningPercent = 0;
  const stops = series.map((item, index) => {
    const start = runningPercent;
    const size = (item.orders / total) * 100;
    runningPercent += size;
    return `${palette[index % palette.length]} ${start}% ${runningPercent}%`;
  });

  return (
    <div className="orders-pie-layout">
      <div
        className="orders-pie"
        style={{ background: `conic-gradient(${stops.join(", ")})` }}
        role="img"
        aria-label="Total orders pie chart"
      >
        <div className="orders-pie-center">
          <strong>{total.toLocaleString()}</strong>
          <span>Total orders</span>
        </div>
      </div>

      <div className="orders-pie-legend">
        {series.map((item, index) => {
          const percentage = ((item.orders / total) * 100).toFixed(1);

          return (
            <div key={item.label}>
              <i style={{ background: palette[index % palette.length] }} />
              <span>{item.label}</span>
              <b>{item.orders}</b>
              <small>{percentage}%</small>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function OrderChart({
  chartType,
  onChartTypeChange,
  series,
  controlsOnly = false,
  hideControls = false,
}) {
  const controls = (
    <div className="chart-type-tabs" aria-label="Order chart type">
        <button
          type="button"
          className={chartType === "bar" ? "active" : ""}
          onClick={() => onChartTypeChange("bar")}
        >
          <BarChart3 size={14} />
          Bar
        </button>

        <button
          type="button"
          className={chartType === "pie" ? "active" : ""}
          onClick={() => onChartTypeChange("pie")}
        >
          <PieChart size={14} />
          Pie
        </button>

        <button
          type="button"
          className={chartType === "line" ? "active" : ""}
          onClick={() => onChartTypeChange("line")}
        >
          <LineChart size={14} />
          Line
        </button>
    </div>
  );

  if (controlsOnly) {
    return controls;
  }

  return (
    <>
      {!hideControls && controls}
      <div className="orders-chart-stage">
        {chartType === "bar" && <BarOrderChart series={series} />}
        {chartType === "pie" && <PieOrderChart series={series} />}
        {chartType === "line" && <LineOrderChart series={series} />}
      </div>
    </>
  );
}
