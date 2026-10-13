import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Screen,
  PrimaryButton,
} from "../components/common/UI";

import "../styles/Profile.css";

export default function Profile() {
  const navigate = useNavigate();

  return (
    <Screen title="My Profile" back>
      <div className="profile-card">
        <img
          src="https://i.pravatar.cc/100?img=47"
          alt="Profile"
        />

        <h2>Ngawang Pema</h2>

        <p className="muted">
          Customer account
        </p>
      </div>

      <button
        className="panel profile-option"
        onClick={() =>
          navigate("/transactions")
        }
      >
        Transaction History
        <span>›</span>
      </button>

      <button
        className="panel profile-option"
        onClick={() =>
          navigate("/orders")
        }
      >
        My Orders
        <span>›</span>
      </button>

      <PrimaryButton
        onClick={() => navigate("/home")}
      >
        Back to Home
      </PrimaryButton>
    </Screen>
  );
}