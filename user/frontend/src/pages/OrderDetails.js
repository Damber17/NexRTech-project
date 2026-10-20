import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, CheckCircle2 } from "lucide-react";

import {
  Screen,
  PrimaryButton,
} from "../components/common/UI";
import { useStore } from "../context/StoreContext";

import "../styles/OrderDetails.css";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getOrder, currentOrder, markOrderReceived } = useStore();

  const order = getOrder(id) || currentOrder;

  if (!order) {
    return (
      <Screen title="Order Details" back>
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <p className="muted">Order not found.</p>
          <PrimaryButton onClick={() => navigate("/orders")} style={{ marginTop: "16px" }}>
            Back to Orders
          </PrimaryButton>
        </div>
      </Screen>
    );
  }

  const handleMarkReceived = () => {
    markOrderReceived(order._id || order.id);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    if (dateString.includes("Today") || dateString.includes("Yesterday")) {
      return dateString;
    }
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleString("en-US", { 
      month: "short", 
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
  };

  const canMarkReceived = order.status === "preparing" || order.status === "ready";

  return (
    <Screen title="Order Details" back>
      <div className="panel">
        <div className="row between">
          <h3 className="card-title">
            {order.public_id}
          </h3>

          <span className={`status ${order.status}`}>
            {order.status_label || order.status}
          </span>
        </div>

        <p className="muted small" style={{ marginTop: "4px" }}>
          Placed: {formatDate(order.created_at || order.date)}
        </p>
      </div>

      <div className="panel">
        <h3 className="card-title">Merchant</h3>
        <strong style={{ fontSize: "15px" }}>{order.merchant?.business_name || order.shop}</strong>
        <p className="muted small row" style={{ marginTop: "6px" }}>
          <MapPin size={14} color="#e48700" />
          <span>{order.merchant?.address || "Nairobi, Kenya"}</span>
        </p>
        <p className="muted small" style={{ marginBottom: 0 }}>
          Pick up your order from this merchant when it is ready.
        </p>
      </div>

      {order.recipient && (
        <div className="panel">
          <h3 className="card-title">Recipient</h3>
          <strong style={{ fontSize: "15px" }}>{order.recipient.name}</strong>
          <p className="muted small" style={{ marginBottom: 0 }}>
            WhatsApp: {order.recipient.whatsapp_number}
          </p>
        </div>
      )}

      <div className="panel">
        <h3 className="card-title">Items</h3>

        {(order.items || []).map((item, idx) => (
          <div className="summary-line" key={item.product_id || idx}>
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>KSh {item.line_total?.kes || item.line_total}</span>
          </div>
        ))}

        <div className="divider" />

        <div className="summary-line">
          <span>Subtotal</span>
          <span>KSh {order.subtotal?.kes || order.subtotal || "0.00"}</span>
        </div>

        <div className="summary-line">
          <span>Service charge</span>
          <span>KSh {order.service_charge?.kes || order.service_charge || "0.00"}</span>
        </div>

        <div className="divider" />

        <div className="summary-line">
          <strong>Total</strong>
          <strong className="orange" style={{ fontSize: "17px" }}>
            KSh {order.total?.kes || order.total}
            {order.total?.aud && (
              <span className="aud-price" style={{ fontSize: "13px", marginLeft: "6px" }}>
                ≈ AUD {order.total.aud}
              </span>
            )}
          </strong>
        </div>
      </div>

      <div className="panel">
        <h3 className="card-title">Order Timeline</h3>

        <div className="timeline">
          {(order.timeline || []).map((step) => (
            <div key={step.key} className={`timeline-step ${step.state}`}>
              <div className="timeline-marker">
                {step.state === "done" && <CheckCircle2 size={18} color="#188b43" />}
                {step.state === "current" && <div className="pulse" />}
                {step.state === "upcoming" && <div className="circle" />}
              </div>
              <div className="timeline-content">
                <strong>{step.label}</strong>
                {step.at && <p className="muted small">{formatDate(step.at)}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {order.collection_code && (
        <div className="panel">
          <h3 className="card-title">Collection Code</h3>
          <p className="muted small" style={{ marginBottom: "10px" }}>
            Present this code to the merchant upon collection:
          </p>
          <div className="collection-code">
            {order.collection_code}
          </div>
        </div>
      )}

      {canMarkReceived && (
        <div style={{ marginTop: "12px" }}>
          <button
            className="primary-btn"
            onClick={handleMarkReceived}
            style={{ background: "#188b43" }}
          >
            Mark as Collected ✓
          </button>
        </div>
      )}
    </Screen>
  );
}