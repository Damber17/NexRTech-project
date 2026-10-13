import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Screen,
  PrimaryButton,
} from "../components/common/UI";

import { useStore } from "../context/StoreContext";
import { money } from "../data";

import "../styles/Checkout.css";

export default function Checkout() {
  const navigate = useNavigate();

  const {
    items,
    subtotal,
    delivery,
    total,
    paymentMethod,
    setPaymentMethod,
    placeOrder,
  } = useStore();

  const [address, setAddress] = useState(
    "Moi Avenue, Nairobi"
  );

  const [phone, setPhone] = useState(
    "0712 345 678"
  );

  const handlePlaceOrder = () => {
    placeOrder();
    navigate("/payment/pending");
  };

  return (
    <Screen title="Checkout" back>
      <div className="panel">
        <h3 className="card-title">
          Delivery Details
        </h3>

        <label className="field">
          Delivery address

          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>

        <label className="field">
          Phone number

          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>
      </div>

      <div className="panel">
        <h3 className="card-title">
          Payment Method
        </h3>

        {[
          "M-Pesa",
          "Card",
          "Cash on Delivery",
        ].map((method) => (
          <label
            key={method}
            className="payment-choice"
          >
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === method}
              onChange={() =>
                setPaymentMethod(method)
              }
            />

            {method}
          </label>
        ))}
      </div>

      <div className="panel">
        <h3 className="card-title">
          Order Summary
        </h3>

        {items.map((product) => (
          <div
            className="summary-line"
            key={product.id}
          >
            <span>
              {product.name} × {product.qty}
            </span>

            <b>
              {money(product.price * product.qty)}
            </b>
          </div>
        ))}

        <div className="summary-line">
          <span>Subtotal</span>
          <span>{money(subtotal)}</span>
        </div>

        <div className="summary-line">
          <span>Delivery</span>
          <span>{money(delivery)}</span>
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
        disabled={
          !items.length ||
          !address.trim() ||
          !phone.trim()
        }
        onClick={handlePlaceOrder}
      >
        Place Order · {money(total)}
      </PrimaryButton>
    </Screen>
  );
}