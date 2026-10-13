import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

import { Screen, ProductCard } from "../components/common/UI";
import { products } from "../data";

import "../styles/Catalogue.css";

export default function Catalogue() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Screen title="Naivas Supermarket" back>
      <img
        className="catalogue-cover"
        src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=900"
        alt="Supermarket"
      />

      <div className="search-wrap catalogue-search">
        <Search size={17} />

        <input
          className="search-input"
          placeholder="Search products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <h3 className="card-title">Popular products</h3>

      <div className="catalogue-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => navigate(`/product/${product.id}`)}
          />
        ))}
      </div>
    </Screen>
  );
}