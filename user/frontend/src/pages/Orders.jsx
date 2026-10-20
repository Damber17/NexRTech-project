import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Screen,
  EmptyState,
} from "../components/common/UI";
import { useStore } from "../context/StoreContext";

import "../styles/Orders.css";

export default function Orders() {
  const navigate = useNavigate();
  const { orders } = useStore();
  const [filter, setFilter] = useState("All");

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((order) => {
          if (filter === "pending" || filter === "payment_requested") {
            return order.status === "payment_requested" || order.status === "pending";
          }
          return order.status === filter;
        });

  const formatDate = (dateString) => {
    if (!dateString) return "Today";
    if (dateString.includes("Today") || dateString.includes("Yesterday")) {
      return dateString;
    }
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const now = new Date();
    const diffDays = Math.floor(Math.abs(now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <Screen title="My Orders">
      <div className="row between" style={{ marginBottom: "16px" }}>
        <h3 className="card-title" style={{ margin: 0 }}>
          Active & Past Orders
        </h3>
        <span className="muted small" style={{ fontWeight: 600 }}>
          {orders.length} Total
        </span>
      </div>

      <div className="order-filters">
        {[
          { key: "All", label: "All" },
          { key: "preparing", label: "Preparing" },
          { key: "ready", label: "Ready" },
          { key: "payment_requested", label: "Pending" },
          { key: "received", label: "Collected" },
          { key: "cancelled", label: "Cancelled" },
        ].map((item) => (
          <button
            key={item.key}
            className={filter === item.key ? "active" : ""}
            onClick={() => setFilter(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {filteredOrders.length > 0 ? (
        <div className="orders-list">
          {filteredOrders.map((order) => {
            const orderKey = order._id || order.id;

            return (
              <div
                key={orderKey}
                className="panel order-card"
                style={{ cursor: "pointer", position: "relative" }}
                onClick={() => navigate(`/orders/${orderKey}`)}
              >
                <div className="row between">
                  <strong>{order.public_id}</strong>

                  <span className={`status ${order.status}`}>
                    {order.status_label || order.status}
                  </span>
                </div>

                <p style={{ margin: "8px 0" }}>
                  {order.merchant?.business_name || order.shop}
                </p>

                <div className="row between muted small">
                  <span>{formatDate(order.created_at || order.date)}</span>

                  <b className="orange" style={{ fontSize: "15px" }}>
                    KSh {order.total?.kes || order.total}
                  </b>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon="📦"
          title="No orders found"
          description="Your orders in this filter category will appear here."
          action="Browse Merchants"
          onAction={() => navigate("/home")}
        />
      )}
    </Screen>
  );
}