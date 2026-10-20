import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Screen } from "../components/common/UI";
import { useStore } from "../context/StoreContext";

import "../styles/PaymentCheckout.css";

export default function PaymentCheckout() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { getOrder, currentOrder } = useStore();
  const [country, setCountry] = useState("Australia");

  const orderId = searchParams.get("orderId");
  const order = getOrder(orderId) || currentOrder;
  const merchantName = order?.merchant?.business_name || order?.shop || "the merchant";
  const amountKes = order?.total?.kes || order?.total;

  const handlePay = (event) => {
    event.preventDefault();
    navigate(`/payment/success?orderId=${order?._id || orderId}`);
  };

  return (
    <Screen title="Payment" back nav={false}>
      <div className="payment-checkout-layout">
        <form className="payment-checkout-form" onSubmit={handlePay}>
          <div className="payment-checkout-heading">
            <span>Pay Group Remit</span>
            <strong>A$ {order?.total?.aud || "0.00"}</strong>
            <small>≈ KES {amountKes || "0.00"}</small>
            <p>Approximate conversion (1 AUD = 90.30 KES)</p>
            <div>{merchantName}</div>
          </div>

          <label className="payment-field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="james@email.com"
              required
            />
          </label>

          <fieldset className="payment-card-fields">
            <legend>Card information</legend>
            <input
              type="text"
              name="cardNumber"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="1234 1234 1234 1234"
              minLength="12"
              maxLength="23"
              pattern="[0-9 ]{12,23}"
              aria-label="Card number"
              required
            />
            <div className="payment-card-row">
              <input
                type="text"
                name="expiry"
                autoComplete="cc-exp"
                placeholder="MM / YY"
                maxLength="7"
                pattern="(0[1-9]|1[0-2])\s?/\s?[0-9]{2}"
                aria-label="Expiry date"
                required
              />
              <input
                type="text"
                name="cvc"
                inputMode="numeric"
                autoComplete="cc-csc"
                placeholder="CVC"
                minLength="3"
                maxLength="4"
                pattern="[0-9]{3,4}"
                aria-label="CVC"
                required
              />
            </div>
          </fieldset>

          <label className="payment-field">
            <span>Name on card</span>
            <input
              type="text"
              name="cardName"
              autoComplete="cc-name"
              placeholder="Full name"
              required
            />
          </label>

          <label className="payment-field">
            <span>Country or region</span>
            <select
              name="country"
              autoComplete="country-name"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              required
            >
              <option>Australia</option>
              <option>Kenya</option>
              <option>United States</option>
              <option>United Kingdom</option>
            </select>
          </label>

          <button className="payment-checkout-pay" type="submit">
            Pay
          </button>

          <div className="payment-checkout-footer">Powered by Stripe</div>
        </form>
      </div>
    </Screen>
  );
}