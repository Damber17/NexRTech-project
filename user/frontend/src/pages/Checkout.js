import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Phone, UserRound } from "lucide-react";

import {
  Screen,
  PrimaryButton,
} from "../components/common/UI";
import { useStore } from "../context/StoreContext";

import "../styles/Checkout.css";

export default function Checkout() {
  const navigate = useNavigate();
  const { basket, createOrder } = useStore();

  const [payerOption, setPayerOption] = useState("self"); // "self" or "other"
  const [payerPhone, setPayerPhone] = useState("+61 412 345 678");
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");

  if (!basket || !basket.items || basket.items.length === 0) {
    return (
      <Screen title="Checkout" back>
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <p className="muted">Your basket is empty.</p>
          <PrimaryButton onClick={() => navigate("/home")} style={{ marginTop: "16px" }}>
            Browse Merchants
          </PrimaryButton>
        </div>
      </Screen>
    );
  }

  const handleCheckout = () => {
    const order = createOrder({
      payer: payerOption,
      payer_phone: payerOption === "other" ? payerPhone : "",
      recipient_name: recipientName,
      recipient_phone: recipientPhone
    });

    if (payerOption === "self") {
      navigate(`/payment/checkout?orderId=${order._id}`);
    } else {
      navigate(`/payment/pending?orderId=${order._id}&mode=link`);
    }
  };

  const recipientDigits = recipientPhone.replace(/\D/g, "");
  const isButtonDisabled =
    !recipientName.trim() ||
    recipientDigits.length < 8 ||
    recipientDigits.length > 15 ||
    (payerOption === "other" && !payerPhone.trim());

  return (
    <Screen title="Checkout" back>
      <div className="panel">
        <h3 className="card-title">Who should pay?</h3>

        <div className="payment-choice-grid">
          <label 
            className={`payment-choice ${payerOption === "self" ? "selected" : ""}`}
            onClick={() => setPayerOption("self")}
          >
            <input
              type="radio"
              name="payer"
              checked={payerOption === "self"}
              onChange={() => setPayerOption("self")}
            />
            <div>
              <strong>I'll pay myself</strong>
              <small className="muted">Pay by card; the order is collected from the merchant</small>
            </div>
          </label>

          <label 
            className={`payment-choice ${payerOption === "other" ? "selected" : ""}`}
            onClick={() => setPayerOption("other")}
          >
            <input
              type="radio"
              name="payer"
              checked={payerOption === "other"}
              onChange={() => setPayerOption("other")}
            />
            <div>
              <strong>Someone else pays</strong>
              <small className="muted">Share a WhatsApp payment link; collect from the merchant</small>
            </div>
          </label>
        </div>
      </div>

      {payerOption === "other" && (
        <div className="panel">
          <h3 className="card-title">Payer Details</h3>

          <label className="field">
            <div className="row">
              <Phone size={14} color="#e48700" />
              <span>Payer's WhatsApp number</span>
            </div>
            <input
              type="tel"
              placeholder="+61 4XX XXX XXX"
              value={payerPhone}
              onChange={(e) => setPayerPhone(e.target.value)}
              required
            />
          </label>
          <p className="muted small" style={{ margin: 0 }}>
            A secure checkout link will be sent to the payer abroad via WhatsApp.
          </p>
        </div>
      )}

      <div className="panel">
        <h3 className="card-title">Recipient Details</h3>

        <label className="field">
          <div className="row">
            <UserRound size={14} color="#e48700" />
            <span>Recipient's name</span>
          </div>
          <input
            type="text"
            placeholder="Enter recipient's name"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            required
          />
        </label>

        <label className="field">
          <div className="row">
            <Phone size={14} color="#e48700" />
            <span>Recipient's WhatsApp number</span>
          </div>
          <input
            type="tel"
            placeholder="+254 7XX XXX XXX"
            value={recipientPhone}
            onChange={(e) => setRecipientPhone(e.target.value)}
            required
          />
        </label>

        <p className="muted small" style={{ margin: 0 }}>
          Enter the number with its country code. The basket will be shared to the recipient on WhatsApp after checkout.
        </p>
      </div>

      <div className="panel">
        <h3 className="card-title">Order Summary</h3>

        <div className="row muted small" style={{ marginBottom: "12px" }}>
          <MapPin size={13} color="#e48700" />
          <span>Pickup from {basket.merchant?.business_name || "merchant"}</span>
        </div>

        {basket.items.map((item) => (
          <div className="summary-line" key={item.product_id}>
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>KSh {item.line_total?.kes || item.line_total}</span>
          </div>
        ))}

        <div className="summary-line">
          <span>Subtotal ({basket.item_count} items)</span>
          <span>KSh {basket.subtotal.kes}</span>
        </div>

        <div className="summary-line">
          <span>Service charge</span>
          <span>KSh {basket.service_charge.kes}</span>
        </div>

        <div className="divider" />

        <div className="summary-line">
          <strong>Total</strong>
          <strong className="orange" style={{ fontSize: "17px" }}>
            KSh {basket.total.kes}
            <span className="aud-price" style={{ fontSize: "13px", marginLeft: "6px" }}>
              ≈ AUD {basket.total.aud}
            </span>
          </strong>
        </div>
      </div>

      <PrimaryButton
        disabled={isButtonDisabled}
        onClick={handleCheckout}
      >
        {payerOption === "self" ? "Pay Now" : "Send Payment Link"}
      </PrimaryButton>
    </Screen>
  );
}