import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

import { Screen, ShopCard } from "../components/common/UI";
import { shops } from "../data";

import "../styles/Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filteredShops = shops.filter((shop) =>
    `${shop.name} ${shop.location}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <Screen>
      <div className="home-welcome">
        <img
          src="https://i.pravatar.cc/100?img=47"
          alt="Profile"
        />

        <div>
          <small>Welcome</small>
          <strong>Ngawang Pema</strong>
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

      <h3 className="card-title">Shops</h3>

      <div className="home-shops-list">
        {filteredShops.map((shop) => (
          <ShopCard
            key={shop.id}
            shop={shop}
            onClick={() => navigate("/catalogue")}
          />
        ))}
      </div>

      {filteredShops.length === 0 && (
        <p className="muted small">No shops found.</p>
      )}
    </Screen>
  );
}