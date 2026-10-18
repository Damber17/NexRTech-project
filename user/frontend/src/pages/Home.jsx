import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, User } from "lucide-react";

import { Screen, ShopCard } from "../components/common/UI";
import { useStore } from "../context/StoreContext";

import "../styles/Home.css";

export default function Home() {
  const navigate = useNavigate();
  const { user, merchants } = useStore();
  const [query, setQuery] = useState("");

  const filteredMerchants = (merchants || []).filter((merchant) =>
    `${merchant.business_name || merchant.name} ${merchant.address || merchant.location} ${merchant.category}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <Screen>
      <div 
        className="home-welcome clickable"
        onClick={() => navigate("/profile")}
        style={{ cursor: "pointer" }}
        title="View Profile"
      >
        {user?.user_image ? (
          <img
            src={user.user_image}
            alt="Profile"
          />
        ) : (
          <div className="profile-placeholder">
            <User size={24} />
          </div>
        )}

        <div>
          <small>Welcome</small>
          <strong>{user?.name || "User"}</strong>
        </div>
      </div>

      <div className="search-wrap">
        <Search size={17} />

        <input
          className="search-input"
          placeholder="Search location or a Merchant"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <h3 className="card-title">Merchants</h3>

      <div className="home-shops-list">
        {filteredMerchants.map((merchant) => (
          <ShopCard
            key={merchant.id || merchant._id}
            shop={{
              id: merchant.id || merchant._id,
              name: merchant.business_name || merchant.name,
              category: merchant.category,
              location: merchant.address || merchant.location,
              distance: merchant.distance || (merchant.distance_km ? `${merchant.distance_km} km` : null),
              image: merchant.image
            }}
            onClick={() => navigate(`/catalogue/${merchant.id || merchant._id}`)}
          />
        ))}
      </div>

      {filteredMerchants.length === 0 && (
        <p className="muted small" style={{ textAlign: "center", marginTop: "24px" }}>
          No merchants found matching "{query}".
        </p>
      )}
    </Screen>
  );
}