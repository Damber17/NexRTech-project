import { CheckCircle2, Circle, ShieldCheck } from "lucide-react";
import Logo from "./Logo";
import "../../styles/onboarding.css";

export default function OnboardingShell({ step = 1, children }) {
  const steps = [
    "Create your account",
    "Verify your WhatsApp number",
    "Set up your storefront",
  ];

  function getStepDescription(index) {
    if (index === 0) {
      return "Enter your business details";
    }

    if (index === 1) {
      return "Confirm your business number";
    }

    return "Add products and begin selling";
  }

  return (
    <div className="onboarding-page">
      <header className="onboarding-header">
        <Logo compact />
        <span>Help & resources</span>
      </header>

      <div className="onboarding-grid">
        <aside className="onboarding-side">
          <div className="eyebrow">MERCHANT ONBOARDING</div>

          <h1>
            Your business.
            <br />
            Every channel.
            <br />
            One workspace.
          </h1>

          <p>
            Set up your merchant account, verify your business and start managing
            customer orders in one place.
          </p>

          <div className="step-list">
            {steps.map((label, index) => {
              const stepNumber = index + 1;
              const isActive = stepNumber === step;
              const isDone = stepNumber < step;

              return (
                <div
                  className={`step ${isActive ? "active" : ""} ${
                    isDone ? "done" : ""
                  }`}
                  key={label}
                >
                  {isDone ? (
                    <CheckCircle2 size={20} />
                  ) : (
                    <Circle size={20} />
                  )}

                  <div>
                    <b>{label}</b>
                    <span>{getStepDescription(index)}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="security-card">
            <ShieldCheck size={20} />

            <div>
              <b>Commerce-grade security</b>
              <p>
                Your merchant account and payout details are protected throughout
                onboarding.
              </p>
            </div>
          </div>
        </aside>

        <main className="onboarding-main">{children}</main>
      </div>

      <footer className="onboarding-footer">
        © 2026 Commerce Orchestration
        <span>Privacy · Terms</span>
      </footer>
    </div>
  );
}
