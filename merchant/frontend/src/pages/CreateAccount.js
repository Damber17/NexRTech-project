import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingShell from "../components/common/OnboardingShell";
import { useAuth } from "../context/AuthContext";
import "../styles/forms.css";

const initialForm = {
  name: "",
  email: "",
  whatsapp_number: "",
  password: "",
  business_name: "",
  business_registration_no: "",
  country: "Kenya",
  category: "Groceries",
  payout_currency: "KES",
  mpesa_phone: "",
};

export default function CreateAccountPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [error, setError] = useState("");
  const [form, setForm] = useState(initialForm);

  function updateField(field, value) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      await register({
        ...form,
        mobile_money_account: {
          provider: "MPESA",
          phone_number: form.mpesa_phone || form.whatsapp_number,
          account_name: form.business_name,
          country: form.country,
        },
      });

      navigate("/onboarding/verify-whatsapp");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <OnboardingShell step={1}>
      <div className="form-panel">
        <div className="back-line">‹ Back to welcome</div>

        <h2>Create your merchant account</h2>
        <p>Start with a few business and account details.</p>

        <div className="segment">
          <span className="active">1/3</span>
          <span>WHATSAPP</span>
          <span>VERIFICATION</span>
        </div>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit} className="merchant-form">
          <section>
            <h3>Business information</h3>

            <div className="form-grid">
              <label>
                Business representative&apos;s name
                <input
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  required
                />
              </label>

              <label>
                Business registration number
                <input
                  value={form.business_registration_no}
                  onChange={(event) =>
                    updateField("business_registration_no", event.target.value)
                  }
                  required
                />
              </label>

              <label>
                Business name
                <input
                  value={form.business_name}
                  onChange={(event) =>
                    updateField("business_name", event.target.value)
                  }
                  required
                />
              </label>

              <label>
                Business category
                <select
                  value={form.category}
                  onChange={(event) =>
                    updateField("category", event.target.value)
                  }
                >
                  <option>Groceries</option>
                  <option>Pharmacy</option>
                  <option>Electronics</option>
                  <option>General retail</option>
                </select>
              </label>
            </div>
          </section>

          <section>
            <h3>Your contact & payout account</h3>

            <div className="form-grid">
              <label>
                WhatsApp number
                <input
                  value={form.whatsapp_number}
                  onChange={(event) =>
                    updateField("whatsapp_number", event.target.value)
                  }
                  placeholder="+254..."
                  required
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  required
                />
              </label>

              <label>
                Country
                <select
                  value={form.country}
                  onChange={(event) => updateField("country", event.target.value)}
                >
                  <option>Kenya</option>
                </select>
              </label>

              <label>
                Payout currency
                <select
                  value={form.payout_currency}
                  onChange={(event) =>
                    updateField("payout_currency", event.target.value)
                  }
                >
                  <option>KES</option>
                </select>
              </label>

              <label>
                M-PESA number
                <input
                  value={form.mpesa_phone}
                  onChange={(event) =>
                    updateField("mpesa_phone", event.target.value)
                  }
                  placeholder="Use WhatsApp number if blank"
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  value={form.password}
                  onChange={(event) =>
                    updateField("password", event.target.value)
                  }
                  minLength="8"
                  required
                />
              </label>
            </div>
          </section>

          <label className="check-row">
            <input type="checkbox" required />
            I agree to the merchant terms and confirm the information is accurate.
          </label>

          <button className="primary-btn" type="submit">
            Create account and continue →
          </button>
        </form>
      </div>
    </OnboardingShell>
  );
}
