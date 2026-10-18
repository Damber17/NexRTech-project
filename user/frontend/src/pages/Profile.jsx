import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut, Edit3, ClipboardList, CreditCard, Check, X } from "lucide-react";

import { Screen, PrimaryButton } from "../components/common/UI";
import { useStore } from "../context/StoreContext";

import "../styles/Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const { user, updateUser, logout } = useStore();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "Ngawang Pema");
  const [phone, setPhone] = useState(user?.whatsapp_number || "+61 412 345 678");

  const handleSave = () => {
    updateUser({ name, whatsapp_number: phone });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  return (
    <Screen title="My Profile" back>
      <div className="profile-card">
        {user?.user_image ? (
          <img
            src={user.user_image}
            alt="Profile"
          />
        ) : (
          <div className="profile-image-placeholder">
            <User size={32} />
          </div>
        )}

        <h2>{user?.name || "User"}</h2>

        <p className="muted">
          @{user?.username || "username"} · {user?.country || "AU"}
        </p>

        <div className="profile-status">
          <span className={`status-badge ${user?.account_status || "active"}`}>
            {user?.account_status || "active"}
          </span>
          <span className={`kyc-badge ${user?.kyc_status || "verified"}`}>
            KYC: {user?.kyc_status || "verified"}
          </span>
        </div>
      </div>

      {isEditing ? (
        <div className="panel" style={{ marginTop: "14px" }}>
          <h3 className="card-title">Edit Profile</h3>
          
          <label className="field">
            <span>Full Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="field">
            <span>WhatsApp Number</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>

          <div className="row" style={{ marginTop: "16px", gap: "10px" }}>
            <PrimaryButton onClick={handleSave} style={{ flex: 1 }}>
              Save Changes
            </PrimaryButton>
            <button
              className="panel"
              onClick={() => setIsEditing(false)}
              style={{ padding: "12px 18px", margin: 0, fontWeight: 600 }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      <button
        className="panel profile-option"
        onClick={() => navigate("/orders")}
      >
        <div className="row">
          <ClipboardList size={18} color="#e48700" />
          <span>My Orders</span>
        </div>
        <span>›</span>
      </button>

      <button
        className="panel profile-option"
        onClick={() => navigate("/transactions")}
      >
        <div className="row">
          <CreditCard size={18} color="#e48700" />
          <span>Transaction History</span>
        </div>
        <span>›</span>
      </button>

      <button
        className="panel profile-option"
        onClick={() => setIsEditing(!isEditing)}
      >
        <div className="row">
          <Edit3 size={18} color="#555" />
          <span>Edit Profile</span>
        </div>
        <span>›</span>
      </button>

      <button
        className="panel profile-option logout"
        onClick={handleLogout}
      >
        <div className="row" style={{ color: "#d12c35" }}>
          <LogOut size={18} color="#d12c35" />
          <span>Sign Out</span>
        </div>
        <span>›</span>
      </button>
    </Screen>
  );
}