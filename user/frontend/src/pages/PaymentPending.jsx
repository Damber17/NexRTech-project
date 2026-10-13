import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Screen,
  PrimaryButton,
} from "../components/common/UI";

import "../styles/PaymentPending.css";

export default function PaymentPending() {
  const navigate = useNavigate();

  return (
    <Screen title="Payment Status">
      <div className="payment-result">
        <div className="result-symbol pending">
          ◉
        </div>

        <h2>Payment in Progress</h2>

        <p className="orange">
          Waiting for confirmation
        </p>

        <p>
          We are processing your payment.
          Please confirm the request on your phone.
        </p>

        <div className="panel">
          Payment request sent to your selected
          payment method.
        </div>

        <PrimaryButton
          onClick={() =>
            navigate("/payment/success")
          }
        >
          Simulate Successful Payment
        </PrimaryButton>

        <button
          className="text-action"
          onClick={() =>
            navigate("/payment/failed")
          }
        >
          Simulate Failed Payment
        </button>
      </div>
    </Screen>
  );
}