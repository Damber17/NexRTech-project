import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, ArrowRight, ShieldCheck } from "lucide-react";

import { Screen, PrimaryButton } from "../components/common/UI";
import { useStore } from "../context/StoreContext";

export default function Login() {
  const navigate = useNavigate();
  const { updateUser } = useStore();
  const [countryCode, setCountryCode] = useState("+254");
  const [phoneNumber, setPhoneNumber] = useState("712345678");

  const handleContinue = (e) => {
    e.preventDefault();
    const fullPhone = `${countryCode} ${phoneNumber}`;
    updateUser({ whatsapp_number: fullPhone });
    navigate(`/verify-pin?phone=${encodeURIComponent(fullPhone)}`);
  };

  return (
    <Screen title="Welcome" nav={false}>
      <div style={{ textAlign: "center", padding: "30px 16px 20px" }}>
        <div 
          style={{ 
            width: "70px", 
            height: "70px", 
            borderRadius: "50%", 
            background: "#fff1db", 
            color: "#e48700", 
            display: "grid", 
            placeItems: "center", 
            margin: "0 auto 16px",
            boxShadow: "0 4px 14px rgba(228, 135, 0, 0.2)"
          }}
        >
          <ShieldCheck size={36} />
        </div>

        <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1a1a1a", marginBottom: "8px" }}>
          Diaspora Grocery Portal
        </h2>
        <p className="muted small" style={{ maxWidth: "280px", margin: "0 auto" }}>
          Order groceries for your family in Kenya and pay seamlessly from abroad.
        </p>
      </div>

      <div className="panel" style={{ marginTop: "10px" }}>
        <h3 className="card-title">Sign in with WhatsApp</h3>

        <form onSubmit={handleContinue}>
          <div className="field">
            <span>Mobile Country</span>
            <select 
              value={countryCode} 
              onChange={(e) => setCountryCode(e.target.value)}
              style={{ fontWeight: 600 }}
            >
              <option value="+254">🇰🇪 Kenya (+254)</option>
              <option value="+61">🇦🇺 Australia (+61)</option>
              <option value="+44">🇬🇧 United Kingdom (+44)</option>
              <option value="+1">🇺🇸 United States (+1)</option>
            </select>
          </div>

          <div className="field">
            <span>WhatsApp Number</span>
            <div className="row" style={{ gap: "6px" }}>
              <span style={{ 
                padding: "12px 14px", 
                background: "#f0f0f0", 
                borderRadius: "8px", 
                fontWeight: 600,
                fontSize: "14px",
                border: "1px solid #e0e0e0" 
              }}>
                {countryCode}
              </span>
              <input
                type="tel"
                placeholder="7XX XXX XXX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                required
                style={{ flex: 1 }}
              />
            </div>
          </div>

          <p className="muted small" style={{ margin: "14px 0" }}>
            We'll send a one-time verification PIN to this WhatsApp number.
          </p>

          <PrimaryButton type="submit" disabled={!phoneNumber.trim()}>
            Send Verification Code
          </PrimaryButton>
        </form>
      </div>

      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <button
          className="text-action"
          onClick={() => navigate("/home")}
          style={{ textDecoration: "none", color: "#e48700", fontWeight: 600 }}
        >
          Skip & Explore as Guest →
        </button>
      </div>
    </Screen>
  );
}
