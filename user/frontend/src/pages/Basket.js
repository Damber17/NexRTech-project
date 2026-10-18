import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Share2, Check } from "lucide-react";

import {
  Screen,
  PrimaryButton,
  EmptyState,
} from "../components/common/UI";
import { useStore } from "../context/StoreContext";

import "../styles/Basket.css";

export default function Basket() {
  const navigate = useNavigate();
  const { basket, updateQuantity } = useStore();
  const [copied, setCopied] = useState(false);

  if (!basket || !basket.items || basket.items.length === 0) {
    return (
      <Screen title="My Basket">
        <EmptyState
          icon="🧺"
          title="Your basket is empty"
          description="Explore products and add your favorites to get started."
          action="Browse Merchants"
          onAction={() => navigate("/home")}
        />
      </Screen>
    );
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + "/basket/" + (basket.public_id || "BK-1234"));
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Screen title={basket.basket_name || "My Basket"}>
      <div className="basket-header">
        <div className="row">
          <MapPin size={15} color="#e48700" />
          <span className="muted small" style={{ fontWeight: 600 }}>
            {basket.merchant?.business_name || basket.merchant?.name || "Merchant"}
          </span>
        </div>
        <button 
          className="icon-btn" 
          onClick={handleShare}
          title="Share basket link"
          style={{ display: "flex", alignItems: "center", gap: "4px" }}
        >
          {copied ? <Check size={16} color="#188b43" /> : <Share2 size={18} />}
          {copied && <span style={{ fontSize: "12px", color: "#188b43" }}>Copied!</span>}
        </button>
      </div>

      <div className="basket-items-list">
        {basket.items.map((item) => (
          <div
            className="basket-line panel"
            key={item.product_id}
          >
            <img
              src={item.product_image}
              alt={item.name}
            />

            <div className="basket-line-info">
              <strong>{item.name}</strong>

              <small className="muted">
                {item.unit_label}
              </small>

              <b className="orange">
                KSh {item.line_total?.kes || item.line_total}
                {item.line_total?.aud && (
                  <span className="aud-price">≈ AUD {item.line_total.aud}</span>
                )}
              </b>
            </div>

            <div className="quantity-controls">
              <button
                onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                title="Decrease quantity"
              >
                −
              </button>

              <b>{item.quantity}</b>

              <button
                onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                title="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="panel order-summary-panel">
        <h3 className="card-title">Order Summary</h3>

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

      <PrimaryButton onClick={() => navigate("/checkout")}>
        Proceed to Checkout
      </PrimaryButton>
    </Screen>
  );
}