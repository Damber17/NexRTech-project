import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingShell from "../components/common/OnboardingShell";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "../styles/forms.css";

export default function VerificationPage() {
  const { session, setSessionData } = useAuth();
  const navigate = useNavigate();

  const [busy, setBusy] = useState(false);

  const verified = session?.merchant?.kyb_status === "verified";

  async function completeVerification() {
    setBusy(true);

    try {
      const data = await api("/auth/complete-verification", {
        method: "POST",
      });

      setSessionData({
        merchant: data.merchant,
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <OnboardingShell step={3}>
      <div className="form-panel narrow">
        <div className="back-line">‹ Back to WhatsApp verification</div>

        <h2>Verification</h2>
        <p>
          Finish the last onboarding step so your merchant workspace can go live.
        </p>

        <div className="verification-card">
          <CheckCircle2 size={21} />

          <div>
            <b>
              {verified
                ? "Your business is verified"
                : "Your WhatsApp number is verified"}
            </b>

            <p>
              {verified
                ? `Merchant ${session?.merchant?.business_name} is ready to use.`
                : "Complete the business verification check to activate the merchant account."}
            </p>
          </div>
        </div>

        {!verified ? (
          <button
            type="button"
            onClick={completeVerification}
            disabled={busy}
            className="primary-btn"
          >
            {busy ? "Checking…" : "Complete verification"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => navigate("/merchant/overview")}
            className="primary-btn"
          >
            Go to merchant workspace →
          </button>
        )}

        <p className="muted-note">
          In this development build, the KYB result is simulated. Replace this
          endpoint with the approved provider flow during integration.
        </p>
      </div>
    </OnboardingShell>
  );
}
