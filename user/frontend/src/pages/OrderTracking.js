import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  MapPin, 
  Store, 
  User, 
  Bike, 
  Clock, 
  Phone, 
  CheckCircle2, 
  ArrowLeft 
} from "lucide-react";

import {
  Screen,
  PrimaryButton
} from "../components/common/UI";
import { useStore } from "../context/StoreContext";

import "../styles/OrderTracking.css";

export default function OrderTracking() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getOrder, currentOrder } = useStore();

  const order = getOrder(id) || currentOrder;

  const steps = [
    { title: "Order placed", desc: "Order registered and confirmed by payer" },
    { title: "Merchant confirmed", desc: "Merchant accepted order & verified inventory" },
    { title: "Preparing order", desc: "Items gathered and packaged at store" },
    { title: "Out for delivery", desc: "Courier on route to destination" },
    { title: "Delivered", desc: "Goods received and signed for" }
  ];

  if (!order) {
    return (
      <Screen title="Track Order" back>
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <p className="muted">Order not found.</p>
          <PrimaryButton onClick={() => navigate("/orders")} style={{ marginTop: "16px" }}>
            Back to Orders
          </PrimaryButton>
        </div>
      </Screen>
    );
  }

  // Determine completed steps based on status
  let currentStepIndex = 2; // Default to 'Preparing order'
  if (order.status === "received") currentStepIndex = 5;
  else if (order.status === "ready") currentStepIndex = 3;
  else if (order.status === "preparing") currentStepIndex = 2;
  else if (order.status === "paid") currentStepIndex = 1;
  else if (order.status === "cancelled") currentStepIndex = 0;

  return (
    <Screen title="Track Order" back>
      {/* Visual Live Route Map */}
      <div className="tracking-map-container">
        <div className="map-grid-bg" />

        <div className="map-eta-badge">
          <Clock size={15} color="#188b43" />
          <span>
            {order.status === "received" 
              ? "Delivered successfully" 
              : `ETA: ${order.fulfillment?.estimated_ready_at || "35 mins"}`}
          </span>
        </div>

        {/* SVG Route Line */}
        <svg className="map-route-svg" viewBox="0 0 400 220" preserveAspectRatio="none">
          <path
            d="M 60 140 Q 150 70 230 110 T 340 70"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="5"
            strokeDasharray="6 6"
          />
          <path
            d="M 60 140 Q 150 70 230 110"
            fill="none"
            stroke="#188b43"
            strokeWidth="5"
          />
        </svg>

        {/* Merchant Store Pin */}
        <div className="map-marker" style={{ left: "15%", top: "65%" }}>
          <div className="map-pin merchant" title="Merchant Store">
            <Store size={16} />
          </div>
          <span className="map-label">
            {order.merchant?.business_name || order.shop || "Store"}
          </span>
        </div>

        {/* Live Courier Marker */}
        {order.status !== "received" && (
          <div className="map-marker" style={{ left: "55%", top: "50%" }}>
            <div className="map-pin courier" title="Courier on route">
              <Bike size={17} />
            </div>
            <span className="map-label" style={{ color: "#e48700" }}>
              {order.fulfillment?.driver_name || "Courier"}
            </span>
          </div>
        )}

        {/* Recipient Destination Pin */}
        <div className="map-marker" style={{ left: "85%", top: "35%" }}>
          <div className="map-pin recipient" title="Customer Destination">
            <User size={16} />
          </div>
          <span className="map-label">
            {order.recipient?.name || "Recipient"}
          </span>
        </div>
      </div>

      {/* Order Info Panel */}
      <div className="panel">
        <div className="row between">
          <div>
            <strong style={{ fontSize: "16px" }}>{order.public_id}</strong>
            <p className="muted small" style={{ marginTop: "2px" }}>
              {order.merchant?.business_name || order.shop}
            </p>
          </div>
          <span className={`status ${order.status}`}>
            {order.status_label || order.status}
          </span>
        </div>

        {order.fulfillment?.collection_code && (
          <div 
            style={{ 
              marginTop: "12px", 
              padding: "10px 14px", 
              background: "#fffaf2", 
              border: "1px solid #ffd899", 
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <span className="muted small">Collection Code:</span>
            <strong style={{ fontSize: "16px", letterSpacing: "2px", color: "#e48700" }}>
              {order.fulfillment.collection_code}
            </strong>
          </div>
        )}
      </div>

      {/* 5-Step Order Progress Stepper */}
      <div className="panel">
        <h3 className="card-title">Order Progress</h3>

        <div style={{ padding: "4px 0" }}>
          {steps.map((step, index) => {
            const isDone = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const stateClass = isDone ? "done" : isCurrent ? "current" : "upcoming";

            return (
              <div key={step.title} className={`tracking-step ${stateClass}`}>
                <span className="tracking-dot">
                  {isDone ? (
                    <CheckCircle2 size={18} color="white" />
                  ) : (
                    index + 1
                  )}
                </span>

                <div className="tracking-step-content">
                  <strong>{step.title}</strong>
                  <p>{isDone ? "Completed" : isCurrent ? "In progress now" : step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact & Navigation Buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "12px" }}>
        <button
          className="panel"
          onClick={() => navigate(`/orders/${order._id || order.id}`)}
          style={{ 
            width: "100%", 
            textAlign: "center", 
            fontWeight: 600, 
            padding: "12px", 
            margin: 0,
            cursor: "pointer",
            border: "1.5px solid #e0e0e0"
          }}
        >
          View Full Order Receipt
        </button>

        <PrimaryButton onClick={() => navigate("/orders")}>
          Back to Orders
        </PrimaryButton>
      </div>
    </Screen>
  );
}