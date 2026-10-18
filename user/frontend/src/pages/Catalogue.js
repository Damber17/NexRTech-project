import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Search } from "lucide-react";

import { Screen, ProductCard } from "../components/common/UI";
import { useStore } from "../context/StoreContext";

import "../styles/Catalogue.css";

export default function Catalogue() {
  const navigate = useNavigate();
  const { merchantId } = useParams();
  const { merchants, products } = useStore();
  const [query, setQuery] = useState("");

  const currentMerchant = 
    merchants.find((m) => String(m.id || m._id) === String(merchantId)) ||
    merchants[0];

  const merchantProducts = (products || []).filter((p) => {
    if (p.merchant_id && currentMerchant) {
      return String(p.merchant_id) === String(currentMerchant.id || currentMerchant._id);
    }
    return true;
  });

  const displayProducts = merchantProducts.length > 0 ? merchantProducts : products;

  const filteredProducts = displayProducts.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Screen title={currentMerchant?.business_name || currentMerchant?.name || "Shop"} back>
      {(currentMerchant?.image) && (
        <img
          className="catalogue-cover"
          src={currentMerchant.image}
          alt={currentMerchant.business_name || currentMerchant.name}
        />
      )}

      <div className="search-wrap catalogue-search">
        <Search size={17} />

        <input
          className="search-input"
          placeholder="Search products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="row between" style={{ margin: "16px 0 12px" }}>
        <h3 className="card-title" style={{ margin: 0 }}>Products</h3>
        <span className="muted small">{filteredProducts.length} items</span>
      </div>

      <div className="catalogue-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id || product.id}
            product={{
              id: product._id || product.id,
              name: product.name,
              unit: product.unit_label || product.unit,
              image: product.product_image || product.image,
              price: product.price,
              in_stock: product.in_stock
            }}
            onClick={() => navigate(`/product/${product._id || product.id}`)}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="muted small" style={{ textAlign: "center", marginTop: "24px" }}>
          No products found matching "{query}".
        </p>
      )}
    </Screen>
  );
}