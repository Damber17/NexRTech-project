import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

import {
  Screen,
  PrimaryButton,
} from "../components/common/UI";
import { useStore } from "../context/StoreContext";

import "../styles/PaymentSuccess.css";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { getOrder, currentOrder } = useStore();

  const orderId = searchParams.get("orderId");
  const order = getOrder(orderId) || currentOrder;

  return (
    <Screen title="Payment Status">
      <div className="payment-result success-result">
        <CheckCircle2
          size={74}
          color="#188b43"
          style={{ marginBottom: "16px" }}
        />

        <h2>Payment Successful!</h2>

        <p style={{ maxWidth: "320px", margin: "0 auto 20px" }}>
          Your order has been sent to {order?.merchant?.business_name || order?.shop || "the merchant"}. {order?.recipient?.name || "The recipient"} will be notified on WhatsApp with collection instructions.
        </p>

        {order && (
          <div className="panel" style={{ width: "100%", textAlign: "left", marginBottom: "20px" }}>
            <div className="summary-line">
              <span>Order Reference</span>
              <b>{order.public_id}</b>
            </div>

            <div className="summary-line">
              <span>Merchant</span>
              <b>{order.merchant?.business_name || order.shop}</b>
            </div>

            <div className="summary-line">
              <span>Total Paid</span>
              <b className="orange" style={{ fontSize: "16px" }}>
                KSh {order.total?.kes || order.total}
                {order.total?.aud && (
                  <span className="aud-price" style={{ fontSize: "12px", marginLeft: "4px" }}>
                    ≈ AUD {order.total.aud}
                  </span>
                )}
              </b>
            </div>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
          <PrimaryButton
            onClick={() => navigate(`/tracking/${order?._id || order?.id || "1"}`)}
          >
            Track Order Live
          </PrimaryButton>

          <button
            className="panel"
            onClick={() => navigate(`/orders/${order?._id || order?.id || "1"}`)}
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
            View Order Receipt
          </button>

          <button
            className="text-action"
            onClick={() => navigate("/home")}
            style={{ marginTop: "4px" }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </Screen>
  );
}