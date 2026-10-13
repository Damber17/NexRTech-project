import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

import {
  Screen,
  PrimaryButton,
} from "../components/common/UI";

import { useStore } from "../context/StoreContext";
import { money } from "../data";

import "../styles/PaymentSuccess.css";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const { lastOrder } = useStore();

  return (
    <Screen title="Payment Status">
      <div className="payment-result success-result">
        <CheckCircle2
          size={74}
          color="#188b43"
        />

        <h2>Payment Successful!</h2>

        <p>
          Your order has been placed successfully.
        </p>

        <div className="panel">
          <div className="summary-line">
            <span>Order</span>
            <b>{lastOrder?.id || "—"}</b>
          </div>

          <div className="summary-line">
            <span>Amount</span>

            <b>
              {lastOrder
                ? money(lastOrder.total)
                : "—"}
            </b>
          </div>
        </div>

        <PrimaryButton
          onClick={() => navigate("/orders")}
        >
          View My Orders
        </PrimaryButton>

        <button
          className="text-action"
          onClick={() => navigate("/home")}
        >
          Back to Home
        </button>
      </div>
    </Screen>
  );
}