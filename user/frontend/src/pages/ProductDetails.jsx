import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Check } from "lucide-react";

import {
  Screen,
  PrimaryButton,
} from "../components/common/UI";
import { useStore } from "../context/StoreContext";

import "../styles/ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, merchants, addToBasket } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = 
    products.find((p) => String(p._id || p.id) === String(id)) ||
    products[0];

  const merchant = 
    merchants.find((m) => String(m._id || m.id) === String(product?.merchant_id)) ||
    merchants[0];

  if (!product) {
    return (
      <Screen title="Product Details" back>
        <p style={{ padding: "20px", textAlign: "center" }}>Product not found.</p>
        <PrimaryButton onClick={() => navigate("/home")}>Browse Catalogue</PrimaryButton>
      </Screen>
    );
  }

  const isOutOfStock = product.in_stock === false;
  const unitPriceKes = parseFloat(product.price?.kes || product.price || 0);
  const unitPriceAud = parseFloat(product.price?.aud || 0);

  const totalPriceKes = (unitPriceKes * quantity).toFixed(2);
  const totalPriceAud = (unitPriceAud * quantity).toFixed(2);

  const handleAddToBasket = () => {
    if (isOutOfStock) return;
    addToBasket(product, quantity, merchant);
    setAdded(true);
    setTimeout(() => {
      navigate("/basket");
    }, 350);
  };

  return (
    <Screen title="Product Details" back>
      <img
        className="detail-photo"
        src={product.product_image || product.image}
        alt={product.name}
      />

      <div className="product-detail-header">
        <h2>{product.name}</h2>
        <div className="price-display">
          <b className="orange">KSh {unitPriceKes.toFixed(2)}</b>
          {unitPriceAud > 0 && (
            <span className="aud-price">≈ AUD {unitPriceAud.toFixed(2)}</span>
          )}
        </div>
      </div>

      <p className="muted small">
        {product.unit_label || product.unit} ·{" "}
        <span style={{ color: isOutOfStock ? "#df2935" : "#188b43", fontWeight: 600 }}>
          {isOutOfStock ? "Out of stock" : "In stock"}
        </span>
      </p>

      {merchant && (
        <div className="panel" style={{ marginTop: "14px" }}>
          <h3 className="card-title">Merchant</h3>
          <p className="muted small row">
            <MapPin size={14} color="#e48700" />
            <span>
              <strong>{merchant.business_name || merchant.name}</strong> · {merchant.address || merchant.location}
            </span>
          </p>
        </div>
      )}

      <div className="panel">
        <h3 className="card-title">Description</h3>
        <p className="muted small" style={{ lineHeight: 1.6 }}>
          {product.description || "Farm fresh local produce sourced directly for optimal quality and freshness."}
        </p>
      </div>

      <div className="row between product-quantity" style={{ margin: "20px 0 16px" }}>
        <strong>Quantity</strong>

        <div className="row">
          <button
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            disabled={isOutOfStock || quantity <= 1}
          >
            −
          </button>

          <b>{quantity}</b>

          <button
            onClick={() => setQuantity((prev) => Math.min(99, prev + 1))}
            disabled={isOutOfStock}
          >
            +
          </button>
        </div>
      </div>

      <PrimaryButton 
        onClick={handleAddToBasket}
        disabled={isOutOfStock}
      >
        {isOutOfStock 
          ? "Out of Stock" 
          : added 
          ? "Added to Basket ✓"
          : `Add to Basket · KSh ${totalPriceKes}`}
      </PrimaryButton>
    </Screen>
  );
}