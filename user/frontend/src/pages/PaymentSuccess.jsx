import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Check } from "lucide-react";

import { Screen } from "../components/common/UI";
import { useStore } from "../context/StoreContext";

import "../styles/PaymentSuccess.css";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { getOrder, currentOrder } = useStore();

  const orderId = searchParams.get("orderId");
  const order = getOrder(orderId) || currentOrder;
  const merchantName = order?.merchant?.business_name || order?.shop || "the merchant";
  const orderReference = order?.public_id || orderId;
  const amount = order?.total?.kes || order?.total;

  return (
    <Screen title="Payment Status" nav={false}>
      <div className="payment-success-layout">
        <section className="payment-success-card" aria-labelledby="payment-success-title">
          <div className="payment-success-icon" aria-hidden="true">
            <Check size={23} strokeWidth={2.5} />
          </div>

          <h1 id="payment-success-title">Payment sent</h1>

          <p>
            Your order has been sent to {merchantName}. They will be notified on WhatsApp.
          </p>

          {order && (
            <div className="payment-success-order" aria-label="Order details">
              <span>Order {orderReference}</span>
              {amount != null && (
                <strong>
                  KES {amount}
                  {order.total?.aud && <small>≈ AUD {order.total.aud}</small>}
                </strong>
              )}
            </div>
          )}

          <button className="payment-success-back" onClick={() => navigate("/home")}>
            Back
          </button>
        </section>
      </div>
    </Screen>
  );
}