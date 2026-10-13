import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Screen,
  PrimaryButton,
  EmptyState,
} from "../components/common/UI";

import { useStore } from "../context/StoreContext";
import { money } from "../data";

import "../styles/Basket.css";

export default function Basket() {
  const navigate = useNavigate();

  const {
    items,
    update,
    subtotal,
    delivery,
    total,
  } = useStore();

  return (
    <Screen title="My Basket">
      {items.length === 0 ? (
        <EmptyState
          icon="🧺"
          title="Your basket is empty"
          description="Explore products and add your favorites."
          action="Browse Shops"
          onAction={() => navigate("/home")}
        />
      ) : (
        <>
          <h3 className="card-title">
            Naivas Supermarket
          </h3>

          {items.map((product) => (
            <div
              className="basket-line panel"
              key={product.id}
            >
              <img
                src={product.image}
                alt={product.name}
              />

              <div className="basket-line-info">
                <strong>{product.name}</strong>

                <small className="muted">
                  {product.unit}
                </small>

                <b className="orange">
                  {money(product.price * product.qty)}
                </b>
              </div>

              <div className="quantity-controls">
                <button
                  onClick={() => update(product.id, -1)}
                >
                  −
                </button>

                <b>{product.qty}</b>

                <button
                  onClick={() => update(product.id, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <div className="panel">
            <h3 className="card-title">
              Order Summary
            </h3>

            <div className="summary-line">
              <span>Subtotal</span>
              <b>{money(subtotal)}</b>
            </div>

            <div className="summary-line">
              <span>Delivery fee</span>
              <b>{money(delivery)}</b>
            </div>

            <div className="divider" />

            <div className="summary-line">
              <strong>Total</strong>
              <strong className="orange">
                {money(total)}
              </strong>
            </div>
          </div>

          <PrimaryButton
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </PrimaryButton>
        </>
      )}
    </Screen>
  );
}