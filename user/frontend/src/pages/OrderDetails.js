import React from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  Screen,
  PrimaryButton,
} from "../components/common/UI";

import { useStore } from "../context/StoreContext";
import { money } from "../data";

import "../styles/OrderDetails.css";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { orders } = useStore();

  const order = orders.find(
    (item) => item.id === id
  );

  if (!order) {
    return (
      <Screen title="Order Details" back>
        <p>Order not found.</p>
      </Screen>
    );
  }

  return (
    <Screen title="Order Details" back>
      <div className="panel">
        <div className="row between">
          <h3 className="card-title">
            {order.id}
          </h3>

          <span
            className={`status ${order.status.toLowerCase()}`}
          >
            {order.status}
          </span>
        </div>

        <p className="muted small">
          {order.date}
        </p>
      </div>

      <div className="panel">
        <h3 className="card-title">
          Merchant
        </h3>

        <p>{order.shop}</p>

        <p className="muted small">
          Moi Avenue, Nairobi
        </p>
      </div>

      <div className="panel">
        <h3 className="card-title">
          Payment Summary
        </h3>

        <div className="summary-line">
          <span>Total paid / due</span>

          <b className="orange">
            {money(order.total)}
          </b>
        </div>

        <div className="summary-line">
          <span>Payment method</span>
          <b>M-Pesa</b>
        </div>
      </div>

      <div className="panel">
        <h3 className="card-title">
          Order updates
        </h3>

        <p className="muted small">
          Order placed → Merchant confirmation
          → Delivery
        </p>
      </div>

      <PrimaryButton
        onClick={() =>
          navigate(`/tracking/${order.id}`)
        }
      >
        Track Order
      </PrimaryButton>
    </Screen>
  );
}