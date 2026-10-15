import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingShell from "../components/common/OnboardingShell";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "../styles/forms.css";

export default function WhatsAppVerifyPage() {
  const navigate = useNavigate();
  const { session, setSessionData } = useAuth();

  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const inputRefs = useRef([]);

  const sendCode = useCallback(async () => {
    setError("");

    try {
      const data = await api("/auth/whatsapp/request-otp", {
        method: "POST",
      });

      setNote(
        data.devOtp
          ? `Development code: ${data.devOtp}`
          : "A new code was sent."
      );
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    sendCode();
  }, [sendCode]);

  function handleDigitChange(index, value) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const nextDigits = [...digits];

    nextDigits[index] = digit;
    setDigits(nextDigits);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  async function verifyCode() {
    setError("");

    try {
      const data = await api("/auth/whatsapp/verify-otp", {
        method: "POST",
        body: JSON.stringify({
          code: digits.join(""),
        }),
      });

      setSessionData({
        user: data.user,
        merchant: data.merchant,
      });

      navigate("/onboarding/verification");
    } catch (err) {
      setError(err.message);
    }
  }

  const codeComplete = digits.join("").length === 6;

  return (
    <OnboardingShell step={2}>
      <div className="form-panel narrow">
        <div className="back-line">‹ Back to account details</div>

        <h2>Verify your WhatsApp number</h2>
        <p>
          Enter the 6-digit verification code sent to your business number.
        </p>

        <div className="phone-card">
          <b>WhatsApp Business</b>
          <strong>{session?.user?.whatsapp_number}</strong>
          <button className="link-btn" type="button">
            Change number
          </button>
        </div>

        <label className="field-title">WhatsApp verification PIN</label>

        <div className="otp-row">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(element) => {
                inputRefs.current[index] = element;
              }}
              value={digit}
              onChange={(event) =>
                handleDigitChange(index, event.target.value)
              }
              inputMode="numeric"
              maxLength="1"
            />
          ))}
        </div>

        {note && <div className="success-box">{note}</div>}
        {error && <div className="error-box">{error}</div>}

        <button
          className="primary-btn"
          type="button"
          onClick={verifyCode}
          disabled={!codeComplete}
        >
          Verify WhatsApp number →
        </button>

        <div className="otp-help">
          Didn&apos;t receive a code?{" "}
          <button className="link-btn" type="button" onClick={sendCode}>
            Resend code
          </button>
        </div>

        <div className="info-card">
          <b>Business verification</b>
          <p>
            After WhatsApp verification, complete the business verification step
            before your store becomes active.
          </p>
        </div>
      </div>
    </OnboardingShell>
  );
}
