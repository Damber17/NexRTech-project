import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Check, ArrowLeft } from "lucide-react";

import { Screen, PrimaryButton } from "../components/common/UI";
import { useStore } from "../context/StoreContext";

import "../styles/TransactionDetails.css";

export default function TransactionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getOrder, currentOrder } = useStore();

  const order = getOrder(id) || currentOrder;

  if (!order) {
    return (
      <Screen title="Transaction Details" back>
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <p className="muted">Transaction not found.</p>
          <PrimaryButton onClick={() => navigate("/transactions")} style={{ marginTop: "16px" }}>
            Back to Transactions
          </PrimaryButton>
        </div>
      </Screen>
    );
  }

  const details = [
    ["Reference", order.public_id || "—"],
    ["Merchant", order.merchant?.business_name || order.shop || "—"],
    ["Date", order.date || "Recent"],
    ["Status", order.status_label || order.status || "Completed"],
    ["Payer", order.payer?.name || "Ngawang Pema"],
    ["Recipient", order.recipient?.name || "Amina Otieno"],
    ["Amount", `KSh ${order.total?.kes || order.total}`],
    ...(order.total?.aud ? [["Foreign Amount", `AUD ${order.total.aud}`]] : []),
  ];

  return (
    <Screen title="Transaction Details" back>
      <div className="transaction-receipt">
        <div className="receipt-symbol" style={{ background: "#e9f8ed", color: "#188b43", display: "grid", placeItems: "center" }}>
          <Check size={28} />
        </div>

        <h2 style={{ fontSize: "24px", margin: "8px 0" }}>
          KSh {order.total?.kes || order.total}
        </h2>

        <p className="muted small">
          Payment Successful · {order.date || "Today"}
        </p>
      </div>

      <div className="panel" style={{ marginTop: "16px" }}>
        {details.map(([label, value]) => (
          <div className="summary-line" key={label} style={{ padding: "6px 0" }}>
            <span className="muted">{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "16px" }}>
        <PrimaryButton onClick={() => navigate(`/orders/${order._id || order.id}`)}>
          View Order Details
        </PrimaryButton>

        <button
          className="text-action"
          onClick={() => navigate("/transactions")}
        >
          Back to Transactions
        </button>
      </div>
    </Screen>
  );
}