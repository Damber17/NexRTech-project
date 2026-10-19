import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Clock, Send, CheckCircle2, XCircle } from "lucide-react";

import {
  Screen,
  PrimaryButton,
} from "../components/common/UI";
import { useStore } from "../context/StoreContext";

import "../styles/PaymentPending.css";

export default function PaymentPending() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { getOrder, currentOrder } = useStore();

  const orderId = searchParams.get("orderId");
  const mode = searchParams.get("mode");
  const order = getOrder(orderId) || currentOrder;

  const isLinkMode = mode === "link" || order?.status === "payment_requested";

  return (
    <Screen title="Payment Status">
      <div className="payment-result">
        <div className="result-symbol pending" style={{ background: isLinkMode ? "#e8f0ff" : "#fff3db", color: isLinkMode ? "#2563eb" : "#e48700" }}>
          {isLinkMode ? <Send size={36} color="#2563eb" /> : <Clock size={36} color="#e48700" />}
        </div>

        <h2>{isLinkMode ? "Payment Link Sent" : "Processing Payment"}</h2>

        <p style={{ maxWidth: "320px", margin: "0 auto 20px" }}>
          {isLinkMode
            ? `We sent a secure WhatsApp payment link to ${order?.payer?.whatsapp_number_masked || "the payer"}. Once paid, the merchant will be notified immediately.`
            : "We are waiting for payment confirmation from the payment provider. We'll notify you on WhatsApp once confirmed."}
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
              <span>Total</span>
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

        {/* Prototype Navigation / Simulator Shortcuts */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
          <PrimaryButton onClick={() => navigate(`/payment/success?orderId=${order?._id || "1"}`)}>
            Simulate Payment Succeeded
          </PrimaryButton>

          <button
            className="primary-btn red"
            onClick={() => navigate(`/payment/failed?orderId=${order?._id || "1"}`)}
          >
            Simulate Payment Failed
          </button>

          <button
            className="text-action"
            onClick={() => navigate("/orders")}
            style={{ marginTop: "8px" }}
          >
            View All Orders
          </button>
        </div>
      </div>
    </Screen>
  );
}