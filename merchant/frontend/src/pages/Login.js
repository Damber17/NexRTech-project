import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/common/Logo";
import { useAuth } from "../context/AuthContext";
import { DEMO_ACCOUNT } from "../data/mockData";
import "../styles/auth.css";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: DEMO_ACCOUNT.email,
    password: DEMO_ACCOUNT.password,
  });

  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      const data = await login(form.email, form.password);

      if (!data.user.whatsapp_verified) {
        navigate("/onboarding/verify-whatsapp");
        return;
      }

      if (data.merchant?.kyb_status !== "verified") {
        navigate("/onboarding/verification");
        return;
      }

      navigate("/merchant/overview");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Logo />

        <h1>Merchant sign in</h1>
        <p>Sign in to manage your store, orders and analytics.</p>

        <div className="demo-account-box">
          <strong>Prototype merchant account</strong>
          <span>Email: {DEMO_ACCOUNT.email}</span>
          <span>Password: {DEMO_ACCOUNT.password}</span>
        </div>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm({
                  ...form,
                  email: event.target.value,
                })
              }
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={form.password}
              onChange={(event) =>
                setForm({
                  ...form,
                  password: event.target.value,
                })
              }
              required
            />
          </label>

          <button className="primary-btn" type="submit">
            Sign in
          </button>
        </form>

        <p className="auth-foot">
          New merchant?{" "}
          <Link to="/onboarding/create-account">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
