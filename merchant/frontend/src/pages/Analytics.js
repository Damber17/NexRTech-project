import { useMemo, useState } from "react";
import AnalyticsFilters from "../components/analytics/AnalyticsFilters";
import OrderChart from "../components/analytics/OrderChart";
import OrderStatusWidget from "../components/analytics/OrderStatusWidget";
import { DEFAULT_ANALYTICS } from "../data/mockData";
import "../styles/analytics.css";

function formatMoney(value) {
  return `KES ${Math.round(value || 0).toLocaleString()}`;
}

function getPeakSeriesItem(series) {
  if (!series.length) {
    return { label: "-", orders: 0 };
  }

  return series.reduce((peak, item) =>
    item.orders > peak.orders ? item : peak
  );
}

export default function AnalyticsPage() {
  const [activePeriod, setActivePeriod] = useState("month");
  const [selectedMonth, setSelectedMonth] = useState("2026-10");
  const [chartType, setChartType] = useState("bar");

  const currentData = useMemo(() => {
    if (activePeriod === "month") {
      return DEFAULT_ANALYTICS.months[selectedMonth];
    }

    return DEFAULT_ANALYTICS.periods[activePeriod];
  }, [activePeriod, selectedMonth]);

  const peak = useMemo(
    () => getPeakSeriesItem(currentData.orderSeries),
    [currentData.orderSeries]
  );

  const averageOrders = useMemo(() => {
    const total = currentData.orderSeries.reduce(
      (sum, item) => sum + item.orders,
      0
    );

    return Math.round(total / Math.max(1, currentData.orderSeries.length));
  }, [currentData.orderSeries]);

  const cards = [
    {
      label: "Total orders",
      value: currentData.cards.totalOrders.toLocaleString(),
      note: currentData.label,
    },
    {
      label: "Revenue",
      value: formatMoney(currentData.cards.revenue),
      note: `${currentData.cards.revenueChangePercent >= 0 ? "+" : ""}${currentData.cards.revenueChangePercent.toFixed(1)}% vs previous period`,
    },
    {
      label: "Average order value",
      value: formatMoney(currentData.cards.averageOrderValue),
      note: currentData.label,
    },
    {
      label: "Fulfilled orders",
      value: currentData.cards.fulfilledOrders.toLocaleString(),
      note: `${currentData.cards.fulfillmentRate.toFixed(1)}% fulfilment rate`,
    },
  ];

  return (
    <div className="content-page analytics-page">
      <div className="page-heading">
        <div>
          <h1>Analytics</h1>
          <p>Track store performance, order activity and best-selling items.</p>
        </div>

        <button
          className="outline-btn"
          type="button"
          onClick={() => window.print()}
        >
          Export report
        </button>
      </div>

      <AnalyticsFilters
        activePeriod={activePeriod}
        onPeriodChange={setActivePeriod}
        months={DEFAULT_ANALYTICS.monthOptions}
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
      />

      <div className="stats-grid">
        {cards.map((card) => (
          <div className="stat-card" key={card.label}>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
            <small>{card.note}</small>
          </div>
        ))}
      </div>

      <div className="analytics-grid analytics-main-grid">
        <section className="panel total-orders-panel">
          <div className="panel-head total-orders-head">
            <div>
              <h3>Total orders</h3>
              <p>{currentData.label}</p>
            </div>

            <OrderChart
              chartType={chartType}
              onChartTypeChange={setChartType}
              series={currentData.orderSeries}
              controlsOnly
            />
          </div>

          <div className="order-detail-strip">
            <div>
              <span>Selected period</span>
              <strong>{currentData.label}</strong>
            </div>
            <div>
              <span>Total orders</span>
              <strong>{currentData.cards.totalOrders.toLocaleString()}</strong>
            </div>
            <div>
              <span>Average per point</span>
              <strong>{averageOrders}</strong>
            </div>
            <div>
              <span>Peak</span>
              <strong>{peak.label}</strong>
              <small>{peak.orders} orders</small>
            </div>
          </div>

          <div className="orders-chart-container">
            <OrderChart
              chartType={chartType}
              onChartTypeChange={setChartType}
              series={currentData.orderSeries}
              hideControls
            />
          </div>
        </section>

        <section className="panel status-panel">
          <div className="panel-head">
            <div>
              <h3>Order status</h3>
              <p>{currentData.label}</p>
            </div>
          </div>

          <OrderStatusWidget items={currentData.orderStatus} />
        </section>
      </div>

      <section className="panel top-products">
        <div className="panel-head">
          <div>
            <h3>Top-selling products</h3>
            <p>Units sold, revenue and current stock for {currentData.label.toLowerCase()}</p>
          </div>
        </div>

        <div className="top-products-table">
          <div className="top-products-row top-products-header">
            <span>Product</span>
            <span>In stock</span>
            <span>Units sold</span>
            <span>Revenue</span>
          </div>

          {currentData.topProducts.map((product) => (
            <div className="top-products-row" key={product.productId}>
              <div className="top-product-info">
                <img src={product.image} alt="" />
                <div>
                  <b>{product.name}</b>
                  <small>{product.category}</small>
                </div>
              </div>

              <div>
                <span
                  className={`stock-badge ${
                    product.inStock <= 20 ? "low-stock" : ""
                  }`}
                >
                  {product.inStock} in stock
                </span>
              </div>

              <strong>{product.qty.toLocaleString()}</strong>
              <strong>{formatMoney(product.revenue)}</strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
