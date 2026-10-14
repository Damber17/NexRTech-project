import React from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  Screen,
  PrimaryButton
} from "../components/common/UI";

import { useStore } from "../context/StoreContext";

import "../styles/OrderTracking.css";

export default function OrderTracking() {

  const navigate = useNavigate();

  const { id } = useParams();

  const { orders } = useStore();

  const order = orders.find(
    (item) => item.id === id
  );

  const steps = [
    "Order placed",
    "Merchant confirmed",
    "Preparing order",
    "Out for delivery",
    "Delivered"
  ];

  if (!order) {
    return (
      <Screen title="Track Order" back>
        <p>Order not found.</p>

        <PrimaryButton
          onClick={() => navigate("/orders")}
        >
          Back to Orders
        </PrimaryButton>
      </Screen>
    );
  }

  const completedSteps =
    order.status === "Delivered"
      ? 5
      : order.status === "Processing"
      ? 2
      : 1;

  return (
    <Screen title="Track Order" back>

      <div className="panel">

        <strong>{order.id}</strong>

        <p className="muted small">
          {order.shop}
        </p>

        <span className="tag">
          {order.status}
        </span>

      </div>

      <div className="panel">

        <h3 className="card-title">
          Order Progress
        </h3>

        {steps.map((step, index) => (

          <div
            key={step}
            className={`tracking-step ${
              index < completedSteps ? "done" : ""
            }`}
          >

            <span className="tracking-dot">
              {index < completedSteps
                ? "✓"
                : index + 1}
            </span>

            <div>

              <strong>{step}</strong>

              <p>
                {index < completedSteps
                  ? "Completed"
                  : "Awaiting update"}
              </p>

            </div>

          </div>

        ))}

      </div>

      <PrimaryButton
        onClick={() => navigate("/orders")}
      >
        Back to Orders
      </PrimaryButton>

    </Screen>
  );
}