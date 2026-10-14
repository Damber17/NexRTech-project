import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Screen,
  EmptyState,
} from "../components/common/UI";

import { useStore } from "../context/StoreContext";
import { money } from "../data";

import "../styles/Orders.css";

export default function Orders() {
  const navigate = useNavigate();

  const { orders } = useStore();
  const [filter, setFilter] = useState("All");

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter(
          (order) => order.status === filter
        );

  return (
    <Screen title="My Orders">
      <div className="order-filters">
        {[
          "All",
          "Processing",
          "Delivered",
          "Cancelled",
        ].map((item) => (
          <button
            key={item}
            className={
              filter === item ? "active" : ""
            }
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {filteredOrders.length > 0 ? (
        <div className="orders-list">
          {filteredOrders.map((order) => (
            <button
              key={order.id}
              className="panel order-card"
              onClick={() =>
                navigate(`/orders/${order.id}`)
              }
            >
              <div className="row between">
                <strong>{order.id}</strong>

                <span
                  className={`status ${order.status.toLowerCase()}`}
                >
                  {order.status}
                </span>
              </div>

              <p>{order.shop}</p>

              <div className="row between muted small">
                <span>{order.date}</span>

                <b className="orange">
                  {money(order.total)}
                </b>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <EmptyState
          icon="📦"
          title="No orders found"
          description="Your orders will appear here."
          action="Browse Shops"
          onAction={() => navigate("/home")}
        />
      )}
    </Screen>
  );
}