const PERIODS = [
  { key: "day", label: "Day" },
  { key: "week", label: "Week" },
  { key: "month", label: "Month" },
  { key: "year", label: "Year" },
];

export default function AnalyticsFilters({
  activePeriod,
  onPeriodChange,
  months,
  selectedMonth,
  onMonthChange,
}) {
  return (
    <div className="analytics-filter-row">
      <div className="period-tabs" role="tablist" aria-label="Analytics period">
        {PERIODS.map((period) => (
          <button
            key={period.key}
            type="button"
            className={activePeriod === period.key ? "active" : ""}
            onClick={() => onPeriodChange(period.key)}
          >
            {period.label}
          </button>
        ))}
      </div>

      {activePeriod === "month" && (
        <label className="month-range-select">
          <span>Month</span>
          <select
            value={selectedMonth}
            onChange={(event) => onMonthChange(event.target.value)}
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </label>
      )}
    </div>
  );
}
