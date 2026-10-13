import React from "react";
import { useParams } from "react-router-dom";

import { Screen } from "../components/common/UI";
import { useStore } from "../context/StoreContext";
import { money } from "../data";

import "../styles/TransactionDetails.css";

export default function TransactionDetails() {
  const { id } = useParams();
  const { orders } = useStore();

  const order = orders.find(
    (item) => item.id === id
  );

  const details = [
    ["Reference", order?.id || "—"],
    ["Merchant", order?.shop || "—"],
    ["Date", order?.date || "—"],
    ["Status", order?.status || "—"],
    [
      "Amount",
      order ? money(order.total) : "—",
    ],
  ];

  return (
    <Screen title="Transaction Details" back>
      <div className="transaction-receipt">
        <div className="receipt-symbol">
          ✓
        </div>

        <h2>
          {order
            ? money(order.total)
            : "Transaction"}
        </h2>

        <p className="muted">
          Transaction details
        </p>
      </div>

      <div className="panel">
        {details.map(([label, value]) => (
          <div
            className="summary-line"
            key={label}
          >
            <span className="muted">
              {label}
            </span>

            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </Screen>
  );
}