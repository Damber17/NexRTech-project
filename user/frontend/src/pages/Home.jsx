import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  MapPin,
  House,
  ShoppingBasket,
  ClipboardList,
} from "lucide-react";

import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  // Search state
  const [search, setSearch] = useState("");

  // Example user information
  const user = {
    name: "Ngawang Pema",
    profile:
      "https://i.pravatar.cc/150?img=47",
  };

  // Example shops
  const shops = [
    {
      id: 1,
      name: "Naivas Supermarket",
      category: "Groceries",
      location: "Moi Avenue Nairobi",
      distance: "2 km",
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800",
    },
    {
      id: 2,
      name: "Onn The Way Supermarket",
      category: "Groceries",
      location: "Parklands",
      distance: "2.5 km",
      image:
        "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800",
    },
  ];

  // Filter shops
  const filteredShops = shops.filter((shop) => {
    const searchText = search.toLowerCase();

    return (
      shop.name.toLowerCase().includes(searchText) ||
      shop.category.toLowerCase().includes(searchText) ||
      shop.location.toLowerCase().includes(searchText)
    );
  });

  // Open shop catalogue
  const handleShopClick = (shopId) => {
    navigate(`/catalogue?shop=${shopId}`);
  };

  return (
    <div className="home-page">

      {/* MOBILE CONTAINER */}
      <div className="home-container">

        {/* STATUS BAR */}
        <div className="home-status-bar">
          <span>9:41</span>

          <div className="home-status-icons">
            <span>●</span>
            <span>▰</span>
            <span>▰</span>
          </div>
        </div>

        {/* USER HEADER */}
        <header className="home-header">

          <div className="home-avatar">
            <img
              src={user.profile}
              alt="User profile"
            />
          </div>

          <div className="home-user-info">
            <p>Welcome</p>
            <h2>{user.name}</h2>
          </div>

        </header>

        {/* SEARCH BAR */}
        <div className="home-search-container">

          <Search
            size={18}
            className="home-search-icon"
          />

          <input
            type="text"
            placeholder="Search location or a Merchant"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        {/* SHOPS SECTION */}
        <section className="home-shops-section">

          <h3 className="home-section-title">
            Shops
          </h3>

          <div className="home-shops-list">

            {filteredShops.length > 0 ? (

              filteredShops.map((shop) => (

                <div
                  key={shop.id}
                  className="home-shop-card"
                  onClick={() => handleShopClick(shop.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleShopClick(shop.id);
                    }
                  }}
                >

                  {/* SHOP IMAGE */}
                  <div className="home-shop-image">

                    <img
                      src={shop.image}
                      alt={shop.name}
                    />

                  </div>

                  {/* SHOP DETAILS */}
                  <div className="home-shop-details">

                    <div className="home-shop-top">

                      <h4>{shop.name}</h4>

                      <span className="home-category">
                        {shop.category}
                      </span>

                    </div>

                    <div className="home-shop-location">

                      <MapPin size={13} />

                      <span>
                        {shop.location} ({shop.distance})
                      </span>

                    </div>

                  </div>

                </div>

              ))

            ) : (

              <div className="home-no-results">
                No shops found.
              </div>

            )}

          </div>

        </section>

        {/* BOTTOM NAVIGATION */}
        <nav className="home-bottom-nav">

          <button
            className="home-nav-item active"
            onClick={() => navigate("/home")}
          >
            <House size={22} />
            <span>Home</span>
          </button>

          <button
            className="home-nav-item"
            onClick={() => navigate("/basket")}
          >
            <ShoppingBasket size={22} />
            <span>Basket</span>
          </button>

          <button
            className="home-nav-item"
            onClick={() => navigate("/orders")}
          >
            <ClipboardList size={22} />
            <span>Orders</span>
          </button>

        </nav>

      </div>

    </div>
  );
};

export default Home;