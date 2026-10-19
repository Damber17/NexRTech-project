import React, { useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { KeyRound, Check } from "lucide-react";

import { Screen, PrimaryButton } from "../components/common/UI";
import { useStore } from "../context/StoreContext";

export default function VerifyPin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { updateUser } = useStore();
  const phone = searchParams.get("phone") || "+254 712 345 678";

  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (value.length > 1) {
      value = value[value.length - 1];
    }
    const nextPin = [...pin];
    nextPin[index] = value;
    setPin(nextPin);

    // Auto-advance
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    updateUser({ kyc_status: "verified", account_status: "active" });
    navigate("/home");
  };

  const handleResend = () => {
    setResending(true);
    setTimeout(() => {
      setResending(false);
      setResent(true);
      setTimeout(() => setResent(false), 3000);
    }, 1000);
  };

  const isComplete = pin.every((d) => d !== "");

  return (
    <Screen title="Verify Phone" back nav={false}>
      <div style={{ textAlign: "center", padding: "24px 16px 16px" }}>
        <div 
          style={{ 
            width: "64px", 
            height: "64px", 
            borderRadius: "50%", 
            background: "#fff1db", 
            color: "#e48700", 
            display: "grid", 
            placeItems: "center", 
            margin: "0 auto 14px"
          }}
        >
          <KeyRound size={30} />
        </div>

        <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "6px" }}>
          Enter Verification PIN
        </h2>

        <p className="muted small" style={{ maxWidth: "260px", margin: "0 auto" }}>
          We sent a 6-digit code to <strong>{phone}</strong> on WhatsApp.
        </p>
      </div>

      <div className="panel" style={{ marginTop: "10px" }}>
        <form onSubmit={handleVerify}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", margin: "16px 0 24px" }}>
            {pin.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputRefs.current[idx] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                style={{
                  width: "44px",
                  height: "50px",
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: 700,
                  border: digit ? "2px solid #e48700" : "1.5px solid #d0d0d0",
                  borderRadius: "8px",
                  background: digit ? "#fffaf2" : "#fafafa",
                  outline: "none"
                }}
              />
            ))}
          </div>

          <PrimaryButton type="submit" disabled={!isComplete}>
            Verify PIN & Continue
          </PrimaryButton>
        </form>

        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <button
            type="button"
            className="text-action"
            onClick={handleResend}
            disabled={resending}
            style={{ fontSize: "13px" }}
          >
            {resent ? "PIN resent successfully ✓" : resending ? "Resending..." : "Didn't receive code? Resend"}
          </button>
        </div>
      </div>
    </Screen>
  );
}
